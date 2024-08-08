---
title: Slowly changing dimension type 2
description: 
author: ptyx507x
ms.author: miescobar
ms.reviewer: jburchel
ms.topic: concept
ms.date: 08/07/2024
---

# Slowly changing dimension type 2 

Slowly changing dimension type 2 (SCD Type 2) is a method used in data warehousing to manage and track historical changes in dimension data. When an attribute value changes, a new record is created with a unique identifier, and the old record is retained. This allows for a complete historical record of changes over time, enabling accurate reporting and analysis based on different points in time.

This article will showcase a tutorial and an example on how you can implement a solution for this concept using Dataflow Gen2 inside of Data Factory for Microsoft Fabric.

## Solution architecture

When implementing a solution for a Slowly changing dimension type 2, its important to define your source table and what fields from your source table will drive the logic to identify new records.

<Slowly changing dimension type2 diagram>

As a whole, the architecture requires a minimum of 4 components:
* **Source table**: This is your operational table where you can change the values as needed and its data or how the data is managed inside of this table is not driven by Dimension table.
* **Dimension table**: This is historical table of all states that the **Source table** had based on a custom logic to identify changes and the effective dates of those changes
* **Logic to identify changes**: This is effectively done by taken a snapshot of the current state of your **Source table** and comparing it to the available records in the **Dimension table**.
* **Logic to update Dimension table**: Once all changes are identified in the **logic to identify changes**, a table with the records to be added and updated can be taken to update the **Dimension table**.


## Source table

This tutorial will start with a sample source table for employees that contains four columns. Below is the exact table used for the tutorial:

|RepSourceID|	FirstName|	LastName|	Region|
|-----------|------------|----------|---------|
|312|	Juan|	Cao|	Southwest|
|331|	Susan|	Eaton|	Northwest|
 
The data in this table is expected to change. People can have changes in their last names or the region where they might be assigned to work for. 

## Dimension table

The dimension table for this tutorial will be looking at changes that could be happening for the fields **FirstName**, **LastName** and **Region**. Below is the Dimension table that the tutorial will use:

|SalesRepID|	RepSourceID|	FirstName|	LastName|	Region|	StartDate|	EndDate|	IsCurrent|	Hash|
|------|-------|-------|-------|-----|----|-----|---|---|
|1|	312|	Juan|	Cao|	Southwest|	3/20/2021|	12/31/9999|	TRUE|	3331327c4a75616e7c43616f7c536f75746877657374|
|2|	331|	Susan|	Eaton|	Southcentral|	3/20/2021|	12/31/9999|	TRUE|	3333317c537573616e7c4561746f6e7c536f75746863656e7472616c|
|3|	334|	Miguel|	Escobar|	Panama|	2/14/2024|	12/31/9999|	TRUE|	3333347c4d696775656c7c4573636f6261727c50616e616d61|

Below is a definition of the schema for this table and description for the fields:

|Field name|Data type|Description|
|---|---|----|
|SalesRepID|Number|A unique identifier throughout the entire Dimension table|
|RepSourceID|Number|A natural key from the source table that represents an identifier for an employee|
|FirstName|Text|The first name of the employee. This field comes from the Source table|
|LastName|Text|The last name of the employee. This field comes from the Source table|
|Region|Text| The region in which the employee works for. This field comes from the Source table|
|StartDate|Date|Date stamp that establishes when the record becomes effective|
|EndDate|Date|Date stamp that establishes until when the record is effective|
|IsCurret|Logical|Simple flag to denote if the record is current or not. True represents that the record is current|
|Hash|Text|The hash encoding of the fields RepSourceID, FirstName, LastName and Region combined|

>[!NOTE]
>It is highly encouraged that you create a dimension table with the correct schema before establishing this process. The tutorial takes into consideration that you've already created the dimnension table in advance and have already established a hashing or lookup mechanism that could be used within your Dataflow Gen2 logic.

## Logic to identify changes

In order to identify the changes, you first need to take a snapshot of your source table and establish a logic to compare it against your Dimension table. There are many ways in which you can establish a logic to compare these tables. This tutorial uses a hashing technique to use a single value that could be created within both tables and then used in a JOIN (Merge operation) to compare these two tables.

