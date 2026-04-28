---
title: View entity type details
description: Learn about the entity type details view in ontology (preview).
ms.date: 04/24/2026
ms.topic: how-to
---

# Entity type details in ontology (preview)

The *entity type details* view in ontology (preview) lets you explore your instantiated ontology data. The experience includes basic data previews, instance data, and a graph view.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

When your ontology (preview) item is created, a [Graph in Microsoft Fabric](../../graph/overview.md) child item is also created and is responsible for storing and displaying data in the **Overview** tab of the entity type details.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-overview-1.png" alt-text="Screenshot of data graphs in the entity type details overview page." lightbox="media/how-to-view-entity-type-details/entity-type-details-overview-1.png":::

## Prerequisites

Before viewing entity type details, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** and **Graph (preview)** enabled on your tenant.
* An ontology (preview) item with [data binding](how-to-bind-data.md) completed.

## Key concepts

The entity type details view uses the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Entity instance*
* *Entity type details*
* *[Graph in Microsoft Fabric](../../graph/overview.md)*

## Access entity type details

Follow these steps to access the entity type details in your ontology (preview) item.

1. In the **Explorer** pane of the Home configuration canvas, select the entity type that you want to view. Select **View Entity Type details** from the top ribbon.

    :::image type="content" source="media/how-to-view-entity-type-details/view-entity-type-details.png" alt-text="Screenshot of opening the experience from the menu ribbon.":::

1. The entity type details view opens to the **Configure** page. Tabs across the top of the page allow you to switch between the **Configure**, **Instances**, and **Overview** pages.

    :::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-configure-1.png" alt-text="Screenshot of the entity type details configure page. The three tabs are highlighted." lightbox="media/how-to-view-entity-type-details/entity-type-details-configure-1.png":::

## Configure tab

In the **Configure** page, you can manage properties, data bindings, relationship types, and report links for the entity type. 

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-configure-2.png" alt-text="Screenshot of the entity type details configure page." lightbox="media/how-to-view-entity-type-details/entity-type-details-configure-2.png":::

