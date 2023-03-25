import json
from scipy.io import wavfile
import os
from paho.mqtt import client as mqtt_client
import openai


# FOR TESTING LOCAL ONLY
# take environment variables from .env
# from dotenv import load_dotenv
# load_dotenv()

if __name__ == "__main__":

    openai.api_key = os.getenv("OPENAI_API_KEY")

    # MQTT ENV
    MQTT_URL = os.environ.get("MQTT_URL")
    MQTT_PORT = os.environ.get("MQTT_PORT")
    MQTT_TOPIC_SUB = os.environ.get("MQTT_TOPIC_SUB")
    MQTT_TOPIC_PUB = os.environ.get("MQTT_TOPIC_PUB")

    def run_stt(filename):
        filename = "./temp/" + filename
        audio_file = open(filename, "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        audio_file.close()

        # remove temp file
        os.remove(filename)
        return transcript["text"]

    # init MQTT
    def on_connect(client, userdata, flags, rc):
        print("Connected with result code " + str(rc))

    def on_message(client, userdata, msg):
        """
        ----Subscribe msg model----
        user_id : string
        data: string
        """
        decode = json.loads(msg.payload)
        text = run_stt(decode["data"])

        print("Text: ", text)  # for testing

        """
        ----Publish msg model----
        user_id : string
        word:     string
        """
        pub_data = {"user_id": decode["user_id"], "word": text}
        client.publish(MQTT_TOPIC_PUB, json.dumps(pub_data))

    client = mqtt_client.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_URL, int(MQTT_PORT))
    client.subscribe((MQTT_TOPIC_SUB, 0))

    client.loop_forever()
