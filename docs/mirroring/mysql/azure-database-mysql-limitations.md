---
title: "Limitations of Fabric Mirrored Databases From Azure Database for MySQL"
description: A detailed list of limitations for mirrored databases from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, maghan
ms.date: 03/16/2026
ms.topic: concept-article
ms.service: fabric
ms.subservice: mirroring
ai-usage: ai-assisted
---
# Limitations in Microsoft Fabric mirrored databases from Azure Database for MySQL

Current limitations in the [Microsoft Fabric mirrored databases](../mirroring/overview.md) from Azure Database for MySQL are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](../mirroring/azure-database-mysql-troubleshoot.md)

## Server level limitations

- Mirroring in Fabric is supported for MySQL versions 8.0, 8.4, and 9.0.
- All compute tiers (Burstable, General Purpose, and Business Critical) are supported.
- Mirroring in Fabric can't be configured on a Read Replica server, or on a Primary server where a Read Replica exists.
- Replication continues transparently during HA failover events for supported MySQL versions.
- Recovering a server with Mirroring in Fabric enabled via Point in Time Restore (PITR) requires Mirroring to be reconfigured on the new server.

## Database level limitations

- Fabric Mirroring for Azure Database for MySQL is only supported on a writable primary database.
- An Azure Database for MySQL database can only be mirrored to a single Fabric item at a time.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently can't be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list aren't mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you're prevented from selecting more than 500 tables.

## Permissions in the source database

<!-- Maintain similar content in docs\mirroring\azure-database-mysql-tutorial.md -->

- Permissions defined in Azure Database for MySQL aren't propagated to the replicated data in Fabric OneLake.
- To successfully configure Mirroring for Azure Database for MySQL, the database user used to connect to the source server must be granted the permissions needed for Fabric mirroring in the database. You must grant `REPLICATION CLIENT`, `REPLICATION SLAVE`, `SELECT`, and `SHOW VIEW` permissions to a new or existing user. For a sample script, see [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-tutorial.md#database-role-for-fabric-mirroring).
- The database user used also needs to have `SELECT` privileges on all tables in the source database.

## Network and connectivity security

- If your Flexible Server isn't publicly accessible and doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for MySQL via a private endpoint or is allowed by the firewall rule.
- The Azure Database for MySQL's [System Assigned Managed Identity (SAMI) needs to be enabled](/azure/mysql/flexible-server/how-to-azure-ad) and must be the primary identity.

## Table level

- DDL operations on existing mirrored tables aren't supported (add/remove column, change data type, etc.). Modify existing tables requires to stop and restart replication from the mirrored database in Microsoft Fabric.
- `TRUNCATE TABLE` commands on mirrored tables aren't supported.
- Mirroring is currently not supported for views, temporary tables, or partitioned tables.
- Tables without a primary key or unique index require full row image logging, which can impact performance.

## Column level

- Data in a **DECIMAL**/**NUMERIC** column exceeding precision of 38 won't be replicated in the mirrored database and will appear as `NULL`.
- If the source table contains columns with one of these data types, these columns can't be mirrored to Fabric OneLake. The following data types are currently unsupported for mirroring:
    - `BIT`
    - `GEOMETRY`
    - `POINT`
    - `LINESTRING`
    - `POLYGON`
    - `MULTIPOINT`
    - `MULTILINESTRING`
    - `MULTIPOLYGON`
    - `GEOMETRYCOLLECTION`
    - `ENUM`
    - `SET`

- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).

## Warehouse limitations

- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create a MySQL database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It's the same read-only experience. See [SQL analytics endpoint limitations](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

Mirroring for Azure Database for MySQL is available in all regions where Microsoft Fabric is available. See [Microsoft Fabric region availability](../admin/region-availability.md).

## Related content

- [Mirroring Azure Database for MySQL](../mirroring/azure-database-mysql.md)
- [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for MySQL](../mirroring/azure-database-mysql-tutorial.md)
- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](../mirroring/azure-database-mysql-troubleshoot.md)
