---
title: Connector Continuity between Azure Data Factory (ADF) and Data Factory in Fabric
description: This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Connector continuity between Azure Data Factory (ADF) and Data Factory in Fabric

This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric. Connectors play a pivotal role in data integration, enabling the seamless flow of data between various data sources and destinations. Understanding the connector continuity between these two platforms is essential for planning your data workflows.

## Connector Overview

With Data Factory in Microsoft Fabric, pipelines provide connectivity to a rich set of data sources. See below for the list of connectors available in Azure Data Factory and Data Factory in Fabric.

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


## Connector parity update

| **Category** | **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **ADF Other Settings** | **Fabric Source/Sink** | **Fabric Authentication** | **Fabric Other Settings** |
|--------------|--------------------|---------------------|------------------------|------------------------|------------------------|--------------------------|--------------------------|
| Azure        | Azure Blob Storage | ✓/✓                | Anonymous             | Delete activity        | ✓/✓                   | Anonymous               | Delete activity         |
|              |                    |                     | Account key           | Lookup activity        |                        | Account key             | Lookup activity         |
|              |                    |                     | Shared Access Signature (SAS) | Get Metadata activity |                        | Shared Access Signature (SAS) | Get Metadata activity |
|              |                    |                     | Service principal     |                        |                        | Service principal       |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure AI Search index | -/✓              | Basic                 |                        | -/✓                   | Service admin key       |                          |
|              | Azure Cosmos DB for NoSQL | ✓/✓         | Key                   |                        | ✓/✓                   | Account key             |                          |
|              |                    |                     | Service principal     |                        |                        |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure Cosmos DB for MongoDB | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              | Azure Data Explorer | ✓/✓                | Service principal     |                        | ✓/✓                   |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | ADLS Gen2         | ✓/✓                | Account key           | Delete activity        | ✓/✓                   | Account key             | Delete activity         |
|              |                    |                     | Service principal     | Lookup activity        |                        | Service principal       | Lookup activity         |
|              |                    |                     | Shared Access Signature (SAS) | Get Metadata activity |                        | Shared Access Signature (SAS) | Get Metadata activity |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure Database for MySQL | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              | Azure Databricks Delta Lake | ✓/✓         | Access token          |                        | ✓/✓                   | Personal Access Token   |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              | Azure File Storage | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|              |                    |                     | Shared access signature |                        |                        |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              | Azure Database for PostgreSQL | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | Service principal     |                        |                        |                          |                          |
|              | Azure Table Storage | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|              |                    |                     | Shared access signature |                        |                        |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              | Azure SQL Database | ✓/✓                | SQL                   | Lookup activity        | ✓/✓                   | Basic                   | Lookup activity         |
|              |                    |                     | Service principal     | Get Metadata activity  |                        | Service principal       | Get Metadata activity   |
|              |                    |                     | System-assigned managed identity | Script activity        |                        |                          | Script activity         |
|              |                    |                     | User-assigned managed identity | Stored procedure activity |                        | Workspace identity      | Stored procedure activity |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure SQL Managed Instance | ✓/✓         | SQL                   |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | Service principal     |                        |                        | Service principal       |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure Synapse Analytics | ✓/✓         | SQL                   |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | Service principal     |                        |                        | Service principal       |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Azure File Storage | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|              |                    |                     | Shared access signature |                        |                        |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
| Microsoft Fabric & DW | Microsoft Fabric Lakehouse | ✓/✓         | Service principal     |                        | ✓/✓                   |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Microsoft Fabric Warehouse | ✓/✓         | Service principal     |                        | ✓/✓                   |                          |                          |
|              |                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Fabric KQL        | N                  |                        |                        | ✓/✓                   | Organizational account  |                          |
| Database     | Amazon Redshift    | ✓/-                | Basic                 |                        | ✓/-                   | Amazon Redshift         |                          |
|              | DB2                 | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | Google Big Query   | ✓/-                | UserAuthentication    |                        | ✓/-                   |                          |                          |
|              |                    |                     | ServiceAuthentication |                        |                        | Service Account Login   |                          |
|              |                    |                     |                        |                        |                        |                          |                          |
|              | Greenplum          | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | Hive               | ✓/-                | Anonymous             |                        | N                      |                          |                          |
|              |                    |                     | UsernameAndPassword   |                        |                        |                          |                          |
|              |                    |                     | WindowsAzureHDInsightService |                        |                        |                          |                          |
|              | Impala             | ✓/-                | Anonymous             |                        | ✓/-                   |                          |                          |
|              |                    |                     | UsernameAndPassword   |                        |                        |                          |                          |
|              | Informix           | ✓/✓                | Anonymous             |                        | ✓/✓                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              | MariaDB            | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | Microsoft Access   | ✓/✓                | Anonymous             |                        | ✓/✓                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              | MySQL              | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | Netezza            | ✓/-                | Basic                 |                        | N                      |                          |                          |
|              | Oracle             | ✓/✓                | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              | Amazon RDS for Oracle | ✓/-                | Basic                 |                        | ✓/−                   | Basic                   |                          |
|              | PostgreSQL         | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | Presto             | ✓/-                | Anonymous             |                        | ✓/-                   | Anonymous               |                          |
|              |                    |                     | LDAP                  |                        |                        | LDAP                    |                          |
|              | SAP BW Open Hub    | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              | SAP BW MDX         | ✓/-                | Basic                 |                        | N                      |                          |                          |
|              | SAP HANA           | ✓/✓                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              |                    |                     | Windows                |                        |                        | Windows                 |                          |
|              | SAP Table          | ✓/-                | Basic                 |                        | ✓/−                   | Basic                   |                          |
|              |                    |                     | Secure Network Communications (SNC) |                        |                        |                          |                          |
|              | Snowflake          | ✓/✓                | Basic                 |                        | ✓/✓                   |                          |                          |
|              |                    |                     | KeyPair               |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        | Snowflake               |                          |
|              |                    |                     |                        |                        |                        | Microsoft Account       |                          |
|              | Amazon RDS for SQL Server | ✓/-                | SQL                   |                        | ✓/-                   | Basic                   |                          |
|              |                    |                     | Windows                |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        |                          |                          |
|              | SQL Server         | ✓/✓                | SQL                   |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | Windows                |                        |                        | Windows (Only for on-premises gateway) |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              |                    |                     |                        |                        |                        | Service principal       |                          |
|              | Spark              | ✓/-                | Anonymous             |                        | N                      |                          |                          |
|              |                    |                     | UsernameAndPassword   |                        |                        |                          |                          |
|              |                    |                     | WindowsAzureHDInsightService |                        |                        |                          |                          |
|              | Sybase             | ✓/-                | Basic                 |                        | N                      |                          |                          |
|              |                    |                     | Windows                |                        |                        |                          |                          |
|              | Teradata           | ✓/-                | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | Windows                |                        |                        | Windows                 |                          |
|              |                    |                     | LDAP                  |                        |                        |                          |                          |
|              | Vertica            | ✓/-                | Basic                 |                        | ✓/−                   | Basic                   |                          |
| File         | Amazon S3         | ✓/-                | Access key            |                        | ✓/✓                   | Access Key              |                          |
|              |                    |                     | Temporary security credential |                        |                        |                          |                          |
|              | Amazon S3 Compatible | ✓/-                | Access key            |                        | ✓/✓                   | Access Key              |                          |
|              | File System        | ✓/✓                | Windows                |                        | ✓/✓                   | Windows                 |                          |
|              | FTP                | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              |                    |                     | Anonymous             |                        |                        | Anonymous               |                          |
|              | Google Cloud Storage | ✓/-                | Access key            |                        | ✓/✓                   | Basic                   |                          |
|              | HDFS               | ✓/-                | Windows                |                        | ✓/-                   |                          |                          |
|              |                    |                     | Anonymous             |                        |                        | Anonymous               |                          |
|              | Oracle Cloud Storage | ✓/-                | Access key            |                        | ✓/-                   | Access Key              |                          |
|              | SFTP               | ✓/✓                | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              |                    |                     | SSH public key        |                        |                        |                          |                          |
|              |                    |                     | multifactor           |                        |                        |                          |                          |
| File Formats | AVRO              | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | Binary             | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | Delimited Text     | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | Excel              | ✓/-                |                        |                        | ✓/-                   |                          |                          |
|              | JSON               | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | ORC                | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | Parquet            | ✓/✓                |                        |                        | ✓/✓                   |                          |                          |
|              | XML                | ✓/-                |                        |                        | ✓/-                   |                          |                          |
| NoSQL        | Cassandra          | ✓/-                | Anonymous             |                        | ✓/-                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              | MongoDB            | ✓/✓                | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|              | MongoDB Atlas      | ✓/✓                | Basic                 |                        | ✓/✓                   | Basic                   |                          |
| Services & Apps | Dataverse      | ✓/✓                | Microsoft Entra service principal |                        | ✓/✓                   | Service principal       |                          |
|              |                    |                     | Office 365            |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              | Dynamics 365       | ✓/✓                | Microsoft Entra service principal |                        | N                      |                          |                          |
|              |                    |                     | Office 365            |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              | Dynamics AX        | ✓/-                | OData protocol with Service Principal |                        | N                      |                          |                          |
|              | Dynamics CRM       | ✓/✓                | Microsoft Entra service principal |                        | ✓/✓                   | Service principal       |                          |
|              |                    |                     | Office 365            |                        |                        |                          |                          |
|              |                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|              | IFD                |                      |                        |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        |                          |                          |
|              | Google AdWords     | ✓/-                | UserAuthentication    |                        | N                      |                          |                          |
|              |                    |                     | ServiceAuthentication |                        |                        |                          |                          |
|              | HubSpot            | ✓/-                | Access token          |                        | N                      |                          |                          |
|              | Jira               | ✓/-                | Basic                 |                        | N                      |                          |                          |
|              | Microsoft 365      | ✓/-                | Service principal     |                        | ✓/-                   | Service principal       |                          |
|              | QuickBooks         | ✓/-                | OAuth 2.0             |                        | N                      |                          |                          |
|              | Salesforce         | ✓/✓                | OAuth2ClientCredentials |                        | ✓/✓                   | Organizational account  |                          |
|              | Salesforce Service Cloud | ✓/✓         | OAuth2ClientCredentials |                        | ✓/✓                   | Organizational account  |                          |
|              | SAP Cloud for Customer (C4C) | ✓/✓         | Basic                 |                        | N                      |                          |                          |
|              | SAP ECC            | ✓/-                | Basic                 |                        | N                      |                          |                          |
|              | ServiceNow         | ✓/-                | Basic                 |                        | ✓/-                   | Basic                   |                          |
|              |                    |                     | OAuth2                |                        |                        |                          |                          |
|              | SharePoint Online List | ✓/-                | Service principal     |                        | ✓/-                   | Service principal       |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |
|              |                    |                     |                        |                        |                        | Workspace identity      |                          |
|              | Shopify            | ✓/-                | Access token          |                        | N                      |                          |                          |
|              | Square             | ✓/-                | Access token          |                        | N                      |                          |                          |
|              | Web Table          | ✓/-                | Anonymous             |                        | N                      |                          |                          |
|              | Xero               | ✓/-                | OAuth_2.0             |                        | N                      |                          |                          |
| Generic      | HTTP               | ✓/-                | Anonymous             |                        | ✓/-                   |                          |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              |                    |                     | Digest                |                        |                        |                          |                          |
|              |                    |                     | Windows                |                        |                        |                          |                          |
|              |                    |                     | ClientCertificate     |                        |                        |                          |                          |
|              | OData              | ✓/-                | Anonymous             |                        | ✓/-                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              |                    |                     | Windows                |                        |                        |                          |                          |
|              |                    |                     | Microsoft Entra service principal |                        |                        |                          |                          |
|              | ODBC               | ✓/✓                | Anonymous             |                        | ✓/✓                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              | REST               | ✓/✓                | Anonymous             |                        | ✓/✓                   | Anonymous               |                          |
|              |                    |                     | Basic                 |                        |                        | Basic                   |                          |
|              |                    |                     | OAuth2 Client Credentia |                        |                        |                          |                          |
|              |                    |                     | Service principal     |                        |                        | Service principal       |                          |
|              |                    |                     | AadServicePrincipal   |                        |                        |                          |                          |
|              |                    |                     | ManagedServiceIdentity |                        |                        |                          |                          |
|              |                    |                     |                        |                        |                        | Organizational account  |                          |


## Conclusion

To learn how to use the connectors available in Data Factory in Fabric, refer to [Connector overview](connector-overview.md).
