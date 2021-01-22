import requests
from pprint import pprint
import json
import random
import time
from subprocess import call
import socket

time.sleep(30)

insertApiURL = "http://192.168.1.27:8081/api/main/v1/insert_sample_data"

with open('sample_data.json') as json_file:
    measurementData = json.load(json_file)['data']

for i in range(len(measurementData)):
    tempPostData = {
        'measurement': measurementData[i]['measurements'],
        'start_time': measurementData[i]['start_time']
    }
    
    r = requests.post(insertApiURL, data=tempPostData)
    resp = r.text
    print(resp)


print("Done uploading data.")