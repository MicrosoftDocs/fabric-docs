---
title: "Tutorial part 2: Enrich the ontology with additional data"
description: Enrich the ontology by creating a new entity and binding time series data. Part 2 of the ontology (preview) tutorial.
ms.date: 04/20/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 2: Enrich the ontology with additional data

In this tutorial step, you enrich your ontology by adding a new *Freezer* entity type. This entity type adds more domain context and introduces properties for time series data, which reflects live operational information. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

First, you create the new entity type and define properties without binding them to specific data. Then, you bind the static data to those properties in a separate step. Later, you add time series data to the entity type by creating new properties and binding time series data to them in a single data binding operation.

>[!NOTE]
>For both static and time series data, you can create properties without binding data and bind data later, or create properties and bind data to them in a single step. This article demonstrates both approaches.

After you complete data binding for the freezer entity, you create a new relationship type to represent the connection between a store and its freezers.

## Create Freezer entity type and add properties

Follow these steps to create the *Freezer* entity type and add properties to it. The properties aren't bound to data yet.

1. Start in the Home configuration canvas of ontology. Select **Add entity type** from the top ribbon. Enter *Freezer* for the name of your entity type and select **Add Entity Type**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/add-freezer.png" alt-text="Screenshot of adding the new Freezer entity type.":::

1. With the Freezer entity type selected in the **Explorer**, select **View entity type details** from the top ribbon. 

    :::image type="content" source="media/tutorial-2-enrich-ontology/view-entity-type-details.png" alt-text="Screenshot of the button to view Freezer entity type details.":::

1. The **Configure** page opens. This page surfaces important information about the entity type, including its properties and data bindings. Expand **Manage property bindings** and select **Add properties**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-properties-1.png" alt-text="Screenshot of adding properties to the Freezer entity type." lightbox="media/tutorial-2-enrich-ontology/freezer-properties-1.png":::

1. Add the following properties and select **Save**.

    | Name | Property type |
    | --- | --- |
    | `FreezerId` | String |
    | `Model` | String |
    | `minSafeTempC` | Double |
    | `StoreId` | String |

    >[!NOTE]
    >Property names must be unique across all entity types.

    Here's what it looks like before saving:

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-properties-2.png" alt-text="Screenshot of the properties for the Freezer entity type.":::

The properties are added to the **Configure** page, labeled as unbound to any data source.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-properties-2.png" alt-text="Screenshot of the new unbound properties on the Freezer entity type." lightbox="media/tutorial-2-enrich-ontology/freezer-properties-2.png":::

## Bind static data to properties

Next, bind static data to the properties you created on the *Freezer* entity type.

1. Expand **Manage property bindings** and select **Add binding and properties**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-1.png" alt-text="Screenshot of adding data bindings to Freezer." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-1.png":::

1. Select **Add data binding > Lakehouse table**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-2.png" alt-text="Screenshot of the data binding page and data source selection.":::

1. Choose your data source. 
    1. Select the *OntologyDataLH* lakehouse and select **Next**. 
    1. Select the *freezer* table and **Select**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-3.png" alt-text="Screenshot of the data source selection." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-3.png":::

1. Fields from the source table populate the data binding configuration. Observe the sections of the configuration page:
    * **Entity type key**: Identifies the field (or fields) that can be used to uniquely identify each record of ingested data.
    * **Binding selection**: Identifies the source table that holds the data for the binding.
    * **Entity type key mapping**: Identifies the column(s) in the source data table that maps to the entity type key property. You can select string and integer columns from your source data as the entity type key. Together, the columns you select uniquely identify a record.
    * **Properties**: Lists the columns from the source data and corresponding properties on the Freezer entity type. The **Source column** side populates automatically with the columns from the *freezer* table, and the **Property name** side lists their corresponding property names on the *Freezer* entity type within ontology. Don't change the default property names, which match the source column names.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-4.png" alt-text="Screenshot of the configuration." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-4.png":::

1. Select **Define entity type key** at the top of the configuration. Select `FreezerId` from the property list and select **Save**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-5-key.png" alt-text="Screenshot of adding an entity type key.":::

1. **Save** the data binding. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.

1. Back in the **Configure** page for *Freezer*, view the same list of properties and see that they're now bound to a data source.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-6.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-6.png":::

Now the *Freezer* entity has static data bound to it.

## Bind time series data to additional properties

Next, add time series data on the *Freezer* entity, by creating new properties and binding time series data to them in a single data binding operation.

