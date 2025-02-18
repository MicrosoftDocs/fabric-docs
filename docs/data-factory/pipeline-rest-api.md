---
title: Fabric data pipeline public REST API (Preview)
description: This article describes the available REST APIs for pipelines in Data Factory for Microsoft Fabric.
author: kromerm
ms.author: makromer
ms.topic: conceptual
ms.date: 09/16/2024
---

# Microsoft Fabric data pipeline public REST API (Preview)

> [!IMPORTANT]
> The Microsoft Fabric API for Data Factory is currently in public preview. This information relates to a prerelease product that may be substantially modified before released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In Microsoft Fabric, Data Factory APIs consist solely of CRUD operations for pipelines and dataflows. Currently, only data pipelines are supported. Dataflows APIs are not yet available. Other common areas for data integration projects are in separate APIs: schedules, monitoring, connections, have their own APIs in Fabric. The primary online reference documentation for Microsoft Fabric REST APIs can be found in [Microsoft Fabric REST API references](/rest/api/fabric/articles/). Also refer to the [Core items API](/rest/api/fabric/core/items) and [Job scheduler](/rest/api/fabric/core/job-scheduler).

## Item Definition with payload base64 encoded

- Use [Base64 Encode and Decode](https://www.base64encode.org/) to encode your JSON.
- Ensure that the **Perform URL safe encoding** box isn't checked.
- You can get the pipeline definitions via the **View** --> **View JSON code** tab in the Fabric user interface.

```json
{ 
    "name": "Pipeline_1_updated", 
    "objectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
    "properties": { 
        "description": "this is the description", 
        "activities": [ 
            { 
                "name": "Wait1", 
                "type": "Wait", 
                "dependsOn": [], 
                "typeProperties": { 
                    "waitTimeInSeconds": 240 
                } 
            } 
        ], 
        "annotations": [], 
        "lastModifiedByObjectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
        "lastPublishTime": "2024-02-01T17:28:02Z" 
    } 
}
```

Take the properties object and surround them in braces - **{ }** - so the REST Item definition payload would be:

```json
{
    "properties": { 
        "description": "this is the description", 
        "activities": [ 
            { 
                "name": "Wait1", 
                "type": "Wait", 
                "dependsOn": [], 
                "typeProperties": { 
                    "waitTimeInSeconds": 240 
                } 
            } 
        ], 
        "annotations": [], 
        "lastModifiedByObjectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
        "lastPublishTime": "2024-02-01T17:28:02Z" 
    } 
} 
```

## Create item

[REST API - Items - Create item](/rest/api/fabric/core/items/create-item )

Example - CreateDataPipeline:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items```

Body: 

```json
{ 
  "displayName": "pipeline_1", 
  "type": "DataPipeline" 
} 
```

> [!NOTE]
> The documentation states that there are only 2 required properties - **displayName** and **type**. Currently, Workload-DI doesn't support creation without a **definition** as well. The fix for this erroneous requirement is currently being deployed. For now, you can send the same default definition used by the Fabric user interface:
> ```‘{"properties":{"activities":[]}}’```

Modified JSON including definition:

```json
{ 
  "displayName": "pipeline_1", 
  "type": "DataPipeline", 
  "definition": { 
    "parts": [ 
      { 
        "path": "pipeline-content.json", 
        "payload": "eyJwcm9wZXJ0aWVzIjp7ImFjdGl2aXRpZXMiOltdfX0=", 
        "payloadType": "InlineBase64" 
      } 
    ] 
  } 
} 
```

Response 201:

```json
{ 
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
    "type": "DataPipeline", 
    "displayName": "Pipeline_1", 
    "description": "", 
    "workspaceId": "<Your WS Id>" 
} 
```

## Delete item

[REST API - Items - Delete item](/rest/api/fabric/core/items/delete-item)

Example:

```DELETE https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id> ```

Response 200: (No body)

## Get item

[REST API - Items - Get item](/rest/api/fabric/core/items/get-item)

Example:

```GET https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>```

Response 200:

```json
{ 
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
    "type": "DataPipeline", 
    "displayName": "Pipeline_1", 
    "workspaceId": "<your WS Id>" 
} 
```

## Get item definition

[REST API - Items - Get item definition](/rest/api/fabric/core/items/get-item-definition)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/getDefinition```

Response 200:

```json
{ 
    "definition": { 
        "parts":[ 
            { 
                "path": "pipeline-content.json", 
                "payload": "ewogICJwcm9wZXJ0aWVzIjogewogICAgImFjdGl2aXRpZXMiOiBbXQogIH0KfQ==", 
                "payloadType": "InlineBase64" 
            } 
        ] 
    } 
} 
```

## List items

[REST API - Items - List items](/rest/api/fabric/core/items/list-items)

Example:

```GET https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items```

Response 200:

```json
{ 
    "value": [ 
        { 
            "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
            "type": "SemanticModel", 
            "displayName": "deata_lh", 
            "description": "", 
            "workspaceId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
        }, 
        { 
            "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
            "type": "SQLEndpoint", 
            "displayName": "deata_lh", 
            "description": "", 
            "workspaceId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
        }, 
        { 
            "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
            "type": "Lakehouse", 
            "displayName": "deata_lh", 
            "description": "", 
            "workspaceId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
        }, 
        { 
            "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
            "type": "DataPipeline", 
            "displayName": "Pipeline_1", 
            "description": "", 
            "workspaceId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
        } 
    ] 
} 
```

## Update item

[REST API - Items - Update item](/rest/api/fabric/core/items/update-item)

Example:

```PATCH https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>```

Body:
```json
{ 
  "displayName": "Pipeline_1_updated", 
  "description": "This is the description." 
}
```

Response 200:

```json
{ 
    "id": "<pipeline id>", 
    "type": "DataPipeline", 
    "displayName": "Pipeline_1_updated", 
    "description": "This is the description.", 
    "workspaceId": "<Your WS id>" 
}
```

## Update item definition

[REST API - Items - Update item definition](/rest/api/fabric/core/items/update-item-definition)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/updateDefinition```

Body:

```json
{ 
  "definition": { 
    "parts": [ 
      { 
        "path": "pipeline-content.json", 
        "payload": "eyJwcm9wZXJ0aWVzIjp7ImFjdGl2aXRpZXMiOltdfX0=", 
        "payloadType": "InlineBase64" 
      } 
    ] 
  } 
}
```

Response 200: (No body)

## Run on-demand item job

[REST API - Items - Run on-demand item job](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/jobs/instances?jobType=Pipeline```

Response 202: (No body)

Example with two parameter values:

Here we have a **Wait** activity with a parameter named **param_waitsec** to specify the number of seconds to wait.

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/jobs/instances?jobType=Pipeline```

Body:

```json
{ 
  "executionData": { 
    "parameters": {
      "param_waitsec": "10" 
    } 
  } 
}
```

Response 202: (No body)

> [!NOTE]
> There's no body returned currently, but the job Id should be returned. During the preview, it can be found in the returned headers, in the _Location_ property.

## Get item job instance

[REST API - Items - Get item job instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance)

Example:

```GET https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/jobs/instances/<job ID>```

Response 200:

```json
{ 
    "id": "4511ffcd-a9f6-4f75-91a9-9ceab08d7539", 
    "itemId": "2bb9fe4a-0a84-4725-a01f-7ac4e6850259", 
    "jobType": "Pipeline", 
    "invokeType": "Manual", 
    "status": "Completed", 
    "failureReason": null, 
    "rootActivityId": "f14bdd95-2cff-4451-b839-bea81509126d", 
    "startTimeUtc": "2024-02-01T03:03:19.8361605", 
    "endTimeUtc": "2024-02-01T03:05:00.3433333" 
} 
```

## Cancel item job instance

[REST API - Items - Cancel item job instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance)

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/items/<pipeline id>/jobs/instances/<job ID>/cancel```

Response 202: (No body)

> [!NOTE]
> After canceling a job, you can check the status either by calling **Get item job instance** or looking at the **View run history** in the Fabric user interface.


## Query activity runs

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/datapipelines/pipelineruns/<Job ID>/queryactivityruns```

Body:

```json
{
  "filters":[],
  "orderBy":[{"orderBy":"ActivityRunStart","order":"DESC"}],
  "lastUpdatedAfter":"2024-05-22T14:02:04.1423888Z",
  "lastUpdatedBefore":"2024-05-24T13:21:27.738Z"
}
```

> [!NOTE]
> "job id" is the same id created and used in the Job Scheduler Public APIs

Response 200:
```json
[
    {
        "pipelineName": "ca91f97e-5bdd-4fe1-b39a-1f134f26a701",
        "pipelineRunId": "bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f",
        "activityName": "Wait1",
        "activityType": "Wait",
        "activityRunId": "cccc2c2c-dd3d-ee4e-ff5f-aaaaaa6a6a6a",
        "linkedServiceName": "",
        "status": "Succeeded",
        "activityRunStart": "2024-05-23T13:43:03.6397566Z",
        "activityRunEnd": "2024-05-23T13:43:31.3906179Z",
        "durationInMs": 27750,
        "input": {
            "waitTimeInSeconds": 27
        },
        "output": {},
        "error": {
            "errorCode": "",
            "message": "",
            "failureType": "",
            "target": "Wait1",
            "details": ""
        },
        "retryAttempt": null,
        "iterationHash": "",
        "userProperties": {},
        "recoveryStatus": "None",
        "integrationRuntimeNames": null,
        "executionDetails": null,
        "id": "/SUBSCRIPTIONS/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/RESOURCEGROUPS/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/PROVIDERS/MICROSOFT.TRIDENT/WORKSPACES/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/pipelineruns/bbbb1b1b-cc2c-dd3d-ee4e-ffffff5f5f5f/activityruns/cccc2c2c-dd3d-ee4e-ff5f-aaaaaa6a6a6a"
    }
]

```

## Known limitations

- Service Principal Auth (SPN) is currently not supported.

## Related content

- [REST API - Items](/rest/api/fabric/core/items)
- [Use the Fabric Monitoring hub](/admin/monitoring-hub.md)
