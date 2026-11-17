---
title: "Load sample data into Microsoft Fabric HorizonDB"
description: Load a compact, rerunnable PostgreSQL customer-and-order dataset into Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB sample data, PostgreSQL insert
ai-usage: ai-assisted
---
# Load sample data into Microsoft Fabric HorizonDB

This article loads a compact PostgreSQL-native dataset into Fabric HorizonDB. The script is rerunnable and uses stable business keys with `ON CONFLICT`.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A HorizonDB database.
- The tables from [Create tables](create-table.md).
- Sign-in as the database creator. Only this Microsoft Entra identity can connect to PostgreSQL in the current preview.

## Insert customers

Open a new PostgreSQL query and run:

```sql
INSERT INTO horizon_sample.customers (customer_name, segment)
VALUES
    ('Contoso Retail', 'Enterprise'),
    ('Fabrikam Stores', 'Commercial'),
    ('Adventure Works', 'Enterprise')
ON CONFLICT (customer_name) DO UPDATE
SET segment = EXCLUDED.segment;
```

The unique customer name acts as a stable sample business key.

Use synthetic data in a dedicated test workspace. Record the generated customer IDs before creating warehouse signals; identity values aren't guaranteed to start at `1` or remain consecutive after reruns.

## Insert orders

```sql
INSERT INTO horizon_sample.orders (
    order_reference,
    customer_id,
    order_date,
    status,
    total
)
SELECT
    source.order_reference,
    customer.customer_id,
    source.order_date,
    source.status,
    source.total
FROM (
    VALUES
        ('ORD-1001', 'Contoso Retail', current_date, 'open', 1250.00::numeric),
        ('ORD-1002', 'Fabrikam Stores', current_date - 1, 'processing', 425.50::numeric),
        ('ORD-1003', 'Adventure Works', current_date - 2, 'completed', 980.25::numeric)
) AS source (
    order_reference,
    customer_name,
    order_date,
    status,
    total
)
JOIN horizon_sample.customers AS customer
  ON customer.customer_name = source.customer_name
ON CONFLICT (order_reference) DO UPDATE
SET
    customer_id = EXCLUDED.customer_id,
    order_date = EXCLUDED.order_date,
    status = EXCLUDED.status,
    total = EXCLUDED.total;
```

The join resolves generated customer IDs from stable customer names. Rerunning the script updates the existing orders instead of adding duplicates.

## Validate the load

```sql
SELECT
    order_row.order_reference,
    customer.customer_name,
    customer.segment,
    order_row.order_date,
    order_row.status,
    order_row.total
FROM horizon_sample.orders AS order_row
JOIN horizon_sample.customers AS customer
  ON customer.customer_id = order_row.customer_id
ORDER BY order_row.order_reference;
```

Expected results contain three orders, one for each customer.

Validate counts:

```sql
SELECT
    (SELECT count(*) FROM horizon_sample.customers) AS customer_count,
    (SELECT count(*) FROM horizon_sample.orders) AS order_count;
```

Rerun the load and confirm the counts remain three and three.

## Use a transaction for application loads

For related changes, wrap the complete load in a transaction:

```sql
BEGIN;

-- Run the customer and order upsert statements.

COMMIT;
```

Use `ROLLBACK;` when validation fails. For larger imports, load a staging table, validate types and business keys, and then publish with one idempotent transaction. Don't replay a transaction after an indeterminate commit without reconciling the business keys.

## Clean up

 To remove all rows from the sample tables while retaining the tables, run the following command. This also deletes any nonsample rows you added; don't run it if you need to keep them:
 
```sql
TRUNCATE TABLE
    horizon_sample.orders,
    horizon_sample.customers
RESTART IDENTITY;
```

Review the table names before running the command.

## Next step

[Query the sample data](query.md).

## Related content

- [Connect with Python](connect-python.md).
- [Connect from a Jupyter notebook](connect-jupyter-notebook.md).
- [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html).
