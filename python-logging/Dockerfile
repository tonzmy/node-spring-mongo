FROM python:3

WORKDIR /logging

COPY . .

RUN pip install pika

ENTRYPOINT ["python", "receive_logs.py", ">>", "logs.txt"]