---
title:  Spark advisor API
description: This article explains how to get real-time advice of a Spark application.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 05/28/2025
---

# Spark advisor API

This article explains how to get real-time advice for a Spark application. 

## Permissions

The caller must have "read" permission on the item.

## Required delegated scopes

Item.Read.All or Item.ReadWrite.All or one of the following 3 groups (according to the item which triggered the Spark application):

- Notebook.Read.All or Notebook.ReadWrite.All
- SparkJobDefinition.Read.All or SparkJobDefinition.ReadWrite.All
- Lakehouse.Read.All or Lakehouse.ReadWrite.All

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Get advice list

### Interface

With attemptId:

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/advice
```

Without attemptId:

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/advice
```

With optional parameters:

With attemptId 

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/advice?stageId={stageId}&jobId={jobId}&executionId={executionId}&jobGroupId={jobGroupId}&executorId={executorId} 
```

Without attemptId 

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/advice?stageId={stageId}&jobId={jobId}&executionId={executionId}&jobGroupId={jobGroupId}&executorId={executorId} 
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. |
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. |
| livyId | path | True | string uuid | The Livy session ID. |
| appId | path | True | string | The Spark application ID, like application_1111111111111_0001. |
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. |
| stageId | query | False | long | The specific stage ID to get advice on. |
| jobId | query | False | long | The specific job ID to get advice on. |
| executionId | query | False | long | The specific execution (SQL query) ID to get advice on. |
| jobGroupId | query | False | string | The specific job group (statement) ID to get advice on. |
| executorId | query | False | string | The specific executor ID to get advice on. |

### Request body

None

### Response

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | An array of [AdviseDataJson](#advisedatajson) | Request completed successfully. |

### Examples

#### Sample request

```
GET https://api.fabric.microsoft.com/v1/workspaces/00aa00aa-bb11-cc22-dd33-44ee44ee44ee/notebooks/11bb11bb-cc22-dd33-ee44-55ff55ff55ff/livySessions/0a0a0a0a-1111-bbbb-2222-3c3c3c3c3c3c/applications/application_11111111111110001/1/advice  
```

#### Sample response

Status code: 200

```JSON
[
  { 
    "id": 0, 
    "name": "May return inconsistent results when using 'randomSplit'", 
    "description": "Inconsistent or inaccurate results may be returned when working with the results of the 'randomSplit' method. Use Apache Spark (RDD) caching before using the 'randomSplit' method.", 
    "helplink": "", 
    "source": "user", 
    "level": "info", 
    "stageId": -1, 
    "jobId": -1, 
    "executionId": -1, 
    "jobGroupId": "6", 
    "executorId": "" 
  } 
] 
```

## Get advice by filter

### Interface

With attemptId

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/advice/{filter}/{byId} 
```
 

Without attemptId

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/advice/{filter}/{byId} 
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. |
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. |
| livyId | path | True | string uuid | The Livy session ID. |
| appId | path | True | string | The Spark application ID, like application_1111111111111_0001. |
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. |
| filter | path | True | string | The filter name, could be any of the followings: <br> - stages <br> - jobs <br> - executions (i.e., SQL query) <br> - jobGroups (i.e., statement) <br> - executors |
| byId | path | True | long or string | The specific ID to filter <br> - long if it follows the filter of "stages", "jobs" or "executions".  <br> - string if it follows the filter of "jobGroups" or "executors".  |

### Request body

None

### Response

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | An array of [AdviseDataJson](#advisedatajson) | Request completed successfully. |

### Examples

#### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/00aa00aa-bb11-cc22-dd33-44ee44ee44ee/notebooks/11bb11bb-cc22-dd33-ee44-55ff55ff55ff/livySessions/0a0a0a0a-1111-bbbb-2222-3c3c3c3c3c3c/applications/application_11111111111110001/1/advice/jobGroups/6
```

Status code: 200

```JSON
[
  {
    "id": 0,
    "name": "May return inconsistent results when using 'randomSplit'",
    "description": "Inconsistent or inaccurate results may be returned when working with the results of the 'randomSplit' method. Use Apache Spark (RDD) caching before using the 'randomSplit' method.",
    "helplink": "",
    "source": "user",
    "level": "info",
    "stageId": -1,
    "jobId": -1,
    "executionId": -1,
    "jobGroupId": "6",
    "executorId": ""
  }
] 
```

## Definitions

### *AdviseDataJson*

Object

| Name | Type | Description |
| --- | --- | --- |
| id | long | The ID of the advice. |
| name | string | The name of the advice. |
| description | string | The description of the advice. |
| helplink | string | The web page or documentation to reference or help further. |
| detail | object | More details in rich text format. See [JsonAdviseDetail](#jsonadvisedetail) |
| source | string | Could be "System", "User" or "Dependency". |
| level | string | Could be "info", "warn" or "error". |
| stageId | long | The stage ID which the advice is provided on. Ignore stageId if its value is -1. |
| jobId | long | The job ID which the advice is provided on. Ignore jobId if its value is -1. |
| executionId | long | The execution (SQL query) ID which the advice is provided on. Ignore executionId if its value is -1. |
| jobGroupId | string | The job group (statement) ID which the advice is provided on. |
| executorId | string | The executor ID which the advice is provided on. |

### *JsonAdviseDetail*

Object

| Name | Type | Description |
| --- | --- | --- |
| data | object | Could be: [TaskError](#taskerror), [DataSkew](#dataskew), or [TimeSkew](#timeskew). |

### *TaskError*

Object

| Name | Type | Description |
| --- | --- | --- |
| name | string | The name of the error or exception. |
| tsg | string | The trouble shooting guide to follow. |
| taskTypes | string | The types of Spark tasks, could be "ResultTask", "ShuffleMapTask"... |
| helplink | string | The web page or documentation to reference or help further. |
| executorIds | string | The executor IDs. |
| stageIds | string | The stage IDs. |
| count | int | The task count. |

### *DataSkew*

Object

| Name | Type | Description |
| --- | --- | --- |
| name | string | The stage name. |
| stageId | string | The stage ID. |
| skewedTaskPercentage | string | The percentage of skewed tasks. |
| maxDataRead | string | Max data read, in MiB. |
| meanDataRead | string | Mean data read, in MiB. |
| taskDataReadSkewness | double | The data read skewness of tasks within the stage, measured by "Pearson's Second Coefficient of Skewness" |

### *TimeSkew*

Object

| Name | Type | Description |
| --- | --- | --- |
| name | string | The stage name. |
| stageId | string | The stage ID. |
| skewedTaskPercentage | string | The percentage of skewed tasks. |
| maxTaskDuration | string | Max duration, in second. |
| meanTaskDuration | string | Mean duration, in second. |
| taskDurationSkewness | double | The duration skewness of tasks within the stage, measured by "Pearson's Second Coefficient of Skewness". |
