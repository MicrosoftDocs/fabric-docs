---
title: Slowly changing dimension type 1
description: A tutorial and pattern on how to accomplish a slowly changing dimension type 1 solution using Data Factory and Dataflow Gen2 inside of Microsoft Fabric.
ms.topic: tutorial
ms.date: 07/28/2025
ms.custom: dataflows
ai-usage: ai-assisted
---

# Implement slowly changing dimension type 1

In this tutorial, you'll create a slowly changing dimension type 1 solution using Data Factory and Dataflow Gen2 in Microsoft Fabric.

Slowly changing dimensions (SCD) are frameworks for updating and maintaining data in dimension tables when dimensions change. There are different methods to handle changing dimensions, and these are called slowly changing dimension "types."

Some of the most common SCD approaches are type 1 and type 2. Type 1 overwrites existing records with new values, keeping only the current state. Type 2 preserves historical data by adding new rows for changes while marking previous records as historical. This tutorial focuses on type 1, which is ideal when you only need the most current information.

## What is slowly changing dimension type 1?

With slowly changing dimension type 1, you either update existing records or add new ones. When a record already exists in your dimension table, you overwrite it with the new values. When it's a completely new record, you insert it as a new row.

This approach keeps only the current state of your data. No historical information is stored. It's perfect for supplementary data like customer email addresses or phone numbers.

Here's how it works: when a customer changes their email address, you update their row with the new email. The old email is gone forever. It's as if they always had the new email address.

You can achieve this same result in Power BI by doing a nonincremental refresh of your dimension table. The refresh overwrites the existing data with the latest values.

Here's a simple example:  

| item_id |    name    | price | aisle |
| ------- | ---------- | ----- | ----- |
| 83201   | Crackers   | 4.99  | 6     |
| 17879   | Soda       | 7.99  | 13    |

If you move Crackers to aisle 11, using slowly changing dimension type 1 produces this result in the dimension table:

| item_id |    name    | price | aisle |
| ------- | ---------- | ----- | ----- |
| 83201   | Crackers   | 4.99  | 11    |
| 17879   | Soda       | 7.99  | 13    |

Your data warehouse or lake house fact table has a foreign key to the dimension table. This means updated rows in dimension tables show up correctly in the fact table for reporting purposes.

## Implement using Power Query

In Power Query, you can achieve this behavior using the Merge operation. Take a look at the following Dataflow Gen2:

:::image type="content" source="media/slowly-changing-dimension-type-one/dataflow-diagram-view.png" alt-text="Screenshot of the dataflow shown in Power Query diagram view." lightbox="media/slowly-changing-dimension-type-one/dataflow-diagram-view.png":::

As you can see in the diagram view, you run a comparison between sourced dimension records and existing dimension records. Then, you find records to replace. Here's the M for this pattern:

```powerquery-m
let
    Source = Source,

    #"Added custom" = Table.TransformColumnTypes(
        Table.AddColumn(Source, "Hash", each Binary.ToText( 
            Text.ToBinary( 
                Text.Combine(
                    List.Transform({[FirstName],[LastName],[Region]}, each if _ = null then "" else _),
                "|")),
            BinaryEncoding.Hex)
        ),
        {{"Hash", type text}}
    ),

    #"Marked key columns" = Table.AddKey(#"Added custom", {"Hash"}, false),

    #"Merged queries" = Table.NestedJoin(
        #"Marked key columns",
        {"Hash"},
        ExistingDimRecords,
        {"Hash"},
        "ExistingDimRecords",
        JoinKind.LeftOuter
    ),

    #"Expanded ExistingDimRecords" = Table.ExpandTableColumn(
        #"Merged queries",
        "ExistingDimRecords",
        {"Count"},
        {"Count"}
    ),

    #"Filtered rows" = Table.SelectRows(#"Expanded ExistingDimRecords", each ([Count] = null)),

    #"Removed columns" = Table.RemoveColumns(#"Filtered rows", {"Count"})
in
    #"Removed columns"
```

## Benefits and limitations

Slowly changing dimension type 1 makes current state reporting and analytics easy, but has limitations when performing historic analyses.

SCD type 1 ensures that there are no duplicate records in the table and that the data shows the most recent current dimension, which is helpful for real-time dashboarding and predictive modeling, where only the current state matters.

However, since only the most up-to-date information is stored in the table, users can't compare changes in dimensions over time. For example, a data analyst would have trouble comparing revenue for Crackers when they were in aisle 6 and after they were moved to aisle 11 without some other information.

## Related content

If you need to keep historical data, consider slowly changing dimension type 2 instead. Type 2 adds new rows for changes while preserving the old data. Learn more about [Slowly changing dimension type 2](slowly-changing-dimension-type-two.md).
