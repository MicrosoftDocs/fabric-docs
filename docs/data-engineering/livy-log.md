---
title: Get Spark Livy Logs using Spark monitoring APIs.
description: Learn more how to retrieve Spark Livy Logs.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 03/18/2025
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

## Microsoft entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Get Livy log metadata

Get metadata of Livy log.

### Interface

With attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/none/{attemptId}/logs?type=livy&meta=true 
```

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/none/logs?type=livy&meta=true 
r&meta=true&containerId={containerId}&filenamePrefix={filenamePrefix}&offset={offset}&maxResults={maxResults}
```

### URI parameters
None

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | FileMetadata | Request completed successfully |

### Examples

### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/6e335e92-a2a2-4b5a-970a-bd6a89fbb765/notebooks/cfafbeb1-8037-4d0c-896e-a46fb27ff229/livySessions/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/application/none/logs?type=livy&meta=true
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

With attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=executor&containerId={containerId}&fileName={fileName}
```

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=executor&containerId={containerId}&fileName={fileName}
```

With optional parameters:

With attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=executor&containerId={containerId}&fileName={fileName}&size={size} 
```

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
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. | 
| isDownload | query | False | bool | True to download the log file as a stream. Default as false. |
| isPartial | query | False | bool | Only take effect when isDownload is true. True to download a part of file content according to the given offset and size. Default as false to download the whole file |
| offset, size | query | False | Long | The starting offset (in byte) and the size (in byte) to read the file content. Only take effect when isDownload = true and isPartial = true <br> - For offset, the default value is 0, meaning reading from the beginning of the file <br> - For size, the default value is 1M (1024*1024) bytes|

### Responses

| Name | Type | Description|
| ---- | ---- | ---- |
| 200 OK |  | Request completed successfully |

### Examples

### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/6e335e92-a2a2-4b5a-970a-bd6a89fbb765/notebooks/cfafbeb1-8037-4d0c-896e-a46fb27ff229/livySessions/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/application/none/logs?type=livy
```

## Next steps

- [Executor Log](../data-engineering/executor-log.md)
- [Driver log](../data-engineering/driver-log.md)
- [Open-Source APIs ](../data-engineering/open-source-apis.md)
