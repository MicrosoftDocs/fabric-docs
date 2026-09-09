---
title: Spark SQL Reference for Materialized Lake Views
description: Learn about the Spark SQL syntax for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
ms.reviewer: bsankaran, sairamyeturi, nijelsf, hgowrisankar
ms.date: 06/12/2026
#customer intent: As a data engineer, I want to understand the Spark SQL syntax for creating, listing, updating, and deleting materialized lake views in Microsoft Fabric so that I can manage them effectively.
---

# Spark SQL reference for materialized lake views

This article provides the Spark SQL syntax for creating, listing, renaming, and deleting materialized lake views in Fabric.

> [!TIP]
> To create your first materialized lake view, see [Get started with materialized lake views](./get-started-with-materialized-lake-views.md).

## Create a materialized lake view

You can define a materialized lake view from any table or from another materialized lake view within a lakehouse.

### Syntax

```sql
CREATE [OR REPLACE] MATERIALIZED LAKE VIEW [IF NOT EXISTS] [workspace.lakehouse.schema].MLV_Identifier 
[( 
    CONSTRAINT constraint_name1 CHECK (condition expression1) [ON MISMATCH DROP | FAIL],  
    CONSTRAINT constraint_name2 CHECK (condition expression2) [ON MISMATCH DROP | FAIL] 
)] 
[PARTITIONED BY (col1, col2, ... )] 
[COMMENT "description or comment"] 
[TBLPROPERTIES ("key1"="val1", "key2"="val2", ... )] 
AS select_statement 
```

> [!NOTE]
> - If your workspace name contains spaces, enclose it in backticks: `` `My Workspace`.lakehouse.schema.view_name ``
> - Materialized lake view names are case-insensitive and converted to lowercase (for example, `MyTestView` becomes `mytestview`).

### Arguments

| Parameter | Description |
|-|-|
| `OR REPLACE` | Overwrites any existing materialized lake view with the same name. Can't be combined with `IF NOT EXISTS`. |
| `IF NOT EXISTS` | Creates the materialized lake view only if it doesn't already exist. The statement succeeds without error if the view is already defined. Can't be combined with `OR REPLACE`. |
| `MLV_Identifier` | Name of the materialized lake view. Can be fully qualified as `workspace.lakehouse.schema.name`. |
| `CONSTRAINT ... CHECK` | Defines a data quality rule. The `CHECK` clause specifies a Boolean expression that each row must satisfy. You can define multiple constraints. |
| `ON MISMATCH` | Action to take when a row violates a constraint. `DROP` silently removes the row; `FAIL` stops the refresh with an error. Default is `FAIL`. |
| `PARTITIONED BY` | Columns to partition the materialized lake view by, which can improve query performance for filtered reads. |
| `COMMENT` | Free-text description stored with the materialized lake view definition. |
| `TBLPROPERTIES` | Key-value pairs stored as metadata on the materialized lake view. |
| `AS select_statement` | The `SELECT` query that defines the data in the materialized lake view. |

### Examples

The following example creates a materialized lake view with a data quality constraint, a comment, and partitioning. The `OR REPLACE` clause overwrites any existing view with the same name.

```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW silver.cleaned_order_data
(
    CONSTRAINT valid_quantity CHECK (quantity > 0) ON MISMATCH DROP
)
PARTITIONED BY (category)
COMMENT "Cleaned order data joined from products and orders"
AS SELECT 
    p.productID,
    p.productName,
    p.category,
    o.orderDate,
    o.quantity,
    o.totalAmount
FROM bronze.products p INNER JOIN bronze.orders o
ON p.productID = o.productID
```

The following example creates a simpler materialized lake view. The `IF NOT EXISTS` clause prevents an error if the view already exists, making it safe for deployment scripts.

```sql
CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.products_with_sales AS
SELECT 
    p.productID,
    p.productName,
    p.category,
    CASE  
        WHEN COUNT(o.orderID) OVER (PARTITION BY p.productID) > 0 THEN TRUE  
        ELSE FALSE  
        END AS has_sales 
FROM bronze.products p LEFT JOIN bronze.orders o 
ON p.productID = o.productID
```

