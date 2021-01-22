import requests
from pprint import pprint
import json
import random
import time
from subprocess import call
import socket

apiURL = "http://192.168.1.27:8081/api/main/v1/change_job_status"

postData = {
    'job_id': 2,
    'new_job_status': 'Completed'
}

r = requests.post(apiURL, data=postData)
resp = r.text
print(resp)


print("Done uploading data.")