import json
from stt import Model
from scipy.io import wavfile

import scipy.signal as sps
import os
from paho.mqtt import client as mqtt_client
import numpy as np
import base64
import uuid
from os.path import dirname, join as pjoin

# FOR TESTING LOCAL ONLY
# take environment variables from .env
# from dotenv import load_dotenv
# load_dotenv()

if __name__ == "__main__":

    # STT ENV
    SCORER_PATH = os.environ.get("STT_SCORER_PATH")
    MODEL_PATH = os.environ.get("STT_MODEL_PATH")

    # MQTT ENV
    MQTT_URL = os.environ.get("MQTT_URL")
    MQTT_PORT = os.environ.get("MQTT_PORT")
    MQTT_TOPIC_SUB = os.environ.get("MQTT_TOPIC_SUB")
    MQTT_TOPIC_PUB = os.environ.get("MQTT_TOPIC_PUB")

    # init model
    ds = Model(MODEL_PATH)
    ds.enableExternalScorer(SCORER_PATH)
    desired_sample_rate = ds.sampleRate()

    def run_stt(base64_data):
        # Decode the Base64 string
        decoded_data = base64.b64decode(base64_data)
        filename = uuid.uuid4().hex + "-temp.wav"
        wav_fname = pjoin("./", filename)

        # pad the binary data with zeros to make it a multiple of the size of a 16-bit integer
        padded_data = decoded_data.ljust(
            len(decoded_data) + len(decoded_data) % 2, b"\x00"
        )

        # convert the binary data to a numpy array
        audio_array = np.frombuffer(padded_data, dtype=np.int16)

        # write the numpy array to a WAV file
        wavfile.write(wav_fname, 44100, audio_array)

        # read the WAV file using the wavfile.read() function
        sampling_rate, data = wavfile.read(wav_fname)

        # Resample data
        number_of_samples = round(
            len(data) * float(desired_sample_rate) / sampling_rate
        )

        data = sps.resample(data, number_of_samples).astype("int16")
        os.remove(filename)
        return ds.stt(data)

    # init MQTT
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    def on_message(client, userdata, msg):

        """
        ----Subscribe msg model----
        user_id : string
        data:     string
        """
        decode = json.loads(msg.payload)

        print("Accept message: ", decode["user_id"])
        base_data = decode["data"].split("data:audio/wav;base64,")[1]

        # Read the .wav file
        text = run_stt(base_data)

        print("Transcript: ", text)

        # Delete the .wav file
        # os.remove(filename)

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
