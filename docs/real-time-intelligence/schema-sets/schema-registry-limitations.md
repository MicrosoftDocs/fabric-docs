---
title: Schema Registry Limits in Fabric Real-Time Intelligence
description: Understand event schema set limitations and schema handling restrictions in eventstreams.
#customer intent: As a data engineer, I want to understand the current limitations of Schema Registry in Fabric Real-Time Intelligence so that I can plan my data streaming implementation effectively.
contributors: null
ms.topic: overview
ms.date: 09/08/2026
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
ms.search.form: Schema Registry
ai-usage: ai-assisted
---
# Schema Registry - known limitations

This article describes important Schema Registry limitations to consider when
you design a streaming solution.

## Limitations

- You can only create schema definitions by using the Avro 1.12 schema format.
- Schema-aware Eventstreams (preview) limits the maximum schema name to 50 characters. When the schema name exceeds this limit, Eventstreams can't process events with that schema.
- Decimal precision is limited to 28 digits. Messages containing decimal values with a precision greater than 28 digits are rejected during deserialization and aren't processed.
- No schema compatibility enforcement. Schema compatibility modes aren't enforced. You can make changes to a schema that might break your pipelines. You're responsible for ensuring schema updates don't negatively affect your data flows.
- **Nonconforming events are dropped.** Each Fabric feature that integrates with SchemaSet decides how to handle nonconforming events, but in general, only events that conform to an associated schema can pass through. To preserve data quality and integrity, Eventstream drops events that don't match the specified schema.

Validation errors appear in the Eventstream runtime logs. To inspect the errors, open the Eventstream item details pane, select the source node, and then select **Runtime logs** on the lower pane.

## Related content

[Schema Registry](schema-registry-overview.md)
[Schema Registry region availability](schema-registry-region-availability.md)
