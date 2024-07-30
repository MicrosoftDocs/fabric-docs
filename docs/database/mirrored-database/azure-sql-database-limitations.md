---
title: "Limitations and behaviors for Fabric mirrored databases from Azure SQL Database (Preview)"
description: A detailed list of limitations for mirrored databases from Azure SQL Database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: roblescarlos, imotiwala, sbahadur
ms.date: 07/25/2024
ms.topic: conceptual
ms.custom:
  - references_regions
  - build-2024
---
# Limitations and behaviors in Microsoft Fabric mirrored databases from Azure SQL Database (Preview)

Current limitations in the [Microsoft Fabric mirrored databases](overview.md) from Azure SQL Database are listed in this page. This page is subject to change.

For troubleshooting, see:

- [Troubleshoot Fabric mirrored databases](troubleshooting.md)
- [Troubleshoot Fabric mirrored databases from Azure SQL Database (Preview)](azure-sql-database-troubleshoot.md)

## Active transactions, workloads, and replicator engine behaviors

- Active transactions continue to hold the transaction log truncation until the transaction commits and the mirrored Azure SQL Database catches up, or the transaction aborts. Long-running transactions might result in the transaction log filling up more than usual. The source database transaction log should be monitored so that the transaction log does not fill. For more information, see [Transaction log grows due to long-running transactions and CDC](/troubleshoot/sql/database-engine/replication/monitor-long-running-transactions-and-log-growth).
- Each user workload varies. During initial snapshot, there might be more resource usage on the source database, for both CPU and IOPS (input/output operations per second, to read the pages). Table updates/delete operations can lead to increased log generation. Learn more on how to [monitor resources for your Azure SQL Database](/azure/azure-sql/database/monitor-tune-overview?view=azuresql-db&preserve-view=true#azure-sql-database-and-azure-sql-managed-instance-resource-monitoring).
- The replicator engine monitors each table for changes independently. If there are no updates in a source table, the replicator engine starts to back off with an exponentially increasing duration for that table, up to an hour. The same can occur if there is a transient error, preventing data refresh. The replicator engine will automatically resume regular polling after updated data is detected.

## Database level limitations

- Fabric Mirroring for Azure SQL Database is only supported on a writable primary database.
- Azure SQL Database cannot be mirrored if the database has: enabled Change Data Capture (CDC), Azure Synapse Link for SQL, or the database is already mirrored in another Fabric workspace.
- The maximum number of tables that can be mirrored into Fabric is 500 tables. Any tables above the 500 limit currently cannot be replicated.
  - If you select **Mirror all data** when configuring Mirroring, the tables to be mirrored over are the first 500 tables when all tables are sorted alphabetically based on the schema name and then the table name. The remaining set of tables at the bottom of the alphabetical list are not mirrored over.
  - If you unselect **Mirror all data** and select individual tables, you are prevented from selecting more than 500 tables. 
 
## Permissions in the source database

- [Row-level security](/sql/relational-databases/security/row-level-security) is not currently supported for Azure SQL Database configured for mirroring to Fabric OneLake.  <!--    - Row-level security settings are not currently propagated and reflected from the source SQL database into Fabric.   -->
- [Object-level permissions](/sql/t-sql/statements/grant-object-permissions-transact-sql), for example granting permissions to certain columns, are not currently propagated from the source SQL database into Fabric.
- [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking) settings are not currently propagated from the source SQL database into Fabric.
- To successfully configure Mirroring for Azure SQL Database, the principal used to connect to the source Azure SQL Database needs to be granted **CONTROL** or **db_owner** permissions.

## Network and connectivity security

- The source SQL server needs to enable [Allow public network access](/azure/azure-sql/database/connectivity-settings#change-public-network-access) and [Allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect.
- The System Assigned Managed Identity (SAMI) of the Azure SQL logical server needs to be enabled and must be the primary identity.
- The Azure SQL Database service principal name (SPN) contributor permissions should not be removed from the Fabric mirrored database item.
- Mirroring across [Microsoft Entra](/entra/fundamentals/new-name) tenants is not supported where an Azure SQL Database and the Fabric workspace are in separate tenants.  
- Microsoft Purview Information Protection/sensitivity labels defined in Azure SQL Database are not cascaded and mirrored to Fabric OneLake.

## Table level

- A table cannot be mirrored if it does not have a primary key rowstore clustered index.
    - A table using a primary key defined and used as nonclustered primary key cannot be mirrored.  
    - A table cannot be mirrored if the primary key is one of the data types: **hierarchyid**, **sql_variant**, **timestamp**.
    - Clustered columnstore indexes are not currently supported.
- If one or more columns in the table is of type Large Binary Object (LOB) with a size > 1 MB, the column data is truncated to size of 1 MB in Fabric OneLake.
- Source tables that have any of the following features in use cannot be mirrored.
    - Temporal history tables and ledger history tables  
    - Always Encrypted  
    - In-memory tables
    - Graph  
    - External tables  
- The following table-level data definition language (DDL) operations aren't allowed on source tables when enabled for Fabric SQL Database mirroring.  
    - Switch/Split/Merge partition
    - Alter primary key  
    - Truncate table
- When there is DDL change, a complete data snapshot is restarted for the changed table, and data is reseeded.

## Column level

- If the source table contains computed columns, these columns cannot be mirrored to Fabric OneLake.  
- If the source table contains columns with unsupported data types, these columns cannot be mirrored to Fabric OneLake. The following data types are unsupported.
    - **image**
    - **text**/**ntext**
    - **xml** 
    - **json**
    - **rowversion**/**timestamp**
    - **sql_variant**
    - User Defined Types (UDT)
    - **geometry**
    - **geography**
- Column names for a SQL table cannot contain spaces nor the following characters: `space` `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.
 
## Warehouse limitations

- Source schema hierarchy is not replicated to the mirrored database. Instead, source schema is flattened, and schema name is encoded into the mirrored database table name.  

### Mirrored item limitations

- User needs to be a member of the Admin/Member role for the workspace to create SQL Database mirroring.  
- Stopping mirroring disables mirroring completely.  
- Starting mirroring reseeds all the tables, effectively starting from scratch.  

#### SQL analytics endpoint limitations

- The SQL analytics endpoint is the same as [the Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience. See [SQL analytics endpoint limitations](../../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

#### Fabric regions that support Mirroring

The following are the Fabric regions that support Mirroring for Azure SQL Database:

:::row:::
   :::column span="":::
    **Asia Pacific**:

    - Australia East
    - Australia Southeast
    - Central India
    - East Asia
    - Japan East
    - Korea Central
    - Southeast Asia
    - South India
   :::column-end:::
   :::column span="":::
   **Europe**

    - North Europe
    - West Europe
    - France Central
    - Germany West Central
    - Norway East
    - Sweden Central
    - Switzerland North
    - Switzerland West
    - UK South
    - UK West
   :::column-end:::
   :::column span="":::
    **Americas**:

    - Brazil South
    - Canada Central
    - Canada East
    - East US
    - East US2
    - North Central US
    - West US
    - West US2
   :::column-end:::
   :::column span="":::
    **Middle East and Africa**:

    - South Africa North
    - UAE North
   :::column-end:::
:::row-end:::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database (Preview)](azure-sql-database-tutorial.md)

## Related content

- [Monitor Fabric mirrored database replication](monitor.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](/fabric/data-warehouse/model-default-power-bi-dataset)
