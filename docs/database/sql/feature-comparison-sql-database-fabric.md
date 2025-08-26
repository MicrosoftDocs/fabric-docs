---
title: "Features comparison: Azure SQL Database and SQL database (preview)"
description: This article compares the database engine features of Azure SQL Database and SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac, antho, sukkaur, drskwier, jovanpop
ms.date: 07/21/2025
ms.topic: conceptual
ms.search.form: SQL database Overview
---
# Features comparison: Azure SQL Database and SQL database in Microsoft Fabric (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Azure SQL Database and SQL database in Microsoft Fabric share a common code base with the latest stable version of the Microsoft SQL Database Engine. Most of the standard SQL language, query processing, and database management features are identical.

- For a decision guide comparing [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview?view=azuresql-db&preserve-view=true) to [SQL database in Fabric](overview.md), see [Microsoft Fabric decision guide: choose a SQL database](decision-guide.md).
- For a decision guide comparing SQL database to other data stores in Microsoft Fabric, see [Microsoft Fabric decision guide: choose a data store](../../fundamentals/decision-guide-data-store.md).

Many features are common between SQL Server and Azure SQL Database and SQL database in Fabric, for example:

- Language features - [Control of flow language keywords](/sql/t-sql/language-elements/control-of-flow), [Cursors](/sql/t-sql/language-elements/cursors-transact-sql), [Data types](/sql/t-sql/data-types/data-types-transact-sql), [DML statements](/sql/t-sql/queries/queries), [Predicates](/sql/t-sql/queries/predicates), [Sequence numbers](/sql/relational-databases/sequence-numbers/sequence-numbers), [Stored procedures](/sql/relational-databases/stored-procedures/stored-procedures-database-engine), and [Variables](/sql/t-sql/language-elements/variables-transact-sql).
- Database features - [Automatic tuning (plan forcing)](/sql/relational-databases/automatic-tuning/automatic-tuning), [Contained databases](/sql/relational-databases/databases/contained-databases), [Contained users](/sql/relational-databases/security/contained-database-users-making-your-database-portable), [Data compression](/sql/relational-databases/data-compression/data-compression), [Database configuration settings](/sql/t-sql/statements/alter-database-scoped-configuration-transact-sql), [Online index operations](/sql/relational-databases/indexes/perform-index-operations-online), [Partitioning](/sql/relational-databases/partitions/partitioned-tables-and-indexes), and [Temporal tables](/sql/relational-databases/tables/temporal-tables).
- Multi-model capabilities - [Graph processing](/sql/relational-databases/graphs/sql-graph-overview), [JSON data](/sql/relational-databases/json/json-data-sql-server), [OPENXML](/sql/t-sql/functions/openxml-transact-sql), [Spatial](/sql/relational-databases/spatial/spatial-data-sql-server), [OPENJSON](/sql/t-sql/functions/openjson-transact-sql), and [XML indexes](/sql/t-sql/statements/create-xml-index-transact-sql).

## Features of Azure SQL Database and Fabric SQL database

The following table lists the major features of SQL Server and provides information about whether the feature is partially or fully supported in Azure SQL Database and SQL database in Fabric, with a link to more information about the feature.

