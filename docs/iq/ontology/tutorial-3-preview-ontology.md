---
title: "Tutorial part 3: Preview the ontology"
description: Preview the ontology by observing its entity instances and relationship graphs. Part 3 of the ontology (preview) tutorial.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/03/2025
ms.topic: tutorial
---

# Ontology (preview) tutorial part 3: Preview the ontology

In this tutorial step, explore your ontology by using the preview experience included in ontology (preview). Inspect entity instances that instantiate your entity types with data, and explore relationship graphs that provide context across sales and device streaming data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Preview entity instances 

When you bound data to your entity types in previous tutorial steps, ontology automatically created instances of those entities that are tied to the source data rows. In this section, you use the preview experience to view those entity instances.

1. Select the *SaleEvent* entity type, and select **Entity type overview** from the top ribbon.

    :::image type="content" source="media/tutorial-3-preview-ontology/open-preview.png" alt-text="Screenshot of opening the preview experience.":::

    It might take a few minutes for the ontology overview to load the first time.

1. Scroll down to the **Entity instances** section. Verify that it shows entity instances, with unit counts and revenue populated from the *factsales* lakehouse table.

    :::image type="content" source="media/tutorial-3-preview-ontology/entity-instances.png" alt-text="Screenshot of the entity instances." lightbox="media/tutorial-3-preview-ontology/entity-instances.png":::

    >[!TIP]
    >If data bindings don't load, confirm that the source data tables exist with matching column names, and that your Fabric identity has data access.

1. Open the *Freezer* entity type in the preview experience, by selecting it in the **Entity Types** pane and selecting **Entity type overview** from the top ribbon.

1. Update the time range from the default of *Last 30 minutes* to a custom date range that begins on *Fri Aug 01 2025 at 12:00 AM*, ends on *Mon Aug 04 2025 at 12:00 AM*, and has a **Time granularity** of *1 minute*.

    :::image type="content" source="media/tutorial-3-preview-ontology/freezer-telemetry-edit-time.png" alt-text="Screenshot of the time selector." lightbox="media/tutorial-3-preview-ontology/freezer-telemetry-edit-time.png":::

1. Observe the time series data that's visible from different *Freezer* entity instances.

    :::image type="content" source="media/tutorial-3-preview-ontology/freezer-telemetry.png" alt-text="Screenshot of the time series tiles." lightbox="media/tutorial-3-preview-ontology/freezer-telemetry.png":::

## Preview ontology graph

The preview experience also contains a **Relationship graph**, which you use to visualize your ontology in a graph of nodes and edges.

1. Use the tabs across the top of the preview experience to reopen the *SaleEvent* entity type. In the **Relationship graph** tile, select **Expand**.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-graph.png" alt-text="Screenshot of expanding the relationship graph.":::

1. In the graph, observe the details of the relationships to the *SaleEvent* entity type from *Store* and *Products*.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-graph-expanded.png" alt-text="Screenshot of data in the expanded relationship graph." lightbox="media/tutorial-3-preview-ontology/relationship-graph-expanded.png":::

1. Open the preview experience for the *Store* entity type, and **Expand** its relationship graph.
1. In the graph, observe the relationship between *Store* and *SaleEvent*, and the relationship between *Store* and *Freezer*. Then, select **Run query** in the query builder ribbon to run the default query and see a graph of entity instances and their connections.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-default-query.png" alt-text="Screenshot of the Store relationship graph and instances." lightbox="media/tutorial-3-preview-ontology/relationship-default-query.png":::

>[!TIP]
>If the graph looks sparse, check the entity type keys in the data bindings and verify that they match the keys defined in [Create entity types and data bindings](tutorial-1-create-ontology.md#create-entity-types-and-data-bindings). For example, the key for the *SaleEvent* entity type is `SaleId`.

## Query graph instances

In the relationship graph view, you can query your ontology for entity instances that meet certain criteria. Use the **Query builder** filters in the top ribbon to craft queries.

:::image type="content" source="media/tutorial-3-preview-ontology/query-builder.png" alt-text="Screenshot of selecting the query builder.":::

First, craft this query: *Show all freezers that are operated in the Paris store.*
1. In the *Store* entity's relationship graph, select **Add filter > Store > StoreId** from the query builder ribbon. Set the filter for `StoreId = S-PAR-01`. This value is the store ID for the Paris store.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-filter-store.png" alt-text="Screenshot of filtering by Store ID." lightbox="media/tutorial-3-preview-ontology/add-filter-store.png":::

1. In the **Components** pane, uncheck *SaleEvent* so that the only checked fields are **Nodes > Store**, **Nodes > Freezer**, and **Edges > operates**.

    :::image type="content" source="media/tutorial-3-preview-ontology/components.png" alt-text="Screenshot of filtering the components." lightbox="media/tutorial-3-preview-ontology/components.png":::

1. Select **Run query** and verify that the instance graph shows two freezers connected to the *Paris* store.

    :::image type="content" source="media/tutorial-3-preview-ontology/store-freezers.png" alt-text="Screenshot of the freezers that are connected to the filtered store." lightbox="media/tutorial-3-preview-ontology/store-freezers.png":::

1. Select **Clear query** to clear the query results, and use the **Remove filter** options to remove the store filter.

    :::image type="content" source="media/tutorial-3-preview-ontology/clear-query.png" alt-text="Screenshot of clearing the query and filter." lightbox="media/tutorial-3-preview-ontology/clear-query.png":::

Next, craft this query: *Show all stores that have made a sale with a revenue greater than 150.*
1. Select **Add a node** and add a node for *SaleEvent*.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-node.png" alt-text="Screenshot of adding nodes to a new query.":::

1. In the **Components** pane, check the boxes next to **Nodes > Store** and **Edges > has** to add them to the graph.
1. From the query builder ribbon, select **Add filter > SaleEvent > RevenueUSD**. Set the filter for `RevenueUSD > 150`.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-filter-sale.png" alt-text="Screenshot of filtering by sale revenue.":::

1. Select **Run query** and verify that the instance graph shows two stores that meet the filter for their connected sale events. You can also select the nodes in the graph to get details of the specific sale events.

    :::image type="content" source="media/tutorial-3-preview-ontology/sale-event-stores.png" alt-text="Screenshot of the stores that meet the filter for their connected sale events." lightbox="media/tutorial-3-preview-ontology/sale-event-stores.png":::

This process allows you to inspect the paths that connect operational issues (like rising freezer temperature at certain stores) to business outcomes (sales).

## Next steps

In this step, you previewed the instances connected to your ontology and explored the data they contain. Next, create a data agent to explore the data further by using natural language queries. 

Continue to [Create data agent](tutorial-4-create-data-agent.md).
