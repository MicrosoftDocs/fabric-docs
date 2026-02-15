---
title: Spark SQL Reference for Materialized Lake Views
description: Learn about the Spark SQL syntax for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.date: 02/15/2026
#customer intent: As a data engineer, I want to understand the Spark SQL syntax for creating, listing, updating, and deleting materialized lake views in Microsoft Fabric so that I can manage them effectively.
---

# Spark SQL reference for materialized lake views

This article provides the Spark SQL syntax for creating, listing, renaming, and deleting materialized lake views in Microsoft Fabric. 

> [!TIP]
> To create your first materialized lake view, see [Get started with materialized lake views](./get-started-with-materialized-lake-views.md).

## Create a materialized lake view

You can define a materialized lake view from any table or from another materialized lake view within a lakehouse.

### Syntax

```sql
CREATE [OR REPLACE] MATERIALIZED LAKE VIEW [IF NOT EXISTS][workspace.lakehouse.schema].MLV_Identifier 
[( 
    CONSTRAINT constraint_name1 CHECK (condition expression1)[ON MISMATCH DROP | FAIL],  
    CONSTRAINT constraint_name2 CHECK (condition expression2)[ON MISMATCH DROP | FAIL] 
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

You can't directly update the definition of a materialized lake view. To change the `SELECT` query, constraints, or partitioning, [delete](#delete-a-materialized-lake-view) the existing view and [create](#create-a-materialized-lake-view) a new one.

The only property you can update (via `ALTER`) on an existing materialized lake view is its name. The syntax is:

```sql
ALTER MATERIALIZED LAKE VIEW MLV_Identifier RENAME TO MLV_Identifier_New;
```

For example, to rename `products_with_sales`:

```sql
ALTER MATERIALIZED LAKE VIEW products_with_sales RENAME TO products_with_sales_v2;
```

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

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Refresh materialized lake views in a lakehouse](./refresh-materialized-lake-view.md)
