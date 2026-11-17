---
title: "Tutorial: Create tables and load data in Microsoft Fabric HorizonDB"
description: Create a reusable PostgreSQL schema and load customer and order data into the Fabric HorizonDB tutorial database.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Create tables and load data in Microsoft Fabric HorizonDB

In this tutorial step, you use the Fabric HorizonDB SQL editor to create the `horizon_sample` schema and load a small Contoso order dataset with PostgreSQL SQL.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Create a HorizonDB database](tutorial-create-database.md).
- Open the `contoso-orders-db` item.
- Sign in as the database creator, the only identity that can connect to PostgreSQL in the current preview.

## Open the SQL editor

1. Open the operational database query experience for `contoso-orders-db`.
1. Create a new SQL query.
1. Confirm that the query targets the PostgreSQL endpoint, not the SQL analytics endpoint.
1. Run:

   ```sql
   SELECT
       current_database() AS database_name,
       current_user AS signed_in_user,
       clock_timestamp() AS connected_at;
   ```

1. Confirm that the result identifies database `postgres`, as shown in the item's connection details, and the creator's effective identity.

## Create the schema and tables

Run the following script:

```sql
CREATE SCHEMA IF NOT EXISTS horizon_sample;

CREATE TABLE IF NOT EXISTS horizon_sample.customers (
    customer_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name text NOT NULL UNIQUE,
    segment text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS horizon_sample.orders (
    order_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_reference text NOT NULL UNIQUE,
    customer_id bigint NOT NULL
        REFERENCES horizon_sample.customers (customer_id),
    order_date date NOT NULL DEFAULT current_date,
    status text NOT NULL
        CHECK (status IN ('open', 'processing', 'completed', 'cancelled')),
    total numeric(12, 2) NOT NULL
        CHECK (total >= 0),
    created_at timestamptz NOT NULL DEFAULT now()
);
```

The tables use PostgreSQL identity columns, constraints, and timestamp types. Primary keys also support the mirroring eligibility checks you perform later.

## Load the sample rows

Run this rerunnable load:

```sql
INSERT INTO horizon_sample.customers (customer_name, segment)
VALUES
    ('Contoso Retail', 'Enterprise'),
    ('Fabrikam Stores', 'Commercial'),
    ('Adventure Works', 'Enterprise')
ON CONFLICT (customer_name) DO UPDATE
SET segment = EXCLUDED.segment;

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

`ON CONFLICT` makes the load idempotent for the stable customer names and order references. Rerunning it updates the sample rows instead of creating duplicates.

## Validate the data

Run:

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

The result contains three rows:

| Order | Customer | Segment | Status | Total |
|---|---|---|---|---:|
| `ORD-1001` | Contoso Retail | Enterprise | open | 1250.00 |
| `ORD-1002` | Fabrikam Stores | Commercial | processing | 425.50 |
| `ORD-1003` | Adventure Works | Enterprise | completed | 980.25 |

Validate the aggregate:

```sql
SELECT
    count(*) AS order_count,
    sum(total) AS order_total,
    min(order_date) AS earliest_order_date,
    max(order_date) AS latest_order_date
FROM horizon_sample.orders;
```

The expected `order_count` is `3`, and the expected `order_total` is `2655.75`.

## Refresh the object explorer

1. Refresh the database object explorer.
1. Expand the schema collection.
1. Expand `horizon_sample`.
1. Expand the table collection.
1. Select `customers`, and inspect its columns and primary key.
1. Select `orders`, and inspect its columns, primary key, foreign key, unique constraint, and check constraints.

If the explorer doesn't refresh, verify the tables through PostgreSQL metadata:

```sql
SELECT
    table_schema,
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'horizon_sample'
ORDER BY table_name;
```

Later in the tutorial, you use a Copy job to load a separate bounded customer-signals result from an eligible Fabric source. Keep the operational customer and order rows in this step unchanged so that you can compare the PostgreSQL and mirrored analytical results.

## Troubleshoot the load

| Symptom | Resolution |
|---|---|
| `permission denied for schema` | Confirm that you're connected as the database creator and that you're creating objects in a customer-owned schema. |
| `relation does not exist` | Run the create script, verify the current database, and qualify the table with `horizon_sample`. |
| A unique constraint fails | Review existing customer names and order references before changing the conflict rule. |
| A foreign key fails | Load customers before orders and verify the customer join. |
| The object explorer is stale | Commit the DDL if needed, refresh the explorer, and verify with `information_schema`. |

## Next step

> [!div class="nextstepaction"]
> [Query and inspect the database](tutorial-query-database.md)

## Related content

- [Create a table](create-table.md).
- [Load sample data](load-sample-data.md).
- [Use the SQL editor](query-editor.md).
