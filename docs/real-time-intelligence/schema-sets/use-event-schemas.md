---
title: Use Schemas in Eventstreams - Fabric Real-Time Intelligence
ms.subservice: rti-hub
ms.service: fabric
ms.reviewer: spelluru
description: Discover how to enable and manage schemas in eventstreams. Step-by-step guidance for custom endpoints, Azure SQL CDC, and schema-validated destinations.
#customer intent: As a user, I want to learn how to use event schemas in eventstreams in Real-Time Intelligence.
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/07/2025
  - ai-gen-description
ms.date: 08/07/2025
ms.search.form: Schema Registry
---


# Use schemas in eventstreams (Fabric Real-Time intelligence)
You can use a schema registered with Schema Registry in eventstreams so that only the events that confirm to the schema are ingested into Fabric. 

> [!IMPORTANT]
> You can't enable schema support for existing eventstreams. You must enable schema support when you create an eventstream.


## Supported sources
- [Custom app or endpoint](../event-streams/add-source-custom-app.md?pivots=extended-features)
- [Azure SQL Database Change Data Capture (CDC)](../event-streams/add-source-azure-sql-database-change-data-capture.md?pivots=extended-features)

## Supported destinations

Currently, schema-validated events can only be sent to:

- [Eventhouse (push mode)](../event-streams/add-source-azure-event-hubs.md?pivots=extended-features#configure-schemas-for-an-eventhouse-destination)
- [Custom app or endpoint](../event-streams/add-source-azure-event-hubs.md?pivots=extended-features#configure-schema-for-a-custom-endpoint-destination)
- Another stream (derived stream)

