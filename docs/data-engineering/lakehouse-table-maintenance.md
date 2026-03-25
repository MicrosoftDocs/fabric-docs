---
title: Delta Table Maintenance in Microsoft Fabric
description: Learn how to run Delta table maintenance in Lakehouse, choose the right maintenance action, and track maintenance jobs in Microsoft Fabric.
ms.reviewer: dacoelho
ms.date: 03/01/2026
ms.topic: how-to
ms.search.form: lakehouse table maintenance delta lake tables
ai-usage: ai-assisted
---

# Run Delta table maintenance in Lakehouse

Run table maintenance on Delta tables to keep them healthy over time by compacting small files, applying read optimizations, and removing obsolete files that are no longer referenced. 

You can run maintenance either as an ad hoc operation in the Fabric portal (Lakehouse table **Maintenance** action) or as a scheduled and orchestrated process by using notebooks, pipelines, or REST API. This article focuses on the ad hoc portal workflow.

For cross-workload maintenance guidance, including recommendations for SQL analytics endpoint, Power BI Direct Lake, and Data Warehouse consumers, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md). For code-first maintenance patterns, see [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md) and [Manage the Lakehouse with Microsoft Fabric REST API](lakehouse-api.md).

## Run table maintenance from Lakehouse

Table maintenance in Lakehouse applies only to Delta tables. Legacy Hive tables that use formats such as Parquet, ORC, AVRO, or CSV aren't supported.

In the **Run maintenance commands** dialog, choose options based on your goal.

As a general practice, run maintenance after major ingestion or update activity, or when you observe many small files and slower read performance.

1. From your Microsoft Fabric account, navigate to the desired Lakehouse.
1. In Lakehouse Explorer, under **Tables**, right-click the target table (or use the ellipsis).
1. Select the **Maintenance** menu entry.

   :::image type="content" source="media/table-maintenance/table-maintenance.png" alt-text="Screenshot showing the Run maintenance commands dialog." lightbox="media/table-maintenance/table-maintenance.png":::

1. In the **Run maintenance commands** dialog, choose the maintenance options:
   - Select the **OPTIMIZE** checkbox to compact small Parquet files into larger files for more efficient reads.
    - If **OPTIMIZE** is selected, you can also select the **Apply V-Order** checkbox. When you select this option, Fabric applies V-Order (optimized sorting, encoding, and compression) as part of optimize.

       > [!NOTE]
       > V-Order has about a 15% impact on average write times. It can also provide up to 50% more compression.

   - Select the **Run VACUUM** checkbox to run the Delta Lake `VACUUM` command and remove unreferenced files older than your retention threshold. For retention behavior and safety details, see [Vacuum retention settings](#vacuum-retention-settings).
1. Select **Run now** to execute the table maintenance job.
1. Track job execution in either of these places:
   - **Notifications** pane (bell icon in the Fabric portal header) for immediate run status.
   - **Monitoring hub** (select **Monitor** in the left navigation) for full job details. Look for activities that contain `TableMaintenance` in the activity name.

After you run maintenance, success appears as a completed table maintenance activity in Notifications and as a successful `TableMaintenance` entry in Monitoring hub.

For more information about Monitoring hub navigation and filters, see [Use the Monitoring hub](../admin/monitoring-hub.md).

## Vacuum retention settings

The `VACUUM` command removes files that are no longer referenced by the Delta log and that are older than your retention threshold. The default retention threshold is seven days.

Using a shorter retention interval can reduce Delta time-travel history and can affect concurrent readers or writers. Fabric portal and API maintenance requests fail by default for retention intervals under seven days.

If you must use a retention interval under seven days, set `spark.databricks.delta.retentionDurationCheck.enabled` to `false` in the Spark properties of the Fabric environment used by your workspace Spark workloads. To learn where to configure and attach environments, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md) and [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Manage the Lakehouse with Microsoft Fabric REST API](lakehouse-api.md)
