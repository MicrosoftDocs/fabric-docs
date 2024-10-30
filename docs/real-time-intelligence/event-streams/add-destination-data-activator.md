---
title: Add a Activator destination to an eventstream
description: Learn how to add Activator destination to a Fabric eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/02/2024
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add a Activator destination to an eventstream

This article shows you how to add Activator destination to an eventstream.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  


## Prerequisites

- Access to the Fabric **premium workspace** where your eventstream is located with **Contributor** or higher permissions.
- If you already have a Activator you want to use, access to the **premium workspace** where your Activator is located with **Contributor** or higher permissions.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add Activator as a destination

To add a Activator destination to a default stream or derived stream, follow these steps.

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon and select **Activator** from the dropdown list.

   ![A screenshot of the Add destination dropdown list with Activator highlighted.](media/add-destination-activator-enhanced/add-destination.png)

1. On the **Activator** screen, enter a **Destination name**, select a **Workspace**, and select an existing **Activator** or select **Create new** to create a new one.

   ![A screenshot of the Activator screen.](media/add-destination-activator-enhanced/activator-screen.png)

1. Select **Save**.

1. To implement the newly added Activator destination, select **Publish**.

   ![A screenshot of the stream and Activator destination in Edit mode with the Publish button highlighted.](media/add-destination-activator-enhanced/edit-mode.png)

Once you complete these steps, the Activator destination is available for visualization in **Live view**.

![A screenshot of the Activator destination available for visualization in Live view.](media/add-destination-activator-enhanced/live-view.png)


## Related content 

To learn how to add other destinations to an eventstream, see the following articles: 

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [Eventhouse destination](add-destination-kql-database.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Create an eventstream](create-manage-an-eventstream.md)


::: zone-end

::: zone pivot="standard-capabilities"

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Get access to a **premium workspace** with **Contributor** or above permissions where your destination is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a Activator as a destination

To add a Activator from your workspace as an eventstream's destination, do the following steps:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Activator**. The **Activator** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your Activator.

   **Activator**: Select an existing Activator or create a new one to receive data.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-activatorconfiguration.png" alt-text="Screenshot showing the activator configuration." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-activatorconfiguration.png" :::

1. After you select on the Add button, you can see a Activator destination on the canvas that is linked to your eventstream.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-add-activator.png" alt-text="Screenshot showing the new activator destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-add-activator.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::


## Related content 

To learn how to add other destinations to an eventstream, see the following articles: 

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [KQL Database destination](add-destination-kql-database.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Create an eventstream](create-manage-an-eventstream.md)

::: zone-end 