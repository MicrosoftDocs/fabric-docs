---
title: "Tutorial Part 3: Explore the Ontology (Preview)"
description: Explore the ontology in canvas views, entity instance view, and graph view. Part 3 of the ontology (preview) tutorial.
ms.date: 09/18/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 3: Explore the ontology

In this tutorial step, explore your ontology in different ways. View the ontology in multiple canvas views, explore its entity instances, and explore the ontology's integrated graph.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

[!INCLUDE [Explore ontology (preview) canvas views](includes/explore-canvas-views.md)]

## Explore entity instances

When you bound data to your entity types in [part 1 of the tutorial](tutorial-1-create-ontology.md), ontology automatically created instances of those entity types that map to the source data rows. View the entity instances with these steps:

1. Start in the Home configuration canvas of ontology. Select an entity type, and **View Entity Type details** from the top ribbon.

    :::image type="content" source="media/tutorial-3-preview-ontology/view-entity-type-details.png" alt-text="Screenshot of opening the entity type details for Inventory." lightbox="media/tutorial-3-preview-ontology/view-entity-type-details.png":::

1. Open the **Instances** tab. You see a list of entity instances with data populated from the original lakehouse table data source. For example, the Inventory entity type instances have columns like `ProductId`, `OnHandQuantity`, and `ShelfAvailableUnits`.

    :::image type="content" source="media/tutorial-3-preview-ontology/instances.png" alt-text="Screenshot of the Inventory instances." lightbox="media/tutorial-3-preview-ontology/instances.png":::

    >[!TIP]
    >If data bindings don't load, confirm that the source data tables exist with matching column names, and that your Fabric identity has data access.

## Explore ontology graph

Ontology comes with an optional built-in instance of [graph in Microsoft Fabric](../../graph/overview.md). This feature isn't required for your ontology to work, but you can set it up to add another option for viewing and exploring your ontology details.

This section shows how to create an optional materialized graph from your existing ontology by selecting eligible entities and relationships and materializing the projection. Then, utilize the materialized graph to explore and discover connected data insights.

### Prepare the graph

1. Prepare data for graph visualization by defining an *entity type key* for each entity type. An entity type key shows which field uniquely identifies a row of sample data.

    >[!NOTE]
    > Entity types must have entity type keys defined to be eligible for graph projection.

    1. Select an entity type in the canvas and select **View Entity Type details**.
    1. Select **Define entity type key**.

        :::image type="content" source="media/tutorial-3-preview-ontology/entity-type-key.png" alt-text="Screenshot of selecting an entity type key." lightbox="media/tutorial-3-preview-ontology/entity-type-key.png":::

    1. Select the right key from the following table. Select **Save**.

        | Entity type | Entity type key |
        | --- | --- |
        | Location | `LocationId` |
        | Store | `LocationId` |
        | Distribution Center | `LocationId` |
        | Product | `ProductId` |
        | Frozen Product | `ProductId` |
        | Perishable Product | `ProductId` |
        | Sale | *skip* |
        | Inventory | `StoreId`, `ProductId` (multi-select) |
        | Refrigeration Unit | `UnitId` |
        | Shipment | `ShipmentId` |
        | Supplier | `SupplierId` |
        | Refrigeration Telemetry | *skip* |

    1. Repeat for each entity type until all entity types have keys.

1. Set up the graph instance. From the home canvas ribbon, select **Manage graph**.

    :::image type="content" source="media/tutorial-3-preview-ontology/manage-graph.png" alt-text="Screenshot of opening the manage graph option from the ribbon." lightbox="media/tutorial-3-preview-ontology/manage-graph.png":::

1. The **Configure Graph** page loads with the default selection of **Use the entire Ontology**. You can see all entity types in the **Entities** section, and the **Preview** section shows what the graph looks like. Each entity type is projected as a graph node, and each relationship type is projected as a graph edge.

    :::image type="content" source="media/tutorial-3-preview-ontology/configure-graph.png" alt-text="Screenshot of configuring the graph by projecting the entire ontology." lightbox="media/tutorial-3-preview-ontology/configure-graph.png":::

1. Notice that *Sale* and *Refrigeration_Telemetry* entity types can't be added to the graph. The graph in ontology doesn't currently support semantic model and eventhouse data sources.

    Verify that all entity types are selected except *Sale* and *Refrigeration_Telemetry*. Select **Continue**.

    >[!NOTE]
    > Currently, only delta tables from lakehouses or mirrored databases are supported data sources for the graph view.

1. On the **Projection Summary** page, you see 10 entities. Select **Materialize**. Creating the graph model might take several minutes.

    :::image type="content" source="media/tutorial-3-preview-ontology/materialize-graph.png" alt-text="Screenshot of selecting to materialize the graph." lightbox="media/tutorial-3-preview-ontology/materialize-graph.png":::

1. When the graph finishes provisioning, return to the home canvas view. <!--What opens automatically when the graph is done provisioning?-->

### Explore the graph

1. From the top ribbon, select **Explore graph**. This button is visible now that the graph is materialized.

    :::image type="content" source="media/tutorial-3-preview-ontology/explore-graph.png" alt-text="Screenshot of opening the explore graph option from the ribbon." lightbox="media/tutorial-3-preview-ontology/explore-graph.png":::

1. The graph queryset view opens. On the right side of the queryset, select the puzzle piece icon to expand the **Components** pane. The Components pane shows the list of nodes and edges that are available in your graph.

    :::image type="content" source="media/tutorial-3-preview-ontology/graph-components.png" alt-text="Screenshot of the Components pane." lightbox="media/tutorial-3-preview-ontology/graph-components.png":::

1. Under **Nodes**, select **Store**, **Product**, and **Shipment**. Under **Edges**, select **Shipment_Store** and **Shipment_Product**. The nodes and relationships are added to the canvas.

    :::image type="content" source="media/tutorial-3-preview-ontology/graph-components-selected.png" alt-text="Screenshot of entities and relationships selected in the Components pane." lightbox="media/tutorial-3-preview-ontology/graph-components-selected.png":::

1. Select **Path query** from the top ribbon and confirm the **Switch** when prompted. In this view, you can create complex path-finding queries.

1. Enter the following query details to search for nodes within two hops of the Seattle store's relationship with the supplier Cascade Fresh Products.

    * **Start node:** Store
    * **End node:** Supplier
    * **Filter start node:** *City = Seattle*
    * **Filter end node:** *SupplierName = Cascade Fresh Products*
    * **Max hops:** 2

    :::image type="content" source="media/tutorial-3-preview-ontology/path-query.png" alt-text="Screenshot of building a path query with a start node, direction, and end node." lightbox="media/tutorial-3-preview-ontology/path-query.png":::

1. Select **Run** to run the query and render the result in both the query result canvas and the path results pane.

    :::image type="content" source="media/tutorial-3-preview-ontology/path-query-results.png" alt-text="Screenshot of the path query results." lightbox="media/tutorial-3-preview-ontology/path-query-results.png":::

If you want, try more queries and [graph features](../../graph/overview.md) to explore the ontology further before continuing with the tutorial.

## Next steps

In this step, you explored the ontology, including the canvas, entity type instances, and graph view. Next, use the ontology agent to explore the data further with natural language queries.

Continue to [Consume ontology from agents](tutorial-4-use-agent.md).
