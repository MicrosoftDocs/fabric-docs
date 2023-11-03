---
title: Introduction of Notebook Public API
description: Instruction of notebook Public API.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: conceptual
ms.date: 11/2/2023
ms.search.form: Notebook REST API ci cd
---


# Manage and execute Notebook with public API

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Overview
The Microsoft Fabric REST API provides service endpoint for the CRUD operation of a Fabric item. This artical is to showcase the notebook available REST APIs and the usage.

With the notebook public APIs, data engineers/data scientists can automate their own pipelines and establish CI/CD conveniently and efficiently. Also make it easy for users to manage and manipulate Fabric notebook items and integrate notebook with other tools and systems.

Here are the **Item management** actions that are available for Notebook.

|Action   |Description  |
|---------|---------|
|Create item |Creates a notebook inside a workspace.|
|Update item |Updates the metadata of a notebook.|
|Update item definition |Updates the content of a notebook.|
|Delete item |Deletes a notebook|
|Get item |Gets the metadata of a notebook.|
|Get item definition |Gets the content of a notebook.|
|List item | List all items in a workspace.|

You can find more details in the public api doc: [Items - REST API (Fabric REST APIs) | Microsoft Learn](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/items?branch=drafts%2Ffeatures%2Fga-release)

Here are the **Job Scheduler** actions that are available for Notebook.

|Action   |Description  |
|---------|---------|
|Run on demand Item Job|Run notebook with parameterization.|
|Cancel Item Job Instance|Cancel notebook job run.|
|Get Item Job Instance| Get notebook run status.|

You can find more details in the public api doc: [Job Scheduler - REST API (Fabric REST APIs) | Microsoft Learn](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/job-scheduler?branch=drafts%2Ffeatures%2Fga-release)

## Notebook REST API usage examples

Here are the usage example for specific notebook public APIs, you can follow the instruction to test them and verify the result.

> [!NOTE]
> Only notebook unique usage examples are illstrated in the artical, the Fabric item common API examples are not covered here.

### Prerequisites

Microsoft Fabric Rest API defines a unified endpoint for operations. The placeholders `{WORKSPACE_ID}` and `{ARTIFACT_ID}` should be replaced with the appropriate values when trying the examples in this article.

### Create notebook with definition

You can create a Notebook item with an existing _.ipynb_ file follow the example.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/items

{
    "displayName":"Notebook1",
    "type":"Notebook",
    "definition" : {
        "format": "ipynb",
        "parts": [
            {
                "path": "artifact.content.ipynb",
                "payload": "eyJuYmZvcm1hdCI6NCwibmJmb3JtYXRfbWlub3IiOjUsImNlbGxzIjpbeyJjZWxsX3R5cGUiOiJjb2RlIiwic291cmNlIjpbIiMgV2VsY29tZSB0byB5b3VyIG5ldyBub3RlYm9va1xuIyBUeXBlIGhlcmUgaW4gdGhlIGNlbGwgZWRpdG9yIHRvIGFkZCBjb2RlIVxuIl0sImV4ZWN1dGlvbl9jb3VudCI6bnVsbCwib3V0cHV0cyI6W10sIm1ldGFkYXRhIjp7fX1dLCJtZXRhZGF0YSI6eyJsYW5ndWFnZV9pbmZvIjp7Im5hbWUiOiJweXRob24ifX19",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

The payload in the request is base64 string converted from following sample notebook.

```json
{
 "nbformat": 4,
 "nbformat_minor": 5,
 "cells": [
  {
   "cell_type": "code",
   "source": [
    "# Welcome to your new notebook\n# Type here in the cell editor to add code!\n"
   ],
   "execution_count": null,
   "outputs": [],
   "metadata": {}
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  },
        "trident": {
            "environment": {
                "environmentId": "6524967a-18dc-44ae-86d1-0ec903e7ca05",
                "workspaceId": "c31eddd2-26e6-4aa3-9abb-c223d3017004"
            },
            "lakehouse": {
                "default_lakehouse": "5b7cb89a-81fa-4d8f-87c9-3c5b30083bee",
                "default_lakehouse_name": "lakehouse_name",
                "default_lakehouse_workspace_id": "c31eddd2-26e6-4aa3-9abb-c223d3017004"
            }
        }
    }
}
```

> [!NOTE]
> 
> You can change the notebook default Lakehouse or attached Environment by changing notebook content `metadata.trident.lakehouse` or `metadata.trident.environment`.

## Get notebook with definition

You can get the notebook content by using this API, we support to set the format as ipynb in query string to get an ipynb format notebook.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/items/{{ARTIFACT_ID}}/GetDefinition?format=ipynb
```

**Response**

Status code: 200

```json
{
    "definition": {
        "parts": [
            {
                "path": "notebook-content.ipynb",
                "payload": "eyJuYmZvcm1hdCI6NCwibmJmb3JtYXRfbWlub3IiOjUsImNlbGxzIjpbeyJjZWxsX3R5cGUiOiJjb2RlIiwic291cmNlIjpbIiMgV2VsY29tZSB0byB5b3VyIG5ldyBub3RlYm9va1xuIyBUeXBlIGhlcmUgaW4gdGhlIGNlbGwgZWRpdG9yIHRvIGFkZCBjb2RlIVxuIl0sImV4ZWN1dGlvbl9jb3VudCI6bnVsbCwib3V0cHV0cyI6W10sIm1ldGFkYXRhIjp7fX1dLCJtZXRhZGF0YSI6eyJsYW5ndWFnZV9pbmZvIjp7Im5hbWUiOiJweXRob24ifX19",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```


### Run notebook on demand

You can schedule your notebook run by using this API, Spark job will start to execute after successfully request.

We support passing `parameters` in the request body to parameterize the notebook run, the values will be consumed by [Notebook parameter cell](author-execute-notebook.md#designate-a-parameters-cell).

You can also use `configuration` to personalize Spark session of notebook run, ` configuration`  share the same contract with the [Spark session configuration magic command](author-execute-notebook.md#spark-session-configuration-magic-command).

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/items/{{ARTIFACT_ID}}/jobs/instances?jobType=RunNotebook

{
    "executionData": {
        "parameters": {
            "parameterName": {
                "value": "new value",
                "type": "string"
            },
            "configuration": {
                "conf": {
                    "spark.conf1": "value"
                },
                "defaultLakehouse": {  
                    "name": "<lakehouse-name>",
                    "id": "<(optional) lakehouse-id>",
                    "workspaceId": "<(optional) workspace-id-that-contains-the-lakehouse>"
                },
                "useStarterPool": false,  // Set to true to force using starter pool
                "useWorkspacePool": "<workspace-pool-name>"
            }
        }
    }
}
```

**Response**

Status code: 202

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/4b218778-e7a5-4d73-8187-f10824047715/items/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/jobs/instances/f2d65699-dd22-4889-980c-15226deb0e1b
Retry-After: 60
```

With the `location`, you can use [_Get Item Job Instance_](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/job-scheduler/get-item-job-instance?branch=drafts%2Ffeatures%2Fga-release&tabs=HTTP) to view job status or use [_Cancel Item Job Instance_](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/job-scheduler/cancel-item-job-instance?branch=drafts%2Ffeatures%2Fga-release&tabs=HTTP) to cancel this notebook run.


## Next steps

- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Notebook Source control and Deployment](notebook-source-control-deployment.md)
- [Introduction of Fabric MSSparkUtils](microsoft-spark-utilities.md)