---
title: Schema-Aware Eventstreams Overview (Preview)
description: Learn how schema-aware Eventstreams process schematized, classified, and untyped events in a unified Microsoft Fabric pipeline.
ms.reviewer: xujiang1
ms.topic: concept-article
ms.date: 09/07/2026
ms.custom: schema-aware-eventstream, preview
ms.search.form: Schema-aware eventstreams
ai-usage: ai-assisted
---

# Schema-aware eventstreams in Microsoft Fabric (preview)

Modern streaming solutions often process events with different, evolving, or
drifting schemas and multiple event types in one pipeline. Schema-aware
Eventstreams provide a unified event processing experience for both schematized
and unschematized events. You can ingest, understand, and process events whether
they arrive as semi-structured payloads or are tagged with registered schemas.
This experience simplifies event discovery, exploration, and processing for
heterogeneous event streams.

> [!IMPORTANT]
> Schema-aware Eventstreams are in **Preview**. When you create a new
> Eventstream, you choose whether to use the existing Eventstream experience or
> the schema-aware experience. You can't enable the schema-aware experience on
> an existing Eventstream. Existing Eventstreams continue to work as before.

## Two ways to build an eventstream

When you create a new Eventstream, you can choose between two experiences:

- **Existing Eventstream experience.** Use the Eventstream capabilities available
  today. Existing Eventstreams and their features are unchanged.
- **Schema-aware Eventstream (Preview).** Opt in to process schematized,
  classified, and untyped events together in one Eventstream.

For the existing create flow, see
[Create an Eventstream in Microsoft Fabric](./create-manage-an-eventstream.md).
To opt in, see
[Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md).

## Key capabilities

### Explore streaming data with enhanced data preview

The redesigned data preview experience helps you inspect and understand streaming
data before you build processing logic. You can:

- Explore deeply nested event payloads.
- View event headers and metadata.
- Export event details for further analysis.

For more information, see
[Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).

### Classify unschematized events with different shapes

A single stream can contain unschematized events with different shapes. The
**Classifier** workflow lets you identify a classifier or discriminator field,
such as `deviceType`. Eventstream uses that field to distinguish and organize
the event types while keeping them in one pipeline.

For more information, see
[Classify unschematized events (Preview)](./process-events-with-classifier.md).

### Recognize events registered with Event SchemaSet

Schema-aware Eventstreams integrate with **Event SchemaSet (GA)** and the Fabric
tenant-level schema registry. Events tagged with registered schemas can be
automatically recognized and processed by using their corresponding schema
definitions. This integration helps you govern, discover, and reuse data
contracts across your organization.

Schematized events use the CloudEvents format. The `ce-type` header identifies
the registered event type so Eventstream can apply the corresponding schema.
Schema association and header requirements are documented with the supported
source and Event SchemaSet workflows.

For more information, see
[Use event schemas in Eventstreams](../schema-sets/use-event-schemas.md).

### Process mixed event types in one Eventstream

Schematized events, classified events, and untyped events can coexist in the same
Eventstream. Updated operators and destinations process these event types
without requiring separate pipelines.

When you configure a no-code operator or a supported destination, use the
**Input schema** list to choose a schematized event, a classified event, or the
untyped/default input. The selection determines the event shape available to
that operator or destination.

:::image type="content" source="./media/schema-aware-eventstreams-overview/select-input-schema.png" alt-text="Screenshot of a Filter operator with the Input schema list showing untyped and classified event choices." lightbox="./media/schema-aware-eventstreams-overview/select-input-schema.png":::

Use this capability when sources have different levels of schema maturity or
when you want to adopt registered schemas incrementally.

## When to choose schema-aware Eventstreams

Choose a schema-aware Eventstream when you need to:

- Process schematized and unschematized events in one pipeline.
- Inspect nested payloads, event headers, and metadata.
- Distinguish multiple unschematized event shapes by using a classifier or
  discriminator field.
- Recognize events that reference schemas registered with Event SchemaSet.
- Process schematized, classified, and untyped events with the same operators
  and destinations.

Use the existing Eventstream experience when you don't need these preview
capabilities. Existing Eventstream features continue to work as before.

## Preview considerations

- Schema-aware Eventstreams are opt-in when you create a new Eventstream.
- You can't convert an existing Eventstream to a schema-aware Eventstream.
- Existing Eventstreams aren't changed by this preview.
- Preview capabilities are subject to change before general availability.

## Get started

1. [Create a schema-aware Eventstream (Preview)](./create-schema-aware-eventstream.md).
1. [Preview data in a schema-aware Eventstream (Preview)](./preview-data-schema-aware.md).
1. If your unschematized events have different shapes,
   [classify the events](./process-events-with-classifier.md).
1. To use registered schemas, follow the schema-association procedure for your
   supported source.
