---
title: "Create tables in Microsoft Fabric HorizonDB"
description: Create a PostgreSQL schema, related tables, constraints, and indexes in Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB create table, PostgreSQL table
ai-usage: ai-assisted
---
# Create tables in Microsoft Fabric HorizonDB

This article creates a reusable PostgreSQL sample schema in Fabric HorizonDB. The tables use identity columns, primary and foreign keys, check constraints, timestamps with time zones, and an index.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A [HorizonDB database](create.md).
- Access to the SQL editor or another PostgreSQL client.
- Sign-in as the database creator. Other users and principals can't connect to PostgreSQL in the current preview.

## Create the sample schema

Open a new query and run:

```sql
CREATE SCHEMA IF NOT EXISTS horizon_sample;
```

Using a dedicated schema keeps the sample separate from service-managed and application schemas.

## Create the customer table

```sql
CREATE TABLE IF NOT EXISTS horizon_sample.customers (
    customer_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name text NOT NULL UNIQUE,
    segment text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
```

This table uses a PostgreSQL identity column for its surrogate primary key. The unique constraint prevents duplicate customer names in this sample.

## Create the order table

```sql
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

The foreign key prevents an order from referencing a missing customer. The check constraints protect the status vocabulary and prevent negative totals.

## Add an index

The primary and unique constraints already create indexes. Add an index for a common customer-and-date access pattern:

```sql
CREATE INDEX IF NOT EXISTS ix_orders_customer_date
ON horizon_sample.orders (customer_id, order_date DESC);
```

Don't add indexes without a workload reason. Every index consumes storage and adds work to inserts, updates, vacuum, and mirroring.

## Verify the objects

Inspect columns:

```sql
SELECT
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'horizon_sample'
  AND table_name IN ('customers', 'orders')
ORDER BY table_name, ordinal_position;
```

Inspect constraints:

```sql
SELECT
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'horizon_sample'
ORDER BY table_name, constraint_type, constraint_name;
```

Expected results include primary keys on both tables, a foreign key from `orders` to `customers`, unique constraints, and check constraints.

Refresh the object explorer, expand **Schemas**, expand `horizon_sample`, and expand **Tables**. Select `customers` or `orders` to inspect columns and keys.

## Understand ownership and access

The identity that creates an object normally owns it. Ownership allows powerful changes, including dropping the object.

Only the Microsoft Entra identity that created the database can connect during the current preview. Sharing the Fabric item doesn't enable additional PostgreSQL users. Don't create login roles to work around the restriction.

For more information, see [Validate PostgreSQL access](configure-postgresql-access-controls.md).

## Clean up

Review the schema name before running:

```sql
DROP SCHEMA IF EXISTS horizon_sample CASCADE;
```

`CASCADE` drops every object in the schema. Don't use it on a service-managed or application schema.

## Next step

[Load sample data](load-sample-data.md).

## Related content

- [Query with the SQL editor](query-editor.md).
- [PostgreSQL CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html).
- [Fabric HorizonDB limitations](limitations.md).
