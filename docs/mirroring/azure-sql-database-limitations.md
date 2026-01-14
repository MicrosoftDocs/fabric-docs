---
title: "Limitations and Behaviors for Fabric Mirrored Databases From Azure SQL Database"
description: A detailed list of limitations for mirrored databases from Azure SQL Database in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: imotiwala, sbahadur, drskwier, ajayj, atodalbagi
ms.date: 11/25/2025
ms.topic: concept-article
ms.custom:
  - references_regions
---
# Limitations in Microsoft Fabric mirrored databases from Azure SQL Database

Current limitations in the [Microsoft Fabric mirrored databases](../mirroring/overview.md) from Azure SQL Database are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure SQL Database](../mirroring/azure-sql-database-troubleshoot.md)

## Database level limitations

- Fabric Mirroring for Azure SQL Database is only supported on a writable primary database.
- Azure SQL Database cannot be mirrored if the database has: enabled Change Data Capture (CDC), Azure Synapse Link for SQL, or the database is already mirrored in another Fabric workspace.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently cannot be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list are not mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables.
- `.dacpac` deployments to Azure SQL Database require the publish property `/p:DoNotAlterReplicatedObjects=False` to enable modifications to any mirrored tables. For more about publish settings available for `.dacpac` deployments, see the [SqlPackage publish documentation](/sql/tools/sqlpackage/sqlpackage-publish).

- Azure SQL Database cannot be mirrored if [delayed transaction durability](/sql/relational-databases/logs/control-transaction-durability?view=azuresqldb-current&preserve-view=true) is enabled for the database.

## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security?view=fabric&preserve-view=true) is supported, but permissions are currently not propagated to the replicated data in Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=fabric&preserve-view=true), for example granting permissions to certain columns, are currently not propagated to the replicated data in Fabric OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=fabric&preserve-view=true) settings are currently not propagated to the replicated data in Fabric OneLake.
- To successfully configure Mirroring for Azure SQL Database, the principal used to connect to the source Azure SQL Database must be granted the permission **ALTER ANY EXTERNAL MIRROR**, which is included in higher level permission like **CONTROL** permission or the **db_owner** role.

## Network and connectivity security

- Either the System Assigned Managed Identity (SAMI) or the User Assigned Managed Identity (UAMI) of the Azure SQL logical server needs to be enabled and must be the primary identity.

  > [!NOTE]  
  > Support for User Assigned Managed Identity (UAMI) is currently in preview.

- The Azure SQL Database service principal name (SPN) contributor permissions should not be removed from the Fabric mirrored database item.
- Mirroring across [Microsoft Entra](/entra/fundamentals/new-name) tenants is not supported where an Azure SQL Database and the Fabric workspace are in separate tenants.  
- Microsoft Purview Information Protection/sensitivity labels defined in Azure SQL Database are not cascaded and mirrored to Fabric OneLake.

## Table level

- Tables with primary key or a clustered index (when a primary key does not exist) on unsupported types cannot be mirrored - **computed columns**, **user-defined types**, **geometry**, **geography**, **hierarchy ID**, **SQL variant**, **timestamp**, **datetime2(7)**, **datetimeoffset(7)**, or **time(7)**.

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
- Starting in April 2025, a table can be mirrored even if it doesn't have a primary key. 
    - Tables without primary keys prior to April 2025 weren't eligible to be mirrored. After April 2025, existing tables without primary keys won't automatically be added to mirroring, even if you had selected **Automatically mirror future tables**. 
        - To start mirroring tables without primary keys when you have selected **Automatically mirror future tables**: 
            1. Stop replication and start replication, which will reseed all tables, and detect the new tables eligible for mirroring. This is the recommended step.
            1. As a workaround, create a new table in the source database. This triggers an inventory of tables for the source database and detects the tables that weren't mirrored previously, including those without primary keys. For example, the following script creates a table named `test_20250401`, then drops it after the `test_20250401` table is mirrored. This script assumes that a table named `dbo.test_20250401` does not already exist.
               ```sql
               --This script assumes that a table named dbo.test_20250401 does not already exist.
               CREATE TABLE dbo.test (ID int not null);
               ```

               After it shows up in the mirrored tables list, you should see tables without primary keys as well. Then, you can drop the `test` table:

               ```sql
               DROP TABLE dbo.test_20250401;
               ```
        - To start mirroring tables without primary keys when you have not selected **Automatically mirror future tables**, add the tables to the list of selected tables in mirroring settings.

## Column level

- If the source table contains computed columns, these columns cannot be mirrored to Fabric OneLake.  
- If the source table contains columns with one of these data types, these columns cannot be mirrored to Fabric OneLake. The following data types are unsupported for mirroring:
    - **image**
    - **text**/**ntext**
    - **xml** 
    - **rowversion**/**timestamp**
    - **sql_variant**
    - User Defined Types (UDT)
    - **geometry**
    - **geography**
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).

## Warehouse limitations

- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create SQL Database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. See [SQL analytics endpoint limitations](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database](../mirroring/azure-sql-database-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](../mirroring/monitor.md)
