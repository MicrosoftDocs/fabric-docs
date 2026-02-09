---
title: Change data capture (CDC) in Copy Job
description: This article guides you through how to use CDC in copy job.
ms.reviewer: yexu
ms.topic: how-to
ms.date: 05/15/2025
ms.search.form: copy-job-tutorials
ms.custom: copy-job
---

# Change data capture (CDC) in Copy Job (Preview)

This article describes the change data capture (CDC) capability in Copy job and how to use it. 

## What is change data capture (CDC) in Copy job

Change data capture (CDC) in Copy job is a powerful capability in Fabric Data Factory that enables efficient and automated replication of changed data including inserted, updated, and deleted records from a source to a destination. This ensures your destination data stays up to date without manual effort, improving efficiency in data integration while reducing the load on your source system. 

## Key benefits of CDC in Copy job 

- Zero manual intervention: Automatically captures incremental changes (inserts, updates, deletes) directly from the source.   
- Automatic replication: Keeps destination data continuously synchronized with source changes.  
- Optimized performance: Processes only changed data, reducing processing time and minimizing load on the source. 
- Smarter incremental copy: Automatically detects CDC-enabled source tables and allows you to select either CDC-based or watermark-based incremental copy for each table.

## How it works: CDC-based vs. Watermark-based incremental copy

- CDC-based incremental copy: If your source database has CDC enabled, Copy job automatically captures and replicates inserts, updates, and deletes to the destination, applying the exact changes.
- Watermark-based incremental copy: If CDC isn't enabled on your source database, Copy job detects changes by comparing an incremental column (e.g., timestamp or ID) against the last run, then appends or merges the changed data to the destination based on your configuration.

## Supported connectors

Currently, CDC in Copy job supports the following source and destination data stores:

[!INCLUDE [copy-job-cdc-replication-connectors](includes/copy-job-cdc-replication-connectors.md)]

For SAP Datasphere Outbound, please go to [Change Data Capture from SAP via SAP Datasphere Outbound in Copy job](copy-job-tutorial-sap-datasphere.md) to learn more details.

## How to get started

Complete the following steps to create a new Copy job to ingest data from Azure SQL DB via CDC to another Azure SQL DB:

1. Ensure that change data capture (CDC) is enabled on your database and tables in the supported source store. In this case, it's Azure SQL DB.

   :::image type="content" source="media/copy-job/enable-cdc-db.png" alt-text="Screenshot showing how to enable cdc db.":::

   :::image type="content" source="media/copy-job/enable-cdc-tables.png" alt-text="Screenshot showing how to enable cdc tables.":::

   > [!NOTE]
   > - We suggest you enable CDC for all the tables mentioned above.
   > - Be sure supports_net_changes is enabled.
   > - All of the columns in the source table must be identified as captured columns as default.

   Learn more in [Enable and Disable change data capture - SQL Server | Microsoft Learn](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server).

1. Select **+ New Item**, choose the **Copy job** icon,  name your Copy job, and click **Create**.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job.":::

1. Choose the data stores to copy data from. In this example, choose **Azure SQL DB**.

   :::image type="content" source="media/copy-job/choose-data-source.png" alt-text="Screenshot showing where to choose a data source for the Copy job.":::

1. Enter your **server path** and **credentials** to connect to Azure SQL DB. You can copy data securely within a VNET environment using on-premises or VNET gateway. 

   :::image type="content" source="media/copy-job/enter-credentials-data-source.png" alt-text="Screenshot showing where to enter credentials.":::

1. You should have clear visibility of which source tables have CDC enabled. Select the **tables with CDC enabled** to copy.

    Tables with CDC enabled:
   :::image type="content" source="media/copy-job/cdc-table-icon.png" alt-text="Screenshot showing cdc table icon.":::

    Tables without CDC enabled:
   :::image type="content" source="media/copy-job/none-cdc-table-icon.png" alt-text="Screenshot showing none cdc table icon.":::

   :::image type="content" source="media/copy-job/select-cdc-tables.png" alt-text="Screenshot showing where to select cdc tables for the Copy job.":::

   > [!NOTE]
   > - Fabric Lakehouse tables cannot currently be detected for whether their CDF is enabled. 

1. Select your destination store. In this example, choose another **Azure SQL DB**.

   :::image type="content" source="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the Copy job.":::

1. The default **Update method** should be set to **Merge**, and the required key columns will match the primary key defined in the source store by default. 

   :::image type="content" source="media/copy-job/cdc-update-method.png" alt-text="Screenshot showing the update method for CDC.":::
   
1. Select **Incremental copy** and you'll see no Incremental column for each table is required to be input to track changes. 

   > [!NOTE]
   > Copy Job initially performs a full load and subsequently carries out incremental copies in subsequent runs via CDC.

   :::image type="content" source="media/copy-job/copy-job-cdc-mode.png" alt-text="Screenshot showing where to select the CDC.":::

1. Review the job summary, set the run option to on schedule, and click **Save + Run**.

   :::image type="content" source="media/copy-job/cdc-review-save.png" alt-text="Screenshot showing where to review and save the newly created Copy job.":::

   > [!NOTE]
   > Please ensure that your CDC log retention period is longer than the interval between scheduled runs; otherwise, the changed data captured by CDC might be lost if not processed within the retention period. 

1. Your copy job will start immediately. The first run will copy an initial full snapshot.
  
   :::image type="content" source="media/copy-job/monitor-cdc-initial-run.png" alt-text="Screenshot showing the Copy job panel where you can monitor initial full snapshot.":::

1. Update your source tables by inserting, updating, or deleting rows.

    :::image type="content" source="media/copy-job/update-rows.png" alt-text="Screenshot showing how to update rows.":::

1. Run the Copy job again to capture and replicate all changes, including inserted, updated, and deleted rows, to the destination.

   :::image type="content" source="media/copy-job/monitor-cdc-second-run.png" alt-text="Screenshot showing the Copy job panel where you can monitor capturing and replicating all changes.":::



## Known limitations
- When both CDC-enabled and non-CDC-enabled source tables are selected in a Copy Job, it treats all tables as watermark-based incremental copy.
- Custom capture instances aren't supported; only the default capture instance is supported.
- SCD2 isn't supported for CDC-enabled source datastore yet.
- DDL isn't supported yet in Copy job.
- Whether CDF is enabled or not on Fabric Lakehouse tables cannot be automatically detected.

## Related content

- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
