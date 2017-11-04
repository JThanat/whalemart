#!/bin/bash

set -e

./wait_to_start.sh python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
