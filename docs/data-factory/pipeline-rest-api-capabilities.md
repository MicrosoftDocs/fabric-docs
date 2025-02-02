---
title: REST API capabilities for Fabric Data Factory (Preview)
description: This article describes the available REST APIs for pipelines in Microsoft Fabric Data Factory.
author: conxu-ms
ms.author: conxu
ms.topic: conceptual
ms.custom:
  - ignite-2024
ms.date: 10/24/2024
---

# REST API capabilities for data pipelines in Fabric Data Factory (Preview)

Fabric Data Factory provides a robust set of APIs that enable users to automate and manage their data pipelines efficiently. These APIs allow for seamless integration with various data sources and services, enabling users to create, update, and monitor their data workflows programmatically. The APIs support a wide range of operations, including pipeline CRUD (Create, Read, Update, and Delete), scheduling, and monitoring. This makes it easier for users to manage their data integration processes.

## API use cases for data pipelines

The APIs for pipelines in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of data pipelines across different environments (development, testing, production) using CI/CD practices.
- **Monitoring and alerts**: Set up automated monitoring and alerting systems to track the status of data pipelines and receive notifications if failures or performance issues occur.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified data pipeline for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure data pipelines run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for pipelines in Fabric Data Factory, it's essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various pipeline operations, such as creating, updating, and deleting pipelines.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD support

CRUD stands for Create, Read, Update, and Delete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory, which is currently in preview. These APIs allow users to manage their pipelines programmatically. Here are some key points about CRUD support:

- **Create**: Create new pipelines using the API. This involves defining the pipeline structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing pipelines. This includes details about their configuration, status, and execution history.
- **Update**: Update existing pipelines. This might involve modifying the pipeline structure, changing data sources, or updating transformation logic.
- **Delete**: Delete pipelines that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

## Get started with REST APIs for data pipelines

The following examples show how to to create, update, and manage pipelines using the Fabric Data Factory APIs.

## Obtain an authorization token

Before you use the other REST APIs, you need to have the bearer token.

### Option 1: Using MSAL.Net

Refer to the [Get Token section of the Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) as an example of how to obtain the MSAL authorization token.

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: _Workspace.ReadWrite.All_, _Item.ReadWrite.All_. For more information about token acquisition with MSAL.Net to, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Copy the _Application ID_ (also called the _ClientId_)  you copied earlier and use it for _ClientId_ variable in the following examples.

### Option 2: Using the Fabric portal

Sign in to the Fabric portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```azurecli
powerBIAccessToken
```

Copy the token and use it for the _ClientId_ variable in the following examples.

## Create a pipeline

Create a pipeline in a specified workspace.

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": "My pipeline",
  "description": "My pipeline description",
  "type": "pipeline"
}
```

**Sample response**:

```rest
{
    "id": "<artifactId>",
    "type": "pipeline",
    "displayName": "My pipeline",
    "description": "My pipeline description",
    "workspaceId": "<workspaceId>"
}
```

## Create a pipeline with definition

Create a pipeline with a base64 definition in a specified workspace.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": " My pipeline",
  "description": "My pipeline description",

  "type": "pipeline",
  "definition": { 
    "parts": [ 
      { 
        "path": "pipeline-content.json", 
        "payload": "<Your Base64 encoded JSON payload>"
        "payloadType": "InlineBase64" 
      } 
    ] 
  }
}
```

**Sample response**:

```rest
{
    "id": "<Your artifactId>",
    "type": "pipeline",
    "displayName": "My pipeline",
    "description": "My pipeline description",
    "workspaceId": "<Your workspaceId>"
}
```

## Get pipeline

Returns properties of specified pipeline.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```rest
{
    "id": "<Your artifactId>",
    "type": "pipeline",
    "displayName": "My pipeline",
    "description": "My pipeline description",
    "workspaceId": "<Your workspaceId>"
}
```

## Get pipeline with definition

Returns the pipeline item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition```

**Headers**:

```rest
{
  "Authorization": "<Your bearer-token>"
}
```

**Sample response**:

```rest
{
    "definition": {
        "parts": [
            {
                "path": "pipeline-content.json",
                "payload": "<Base64 encoded payload>"
                "payloadType": "InlineBase64"
            },
            {
                "path": ".platform",
                "payload": "<Base64 encoded payload>",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

## Update pipeline

Updates the properties of the pipeline.

**Sample request**:

**URI**: ```PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}``` 

**Headers**:

```rest
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": "My pipeline updated",
  "description": "My pipeline description updated",
  "type": "pipeline"
}
```

**Sample response**:

```rest
{
    "id": "<Your artifactId>",
    "type": "pipeline",
    "displayName": "My pipeline updated",
    "description": "My pipeline description updated",
    "workspaceId": "<Your workspaceId>"
}
```

## Update pipeline with definition

Updates the pipeline item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/updateDefinition```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": " My pipeline ",
  "type": "pipeline",
  "definition": {
    "parts": [ 
      { 
        "path": "pipeline-content.json", 
        "payload": "<Your Base64 encoded payload>", 
        "payloadType": "InlineBase64" 
      }
    ]
  }
}
```

**Sample response**:

```rest
200 OK
```

## Delete pipeline

Deletes the specified pipeline.

**Sample request**:

**URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```rest
200 OK
```

## Run on demand pipeline job

Runs on-demand pipeline job instance.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Refresh```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>"
}
```

**Payload**:

```rest
{
    "executionData": {
        "pipelineName": "pipeline",
        "OwnerUserPrincipalName": "<user@domain.com>",
        "OwnerUserObjectId": "<Your ObjectId>"
    }
}
```

**Sample response**:

```rest
202 Accepted
```

## Get pipeline job instance

Gets singular pipeline’s job instance.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```rest
{
  "id": "<id>",
  "itemId": "<itemId>",
  "jobType": "Refresh",
  "invokeType": "Manual",
  "status": "Completed",
  "rootActivityId": "<rootActivityId>",
  "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "failureReason": null
}
```

## Cancel pipeline job instance

Cancel a pipeline’s job instance.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}/cancel```

**Headers**:

```rest
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

***Location**: ```https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/items/<itemId>/jobs/instances/<jobInstanceId>```
**Retry-after**: ```60```

## Query activity runs

Example:

```POST https://api.fabric.microsoft.com/v1/workspaces/<your WS Id>/datapipelines/pipelineruns/<job id>/queryactivityruns```

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

## Current limitations

- Platform Limitation: Service Principal authentication isn't supported at the moment.
- JOB Limitation: Run APIs are invokable, but the actual run never succeeds (just like run/refresh from UI).
- Non-Power BI Fabric Items: The workspace must be on a support Fabric capacity.
- Creating an item: use either creationPayload or definition, but don't use both at the same time.

## Related content

### Documentation

- [Fabric data pipeline public REST API](pipeline-rest-api.md)
- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)

### Tutorials

- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
- [AI use case - Image to pipeline APIs](image-to-pipeline-with-ai.md)
