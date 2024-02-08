---
title: Apache Spark job definition API tutorial
description: Learn how to create a Spark job definition via public API.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: spark_job_definition
---

# How to create and update a Spark Job Definition with Microsoft Fabric Rest API

The Microsoft Fabric Rest API provides a service endpoint for CRUD operations of Fabric items. In this tutorial, we walk through an end-to-end scenario of how to create and update a Spark Job Definition artifact. Three high-level steps are involved:

1. create a Spark Job Definition item with some initial state
1. upload the main definition file and other lib files
1. update the Spark Job Definition item with the OneLake URL of the main definition file and other lib files

## Prerequisites

1. A Microsoft Entra token is required to access the Fabric Rest API. The MSAL library is recommended to get the token. For more information, see [Authentication flow support in MSAL](/entra/identity-platform/msal-authentication-flows).
1. A storage token is required to access the OneLake API. For more information, see [MSAL for Python](/entra/msal/python/).

## Create a Spark Job Definition item with the initial state

The Microsoft Fabric Rest API defines a unified endpoint for CRUD operations of Fabric items. The endpoint is `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items`. 

The item detail is specified inside the request body. Here's an example of the request body for creating a Spark Job Definition item:

```json
{
    "displayName": "SJDHelloWorld",
    "type": "SparkJobDefinition",
    "definition": {
        "format": "SparkJobDefinitionV1",
        "parts": [
            {
                "path": "SparkJobDefinitionV1.json",
                "payload":"eyJleGVjdXRhYmxlRmlsZSI6bnVsbCwiZGVmYXVsdExha2Vob3VzZUFydGlmYWN0SWQiOiIiLCJtYWluQ2xhc3MiOiIiLCJhZGRpdGlvbmFsTGFrZWhvdXNlSWRzIjpbXSwicmV0cnlQb2xpY3kiOm51bGwsImNvbW1hbmRMaW5lQXJndW1lbnRzIjoiIiwiYWRkaXRpb25hbExpYnJhcnlVcmlzIjpbXSwibGFuZ3VhZ2UiOiIiLCJlbnZpcm9ubWVudEFydGlmYWN0SWQiOm51bGx9",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

In this example, the Spark Job Definition item is named as `SJDHelloWorld`. The `payload` field is the base64 encoded content of the detail setup, after decoding, the content is:

```json
{
    "executableFile":null,
    "defaultLakehouseArtifactId":"",
    "mainClass":"",
    "additionalLakehouseIds":[],
    "retryPolicy":null,
    "commandLineArguments":"",
    "additionalLibraryUris":[],
    "language":"",
    "environmentArtifactId":null
}
```

Here are two helper functions to encode and decode the detailed setup:

```python
import base64

def json_to_base64(json_data):
    # Serialize the JSON data to a string
    json_string = json.dumps(json_data)
    
    # Encode the JSON string as bytes
    json_bytes = json_string.encode('utf-8')
    
    # Encode the bytes as Base64
    base64_encoded = base64.b64encode(json_bytes).decode('utf-8')
    
    return base64_encoded

def base64_to_json(base64_data):
    # Decode the Base64-encoded string to bytes
    base64_bytes = base64_data.encode('utf-8')
    
    # Decode the bytes to a JSON string
    json_string = base64.b64decode(base64_bytes).decode('utf-8')
    
    # Deserialize the JSON string to a Python dictionary
    json_data = json.loads(json_string)
    
    return json_data
```

Here's the code snippet to create a Spark Job Definition item:

```python
import requests

bearerToken = "breadcrumb"; # replace this token with the real AAD token

headers = {
    "Authorization": f"Bearer {bearerToken}", 
    "Content-Type": "application/json"  # Set the content type based on your request
}

