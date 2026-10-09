---
title: Preview Data in a Schema-Aware Eventstream (Preview)
description: Learn how to inspect rows, headers, metadata, and nested JSON and download selected events in a schema-aware Eventstream.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 09/07/2026
ms.custom: schema-aware-eventstream, preview
ms.search.form: Schema-aware Eventstream data preview
---

# Preview data in a schema-aware eventstream (preview)

The redesigned data preview in a schema-aware Eventstream helps you inspect
event payloads, headers, metadata, and nested JSON before you configure
processing logic. You can also explore schematized, classified, and untyped
events and download selected rows as JSON.

> [!IMPORTANT]
> Schema-aware Eventstreams are in **Preview**. For the existing data-preview
> experience, see
> [Preview data in an Eventstream item](./preview-data.md).

## Prerequisites

- A schema-aware Eventstream. See
  [Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md).
- Contributor or higher permissions on the workspace that contains the
  Eventstream.
- A source that is sending events to the Eventstream.

## Open data preview

1. Open the schema-aware Eventstream.
1. Select the source, stream, operator, or destination that you want to inspect.
1. On the lower pane, select **Data preview**.

The preview displays up to 200 events.

## View row details

1. In **Data preview**, select a row.
1. On the preview toolbar or the row action, select **View row details**.

   :::image type="content" source="./media/preview-data-schema-aware/open-row-details.png" alt-text="Screenshot of a selected event row and the View row details button in Data preview." lightbox="./media/preview-data-schema-aware/open-row-details.png":::

   A pop-up dialog opens with separate **Header** and **Payload** tabs.

1. Select **Payload** to inspect the complete event payload.

   :::image type="content" source="./media/preview-data-schema-aware/view-row-details.png" alt-text="Screenshot of the Row details dialog with the Payload tab showing a nested JSON event." lightbox="./media/preview-data-schema-aware/view-row-details.png":::

1. Select **Header** to inspect the available event headers and metadata.

   The fields on the **Header** tab can vary by event source and the metadata
   available for that event.

## Explore nested JSON

1. Find a preview column that contains a nested JSON object.
1. On the nested column header, select the option to expand the column.

   :::image type="content" source="./media/preview-data-schema-aware/expand-nested-json-click-header.png" alt-text="Screenshot of the Expand objects option on a nested payload column in Data preview." lightbox="./media/preview-data-schema-aware/expand-nested-json-click-header.png":::

   Each selection expands one level of the object into new grid columns. Data
   preview supports a maximum nested depth of five levels.

   :::image type="content" source="./media/preview-data-schema-aware/expanded-nested-json-columns-with-level-1-breadcrumb.png" alt-text="Screenshot of expanded JSON fields displayed as grid columns with the L1 payload breadcrumb." lightbox="./media/preview-data-schema-aware/expanded-nested-json-columns-with-level-1-breadcrumb.png":::

1. Continue expanding to inspect deeper levels.

   A breadcrumb above the grid shows the current level, such as L1, L2, or L3.

1. To collapse the view or return to a previous level, select an earlier level
   in the breadcrumb.

## Download selected events

1. In **Data preview**, select the rows that you want to export.
1. On the preview toolbar, select **Download**.

You download only the selected rows. The download uses JSON format.

:::image type="content" source="./media/preview-data-schema-aware/download-selected-rows.png" alt-text="Screenshot of multiple selected event rows and the Download button in Data preview." lightbox="./media/preview-data-schema-aware/download-selected-rows.png":::

## Explore different event types

A schema-aware Eventstream can contain schematized, classified, and untyped events. Use the event-type selection in **Data preview** to inspect the shape available for each event type.

For unschematized events with different shapes, configure a classifier and then select each detected event type in the preview. For more information, see [Classify unschematized events (Preview)](./process-events-with-classifier.md).

## Limits

| Capability | Limit |
| --- | --- |
| Events shown in data preview | Up to 200 events |
| Nested JSON depth | Up to five levels |
| Download format | JSON |
| Download scope | Selected rows only |

## Related content

- [Schema-aware Eventstreams overview (Preview)](./schema-aware-eventstreams-overview.md)
- [Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md)
- [Classify unschematized events (Preview)](./process-events-with-classifier.md)
- [Monitor an Eventstream](./monitor.md)
