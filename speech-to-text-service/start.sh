#!/bin/bash

MODEL=./model.tflite
if [ ! -f "$MODEL" ]; then
    wget https://coqui.gateway.scarf.sh/english/coqui/v1.0.0-large-vocab/model.tflite
else
    echo "$MODEL exists."
fi

SCORER=./large_vocabulary.scorer
if [ ! -f "$SCORER" ]; then
    wget https://coqui.gateway.scarf.sh/english/coqui/v1.0.0-large-vocab/large_vocabulary.scorer
else
    echo "$SCORER exists."
fi

pip install -r requirements.txt
python main.py
