---
title: "Tutorial: Create an ontology"
description: Create an ontology (preview) item with data from a semantic model or OneLake.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/03/2025
ms.topic: tutorial
zone_pivot_group_filename: iq/ontology/zone-pivot-groups.json
zone_pivot_groups: create-ontology-scenario
---

# Ontology (preview) tutorial part 1: Create an ontology

In this step of the tutorial, you generate a new ontology that represents the Lakeshore Retail scenario.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This tutorial contains two options for setting up the ontology (preview) item: automatically **generate it from a semantic model**, or manually **build it from OneLake data**. 

Choose your preferred scenario by using the selector at the beginning of the article.

::: zone pivot="semantic-model"
## About generating an ontology from a semantic model

A [semantic model](../../data-warehouse/semantic-models.md) in Fabric is a logical description of an analytical domain (like a business). They can be created from lakehouse tables, and hold information about your data and the relationships among that data.

When your data is represented by a semantic model, you can generate an ontology directly from that semantic model. 

Ontology generation automatically performs the following actions:
* Creates a new **ontology (preview) item** in your Fabric workspace, with a name of your choosing
* Creates an **entity type** in the ontology for each table in your semantic model
* Creates **static properties** on each entity type based on the columns in your tables, and **binds data** to them based on data rows
* Creates **relationship types** between entity types that follow relationships defined in the semantic model