Once you've loaded the Source table into a Dataflow Gen2, you can click the Add column tab from the ribbon and use the Add Custom column option. In the Custom column dialog you can create a new column with the name Hash with the Text data type and using the formula below:

```M-Code
Binary.ToText( Text.ToBinary( Text.Combine(List.Transform({[RepSourceID],[FirstName],[LastName],[Region]}, each if _ = null then "" else Text.From(_)), "|")), BinaryEncoding.Hex)
```

![Create a hash column in Dataflow Gen2](/docs/data-factory/media/slowly-changing-dimension-type-two/create-hash-column.png)

Now with the Hash column in your Source table, you now have a simple way to compare both tables to find exact matches.

![Source table with hash column](/docs/data-factory/media/slowly-changing-dimension-type-two/hash-column-in-source-table.png)

Once you've loaded your Dimension table, to simplify the process you can have an aggregated view of the table that just containts the count of records in the table by the Hash field. To do so, go to the Home tab in the ribbon and select the Group by option within the Transform group.
Within the dialog, make sure to group by the Hash column and select the Operation for the new Count column to be Count rows.

![Aggregate a count column by using the Hash column from the Dimension table](/docs/data-factory/media/slowly-changing-dimension-type-two/aggregate-count-by-hash-dimension.png)


### New records

>[!NOTE]
>Comparing the source table against the dimension table will fundamentally gives you what new records need to be added to the dimension table.

Using your query with the Source table, go to the Home tab in the ribbon and select the option to Merge queries as new inside the Combine group. Rename this query to be Compare.
Within the Merge dialog, make sure to pick the Dimension table in the "Right table for merge" dropdown and select the Hash columns from both tables while leaving the default Join kind of Left outer.

![Joining the dimension and source table using the hash columns from both](/docs/data-factory/media/slowly-changing-dimension-type-two/merge-by-hash-column.png)

Once the merge has completed, be sure to expand the newly created column by only selecting the Count column to be expanded.

![Only expanding the Count column after the merge operation](/docs/data-factory/media/slowly-changing-dimension-type-two/expand-count-column-only.png)

Filter this column to only keep null values which will represent the values that do not exist in the Dimension table today. The result will yield a single record for Susan Eaten in the Northwest region.

![Result of doing a direct exact comparison of hash values between Source and Dimension table only yields a single record for Susan Eaten in the Northwest region](/docs/data-factory/media/slowly-changing-dimension-type-two/comparison-no-exact-matches.png)

>[!NOTE]
>You can extend the logic beyond what's showcased in this tutorial to meet your specific needs

### Records to update

>[!NOTE]
>Comparing the dimension table against the source table will fundamentally gives you what records should be updated in the dimension table.

Using the original Dimension query (Dimension), perform a new **Merge queries as new** operation and select the Source table query as the right table. Select the Hash columns from both tables and select Left anti as the join kind.

![Merge operation between Dimension and Source table using the hash columns and the left anti join kind](/docs/data-factory/media/slowly-changing-dimension-type-two/merge-by-hash-with-left-anti-dim-source-tables.png)

This will yield a table with records that are no longer used in the Source table. We will need to update the records from the Dimension table to reflect this change in the source table. The changes are trivial and will simply require you to update the values on the EndDate and IsCurrent fields. To do so, you can right click the IsCurrent field and select the option to **Replace values...**. Within the Replace value dialog you can replace the value TRUE with FALSE.

![Replace IsCurrent values from TRUE to FALSE](/docs/data-factory/media/slowly-changing-dimension-type-two/replace-is-current-value.png)

You can right click the EndDate field and select the **Replace values...** as well. Input a value of 12/31/1999 or any date of your choice as you will replace this value later on.

Once you've committed the dialog, a new replace values step will be added. Go to the formula bar of the step and change the component that has #date(1999,12,31) with the formula from below.

```m-code
Date.From(DateTime.LocalNow())
```

This new formula will add a date stamp as to when the logic runs to determine the EndDate for that particular record.

The result of this will be a table with exactly the records that should be updated with the new values

![Making the EndDate a dynamic function that adds a date stamp](/docs/data-factory/media/slowly-changing-dimension-type-two/current-time-for-replace.png)


### Combining records to add and update into a single table

## Logic to update Dimension table

### Using Dataflow Gen2

### Using other methods

<Explain how you can use a Stored procedure, a notebook or other methods to upsert rows>

