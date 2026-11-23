---
title: "Tutorial Part 3: Explore the Ontology (Preview)"
description: Explore the ontology in canvas views, entity instance view, and graph view. Part 3 of the ontology (preview) tutorial.
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Ontology (preview) tutorial part 3: Explore the ontology

In this tutorial step, explore your ontology in different ways. View the ontology in multiple canvas views, explore its entity instances, and explore the ontology's integrated graph.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

[!INCLUDE [Explore ontology (preview) canvas views](includes/explore-canvas-views.md)]

## Explore entity instances

When you bound data to your entity types in [part 1 of the tutorial](tutorial-1-create-ontology.md), ontology automatically created instances of those entity types that map to the source data rows. View the entity instances with these steps:

1. Start in the Home configuration canvas of ontology. Select an entity type, and then select **Entity type > Open details** from the ribbon.

    :::image type="content" source="media/tutorial-3-preview-ontology/view-entity-type-details.png" alt-text="Screenshot of opening entity type details from the Entity type ribbon." lightbox="media/tutorial-3-preview-ontology/view-entity-type-details.png":::

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

    1. Select an entity type in the canvas and select **Entity type > Open details**.
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

    1. Repeat for each entity type that you plan to project, except the types marked *skip*.

1. Set up the graph instance. From the home canvas ribbon, select **Home > Manage > Graph**.

    :::image type="content" source="media/tutorial-3-preview-ontology/manage-graph.png" alt-text="Screenshot of opening the manage graph option from the ribbon." lightbox="media/tutorial-3-preview-ontology/manage-graph.png":::

1. On **Review validation**, wait for validation to finish. Review the **Status** column, and select **Ineligible** for an entry to learn why it can't be projected. Select **Select entities**.

1. On **Choose what to project**, select the eligible entity types and expand them to select their relationships. The **Preview** pane shows the selected subgraph. Each entity type becomes a node type, and each relationship type becomes an edge type.

    :::image type="content" source="media/tutorial-3-preview-ontology/configure-graph.png" alt-text="Screenshot of a focused projection containing Product, Supplier, and suppliedBy." lightbox="media/tutorial-3-preview-ontology/configure-graph.png":::

    The screenshot shows a focused Product and Supplier example. For the queries later in this tutorial, include Store, Product, Shipment, Supplier, and their connecting relationships.

    >[!NOTE]
    > Only delta tables from lakehouses or mirrored databases are supported. Sale and Refrigeration Telemetry use unsupported source types. Relationships also need a supported data binding with a single backing table. For example, you can use *dimproducts* as a mapping table for *suppliedBy*, mapping Product's `ProductId` to `ProductId` and Supplier's `SupplierId` to `SupplierId`. For more information, see [Create relationship types](how-to-create-relationship-types.md) and [Graph limitations](how-to-use-ontology-graph.md#limitations).

    Select **Continue**.

1. On **Projection summary**, review your selected entities and relationships. Select **Materialize**. Creating and loading the graph model might take several minutes.

    :::image type="content" source="media/tutorial-3-preview-ontology/materialize-graph.png" alt-text="Screenshot of selecting to materialize the graph." lightbox="media/tutorial-3-preview-ontology/materialize-graph.png":::

1. Wait for **Materialization status** to show **Graph materialized** and a **Complete** refresh status.

### Explore the graph

1. In your Fabric workspace, open the graph model associated with your ontology. In the graph model, select **Query > Query now**.

    :::image type="content" source="media/tutorial-3-preview-ontology/explore-graph.png" alt-text="Screenshot of Query now in the graph model Query menu." lightbox="media/tutorial-3-preview-ontology/explore-graph.png":::

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

1. Select **Run query** to run the query and render the result in both the query result canvas and the path results pane.

    :::image type="content" source="media/tutorial-3-preview-ontology/path-query-results.png" alt-text="Screenshot of the path query results." lightbox="media/tutorial-3-preview-ontology/path-query-results.png":::

If you want, try more queries and [graph features](../../graph/overview.md) to explore the ontology further before continuing with the tutorial.

## Next steps

In this step, you explored the ontology, including the canvas, entity type instances, and graph view. Next, use the ontology agent to explore the data further with natural language queries.

Continue to [Consume ontology from agents](tutorial-4-use-agent.md).
