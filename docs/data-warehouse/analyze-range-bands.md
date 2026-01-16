---
title: "Analyze Data with Range Bands"
description: "Learn how to analyze data with range bands in Microsoft Fabric Data Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 04/06/2025
ms.topic: how-to
ms.custom:
  - fabric-cat
---

# Analyze data with range bands

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes a query technique to summarize [fact table](dimensional-modeling-fact-tables.md) data by using ranges of fact or [dimension table](dimensional-modeling-dimension-tables.md) attributes. For example, you might need to determine sales quantities by sale price. However, instead of grouping by each sale price, you want to group by range bands of price, like:

- $0.00 to $999.99
- $1,000.00 to $4,999.99
- and others...

> [!TIP]
> If you're inexperienced with dimensional modeling, consider reading the series of articles on [dimensional modeling](dimensional-modeling-overview.md) as your first step to populating a data warehouse with fact and dimension tables.

## Step 1: Create a table to store range bands

First, you should create a table that stores one or more series of range bands.

```sql
CREATE TABLE [d_RangeBand]
(
    [Series] VARCHAR(20) NOT NULL,
    [RangeLabel] VARCHAR(50) NOT NULL,
    [LowerBound] INT NOT NULL,
    [UpperBound] INT NOT NULL
);
```

> [!NOTE]
> Technically, this table isn't a [dimension table](dimensional-modeling-dimension-tables.md). It's a helper table that organizes fact or dimension data for analysis.

You should verify no duplicates are inserted in this table, based on the `Series` and `RangeLabel` columns, in order to avoid duplicate ranges within a series. You should also verify that the lower and upper boundary values don't overlap and that there aren't any gaps. You can create a composite [primary key or unique constraint](table-constraints.md) based on the `Series` and `RangeLabel` columns but only with the `NOT ENFORCED` keyword. Primary key, unique key, and foreign key constraints require [NOT ENFORCED](/sql/t-sql/statements/alter-table-column-constraint-transact-sql?view=fabric&preserve-view=true#not-enforced) in Fabric Data Warehouse. Integrity of the constraints must be maintained by processes that insert/modify rows.

> [!TIP]
> You can add a `RangeLabelSort` column with an **int** data type if you need to control the sort order of the range bands. This column will help you present the range bands in a meaningful way, especially when the range label text values don't sort in a logical order.

## Step 2: Insert values into the range bands table

Next, you should insert one or more series of range bands into the range band table.

Here are some example range bands.

| **Series** | **RangeLabel** | **LowerBound** | **UpperBound** |
|---|---|---|---|
| Price | $0.00 to $999.99 | 0 | 1,000 |
| Price | $1,000.00 to $4,999.99 | 1,000 | 5,000 |
| Price | $5,000.00 or above | 5,000 | 9,999,999 |
| Age | 0 to 19 years | 0 | 20 |
| Age | 20 to 39 years | 20 | 40 |
| Age | 40 to 59 years | 40 | 60 |
| Age | 60 or above | 60 | 999 |

## Step 3: Query by range bands

Lastly, you run a query statement that uses the range band table.

The following example queries the `f_Sales` fact table by joining it with the `d_RangeBand` table and sums the fact quantity values. It filters the `d_RangeBand` table by the _Price_ series, and groups by the range labels.

```sql
SELECT
    [r].[RangeLabel],
    SUM([s].[Quantity]) AS [Quantity]
FROM
    [d_RangeBand] AS [r],
    [f_Sales] AS [s]
WHERE
    [r].[Series] = 'Price'
    AND [s].[UnitPrice] >= [r].[LowerBound]
    AND [s].[UnitPrice] < [r].[UpperBound]
GROUP BY
    [r].[RangeLabel];
```

> [!IMPORTANT]
> Pay close attention to the logical operators used to determine the matching range band in the `WHERE` clause. In this example, the lower boundary value is _inclusive_ and the upper boundary is _exclusive_. That way, there won't be any overlap of ranges or gaps between ranges. The appropriate operators will depend on the boundary values you store in your range band table.

## Related content

- [Dimensional modeling in Microsoft Fabric Warehouse](dimensional-modeling-overview.md)
- [Design tables in Warehouse in Microsoft Fabric](tables.md)
- [Data types in Microsoft Fabric](data-types.md)
