---
title: Create Relationship Types (Preview)
description: Learn about relationship types in ontology (preview) and how to manage them.
ms.date: 09/04/2026
ms.topic: how-to
---

# Create relationship types in ontology (preview)

With relationships, organizations can model, manage, and govern semantic connections between business entities. Clearly defined relationships help organizations turn complex connections into actionable insights and decisions with the following benefits:
* Semantic clarity: With explicitly defined relationships (such as *owns*, *located at*, *supplies*, or *monitored by*), organizations can represent not only what entities exist, but how they interact.
* Analytics: Ontologies enriched with relationships offer contextualized insights.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before adding relationship types to your ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item).
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) created.
* Relationship source data that meets these guidelines:
    * The data is in [OneLake](../../onelake/onelake-overview.md).
    * The source data contains keys for both the source and target entity type.

## Create relationship type

The first step in adding a relationship in your ontology (preview) item is creating a relationship type. Then, bind data to the relationship type to create relationship instances.

For example, suppose you want to define a relationship between the entity types *Truck* and *Driver*, and your data contains a table called *Truck data* with columns `TruckId`, `Site`, `TruckName`, and `DriverId`. You might start by defining a relationship type called *drives* from the *Driver* entity type to the *Truck* entity type. Then, create a data binding based on the *Truck data* table, by using the columns `TruckId` and `DriverId` to define relationship instances for that relationship type. The result is that your *drives* relationship type has instances to represent each combination of `TruckId` and `DriverId` in your data.

Follow these steps to create a relationship type and bind data to it:

1. The Home configuration canvas provides multiple ways to create a relationship type. Select **Add relationship** from the top ribbon, select **... > Add relationship** next to the name of an entity type in the **Explorer**, or select **... > Add relationship type** on an entity type card in the main canvas.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-canvas.png" alt-text="Screenshot of the Add relationship buttons." lightbox="media/how-to-create-relationship-types/add-relationship-canvas.png":::

1. The **Add new relationship** window appears. Enter the **Relationship type name**, the **Origin entity type**, and the **Target entity type**. Select **Create**.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-details.png" alt-text="Screenshot of the Add new relationship options." lightbox="media/how-to-create-relationship-types/add-relationship-details.png":::

    >[!NOTE]
    >Due to a known issue affecting duplicate relationship names, ensure relationship names are unique.

1. The relationship type appears in the configuration canvas. Select it on the canvas to open the relationship details configuration.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-done.png" alt-text="Screenshot of the created relationship on the canvas." lightbox="media/how-to-create-relationship-types/add-relationship-done.png":::

1. Observe the sections of the configuration page:

    * **Namespace**: Lists the current [namespace](how-to-use-namespaces.md) of the relationship and lets you edit it.
    * **Use mapping table?** toggle. If you have a table in your data source that establishes a relationship between these entity types, turn on this setting to specify the table as a relationship data source. Otherwise, the relationship directly relates a column in the origin entity data source with a column in the target entity data source.
    * **Origin entity type**: Lists details of the origin entity.
    * **Relationship**: Sets details of the relationship type.
    * **Target entity type**: Lists details of the target entity.

     :::image type="content" source="media/how-to-create-relationship-types/add-relationship-sections.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/how-to-create-relationship-types/add-relationship-sections.png":::

1. In the **Origin entity type** section, your entity type choice from the relationship creation populates automatically. Under **Property**, select a property in the origin entity type data source that links it to the target entity type.

1. Similarly, select a property in the **Target entity type** section that links the target entity type to the origin entity type.

1. If you turn on **Use mapping table?**, the middle panel shows a **Mapping table** source selection. Browse available sources and select the data table containing relationship details from the OneLake catalog.
    
    Select the column in the relationship source table that maps to the property you selected on each of the origin entity type and the target entity type. This selection clarifies how the relationship source table represents the origin entity type and target entity type.

     :::image type="content" source="media/how-to-create-relationship-types/add-relationship-mapping-table.png" alt-text="Screenshot of the mapping table selection." lightbox="media/how-to-create-relationship-types/add-relationship-mapping-table.png":::

1. **Save** the relationship type. You see a banner confirming that the ontology successfully updated the relationship type.
1. Select **Cancel** to close the configuration options. You see the **Configure** page for the entity, where the updated relationship is visible in the **Relationships** section.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-finished.png" alt-text="Screenshot of the relationship type on the configuration page." lightbox="media/how-to-create-relationship-types/add-relationship-finished.png":::

## Edit or delete relationship type

To edit or delete a relationship type, reopen its configuration page by selecting the relationship type in the canvas view (visible in both the Home configuration canvas and the **Relationships** section of the **Configure** page). On the **Configure** page, you can also select **Manage relationships > {relationship type name}**.

:::image type="content" source="media/how-to-create-relationship-types/open-relationship.png" alt-text="Screenshot of reopening the relationship configuration." lightbox="media/how-to-create-relationship-types/open-relationship.png":::

On this page, edit the relationship type configuration or delete the relationship type.

:::image type="content" source="media/how-to-create-relationship-types/delete-relationship.png" alt-text="Screenshot of editing/deleting a relationship type." lightbox="media/how-to-create-relationship-types/delete-relationship.png":::

[!INCLUDE [Refresh graph model](includes/refresh-graph-model.md)]
