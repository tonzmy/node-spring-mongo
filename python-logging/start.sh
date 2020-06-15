while ! nc -z rabbitmq 5672; do sleep 3; done
python receive_logs.py >> logs.txt