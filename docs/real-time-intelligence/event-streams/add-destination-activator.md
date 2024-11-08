---
title: Add a Fabric Activator destination to an eventstream
description: Learn how to add Activator destination to a Fabric eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add a Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] destination to an eventstream (preview)

This article shows you how to add [!INCLUDE [fabric-activator](includes/fabric-activator.md)] destination to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- If you already have an [!INCLUDE [fabric-activator](includes/fabric-activator.md)] you want to use, access to the workspace where your [!INCLUDE [fabric-activator](includes/fabric-activator.md)] is located with Contributor or higher permissions.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add [!INCLUDE [fabric-activator](includes/fabric-activator.md)] as a destination

To add an [!INCLUDE [fabric-activator](includes/fabric-activator.md)] destination to a default stream or derived stream, follow these steps.

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon and select **[!INCLUDE [fabric-activator](includes/fabric-activator.md)]** from the dropdown list.
   ![A screenshot of the Add destination dropdown list with Activator highlighted.](media/add-destination-activator-enhanced/add-destination.png)

    You can also select **Transform events or add destination** tile on the canvas, and select **[!INCLUDE [fabric-activator](includes/fabric-activator.md)]** from the drop-down list. 

    :::image type="content" source="media/add-destination-activator-enhanced/add-destination-canvas.png" alt-text="Screenshot that shows the canvas for an eventstream with New destination, Activator menu selected.":::
1. On the **[!INCLUDE [fabric-activator](includes/fabric-activator.md)]** screen, enter a **Destination name**, select a **Workspace**, and select an existing **Activator** or select **Create new** to create a new one.

   ![A screenshot of the Activator screen.](media/add-destination-activator-enhanced/activator-screen.png)
1. Select **Save**.
1. To implement the newly added [!INCLUDE [fabric-activator](includes/fabric-activator.md)] destination, select **Publish**.

   ![A screenshot of the stream and Activator destination in Edit mode with the Publish button highlighted.](media/add-destination-activator-enhanced/edit-mode.png)

    Once you complete these steps, the [!INCLUDE [fabric-activator](includes/fabric-activator.md)] destination is available for visualization in **Live view**. Select **Edit** to switch to the Edit mode to make more changes to the eventstream.

    ![A screenshot of the Activator destination available for visualization in Live view.](media/add-destination-activator-enhanced/live-view.png)


## Related content 

To learn how to add other destinations to an eventstream, see the following articles: 

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [Eventhouse destination](add-destination-kql-database.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Create an eventstream](create-manage-an-eventstream.md)


