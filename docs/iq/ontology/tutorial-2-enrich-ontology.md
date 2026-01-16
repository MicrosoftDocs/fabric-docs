---
title: "Tutorial: Enrich the ontology with additional data"
description: Enrich the ontology by creating a new entity and binding time series data.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/19/2025
ms.topic: tutorial
---

# Ontology (preview) tutorial part 2: Enrich the ontology with additional data

In this tutorial step, you enrich your ontology by adding a new *Freezer* entity type. This entity type adds more domain context and introduces properties for time series data, which reflects live operational information. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

First, you create the new entity type and define properties without binding them to specific data. Then, you bind the static data to those properties in a separate step. Later, you add time series data to the entity type by creating new properties and binding time series data to them in a single data binding operation.

>[!NOTE]
>For both static and time series data, you can create properties without binding data and bind data later, or create properties and bind data to them in a single step. This article demonstrates both approaches.

Finally, you create a new relationship type to represent the connection between a store and its freezers.

## Create Freezer entity type and add properties

Follow these steps to create the *Freezer* entity type and add properties to it. The properties aren't bound to data yet.

1. Select **Add entity type** from the top ribbon. Enter *Freezer* for the name of your entity type and select **Add Entity Type**.
1. In the **Entity type configuration** pane, go to the **Properties** tab. Select **Add properties**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-properties-1.png" alt-text="Screenshot of adding properties to the Freezer entity type.":::

1. Add the following properties and select **Save**.

    | Name | Value type | Property type |
    | --- | --- | --- |
    | `FreezerId` | String | Static |
    | `Model` | String | Static |
    | `minSafeTempC` | Double | Static |
    | `StoreId` | String | Static |

    >[!NOTE]
    >Property names must be unique across all entity types.

    Here's what it looks like before saving:

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-properties-2.png" alt-text="Screenshot of the properties for the Freezer entity type.":::

1. Select **Add entity type key**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-entity-type-key.png" alt-text="Screenshot of adding an entity type key.":::

    Select `FreezerId` as the key value. 

## Bind static data to properties

Next, bind static data to the properties you created on the *Freezer* entity type.

1. In the **Entity type configuration** pane, go to the **Bindings** tab. Select **Add data to entity type**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-1.png" alt-text="Screenshot of adding data to Freezer.":::

1. For your data source, select the *OntologyDataLH* lakehouse and the *freezer* table. Select **Next**.

1. Configure a static data binding for the properties.
    1. For **Binding type**, use the default selection of **Static**.
    1. Under **Bind your properties**, the properties you created populate automatically with links to matching columns from the *freezer* table.
    1. Select **Save**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-2.png" alt-text="Screenshot of static data for Freezer." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-2.png":::

Now the *Freezer* entity has static data bound to it.

## Bind time series data to additional properties

Next, add time series data on the *Freezer* entity, by creating new properties and binding time series data to them in a single data binding operation.

1. In the **Entity type configuration** pane's **Bindings** tab, select **Add data to entity type**.

1. For your data source, select the *TelemetryDataEH* eventhouse and the *FreezerTelemetry* table. Select **Next**.

1. Configure a time series data binding.
    1. For **Binding type**, keep the default selection of **Timeseries**. For **Source data timestamp column**, select `timestamp`.
    1. Under **Bind your properties > Static**, two source data columns populate that match static properties already defined on the entity. Keep them as they are.

        :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-3-a.png" alt-text="Screenshot of the default static properties." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-3-a.png":::

    1. Under **Bind your properties > Timeseries**, the time series columns from the *FreezerTelemetry* table populate automatically with matching property names for the *Freezer* entity type. Keep the default selections.
    1. Select **Save**.

    :::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-3-b.png" alt-text="Screenshot of time series data for Freezer." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-3-b.png":::

Now the *Freezer* entity has two data bindings: one with static data from the *freezer* lakehouse table and one with streaming data from the *FreezerTelemetry* eventhouse table.

:::image type="content" source="media/tutorial-2-enrich-ontology/freezer-binding-4.png" alt-text="Screenshot of both data bindings for Freezer." lightbox="media/tutorial-2-enrich-ontology/freezer-binding-4.png":::

## Add relationship type

Finally, create a new relationship type to represent the connection between a store and its freezers.

### Create Store operates Freezer

1. Select **Add relationship** from the menu ribbon.
1. Enter the following relationship type details and select **Add relationship type**.
    1. **Relationship type name**: *operates*
    1. **Source entity type**: *Store*
    1. **Target entity type**: *Freezer*
1. The **Relationship configuration** pane opens, where you can configure additional information. Enter the following details (some fields become visible based on other selections) and select **Create**.
    1. **Source data**: Select your tutorial workspace, the *OntologyDataLH* lakehouse, and the *freezer* table. This table in the source data can link *Store* and *Freezer* entities together, because it contains identifying information for both entity types. Each row in this table references a store and a freezer by ID.
    1. **Source entity type > Source column**: Select `StoreId`. This setting specifies the column in the relationship source data table (*freezer >* `StoreId`) whose values match the key property defined on the *Store* entity (*dimstore >* `StoreId`). In the tutorial data, the column name is the same in both tables.
    1. **Target entity type > Source column**: Select `FreezerId`. This setting specifies the column in the relationship source data table whose values match the key property defined on the *Freezer* entity. In this case, the relationship data source and the entity data source both use the *freezer* table, so you're selecting the same column.

    Here's what the relationship configuration looks like:

    :::image type="content" source="media/tutorial-2-enrich-ontology/relationship.png" alt-text="Screenshot of the Store operates Freezer relationship type.":::

## Next steps

Now your ontology includes a *Freezer* entity type that is connected in the ontology and bound to time series data.

Next, continue to [Preview the ontology](tutorial-3-preview-ontology.md).