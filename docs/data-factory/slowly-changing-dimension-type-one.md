---
title: Slowly changing dimension type 1
description: A tutorial and pattern on how to accomplish a slowly changing dimension type 1 solution using Data Factory and Dataflow Gen2 inside of Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: tutorial
ms.date: 9/18/2024
ms.custom: dataflows
---

# How to implement slowly changing dimension type 1 using Power Query

Slowly changing dimensions, commonly referred to as SCD, is a framework for updating and maintaining data stored in dimension tables as dimensions change. There are a few different methods to handle changing dimensions, and these techniques are commonly referred to as slowly changing dimension "types."

## Slowly changing dimension type 1

Using slowly changing dimension type 1, if a record in a dimension table changes, the existing record is updated or overwritten. Otherwise, the new record is inserted into the dimension table. This means records in the dimension table always reflect the current state, and no historical data is maintained. This design approach is common for columns that store supplementary values, like the email address or phone number of a customer. When a customer’s email address or phone number changes, the dimension table updates the customer row with the new values. It's as if the customer always had this contact information. A nonincremental refresh of a Power BI model dimension-type table achieves the result of a type 1 slowly changing dimension. It refreshes the table data to ensure the latest values are loaded.

For example:  

| item_id |    name    | price | aisle |
| ------- | ---------- | ----- | ----- |
| 83201   | Crackers   | 4.99  | 6     |
| 17879   | Soda       | 7.99  | 13    |

If Crackers are moved to aisle 11, using slowly changing dimension type 1 to capture this change in the dimension table produces the following result:

| item_id |    name    | price | aisle |
| ------- | ---------- | ----- | ----- |
| 83201   | Crackers   | 4.99  | 11    |
| 17879   | Soda       | 7.99  | 13    |

It's assumed that the data warehouse or lake house fact table has a foreign key to the dimension table. Thus, updated rows in dimension tables are reflected correctly in the fact table for reporting purposes.

Slowly changing dimension type 1 ensures that there are no duplicate records in the table and that the data reflects the most recent current dimension. Lack of duplication is especially useful for real-time dashboarding and predictive modeling, where only the current state is of interest. Since only the most up-to-date information is stored in the table, users aren't able to compare changes in dimensions over time. For example, a data analyst would have trouble identifying the lift in revenue for Crackers after they were moved to aisle 11 without some other information.

Slowly changing dimension type 1 makes current state reporting and analytics easy, but has limitations when performing historic analyses.

In Power Query, you can achieve the previously described behavior using the Merge operation. Take a look at the following Dataflow Gen2.

:::image type="content" source="media/slowly-changing-dimension-type-one/dataflow-diagram-view.png" alt-text="Screenshot of the dataflow shown in Power Query diagram view." lightbox="media/slowly-changing-dimension-type-one/dataflow-diagram-view.png":::

As you can see in the diagram view, we run a comparison between sourced dimension records and existing dimension records. Then, we find records to replace. The M code that realizes this pattern is as follows:

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

You can also use Merge tables as another example to match your need. We present several examples based on Merge to achieve your slowly changing dimension 1 goals.

## Slowly changing dimension type 2

With slowly changing dimension type 2, historical data is maintained by adding a new row when a dimension changes and properly denoting this new row as current while denoting the newly historical record accordingly. Using this technique to implement slowly changing dimension type 2 not only preserves historic data, but it also offers information about when data changes. Maintaining historical data enables data analysts and data scientists to explore operational changes, perform A/B testing, and empower informed decision-making.

Dataflow Gen2 in Fabric Data Factory makes it visual and easy to implement slowly changing dimension Type 1 patterns. You can also achieve slowly changing dimension Type 2 pattern as described in [Slowly changing dimension type 2](slowly-changing-dimension-type-two.md).
