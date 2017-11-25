#!/bin/bash

set -ex

docker-compose exec webserver python3 manage.py loaddata dump.json
docker-compose exec webserver cp -r ./dump_image ./media
