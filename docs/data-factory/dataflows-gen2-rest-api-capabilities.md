---
title: REST API capabilities for Fabric Dataflows Gen2 (Preview)
description: This article describes the available REST APIs for Dataflows Gen2 in Microsoft Fabric Data Factory.
author: conxu-ms
ms.author: conxu
ms.topic: conceptual
ms.date: 11/06/2024
---

# REST API capabilities for Dataflows Gen2 in Fabric Data Factory (Preview)

> [!IMPORTANT]
> The Microsoft Fabric API for Data Factory is currently in public preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Fabric Data Factory provides a robust set of APIs that enable users to automate and manage their dataflows efficiently. These APIs allow for seamless integration with various data sources and services, enabling users to create, update, and monitor their data workflows programmatically. The APIs support a wide range of operations -- including dataflows CRUD (Create, Read, Update, and Delete), scheduling, and monitoring -- making it easier for users to manage their data integration processes.

## API use cases for Dataflows Gen2

The APIs for dataflows in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of dataflows across different environments (development, testing, production) using CI/CD practices.
- **Monitoring and alerts**: Set up automated monitoring and alerting systems to track the status of dataflows and receive notifications in case of failures or performance issues.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified dataflow for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure dataflows run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for dataflows in Fabric Data Factory, it is essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various dataflow operations, such as creating, updating, and deleting dataflows.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD support

**CRUD** stands for **C**reate, **R**ead, **U**pdate, and **D**elete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory, which is currently in preview. These APIs allow users to manage their dataflows programmatically. Here are some key points about CRUD support:

- **Create**: Create new dataflows using the API. This involves defining the dataflow structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing dataflows. This includes details about their configuration, status, and execution history.
- **Update**: Update existing dataflows. This might involve modifying the dataflow structure, changing data sources, or updating transformation logic.
- **Delete**: Delete dataflows that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

## Get started with public APIs for Dataflows Gen2

### Obtain an authorization token

You need to have the bearer token for all REST API calls.

#### Option 1: Using MSAL.Net

Refer to the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) for an example of how to request the bearer token with MSAL.NET.

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: Workspace.ReadWrite.All, Item.ReadWrite.All. For more information about token acquisition with MSAL.Net to, see [Token Acquisition with MSAL.NET](/entra/msal/dotnet/acquiring-tokens/overview).

Paste the Application Id (Client Id) you copied earlier and use it for the ClientId variable.

#### Option 2: Using the Fabric portal

Sign in into the Fabric portal for the tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```powerBIAccessToken```

Copy the token returned and use it for the ClientId variable.

### Create a Dataflow Gen2

Create a dataflow in a specified workspace.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items```

**Headers**:

```json
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```json
{
  "displayName": "My dataflow",
  "description": "My dataflow description",
  "type": "Dataflow"
}
```

**Sample response**:

```json
{
    "id": "<artifactId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "<workspaceId>"
}
```

### Create a Dataflow Gen2 with definition

Create a dataflow with a base64 definition in a specified workspace.

**Sample request**

**URI**: POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items

**Headers**:

```json
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```json
{
  "displayName": " My dataflow",
  "description": "My dataflow description",

  "type": "Dataflow",
  "definition": { 
    "parts": [ 
      { 
        "path": "dataflow-content.json", 
        "payload": "<Your base64 encoded dataflow definition>",
        "payloadType": "InlineBase64" 
      } 
    ] 
  }
}

**Sample response**:

```json
{
    "id": "<artifactId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "<workspaceId>"
}
```

### Get Dataflow Gen2

Returns properties of specified dataflow.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```json
{
    "id": "<artifactId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "<workspaceId>"
}
```

### Get Dataflow Gen2 with definition

Returns the dataflow item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```json
{
    "definition": {
        "parts": [
            {
                "path": "dataflow-content.json",
                "payload": "<Your base64 encoded dataflow definition>",
                "payloadType": "InlineBase64"
            },
            {
                "path": ".platform",
                "payload": "<Your base64 encoded platform definition>",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

### Update Dataflow Gen2

Updates the properties of the dataflow.

**Sample request**:

**URI**: ```PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```json
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```json
{
  "displayName": "My dataflow updated",
  "description": "My dataflow description updated",
  "type": "Dataflow"
}
```

**Sample response**:

```json
{
    "id": "<artifactId>",
    "type": "Dataflow",
    "displayName": "My dataflow updated",
    "description": "My dataflow description updated",
    "workspaceId": "<workspaceId>"
}
```

### Update Dataflow Gen3 with definition

Updates the dataflow item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/updateDefinition```

**Headers**:

```json
{
  "Authorization": "<bearer-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```json
{
  "displayName": " My dataflow",
  "type": "Dataflow",
  "definition": {
    "parts": [ 
      { 
        "path": "dataflow-content.json", 
        "payload": " <Your base64 encoded dataflow definition>", 
        "payloadType": "InlineBase64" 
      }
    ]
  }
}
```

**Sample response**:

```200 OK```

### Delete Dataflow Gen2

Deletes the specified dataflow.

**Sample request**:

**URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```200 OK```

### Run on demand Dataflow Gen2 job

Runs on-demand dataflow job instance.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Refresh```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Payload**:

```json
{
    "executionData": {
        "PipelineName": "Dataflow",
        "OwnerUserPrincipalName": "<name@email.com>",
        "OwnerUserObjectId": "<ObjectId>"
    }
}
```

**Sample response**:

202 Accepted

### Get Dataflow Gen2 job instance

Gets singular dataflow’s job instance.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```json
{
  "id": "<id>",
  "itemId": "<itemId?",
  "jobType": "Refresh",
  "invokeType": "Manual",
  "status": "Completed",
  "rootActivityId": "<rootActivityId>",
  "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxx",
  "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxx",
  "failureReason": null
}
```

### Cancel Dataflow job instance

Cancel a dataflow’s job instance

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}/cancel```

**Headers**:

```json
{
  "Authorization": "<bearer-token>"
}
```

**Sample response**:

```console
Location: https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/items/<itemId>/jobs/instances/<jobInstanceId>
Retry-After: 60
```

## Current limitations

- **Service Principal authentication** is not supported at the moment.
- **Get item** and **List item access details** doesn't return the correct information if you filter on dataflow item type.
- When you do not specify the type it will return the **Dataflow Gen2 (CI/CD, preview)** - the new Dataflow Gen2 with CI/CD and GIT support.
- **Run APIs** can be invoked, but the actual runs do not succeed.

## Related content

### Documentation

- [Fabric data pipeline public REST API](pipeline-rest-api.md)
- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [SPN support in Data Factory](service-principals.md)

### Tutorials

- [CRUD Items APIs in Fabric](../core/items.md)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
