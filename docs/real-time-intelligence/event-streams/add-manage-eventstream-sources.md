---
title: Add and manage eventstream sources
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

Once you created an eventstream, you can connect it to various data sources and destinations. 

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

Once you create an eventstream, you can connect it to various data sources and destinations.

Eventstream not only allows you to stream data from Microsoft sources, but also supports ingestion from third-party platforms like Google Cloud and Amazon Kinesis with new messaging connectors. This expanded capability offers seamless integration of external data streams into Fabric, providing greater flexibility and enabling you to gain real-time insights from multiple sources.

In this article, you learn about the event sources that you can add to an eventstream.




## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Prerequisites specific to each source that are documented in the following source-specific articles.

## Supported sources

Fabric event streams with enhanced capabilities support the following sources. Each article provides details and instructions for adding specific sources.

[!INCLUDE [supported-sources](./includes/supported-sources-enhanced.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)

::: zone-end

::: zone pivot="standard-capabilities"

## Prerequisites

Before you start, you must complete the following prerequisites:

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- To add an Azure Event Hubs or Azure IoT Hub as eventstream source, you need to have appropriate permission to access its policy keys. They must be publicly accessible and not behind a firewall or secured in a virtual network.

## Supported sources

Fabric event streams support the following sources. Use links in the table to navigate to articles that provide more details about adding specific sources.

[!INCLUDE [supported-sources](./includes/supported-sources-standard.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Manage a source

- **Edit/remove**: You can select an eventstream source to edit or remove either through the navigation pane or canvas. When you select **Edit**, the edit pane opens in the right of the main editor.

   :::image type="content" source="./media/add-manage-eventstream-sources/source-modification-deletion.png" alt-text="Screenshot showing the source modification and deletion." lightbox="./media/add-manage-eventstream-sources/source-modification-deletion.png" :::

- **Regenerate key for a custom app**: If you want to regenerate a new connection key for your application, select one of your custom app sources on the canvas and select **Regenerate** to get a new connection key.

   :::image type="content" source="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" alt-text="Screenshot showing how to regenerate a key." lightbox="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" :::

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)

::: zone-end
