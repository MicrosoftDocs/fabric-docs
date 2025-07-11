---
title: Manage Fabric materialized lake views with public APIs
description: Learn about the Fabric materialized lake views public APIs.
ms.reviewer: snehagunda
ms.author: rkottackal
author: 
ms.topic: conceptual
ms.custom:
ms.date: 08/07/2025
ms.search.form: MLV REST API
---


The Microsoft Fabric REST API provides a service endpoint for management of Fabric items. This article describes the REST APIs available for materialized lake views REST APIs and their usage.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

With materialized lake view APIs, data engineers and citizen developers can automate their own pipelines. These APIs also make it easy for users to manage Fabric materialized lake views and integrate it with other tools and systems.

The following **Job scheduler** actions are available for materialized lake views with user and service principle authentication:

|Action|Description|
|---------|---------|
|Run on demand Item Job|Run MLV lineage as an on demand job.|
|Create Item Schedule|Create schedule to run lineage in MLV.|
|Get Item Job Instance|Get details such as status of a run in MLV.|
|Cancel Item Job Instance|Cancel an ongoing job run of lineage in MLV.|

For more information, see [Job Scheduler](/rest/api/fabric/core/job-scheduler).

> [!NOTE]
> These scenarios only cover materialized lake views-unique usage examples. Fabric item common API examples are not covered here.

## Prerequisites

* Fabric MLV REST APIs support [Microsoft Entra users and service principals](/fabric/admin/service-admin-portal-developer#service-principals-can-call-fabric-public-apis). The authorization method and [scope](/rest/api/fabric/articles/scopes#specific-fabric-rest-apis-scopes) assigned in invoking REST APIs should be chosen based on how the REST APIs are accessed.
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

### Run on demand item job

Run MLV lineage as an on demand job. Spark job starts executing after a successful request.

**Request**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances?jobType=RefreshMaterializedLakeViews
```

**Sample response**:

```
Location: https://api.fabric.microsoft.com/v1/workspaces/4b218778-e7a5-4d73-8187-f10824047715/lakehouses/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/jobs/instances/f2d65699-dd22-4889-980c-15226deb0e1b

Retry-After: 60
```

With `location`, you can use [Get Item Job Instance](/rest/api/fabric/core/job-scheduler/get-item-job-instance) to view job status or use [Cancel Item Job Instance](/rest/api/fabric/core/job-scheduler/cancel-item-job-instance) to cancel the current lineage run.

### Create Item Schedule

Create schedule to run lineage in MLV.

**Sample request**:

**URI**: 
```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>", "Content-Type": "application/json"
}
```

**Sample request**:
```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules```
````
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
Location: https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/235faf08-6ca0-488d-a2ca-6d706d530ebc
```

```rest
{
  "id": "235faf08-6ca0-488d-a2ca-6d706d530ebc",
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
    "id": "8eedb1b0-3af8-4b17-8e7e-663e61e12211",
    "type": "User"
  }
}
```

### Get Item Job Instance

Get details such as status of a run in MLV.

**Sample request**:

**URI**: 
```http
GET https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/instances/{jobInstanceId}```

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

### Cancel item job instance

Cancel an ongoing job run of lineage in MLV.

**Sample request**:

**URI**: 
```http
POST https://api.fabric.microsoft.com/v1/workspaces/{WORKSPACE_ID}/lakehouses/{LAKEHOUSE_ID}/jobs/RefreshMaterializedLakeViews/schedules/{jobInstanceId}/cancel```

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

Refer to the following content for more information on Fabric REST APIs.

### Documentation

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
