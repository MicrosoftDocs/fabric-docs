---
title: Schema Registry Limits in Fabric Real-Time Intelligence
ms.subservice: rti-hub
ms.service: fabric
description: Understand the limitations of Schema Registry in Fabric Real-Time Intelligence, including supported sources, destinations, and handling of non-conforming events.
#customer intent: As a data engineer, I want to understand the current limitations of Schema Registry in Fabric Real-Time Intelligence so that I can plan my data streaming implementation effectively.
author: spelluru
contributors: null
ms.topic: overview
ms.date: 08/07/2025
ms.author: spelluru
ms.reviewer: spelluru
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
ms.search.form: Schema Registry
---


# Schema Registry - known limitations

Schema Registry in Fabric Real-Time Intelligence is currently in preview. This article provides some important limitations to be aware of.

## Limitations

- You can't enable schema mode on existing eventstreams Schema support must be enabled when the Eventstream is created and can't be unset after creation. You can't retroactively add schema registration to an existing eventstream. To use registered schemas, you need to create a new Eventstream. You can't combine schema-enabled sources with nonschema sources in the same Eventstream
- You can't combine schema-enabled sources with nonschema sources in the same Eventstream
- A limited set of input sources are supported. During public preview, schema registration is only available for these input sources:
    - Custom Endpoint
    - Azure SQL Change Data Capture (CDC)
- A limited set of destinations are supported. Today, schema-validated events can only be written to:
    - Eventhouse (Push Mode)
    - Custom App
    - Derived Stream (another Eventstream)
- No Schema Compatibility Enforcement. Schema compatibility isn't currently enforced. This means you can make changes to a schema that might break your pipelines. For now, you're responsible for ensuring schema updates don't negatively affect your data flows.
- Only Avro Schema Format is Supported. Schema definitions can only be created using Avro schema format.
- What Happens to Non-Conforming Events? When schema validation is enabled in Fabric Real-Time Intelligence (RTI), only events that conform to the registered schema are allowed to pass through. Events that don't match the expected schema, also called nonconforming events, are dropped by the system to preserve data quality and integrity.

    During public preview, these nonconforming events aren't routed to a separate stream or storage location. Instead, errors related to dropped events are logged in Fabric Diagnostics, where you can monitor and investigate issues that arise.

    We recommend regularly monitoring Fabric Diagnostics to track validation issues and ensure that incoming events meet the schema requirements you define.

## Related content

[Schema Registry (preview)](schema-registry-overview.md)