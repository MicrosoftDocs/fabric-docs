---
title: Manage Fabric materialized lake views with public APIs
description: Learn about the Fabric materialized lake views public APIs.
ms.topic: conceptual
author: rkottackal
ms.author: rkottackal
ms.reviewer: nijelsf
ms.date: 08/06/2025
ms.search.form: MLV REST API
---


The Microsoft Fabric REST API provides a service endpoint for management of Fabric items. This article describes the REST APIs available for materialized lake views REST APIs and their usage.

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

With materialized lake view APIs, data engineers and citizen developers can automate their own pipelines. These APIs also make it easy for users to manage Fabric materialized lake views and integrate it with other tools and systems.

The following **Job scheduler** actions are available for materialized lake views with user and service principle authentication:

|Action|Description|
|---------|---------|
|Create Schedule for MLV in Lakehouse|Create schedule to run lineage in MLV.|
|Get Schedule Details for MLV in Lakehouse|Get schedules for MLV.|
|Delete Schedule for MLV in Lakehouse|Delete schedules for MLV.|
|Run on demand Job for MLV in Lakehouse|Run MLV lineage as an on demand job.|
|List Job Instances for MLV in Lakehouse|Lists all job instances created for MLV |
|Get Job Instance for MLV in Lakehouse|Get details such as status of a run in MLV.|
|Cancel Job Instance for MLV in Lakehouse|Cancel an ongoing job run of lineage in MLV.|

For more information, see [Job Scheduler](/rest/api/fabric/core/job-scheduler).

> [!NOTE]
> These scenarios only cover materialized lake views-unique usage examples. Fabric item common API examples are not covered here.

## Prerequisites

* Fabric MLV REST APIs support Microsoft Entra User based access and not Service Principal [Microsoft Entra users and service principals](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). The authorization method and [scope](/rest/api/fabric/articles/scopes#specific-fabric-rest-apis-scopes) assigned in invoking REST APIs should be chosen based on how the REST APIs are accessed.
* To use the Fabric REST API, you first need to [register an application with Microsoft Entra ID](/rest/api/fabric/articles/get-started/) and [get Microsoft Entra token for Fabric service](/rest/api/fabric/articles/get-started/fabric-api-quickstart). You can then use that token in the authorization header of the REST API call.
* The Fabric Rest API defines a unified endpoint for operations. Replace the placeholders such as `{WORKSPACE_ID}` and `{LAKEHOUSE_ID}` and payload details with appropriate values when you follow the examples in this article.

Below listed are the key concepts and components in Fabric REST APIs:

- **Authentication**: Secure access to the APIs using authentication mechanisms.
- **Endpoints**: The API endpoints provide access to various lineage operations.
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate limits**: Be aware of the [rate limits](/rest/api/fabric/articles/throttling) imposed on API usage to avoid exceeding the allowed number of requests.

## Obtain an authorization token

Before you use the other REST APIs, you need to have the bearer token.

>[!IMPORTANT]
>In the following examples, ensure the word 'Bearer ' (with a space) precedes the access token itself. When using an API client and selecting 'Bearer Token' as the authentication type, 'Bearer ' is automatically inserted for you, and only requires the access token to be provided.

### Option 1: Using MSAL.Net
Refer to the [Get Token section of the Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) as an example of how to obtain the MSAL authorization token.
Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: _Workspace.ReadWrite.All_, _Item.ReadWrite.All_. For more information about token acquisition with MSAL.Net to, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Copy the token from the _AccessToken_ property and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

### Option 2: Using the Fabric portal
Sign in to the Fabric portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```azurecli
powerBIAccessToken
```

Copy the token and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

## Materialized lake views REST API usage examples
Use the following instructions to test usage examples for specific materialized lake views public APIs and verify the results.

### Create Schedule for MLV in Lakehouse

Create schedule to run lineage in MLV.

**Sample request**:

**URI**:
```http 
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules
```

**Headers**:
```
{
  "Authorization": "Bearer <access-token>", "Content-Type": "application/json"
}
```

**Request body**:
```rest
{
  "enabled": true,
  "configuration": {
    "startDateTime": "2024-04-28T00:00:00",
    "endDateTime": "2024-04-30T23:59:00",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  }
}
```

**Sample response**:
```
Location: https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/<scheduleId>
```
```rest
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "2024-04-28T05:35:20.5366667",
  "configuration": {
    "startDateTime": "2024-04-28T00:00:00",
    "endDateTime": "2024-04-30T23:59:00",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 10
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

### Get Schedule Details for MLV in Lakehouse
Get schedules for MLV

### Delete Schedule for MLV in Lakehouse
Delete schedules for MLV

### Run on demand Job for MLV in Lakehouse
Run MLV lineage as an on demand job. Spark job starts executing after a successful request.

**Request**
```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances?jobType=RefreshMaterializedLakeViews
```

**Sample response**:
```
Location: https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/lakehouses/<lakehouseId>/jobs/instances/<jobInstanceId>

Retry-After: 60
```

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the current lineage run.

### List Job Instances for MLV in Lakehouse

Lists all job instances corresponding a Lakehouse. Response items with jobType RefreshMaterializedLakeViews correspons to the runs related to materialized lake views.

**Sample request**:

**URI**: 
```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances
```

With optional parameter:
```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances?continuationToken={continuationToken}
```

**Headers**:
```rest
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:
```rest
{
  "value": [
    {
      "id": "<jobInstanceId_1>",
      "itemId": "<lakehouseId>",
      "jobType": "<jobType>",
      "invokeType": "Manual",
      "status": "<status>",
      "rootActivityId": "<rootActivityId>",
      "startTimeUtc": "2024-06-22T06:35:00.7812154",
      "endTimeUtc": "2024-06-22T06:35:00.8033333",
      "failureReason": null
    },
    {
      "id": "<jobInstanceId_2>",
      "itemId": "<lakehouseId>",
      "jobType": "<jobType>",
      "invokeType": "Manual",
      "status": "<status>",
      "rootActivityId": "rootActivityId",
      "startTimeUtc": "2024-06-22T06:35:00.7812154",
      "endTimeUtc": "2024-06-22T07:35:00.8033333",
      "failureReason": null
    }
  ],
  "continuationToken": "<continuationToken>",
  "continuationUri": "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/jobs/instances?continuationToken={continuationToken}"
}
```

### Get Job Instance details for MLV in Lakehouse
Get details such as status and id corresponsing to a run in MLV.

**Sample request**:

**URI**: 
```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}
```
**Headers**:
```rest
{
  "Authorization": "Bearer <access-token>"
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

### Cancel Job Instance for MLV in Lakehouse
Cancel an ongoing job run of lineage in MLV.

**Sample request**:

**URI**: 
```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{jobInstanceId}/cancel
```
**Headers**:
```rest
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:
```
Location: https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/lakehouses/<lakehouseId>/jobs/instances/<jobInstanceId>
Retry-after: 60
```

## Related content
- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
