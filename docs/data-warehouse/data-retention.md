---
title: Data retention in Fabric Data Warehouse
description: Learn about data retention in Fabric Data Warehouse, including how retention works, how to configure it, scenarios, best practices, and impact on dependent features.
ms.reviewer: ajagadish
ms.date: 04/27/2026
ms.topic: concept-article
ms.search.form: Warehouse Data Retention
---
# Data retention in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], a warehouse automatically preserves and maintains various versions of the data based on the configured retention period. This retention period determines how far back in time you can perform [time travel](time-travel.md) queries, create [table clones](clone-table.md), use [restore points](restore-in-place.md), and create [warehouse snapshots](warehouse-snapshot.md). 

Data retention starts automatically when you create the warehouse. By default, warehouses retain data history for 30 calendar days. You can configure the retention period to any value between 1 and 120 days. The system automatically deletes expired files after the retention period ends.  

The warehouse retains all inserts, updates, and deletes within the configured retention period.

- **Increasing the retention period** provides a longer window for time travel queries, table clones at a past point in time, restore points, and warehouse snapshots. However, a longer retention period increases storage consumption and associated costs.
- **Decreasing the retention period** reduces storage costs but limits how far back you can query or recover historical data.

## How data retention works

When data is modified, the warehouse doesn't immediately discard the previous version state. Instead, the prior versions of the data are preserved as part of the Delta Lake transaction log. This versioning mechanism is what enables time travel, table clones, restore points, and warehouse snapshots to function.  

When historical data versions exceed the configured retention period, a background garbage collection process automatically removes the expired files from OneLake. This cleanup process runs asynchronously and doesn't affect active queries or ongoing transactions.

The warehouse measures the age of the retained data in absolute calendar days from the time the data version was created, including any time the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused.

## Retention period range

If you don't explicitly configure the retention period, existing warehouses use the default retention period of 30 calendar days. You can configure the data retention period from 1 to 120 days. 

## Configure data retention

Set the data retention period for a warehouse by using the [ALTER DATABASE ... SET](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true) T-SQL command. For steps and more information, see [How to configure data retention in Fabric Data Warehouse](how-to-configure-retention.md).

### Behavior when changing the retention period

Understanding the behavior when you change the retention period helps you plan changes to avoid unexpected data loss or storage size increases.

#### Increasing the retention period

When you increase the retention period, the new setting takes effect immediately. However, you can't recover historical data that the system already cleaned up under the previous shorter retention period. Only data versions that still exist in OneLake at the time of the change benefit from the extended retention period.

For example, if your warehouse currently has a 7-day retention period and you increase it to 60 days, the change applies from that point forward. Data versions already cleaned up by the system before the change (older than 7 days) cannot be recovered. However, all data versions still within the 7-day window at the time of the change, along with any newly created versions going forward, will be retained for up to 60 days.

#### Decreasing the retention period

When you decrease the retention period, data versions that now fall outside the new shorter retention period become eligible for cleanup. The cleanup process runs asynchronously in the background and doesn't happen instantaneously. Active queries that are already in progress aren't affected.

For example, if your warehouse has a 30-day retention period and you reduce it to 7 days, data versions between 8 and 30 days old become eligible for background cleanup.

> [!IMPORTANT]
> Decreasing the retention period is irreversible, from a data access perspective. 
> 
> Even if you increase the retention period again shortly afterward, data that fell outside the shorter window during that time can no longer be accessed. Before reducing the retention period, ensure that the new retention period meets your organization's data recovery and compliance requirements.

## Retention cutoff date

The `time_travel_retention_cutoff_date` column in the [sys.databases](/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=fabric&preserve-view=true) system catalog view reflects the **actual earliest date** from which time travel data is available, not the currently configured retention period. The oldest actual data can be different from the configured retention period.

The user-configured retention period defines how many days of history the system *should* preserve going forward. However, the **actual recoverable history** depends on what data was preserved before any retention changes.

Two situations cause a divergence between configured retention and actual available history:

- **Retention was reduced** — The warehouse immediately marks historical data older than the new retention period for garbage collection and permanently removes it.
- **Retention was subsequently increased** — The warehouse can't restore the deleted history. It must wait for new history to accumulate before the full configured window is available.

## Data retention scenarios

Consider the following scenarios when deciding how to configure your retention period:

### Compliance and auditing

Organizations with regulatory or compliance requirements might need to retain data for longer periods to satisfy audit obligations. Configuring a retention period of 90 or 120 days can provide a broader historical window for auditors to review data changes over time.

### Development and testing

For development or testing workspaces where historical data is less important, a shorter retention period of 1 to 7 days can reduce storage costs. This reduction is useful when the workspace is used for rapid prototyping or iterative development.

### Cost optimization

