---
title: Introduction Notebook Public API
description: Instruction of notebook Public API.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: conceptual
ms.date: 11/2/2023
ms.search.form: Notebook REST API ci cd
---


# Notebook create/get with definition API (WIP)

public api doc: [Items - REST API (Fabric REST APIs) | Microsoft Learn](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/items?branch=drafts%2Ffeatures%2Fga-release)

## Create notebook with definition

### Sample request
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

The payload in the request is base64 string converted from below sample notebook.
Note: You can change the notebook attached lakehouse or environment by changing notebook content `metadata.trident.lakehouse` or `metadata.trident.environment`

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

## Get notebook with definition

Set the format as ipynb in query string to get an ipynb format notebook.

### Sample request
```http
POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/items/{{ARTIFACT_ID}}/GetDefinition?format=ipynb
```

### Sample response
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

# Notebook - Job Scheduler

public api doc: [Job Scheduler - REST API (Fabric REST APIs) | Microsoft Learn](https://review.learn.microsoft.com/en-us/rest/api/fabric/core/job-scheduler?branch=drafts%2Ffeatures%2Fga-release)

## Run notebook on demand

### Sample request

configuration share the same contract with %%config

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

### Sample response
Status code: 202
```http
Location: https://api.fabric.microsoft.com/v1/workspaces/4b218778-e7a5-4d73-8187-f10824047715/items/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/jobs/instances/f2d65699-dd22-4889-980c-15226deb0e1b
Retry-After: 60
```

With this location, you can get job state or cancel the job.