1. In the **Configure** page, expand **Manage property bindings** and select **Add binding and properties** again to reopen the binding configuration.

    >[!TIP]
    >Though this tutorial shows adding static and time series data as separate steps, you could also bind all the data at once in a single visit to this configuration page.

1. Under **Binding selection**, expand **Add data binding** and select **Eventhouse table or materialized view**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-time-series-1.png" alt-text="Screenshot of adding a second data binding to the configuration." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-time-series-1.png":::

1. Choose your data source. 
    1. Select the *TelemetryDataEH* eventhouse and select **Add**. 
    1. Select the *FreezerTelemetry* table and **Add**.

1. A **Timeseries data** section appears in the configuration. For **Timestamp column**, select `timestamp`.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-time-series-2.png" alt-text="Screenshot of selecting the timestamp column." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-time-series-2.png":::

1. Scroll down to the **Properties** section, where the `StoreId` shows an error because it is already bound in the static data binding. Use the trash icon to delete the duplicated property.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-time-series-3.png" alt-text="Screenshot of deleting the StoreId property." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-time-series-3.png":::

1. **Save** the data binding. Confirm that the entity type updated successfully, then select **Cancel** to close the configuration options.

1. Back in the **Configure** page for *Freezer*, notice that there are now more entity type properties, and the new ones are bound to the *FreezerTelemetry* data source.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-time-series-4.png" alt-text="Screenshot of all the data bindings in the Configure page." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-time-series-4.png":::

Now the *Freezer* entity has two data bindings: one with static data from the *freezer* lakehouse table and one with streaming data from the *FreezerTelemetry* eventhouse table.

## Add relationship type

Finally, create a new relationship type to represent the connection between a store and its freezers.

### Create Store operates Freezer

1. In the **Configure** page, expand **Manage relationships** and select **Add new relationship**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/relationship-type-1.png" alt-text="Screenshot of adding a new relationship." lightbox="media/tutorial-2-enrich-ontology/relationship-type-1.png":::

1. Enter the following relationship type details and select **Create**.
    1. **Relationship type name**: *operates*
    1. **Origin entity type**: *Store*
    1. **Target entity type**: *Freezer*

    :::image type="content" source="media/tutorial-2-enrich-ontology/relationship-type-2.png" alt-text="Screenshot of entering relationship type details.":::

1. The relationship is added to the **Relationships** section. Select the *operates* relationship on the canvas to open the relationship details configuration. Observe the sections of the configuration page:

    * **Origin entity type**: Lists details of the origin entity (*Store* in this case).
    * **Relationship type**: Sets details of the relationship type.
    * **Target entity type**: Lists details of the target entity (*Freezer* in this case).

     :::image type="content" source="media/tutorial-2-enrich-ontology/relationship-type-3.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/tutorial-2-enrich-ontology/relationship-type-3.png":::

1. In the middle panel, enter the following details.
    1. **Mapping table**: Select where *dimstore* has autopopulated, and change it to the *freezer* table. This table in the source data can link *Store* and *Freezer* entities together, because it contains identifying information for both entity types. Each row in this table references a store and a freezer by ID.
    1. **Matched Store: StoreId**: Select `StoreId`. This setting specifies the column in the relationship source data table (*freezer >* `StoreId`) whose values match the key property defined on the *Store* entity (*dimstore >* `StoreId`). In the tutorial data, the column name is the same (`StoreId`) in both tables.
    1. **Matched Store: StoreId**: This field populates automatically with `FreezerId`. This setting specifies the column in the relationship source data table whose values match the key property defined on the *Freezer* entity. In this case, the relationship data source and the entity data source both use the *freezer* table, so you're selecting the same column (`FreezerId`).

    :::image type="content" source="media/tutorial-2-enrich-ontology/relationship-type-4.png" alt-text="Screenshot of the completed relationship type configuration." lightbox="media/tutorial-2-enrich-ontology/relationship-type-4.png":::

    >[!IMPORTANT]
    >Make sure to select the correct source columns that match the entity type key properties.

1. **Save** the relationship type. Confirm that the relationship type updated successfully, then select **Cancel** to close the configuration options.

1. You see the **Configure** page for the entity, where the updated relationship is still visible in the **Relationships** section.

## Next steps

Now your ontology includes a *Freezer* entity type that is bound to both static and time series data, and is connected in the ontology with a relationship.

Next, continue to [View the ontology](tutorial-3-preview-ontology.md).

