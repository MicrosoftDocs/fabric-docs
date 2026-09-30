---
title: Enable optimal refresh for deletes and updates in materialized lake views (preview)
description: Learn how to enable optimal refresh for materialized lake views when source data contains deletes or updates.
ms.topic: concept-article
ms.reviewer: abhishjain
ms.date: 09/29/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want materialized lake views to process source deletes and updates incrementally so that I avoid costly full refreshes.
---

# Enable optimal refresh for deletes and updates in materialized lake views (preview)

Materialized lake views now support optimal refresh for non-append data, including deletes and updates. This enhancement helps the engine reconcile changed and removed rows incrementally instead of falling back to a full refresh.

Fabric introduces the concept of a *refresh hint* that you use to declare the unique column or columns for a materialized lake view. This feature enables more efficient delta handling and improves refresh performance at scale. This capability is especially useful for large, frequently changing datasets where full refreshes would be costly and time-consuming.

## Prerequisites

- **Change Data Feed (CDF) is enabled** on every source Delta table. CDF is how the engine detects which rows were inserted, updated, or deleted since the last refresh. Enable it with the table property.

  ```sql
  ALTER TABLE <source_table> SET TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true');
  ```

## Define a refresh hint

Add a `REFRESH_HINT` clause when you create a materialized lake view.

```sql
CREATE [OR REPLACE] MATERIALIZED LAKE VIEW <view_name>
[( 
    CONSTRAINT constraint_name1 CHECK (condition expression1) [ON MISMATCH DROP | FAIL],  
    CONSTRAINT constraint_name2 CHECK (condition expression2) [ON MISMATCH DROP | FAIL] 
)] 
(
    REFRESH_HINT <hint_name> UNIQUE (<column1> [, <column2>, ...])
)
[PARTITIONED BY (<partition_column>)]
[TBLPROPERTIES (<key> = '<value>', ...)]
AS
<SELECT_statement>;
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `hint_name` | A user-defined label that identifies the hint. Use a descriptive name such as `order_key`. |
| `UNIQUE` | Declares that the specified columns uniquely identify each row in the view's output. |
| `column1, column2, ...` | One or more column names from the view's output schema that together form a unique key. |

> [!NOTE]
> Fabric doesn't validate uniqueness at runtime. The engine trusts the columns that you declare as unique.

> [!TIP]
> A refresh hint improves incremental refresh behavior. Partitioning the view makes the incremental work even more efficient.
> Use `PARTITIONED BY` to limit refresh processing to only the partitions that changed. If an update affects a single date or region, the engine can process only that partition instead of scanning the entire view.

## Examples

### Single unique column

Use a single column when one column uniquely identifies each row in the output.

```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW gold.customer_360
(
    REFRESH_HINT pk UNIQUE (customer_id)
)
PARTITIONED BY (region)
AS
SELECT
    c.customer_id,
    c.name,
    c.email,
    c.region,
    o.last_order_date,
    o.total_orders
FROM silver.customers c
INNER JOIN silver.order_summary o
    ON c.customer_id = o.customer_id;
```

When `silver.customers` receives updates, such as when a customer changes their email, or deletes a customer row, the engine uses `customer_id` to find the matching row in the view, update it, or remove it without reprocessing the entire dataset.

### Composite unique key

Use multiple columns when no single column is unique, but a combination of columns is.

```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW gold.order_items
(
    REFRESH_HINT composite_key UNIQUE (order_id, item_id)
)
PARTITIONED BY (order_date)
AS
SELECT
    order_id,
    item_id,
    order_date,
    quantity,
    unit_price,
    quantity * unit_price AS line_total
FROM silver.order_line_items;
```

Here, neither `order_id` nor `item_id` is unique on its own, but together they uniquely identify each line item.

## Verify uniqueness of the refresh hint

Before you add a refresh hint, confirm that the candidate key is unique. The following steps describe one way to validate uniqueness by using the existing data in your materialized lake view.

### Step 1: Choose candidate key columns

Pick the column or combination of columns that you intend to declare as unique.

### Step 2: Check for duplicates

```sql
SELECT <unique_cols>, COUNT(*) AS row_count
FROM <view_name>
GROUP BY <unique_cols>
HAVING COUNT(*) > 1;
```

If this query returns any rows, the candidate key isn't unique.

### Step 3: Check for NULL values

`NULL` values don't compare equal to each other, so missing keys can hide duplicate problems.

```sql
SELECT COUNT(*) AS null_keys
FROM <view_name>
WHERE <unique_col> IS NULL;
```

If the query returns any rows, fix the key before creating the hint.

### Step 4: Recheck after each view change

A new join, a removed filter, or a changed aggregate can change row cardinality and introduce duplicates. Re-run these checks whenever the view definition or upstream source changes.

## Limitations

Keep the following limitations in mind when you use `REFRESH_HINT`:

- **Schema changes between refreshes.** If the source table schema changes (columns are added, removed, or renamed) between two refresh cycles, the engine falls back to a full refresh.
- **The specified columns aren't truly unique.** Fabric doesn't check whether the columns that you declare are actually unique. If duplicates exist in the view's output for the declared columns, the refresh might result in data inconsistencies without any error or warning.

## Related content

* [Create a materialized lake view](./create-materialized-lake-view.md)
* [Optimal refresh for materialized lake views](./refresh-materialized-lake-view.md)
