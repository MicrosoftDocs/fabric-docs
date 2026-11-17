---
title: "Tutorial: Analyze mirrored Microsoft Fabric HorizonDB data in a Fabric notebook"
description: Use a Fabric notebook and the SQL analytics endpoint to analyze the mirrored Contoso order data.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Analyze mirrored Microsoft Fabric HorizonDB data in a Fabric notebook

In this tutorial step, you use a Fabric notebook to analyze the mirrored Contoso order data through the SQL analytics endpoint. The notebook doesn't connect to the operational PostgreSQL endpoint.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

Use [Connect from a Jupyter notebook](connect-jupyter-notebook.md) for a separate direct PostgreSQL client example. Keep broad analytical work on the mirrored or OneLake surface.

Only the database creator can connect to the PostgreSQL endpoint in the current preview. This analytical notebook instead uses the SQL analytics endpoint and its separate Fabric permissions.

## Prerequisites

- Complete [Create Power BI visualizations](tutorial-create-visualizations.md).
- Confirm that the mirrored `customers` and `orders` tables are current enough for the tutorial.
- Have permission to create a notebook and read the SQL analytics endpoint.

## Create the notebook

1. In `contoso-horizondb-tutorial`, create a Fabric notebook.
1. Save the notebook as `contoso-orders-analysis`.
1. Select the released T-SQL notebook environment.
1. Add the SQL analytics endpoint associated with `contoso-orders-db` as a notebook data source.
1. Confirm that the notebook explorer shows the mirrored customer and order tables.

For general notebook instructions, see [Use T-SQL notebooks](../../data-engineering/author-tsql-notebook.md).

The mirrored schema name can differ from the PostgreSQL schema name. Use the schema and table names displayed by the SQL analytics endpoint.

## Validate the mirrored data

Add a T-SQL cell, and run:

```sql
SELECT
    COUNT(*) AS order_count,
    SUM(total) AS order_total,
    MAX(created_at) AS latest_source_timestamp
FROM horizon_sample.orders;
```

For the unchanged tutorial data, the query returns an order count of `3` and an order total of `2655.75`.

If the result differs, check mirroring freshness, the schema selected in the notebook, and any source changes made after the earlier tutorial steps.

## Analyze orders by customer segment

Add another T-SQL cell:

```sql
SELECT
    customer.segment,
    COUNT(order_row.order_id) AS order_count,
    COALESCE(SUM(order_row.total), 0) AS order_total
FROM horizon_sample.customers AS customer
LEFT JOIN horizon_sample.orders AS order_row
  ON order_row.customer_id = customer.customer_id
 AND order_row.status <> 'cancelled'
GROUP BY customer.segment
ORDER BY customer.segment;
```

The unchanged tutorial data returns:

| Segment | Order count | Order total |
|---|---:|---:|
| Commercial | 1 | 425.50 |
| Enterprise | 2 | 2230.25 |

Use the notebook result visualization controls to create a column or bar chart:

1. Use `segment` as the category.
1. Use `order_total` as the value.
1. Set the title to `Order total by customer segment`.
1. Save the notebook.

## Validate the analytical path

Confirm that:

- The notebook data source is the SQL analytics endpoint, not the PostgreSQL endpoint.
- The query uses the mirrored customer and order tables.
- The totals match the SQL analytics endpoint and Power BI report for the same freshness point.
- The latest source timestamp is suitable for the tutorial's freshness requirements.

The mirroring process is asynchronous. A successful notebook query doesn't prove that the operational database is ready or that the mirrored copy is transactionally current.

## Expected outcome

The `contoso-orders-analysis` notebook queries the mirrored Contoso data through the SQL analytics endpoint and displays order totals by customer segment.

## Next step

> [!div class="nextstepaction"]
> [Connect a PostgreSQL application](tutorial-connect-application.md)

## Related content

- [Use T-SQL notebooks](../../data-engineering/author-tsql-notebook.md).
- [Query the SQL analytics endpoint](query-sql-analytics-endpoint.md).
- [Connect from a Jupyter notebook](connect-jupyter-notebook.md).
