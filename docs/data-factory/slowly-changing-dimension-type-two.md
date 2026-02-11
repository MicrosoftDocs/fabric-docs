---
title: Slowly changing dimension type 2
description: A tutorial and pattern on how to accomplish a Slowly Changing Dimension Type 2 solution using Data Factory and Dataflow Gen2 inside of Microsoft Fabric.
ms.reviewer: miescobar
ms.topic: tutorial
ms.date: 07/23/2025
ms.custom: dataflows
ai-usage: ai-assisted
---

# Slowly changing dimension type 2

>[!TIP]
>You can [download the Power Query Template file](https://github.com/microsoft/DataFactory/raw/main/Slowly%20Changing%20Dimension%20Type%202.pqt) with the complete Slowly changing dimension type 2 pattern solution to follow along with this tutorial.
>To learn more about using a Power Query template file, check out the documentation article on [Power Query Templates](/power-query/power-query-template).

Slowly changing dimension type 2 is a data warehousing technique that tracks changes to dimension data over time. When a value changes, the system creates a new record with a unique identifier while keeping the original record. This approach preserves a complete history of all changes, so you can see exactly what the data looked like at any point in time.

For example, you can analyze last month's sales by the regions that existed then, or track how employee assignments changed over the course of a year. This article shows you how to implement this concept using Dataflow Gen2 inside of Data Factory for Microsoft Fabric.

## Solution architecture

To implement slowly changing dimension type 2, first decide which fields in your source table you'll use to detect new or changed records.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/diagram-architecture.png" alt-text="Diagram showcasing the components or processes to make the slowly changing dimension type 2 happen in Dataflow.":::

The architecture needs at least four main components:

* **Source table**: The main table where data changes occur.
* **Dimension table**: Stores all historical versions of records from the source table, including change dates.
* **Change detection logic**: Compares the current source table to the dimension table to find new or updated records.
* **Dimension table update logic**: Uses the identified changes to add new records and update existing ones in the dimension table.

>[!NOTE]
>This solution uses Dataflow Gen2 in Microsoft Data Factory. While you can change and modify the logic to fit your needs, this tutorial shows you an easy way to accomplish the slowly changing dimension type 2 pattern using a low-code and visual solution like Dataflow Gen2.

## Source table

The tutorial starts with a sample source table for employees that contains four columns:

|RepSourceID|	FirstName|	LastName|	Region|
|-----------|------------|----------|---------|
|312|	Vance|	DeLeon|	Southwest|
|331|	Adrian|	King|	Northwest|
 
The data in this table is expected to change. People can change their last names or the region where they work.

## Dimension table

The dimension table for this tutorial looks at changes that could happen for the fields **FirstName**, **LastName**, and **Region**.

|SalesRepID|	RepSourceID|	FirstName|	LastName|	Region|	StartDate|	EndDate|	IsCurrent|	Hash|
|------|-------|-------|-------|-----|----|-----|---|---|
|1|	312|	Vance|	DeLeon|	Southwest|	3/20/2021|	12/31/9999|	TRUE|	3331327c56616e63657c44654c656f6e7c536f75746877657374|
|2|	331|	Adrian|	King|	Southcentral|	3/20/2021|	12/31/9999|	TRUE|	3333317c41647269616e7c4b696e677c536f75746863656e7472616c|
|3|	334|	Devon|	Torres|	Panama|	2/14/2024|	12/31/9999|	TRUE|	3333347c4465766f6e7c546f727265737c50616e616d61|

Here's the definition of the schema for this table and a description of the fields:

|Field name|Data type|Description|
|---|---|----|
|SalesRepID|Number|A surrogate key used to uniquely identify records throughout the entire Dimension table|
|RepSourceID|Number|A natural key from the source table that represents an identifier for an employee|
|FirstName|Text|The first name of the employee. This field comes from the Source table|
|LastName|Text|The last name of the employee. This field comes from the Source table|
|Region|Text|The region in which the employee works. This field comes from the Source table|
|StartDate|Date|Date stamp that establishes when the record becomes effective|
|EndDate|Date|Date stamp that establishes until when the record is effective|
|IsCurrent|Logical|Flag to denote if the record is current or not. True represents that the record is current|
|Hash|Text|The hash encoding of the fields RepSourceID, FirstName, LastName, and Region combined|

>[!NOTE]
>It's a good idea to set up your dimension table with the right schema before you start. This tutorial assumes your dimension table is ready and you've set up a hash or lookup column you can use in your Dataflow Gen2 steps.

The goal is to end up with a dimension table that keeps track of changes and new records. After following the steps, your updated dimension table should look like this:

|SalesRepID|RepSourceID|FirstName|LastName|Region|StartDate|EndDate|IsCurrent|Hash|
|---|---|---|---|---|---|---|---|---|
|1|312|Vance|DeLeon|Southwest|3/20/2021|12/31/9999|TRUE|3331327c56616e63657c44654c656f6e7c536f75746877657374|
|2|331|Adrian|King|Southcentral|3/20/2021|8/16/2024|FALSE|3333317c41647269616e7c4b696e677c536f75746863656e7472616c|
|3|334|Devon|Torres|Panama|2/14/2024|8/16/2024|FALSE|3333347c4465766f6e7c546f727265737c50616e616d61|
|4|331|Adrian|King|Northwest|8/16/2024|12/31/9999|TRUE|3333317c41647269616e7c4b696e677c4e6f72746877657374|

This table shows updates for SalesRepID two and three, and adds a new record for SalesRepID four.

|SalesRepID|	RepSourceID|	FirstName|	LastName|	Region|	StartDate|	EndDate|	IsCurrent|	Hash|
|------|-------|-------|-------|-----|----|-----|---|---|
|1|	312|	Vance|	DeLeon|	Southwest|	3/20/2021|	12/31/9999|	TRUE|	3331327c56616e63657c44654c656f6e7c536f75746877657374|
|2|	331|	Adrian|	King|	Southcentral|	3/20/2021|	8/16/2024|	FALSE|	3333317c41647269616e7c4b696e677c536f75746863656e7472616c|
|3|	334|	Devon|	Torres|	Panama|	2/14/2024|	8/16/2024|	FALSE|	3333347c4465766f6e7c546f727265737c50616e616d61|
|4|331|Adrian|King|Northwest|8/16/2024|12/31/9999|TRUE|3333317c41647269616e7c4b696e677c4e6f72746877657374|


## Logic to identify changes

To find changes, you need to take a snapshot of your source table and compare it to your dimension table. Here are a few ways to compare these tables:

* Merge / JOIN patterns
    * Using Natural keys
    * Using Hashing techniques to create lookup fields
    * Explicit Joins between tables
* Custom logic using dynamic record matching with [Table.SelectRows](/powerquery-m/table-selectrows)

This tutorial uses a hashing technique. You'll create a single value in both tables for a JOIN, also known as a [Merge operation](/power-query/merge-queries-overview), to compare records between the two tables.

After you load the Source table into a Dataflow Gen2, select the **Add column** tab from the ribbon and use the Add Custom column option. In the Custom column dialog, create a new column named Hash with the Text data type using this formula:

```M-Code
Binary.ToText( Text.ToBinary( Text.Combine(List.Transform({[RepSourceID],[FirstName],[LastName],[Region]}, each if _ = null then "" else Text.From(_)), "|")), BinaryEncoding.Hex)
```

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/create-hash-column.png" alt-text="Screenshot showing the formula to create a hash column in Dataflow Gen2 using a Custom column.":::

>[!IMPORTANT]
>This sample formula shows how to use these four columns, but you can change the column references to match your own columns. Define which specific fields from your table you want to use to create the hash.

Now with the Hash column in your Source table, you can easily compare both tables to find exact matches.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/hash-column-in-source-table.png" alt-text="Screenshot of the source table with hash column.":::

After you load your Dimension table, create a reference of this query by right-clicking the query in the queries pane or in the diagram view and select the option to reference. Rename this new query to **AggregatedDimHash**. You'll aggregate the count of records in the table by the Hash field. To do this, go to the Home tab in the ribbon and select the Group by option within the Transform group.
In the dialog, group by the Hash column and select the Operation for the new Count column to be Count rows.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/aggregate-count-by-hash-dimension.png" alt-text="Screenshot of the Group by dialog showing how to create an aggregated count column grouped by the Hash column from the Dimension table.":::


### New records

>[!NOTE]
>When you compare the source table against the dimension table, you'll find what new records need to be added to the dimension table.

Select the **Source** query, go to the Home tab in the ribbon and select the option to *Merge queries as new* inside the Combine group. Rename this query to Compare.

In the Merge dialog, pick the **AggregatedDimHash** in the "Right table for merge" dropdown and select the Hash columns from both tables while leaving the default *Join kind* of Left outer.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/merge-by-hash-column.png" alt-text="Screenshot of the Merge dialog showing the settings to merge the dimension and source tables using the hash columns from both.":::

After the merge completes, expand the newly created column by selecting only the Count column to be expanded.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/expand-count-column-only.png" alt-text="Screenshot of the expand dialog while only selecting the Count column.":::

Filter this column to keep only null values, which represent the values that don't exist in the Dimension table today. The result shows a single record for Adrian King in the Northwest region.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/comparison-no-exact-matches.png" alt-text="Screenshot showing the result of doing a direct exact comparison of hash values between Source and Dimension table only yields a single record for Adrian King in the Northwest region.":::

Remove the Count column and rename this query to **CompareStoM**.

The next step requires you to add missing fields to your record such as the StartDate, EndDate, IsCurrent, and the SalesRepID. The first three are easy to define with a formula, but the SalesRepID requires you to first calculate this value from the existing values in the Dimension table.

#### Get the sequence of identifiers from the Dimension table

Reference the existing Dimension table and rename the query to **LastID**. You'll reference this query later.

Assuming that the value of the query is an integer that increments by one each time new records are added, you can implement logic that finds the maximum value in the **SalesRepID**. Right-select the **SalesRepID** and select the option to drill down.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/drill-down-salesrepid.png" alt-text="Screenshot of the contextual menu when right clicking the SalesRepID column and highlighting the Drill down operation.":::

This creates a list and in the ribbon you'll now see the statistics options where you can choose the option to calculate the maximum value of this list:

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/list-tool-maximum.png" alt-text="Screenshot of the List tools contextual menu in the Power Query editor ribbon highlighting the Maximum option from the statistics operations.":::

Add another custom step after the previous step and replace the formula for this step of your query with the formula below. This formula calculates the max value from the SalesRepID and adds one to it, or establishes the value one as the seed for new records if your table doesn't contain any records:

```try #"Calculated maximum" +1 otherwise 1```

The output of the LastID query for this example is the number four.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/lastid-query-output.png" alt-text="Screenshot of the data preview of the LastID query showing the number four as the result.":::

>[!IMPORTANT]
>``#"Calculated maximum"`` represents the name of your previous step. If this isn't the exact name of your query, modify the formula to reflect the name of your previous step.

Reference the **CompareStoM** query where you had the single record for Adrian King in the Northwest region and call this new query "NewRecords".

Add a new Index column through the Add column tab in the ribbon that starts from the number zero.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/add-index-column.png" alt-text="Screenshot of the Index column entry point from within the Add column menu of the ribbon in the Power Query Editor.":::

Check the formula of the step that was created and replace the ```0``` with the name of the query **LastID**. This creates a starting value that represents the new values for your records in the Dimension table.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/index-with-new-start-value.png" alt-text="Screenshot showing the result of the query after the formula for the add index was modified where the result for Adrian King in the new Index column is equal to four.":::

Rename this Index column to **SalesRepID**.

#### Add missing fields to new records

Now add the missing columns using the Add custom column. Here's a table with all the formulas to use for each of the new columns:

|Column name|Data type|Formula|
|---|----|--|
|StartDate|Date|Date.From(DateTime.LocalNow())
|EndDate|Date|#date(9999,12,31)|
|IsCurrent| True/False| true|

The result now conforms to the schema expected by the Dimension table.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/new-records-table.png" alt-text="Screenshot of table with all new records that need to be added to the Dimension table.":::

### Records to update

>[!NOTE]
>When you compare the dimension table against the source table, you'll find what records should be updated in the dimension table.

Using the original Dimension query (Dimension), perform a new **Merge queries as new** operation and select the Source table query as the right table. Select the Hash columns from both tables and select Left anti as the join kind.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/merge-by-hash-with-left-anti-dim-source-tables.png" alt-text="Screenshot of Merge dialog with the Dimension and Source tables using the hash columns as column pairs and the left anti join kind being selected as the join kind.":::

The output is a table with records that are no longer used in the Source table. Expand the newly created column with table values and expand only the Hash column, then delete it.

Rename the query to **RecordsToUpdate**.

You now need to update the records from the Dimension table to reflect this change in the source table. The changes are straightforward and require you to update the values on the EndDate and IsCurrent fields. To do this, right-select the IsCurrent field and select the option to **Replace values...**. In the Replace value dialog, replace the value TRUE with FALSE.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/replace-is-current-value.png" alt-text="Screenshot of the Replace dialog where the value to find is equal to TRUE and the replace with is FALSE.":::

You can also right-select the EndDate field and select **Replace values...**. Enter a value of 12/31/1999 or any date of your choice as you'll replace this value later.

After you commit the dialog, a new replace values step is added. Go to the formula bar of the step and change the component that contains #date(1999,12,31) with the formula from below.

```m-code
Date.From(DateTime.LocalNow())
```

This new formula adds a date stamp that shows when the logic runs to determine the EndDate for that particular record.

The result is a table with exactly the records that should be updated with their corresponding new values.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/current-time-for-replace.png" alt-text="Screenshot Making the EndDate a dynamic function that adds a date stamp.":::

### Combining records to add and update into a single table

You can [append](/power-query/append-queries) the query for **NewRecords** with the one that contains records to be updated (**RecordsToUpdate**) into a single query to make the next process to update your dimension table easier.

To append the queries, select the **NewRecords** query, go to the home tab of the ribbon and inside the Combine group you'll find the option to *Append queries as new*. From the Append dialog, also select the query with the records to update as the second table.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/append-new-updated-records.png" alt-text="Screenshot of the Append dialog selecting the first table as NewRecords and the second table as RecordToUpdate.":::

Rename this new query as **StagingTableForUpdates** and it should contain 3 rows. This query is used in the logic to update the dimension table. You can move the SalesRepID or rearrange the columns as you want. For this tutorial, we show the output of this query using the same order of fields as in the **Dimension** table.

:::image type="content" source="../data-factory/media//slowly-changing-dimension-type-two/staging-table-for-updates.png" alt-text="Screenshot of the query with all records to be added and records that will be updated combined into a single table." lightbox="../data-factory/media//slowly-changing-dimension-type-two/staging-table-for-updates.png":::

## Logic to update the Dimension table

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/diagram-architecture-dataflow-gen2.png" alt-text="Diagram view of the Dataflow Gen2 solution until the StagingTableForUpdates query was created.":::

The solution so far provides a query with all records for an upsert operation into the destination. From this point, you can define the logic you want to use to load your data to the Dimension table. You typically have two options:

* **Upsert operation**: Store the results of the **StagingTableForUpdates** query in a staging table, then run a stored procedure or use a notebook to update your Dimension table. You can automate this process with a pipeline that triggers the notebook or stored procedure after Dataflow Gen2 completes, and schedule it for future runs.
* **Delete and recreate the table**: You can use Dataflow Gen2 to remove all existing data and rebuild the Dimension table from scratch. This tutorial demonstrates this method.

### Using Dataflow Gen2 to load data to your Dimension destination table

You can create logic that uses three queries to come up with a query with all the records that should exist in the Dimension table. With the new query, you can use the [data destinations feature in Dataflow Gen2 to load your data](dataflow-gen2-data-destinations-and-managed-settings.md).

#### Records to keep from original Dimension table

The first logic to implement is the records from the original Dimension table to keep.

With the **Dimension** query selected, go to the Home tab in the Ribbon and use the **Merge queries as new** option. In the Merge dialog, select the **RecordsToUpdate** query as the right table. Select the **SalesRepID** columns from both columns and use the *Left anti* as the join kind. Select Ok.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/only-records-to-keep-from-original-dimension-table.png" alt-text="Screenshot of the Merge dialog using the Dimension and RecordsToUpdate tables joined by the SalesRepID column and using a left anti join as the join kind.":::

Expand the *Hash* field from the newly created column. After it's expanded, you can delete that column.

Now that you know exactly what records need to be kept from the original Dimension table, you can append the **StagingTableForUpdates** to the existing query to create a query with all records that should be in the **Dimension** table. To do that, in the Home tab of the ribbon select the option to **Append** within the existing query and append the **StagingTableForUpdates** query.

:::image type="content" border="true" source="../data-factory/media/slowly-changing-dimension-type-two/append-staging-table-for-updates.png" alt-text="Screenshot of the Append dialog for the final query to upload all data to Dimension table.":::

You can sort this table using the **SalesRepID** field in ascending order and the output can be used with the data destination feature to load the data to the Dimension table.

:::image type="content" source="../data-factory/media/slowly-changing-dimension-type-two/final-dimension-table.png" alt-text="Screenshot of the data preview for the final dimension table before it gets a definition for a data destination." lightbox="../data-factory/media/slowly-changing-dimension-type-two/final-dimension-table.png":::

You can read more about how to set a data destination for your query and load the output of the query to your **Dimension** table from the article on [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md).

:::image type="content" source="../data-factory/media/slowly-changing-dimension-type-two/final-diagram-view.png" alt-text="Diagram view that shows the final solution with the data destination logic incorporated into it." lightbox="../data-factory/media/slowly-changing-dimension-type-two/final-diagram-view.png":::

>[!NOTE]
>In Dataflow Gen2 you can leverage a staging mechanism at the query level. Read more about the [staging mechanism in Dataflow Gen2](../data-factory/data-in-staging-artifacts.md).
