---
title: Connector overview
description: Learn about the available data connectors for Data Factory in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: overview
ms.date: 12/02/2025
ms.search.form: product-data-factory
ms.custom: connectors
---

# Connector overview

Data Factory in Microsoft Fabric connects to many types of data stores using built-in connectors. These connectors help you bring in or transform data with Dataflow Gen2, pipelines, or Copy job. Select the connector you need to get started.

## Prerequisites

Before setting up a connection, ensure you have:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A Microsoft Fabric-enabled workspace. [Create a workspace](../fundamentals/create-workspaces.md).

## Supported connectors in Fabric

Fabric supports these connectors in Dataflow Gen2, pipelines, and Copy job. Select a data store to see what it can do and how to set it up.

>[!TIP]
> For more detailed copy job feature availability, see [supported features by connector for Copy job](copy-job-connectors.md).

| Connector | [Dataflow Gen2](dataflows-gen2-overview.md) (source/destination) | [Pipeline](pipeline-overview.md) (copy activity source/destination) | [Copy job](what-is-copy-job.md) (source/destination) |
|:--|:-:|:-:|:-:|
| [Access](connector-access-database-overview.md) | ✓/− |  |  |
| Acterys: Model Automation & Planning (Beta) | ✓/− |  |  |
| Actian (Beta) | ✓/− |  |  |
| [Active Directory](/power-query/connectors/active-directory#connect-to-active-directory-from-power-query-online) | ✓/− |  |  |
| [Adobe Analytics](/power-query/connectors/adobe-analytics) | ✓/− |  |  |
| [ADPAnalytics (Beta)](/power-query/connectors/adp-analytics) | ✓/− |  |  |
| [Amazon Athena](/power-query/connectors/amazon-athena) | ✓/− |  |  |
| [Amazon OpenSearch Service (Beta)](/power-query/connectors/amazon-opensearch-service) | ✓/− |  |  |
| [Amazon RDS For Oracle](connector-amazon-rds-for-oracle-overview.md) |  | ✓/− | ✓/− |
| [Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-overview.md) |  | ✓/− | ✓/− |
| [Amazon Redshift](connector-amazon-redshift-overview.md) | ✓/− | ✓/− |  |
| [Amazon S3](connector-amazon-s3-overview.md) |  | ✓/✓ | ✓/✓ |
| [Amazon S3 Compatible](connector-amazon-s3-compatible-overview.md) |  | ✓/✓ | ✓/✓ |
| [Anaplan](/power-query/connectors/anaplan) | ✓/− |  |  |
| Asana | ✓/− |  |  |
| [Assemble Views](/power-query/connectors/assemble-views) | ✓/− |  |  |
| AtScale cubes | ✓/− |  |  |
| [Autodesk Construction Cloud](/power-query/connectors/autodesk-construction-cloud) | ✓/− |  |  |
| Automation Anywhere | ✓/− |  |  |
| [Automy Analytics](/power-query/connectors/automy-data-analytics) | ✓/− |  |  |
| [Azure AI Search](connector-azure-search-overview.md) |  | −/✓ | −/✓  |
| [Azure Analysis Services](connector-azure-analysis-services-overview.md) | ✓/− |  |  |
| [Azure Blobs](connector-azure-blob-storage-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Azure Cosmos DB for MongoDB](connector-azure-cosmos-db-for-mongodb-overview.md) |  | ✓/✓ | ✓/✓ |
| [Azure Cosmos DB for MongoDB vCore (Beta)](/power-query/connectors/azure-cosmos-db-for-mongodb-vcore#connect-to-azure-cosmos-db-for-mongodb-vcore-database-from-power-query-online) | ✓/− |  |  |
| [Azure Cosmos DB v2](connector-azure-cosmosdb-for-nosql-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Azure Cost Management](/power-query/connectors/azure-cost-management) | ✓/− |  |  |
| [Azure Data Explorer (Kusto)](connector-azure-data-explorer-overview.md) | ✓/✓ | ✓/✓ | ✓/✓ |
| [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Azure Database for MySQL](connector-azure-database-for-mysql-overview.md) |  | ✓/✓ | ✓/✓ |
| [Azure Database for PostgreSQL](connector-azure-database-for-postgresql-overview.md) |  | ✓/✓ | ✓/✓ |
| [Azure Databricks](connector-azure-databricks-overview.md) | ✓/− | ✓/✓ |  |
| [Azure Files](connector-azure-files-overview.md) |  | ✓/✓ |  ✓/✓ |
| [Azure HDInsight (HDFS)](/power-query/connectors/azure-hdinsight#connect-to-azure-hdinsight-from-power-query-online) | ✓/− |  |  |
| Azure HDInsight Spark | ✓/− |  |  |
| [Azure Resource Graph](/power-query/connectors/azure-resource-graph#connect-to-azure-resource-graph-from-power-query-online) | ✓/− |  |  |
| [Azure SQL database](connector-azure-sql-database-overview.md) | ✓/✓ | ✓/✓ | ✓/✓ |
| [Azure SQL Managed Instance](connector-azure-sql-managed-instance-overview.md) |  | ✓/✓ | ✓/✓ |
| [Azure Synapse Analytics (SQL DW)](connector-azure-synapse-analytics-overview.md) | ✓/- | ✓/✓ | ✓/✓ |
| [Azure Synapse Analytics workspace (Beta)](/power-query/connectors/synapse) | ✓/− |  |  |
| [Azure Tables](connector-azure-table-storage-overview.md) | ✓/− | ✓/✓ | ✓/- |
| BI Connector | ✓/− |  |  |
| [BitSight Security Ratings](/power-query/connectors/bitsight-security-ratings) | ✓/− |  |  |
| [Bloomberg Data and Analytics](/power-query/connectors/bloomberg-data-and-analytics) | ✓/− |  |  |
| [BQE CORE](/power-query/connectors/bqecore) | ✓/− |  |  |
| [BuildingConnected & Trade Tapp](/power-query/connectors/buildingconnected) | ✓/− |  |  |
| [Cassandra](connector-cassandra-overview.md) |  | ✓/− | ✓/− |
| [CData Connect Cloud](/power-query/connectors/cdata-connect-cloud) | ✓/− |  |  |
| [Celonis EMS](/power-query/connectors/celonis-ems) | ✓/− |  |  |
| Cherwell (Beta) | ✓/− |  |  |
| [ClickHouse](/power-query/connectors/clickhouse#connect-to-clickhouse-from-power-query-online) | ✓/− |  |  |
| [CloudBluePSA (Beta)](connector-cloudbluepsa-overview.md) | ✓/− |  |  |
| [Cognite Data Fusion (OData)](/power-query/connectors/cognite-data-fusion-(odata)#connect-to-cognite-data-fusion-from-power-query-online) | ✓/− |  |  |
| Cognite Data Fusion (Rest API) (Beta) | ✓/− |  |  |
| [Common Data Service (legacy)](connector-common-data-service-legacy-overview.md) | ✓/− |  |  |
| Data Virtuality LDW | ✓/− |  |  |
| [Databricks](connector-databricks-overview.md) | ✓/− |  |  |
| [Dataflow](connector-dataflows-overview.md) | ✓/− |  |  |
| Datamarts (Beta) | ✓/− |  |  |
| [Dataverse](connector-dataverse-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Delta Sharing](/power-query/connectors/delta-sharing) | ✓/− |  |  |
| [Denodo](/power-query/connectors/denodo) | ✓/− |  |  |
| Dremio Cloud | ✓/− |  |  |
| Dremio Software | ✓/− |  |  |
| Dynamics 365 Business Central | ✓/− |  |  |
| Dynamics 365 Customer Insights (Beta) | ✓/− |  |  |
| Dynamics 365 | | ✓/✓ | ✓/✓ |
| [Dynamics AX](connector-dynamics-ax-overview.md) |  | ✓/− | ✓/− |
| [Dynamics CRM](connector-dynamics-crm-overview.md) |  | ✓/✓ |✓/✓  |
| Dynatrace Grail DQL (Beta) | ✓/− |  |  |
| [Eduframe (Beta)](/power-query/connectors/eduframe) | ✓/− |  |  |
| Emigo Data Source | ✓/− |  |  |
| Entersoft Business Suite | ✓/− |  |  |
| [EQuIS](/power-query/connectors/equis) | ✓/− |  |  |
| eWay-CRM | ✓/− |  |  |
| [Exact Online Premium (Beta)](/power-query/connectors/exact-online-premium) | ✓/− |  |  |
| Exasol | ✓/− |  |  |
| [Excel workbook](/power-query/connectors/excel#connect-to-an-excel-workbook-from-power-query-online) | ✓/− |  |  |
| [Fabric Data Warehouse](connector-data-warehouse-overview.md) | ✓/✓ | ✓/✓ | ✓/✓ |
| [Fabric KQL Database](connector-kql-database-overview.md) | ✓/✓ | ✓/✓ |  |
| [Fabric Lakehouse](connector-lakehouse-overview.md) | ✓/✓ | ✓/✓ | ✓/✓ |
| [Fabric SQL database (Beta)](connector-sql-database-overview.md) | ✓/✓ | ✓/✓ | ✓/✓ |
| FactSet Analytics | ✓/− |  |  |
| [FactSet RMS (Beta)](/power-query/connectors/factset-rms) | ✓/− |  |  |
| [FHIR](connector-fhir-overview.md) | ✓/− |  |  |
| [Folder](connector-folder-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [FTP](connector-ftp-overview.md) |  | ✓/− | ✓/− |
| [Funnel](/power-query/connectors/funnel) | ✓/− |  |  |
| [Google Analytics](connector-google-analytics-overview.md) | ✓/− |  |  |
| [Google BigQuery](connector-google-bigquery-overview.md) | ✓/− | ✓/− | ✓/− |
| [Google BigQuery (Microsoft Entra ID)](/power-query/connectors/google-bigquery-aad#connect-to-google-bigquery-microsoft-entra-id-data-from-power-query-online) | ✓/− |  |  |
| [Google Cloud Storage](connector-google-cloud-storage-overview.md) |  | ✓/✓ | ✓/✓ |
| [Google Sheets](/power-query/connectors/google-sheets) | ✓/− |  |  |
| [Greenplum for Pipeline](connector-greenplum-for-pipeline-overview.md) |  | ✓/− | ✓/− |
| [Hadoop Distributed File System (Hdfs)](connector-hdfs-for-pipeline-overview.md) |  | ✓/− | ✓/− |
| HDInsight Interactive Query | ✓/− |  |  |
| Hexagon PPM Smart API | ✓/− |  |  |
| [Hive LLAP](connector-hive-llap-overview.md) | ✓/− |  |  |
| [HTTP](connector-http-overview.md) |  | ✓/− | ✓/− |
| [IBM Db2 database](connector-ibm-db2-database-overview.md) | ✓/− | ✓/− | ✓/− |
| IBM Netezza | ✓/− |  |  |
| [Impala](connector-impala-overview.md) | ✓/− |  |  |
| [Informix For Pipeline](connector-informix-for-pipeline-overview.md) |  | ✓/✓ | ✓/✓ |
| Indexima | ✓/− |  |  |
| Industrial App Store | ✓/− |  |  |
| InformationGrid | ✓/− |  |  |
| [InterSystems Health Insight](/power-query/connectors/intersystems-healthinsight) | ✓/− |  |  |
| Intune Data Warehouse (Beta) | ✓/− |  |  |
| [inwink (Beta)](/power-query/connectors/inwink) | ✓/− |  |  |
| Jamf Pro | ✓/− |  |  |
| Jethro (Beta) | ✓/− |  |  |
| [JSON](/power-query/connectors/json#load-a-local-json-file-from-power-query-online) | ✓/− |  |  |
| Kognitwin | ✓/− |  |  |
| [KX kdb Insights Enterprise (Beta)](/power-query/connectors/kx-kdb-insights-enterprise) | ✓/− |  |  |
| Kyligence | ✓/− |  |  |
| [Kyvos ODBC (Beta)](/power-query/connectors/kyvos-odbc) | ✓/− |  |  |
| [LEAP (Beta)](/power-query/connectors/leap#load-data-from-leap-in-power-query-online) | ✓/− |  |  |
| Linkar PICK Style / MultiValue Databases (Beta) | ✓/− |  |  |
| [LinkedIn Learning](/power-query/connectors/linkedin-learning) | ✓/− |  |  |
| [MariaDB](connector-mariadb-overview.md) | ✓/− | ✓/− | ✓/− |
| MarkLogic | ✓/− |  |  |
| [Microsoft 365](connector-microsoft-365-overview.md) |  | ✓/− |  |
| [Microsoft Access](connector-microsoft-access-overview.md) |  | ✓/✓ | ✓/✓ |
| Microsoft Azure Data Manager for Energy | ✓/− |  |  |
| [Microsoft Exchange Online](connector-microsoft-exchange-online-overview.md) | ✓/− |  |  |
| Strategy for Power BI | ✓/− |  |  |
| [MongoDB Atlas for Pipelines](connector-mongodb-atlas-overview.md) |  | ✓/✓ | ✓/✓ |
| [MongoDB Atlas SQL](connector-mongodb-atlas-sql-overview.md) | ✓/− |  |  |
| [MongoDB for Pipeline](connector-mongodb-overview.md) |  | ✓/✓ |✓/✓  |
| [MySQL database](connector-mysql-database-overview.md) | ✓/− | ✓/− | ✓/− |
| [OData](connector-odata-overview.md) | ✓/− | ✓/− | ✓/− |
| [Odbc](connector-odbc-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [OneStream](/power-query/connectors/onestream) | ✓/− |  |  |
| [OpenSearch Project (Beta)](/power-query/connectors/opensearch-project) | ✓/− |  |  |
| [Oracle Cloud Storage](connector-oracle-cloud-storage-overview.md) |  | ✓/− | ✓/−  |
| [Oracle database](connector-oracle-database-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Palantir Foundry Datasets](connector-palantir-foundry-overview.md) | ✓/− |  |  |
| [Parquet](/power-query/connectors/parquet#connect-to-a-parquet-file-from-power-query-online) | ✓/− |  |  |
| Paxata | ✓/− |  |  |
| [PDF](/power-query/connectors/pdf#connect-to-a-pdf-file-from-power-query-online) | ✓/− |  |  |
| Planview Enterprise Architecture | ✓/− |  |  |
| Planview IdeaPlace | ✓/− |  |  |
| [Planview OKR (Beta)](/power-query/connectors/planview-okr#load-data-from-planview-okr-in-power-query-online) | ✓/− |  |  |
| Planview Portfolios | ✓/− |  |  |
| Planview ProjectPlace | ✓/− |  |  |
| [PostgreSQL database](connector-postgresql-overview.md) | ✓/− | ✓/− | ✓/− |
| Power BI dataflows (Legacy) | ✓/− |  |  |
| [Presto](connector-presto-overview.md) |  | ✓/− | ✓/− |
| Product Insights (Beta) | ✓/− |  |  |
| [Profisee](/power-query/connectors/profisee) | ✓/− |  |  |
| QubolePresto (Beta) | ✓/− |  |  |
| Quickbase | ✓/− |  |  |
| [REST](connector-rest-overview.md) |  | ✓/✓ | ✓/✓ |
| Roamler (Beta) | ✓/− |  |  |
| [Salesforce objects](connector-salesforce-objects-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [Salesforce reports](connector-salesforce-reports-overview.md) | ✓/− |  |  |
| [Salesforce Service Cloud](connector-salesforce-service-cloud-overview.md) |  | ✓/✓ | ✓/✓ |
| [Samsara](/power-query/connectors/samsara) | ✓/− |  |  |
| [SAP BW Application Server](connector-sap-bw-application-server-overview.md) | ✓/− |  |  |
| [SAP BW Message Server](connector-sap-bw-message-server-overview.md) | ✓/− |  |  |
| [SAP BW Open Hub Application Server](connector-sap-bw-open-hub-application-server-overview.md) |  | ✓/− |✓/−  |
| [SAP BW Open Hub Message Server](connector-sap-bw-open-hub-message-server-overview.md) |  | ✓/− | ✓/− |
| [SAP HANA database](connector-sap-hana-overview.md) | ✓/− | ✓/− | ✓/− |
| [SAP Table Application Server](connector-sap-table-application-server-overview.md) |  | ✓/− | ✓/− |
| [SAP Table Message Server](connector-sap-table-message-server-overview.md) |  | ✓/− |✓/−   |
| [ServiceNow](connector-servicenow-overview.md) |  | ✓/− | ✓/− |
| [SFTP](connector-sftp-overview.md) |  | ✓/✓ | ✓/✓ |
| [SharePoint folder](connector-sharepoint-folder-overview.md) | ✓/✓ |  |  |
| [SharePoint list](connector-sharepoint-list-overview.md) | ✓/− |  |  |
| [SharePoint Online list](connector-sharepoint-online-list-overview.md) | ✓/− | ✓/− |✓/− |
| Shortcuts Business Insights (Beta) | ✓/− |  |  |
| [SingleStore Direct Query Connector](/power-query/connectors/singlestore) | ✓/− |  |  |
| [SIS-CC SDMX (Beta)](/power-query/connectors/sis-cc-sdmx) | ✓/− |  |  |
| Siteimprove | ✓/− |  |  |
| [Smartsheet](/power-query/connectors/smartsheet) | ✓/− |  |  |
| [Snowflake](connector-snowflake-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| [SoftOne BI (Beta)](/power-query/connectors/softone-bi) | ✓/− |  |  |
| [SolarWinds Service Desk](/power-query/connectors/solarwinds-service-desk) | ✓/− |  |  |
| Solver | ✓/− |  |  |
| Spark | ✓/− |  |  |
| [SQL Server database](connector-sql-server-database-overview.md) | ✓/− | ✓/✓ | ✓/✓ |
| Starburst | ✓/− |  |  |
| Starburst secured by Entra ID | ✓/− |  |  |
| [SumTotal](/power-query/connectors/sumtotal) | ✓/− |  |  |
| [Supermetrics](/power-query/connectors/supermetrics) | ✓/− |  |  |
| SurveryMonkey | ✓/− |  |  |
| [Sybase database](/power-query/connectors/sybase-database#connect-to-a-sybase-database-from-power-query-online) | ✓/− |  |  |
| TeamDesk (Beta) | ✓/− |  |  |
| Tenforce (Smart)List | ✓/− |  |  |
| [Teradata database](connector-teradata-database-overview.md) | ✓/− | ✓/✓ |  |
| [Text/CSV](/power-query/connectors/text-csv#connect-to-textcsv-file-from-power-query-online) | ✓/− |  |  |
| [TIBCO(R) Data Virtualization](/power-query/connectors/tibco) | ✓/− |  |  |
| Topcon Aptix Insights | ✓/− |  |  |
| [Usercube (Beta)](/power-query/connectors/usercube) | ✓/− |  |  |
| Vena | ✓/− |  |  |
| [Vertica](connector-vertica-overview.md) | ✓/− | ✓/− | ✓/− |
| [Vessel Insight](/power-query/connectors/vessel-insight) | ✓/− |  |  |
| Viva Insights | ✓/− |  |  |
| [Warehouse](/power-query/connectors/warehouse#connect-to-a-warehouse-from-power-query-online) | ✓/− |  |  |
| Web API | ✓/− |  |  |
| Web page | ✓/− |  |  |
| Webtrends Analytics (Beta) | ✓/− |  |  |
| [Windsor](/power-query/connectors/windsor) | ✓/− |  |  |
| Witivio (Beta) | ✓/− |  |  |
| [Wolters Kluwer CCH Tagetik](/power-query/connectors/wolters-kluwer-cch-tagetik) | ✓/− |  |  |
| Wrike (Beta) | ✓/− |  |  |
| [XML](/power-query/connectors/xml#load-a-local-xml-file-from-power-query-online) | ✓/− |  |  |
| [Zendesk](/power-query/connectors/zendesk) | ✓/− |  |  |
| Zoho Creator | ✓/− |  |  |
| Zucchetti HR Infinity (Beta) | ✓/− |  |  |

## Support TLS 1.3

Transport Layer Security (TLS) is a widely adopted security protocol that's designed to secure connections and communications between servers and clients. The following connectors support TLS 1.3 for Data Factory:

| Connector | Dataflow Gen2 | Copy activity | Copy job |
|:--|:-:|:-:|:-:|
|[Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-copy-activity.md)| | ✓ | ✓ |
|[Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-copy-activity.md)| | ✓ | ✓ |
|[Azure Blobs](connector-azure-blob-storage-copy-activity.md)| | ✓ | ✓ |
|[Azure Data Explorer (Kusto)](connector-azure-data-explorer-copy-activity.md)| | ✓ | ✓ |
|[Azure Database for PostgreSQL (version 2.0)](connector-azure-database-for-postgresql-copy-activity.md)| | ✓ | ✓ |
|[Azure Files](connector-azure-files-copy-activity.md)| | ✓ | ✓ |
|[Azure SQL Database](connector-azure-sql-database-copy-activity.md)| | ✓ | ✓ |
|[Azure SQL Managed Instance](connector-azure-sql-managed-instance-copy-activity.md)| | ✓ | ✓ |
|[Azure Synapse Analytics (SQL DW)](connector-azure-synapse-analytics-copy-activity.md)| | ✓ | ✓ |
|[Azure Tables](connector-azure-table-storage-copy-activity.md)| | ✓ | ✓ |
|[IBM Db2 database](connector-ibm-db2-database-copy-activity.md)| | ✓ | ✓ |
|[Oracle database](connector-oracle-database-copy-activity.md)| | ✓ | ✓ |
|[PostgreSQL database](connector-postgresql-copy-activity.md)| | ✓ | ✓ |
|[Snowflake](connector-snowflake-copy-activity.md)| | ✓ | ✓ |
|[SQL Server database](connector-sql-server-copy-activity.md)| | ✓ | ✓ |

## Related content

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
- [Learn more about Workspace Authentication for Connections](https://blog.fabric.microsoft.com/blog/announcing-support-for-workspace-identity-authentication-in-new-fabric-connectors-and-for-dataflow-gen2/)
