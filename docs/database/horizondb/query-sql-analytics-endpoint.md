---
title: "Query the SQL analytics endpoint for Microsoft Fabric HorizonDB"
description: Query and validate the read-only analytical copy of Fabric HorizonDB data through the SQL analytics endpoint.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Query the SQL analytics endpoint for Microsoft Fabric HorizonDB

Fabric HorizonDB mirrors eligible PostgreSQL tables to OneLake and exposes the mirrored copy through a read-only SQL analytics endpoint. Use this endpoint for analytical queries and reporting without sending those queries to the operational PostgreSQL workload.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- A HorizonDB database with mirroring enabled and initialized.
- At least one eligible source table with a primary key.
- Read access to the SQL analytics endpoint and its mirrored data.
- The source schema and table names as shown in the endpoint.

The SQL analytics endpoint and PostgreSQL endpoint use different connection and query surfaces. This procedure uses the SQL analytics endpoint.

## Prepare source data

Use the shared `horizon_sample` schema so that the source table stays consistent with the other Fabric HorizonDB examples:

1. Complete [Create tables](create-table.md).
1. Complete [Load sample data](load-sample-data.md).
1. On the PostgreSQL endpoint, verify the source rows:

   ```sql
   SELECT
       order_reference,
       order_date,
       status,
       total,
       created_at
   FROM horizon_sample.orders
   ORDER BY order_reference;
   ```

Don't run the PostgreSQL setup scripts against the SQL analytics endpoint.

## Wait for the initial copy

1. Return to the Fabric workspace.
1. Locate the associated mirroring item, and open its status experience.
1. Locate the `horizon_sample.orders` table.
1. Wait until the initial copy completes and the table reports a healthy state.
1. Record the last applied or refresh information that the experience exposes.

The exact status labels can change during public preview. A database ready state doesn't mean that the initial analytical copy has completed.

## Open the SQL analytics endpoint

Open the SQL analytics endpoint associated with the HorizonDB database from the workspace or the database's analytical experience. Confirm that the selected item is the SQL analytics endpoint, not the PostgreSQL query editor.

The mirrored schema or table name can differ from its PostgreSQL name, such as a transformed `_public` schema. Use the names shown by the endpoint explorer.

## Run a validation query

Run a bounded query over the mirrored table:

```sql
SELECT TOP (100)
    order_reference,
    order_date,
    status,
    total,
    created_at
FROM horizon_sample.orders
WHERE order_date >= '2026-01-01'
ORDER BY order_date DESC;
```

If the endpoint represents the schema or table with another released name, update the query accordingly.

Run an aggregate suitable for a report:

```sql
SELECT
    status,
    COUNT(*) AS order_count,
    SUM(total) AS order_total
FROM horizon_sample.orders
GROUP BY status
ORDER BY status;
```

## Compare source and mirrored data

On the PostgreSQL endpoint, connect as the database creator and record a stable high-water mark:

```sql
SELECT
    count(*) AS source_order_count,
    max(order_id) AS source_latest_order_id,
    max(created_at) AS source_latest_created_at
FROM horizon_sample.orders;
```

Run an equivalent count and maximum query against the SQL analytics endpoint. Small differences can be expected while mirroring applies committed changes.

If values don't converge:

1. Check the table's mirroring status and lag information.
1. Confirm that the table, key, columns, and recent DDL are eligible.
1. Check whether an initial copy or reseed is in progress.
1. Avoid continuously changing the source while collecting a stable comparison.
1. Follow [Troubleshoot Fabric HorizonDB mirroring](mirroring-troubleshooting.md).

## Use analytical timestamps

Include a source event or update timestamp in tables used for freshness-sensitive reporting. A report can show the latest source timestamp:

```sql
SELECT
    MAX(created_at) AS latest_source_timestamp
FROM horizon_sample.orders;
```

This value describes the newest mirrored row in the result. It isn't a mirroring service-level guarantee.

## Query safely

- Keep analytical queries on the SQL analytics endpoint.
- Don't use endpoint success as evidence that PostgreSQL is ready or current.
- Don't attempt writes against mirrored tables.
- Expect schema changes to require metadata refresh or reseeding.
- Apply security separately to the mirrored analytical surface.

## Next step

> [!div class="nextstepaction"]
> [Create reports from mirrored Fabric HorizonDB data](create-reports.md)

## Related content

- [What is the SQL analytics endpoint?](sql-analytics-endpoint.md).
- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
- [Mirroring limitations](mirroring-limitations.md).
