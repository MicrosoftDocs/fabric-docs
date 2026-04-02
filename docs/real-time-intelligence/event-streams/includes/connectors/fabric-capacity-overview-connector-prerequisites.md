---
title: Fabric capacity overview events connector - prerequisites
description: The include file has the prerequisites for Fabric capacity overview events connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/02/2026
---

Fabric Capacity Overview Events provide summary level information related to your capacity. These events can be used to create alerts related to your capacity health via Data Activator or can be stored in an Eventhouse for granular or historical analysis.

With Fabric event streams, you can capture these Fabric capacity overview events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric capacity overview events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Fabric event streams support the following Fabric capacity overview events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.Capacity.Summary | Emitted every 30 seconds to summarize the capacity usage across all operations during that interval. |
| Microsoft.Fabric.Capacity.State | Emitted when a capacity’s state changes. For example, when a capacity is paused or resumed. |

> [!NOTE]
> Consuming Fabric and Azure events via Eventstream or Fabric Activator isn't supported if the capacity region of the Eventstream or Fabric Activator is in the following regions: West India, Qatar Central, Singapore, UAE Central, Brazil Southeast.


## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- A Fabric capacity where you have capacity admin role.
