---
title: Load data to Lakehouse using partition
description: Learn steps to load data to Lakehouse using partition.
ms.reviewer: jonburchel
ms.author: jianleishen
author: jianleishen
ms.topic: tutorial
ms.custom: build-2023
ms.date: 12/19/2023
ms.search.form: Pipeline Tutorials
---

# Load data to Lakehouse using partition in a Data pipeline

The partition feature in Lakehouse table as destination offers the capability to load data to Lakehouse table with partitions. The partitions are generated in Lakehouse destination, and then benefit the downstream jobs or consumption. 

This tutorial helps you learn how to load data to Lakehouse using partition in a Data pipeline. As an example, you will try to load sample dataset into Lakehouse using one or multiple partition columns by taking the following steps. The sample dataset **Public Holidays** is used as sample data.

## Prerequisite

- Make sure you have a Project Microsoft Fabric enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).

## Create a Data pipeline

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Data factory** to open homepage of Data Factory.

   :::image type="content" source="media/create-first-dataflow-gen2/select-data-factory.png" alt-text="Screenshot with the data factory experience emphasized.":::

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace. If you created a new workspace in the prior Prerequisites section, use this one.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select **Data pipeline** and then input a pipeline name to create a new pipeline.

   :::image type="content" source="media/create-first-pipeline/select-pipeline.png" alt-text="Screenshot showing the new Data pipeline button in the newly created workspace.":::

   :::image type="content" source="media/tutorial-load-sample-data-to-data-warehouse/new-pipeline.png" alt-text="Screenshot showing the name of creating a new pipeline.":::


## Load data to Lakehouse using partition columns

1. Open your Data pipeline and add a copy activity by selecting **Add pipeline activity** -> **Copy data**. Under **Source**, select **Sample dataset**, and select **Browse**, then select **Public Holidays**.

    :::image type="content" source="media/tutorial-lakehouse-partition/data-store-type-sample-dataset.png" alt-text="Screenshot of using sample dataset.":::

    :::image type="content" source="media/tutorial-lakehouse-partition/sample-dataset-public-holidays.png" alt-text="Screenshot of selecting sample dataset.":::

2. Under **Destination** tab, select **Workspace** in **Data store type**, then select **Lakehouse** in **Workspace data store type**, specify your Lakehouse or select **+ New** to create a new Lakehouse. Choose **Table** in **Root folder** and specify your table name. 

    :::image type="content" source="media/tutorial-lakehouse-partition/destination.png" alt-text="Screenshot of destination configuration.":::

3. Expand **Advanced**, in **Table action**, select **Overwrite**, and then select **Enable partition**, under **Partition columns**, select **Add column**, and choose the column you want to use as the partition column. You can choose to use a single column or multiple columns as the partition column.

    If you use a single column, **countryOrRegion** (string type) is selected as an example in this tutorial. The data will be partitioned by different column values. 

    :::image type="content" source="media/tutorial-lakehouse-partition/destination-partition-columns.png" alt-text="Screenshot showing the partition columns configuration under destination.":::

    > [!Note]
    > The partition column that can be selected should be string, integer, boolean and datetime type. Columns of other data types are not displayed in the drop-down list.

    If you use multiple partition columns, add one more column and select **isPaidTimeOff** which is boolean type as an example. Then run the pipeline. The logic is that the table is partitioned by the first added column values firstly, and then the partitioned data continue to be partitioned by the second added column values. 
    
    :::image type="content" source="media/tutorial-lakehouse-partition/configure-multiple-partition-columns.png" alt-text="Screenshot of configuring multiple partition columns.":::
    
    > [!TIP]
    > You can drag columns to change the sequence of columns, and the partition sequence will also change.

4. Select the **Run** and select **Save and run** to run the pipeline.
    
    :::image type="content" source="media/tutorial-lakehouse-partition/save-and-run.png" alt-text="Screenshot of save and run.":::

5. After the pipeline runs successfully, go to your **Lakehouse**. Find the table that you copied. Right-click the table name and select **View files**. 


    For one partition column (countryOrRegion), the table is partitioned to different folders by country or region names. The special character in column name is encoded, and you may see the file name is different from column values when you view files in Lakehouse.
    
    :::image type="content" source="media/tutorial-lakehouse-partition/lakehouse-view-files.png" alt-text="Screenshot showing file view in Lakehouse.":::
    
    :::image type="content" source="media/tutorial-lakehouse-partition/lakehouse-partition-public-holiday-files.png" alt-text="Screenshot showing the file view of copied public holiday data.":::
    
    For multiple partition columns, you will find the table is partitioned into different folders by country or region names. 
        
    :::image type="content" source="media/tutorial-lakehouse-partition/partition-country-folder.png" alt-text="Screenshot showing partition country or region folder.":::
        
    Select one folder, for example **contryOrRegion=United States**. The table partitioned by the country or region name is partitioned again by the added second column isPaidTimeOff’s value: `True` or `False` or `__HIVE_DEFAULT_PARTITION__`(represents empty value in Sample dataset).
            
    :::image type="content" source="media/tutorial-lakehouse-partition/country-partition-by-ispaidtimeoff.png" alt-text="Screenshot showing country or region partition by ispaidtimeoff.":::
            
    Similarly, if you add three columns to partition the table, you will get the second level folder partitioned by the third column added.
        
## Next steps

Next, advance to learn more about copy from Azure Blob Storage to Lakehouse.

> [!div class="nextstepaction"]
> [Copy from Azure Blob Storage to Lakehouse](tutorial-pipeline-copy-from-azure-blob-storage-to-lakehouse.md)
