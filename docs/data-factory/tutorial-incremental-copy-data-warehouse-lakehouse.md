---
title: Incrementally load data from Data Warehouse to Lakehouse
description: Learn steps to incrementally load data from Data Warehouse to Lakehouse
ms.reviewer: jianleishen
ms.topic: tutorial
ms.custom: pipelines, sfi-image-nochange
ms.date: 07/14/2025
ms.search.form: Pipeline tutorials
ai-usage: ai-assisted
---

# Incrementally load data from Data Warehouse to Lakehouse 

In this tutorial, you'll learn how to copy only new or changed data from your Data Warehouse to a Lakehouse. This approach is called incremental loading, and it's helpful when you want to keep your data up-to-date without copying everything each time.

Here's the high-level design of the solution:

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/logic-introduction.png" alt-text="Diagram showing incrementally load data logic.":::

1. **Pick a watermark column**.
	Choose one column in your source table that helps track new or changed records. This column usually contains values that increase when rows are added or updated (like a timestamp or ID). We'll use the highest value in this column as our "watermark" to know where we left off.
1. **Set up a table to store your last watermark value**.
1. **Build a pipeline that does the following**:

	The pipeline includes these activities:

	* Two lookup activities. The first one gets the last watermark value (where we stopped last time). The second one gets the new watermark value (where we'll stop this time). Both values get passed to the copy activity.
	* A copy activity that finds rows where the watermark column value is between the old and new watermarks. It then copies this data from your Data Warehouse to your Lakehouse as a new file.
	* A stored procedure activity that saves the new watermark value so the next pipeline run knows where to start.

## Prerequisites

- **Data Warehouse**. You'll use the Data Warehouse as your source data store. If you don't have one, check out [Create a Data Warehouse](../data-warehouse/create-warehouse.md) for instructions.
- **Lakehouse**. You'll use the Lakehouse as your destination data store. If you don't have one, see [Create a Lakehouse](../data-engineering/create-lakehouse.md) for instructions.
    - Create a folder named *IncrementalCopy* to store your copied data.

## Prepare your source

Let's set up the tables and stored procedure you need in your Data Warehouse before configuring the incremental copy pipeline.

### 1. Create a data source table in your Data Warehouse

Run the following SQL command in your Data Warehouse to create a table named *data_source_table* as your source table. We'll use this as sample data for the incremental copy.

```sql
create table data_source_table
(
    PersonID int,
    Name varchar(255),
    LastModifytime DATETIME2(6)
);

INSERT INTO data_source_table
    (PersonID, Name, LastModifytime)
VALUES
    (1, 'aaaa','9/1/2017 12:56:00 AM'),
    (2, 'bbbb','9/2/2017 5:23:00 AM'),
    (3, 'cccc','9/3/2017 2:36:00 AM'),
    (4, 'dddd','9/4/2017 3:21:00 AM'),
    (5, 'eeee','9/5/2017 8:06:00 AM');
```
The data in your source table looks like this:

```
PersonID | Name | LastModifytime
-------- | ---- | --------------
1        | aaaa | 2017-09-01 00:56:00.000
2        | bbbb | 2017-09-02 05:23:00.000
3        | cccc | 2017-09-03 02:36:00.000
4        | dddd | 2017-09-04 03:21:00.000
5        | eeee | 2017-09-05 08:06:00.000
```

In this tutorial, we'll use *LastModifytime* as the watermark column.

### 2. Create another table in your Data Warehouse to store the last watermark value

1. Run the following SQL command in your Data Warehouse to create a table named *watermarktable* to store the last watermark value:

    ```sql
    create table watermarktable
    (
    TableName varchar(255),
    WatermarkValue DATETIME2(6),
    );
    ```
2. Set the default value of the last watermark with your source table name. In this tutorial, the table name is *data_source_table*, and we'll set the default value to `1/1/2010 12:00:00 AM`.

    ```sql
    INSERT INTO watermarktable
    VALUES ('data_source_table','1/1/2010 12:00:00 AM')    
    ```
3. Check the data in your *watermarktable*.

    ```sql
    Select * from watermarktable
    ```
    Output:

    ```
    TableName  | WatermarkValue
    ----------  | --------------
    data_source_table | 2010-01-01 00:00:00.000
    ```

### 3. Create a stored procedure in your Data Warehouse

Run the following command to create a stored procedure in your Data Warehouse. This stored procedure updates the last watermark value after each pipeline run.

```sql
CREATE PROCEDURE usp_write_watermark @LastModifiedtime datetime, @TableName varchar(50)
AS

BEGIN

UPDATE watermarktable
SET [WatermarkValue] = @LastModifiedtime
WHERE [TableName] = @TableName

END
```

## Configure a pipeline for incremental copy

### Step 1: Create a pipeline

1. Go to [Power BI](https://app.powerbi.com/).

1. Select the Power BI icon in the bottom left of the screen, then select **Fabric**.

1. Select **My workspace** to open your Fabric workspace.

1. Select **+ New Item**, then select **Pipeline**, and then enter a pipeline name to create a new pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new pipeline button in the newly created workspace.":::

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::

### Step 2: Add a lookup activity for the last watermark

In this step, you'll create a lookup activity to get the last watermark value. We'll get the default value `1/1/2010 12:00:00 AM` that we set earlier.

1. Select **Pipeline activity** and select **Lookup** from the drop-down list.

1. Under the **General** tab, rename this activity to **LookupOldWaterMarkActivity**.

1. Under the **Settings** tab, configure the following:
    - **Connection**: Under **Warehouse** select **Browse all**, and select your data warehouse from the list.
    - **Use query**: Choose **Table**.
    - **Table**: Choose *dbo.watermarktable*.
    - **First row only**: Selected.

    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lookup-old-watermark.png" alt-text="Screenshot showing lookup old watermark.":::

### Step 3: Add a lookup activity for the new watermark

In this step, you'll create a lookup activity to get the new watermark value. You'll use a query to get the new watermark from your source data table. We'll get the highest value in the *LastModifytime* column from *data_source_table*.

1. On the top bar, select **Lookup** under the **Activities** tab to add the second lookup activity.

1. Under the **General** tab, rename this activity to **LookupNewWaterMarkActivity**.

1. Under the **Settings** tab, configure the following:
    - **Connection**: Under **Warehouse** select **Browse all**, and select your data warehouse from the list or select your data warehouse from **Fabric item connections**.
    - **Use query**: Choose **Query**.
    - **Query**: Enter the following query to pick the maximum last modified time as the new watermark:

        ```sql
        select MAX(LastModifytime) as NewWatermarkvalue from data_source_table
        ```    
    - **First row only**: Selected.

    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lookup-new-watermark.png" alt-text="Screenshot showing lookup new watermark.":::

### Step 4: Add the copy activity to copy incremental data

In this step, you'll add a copy activity to copy the incremental data between the last watermark and new watermark from your Data Warehouse to your Lakehouse.

1. Select **Activities** on the top bar and select **Copy data** -> **Add to canvas** to get the copy activity.

1. Under the **General** tab, rename this activity to **IncrementalCopyActivity**.

1. Connect both lookup activities to the copy activity by dragging the green button (On success) attached to the lookup activities to the copy activity. Release the mouse button when you see the border color of the copy activity changes to green.

    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/connect-lookup-copy.png" alt-text="Screenshot showing connecting lookup and copy activities.":::

1. Under the **Source** tab, configure the following:
    - **Connection**: Under **Warehouse** select **Browse all**, and select your data warehouse from the list or select your data warehouse from **Fabric item connections**.
    - **Warehouse**: Select your warehouse.
    - **Use query**: Choose **Query**.
    - **Query**: Enter the following query to copy incremental data between the last watermark and new watermark.

        ```sql
        select * from data_source_table where LastModifytime > '@{activity('LookupOldWaterMarkActivity').output.firstRow.WatermarkValue}' and LastModifytime <= '@{activity('LookupNewWaterMarkActivity').output.firstRow.NewWatermarkvalue}'
        ```

    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/copy-source.png" alt-text="Screenshot showing copy source configuration.":::

1. Under the **Destination** tab, configure the following:
    - **Connection**: Under **Lakehouse** select **Browse all**, and select your lakehouse from the list or select your lakehouse from **Fabric item connections**.
    - **Lakehouse**: Select your Lakehouse.
    - **Root folder**: Choose **Files**.
    - **File path**: Choose the folder where you want to store your copied data. Select **Browse** to select your folder. For the file name, open **Add dynamic content** and enter `@CONCAT('Incremental-', pipeline().RunId, '.txt')` in the opened window to create file names for your copied data file in Lakehouse.
    - **File format**: Select the format type of your data.

    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/copy-destination.png" alt-text="Screenshot showing copy destination configuration.":::

### Step 5: Add a stored procedure activity

In this step, you'll add a stored procedure activity to update the last watermark value for the next pipeline run.

1. Select **Activities** on the top bar and select **Stored procedure** to add a stored procedure activity.

1. Under the **General** tab, rename this activity to **StoredProceduretoWriteWatermarkActivity**.

1. Connect the green (On success) output of the copy activity to the stored procedure activity.

1. Under the **Settings** tab, configure the following:
    - **Data Warehouse**: Select your Data Warehouse.
    - **Stored procedure name**: Choose the stored procedure that you created in your Data Warehouse: *[dbo].[usp_write_watermark]*.
    - Expand **Stored procedure parameters**. To set values for the stored procedure parameters, select **Import**, and enter the following values for the parameters:
    
        | Name | Type | Value |
        | ---- | ---- | ----- |
        | LastModifiedtime | DateTime | @{activity('LookupNewWaterMarkActivity').output.firstRow.NewWatermarkvalue} |
        | TableName | String | @{activity('LookupOldWaterMarkActivity').output.firstRow.TableName} |
    
    :::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/stored-procedure-activity.png" alt-text="Screenshot showing stored procedure activity configuration.":::
    
### Step 6: Run the pipeline and monitor the result

On the top bar, select **Run** under the **Home** tab. Then select **Save and run**. The pipeline starts running and you can monitor it under the **Output** tab.

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/pipeline-run.png" alt-text="Screenshot showing pipeline run results.":::

Go to your Lakehouse, and you'll find the data file is under the folder that you chose. You can select the file to preview the copied data.

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lakehouse-data-1.png" alt-text="Screenshot showing lakehouse data for the first pipeline run.":::

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lakehouse-data-preview-1.png" alt-text="Screenshot showing lakehouse data preview for the first pipeline run.":::

## Add more data to see the incremental copy results

After you finish the first pipeline run, let's add more data to your Data Warehouse source table to see if this pipeline can copy your incremental data.

### Step 1: Add more data to source

Insert new data into your Data Warehouse by running the following query:

```sql
INSERT INTO data_source_table
VALUES (6, 'newdata','9/6/2017 2:23:00 AM')

INSERT INTO data_source_table
VALUES (7, 'newdata','9/7/2017 9:01:00 AM')
```
The updated data for *data_source_table* is:

```
PersonID | Name | LastModifytime
-------- | ---- | --------------
1 | aaaa | 2017-09-01 00:56:00.000
2 | bbbb | 2017-09-02 05:23:00.000
3 | cccc | 2017-09-03 02:36:00.000
4 | dddd | 2017-09-04 03:21:00.000
5 | eeee | 2017-09-05 08:06:00.000
6 | newdata | 2017-09-06 02:23:00.000
7 | newdata | 2017-09-07 09:01:00.000
```

### Step 2: Trigger another pipeline run and monitor the result

Go back to your pipeline page. On the top bar, select **Run** under the **Home** tab again. The pipeline starts running and you can monitor it under **Output**.

Go to your Lakehouse, and you'll find the new copied data file is under the folder that you chose. You can select the file to preview the copied data. You'll see your incremental data shows up in this file.

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lakehouse-data-2.png" alt-text="Screenshot showing lakehouse data for the second pipeline run.":::

:::image type="content" source="media/tutorial-incremental-copy-data-warehouse-lakehouse/lakehouse-data-preview-2.png" alt-text="Screenshot showing lakehouse data preview for the second pipeline run.":::

## Related content

Next, learn more about copying from Azure Blob Storage to Lakehouse.

> [!div class="nextstepaction"]
> [Copy from Azure Blob Storage to Lakehouse](tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse.md)
