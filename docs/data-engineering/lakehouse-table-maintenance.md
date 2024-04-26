---
title: Use table maintenance feature to manage delta tables in Fabric
description: Learn about the Lakehouse Delta table maintenance feature. It allows you to efficiently manage delta tables and to keep them always ready for analytics.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 04/26/2024
ms.search.form: lakehouse table maintenance delta lake tables
---

# Use table maintenance feature to manage delta tables in Fabric

The [Lakehouse](lakehouse-overview.md) in Microsoft Fabric provides the *Table maintenance* feature to efficiently manage delta tables and to keep them always ready for analytics. This guide describes the table maintenance feature in Lakehouse and its capabilities.

Key capabilities of the lakehouse table maintenance feature:

* Perform ad-hoc table maintenance using contextual right-click actions in a delta table within the Lakehouse explorer.
* Apply bin-compaction, V-Order, and unreferenced old files cleanup.

> [!NOTE]
> For advanced maintenance tasks, such as grouping multiple table maintenance commands, orchestrating it based on a schedule, a code-centric approach is the recommended choice. To learn more, see [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md) article.
> It is also possible to use the Lakehouse API to automate table maintenance operations, to learn more see [Manage the Lakehouse with Microsoft Fabric REST API](lakehouse-api.md).

## Supported file types

__Lakehouse table maintenance__ applies only to delta Lake tables. The legacy Hive tables that use PARQUET, ORC, AVRO, CSV, and other formats aren't supported.

## Table maintenance operations

The table maintenance feature offers three operations.

* **Optimize**: Consolidates multiple small Parquet files into large file. Big Data processing engines, and all Fabric engines, benefit from having larger files sizes. Having files of size above 128 MB, and optimally close to 1 GB, improves compression and data distribution, across the cluster nodes. It reduces the need to scan numerous small files for efficient read operations. It's a general best practice to run optimization strategies after loading large tables.
* **V-Order**: Applies optimized sorting, encoding, and compression to Delta parquet files to enable fast read operations across all the Fabric engines. V-Order happens during the optimize command, and is presented as an option to the command group in the user experience. To learn more about V-Order, see [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md).
* **Vacuum**: Removes old files no longer referenced by a Delta table log. Files need to be older than the retention threshold, and the default file retention threshold is seven days. The retention period remains same regardless of the Fabric compute engine you are using. This maintenance is important to optimize storage cost. Setting a shorter retention period impacts Delta's time travel capabilities. It's a general best practice to set a retention interval to at least seven days, because old snapshots and uncommitted files can still be in use by the concurrent table readers and writers. Cleaning up active files with the VACUUM command might lead to reader failures or even table corruption if the uncommitted files are removed.

## Execute ad-hoc table maintenance on a Delta table using Lakehouse

How to use the feature:

1. From your Microsoft Fabric account, navigate to the desired Lakehouse.
1. From the Lakehouse explorer's **Tables** section, either right-click on the table or use the ellipsis to access the contextual menu.
1. Select the **Maintenance** menu entry.
1. Check the maintenance options in the dialog per your requirement. For more information, see the [Table maintenance operations](#table-maintenance-operations) section of this article.
1. Select **Run now** to execute the table maintenance job.
1. Track maintenance job execution by the notifications pane, or the Monitoring Hub experience.

   :::image type="content" source="media\table-maintenance\table-maintenance.png" alt-text="Screenshot showing the load to tables dialog box with filled table name." lightbox="media\table-maintenance\table-maintenance.png":::

## How does table maintenance work?

After **Run now** is selected, a Spark maintenance job is submitted for execution.

1. The Spark job is submitted using the user identity and table privileges.
1. The Spark job consumes Fabric capacity of the workspace/user that submitted the job.
1. If there is another maintenance job running on a table, a new one is rejected.
1. Jobs on different tables can execute in parallel.
1. Table maintenance jobs can be easily tracked in the Monitoring Hub. Look for "TableMaintenance" text within the activity name column in the monitoring hub main page.

## Related content

- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Manage the Lakehouse with Microsoft Fabric REST API](lakehouse-api.md)
- [CSV file upload to Delta for Power BI reporting](get-started-csv-upload.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
