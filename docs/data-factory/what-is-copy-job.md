---
title: What is Copy job in Data Factory
description: This article explains the concept of the Copy job and the benefits it provides.
ms.reviewer: yexu
ms.topic: how-to
ms.date: 06/13/2025
ms.search.form: copy-job-tutorials 
ms.custom: copy-job
ai-usage: ai-assisted
---

# What is Copy job in Data Factory for Microsoft Fabric?

Copy Job is the go-to solution in Microsoft Fabric Data Factory for simplified data movement from many sources to many destinations — no pipelines required. With native support for multiple delivery styles, including bulk copy, incremental copy, and change data capture (CDC) replication, Copy job offers the flexibility to handle a wide range of data movement scenarios — all through an intuitive, easy-to-use experience. Whether you’re new to data integration or just want a faster way to get your data where it needs to go, Copy job offers a flexible and user-friendly solution.

## Advantages 

Some advantages of the Copy job over other data movement methods include:

- **Easy to use**: Set up and monitor data copying with a simple, guided experience — no technical expertise needed.
- **Efficient**: Copy only new or changed data from the last run to save time and resources, with minimal manual steps.
- **Flexible**: Choose which data to move, map columns, set how data is written, and schedule jobs to run once or regularly.
- **High performance**: Move large amounts of data quickly and reliably, thanks to a serverless, scalable system.

:::image type="content" source="media/copy-job/monitor-copy-job.png" lightbox="media/copy-job/monitor-copy-job.png" alt-text="Screenshot showing the Copy job and its results pane.":::

You can also visit the [data movement strategy](/fabric/data-factory/decision-guide-data-movement) to see how Copy job compares with Mirroring and copy activity in pipelines. 

## Concepts

### Copy modes (Full copy, Incremental copy)

You can choose how your data is copied from source to destination:

- **Full copy**: Every time the job runs, it copies all data from your source to your destination. 
- **Incremental copy**: The first run copies everything, and subsequent runs only move new or changed data since the last run.

### Incremental copy (CDC, Watermark) 

In incremental copy, every run after the initial full copy only transfers changes: 
- Databases: Only new or updated rows are copied. If Change Data Capture (CDC) is enabled, inserted, updated, and deleted rows are included. 
- Storage: Only files with a newer LastModifiedTime are copied. 

Copy job automatically tracks and manages the state of the last successful run, so it knows what data to copy next. 
- Databases: You need to select an incremental column for each table. This column acts as a marker, telling Copy job which rows are new or updated since the last run. Typically, the column is a date/time value or an increasing number. If your database has CDC enabled, you don’t need to choose a column — Copy job automatically detects the changes. 
- Storage: Copy job compares the LastModifiedTime of files in your source storage with the values recorded in the last run. Only files with newer timestamps are copied. 

See more details for [Change data capture (CDC) in Copy Job](/fabric/data-factory/cdc-copy-job).

When a copy job fails, you don’t need to worry about data loss. Copy job always resumes from the state of the last successful run. A failure does not change the state managed by copy job. 

### Update methods (Append, Overwrite, Merge) 

You can also decide how data is written to your destination:

By default, Copy job **appends** new data, so you keep a full history. If you prefer, you can choose to **merge** (update existing rows using a key column) or **overwrite** (replace existing data). If you select merge, Copy job uses the primary key by default, if one exists.

- When copying to a database: New rows are added to your tables. For supported databases, you can also choose to merge or overwrite existing data.
- When copying to storage: New data is saved as new files. If a file with the same name already exists, it's replaced.

When performing an incremental copy from the source and merging into the destination, rows from the source are inserted or updated in the destination. When performing CDC replication from the source and merging into the destination, rows from the source are inserted, updated, or deleted in the destination.

### Reset incremental copy

You have the flexibility in managing incremental copy, including the ability to reset it back to a full copy on the next run. This is incredibly useful when there’s a data discrepancy between your source and destination—you can simply let Copy Job perform a full copy in the next run to resolve the issue, then continue with incremental updates afterward.

