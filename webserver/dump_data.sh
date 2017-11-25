#!/bin/bash

set -ex

docker-compose exec webserver \
  python3 manage.py dumpdata --indent=2 \
  -e sessions \
  -e admin \
  -e contenttypes \
  -e auth.Permission \
  > dump.json
