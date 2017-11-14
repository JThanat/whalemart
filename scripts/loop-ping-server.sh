#!/bin/sh

counter=1
echo "Begin"
while [ "$PING_RETURN_CODE" != "200" ] && [ $counter -le 30 ]
do
  sleep 1
  PING_RETURN_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/ping/)
  echo "$counter: Ping Return Code: $PING_RETURN_CODE"
  ((counter++))
done
