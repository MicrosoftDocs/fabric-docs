---
title: "Limitations for SQL database"
description: A detailed list of limitations for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac, antho, sukkaur, imotiwala, drskwier
ms.date: 12/09/2025
ms.topic: concept-article
ms.update-cycle: 180-days
ms.search.form: Databases Limitations for SQL, Databases Limitations
---
# Limitations in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Current limitations in the SQL database in Fabric are listed in this page. This page is subject to change.

Azure SQL Database and SQL database in Microsoft Fabric share a common code base with the latest stable version of the Microsoft SQL Database Engine. Most of the standard SQL language, query processing, and database management features are identical.

This article applies to SQL database in Fabric only. For the warehouse and SQL analytics endpoint items in Fabric Data Warehouse, see [Limitations of Fabric Data Warehouse](../../data-warehouse/limitations.md).

## Database level limitations

- SQL database in Fabric uses storage encryption with service-managed keys to protect all customer data at rest. Customer-managed keys are not supported. Transparent Data Encryption (TDE) is not supported.
- In a [trial capacity](../../fundamentals/fabric-trial.md), you are limited to three databases. There is no limit on databases in other capacities.
- Each database in the workspace must have a unique name. If a database is deleted, another cannot be re-created with the same name.
- Database names cannot contain characters `!` `[` `]` `<` `>` `*` `%` `&` `:` `/` `?` `#` `=` `@` `^` `"` `'` `;` `(` `)`.

## Table level

- A table primary key cannot be one of these data types: **hierarchyid**, **sql_variant**, **timestamp**.
- Currently, in-memory, ledger, ledger history, and Always Encrypted tables cannot be created in SQL database in Microsoft Fabric.
- Full-text indexing is not supported and cannot be created in SQL database in Microsoft Fabric.
- The following table-level data definition language (DDL) operations aren't allowed:
    - Switch/Split/Merge partition
    - Partition compression

## Column level

- Column names for a SQL table cannot contain spaces nor the following characters: `,` `;` `{` `}` `(` `)` `\n` `\t` `=`.

## SQL analytics endpoint limitations  

