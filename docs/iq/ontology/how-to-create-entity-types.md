---
title: Create entity types
description: Learn about entity types in ontology (preview) and how to manage them.
ms.date: 04/21/2026
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

    :::image type="content" source="media/how-to-create-entity-types/add-entity-type.png" alt-text="Screenshot of adding entity type.":::

1. Enter a name for your entity type, and select **Add Entity Type**.

    >[!NOTE]
    >Entity type names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character.

1. The configuration canvas displays your new entity type.

    :::image type="content" source="media/how-to-create-entity-types/new-entity-type.png" alt-text="Screenshot of the new entity type on the canvas.":::

### Add properties

You can create properties on entity types without binding data to them. Later, you can bind either static or time series data to these properties. This section shows that process. (Alternatively, you can go straight to the data binding step and add properties while binding data to them in a single operation. For detailed instructions on that process, see [Data binding](how-to-bind-data.md).)

1. Select the entity type name in the **Explorer** and select **View entity type details** from the top ribbon.

    :::image type="content" source="media/how-to-create-entity-types/view-entity-type-details.png" alt-text="Screenshot of the View Entity Type details button.":::

1. The **Configure** page opens. This page surfaces important information about the entity type, including its properties and data bindings. Expand **Manage property bindings** and select **Add properties**.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-1.png" alt-text="Screenshot of adding properties to the entity type." lightbox="media/how-to-create-entity-types/add-properties-1.png":::

1. Add a name and property type for each property. Select **Save** to view the saved properties in the Properties pane.

    >[!NOTE]
    >Property names can only be duplicated across entities for properties of the same type. For example, you can't have one entity type with a string `ID` property and another entity type with an integer `ID` property, but you can have two entity types that both have a string `ID` property.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-2.png" alt-text="Screenshot of configuring the listed property details." lightbox="media/how-to-create-entity-types/add-properties-2.png":::

1. The properties are added to the **Configure** page, labeled as unbound to any data source.

    :::image type="content" source="media/how-to-create-entity-types/add-properties-3.png" alt-text="Screenshot of the new unbound properties on the entity type." lightbox="media/how-to-create-entity-types/add-properties-3.png":::

1. Optionally, select a property to use as the **display name** for all your instances in downstream experiences.

    :::image type="content" source="media/how-to-create-entity-types/choose-display-name.png" alt-text="Screenshot of the option to choose a property as a display name.":::

1. [Bind data](how-to-bind-data.md) to the entity type, including an entity type key, to make it operational.

## Edit or delete an entity type

To delete an entity type from in your ontology (preview) item, go to the **Home** configuration canvas. Next to the entity type name in the **Explorer**, select **... > Delete entity type**.

:::image type="content" source="media/how-to-create-entity-types/delete-entity-type.png" alt-text="Screenshot of deleting an entity type.":::

To edit details of the entity type, select **View Entity type details** from the top ribbon to open the **Configure** page.

From this page, you can add, rename, and delete properties, and rename or delete the entity type itself.

:::image type="content" source="media/how-to-create-entity-types/edit-entity-type.png" alt-text="Screenshot of editing entity type details.":::

>[!NOTE]
>Deleting a property removes it from the entity everywhere it's configured, including entity type key and [relationship type configurations](how-to-create-relationship-types.md).

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

[!INCLUDE [supported property types](includes/supported-property-types.md)]