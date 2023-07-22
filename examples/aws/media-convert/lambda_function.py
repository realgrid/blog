import glob
import json
import os
import uuid
import boto3
import datetime
import random
from urllib.parse import urlparse
import logging

from botocore.client import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

S3 = boto3.resource('s3')

def lambda_handler(event, context):
    mediaConvertRole = "arn:aws:iam::577992228379:role/service-role/MediaConvert_Default_Role"
    application = "VOD"
    region = "ap-northeast-2"

    assetID = str(uuid.uuid4())

    statusCode = 200
    jobs = []
    job = {}

    sourceS3Key = event["Filename"]
    sourceS3 = 's3://video-file-in/' + sourceS3Key
    startTimecode = event["StartTimecode"]
    endTimecode = event["EndTimecode"]

    destinationS3 = 's3://video-file-out/' + sourceS3Key[:sourceS3Key.rfind('/')+1]

    jobMetadata = {}
    jobMetadata['assetID'] = assetID
    jobMetadata['application'] = application
    jobMetadata['input'] = sourceS3
    jobMetadata['settings'] = 'Default'

    try:
        jobInput = {}
        with open('params.json') as json_data:
            jobInput['settings'] = json.load(json_data)
            jobs.append(jobInput)

        mediaconvert_client = boto3.client('mediaconvert', region_name=region)
        endpoints = mediaconvert_client.describe_endpoints()

        client = boto3.client('mediaconvert', region_name=region, endpoint_url=endpoints['Endpoints'][0]['Url'], verify=False)

        for j in jobs:
            jobSettings = j['settings']
            jobSettings['Inputs'][0]['FileInput'] = sourceS3
            jobSettings['Inputs'][0]['InputClippings'][0]["StartTimecode"] = startTimecode
            jobSettings['Inputs'][0]['InputClippings'][0]["EndTimecode"] = endTimecode
            for outputGroup in jobSettings['OutputGroups']:
                if outputGroup['OutputGroupSettings']['Type'] == 'FILE_GROUP_SETTINGS':
                    outputGroup['OutputGroupSettings']['FileGroupSettings']['Destination'] = destinationS3
                elif outputGroup['OutputGroupSettings']['Type'] == 'HLS_GROUP_SETTINGS':
                    outputGroup['OutputGroupSettings']['HlsGroupSettings']['Destination'] = destinationS3
                elif outputGroup['OutputGroupSettings']['Type'] == 'DASH_ISO_GROUP_SETTINGS':
                    outputGroup['OutputGroupSettings']['DashIsoGroupSettings']['Destination'] = destinationS3
                elif outputGroup['OutputGroupSettings']['Type'] == 'DASH_ISO_GROUP_SETTINGS':
                    outputGroup['OutputGroupSettings']['DashIsoGroupSettings']['Destination'] = destinationS3
                elif outputGroup['OutputGroupSettings']['Type'] == 'MS_SMOOTH_GROUP_SETTINGS':
                    outputGroup['OutputGroupSettings']['MsSmoothGroupSettings']['Destination'] = destinationS3
                else:
                    logger.error("Exception: Unknown Output Group Type %s", outputGroup['OutputGroupSettings']['Type'])
                    statusCode = 500

            job = client.create_job(Role=mediaConvertRole, UserMetadata=jobMetadata, Settings=jobSettings)
    except Exception as e:
        logger.error('Exception: %s', e)
        statusCode = 500
        raise

    finally:
        return {
            'statusCode': statusCode,
            'body': json.dumps(job, indent=4, sort_keys=True, default=str),
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }