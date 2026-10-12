---
title: "Tutorial Part 1: Create an Ontology (Preview)"
description: Create an ontology (preview) item with data from OneLake. Part 1 of the ontology (preview) tutorial.
ms.date: 09/11/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 1: Create an ontology

In this step of the tutorial, you create a new ontology (preview) item that represents the Lakeshore Retail scenario. Then you add entity types, data bindings, and relationships to build out the ontology.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Create ontology (preview) item

1. In your Fabric workspace, select **+ New item**. Search for and select the **Ontology (preview)** item.

    :::image type="content" source="media/tutorial-1-create-ontology/new-ontology.png" alt-text="Screenshot of the ontology (preview) item." lightbox="media/tutorial-1-create-ontology/new-ontology.png":::

1. In the **New Ontology** dialog, enter a **Name** of *LakeshoreOntology*. Set the **Location** to your workspace. Select **Create**.

The ontology opens when it's ready.

:::image type="content" source="media/tutorial-1-create-ontology/ontology-blank.png" alt-text="Screenshot of empty ontology in Fabric item." lightbox="media/tutorial-1-create-ontology/ontology-blank.png":::

>[!NOTE]
> If you see an error that Fabric is unable to create the ontology (preview) item, ensure that all the required settings are enabled for your tenant, as described in the [Tutorial prerequisites](tutorial-0-introduction.md?pivots=onelake#prerequisites).

Next, create entity types, data bindings, and relationships based on data from your lakehouse tables.

## Create entity types and data bindings

First, create entity types. Entity types represent types of objects in a business. After you create the entity types, create their properties by binding source data columns from the *LakeshoreStaticDataLH* lakehouse tables.

### Add base entity type (Location)

1. From the top ribbon, select **+ Add entity type**.

    :::image type="content" source="media/tutorial-1-create-ontology/add-entity-type.png" alt-text="Screenshot of adding entity type from the top ribbon." lightbox="media/tutorial-1-create-ontology/add-entity-type.png":::

1. Enter *Location* for the entity type name and select **Add Entity Type**.
1. The Location entity type appears on the configuration canvas.

    :::image type="content" source="media/tutorial-1-create-ontology/location-entity-type.png" alt-text="Screenshot of the new Location entity type." lightbox="media/tutorial-1-create-ontology/location-entity-type.png":::

#### Bind Location data

1. On the configuration canvas or the Explorer, select **...** next to the entity name and select **Bind data**.

    :::image type="content" source="media/tutorial-1-create-ontology/location-bind-data.png" alt-text="Screenshot of selecting Bind data for Location." lightbox="media/tutorial-1-create-ontology/location-bind-data.png":::

1. Select **Add** to add a data source.

1. Find the data source in the OneLake catalog. Expand *LakeshoreStaticDataLH* > *dbo* and select the *dimlocations* table. Confirm with **Select table**.
1. The data source loads.

    :::image type="content" source="media/tutorial-1-create-ontology/location-bind-data-source.png" alt-text="Screenshot of the data source after it is loaded." lightbox="media/tutorial-1-create-ontology/location-bind-data-source.png":::

1. Select **Entity type properties** to see properties of the entity type. The columns from the *dimlocations* table automatically populate as proposed properties.

    :::image type="content" source="media/tutorial-1-create-ontology/location-bind-data-properties.png" alt-text="Screenshot of properties automatically populated on the entity type." lightbox="media/tutorial-1-create-ontology/location-bind-data-properties.png":::

1. Without making any changes to the properties, select **Create** to save the data binding. You see a banner confirming that **Entity type updated successfully**.

1. Select **Cancel** to close the property binding dialog.

1. You see the **Configure** page of the entity type details. This page surfaces information about the entity type, including its properties and data bindings. View your configured data bindings.

    :::image type="content" source="media/tutorial-1-create-ontology/location-bind-data-done.png" alt-text="Screenshot of the data bindings in the Configure page." lightbox="media/tutorial-1-create-ontology/location-bind-data-done.png":::

Now the Location entity type is complete.

### Add inherited entity type (Store)

Next, add an inherited entity type. The Store entity inherits from Location, which automatically gives it all of Location's properties.

1. Select **Home** to return to the configuration canvas where you can add new entity types.

    :::image type="content" source="media/tutorial-1-create-ontology/home.png" alt-text="Screenshot of returning home to the configuration canvas." lightbox="media/tutorial-1-create-ontology/home.png":::

1. From the top ribbon, select **+ Add entity type**.
1. Enter *Store* for the **Entity type name**. Expand **Additional configuration** and set **Choose entity to inherit from** to *Location*. Select **Add Entity Type**.

    :::image type="content" source="media/tutorial-1-create-ontology/add-store.png" alt-text="Screenshot of adding the Store entity type that inherits from Location." lightbox="media/tutorial-1-create-ontology/add-store.png":::

1. The Store entity type appears on the configuration canvas.
1. Select the Store entity type and select **View Entity Type details**.

    :::image type="content" source="media/tutorial-1-create-ontology/store-entity-type-details.png" alt-text="Screenshot of opening entity type details for the Store entity type." lightbox="media/tutorial-1-create-ontology/store-entity-type-details.png":::

1. In the **Configure** tab, confirm that the Store entity type already has properties. These properties are inherited from the Location parent, but you still need to bind them to a source.

    :::image type="content" source="media/tutorial-1-create-ontology/store-properties-unbound.png" alt-text="Screenshot of the Store entity type's inherited properties." lightbox="media/tutorial-1-create-ontology/store-properties-unbound.png":::

#### Bind Store data

1. Select **Manage property bindings** > **Add binding and properties**.

    :::image type="content" source="media/tutorial-1-create-ontology/store-add-binding.png" alt-text="Screenshot of adding binding and properties to the Store entity type." lightbox="media/tutorial-1-create-ontology/store-add-binding.png":::

    The property binding page opens.

1. **Add** the *LakeshoreStaticDataLH* > *dbo* > *dimlocations* table as a data source.
1. Select **Entity type properties**, verify that properties have a populated source column, and select **Create**.

    :::image type="content" source="media/tutorial-1-create-ontology/store-add-binding-source-column.png" alt-text="Screenshot of source columns in the data binding." lightbox="media/tutorial-1-create-ontology/store-add-binding-source-column.png":::

1. Select **Cancel** to return to the **Configure** page for the entity type.

Now the Store entity type is complete. Continue to the next section to create the rest of the entity types in the sample scenario.

### Add other entity types

Use the same steps that you used for the Location and Store entity types to create the entity types described in the following table. Add all of their source columns as properties.

| Entity type name | Inherits from | Data source table | Notes |
| --- | --- | --- | --- |
| Distribution Center | Location | *LakeshoreStaticDataLH* > *dimlocations* | |
| Product | | *LakeshoreStaticDataLH* > *dimproducts* |  |
| Frozen Product | Product | *LakeshoreStaticDataLH* > *dimproducts* | |
| Perishable Product | Product | *LakeshoreStaticDataLH* > *dimproducts* | |
| Inventory | | *LakeshoreStaticDataLH* > *fact_inventory_positions* | |
| Supplier | | *LakeshoreStaticDataLH* > *dimsuppliers* | |
| Shipment | | *LakeshoreStaticDataLH* > *factshipments* | |
| Refrigeration Unit | | *LakeshoreStaticDataLH* > *dim_refrigeration_units* | |
| Refrigeration Telemetry | | *LakeshoreTelemetryDataEH* > *RefrigerationTelemetry* | This entity type uses the eventhouse table, not a lakehouse table, as its data source. |

When you finish, you see all the entity types listed in the **Explorer** in the configuration canvas.

:::image type="content" source="media/tutorial-1-create-ontology/all-entity-types.png" alt-text="Screenshot of the scenario entity types." lightbox="media/tutorial-1-create-ontology/all-entity-types.png":::

### Add Sale with the ontology agent

Finally, add one more entity type: Sale. Unlike the other entity types, Sale's source data is in a semantic model and has associated DAX measures. To bind this Sale data without having to recreate it manually, use the ontology agent.

1. Select **Ontology agent** from the top ribbon. The ontology agent opens in **Plan** mode.

    :::image type="content" source="media/tutorial-1-create-ontology/ontology-agent.png" alt-text="Screenshot of opening the ontology agent in Plan mode." lightbox="media/tutorial-1-create-ontology/ontology-agent.png":::

1. Send the following query: *Create a new entity type called Sale, bound to data in the Sales table from the SalesReport semantic model inside this workspace.*
1. The ontology agent reasons and creates a plan for adding the new entity type.

    :::image type="content" source="media/tutorial-1-create-ontology/ontology-agent-plan.png" alt-text="Screenshot of the ontology agent's plan for adding the entity type." lightbox="media/tutorial-1-create-ontology/ontology-agent-plan.png":::

1. Toggle to **Act** mode and send *Apply the entity type plan*.
1. The ontology agent adds the Sale entity type to the canvas.

    :::image type="content" source="media/tutorial-1-create-ontology/ontology-agent-sale.png" alt-text="Screenshot of the ontology agent's success message and the Sale entity type added to the canvas." lightbox="media/tutorial-1-create-ontology/ontology-agent-sale.png":::

1. With the new Sale entity type highlighted, select **View Entity Type details**.
1. Verify that **Properties** are populated and bound to the semantic model data source.

    :::image type="content" source="media/tutorial-1-create-ontology/sale-details.png" alt-text="Screenshot of the Sale entity properties." lightbox="media/tutorial-1-create-ontology/sale-details.png":::

1. Scroll down to view the **Metrics** section and verify that two metrics are added. Ontology metrics are based on DAX measures from the semantic model source.

    :::image type="content" source="media/tutorial-1-create-ontology/sale-metrics.png" alt-text="Screenshot of the Sale entity metrics with two entries." lightbox="media/tutorial-1-create-ontology/sale-metrics.png":::

Now you have all entity types for the scenario created and bound to source data.

## Create relationship types

Next, create relationship types between the entity types to represent contextual connections in your data.

### Store operates Refrigeration Unit

1. Select the Store entity type from the **Explorer**.

1. Select **Add relationship** from the menu ribbon or the Explorer, or **Add relationship type** from the entity on the configuration canvas.

    :::image type="content" source="media/tutorial-1-create-ontology/store-add-relationship.png" alt-text="Screenshot of adding a relationship type." lightbox="media/tutorial-1-create-ontology/store-add-relationship.png":::

1. Enter the following relationship type details and select **Create**.
    1. **Relationship type name**: *operates*
    1. **Origin entity type**: *Store*
    1. **Target entity type**: *Refrigeration Unit*

    :::image type="content" source="media/tutorial-1-create-ontology/add-new-relationship.png" alt-text="Screenshot of entering relationship type details." lightbox="media/tutorial-1-create-ontology/add-new-relationship.png":::

1. The relationship appears on the semantic canvas. Select it to open the relationship details configuration.
1. Observe the sections of the configuration page:

    * **Origin entity type**: Lists details of the origin entity type (Store)
    * **Relationship**: Sets details of the relationship type (*operates*)
    * **Target entity type**: Lists details of the target entity type (Refrigeration Unit)

    :::image type="content" source="media/tutorial-1-create-ontology/relationship-configuration.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/tutorial-1-create-ontology/relationship-configuration.png":::

1. In the **Origin entity type** section, expand **Property** and select `LocationId`.

    In the **Target entity type** section, expand **Property** and select `StoreId`. These fields indicate that the `LocationId` on a Store can be matched to the `StoreId` on a Refrigeration Unit to relate them to each other.

    :::image type="content" source="media/tutorial-1-create-ontology/relationship-configuration-done.png" alt-text="Screenshot of the details filled out in the relationship type configuration." lightbox="media/tutorial-1-create-ontology/relationship-configuration-done.png":::

1. **Save** the relationship type. You see a banner confirming that the ontology **Successfully updated the relationship type**. Select **Cancel** to close the configuration options.

1. You see the **Configure** page for the Store entity type, where the new relationship is visible in the **Relationships** section.

    :::image type="content" source="media/tutorial-1-create-ontology/relationship-done.png" alt-text="Screenshot of the relationship type in the Configure page." lightbox="media/tutorial-1-create-ontology/relationship-done.png":::

Now the first relationship is complete. Continue to the next section to create the rest of the relationship types in the sample scenario.

### Add other relationship types

Select **Home** to return to the configuration canvas where you can add new relationship types.

Follow the same steps that you used for the first relationship type to create the relationship types described in the following table.

| Relationship type name | Origin entity type (Property) | Target entity type (Property) |
| --- | --- | --- |
| *operates* | Store (`LocationId`) | Refrigeration Unit (`StoreId`) |
| *deliversTo* | Shipment (`ToStoreId`) | Store (`LocationId`) |
| *occursAt* | Sale (`StoreId`) | Store (`LocationId`) |
| *stockedAt* | Inventory (`StoreId`) | Store (`LocationId`) |
| *originatesAt* | Shipment (`FromLocationId`) | Distribution Center (`LocationId`) |
| *forProduct* | Sale (`ProductId`) | Product (`ProductId`) |
| *stockedAt* | Product (`ProductId`) | Inventory (`ProductId`) |
| *suppliedBy* | Product (`SupplierId`) | Supplier (`SupplierId`) |
| *contains* | Shipment (`ProductId`) | Product (`ProductId`) |
| *hasTelemetryReading* | Refrigeration Unit (`UnitId`) | Refrigeration Telemetry (`UnitId`) |

When you're done, the relationship types are visible on the configuration canvas.

:::image type="content" source="media/tutorial-1-create-ontology/all-relationship-types.png" alt-text="Screenshot of the scenario relationship types." lightbox="media/tutorial-1-create-ontology/all-relationship-types.png":::

## Next steps

In this step, you created an ontology (preview) item and populated it with entity types, their properties, and relationship types between them. Next, enrich the entity types with more detail.

Next, continue to [Enrich the ontology with additional data](tutorial-2-enrich-ontology.md).
