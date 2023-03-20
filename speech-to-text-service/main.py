from stt import Model
from scipy.io import wavfile
import scipy.signal as sps
import io
import os
from paho.mqtt import client as mqtt_client


# FOR TESTING LOCAL ONLY
# take environment variables from .env
# from dotenv import load_dotenv
# load_dotenv()  

if __name__ == '__main__':

    # STT ENV
    SCORER_PATH = os.environ.get('STT_SCORER_PATH')
    MODEL_PATH = os.environ.get('STT_MODEL_PATH')
    AUDIO_FILE = os.environ.get('STT_TEST_AUDIO_FILE')

    # MQTT ENV
    MQTT_URL = os.environ.get('MQTT_URL')
    MQTT_PORT = os.environ.get('MQTT_PORT')
    MQTT_TOPIC_SUB = os.environ.get('MQTT_TOPIC_SUB')
    MQTT_TOPIC_PUB = os.environ.get('MQTT_TOPIC_PUB')

    # init model
    ds = Model(MODEL_PATH)
    ds.enableExternalScorer(SCORER_PATH)
    desired_sample_rate = ds.sampleRate()
    
    def run_stt(data):
        byte_data = io.BytesIO(data)
        sampling_rate, data = wavfile.read(byte_data)

        # Resample data
        number_of_samples = round(len(data) * float(desired_sample_rate) / sampling_rate)
        data = sps.resample(data, number_of_samples).astype('int16')
        return ds.stt(data)
    
    # init MQTT
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    def on_message(client, userdata, msg):
        text = run_stt(msg.payload)
        client.publish(MQTT_TOPIC_PUB,text)


    client = mqtt_client.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_URL, int(MQTT_PORT))
    client.subscribe((MQTT_TOPIC_SUB,0))
    client.loop_forever()