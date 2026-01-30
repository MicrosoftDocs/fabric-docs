---
title: Warehouse Snapshots
description: Learn about warehouse snapshots in Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: twcyril
ms.date: 11/10/2025
ms.service: fabric
ms.topic: concept-article
ms.search.form: Warehouse snapshot overview
---
# Warehouse snapshots

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

A warehouse snapshot is a read-only representation of a warehouse item at a specific point in time, retained to up to 30 days. To get started, [create a warehouse snapshot](create-manage-warehouse-snapshot.md).

Warehouse snapshots can be seamlessly "rolled forward" on demand, allowing consumers to connect to the same snapshot or use a consistent warehouse connection string to access a past version of the data. When the snapshot timestamp is rolled forward, updates are applied immediately, as if in a single, atomic transaction. Warehouse snapshot ensures that data engineers can provide analytical users with a consistent dataset, even as real-time updates occur. Analysts can run `SELECT` queries based on the snapshot without any ETL interference.

A snapshot can be useful in scenarios where an ETL process might have created data corruption. This read only child item provides stability and consistency for data that could otherwise be modified by some ETL processes.

## Decision guide for warehouse snapshot

This table compares the [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] of the Lakehouse to a warehouse snapshot.

| Feature             | [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] of the Lakehouse| Warehouse snapshot |
| --------------------| --------------------------------  |-------------------|
| Created | Automatically system generated | User-created child item of parent warehouse |
| Primary capabilities | Querying Delta tables in Lakehouse. Supports analytics on the Lakehouse Delta tables, and the Delta Lake folders referenced via [shortcuts](../onelake/onelake-shortcuts.md) | Query a point-in-time of parent warehouse | 
| Data modification    | Read-only  | Read-only |
| Storage format    | Delta  | No separate storage, relies on source warehouse, no parquet files |
| Data loading   | Spark, pipelines, dataflows, shortcuts| Data loaded into the parent warehouse |
| T-SQL support   | Full DQL (Data Querying Language), no DML (Data Manipulation Language), limited DDL (Data Definition Language) such as support for views, table valued functions | Full DQL, no DML, no DDL (except to updated snapshot timestamp by admin, member or contributor), no creation of views or table valued functions |
| Use cases    | Exploring and querying delta tables from the lakehouse, staging data, [medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md) with zones for bronze, silver, and gold analysis  | Access stable version of a warehouse, ETL consistency, historical analysis, reporting accuracy, meet specific business needs by creating hourly, daily, or weekly warehouse snapshots |

## Permissions

Security permissions must be set in the source database.

- A user with [workspace roles](security.md) of administrator, member, or contributor can create and manage a warehouse snapshot.
- A user with administrator, member, or contributor role can modify the snapshot timestamp via T-SQL and the Fabric portal.
- A user with administrator, member, contributor, viewer role on the workspace or a shared recipient on parent warehouse access can query the child snapshot. 

## Update snapshot timestamp

Updating the snapshot timestamp can provide analytical consumers a stable data version. In progress queries will always complete against the version of data that they were started against. When the snapshot timestamp is rolled forward, data updates are available immediately, with no latency or inconsistency in the data.

Users can update the timestamp of an existing warehouse snapshot at any time. This operation completes instantly.

To update the timestamp of a warehouse snapshot, see [update snapshot timestamp](create-manage-warehouse-snapshot.md#update-snapshot-timestamp).

When a T-SQL query is run, information about the current version of the data being accessed is included. For example, you can see the timestamp in the **Messages** of the [Fabric portal query editor](../database/sql/query-editor.md):

:::image type="content" source="media/warehouse-snapshot/current-version-of-data-being-accessed.png" alt-text="Screenshot from the Fabric portal query editor showing the Messages output of a query on a warehouse snapshot." lightbox="media/warehouse-snapshot/current-version-of-data-being-accessed.png":::

## Security and governance

- Snapshots inherit permissions from the source warehouse. Warehouse snapshots are read-only for all consumers regardless of their permission level in the source warehouse. The only exception is that the administrator/member/contributor can update the timestamp of the snapshot via TSQL or the Fabric portal.
- Any permission changes in the source warehouse apply instantly to the snapshot. User access such as GRANT, DENY, REVOKE, and UNMASK all reflect the state of the source warehouse regardless of the snapshot timestamp. 
    - Users are restricted from querying the snapshot if they lose access later.
    - As an example, if a consumer's permissions are denied from accessing data at 12:00pm, this applies to both the warehouse and the snapshot. If the snapshot timestamp is set to 11:00am, the denied privileges are enforced in the snapshot immediately.

> [!NOTE]
> The stable reporting promise in Fabric Data Warehouse applies to the data, not the schema. For example, if a report references a table, view, or column from a snapshot, and that object is later dropped, renamed or altered from the parent warehouse, the snapshot reflects that change. As a result, the report could break. This behavior is expected, as the snapshot mechanism is designed to preserve data consistency, not schema stability.

## Manage snapshots

- Warehouse snapshots require unique names, unique from the warehouse and SQL analytics endpoint.
- Warehouse snapshots don't exist without the source warehouse. When the warehouse is deleted, all snapshots are deleted. Warehouse snapshots must be recreated if the warehouse is restored.
- Warehouse snapshots are valid for up to 30 days in the past. Snapshot datetime can be set to any date in the past up to 30 days or database creation time (whichever is later).

## Remarks

- Modified tables, views, and stored procedures after the snapshot timestamp become invalid in the snapshot.
- Warehouse snapshots require Direct Query or Import mode in Power BI, and don't support [Direct Lake](../fundamentals/direct-lake-overview.md) mode.
- Warehouse snapshots aren't supported on the SQL analytics endpoint of the Lakehouse.
- Warehouse snapshots aren't supported as a source for OneLake shortcuts.

## Next step

> [!div class="nextstepaction"]
> [Create and manage a warehouse snapshot](create-manage-warehouse-snapshot.md)

## Related content

- [Query data as it existed in the past](time-travel.md)
- [Create a sample Warehouse in Microsoft Fabric](create-warehouse-sample.md)
