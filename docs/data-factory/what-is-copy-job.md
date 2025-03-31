---
title: What is Copy job in Data Factory
description: This article explains the concept of the Copy job and the benefits it provides.
author: dearandyxu
ms.author: yexu
ms.topic: how-to
ms.date: 08/30/2024
ms.search.form: copy-job-tutorials 
---

# What is the Copy job in Data Factory for Microsoft Fabric

Data Factory in Fabric empowers users to seamlessly integrate data from over 100 built-in connectors - both sources and destinations - through a visually intuitive interface. The Copy activity, working within data pipelines, facilitates data ingestion. Meanwhile, Dataflow Gen2 supports data transformations, and pipelines orchestrate the flow of integration.

## Advantages of the Copy job

While the Copy activity within data pipelines handles data ingestion with bulk/batch operations, creating data pipelines in Data Factory still proves to challenge for many users that are new to the field, with a steeper learning curve. So, we're thrilled to introduce the Copy job, elevating the data ingestion experience to a more streamlined and user-friendly process from any source to any destination. Now, copying your data is easier than ever before. Moreover, Copy job supports various data delivery styles, including both batch copy and incremental copy, offering flexibility to meet your specific needs.

:::image type="content" source="media/copy-job/monitor-copy-job.png" lightbox="media/copy-job/monitor-copy-job.png" alt-text="Screenshot showing the Copy job and its results pane.":::

Some advantages of the Copy job over other data movement methods include:

- **Intuitive Experience**: Experience seamless data copying with no compromises, making it easier than ever.
- **Efficiency**: Enable incremental copying effortlessly, reducing manual intervention. This efficiency translates to less resource utilization and faster copy durations.
- **Flexibility**: While enjoying the simplicity, you also have the flexibility to control your data movement. Choose which tables and columns to copy, map the data, define read/write behavior, and set schedules that fit your needs, whether for a one-time task or recurring operation.
- **Robust performance**: A serverless setup enabling data transfer with large-scale parallelism, maximizing data movement throughput for your system. 

## Supported connectors

Currently, you can use the Copy job for cloud data transfer or copying data from an on-premises data store via gateway. The Copy job supports the following data stores as both source and destination:

| Connector | Source | Destination | Full copy | Incremental copy (Preview) | On-premises data gateway |
| --- | --- | --- | --- | --- | --- | 
| Azure SQL DB | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Oracle | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| On-premises SQL Server | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Fabric Warehouse | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Fabric Lakehouse table | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Fabric Lakehouse file | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Amazon S3 | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure Data Lake Storage Gen2 | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure Blob Storage | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure SQL Managed Instance | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Snowflake | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure Synapse Analytics | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure Data Explorer | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure PostgreSQL | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| Google Cloud Storage | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| MySQL | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| Azure MySQL | <!--Copy Job (source)-->:::image type="icon" source="media/data-pipeline-support/yes.png":::  | <!--Copy Job (destination)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--Copy Job (Batch)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--Copy Job (Incremental)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--Copy Job (On-premises )-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |

> [!NOTE]
> - Some connectors don't yet support incremental copy, but those will be available soon.
> - The product team is exploring more connector support in a quick way, so [stay tuned for updates](../fundamentals/whats-new.md).


## Copy behavior

You can choose from the following data delivery styles.

- **Full copy mode**: Each copy job run copies all data from the source to the destination at once.  
- **Incremental copy mode**: The initial job run copies all data, and subsequent job runs only copies changes since the last run. The changed data is appended to your destination store.

   > [!NOTE]
   > Incremental copy mode is still in Preview.

You can also choose how data is written to your destination store.

By default, Copy Job **appends** data to your destination, so that you won't miss any change history. But, you can also adjust the update method to **merge** or **overwrite**. When performing a merge, you need to provide a key column. By default, the primary key is used if it has.

- When copy data to storage store: New rows from the tables or files are copied to new files in the destination. If a file with the same name already exists on target store, it will be overwritten.
- When copy data to database: New rows from the tables or files are appended to destination tables. You can change the update method to merge (on SQL DB or SQL Server) or overwrite (on Fabric Lakehouse tables).

## Incremental column

In incremental copy mode, you need to select an incremental column for each table to identify changes. Copy Job uses this column as a watermark, comparing its value with the same from last run in order to copy the new or updated data only. The incremental column has to be a timestamp or an increasing INT.

## Region availability

The Copy job has the same regional availability as the pipeline.

## Pricing

The Copy job uses the same billing meter: **Data Movement**, with an identical consumption rate.

## Related Content

- [How to create a Copy job](create-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
