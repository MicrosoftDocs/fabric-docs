---
title: Use preview experience
description: Learn about the preview experience in ontology (preview).
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/02/2025
ms.topic: how-to
---

# Preview experience in ontology (preview)

The *preview experience* in ontology (preview) lets you view and explore your instantiated ontology data. The experience includes basic data previews, instance data, and a graph view.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

:::image type="content" source="media/how-to-use-preview-experience/preview-experience-1.png" alt-text="Screenshot of the preview experience." lightbox="media/how-to-use-preview-experience/preview-experience-1.png":::

## Prerequisites

Before using the preview experience, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
    * **Ontology item (preview)** and **Graph (preview)** enabled on your tenant.
* An ontology (preview) item with [data binding](how-to-bind-data.md) completed.

## Key concepts

The preview experience uses the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Entity instance*
* *Preview experience*
* [Graph in Microsoft Fabric](../../graph/overview.md)

## Access preview experience

Follow these steps to access the preview experience in your ontology (preview) item and see the entity type overview.

1. In the **Entity Types** pane, select the entity type that you want to view. Select **Entity type overview**.

    :::image type="content" source="media/how-to-use-preview-experience/entity-type-overview.png" alt-text="Screenshot of opening the experience from the menu ribbon.":::

1. The preview experience opens.

    :::image type="content" source="media/how-to-use-preview-experience/preview-experience-1.png" alt-text="Screenshot of the preview experience showing relationship and property graphs." lightbox="media/how-to-use-preview-experience/preview-experience-1.png":::

In the preview experience, you see an overview for the entity type that lets you preview the data of all the entity instances. There are multiple ways to explore the data in this view:

