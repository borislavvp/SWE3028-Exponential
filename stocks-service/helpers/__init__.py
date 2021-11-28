import requests
import os
from pyfcm import FCMNotification
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import os
from azure.storage.blob import ContainerClient, BlobServiceClient
from datetime import datetime
from ai_model import predict

import json

BLOB_ID = os.getenv('BLOB_ID')
BASE_ALERTS_API = "http://localhost:64439/alerts"
push_service = FCMNotification(api_key=os.getenv('FIREBASE_API_KEY'))

def get_blob_link(blobName,containerName):
    return f"https://{BLOB_ID}.blob.core.windows.net/{containerName}/{blobName}"

def generate_notification_image(stockSymbol,dateTime,image_stream):
    # # create some mock data
    # t = np.arange(0.01, 10.0, 0.01)
    # data1 = np.sin(2 * np.pi * t)

    # # plot it
    # fig, ax1 = plt.subplots()
    # ax1.set_xlabel('time (s)')
    # ax1.set_ylabel('exp')
    # ax1.plot(t, data1)

    # image_stream = BytesIO()
    # plt.savefig(image_stream)
    # # reset stream's position to 0
    # image_stream.seek(0)

    blob_name = f"{stockSymbol}-NOTIFICATION-{dateTime}.png"
    # upload in blob storage
    CONNECTION_STRING = os.getenv("BLOB_CONNECITON_STRING")
    NOTIFICATIONS_CONTAINER=os.getenv('NOTIFICATIONS_BLOB_CONTAINER')
    blob_service_client = BlobServiceClient.from_connection_string(conn_str=CONNECTION_STRING)
    # container_client = ContainerClient.from_container_url(os.getenv('BLOB_STORAGE_CONTAINER_SAS_TOKEN'))
    blob_client = blob_service_client.get_blob_client(container=NOTIFICATIONS_CONTAINER,blob = blob_name)
    blob_client.upload_blob(image_stream.read(), blob_type="BlockBlob") 
    # return blob_name
    return get_blob_link(blobName=blob_name,containerName=NOTIFICATIONS_CONTAINER)

def get_alerts():
    r = requests.get(url = f"{BASE_ALERTS_API}/unique")
    if(r.ok):
        return r.json()
    else:
        return []

def get_devices_for_notification(stockSymbol,alertValue):
    r = requests.get(url = f"{BASE_ALERTS_API}/{stockSymbol}?alertValue={alertValue}")
    if(r.ok):
        return r.json()
    else:
        return []

def persist_notifications(devices,stockSymbol,alertValue,imageUrl,dateTime):
    headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
    PARAMS = {
        "Devices":devices,
        "StockSymbol":stockSymbol,
        "StockName":stockSymbol,
        "NotificationValue":alertValue,
        "NotificationImageURL":imageUrl,
        "DateTime":dateTime
    }
    requests.post(url = f"{BASE_ALERTS_API}/save/notifications", data=json.dumps(PARAMS), headers=headers)
    
def check_alerts():
    res = predict("TSLA")
    now = datetime.now().strftime("%Y-%m-%d,%H:%M:%S")
    notificationImageUrl = generate_notification_image("TSLA",now,res['plt'])
    print(notificationImageUrl)
    alerts = get_alerts()
    for alert in alerts:
        # check with model
        # res = model.predict(alert)
        # devices_to_send = get_devices_for_notification(res.alertValue,alert)
        devices_to_send = get_devices_for_notification(stockSymbol=alert,alertValue=-0.02)
        print(devices_to_send)
        
        # now = datetime.now().strftime("%Y-%m-%d,%H:%M:%S")
        
        if(len(devices_to_send) <= 0 ):
            return

        # notificationImageUrl = generate_notification_image(alert,now)
        # persist_notifications(devices=devices_to_send,stockSymbol=alert,alertValue=-0.02,imageUrl=notificationImageUrl,dateTime=now)
        # send_notification(devices=devices_to_send,stockSymbol=alert,alertValue=-0.02,imageUrl=notificationImageUrl)

def send_notification(devices,stockSymbol,alertValue, imageUrl):

    message_title = "Stock Alert!"
    message_body = stockSymbol + " stock is about to " 
    if(alertValue > 0):
        message_body + "surge!"
    else:
        message_body + "plunge!"
    # result = push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body)

    extra_notification_kwargs = {
        'image': imageUrl,
    }
    data = {
        'value':alertValue,
        'stockSymbol':stockSymbol
    }
    # # Send to multiple devices by passing a list of ids.
    registration_ids = devices
    # message_title = "Uber update"
    # message_body = "Hope you're having fun this weekend, don't forget to check today's news"
    result = push_service.notify_multiple_devices(
        registration_ids=registration_ids,
        message_title=message_title, 
        message_body=message_body,
        extra_notification_kwargs=extra_notification_kwargs,
        data_message=data
    )

    print(result)