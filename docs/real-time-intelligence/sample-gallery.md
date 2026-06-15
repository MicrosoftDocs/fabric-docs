---
title: Sample Gallery
description: Learn how to load sample data into Real-Time Intelligence and explore it using sample queries in a KQL queryset.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.date: 06/10/2026
ms.subservice: rti-kql-query
ms.search.form: KQL Queryset

#customer intent: As a Fabric user, I want to load and query sample data so that I can learn how to work with Real-Time Intelligence.

---

# Sample Gallery

Real-Time Intelligence in Microsoft Fabric offers a sample data gallery containing data in various formats and sizes for you to practice loading data and writing queries. Each dataset in the **Real-Time Intelligence Sample Gallery** is loaded into your workspace as a table in a new KQL database. Along with the database, an attached KQL queryset is created, containing sample queries unique to the dataset you selected.

This article shows you how to load sample data and run queries in Real-Time Intelligence.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Get data

> [!TIP]
> To use the sample gallery to create an end-to-end real-time solution that shows how to stream, analyze, and visualize real-time data in a real-world context, see [End-to-end sample](sample-end-to-end.md).

1. Select **Workloads** from the left navigation bar and then **Real-Time Intelligence**.
1. On the **Real-Time Intelligence** homepage, on the *Explore Eventhouse samples* tile, choose **Select**.
1. From the **Real-Time Intelligence Sample Gallery** window, select a sample scenario tile to load into your workspace. After you select a tile, the data is loaded as a table in the KQL database, and a KQL queryset with sample queries unique to the dataset is automatically generated.

    :::image type="content" source="media/sample-gallery/sample-gallery-tiles.png" alt-text="Screenshot of the Real-Time Intelligence sample gallery showing sample databases available for ingestion." lightbox="media/sample-gallery/sample-gallery-tiles.png":::

> [!NOTE]
> You can also load data from the **Real-Time Intelligence Sample Gallery** as a table in an existing KQL database. Doing so loads the sample semantic model without creating a KQL queryset with sample queries.
>
> To load sample datasets without the sample queries, open an existing KQL database and select **Get data** > **Sample**.

## Run queries

A query is a read-only request to process data and return results. You state the request in plain text, using a data-flow model that's easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators.

For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

1. In the query editor window, place your cursor anywhere on the query text.
1. Select **Run**, or press <kbd>Shift</kbd>+<kbd>Enter</kbd> to run the query.
1. Review the results in the query results pane below the query editor. Notice the green check indicating the query completed successfully, and the time used to compute the query results.

    Before you run any query or command, read the comments above it—they include important information.

    :::image type="content" source="media/sample-gallery/sample-queryset.png" alt-text="Screenshot of a sample KQL queryset showing sample queries for the Storm Events table." lightbox="media/sample-gallery/sample-queryset.png":::

> [!TIP]
> Select **Recall** at the top of the query window to show the result set from the first query without having to rerun the query. Often during analysis, you run multiple queries, and **Recall** allows you to retrieve the results of previous queries.

## Clean up resources

To clean up these items, go to the workspace where you created them.

1. In your workspace, hover over the KQL database or KQL queryset you want to delete, and then select **More** (**...**) > **Delete**.

    :::image type="content" source="media/sample-gallery/clean-up-resources.png" alt-text="Screenshot of Microsoft Fabric workspace showing the resources created from the sample gallery. The more menu option titled delete is highlighted.":::

1. Select **Delete**. You can't recover deleted items.

## Related content

* [Data management](data-management.md)
* [Customize results in the KQL Queryset results grid](customize-results.md)
* [End-to-end sample](sample-end-to-end.md)