You can reset incremental copy either per entire job or per table, giving you fine-grained control. For example, you can re-copy smaller tables without impacting larger ones. This means smarter troubleshooting, less disruption, and more efficient data movement. 

In some cases, when you edit a copy job — for example, updating the incremental column in your source table — Copy job will reset the incremental copy to a full copy on the next run. This ensures data consistency between the source and the destination.  

### Automatic table creation and truncate on destination

Copy job can automatically create tables in the destination if they don’t already exist. If the destination tables are already available, you can simply select them as your target. With flexible column mapping options, you can easily define how to map schemas from the source tables to the destination tables.

You can also optionally truncate destination data before the full load, ensuring their source and destination are fully synchronized without duplicates.

By default, Copy job does not delete any data in destination. When you enable this option:

- The first run of incremental copy will truncate all data in the destination before loading the full dataset.
- Subsequent incremental copies will continue to append or merge data without affecting existing records.
- If customers later reset incremental copy to full copy, enabling this option will again clear the destination before loading.

This approach ensures that your destination remains clean, fully synchronized, and free of duplicates, providing a reliable foundation for their data ingestion solution.

[!INCLUDE [copy-job-auto-table-creation-truncate-connectors](includes/copy-job-auto-table-creation-truncate-connectors.md)]

### Run options (Run, Schedule, Event Trigger)

You have full flexibility to decide when a copy job runs — it can **run once** or on a **schedule**. Even if a job is scheduled, you can still click **Run** at any time to trigger it manually. In incremental copy, the manually triggered job will still only transfer changes since the last run. 

With support for **multiple schedules** in copy job, you gain even greater control. A single copy job can have multiple schedules—for example, one running daily at 6 AM and another running weekly on Sundays. All schedules can be managed directly within the same copy job, making orchestration simpler, cleaner, and more efficient. 

If you use the copy job activity in a pipeline, you can also take advantage of the pipeline’s orchestration and trigger capabilities. For example, you can use **event triggers** to start a copy job activity when specific events occur, such as new files arriving in a data lake or changes in a database. 

See more details for [copy job activity](/fabric/data-factory/copy-job-activity).


### Hosting options (VNet, On-Premises, Cloud)

You can use Copy job to move data from any source to any destination, whether your data is on-premises, in the cloud, or within a virtual network. On the connection page of Copy job, you can choose from multiple host options, including an on-premises gateway or a VNet gateway, to securely access data behind a firewall or within a VNet. 

See more details to [Secure your data movement with Copy Job and Virtual Network Data Gateway](/fabric/data-factory/copy-job-with-virtual-network-data-gateway).


### Operationalization（GIT/CICD, Variable library） 

You can use source control, continuous integration, continuous deployment, and a collaborative environment to run successful data analytics projects with Copy job.  

Additionally, with Variable library support, you can parameterize connections in Copy Job. This powerful capability streamlines CI/CD by externalizing connection values, enabling you to deploy the same Copy Job across multiple environments while the Variable library injects the correct connection for each stage. 

See more details in [CI/CD for Copy job](/fabric/data-factory/cicd-copy-job).

### Observability

See more details in [How to monitor a Copy job](monitor-copy-job.md).

## Region availability

Copy job has the same [regional availability as Fabric](../admin/region-availability.md).

## Pricing

You can get the details in [**pricing Copy job**](pricing-copy-job.md).

## Supported connectors

With Copy job, you can move your data between cloud data stores or from on-premises sources that are behind a firewall or inside a virtual network using a gateway.

See our [supported connectors](copy-job-connectors.md) page for the full list of supported sources and destinations:

- [Sources and destinations](copy-job-connectors.md#copy-job-sources-and-destinations)
- [Change data capture (CDC) replication (Preview)](copy-job-connectors.md#cdc-replication-preview)

Submit your feedback on [Fabric Ideas](https://community.fabric.microsoft.com/t5/Fabric-Ideas/idb-p/fbc_ideas/label-name/data%20factory%20%7C%20copy%20job) and join the conversation on the [Fabric Community](https://community.fabric.microsoft.com/t5/Copy-job/bd-p/db_copyjob).

## Related content

- [How to create a Copy job](create-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
