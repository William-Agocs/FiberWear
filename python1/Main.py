import requests
from pprint import pprint
import json
import random
import time
import datetime
from subprocess import call
import socket
import matplotlib.pyplot as plt
from random import randrange


# time.sleep(30)
baseApiUrl = "http://192.168.1.27:8081/api/main/v1/"

# =================== Testing functions ==============================
def changeJobStatus(jobId, newJobStatus):

    apiURL = baseApiUrl + "change_job_status"

    postData = {
        'job_id': jobId,
        'new_job_status': newJobStatus
    }

    r = requests.post(apiURL, data=postData)
    resp = r.text
    print(resp)


    print("Done uploading data.")


def getSampleMeasurementData():
    apiURL = baseApiUrl + "get_measurement_data"

    r = requests.get(apiURL)
    sampleMeasurementData = json.loads(r.text)
    return sampleMeasurementData

# ======================================================================


# =================== Operational functions ==============================

def getMeasurementDataForId(measurementNumber):

    apiURL = baseApiUrl + "get_measurement_data_by_id"

    postData = {
        'measurement_num': measurementNumber
    }

    r = requests.post(apiURL, data=postData)
    
    measurementData = json.loads(r.text)
    return measurementData


def plotXAndY(x, y):
    '''
        x => array of sample numbers
        y => array of measurement values
    '''

    plt.scatter(x, y)
    plt.title('Capstone')
    plt.xlabel('Sample Number')
    plt.ylabel('Measurement')

    figurePath = './graph_plots/' + str(time.time()).split('.')[0] + '.png'
    plt.savefig(figurePath)

    return figurePath


def uploadGraphPictureToAPI(measurementNumber, localPathToPicture):
    header = {'content-type': 'multipart/form-data'}
    files = {'plotPicture': open(localPathToPicture, 'rb')}
    params = {'measurement_number': measurementNumber}
    r3 = requests.post(baseApiUrl + "upload_photo", params=params, files=files)
    print(r3.text)
    # responseData3 = json.loads(r3.text)
    # print(responseData3)


def createAndSavePlot(measurementNumber):

    measurementData = getMeasurementDataForId(measurementNumber)[0]['measurement'].split(',')
    
    xData = []
    yData = []

    for j in range(len(measurementData)):
        
        xData.append(j + 1)
        yData.append(float(measurementData[j]))
    
    figurePath = plotXAndY(xData, yData)

    uploadGraphPictureToAPI(measurementNumber, figurePath)


# imageName = '1611619582.png'
# testPath = '/usr/src/app/graph_plots/' + imageName
# createSpecificMeasurementGraph(1)
# uploadGraphPictureToAPI(1, testPath)

def checkJobStatusBasedOnId(jobId):
    jobStatusApiURL = baseApiUrl + "get_job_status"

    postData = {
        'job_id': jobId
    }

    r = requests.post(jobStatusApiURL, data=postData)
    
    jobStatus = json.loads(r.text)[0]['job_status']
    return jobStatus


def startJob(jobId):

    data = {
        'measurement_data': []
    }

    while True:

        newNumber = randrange(50)
        data['measurement_data'].append(newNumber)

        time.sleep(1)

        # Now check to see if the user has stopped the job
        newJobStatus = checkJobStatusBasedOnId(jobId)

        if newJobStatus == "Completed":
            # Upload measurement data to the server

            measurementString = ""
            for i in range(len(data['measurement_data'])):
                if i < len(data) - 1:
                    measurementString += str(data['measurement_data'][i]) + ","
                else:
                    measurementString += str(data['measurement_data'][i])
            
            ts = time.time()
            startTimeString = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

            apiURL = baseApiUrl + "create_measurement_entry"

            postData = {
                'measurement': measurementString,
                'start_time': startTimeString
            }

            r = requests.post(apiURL, data=postData)
            insertData = json.loads(r.text)
            measurementNumber = insertData['insertId']

            # Call function that will generate plot and upload it to the server
            createAndSavePlot(measurementNumber)

            # Return to infinite monitoring loop
            
            return



def lookForJobs():
    
    jobDataApiURL = baseApiUrl + "get_job_data"

    while True:

        r = requests.get(jobDataApiURL)
        jobData = json.loads(r.text)
        pprint(jobData)

        for i in range(len(jobData)):

            tempJobId = jobData[i]['job_id']
            tempJobStatus = jobData[i]['job_status']

            if tempJobStatus == "Requested":

                # Need to start recording measurements
                # First will change job status to 'In progress'
                changeJobStatus(tempJobId, "In progress")
                startJob(tempJobId)



        time.sleep(5)

lookForJobs()
# checkJobStatusBasedOnId(1)
