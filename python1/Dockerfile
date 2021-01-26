FROM python:3
ADD . /usr/src/app
WORKDIR /usr/src/app

# Installing python libraries
RUN pip3 install requests
RUN pip3 install smtp
RUN pip3 install matplotlib

# CMD ["python", "Main.py"]
CMD ["tail", "-F", "/dev/null"]