If your warehouse undergoes frequent large-scale data modifications (such as daily full loads), the volume of retained historical data can grow substantially. In these scenarios, reducing the retention period helps control storage costs while still maintaining a reasonable recovery window.

### Data recovery preparedness

For production warehouses, maintaining a longer retention period provides more flexibility for data recovery through [restore points](restore-in-place.md), [table clones](clone-table.md), and [time travel](time-travel.md) queries in the event of accidental data corruption.

## How configurable retention affects dependent features

The configured retention period applies uniformly across the following features in Fabric Data Warehouse. Changing the retention period directly impacts the availability and behavior of these features.

### Time travel

[Time travel](time-travel.md) allows you to query data as it existed at a past point in time within the retention period. The `FOR TIMESTAMP AS OF` query hint can retrieve data from any point within the configured retention period.

For example, if the retention period is set to 15 days, you can query data as it existed up to 15 calendar days in the past. 

### Clone table

[Table clones](clone-table.md) rely on the retention period. You can create a clone of a table at a past point in time only within the configured retention period. If you request a clone beyond the retention period, an error occurs.

### Restore points

Use [restore points to restore a warehouse](restore-in-place.md). The system retains both system-generated and user-defined restore points for the configured retention period. After the retention period expires, the system automatically deletes restore points.

- The warehouse automatically creates system-generated restore points every eight hours. These restore points are available for the configured retention period.
- User-defined restore points are available for the configured retention period. The system automatically deletes these restore points after expiry.

Fabric maintains a minimum number of restore points to ensure that sufficient restore points are always available.

### Warehouse snapshots

[Warehouse snapshots](warehouse-snapshot.md) can reference data within the configured retention period. The snapshot timestamp can be set to any point within the configured retention period or to the database creation time, whichever is later.

## Storage billing

Data retention directly affects OneLake storage consumption. Each retained version of data occupies storage space, and longer retention periods accumulate more historical versions.

While planning the retention configuration, consider the trade-off between the benefits of longer data history access and the associated storage costs. For more information on monitoring storage, see [Monitor using Capacity Metrics app](usage-reporting.md).

- **Retained data files**: Historical versions of data stored as parquet files in OneLake consume storage. The storage cost is proportional to the volume and frequency of data modifications in the retention period.
- **Restore points**: The metadata for system-generated and user-defined restore points also consumes storage. However, restore points primarily store metadata and reference existing data files, so their storage overhead is relatively small.
- **No compute charges for retention**: There are no compute charges incurred solely for retaining historical data. Compute charges apply only when you actively query or restore data.

To estimate the storage impact of a retention period change, consider:

- The average daily volume of data modifications in your warehouse.
- The current retention period and the proposed new retention period.
- The delta between the two periods multiplied by the average daily modification volume gives an approximate change in storage consumption.

## Design considerations

- Configure the retention period based on your organization's data recovery, compliance, and cost requirements. The default of 30 days provides a balance between data availability and storage cost for most workloads.
- Coordinate retention period changes with your backup and disaster recovery strategy. Ensure that the retention period aligns with your recovery point objectives (RPO).
- Monitor OneLake storage consumption after changing the retention period to understand the impact on storage costs.
- Plan retention period changes during low-activity periods when possible so that there is no user impact.
- The retention period is set at the warehouse level. If you need different retention periods for different datasets, consider organizing them into separate warehouses. Individual table-level retention settings are not currently supported.

## Limitations

- Specify the retention period in whole days. Fractional values aren't supported.
- Decreasing the retention period doesn't immediately reclaim storage. Cleanup of expired data occurs asynchronously in the background.
- Pausing the [!INCLUDE [product-name](../includes/product-name.md)] capacity affects garbage cleanup activity. The process doesn't remove historical data that's older than the current data retention settings while the capacity is paused. The cleanup activities catch up once the capacity resumes.
- The retention setting applies only to warehouses. The SQL analytics endpoint of the Lakehouse isn't supported.
- Query Insights and SQL audit logs aren't subject to this data retention policy and are managed separately.

## Dropped item retention (preview)

[Dropped item retention](../admin/item-recovery.md) preserves warehouses and their associated tables, schemas, snapshots, permissions, and saved queries for a configurable period after they are dropped or deleted. This ensures that accidental deletions do not result in permanent data loss or business-impacting outages. Dropped retention guarantees a minimum retention period of 7 calendar days, and has a separate tenant-level retention configuration. You can [configure the dropped item retention period in the **Item Recovery** tenant setting](../admin/item-recovery.md#set-up-the-retention-period-for-deleted-items).

## Next step

> [!div class="nextstepaction"]
> [How to configure data retention](how-to-configure-retention.md)

## Related content

- [Restore in-place of a warehouse in Microsoft Fabric](restore-in-place.md)