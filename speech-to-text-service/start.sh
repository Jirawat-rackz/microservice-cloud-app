#!/bin/bash

FILE=model.tflite
if ! [ -f "$FILE" ]; then
    wget https://coqui.gateway.scarf.sh/english/coqui/v1.0.0-large-vocab/model.tflite
fi

FILE=large_vocabulary.scorer
if ! [ -f "$FILE" ]; then
    wget https://coqui.gateway.scarf.sh/english/coqui/v1.0.0-large-vocab/large_vocabulary.scorer
fi

pip install -r requirements.txt
python main.py
