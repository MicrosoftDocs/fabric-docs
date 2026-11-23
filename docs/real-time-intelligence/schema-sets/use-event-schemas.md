---
title: Use Schemas in Eventstreams - Fabric Real-Time Intelligence
description: Learn how eventstreams use registered schemas to interpret, validate, and deliver events.
#customer intent: As a user, I want to learn how to use event schemas in eventstreams in Real-Time Intelligence.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
  - schema-aware-eventstream
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
---

# Use schemas in eventstreams (Fabric Real-Time Intelligence)

> [!NOTE]
> **Schema-aware Eventstreams (Preview)** integrate with Event SchemaSet (GA)
> and the Fabric tenant-level schema registry. Ingested events tagged with
> registered schemas can be automatically recognized and processed by using
> their schema definitions. Schematized, classified, and untyped events can
> coexist in the same Eventstream. For more information, see
> [Schema-aware eventstreams overview (Preview)](../event-streams/schema-aware-eventstreams-overview.md).

When you associate a supported source with an Event SchemaSet, every event from
that source must conform to one of the associated schemas. Nonconforming events
are dropped, and validation errors appear in the eventstream runtime logs.
Sources that aren't associated with an Event SchemaSet remain untyped and
continue to flow through the same schema-aware eventstream.

Schematized events use the CloudEvents format. The `ce-type` header identifies
the registered event type and corresponding schema. For source-specific
association steps, see the documentation for the supported source.

> [!IMPORTANT]
> You can't enable schema-aware support for an existing Eventstream. Create a
> new eventstream and select **Enable schema-aware eventstream (Preview)**.

## Monitor schema validation errors

1. Open the Eventstream item details pane.
1. Select the source node associated with the Event SchemaSet.
1. In the lower pane, select **Runtime logs**.
1. Filter the logs to find schema validation errors.

## Supported sources

- [Custom app or endpoint](../event-streams/add-source-custom-app.md?pivots=extended-features)
- [Azure Event Hubs](../event-streams/add-source-azure-event-hubs.md?pivots=extended-features)
- [Azure SQL Database Change Data Capture (CDC)](../event-streams/add-source-azure-sql-database-change-data-capture.md)
- [Azure SQL Managed Instance CDC](../event-streams/add-source-azure-sql-managed-instance-change-data-capture.md)
- [SQL Server on virtual machine CDC](../event-streams/add-source-sql-server-change-data-capture.md)
- [PostgreSQL Database CDC](../event-streams/add-source-postgresql-database-change-data-capture.md)

## Supported destinations

Schema-aware Eventstreams support schema selection for these destinations:

- [Eventhouse](../event-streams/add-destination-kql-database.md)
- [Lakehouse](../event-streams/add-destination-lakehouse.md)
- [Custom endpoint](../event-streams/add-destination-custom-app.md)
- [Derived stream](../event-streams/add-destination-derived-stream.md)
