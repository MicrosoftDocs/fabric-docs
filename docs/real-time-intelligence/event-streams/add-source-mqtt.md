---
title: Add MQTT source to an eventstream
description: Learn how to add a Message Queuing Telemetry Transport (MQTT) source to an eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 01/26/2026
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add MQTT source to an eventstream (preview)

This article shows you how to add a Message Queuing Telemetry Transport (MQTT) source to an eventstream in Fabric Real-Time Intelligence.

[!INCLUDE [mqtt-source-description-prerequisites](./includes/mqtt-source-description-prerequisites.md)]

## Add MQTT connector

You can add the MQTT connector to Eventstream in two ways:

### From an eventstream

Add an MQTT source directly to an eventstream. This approach works best when you want to set up a dedicated eventstream for processing and routing MQTT data.

1. In Fabric **Real-Time Intelligence**, create a new **Eventstream** or open an existing one.
1. Select **Add source** on the canvas.

    :::image type="content" source="./media/add-source-mqtt/add-from-eventstream.png" alt-text="Screenshot that shows the Add source option on the eventstream canvas." lightbox="./media/add-source-mqtt/add-from-eventstream.png":::

### From Real-Time hub

Connect to an MQTT source from **Real-Time hub** and create a data stream. This approach works best when you want to discover and manage your MQTT data stream alongside other streaming sources.

1. In Fabric, go to **Real-Time hub**.
1. Select **Add data** and search for **MQTT**.

    :::image type="content" source="./media/add-source-mqtt/add-from-rth.png" alt-text="Screenshot that shows the Add source option on the Real-time hub." lightbox="./media/add-source-mqtt/add-from-rth.png":::

## Configure MQTT connector
[!INCLUDE [mqtt-source-connector](./includes/mqtt-source-connector.md)]

## View updated eventstream

1. The MQTT source appears on your eventstream canvas in **Edit** mode. To publish, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-mqtt/edit-mode.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-mqtt/edit-mode.png":::
1. After you publish, the source is available in **Live view**. Select the **MQTT** tile in the diagram to view details.

    :::image type="content" source="./media/add-source-mqtt/live-view.png" alt-text="Screenshot that shows the editor in the live view." lightbox="./media/add-source-mqtt/live-view.png":::

## Related content
For a list of all supported sources, see [Add and manage an event source](add-manage-eventstream-sources.md).
