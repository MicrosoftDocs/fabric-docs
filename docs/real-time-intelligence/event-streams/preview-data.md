---
title: Preview Data in an Eventstream Item
description: This article describes how to preview the data in an eventstream item by using the Microsoft Fabric eventstreams feature.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 09/02/2026
ms.search.form: Data Preview and Insights
---

# Preview data in an eventstream item

In Microsoft Fabric, a data preview gives you a snapshot of the event data in a
source, destination, or the Eventstream itself. After you add sources and
destinations, preview the data in each node to understand how it flows through
the Eventstream.

> [!NOTE]
> The sections **Preview a source**, **Preview a destination**, and **Preview an
> Eventstream** describe the existing data-preview experience. If you opted in
> to **schema-aware Eventstreams (Preview)**, see
> [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).

## Prerequisites

- Get access to a workspace with Viewer or higher permissions where your
  Eventstream item is located.
- For an eventhouse or lakehouse destination, get access to its workspace with
  Viewer or higher permissions.

## Preview a source

To preview the source data of an event hub or sample data in the eventstream:

1. On the main editor canvas, select one of the source nodes in your eventstream.

1. On the lower pane, select the **Data preview** tab.

   The tab displays source data if the source contains data. For example, the
   following image shows a preview of sample **Yellow Taxi** data.

   :::image type="content" source="./media/preview-data/preview-data-source.png" alt-text="Screenshot that shows a sample Yellow Taxi data preview for a source node." lightbox="./media/preview-data/preview-data-source.png" :::

## Preview a destination

To preview destination data from an eventhouse, lakehouse, derived stream, or
Fabric activator:

1. On the main editor canvas, select one of the destination nodes in your eventstream.

1. On the lower pane, select the **Data preview** tab.

   The tab displays destination data if the destination contains data. For
   example, the following image shows the preview of an eventhouse.

   :::image type="content" source="./media/preview-data/preview-data-destination.png" alt-text="Screenshot that shows the data preview of an eventhouse destination." lightbox="./media/preview-data/preview-data-destination.png" :::

## Preview an eventstream

Preview the Eventstream to see how different data sources are routed:

1. On the main editor canvas, select the eventstream node.

1. On the lower pane, select the **Data preview** tab.

   Eventstream data appears on the tab if data is inside the eventstream.

1. To preview data in a different format, select it on the **Data format**
   dropdown menu.

   :::image type="content" source="./media/preview-data/preview-data-eventstream.png" alt-text="Screenshot that shows the data preview for an eventstream." lightbox="./media/preview-data/preview-data-eventstream.png" :::

1. To preview the most current event data, select **Refresh**.

   :::image type="content" source="./media/preview-data/preview-data-refresh.png" alt-text="Screenshot that shows the Refresh button in a data preview." lightbox="./media/preview-data/preview-data-refresh.png" :::

## Preview a schema-aware Eventstream

Schema-aware Eventstreams provide a redesigned data preview for inspecting row
details, event headers and metadata, deeply nested JSON, and different event
types. You can also download selected rows as JSON.

For step-by-step instructions and limits, see
[Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).

## Related content

- [Monitor the status and performance of an eventstream](monitor.md)
- [Schema-aware Eventstreams overview (Preview)](./schema-aware-eventstreams-overview.md)
- [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md)
- [Classify unschematized events (Preview)](./process-events-with-classifier.md)
