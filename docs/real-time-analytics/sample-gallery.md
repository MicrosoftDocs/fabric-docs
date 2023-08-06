---
title: Query sample data in Real-Time Analytics
description: Learn how to load sample data into Real-Time Analytics and explore it using a KQL queryset. 
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 08/06/2023
ms.search.form: product-kusto
---

# Query sample data

[!INCLUDE [preview-note](../includes/preview-note.md)]

Real-Time Analytics offers a variety of telemetry and IoT sample data for you to get started with Real-Time Analytics in Microsoft Fabric. Each sample data represents a KQL database that is associated with a KQL queryset with sample queries unique to the selected dataset for you to query and gain insights into your data.

In this article, you learn how to query the sample data gallery in Real-Time Analytics.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Get data

1. On the bottom left experience switcher, select **Real-Time Analytics**.
1. On the **Real-Time Analytics** homepage, Select **Use a sample (Preview)**.
1. From the **Real-Time Analytics Sample Gallery** window, select a tile to load into your workspace. Each tile in the sample gallery represents a database. Once selected, a KQL database and KQL queryset are created.

    :::image type="content" source="media/sample-gallery/sample-gallery.png" alt-text="Screenshot of the Real-Time Analytics sample gallery showing sample databases available for ingestion."  lightbox="media/sample-gallery/sample-gallery.png":::
Once you select a tile, the data is loaded into your workspace, and a KQL queryset with sample queries is automatically generated.

## Run queries

A query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators.

For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

Select the **Run** button, or press **Shift**+**Enter** to run the query.

>[!TIP]
> Select **Recall** at the top of the query window to show the result set from the first query without having to rerun the query. Often during analysis, you run multiple queries, and **Recall** allows you to retrieve the results of previous queries.

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the KQL Database or KQL Queryset you want to delete, select the **More menu** [...] > **Delete**.

1. Select **Delete**. You can't recover deleted items.

## Next steps

* [Data management](data-management.md)
* [Customize results in the KQL Queryset results grid](customize-results.md)