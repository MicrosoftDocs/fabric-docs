---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/27/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add and manage a destination in an eventstream

After you create an eventstream in Microsoft Fabric, you can route the data to different destinations. For a list of destinations that you can add to your eventstream, see [Supported destinations](#supported-destinations).

## Prerequisites

To add a destination to an eventstream, you need the following prerequisites:

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- For an Eventhouse, Lakehouse, or Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] destination, access to the workspace where the destination is located with **Contributor** or higher permissions.

## Supported destinations

Fabric event streams support the following destinations. Use links in the table to navigate to articles about how to add specific destinations.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

[!INCLUDE [supported-destinations](./includes/supported-destinations-enhanced.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Manage a destination

To edit or remove an Eventstream destination, switch to **Edit mode** first. Then you can make changes to the destination on the canvas. After completing the required changes, **publish** the Eventstream to apply them.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-v2-destination-edit-deletion.png" alt-text="Screenshot showing enter to edit mode to modify and delete options for destinations on the canvas in eventstream v2." lightbox="./media/add-manage-eventstream-destinations/eventstream-v2-destination-edit-deletion.png" :::


::: zone-end

::: zone pivot="standard-capabilities"


[!INCLUDE [supported-destinations](./includes/supported-destinations-standard.md)]


[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Manage a destination

You can edit or remove an eventstream destination through either the navigation pane or the canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic, through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::


::: zone-end

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
