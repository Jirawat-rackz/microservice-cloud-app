import json
from scipy.io import wavfile
import os
from paho.mqtt import client as mqtt_client
from openai import OpenAI
from pydub import AudioSegment
import speech_recognition as sr


# FOR TESTING LOCAL ONLY
# take environment variables from .env
from dotenv import load_dotenv
load_dotenv()

filename = "./temp/output_file.wav"
recognizer = sr.Recognizer()

def convert_to_pcm_wav(input_file, output_file, sample_rate=16000):
    audio = AudioSegment.from_file(input_file)
    audio = audio.set_sample_width(2)
    audio = audio.set_frame_rate(sample_rate)
    audio.export(output_file, format="wav")

if __name__ == "__main__":

    # openAI_client = OpenAI(api_key=os.environ['OPENAI_API_KEY'],)

    # MQTT ENV
    # MQTT_URL = os.environ.get("MQTT_URL")
    # MQTT_PORT = os.environ.get("MQTT_PORT")
    MQTT_TOPIC_SUB = os.environ.get("MQTT_TOPIC_SUB")
    MQTT_TOPIC_PUB = os.environ.get("MQTT_TOPIC_PUB")
    MQTT_URL = "localhost"
    MQTT_PORT = "1883"

    input_file = "../speech-to-text-service/temp/cc5cdfeb-cf21-498d-989d-a4e188f0ad72.wav"
    output_file = "./temp/output_file.wav"
    convert_to_pcm_wav(input_file, output_file)

    try:
        with sr.AudioFile(filename) as audio_file:
            audio_data = recognizer.record(audio_file)
            text = recognizer.recognize_google(audio_data, language='th')
            print(text)   
    except FileNotFoundError:
            print(f"File not found: {filename}")
    except sr.UnknownValueError:
            print("Could not understand audio.")
    except sr.RequestError as e:
            print(f"Error with the speech recognition service; {e}")
    except Exception as e:
            print(f"Error processing audio file: {e}")


    def run_stt(filename):
        # filename = "./temp/" + filename
        # audio_file = open(filename, "rb")
        # transcript = openAI_client.audio.transcriptions.create(model="whisper-1", file=audio_file)
        # audio_file.close()

        # # remove temp file
        # os.remove(filename)
        return text

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
        print(decode)
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