payload = "eyJleGVjdXRhYmxlRmlsZSI6bnVsbCwiZGVmYXVsdExha2Vob3VzZUFydGlmYWN0SWQiOiIiLCJtYWluQ2xhc3MiOiIiLCJhZGRpdGlvbmFsTGFrZWhvdXNlSWRzIjpbXSwicmV0cnlQb2xpY3kiOm51bGwsImNvbW1hbmRMaW5lQXJndW1lbnRzIjoiIiwiYWRkaXRpb25hbExpYnJhcnlVcmlzIjpbXSwibGFuZ3VhZ2UiOiIiLCJlbnZpcm9ubWVudEFydGlmYWN0SWQiOm51bGx9"

# Define the payload data for the POST request
payload_data = {
    "displayName": "SJDHelloWorld",
    "Type": "SparkJobDefinition",
    "definition": {
        "format": "SparkJobDefinitionV1",
        "parts": [
            {
                "path": "SparkJobDefinitionV1.json",
                "payload": payload,
                "payloadType": "InlineBase64"
            }
        ]
    }
}

# Make the POST request with Bearer authentication
response = requests.post(sjdCreateUrl, json=payload_data, headers=headers)

```

## Upload the main definition file and other lib files

A storage token is required to upload the file to OneLake. Here's a helper function to get the storage token:

```python

import msal

def getOnelakeStorageToken():
    app = msal.PublicClientApplication(
        "{client id}", # this filed should be the client id 
        authority="https://login.microsoftonline.com/microsoft.com")

    result = app.acquire_token_interactive(scopes=["https://storage.azure.com/.default"])

    print(f"Successfully acquired AAD token with storage audience:{result['access_token']}")

    return result['access_token']

```

Now we have a Spark Job Definition item created, to make it runnable, we need to set up the main definition file and required properties. The endpoint for uploading the file for this SJD item is `https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{sjdartifactid}`. The same "workspaceId" from the previous step should be used, the value of "sjdartifactid" could be found in the response body of the previous step. Here's the code snippet to set up the main definition file:

```python
import requests

# three steps are required: create file, append file, flush file

onelakeEndPoint = "https://onelake.dfs.fabric.microsoft.com/workspaceId/sjdartifactid"; # replace the id of workspace and artifact with the right one
mainExecutableFile = "main.py"; # the name of the main executable file
mainSubFolder = "Main"; # the sub folder name of the main executable file. Don't change this value


onelakeRequestMainFileCreateUrl = f"{onelakeEndPoint}/{mainSubFolder}/{mainExecutableFile}?resource=file" # the url for creating the main executable file via the 'file' resource type
onelakePutRequestHeaders = {
    "Authorization": f"Bearer {onelakeStorageToken}", # the storage token can be achieved from the helper function above
}

onelakeCreateMainFileResponse = requests.put(onelakeRequestMainFileCreateUrl, headers=onelakePutRequestHeaders)
if onelakeCreateMainFileResponse.status_code == 201:
    # Request was successful
    print(f"Main File '{mainExecutableFile}' was successfully created in onelake.")

# with previous step, the main executable file is created in OneLake, now we need to append the content of the main executable file

appendPosition = 0;
appendAction = "append";

### Main File Append.
mainExecutableFileSizeInBytes = 83; # the size of the main executable file in bytes
onelakeRequestMainFileAppendUrl = f"{onelakeEndPoint}/{mainSubFolder}/{mainExecutableFile}?position={appendPosition}&action={appendAction}";
mainFileContents = "filename = 'Files/' + Constant.filename; tablename = 'Tables/' + Constant.tablename"; # the content of the main executable file, please replace this with the real content of the main executable file
mainExecutableFileSizeInBytes = 83; # the size of the main executable file in bytes, this value should match the size of the mainFileContents

onelakePatchRequestHeaders = {
    "Authorization": f"Bearer {onelakeStorageToken}",
    "Content-Type" : "text/plain"
}

onelakeAppendMainFileResponse = requests.patch(onelakeRequestMainFileAppendUrl, data = mainFileContents, headers=onelakePatchRequestHeaders)
if onelakeAppendMainFileResponse.status_code == 202:
    # Request was successful
    print(f"Successfully Accepted Main File '{mainExecutableFile}' append data.")

# with previous step, the content of the main executable file is appended to the file in OneLake, now we need to flush the file

flushAction = "flush";

