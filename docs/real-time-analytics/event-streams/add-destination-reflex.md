---
title: Add a Reflex destination to an eventstream
description: Learn how to add Reflex destination to Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add a Reflex destination to an eventstream
This article shows you how to add Reflex as a destination to a Microsoft Fabric eventstream. 

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Get access to a **premium workspace** with **Contributor** or above permissions where your destination is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a Reflex as a destination

To add a Reflex from your workspace as an eventstream's destination, do the following steps:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Reflex**. The **Reflex** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your Reflex.

   **Reflex**: Select an existing Reflex or create a new one to receive data.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-reflexconfiguration.png" alt-text="Screenshot showing the reflex configuration." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-reflexconfiguration.png" :::

1. After you select on the Add button, you can see a Reflex destination on the canvas that is linked to your eventstream.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-add-reflex.png" alt-text="Screenshot showing the new reflex destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-add-reflex.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

To learn how to add other destinations to an eventstream, see the following articles: 
- [KQL Database](add-destination-kql-database.md)
- [Lakehouse](add-destination-lakehouse.md)
- [Custom app](add-destination-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage sources to an eventstream](./add-manage-eventstream-sources.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)