---
title: Connector overview
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview
ms.custom:
ms.date: 04/25/2025
ms.search.form: product-data-factory
---

# Connector overview

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] offers a rich set of connectors that allow you to connect to different types of data stores. You can take advantage of those connectors to ingest or transform data in Dataflow Gen2, data pipelines or Copy job.

## Prerequisites

Before you can set up a connection, the following prerequisites are required:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).

- A Microsoft Fabric enabled Workspace. [Create a workspace](../fundamentals/create-workspaces.md).

## Supported connectors in Fabric

Fabric support the following connectors in Dataflow Gen2, data pipelines or Copy job. Click each data store to learn the supported capabilities and the corresponding configurations in details.

| Connector | Dataflow gen2 (source/destination) | Data pipeline (copy activity source/destination) | Copy job (source/destination) | 
|:-- | :--| :-- |:-- | 
| Access | ✓/− |  |  | 
| Acterys: Model Automation & Planning (Beta) | ✓/− |  |  | 
| Actian (Beta) | ✓/− |  |  | 
| Active Directory | ✓/− |  |  | 
| Adobe Analytics | ✓/− |  |  | 
| ADPAnalytics (Beta) | ✓/− |  |  | 
| Amazon Athena | ✓/− |  |  | 
| Amazon OpenSearch Service(Beta)  | ✓/− |  |  | 
| Amazon RDS for SQL Server |  | ✓/− | ✓/− | 
| Amazon Redshift | ✓/− | ✓/− |  | 
| Amazon S3 |  | ✓/✓ | ✓/✓ | 
| Amazon S3 Compatible |  | ✓/✓ | ✓/✓ | 
| Anaplan | ✓/− |  |  | 
| Asana | ✓/− |  |  | 
| Assemble Views | ✓/− |  |  | 
| AtScale cubes | ✓/− |  |  | 
| Autodesk Construction Cloud | ✓/− |  |  | 
| Automation Anywhere | ✓/− |  |  | 
| Automy Analytics | ✓/− |  |  | 
| Azure AI Search |  | −/✓ |  | 
| Azure Analysis Services | ✓/− |  |  | 
| [Azure Blobs](connector-azure-blob-storage-overview.md) | ✓/− | ✓/✓ | ✓/✓ | 
| Azure Cosmos DB for MongoDB |  | ✓/✓ |  | 
| Azure Cosmos DB for MongoDB vCore (Beta) | ✓/− |  |  | 
| Azure Cosmos DB v2 | ✓/− | ✓/✓ |  | 
| Azure Cost Management | ✓/− |  |  | 
| Azure Data Explorer (Kusto) | ✓/✓ | ✓/✓ | ✓/✓ | 
| Azure Data Lake Storage Gen2 | ✓/− | ✓/✓ | ✓/✓ | 
| Azure Database for MySQL |  | ✓/✓ | ✓/✓ | 
| Azure Database for PostgreSQL |  | ✓/✓ | ✓/✓ | 
| Azure Databricks | ✓/− |  |  | 
| Azure Files |  | ✓/✓ |  | 
| Azure HDInsight (HDFS) | ✓/− |  |  | 
| Azure HDInsight Spark | ✓/− |  |  | 
| Azure Resource Graph | ✓/− |  |  | 
| Azure SQL database | ✓/✓ | ✓/✓ | ✓/✓ | 
| Azure SQL Managed Instance |  | ✓/✓ | ✓/✓ | 
| Azure Synapse Analytics workspace (Beta) | ✓/− |  |  | 
| Azure Tables | ✓/− | ✓/✓ |  | 
| BI Connector | ✓/− |  |  | 
| BitSight Security Ratings | ✓/− |  |  | 
| Blank query | ✓/− |  |  | 
| Blank table | ✓/− |  |  | 
| Bloomberg Data and Analytics | ✓/− |  |  | 
| BQE CORE | ✓/− |  |  | 
| BuildingConnected & Trade Tapp | ✓/− |  |  | 
| CData Connect Cloud | ✓/− |  |  | 
| Celonis EMS  | ✓/− |  |  | 
| Cherwell (Beta) | ✓/− |  |  | 
| ClickHouse | ✓/− |  |  | 
| CloudBluePSA (Beta) | ✓/− |  |  | 
| Cognite Data Fusion (OData) | ✓/− |  |  | 
| Cognite Data Fusion (Rest API) | ✓/− |  |  | 
| Common Data Service (legacy) | ✓/− |  |  | 
| Data Virtuality LDW | ✓/− |  |  | 
| Fabric Data Warehouse | ✓/✓ | ✓/✓ | ✓/✓ | 
| Databricks | ✓/− |  |  | 
| Dataflows | ✓/− |  |  | 
| Datamarts (Beta) | ✓/− |  |  | 
| Dataverse | ✓/− | ✓/✓ |  | 
| Delta Sharing | ✓/− |  |  | 
| Denodo | ✓/− |  |  | 
| Digital Construction Works Insights | ✓/− |  |  | 
| Dremio Cloud | ✓/− |  |  | 
| Dremio Software | ✓/− |  |  | 
| Dynamics 365 Business Central | ✓/− |  |  | 
| Dynamics 365 Customer Insights (Beta) | ✓/− |  |  | 
| Dynamics AX | ✓/− | ✓/✓ |  | 
| Dynamics CRM | ✓/− | ✓/✓ |  | 
| Dynatrace Grail DQL (Beta) | ✓/− |  |  | 
| Eduframe (Beta) | ✓/− |  |  | 
| Eduframe Reporting (Beta) | ✓/− |  |  | 
| Emigo Data Source | ✓/− |  |  | 
| Entersoft Business Suite | ✓/− |  |  | 
| EQuIS | ✓/− |  |  | 
| eWay-CRM | ✓/− |  |  | 
| Exact Online Premium (Beta) | ✓/− |  |  | 
| Exasol | ✓/− |  |  | 
| Excel workbook | ✓/− |  |  | 
| FactSet Analytics | ✓/− |  |  | 
| FactSet RMS (Beta) | ✓/− |  |  | 
| FHIR | ✓/− |  |  | 
| Folder | ✓/− | ✓/✓ |  | 
| FTP |  | ✓/✓ |  | 
| Funnel | ✓/− |  |  | 
| Google Analytics | ✓/− |  |  | 
| Google BigQuery | ✓/− | ✓/✓ | ✓/− | 
| Google BigQuery(Microsoft Entra ID)  | ✓/− |  |  | 
| Google Cloud Storage |  | ✓/✓ | ✓/✓ | 
| Google Sheets | ✓/− |  |  | 
| HDInsight Interactive Query | ✓/− |  |  | 
| Hexagon PPM Smart API | ✓/− |  |  | 
| Hive LLAP | ✓/− |  |  | 
| HTTP |  | ✓/✓ |  | 
| IBM Db2 database | ✓/− | ✓/✓ |  | 
| IBM Netezza | ✓/− |  |  | 
| Impala | ✓/− |  |  | 
| Indexima | ✓/− |  |  | 
| Industrial App Store | ✓/− |  |  | 
| InformationGrid | ✓/− |  |  | 
| InterSystems Health Insight | ✓/− |  |  | 
| Intune Data Warehouse (Beta) | ✓/− |  |  | 
| inwink (Beta) | ✓/− |  |  | 
| Jamf Pro | ✓/− |  |  | 
| Jethro (Beta) | ✓/− |  |  | 
| JSON | ✓/− |  |  | 
| Kognitwin | ✓/− |  |  | 
| Fabric KQL Database | ✓/− | ✓/✓ |  | 
| KX kdb Insights Enterprise (Beta) | ✓/− |  |  | 
| Kyligence | ✓/− |  |  | 
| Kyvos ODBC (Beta) | ✓/− |  |  | 
| Fabric Lakehouse | ✓/✓ | ✓/✓ | ✓/✓ | 
| LEAP (Beta) | ✓/− |  |  | 
| Linkar PICK Style / MultiValue Databases (Beta) | ✓/− |  |  | 
| LinkedIn Learning | ✓/− |  |  | 
| MariaDB for pipeline| ✓/− | ✓/− |  | 
| MarkLogic | ✓/− |  |  | 
| Microsoft 365 |  | ✓/− |  | 
| Microsoft Azure Data Manager for Energy | ✓/− |  |  | 
| Microsoft Exchange Online | ✓/− |  |  | 
| MicroStrategy for Power BI | ✓/− |  |  | 
| MongoDB Atlas for Pipelines |  | ✓/✓ |  | 
| MongoDB Atlas SQL | ✓/− |  |  | 
| MongoDB for Pipeline |  | ✓/✓ |  | 
| MySQL database | ✓/− | ✓/− | ✓/− | 
| OData | ✓/− | ✓/− |  | 
| Odbc | ✓/− | ✓/✓ | ✓/✓ | 
| OneStream | ✓/− |  |  | 
| OpenSearch Project (Beta) | ✓/− |  |  | 
| Oracle Cloud Storage |  | ✓/− |  | 
| Oracle database | ✓/− | ✓/✓ | ✓/✓ | 
| Palantir Foundry | ✓/− |  |  | 
| Palantir Foundry Datasets | ✓/− |  |  | 
| Parquet | ✓/− |  |  | 
| Paxata | ✓/− |  |  | 
| PDF | ✓/− |  |  | 
| Planview Enterprise Architecture | ✓/− |  |  | 
| Planview IdeaPlace | ✓/− |  |  | 
| Planview OKR (Beta) | ✓/− |  |  | 
| Planview Portfolios | ✓/− |  |  | 
| Planview ProjectPlace | ✓/− |  |  | 
| PostgreSQL database | ✓/− | ✓/✓ | ✓/− | 
| Power BI dataflows (Legacy) | ✓/− |  |  | 
| Product Insights | ✓/− |  |  | 
| Profisee | ✓/− |  |  | 
| QubolePresto (Beta) | ✓/− |  |  | 
| Quickbase | ✓/− |  |  | 
| REST |  | ✓/✓ |  | 
| Roamler (Beta) | ✓/− |  |  | 
| Salesforce objects | ✓/− | ✓/✓ | ✓/✓ | 
| Salesforce Reports | ✓/− |  |  | 
| Salesforce Service Cloud |  | ✓/✓ | ✓/✓ | 
| Samsara (Beta) | ✓/− |  |  | 
| SAP BW Application Server | ✓/− |  |  | 
| SAP BW Message Server | ✓/− |  |  | 
| SAP HANA database | ✓/− | ✓/✓ | ✓/− | 
| ServiceNow |  | ✓/− |  | 
| SFTP |  | ✓/✓ |  | 
| SharePoint folder | ✓/− |  |  | 
| SharePoint list | ✓/− |  |  | 
| SharePoint Online list | ✓/− | ✓/− |  | 
| Shortcuts Business Insights (Beta) | ✓/− |  |  | 
| SingleStore Direct Query Connector | ✓/− |  |  | 
| SIS-CC SDMX (Beta) | ✓/− |  |  | 
| Sitemiprove | ✓/− |  |  | 
| Smartsheet | ✓/− |  |  | 
| Snowflake | ✓/− | ✓/✓ | ✓/✓ | 
| SoftOne BI (Beta) | ✓/− |  |  | 
| SolarWinds Service Desk | ✓/− |  |  | 
| Solver | ✓/− |  |  | 
| Spark | ✓/− |  |  | 
| Fabric SQL database  | ✓/✓ | ✓/✓ | ✓/✓ | 
| SQL Server database | ✓/− | ✓/✓ | ✓/✓ | 
| Starburst | ✓/− |  |  | 
| Starburst secured by Entra ID | ✓/− |  |  | 
| SumTotal | ✓/− |  |  | 
| Supermetrics | ✓/− |  |  | 
| SurveryMonkey | ✓/− |  |  | 
| Sybase database | ✓/− |  |  | 
| TeamDesk (Beta) | ✓/− |  |  | 
| Tenforce (Smart)List | ✓/− |  |  | 
| Teradata database | ✓/− | ✓/✓ |  | 
| Text/CSV | ✓/− |  |  | 
| TIBCO(R) Data Virtualization | ✓/− |  |  | 
| Topcon Aptix Insights | ✓/− |  |  | 
| Usercube (Beta) | ✓/− |  |  | 
| Vena | ✓/− |  |  | 
| Vertica | ✓/− | ✓/✓ |  | 
| Vessel Insight | ✓/− |  |  | 
| Viva Insights | ✓/− |  |  | 
| Warehouse | ✓/− |  |  | 
| Web API | ✓/− |  |  | 
| Web page | ✓/− |  |  | 
| Webtrends Analytics (Beta) | ✓/− |  |  | 
| Windsor | ✓/− |  |  | 
| Witivio (Beta) | ✓/− |  |  | 
| Wolters Kluwer CCH Tagetik | ✓/− |  |  | 
| Wrike (Beta) | ✓/− |  |  | 
| XML | ✓/− |  |  | 
| Zendesk | ✓/− |  |  | 
| Zoho Creator | ✓/− |  |  | 
| Zucchetti Infinity (Beta) | ✓/− |  |  | 

## Related content

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