> [!TIP]
> **Manage materialized lake view refresh from your lakehouse**
>
> After you create your materialized lake views, don't orchestrate their refresh from a notebook. Instead, use the two built-in capabilities on the lakehouse:
>
> * **[Lineage](./view-lineage.md)**: Fabric derives the dependency order between your materialized lake views from their definitions. To open the lineage view, select the **Materialized lake views** tab in the ribbon, then select **Manage**. From there, you can follow a run in progress and inspect upstream and downstream dependencies for each view.
> * **[Scheduled refresh](./schedule-lineage-run.md)**: From the same **Manage** view, create one or more schedules to refresh all materialized lake views or a selected subset. Each schedule runs independently and refreshes views in dependency order, so downstream views always read fresh data from their upstream views. Fabric retries transient failures for you.
>
> Use notebooks to author and iterate on your materialized lake view definitions. Let lineage and scheduled refresh handle ordering, execution, and retries — for reliable, repeatable data with less code to maintain.

## Ingest files with `USING OneLake_Files`

In addition to defining a materialized lake view from tables with `AS select_statement`, you can define one that ingests raw files (CSV or Parquet) directly from OneLake. A *file-ingesting* view uses a `USING OneLake_Files` clause that points to a physical OneLake folder or a OneLake folder shortcut instead of an `AS SELECT` query. This design makes it a natural **bronze** layer for a medallion architecture.

The following table shows which syntax applies to each authoring style:

| Aspect | Table-based materialized lake view | File-based materialized lake view |
|---|---|---|
| **Source** | Tables or other materialized lake views | A physical OneLake folder or OneLake folder shortcut |
| **Definition** | `AS select_statement` | `USING OneLake_Files` + `OPTIONS` |
| **Formats** | Any queryable table | CSV, Parquet |
| **Schema** | Derived from the `SELECT` | `schema_mode` = `DYNAMIC` or `FIXED` |
| **Source lineage** | Upstream tables/views | Source folder, plus a `__filepath__` column per row |
| **Typical layer** | Silver, gold | Bronze |
| **Data quality constraints** | Supported | Apply in a downstream table-based view |

### Syntax

```sql
CREATE [OR REPLACE] MATERIALIZED LAKE VIEW [IF NOT EXISTS] [workspace.lakehouse.schema].MLV_Identifier
USING OneLake_Files
OPTIONS (
    'format' = 'csv' | 'parquet',
    'path'   = 'abfss://<workspace>@<host>/<lakehouse>/Files/<folder>/',
    ['header' = 'true' | 'false',]
    ['delimiter' = '<char>']
)
[TBLPROPERTIES (
    'schema_mode'  = 'DYNAMIC' | 'FIXED',
    'refresh_mode' = 'APPEND_ONLY' | 'FULL' | 'MIRROR'
)]
```

> [!NOTE]
> A file-ingesting materialized lake view has **no `AS SELECT` clause** — the source is the folder named in `OPTIONS`. To transform the ingested data, create a downstream table-based materialized lake view that selects from this view.

### OPTIONS reference

| Option | Applies to | Description |
|---|---|---|
| `format` | CSV, Parquet | Source file format. Supported values are `csv` and `parquet`. |
| `path` | CSV, Parquet | Physical OneLake folder or OneLake folder shortcut (`abfss://…`) that contains the source files. Files available in nested subfolders are ingested recursively when the view is created. |
| `header` | CSV | Whether the first row of each file contains column names. Defaults to `false`. |
| `delimiter` | CSV | Field delimiter character (for example, `,` or `|`). Defaults to a comma. |

> [!NOTE]
> For CSV, only `header` and `delimiter` are currently supported. Additional parsing options (such as `nullValue`, `quote`, and `escape`) aren't yet available.

### TBLPROPERTIES reference

| Property | Values | Description |
|---|---|---|
| `schema_mode` | `DYNAMIC` (default), `FIXED` | `DYNAMIC` adds newly discovered columns and writes `NULL` when a file doesn't contain an established column. `FIXED` pins the schema at creation and rejects subsequent drift. |
| `refresh_mode` | `APPEND_ONLY`, `FULL`, `MIRROR` | `APPEND_ONLY` adds rows from new files without removing rows for deleted files. `FULL` reprocesses the current folder as a complete snapshot. `MIRROR` keeps the materialized result aligned with file additions and deletions in the source folder. |

### Example

The following example ingests a folder of CSV files with a header row into a bronze view. Each row also gets a `__filepath__` column that records the source file it was read from.

```sql
CREATE MATERIALIZED LAKE VIEW bronze.raw_orders
USING OneLake_Files
OPTIONS (
    'format' = 'csv',
    'path'   = 'abfss://SalesWorkspace@onelake.dfs.fabric.microsoft.com/SalesLake.Lakehouse/Files/orders/',
    'header' = 'true'
)
TBLPROPERTIES (
    'schema_mode'  = 'DYNAMIC',
    'refresh_mode' = 'APPEND_ONLY'
);
```

