---
title: How to create a Copy job in Data Factory
description: This article guides you through how to create a copy job, execute it, and view the results.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 08/30/2024
ms.search.form: copy-job-tutorials 
---

# Learn how to create a Copy job in Data Factory for Microsoft Fabric

This article describes how to create the Copy job in Data Factory for Microsoft Fabric.

## Create a Copy job to ingest data from a database

Complete the following steps to create a new Copy job to ingest data from a database successfully and easily:

1. [Create a new workspace](../fundamentals/create-workspaces.md) or use an existing workspace.
1. Select **+ New Item**, choose the **Copy job** icon,  name your Copy job, and click **Create**.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job.":::
 
1. Choose the data stores to copy data from. In this example, choose **Azure SQL DB**. 

   :::image type="content" source="media/copy-job/choose-data-source.png" lightbox="media/copy-job/choose-data-source.png" alt-text="Screenshot showing where to choose a data source for the Copy job.":::

1. Enter your credentials to connect to Azure SQL DB. You can copy data securely within a VNET environment using on-premises or VNET gateway. 

   :::image type="content" source="media/copy-job/enter-credentials-data-source.png" lightbox="media/copy-job/enter-credentials-data-source.png" alt-text="Screenshot showing where to enter credentials.":::

1. Select the tables and columns to copy. Use the search box to quickly identify specific tables and columns you want to copy.

   :::image type="content" source="media/copy-job/select-tables-columns.png" lightbox="media/copy-job/select-tables-columns.png" alt-text="Screenshot showing where to select tables and columns for the Copy job.":::

1. Select your destination store. In this example, choose another **Azure SQL DB**.

   :::image type="content" source="media/copy-job/select-destination-store.png" lightbox="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the Copy job.":::

1. (Optional) Select update method on how you want to write data to the destination store. If choosing **Merge**, specify the required Key columns.

   :::image type="content" source="media/copy-job/update-method1.png" lightbox ="media/copy-job/update-method1.png" alt-text="Screenshot showing where to update method.":::
   
   :::image type="content" source="media/copy-job/update-method2.png" lightbox ="media/copy-job/update-method2.png" alt-text="Screenshot showing how to update method.":::

1. (Optional) Configure table or column mapping to rename tables or columns in the destination or apply data type conversions. By default, data is copied with the same table name, column name, and data type as the source. 

   :::image type="content" source="media/copy-job/specify-mappings.png" lightbox ="media/copy-job/specify-mappings.png" alt-text="Screenshot showing where to specify table mappings.":::
   
   :::image type="content" source="media/copy-job/specify-column-mappings.png" lightbox ="media/copy-job/specify-column-mappings.png" alt-text="Screenshot showing where to specify column mappings.":::

1. Choose a copy mode: Full data copy or Incremental copy. In this example, select **Incremental copy** and specify an Incremental column for each table to track changes. Learn more on [Incremental column](what-is-copy-job?#incremental-column). Use the preview button to help select the right Incremental column.

   > [!NOTE]
   > - When you choose incremental copy mode, Data Factory initially performs a full load and subsequently carries out incremental copies in subsequent runs.

   :::image type="content" source="media/copy-job/copy-job-mode.png" lightbox="media/copy-job/copy-job-mode.png" alt-text="Screenshot showing where to select the Copy job mode.":::

1. Review the job summary, set the run option (one-time or scheduled), and click **Save + Run**.

   :::image type="content" source="media/copy-job/review-save.png" lightbox="media/copy-job/review-save.png" alt-text="Screenshot showing where to review and save the newly created Copy job.":::

1. You can easily execute and track the job's status. Click the **Run** button to trigger the copy job immediately, no matter it's configured to run once or on a schedule.
  
   The inline monitoring panel clearly displays key metrics from the latest run in real time, including row counts and copy duration for each table, etc. Learn more in [How to monitor a Copy job](monitor-copy-job.md)

   :::image type="content" source="media/copy-job/monitor-run-history.png" lightbox="media/copy-job/monitor-run-history.png" alt-text="Screenshot showing the Copy job panel where you can monitor run history.":::

1. You can easily edit your Copy job, including adding or removing tables and columns to be copied, configuring the schedule, or adjusting advanced settings. Some changes, such as updating the incremental column, will reset the incremental copy to start from an initial full load in the next run.

    :::image type="content" source="media/copy-job/edit-copy-job.png" lightbox="media/copy-job/edit-copy-job.png" alt-text="Screenshot showing how to edit Copy job.":::


## Known limitations
- Incremental copy mode can't work with some data stores including Fabric Lakehouse as source yet. These will come soon.
- Row deletion can't be captured from source store.
- When copying files to storage locations, empty files will be created at the destination if no data is loaded from the source.

## Related content

- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
