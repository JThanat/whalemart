FROM python:3.6.2
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -f -y postgresql-client
RUN mkdir /webserver

WORKDIR /webserver
COPY requirements.txt /webserver/
RUN pip install -r requirements.txt

COPY docker_entrypoint.sh /webserver/
ENTRYPOINT ["/webserver/docker_entrypoint.sh"]
