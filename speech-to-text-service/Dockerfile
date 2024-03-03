FROM python:slim-bullseye AS build

WORKDIR /app
ADD main.py .
RUN apt-get update && apt-get install -y ffmpeg && apt-get install flac
ADD requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "./main.py"] 