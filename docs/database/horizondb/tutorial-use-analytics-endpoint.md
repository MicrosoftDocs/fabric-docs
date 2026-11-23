---
title: "Tutorial: Use the SQL analytics endpoint for Microsoft Fabric HorizonDB"
description: Validate Fabric HorizonDB mirroring and query the read-only SQL analytics endpoint over the tutorial order data.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Use the SQL analytics endpoint for Microsoft Fabric HorizonDB

In this tutorial step, you validate Fabric HorizonDB mirroring and query the asynchronous analytical copy through the SQL analytics endpoint.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Query and inspect Fabric HorizonDB](tutorial-query-database.md).
- Confirm that `horizon_sample.customers` and `horizon_sample.orders` have primary keys and contain the tutorial rows.
- Have read access to the SQL analytics endpoint and mirrored data.

The SQL analytics endpoint and PostgreSQL endpoint are separate. This step uses the PostgreSQL endpoint only to establish a source high-water mark. Run analytical queries against the SQL analytics endpoint.

## Record the PostgreSQL source state

In the Fabric HorizonDB SQL editor, connect as the database creator and run:

```sql
SELECT
    count(*) AS source_order_count,
    max(order_id) AS source_latest_order_id,
    max(created_at) AS source_latest_created_at,
    sum(total) AS source_order_total
FROM horizon_sample.orders;
```

Record the result. For the unchanged tutorial data:

- `source_order_count` is `3`.
- `source_order_total` is `2655.75`.
- The latest ID and timestamp identify the current source high-water mark.

## Review mirroring

1. Return to the workspace, locate the mirroring item associated with `contoso-orders-db`, and open its status experience.
1. Locate `horizon_sample.customers` and `horizon_sample.orders`.
1. Wait for the initial copy of both eligible tables to finish.
1. Confirm that neither table reports a failed, blocked, or reseeding state.
1. Record the last-applied, refresh, or lag information shown by the released experience.

The exact state labels can change during public preview. Database readiness doesn't mean the analytical copy is current.

If a table doesn't appear, confirm its key, columns, and recent DDL against [Mirroring limitations](mirroring-limitations.md).

## Open the SQL analytics endpoint

1. Return to the workspace or database analytical experience.
1. Open the SQL analytics endpoint associated with `contoso-orders-db`.
1. Confirm that the endpoint explorer shows the mirrored customer and order tables.
1. Use the schema and table names displayed by the endpoint.
1. Open a new query against the SQL analytics endpoint.

The mirrored schema name can differ from the PostgreSQL schema name, such as a transformed `_public` schema. Update the following examples to use the name displayed by your endpoint.

## Query mirrored orders

Run:

```sql
SELECT
    order_reference,
    order_date,
    status,
    total,
    created_at
FROM horizon_sample.orders
ORDER BY order_date DESC, order_reference;
```

The result should contain the three tutorial orders after mirroring catches up.

Run an analytical aggregate:

```sql
SELECT
    status,
    COUNT(*) AS order_count,
    SUM(total) AS order_total
FROM horizon_sample.orders
GROUP BY status
ORDER BY status;
```

The unchanged tutorial data produces one row for `completed`, `open`, and `processing`.

## Compare source and mirrored state

On the SQL analytics endpoint, run:

```sql
SELECT
    COUNT(*) AS mirrored_order_count,
    MAX(order_id) AS mirrored_latest_order_id,
    MAX(created_at) AS mirrored_latest_created_at,
    SUM(total) AS mirrored_order_total
FROM horizon_sample.orders;
```

Compare these values with the source values you recorded.

Small differences can be expected while committed changes are being applied. If the values don't converge:

1. Stop changing the source tables while you collect a stable comparison.
1. Check the table's mirroring status and lag information.
1. Confirm that an initial copy or reseed isn't in progress.
1. Verify table, key, column, type, and DDL eligibility.
1. Follow [Troubleshoot Fabric HorizonDB mirroring](mirroring-troubleshooting.md).

Don't describe the endpoint as transactionally current or synchronous. Include source timestamps in freshness-sensitive reports.

## Verify read-only behavior

Use the SQL analytics endpoint for queries, semantic models, and reports. Don't attempt to insert, update, or delete mirrored Fabric HorizonDB rows through it.

Operational writes continue to use the PostgreSQL endpoint. Permissions on the PostgreSQL source and analytical copy are also separate.

## Expected outcome

The SQL analytics endpoint shows the mirrored tutorial tables, returns three orders with a total of `2655.75`, and reaches the same stable high-water mark as the PostgreSQL source after mirroring catches up.

## Next step

> [!div class="nextstepaction"]
> [Query mirrored Fabric data from Fabric HorizonDB](tutorial-query-fabric-data.md)

## Related content

- [SQL analytics endpoint for Fabric HorizonDB](sql-analytics-endpoint.md).
- [Query the SQL analytics endpoint](query-sql-analytics-endpoint.md).
- [Monitor Fabric HorizonDB mirroring](mirroring-monitor.md).
