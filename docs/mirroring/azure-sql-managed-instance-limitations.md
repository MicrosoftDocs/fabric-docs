---
title: "Limitations in Mirrored Databases From Azure SQL Managed Instance"
description: A detailed list of limitations for mirrored databases from Azure SQL Managed Instance in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: lazartimotic, jingwang, nzagorac, ajayj
ms.date: 01/15/2026
ms.topic: concept-article
ms.custom:
  - references_regions
---
# Limitations in Microsoft Fabric mirrored databases from Azure SQL Managed Instance

Current limitations in the [Microsoft Fabric mirrored databases](../mirroring/overview.md) from Azure SQL Managed Instance are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure SQL Managed Instance ](../mirroring/azure-sql-managed-instance-troubleshoot.md)

## Feature availability

You can configure Azure SQL Managed Instance for mirroring if it is deployed to any Azure region, **except** for these regions currently: East US 2; West US 2; Central US; West US. 

The feature availability also depends on Fabric regions. For a complete list of Fabric region support, see [Fabric regions that support Mirroring](#supported-regions).

## Database level limitations

- Mirroring on Azure SQL Managed Instance is only available for instances that have their [Update Policy](/azure/azure-sql/managed-instance/update-policy?view=azuresql-mi&preserve-view=true) set to **Always up to date**.
   - SQL managed instances with the **SQL Server 2022** update policy can use Fabric Mirroring for SQL Server 2016-2022, which uses CDC instead of the change feed. For more information, see [Tutorial: Configure Microsoft Fabric Mirroring from SQL Server](sql-server-tutorial.md?tabs=sql201622).
- Geo Disaster Recovery setup isn't supported by Mirroring.
- Fabric Mirroring for Azure SQL Managed Instance is only supported on a **writable primary** database.
- An Azure SQL Managed Instance database can't be mirrored if the database has: enabled Change Data Capture **(CDC), Transactional Replication**, or the database is already mirrored in another Fabric workspace.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently can't be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list aren't mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables.
- The database copy/move feature isn't supported on databases that are mirrored. If you move or copy a database with mirroring enabled, the copy will report a mirroring error state.
- If your SQL managed instance database is set up to use [Azure SQL Managed Instance Link feature](/azure/azure-sql/managed-instance/managed-instance-link-feature-overview?view=azuresql-mi&preserve-view=true), the readable replica isn't supported to be a source for Fabric mirroring.
- If your database is configured for mirroring and then renamed, the **Monitor Mirroring** functionality will stop working. Renaming the database to the name it had when mirroring was set up will resolve the issue.

- An Azure SQL Managed Instance database cannot be mirrored if [delayed transaction durability](/sql/relational-databases/logs/control-transaction-durability?view=azuresqldb-mi-current&preserve-view=true) is enabled for the database.

## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security?view=azuresqldb-mi-current&preserve-view=true) is supported, but permissions are currently not propagated to the replicated data in Fabric OneLake.
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql?view=azuresqldb-mi-current&preserve-view=true), for example granting permissions to certain columns, aren't currently propagated to the replicated data in Fabric OneLake.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking?view=azuresqldb-mi-current&preserve-view=true) settings aren't currently propagated from the source database into Fabric OneLake.
- To successfully configure Mirroring for Azure SQL Managed Instance, the principal used to connect to the source SQL managed instance needs to be granted **CONTROL** or **db_owner** permissions. It's recommended to only grant this only on the database being mirrored - do not do it on the entire server level.

## Network and connectivity security

- If your Azure SQL Managed Instance is not publicly accessible, [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) to mirror the data. Make sure the Azure Virtual Network or gateway server's network can connect to the Azure SQL Managed Instance via [a private endpoint](/azure/azure-sql/managed-instance/private-endpoint-overview?view=azuresql-mi&preserve-view=true).
- The System Assigned Managed Identity (SAMI) of the Azure SQL Managed Instance needs to be enabled and must be the primary identity.
- The Azure SQL Managed Instance service principal name (SPN) contributor permissions shouldn't be removed from the Fabric mirrored database item.
- User Assigned Managed Identity (UAMI) isn't supported.
- Mirroring across [Microsoft Entra](/entra/fundamentals/new-name) tenants isn't supported where an Azure SQL Managed Instance and the Fabric workspace are in separate tenants.  
- Microsoft Purview Information Protection/sensitivity labels defined in Azure SQL Managed Instance aren't mirrored to Fabric OneLake.

