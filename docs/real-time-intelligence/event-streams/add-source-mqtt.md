---
title: Add MQTT source to an eventstream
description: Learn how to add a Message Queuing Telemetry Transport (MQTT) source to an eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: how-to
ms.date: 03/14/2025
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add MQTT source to an eventstream (preview)
This article shows you how to add an MQTT source to an eventstream. 

MQTT is a publish-subscribe messaging transport protocol that was designed for constrained environments. It's the go-to communication standard for IoT scenarios due to efficiency, scalability, and reliability. Microsoft Fabric event streams allow you to connect to an MQTT broker, where messages in MQTT broker to be ingested into Fabric eventstream, and routed to various destinations within Fabric. 

> [!NOTE]
> This source is **not supported** in the following regions of your workspace capacity: **West US3, Switzerland West**.  

## Prerequisites  
Before you start, you must complete the following prerequisites: 

- Access to the Fabric premium workspace with Contributor or higher permissions.  
- Gather Username and password to connect to the MQTT broker.  
- Ensure that the MQTT broker is publicly accessible and not restricted by a firewall or a virtual network. 

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MQTT** tile.

:::image type="content" source="./media/add-source-mqtt/select-mqtt.png" alt-text="Screenshot that shows the selection of MQTT as the source type in the Get events wizard." lightbox="./media/add-source-mqtt/select-mqtt.png":::

## Configure MQTT connector
[!INCLUDE [mqtt-source-connector](./includes/mqtt-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## View updated eventstream

1. You see that the MQTT source is added to your eventstream on the canvas in the **Edit** mode. To publish it to live, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-mqtt/edit-mode.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-mqtt/edit-mode.png":::
1. After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **MQTT** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-mqtt/live-view.png" alt-text="Screenshot that shows the editor in the live view." lightbox="./media/add-source-mqtt/live-view.png":::


## Related content
For a list of all supported sources, see [Add and manage an event source](add-manage-eventstream-sources.md).
