---
title: Manage and execute Fabric notebooks with public APIs
description: Learn about the Fabric notebook public APIs, including how to create and get a notebook with definition, and run a notebook on demand.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: Notebook REST API ci cd
---


# Manage and execute notebooks in Fabric with APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available notebook REST APIs and their usage.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

> [!NOTE]
> [Service principal authentication](/entra/identity-platform/app-objects-and-service-principals#service-principal-object)  is not supported for now.

With the notebook APIs, data engineers and data scientists can automate their own pipelines and conveniently and efficiently establish CI/CD. These APIs also make it easy for users to manage and manipulate Fabric notebook items, and integrate notebooks with other tools and systems.

These **Item management** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Create item |Creates a notebook inside a workspace.|
|Update item |Updates the metadata of a notebook.|
|Update item definition |Updates the content of a notebook.|
|Delete item |Deletes a notebook.|
|Get item |Gets the metadata of a notebook.|
|Get item definition |Gets the content of a notebook.|
|List item | List all items in a workspace.|

For more information, see [Items - REST API](/rest/api/fabric/).

The following **Job scheduler** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Run on demand Item Job|Run notebook with parameterization.|
|Cancel Item Job Instance|Cancel notebook job run.|
|Get Item Job Instance| Get notebook run status.|

For more information, see [Job Scheduler](/rest/api/fabric/).

## Notebook REST API usage examples

Use the following instructions to test usage examples for specific notebook public APIs and verify the results.

> [!NOTE]
> These scenarios only cover notebook-unique usage examples. Fabric item common API examples are not covered here.

### Prerequisites

The Fabric Rest API defines a unified endpoint for operations. Replace the placeholders `{WORKSPACE_ID}` and `{ARTIFACT_ID}` with appropriate values when you follow the examples in this article.

### Create a notebook with a definition

Create a notebook item with an existing .ipynb file:

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

The payload in the request is a base64 string converted from the following sample notebook.

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
> You can change the notebook default lakehouse or attached environment by changing notebook content `metadata.trident.lakehouse` or `metadata.trident.environment`.

## Get a notebook with a definition

Use the following API to get the notebook content. Fabric supports you setting the format as .ipynb in the query string to get an .ipynb notebook.

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

### Run a notebook on demand

Schedule your notebook run with the following API. The Spark job starts executing after a successful request.

Fabric supports passing `parameters` in the request body to parameterize the notebook run. The values are consumed by the [notebook parameter cell](author-execute-notebook.md#designate-a-parameters-cell).

You can also use `configuration` to personalize the Spark session of notebook run. `configuration` shares the same contract with the [Spark session configuration magic command](author-execute-notebook.md#spark-session-configuration-magic-command).

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/items/{{ARTIFACT_ID}}/jobs/instances?jobType=RunNotebook

{
    "executionData": {
        "parameters": {
            "parameterName": {
                "value": "new value",
                "type": "string"
            }
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
            "useStarterPool": false,
            "useWorkspacePool": "<workspace-pool-name>"
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

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/) to cancel the current notebook run.

## Related content

- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Notebook source control and deployment](notebook-source-control-deployment.md)
- [Microsoft Spark Utilities (MSSparkUtils) for Fabric](microsoft-spark-utilities.md)