You can then build downstream silver and gold materialized lake views that select from `bronze.raw_orders`; Fabric records the dependency and refreshes them in order. To trace files through the pipeline, see [Manage Fabric materialized lake views lineage](./view-lineage.md#view-lineage-for-file-ingestion).

> [!NOTE]
> When you use `FIXED` schema and the source folder contains multiple files with **different** schemas at the time of the initial `CREATE`, the view fails because it can't reconcile a single fixed schema. Point `FIXED` views at files that share one schema, or use `DYNAMIC`. This is a known restriction, similar to fixed-schema behavior in shortcut transformations.

> [!IMPORTANT]
> Source paths containing a raw space or `%20` aren't currently accepted. You can use a OneLake folder shortcut as the source: creation ingests files available at the shortcut root and in nested folders. Managed refresh discovers new files added at the shortcut root, but doesn't recursively discover new files added under nested shortcut folders.

> [!TIP]
> To reprocess the entire source folder on demand, run `REFRESH MATERIALIZED LAKE VIEW <name> FULL;`. As with table-based views, don't orchestrate ongoing refresh from a notebook — use [Lineage](./view-lineage.md) and [Scheduled refresh](./schedule-lineage-run.md) to pick up new files automatically.

## Get a list of materialized lake views

To get the list of all materialized lake views in a schema, use the following syntax:

```sql
SHOW MATERIALIZED LAKE VIEWS <IN/FROM> Schema_Name;
```

For example, to list all materialized lake views in the `silver` schema:

```sql
SHOW MATERIALIZED LAKE VIEWS IN silver;
```

## Retrieve the statement that created a materialized lake view

To get the `CREATE` statement for a materialized lake view, use the following syntax:

```sql
SHOW CREATE MATERIALIZED LAKE VIEW MLV_Identifier;
```

For example, to retrieve the definition of `products_with_sales`:

```sql
SHOW CREATE MATERIALIZED LAKE VIEW products_with_sales;
```

## Update a materialized lake view

To modify the definition of a materialized lake view (such as the `SELECT` query, constraints, or partitioning), use the [CREATE OR REPLACE](#create-a-materialized-lake-view) command. Alternatively, you can [delete](#delete-a-materialized-lake-view) the existing view and recreate it.

## Rename a materialized lake view

To rename an existing materialized lake view, use the `ALTER MATERIALIZED LAKE VIEW` command. The syntax is:

```sql
ALTER MATERIALIZED LAKE VIEW MLV_Identifier RENAME TO MLV_Identifier_New;
```
For example, to rename `products_with_sales`:

```sql
ALTER MATERIALIZED LAKE VIEW products_with_sales RENAME TO products_with_sales_v2;
```

> [!NOTE]
> The `ALTER MATERIALIZED LAKE VIEW` command is supported only for renaming. To modify the definition or other properties (such as the `SELECT` query, constraints, or partitioning), see [Update a materialized lake view](#update-a-materialized-lake-view).
 
## Delete a materialized lake view

You can delete a materialized lake view by using the **Delete** option in the lakehouse object explorer or by running a `DROP` command. The syntax is:

```sql
DROP MATERIALIZED LAKE VIEW MLV_Identifier;
```

For example, to delete `products_with_sales`:

```sql
DROP MATERIALIZED LAKE VIEW products_with_sales;
```

> [!NOTE]
> Dropping or renaming a materialized lake view affects the lineage view and scheduled refresh. Be sure to update the reference in all dependent materialized lake views.

## Current limitations

The following limitations apply to the Spark SQL statements for materialized lake views:

* **Schema names** — All-uppercase schema names (for example, `MYSCHEMA`) aren't supported. Use mixed case or lowercase.
* **No data manipulation language (DML) statements** — You can't run `INSERT`, `UPDATE`, or `DELETE` statements against a materialized lake view. Data is populated only by the `SELECT` query in the definition.
* **No time-travel queries** — The `SELECT` query in a materialized lake view definition can't use Delta Lake [time travel](/azure/databricks/delta/history#time-travel) syntax (for example, `VERSION AS OF` or `TIMESTAMP AS OF`).
* **No user-defined functions** — User-defined functions (UDFs) aren't supported in the `SELECT` query that defines a materialized lake view.
* **No temporary views as sources** — The `SELECT` query can reference tables and other materialized lake views, but not temporary views.
* **Session-level Spark properties** — Spark configuration properties set at the session level (for example, `spark.conf.set(...)`) aren't applied during a scheduled refresh. Set properties at the lakehouse or workspace level instead.

## Related content

* [What are materialized lake views in Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Optimal refresh for materialized lake views](./refresh-materialized-lake-view.md)
