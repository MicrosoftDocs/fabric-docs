---
title: Add a Fabric Activator destination to an eventstream
description: Learn how to add Activator destination to a Fabric eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add a Fabric activator destination to an eventstream

This article shows you how to add an activator destination to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- If you already have an activator you want to use, access to the workspace where your activator is located with Contributor or higher permissions.
- Each event in the source must consist of a JSON dictionary.
- One of the dictionary keys must represent a unique object ID.

    Here's an example of an event that meets these criteria:
    
    ```json
    {
    "PackageID": "PKG123",
    "Temperature": 25
    }
    ```
    In this example, *PackageID* is the unique ID.

## Add activator as a destination

To add an activator destination to a default stream or derived stream, follow these steps.

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon and select **Activator** from the dropdown list.

   :::image type="content" border="true" source="./media/add-destination-activator-enhanced/add-destination.png" alt-text="A screenshot of the Add destination dropdown list with Activator highlighted.":::

    You can also select **Transform events or add destination** tile on the canvas, and select **Activator** from the dropdown list. 

   :::image type="content" source="media/add-destination-activator-enhanced/add-destination-canvas.png" alt-text="Screenshot that shows the canvas for an eventstream with New destination, Activator menu selected.":::

1. On the **Activator** screen, enter a **Destination name**, select a **Workspace**, and select an existing **Activator** or select **Create new** to create a new one.

   :::image type="content" border="true" source="media/add-destination-activator-enhanced/activator-screen.png" alt-text="A screenshot of the Activator screen.":::

1. Select **Save**.
1. To implement the newly added activator destination, select **Publish**.

   :::image type="content" border="true" source="media/add-destination-activator-enhanced/edit-mode.png" alt-text="A screenshot of the stream and Activator destination in Edit mode with the Publish button highlighted.":::

   Once you complete these steps, the activator destination is available for visualization in **Live view**. Select **Edit** to switch to the Edit mode to make more changes to the eventstream.

   :::image type="content" border="true" source="media/add-destination-activator-enhanced/live-view.png" alt-text="A screenshot of the Activator destination available for visualization in Live view.":::

## Related content

To learn how to add other destinations to an eventstream, see the following articles: 

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [Derived stream destination](add-destination-derived-stream.md)
- [Eventhouse destination](add-destination-kql-database.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Create an eventstream](create-manage-an-eventstream.md)
