---
title: Cribl connector - prerequisites
description: This file has the prerequisites for configuring a Cribl connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/02/2026
---


The Cribl source for Eventstream allows you to stream data from Cribl Stream into Fabric Eventstream. You can add Cribl as a source to your eventstream to capture, transform, and route real-time events to various destinations in Fabric.

## Prerequisites

- A Worker Group is set up in Cribl Stream with the required permissions to configure destinations.
- **Contributor** or higher Fabric workspace permissions are required to edit the eventstream to add a Cribl source.
- If you want to use **OAUTHBEARER** authentication to connect your Cribl, you need Member or higher Fabric workspace permissions.
- An eventstream in Fabric. If you don’t have one, [create an eventstream](create-manage-an-eventstream.md).  