## Table level

- Tables with primary key or a clustered index (when a primary key does not exist) on unsupported types cannot be mirrored - **computed columns**, **user-defined types**, **geometry**, **geography**, **hierarchy ID**, **SQL variant**, **timestamp**, **datetime2(7)**, **datetimeoffset(7)**, or **time(7)**.

- Delta lake supports only six digits of precision.
  - Columns of SQL type **datetime2**, with precision of 7 fractional second digits, do not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss happens if columns of this type are mirrored and seventh decimal second digit will be trimmed.
  - The **datetimeoffset(7)** data type does not have a corresponding data type with same precision in Delta files in Fabric OneLake. A precision loss (loss of time zone and seventh time decimal) occurs if columns of this type are mirrored.   
- Clustered columnstore indexes aren't currently supported.
- If one or more columns in the table is of type Large Binary Object (LOB) with a **size > 1 MB**, the column data is **truncated** to size of 1 MB in Fabric OneLake. [Configure the max text repl size](/sql/database-engine/configure-windows/configure-the-max-text-repl-size-server-configuration-option) server configuration option to allow more than 65,536 bytes if you want to allow large inserts.
- Source tables that have any of the following features in use can't be mirrored:
  - Temporal history tables and ledger history tables  
  - Always Encrypted
  - In-memory tables
  - Graph  
  - External tables  
- The following table-level data definition language (DDL) operations aren't allowed on source tables when enabled for SQL Managed Instance mirroring to Microsoft Fabric.
  - Switch/Split/Merge partition
  - Alter primary key  
- When there's DDL change, a complete data snapshot is restarted for the changed table, and entire table data is reseeded into Fabric OneLake.
- Currently, a table cannot be mirrored if it has the **json** <!-- or **vector** --> data type.
  - Currently, you cannot ALTER a column to the <!--**vector** or--> **json** data type when a table is mirrored.
- Views and Materialized views aren't supported for mirroring.
- Starting in May 2025, a table can be mirrored even if it doesn't have a primary key. 
    - Tables without primary keys prior to May 2025 weren't eligible to be mirrored. After May 2025, existing tables without primary keys won't automatically be added to mirroring, even if you had selected **Automatically mirror future tables**. 
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

- If the source table contains computed columns, these columns can't be mirrored to Fabric OneLake.  
- If the source table contains columns with one of these data types, these columns can't be mirrored to Fabric OneLake. The following data types are unsupported for mirroring:
  - **image**
  - **text**/**ntext**
  - **xml**
  - **json**
  - **rowversion**/**timestamp**
  - **sql_variant**
  - User Defined Types (UDT)
  - **geometry**
  - **geography**
- Mirroring supports replicating columns containing spaces or special characters in names (such as  `,` `;` `{` `}` `(` `)` `\n` `\t` `=`). For tables under replication before this feature enabled, you need to update the mirrored database settings or restart mirroring to include those columns. Learn more from [Delta column mapping support](troubleshooting.md#delta-column-mapping-support).
- The following column level data definition language (DDL) operations aren't supported on source tables when they're enabled for SQL Managed Instance mirroring to Microsoft Fabric:
  - Alter column
  - Rename column (`sp_rename`)

## Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create SQL Managed Instance mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  
- If Fabric capacity is stopped and then restarted, mirroring will stop working and needs to be manually restarted. There won't be warnings/error messages indicating that mirroring stopped working.

## SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It's the same read-only experience. See [SQL analytics endpoint limitations](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).
- Source schema hierarchy is replicated to the mirrored database. For mirrored databases created before this feature enabled, the source schema is flattened, and schema name is encoded into the table name. If you want to reorganize tables with schemas, recreate your mirrored database. Learn more from [Replicate source schema hierarchy](troubleshooting.md#replicate-source-schema-hierarchy).

## Supported regions

[!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Managed Instance](../mirroring/azure-sql-managed-instance-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](../mirroring/monitor.md)

