---
title: Fabric Workspace Item events - prerequisites
description: The include file has the prerequisites for using Fabric Workspace Item events connector for Fabric event streams
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/02/2026
---

Fabric workspace item events are discrete Fabric events that occur when contents of your Fabric Workspace are changed. These changes include creating, updating, or deleting of Fabric items except for the item types listed in the following note.
[!INCLUDE [unsupported-itemtypes-in-workspaceevents](unsupported-itemtypes-in-workspaceevents.md)]

With Fabric eventstreams, you can capture these Fabric workspace events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric workspace events within Fabric eventstreams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Here are the supported Fabric workspace events:

- Microsoft.Fabric.ItemCreateSucceeded
- Microsoft.Fabric.ItemCreateFailed
- Microsoft.Fabric.ItemUpdateSucceeded
- Microsoft.Fabric.ItemUpdateFailed
- Microsoft.Fabric.ItemDeleteSucceeded
- Microsoft.Fabric.ItemDeleteFailed

[!INCLUDE [consume-fabric-events-regions](consume-fabric-events-regions.md)]
[!INCLUDE [deprecated-fabric-workspace-events](deprecated-fabric-workspace-events.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- A Fabric workspace with events you want to track.