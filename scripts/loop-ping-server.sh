#!/bin/sh

while [ "$PING_RETURN_CODE" != "200" ]
do
  sleep 1
  PING_RETURN_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/ping/)
done