### Main File flush
onelakeRequestMainFileFlushUrl = f"{onelakeEndPoint}/{mainSubFolder}/{mainExecutableFile}?position={mainExecutableFileSizeInBytes}&action={flushAction}"
print(onelakeRequestMainFileFlushUrl)
onelakeFlushMainFileResponse = requests.patch(onelakeRequestMainFileFlushUrl, headers=onelakePatchRequestHeaders)
if onelakeFlushMainFileResponse.status_code == 200:
    print(f"Successfully Flushed Main File '{mainExecutableFile}' contents.")
else:
    print(onelakeFlushMainFileResponse.json())

```

Follow the same process to upload the other lib files if needed.

## Update the Spark Job Definition item with the OneLake URL of the main definition file and other lib files

Until now, we have created a Spark Job Definition item with some initial state, uploaded the main definition file and other lib files, The last step is to update the Spark Job Definition item to set the URL properties of the main definition file and other lib files. The endpoint for updating the Spark Job Definition item is `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{sjdartifactid}`. The same "workspaceId" and "sjdartifactid" from previous steps should be used. Here's the code snippet to update the Spark Job Definition item:

```python 

mainAbfssPath = f"abfss://{workspaceId}@onelake.dfs.fabric.microsoft.com/{sjdartifactid}/Main/{mainExecutableFile}" # the workspaceId and sjdartifactid are the same as previous steps, the mainExecutableFile is the name of the main executable file
libsAbfssPath = f"abfss://{workspaceId}@onelake.dfs.fabric.microsoft.com/{sjdartifactid}/Libs/{libsFile}"  # the workspaceId and sjdartifactid are the same as previous steps, the libsFile is the name of the libs file
defaultLakehouseId = 'defaultLakehouseid'; # replace this with the real default lakehouse id

updateRequestBodyJson = {
    "executableFile":mainAbfssPath,
    "defaultLakehouseArtifactId":defaultLakehouseId,
    "mainClass":"",
    "additionalLakehouseIds":[],
    "retryPolicy":None,
    "commandLineArguments":"",
    "additionalLibraryUris":[libsAbfssPath],
    "language":"Python",
    "environmentArtifactId":None}

# Encode the bytes as a Base64-encoded string
base64EncodedUpdateSJDPayload = json_to_base64(updateRequestBodyJson)

# Print the Base64-encoded string
print("Base64-encoded JSON payload for SJD Update:")
print(base64EncodedUpdateSJDPayload)

# Define the API URL
updateSjdUrl = f"https://api.fabric.microsoft.com//v1/workspaces/{workspaceId}/items/{sjdartifactid}/updateDefinition"

updatePayload = base64EncodedUpdateSJDPayload
payloadType = "InlineBase64"
path = "SparkJobDefinitionV1.json"
format = "SparkJobDefinitionV1"
Type = "SparkJobDefinition"

# Define the headers with Bearer authentication
bearerToken = "breadcrumb"; # replace this token with the real AAD token

headers = {
    "Authorization": f"Bearer {bearerToken}", 
    "Content-Type": "application/json"  # Set the content type based on your request
}

# Define the payload data for the POST request
payload_data = {
    "displayName": "sjdCreateTest11",
    "Type": Type,
    "definition": {
        "format": format,
        "parts": [
            {
                "path": path,
                "payload": updatePayload,
                "payloadType": payloadType
            }
        ]
    }
}


# Make the POST request with Bearer authentication
response = requests.post(updateSjdUrl, json=payload_data, headers=headers)
if response.status_code == 200:
    print("Successfully updated SJD.")
else:
    print(response.json())
    print(response.status_code)

```

To recap the whole process, both Fabric REST API and OneLake API are needed to create and update a Spark Job Definition item. The Fabric REST API is used to create and update the Spark Job Definition item, the OneLake API is used to upload the main definition file and other lib files. The main definition file and other lib files are uploaded to OneLake first. Then the URL properties of the main definition file and other lib files are set in the Spark Job Definition item.

## Related content

- [Schedule and run an Apache Spark job definition](run-spark-job-definition.md)
