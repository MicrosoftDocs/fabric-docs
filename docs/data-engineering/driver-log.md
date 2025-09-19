---
title: Get Spark driver logs using Spark monitoring APIs.
description: Learn how to retrieve Spark driver logs.  
author: eric-urban
ms.author: eur
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 03/31/2025
---

# Get Spark driver logs using Spark monitoring APIs

This article explains how to get Spark driver logs. 

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

## Get driver log metadata 

Get metadata of a log file of driver of a Spark application.

### Interface

With attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=driver&meta=true&fileName={fileName} 
```

Without attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=driver&meta=true&fileName={fileName} 
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. | 
| fileName | query | True | string | The specific file name to get the metadata of. | 

### Request body

None

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | [ContainerLogMeta](#definitions) | Request completed successfully |

### Examples

### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/applications/application_1741176604085_0001/logs?type=driver&meta=true&fileName=stderr 
```

### Sample response

Status code: 200 

```JSON
{ 
   "containerId": "container_1741176604085_0001_01_000001", 
   "nodeId": "vm-76895939:44851" 
   "containerLogMeta": { 
      "fileName": "stderr", 
      "length": 99067, 
      "lastModified": "2025-03-05T12:31:31.000GMT", 
      "creationTime": "2025-03-05T10:30:30.000GMT", 
      "metaData": {} 
   } 
} 
```

## Get rolling driver log metadata

Get metadata of rolling log files of driver of a Spark application.

### Interface

With attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=rollingdriver&meta=true 
```

Without attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=rollingdriver&meta=true
```

With optional parameters:

With attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=rollingdriver&meta=true&filenamePrefix={filenamePrefix}&offset={offset}&maxResults={maxResults}
```

Without attemptId

```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=rollingdriver&meta=true&filenamePrefix={filenamePrefix}&offset={offset}&maxResults={maxResults}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. | 
| filenamePrefix  | query | False  | string | The prefix of log file names to filter, could be either "stdout" or "stderr". |
| offset, maxResults   | query | False  | int |  The starting index and number of log files to get:<br>- For offset, it starts from 0. The valid range is 0 to 20,000. The default value is 0. <br>- For maxResults, the valid range is 1 to 3,000. The default value is 3,000. |

### Request body

None

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | [ContainerLogMeta](#definitions) | Request completed successfully |

### Examples

### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/application_1725346176782_0001/logs?type=rollingdriver &meta=true&filenamePrefix=stderr
```

### Sample response

Status code: 200

```Json
{
	"containerId": "container_1725346176782_0001_01_000001",
	"nodeId": "vm-fe289417:42885",
	"containerLogMeta": [
		{
			"fileName": "stderr",
			"length": 205541,
			"lastModified": "2024-09-03T07:10:31.000GMT",
			"metaData": {}
		},
		{
			"fileName": "stderr-2024-09-03-06",
			"length": 100030,
			"lastModified": "2024-09-03T06:50:45.000GMT",
			"metaData": {}
		},
		{
			"fileName": "stderr-active",
			"length": 105511,
			"lastModified": "2024-09-03T07:10:31.000GMT",
			"metaData": {}
		}
	]
}
```

## Get driver log content

Get log file content of driver of a Spark application.

### Interface

With attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=driver&fileName={fileName}
```

Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=driver&fileName={fileName} 
```

With optional parameters:

With attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/logs?type=driver&fileName={fileName}&containerId={containerId}&isDownload={isDownload}&isPartial={isPartial}&offset={offset}&size={size}
```
Without attemptId
```HTTP
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/logs?type=driver&fileName={fileName}&containerId={containerId}&isDownload={isDownload}&isPartial={isPartial}&offset={offset}&size={size}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. | 
| fileName | query | True | string | The specific file name to get the content of |
| containerId | query | False | string | The specific driver container ID. Leave it not specified if you aren't sure what the driver container ID is. |
| isDownload | query | False | bool | True to download the log file as a stream. Default as false. |
| isPartial | query | False | bool | Only take effect when isDownload is true. True to download a part of file content according to the given offset and size. Default as false to download the whole file. |
| offset, size   | query | False  | long | The starting offset (in byte) and the size (in byte) to read the file content. Only take effect when isDownload = true and isPartial = true <br>- For offset, it starts from 0. The valid range is 0 to 20,000. The default value is 0.<br>- For size, the default value is 1M (1024*1024) bytes. <br> *Note that the parameter "offset" is only valid while the Spark application is still running. Once the application stops running, the parameter will have no effect. Consider using rolling driver logs instead.* |

### Request body

None

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK |  | Request completed successfully |

### Examples

### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/notebooks/bbbbcccc-1111-dddd-2222-eeee3333ffff/livySessions/ccccdddd-2222-eeee-3333-ffff4444aaaa/application/application_1731308630223_0001/logs?type=driver&fileName=stderr&isDownload=true&isPartial=true&offset=100&size=1000
```

## Definitions 
*ContainerLogMeta* 

Object 

Metadata(s) of log file(s) with the corresponding container and node information 

| Name | Type | Description |
| --- | --- | --- |
| containerId  | string | The container ID where driver or executor is hosted in |
| nodeId | string | The node ID where the container locates |
| containerLogMeta  | A single [FileMeta](./livy-log.md#definitions) or a list of [FileMeta](./livy-log.md#definitions) | The metadata(s) of a file or a list of files |
