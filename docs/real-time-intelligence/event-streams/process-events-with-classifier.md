---
title: Classify Unschematized Events in an Eventstream (Preview)
description: Learn how to use the Classifier workflow to organize unschematized events with different shapes in one schema-aware Eventstream.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 09/07/2026
ms.custom: schema-aware-eventstream, preview
ms.search.form: Classifier workflow eventstream
---

# Classify unschematized events in a schema-aware eventstream (preview)

Some streams contain unschematized events with different shapes. For example, an
IoT stream might contain events from multiple device types. In a schema-aware
Eventstream, the **Classifier** workflow lets you identify a classifier or
discriminator field, such as `deviceType`, by selecting it as the classifier
column. Eventstream uses the field to distinguish and organize event types while
keeping them in one pipeline.

> [!IMPORTANT]
> The Classifier workflow is part of **schema-aware Eventstreams**, which are in
> Preview. For multiple-schema inferencing in the existing Eventstream
> experience, see
> [Enhance event processing by using multiple schema inferencing](./process-events-with-multiple-schemas.md).

## When to use the Classifier workflow

Use the workflow when:

- Events are unschematized.
- Multiple event types or shapes flow through the same stream.
- Events contain a field whose value identifies the event type, such as
  `deviceType`, `eventType`, or `entityType`.
- You want to process the event types in one pipeline instead of creating
  separate Eventstreams.

## Prerequisites

- A schema-aware Eventstream (Preview). See
  [Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md).
- Contributor or higher permissions on the workspace that contains the
  Eventstream.

## Choose a classifier column

Choose a classifier or discriminator field that:

- Is present on the events that you want to classify.
- Has a stable value for each event type.
- Has a limited set of meaningful values.

For example, consider an IoT stream that contains these events:

```json
{ "deviceType": "thermostat", "deviceId": "T-01", "temperature": 21.8 }
{ "deviceType": "camera", "deviceId": "C-07", "motionDetected": true }
```

The `deviceType` field distinguishes the thermostat event from the camera event.

## Classify events

1. Open your schema-aware Eventstream in **Edit** mode.
1. Select the stream that contains the unschematized events.
1. In the data-preview grid, select **Classify unschematized events**.

   The **Classify unschematized events** dialog opens.

   :::image type="content" source="./media/process-events-with-classifier/manage-classifier.png" alt-text="Screenshot of the Data preview grid with the Classify unschematized events button." lightbox="./media/process-events-with-classifier/manage-classifier.png":::

1. Select the classifier column that identifies each event type, such as
   `deviceType`.

   You can select a nested field as the classifier column.

1. Review the event types identified from the field values.
1. Select **Save**.

   :::image type="content" source="./media/process-events-with-classifier/configure-classifier.png" alt-text="Screenshot of the Classify unschematized events dialog with deviceType selected, four detected event types, and the Save button." lightbox="./media/process-events-with-classifier/configure-classifier.png":::

After you save, the classified event types appear as selectable options in
**Data preview**. Select each event type to verify its detected event shape.

:::image type="content" source="./media/process-events-with-classifier/classified-event-types.png" alt-text="Screenshot of Data preview with four classified event types listed in the Event type pane." lightbox="./media/process-events-with-classifier/classified-event-types.png":::

## Classifier behavior

- If the classifier column is missing or its value is null, the event remains
  untyped and continues through the Eventstream.
- When a new classifier value arrives, Eventstream automatically adds a new
  classified event type.
- Choose a field with a bounded set of meaningful values. A high-cardinality
  field, such as a unique identifier, can create too many event types and make
  the Eventstream difficult to manage.

## Explore and process classified events

Use the redesigned data preview to inspect the payload, headers, and metadata
for each classified event type. You can also download selected events as JSON.
For more information, see
[Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).

Updated operators and destinations can process classified events together with
schematized and untyped events. You don't need to create separate pipelines for
each event type.

## Related content

- [Schema-aware Eventstreams overview (Preview)](./schema-aware-eventstreams-overview.md)
- [Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md)
- [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md)
- [Use event schemas in Eventstreams](../schema-sets/use-event-schemas.md)
