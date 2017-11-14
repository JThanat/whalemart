#!/bin/bash

counter=1
max_ping=30

echo "Begin"
while [ "$PING_RETURN_CODE" != "200" ] && [ $counter -le $max_ping ]
do
  sleep 1
  PING_RETURN_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/ping/)
  echo "$counter: Ping Return Code: $PING_RETURN_CODE"
  ((counter++))
done
if [ $counter -gt $max_ping ]; then
  exit 1
fi
