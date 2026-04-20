---
title: "Tutorial part 1: Create an ontology"
description: Create an ontology (preview) item with data from a semantic model or OneLake. Part 1 of the ontology (preview) tutorial.
ms.date: 04/13/2026
ms.topic: tutorial
zone_pivot_group_filename: iq/ontology/zone-pivot-groups.json
zone_pivot_groups: create-ontology-scenario
---

# Ontology (preview) tutorial part 1: Create an ontology

In this step of the tutorial, you generate a new ontology (preview) item that represents the Lakeshore Retail scenario.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

[!INCLUDE [Fabric tutorial choice note](includes/choose-tutorial-method.md)]

::: zone pivot="semantic-model"
## Generating an ontology from a semantic model

A [semantic model](../../data-warehouse/semantic-models.md) in Fabric is a logical description of a domain, like a business. Semantic models hold information about your data and the relationships among that data. You can create semantic models from lakehouse tables. When your data is represented in a semantic model, you can generate an ontology directly from that semantic model. For more information, see [Generating an ontology (preview) from a semantic model](concepts-generate.md).

In this tutorial step, you generate an ontology from the sample semantic model that you set up in the [previous step](tutorial-0-introduction.md?pivots=semantic-model#prepare-the-power-bi-semantic-model). Then, you verify and complete the ontology.

## Generate ontology

1. Go to the *RetailSalesModel* semantic model in Fabric. 

    If the semantic model is still open from when you created it earlier, select **Generate Ontology** from the ribbon.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/generate-ontology-1-a.png" alt-text="Screenshot of Generate ontology button in the ribbon of an open semantic model." lightbox="media/tutorial-1-create-ontology/semantic-model/generate-ontology-1-a.png":::

    If the semantic model was previously closed, you can also select **Generate Ontology** from the model overview page without opening the model.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/generate-ontology-1-b.png" alt-text="Screenshot of Generate ontology button in the ribbon of the semantic model overview." lightbox="media/tutorial-1-create-ontology/semantic-model/generate-ontology-1-b.png":::

1. Select your **Workspace** and enter *RetailSalesOntology* for the **Name**. Select **Create**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/generate-ontology-2.png" alt-text="Screenshot of Generate ontology details." lightbox="media/tutorial-1-create-ontology/semantic-model/generate-ontology-2.png":::

    >[!TIP]
    >Ontology names can include numbers, letters, and underscores. Don't use spaces or dashes.

The ontology (preview) item opens when it's ready.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/ontology-start.png" alt-text="Screenshot of new ontology." lightbox="media/tutorial-1-create-ontology/semantic-model/ontology-start.png":::

>[!NOTE]
>If you see an error that Fabric is unable to create the ontology (preview) item, make sure that all the required settings are enabled for your tenant, as described in the [Tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

Next, review the entity types, data bindings, and relationships that the semantic model generates. In the following sections, you make a few edits to complete the ontology configuration, and verify that generated items are correct.

## Verify entity types

Entity types represent types of objects in a business. The **Entity Types** pane lists all three entity types in the ontology, named after the data tables (they might be listed in a different order):
* *dimproducts*
* *dimstore*
* *factsales*

>[!TIP] 
>If you don't see any entities in the ontology, make sure your semantic model is published, the tables in the semantic model are visible (not hidden), and relationships are defined. To revisit the setup steps for the semantic model, see [Prepare the Power BI Semantic Model ](tutorial-0-introduction.md#prepare-the-power-bi-semantic-model).

### Rename entity types

Follow these steps to rename each entity type to a friendlier name.

1. Select the entity type. From the top ribbon, select **View Entity Type details**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/view-entity-type-details.png" alt-text="Screenshot of selecting the entity type details.":::

1. You see the **Configure** page for the entity. This page surfaces important information about the entity type, including its properties, data bindings, relationships, and more.

    In the top right corner of the page, select **... > Rename**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/rename.png" alt-text="Screenshot of selecting Rename from the Configure page." lightbox="media/tutorial-1-create-ontology/semantic-model/rename.png":::

1. Enter the new name from the following table and **Save**.

    | Old name | New name |
    | --- | --- |
    | *dimproducts* | *Products* <br><br>Note: Make sure to use the plural form *Products*, to avoid conflict with the [GQL reserved word](../../graph/gql-reference-reserved-terms.md#p) `PRODUCT`. |
    | *dimstore* | *Store* |
    | *factsales* | *SaleEvent* |

1. Select **Home** to return to the configuration canvas to access the other entity types.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/home.png" alt-text="Screenshot of returning home to the configuration canvas.":::

1. Repeat these steps until all entity types are renamed.

When you finish renaming all the entity types, they look like this (they might be listed in a different order).

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/all-entity-types.png" alt-text="Screenshot of the renamed entity types." lightbox="media/tutorial-1-create-ontology/semantic-model/all-entity-types.png":::

## Verify properties and bindings

Follow these steps to verify that each entity type has the correct properties and source data bindings.

1. Select the entity type. From the top ribbon, select **View Entity Type details**.
1. On the **Configure** page, look at the **Properties** panel.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/verify-properties.png" alt-text="Screenshot of the Products entity type and its properties." lightbox="media/tutorial-1-create-ontology/semantic-model/verify-properties.png":::

1. Verify the entity type properties match those in the following table.

    | Entity type | Entity type key | Properties | Data source |
    | --- | --- | --- |
    | *Products* | `ProductId` |  `Brand`, `Category`, `ProductId`, `ProductName`, `Subcategory` | *dimproducts* |
    | *Store* | `StoreId` | `City`, `Latitude`, `Longitude`, `Region`, `StoreId`, `StoreName` | *dimstore* |
    | *SaleEvent* |  | `ProductId`, `RevenueUSD`, `SaleDate`, `SaleId`, `StoreId`, `Units` | *factsales* |

1. Select **Home** to return to the configuration canvas to access the other entity types.
1. Repeat these steps until all entity type properties are verified.

### Add SaleEvent key

Each entity type has an entity type key that represents a unique identifier for each record of ingested data. You can select string and integer columns from your source data as the entity type key. Together, the columns you select uniquely identify a record.

The *SaleEvent* entity type doesn't have a key that was imported from the source data, so you need to add it manually.

1. Open the **Configure** page for the *SaleEvent* entity type.
1. Select **Define entity type key**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/define-key-1.png" alt-text="Screenshot of defining the entity type key." lightbox="media/tutorial-1-create-ontology/semantic-model/define-key-1.png":::

1. Select **Define entity type key** on the configuration details page. Select `SaleId` and **Save**.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/define-key-2.png" alt-text="Screenshot of selecting SaleId as the entity type key." lightbox="media/tutorial-1-create-ontology/semantic-model/define-key-2.png":::

1. **Save** the configuration. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/define-key-3.png" alt-text="Screenshot of saving the entity type key." lightbox="media/tutorial-1-create-ontology/semantic-model/define-key-3.png":::

## Verify and configure relationship types

Finally, verify the relationship types between entity types. Relationship types represent how entity types are related to each other in a business context. The relationship types that the import process brings in from the semantic model are defined, but not fully configured and bound to data. 

Select the *SaleEvent* entity type to display it and its relationship types on the configuration canvas. 

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/sale-event-relationships.png" alt-text="Screenshot of the sale event entity type and its relationships." lightbox="media/tutorial-1-create-ontology/semantic-model/sale-event-relationships.png":::

Follow these steps to configure the details of each relationship type.

1. Select the relationship type on the configuration canvas. This action opens the relationship details configuration. 
1. Observe the sections of the configuration page:

    * **Origin entity type**: Lists details of the origin entity.
    * **Relationship type**: Sets details of the relationship type.
    * **Target entity type**: Lists details of the target entity.

     :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/relationship-configuration.png" alt-text="Screenshot of entering relationship type details." lightbox="media/tutorial-1-create-ontology/semantic-model/relationship-configuration.png":::

1. In the middle panel, update the relationship type details to match those in the following table.

    | Original name | New name | Mapping table | MatchedSaleEvent: SaleId | Matched ... (target entity) | 
    | --- | --- | --- | --- | --- |
    | *factsales_has_dimstore* | *from* | *factsales* <br><br>This table in the source data can link *Store* and *SaleEvent* entities together, because it contains identifying information for both entity types. Each row in this table references a store and a sale event by ID. | `SaleId` <br><br>This setting specifies the column in the relationship source data table whose values match the key property defined on the *SaleEvent* entity. In this case, the relationship data source and the entity data source both use the *factsales* table, so you're selecting the same column (`SaleId`). | `StoreId` <br><br>This setting specifies the column in the relationship source data table (*factsales >* `StoreId`) whose values match the key property defined on the *Store* entity (*dimstore >*  `StoreId`). In the tutorial data, the column name is the same in both tables (`StoreId`). |
    | *factsales_has_dimproducts* | *sold* | *factsales* <br><br>This table in the source data can link *Products* and *SaleEvent* entities together, because it contains identifying information for both entity types. Each row in this table references a product and a sale event by ID. | `SaleId` <br><br>This setting specifies the column in the relationship source data table whose values match the key property defined on the *SaleEvent* entity. In this case, the relationship data source and the entity data source both use the *factsales* table, so you're selecting the same column (`SaleId`). | `ProductId` <br><br>This setting specifies the column in the relationship source data table (*factsales >* `ProductId`) whose values match the key property defined on the *Products* entity (*dimproducts >* `ProductId`). In the tutorial data, the column name is the same in both tables (`ProductId`). |

    :::image type="content" source="media/tutorial-1-create-ontology/semantic-model/verify-relationship-types.png" alt-text="Screenshot of a the new from relationship type." lightbox="media/tutorial-1-create-ontology/semantic-model/verify-relationship-types.png":::

1. **Save** the configuration. Confirm that the relationship type updated successfully, then select **Cancel** to close the configuration options.
1. Select **Home** to return to the configuration canvas to access the other relationship type.
1. Repeat these steps until all relationship types are updated.

When you finish updating the relationship types, you see their new names reflected with the *SaleEvent* entity in the semantic canvas.

:::image type="content" source="media/tutorial-1-create-ontology/semantic-model/all-relationship-types.png" alt-text="Screenshot of the updated relationships on SaleEvent." lightbox="media/tutorial-1-create-ontology/semantic-model/all-relationship-types.png":::

::: zone-end

::: zone pivot="onelake"
## Building an ontology from OneLake

When your data is stored in OneLake, you can build an ontology from the OneLake data tables.

The manual process involves these steps:
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
    >Ontology names can include numbers, letters, and underscores. Don't use spaces or dashes.

The ontology opens when it's ready.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/ontology-blank.png" alt-text="Screenshot of empty ontology." lightbox="media/tutorial-1-create-ontology/onelake/ontology-blank.png":::

>[!NOTE]
>If you see an error that Fabric is unable to create the ontology (preview) item, make sure that all the required settings are enabled for your tenant, as described in the [Tutorial prerequisites](tutorial-0-introduction.md#prerequisites).

Next, create entity types, data bindings, and relationships based on data from your lakehouse tables. 

## Create entity types and data bindings

First, create entity types. Entity types represent types of objects in a business. This step has three entity types: *Store*, *Products*, and *SaleEvent*. After you create the entity types, create their properties by binding source data columns from the *OntologyDataLH* lakehouse tables.

### Add first entity type (Store)

1. From the top ribbon or the center of the configuration canvas, select **Add entity type**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/add-entity-type.png" alt-text="Screenshot of adding entity type.":::

1. Enter *Store* for the name of your entity type and select **Add Entity Type**.
1. The *Store* entity type is added to the configuration canvas. 

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-entity-type.png" alt-text="Screenshot of the new Store entity type.":::

#### Bind Store data

1. On the configuration canvas, select **...** next to the entity name and select **Bind data**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-1.png" alt-text="Screenshot of selecting Bind data for Store." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-1.png":::

1. Select **Add data binding > Lakehouse table**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-2.png" alt-text="Screenshot of the data binding page and data source selection.":::

1. Choose your data source. 
    1. Select the *OntologyDataLH* lakehouse and select **Next**. 
    1. Select the *dimstore* table and **Select**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-3.png" alt-text="Screenshot of the data source selection." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-3.png":::

1. Fields from the source table populate the data binding configuration. Observe the sections of the configuration page:
    * **Entity type key**: Identifies the field (or fields) that can be used to uniquely identify each record of ingested data.
    * **Binding selection**: Identifies the source table that holds the data for the binding.
    * **Entity type key mapping**: Identifies the column(s) in the source data table that maps to the entity type key property. You can select string and integer columns from your source data as the entity type key. Together, the columns you select uniquely identify a record.
    * **Properties**: Lists the columns from the source data that will be represented as properties on your Store entity type. The **Source column** side populates automatically with the columns from the *dimstore* table, and the **Property name** side lists their corresponding property names on the *Store* entity type within ontology. Don't change the default property names, which match the source column names.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-4.png" alt-text="Screenshot of the configuration." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-4.png":::

1. Select **Define entity type key** at the top of the configuration. Select **StoreId** from the property list and select **Save**.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-5-key.png" alt-text="Screenshot of selecting the entity type key.":::

1. **Save** the data binding.

     :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-6.png" alt-text="Screenshot of saving the data binding." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-6.png":::

1. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.

     :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-7.png" alt-text="Screenshot of closing the data binding." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-7.png":::

1. You see the **Configure** page for the entity. This page surfaces important information about the entity type, including its properties and data bindings. View your configured data bindings.

     :::image type="content" source="media/tutorial-1-create-ontology/onelake/store-bind-data-8.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/tutorial-1-create-ontology/onelake/store-bind-data-8.png":::

Now the *Store* entity type is ready. Continue to the next section to create the remaining entity types.

### Add other entity types (Products, SaleEvent)

Select **Home** to return to the configuration canvas where you can add new entity types.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/home.png" alt-text="Screenshot of returning home to the configuration canvas.":::

Follow the same steps that you used for the *Store* entity type to create the entity types described in the following table. Each entity has a data binding with the default columns from its source table.

| Entity type name | Source table in *OntologyDataLH* | Entity type key | Notes |
| --- | --- | --- | --- |
| *Products* | *dimproducts* | `ProductId` | Use the plural name *Products* to avoid conflict with the [GQL reserved word](../../graph/gql-reference-reserved-terms.md#p) `PRODUCT`. |
| *SaleEvent* | *factsales* | `SaleId` | The default binding configuration loads a new **Timeseries data** section. Ignore this field and continue binding static data as usual. |

When you're done, you see these entity types listed in the **Explorer** in the configuration canvas.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/all-entity-types.png" alt-text="Screenshot of the scenario entity types." lightbox="media/tutorial-1-create-ontology/onelake/all-entity-types.png":::

## Create relationship types

Next, create relationship types between the entity types to represent contextual connections in your data.

### SaleEvent from Store

1. Select the **SaleEvent** entity type from the **Explorer**.

1. Select either **Add relationship** from the menu ribbon, or **... > Add relationship type** from the configuration canvas.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-1.png" alt-text="Screenshot of adding a relationship type." lightbox="media/tutorial-1-create-ontology/onelake/relationship-type-1.png":::

1. Enter the following relationship type details and select **Create**.
    1. **Relationship type name**: *from*
    1. **Origin entity type**: *SaleEvent*
    1. **Target entity type**: *Store*

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-2.png" alt-text="Screenshot of entering relationship type details.":::

1. The relationship is added to the semantic canvas. Select it to open the relationship details configuration.  Observe the sections of the configuration page:

    * **Origin entity type**: Lists details of the origin entity (*SaleEvent* in this case).
    * **Relationship type**: Sets details of the relationship type.
    * **Target entity type**: Lists details of the target entity (*Store* in this case).

     :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-3.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/tutorial-1-create-ontology/onelake/relationship-type-3.png":::

1. In the middle panel, enter the following details.
    1. **Mapping table**: **Browse available sources** and select the *factsales* table. This table in the source data can link *Store* and *SaleEvent* entities together, because it contains identifying information for both entity types. Each row in this table references a store and a sale event by ID.
    1. **Matched SaleEvent: SaleId**: This field populates automatically with `SaleId`. This setting specifies the column in the relationship source data table whose values match the key property defined on the *SaleEvent* entity. In this case, the relationship data source and the entity data source both use the *factsales* table, so you're selecting the same column (`SaleId`).
    1. **Matched Store: StoreId**: Select `StoreId`. This setting specifies the column in the relationship source data table (*factsales >* `StoreId`) whose values match the key property defined on the *Store* entity (*dimstore >* `StoreId`). In the tutorial data, the column name is the same (`StoreId`) in both tables.

    :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-4.png" alt-text="Screenshot of the completed relationship type configuration." lightbox="media/tutorial-1-create-ontology/onelake/relationship-type-4.png":::

    >[!IMPORTANT]
    >Make sure to select the correct source columns that match the entity type key properties.

1. **Save** the relationship type. Confirm that the relationship type updated successfully, then select **Cancel** to close the configuration options.

1. You see the **Configure** page for the entity, where the new relationship is visible next to the data bindings for the entity type. 

     :::image type="content" source="media/tutorial-1-create-ontology/onelake/relationship-type-5.png" alt-text="Screenshot of the relationship type in the Configure page." lightbox="media/tutorial-1-create-ontology/onelake/relationship-type-5.png":::

Now the first relationship is created, and bound to data in your source table. Continue to the next section to create another relationship type.

### SaleEvent sold Products

Select **Home** to return to the configuration canvas where you can add new entity types.

Follow the same steps that you used for the first relationship type to create a second relationship from the *SaleEvent* entity type that has the details described in the following table.

| Relationship type name  | Origin entity type | Target entity type | Mapping table | Matched SaleEvent: SaleId | Matched Products: ProductId | 
| --- | --- | --- | --- | --- | --- |
| *sold* | *SaleEvent* | *Products* | *factsales*| `SaleId` | `ProductId` |

When you're done, you have two relationships from the *SaleEvent* entity type visible on the configuration canvas.

:::image type="content" source="media/tutorial-1-create-ontology/onelake/all-relationship-types.png" alt-text="Screenshot of the scenario relationship types." lightbox="media/tutorial-1-create-ontology/onelake/all-relationship-types.png":::

::: zone-end

## Next steps

In this step, you created an ontology (preview) item and populated it with entity types, their properties, and relationship types between them. Next, enrich the entities further by adding a *Freezer* entity that's bound to both static and time series data.

Next, continue to [Enrich the ontology with additional data](tutorial-2-enrich-ontology.md).

