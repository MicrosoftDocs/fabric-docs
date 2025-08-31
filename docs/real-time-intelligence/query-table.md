---
title: Use example queries in Real-Time Intelligence
description: Learn how to use example queries to get an initial look at your data in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 08/25/2025
ms.search.form: product-kusto
---
# Use example queries

In this article, you learn how to use example KQL queries to get an initial look at your data.

A query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators.

For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data

## Query with code
There are two ways you can launch the menu to query the KQL table. 

1. Select the table in the left pane. In the following example, **yelllowtaxidata** is selected. 
1. Select **Query with code** on the menu at the top.

    :::image type="content" source="media/query-table/query-table-menu.png" alt-text="Screenshot of Explorer pane showing table and the Query table menu highlighted."  lightbox="media/query-table/query-table-menu.png":::

    The other way is to hover the mouse over the table, select **... (ellipsis)**, and you see the following context menu with the same **Query with code** options. 

    :::image type="content" source="media/query-table/query-table.png" alt-text="Screenshot of Explorer pane showing the More menu of a table. The Query table option is highlighted."  lightbox="media/query-table/query-table.png":::
1. Select the **KQL query** you want to run. To run a sample SQL query, select **SQL**, and select the SQL query you want to run. The query automatically runs and displays results as shown in the following image. 

    :::image type="content" source="media/query-table/run-query.png" alt-text="Screenshot of the Explore your data window showing query results of example queries in Real-Time Intelligence."  lightbox="media/query-table/run-query.png":::

## Example queries

### Show any 100 records

```kusto
// Use 'take' to view a sample number of records in the table and check the data.
yellowtaxidata
| take 100
```
### Records ingested in the last 24 hours

```kusto
// See the most recent data - records ingested in the last 24 hours.
yellowtaxidata
| where ingestion_time() between (now(-1d) .. now())
```

### Get table schema

```kusto
// View a representation of the schema as a table with column names, column type, and data type.
yellowtaxidata
| getschema
```

### Get last ingestion time

```kusto
// Check when the last record in the table was ingested.
yellowtaxidata
| summarize LastIngestionTime = max(ingestion_time())
```

### Show total count of records

```kusto
//See how many records are in the table.
yellowtaxidata
| count
```

### Summarize ingestion per hour

```kusto
// This query returns the number of ingestions per hour in the given table.
yellowtaxidata
| summarize IngestionCount = count() by bin(ingestion_time(), 1h)
```

### SQL: show any 100 records

```sql
-- View a sample of 100 records in the table.
select top 100 * from yellowtaxidata
```

### SQL: show total count of records

```sql
-- See how many records are in the table.
select count_big(*) from yellowtaxidata
```

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
