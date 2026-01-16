---
title:  Get Spark application details using Apache Spark Open-Source APIs.
description: Learn more on how to retrieve Spark application details.
author: eric-urban
ms.author: eur
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 03/31/2025
---

# Get Spark application details using Apache Spark Open-Source APIs

Fabric Spark History Server APIs follow the same structure, query parameters, and contract as [Spark open source monitoring REST API](https://spark.apache.org/docs/latest/monitoring.html#rest-api) and provide the same set of endpoints for retrieving Spark application details, including basic application information, stages, jobs, tasks, executors, storage, streaming, and more.

> [!NOTE]
>
> The /applications endpoint, which retrieves a list of all applications, and the /version endpoint, which gets the current Spark version, are the only endpoints not supported here. However, as an alternative of /applications endpoint, you can obtain a list of Spark applications for a specific Fabric workspace or item using other available monitoring APIs.

## Permissions

The caller must have "read" permission on the item

## Required delegated scopes

Item.Read.All or Item.ReadWrite.All or one of the following three groups (according to the item which triggered the Spark application)

- Notebook.Read.All or Notebook.ReadWrite.All
- SparkJobDefinition.Read.All or SparkJobDefinition.ReadWrite.All
- Lakehouse.Read.All or Lakehouse.ReadWrite.All

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Interface

With attemptId:

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/...
```

Without attemptId:

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/...
```

## URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. |
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. |
| livyId | path | True | string uuid | The Livy session ID. |
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. |
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. |

## Examples

### Sample request 1: Get details of a specific job in a Spark application

```
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/applications/application_1742369571479_0001/jobs/1 
```

### Sample response 1

Status code: 200

```JSON
{ 
    "jobId": 1, 
    "name": "save at <console>:38", 
    "description": "Accelerate the processing of subsequent queries", 
    "submissionTime": "2025-03-19T07:33:40.386GMT", 
    "completionTime": "2025-03-19T07:33:46.102GMT", 
    "stageIds": [ 
                    1, 
                    2 
                ], 
    "jobGroup": "SystemJob", 
    "jobTags": [], 
    "status": "SUCCEEDED", 
    "numTasks": 4, 
    "numActiveTasks": 0, 
    "numCompletedTasks": 1, 
    "numSkippedTasks": 3, 
    "numFailedTasks": 0, 
    "numKilledTasks": 0, 
    "numCompletedIndices": 1, 
    "numActiveStages": 0, 
    "numCompletedStages": 1, 
    "numSkippedStages": 1, 
    "numFailedStages": 0, 
    "killedTasksSummary": {} 
} 
```

### Sample request 2: Get details of a specific SQL query in a Spark application

```
GET  https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/applications/application_1742369571479_0001/sql/1?details=false 
```

### Sample response 2

Status code: 200

```JSON
{ 
    "id": 1, 
    "status": "COMPLETED", 
    "description": "Accelerate the processing of subsequent queries", 
    "planDescription": "== Physical Plan ==\nLocalTableScan (1)\n\n\n(1) LocalTableScan\nOutput [2]: [CommonName#7, ScientificName#8]\nArguments: [CommonName#7, ScientificName#8]\n\n", 
    "submissionTime": "2025-03-19T07:33:38.090GMT", 
    "duration": 8020, 
    "runningJobIds": [], 
    "successJobIds": [ 
                0, 
                1 
        ], 
    "failedJobIds": [], 
    "nodes": [], 
    "edges": [] 
} 
```

### Sample request 3: Get event log of a specific attempt in a Spark application

```
GET https://api.fabric.microsoft.com/v1/workspaces/ddddeeee-3333-ffff-4444-aaaa5555bbbb/notebooks/eeeeffff-4444-aaaa-5555-bbbb6666cccc/livySessions/ffffaaaa-5555-bbbb-6666-cccc7777dddd/applications/application_1741176604085_0001/1/logs  
```

### Sample response 3

Not shown because it is unreadable code
