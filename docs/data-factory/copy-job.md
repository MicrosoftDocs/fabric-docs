---
title: Copy job in Data Factory (Preview)
description: Learn about the Copy job (Preview) in Data Factory for Microsoft Fabric.
ms.reviewer: jburchel
ms.author: yexu
author: dearandyxu
ms.topic: conceptual
ms.date: 04/30/2024
---

# The Copy job in Data Factory for Microsoft Fabric (Preview)

Data Factory for Microsoft Fabric aims to simplify the process of data integration by providing a platform that enables users to visually integrate and transform data from 100+ built-in connectors (both as sources and destinations). The workload currently offers two top-level artifacts for users to start building data integration processes: data transformation with Dataflows Gen 2 and data orchestration with Data pipelines. Embedded inside Data pipelines, data movement with bulk/batch is represented in the Copy activity.

Despite the delivered embedded data movement experience inside Data pipelines, creating data integration processes in Data Factory still proves to be a challenge for many users that are unfamiliar with the space. Given that, we introduce the Copy job as a new top-level Fabric artifact to provide customers with a straightforward user experience that is scalable to add different data delivery styles including both batch copy and incremental copy.

With the Copy job, you get the following benefits:

- **Intuitive Experience**: With minimal complexities, the Copy job just helps you to copy your data easily.
- **Efficiency**: Incremental copy just works without any manual effort. With incremental copy, you can enjoy lower resource utilization and faster copy times.  
- **Adaption**: You're empowered to manipulate any of your data copying behavior including selecting tables and columns, data mapping, read/write behavior, flexible schedules on either copy once or on a recurring schedule.  

Supported data stores for both source and destination to begin with:  

- Azure SQL DB  
- On-premises SQL Server
- Fabric DW  
- Fabric LH Table  

More connectors will be available soon during the private preview, and will reach 100+ connectors before the public preview.

## How to get started

- Use the [DXT environment](https://dxt.powerbi.com).
- File any bugs you encounter with [this template](https://msdata.visualstudio.com/13ee5071-298b-4fbc-863a-5ffe8c09e915/_workitems/create/Bug?templateId=3779c4dc-3115-45e8-a8e9-6247200d0c71&ownerId=733fcf84-c496-4683-bd7a-434f75370756).

## Copy job tasks

1. Copy data once among supported data stores.
1. Copy data incrementally among supported data stores on a recurring schedule.
1. Edit a Copy job by deselecting tables and columns.
1. Edit a Copy job by doing data mapping and type conversion.
1. Monitor the Copy job to observe its metrics.

## Step by step walkthrough

1. Log into the [DXT environment](https://dxt.powerbi.com).
1. Select **Copy job (preview)**.

   :::image type="content" source="media/copy-job/copy-job.png" lightbox="media/copy-job/copy-job.png" alt-text="Screenshot showing where to select the Copy job (preview).":::

1. After providing a name for the job, you can connect to any of the supported data stores and provide your credentials to connect.

   :::image type="content" source="media/copy-job/choose-data-source.png" lightbox="media/copy-job/choose-data-source.png" alt-text="Screenshot showing where to choose the data source for your Copy job.":::

1. Next, select tables and columns to be copied.

   :::image type="content" source="media/copy-job/select-tables-columns.png" lightbox="media/copy-job/select-tables-columns.png" alt-text="Screenshot showing where to select the tables and columns to be copied in the job.":::

1. Select your destination store and provide its credentials.

   :::image type="content" source="media/copy-job/select-destination-store.png" lightbox="media/copy-job/select-destination-store.png" alt-text="Screenshot showing where to select the destination store for the copy job.":::

1. Configure table mapping or column mapping if needed.

   :::image type="content" source="media/copy-job/specify-mappings.png" lightbox="media/copy-job/specify-mappings.png" alt-text="Screenshot showing where to specify table or column mappings for the job.":::

1. Select the copy mode, either **Full copy** or **Incremental copy continuously**.

   :::image type="content" source="media/copy-performance-sql-databases/copy-job-settings.png" alt-text="Screenshot of the Copy job Settings page with the Copy data once option selected." lightbox="media/copy-performance-sql-databases/copy-job-settings.png":::

1. Select **Run** on the Home toolbar at the top of the editor to copy your data.

   :::image type="content" source="media/copy-job/run-job.png" lightbox="media/copy-job/run-job.png" alt-text="Screenshot showing where to select Run to start the copy job.":::

1. Finally, check your destination store to validate the data was copied as expected.

## Related content

Stay updated with the latest Data Factory features and announcements at the [Fabric Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory).
