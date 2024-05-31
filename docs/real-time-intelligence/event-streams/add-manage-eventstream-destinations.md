---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
  - build-2024
ms.date: 05/21/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add and manage a destination in an eventstream

After you create an eventstream in Microsoft Fabric, you can route the data to different destinations. For a list of destinations that you can add to your eventstream, see [Supported destinations](#supported-destinations).

## Prerequisites

To add a destination to an eventstream, you need the following prerequisites:

- Access to the Fabric **premium workspace** where the eventstream is located with **Contributor** or higher permissions.
- For a KQL Database, Lakehouse, or Reflex destination, access to the **premium workspace** where the destination is located with **Contributor** or higher permissions.

## Supported destinations

Fabric event streams supports the following destinations. Use links in the table to navigate to articles about how to add specific destinations.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

[!INCLUDE [supported-destinations](./includes/supported-destinations-enhanced.md)]


::: zone-end

::: zone pivot="standard-capabilities"


[!INCLUDE [supported-destinations](./includes/supported-destinations-standard.md)]


::: zone-end

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Manage a destination

You can edit or remove an eventstream destination through either the navigation pane or the canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic, through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
