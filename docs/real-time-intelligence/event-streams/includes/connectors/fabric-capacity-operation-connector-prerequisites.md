---
title: Fabric capacity operation events connector - prerequisites
description: The include file has the prerequisites for Fabric capacity operation events connector for Fabric event streams and Real-Time hub. 
ms.reviewer: sruikar
ms.topic: include
ms.date: 08/21/2026
---

[!INCLUDE [consume-fabric-events-regions](consume-fabric-events-regions.md)]

Fabric Capacity Operation Events provide granular, per-operation information about workload activity that consumes capacity units (CUs) on your Fabric capacity. Use these events to create alerts related to your capacity operations via Data Activator or store them in an Eventhouse for granular or historical analysis.

By using Fabric event streams, you can capture these Fabric capacity operation events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric capacity operation events within Fabric event streams gives you granular visibility into which workspaces, items, workloads, and identities are consuming CU on your capacity.

Fabric event streams support the following Fabric capacity operation events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.CapacityOperationEvents.Operation | Emitted for every operation that consumes capacity. |


## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions.  
- A Fabric capacity where you have capacity admin role.
