---
title: "Author and run T-SQL notebooks in Microsoft Fabric"
description: Learn how to author and run T-SQL code in a notebook within the data engineering workload. Also learn how to run cross warehouse queries.
author: qixwang
ms.author: qixwang
ms.reviewer: sngun
ms.topic: how-to
ms.date: 06/03/2025
ms.custom: FY25Q1-Linter, sfi-image-nochange
# Customer Intent: As a data engineer, I want to run T-SQL code Fabric notebooks, manage queries, and perform cross datawarehouse queries.
---

# T-SQL support in Microsoft Fabric notebooks

The T-SQL notebook feature in Microsoft Fabric lets you write and run T-SQL code within a notebook. You can use T-SQL notebooks to manage complex queries and write better markdown documentation. It also allows direct execution of T-SQL on connected warehouse or SQL analytics endpoint. By adding a Data Warehouse or SQL analytics endpoint to a notebook, T-SQL developers can run queries directly on the connected endpoint. BI analysts can also perform cross-database queries to gather insights from multiple warehouses and SQL analytics endpoints.

Most of the existing notebook functionalities are available for T-SQL notebooks. These include charting query results, coauthoring notebooks, scheduling regular executions, and triggering execution within Data Integration pipelines.

In this article, you learn how to:

- Create a T-SQL notebook
- Add a Data Warehouse or SQL analytics endpoint to a notebook
- Create and run T-SQL code in a notebook
- Use the charting features to graphically represent query outcomes
- Save the query as a view or a table
- Run cross warehouse queries
- Skip the execution of non-T-SQL code

## Create a T-SQL notebook

To get started with this experience, you can create a T-SQL notebook in the following ways:

1. Create a T-SQL notebook from the Fabric workspace: select **New item**, then choose **Notebook** from the panel that opens.

   :::image type="content" source="media\tsql-notebook\create-tsql-notebook-homepage.png" alt-text="Screenshot of creating a new notebook from within a workspace.":::

2. Create a T-SQL notebook from an existing warehouse editor: navigate to an existing warehouse and, from the top navigation ribbon, select **New SQL query**, then **New T-SQL query notebook**.

   :::image type="content" source="media\tsql-notebook\create-tsql-notebook-from-editor.png" alt-text="Screenshot of open notebook from DW SQL editor.":::

Once the notebook is created, T-SQL is set as the default language. You can add data warehouse or SQL analytics endpoints from the current workspace into your notebook.

## Add a Data Warehouse or SQL analytics endpoint into a notebook

To add a Data Warehouse or SQL analytics endpoint into a notebook, from the notebook editor, select **+ Data sources** button and select **Warehouses**. From the **data-hub** panel, select the data warehouse or SQL analytics endpoint you want to connect to.

:::image type="content" source="media\tsql-notebook\add-warehouse.png" alt-text="Screenshot of adding data warehouse or sql-endpoint into the notebook." lightbox="media\tsql-notebook\add-warehouse.png":::

### Set a primary warehouse

You can add multiple warehouses or SQL analytics endpoints into the notebook, with one of them is set as the primary. The primary warehouse runs the T-SQL code. To set it, go to the object explorer, select **...** next to the warehouse, and choose **Set as primary**.

:::image type="content" source="media\tsql-notebook\set-primary-warehouse.png" alt-text="Screenshot of setting primary warehouse.":::

For any T-SQL command which supports three-part naming, primary warehouse is used as the default warehouse if no warehouse is specified.

### Create and run T-SQL code in a notebook

To create and run T-SQL code in a notebook, add a new cell and set **T-SQL** as the cell language.

:::image type="content" source="media\tsql-notebook\tsql-code-cell.png" alt-text="Screenshot showing how to create a t-sql code cell.":::

You can autogenerate T-SQL code using the code template from the object explorer's context menu. The following templates are available for T-SQL notebooks:

- Select top 100
- Create table
- Create as select
- Drop
- Drop and create

:::image type="content" source="media\tsql-notebook\tsql-code-template.png" alt-text="Screenshot of showing the t-sql code template.":::

You can run one T-SQL code cell by selecting the **Run** button in the cell toolbar or run all cells by selecting the **Run all** button in the toolbar.

> [!NOTE]
> Each code cell is executed in a separate session, so the variables defined in one cell are not available in another cell.

Within the same code cell, it might contain multiple lines of code. User can select part of these code and only run the selected ones. Each execution also generates a new session.

