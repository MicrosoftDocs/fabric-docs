---
title: "Limitations of Fabric Mirrored Databases From SQL Server"
description: A detailed list of limitations for mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj, rajpo, whhender
ms.date: 01/12/2026
ms.topic: concept-article
ms.custom:
  - references_regions
---
# Limitations in Microsoft Fabric mirrored databases from SQL Server

This article lists current limitations in [Microsoft Fabric mirrored databases](overview.md) from SQL Server. This article is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](troubleshooting.md)
- [Troubleshoot Fabric mirrored databases From SQL Server](sql-server-troubleshoot.md)

## Platform limitations

- Fabric Mirroring for SQL Server 2025 isn't currently supported for SQL Server 2025 instances running in an Azure Virtual Machine.
- Fabric Mirroring for SQL Server 2025 isn't currently supported in SQL Server on Linux.

## Database level limitations

- Fabric Mirroring for SQL Server is only supported on a primary database of an availability group.
    - Fabric Mirroring is currently not supported on a failover cluster instance.
- The SQL Server database cannot be mirrored if the database already has been configured for Azure Synapse Link for SQL or the database is already mirrored in another Fabric workspace.
  - You can't mirror a database in a SQL Server 2025 instance if Change Data Capture (CDC) is enabled on the source database.
- You can mirror up to 500 tables into Fabric. You can't currently replicate any tables above the 500 limit.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. Mirroring doesn't include the remaining set of tables at the bottom of the alphabetical list.
  - If you clear **Mirror all data** and select individual tables, you can't select more than 500 tables.
- `.dacpac` deployments to SQL Server require the publish property `/p:DoNotAlterReplicatedObjects=False` to enable modifications to any mirrored tables. For more about publish settings available for `.dacpac` deployments, see the [SqlPackage publish documentation](/sql/tools/sqlpackage/sqlpackage-publish).
- Fabric Mirroring from SQL Server 2025 isn't supported when the following features are enabled:
  - Replication
  - CDC
    - Fabric Mirroring from SQL Server 2016-2022 requires CDC. Review [Known Issues and Limitations with CDC](/sql/relational-databases/track-changes/known-issues-and-errors-change-data-capture?view=sql-server-ver17&preserve-view=true).
    
- You can't mirror a SQL Server database if you enable [delayed transaction durability](/sql/relational-databases/logs/control-transaction-durability?view=sql-server-ver17&preserve-view=true) for the database.

## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security?view=sql-server-ver17&preserve-view=true) is supported, but permissions aren't currently propagated to the replicated data in Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=sql-server-ver17&preserve-view=true), for example granting permissions to certain columns, aren't currently propagated to the replicated data in Fabric OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17&preserve-view=true) settings aren't currently propagated to the replicated data in Fabric OneLake.
- To successfully configure Mirroring for SQL Server, grant the principal used to connect to the source SQL Server the permission **ALTER ANY EXTERNAL MIRROR**. This permission is included in higher level permissions like **CONTROL** or the **db_owner** role.
- When setting up CDC for SQL Server versions 2016-2022, an admin needs membership in the sysadmin server role to initially set up CDC. Any future CDC maintenance will require membership in the sysadmin server role. Mirroring will use CDC if it is already enabled for the database and tables that need to be mirrored. If CDC is not already enabled, the [Tutorial: Configure Microsoft Fabric Mirroring from SQL Server](sql-server-tutorial.md) configures the `fabric_login` login to temporarily be a member of the sysadmin server role for the purposes of configuring CDC. If CDC already exists, you do not need to temporarily add `fabric_login` to the server sysadmin role.

## Network and connectivity security

- Don't remove the SQL Server service principal name (SPN) contributor permissions from the Fabric mirrored database item.
- Mirroring across [Microsoft Entra](/entra/fundamentals/new-name) tenants isn't supported where a SQL Server instance and the Fabric workspace are in separate tenants.
- Microsoft Purview Information Protection/sensitivity labels defined in SQL Server aren't cascaded and mirrored to Fabric OneLake.

## Table level

- You can't mirror tables with a primary key or a clustered index (when a primary key doesn't exist) on unsupported types. Unsupported types include **computed columns**, **user-defined types**, **geometry**, **geography**, **hierarchy ID**, **SQL variant**, **timestamp**, **datetime2(7)**, **datetimeoffset(7)**, and **time(7)**.
- Delta lake supports only six digits of precision.
      - Columns of SQL type **datetime2** with precision of 7 fractional second digits don't have a corresponding data type with the same precision in Delta files in Fabric OneLake. Precision is lost if you mirror columns of this type, the seventh decimal second digit is trimmed.
  - The **datetimeoffset(7)** data type doesn't have a corresponding data type with the same precision in Delta files in Fabric OneLake. Precision is lost (loss of time zone and seventh time decimal) if you mirror columns of this type.
- Clustered columnstore indexes aren't currently supported.
- If one or more columns in the table are of type Large Binary Object (LOB) with a size greater than 1 MB, Fabric OneLake truncates the column data to size of 1 MB.
- You can't mirror source tables that use any of the following features:
    - Temporal history tables and ledger history tables  
    - Always Encrypted
    - In-memory tables
    - Graph  
    - External tables  
- You can't perform the following table-level data definition language (DDL) operations on SQL database source tables when enabled for mirroring. 
    - Switch, split, or merge partition
    - Alter primary key
- Currently, you can't mirror a table if it has the **json** or **vector** data type.
    - Currently, you can't alter a column to use the **vector** or **json** data type when a table is mirrored.
- In SQL Server 2025, when there's a DDL change, a complete data snapshot restarts for the changed table, and data is reseeded.
- In SQL Server 2016-2022, when there's a DDL change, mirroring fails with the following error:

   "Table 'SCHEMA.TABLE' definition has changed since CDC was enabled. Please re-enable CDC (EXEC sys.sp_cdc_disable_table @source_schema = N'SCHEMA', @source_name = TABLE', @capture_instance = N'SCHEMA_TABLE'; EXEC sys.sp_cdc_enable_table @source_schema = N'SCHEMA', @source_name = TABLE', @role_name = NULL, @capture_instance = N'SCHEMA_TABLE', @supports_net_changes = 1;)"
    
   To resume mirroring, stop and restart CDC by using the `sys.sp_cdc_disable_table` and `sys.sp_cdc_enable_table` commands provided in the error message. The table then resets with a new snapshot.
- When mirroring SQL Server 2016-2022, you can't mirror a table if it doesn't have a primary key.

## Column level

- Fabric Mirroring from SQL Server doesn't replicate the following data types:
     - **CLR**
     - **vector**
     - **json**
     - **geometry**
     - **geography**
     - **hierarchyid**
     - **sql_variant**
     - **timestamp**/**rowversion**
     - **xml**
     - User Defined Types (UDT)
     - **image**
     - **text**/**ntext**
- If the source table contains computed columns, you can't mirror these columns to Fabric OneLake.  
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. For more information, see [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).

## Warehouse limitations

- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. For more information, see [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Mirrored item limitations

- You need to be a member of the Admin or Member workspace role to create SQL Database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It's the same read-only experience. For more information, see [SQL analytics endpoint limitations](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](includes/fabric-mirroreddb-supported-regions.md)]

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases From SQL Server](sql-server-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](monitor.md)
