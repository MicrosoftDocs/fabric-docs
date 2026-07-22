---
title: Join queries
description: Learn how to join queries in Infobridge to combine related data from multiple queries based on matching columns.
ms.date: 07/16/2026
ms.topic: how-to
#customer intent: As a user, I want to join multiple queries so that I can enrich my data with related information from another query.
---

# Join queries in Infobridge

Use joins to combine data from multiple queries based on a related column. Join queries enrich a dataset by bringing related information from another query.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

Infobridge supports the following join types:

- **Inner join**: Returns only records that have matching values in both queries.
- **Left join**: Returns all records from the base (left) query and matching records from the joined (right) query.
- **Right join**: Returns all records from the joined (right) query and matching records from the base (left) query.
- **Full outer join**: Returns all records from both queries, regardless of whether a matching value exists.

## Example scenario

The following example shows regional sales data.

| Region | Sales | Rate Type ID |
|---------|------:|-------------:|
| EMEA | 25K | 101 |
| AUST | 30K | 102 |
| DOMESTIC | 15K | 204 |
| APAC | 28K | 403 |
| HK | 18K | 302 |
| LATAM | 10K | 202 |

A separate lookup table stores the tax rate for each region.

| Rate Type ID | Tax Rate | Rate Type |
|-------------|---------:|-----------:|
| 101 | 20% | Progressive tax rate |
| 102 | 15% | Flat tax rate |
| 204 | 12% | Regressive tax rate |
| 403 | 5.66% | Corporate tax rate |
| 302 | 19% | Value added tax |

An inner join returns only records that have matching values in both queries. Because **LATAM** doesn't have a matching rate type, the result doesn't include it.

| Region | Sales | Rate Type ID | Tax Rate | Rate Type |
|---------|------:|-------------:|---------:|-----------:|
| EMEA | 25K | 101 | 20% | Progressive tax rate |
| AUST | 30K | 102 | 15% | Flat tax rate |
| DOMESTIC | 15K | 204 | 12% | Regressive tax rate |
| APAC | 28K | 403 | 5.66% | Corporate tax rate |
| HK | 18K | 302 | 19% | Value added tax |

A left join returns all records from the base query. Rows without matching values remain in the result, and unmatched columns are blank.

| Region | Sales | Rate Type ID | Tax Rate | Rate Type |
|---------|------:|-------------:|---------:|-----------:|
| EMEA | 25K | 101 | 20% | Progressive tax rate |
| AUST | 30K | 102 | 15% | Flat tax rate |
| DOMESTIC | 15K | 204 | 12% | Regressive tax rate |
| APAC | 28K | 403 | 5.66% | Corporate tax rate |
| HK | 18K | 302 | 19% | Value added tax |
| LATAM | 10K | 202 | — | — |

## Join queries

This example joins the **Sales and COGS** query with the **Monthly interest rate** query by using the **Month** column.

The **Sales and COGS** query contains sales and cost data.

:::image type="content" source="../media/infobridge-transform-queries/how-to-join-query/base-query.png" alt-text="Screenshot of the Sales and COGS query selected in the query list, showing sample data in the query preview and the Query Details pane." lightbox="../media/infobridge-transform-queries/how-to-join-query/base-query.png":::

The **Monthly interest rate** query contains the average monthly interest rates.

:::image type="content" source="../media/infobridge-transform-queries/how-to-join-query/monthly-interest-rate-query.png" alt-text="Screenshot of the Monthly interest rate query selected in the query list, showing sample data in the query preview and the Query Details pane." lightbox="../media/infobridge-transform-queries/how-to-join-query/monthly-interest-rate-query.png":::

To create a join query:

1. On the **Home** ribbon, select **Join Query**.

1. In the **Join Query** dialog:
   - Select **Sales and COGS** as the **Base Query**.
   - Select **Monthly interest rate** as the **Query To Join**.
   - Under **Columns**, select **Month** for both queries.

    :::image type="content" source="../media/infobridge-transform-queries/how-to-join-query/join-query-dialog.png" alt-text="Screenshot of the Join Query dialog with Sales and COGS selected as the base query, Monthly interest rate selected as the query to join, and Month selected as the join column for both queries." lightbox="../media/infobridge-transform-queries/how-to-join-query/join-query-dialog.png":::

1. Select the required **Join Type**:
   - **Inner**
   - **Left Outer**
   - **Right Outer**
   - **Full Outer**

1. Select **Apply**.

    :::image type="content" source="../media/infobridge-transform-queries/how-to-join-query/join-type-selection.png" alt-text="Screenshot of the Join Query dialog with the Join Type list expanded, showing the available join types." lightbox="../media/infobridge-transform-queries/how-to-join-query/join-type-selection.png":::

    Infobridge creates a new query that combines columns from both queries.

    If the joined query contains duplicate join columns, such as **Month** and **Month_1**, remove the duplicate column from the report layout if it isn't required.

    :::image type="content" source="../media/infobridge-transform-queries/how-to-join-query/joined-query.png" alt-text="Screenshot of the joined query showing combined data from the Sales and COGS and Monthly interest rate queries." lightbox="../media/infobridge-transform-queries/how-to-join-query/joined-query.png":::
