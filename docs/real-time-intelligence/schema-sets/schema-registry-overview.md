---
title: Schema Registry in Fabric Real-Time Intelligence
description: Learn about Schema Registry, a centralized repository in Fabric Real-Time Intelligence, designed to validate and organize schemas for event-driven architectures.
#customer intent: As a data engineer, I want to understand what Schema Registry is, so that I can evaluate if it will help me manage data consistency in my real-time workflows.
contributors: null
ms.topic: overview
ms.date: 09/08/2026
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
ms.search.form: Schema Registry
ai-usage: ai-assisted
---
# Schema Registry in Fabric Real-Time Intelligence

Schema Registry in Fabric Real-Time Intelligence is a central place to define, validate, and evolve data schemas for streaming data.

By organizing your schemas and schema sets centrally, your teams can improve data quality, consistency, and control across your event-driven workflows. After you register a schema and define what your events should look like, what fields it should have, and what types of values are expected, you can use these defined events and map them to your Eventstreams or re-use them as Business Events.

Registering a schema doesn't validate or filter events. You must use them in Eventstreams, which determines how incoming events are associated with schemas.

> [!NOTE]
> Role in schema-aware Eventstreams (Preview)
>
> Schema-aware Eventstreams integrates with Event Schema sets to use schemas for processing events from certain sources. Ingested events tagged with registered schemas can be automatically recognized and processed by using their corresponding schema definitions. Schematized, classified, and untyped events can coexist in the same Eventstream. For more information, see [Schema-aware Eventstreams](../event-streams/schema-aware-eventstreams-overview.md).

Schema Registry also manages any schemas that you create as part of Business Events. Once defined, you can publish or subscribe to these events. For more information, see [Business events overview](../../real-time-hub/business-events/business-events-overview.md).

Use event schema sets to:

- Discover and reuse related schemas across teams.
- Import multiple Avro schemas and their versions together.
- Publish new versions while retaining earlier definitions.
- Compare versions before updating producers and consumers.
- Control access through Fabric workspace roles and item sharing.

## Key concepts

This section describes key concepts of Schema Registry.

### Schema Registry

The [Event schema registry page](../../real-time-hub/event-schema-registry-page.md) in Real-Time hub provides a tenant-wide view of the schema sets and schemas you have permission to access. Expand a schema set to explore its schemas, preview a definition, or open the schema set or an individual schema.

### Schema sets

With Schema Registry, you can organize one or more related schemas into schema sets, enabling logical grouping and centralized access control. You can manage who can view, edit, or modify schemas at the group level, making it easier to govern schema usage across teams or projects. For more information, see [Create and manage event schema sets](create-manage-event-schema-sets.md).

For details about who can perform each action on a schema set, see [Permissions](#permissions).

### Schema formats

The Schema Registry supports the **Avro** schema format.

An Avro schema describes fields, types, and nested structures. The schema format is different from the encoding used to send event payloads; supported payload formats depend on the source connector.

### Event types

An event type identifies an event and references its schema. Event types can also carry protocol metadata, such as a CloudEvents type. An event schema set groups related schemas and event types in one Fabric workspace item. The metadata model is based on the vendor-neutral [xRegistry specification](https://github.com/xregistry/spec).

### Schema registration

You can register schemas in Fabric Real-Time Intelligence by using one of the following methods:

- Use the visual UI builder to create your schema step by step.
- Upload a file that contains your schema definition.
- Paste your schema directly in the Code View.
- Import multiple Avro files into a new or existing schema set.

Register schemas by using the Fabric Real-Time hub user interface (UI) or the Schemasets UI. For more information, see [Create and manage event schemas](create-manage-event-schemas.md).

### Schema versioning

Saving an updated schema definition creates a new, incrementally numbered version. Earlier versions remain available for inspection and comparison. Schema Registry doesn't use semantic version numbers, and instead uses named versions (v1, v2, and so on).

You can switch the version you view without changing the latest version or reconfiguring a pipeline. Use version comparison to review changes before adopting a new definition. The UI doesn't expose compatibility policy controls. Reviewing a comparison doesn't guarantee that a change is safe for existing consumers. For more information, see [Manage event schema versions](manage-event-schema-versions.md).

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
- [Import event schemas](import-event-schemas.md)
- [Manage event schema versions](manage-event-schema-versions.md)
- [Event schema limitations](schema-registry-limitations.md)
