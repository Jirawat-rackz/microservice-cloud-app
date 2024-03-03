import json
import os
from paho.mqtt import client as mqtt_client
import speech_recognition as sr
from pydub import AudioSegment

# FOR TESTING LOCAL ONLY
# take environment variables from .env
# from dotenv import load_dotenv
# load_dotenv()

# MQTT ENV
MQTT_URL = os.environ.get("MQTT_URL")
MQTT_PORT = os.environ.get("MQTT_PORT")
MQTT_TOPIC_SUB = os.environ.get("MQTT_TOPIC_SUB")
MQTT_TOPIC_PUB = os.environ.get("MQTT_TOPIC_PUB")

# MQTT_URL = "localhost"   
# MQTT_PORT = "1883"
# MQTT_TOPIC_SUB = "voice-publish"
# MQTT_TOPIC_PUB = "voice-consume"

def convert_to_pcm_wav(input_file, sample_rate=16000):
    audio = AudioSegment.from_file(input_file)
    audio = audio.set_sample_width(2)
    audio = audio.set_frame_rate(sample_rate)
    audio.export(input_file, format="wav")

def run_stt(filename):
    print(f"filename: {filename}")
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(filename) as audio_file:
            audio_data = recognizer.record(audio_file)
            text = recognizer.recognize_google(audio_data, language="th")
    except FileNotFoundError:
            print(f"File not found: {filename}")
    except sr.UnknownValueError:
            print("Could not understand audio.")
    except sr.RequestError as e:
            print(f"Error with the speech recognition service; {e}")
    except Exception as e:
            print(f"Error processing audio file: {e}")
    # remove temp file
    os.remove(filename)
    return text

def on_connect(client, userdata, flags, rc):
    client.subscribe(MQTT_TOPIC_SUB)
    print(f"Connected with result code " + str(rc))
    print(f"Subscribed to topic: " + MQTT_TOPIC_SUB)
   

def on_message(client, userdata, msg):
    decode =  json.loads(msg.payload)
    filename = "./temp/" + decode["data"]
    convert_to_pcm_wav(filename)
    text = run_stt(filename)
    print("Text: ", text)
    print(f"Received message on topic {msg.topic}: {msg.payload.decode()}")

    pub_data = {"user_id": decode["user_id"], "word": text}
    print("Data to be sent to Pocketbase:", pub_data)
    client.publish(MQTT_TOPIC_PUB, json.dumps(pub_data))


if __name__ == "__main__":
    client = mqtt_client.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_URL, int(MQTT_PORT), 90)
    client.subscribe((MQTT_TOPIC_SUB, 0))

    try:
        client.loop_forever()
    except KeyboardInterrupt: 
        print("Disconnected by Keyboard Interrupting")
        client.disconnect()