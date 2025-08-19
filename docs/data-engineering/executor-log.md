---
title: Get Spark executor logs using Spark monitoring APIs.
description: Learn more on how to retrieve Spark Executor Logs.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 03/31/2025
---

# Get Spark executor logs using Spark monitoring APIs

This article explains how to get Spark Executor Logs.

## Permissions 

The caller must have "read" permission on the item.

## Required delegated scopes

Item.Read.All or Item.ReadWrite.All or one of the following three groups (according to the item which triggered the Spark application).

- Notebook.Read.All or Notebook.ReadWrite.All 
- SparkJobDefinition.Read.All or SparkJobDefinition.ReadWrite.All 
- Lakehouse.Read.All or Lakehouse.ReadWrite.All 

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Get executor log metadata

Get metadata(s) of log file(s) of executors of a Spark application.

### Interface

With attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=executor&meta=true
```

Without attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=executor&meta=true
```

With optional parameters:

With attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=executor&meta=true&filenamePrefix={filenamePrefix}&offset={offset}&maxResults={maxResults}
```

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=executor&meta=true&containerId={containerId}&filenamePrefix={filenamePrefix}&offset={offset}&maxResults={maxResults}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. | 
| containerId  | query  | False  | string  | The specific container ID to filter. If not specified, no filter is applied onto container ID. |
| filenamePrefix | query | False | string | The prefix of log file names to filter.  If not specified, no filter is applied onto file names. |
| offset, maxResults | query | False | int | The starting index and number of log files to get: <br> - For offset, the minimum is 0. The default value is 0. <br> - For maxResults, the valid range is 1 to 3,000. The default value is 3,000|

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | A list of [ContainerLogMeta](./driver-log.md#definitions) | Request completed successfully |

### Examples

### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/application_1724388946961_0001/logs?type=executor&meta=true&filenamePrefix=stdout 
```

### Sample response

Status code: 200 

```JSON
[ 
      { 
         "containerId": "container_1724388946961_0001_01_000001", 
         "nodeId": "vm-fa250420:38259", 
         "containerLogMeta": [ 
            { 
               "fileName": "stdout", 
               "fileSize": "508", 
               "lastModifiedTime": "Fri Aug 23 04:56:14 +0000 2024" 
            },
            { 
               "fileName": "stdout-active", 
               "fileSize": "0", 
               "lastModifiedTime": "Fri Aug 23 04:56:14 +0000 2024" 
            }
      ]
   }, 
   { 
         "containerId": "container_1724388946961_0001_01_000002", 
         "nodeId": "vm-90240157:35195", 
         "containerLogMeta": [ 
         { 
            "fileName": "stdout", 
            "fileSize": "508", 
            "lastModifiedTime": "Fri Aug 23 04:56:45 +0000 2024" 
         },
         { 
            "fileName": "stdout-active", 
            "fileSize": "0", 
            "lastModifiedTime": "Fri Aug 23 04:56:47 +0000 2024" 
         }
      ] 
   },
   {
         "containerId": "container_1724388946961_0001_01_000003", 
         "nodeId": "vm-fa250420:38259", 
         "containerLogMeta": [ 
         {
            "fileName": "stdout", 
            "fileSize": "508", 
            "lastModifiedTime": "Fri Aug 23 04:56:39 +0000 2024" 
         },
         {
            "fileName": "stdout-active", 
            "fileSize": "0", 
            "lastModifiedTime": "Fri Aug 23 04:56:41 +0000 2024" 
         } 
      ] 
   } 
] 
```

## Get executor log content

Get log file content of an executor of a Spark application.

### Interface

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=executor&containerId={containerId}&fileName={fileName}
```

With optional parameters:

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=executor&containerId={containerId}&fileName={fileName}&size={size}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| containerId   | query | True | string | The specific container ID where executor is hosted. |
| fileName | query | True  | string | The specific file name to get the content of |
| size | query | False  | long | The size (in byte) to read from the beginning of the file content. The default value is 1M (1024*1024) bytes |

### Examples

### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/application_1731308630223_0001/logs?type=executor&containerId=container_1704417105000_0001_01_000001&fileName=stdout
```
