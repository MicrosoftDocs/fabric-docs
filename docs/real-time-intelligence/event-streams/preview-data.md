---
title: Preview data in an Eventstream item
description: This article describes how to preview the data in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
ms.search.form: Data Preview and Insights
---

# Preview data in an Eventstream item

Data preview provides you with a snapshot of your event data in your eventstream source, eventstream destination, or the eventstream itself. After you add sources and destinations to your eventstream, you can preview the data in each node and visualize how your data flows through the eventstream.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a workspace with Viewer or above permissions where your Eventstream item is located.
- For an Eventhouse or lakehouse destination, get access to a workspace with Viewer or above permissions where your Eventhouse or Lakehouse item is located.

## Preview a source

To preview the source data of an event hub or sample data in the eventstream:

1. In the main editor canvas, select one of the source nodes in your eventstream.

1. In the lower pane, select the **Data preview** tab.

1. You see it appear in the tab if there's data inside the source. For example, the following image shows a preview of sample Yellow Taxi data.

   :::image type="content" source="./media/preview-data/preview-data-source.png" alt-text="Screenshot showing a sample Yellow Taxi data preview for a source node." lightbox="./media/preview-data/preview-data-source.png" :::

## Preview a destination

To preview the destination data of an Eventhouse, lakehouse, derived stream or Fabric activator in the eventstream:

1. In the main editor canvas, select one of the destination nodes in your eventstream.

1. In the lower pane, select the **Data preview** tab.

1. You see it appear in the tab if there's data within the destination. For example, the following image shows the preview of an Eventhouse.

   :::image type="content" source="./media/preview-data/preview-data-destination.png" alt-text="Screenshot showing an Eventhouse destination data preview." lightbox="./media/preview-data/preview-data-destination.png" :::

## Preview an eventstream

You can preview the data in your eventstream and see how different data sources are routed within your eventstream.

To preview your eventstream data:

1. In the main editor canvas, select the eventstream node.

1. In the lower pane, select the **Data preview** tab.

2. You see it appear in the tab if there's data within the eventstream.

3. To preview data that has a different format, select the correct format from the **Data format** dropdown menu.

   :::image type="content" source="./media/preview-data/preview-data-eventstream.png" alt-text="Screenshot showing the data preview for an eventstream." lightbox="./media/preview-data/preview-data-eventstream.png" :::

4. To preview the most current event data, select **Refresh**.

   :::image type="content" source="./media/preview-data/preview-data-refresh.png" alt-text="Screenshot showing where to select Refresh on the Data preview tab." lightbox="./media/preview-data/preview-data-refresh.png" :::

## Related content

- [Monitor status and performance of an eventstream](monitor.md)