For more information about these features, see the following documents:
* [Add properties](how-to-create-entity-types.md#add-properties)
* [Bind data](how-to-bind-data.md)
* [Add relationship types](how-to-create-relationship-types.md)
* [Use resource links](how-to-use-resource-links.md)

## Instances tab

In the **Instances** page, you can view the instances associated with the entity type and their static property values.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-instances.png" alt-text="Screenshot of the entity type details instances page." lightbox="media/how-to-view-entity-type-details/entity-type-details-instances.png":::

### Explore an individual instance

You can browse to a specific entity instance to see more information about that specific instance. 

To open the instance view, start in the **Instances** tab of the entity type details, and select a row from the table.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-instances-select.png" alt-text="Screenshot of selecting a specific entity type instance." lightbox="media/how-to-view-entity-type-details/entity-type-details-instances-select.png":::

The instance view loads and displays tiles for its static properties, relationships, and time series data.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-instances-details.png" alt-text="Screenshot of data graphs for a single entity type instance." lightbox="media/how-to-view-entity-type-details/entity-type-details-instances-details.png":::

You can **Expand** the relationship graph to open its full Graph view and run queries that are scoped specifically to this entity instance. For more information about the graph view and querying, see the [Open graph view](#open-graph-view) section later in this article.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-instances-query.png" alt-text="Screenshot of the graph and query view for a specific entity instance." lightbox="media/how-to-view-entity-type-details/entity-type-details-instances-query.png":::

## Overview tab

In the **Overview** page, you can view entity instances as tiles in a dashboard. Tiles are provided through [Graph in Microsoft Fabric](../../graph/overview.md), and reflect relationships and time series data for the entity type.

:::image type="content" source="media/how-to-view-entity-type-details/entity-type-details-overview-2.png" alt-text="Screenshot of the entity type details overview page." lightbox="media/how-to-view-entity-type-details/entity-type-details-overview-2.png":::

### Manage tiles

The entity type details in ontology (preview) automatically shows tiles that display data about your entity types, including entity instance details and relationship graphs. All tiles you create at the entity level also appear at the [entity instance](#explore-an-individual-instance) level.

To create more tiles, follow these steps.

1. From the top right corner of the page, select **Add Tile**.

    :::image type="content" source="media/how-to-view-entity-type-details/add-tile.png" alt-text="Screenshot of adding a tile." lightbox="media/how-to-view-entity-type-details/add-tile.png":::

1. Select the type of tile you want to create: a **Timeseries** (time series) line chart for streaming data, a **Static property** bar chart for static data, a **Resource links** tile to display linked external resources, or a **Fabric graph** tile to visualize relationships (only one Fabric graph tile is allowed per overview).

1. Complete the configuration for your chosen tile type. The following image shows an example of configuring a static property tile.

    :::image type="content" source="media/how-to-view-entity-type-details/add-tile-static.png" alt-text="Screenshot of configuring a static property tile.":::

1. Back on the overview page, verify that your new tile is visible at the bottom of the dashboard.

If necessary, use the time range selector to configure the time range for the data displayed in time series tiles.

:::image type="content" source="media/how-to-view-entity-type-details/change-date-range.png" alt-text="Screenshot of configuring the time range." lightbox="media/how-to-view-entity-type-details/change-date-range.png":::

To edit or delete existing tiles, select **...** in the upper right corner of a tile.

:::image type="content" source="media/how-to-view-entity-type-details/edit-delete.png" alt-text="Screenshot of edit and delete options for a tile." lightbox="media/how-to-view-entity-type-details/edit-delete.png":::

### Open graph view

Follow these steps to view your ontology (preview) entities in a graph view provided by [Graph in Microsoft Fabric](../../graph/overview.md).

1. Select **Expand** from a graph tile in the **Overview** tab.

    :::image type="content" source="media/how-to-view-entity-type-details/graph-expand.png" alt-text="Screenshot of expanding a graph tile.":::

1. The full graph view opens:

    :::image type="content" source="media/how-to-view-entity-type-details/graph-full.png" alt-text="Screenshot of the full graph view showing entity types and their relationships." lightbox="media/how-to-view-entity-type-details/graph-full.png":::

In the graph view, you can explore using Graph in Microsoft Fabric's interface, and craft custom queries as described in the next section.

#### Query across entity instances

In the full graph view, use the **Query builder** ribbon to craft custom queries.

:::image type="content" source="media/how-to-view-entity-type-details/query-builder.png" alt-text="Screenshot of the query builder." lightbox="media/how-to-view-entity-type-details/query-builder.png":::

The default query shows the current entities and all relationships that are one hop away. Select **Run query** to run the default query. You see the results in a pane underneath the relationship type graph.

:::image type="content" source="media/how-to-view-entity-type-details/query-default.png" alt-text="Screenshot of the default query results showing specific instances that meet the criteria." lightbox="media/how-to-view-entity-type-details/query-default.png":::

To change the query, you can **Add filters** for property values or change the **Components** that are visible in the graph.

:::image type="content" source="media/how-to-view-entity-type-details/query-filter.png" alt-text="Screenshot of the filter options for a query." lightbox="media/how-to-view-entity-type-details/query-filter.png":::

You can also change the view type of the query results from **Diagram** to **Card** or **Table**.

:::image type="content" source="media/how-to-view-entity-type-details/query-view.png" alt-text="Screenshot of query results in table view." lightbox="media/how-to-view-entity-type-details/query-view.png":::

To run more complex queries or explore the data in more detail, navigate to the Graph in Microsoft Fabric interface by selecting **Open in Fabric Graph**. For more information, see [Graph in Microsoft Fabric overview (preview)](../../graph/overview.md).

:::image type="content" source="media/how-to-view-entity-type-details/open-in-graph.png" alt-text="Screenshot of the button to open Graph in Microsoft Fabric.":::

## Refresh the graph model

This section describes how and when your bound data stays up to date in your ontology (preview) item.

Downstream experiences automatically refresh whenever you make changes to your ontology schema. This feature ensures that whenever you add, edit, or remove any element like properties, types, or relationships, the system re-ingests all currently bound data to keep your downstream experiences in sync with the latest schema adjustments. 

However, this automatic refresh only applies to changes made within the schema itself. If there are changes to the external data source that feeds your graph (for example, if new records are added, updated, or deleted in the upstream system), the graph doesn't know about these changes unless you explicitly inform it. In this case, your graph might display stale data until a new ingestion is triggered. You can enforce an update by manually refreshing the graph.

>[!IMPORTANT]
> We recommend batching updates for refresh instead of refreshing the graph after every individual change, as the graph does a full refresh each time. **This approach has cost implications for the [Graph in Microsoft Fabric](../../graph/overview.md) item.** 

To refresh the graph, follow these steps:

1. Go to your Fabric workspace, and locate the graph model associated with your ontology (preview) item.

    :::image type="content" source="media/how-to-view-entity-type-details/refresh-graph-1.png" alt-text="Screenshot of the graph model in the workspace view.":::

1. Select **...** to expand the option menu for the graph model, and select **Schedule**.

    :::image type="content" source="media/how-to-view-entity-type-details/refresh-graph-2.png" alt-text="Screenshot of the Schedule option for the graph model.":::

1. In the **Schedule** view, select **Refresh now**.

    :::image type="content" source="media/how-to-view-entity-type-details/refresh-graph-3.png" alt-text="Screenshot of the Refresh now button in the graph model scheduling options.":::

    >![TIP]
    >You can also use this panel to manage a recurring refresh schedule for the graph model, to keep your ontology (preview) data up to date automatically on a specified cadence.

1. Verify that when you return to the ontology item, the data shown reflects your changes.

## Troubleshooting

For troubleshooting tips related to the entity type details in ontology (preview), see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-entity-type-details).


