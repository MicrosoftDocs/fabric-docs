---
title: Analyze Data in a KQL Database
description: Learn how to analyze data in a KQL Database with a SQL analytics endpoint or notebook in Microsoft Fabric Real-Time Intelligence
ms.reviewer: tzgitlin
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.date: 02/24/2026
ms.search.form: KQL Database
---
# Analyze data in a KQL Database

Microsoft Fabric provides a unified **Analyze data with** menu that gives you a consistent way to move from data to analysis across Lakehouse, Warehouse, and Eventhouse. Instead of navigating different menus for each workload, you can start your analysis from a single, predictable entry point.

From a KQL database in Eventhouse, the **Analyze data with** action lets you:

- Analyze data using SQL Endpoint, when OneLake availability and sync are enabled.
- Open a new or existing notebook with the database automatically added to the notebook environment.
- Launch analysis actions from a single location, without switching contexts or reconfiguring access.

This integration provides a consistent experience regardless of where your data lives. The same **Analyze data with** menu is available in Lakehouse, Warehouse, and Eventhouse, so the way you analyze data looks and feels the same across all workloads. Whether you're doing exploratory analysis, advanced transformations, or experimentation, you can get started quickly from a familiar starting point.

> [!TIP]
> To use KQL queries to analyze the data, use the KQL queryset embedded in your Eventhouse.
> See [Explore your KQL database with the embedded KQL queryset](create-database.md#explore-your-kql-database-with-the-embedded-kql-queryset).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* A [KQL database](create-database.md) in your eventhouse
* To [Analyze data by using the SQL analytics endpoint](#analyze-data-by-using-the-sql-analytics-endpoint) your Eventhouse must have OneLake availability and sync enabled. For details, see [Eventhouse OneLake Availability](event-house-onelake-availability.md).

## Analyze data by using the SQL analytics endpoint

1. In your Fabric workspace, go to your **KQL database**.

1. Select **Analyze data with** > **SQL analytics endpoint**.

   :::image type="content" source="media/eventhouse/database-analyze-data-sql-endpoint.png" alt-text="Screenshot of the analyze data with button expanded with the SQL analytics endpoint option highlighted.":::

1. The Lakehouse SQL analytics endpoint opens with a new Eventhouse connection.

   You can see Eventhouse in the explorer pane, where the KQL database is listed.

1. [Query the SQL analytics endpoint](../data-warehouse/query-warehouse.md#run-a-new-query-in-sql-query-editor) and analyze the data in your KQL database by using T-SQL.

## Analyze data by using a notebook

1. In your Fabric workspace, go to your **KQL database**.

1. Select **Analyze data with** > **Notebook**.

   :::image type="content" source="media/eventhouse/database-analyze-data-notebook.png" alt-text="Screenshot of the *analyze data with* button expanded with the notebook option highlighted.":::

1. Select **New Notebook** or **Existing Notebook**.

   If you select **New Notebook**, a new notebook opens with the KQL database automatically added to your notebook environment.

   If you select **Existing Notebook**, the OneLake catalog opens with a list of your existing notebooks. Select the notebook you want to use for data analysis.

1. The notebook opens with the KQL database automatically added to your notebook environment.

   You can see the Eventhouse connection in the explorer pane, where the KQL database is listed.

1. Use the notebook to query and analyze the data in your KQL database by using your preferred language (Python, Spark SQL, or Scala).

1. (Optional) Add additional KQL databases or data sources to your notebook environment, such as a Lakehouse or Warehouse, to combine data from multiple sources in your analysis.

## Related content

* [Manage and monitor a database](manage-monitor-database.md)
* [Get data overview](get-data-overview.md)
* [Query data in a KQL queryset](kusto-query-set.md)
* [Query the warehouse or SQL analytics endpoint](../data-warehouse/query-warehouse.md)
* [Use Fabric notebooks with data from a KQL database](notebooks.md)
