---
title: Connector Comparison Between Azure Data Factory and Data Factory in Fabric
description: This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 10/02/2025
ms.custom:
  - template-how-to
  - connectors
---

# Connector comparison between Azure Data Factory and Data Factory in Fabric

This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric. Connectors play a pivotal role in data integration, enabling the seamless flow of data between various data sources and destinations. Understanding the connector continuity between these two platforms is essential for planning your data workflows.

With Data Factory in Microsoft Fabric, pipelines provide connectivity to a rich set of data sources. See below for the lists of connectors available in Azure Data Factory and Data Factory in Fabric:

- [Azure connectors](#azure-connectors)
- [Microsoft Fabric & data warehouse connectors](#microsoft-fabric--data-warehouse-connectors)
- [Database connectors](#database-connectors)
- [File connectors](#file-connectors)
- [File format connectors](#file-format-connectors)
- [NoSQL connectors](#nosql-connectors)
- [Services and apps connectors](#services--apps-connectors)
- [Generic connectors](#generic-connectors)

## Azure connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **ADF Other Settings** | **Fabric Source/Sink** | **Fabric Authentication** | **Fabric Other Settings** |
|--------------------|---------------------|------------------------|------------------------|------------------------|--------------------------|--------------------------|
| [Azure Blob Storage](connector-azure-blob-storage-overview.md) | ✓/✓                | Anonymous             | Delete activity        | ✓/✓                   | Anonymous               | Delete activity         |
|                    |                     | Account key           | Lookup activity        |                        | Account key             | Lookup activity         |
|                    |                     | Shared Access Signature (SAS) | Get Metadata activity |                        | Shared Access Signature (SAS) | Get Metadata activity |
|                    |                     | Service principal     |                        |                        | Service principal       |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| Azure AI Search index | -/✓              | Basic                 |                        | -/✓                   | Service admin key       |                          |
| [Azure Cosmos DB for NoSQL](connector-azure-cosmosdb-for-nosql-overview.md) | ✓/✓         | Key                   |                        | ✓/✓                   | Account key             |                          |
|                    |                     | Service principal     |                        |                        |                          |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| [Azure Cosmos DB for MongoDB](connector-azure-cosmos-db-for-mongodb-overview.md) | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
| [Azure Data Explorer](connector-azure-data-explorer-overview.md) | ✓/✓                | Service principal     |                        | ✓/✓                   |                          |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| [ADLS Gen2](connector-azure-data-lake-storage-gen2-overview.md) | ✓/✓                | Account key           | Delete activity        | ✓/✓                   | Account key             | Delete activity         |
|                    |                     | Service principal     | Lookup activity        |                        | Service principal       | Lookup activity         |
|                    |                     | Shared Access Signature (SAS) | Get Metadata activity |                        | Shared Access Signature (SAS) | Get Metadata activity |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| [Azure Database for MySQL](connector-azure-database-for-mysql-overview.md) | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
| Azure Databricks Delta Lake | ✓/✓         | Access token          |                        | ✓/✓                   | Personal Access Token   |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        |                          |                          |
| [Azure File Storage](connector-azure-files-overview.md) | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|                    |                     | Shared access signature |                        |                        |                          |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        |                          |                          |
| [Azure Database for PostgreSQL](connector-azure-database-for-postgresql-overview.md) | ✓/✓         | Basic                 |                        | ✓/✓                   | Basic                   |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|                    |                     | Service principal     |                        |                        |                          |                          |
| [Azure Table Storage](connector-azure-table-storage-overview.md) | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|                    |                     | Shared access signature |                        |                        |                          |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
| [Azure SQL Database](connector-azure-sql-database-overview.md) | ✓/✓                | SQL                   | Lookup activity        | ✓/✓                   | Basic                   | Lookup activity         |
|                    |                     | Service principal     | Get Metadata activity  |                        | Service principal       | Get Metadata activity   |
|                    |                     | System-assigned managed identity | Script activity        |                        |                          | Script activity         |
|                    |                     | User-assigned managed identity | Stored procedure activity |                        | Workspace identity      | Stored procedure activity |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| [Azure SQL Managed Instance](connector-azure-sql-managed-instance-overview.md) | ✓/✓         | SQL                   |                        | ✓/✓                   | Basic                   |                          |
|                    |                     | Service principal     |                        |                        | Service principal       |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        |                          |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| [Azure Synapse Analytics](connector-azure-synapse-analytics-overview.md) | ✓/✓         | SQL                   |                        | ✓/✓                   | Basic                   |                          |
|                    |                     | Service principal     |                        |                        | Service principal       |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        | Workspace identity      |                          |
|                    |                     |                        |                        |                        | Organizational account  |                          |
| Azure File Storage | ✓/✓                | Account key           |                        | ✓/✓                   | Account key             |                          |
|                    |                     | Shared access signature |                        |                        |                          |                          |
|                    |                     | System-assigned managed identity |                        |                        |                          |                          |
|                    |                     | User-assigned managed identity |                        |                        |                          |                          |

## Microsoft Fabric & data warehouse connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| Microsoft Fabric Lakehouse | ✓/✓         | Service principal     | ✓/✓                   |                          |
|                    |                     | System-assigned managed identity |                        |                          |
|                    |                     | User-assigned managed identity |                        |                          |
|                    |                     |                        |                        | Organizational account  |
| Microsoft Fabric Warehouse | ✓/✓         | Service principal     | ✓/✓                   |                          |
|                    |                     | System-assigned managed identity |                        |                          |
|                    |                     | User-assigned managed identity |                        |                          |
|                    |                     |                        |                        | Organizational account  |
| Fabric KQL        | N                  |                        | ✓/✓                   | Organizational account  |

## Database connectors

| **Connector Type**        | **ADF Source/Sink** | **ADF Authentication**              | **Fabric Source/Sink** | **Fabric Authentication**              | **Fabric Other Settings** |
|---------------------------|---------------------|-------------------------------------|------------------------|----------------------------------------|---------------------------|
| Amazon Redshift           | ✓/-                | Basic                               | ✓/-                   | Amazon Redshift                        |                           |
| DB2                       | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Google Big Query          | ✓/-                | UserAuthentication                  | ✓/-                   |                                        |                           |
|                           |                     | ServiceAuthentication               |                        | Service Account Login                  |                           |
|                           |                     |                                     |                        |                                        |                           |
| Greenplum                 | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Hive                      | ✓/-                | Anonymous                           | N                      |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
|                           |                     | WindowsAzureHDInsightService        |                        |                                        |                           |
| Impala                    | ✓/-                | Anonymous                           | ✓/-                   |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
| Informix                  | ✓/✓                | Anonymous                           | ✓/✓                   | Anonymous                              |                           |
|                           |                     | Basic                               |                        | Basic                                  |                           |
| MariaDB                   | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Microsoft Access          | ✓/✓                | Anonymous                           | ✓/✓                   | Anonymous                              |                           |
|                           |                     | Basic                               |                        | Basic                                  |                           |
| MySQL                     | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Netezza                   | ✓/-                | Basic                               | N                      |                                        |                           |
| Oracle                    | ✓/✓                | Basic                               | ✓/✓                   | Basic                                  |                           |
| Amazon RDS for Oracle     | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |
| PostgreSQL                | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Presto                    | ✓/-                | Anonymous                           | ✓/-                   | Anonymous                              |                           |
|                           |                     | LDAP                                |                        | LDAP                                   |                           |
| SAP BW Open Hub           | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| SAP BW MDX                | ✓/-                | Basic                               | N                      |                                        |                           |
| SAP HANA                  | ✓/✓                | Basic                               | ✓/-                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows                                |                           |
| SAP Table                 | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |
|                           |                     | Secure Network Communications (SNC) |                        |                                        |                           |
| Snowflake                 | ✓/✓                | Basic                               | ✓/✓                   |                                        |                           |
|                           |                     | KeyPair                             |                        |                                        |                           |
|                           |                     |                                     |                        |                                        | Snowflake                 |
|                           |                     |                                     |                        |                                        | Microsoft Account         |
|                           |                     |                                     |                        |                                        | Organizational account    |
| Amazon RDS for SQL Server | ✓/-                | SQL                                 | ✓/-                   | Basic                                  |                           |
|                           |                     | Windows                             |                        |                                        |                           |
|                           |                     |                                     |                        |                                        |                           |
| SQL Server                | ✓/✓                | SQL                                 | ✓/✓                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows (Only for on-premises gateway) |                           |
|                           |                     |                                     |                        |                                        | Organizational account    |
|                           |                     |                                     |                        |                                        | Service principal         |
| Spark                     | ✓/-                | Anonymous                           | N                      |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
|                           |                     | WindowsAzureHDInsightService        |                        |                                        |                           |
| Sybase                    | ✓/-                | Basic                               | N                      |                                        |                           |
|                           |                     | Windows                             |                        |                                        |                           |
| Teradata                  | ✓/-                | Basic                               | ✓/✓                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows                                |                           |
|                           |                     | LDAP                                |                        |                                        |                           |
| Vertica                   | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |

## File connectors

| **Connector Type**   | **ADF Source/Sink** | **ADF Authentication**        | **Fabric Source/Sink** | **Fabric Authentication** |
|----------------------|---------------------|-------------------------------|------------------------|---------------------------|
| Amazon S3            | ✓/-                | Access key                    |✓/✓                      | Access Key |
|                      |                     | Temporary security credential |                        |
| Amazon S3 Compatible | ✓/-                | Access key                    | ✓/✓                   | Access Key                |
| File System          | ✓/✓                | Windows                       | ✓/✓                   | Windows                   |
| FTP                  | ✓/-                | Basic                         | ✓/-                   | Basic                     |
|                      |                     | Anonymous                     |                        | Anonymous                 |
| Google Cloud Storage | ✓/-                | Access key                    | ✓/✓                   | Basic                     |
| HDFS                 | ✓/-                | Windows                       | ✓/-                   |                           |
|                      |                     | Anonymous                     |                        | Anonymous                 |
| Oracle Cloud Storage | ✓/-                | Access key                    | ✓/-                   | Access Key                |
| SFTP                 | ✓/✓                | Basic                         | ✓/✓                   | Basic                     |
|                      |                     | SSH public key                |                        |                           |
|                      |                     | multifactor                   |                        |                           |

## File format connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| AVRO              | ✓/✓                |                        | ✓/✓                   |                          |
| Binary             | ✓/✓                |                        | ✓/✓                   |                          |
| Delimited Text     | ✓/✓                |                        | ✓/✓                   |                          |
| Excel              | ✓/-                |                        | ✓/-                   |                          |
| JSON               | ✓/✓                |                        | ✓/✓                   |                          |
| ORC                | ✓/✓                |                        | ✓/✓                   |                          |
| Parquet            | ✓/✓                |                        | ✓/✓                   |                          |
| XML                | ✓/-                |                        | ✓/-                   |                          |

## NoSQL connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| Cassandra          | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| MongoDB            | ✓/✓                | Basic                 | ✓/✓                   | Basic                   |
| MongoDB Atlas      | ✓/✓                | Basic                 | ✓/✓                   | Basic                   |

## Services & apps connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| Dataverse          | ✓/✓                | Microsoft Entra service principal | ✓/✓                   | Service principal       |
| Dynamics 365       | ✓/✓                | Microsoft Entra service principal | N                      |                          |
| Dynamics AX        | ✓/-                | OData protocol with Service Principal | N                      |                          |
| Dynamics CRM       | ✓/✓                | Microsoft Entra service principal | ✓/✓                   | Service principal       |
| Google AdWords     | ✓/-                | UserAuthentication    | N                      |                          |
| HubSpot            | ✓/-                | Access token          | N                      |                          |
| Jira               | ✓/-                | Basic                 | N                      |                          |
| Microsoft 365      | ✓/-                | Service principal     | ✓/-                   | Service principal       |
| QuickBooks         | ✓/-                | OAuth 2.0             | N                      |                          |
| Salesforce         | ✓/✓                | OAuth2ClientCredentials | ✓/✓                   | Organizational account  |
| Salesforce Service Cloud | ✓/✓         | OAuth2ClientCredentials | ✓/✓                   | Organizational account  |
| SAP Cloud for Customer (C4C) | ✓/✓         | Basic                 | N                      |                          |
| SAP ECC            | ✓/-                | Basic                 | N                      |                          |
| ServiceNow         | ✓/-                | Basic                 | ✓/-                   | Basic                   |
| SharePoint Online List | ✓/-                | Service principal     | ✓/-                   | Service principal       |
| Shopify            | ✓/-                | Access token          | N                      |                          |
| Square             | ✓/-                | Access token          | N                      |                          |
| Web Table          | ✓/-                | Anonymous             | N                      |                          |
| Xero               | ✓/-                | OAuth_2.0             | N                      |                          |

## Generic connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| HTTP               | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| OData              | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| ODBC               | ✓/✓                | Anonymous             | ✓/✓                   | Anonymous               |
| REST               | ✓/✓                | Anonymous             | ✓/✓                   | Anonymous               |

## Conclusion

To learn how to use the connectors available in Data Factory in Fabric, refer to [Connector overview](connector-overview.md).
