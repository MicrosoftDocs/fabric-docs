---
title: Fabric OneLake events connector - prerequisites
description: The include file has the prerequisites for using Fabric OneLake events connector for Fabric event streams
ms.reviewer: robece
ms.topic: include
ms.date: 04/02/2026
---

[!INCLUDE [consume-fabric-events-regions](consume-fabric-events-regions.md)]

OneLake events allow you to subscribe to changes in files and folders in OneLake, and then react to those changes in real-time. With Fabric event streams, you can capture these OneLake events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of OneLake events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your OneLake.

## Event types
Here are the supported OneLake events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.OneLake.FileCreated | Raised when a file is created or replaced in OneLake. |
| Microsoft. Fabric.OneLake.FileDeleted | Raised when a file is deleted in OneLake. |
| Microsoft. Fabric.OneLake.FileRenamed | Raised when a file is renamed in OneLake. | 
| Microsoft.Fabric.OneLake.FolderCreated | Raised created when a folder is created in OneLake. | 
| Microsoft. Fabric.OneLake.FolderDeleted | Raised when a folder is deleted in OneLake. | 
| Microsoft. Fabric.OneLake.FolderRenamed | Raised when a folder is renamed in OneLake. | 

## Prerequisites

- Get access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.