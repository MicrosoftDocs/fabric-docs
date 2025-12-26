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

[!INCLUDE [mqtt-source-description-prerequisites](./includes/mqtt-source-description-prerequisites.md)]

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **MQTT** tile.

:::image type="content" source="./media/add-source-mqtt/select-mqtt.png" alt-text="Screenshot that shows the selection of MQTT as the source type in the Get events wizard." lightbox="./media/add-source-mqtt/select-mqtt.png":::

## Configure MQTT connector
[!INCLUDE [mqtt-source-connector](./includes/mqtt-source-connector.md)]

## View updated eventstream

1. You see that the MQTT source is added to your eventstream on the canvas in the **Edit** mode. To publish it to live, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-mqtt/edit-mode.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-mqtt/edit-mode.png":::
1. After you complete these steps, the source is available for visualization in the **Live view**. Select the **MQTT** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-mqtt/live-view.png" alt-text="Screenshot that shows the editor in the live view." lightbox="./media/add-source-mqtt/live-view.png":::

## Related content
For a list of all supported sources, see [Add and manage an event source](add-manage-eventstream-sources.md).
