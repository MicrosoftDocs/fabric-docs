---
title: Materialize an Ontology Graph (preview)
description: Learn how to materialize a graph from an ontology (preview) by selecting eligible entities and relationships, then explore connected data insights.
ms.date: 11/09/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Materialize a graph from an ontology (preview)

Every ontology includes an optional built-in instance of [graph in Microsoft Fabric](../../graph/overview.md). This feature isn't required for your ontology to work, but you can materialize the graph to add another option for viewing and exploring your ontology details.

In the queryable materialized graph, each business entity becomes a node and each relationship becomes an edge. The graph lets you traverse those relationships directly to discover connections across your data, such as how customers, orders, and assets link together.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This article shows you how to create a materialized graph of your ontology by selecting eligible entity types and relationship types to include, creating the graph, and exploring the result to discover connected data insights.

## Prerequisites

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* Entity types and relationship types in your ontology that adhere to the [graph limitations](#limitations), including using supported data sources and defining entity type keys.

## About graph in ontology

In the integration between ontology and graph, ontology defines meaning and graph executes relationships. Every ontology can generate a semantic graph model from its business entities, relationships, rules, and source bindings. This schema graph exists as a semantic child of the ontology, so it stays aligned with the business model without requiring you to remodel concepts or maintain duplicate definitions. The graph isn't required, and Fabric doesn't materialize it without your input.

Opt in to graph materialization when you have relationship-centric business questions to answer. Start with a desired business outcome, identify the entities and relationships relevant to your use case, and let Fabric recommend the graph scope that supports the analysis. By selecting only the connected data that the question requires, you minimize unnecessary cost, complexity, and data movement. This approach is especially useful when the answer depends on the relationship path itself, such as questions involving dependency analysis, multi-hop traversal, shortest paths, supply chain impact assessment, operational blast radius, or connected-entity discovery. The ontology agent routes each request to the appropriate execution engine and uses graph only when it materially improves answer quality and explainability.

The result is a governed, efficient architecture where every ontology is graph-ready, but you don't pay the cost of full graph materialization unless the business scenario demands it. By combining ontology-driven business meaning with selective graph materialization, you answer complex relationship-heavy questions while maintaining governance, transparency, and operational efficiency.

The following video gives a quick look into how graph integrates into ontology to answer business questions about entity type relationship paths.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=23000b31-fa65-40d9-b1d9-dab0a7190afe]

## Materialize the graph

To use graph in your ontology, opt in to the materialized graph.

1. From the ribbon of your ontology Home screen, select **Home > Manage > Graph**.

    :::image type="content" source="media/how-to-use-ontology-graph/manage-graph.png" alt-text="Screenshot of the Graph option in the Manage menu." lightbox="media/how-to-use-ontology-graph/manage-graph.png":::

1. On the **Review validation** page, wait for validation to finish. Review each entity's **Status**. For an ineligible entity, select **Ineligible** to review the validation details. Select **Select entities**.

1. On **Choose what to project**, select the eligible entity types and relationships that you need. Expand an entity type to review its relationships. The **Preview** pane shows the selected nodes and edges.

    :::image type="content" source="media/how-to-use-ontology-graph/configure-graph.png" alt-text="Screenshot of selecting Product, Supplier, and suppliedBy for a focused graph projection." lightbox="media/how-to-use-ontology-graph/configure-graph.png":::

    >[!NOTE]
    >Some entities and relationships can't be selected due to graph [limitations](#limitations). The **Status** column in the **Entities** pane indicates eligibility.

    When you finish selecting entities, select **Continue**.

1. On the **Projection summary** page, review the selected subgraph in the **Preview** pane. Select **Materialize** to create the graph and load its data. Depending on the volume of source data, the process might take several minutes to several hours to complete.

1. Check **Materialization status**. Wait for **Graph materialized** and a **Complete** refresh status before querying the graph.

## Access the materialized graph

Open the graph model from your Fabric workspace after materialization completes.

1. In your workspace, open the graph model associated with your ontology.

    :::image type="content" source="media/how-to-use-ontology-graph/workspace.png" alt-text="Screenshot of the graph model associated with an ontology in the workspace." lightbox="media/how-to-use-ontology-graph/workspace.png":::

1. Select **Query > Query now** to open the graph query experience. To create a saved queryset, select **Query > Create queryset** instead.

    :::image type="content" source="media/how-to-use-ontology-graph/explore-graph.png" alt-text="Screenshot of Query now and Create queryset in the graph model Query menu." lightbox="media/how-to-use-ontology-graph/explore-graph.png":::

1. Expand the **Components** pane to review the nodes and edges available in your graph.

    :::image type="content" source="media/how-to-use-ontology-graph/components.png" alt-text="Screenshot of the Components pane." lightbox="media/how-to-use-ontology-graph/components.png":::

For more information about exploring the independent graph item, see the [Graph in Microsoft Fabric documentation](../../graph/overview.md).

## Explore graph features

After the graph is materialized, you can explore it through querysets. A queryset can contain multiple queries, and you can save it as a single Fabric item to share with other users.

From the queryset view, use the following graph features in any order to build querysets and explore your graph contents.

* Select **Add a node** in the center canvas to select a starting node and start building a query. Expand it to discover connected nodes.

    :::image type="content" source="media/how-to-use-ontology-graph/add-node.png" alt-text="Screenshot of adding a node on the canvas." lightbox="media/how-to-use-ontology-graph/add-node.png":::

