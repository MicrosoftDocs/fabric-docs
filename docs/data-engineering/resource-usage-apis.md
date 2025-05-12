---
title: Resource usage APIs
description: Learn more on how to get resource usage APIs.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 05/12/2025
---

# Resource usage APIs

Retrieve resource usage APIs.

## Get resource usage timeline

Get all resource usage information as a timeline. 

### Permissions

The caller must have "read" permission on the item.

### Required Delegated Scopes

Item.Read.All or Item.ReadWrite.All or one of the following 3 groups (according to the item which triggered the Spark application)

- Notebook.Read.All or Notebook.ReadWrite.All 
- SparkJobDefinition.Read.All or SparkJobDefinition.ReadWrite.All
- Lakehouse.Read.All or Lakehouse.ReadWrite.All

### Microsoft Entra supported identifies

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

### Interface

With attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/resourceUsage 
```

Without attemptId 
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/resourceUsage
```

With optional parameters

With attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/resourceUsage?jobGroup={jobGroup}&jobLimit={jobLimit}&executorLimit={executorLimit}&executorJobLimit={executorJobLimit}&start={start}&end={end}
```

Without attemptId 
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/resourceUsage?jobGroup={jobGroup}&jobLimit={jobLimit}&executorLimit={executorLimit}&executorJobLimit={executorJobLimit}&start={start}&end={end}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. |
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. |
| jobGroup | query | False | string | Only list the timeline of jobs within the given jobGroups. Multiple jobGroups could be specified as: ?jobGroup=1&jobGroup=2 |
| jobLimit | query | False | int | The max number of jobs to list per time point. |
| executorLimit | query | False | int | The max number of executors to list per time point.|
| executorJobLimit | query | False | int | The max number of executor-job info to list per time point.|
| start / end | query | False | long | The lower and upper bound of time points to list.|

### Request Body

None 

### Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK | [ResourceUsageInfo](#resourceusageinfo) | Request completed successfully |
| 400 Bad Request |   | Invalid parameter. start is greater than end |
| 403 Forbidden |  | User does not have the correct permission |
| 404 Not Found |   |  - Mismatch between item id, application id and Livy id <br> - Too early to retrieve any resource usage data |

### Examples

#### Sample request

```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/6e335e92-a2a2-4b5a-970a-bd6a89fbb765/notebooks/cfafbeb1-8037-4d0c-896e-a46fb27ff229/livySessions/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/applications/application_1731308630223_0001/1/resourceUsage?start=1745906291774&end=1745906293676
```

#### Sampe response
Status code: 200

```JSON
{ 
  { 
   "resourceUsageApiVersion" : 2, 
   "duration" : 131903, 
   "capacityExceeded" : false, 
   "idleTime" : 120869, 
   "coreEfficiency" : 0.08070419171664026, 
   "data" : { 
      "timestamps" : [ 1745906291774, 1745906292471, 1745906292731], 
      "isPartials" : [ false, false, false ], 
      "allocatedCores" : [ 8.0, 8.0, 8.0 ], 
      "idleCores" : [ 0.0, 0.0, 1.0 ], 
      "runningCores" : [ 8.0, 8.0, 7.0 ], 
      "executors" : [ [ [ "1", 8.0, 12 ] ], [ [ "1", 8.0, 9 ] ], [ [ "1", 7.0, 7 ] ] ], 
      "jobs" : [ [ [ 9, 12 ] ], [ [ 9, 9 ] ], [ [ 9, 7 ] ] ], 
      "executorJobs" : [ [ [ "1", [ [ 9, 12 ] ] ] ], [ [ "1", [ [ 9, 9 ] ] ] ], [ [ "1", [ [ 9, 7 ] ] ] ] ]
    }
  }
}  
```

### Definitions

#### *ResourceUsageInfo*

object

| Name | Type | Description |
| --- | --- | --- |
| resourceUsageApiVersion | int | The version of resource usage API. |
| duration | long | The duration of the given Spark application, in milli-second. |
| capacityExceeded | bool | True if the limitation of 10k tasks exceeds. When true, all properties in data are empty. |
| idleTime | long | The duration when the given Spark application is in idle, in milli-second. |
| coreEfficiency | double | The overview usage rate of executor cores. |
| data | [ResourceUsageData](#resourceusagedata) |   |

#### *ResourceUsageData*

object

| Name | Type | Description |
| --- | --- | --- |
| timestamps | An array of long |   |
| isPartials | an array of bool | Any filter applied due to limit at the corresponding timestamp. |
| allocated/idle/runningCores | an array of double | Count of cores with different status at the corresponding timestamp. |
| executors | a two-dimensional array of [ResourceUsageExecutor](#resourceusageexecutor)  | Per-executor core and task information at the corresponding timestamp. |
| jobs | a two-dimensional array of [ResourceUsageJob](#resourceusagejob)  | Per-job task information at the corresponding timestamp. |
| executorJobs | a two-dimensional array of [ResourceUsageExecutorJob](#resourceusageexecutorjob) | Per-executor job information at the corresponding timestamp. |

#### *ResourceUsageExecutor*

Object

Per-executor core and task information

| Name | Type | Description |
| --- | --- | --- |
| executorId | string | Executor ID |
| coreCount | int | Count of running cores on the executor |
| taskCount | int | Count of running tasks on the executor |

#### *ResourceUsageJob*

Object

Per-job task information 

| Name | Type | Description |
| --- | --- | --- |
| jobId | int | Job ID |
| taskCount | int | Count of running tasks of the job. |

#### *ResourceUsageExecutorJob*

Object 

Per-executor job information

| Name | Type | Description |
| --- | --- | --- |
| executorId | string | Executor ID |
| resourceUsageJob | An array of [ResourceUsageJob](#resourceusagejob) | Running jobs which have tasks running on the executor. |

## Get resource usage snapshot

Get resource usage information at the time point which is closest to the given timestamp. 

### Permissions

The caller must have "read" permission on the item 

### Required Delegated Scopes

Item.Read.All or Item.ReadWrite.All or one of the following 3 groups (according to the item which triggered the Spark application) 

- Notebook.Read.All or Notebook.ReadWrite.All 
- SparkJobDefinition.Read.All or SparkJobDefinition.ReadWrite.All 
- Lakehouse.Read.All or Lakehouse.ReadWrite.All 

### Microsoft Entra supported identifies

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section. 

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

### Interface

With attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/resourceUsage/{timestamp}
```

