---
title: Explore and Classify Events in a Schema-Aware Eventstream
description: Learn how to explore nested heterogeneous events and classify them by event type in a schema-aware Microsoft Fabric Eventstream.
ms.reviewer: arindamc
ms.topic: tutorial
ms.date: 09/09/2026
ms.custom: schema-aware-eventstream, preview
ms.search.form: Eventstreams Tutorials
---

# Tutorial: Explore and classify events with different schemas

Building systems can send many kinds of events through one stream. A thermostat
event contains temperature fields, an occupancy event contains people counts,
and a badge-reader event contains access information. Schema-aware Eventstreams
let you inspect these heterogeneous events and classify them without creating a
separate pipeline for each event type.

> [!IMPORTANT]
> Schema-aware Eventstreams are in **Preview**.

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create a schema-aware Eventstream.
> - Send four building operations event types through a custom endpoint.
> - Inspect row details and nested JSON in Data preview.
> - Download selected events as JSON.
> - Classify events by using the `deviceType` field.
> - Verify the classified event types and their detected shapes.

## Prerequisites

- Access to a workspace with Contributor or higher permissions.
- The latest [long-term support version of Node.js](https://nodejs.org).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com).

## Create a schema-aware Eventstream

1. In your Fabric workspace, select **+ New item**.
1. Search for and select **Eventstream**.
1. Enter `building-operations-es` as the eventstream name.
1. Select **Enable schema-aware eventstream (Preview)**.
1. Select **Create**.

   :::image type="content" source="./media/create-schema-aware-eventstream/enable-schema-aware-eventstream.png" alt-text="Screenshot of the New Eventstream dialog with Enable schema-aware eventstream selected." lightbox="./media/create-schema-aware-eventstream/enable-schema-aware-eventstream.png":::

## Add a custom endpoint source

1. Open the eventstream in **Edit** mode.
1. Select **Add source**, and then select **Custom endpoint**.
1. Enter `building-operations-source` as the source name, and then add the
   source.
1. Select **Publish**.
1. In **Live** mode, select the custom endpoint source.
1. In the source details, copy these values:

   - **Connection string-primary key**
   - **Event hub name**

> [!IMPORTANT]
> The connection string contains a credential. Don't paste it into the
> Eventstream documentation, screenshots, or source control.

## Send building operations events

Follow [Generate building operations sample events](./generate-building-operations-sample-events.md)
to create and run the sample generator.

The generator sends 96 events by default: 24 events for each of these device
types:

- `thermostat`
- `occupancy_sensor`
- `air_quality_monitor`
- `access_badge_reader`

## Explore events in Data preview

1. In the Eventstream, select the default stream.
1. Select **Data preview**. You might need to select **Refresh**.
1. Verify that the preview contains events with different values in the
   `deviceType` field.

### View the complete payload

1. Select an event row. You can also select multiple rows to view together.
1. Select **View row details**.

   :::image type="content" source="./media/preview-data-schema-aware/open-row-details.png" alt-text="Screenshot of a selected event row and the View row details button in Data preview." lightbox="./media/preview-data-schema-aware/open-row-details.png":::

1. In **Row details**, select **Payload** (if needed).
1. Compare the fields in events from different device types.

   :::image type="content" source="./media/preview-data-schema-aware/view-row-details.png" alt-text="Screenshot of the Row details dialog with the Payload tab showing a nested JSON event." lightbox="./media/preview-data-schema-aware/view-row-details.png":::

### Explore nested JSON

1. Return to Data preview.
1. On the `payload` column, select **Expand objects**.

   :::image type="content" source="./media/preview-data-schema-aware/expand-nested-json-click-header.png" alt-text="Screenshot of the Expand objects option on a nested payload column in Data preview." lightbox="./media/preview-data-schema-aware/expand-nested-json-click-header.png":::

1. Verify that the payload fields appear as separate grid columns and that the
   breadcrumb shows level 1.

   :::image type="content" source="./media/preview-data-schema-aware/expanded-nested-json-columns-with-level-1-breadcrumb.png" alt-text="Screenshot of expanded JSON fields displayed as grid columns with the level 1 payload breadcrumb." lightbox="./media/preview-data-schema-aware/expanded-nested-json-columns-with-level-1-breadcrumb.png":::

1. Select an earlier breadcrumb level to return to the previous view.

### Download representative events

1. Select one or more event rows.
1. Select **Download**.

   :::image type="content" source="./media/preview-data-schema-aware/download-selected-rows.png" alt-text="Screenshot of multiple selected event rows and the Download button in Data preview." lightbox="./media/preview-data-schema-aware/download-selected-rows.png":::

1. Open the downloaded JSON and verify that it contains only the selected
   events.

## Classify the events

1. Switch the Eventstream to **Edit** mode.
1. Select the default stream.
1. On the Data preview ribbon, select **Classify unschematized events**.

   The **Classify unschematized events** dialog opens.

   :::image type="content" source="./media/process-events-with-classifier/manage-classifier.png" alt-text="Screenshot of the Data preview grid with the Classify unschematized events button." lightbox="./media/process-events-with-classifier/manage-classifier.png":::

1. Select the `deviceType` column.
1. Review the four detected event types and their fields.
1. Select **Save**.

   :::image type="content" source="./media/process-events-with-classifier/configure-classifier.png" alt-text="Screenshot of the Classify unschematized events dialog with deviceType selected, four detected event types, and the Save button." lightbox="./media/process-events-with-classifier/configure-classifier.png":::

1. Select **Publish**.

## Verify the classified event types

1. In **Live** mode, select the default stream.
1. In the **Event type** pane, expand **Classified events**.
1. Verify that these event types appear:

   - `thermostat`
   - `occupancy_sensor`
   - `air_quality_monitor`
   - `access_badge_reader`

   :::image type="content" source="./media/process-events-with-classifier/classified-event-types.png" alt-text="Screenshot of Data preview with four classified event types listed in the Event type pane." lightbox="./media/process-events-with-classifier/classified-event-types.png":::

1. Select each event type and compare the fields displayed in Data preview.

You now have one Eventstream that keeps the source events together while making
each event type and its detected shape available for exploration and processing.

## Clean up resources

If you don't plan to continue to the next schema-aware Eventstream tutorial,
delete the `building-operations-es` Eventstream and remove the generator
connection-string environment variable.

## Related content

- [Schema-aware Eventstreams overview](./schema-aware-eventstreams-overview.md)
- [Preview data in a schema-aware Eventstream](./preview-data-schema-aware.md)
- [Classify unschematized events](./process-events-with-classifier.md)