| **Feature** | **Azure SQL Database** | **Fabric SQL database** |
| --- | --- | --- |
| [Database compatibility](/sql/t-sql/statements/alter-database-transact-sql-compatibility-level) | 100 - 160 | 160 |
| [Accelerated database recovery (ADR)](/azure/azure-sql/accelerated-database-recovery) | Yes | Yes |
| [Always Encrypted](/azure/azure-sql/database/always-encrypted-landing) | Yes | No |
| [Application roles](/sql/relational-databases/security/authentication-access/application-roles) | Yes | No |
| [Auditing](/sql/relational-databases/security/auditing/sql-server-audit-database-engine) | Yes, see [Auditing](/azure/azure-sql/database/auditing-overview)| Not currently |
| Microsoft Entra authentication | [Yes](/azure/azure-sql/database/authentication-aad-overview) | [Yes](authentication.md) |
| [BACKUP command](/sql/t-sql/statements/backup-transact-sql) | No, only [system-initiated automatic backups](/azure/azure-sql/database/automated-backups-overview?view=azuresql-db&preserve-view=true) | No, only [system-initiated automatic backups](backup.md) |
| [Built-in functions](/sql/t-sql/functions/functions) | Most, see individual functions | Most, see individual functions |
| [BULK INSERT statement](/sql/relational-databases/import-export/import-bulk-data-by-using-bulk-insert-or-openrowset-bulk-sql-server) | Yes, but just from Azure Blob storage as a source. | No|
| [Certificates and asymmetric keys](/sql/relational-databases/security/sql-server-certificates-and-asymmetric-keys) | Yes | Yes |
| [Change data capture - CDC](/sql/relational-databases/track-changes/about-change-data-capture-sql-server) | Yes, for S3 tier and above. Basic, S0, S1, S2 aren't supported. | No  |
| [Collation - database collation](/sql/relational-databases/collations/set-or-change-the-server-collation) | By default, `SQL_Latin1_General_CP1_CI_AS`. [Set on database creation](/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current&preserve-view=true#collation_name) and can't be updated. Collations on individual columns are supported.| By default, `SQL_Latin1_General_CP1_CI_AS` and can't be updated. Collations on individual columns are supported.|
| [Column encryption](/sql/relational-databases/security/encryption/encrypt-a-column-of-data) | Yes | Yes |
| [Columnstore indexes, clustered](/sql/relational-databases/indexes/columnstore-indexes-overview) | Yes - [Premium tier, Standard tier - S3 and above, General Purpose tier, Business Critical, and Hyperscale tiers](/sql/relational-databases/indexes/columnstore-indexes-overview). | Yes, but the table cannot be mirrored to OneLake. |
| [Columnstore indexes, nonclustered](/sql/relational-databases/indexes/columnstore-indexes-overview) | Yes - [Premium tier, Standard tier - S3 and above, General Purpose tier, Business Critical, and Hyperscale tiers](/sql/relational-databases/indexes/columnstore-indexes-overview). | Yes |
| [Credentials](/sql/relational-databases/security/authentication-access/credentials-database-engine) | Yes, but only [database scoped credentials](/sql/t-sql/statements/create-database-scoped-credential-transact-sql?view=azuresqldb-current&preserve-view=true). | Yes, but only [database scoped credentials](/sql/t-sql/statements/create-database-scoped-credential-transact-sql?view=fabric&preserve-view=true).|
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
| [Event notifications](/sql/relational-databases/service-broker/event-notifications) | No | No |
| [Expressions](/sql/t-sql/language-elements/expressions-transact-sql) | Yes | Yes |
| [Extended events (XEvents)](/sql/relational-databases/extended-events/extended-events) | Some, see [Extended events in Azure SQL Database](/azure/azure-sql/database/xevent-db-diff-from-svr) | Some |
| [Extended stored procedures (XPs)](/sql/relational-databases/extended-stored-procedures-programming/creating-extended-stored-procedures) | No | No |
| [Files and file groups](/sql/relational-databases/databases/database-files-and-filegroups) | Primary file group only | Primary file group only |
| [Full-text search (FTS)](/sql/relational-databases/search/full-text-search) |  Yes, but third-party filters and word breakers aren't supported | No |
| [Functions](/sql/t-sql/functions/functions) | Most, see individual functions |  Most, see individual functions |
| [In-memory optimization](/sql/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization) | Yes in [Premium and Business Critical service tiers](/azure/azure-sql/database/in-memory-oltp-overview?view=azuresql-db&preserve-view=true).</br> Limited support for non-persistent In-Memory OLTP objects such as memory-optimized table variables in [Hyperscale service tier](/azure/azure-sql/database/service-tier-hyperscale). | No |
| [Intelligent query processing](/sql/relational-databases/performance/intelligent-query-processing?view=azuresqldb-current&preserve-view=true) | Yes | Yes |
| [Language elements](/sql/t-sql/language-elements/language-elements-transact-sql) | Most, see individual elements | Most, see individual elements  |
| [Ledger](/sql/relational-databases/security/ledger/ledger-overview) | Yes | No |
| [Linked servers](/sql/relational-databases/linked-servers/linked-servers-database-engine) | Yes, only as a target | Yes, only as a target |
| [Logins and users](/sql/relational-databases/security/authentication-access/principals-database-engine) | Yes, but `CREATE` and `ALTER` login statements are limited. Windows logins are not supported. | Logins are not supported. Only users representing Microsoft Entra principals are supported. |
| [Minimal logging in bulk import](/sql/relational-databases/import-export/prerequisites-for-minimal-logging-in-bulk-import) | No, only Full Recovery model is supported. | No, only Full Recovery model is supported. |
| [Modifying system data](/sql/relational-databases/databases/system-databases) | No | No |
| [OPENDATASOURCE](/sql/t-sql/functions/opendatasource-transact-sql)| No | No |
| [OPENQUERY](/sql/t-sql/functions/openquery-transact-sql)| No | No |
| [OPENROWSET](/sql/t-sql/functions/openrowset-transact-sql)|Yes, only to import from Azure Blob storage | Yes, with [OPENROWSET BULK function](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true) (preview) |
| [Operators](/sql/t-sql/language-elements/operators-transact-sql) | Most, see individual operators | Most, see individual operators |
| [Optimized locking](/sql/relational-databases/performance/optimized-locking) | Yes | Yes |
| [Recovery models](/sql/relational-databases/backup-restore/recovery-models-sql-server) | Full Recovery only | Full Recovery only |
| [Resource governor](/sql/relational-databases/resource-governor/resource-governor) | No | No |
| [RESTORE statements](/sql/t-sql/statements/restore-statements-for-restoring-recovering-and-managing-backups-transact-sql) | No | No |
| [Restore database from backup](/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases#restore-data-backups) | [Restore from automated backups](/azure/azure-sql/database/recovery-using-backups) | [Restore automated backups](restore.md) |
| [Restore database to SQL Server](/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases#restore-data-backups) | No. Use BACPAC or BCP instead of restore. | No. Use BACPAC or BCP instead of restore. |
| [Row level security](/sql/relational-databases/security/row-level-security) | Yes | Yes |
| [Service Broker](/sql/database-engine/configure-windows/sql-server-service-broker) | No | No |
| [Server configuration settings](/sql/database-engine/configure-windows/server-configuration-options-sql-server) | No | No |
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
| Time zone choice | No | No |
| [Trace flags](/sql/t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql) | No | No |
| [Transactional replication](/azure/azure-sql/database/migrate-to-database-from-sql-server) | Yes, subscriber only |  Yes, subscriber only |
| [Transparent data encryption (TDE)](/azure/azure-sql/database/transparent-data-encryption-tde-overview) | Yes | No. Fabric SQL database uses storage encryption with service-managed keys to protect all customer data at rest. Customer-managed keys are not supported. |

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
| **File system access** | No | No |
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
| **Connectivity Policy**|[Redirect, Proxy, or Default](/azure/azure-sql/database/connectivity-architecture?view=azuresql-db&preserve-view=true)|[Redirect](/azure/azure-sql/database/connectivity-architecture?view=fabric&preserve-view=true)|

## Resource limits

The following table compares the maximum resource limits available for Azure SQL Database and SQL database in Fabric:

> [!NOTE]
> These resource limits apply only to the current preview and may change before general availability.

| **Category** | **Azure SQL Database** | **Fabric SQL database** |
|:--|:--|:--|
| **Compute size**| Up to 128 vCores | Up to 32 vCores |
| **Storage size** | Up to 128 TB | In the current preview, up to 4 TB |
| **Tempdb size** | Up to 2560 GB | Up to 1,024 GB |
| **Log write throughput** | Up to 100 MB/s | In the current preview, up to 50 MB/s |
| **Availability** | [Default SLA](https://azure.microsoft.com/support/legal/sla/azure-sql-database/) <br> 99.995% SLA with [zone redundancy](/azure/azure-sql/database/high-availability-sla?view=azuresql-db&preserve-view=true#zone-redundant-availability) | See [Fabric Reliability](/azure/reliability/reliability-fabric) |
| **Backups** | A choice of locally redundant (LRS), zone-redundant (ZRS), or geo-redundant (GRS) storage <br/> 1-35 days (7 days by default) retention, with up to 10 years of long-term retention available | Zone-redundant (ZRS) automatic backups with 7 days retention period (enabled by default). |
| [**Read-only replicas**](/azure/azure-sql/database/read-scale-out) |Read scale with 1-4 high availability replicas or 1-30 [named replicas](/azure/azure-sql/database/service-tier-hyperscale-replicas#named-replica)  <br> 0 - 4 [geo-replicas](/azure/azure-sql/database/active-geo-replication-overview) | No, use the read-only [SQL analytics endpoint](../../data-engineering/lakehouse-sql-analytics-endpoint.md) for a read-only TDS SQL connection |
| **Discount models** |[Reserved instances](/azure/azure-sql/database/reserved-capacity-overview?view=azuresql-db&preserve-view=true)<br/>[Azure Hybrid Benefit](/azure/azure-sql/azure-hybrid-benefit) (not available on dev/test subscriptions)<br/>[Enterprise](https://azure.microsoft.com/offers/ms-azr-0148p/) and [Pay-As-You-Go Dev/Test](https://azure.microsoft.com/offers/ms-azr-0023p/) subscriptions| See [Fabric capacity](../../enterprise/plan-capacity.md) |

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
| [Data Factory in Microsoft Fabric connectors](../../data-factory/connector-overview.md) | Yes, see [Azure SQL Database connector overview](../../data-factory/connector-azure-sql-database-overview.md) | Yes, see [SQL database connector overview (Preview)](../../data-factory/connector-sql-database-overview.md) | 
| [SMO](/sql/relational-databases/server-management-objects-smo/sql-server-management-objects-smo-programming-guide) | Yes, see [SMO](https://www.nuget.org/packages/Microsoft.SqlServer.SqlManagementObjects) | Yes, see [SMO](https://www.nuget.org/packages/Microsoft.SqlServer.SqlManagementObjects) |
| [SQL Server Data Tools (SSDT)](/sql/ssdt/download-sql-server-data-tools-ssdt) | Yes | Yes (minimum version is Visual Studio 2022 17.12) |
| [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) | Yes | Yes |
| [SQL Server PowerShell](/sql/relational-databases/scripting/sql-server-powershell) | Yes | Yes |
| [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) | No, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=azuresql-db&preserve-view=true) | No, see [Extended events](/azure/azure-sql/database/xevent-db-diff-from-svr?view=azuresql-db&preserve-view=true) |
| [sqlcmd](/sql/tools/sqlcmd/sqlcmd-utility) | Yes | Yes |
| [System Center Operations Manager](/system-center/scom/welcome) | Yes, see [Microsoft System Center Management Pack for Azure SQL Database](https://www.microsoft.com/download/details.aspx?id=38829). | No |
| [Visual Studio Code](https://code.visualstudio.com) | Yes | Yes |
| [Visual Studio Code with the mssql extension](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true) | Yes | Yes |

## Related content

- [Engage with the Fabric Community for SQL database](https://community.fabric.microsoft.com/t5/SQL-database/bd-p/db_general_discussion)
- [What's new in Fabric Databases](../../fundamentals/whats-new.md#sql-database-in-microsoft-fabric)
- [Frequently asked questions for SQL database in Microsoft Fabric (preview)](faq.yml)