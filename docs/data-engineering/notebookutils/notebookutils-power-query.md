---
title: NotebookUtils Power Query utilities for Fabric (preview)
description: Run Power Query M queries through existing Fabric connections and load results into DataFrames with NotebookUtils in Fabric notebooks.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 11/19/2026
ai-usage: ai-generated
---

# NotebookUtils Power Query utilities for Fabric (preview)

Use the `notebookutils.powerquery` module to run Power Query M queries from a Fabric
notebook and load the results into DataFrames for further analysis. You can reuse existing
Fabric connections, including gateway-backed connections for supported on-premises data
sources that aren't directly accessible from Fabric compute.

> [!NOTE]
> Power Query in notebooks is in preview. The initial release supports read operations
> from supported data sources.

The following examples in this article use PySpark (Python).

## Get help

Run these commands in your notebook to view the module overview and method help:

```python
notebookutils.powerquery.help()
notebookutils.powerquery.help("executeQuery")
```

## Execute a query

Use `executeQuery` to run a named query:

```python
notebookutils.powerquery.executeQuery(query_name, script, connections=None)
```

The following table describes the Python parameters:

| Parameter | Type | Description |
|---|---|---|
| `query_name` | String or list of strings | The query name or names to execute. Query names must be nonempty and unique. |
| `script` | String | A Power Query M expression or a complete M document. To execute multiple queries, supply a complete document that begins with `section` and defines the named queries. |
| `connections` | String or list of strings, optional | Existing Fabric connection names or IDs. Omit this argument, or pass `None` or an empty list, for a query that doesn't need a connection. |

Pass a single query name as a string to return a PySpark DataFrame. Pass a list of query
names to return a `QueryResults` container, even if the list contains only one name.

### Run a query without a connection

This example creates a table with an M expression, so it doesn't need an external data
source or a Fabric connection:

```python
script = """
let
    Source = #table(
        type table [Product = text, Quantity = Int64.Type],
        {{"Bike", 2}, {"Helmet", 5}}
    )
in
    Source
"""

df = notebookutils.powerquery.executeQuery("Products", script)
display(df)
```

For a single query, you can pass an M expression directly. NotebookUtils wraps the
expression in an M document and assigns it the query name you supply.

### Run a query with a Fabric connection

Use an existing Fabric connection that you have permission to use. For information about
creating and managing connections, see [Data source management](../../data-factory/data-source-management.md).

The following example reads a table through a SQL Server connection. Replace the server,
database, schema, table, and connection values with your own:

```python
script = """
let
    Source = Sql.Database("<server>", "<database>"),
    Products = Source{[Schema = "<schema>", Item = "<table>"]}[Data]
in
    Products
"""

df = notebookutils.powerquery.executeQuery(
    "Products",
    script,
    connections=["<fabric-connection-id>"]
)
display(df)
```

You can use a connection name instead of an ID. If multiple connections have the same
name, use the connection ID to identify the connection unambiguously.

The M script still specifies the data source. Make sure its source details match the
Fabric connection. When the source requires an on-premises gateway, supply the
gateway-backed Fabric connection through the same `connections` parameter.

To use more than one connection, pass a list of connection names or IDs. The full
connection list is available to every query in the M document; connections aren't
assigned to queries by list position.

## Execute multiple queries

To return more than one query, define the queries in a complete M document and pass their
names as a list. This example doesn't require a connection:

```python
script = """
section Section1;
shared Products = #table(
    type table [Product = text, Quantity = Int64.Type],
    {{"Bike", 2}, {"Helmet", 5}}
);
shared SelectedProducts = Table.SelectRows(Products, each [Quantity] > 2);
"""

results = notebookutils.powerquery.executeQuery(
    ["Products", "SelectedProducts"],
    script
)

results.raise_if_failed()
display(results["Products"])
display(results["SelectedProducts"])
```

If the queries access external data sources, pass the connections required by the entire
M document in the `connections` argument.

### Handle query results and failures

`QueryResults` separates successful query results from per-query failures:

| Member | Description |
|---|---|
| `successes` | A dictionary that maps successful query names to PySpark DataFrames. |
| `failures` | A dictionary that maps failed query names to error messages. |
| `results["QueryName"]` | Returns the DataFrame for a successful query. Raises `QueryExecutionError` if the query failed, or `KeyError` if the name isn't in the results. |
| `get("QueryName")` | Returns the DataFrame if the query succeeded, or `None` if it failed or isn't in the results. |
| `is_all_success()` | Returns `True` if no queries failed. |
| `raise_if_failed()` | Raises an exception if any query failed. |

To process successful queries even when another query fails, inspect both dictionaries
instead of calling `raise_if_failed()`:

```python
for query_name, frame in results.successes.items():
    print(query_name)
    display(frame)

for query_name, error in results.failures.items():
    print(f"{query_name}: {error}")
```

A single-query call raises an exception if execution fails. Invalid arguments, invalid
M document structure, or connection resolution failures can also raise an exception
before a multi-query call returns `QueryResults`.

## Limitations and considerations

- The initial release supports reads, not write-back operations to data sources.
- The query evaluation timeout is 230 seconds. For gateway-backed evaluations, the timeout
  is 180 seconds.
- Query names can't exceed 80 characters.
- The complete M document can't exceed 512 KiB (524,288 bytes) when encoded as UTF-8.
  For a raw expression, this limit includes the document wrapper added by NotebookUtils.
- You can supply up to 100 connections for an M document.
- To execute multiple queries, the script must begin with `section`. Define each requested
  query as a `shared` member of that document.
- Gateway-backed access requires a Fabric connection configured for the supported
  on-premises data source.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md).
- [Data source management](../../data-factory/data-source-management.md).
- [Power Query M formula language reference](/powerquery-m/).
