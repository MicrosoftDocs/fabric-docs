---
title: Schema Registry in Fabric Real-Time Intelligence
description: Learn about Schema Registry in Microsoft Fabric Real-Time Intelligence. This centralized repository manages data schemas, improves data quality, and enables schema validation for event-driven architectures.
author: spelluru
contributors: 
ms.topic: overview
ms.date: 08/07/2025
ms.author: spelluru
ms.reviewer: spelluru
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
---

# Schema Registry in Fabric Real-Time Intelligence (preview)

Schema Registry in Fabric Real-Time Intelligence is a centralized repository for managing and organizing data schemas. This feature provides a structured framework for defining, validating, and evolving schemas used in event-driven architectures, helping you improve data quality and maintain consistency across your real-time workflows.

> [!NOTE]
> This feature is currently in preview.

## Benefits of using Schema Registry
Schema Registry in Fabric Real-Time Intelligence helps improve data quality, consistency, and control across your event-driven workflows. 

Registering a schema means defining what your data should look like, what fields it should have, what types of values are expected, and how it’s structured. 

When schema registration is enabled, only events that match the registered schema are allowed to move through your event-driven architecture. It helps catch errors early and ensures that your data is clean, consistent, and ready to use. 

Schema validation is applied throughout the Fabric Real-Time intelligence workflow: 

- When events first enter through an eventstream 
- During preprocessing and transformation 
- Before data is delivered to destinations like Eventhouse, Lakehouse, and Data Activator 
- Even for derived streams, where one stream feeds into another 

Using schemas not only improves data quality but also gives you better control by preventing bad or unexpected data from disrupting your downstream processes. 

Schema Registry helps you maintain data integrity, enable reuse across services, and establish access controls—all key to building reliable and scalable real-time data solutions in Fabric Real-Time intelligence. 

## Key concepts 
This section describes key concepts of Schema Registry. 

### Schema sets
With Schema Registry, you can organize one or more related schemas into schema sets, enabling logical grouping and centralized access control. You can manage who can view, edit, or modify schemas at the group level, making it easier to govern schema usage across teams or projects. For more information, see [Create and manage event schema sets](create-manage-event-schema-sets.md).

### Schema formats
Currently, the Schema Registry supports **Avro** schema format.

### Schema registration
There are several ways to register schemas in Fabric Real-Time intelligence: 

- Use the visual UI builder to create your schema step by step.
- Upload a file containing your schema definition.
- Paste your schema directly in the Code View 

You can register schemas using Fabric Real-Time hub user interface (UI) or Schema sets UI. For more information, see [Create and manage event schemas](create-manage-event-schemas.md). 

### Schema versioning
Versioning is supported in Schema Registry within Fabric Real-Time Intelligence. However, the system doesn't guarantee a semantic version. Also, there's no check to see if a schema is actually changed. Any edits to an existing schema are treated as a new version. As described earlier, there aren't compatibility checks or native support for schema evolution yet. For more information, see [Update a schema](create-manage-event-schemas.md#update-an-event-schema).


## Related content
See the following articles:

**For Real-Time hub users:**
[Create and manage event schemas in Real-Time hub](create-manage-event-schemas-real-time-hub.md)

**For Schema sets users:**
1. [Create a schema set](create-manage-event-schema-sets.md)
2. [Create schemas in a schema set](create-manage-event-schemas.md)