* Use the **Components** pane to select other entities and relationships to view in the canvas.

    :::image type="content" source="media/how-to-use-ontology-graph/components-selected.png" alt-text="Screenshot of selecting entity types and relationship types in the Components pane." lightbox="media/how-to-use-ontology-graph/components-selected.png":::

* Use the **Queries** side pane on the left to store a list of named queries. Saving the queryset item persists all queries that you create from the graph model.

    :::image type="content" source="media/how-to-use-ontology-graph/queries.png" alt-text="Screenshot of saved query options in the Queries pane." lightbox="media/how-to-use-ontology-graph/queries.png":::

* Use the **Path query** pane to create path-finding queries. Select a start node, direction, and end node to form a path query, and apply optional filters to the start node or edge node.

    :::image type="content" source="media/how-to-use-ontology-graph/path-query.png" alt-text="Screenshot of building a path query with a start node, direction, and end node." lightbox="media/how-to-use-ontology-graph/path-query.png":::

    Select **Run query** to run the query and render the result in both the query result canvas and the path results pane.

    :::image type="content" source="media/how-to-use-ontology-graph/path-query-results.png" alt-text="Screenshot of the path query results." lightbox="media/how-to-use-ontology-graph/path-query-results.png":::

## Manage the materialized graph

When you save changes to the ontology, select **Home** > **Manage** > **Graph** to review and update the materialized graph projection.

:::image type="content" source="media/how-to-use-ontology-graph/configure-graph-update.png" alt-text="Screenshot of the Configure Graph page showing entity eligibility and usage status." lightbox="media/how-to-use-ontology-graph/configure-graph-update.png":::

In the **Configure Graph** page, complete these actions in any order to update your graph as needed.

* Review **Materialization status**, which shows the counts of materialized, changed, removed, and unused nodes and edges.

* Review the **Entities** section and check that each selected entity shows an **Eligible** status.

* Select **Select entities** to change the projected entities and relationships.

>[!NOTE]
>Manage the projected entities and relationships through **Home > Manage > Graph** in ontology. The independent graph model also provides **Manage in Ontology** to return to the ontology.

## Refresh the graph model

Schema updates and data refresh serve different purposes. If upstream columns change, review your ontology's data bindings and update the schema as needed. The [ontology agent](how-to-use-ontology-agent.md) can help you review schema changes.

If source rows are added, updated, or deleted, refresh the materialized graph to load the latest data. Use the graph refresh controls rather than an agent request to trigger the refresh.

### Refresh from ontology

1. Select **Home > Manage > Graph**.

1. In **Materialization status**, select the circular-arrow refresh icon in the **Last refresh** card.

    :::image type="content" source="media/how-to-use-ontology-graph/ontology-agent-refresh.png" alt-text="Screenshot of the Last refresh card showing Complete and the circular-arrow refresh icon." lightbox="media/how-to-use-ontology-graph/ontology-agent-refresh.png":::

1. In the **Refresh data** dialog, select **Continue**.

1. Wait for **Last refresh** to show **Complete**.

### Refresh from the workspace

You can also refresh the graph model from your workspace.

1. Go to your Fabric workspace, and locate the graph model associated with your ontology (preview) item.

    :::image type="content" source="media/how-to-use-ontology-graph/refresh-graph-select.png" alt-text="Screenshot of the graph model in the workspace view.":::

1. Select **...** to expand the option menu for the graph model, and select **Schedule**.

    :::image type="content" source="media/how-to-use-ontology-graph/refresh-graph-schedule.png" alt-text="Screenshot of the Schedule option for the graph model.":::

1. In the **Schedule** view, select **Refresh now**.

    :::image type="content" source="media/how-to-use-ontology-graph/refresh-graph.png" alt-text="Screenshot of the Refresh now button in the graph model scheduling options.":::

    >[!TIP]
    >You can also use this panel to manage a recurring refresh schedule for the graph model, to keep your ontology (preview) data up to date automatically on a specified cadence.

1. Verify that when you return to the ontology item, the data shown reflects your changes.

## Limitations

The following limitations apply when you project ontology entities and relationships into a graph:

* **Entity type key required:** Entities must have an entity type key specified to be eligible for the projection.
* **Unsupported property types:** Some entity property types aren't supported in graph, such as Binary and Variant. Graph projection converts those unsupported data types to String.
* **Unsupported data sources:** Currently, only delta tables from lakehouses or mirrored databases are supported. Entities with data bound to a semantic model aren't supported.
* **Unbound entities or relationships:** Entities and relationships without a data source binding aren't eligible for graph projection. Select **Ineligible** to review the validation details.
* **Multiple backing tables:** Entities or relationships with multiple backing tables aren't eligible for graph projection.
* **Limited time series support:** Graph projection converts a property with a time series type to the base type.
* **Limited namespace support:** For entities and relationships that use namespaces, graph projection adds the namespace as a prefix to the label of the corresponding node or edge.
* **Limited entity type inheritance support:** For an entity with a base entity, the corresponding node type includes properties inherited from the base entity and properties defined by the derived entity.

## Related content

* [Ontology (preview) tutorial part 3: Explore the ontology](tutorial-3-preview-ontology.md)
* [Graph in Microsoft Fabric](../../graph/overview.md)
