---
title: Schema Registry in Fabric Real-Time hub
description: Learn about Schema Registry in Fabric Real-Time hub. 
author: spelluru
ms.author: spelluru
ms.topic: overview
ms.date: 07/02/2025
---

# What is Schema Registry in Fabric Real-Time hub? 

Schema Registry is a centralized repository for managing and organizing data schemas within Fabric Real-Time Intelligence. It provides a structured framework for defining, validating, and evolving schemas used in event-driven architectures to describe events.

## Why use Schema Registry?
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

### Key benefits
Here are the key benefits of using Schema Registry: 

- **Centralized management**: Store all your schemas in one location for easy access and governance.
- **Version control**: Track schema evolution and maintain backward compatibility.
- **Validation**: Ensure data consistency across your event-driven applications.
- **Integration**: Seamlessly connect with Fabric Real-Time Intelligence services.

## Schema sets
With Schema Registry, you can organize one or more related schemas into schema sets, enabling logical grouping and centralized access control. You can manage who can view, edit, or modify schemas at the group level, making it easier to govern schema usage across teams or projects. 

## Schema formats
Currently, the Schema Registry supports **Avro** schema format.

## Schema registration
There are several ways to register schemas in Fabric Real-Time intelligence: 

- Use the visual UI builder to create your schema step by step.
- Upload a file containing your schema definition.
- Paste your schema directly in the Code View 

You can register schemas using Fabric Real-Time hub user interface (UI) or Schema sets UI. For more information, see [Create and manage event schemas](create-manage-event-schema.md). 
 

## Next steps
- If you're using real-time hub, see [Create and manage event schemas in Real-Time hub](../../real-time-hub/add-event-schema.md).
- If you're using schema sets, first [create a schema set](create-manage-event-schema-sets.md), and then see [Create schemas in a schema set](create-manage-event-schemas.md).

