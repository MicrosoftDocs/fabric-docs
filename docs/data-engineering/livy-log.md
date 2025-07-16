---
title: Get Spark Livy Logs using Spark monitoring APIs.
description: Learn more on how to retrieve Spark Livy Logs.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 03/31/2025
---

# Get Spark Livy Logs using Spark monitoring APIs

Retrieve Spark Livy Logs.

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

## Get Livy log metadata

Get metadata of Livy log.

### Interface

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/none/logs?type=livy&meta=true
```

### URI parameters

None

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | [FileMeta](#definitions) | Request completed successfully |

### Examples

### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/none/logs?type=livy&meta=true
```

Status code: 200

```JSON
{ 
   "fileName": "livy.log",
   "length": 34723, 
   "lastModified": "2025-03-05T12:11:17.000GMT", 
   "creationTime": "2025-03-05T12:10:42.000GMT", 
   "metaData": {} 
} 
```

## Get Livy log content

Get file content of Livy log.

### Interface

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/none/logs?type=livy
```

With optional parameters:

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/none/logs?type=livy&isDownload={isDownload}&isPartial={isPartial}&offset={offset}&size={size}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| isDownload | query | False | bool | True to download the log file as a stream. Default as false. |
| isPartial | query | False | bool | Only take effect when isDownload is true. True to download a part of file content according to the given offset and size. Default as false to download the whole file |
| offset, size | query | False | Long | The starting offset (in byte) and the size (in byte) to read the file content. Only take effect when isDownload = true and isPartial = true <br> - For offset, the default value is 0, meaning reading from the beginning of the file <br> - For size, the default value is 1M (1024*1024) bytes|

### Responses

| Name | Type | Description|
| ---- | ---- | ---- |
| 200 OK | [FileMeta](#definitions) | Request completed successfully |

### Examples

### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/none/logs?type=livy
```

## Definitions
*FileMeta* 

Object

Metadata of a log file

| Name | Type | Description |
| --- | --- | --- |
| fileName | string | File name |
| length | long | The size of the file, in byte |
| lastModified | string | The last time when the file was modified |
| creationTime | string | The time when the file was created |
| metaData | map of string to string | Auxiliary data if there is any |
