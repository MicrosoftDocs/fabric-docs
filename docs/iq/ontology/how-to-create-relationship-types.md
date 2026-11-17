---
title: Create Relationship Types (Preview)
description: Learn about relationship types in ontology (preview) and how to manage them.
ms.date: 11/09/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Create relationship types in ontology (preview)

With relationships, organizations can model, manage, and govern semantic connections between business entities. Clearly defined relationships help organizations turn complex connections into actionable insights and decisions with the following benefits:
* Semantic clarity: With explicitly defined relationships (such as *owns*, *located at*, *supplies*, or *monitored by*), organizations can represent not only what entities exist, but how they interact.
* Analytics: Ontologies enriched with relationships offer contextualized insights.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before adding relationship types to your ontology, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Users can create ontology (preview) items** and **Users can create Fabric items** [enabled on your Fabric tenant](overview-tenant-settings.md).
* An ontology (preview) item with [entity types](how-to-create-entity-types.md) created.
* Relationship source data that meets these guidelines:
    * The data is in [OneLake](../../onelake/onelake-overview.md).

## Create relationship type

The first step in adding a relationship in your ontology (preview) item is creating a relationship type. Then, bind data to the relationship type to create relationship instances.

For example, suppose you want to define a *suppliedBy* relationship from the *Product* entity type to the *Supplier* entity type. Your *dimproducts* table contains `ProductId` and `SupplierId` columns. Use that table as a mapping table: map `ProductId` to the Product entity's `ProductId` property and `SupplierId` to the Supplier entity's `SupplierId` property. Each source row then identifies a product and its supplier.

Follow these steps to create a relationship type and bind data to it:

1. On the **Home** tab of the top ribbon, select **+ Add** > **Relationship type**. Alternatively, select the origin entity type and then select **Entity type** > **+ Add** > **Relationship type**, as shown in the following screenshot.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-canvas.png" alt-text="Screenshot of the Relationship type option in the Entity type ribbon's Add menu." lightbox="media/how-to-create-relationship-types/add-relationship-canvas.png":::

1. The **Add new relationship** window appears. Enter the **Name**, the **Origin entity type**, and the **Target entity type**. Select **Add**.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-details.png" alt-text="Screenshot of the Add new relationship options." lightbox="media/how-to-create-relationship-types/add-relationship-details.png":::

    >[!NOTE]
    >Due to a known issue affecting duplicate relationship names, ensure relationship names are unique.

1. The relationship type appears in the configuration canvas. Select it on the canvas to open the relationship details configuration.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-done.png" alt-text="Screenshot of the created relationship on the canvas." lightbox="media/how-to-create-relationship-types/add-relationship-done.png":::

1. Observe the sections of the configuration page:

    * **Namespace**: Lists the current [namespace](how-to-use-namespaces.md) of the relationship and lets you edit it.
    * **Use mapping table** switch: If you have a table in your data source that establishes a relationship between these entity types, turn on this setting to specify the table as a relationship data source. Otherwise, the relationship directly relates a column in the origin entity data source with a column in the target entity data source.
    * **Origin entity type**: Lists details of the origin entity.
    * **Relationship name**: Sets the name of the relationship type.
    * **Target entity type**: Lists details of the target entity.

     :::image type="content" source="media/how-to-create-relationship-types/add-relationship-sections.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/how-to-create-relationship-types/add-relationship-sections.png":::

1. In the **Origin entity type** section, your entity type choice from the relationship creation populates automatically. Under **Property 1**, select a property in the origin entity type data source that links it to the target entity type.

1. Similarly, select a property in the **Target entity type** section that links the target entity type to the origin entity type.

1. If you turn on **Use mapping table**, select the linking properties under **Properties** for each entity type. In the middle panel, use **Mapping table** to choose the table containing relationship details from the OneLake catalog, and then select **Select**.
    
    Select the column in the relationship source table that maps to the property you selected on each of the origin entity type and the target entity type. This selection clarifies how the relationship source table represents the origin entity type and target entity type.

    In the illustrated *suppliedBy* example, select `ProductId` for Product and `SupplierId` for Supplier. Use *dimproducts* as the mapping table, and select its `ProductId` and `SupplierId` columns in the corresponding **Match with** fields.

     :::image type="content" source="media/how-to-create-relationship-types/add-relationship-mapping-table.png" alt-text="Screenshot of dimproducts mapping ProductId and SupplierId for the suppliedBy relationship." lightbox="media/how-to-create-relationship-types/add-relationship-mapping-table.png":::

1. **Save** the relationship type. You see a banner confirming that the ontology successfully updated the relationship type.
1. Select **Cancel** to close the configuration options. You see the **Configure** page for the entity, where the updated relationship is visible in the **Relationships** section.

    :::image type="content" source="media/how-to-create-relationship-types/add-relationship-finished.png" alt-text="Screenshot of the relationship type on the configuration page." lightbox="media/how-to-create-relationship-types/add-relationship-finished.png":::

## Edit or delete relationship type

To edit or delete a relationship type, reopen its configuration page by selecting the relationship type in the canvas view (visible in both the Home configuration canvas and the **Relationships** section of the **Configure** page). On the **Configure** page, you can also select **Manage relationships > {relationship type name}**.

:::image type="content" source="media/how-to-create-relationship-types/open-relationship.png" alt-text="Screenshot of reopening the relationship configuration." lightbox="media/how-to-create-relationship-types/open-relationship.png":::

On this page, edit the relationship type configuration or delete the relationship type.

:::image type="content" source="media/how-to-create-relationship-types/delete-relationship.png" alt-text="Screenshot of editing/deleting a relationship type." lightbox="media/how-to-create-relationship-types/delete-relationship.png":::

[!INCLUDE [Refresh graph model](includes/refresh-graph-model.md)]
