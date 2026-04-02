---
title: Fabric Job events connector - prerequisites
description: The include file has the prerequisites for using Fabric Job events connector for Fabric event streams and Real-Time hub. 
ms.reviewer: robece
ms.topic: include
ms.date: 04/02/2026
---

[!INCLUDE [consume-fabric-events-regions](consume-fabric-events-regions.md)]

Job events allow you to subscribe to changes produced when Fabric runs a job. For example, you can react to changes when refreshing a semantic model, running a scheduled pipeline, or running a notebook. Each of these activities can generate a corresponding job, which in turn generates a set of corresponding job events. 

With Fabric event streams, you can capture these Job events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Job events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Job.

## Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemJobCreated | Raised when the Fabric platform creates or triggers a job, manually or scheduled. |
| Microsoft.Fabric.ItemJobStatusChanged | Raised when the job status changes to another non-terminal state. <p>This event isn't raised if the workload doesn't push when the status changes. The job status might change from created to completed soon. 
| Microsoft.Fabric.ItemJobSucceeded | Raised when the job completes. |     
| Microsoft.Fabric.ItemJobFailed | Raised when the job fails, including job getting stuck or canceled. |

## Prerequisites

- Get access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- [Create an eventstream](create-manage-an-eventstream.md) if you don't already have an eventstream.