After generating an ontology, complete these actions manually:
* Bind **time series data** to entity types (properties for time series data aren't created automatically)
* Review **entity type keys** and add them if missing (especially for multi-key scenarios)
* Bind **relationship types** to data
* Review the entire ontology to make sure entity types, their properties and data bindings, and relationships are complete

In this tutorial step, you generate an ontology from the sample semantic model that you set up in the [previous step](tutorial-0-introduction.md?pivots=semantic-model#prepare-the-power-bi-semantic-model).

### Support for semantic model modes

This section describes support in ontology (preview) for different semantic model modes. For more information about semantic models and their modes, see [Power BI semantic models in Microsoft Fabric](../../data-warehouse/semantic-models.md).

| Ontology (preview) | Import mode | Direct Lake mode | DirectQuery mode |
| --- | --- | --- | --- |
| Generating entity type definitions | Supported | Supported | Supported |
| Generating property definitions | Supported | Supported | Supported |
| Generating relationship definitions | Supported | Supported | Supported |
| Generating entity type bindings to data sources | Not supported | Supported | Not Supported |
| Generating relationship type bindings to data sources | Not supported | Supported only if primary key is identified (the primary key is used as the entity type key for the ontology) | Not Supported |
| Querying data using bindings to data sources | Not supported | Supported (without measures and calculated columns) | Not Supported |

### Other semantic model limitations

* Ontology does not support creating data bindings when the semantic model table is in **Direct Lake mode** and the backing lakehouse is in a workspace with **inbound public access disabled**. The ontology item is created successfully but that entity type has no data bindings.
* Fabric Graph does not currently support the `Decimal` type. As a result, if you generate an ontology from a semantic model with tables that include `Decimal` type columns, you see null values returned for those properties on all queries. 
    * `Decimal` is different from the floating-point `Double` type, which is supported. `Decimal` is a fixed-precision numeric type that is most commonly used for representing monetary values.

## Generate ontology

1. Go to the *RetailSalesModel* semantic model in Fabric. From the top ribbon, select **Generate Ontology**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/generate-ontology.png" alt-text="Screenshot of Generate ontology button in the ribbon." lightbox="media/tutorial-1-create-ontology/semantic-model/generate-ontology.png":::

1. Select your **Workspace** and enter *RetailSalesOntology* for the **Name**. Select **Create**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/generate-ontology-2.png" alt-text="Screenshot of Generate ontology details.":::

    >[!TIP]
    >Ontology names can include numbers, letters, and underscores (no spaces or dashes).

The ontology (preview) item opens when it's ready.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/ontology-start.png" alt-text="Screenshot of new ontology.":::

>[!NOTE]
>If you see an error that Fabric is unable to create the ontology (preview) item, make sure that all the required settings are enabled for your tenant, as described in the [Tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

Next, review the entity types, data bindings, and relationships that were generated from your semantic model. In the following sections, you make a few edits to complete the ontology configuration, and verify that generated items are correct.

## Verify entity types

Entity types represent types of objects in a business. The **Entity Types** pane lists all three entity types in the ontology, named after the data tables:
* *factsales*
* *dimstore*
* *dimproducts*

>[!TIP] 
>If you don't see any entities in the ontology, make sure your semantic model is published, the tables in the semantic model are visible (not hidden), and relationships are defined. To revisit the setup steps for the semantic model, see [Prepare the Power BI Semantic Model ](tutorial-0-introduction.md#prepare-the-power-bi-semantic-model).

### Rename entity types

Follow these steps to rename each entity type to a friendlier name.
1. Select the entity type.
1. In the **Entity type configuration** pane, select the edit icon next to the **Entity type name**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/rename-entity-types.png" alt-text="Screenshot of renaming an entity type.":::

    Enter the new name from the following table.

    | Old name | New name |
    | --- | --- |
    | *factsales* | *SaleEvent* |
    | *dimstore* | *Store* |
    | *dimproducts* | *Products* |

When you're done renaming all the entity types, they look like this (they might be listed in a different order).

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/all-entity-types.png" alt-text="Screenshot of the renamed entity types.":::

## Verify properties

To view the properties of an entity type, select it from the **Entity types** pane. This action opens the **Entity type configuration** pane, where the entity type's properties are listed on the **Properties** tab.

Verify that each entity type has the properties described in the following table.

| Entity type | Key | Properties |
| --- | --- | --- |
| *SaleEvent* |  | `ProductId`, `RevenueUSD`, `SaleDate`, `SaleId`, `StoreId`, `Units` |
| *Store* | `StoreId` | `City`, `Region`, `Latitude`, `Longitude`, `StoreId`, `StoreName` |
| *Products* | `ProductId` |  `Brand`, `Category`, `ProductId`, `ProductName`, `Subcategory` |

Here's an example of what entity type properties look like.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/verify-properties.png" alt-text="Screenshot of the Products entity type and its properties." lightbox="media/tutorial-1-create-ontology/semantic-model/verify-properties.png":::

### Add SaleEvent key

The *SaleEvent* entity type doesn't have a key that was imported from the source data, so you need to add it manually.

1. Open the *SaleEvent* entity type.
1. In the **Entity type configuration** pane, select **Add entity type key**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/add-key.png" alt-text="Screenshot of adding entity type key.":::

1. Select `SaleId`.

    >[!NOTE]
    >Due to a [known issue](https://support.fabric.microsoft.com/known-issues/?product=IQ&issueId=1615), only strings or integers should be currently used as entity type keys.

1. When the key is saved, it looks like this:

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/sale-event-key.png" alt-text="Screenshot of the sale event key.":::

## Verify bindings

To view data bindings for an entity type, look in the **Entity type configuration** pane and switch to the **Bindings** tab. Data bindings connect an entity type to a data source so that instances of it can be created and populated with data.

Verify that each entity type is successfully bound to the data sources described in the following table.

| Entity type | Source table |
| --- | --- |
| *SaleEvent* | *factsales* |
| *Store* | *dimstore* |
| *Products* | *dimproducts* |

Here's an example of what the bindings look like.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/verify-bindings.png" alt-text="Screenshot of the Sale Event entity type and its data bindings.":::

## Verify and configure relationship types

Finally, verify the relationship types between entity types. Relationship types represent how entity types are related to each other in a business context. The relationship types that were imported from the semantic model are defined, but not fully configured and bound to data. 

Select the *SaleEvent* entity type to display it and its relationship types on the canvas. 

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/sale-event-relationships.png" alt-text="Screenshot of the sale event entity type and its relationships." lightbox="media/tutorial-1-create-ontology/semantic-model/sale-event-relationships.png":::

Select each of the relationship types and update its details to match the following table. First, rename the relationship type to the provided friendlier name. Next, set the correct order of source and target entity types. Finally, bind the relationship type to the source data table and select the source columns.

>[!NOTE]
>To prevent unexpected behavior from a [known issue](https://support.fabric.microsoft.com/known-issues/?product=IQ&issueId=1619), make sure the correct source and target entity types are set before choosing the source data table to bind.

The final relationship details match the following table.

| Old name | New name | Source entity type | Target entity type | Source data table |
| --- | --- | --- | --- | --- |
| *factsales_has_dimproducts* | *soldIn* | *Products* | *SaleEvent* | Tutorial workspace > *OntologyDataLH* > *factsales* <br>Set source columns to match entity type key properties |
| *factsales_has_dimstore* | *has* | *Store* | *SaleEvent* | Tutorial workspace > *OntologyDataLH* > *factsales* <br>Set source columns to match entity type key properties |

Here's an example of what an updated relationship type looks like.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/verify-relationship-types.png" alt-text="Screenshot of a relationship on SaleEvent." lightbox="media/tutorial-1-create-ontology/semantic-model/verify-relationship-types.png":::

::: zone-end

::: zone pivot="onelake"
## About building an ontology from OneLake

When your data is stored in OneLake, you can build an ontology from the OneLake data tables.

That manual process involves these steps:
* Create an **ontology item**
* Create **entity types**
* Create **data bindings** for the entity types
    * Select **entity type keys**
* Create **relationship types** between entity types, and bind them to source data

In this tutorial step, you build an ontology from the sample OneLake data that you set up in the [previous step](tutorial-0-introduction.md).

## Create ontology (preview) item

1. In your Fabric workspace, select **+ New item**. Search for and select the **Ontology (preview)** item.

   :::image type="content" source="media/tutorial-1-create-ontology/onelake/new-ontology.png" alt-text="Screenshot of the ontology (preview) item." lightbox="media/tutorial-1-create-ontology/onelake/new-ontology.png":::

1. Enter *RetailSalesOntology* for the **Name** of your ontology and select **Create**.

    >[!TIP]
    >Ontology names can include numbers, letters, and underscores (no spaces or dashes).

The ontology opens when it's ready.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/ontology-blank.png" alt-text="Screenshot of empty ontology.":::

>[!NOTE]
>If you see an error that Fabric is unable to create the ontology (preview) item, make sure that all the required settings are enabled for your tenant, as described in the [Tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

Next, create entity types, data bindings, and relationships based on data from your lakehouse tables. 

## Create entity types and data bindings

First create entity types, which represent types of objects in a business. This step has three entity types: *Store*, *Products*, and *SaleEvent*. After you create the entity types, you create their properties by binding source data columns in the *OntologyDataLH* lakehouse tables.

### Add first entity type (Store)

1. From the top ribbon or the center of the canvas, select **Add entity type**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/add-entity-type.png" alt-text="Screenshot of adding entity type.":::

1. Enter *Store* for the name of your entity type and select **Add Entity Type**.
1. The *Store* entity type is added to the canvas, and the **Entity type configuration** pane is visible.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/entity-type-configuration.png" alt-text="Screenshot of the Entity type configuration pane.":::

1. To create entities from existing source data, switch to the **Bindings** tab. Select **Add data to entity type**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/binding-1.png" alt-text="Screenshot of the Bindings tab.":::

1. Next, choose your data source. 
    1. Select the *OntologyDataLH* lakehouse and select **Connect**. 
    1. Select the *dimstore* table and select **Next**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/binding-2.png" alt-text="Screenshot of the data source selection.":::

1. Configure a static data binding for the following properties.
    1. For **Binding type**, leave the default selection of **Static**.
    1. Under **Bind your properties**, the columns from the *dimstore* table populate automatically. The **Source column** side lists their names in the source data, and the **Property name** side lists their corresponding property names on the *Store* entity type within ontology. Leave the default property names, which match the source column names.
    1. Select **Save**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/binding-3.png" alt-text="Screenshot of saving the data binding." lightbox="media/tutorial-1-create-ontology/onelake/binding-3.png":::

1. Back in the **Entity type configuration** pane, the data binding is visible. Next, select **Add entity type key**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/entity-type-key-1.png" alt-text="Screenshot of adding entity type key.":::

1. Select **StoreId** as the key property and select **Save**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/entity-type-key-2.png" alt-text="Screenshot of selecting the entity type key.":::

    >[!NOTE]
    >Due to a [known issue](https://support.fabric.microsoft.com/known-issues/?product=IQ&issueId=1615), only strings or integers should be currently used as entity type keys.

Now the *Store* entity type is ready. Continue to the next section to create the remaining entity types.

### Add other entity types (Products, SaleEvent)

Follow the same steps that you used for the *Store* entity type to create the entity types described in the following table. Each entity has a static data binding with the default columns from its source table.

| Entity type name | Source table in *OntologyDataLH* | Entity type key |
| --- | --- | --- |
| *Products* | *dimproducts* | `ProductId` |
| *SaleEvent* | *factsales* | `SaleId` |

When you're done, you see these entity types listed in the **Entity Types** pane. 

:::image type="content" source="media/tutorial-1-create-ontology/onelake/all-entity-types.png" alt-text="Screenshot of the scenario entity types.":::

## Create relationship types

Next, create relationship types between the entity types to represent contextual connections in your data.

### Store has SaleEvent

1. Select **Add relationship type** from the menu ribbon.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-1.png" alt-text="Screenshot of adding a relationship type.":::

1. Enter the following relationship type details and select **Add relationship type**.
    1. **Relationship type name**: *has*
    1. **Source entity type**: *Store*
    1. **Target entity type**: *SaleEvent*

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-2.png" alt-text="Screenshot of entering relationship type details.":::

1. The **Relationship configuration** pane opens, where you can configure additional information. Enter the following details (some fields become visible based on other selections) and select **Create**.
    1. **Source data**: Select your tutorial workspace, the *OntologyDataLH* lakehouse, and the *factsales* table.
    1. **Source entity type > Source column**: Select `StoreId` to match the entity type key property.
    1. **Target entity type > Source column**: Select `SaleId` to match the entity type key property.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-3.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/tutorial-1-create-ontology/onelake/relationship-type-3.png":::

Now the first relationship is created, and bound to data in your source table. Continue to the next section to create another relationship type.

### Products soldIn SaleEvent

Follow the same steps that you used for the first relationship type to create the relationship type described in the following table.

| Relationship type name  | Source entity type | Target entity type | Table |
| --- | --- | --- | --- |
| *soldIn* | *Products* | *SaleEvent* | *factsales*<br>Set source columns to match entity type key properties|

When you're done, you have two relationships targeting the *SaleEvent* entity type. To see the relationships, select the **SaleEvent** entity type from the **Entity Types** pane. You see its relationships on the canvas.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/all-relationship-types.png" alt-text="Screenshot of the scenario relationship types." lightbox="media/tutorial-1-create-ontology/onelake/all-relationship-types.png":::

::: zone-end

## Next steps

In this step, you created an ontology (preview) item and populated it with entity types, their properties, and relationship types between them. Next, enrich the entities further by adding a *Freezer* entity that's bound to time series data.

Next, continue to [Enrich the ontology with time series data](tutorial-2-enrich-ontology.md).