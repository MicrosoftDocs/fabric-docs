---
title: Add and Manage Eventstream Sources
description: Learn how to add and manage an event source in an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add and manage an event source in an eventstream

::: zone pivot="enhanced-capabilities"  

After you create a Microsoft Fabric eventstream, you can connect it to various data sources and destinations.

An eventstream doesn't just allow you to stream data from Microsoft sources. It also supports ingestion from third-party platforms like Google Cloud and Amazon Kinesis with new messaging connectors. This expanded capability offers seamless integration of external data streams into Fabric. This integration provides greater flexibility and enables you to gain real-time insights from multiple sources.

In this article, you learn about the event sources that you can add to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.
- Prerequisites specific to each source that are documented in the following source-specific articles.

## Supported sources

Fabric eventstreams with enhanced capabilities support the following sources. Each article provides details and instructions for adding specific sources.

[!INCLUDE [supported-sources](./includes/supported-sources-enhanced.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Related content

- [Create an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)

::: zone-end

::: zone pivot="standard-capabilities"

After you create a Microsoft Fabric eventstream, you can connect it to various data sources and destinations.

[!INCLUDE [select-view](./includes/select-view.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the trial license mode with Contributor or higher permissions.
- Appropriate permission to access policy keys. To add Azure Event Hubs or Azure IoT Hub as an eventstream source, you need to have this permission. The keys must be publicly accessible and not behind a firewall or secured in a virtual network.

## Supported sources

Fabric eventstreams support the following sources. Use links in the table to go to articles that provide more details about adding specific sources.

[!INCLUDE [supported-sources](./includes/supported-sources-standard.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Manage a source

- **Edit or remove a source**: You can select an eventstream source to edit or remove by using either the left pane or the canvas. When you select **Edit**, the edit pane opens to the right of the main editor.

  :::image type="content" source="./media/add-manage-eventstream-sources/source-modification-deletion.png" alt-text="Screenshot that shows selections for source modification and deletion." lightbox="./media/add-manage-eventstream-sources/source-modification-deletion.png" :::

- **Regenerate a key for a custom app**: If you want to regenerate a new connection key for your application, select one of your custom app sources on the canvas, and then select **Regenerate**.

  :::image type="content" source="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" alt-text="Screenshot that shows selections for regenerating a key." lightbox="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" :::

## Related content

- [Create an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)

::: zone-end
