---
title: Create entity types
description: Learn about entity types in ontology (preview) and how to manage them.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 10/30/2025
ms.topic: how-to
---

# Entity type creation

*Entity types* represent real-world concepts such as *Truck*, *Sensor*, or *Customer*. They define standard names, descriptions, identifiers, and properties to ensure consistency across data sources and tools. By modeling your domain with entity types, you eliminate inconsistent column-level definitions and create a shared semantic layer that powers downstream experiences like analytics and AI agents. Entity types can be created manually or imported from existing business logic that lies in [semantic models](../../data-warehouse/semantic-models.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before creating entity types, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
    * **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item.
* Understanding of [core ontology concepts](overview.md#core-concepts-defining-an-ontology)
* Understanding of the data binding process from [Data binding](how-to-bind-data.md).

## Key concepts

Entity types use the following ontology (preview) concepts.

* *Entity type:* An abstract representation of a business object (like *Vehicle* or *Sensor*). It defines a logical model of an item.
* *Entity instance:* A specific occurrence of an entity type, representing a real-world object with its own unique values for the defined properties. For example, if *Vehicle* is an entity type, then a particular car with its own VIN, make, and model is an entity instance.
* *Property:* An attribute of an entity, like *ID*, *temperature* or *location*. Properties can be created manually or from data through data binding.
    * Properties can be bound to static or time series data. Static data doesn't change over time, and represents fixed characteristics about the entity type (like *ID*). Time series data contains attributes whose values vary over time (like *temperature* and *location*).
* *Entity type key:* A unique identifier for each instance of an entity type within your ontology. This value is created from static data bound to one or more properties on your entity type.
* *Data binding:* The process that connects the schema of entity types, relationship types, and properties to concrete data sources that drive enterprise operations and analytics.

## How-to steps

This section contains step-by-step instructions for adding and managing entity types.

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

### Create an entity type

1. Select **Add entity type** from the top ribbon or the center of the canvas.

    :::image type="content" source="media/how-to-create-entity-types/add-entity-type.png" alt-text="Screenshot of adding entity type.":::

1. Enter a name for your entity type, and select **Add Entity Type**.

    >[!NOTE]
    >Entity type names must be 1–26 characters, contain only alphanumeric characters, hyphens, and underscores, and start and end with an alphanumeric character.

1. Your entity type is added to the canvas, and the **Entity type configuration** pane is visible.

    :::image type="content" source="media/how-to-create-entity-types/entity-type-configuration.png" alt-text="Screenshot of the Entity type configuration pane.":::

1. In the properties tab, select **Add properties**.

    >[!NOTE]
    >Properties can be created on entity types without binding data to them, and you can bind either static or time series data to them afterwards. This section shows that process. Alternatively, you can go straight to the data binding step and add properties while binding data to them in a single operation. For detailed instructions on that process, see [Data binding](how-to-bind-data.md).

1. Add a name, data type, and property type to each property added. Select **Save** to view the saved properties in the properties tab.

    :::image type="content" source="media/how-to-create-entity-types/add-property-details.png" alt-text="Screenshot of configuring property details.":::

1. Next, define your entity type **Key** using one or more properties modeled on the entity type. This value represents a unique identifier for each record of ingested data. Select one or more columns from the source data that can be used to uniquely identify a record. This process must be done once for each entity type.

    :::image type="content" source="media/how-to-create-entity-types/entity-type-key.png" alt-text="Screenshot of the entity type key.":::

1. Optionally, select a property to use as the **Instance display name** for all your instances in downstream experiences.

1. [Bind data](how-to-bind-data.md) to the entity type to make it operational.

### Edit or delete entity type

To delete an entity type, hover over the entity type name in the **Entity types** pane and select **...** to open its options menu. Select **Delete entity type**.

:::image type="content" source="media/how-to-create-entity-types/delete-entity-type.png" alt-text="Screenshot of deleting an entity type.":::

You can edit and delete the name, key, or display name for an entity at any time.

:::image type="content" source="media/how-to-create-entity-types/edit-entity-type.png" alt-text="Screenshot of editing entity type details.":::

You can also add, edit or delete properties of an entity type at any time. Deleting a property deletes it from all associated configurations that it's part of, including keys and [relationship type configurations](how-to-create-relationship-types.md).

To add a new property, 
1. Select an entity type to open the **Entity type configuration** pane.
1. In the **Properties** tab, select the **+** icon.

    :::image type="content" source="media/how-to-create-entity-types/add-property.png" alt-text="Screenshot of adding a property.":::

1. Fill property details when prompted.

To edit or delete a property,
1. Select an entity type to open the **Entity type configuration** pane.
1. In the **Properties** tab, select **...** next to the property name. 
1. Select your preferred action from the options menu.

    :::image type="content" source="media/how-to-create-entity-types/edit-delete-property.png" alt-text="Screenshot of editing or deleting a property.":::