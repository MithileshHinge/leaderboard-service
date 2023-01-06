DIR=`date +%d-%m-%y`
DEST=redis_backups/$DIR
mkdir -p $DEST

redis-cli -n 0 --pass $REDIS_PASSWORD SAVE

mv dump.rdb $DEST/dump.rdb

redis-cli -n 0 --pass $REDIS_PASSWORD DEL $REDIS_SET_NAME
