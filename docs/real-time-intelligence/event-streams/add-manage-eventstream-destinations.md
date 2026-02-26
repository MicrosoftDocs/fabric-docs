---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 11/27/2024
ms.search.form: Source and Destination
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

[!INCLUDE [supported-destinations](./includes/supported-destinations-enhanced.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]


## Manage a destination

To edit or remove an Eventstream destination, switch to **Edit mode** first. Then you can make changes to the destination on the canvas. After completing the required changes, **publish** the Eventstream to apply them.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-v2-destination-edit-deletion.png" alt-text="Screenshot showing enter to edit mode to modify and delete options for destinations on the canvas in eventstream v2." lightbox="./media/add-manage-eventstream-destinations/eventstream-v2-destination-edit-deletion.png" :::


