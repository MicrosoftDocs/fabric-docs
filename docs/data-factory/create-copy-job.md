---
title: How to create a Copy job (preview) in Data Factory
description: This article guides you through how to create a copy job, execute it, and view the results.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 08/30/2024
ms.search.form: copy-job-tutorials 
---

# Learn how to create a Copy job (preview) in Data Factory for Microsoft Fabric

This article describes how to use the Copy job in Data Factory for Microsoft Fabric.

## Prerequisites

- Enable the Copy job (preview) feature in your tenant.

  > [!NOTE]
  > Since the Copy job feature is still in preview, you need to enable it through your tenant administration. If you already see the Copy job, your tenant might already have the feature enabled.

  1. Navigate to the [Admin portal](https://msit.powerbi.com/admin-portal) and select **Tenant settings**.
  1. Under **Microsoft Fabric**, expand the **Users can create and use Copy job (preview)** section.
  1. Select **Apply**.

## Create a Copy job

Complete the following steps to create a new Copy job:

1. [Create a new workspace](../fundamentals/create-workspaces.md) or use an existing workspace.
1. Select **+ New Item**, and then choose the **Copy job (preview)** icon to create a new Copy job.

   :::image type="content" source="media/copy-job/create-new-copy-job.png" alt-text="Screenshot showing where to navigate to the Data Factory home page and create a new Copy job (preview).":::

1. Assign a name to the new job, then select **Create**.
1. Choose the data stores to copy data from.

   :::image type="content" source="media/copy-job/choose-data-source.png" lightbox="media/copy-job/choose-data-source.png" alt-text="Screenshot showing where to choose a data source for the Copy job.":::

1. Once you enter your credentials to connect to source stores, select the tables and columns you wish to copy.

   :::image type="content" source="media/copy-job/select-tables-columns.png" lightbox="media/copy-job/select-tables-columns.png" alt-text="Screenshot showing where to select tables and columns for the Copy job.":::

1. Select your destination store:

   :::image type="content" source="media/copy-job/select-destination-store.png" lightbox="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the Copy job.":::

1. Configure table or column mapping if you need.

   :::image type="content" source="media/copy-job/specify-mappings.png" lightbox ="media/copy-job/specify-mappings.png" alt-text="Screenshot showing where to specify table and column mappings.":::

1. Choose the copy mode, either a one-time full data copy, or continuous incremental copying.

   > [!NOTE]
   > - When you choose incremental copy mode, Data Factory _initially_ performs a full load and subsequently carries out incremental copies in subsequent runs.
   > - The **Incremental column** is specific to the incremental copy mode. This column in your source data helps identify changes. Each time, the Copy job saves the value from this column as a watermark, only copying rows where the **Incremental column** value exceeds the previous one.

   :::image type="content" source="media/copy-job/copy-job-mode.png" lightbox="media/copy-job/copy-job-mode.png" alt-text="Screenshot showing where to select the Copy job mode.":::

1. Review the job summary and save it.

   :::image type="content" source="media/copy-job/review-save.png" lightbox="media/copy-job/review-save.png" alt-text="Screenshot showing where to review and save the newly created Copy job.":::

1. In the Copy job panel, you can modify, execute, and track the job's status. The inline monitoring panel displays row counts read/written for the latest runs only. Select **Monitor run history** to view these metrics for past runs.

   :::image type="content" source="media/copy-job/monitor-run-history.png" lightbox="media/copy-job/monitor-run-history.png" alt-text="Screenshot showing the Copy job panel where you can monitor run history.":::

1. You can also see the data availability in the data destination.

   :::image type="content" source="media/copy-job/data-destination.png" lightbox="media/copy-job/data-destination.png" alt-text="Screenshot showing the data in the destination store after a Copy job operation.":::

## Known limitations

- Monitor button isn't available yet to see the aggregated read/written row counts per table and database in Copy job life-cycle.
- Configure Copy button isn't available yet for advanced settings including incremental copy without full load, override or upsert data in destination.
- Incremental copy mode can't work with Fabric Lakehouse as source.
- Row deletion can't be captured from source store.
- When copying files to storage locations, empty files will be created at the destination if no data is loaded from the source.

## Related content

- [What is the Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
