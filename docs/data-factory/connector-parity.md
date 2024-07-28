---
title: Connector Continuity between Azure Data Factory (ADF) and Data Factory in Fabric
description: This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 12/07/2023
ms.custom: template-how-to, build-2023
---

# Connector continuity between Azure Data Factory (ADF) and Data Factory in Fabric

This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric. Connectors play a pivotal role in data integration, enabling the seamless flow of data between various data sources and destinations. Understanding the connector continuity between these two platforms is essential for planning your data workflows.

## Connector Overview

With Data Factory in Microsoft Fabric, data pipelines provide connectivity to a rich set of data sources. See below for the list of connectors available in Azure Data Factory and Data Factory in Fabric.

|Connector Type |ADF (Source/Sink)|Fabric Data Factory (Source/Sink)|
|:---|:---|:---|
|***Azure & Fabric***| | |
|Blob Storage|✓/✓|✓/✓|
|Cognitive Search Index|-/✓|N|
|Cosmos DB – SQL API|✓/✓|✓/✓|
|Cosmos DB – MongoDB API|✓/✓|N|
|Azure Data Explorer|✓/✓|✓/✓|
|ADLS Gen1|✓/✓|✓/✓|
|ADLS Gen2|✓/✓|✓/✓|
|Database for MariaDB|✓/-|N|
|Database for MySQL|✓/✓|N|
|Databricks Delta Lake|✓/✓|N|
|Azure File Storage|✓/✓|N|
|Database for PostgreSQL|✓/✓|✓/✓|
|Azure Cosmos DB for PostgreSQL|✓/✓|N|
|Azure Table Storage|✓/✓|✓/✓|
|SQL Database|✓/✓|✓/✓|
|SQL Database MI|✓/✓|✓/✓|
|Synapse Analytics|✓/✓|✓/✓|
|Fabric Lakehouse ​|✓/✓|✓/✓|
|Fabric DW|N|✓/✓|
|Fabric KQL|N|✓/✓|
|***Database & DW***|||
|Amazon Redshift|✓/-|✓/-|
|DB2|✓/-|N|
|Drill|✓/-|N|
|Google Big Query|✓/-|N|
|Greenplum|✓/-|N|
|HBase|✓/-|N|
|Hive|✓/-|N|
|Impala|✓/-|N|
|Informix|✓/✓|N|
|MariaDB|✓/-|N|
|Microsoft Access|✓/✓|N|
|MySQL|✓/-|N|
|Netezza|✓/-|N|
|Oracle|✓/✓|N|
|Amazon RDS for Oracle|✓/-|N|
|Phoenix|✓/-|N|
|PostgreSQL|✓/-|✓/-|
|Presto|✓/-|N|
|SAP BW Open Hub|✓/-|N|
|SAP BW MDX|✓/-|N|
|SAP HANA|✓/✓|N|
|SAP Table|✓/-|N|
|Snowflake|✓/✓|✓/✓|
|Amazon RDS for SQL Server|✓/-|✓/-|
|SQL Server|✓/✓|✓/✓|
|Spark|✓/-|N|
|Sybase|✓/-|N|
|Teradata|✓/-|N|
|Vertica|✓/-|N|
|***File Storage***|||
|Amazon S3|✓/-|✓/-|
|Amazon S3 Compatible|✓/-|✓/-|
|File System|✓/✓|N|
|FTP|✓/-|✓/-|
|Google Cloud Storage|✓/-|✓/-|
|HDFS|✓/-|N|
|Oracle Cloud Storage|✓/-|N|
|SFTP|✓/✓|✓/✓|
|***File Formats***|||
|AVRO|✓/✓|✓/✓|
|Binary|✓/✓|✓/✓|
|Delimited Text|✓/✓|✓/✓|
|Excel|✓/-|✓/-|
|JSON|✓/✓|✓/✓|
|ORC|✓/✓|✓/✓|
|Parquet|✓/✓|✓/✓|
|XML|✓/-|✓/-|
|***NoSQL***|||
|Cassandra|✓/-|N|
|Couchbase|✓/-|N|
|MongoDB|✓/✓|✓/✓|
|MongoDB Atlas|✓/✓|✓/✓|
|***Services & Apps***|||
|Amazon MWS|✓/-|N|
|Concur|✓/-|N|
|Dataverse|✓/✓|✓/✓|
|Dynamics 365|✓/✓|N|
|Dynamics AX|✓/-|N|
|Dynamics CRM|✓/✓|✓/✓|
|Google AdWords|✓/-|N|
|HubSpot|✓/-|N|
|Jira|✓/-|N|
|Magento|✓/-|N|
|Marketo|✓/-|N|
|Microsoft 365|✓/-|✓/-|
|Oracle Eloqua|✓/-|N|
|Oracle Responsys|✓/-|N|
|Zoho|✓/-|N|
|Oracle Service Cloud |✓/-|N|
|PayPal |✓/-|N|
|QuickBooks |✓/-|N|
|Salesforce |✓/✓|N|
|SF Service Cloud |✓/✓|N|
|SF Marketing Cloud  |✓/-|N|
|SAP C4C |✓/✓|N|
|SAP ECC |✓/-|N|
|ServiceNow |✓/-|N|
|SharePoint Online<br>List |✓/-|✓/-|
|Shopify |✓/-|N|
|Square |✓/-|N|
|Web Table |✓/-|N|
|Xero |✓/-|N|
|***Generic***|||
|HTTP |✓/-|✓/-|
|OData |✓/-|✓/-|
|ODBC |✓/✓|N|
|REST |✓/✓|✓/✓|

## Conclusion

To learn how to use the connectors available in Data Factory in Fabric, refer to [Connector overview](connector-overview.md).
