FROM redis:latest

RUN apt-get update && apt-get install cron -y

WORKDIR /home

COPY weekly-reset-cron /etc/cron.d/weekly-reset-cron
COPY ./weekly-leaderboard-reset.sh /home/weekly-leaderboard-reset.sh

RUN chmod 0644 /etc/cron.d/weekly-reset-cron
RUN chmod 0744 /home/weekly-leaderboard-reset.sh

# Apply cron job 
RUN crontab /etc/cron.d/weekly-reset-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

CMD redis-server --save 20 10 --loglevel warning --requirepass $REDIS_PASSWORD && cron && tail -f /var/log/cron.log
