---
title: Use data from a KQL Database in Power BI Desktop in Real-time Analytics
description: Learn how to use data from your KQL database in Power BI Desktop.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Use data from a KQL Database in Power BI Desktop

In this article, you learn how to connect your KQL Database as a data source to Power BI Desktop. Once connected, you can use multiple tables to build your Power BI reports.

To create reports with Power BI service using a KQL Queryset, see [Create a Power BI report](create-powerbi-report.md).

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)
* [KQL database](create-database.md) with data.
* [Power BI Desktop](https://powerbi.microsoft.com/get-started).

## Connectivity modes

Power BI supports *Import* and *DirectQuery* connectivity modes. When building Power BI reports or dashboards, choose your connectivity mode depending on your scenario, scale, and performance requirements. Using **Import** mode copies your data to Power BI. In contrast, using **DirectQuery** mode queries your data directly from your KQL Database.

Use **Import** mode when:

* Your data set is small and you don't need near real-time data.
* You perform [aggregation functions](/azure/data-explorer/kusto/query/aggregation-functions?context=/fabric/context/context).

Use **DirectQuery** mode when:

* Your data set is large or you need near real-time data.

For more information on connectivity modes, see [Import and Direct Query connectivity modes](/power-bi/desktop-directquery-about).

## 1- Copy query URI

1. Navigate to your **KQL Database**.
1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere to use in a later step.

    :::image type="content" source="media/power-bi-data-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## 2- Use data in Power BI

To use your **KQL Database** as a data source in Power BI, you need to add the Azure Data Explorer connector.

1. Launch Power BI Desktop.
1. On the **Home** tab, select **Get Data** > **More**.

    :::image type="content" source="media/power-bi-data-connector/get-data.png" alt-text="Screenshot of the Home tab in Power BI Desktop, showing the drop-down menu of the Home tab entry titled Get data with the More option highlighted.":::

1. Search for *Azure Data Explorer*, select **Azure Data Explorer (Kusto)**, and then select **Connect**.

    :::image type="content" source="media/power-bi-data-connector/connect-data.png" alt-text="Screenshot of the Get Data window, showing  Azure Data Explorer in the search bar with the connect option highlighted.":::

1. In the window that appears, fill out the form with the following information.

    :::image type="content" source="media/power-bi-data-connector/cluster-database-table.png" alt-text="Screenshot of the Azure Data Explorer(Kusto) connection window showing the help cluster URL, with the DirectQuery option selected.":::

    | Setting | Field description | Sample value |
    |---|---|---|
    | Cluster | The Query URI from Microsoft Fabric's **KQL Database** dashboard. For other clusters, the URL is in the form *https://\<ClusterName\>.\<Region\>.kusto.windows.net*. | Paste your [Query URI](#1--copy-query-uri) |
    | Database | A database that is hosted on the cluster you're connecting to. You can optionally select a database in a later step. | Leave blank |
    | Table name | The name of a table in the database, or a query like <code>StormEvents \| take 1000</code>. You can optionally select a table name in a later step. | Leave blank |
    | Advanced options | Optionally, you can select options for your queries, such as result set size. |  Leave blank |
    | Data connectivity mode | Determines whether Power BI imports the data or connects directly to the data source. You can use either option with this connector. For more information, see [Connectivity modes](#connectivity-modes). | *DirectQuery* |

    **Advanced options**

    | Setting | Field description | Sample value |
    |---|---|---|
    | Limit query result record number| The maximum number of records to return in the result |`1000000` |
    | Limit query result data size | The maximum data size in bytes to return in the result | `100000000` |
    | Disable result set truncation | Enable/disable result truncation by using the notruncation request option | `true` |
    | Additional set statements | Sets query options for the duration of the query. Query options control how a query executes and returns results. | `set query_datascope=hotcache` |

1. On the **Navigator** screen, expand your database, select the tables you want to connect, and then select **Load Data**.

    Optionally, if you want to shape your data first, select **Transform data** to launch Power Query Editor. For more information, see [Shape data](/power-bi/fundamentals/desktop-getting-started?source=recommendations&branch=main#shape-data).

    :::image type="content" source="media/power-bi-data-connector/select-table.png" alt-text="Screenshot of Navigator screen, showing that the StormEvents table is selected. The Load button is highlighted.":::

## Next steps

[Create reports and dashboards in Power BI](/power-bi/create-reports/).
