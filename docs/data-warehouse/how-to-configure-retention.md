---
title: How to Configure Data Retention in Fabric Data Warehouse
description: Learn how to configure data retention in Fabric Data Warehouse.
ms.reviewer: ajagadish
ms.date: 04/27/2026
ms.topic: how-to
---

# How to configure data retention in Fabric Data Warehouse

You can configure the [data retention period](data-retention.md) for a warehouse in Microsoft Fabric. This retention period determines how far back in time you can perform [time travel](time-travel.md) queries, create [table clones](clone-table.md), use [restore points](restore-in-place.md), and create [warehouse snapshots](warehouse-snapshot.md). 

## Permissions

- Any user who is a member of the **Admin** [workspace role](workspace-roles.md) can configure the data retention period for a warehouse.
- Users who are members of the **Member**, **Contributor**, or **Viewer** workspace roles can query the current retention setting but can't modify it.

## Configure data retention by using T-SQL

You can configure the data retention period for a warehouse by using the [ALTER DATABASE ... SET](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true) T-SQL syntax. You can use the [SQL query editor in the Fabric portal](sql-query-editor.md) or any T-SQL query tool to issue these commands. Specify the retention period in days between `1` and `120`.

```sql
ALTER DATABASE CURRENT
SET TIME_TRAVEL_RETENTION_PERIOD = <number_of_days> DAYS;
```

To set the retention period to 15 days, use the following example:

```sql
ALTER DATABASE CURRENT
SET TIME_TRAVEL_RETENTION_PERIOD = 15 DAYS;
```

To set the retention period to 1 day, use the following example:

```sql
ALTER DATABASE CURRENT
SET TIME_TRAVEL_RETENTION_PERIOD = 1 DAYS;
```

> [!NOTE]
> Only the Coordinated Universal Time (UTC) time zone is used for data retention calculations.

### Check the current retention setting

You can check the current data retention setting by using the following T-SQL query on the [sys.databases](/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=fabric&preserve-view=true) system catalog view:

```sql
SELECT 
   name, 
   time_travel_retention_period_days, 
   time_travel_retention_cutoff_date
FROM sys.databases;
```

## Related content

- [Data retention in Fabric Data Warehouse](data-retention.md)
- [Restore in-place of a warehouse in Microsoft Fabric](restore-in-place.md)
- [Query data as it existed in the past](time-travel.md)