* [View and create tiles](#view-and-create-tiles): You can view data in line charts and create more tiles as needed. You can also configure time-specific slices for the tiles.

* [Use graph view](#use-graph-view): You can view your entity instances in a graph view provided through [Graph in Microsoft Fabric](../../graph/overview.md). You can also open your entity directly in Graph in Microsoft Fabric, where you can see more options for drilling down into your data and learning about your instantiated ontology.

* [Explore entity instances](#explore-entity-instances): You can browse to a specific entity instance to get more information about the instance in the instance view.

## View and create tiles

The preview experience in ontology (preview) automatically shows tiles that display data about your entity types, including entity instance details and relationship graphs. All tiles you create at the entity level also appear at the entity instance level.

To create more tiles, follow these steps.

1. From the ribbon, select **+ Add Tile**.

    :::image type="content" source="media/how-to-use-preview-experience/add-tile-1.png" alt-text="Screenshot of adding a tile.":::

1. Select the type of tile you want to create: a **Timeseries** (time series) line chart for streaming data, a **Static property** bar chart for static data, or **Fabric graph** for a relationship graph provided by Graph in Microsoft Fabric. Only one graph tile is allowed per dashboard.

1. Complete the configuration for your chosen tile type.

    :::image type="content" source="media/how-to-use-preview-experience/add-tile-2.png" alt-text="Screenshot of configuring a time series tile.":::

    :::image type="content" source="media/how-to-use-preview-experience/add-tile-3.png" alt-text="Screenshot of configuring a static property tile.":::

1. Back on the overview page, verify that your new tile is visible.
1. Use the time range selector to configure the time range for the data displayed in the tiles.

    :::image type="content" source="media/how-to-use-preview-experience/change-date-range.png" alt-text="Screenshot of configuring the time range." lightbox="media/how-to-use-preview-experience/change-date-range.png":::

To edit or delete existing tiles, select **...** in the upper right corner of a tile.

:::image type="content" source="media/how-to-use-preview-experience/edit-delete.png" alt-text="Screenshot of edit and delete options for a tile." lightbox="media/how-to-use-preview-experience/edit-delete.png":::

## Use graph view

Follow these steps to view your ontology (preview) entities in a graph view provided by [Graph in Microsoft Fabric](../../graph/overview.md).

1. Select **Expand** from a graph tile in the preview experience.

    :::image type="content" source="media/how-to-use-preview-experience/graph-expand.png" alt-text="Screenshot of expanding a graph tile.":::

1. The full graph view opens:

    :::image type="content" source="media/how-to-use-preview-experience/graph-full.png" alt-text="Screenshot of the full graph view showing entity types and their relationships." lightbox="media/how-to-use-preview-experience/graph-full.png":::

In the graph view, you can explore using Graph in Microsoft Fabric's interface, and craft custom queries as described in the next section.

### Query across entity instances

In the full graph view, use the **Query builder** ribbon to craft custom queries.

:::image type="content" source="media/how-to-use-preview-experience/query-builder.png" alt-text="Screenshot of the query builder." lightbox="media/how-to-use-preview-experience/query-builder.png":::

The default query shows the current entities and all relationships that are one hop away. Select **Run query** to run the default query. You see the results in a pane underneath the relationship type graph.

:::image type="content" source="media/how-to-use-preview-experience/query-default.png" alt-text="Screenshot of the default query results showing specific instances that meet the criteria." lightbox="media/how-to-use-preview-experience/query-default.png":::

To change the query, you can **Add filters** for property values, or change the **Components** that are visible in the graph.

:::image type="content" source="media/how-to-use-preview-experience/query-filter.png" alt-text="Screenshot of the filter options for a query." lightbox="media/how-to-use-preview-experience/query-filter.png":::

You can also change the view type of the query results, from **Diagram** to **Card** or **Table**.

:::image type="content" source="media/how-to-use-preview-experience/query-view.png" alt-text="Screenshot of query results in table view." lightbox="media/how-to-use-preview-experience/query-view.png":::

To run more complex queries or explore the data in more detail, navigate to the Graph in Microsoft Fabric interface by selecting **Open in Fabric Graph**. For more information, see [Graph in Microsoft Fabric overview (preview)](../../graph/overview.md).

:::image type="content" source="media/how-to-use-preview-experience/open-in-graph.png" alt-text="Screenshot of the button to open Graph in Microsoft Fabric.":::

## Explore entity instances

You can browse to a specific entity instance that's bound to your ontology (preview) item to see more information about that specific instance. 

To open the instance view, start in the overview page for the entity type, and select a row from the **Entity instances** table.

:::image type="content" source="media/how-to-use-preview-experience/instance-view-1.png" alt-text="Screenshot of selecting an instance from the overview page.":::

The instance view displays any tiles you configured at the entity type level, and any specific properties bound to this instance.

:::image type="content" source="media/how-to-use-preview-experience/instance-view-2.png" alt-text="Screenshot of the instance view showing instance properties and relationships." lightbox="media/how-to-use-preview-experience/instance-view-2.png":::

You can also **Expand** the graph view, where you can run a query specific to this entity instance. This graph view is similar to the [general graph view for the entity type](#use-graph-view) view, but scoped to this particular instance and its relationships.

:::image type="content" source="media/how-to-use-preview-experience/instance-view-3.png" alt-text="Screenshot of the instance graph query." lightbox="media/how-to-use-preview-experience/instance-view-3.png":::

## Refresh the graph model

This section describes how and when your bound data stays up to date in your ontology (preview) item.

In ontology (preview), downstream experiences automatically refresh whenever you make changes to your ontology schema. This feature ensures that whenever you add, edit, or remove any element like properties, types, or relationships, the system re-ingests all currently bound data to keep your downstream experiences in sync with the latest schema adjustments. 

However, this automatic refresh only applies to changes made within the schema itself. If there are changes to the external data source that feeds your graph (for example, if new records are added, updated, or deleted in the upstream system), the graph doesn't know about these changes unless you explicitly inform it. In this case, your graph might display stale data until a new ingestion is triggered. You can enforce an update by manually refreshing the graph.

>[!IMPORTANT]
> We recommend batching updates for refresh instead of refreshing the graph after every individual change, as the graph does a full refresh each time. **This approach has cost implications for the [Graph in Microsoft Fabric](../../graph/overview.md) item.** 

To refresh the graph, follow these steps:

1. Go to your Fabric workspace, and locate the graph model associated with your ontology (preview) item.

    :::image type="content" source="media/how-to-use-preview-experience/refresh-graph-1.png" alt-text="Screenshot of the graph model in the workspace view.":::

1. Select **...** to expand the option menu for the graph model, and select **Schedule**.

    :::image type="content" source="media/how-to-use-preview-experience/refresh-graph-2.png" alt-text="Screenshot of the Schedule option for the graph model.":::

1. In the **Schedule** view, select **Refresh now**.

    :::image type="content" source="media/how-to-use-preview-experience/refresh-graph-3.png" alt-text="Screenshot of the Refresh now button in the graph model scheduling options.":::

1. Verify that when you return to the ontology item, the data shown reflects your changes.

## Troubleshooting

For troubleshooting tips related to the preview experience in ontology (preview), see [Troubleshoot ontology (preview)](resources-troubleshooting.md#troubleshoot-preview-experience).