:::image type="content" source="media\tsql-notebook\tsql-run-selected-code.png" alt-text="Screenshot showing how to run selected code cell.":::

After the code is executed, expand the message panel to check the execution summary.

:::image type="content" source="media\tsql-notebook\tsql-execution-summary.png" alt-text="Screenshot showing the execution summary.":::

The **Table** tab list the records from the returned result set. If the execution contains multiple result set, you can switch from one to another via the dropdown menu.

:::image type="content" source="media\tsql-notebook\tsql-switch-result.png" alt-text="Screenshot showing how to switch in the result tab.":::

### Use the charting features to graphically represent query outcomes

By clicking on the **Inspect**, you can see the charts which represent the data quality and distribution of each column

:::image type="content" source="media\tsql-notebook\tsql-inspect-result.png" alt-text="Screenshot showing inspect the result in a chart form.":::

### Save the query as a view or table

You can use **Save as table** menu to save the results of the query into the table using [CTAS](/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-develop-ctas) command. To use this menu, select the query text from the code cell and select **Save as table** menu.

:::image type="content" source="media\tsql-notebook\tsql-save-as-table.png" alt-text="Screenshot showing how to save the query as  a table.":::

:::image type="content" source="media\tsql-notebook\tsql-save-as-table-dialog.png" alt-text="Screenshot on how to save a table as dialog.":::

Similarly, you can create a view from your selected query text using **Save as view** menu in the cell command bar.

:::image type="content" source="media\tsql-notebook\tsql-save-as-view.png" alt-text="Screenshot showing how to create a view.":::

:::image type="content" source="media\tsql-notebook\tsql-save-as-view-dialog.png" alt-text="Screenshot showing save as a view dialog.":::

> [!NOTE]
> * Because the **Save as table** and **Save as view** menu are only available for the selected query text, you need to select the query text before using these menus.
>
> * Create View does not support three-part naming, so the view is always created in the primary warehouse by setting the warehouse as the primary warehouse.

### Cross warehouse query

You can run cross warehouse query by using three-part naming.  The three-part naming consists of the database name, schema name, and table name. The database name is the name of the warehouse or SQL analytics endpoint, the schema name is the name of the schema, and the table name is the name of the table.

:::image type="content" source="media\tsql-notebook\tsql-cross-warehouse-query.png" alt-text="Screenshot showing how to run a cross warehouse query.":::

### Skip the execution of non-T-SQL code

Within the same notebook, it's possible to create code cells that use different languages. For instance, a PySpark code cell can precede a T-SQL code cell. In such case, user can choose to skip the run of any PySpark code for T-SQL notebook.
This dialog appears when you run all the code cells by clicking the **Run all** button in the toolbar.

:::image type="content" source="media\tsql-notebook\skip-non-tsql-code.png" alt-text="Screenshot showing how to skip non-TSQL code.":::

### Monitoring T-SQL notebook execution

You can monitor the execution of T-SQL notebooks in the **T-SQL** tab of the Recent Run view. You can find the Recent Run view by selecting the **Run** menu inside the notebook.

:::image type="content" source="media\tsql-notebook\recent-run-view.png" alt-text="Screenshot showing the recent run view.":::

In the T-SQL history run view, you can see a list of running, succeeded, canceled, and failed queries up to the past 30 days.

- Use the dropdown list to filter for status or submit time.
- Use the search bar to filter for specific keywords in the query text or other columns.

For each query, the following details are provided:

| Column name   |  Description |
|---|---|
|**Distributed statement Id**|Unique ID for each query|
|**Query text**|Text of the executed query (up to 8,000 characters)|
|**Submit time (UTC)**|Timestamp when the request arrived|
|**Duration**|Time it took for the query to execute|
|**Status**|Query status (Running, Succeeded, Failed, or Canceled)|
|**Submitter**|Name of the user or system that sent the query|
|**Session Id**|ID linking the query to a specific user session|
|**Default warehouse**|Name of the warehouse which accept the submitted query|

Historical queries can take up to 15 minutes to appear in list depending on the concurrent workload being executed.

## Current limitations

- Parameter cell isn't yet supported in T-SQL notebook. The parameter passed from pipeline or scheduler won't be able to be used in T-SQL notebook.
- The monitor URL inside the pipeline execution isn't yet supported in the T-SQL notebook.
- The snapshot feature isn't yet supported in the T-SQL notebook.


## Related content

For more information about Fabric notebooks, see the following articles.

- [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)
- Questions? Try asking the [Fabric Community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
