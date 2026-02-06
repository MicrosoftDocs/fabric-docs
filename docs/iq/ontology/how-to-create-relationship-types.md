---
title: Add relationship types
description: Learn about relationship types in ontology (preview) and how to manage them.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 10/30/2025
ms.topic: how-to
---

# Relationship types in ontology (preview)

Relationships allow organizations to model, manage, and govern semantic connections between business entities. Clearly defined relationships help organizations turn complex connections into actionable insights and decisions with the following benefits:
* Semantic clarity: Explicitly defined relationships (such as *owns*, *located at*, *supplies*, or *monitored by*) allow organizations to represent not only what entities exist, but how they interact.
* Analytics: Ontologies that are enriched with relationships offer contextualized insights.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before adding relationship types to your ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) created.
* Relationship source data that meets these guidelines:
    * The data is in [OneLake](../../onelake/onelake-overview.md).
    * The source data contains keys for both the source and target entity type.

## Key concepts

Relationship types use the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Relationship type*
* *Relationship instance*

## Create relationship type

The first step in adding a relationship in your ontology (preview) item is creating a relationship type. Then, bind data to the relationship type to create relationship instances. 

For example, suppose you want to define a relationship between the entity types *Truck* and *Driver*, and your data contains a table called *Truck data* with columns `TruckId`, `Site`, `TruckName`, and `DriverId`. You might start by defining a relationship type called *drives* from the *Driver* entity type to the *Truck* entity type. Then, create a data binding based on the *Truck data* table, using the columns `TruckId` and `DriverId` to define relationship instances for that relationship type. The result is that your *drives* relationship type has instances to represent each combination of `TruckId` and `DriverId` in your data.

Follow these steps to create a relationship type and bind data to it:

1. Select **Add relationship** in the menu ribbon. Or, highlight an entity type in the **Entity Types** pane and select **...**, then **Add relationship**.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-1.png" alt-text="Screenshot of the Add relationship button in the ribbon.":::

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-1-entity.png" alt-text="Screenshot of the Add relationship type option for an entity.":::

1. In the **Add relationship type to ontology** window, 
    1. Enter a **Relationship type name**.    
    1. Select the **Source entity type** and **Target entity type** for your relationship. The source and target entity types must be distinct from one another.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-2.png" alt-text="Screenshot of the Add relationship type options.":::

    Select **Add relationship type**.

1. The **Relationship configuration** pane opens. In this pane, you define the columns from the source data that connect instances of these entity types.

1. Under **Source data**, select your workspace, lakehouse, and table that contains the keys for both your target and source entity type.

1. For each entity type, select a **Source column** from the linking source data that identifies instances of that entity type. The source column selections must match the entity type keys.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-3.png" alt-text="Screenshot of the relationship configuration after filling the described fields." lightbox="media/how-to-create-relationship-types/add-relationship-3.png":::

    >[!TIP]
    >If you don't see any keys for an entity type, make sure your source and target entity types have keys defined. 

1. Select **Create**.
1. Verify the new relationship type is visible on the configuration canvas.

## Edit or delete relationship type

You can edit or delete relationship types that exist in your ontology (preview) items in the **Relationship configuration** pane.

* To **edit** a relationship type, select it in the configuration canvas. Then, update any of the fields in the **Relationship configuration** pane.

* To **delete** a relationship type, select it in the configuration canvas. Then, select the **Delete relationship type** button in the **Relationship configuration** pane.

    :::image type="content" source="media/how-to-create-relationship-types/delete-relationship.png" alt-text="Screenshot of editing relationship details in the relationship configuration." lightbox="media/how-to-create-relationship-types/delete-relationship.png":::

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]