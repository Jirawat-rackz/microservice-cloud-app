FROM python:slim-bullseye AS build

WORKDIR /app
ADD main.py .
ADD requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "./main.py"] 