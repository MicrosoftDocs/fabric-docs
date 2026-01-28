---
title: How to create a Copy job in Data Factory
description: This article guides you through how to create a copy job, execute it, and view the results.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 06/19/2025
ms.search.form: copy-job-tutorials
ms.custom: copy-job, sfi-image-nochange
---

# Learn how to create a Copy job in Data Factory for Microsoft Fabric

The Copy job in Data Factory makes it easy to move data from your source to your destination without creating a pipeline. You can set up data transfers using built-in patterns for both batch and incremental copy, and copy once or on a schedule. Follow the steps in this article to start copying your data either from a [database](#create-a-copy-job-to-ingest-data-from-a-database) or from [storage](#create-a-copy-job-to-ingest-files-from-storage).

>[!TIP]
> [See a list of all supported connectors for Copy job here.](what-is-copy-job.md#supported-connectors)

## Create a Copy job to ingest data from a database

Follow these steps to set up a Copy job that moves data from a database:

1. [Create a new workspace](../fundamentals/create-workspaces.md) or use an existing workspace.
1. Select **+ New Item**, choose the **Copy job** icon,  name your Copy job, and select **Create**.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job.":::

1. Choose the database to copy data from. In this example, we're using **Azure SQL DB**.

   :::image type="content" source="media/copy-job/choose-data-source.png" lightbox="media/copy-job/choose-data-source.png" alt-text="Screenshot showing where to choose a data source for the Copy job.":::

1. For Azure SQL DB enter your **server path** and **credentials**. You can copy data securely within a virtual network environment using on-premises or virtual network gateway. For other databases, the connection details will vary.

   :::image type="content" source="media/copy-job/enter-credentials-data-source.png" lightbox="media/copy-job/enter-credentials-data-source.png" alt-text="Screenshot showing where to enter credentials.":::

1. Select the **tables** and **columns** to copy, or use a database query to copy subsets of your data. Use the search box to identify full tables and columns you want to copy, or select **+ New query** under Queries to write a custom query.

   :::image type="content" source="media/copy-job/select-tables-columns.png" lightbox="media/copy-job/select-tables-columns.png" alt-text="Screenshot showing where to select tables and columns for the Copy job.":::

1. Select your destination store. In this example, we're using another **Azure SQL DB**.

   :::image type="content" source="media/copy-job/select-destination-store.png" lightbox="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the Copy job.":::

1. (Optional) Choose **Update method** to decide how data gets written to your destination. If you pick **Merge**, select the Key columns that identify each row.

   :::image type="content" source="media/copy-job/update-method1.png" lightbox ="media/copy-job/update-method1.png" alt-text="Screenshot showing where to update method.":::

   :::image type="content" source="media/copy-job/update-method2.png" lightbox ="media/copy-job/update-method2.png" alt-text="Screenshot showing how to update method.":::

1. (Optional) Configure **table or column mapping** to rename tables or columns in the destination, or apply data type conversions. By default, data is copied with the same table name, column name, and data type as the source.

   :::image type="content" source="media/copy-job/specify-mappings.png" lightbox ="media/copy-job/specify-mappings.png" alt-text="Screenshot showing where to specify table mappings.":::

   :::image type="content" source="media/copy-job/specify-column-mappings.png" lightbox ="media/copy-job/specify-column-mappings.png" alt-text="Screenshot showing where to specify column mappings.":::

1. Choose a copy mode: Full data copy or Incremental copy. In this example, we use **Incremental copy**. Choose an Incremental column for each table, to track which rows have changed. You can use the preview button to find the right column. 

   > [!NOTE]
   > When you choose incremental copy mode, Copy job initially performs a full load and performs incremental copies in the next runs.

   :::image type="content" source="media/copy-job/copy-job-mode.png" lightbox="media/copy-job/copy-job-mode.png" alt-text="Screenshot showing where to select the Copy job mode.":::

1. Review the job summary, select your run option to run once or on a schedule, and select **Save + Run**.

   :::image type="content" source="media/copy-job/review-save.png" lightbox="media/copy-job/review-save.png" alt-text="Screenshot showing where to review and save the newly created Copy job.":::

1. Your Copy job will start immediately, and you can track the job's status from the inline monitoring panel that has information including row counts and copy duration for each table. Learn more in [How to monitor a Copy job](monitor-copy-job.md)

   :::image type="content" source="media/copy-job/monitor-run-history.png" lightbox="media/copy-job/monitor-run-history.png" alt-text="Screenshot showing the Copy job panel where you can monitor run history.":::

1. You can run your Copy job whenever you want, even if it's set to run on a schedule. Just select the **Run** button at any time, and Copy job copies only the data that's changed since the last run.

1. You can also edit your Copy job at any time, including adding or removing tables and columns to be copied, configuring the schedule, or adjusting advanced settings. Some changes, such as updating the incremental column, will reset the incremental copy to start from an initial full load in the next run.

    :::image type="content" source="media/copy-job/edit-copy-job.png" lightbox="media/copy-job/edit-copy-job.png" alt-text="Screenshot showing how to edit Copy job.":::

## Create a Copy job to ingest files from storage

Follow these steps to set up a Copy job that moves data from file storage:

1. [Create a new workspace](../fundamentals/create-workspaces.md) or use an existing workspace.
1. Select **+ New Item**, choose the **Copy job** icon, name your Copy job, and select **Create**.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job.":::

1. Choose the data stores to copy data from. In this example, we used **Azure Data Lake Storage Gen2**.

   :::image type="content" source="media/copy-job/choose-data-source1.png" lightbox="media/copy-job/choose-data-source1.png" alt-text="Screenshot showing where to choose a storage source for the Copy job.":::

1. To connect to Azure Data Lake Storage Gen2, enter your **Storage url** and **Credentials** to connect to Azure Data Lake Storage Gen2. For other data stores, the connection details will vary. You can copy data securely within a virtual network environment using on-premises or virtual network gateway.

   :::image type="content" source="media/copy-job/enter-credentials-data-source1.png" lightbox="media/copy-job/enter-credentials-data-source1.png" alt-text="Screenshot showing where to enter credentials for storage store.":::

1. Select the **folders** or **files** to copy. You can use the search box to find specific files or folders.

    >[!TIP]
    >**Schema agnostic (binary copy)** copies files to another data store without parsing the schema. This can significantly improve copy performance.

1. Select your destination store. In this example, we chose **Lakehouse**.

   :::image type="content" source="media/copy-job/select-destination-store1.png" lightbox="media/copy-job/select-destination-store1.png" alt-text="Screenshot showing where to select the storage destination store for the Copy job.":::

1. Select the **Folder path** in your destination storage. Choose **Preserve Hierarchy** to maintain the same folder structure as the source, or **Flatten Hierarchy** to place all files in a single folder.

   :::image type="content" source="media/copy-job/select-destination-folder.png" lightbox ="media/copy-job/select-destination-folder.png" alt-text="Screenshot showing how to select destination folder.":::

1. Choose a copy mode: Full data copy or Incremental copy. In this example, we use **Incremental copy** so that the Copy job will copy all files on the first run, and then copy only new or updated files in the next runs.

   :::image type="content" source="media/copy-job/copy-job-mode1.png" lightbox="media/copy-job/copy-job-mode1.png" alt-text="Screenshot showing where to select the Copy job mode for storage.":::

1. Review the job summary, select your run option to run once or on a schedule, and select **Save + Run**.

   :::image type="content" source="media/copy-job/review-save1.png" lightbox="media/copy-job/review-save1.png" alt-text="Screenshot showing where to review and save the newly created Copy job for storage.":::

1. Your Copy job will start immediately, and you can track the job's status from the inline monitoring panel that has information including row counts and copy duration for each table. Learn more in [How to monitor a Copy job](monitor-copy-job.md)

   :::image type="content" source="media/copy-job/monitor-run-history1.png" lightbox="media/copy-job/monitor-run-history1.png" alt-text="Screenshot showing the Copy job panel where you can monitor run history for moving data between storage.":::

1. You can re-run your Copy job whenever you want, even if it's set to run on a schedule. Just select the **Run** button at any time, and Copy job copies only the data that's changed since the last run.

1. You can also edit your Copy job at any time, including configuring the schedule, or adjusting advanced settings.

    :::image type="content" source="media/copy-job/edit-copy-job1.png" lightbox="media/copy-job/edit-copy-job1.png" alt-text="Screenshot showing how to edit Copy job for storage store.":::

## Known limitations

- Currently, incremental copy mode only works with some sources. For details, see [supported connectors for Copy job.](what-is-copy-job.md#supported-connectors)
- Row deletion can't be captured from a source store.
- When copying files to storage locations, empty files will be created at the destination if no data is loaded from the source.

## Related content

- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