Without attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/resourceUsage/{timestamp}
```

With optional parameters:

With attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/{attemptId}/resourceUsage/{timestamp}?jobGroup={jobGroup}&jobLimit={jobLimit}&executorLimit={executorLimit}
```

Without attemptId
```HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks|sparkJobDefinitions|lakehouses/{itemId}/livySessions/{livyId}/applications/{appId}/resourceUsage{timestamp}?jobGroup={jobGroup}&jobLimit={jobLimit}&executorLimit={executorLimit}
```

### URI parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| workspaceId | path | True | string uuid | The workspace ID. | 
| itemId | path | True | string uuid | The item ID of the notebook or Spark job definition or Lakehouse. | 
| livyId | path | True | string uuid | The Livy session ID. | 
| appId | path | True | string | The Spark application ID, like application_1704417105000_0001. | 
| attemptId | path | False | int | The attempt ID of that application ID. If not specified, the ID of last attempt is used. |
| timestamp | path | True | long | The specific timestamp to query |
| jobGroup | query | False | string | Only list the timeline of jobs within the given jobGroups. Multiple jobGroups could be specified as: ?jobGroup=1&jobGroup=2 |
| jobLimit | query | False | int | The max number of jobs to list |
| executorLimit | query | False | int | The max number of executors to list |

### Request Body 
None

### Responses

| Name | Type | Description|
| ---- | ---- | ---- |
| 200 OK | [ResourceUsageSnapshot](#resourceusagesnapshot) | Request completed successfully |
| 403 Forbidden |   | User does not have the correct permission |
| 404 Not Found |   | - Mismatch between item id, application id and Livy id <br> - Too early to retrieve any resource usage data |

### Examples

#### Sample request

``` HTTP
GET https://api.fabric.microsoft.com/v1/workspaces/6e335e92-a2a2-4b5a-970a-bd6a89fbb765/notebooks/cfafbeb1-8037-4d0c-896e-a46fb27ff229/livySessions/431e8d7b-4a95-4c02-8ccd-6faef5ba1bd7/applications/application_1731308630223_0001/1/resourceUsage/1745906291774
```
#### Sampe response 
Status code: 200 

```JSON
{ 
   "queryTime" : 1745906291774, 
   "data" : { 
   "timestamp" : 1745906291774, 
   "isPartial" : false, 
   "allocatedCores" : 8.0, 
   "idleCores" : 0.0, 
   "runningCores" : 8.0, 
   "executors" : [ [ "1", 8.0, 12 ] ], 
   "jobs" : [ [ 9, 12 ] ], 
   "executorJobs" : [ [ "1", [ [ 9, 12 ] ] ] ] 
   }
}  
```

### Definitions

#### *ResourceUsageSnapshot* 

Object

| Name | Type | Description |
| --- | --- | --- |
| queryTime | long | The timestamp specified in the request  |
| data | [ResourceUsageSnapshotData](#resourceusagesnapshotdata)  |   |

#### *ResourceUsageSnapshotData*

object

| Name | Type | Description |
| --- | --- | --- |
| timestamps |long | Timestamp of the time point which is closest to the given timestamp. |
| isPartials | bool | Any filter applied due to limit at the timestamp. |
| allocated/idle/runningCores | double | Count of cores with different status at the timestamp. |
| executors | An array of [ResourceUsageExecutor](#resourceusageexecutor)  | Per-executor core and task information at the timestamp. |
| jobs | an array of [ResourceUsageJob](#resourceusagejob)  | Per-job task information at the timestamp. |
| executorJobs | an array of [ResourceUsageExecutorJob](#resourceusageexecutorjob) | Per-executor job information at the timestamp. |