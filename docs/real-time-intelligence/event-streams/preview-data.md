---
title: Preview Data in an Eventstream Item
description: This article describes how to preview the data in an eventstream item by using the Microsoft Fabric eventstreams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
ms.search.form: Data Preview and Insights
---

# Preview data in an eventstream item

In Microsoft Fabric, a data preview gives you a snapshot of your event data in your eventstream source, your eventstream destination, or the eventstream itself. After you add sources and destinations to your eventstream, you can preview the data in each node and visualize how your data flows through the eventstream.

## Prerequisites

- Get access to a workspace with Viewer or higher permissions where your eventstream item is located.
- For an eventhouse or lakehouse destination, get access to a workspace with Viewer or higher permissions where your eventhouse or lakehouse item is located.

## Preview a source

To preview the source data of an event hub or sample data in the eventstream:

1. In the main editor canvas, select one of the source nodes in your eventstream.

1. In the lower pane, select the **Data preview** tab.

   Source data appears on the tab if data is inside the source. For example, the following image shows a preview of sample Yellow Taxi data.

   :::image type="content" source="./media/preview-data/preview-data-source.png" alt-text="Screenshot that shows a sample Yellow Taxi data preview for a source node." lightbox="./media/preview-data/preview-data-source.png" :::

## Preview a destination

To preview the destination data of an eventhouse, lakehouse, derived stream, or Fabric activator in the eventstream:

1. In the main editor canvas, select one of the destination nodes in your eventstream.

1. In the lower pane, select the **Data preview** tab.

   Destination data appears on the tab if data is within the destination. For example, the following image shows the preview of an eventhouse.

   :::image type="content" source="./media/preview-data/preview-data-destination.png" alt-text="Screenshot that shows the data preview of an eventhouse destination." lightbox="./media/preview-data/preview-data-destination.png" :::

## Preview an eventstream

You can preview the data in your eventstream and see how different data sources are routed within your eventstream:

1. In the main editor canvas, select the eventstream node.

1. In the lower pane, select the **Data preview** tab.

   Eventstream data appears on the tab if data is within the eventstream.

1. To preview data that has a different format, select the correct format on the **Data format** dropdown menu.

   :::image type="content" source="./media/preview-data/preview-data-eventstream.png" alt-text="Screenshot that shows the data preview for an eventstream." lightbox="./media/preview-data/preview-data-eventstream.png" :::

1. To preview the most current event data, select **Refresh**.

   :::image type="content" source="./media/preview-data/preview-data-refresh.png" alt-text="Screenshot that shows the Refresh button in a data preview." lightbox="./media/preview-data/preview-data-refresh.png" :::

## Related content

- [Monitor status and performance of an eventstream](monitor.md)
