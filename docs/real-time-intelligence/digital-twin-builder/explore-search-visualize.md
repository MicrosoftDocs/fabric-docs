---
title: Search and visualize your modeled data
description: Learn about ways to explore your data in digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 07/01/2025
ms.topic: how-to
---

# Search and visualize your modeled data

In digital twin builder (preview), the *explorer* lets you identify assets from keywords, explore asset details, and visualize time series data. After you complete the mapping stage in your digital twin builder, you should see assets populate in the explorer. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Access the explorer by selecting **Explore entity instances** from the menu ribbon in the [semantic canvas](concept-semantic-canvas.md#menu-ribbon).

:::image type="content" source="media/explore-search-visualize/explorer.png" alt-text="Screenshot of the explorer.":::

Here are the top scenarios for using the explorer:
* Efficient data retrieval with keyword search experience
* Robust asset exploration with card view
* Time series charts for easy data comparison and historical analysis

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* Your desired data in a [Fabric lakehouse](../../data-engineering/lakehouse-overview.md) with the necessary ETL done.
    * Time series data should be in *columnar* format. Columnar time series data is structured so that each column represents a different variable or attribute, while each row corresponds to a specific timestamp. 
* A [digital twin builder (preview) item](tutorial-1-set-up-resources.md#create-new-digital-twin-builder-item-in-fabric) with data [mapped](model-manage-mappings.md) to it from a lakehouse.

## Access the explorer

You can access the explorer from the digital twin builder (preview) semantic canvas, by selecting **Explore entity instances** from the menu ribbon.

:::image type="content" source="media/explore-search-visualize/access.png" alt-text="Screenshot of selecting the explorer view.":::

To leave the explorer and return to the semantic canvas, select **Home** in the top left corner of the explorer view.

:::image type="content" source="media/explore-search-visualize/explorer-home.png" alt-text="Screenshot of selecting Home.":::

## Explore assets

The explorer contains multiple view options.

### Card view

The *card view* displays all assets in list format. You can see details such as name, entity type, and properties associated with each asset. The card view is the explorer's default view.

:::image type="content" source="media/explore-search-visualize/explorer.png" alt-text="Screenshot of the explorer." lightbox="media/explore-search-visualize/explorer.png":::

### Details view

While in the card view, select an asset card to open the *Details view*.

This page shows all information related to the assets, such as properties and time series data, all in one place.

:::image type="content" source="media/explore-search-visualize/details.png" alt-text="Screenshot of the details view.":::

To return to the main explorer view, select **Explore** in the top left.

:::image type="content" source="media/explore-search-visualize/return-to-explore.png" alt-text="Screenshot of the Explore button.":::

#### Time series

While in the Details view, select the **Charts** tab to view time series data in chart format.

:::image type="content" source="media/explore-search-visualize/charts.png" alt-text="Screenshot of the charts tab." lightbox="media/explore-search-visualize/charts.png":::

You can change the data in the chart by selecting different time series properties underneath the chart, changing the aggregate function selection, or changing the date range. Multiple time series properties can be displayed on the chart at once.

## Use entity and keyword search

In the Card view, the entity type selector and keyword search box allow you to find matches in your assets across the *Entity*, *Name*, and *Unique ID* fields.

:::image type="content" source="media/explore-search-visualize/search.png" alt-text="Screenshot of the keyword search.":::

### Use advanced query

The no-code advanced query builder allows you to filter the card view even further, by querying based on entity type properties and allowing you to add multiple filters.

:::image type="content" source="media/explore-search-visualize/advanced-query.png" alt-text="Screenshot of the advanced query experience.":::