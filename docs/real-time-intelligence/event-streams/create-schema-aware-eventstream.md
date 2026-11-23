---
title: Create a Schema-Aware Eventstream (Preview)
description: Learn how to opt in to schema-aware Eventstreams in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 09/07/2026
ms.custom: schema-aware-eventstream, preview
ms.search.form: Create schema-aware eventstream
---

# Create a schema-aware event stream in Microsoft Fabric (preview)

Schema-aware event streams provide a unified event processing experience for schematized and unschematized events. This article shows you how to opt in when you create a new event stream.

> [!IMPORTANT]
> Schema-aware event streams are in **Preview**. The existing event stream experience continues to be available, and existing event streams aren't changed. You can't enable the schema-aware experience on an existing event stream. Create a new event stream and opt in during creation.

## Prerequisites

- Access to a workspace in a Microsoft Fabric capacity or trial license mode, with Contributor or higher permissions.
- Familiarity with the existing create flow. See [Create an Eventstream in Microsoft Fabric](./create-manage-an-eventstream.md).
- Optional: an Event SchemaSet (GA) if you plan to process events tagged with registered schemas.

## Create a schema-aware eventstream

1. In the Fabric portal, select the workspace where you want the eventstream.
1. On the workspace page, select **+ New item** on the command bar.
1. On the **New item** page, search for and select **Eventstream**.
1. In the **New Eventstream** dialog, enter a name.
1. Select **Enable schema-aware eventstream (Preview)** to opt in.
1. Select **Create**.

    Creating the eventstream can take a few seconds. When it's ready, you're
    taken to the eventstream editor.

    :::image type="content" source="./media/create-schema-aware-eventstream/enable-schema-aware-eventstream.png" alt-text="Screenshot of the New Eventstream dialog with Enable schema-aware eventstream selected." lightbox="./media/create-schema-aware-eventstream/enable-schema-aware-eventstream.png":::

## What's different in the editor

Schema-aware Eventstreams don't display a separate badge or status after
creation. In **Edit** mode, use the redesigned **Data preview** experience and
the **Classify unschematized events** button to confirm that you're using a
schema-aware Eventstream.

:::image type="content" source="./media/process-events-with-classifier/manage-classifier.png" alt-text="Screenshot of a schema-aware Eventstream in Edit mode with the Data preview grid and Classify unschematized events button." lightbox="./media/process-events-with-classifier/manage-classifier.png":::

After you create a schema-aware Eventstream, you can:

- Ingest and process both schematized and unschematized events.
- Associate a source with a registered schema from an Event SchemaSet. Incoming
  events are validated and interpreted against that schema.
- Select a **classifier column** (a classifier or discriminator field) so
  Eventstream can organize, distinguish, and process unschematized events with
  different shapes. See
  [Classify unschematized events (Preview)](./process-events-with-classifier.md).
- Keep a source untyped and combine it with schematized or classified events in
  the same Eventstream.
- Explore deeply nested payloads, event headers, and metadata, and export event
  details for further analysis.
- Automatically recognize events tagged with schemas registered through Event
  SchemaSet and the Fabric tenant-level schema registry.
- Process schematized, classified, and untyped events with updated operators and
  destinations in one Eventstream.

## Next steps

1. Add sources and begin ingesting events.
1. Use data preview to understand the payloads, headers, and metadata. See
   [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).
1. If unschematized events have different shapes, use the
   [Classifier workflow](./process-events-with-classifier.md).
1. If events reference registered schemas, follow the schema-association
   procedure in the documentation for your supported source.

## Related content

- [Schema-aware Eventstreams overview (Preview)](./schema-aware-eventstreams-overview.md)
- [Classify unschematized events (Preview)](./process-events-with-classifier.md)
- [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md)
- [Use event schemas in Eventstreams](../schema-sets/use-event-schemas.md)