The SQL analytics endpoint of the SQL database in Fabric works just like the [Lakehouse SQL analytics endpoint](../../data-engineering/lakehouse-overview.md#lakehouse-sql-analytics-endpoint). It is the same read-only experience.

## Connection policy

Currently, the connection policy for SQL database in Microsoft Fabric is **Default** and cannot be changed. For more information, see [Connectivity architecture - Connection policy](/azure/azure-sql/database/connectivity-architecture?view=fabric-sqldb&preserve-view=true#connection-policy).

For connections to use this mode, clients need to:

  - Allow outbound communication from the client to all Azure SQL IP addresses in the region on ports in the range of 11000 to 11999. Use the Service Tags for SQL to make this easier to manage. Refer to the [Azure IP Ranges and Service Tags – Public Cloud](https://www.microsoft.com/download/details.aspx?id=56519) for a list of your region's IP addresses to allow.
  
  - Allow outbound communication from the client to Azure SQL gateway IP addresses on port 1433.

## Availability

SQL database in Fabric is available in most regions where Microsoft Fabric is available. The region of your workspace based on the license capacity, which is displayed in **Workspace settings**, in the **License info** page. For more information, see [Fabric availability](/azure/reliability/reliability-fabric#availability).

Mirroring of SQL database in Fabric is available in [Fabric regions that support mirroring](../../mirroring/azure-sql-database-limitations.md#supported-regions).

## Features of Azure SQL Database and Fabric SQL database

The following table lists the major features of SQL Server and provides information about whether the feature is partially or fully supported in Azure SQL Database and SQL database in Fabric, with a link to more information about the feature.

| **Feature** | **Azure SQL Database** | **Fabric SQL database** |
| --- | --- | --- |
| [Database compatibility level](/sql/t-sql/statements/alter-database-transact-sql-compatibility-level) | 100 - 170, default of 170 | 100 - 170, default of 170 |
| [Accelerated database recovery (ADR)](/azure/azure-sql/accelerated-database-recovery) | Yes | Yes |
| [AI functions](/sql/t-sql/functions/ai-functions-transact-sql?view=fabric-sqldb&preserve-view=true) | Yes | Yes |
| [Always Encrypted](/azure/azure-sql/database/always-encrypted-landing) | Yes | No |
| [Application roles](/sql/relational-databases/security/authentication-access/application-roles) | Yes | No |
| Microsoft Entra authentication | [Yes](/azure/azure-sql/database/authentication-aad-overview) | [Yes](authentication.md) |
| [BACKUP command](/sql/t-sql/statements/backup-transact-sql) | No, only [system-initiated automatic backups](/azure/azure-sql/database/automated-backups-overview?view=azuresql-db&preserve-view=true) | No, only [system-initiated automatic backups](backup.md) |
| [Built-in functions](/sql/t-sql/functions/functions) | Most, see individual functions | Most, see individual functions |
| [BULK INSERT statement](/sql/relational-databases/import-export/import-bulk-data-by-using-bulk-insert-or-openrowset-bulk-sql-server) | Yes, but just from Azure Blob storage as a source. | Yes, through [OPENROWSET](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric-sqldb&preserve-view=true), with OneLake as the data source. |
| [Certificates and asymmetric keys](/sql/relational-databases/security/sql-server-certificates-and-asymmetric-keys) | Yes | Yes |
| [Change data capture - CDC](/sql/relational-databases/track-changes/about-change-data-capture-sql-server) | Yes, for S3 tier and above. Basic, S0, S1, S2 aren't supported. | No  |
| [Collation - database collation](/sql/relational-databases/collations/set-or-change-the-server-collation) | By default, `SQL_Latin1_General_CP1_CI_AS`. [Set on database creation](/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current&preserve-view=true#collation_name) and can't be updated. Collations on individual columns are supported.| By default, `SQL_Latin1_General_CP1_CI_AS` and can't be updated. Collations on individual columns are supported.|
| [Column encryption](/sql/relational-databases/security/encryption/encrypt-a-column-of-data) | Yes | Yes |
| [Columnstore indexes, clustered](/sql/relational-databases/indexes/columnstore-indexes-overview) | Yes - [Premium tier, Standard tier - S3 and above, General Purpose tier, Business Critical, and Hyperscale tiers](/sql/relational-databases/indexes/columnstore-indexes-overview). | Yes, but the index must be created at the same time the table is created, or mirroring must be stopped. For more information, see [Limitations for Fabric SQL database mirroring (preview)](mirroring-limitations.md#table-level).|
| [Columnstore indexes, nonclustered](/sql/relational-databases/indexes/columnstore-indexes-overview) | Yes - [Premium tier, Standard tier - S3 and above, General Purpose tier, Business Critical, and Hyperscale tiers](/sql/relational-databases/indexes/columnstore-indexes-overview). | Yes |
| [Credentials](/sql/relational-databases/security/authentication-access/credentials-database-engine) | Yes, but only [database scoped credentials](/sql/t-sql/statements/create-database-scoped-credential-transact-sql?view=azuresqldb-current&preserve-view=true). | Yes, but only [database scoped credentials](/sql/t-sql/statements/create-database-scoped-credential-transact-sql?view=fabric-sqldb&preserve-view=true).|
| [Cross-database/three-part name queries](/sql/relational-databases/linked-servers/linked-servers-database-engine) | No, see [Elastic queries](/azure/azure-sql/database/elastic-query-overview) | Yes, you can do cross-database three-part name queries via the SQL analytics endpoint.  |
| [Data classification and labeling](/azure/azure-sql/database/data-discovery-and-classification-overview) | Yes, via [Database discovery and classification](/azure/azure-sql/database/data-discovery-and-classification-overview) | Yes, with [database labeling with Microsoft Purview Information Protection sensitivity labels](protect-databases-with-protection-policies.md) |
| [Database mirroring to Fabric OneLake](../../mirroring/overview.md) | Yes, manually enabled | Yes, automatically enabled for all eligible tables |
| [Database-level roles](/sql/relational-databases/security/authentication-access/database-level-roles) | Yes | Yes. In addition to Transact-SQL support, Fabric supports managing [database-level roles in Fabric portal](configure-sql-access-controls.md#manage-sql-database-level-roles-from-fabric-portal).|
| [DBCC statements](/sql/t-sql/database-console-commands/dbcc-transact-sql) | Most, see individual statements | Most, see individual statements |
| [DDL statements](/sql/t-sql/statements/statements) | Most, see individual statements | Most, see individual statements. See [Limitations in Fabric SQL database](limitations.md). |
| [DDL triggers](/sql/relational-databases/triggers/ddl-triggers) | Database only | Database only |
| [Distributed transactions - MS DTC](/sql/relational-databases/native-client-ole-db-transactions/supporting-distributed-transactions) | No, see [Elastic transactions](/azure/azure-sql/database/elastic-transactions-overview) | No |
| [DML triggers](/sql/relational-databases/triggers/create-dml-triggers) | Most, see individual statements | Most, see individual statements |
| [Dynamic data masking](/sql/relational-databases/security/dynamic-data-masking) | Yes | Yes |
| [Elastic database client library](/azure/azure-sql/database/elastic-database-client-library) | Yes | No |
| [Elastic query](/azure/azure-sql/database/elastic-query-overview) | Yes, with required RDBMS type (preview) | No |
| [EXECUTE AS](/sql/t-sql/statements/execute-as-transact-sql) | Yes, but `EXECUTE AS LOGIN` isn't supported - use `EXECUTE AS USER` | No |
| [Expressions](/sql/t-sql/language-elements/expressions-transact-sql) | Yes | Yes |
| [Extended events (XEvents)](/sql/relational-databases/extended-events/extended-events) | Some, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=azuresql-db&preserve-view=true) | Some, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=fabricsql&preserve-view=true) |
| [External tables](/sql/t-sql/statements/create-external-table-transact-sql?view=fabric-sqldb&preserve-view=true) | Yes | Yes (Parquet and CSV) |
| [Files and file groups](/sql/relational-databases/databases/database-files-and-filegroups) | Primary file group only | Primary file group only |
| [Full-text search (FTS)](/sql/relational-databases/search/full-text-search) |  Yes, but third-party filters and word breakers aren't supported | No |
| [Functions](/sql/t-sql/functions/functions) | Most, see individual functions |  Most, see individual functions |
| [Intelligent query processing](/sql/relational-databases/performance/intelligent-query-processing?view=azuresqldb-current&preserve-view=true) | Yes | Yes |
| [Language elements](/sql/t-sql/language-elements/language-elements-transact-sql) | Most, see individual elements | Most, see individual elements  |
| [Ledger](/sql/relational-databases/security/ledger/ledger-overview) | Yes | No |
| [Linked servers](/sql/relational-databases/linked-servers/linked-servers-database-engine) | Yes, only as a target | Yes, only as a target |
| [Logins and users](/sql/relational-databases/security/authentication-access/principals-database-engine) | Yes, but `CREATE` and `ALTER` login statements are limited. Windows logins are not supported. | Logins are not supported. Only users representing Microsoft Entra principals are supported. |
| [Minimal logging in bulk import](/sql/relational-databases/import-export/prerequisites-for-minimal-logging-in-bulk-import) | No, only Full Recovery model is supported. | No, only Full Recovery model is supported. |
| [OPENROWSET](/sql/t-sql/functions/openrowset-transact-sql)|Yes, only to import from Azure Blob storage | Yes, with [OPENROWSET BULK function](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric-sqldb&preserve-view=true) (preview) |
| [Operators](/sql/t-sql/language-elements/operators-transact-sql) | Most, see individual operators | Most, see individual operators |
| [Optimized locking](/sql/relational-databases/performance/optimized-locking) | Yes | Yes |
| [Recovery models](/sql/relational-databases/backup-restore/recovery-models-sql-server) | Full Recovery only | Full Recovery only |
| [Restore database from backup](/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases#restore-data-backups) | See [Restore automated backups](/azure/azure-sql/database/recovery-using-backups) | See [Restore automated backups](restore.md) |
| [Restore database to SQL Server](/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases#restore-data-backups) | No. Use BACPAC or BCP instead of restore. | No. [Use BACPAC or BCP instead of restore](sqlpackage.md#export-a-database-with-sqlpackage). |
| [Row level security](/sql/relational-databases/security/row-level-security) | Yes | Yes |
| [Service Broker](/sql/database-engine/configure-windows/sql-server-service-broker) | No | No |
| [Server-level roles](/azure/azure-sql/database/security-server-roles) | Yes | No |
| [Set statements](/sql/t-sql/statements/set-statements-transact-sql) | Most, see individual statements | Most, see individual statements|
| [SQL Server Agent](/sql/ssms/agent/sql-server-agent) | No, see [Elastic jobs](/azure/azure-sql/database/elastic-jobs-overview) | No, try scheduled [Data Factory pipelines](../../data-factory/create-first-pipeline-with-sample-data.md) or [Apache Airflow jobs](../../data-factory/create-apache-airflow-jobs.md) |
| [SQL Server Auditing](/sql/relational-databases/security/auditing/sql-server-audit-database-engine) | No, see [Azure SQL Database auditing](/azure/azure-sql/database/auditing-overview) | No |
| [System functions and dynamic management functions](/sql/relational-databases/system-functions/system-functions-for-transact-sql) | Most, see individual functions | Most, see individual functions |
| [System dynamic management views (DMV)](/sql/relational-databases/system-dynamic-management-views/system-dynamic-management-views) | Most, see individual views | Most, see individual views |
| [System stored procedures](/sql/relational-databases/system-stored-procedures/system-stored-procedures-transact-sql) | Some, see individual stored procedures | Some, see individual stored procedures  |
| [System tables](/sql/relational-databases/system-tables/system-tables-transact-sql) | Some, see individual tables | Some, see individual tables |
| [System catalog views](/sql/relational-databases/system-catalog-views/catalog-views-transact-sql) | Some, see individual views | Some, see individual views |
| [TempDB](/sql/relational-databases/databases/tempdb-database) | Yes | Yes |
| [Temporary tables](/sql/t-sql/statements/create-table-transact-sql#database-scoped-global-temporary-tables-azure-sql-database) | Local and database-scoped global temporary tables | Local and database-scoped global temporary tables |
| [Temporal tables](/azure/azure-sql/temporal-tables) | Yes | Yes |
| Time zone choice | No | No |
| [Trace flags](/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql) | No | No |
| [Transactional replication](/azure/azure-sql/database/migrate-to-database-from-sql-server) | Yes, subscriber only |  Yes, subscriber only |
| [Transparent data encryption (TDE)](/azure/azure-sql/database/transparent-data-encryption-tde-overview) | Yes | No. Fabric SQL database uses storage encryption with service-managed keys to protect all customer data at rest. Currently, customer-managed keys are not supported. |

## Platform capabilities

The Azure platform provides a number of PaaS capabilities that are added as an additional value to the standard database features. There are a number of external services that can be used with Azure SQL Database and SQL database in Fabric.

| **Platform feature** | **Azure SQL Database** | **Fabric SQL database** |
| --- | --- | --- |
| **Active geo-replication** | Yes, see [Active geo-replication](/azure/azure-sql/database/active-geo-replication-overview?view=azuresql-db&preserve-view=true) | Not currently |
| **Automatic backups** | Yes | Yes |
| **Automatic tuning (indexes)**| Yes, see [Automatic tuning](/azure/azure-sql/database/automatic-tuning-overview?view=azuresql-db&preserve-view=true) | Yes   |
| **Availability zones** | [Yes](/azure/availability-zones/az-overview) | [Yes, automatically configured](/azure/reliability/reliability-fabric#availability-zone-support) |
| [Azure Database Migration Service (DMS)](/azure/dms/dms-overview) | Yes | No |
| [Data Migration Service (DMA)](/sql/dma/dma-overview) | Yes | No |
| **Elastic jobs** | Yes, see [Elastic jobs](/azure/azure-sql/database/elastic-jobs-overview?view=azuresql-db&preserve-view=true) | No |
| **Failover groups**| Yes, see [failover groups](/azure/azure-sql/database/failover-group-sql-db?view=azuresql-db&preserve-view=true) | No |
| **Geo-restore**| Yes, see [Geo-restore](/azure/azure-sql/database/recovery-using-backups?view=azuresql-db&preserve-view=true#geo-restore) | No |
| **Long-term retention (LTR)**| Yes, see [long-term retention](/azure/azure-sql/database/long-term-retention-overview?view=azuresql-db&preserve-view=true) | No |
| **Pause/resume** | Yes, in [serverless](/azure/azure-sql/database/serverless-tier-overview?view=azuresql-db&preserve-view=true) | Yes, automatic |
| **Public IP address** | Yes. The access can be restricted using firewall or service endpoints | Yes, available by default |
| **Point in time database restore** | Yes, see [Point-in-time restore](/azure/azure-sql/database/recovery-using-backups?view=azuresql-db&preserve-view=true#point-in-time-restore) | Yes |
| **Resource pools** | Yes, as [Elastic pools](/azure/azure-sql/database/elastic-pool-overview?view=azuresql-db&preserve-view=true) | No |
| **Scaling up or down** | Yes, automatic in serverless, manual in provisioned compute | Yes, automatic |
| **SQL Alias** | No, use [DNS Alias](/azure/azure-sql/database/dns-alias-overview?view=azuresql-db&preserve-view=true) | No |
| [SQL Server Analysis Services (SSAS)](/sql/analysis-services/analysis-services) | No, [Azure Analysis Services](https://azure.microsoft.com/services/analysis-services/) is a separate Azure cloud service. | No, [Azure Analysis Services](https://azure.microsoft.com/services/analysis-services/) is a separate Azure cloud service. |
| [SQL Server Integration Services (SSIS)](/sql/integration-services/sql-server-integration-services) | Yes, with a managed SSIS in Azure Data Factory (ADF) environment, where packages are stored in SSISDB hosted by Azure SQL Database and executed on Azure SSIS Integration Runtime (IR), see [Create Azure-SSIS IR in ADF](/azure/data-factory/create-azure-ssis-integration-runtime). | No, instead use [Data Factory in Microsoft Fabric](../../data-factory/data-factory-overview.md).   |
| [SQL Server Reporting Services (SSRS)](/sql/reporting-services/create-deploy-and-manage-mobile-and-paginated-reports) | No - [see Power BI](/power-bi/) | No - [see Power BI](/power-bi/) |
| **Query performance monitoring** | Yes, use [Query performance insights](/azure/azure-sql/database/query-performance-insight-use) | Yes, see [Performance Dashboard](performance-dashboard.md) |
| [VNet](/azure/virtual-network/virtual-networks-overview) | Partial, restricted access using [VNet Endpoints](/azure/azure-sql/database/vnet-service-endpoint-rule-overview?view=azuresql-db&preserve-view=true) | No |
| **VNet Service endpoint** | Yes, see [virtual network service endpoints](/azure/azure-sql/database/vnet-service-endpoint-rule-overview?view=azuresql-db&preserve-view=true) | No |
| **VNet Global peering** | Yes, using [Private IP and service endpoints](/azure/azure-sql/database/vnet-service-endpoint-rule-overview?view=azuresql-db&preserve-view=true) | No |
| **Private connectivity** | Yes, using [Private Link](/azure/private-link/private-endpoint-overview) | Yes, using [Private links](../../security/security-private-links-overview.md)  |
| **Connectivity Policy**|[Redirect, Proxy, or Default](/azure/azure-sql/database/connectivity-architecture?view=azuresql-db&preserve-view=true#connection-policy)|[Default](/azure/azure-sql/database/connectivity-architecture?view=fabric-sqldb&preserve-view=true#connection-policy)|

## Resource limits

| **Category** |  **Fabric SQL database limit** |
|:--|:--|:--|
| **Compute size**| Up to 32 vCores |
| **Storage size** | Up to 4 TB |
| **Tempdb size** | Up to 1,024 GB |
| **Log write throughput** | Up to 50 MB/s |
| **Availability** | See [Fabric Reliability](/azure/reliability/reliability-fabric) |
| **Backups** | Zone-redundant (ZRS) automatic backups with 7 days retention period (enabled by default). |
| **Read-only replicas** | Use the read-only [SQL analytics endpoint](sql-analytics-endpoint.md) for a read-only TDS SQL connection |

## Tools

Azure SQL Database and SQL database in Fabric support various data tools that can help you manage your data.

| **Tool** | **Azure SQL Database** | **Fabric SQL database** |
| --- | --- | --- |
| [Azure CLI](/sql/azdata/install/deploy-install-azdata) | Yes | No |
| [Azure PowerShell](/powershell/azure/) | Yes | No |
| [.bacpac export](/sql/tools/sqlpackage/sqlpackage#portability) | Yes, see [Azure SQL Database export](/azure/azure-sql/database/database-export?view=azuresql-db&preserve-view=true) | Yes, see [SqlPackage for SQL database in Microsoft Fabric](sqlpackage.md#export-a-database-with-sqlpackage)   |
| [.bacpac import](/sql/tools/sqlpackage/sqlpackage#portability) | Yes, see [Azure SQL Database import](/azure/azure-sql/database/database-import?view=azuresql-db&preserve-view=true) | Yes, see [SqlPackage for SQL database in Microsoft Fabric](sqlpackage.md#import-a-database-with-sqlpackage) |
| [BCP](/sql/tools/bcp-utility) | Yes | Yes |
| [BICEP](/azure/azure-resource-manager/bicep/overview) | Yes | No |
| [Database watcher](/azure/azure-sql/database-watcher-overview) | Yes | Not currently |
| [Data Factory in Microsoft Fabric connectors](../../data-factory/connector-overview.md) | Yes, see [Azure SQL Database connector overview](../../data-factory/connector-azure-sql-database-overview.md) | Yes, see [SQL database connector overview](../../data-factory/connector-sql-database-overview.md) | 
| [SMO](/sql/relational-databases/server-management-objects-smo/sql-server-management-objects-smo-programming-guide) | Yes, see [SMO](https://www.nuget.org/packages/Microsoft.SqlServer.SqlManagementObjects) | Yes, see [SMO](https://www.nuget.org/packages/Microsoft.SqlServer.SqlManagementObjects) |
| [SQL Server Data Tools (SSDT)](/sql/ssdt/download-sql-server-data-tools-ssdt) | Yes | Yes (minimum version is Visual Studio 2022 17.12) |
| [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) | Yes | Yes |
| [SQL Server PowerShell](/sql/relational-databases/scripting/sql-server-powershell) | Yes | Yes |
| [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) | No, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=azuresql-db&preserve-view=true) | No, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=fabricsql&preserve-view=true) |
| [sqlcmd](/sql/tools/sqlcmd/sqlcmd-utility) | Yes | Yes |
| [System Center Operations Manager](/system-center/scom/welcome) | Yes, see [Microsoft System Center Management Pack for Azure SQL Database](https://www.microsoft.com/download/details.aspx?id=38829). | No |
| [Visual Studio Code](https://code.visualstudio.com) | Yes | Yes |
| [Visual Studio Code with the mssql extension](/sql/tools/visual-studio-code/mssql-extensions) | Yes | Yes |

## Limitations

For more limitations in specific areas, see:

- [Limitations and behaviors for Fabric SQL database mirroring](mirroring-limitations.md)
- [Limitations in Authentication in SQL database in Microsoft Fabric](authentication.md#limitations)
- [Limitations in backups in SQL database in Microsoft Fabric](backup.md#limitations)
- [Limitations in restore from a backup in SQL database in Microsoft Fabric](restore.md#limitations)
- [Limitations in share your SQL database and manage permission](share-sql-manage-permission.md#limitations).
- [Limitations of Copilot for SQL database](copilot.md#limitations)

## Related content

- [SQL database in Microsoft Fabric](overview.md)
