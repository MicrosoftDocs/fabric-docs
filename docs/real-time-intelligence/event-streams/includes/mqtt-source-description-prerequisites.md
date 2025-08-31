---
title: Description and prerequisites for MQTT source
description: The include file provides description, a note, and prerequisites for using a Message Queueing Transport Telemetry (MQTT) source in an eventstream or in Real-Time hub. 
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 08/26/2025
---


MQTT is a publish-subscribe messaging transport protocol that was designed for constrained environments. It's the go-to communication standard for IoT scenarios due to efficiency, scalability, and reliability. Microsoft Fabric event streams allow you to connect to an MQTT broker, where messages in MQTT broker to be ingested into Fabric eventstream, and routed to various destinations within Fabric. 

> [!NOTE]
> This source is **not supported** in the following regions of your workspace capacity: **West US3, Switzerland West**.  

## Prerequisites  
Before you start, you must complete the following prerequisites: 

- Access to the Fabric premium workspace with Contributor or higher permissions.  
- Gather Username and password to connect to the MQTT broker.  
- Ensure that the MQTT broker is publicly accessible and not restricted by a firewall or a virtual network. 

To learn how to configure this setup and stream your MQTT data through **Azure Event Grid**, see [Add Azure Event Grid Namespace as a source to an eventstream (preview)](../add-source-azure-event-grid.md). 

To learn how to stream MQTT data from **Azure IoT Operations** by configuring a data flow endpoint that targets an eventstream custom endpoint, see [Configure data flow endpoints for Microsoft Fabric Real-Time Intelligence](/azure/iot-operations/connect-to-cloud/howto-configure-fabric-real-time-intelligence).