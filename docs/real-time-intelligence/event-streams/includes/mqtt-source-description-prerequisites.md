---
title: Description and prerequisites for MQTT source
description: The include file provides description, a note, and prerequisites for using a Message Queueing Transport Telemetry (MQTT) source in an eventstream or in Real-Time hub. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 01/26/2026
---

Message Queuing Telemetry Transport (MQTT) is a lightweight publish-subscribe messaging protocol designed for constrained environments and widely used for Internet of Things (IoT) scenarios. The MQTT Connector for Fabric Eventstream allows you to connect to any MQTT broker and ingest messages directly into Eventstream, enabling real-time transformation and routing to various destinations within Fabric for analytics and insights.

## Prerequisites

Before you start, you must complete the following prerequisites:

- A workspace with **Fabric** capacity or **Fabric Trial** workspace type.
- Access to the workspace with **Contributor** or higher workspace roles.
- Ensure that the MQTT broker is publicly accessible and not restricted by a firewall or a virtual network.

Depending on your scenario, you can also use one of the following approaches to stream MQTT data to Eventstream:

- **Azure Event Grid**: Send MQTT data to Azure Event Grid and set up an **Azure Event Grid** connector in Eventstream. For more information, see [Add Azure Event Grid Namespace as a source to an eventstream](../add-source-azure-event-grid.md).
- **Azure IoT Operations**: Configure a data flow endpoint that connects to an Eventstream **Custom Endpoint**. For more information, see [Configure data flow endpoints for Microsoft Fabric Real-Time Intelligence](/azure/iot-operations/connect-to-cloud/howto-configure-fabric-real-time-intelligence).
