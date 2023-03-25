import json
import uuid
from scipy.io import wavfile
import scipy.signal as sps
import os
from paho.mqtt import client as mqtt_client
import numpy as np
import base64
import openai


# FOR TESTING LOCAL ONLY
# take environment variables from .env
# from dotenv import load_dotenv
# load_dotenv()

if __name__ == "__main__":

    openai.api_key = os.getenv("OPENAI_API_KEY")
    # STT ENV
    SCORER_PATH = os.environ.get("STT_SCORER_PATH")
    MODEL_PATH = os.environ.get("STT_MODEL_PATH")

    # MQTT ENV
    MQTT_URL = os.environ.get("MQTT_URL")
    MQTT_PORT = os.environ.get("MQTT_PORT")
    MQTT_TOPIC_SUB = os.environ.get("MQTT_TOPIC_SUB")
    MQTT_TOPIC_PUB = os.environ.get("MQTT_TOPIC_PUB")

    def run_stt(base64_data):
        # Decode the Base64 string
        decoded_data = base64.b64decode(base64_data)
        filename = uuid.uuid4().hex + "-temp.wav"
        wav_fname = "./" + filename

        # convert the binary data to a numpy array
        audio_array = np.frombuffer(decoded_data, dtype=np.int16)

        # write the numpy array to a WAV file
        wavfile.write(wav_fname, 44100, audio_array)

        # read the WAV file using the wavfile.read() function
        # sampling_rate, data = wavfile.read("./yes_1000ms.wav")

        # # Resample data
        # number_of_samples = round(
        #     len(data) * float(desired_sample_rate) / sampling_rate
        # )

        # data = sps.resample(data, number_of_samples).astype("int16")
        audio_file = open(wav_fname, "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        audio_file.close()

        # remove temp file
        os.remove(wav_fname)
        return transcript["text"]

    # init MQTT
    def on_connect(client, userdata, flags, rc):
        print("Connected with result code " + str(rc))

    def on_message(client, userdata, msg):
        """
        ----Subscribe msg model----
        user_id : string
        data:     string
        """
        decode = json.loads(msg.payload)
        base_data = decode["data"].split(",")[1]
        # wav_data = base64.b64decode(base_data)

        print("User: ", decode["user_id"])  # for testing

        text = run_stt(base_data)

        print("Text: ", text)  # for testing

        """
        ----Publish msg model----
        user_id : string
        word:     string
        """
        pub_data = {"user_id": decode["user_id"], "word": text}
        client.publish(MQTT_TOPIC_PUB, json.dumps(pub_data))

    client = mqtt_client.Client("stt-service")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_URL, int(MQTT_PORT))
    client.subscribe(MQTT_TOPIC_SUB)

    client.loop_forever()
