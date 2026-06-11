---
title: Create Entity Types
description: Learn about entity types in ontology (preview) and how to manage them.
ms.date: 05/11/2026
ms.topic: how-to
---

# Entity type creation in ontology (preview)

*Entity types* represent real-world concepts such as *Truck*, *Sensor*, or *Customer*. They define standard names, descriptions, identifiers, and properties to ensure consistency across data sources and tools. By modeling your domain with entity types, you eliminate inconsistent column-level definitions and create a shared semantic layer that powers downstream experiences like analytics and AI agents. You can create entity types manually or import them from existing business logic in [semantic models](../../data-warehouse/semantic-models.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before creating entity types, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item.
* Understanding of [core ontology concepts](overview.md#core-concepts-defining-an-ontology).
* Understanding of the data binding process from [Data binding](how-to-bind-data.md).

## Key concepts

Entity types use the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Entity type key*
* *Entity instance*
* *Property*
* *Data binding*

## Create an entity type

Follow these steps to create entity types in your ontology (preview) item.

1. From the Home configuration canvas, select **Add entity type** from the top ribbon or the center of the canvas.

    :::image type="content" source="media/how-to-create-entity-types/add-entity-type.png" alt-text="Screenshot of adding entity type." lightbox="media/how-to-create-entity-types/add-entity-type.png":::

1. Enter a name for your entity type, and select **Add Entity Type**.

    >[!NOTE]
    >Entity type names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character.

1. The configuration canvas displays your new entity type.

    :::image type="content" source="media/how-to-create-entity-types/new-entity-type.png" alt-text="Screenshot of the new entity type on the canvas.":::

### Add properties

This section shows how to create properties on entity types without binding data to them (the properties remain unbound until you add data bindings for them later). It's also possible to add properties while binding data in a single operation, which is described in [Data binding](how-to-bind-data.md).

1. Select the entity type name in the **Explorer** and select **View entity type details** from the top ribbon.

    :::image type="content" source="media/how-to-create-entity-types/view-entity-type-details.png" alt-text="Screenshot of the View Entity Type details button." lightbox="media/how-to-create-entity-types/view-entity-type-details.png":::

1. The **Configure** page opens. This page surfaces important information about the entity type, including its properties and data bindings. Expand **Manage property bindings** and select **Add properties**.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-1.png" alt-text="Screenshot of adding properties to the entity type." lightbox="media/how-to-create-entity-types/add-properties-1.png":::

1. Add a name and property type for each property, or choose *Define at binding* to [model untyped properties](#modeling-untyped-properties) without specifying a data type upfront. Select **Save** to view the saved properties in the Properties pane.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-2.png" alt-text="Screenshot of configuring the listed property details." lightbox="media/how-to-create-entity-types/add-properties-2.png":::

    >[!NOTE]
    >Property names can only be duplicated across entities for properties of the same type. For example, you can't have one entity type with a string `ID` property and another entity type with an integer `ID` property, but you can have two entity types that both have a string `ID` property.

1. The properties are added to the **Configure** page, unbound to any data source.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-3.png" alt-text="Screenshot of the new unbound properties on the entity type." lightbox="media/how-to-create-entity-types/add-properties-3.png":::

1. Optionally, select a property to use as the **display name property** for instances of this entity type in downstream experiences.

    :::image type="content" source="media/how-to-create-entity-types/choose-display-name.png" alt-text="Screenshot of the option to choose a property as a display name." lightbox="media/how-to-create-entity-types/choose-display-name.png":::

1. To make the entity type operational, [bind data](how-to-bind-data.md) to it.

## Edit or delete an entity type

To delete an entity type from in your ontology (preview) item, go to the Home configuration canvas. Next to the entity type name in the **Explorer**, select **... > Delete entity type**.

:::image type="content" source="media/how-to-create-entity-types/delete-entity-type.png" alt-text="Screenshot of deleting an entity type." lightbox="media/how-to-create-entity-types/delete-entity-type.png":::

To edit details of the entity type, select **View Entity type details** from the top ribbon to open the **Configure** page.

From this page, you can add, rename, and delete properties, and rename or delete the entity type itself.

:::image type="content" source="media/how-to-create-entity-types/edit-entity-type.png" alt-text="Screenshot of editing entity type details." lightbox="media/how-to-create-entity-types/edit-entity-type.png":::

Deleting a property removes it from the entity everywhere it's configured, including entity type key and [relationship type configurations](how-to-create-relationship-types.md).

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

[!INCLUDE [supported property types](includes/supported-property-types.md)]

## Modeling untyped properties

Entity types in ontology (preview) support creating properties without specifying a data type upfront. This capability enables conceptual modeling workflows where you define business concepts and their meanings before making technical decisions about data types. When you're ready to bind data to these properties, the data type is determined at that point.

Untyped properties are useful when:

* You're modeling business concepts before identifying source systems or data structures.
* You want to separate conceptual modeling (what the business means) from physical modeling (how data is structured).

An untyped property is always unbound. Once you bind data to an untyped property, it becomes both typed and bound in a single operation.

>[!NOTE]
>Untyped properties don't appear in query results, data previews, or downstream experiences (such as Fabric Graph, SQL endpoint, or KQL) until a data type is assigned through binding. However, untyped properties are included in the entity type definition returned by the API, so programmatic consumers can discover and reference them before binding.

### Create untyped property

To create a property without specifying a data type, choose *Define at binding* as the **Property type** when defining the property.

:::image type="content" source="media/how-to-create-entity-types/untyped-property.png" alt-text="Screenshot of creating an untyped property." lightbox="media/how-to-create-entity-types/untyped-property.png":::

### Assign a data type by binding data

When you're ready to assign a data type to an untyped property, [bind a source column to it](how-to-bind-data.md). The source column's native data type becomes the property's data type.

After binding, the property becomes operational and appears in query results, previews, and downstream experiences.