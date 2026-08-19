---
title: Schema Registry in Fabric Real-Time Intelligence
description: Learn about Schema Registry, a centralized repository in Fabric Real-Time Intelligence, designed to validate and organize schemas for event-driven architectures.
#customer intent: As a data engineer, I want to understand what Schema Registry is, so that I can evaluate if it will help me manage data consistency in my real-time workflows.
contributors: null
ms.topic: overview
ms.date: 08/05/2026
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
ms.search.form: Schema Registry
ai-usage: ai-assisted
---


# Schema Registry in Fabric Real-Time Intelligence (preview)

Schema Registry in Fabric Real-Time Intelligence is a central place to define, validate, and evolve data schemas for streaming data. Use it to improve data quality and keep your real-time event-driven workflows consistent.

> [!NOTE]
> This feature is currently in preview. For the list of supported regions, see [Schema Registry region availability](schema-registry-region-availability.md).

## Benefits of using Schema Registry
Schema Registry in Fabric Real-Time Intelligence helps improve data quality, consistency, and control across your event-driven workflows.

Registering a schema means defining what your data should look like, what fields it should have, and what types of values are expected.

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

For details about who can perform each action on a schema set, see [Permissions](#permissions).

### Schema formats

The Schema Registry supports the **Avro** schema format.

### Schema registration

There are several ways to register schemas in Fabric Real-Time intelligence:

- Use the visual UI builder to create your schema step by step.
- Upload a file containing your schema definition.
- Paste your schema directly in the Code View.

You can register schemas using Fabric Real-Time hub user interface (UI) or Schema sets UI. For more information, see [Create and manage event schemas](create-manage-event-schemas.md).

### Schema versioning

Versioning is supported in Schema Registry within Fabric Real-Time Intelligence. Any edits to an existing schema are treated as a new version. Schema Registry doesn't support semantic versions. Instead, schema versions are tracked as incremental numeric versions to indicate change over time. There is no compatibility checks or native support for schema evolution yet. For more information, see [Update a schema](create-manage-event-schemas.md#update-an-event-schema).

## Permissions

Workspace roles control access to an event schema set, just like other Microsoft Fabric items. For a full description of workspace roles, see [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md).

The following table shows which workspace roles can perform each action on an event schema set and the schemas, schema versions, and event types it contains.

| Action | Admin | Member | Contributor | Viewer |
| --- | --- | --- | --- | --- |
| View the schema set, its schemas, schema versions, and event types | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| Generate client code from a schema version | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| Create, update, or delete schemas and schema versions | &#x2705; | &#x2705; | &#x2705; |  |
| Create, update, or delete event types | &#x2705; | &#x2705; | &#x2705; |  |
| Create or delete the schema set | &#x2705; | &#x2705; | &#x2705; |  |

Event schema sets don't define any item-specific permissions beyond the standard Fabric permissions.

### Share a schema set

You can also share an event schema set directly with a user who isn't a member of the workspace. When you share, the recipient gets read access to the schema set by default. Under **Additional permissions**, you can also select:

- **Edit**, which lets the recipient modify the schema set and the schemas and event types it contains.
- **Share**, which lets the recipient share the schema set with others.

Permissions granted this way apply to all event types within the schema set.

### Permissions for publishing and consuming business events

Workspace roles and sharing control access to the schema set *item* and its definitions. They don't grant access to the event *data*.

If your schema set contains business events, data access roles separately govern the ability to publish or consume those events. These roles use a deny-by-default model. Being able to view or edit a schema set doesn't by itself allow you to publish or consume its business events. For more information, see [Manage data access for business events](../../real-time-hub/business-events/manage-business-events-data-access.md).

## Related content

See the following articles:

**For Real-Time hub users:**
[Create and manage event schemas in Real-Time hub](create-manage-event-schemas-real-time-hub.md)

**For Schema sets users:**

- [Create a schema set](create-manage-event-schema-sets.md)
- [Create schemas in a schema set](create-manage-event-schemas.md)



