---
title: "Tutorial part 3: View the ontology"
description: View the ontology by observing its entity instances and relationship graphs. Part 3 of the ontology (preview) tutorial.
ms.date: 04/19/2026
ms.topic: tutorial
---

# Ontology (preview) tutorial part 3: View the ontology

In this tutorial step, explore your ontology by viewing the entity type details included in ontology (preview). Inspect entity instances that instantiate your entity types with data, and explore relationship graphs that provide context across sales and device streaming data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## View entity instances 

When you bound data to your entity types in previous tutorial steps, ontology automatically created instances of those entities that are tied to the source data rows. In this section, you observe those entity instances and their data.

### View instance list and static data

1. Start in the Home configuration canvas of ontology. Select the *SaleEvent* entity type, and **View Entity Type details** from the top ribbon.

    :::image type="content" source="media/tutorial-3-preview-ontology/view-entity-type-details.png" alt-text="Screenshot of opening the entity type details for SaleEvent.":::

1. Open the **Instances** tab. Verify that it shows six entity instances with data populated from the *factsales* lakehouse table, like revenue and unit counts.

    :::image type="content" source="media/tutorial-3-preview-ontology/instances.png" alt-text="Screenshot of the Freezer instances." lightbox="media/tutorial-3-preview-ontology/instances.png":::

    >[!TIP]
    >If data bindings don't load, confirm that the source data tables exist with matching column names, and that your Fabric identity has data access.

### View time series data 

1. In the top left corner of the page, use the selector next to the entity type name to switch to the *Freezer* entity type.

    :::image type="content" source="media/tutorial-3-preview-ontology/switch-freezer.png" alt-text="Screenshot of switching to a different entity type." lightbox="media/tutorial-3-preview-ontology/switch-freezer.png":::

1. Open the **Overview** tab. The tab loads with empty charts, because the default time range of "Last 30 days" doesn't include any data.

    :::image type="content" source="media/tutorial-3-preview-ontology/overview.png" alt-text="Screenshot of the Overview tab." lightbox="media/tutorial-3-preview-ontology/overview.png":::

1. Update the time range from the default of *Last 30 days* to a custom date range that begins on *Fri Aug 01 2025 at 12:00 AM*, ends on *Mon Aug 04 2025 at 12:00 AM*, and has a **Time granularity** of *5 minutes*.

    :::image type="content" source="media/tutorial-3-preview-ontology/freezer-telemetry-edit-time.png" alt-text="Screenshot of the time selector." lightbox="media/tutorial-3-preview-ontology/freezer-telemetry-edit-time.png":::

1. Observe the time series data that's now visible from different *Freezer* entity instances in the time window you selected.

    :::image type="content" source="media/tutorial-3-preview-ontology/freezer-telemetry.png" alt-text="Screenshot of the time series tiles." lightbox="media/tutorial-3-preview-ontology/freezer-telemetry.png":::

## View ontology graph

The **Overview** tab also contains a **Relationship graph**, which you use to visualize your ontology in a graph of nodes and edges.

1. Use the entity type selector to switch to the *SaleEvent* entity type. In the **Relationship graph** tile, select **Expand**.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-graph-sale.png" alt-text="Screenshot of expanding the SaleEvent relationship graph." lightbox="media/tutorial-3-preview-ontology/relationship-graph-sale.png":::

1. The expanded graph view opens. Observe the details of the relationships to the *SaleEvent* entity type from *Store* and *Products*.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-graph-expanded.png" alt-text="Screenshot of data in the expanded relationship graph." lightbox="media/tutorial-3-preview-ontology/relationship-graph-expanded.png":::

1.  Use the entity type selector to switch to the *Store* entity type. Expand its relationship graph.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-graph-store.png" alt-text="Screenshot of expanding the Store relationship graph." lightbox="media/tutorial-3-preview-ontology/relationship-graph-store.png":::

1. In the graph, observe the relationship between *Store* and *SaleEvent*, and the relationship between *Store* and *Freezer*. Then, select **Run query** in the query builder ribbon. This action runs the default query and shows a graph of entity instances alongside their connections.

    :::image type="content" source="media/tutorial-3-preview-ontology/relationship-default-query.png" alt-text="Screenshot of the Store relationship graph and instances." lightbox="media/tutorial-3-preview-ontology/relationship-default-query.png":::

>[!TIP]
>If the graph looks sparse, check the entity type keys in the data bindings and verify that they match the keys defined in [Create entity types and data bindings](tutorial-1-create-ontology.md#create-entity-types-and-data-bindings). For example, the key for the *SaleEvent* entity type is `SaleId`.

## Query graph instances

In the relationship graph view, you can query your ontology for entity instances that meet certain criteria. Use the **Query builder** filters in the top ribbon to craft queries.

:::image type="content" source="media/tutorial-3-preview-ontology/query-builder.png" alt-text="Screenshot of selecting the query builder." lightbox="media/tutorial-3-preview-ontology/query-builder.png":::

First, craft this query: *Show all freezers that are operated in the Paris store.*
1. In the *Store* entity's relationship graph, select **Add filter > Store > StoreId** from the query builder ribbon. Set the filter for `StoreId = S-PAR-01`. This value is the store ID for the Paris store.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-filter-store.png" alt-text="Screenshot of filtering by Store ID." lightbox="media/tutorial-3-preview-ontology/add-filter-store.png":::

1. In the **Components** panel, uncheck *SaleEvent* so that the only checked fields are **Nodes > Store**, **Nodes > Freezer**, and **Edges > operates**.

    :::image type="content" source="media/tutorial-3-preview-ontology/components.png" alt-text="Screenshot of filtering the components." lightbox="media/tutorial-3-preview-ontology/components.png":::

1. Select **Run query** and verify that the instance graph shows two freezers connected to the *Paris* store.

    :::image type="content" source="media/tutorial-3-preview-ontology/store-freezers.png" alt-text="Screenshot of the freezers that are connected to the filtered store." lightbox="media/tutorial-3-preview-ontology/store-freezers.png":::

1. Select **Clear query** to clear the query results.

Next, craft this query: *Show all stores that have made a sale with a revenue greater than 150.*
1. Select **Add a node** and add a node for *SaleEvent*.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-node.png" alt-text="Screenshot of adding nodes to a new query." lightbox="media/tutorial-3-preview-ontology/add-node.png":::

1. In the **Components** panel, check the boxes next to **Nodes > Store** and **Edges > from** to add them to the graph.
1. From the query builder ribbon, select **Add filter > SaleEvent > RevenueUSD**. Set the filter for `RevenueUSD > 150`.

    :::image type="content" source="media/tutorial-3-preview-ontology/add-filter-sale.png" alt-text="Screenshot of filtering by sale revenue." lightbox="media/tutorial-3-preview-ontology/add-filter-sale.png":::

1. Select **Run query** and verify that the instance graph shows two stores that meet the filter for their connected sale events. You can also select the nodes in the graph to get details of the specific sale events.

    :::image type="content" source="media/tutorial-3-preview-ontology/sale-event-stores.png" alt-text="Screenshot of the stores that meet the filter for their connected sale events." lightbox="media/tutorial-3-preview-ontology/sale-event-stores.png":::

This process allows you to inspect the paths that connect operational issues (like rising freezer temperature at certain stores) to business outcomes (sales).

## Next steps

In this step, you viewed the instances connected to your ontology and explored the data they contain. Next, create a data agent to explore the data further by using natural language queries. 

Continue to [Create data agent](tutorial-4-create-data-agent.md).


