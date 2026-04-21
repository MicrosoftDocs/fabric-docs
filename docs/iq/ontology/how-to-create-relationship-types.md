---
title: Add relationship types
description: Learn about relationship types in ontology (preview) and how to manage them.
ms.date: 04/21/2026
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

1. In the Home configuration canvas, there are multiple ways to create a relationship type. Select **Add relationship** from the top ribbon, select **... > Add relationship** next to the name of an entity type in the **Explorer**, or select **... > Add relationship type** on an entity type card in the main canvas.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-1.png" alt-text="Screenshot of the Add relationship buttons.":::

1. The **Add new relationship** window appears. Enter the **Relationship type name**, the **Origin entity type**, and the **Target entity type**. Select **Create**.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-2.png" alt-text="Screenshot of the Add new relationship options.":::

1. The relationship type is created and appears in the configuration canvas. Select it on the canvas to open the relationship details configuration.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-3.png" alt-text="Screenshot of the created relationship on the canvas.":::

1. Observe the sections of the configuration page:

    * **Origin entity type**: Lists details of the origin entity.
    * **Relationship type**: Sets details of the relationship type.
    * **Target entity type**: Lists details of the target entity.

     :::image type="content" source="media/how-to-create-relationship-types/add-relationship-4.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/how-to-create-relationship-types/add-relationship-4.png":::

1. In the middle panel, enter the relationship type details.
    1. **Mapping table**: Expand **Browse available sources** and choose the table in the source data that can link the two entity types together. This table should contain identifying information for both entity types within each row (such as columns for a store ID and a freezer ID).
    1. **Matched ...** (origin entity type): This setting specifies the column in the relationship source data table whose values match the key property defined on the origin entity type. The name may match or it may be different.
    1. **Matched ...** (target entity type): This setting specifies the column in the relationship source data table whose values match the key property defined on the target entity type. The name may match or it may be different.

1. **Save** the relationship type. Confirm that the relationship type updated successfully, then select **Cancel** to close the configuration options.

1. You see the **Configure** page for the entity, where the updated relationship remains visible in the **Relationships** section.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-5.png" alt-text="Screenshot of the relationship type on the configuration page." lightbox="media/how-to-create-relationship-types/add-relationship-5.png":::

## Edit or delete relationship type

To edit or delete a relationship type, reopen its configuration page. This can be done from the Home configuration canvas or the **Relationships** section of the **Configure** page by selecting the relationship type in the canvas view. On the **Configure** page, you can also select **Manage relationships > {relationship type name}**.

:::image type="content" source="media/how-to-create-relationship-types/reopen-relationship.png" alt-text="Screenshot of reopening the relationship configuration.":::

From this page, you can edit the relationship type configuration or delete the relationship type.

:::image type="content" source="media/how-to-create-relationship-types/delete-relationship.png" alt-text="Screenshot of editing/deleting a relationship type." lightbox="media/how-to-create-relationship-types/delete-relationship.png":::

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

