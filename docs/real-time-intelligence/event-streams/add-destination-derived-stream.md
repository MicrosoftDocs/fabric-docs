---
title: Add a derived stream destination to an eventstream
description: Learn how to add a derived stream destination to an eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 06/07/2025
ms.search.form: Source and Destination
---

# Add a derived stream destination to an eventstream

This article shows you how to add a derived stream destination to an eventstream in Microsoft Fabric event streams.

A derived stream refers to a logical stream of data. This stream is created by applying transformations or filters to the default stream. Derived streams enhance data management and analytics by providing a curated subset of data tailored to specific needs.

You can create a derived stream after doing operations like filtering and aggregating an eventstream. The derived stream is then ready for further consumption or analysis through the Real-Time hub. For more information about derived streams, see [Create default and derived Fabric event streams](create-default-derived-streams.md).

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 

## Add a derived stream as a destination

To route event data to a derived stream destination, follow these steps to add the **Stream** destination.

1. In **Edit mode** for your eventstream, use one of the following ways to create a new stream:

   - Hover over the operator and select the **+** symbol, then select **Stream** as the destination.

     :::image type="content" border="true" source="media/add-destination-derived-stream/select-stream.png" alt-text="Screenshot of adding the new stream by selecting the + symbol on the operator.":::

   - Or, select **Destination** from the ribbon and select **Stream**. Then drag the new derived stream to connect it to the operator node.

     :::image type="content" border="true" source="media/add-destination-derived-stream/select-stream-ribbon.png" alt-text="Screenshot of adding the new stream by selecting Stream and connecting the new stream to the operator.":::

1. On the **Derived Stream** screen, give the stream a name, specify the data format, and select **Save**.

   :::image type="content" border="true" source="media/add-destination-derived-stream/derived-stream.png" alt-text="Screenshot of the Derived Stream screen with Save highlighted.":::

1. After you create the derived stream, it appears in your eventstream on the canvas in **Edit mode**. You can continue processing your data by adding operations and destinations after the derived stream. To implement your changes, select **Publish**.

   :::image type="content" border="true" source="media/add-destination-derived-stream/edit-mode.png" alt-text="Screenshot of the derived stream in Edit mode, with Publish highlighted.":::

After you complete these steps, the derived stream appears on the canvas in **Live view**, and you can view the **Details**, **Data preview** and **Data insights** in the lower pane.

:::image type="content" border="true" source="media/add-destination-derived-stream/live-view.png" alt-text="Screenshot of the eventstream in Live view with the Details pane.":::

You can also access this stream in Real-Time hub.

:::image type="content" border="true" source="media/add-destination-derived-stream/real-time-hub.png" alt-text="Screenshot of the derived eventstream listed in Real-Time hub.":::

## Related content 

To learn how to add other destinations to an eventstream, see the following articles: 

- [Route events to destinations ](add-manage-eventstream-destinations.md)
- [Custom app](add-destination-custom-app.md)
- [Eventhouse](add-destination-kql-database.md)
- [Lakehouse](add-destination-lakehouse.md)
- [Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](add-destination-activator.md)
- [Create an eventstream](create-manage-an-eventstream.md)
