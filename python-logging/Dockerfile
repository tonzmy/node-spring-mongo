FROM python:3

WORKDIR /logging

COPY . .

RUN pip install pika

CMD ["python", "receive_logs.py", ">>", "logs.txt"]