import requests
from pprint import pprint
import json
import random
import time
from subprocess import call
import socket

import matplotlib.pyplot as plt



def changeJobStatus(jobId, newJobStatus):

    apiURL = "http://192.168.1.27:8081/api/main/v1/change_job_status"

    postData = {
        'job_id': jobId,
        'new_job_status': newJobStatus
    }

    r = requests.post(apiURL, data=postData)
    resp = r.text
    print(resp)


    print("Done uploading data.")



def getMeasurementDataForId(measurementNumber):

    apiURL = "http://192.168.1.27:8081/api/main/v1/get_measurement_data_by_id"

    postData = {
        'measurement_num': measurementNumber
    }

    r = requests.post(apiURL, data=postData)
    
    measurementData = json.loads(r.text)
    return measurementData


def getSampleMeasurementData():
    apiURL = "http://192.168.1.27:8081/api/main/v1/get_measurement_data"

    r = requests.get(apiURL)
    sampleMeasurementData = json.loads(r.text)
    return sampleMeasurementData


def plotXAndY(x, y):
    '''
        x => array of sample numbers
        y => array of measurement values
    '''

    plt.scatter(x, y)
    plt.title('Capstone')
    plt.xlabel('Sample Number')
    plt.ylabel('Measurement')

    figureName = str(time.time()).split('.')[0] + '.png'
    plt.savefig(figureName)

    plt.show()
    
    return plt



def createAllGraphs():
    '''

        Graph Details:
            x-axis: Sample #
            y-axis: Data point

    '''

    data = getSampleMeasurementData()

    for i in range(len(data)):

        tempMeasurementData = data[i]['measurement'].split(',')

        xData = []
        yData = []

        for j in range(len(tempMeasurementData)):
            
            xData.append(j + 1)
            yData.append(float(tempMeasurementData[j]))
        
        plotXAndY(xData, yData)


def createSpecificMeasurementGraph(measurementNumber):

    measurementData = getMeasurementDataForId(measurementNumber)[0]['measurement'].split(',')
    
    xData = []
    yData = []

    for j in range(len(measurementData)):
        
        xData.append(j + 1)
        yData.append(float(measurementData[j]))
    
    plotXAndY(xData, yData)




# createAllGraphs()
createSpecificMeasurementGraph(1)