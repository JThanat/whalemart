 FROM python:3.6.2
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /webserver
 WORKDIR /webserver
 ADD requirements.txt /webserver/
 RUN pip install -r requirements.txt
 ADD . /webserver/c