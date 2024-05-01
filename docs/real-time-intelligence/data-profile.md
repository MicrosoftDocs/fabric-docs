---
title: Access the data profile of a table in Real-Time Intelligence
description: Learn how to access the data profile of a table in Real-Time Intelligence.
ms.reviewer: mibar
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.date: 04/21/2024
---

# Access the data profile of a table

The data profile feature in a KQL queryset allows you to quickly gain insights into the data within your tables. It features a time chart illustrating data distribution according to a specified `datetime` field and presents each column of the table along with essential related statistics. This article explains how to access and understand the data profile of a table.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions and data.

## Open the data profile

To open the data profile view for a table, in the **Explorer** pane, right-click the desired table > **Data profile**:

:::image type="content" source="media/data-profile/data-profile-in-menu.png" alt-text="Screenshot of data profile in menu.":::

The data profile for the selected table view opens in a side window.

> [!NOTE]
> The data profile is based on data from the [hot cache](/azure/data-explorer/kusto/management/cache-policy?context=/fabric/context/context-rta&pivots=fabric).

## Filter data by time range

To filter the data presented in the data profile by ingestion time, select one of the tabs at the top of the profile. These tabs allow you to filter by one day (`1d`), one week (`7d`), one month (`30d`), one year (`365d`) or the full time range of your data (`max`).

:::image type="content" source="media/data-profile/data-profile-filter-time-range.png" alt-text="Screenshot of the time range filter tabs.":::

## View data distribution by other `datetime` columns

By default, the time chart shows the data distribution by ingestion time. To view the distribution by a different `datetime` column, select the dropdown tab at the top right of the chart.

:::image type="content" source="media/data-profile/data-profile-filter-time-chart.png" alt-text="Screenshot of the time chart filter.":::

## View columns and their top values

You can browse the table schema in the profile by looking at the columns or finding a particular column. You can also choose columns to see their top values, value distributions, and sample values depending on their data type, as follows:

|Type|Statistic|On selection|
|--|--|--|
|string|Count of unique values| Top 10 values|
|numeric|Minimum and maximum values| Top 10 values|
|datetime|Date range| Top 10 values|
|dynamic|No specific statistic|Random sampled value|
|bool|No specific statistic|Count of true and false|

For example, in the following image, the `ColorName` column of type `string` is selected:

:::image type="content" source="media/data-profile/data-profile-columns.png" alt-text="Screenshot of example column selected.":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Use example queries](query-table.md)
* [Customize results in the KQL Queryset results grid](customize-results.md)
