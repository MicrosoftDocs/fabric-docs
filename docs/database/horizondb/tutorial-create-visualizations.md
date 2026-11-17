---
title: "Tutorial: Create Power BI visualizations from Microsoft Fabric HorizonDB data"
description: Create a Power BI semantic model and report from mirrored Fabric HorizonDB data in the SQL analytics endpoint.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Create Power BI visualizations from Microsoft Fabric HorizonDB data

In this tutorial step, you create a Power BI semantic model and report from the Fabric HorizonDB mirrored analytical copy.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete [Load Fabric data into Fabric HorizonDB with a Copy job](tutorial-load-fabric-data.md).
- Confirm that the mirrored customer and order tables are visible and current enough for the tutorial.
- Have permission to create a semantic model and report in `contoso-horizondb-tutorial`.

Build the report from the SQL analytics endpoint. Don't connect the report directly to the operational PostgreSQL endpoint for this tutorial.

The current preview permits PostgreSQL connections only from the database creator. Report access is a separate analytical permission boundary and doesn't enable additional PostgreSQL identities.

## Create the semantic model

1. Open the SQL analytics endpoint associated with `contoso-orders-db`.
1. Start the action to create a new Power BI semantic model.
1. Select the mirrored `customers` and `orders` tables from the schema shown by the endpoint.
1. Enter `contoso-orders-model` as the semantic model name.
1. Create the model.
1. Open the model view.
1. Confirm that `customers[customer_id]` relates to `orders[customer_id]`.
1. If the relationship isn't detected, create a one-to-many relationship from `customers[customer_id]` to `orders[customer_id]`.
1. Confirm that the order `total` column uses a decimal numeric type and isn't summarized as text.

When the experience offers Direct Lake for this source, the model queries the OneLake analytical representation rather than the Fabric HorizonDB PostgreSQL endpoint.

## Create measures

In the semantic model, create these measures:

```dax
Order count = COUNTROWS('orders')
```

```dax
Order total = SUM('orders'[total])
```

```dax
Latest source timestamp = MAX('orders'[created_at])
```

The latest source timestamp is the newest source timestamp present in the model. It doesn't prove that mirroring has no lag.

## Create the report

1. From `contoso-orders-model`, create a blank report.
1. Save it as `contoso-order-operations`.
1. Add a card visual with **Order count**.
1. Add a card visual with **Order total**.
1. Add a card visual with **Latest source timestamp**.
1. Add a column or bar chart:
   - Put `orders[status]` on the category axis.
   - Put **Order total** on the value axis.
1. Add a table visual with:
   - Add `orders[order_reference]` as a column.
   - Add `customers[customer_name]` as a column.
   - Add `orders[order_date]` as a column.
   - Add `orders[status]` as a column.
   - Add `orders[total]` as a column.
1. Sort the table by order date, descending.
1. Save the report.

For the unchanged tutorial data, the cards show an order count of `3` and an order total of `2655.75`.

## Validate the report

Compare the report totals with this query on the SQL analytics endpoint:

```sql
SELECT
    COUNT(*) AS order_count,
    SUM(total) AS order_total,
    MAX(created_at) AS latest_source_timestamp
FROM horizon_sample.orders;
```

Use the actual mirrored schema name if it differs.

If the report and endpoint disagree:

1. Refresh model metadata if the source schema changed.
1. Check filters, relationships, column types, and measure definitions.
1. Check mirroring freshness separately.
1. Don't redirect reporting queries to PostgreSQL as a workaround for delayed mirroring.

## Review report security

Fabric HorizonDB permissions aren't automatically reproduced on the mirrored analytical surface.

Before sharing the report:

1. Identify who needs the report and semantic model.
1. Grant only the required report, model, endpoint, and source permissions.
1. Apply and test any required model security.
1. Verify access with a non-owner test identity.

For more information, see [Secure mirrored Fabric HorizonDB data](mirroring-secure.md).

## Expected outcome

The workspace contains `contoso-orders-model` and `contoso-order-operations`. The report shows the order count, order total, latest mirrored source timestamp, totals by status, and individual order details.

## Next step

> [!div class="nextstepaction"]
> [Analyze the data in a notebook](tutorial-perform-data-analysis.md)

## Related content

- [Create reports from Fabric HorizonDB data](create-reports.md).
- [Build reports in Power BI](/power-bi/create-reports/).
- [Power BI semantic models](/power-bi/connect-data/service-datasets-understand).
