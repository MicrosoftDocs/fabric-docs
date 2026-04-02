---
title: Apache Spark job definition API v2
description: Learn how to create and update a Spark job definition with the Microsoft Fabric REST API with v2 version
ms.reviewer: qixwang
ms.topic: overview
ms.date: 11/07/2025
ms.search.form: spark_job_definition
---

# How to create and update a Spark Job Definition with V2 format via Microsoft Fabric REST API

Spark Job Definition (SJD) is a type of Fabric item that allows users to define and run Apache Spark jobs in Microsoft Fabric. The Spark Job Definition API v2 allows users to create and update Spark Job Definition items with a new format called `SparkJobDefinitionV2`. The primary benefit of using the v2 format is that it allows users to manage the main executable file and other library files with one single API call, instead of using storage API to upload files separately, no more storage token is needed for managing files.

## Prerequisites

- A Microsoft Entra token is required to access the Fabric REST API. The MSAL (Microsoft Authentication Library) library is recommended to get the token. For more information, see [Authentication flow support in MSAL](/entra/identity-platform/msal-authentication-flows).

The Microsoft Fabric REST API defines a unified endpoint for CRUD operations of Fabric items. The endpoint is `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items`. 


## Spark Job Definition v2 format overview

In the payload of managing a Spark Job Definition item, the `definition` field is used to specify the detailed setup of the Spark Job Definition item. The `definition` field contains two subfields: `format` and `parts`. The `format` field specifies the format of the Spark Job Definition item, which should be `SparkJobDefinitionV2` for the v2 format.

The `parts` field is an array that contains the detailed setup of the Spark Job Definition item. Each item in the `parts` array represents a part of the detailed setup. Each part contains three subfields: `path`, `payload`, and `payloadType`. The `path` field specifies the path of the part, the `payload` field specifies the content of the part that is base64 encoded, and the `payloadType` field specifies the type of the payload, which should be `InlineBase64`.

> [!IMPORTANT]
> This v2 format only supports Spark Job Definitions with file formats of .py or .scala. The .jar file format isn't supported.

## Create a Spark Job Definition item with the main definition file and other lib files

In the following example, we'll create a Spark Job Definition item which:
1. Name is `SJDHelloWorld`.
1. Main definition file is `main.py`, which is to read a CSV file from its default Lakehouse and save as a Delta table back to the same Lakehouse.
1. Other lib file is `libs.py`, which has a utility function to return the name of the CSV file and the Delta table.
1. The default Lakehouse is set to a specific Lakehouse artifact ID.

The following is the detailed payload for creating the Spark Job Definition item.


```json
{
  "displayName": "SJDHelloWorld",
  "type": "SparkJobDefinition",
  "definition": {
    "format": "SparkJobDefinitionV2",
    "parts": [
      {
        "path": "SparkJobDefinitionV1.json",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      },
      {
        "path": "Main/main.py",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      },
      {
        "path": "Libs/lib1.py",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

To decode or encode the detailed setup, you can use the following helper functions in Python. There are also other online tools such as [https://www.base64decode.org/](https://www.base64decode.org/) that can perform the same job.

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

A HTTP code 202 response indicates the Spark Job Definition item was created successfully.

## Get Spark Job Definition with definition parts under v2 format

With the new v2 format, when getting a Spark Job Definition item with definition parts, the file content of the main definition file and other lib files are all included in the response payload, base64 encoded under the `parts` field. Here's an example of getting a Spark Job Definition item with definition parts:

1. First, make a POST request to the endpoint `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{sjdartifactid}/getDefinitionParts?format=SparkJobDefinitionV2`. Make sure the value of the format query parameter is `SparkJobDefinitionV2`.
1. Then, in the response headers, check the HTTP status code. An HTTP code 202 indicates the request was successfully accepted. Copy the `x-ms-operation-id` value from the response headers.
1. Finally, make a GET request to the endpoint `https://api.fabric.microsoft.com/v1/operations/{operationId}` with the copied `x-ms-operation-id` value to get the operation result. In the response payload, the `definition` field contains the detailed setup of the Spark Job Definition item, including the main definition file and other lib files under the `parts` field.

## Update the Spark Job Definition item with the main definition file and other lib files under v2 format

To update an existing Spark Job Definition item with the main definition file and other lib files under the v2 format, you can use a similar payload structure as the create operation. Here's an example of updating the Spark Job Definition item created in the previous section:

```json
{
  "displayName": "SJDHelloWorld",
  "type": "SparkJobDefinition",
  "definition": {
    "format": "SparkJobDefinitionV2",
    "parts": [
      {
        "path": "SparkJobDefinitionV1.json",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      },
      {
        "path": "Main/main.py",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      },
      {
        "path": "Libs/lib2.py",
        "payload": "<REDACTED>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

With the above payload, the following changes are made to the files:
1. The main.py file is updated with new content.
1. The lib1.py is deleted from this Spark Job Definition item and also removed from the OneLake storage.
1. A new lib2.py file is added to this Spark Job Definition item and uploaded to the OneLake storage.


To update the Spark Job Definition item, make a POST request to the endpoint `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{sjdartifactid}` with the above payload. An HTTP code 202 response indicates the Spark Job Definition item was updated successfully.

## Related content

- [Schedule and run an Apache Spark job definition](run-spark-job-definition.md)
