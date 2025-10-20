---
title: Connector overview
description: Learn about the available data connectors for Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: jianleishen
author: jianleishen
ms.topic: overview
ms.date: 10/16/2025
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

| Connector | Dataflow gen2 (source/destination) | Pipeline<br>(copy activity source/destination) | Copy job (source/destination) | Workspace Identity Authentication |
|:-- | :-:| :-: |:-: | :-: |
| [Access](connector-access-database-overview.mdation & Planning (Beta) | ✓/− |  |  |  |
| Actian (Beta) | ✓/− |  |  |  |
| [Active Directory](https://learn.microsoft.com/power-query/connectors/active-directory) |  |  |  |  |
| [ADP Analytics (Beta)](https://learn.microsoft.com/power-query/connectors/adp-analytics) |  |  |  |  |
| [Amazon OpenSearch Service (Beta)](https://learn.microsoft.com/power-query/connectors/amazon-opensearch-service) |  |  |  |  |
| [Amazon RDS for Oracle](connector-amazon-rds-for-oracle-overview.md) |  |  |  |  |
| [Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-overview.md) |  |  |  |  |
| [Amazon Redshift](connector-amazon-redshift-overview.md) |  |  |  |  |
| [Amazon S3 Compatible](connector-amazon-s3-compatible-overview.mdy/connectors/anaplan |  |  |
| [AssembleViews | ✓/− |  |  |  |
| AtScale cubes | ✓/− |  |  |  |
| [Autodesk Construction Cloud](/power-query/connectors/autodesk-construction-cloud |
| [Automy Analytics](/power-query/connectors/automy-data-analyticsazure| [Azure Analysis Services](connector | x |
| [Azure Blobs](connector-azure-| x |
| [Azure Cosmos DB for MongoDB](connector-azure-cosmos-db-for-mongodb-overview.mdre(Beta) | ✓/− |  |  |  |
| [Azure Cosmos DB v2](connector-azure-cosmosdb-for-nosql-overview.md)** |  |  |  | x |
| [Azure Cost Management](/power-query/connectors/azure-cost-management](connector-azure-data-explorer-overview.md Storage Gen1** |  |  |  | x |
| [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-overview.md(connector-azure-database-for-mysql-overview.mdeSQL](connector-azure-database-for-postgresql-overview.mdure-databricks-overview.mdor-azure-filesre HDInsight (HDFS)](/power-query/connectors/azure-hdinsight| ✓/− |  |  |  |
| [Azure Resource Graph](/power-query/connectors/azure-resource-graphtor-azure-sql-database-overview.mdd Instance](connector-azure-sql-managed-instance-overview.mdL DW)](connector-azure-synapse-analytics-overview.mdics workspace (Beta)](/power-query/connectors/synapse](connector-azurex |
| BI Connector | ✓/− |  |  |  |
| [BitSight Security Ratings](/power-query/connectors/bitsight-security-ratingspower-query/connectors/bloomberg-data-and-analyticsngConnected & Trade Tapp](/power-query/connectors/buildingconnectedssandraData Connect Cloud](/power-query/connectors/cdata-connect-cloud/connectors/celonis-ems ✓/− |  |  |  |
| [ClickHouse](/power-query/connectors/clickhouseta)](connector-cloudbluepsa-overview.mdion (OData)](/power-query/connectors/cognite-data-fusion-(odataBeta)| ✓/− |  |  |  |
| [Common Data Service (legacy)](connector-common-data-service-legacy-overview.md |  |
| [Databricks](connector-databricks-overview.mdector-dataflows-overts (Beta) | ✓/− |  |  |  |
| [Dataverse](connector-dataverse-overview.mdring](/power-query |
| [Denodo](/power-query/connectors Cloud | ✓/− |  |  |  |
| Dremio Software | ✓/− |  |  |  |
| Dynamics 365 |  |  |  | x |
| Dynamics 365 Customer Insights (Beta) | ✓/− |  |  |  |
| [Dynamics AX](connector-dynamics
| Dynamics CRM |  | ✓/✓ |  | x |
| Dynatrace Grail DQL (Beta) | ✓/− |  |  |  |
| [Eduframe (Beta)](/power-query/connectors/eduframece | ✓/− |  |  |  |
| Entersoft Business Suite | ✓/− |  |  |  |
| [EQuIS](/power-query/connectors/equis/− |  |  |  |
| [Exact Online Premium (Beta)](/power-query/connectors/exact |  |  |  |
| [Excel workbook](/power-query/connectors/excel Warehouse](connector | ✓/✓ |  |
| [Fabric KQL Database](connector-kql-database-overview.mduse](connector | ✓/✓ |  |
| [Fabric SQL database (Beta)](connector-sql-database-overview.mdlytics | ✓/− |  |  |  |
| [FactSet RMS (Beta)](/power-query/connectors/factset-rmshir-overview.mdconnector-folder-overview(connector-ftp-overviewunnel](/power-query/connectogle Analytics](connector-google [Google BigQuery](connector-google|  |
| [Google BigQuery(Microsoft Entra ID)](/power-query/connectors/google-bigquery](connector-google-cloud-storage-overview.md-query |
| HDInsight Interactive Query | ✓/− |  |  |  |
| Hexagon PPM Smart API | ✓/− |  |  |  |
| Hive LLAP | ✓/− |  |  |  |
| HTTP |  | ✓/− | ✓/− |  |
| IBM Db2 database | ✓/− | ✓/− | ✓/−  |  |
| IBM Netezza | ✓/− |  |  |  |
| [Impala](connector-impala-overview.mdor Pipeline](connector-informix-for-pipeline-overview.md |
| Industrial App Store | ✓/− |  |  |  |
| InformationGrid | ✓/− |  |  |  |
| [InterSystems Health Insight](/power-query |
| Intune Data Warehouse (Beta) | ✓/− |  |  |  |
| [inwink (Beta)](/power-query/connectf Pro | ✓/− |  |  |  |
| Jethro (Beta) | ✓/− |  |  |  |
| [JSON](/power-query/connectors/json ✓/− |  |  |  |
| [KX kdb Insights Enterprise (Beta)](/power-query/connectors/kx-kdb-insights-enterpriseos ODBC (Beta)](/power-query/connectors/kyvos-odbcwer-query/connectkar PICK Style / MultiValue Databases (Beta) | ✓/− |  |  |  |
| [LinkedIn Learning| ✓/− |  |  |  |
| [MariaDB](connector-mariadb-over
| MarkLogic | ✓/− |  |  |  |
| [Microsoft 365](connector-microsoft-365-overviewss](connector-microsoft Microsoft Azure Data Manager for Energy | ✓/− |  |  |  |
| [Microsoft Exchange Online](connector-microsoft-exchange-online-overview.md |  |  |
| [MongoDB Atlas for Pipelines](connector-mongodb[MongoDB Atlas SQL](connector-m  |
| [MongoDB for Pipeline](connector |  |
| [MySQL database](connector-mysql |  |
| [OData](connector-odata-over
| [Odbc](connector-odbc-over|
| [OneStream](/power-query/connectenSearch Project (Beta)](/power |  |  |
| [Oracle Cloud Storage](connector-oracle-cloud-storage-overview.mdor-oracle-database-overview.mddry Datasets](connector-palantir-foundry-overview.mdy/connectors | ✓/− |  |  |  |
| [PDF](//− |  |  |  |
| Planview Enterprise Architecture | ✓/− |  |  |  |
| Planview IdeaPlace | ✓/− |  |  |  |
| [Planview OKR (Beta)](/power-query/connectorsew Portfolios | ✓/− |  |  |  |
| Planview ProjectPlace | ✓/− |  |  |  |
| [PostgreSQL database](connector-postgresql-overview.mddataflows (Legacy) | ✓/− |  |  |  |
| [Presto](connector-presto-overroduct Insights (Beta)| ✓/− |  |  |  |
| [Profisee](/power-query/connectors/proto (Beta) | ✓/− |  |  |  |
| Quickbase | ✓/− |  |  |  |
| [REST](connector |  |
| Roamler (Beta) | ✓/− |  |  |  |
| [Salesforce objects](connector-salesforce-objectssforce reports](connector-salesforce-reports-overview.mdud](connector-salesforce-service-cloud-overview.mdnectP BW Application Server](connector-sap-bw-application-server-overview.mdtor-sap-bw-message-server-overview.mdon Server](connector-sap-bw-open-hub-application-server-over(connector-sap-bw-open-hub-message-server-overviewp-hana-overview.mdble Application Server](connector-sap-table-application-server-overview.mdtor-sap-table-message-server-overview.mdenSFTP](connector-sftp-overview.mdPoint folder](connector |  |
| SharePoint list | ✓/− |  |  |  |
| [SharePoint Online list](connector-sharepoint-online-list-overview.md| x |
| Shortcuts Business Insights (Beta) | ✓/− |  |  |  |
| SingleStore Direct Query Connector | ✓/− |  |  |  |
| [SIS-CC SDMX (Beta)](/power-query/connectors/sis-cc-sdmx|  |  |  |
| [Smartsheet](/power-query/connectors/smartsheetctor-snowflake|
| [SoftOne BI (Beta)](/power |  |  |
| [SolarWinds Service Desk](/power-query/connectors/solarwinds-service-deskk | ✓/− |  |  |  |
| [SQL Server database](connector-sql-server-database-overview.md  |  |  |
| Starburst secured by Entra ID | ✓/− |  |  |  |
| [SumTotal](/power-query/connectors/sumtotal/power-query/connectveryMonkey | ✓/− |  |  |  |
| [Sybase database](/power-query/connectors/sybase-d | ✓/− |  |  |  |
| Tenforce (Smart)List | ✓/− |  |  |  |
| [Teradata database](connector-teradata-database-overview.mduery/connectBCO(R) Data Virtualization](//− |  |  |  |
| Topcon Aptix Insights | ✓/− |  |  |  |
| [Usercube (Beta)](/power-query/connectors/user|  |  |  |
| [Vertica](connector-vertica-overview.mdl Insight](/power-query |
| Viva Insights | ✓/− |  |  | x |
| [Warehouse](/power-query/connectors/warehouse |  |  |
| Web page | ✓/− |  |  |  |
| **Web** |  |  |  | x |
| Webtrends Analytics (Beta) | ✓/− |  |  |  |
| [Windsor](/power |  |  |
| Witivio (Beta) | ✓/− |  |  |  |
| [Wolters Kluwer CCH Tagetik](/power-query/connectors/wolters-kluwer-cch-tagetikML | ✓/− |  |  |  |
| [Zendesk](/power-query/connectorsreator | ✓/− |  |  |  |
| Zucchetti HR Infinity (Beta) | ✓/− |  |  |  |


## Related content

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
- [Learn more about Workspace Authentication for Connections](https://blog.fabric.microsoft.com/en-US/blog/announcing-support-for-workspace-identity-authentication-in-new-fabric-connectors-and-for-dataflow-gen2/)
