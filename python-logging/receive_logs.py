import pika
import os

hostName = os.environ["HOST"] if ("HOST" in os.environ) else "localhost"

try:
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=hostName))

    channel = connection.channel()

    channel.exchange_declare(exchange='logs', exchange_type='fanout')

    result = channel.queue_declare(queue='', exclusive=True)

    queue_name = result.method.queue

    channel.queue_bind(exchange='logs', queue=queue_name)

    print('[PYTHON] Waiting for logs')

    def callback(ch, method, properties, body):
        print(body)
        with open ('logs.txt', 'a') as f:
            f.write(body.decode('utf-8')+"\n")

    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    channel.start_consuming()
except:
    print("[PYTHON]: connection error")

