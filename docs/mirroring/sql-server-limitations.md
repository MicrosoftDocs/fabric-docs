---
title: "Limitations of Fabric Mirrored Databases From SQL Server"
description: A detailed list of limitations for mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj, rajpo
ms.date: 06/03/2025
ms.topic: conceptual
ms.custom:
  - references_regions
---
# Limitations in Microsoft Fabric mirrored databases from SQL Server

Current limitations in the [Microsoft Fabric mirrored databases](../database/mirrored-database/overview.md) From SQL Server are listed in this page. This page is subject to change.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](../database/mirrored-database/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases From SQL Server](../database/mirrored-database/sql-server-troubleshoot.md)

## Platform limitations

- Fabric Mirroring for SQL Server 2025 is currently not supported for SQL Server 2025 instances running in an Azure Virtual Machine.
- Fabric Mirroring for SQL Server 2025 is currently not supported in SQL Server on Linux.

## Database level limitations

- Fabric Mirroring for SQL Server is only supported on a primary database of an availability group.
- The SQL Server database cannot be mirrored if the database already has been configured for Azure Synapse Link for SQL or the database is already mirrored in another Fabric workspace.
  - A database in a SQL Server 2025 instance cannot be mirrored if Change Data Capture (CDC) is enabled on the source database.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently cannot be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list are not mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables.
- `.dacpac` deployments to SQL Server require the publish property `/p:DoNotAlterReplicatedObjects=False` to enable modifications to any mirrored tables. For more about publish settings available for `.dacpac` deployments, see the [SqlPackage publish documentation](/sql/tools/sqlpackage/sqlpackage-publish).
- Fabric Mirroring from SQL Server 2025 isn't supported when the following features are enabled:
  - Replication
  - CDC
    - Fabric Mirroring from SQL Server 2016-2022 requires CDC.
    
- A SQL Server database cannot be mirrored if [delayed transaction durability](/sql/relational-databases/logs/control-transaction-durability?view=sql-server-ver17&preserve-view=true) is enabled for the database.

## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security?view=sql-server-ver17&preserve-view=true) is supported, but permissions are currently not propagated to the replicated data in Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=sql-server-ver17&preserve-view=true), for example granting permissions to certain columns, are currently not propagated to the replicated data in Fabric OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=sql-server-ver17&preserve-view=true) settings are currently not propagated to the replicated data in Fabric OneLake.
- To successfully configure Mirroring for SQL Server, the principal used to connect to the source SQL Server must be granted the permission **ALTER ANY EXTERNAL MIRROR**, which is included in higher level permission like **CONTROL** permission or the **db_owner** role.

## Network and connectivity security

- The SQL Server service principal name (SPN) contributor permissions should not be removed from the Fabric mirrored database item.
- Mirroring across [Microsoft Entra](/entra/fundamentals/new-name) tenants is not supported where a SQL Server instance and the Fabric workspace are in separate tenants.  
- Microsoft Purview Information Protection/sensitivity labels defined in SQL Server are not cascaded and mirrored to Fabric OneLake.

## Table level

- A table cannot be mirrored if the primary key is one of the data types: **sql_variant**, **timestamp**/**rowversion**.
- When mirroring SQL Server 2016 thru SQL Server 2022, a table cannot be mirrored if it does not have a primary key.
- Delta lake supports only six digits of precision.
   - Columns of SQL type **datetime2**, with precision of 7 fractional second digits, do not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss happens if columns of this type are mirrored and seventh decimal second digit will be trimmed.
   - A table cannot be mirrored if the primary key is one of these data types: **datetime2(7)**, **datetimeoffset(7)**, **time(7)**, where `7` is seven digits of precision.
   - The **datetimeoffset(7)** data type does not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss (loss of time zone and seventh time decimal) occurs if columns of this type are mirrored.
- Clustered columnstore indexes are not currently supported.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size > 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.
- Source tables that have any of the following features in use cannot be mirrored.
    - Temporal history tables and ledger history tables  
    - Always Encrypted
    - In-memory tables
    - Graph  
    - External tables  

- The following table-level data definition language (DDL) operations aren't allowed on SQL database source tables when enabled for mirroring. 
    - Switch/Split/Merge partition
    - Alter primary key
- When there is DDL change, a complete data snapshot is restarted for the changed table, and data is reseeded.
- Currently, a table cannot be mirrored if it has the **json** or **vector** data type.
    - Currently, you cannot ALTER a column to the **vector** or **json** data type when a table is mirrored.

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
- If the source table contains computed columns, these columns cannot be mirrored to Fabric OneLake.  
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).

## Warehouse limitations

- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create SQL Database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. See [SQL analytics endpoint limitations](../../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../database/mirrored-database/includes/fabric-mirroreddb-supported-regions.md)]

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases From SQL Server](../database/mirrored-database/sql-server-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](../database/mirrored-database/monitor.md)
