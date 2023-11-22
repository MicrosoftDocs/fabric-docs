---
title: Query data in a KQL Database from Microsoft Fabric notebooks using KQL
description: Learn how to query data in a KQL Database from Microsoft Fabric Notebooks using KQL (Kusto Query Language)
ms.reviewer: orhasban
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 11/21/2023
ms.search.form: Notebooks
--- 
# Query data in a KQL Database from Fabric notebooks using KQL

Notebooks are both readable documents containing data analysis descriptions and results as well as executable documents that can be run to perform data analysis. In this article, you learn how to use a Fabric notebook to connect to data in a [KQL Database](create-database.md) and run queries using native [KQL (Kusto Query Language)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric). For more information on notebooks, see [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md).

There are two ways to create a Fabric notebooks that connect to your KQL database:

* [Use snippets in an existing notebook](#use-snippets-in-an-existing-notebook)
* [Create a notebook from a KQL database](#create-a-notebook-from-a-kql-database)

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Use snippets in an existing notebook


:::image type="content" source="media/notebooks/kusto-snippet.gif" alt-text="Screen capture of using a kusto snippet to use KQL in a Fabric notebook.":::

## Create a notebook from a KQL database

:::image type="content" source="media/notebooks/notebook-created.png" alt-text="Screenshot of notebook that is created from a KQL database.":::

## Related content

