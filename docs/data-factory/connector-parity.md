---
title: Connector Capability Comparison Between Azure Data Factory and Data Factory in Fabric
description: This documentation provides an in-depth comparison of connector availability between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 10/02/2025
ms.custom:
  - template-how-to
  - connectors
---

# Connector capability comparison between Azure Data Factory and Data Factory in Fabric

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
| [Microsoft Fabric Lakehouse](connector-lakehouse-overview.md) | ✓/✓         | Service principal     | ✓/✓                   |                          |
|                    |                     | System-assigned managed identity |                        |                          |
|                    |                     | User-assigned managed identity |                        |                          |
|                    |                     |                        |                        | Organizational account  |
| [Microsoft Fabric Warehouse](connector-data-warehouse-overview.md) | ✓/✓         | Service principal     | ✓/✓                   |                          |
|                    |                     | System-assigned managed identity |                        |                          |
|                    |                     | User-assigned managed identity |                        |                          |
|                    |                     |                        |                        | Organizational account  |
| [Fabric KQL](connector-kql-database-overview.md)        | N                  |                        | ✓/✓                   | Organizational account  |

## Database connectors

| **Connector Type**        | **ADF Source/Sink** | **ADF Authentication**              | **Fabric Source/Sink** | **Fabric Authentication**              | **Fabric Other Settings** |
|---------------------------|---------------------|-------------------------------------|------------------------|----------------------------------------|---------------------------|
| [Amazon Redshift](connector-amazon-redshift-overview.md)           | ✓/-                | Basic                               | ✓/-                   | Amazon Redshift                        |                           |
| [DB2](connector-ibm-db2-database-overview.md)                       | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| [Google Big Query](connector-google-bigquery-overview.md)          | ✓/-                | UserAuthentication                  | ✓/-                   |                                        |                           |
|                           |                     | ServiceAuthentication               |                        | Service Account Login                  |                           |
|                           |                     |                                     |                        |                                        |                           |
| [Greenplum](connector-greenplum-for-pipeline-overview.md)                 | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Hive                      | ✓/-                | Anonymous                           | N                      |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
|                           |                     | WindowsAzureHDInsightService        |                        |                                        |                           |
| [Impala](connector-impala-overview.md)                    | ✓/-                | Anonymous                           | ✓/-                   |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
| [Informix](connector-informix-for-pipeline-overview.md)                  | ✓/✓                | Anonymous                           | ✓/✓                   | Anonymous                              |                           |
|                           |                     | Basic                               |                        | Basic                                  |                           |
| [MariaDB](connector-mariadb-overview.md)                   | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| [Microsoft Access](connector-microsoft-access-overview.md)          | ✓/✓                | Anonymous                           | ✓/✓                   | Anonymous                              |                           |
|                           |                     | Basic                               |                        | Basic                                  |                           |
| [MySQL](connector-mysql-database-overview.md)                     | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| Netezza                   | ✓/-                | Basic                               | N                      |                                        |                           |
| [Oracle](connector-oracle-database-overview.md)                    | ✓/✓                | Basic                               | ✓/✓                   | Basic                                  |                           |
| [Amazon RDS for Oracle](connector-amazon-rds-for-oracle-overview.md)     | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |
| [PostgreSQL](connector-postgresql-overview.md)                | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| [Presto](connector-presto-overview.md)                    | ✓/-                | Anonymous                           | ✓/-                   | Anonymous                              |                           |
|                           |                     | LDAP                                |                        | LDAP                                   |                           |
| [SAP BW Open Hub](connector-sap-bw-open-hub-application-server-overview.md)           | ✓/-                | Basic                               | ✓/-                   | Basic                                  |                           |
| SAP BW MDX                | ✓/-                | Basic                               | N                      |                                        |                           |
| [SAP HANA](connector-sap-hana-overview.md)                  | ✓/✓                | Basic                               | ✓/-                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows                                |                           |
| [SAP Table](connector-sap-table-application-server-overview.md)                 | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |
|                           |                     | Secure Network Communications (SNC) |                        |                                        |                           |
| [Snowflake](connector-snowflake-overview.md)                 | ✓/✓                | Basic                               | ✓/✓                   |                                        |                           |
|                           |                     | KeyPair                             |                        |                                        |                           |
|                           |                     |                                     |                        |                                        | Snowflake                 |
|                           |                     |                                     |                        |                                        | Microsoft Account         |
|                           |                     |                                     |                        |                                        | Organizational account    |
| [Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-overview.md) | ✓/-                | SQL                                 | ✓/-                   | Basic                                  |                           |
|                           |                     | Windows                             |                        |                                        |                           |
|                           |                     |                                     |                        |                                        |                           |
| [SQL Server](connector-sql-server-database-overview.md)                | ✓/✓                | SQL                                 | ✓/✓                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows (Only for on-premises gateway) |                           |
|                           |                     |                                     |                        |                                        | Organizational account    |
|                           |                     |                                     |                        |                                        | Service principal         |
| Spark                     | ✓/-                | Anonymous                           | N                      |                                        |                           |
|                           |                     | UsernameAndPassword                 |                        |                                        |                           |
|                           |                     | WindowsAzureHDInsightService        |                        |                                        |                           |
| Sybase                    | ✓/-                | Basic                               | N                      |                                        |                           |
|                           |                     | Windows                             |                        |                                        |                           |
| [Teradata](connector-teradata-database-overview.md)                  | ✓/-                | Basic                               | ✓/✓                   | Basic                                  |                           |
|                           |                     | Windows                             |                        | Windows                                |                           |
|                           |                     | LDAP                                |                        |                                        |                           |
| [Vertica](connector-vertica-overview.md)                   | ✓/-                | Basic                               | ✓/−                   | Basic                                  |                           |

## File connectors

| **Connector Type**   | **ADF Source/Sink** | **ADF Authentication**        | **Fabric Source/Sink** | **Fabric Authentication** |
|----------------------|---------------------|-------------------------------|------------------------|---------------------------|
| [Amazon S3](connector-amazon-s3-overview.md)            | ✓/-                | Access key                    |✓/✓                      | Access Key |
|                      |                     | Temporary security credential |                        |
| [Amazon S3 Compatible](connector-amazon-s3-compatible-overview.md) | ✓/-                | Access key                    | ✓/✓                   | Access Key                |
| File System          | ✓/✓                | Windows                       | ✓/✓                   | Windows                   |
| [FTP](connector-ftp-overview.md)                  | ✓/-                | Basic                         | ✓/-                   | Basic                     |
|                      |                     | Anonymous                     |                        | Anonymous                 |
| [Google Cloud Storage](connector-google-cloud-storage-overview.md) | ✓/-                | Access key                    | ✓/✓                   | Basic                     |
| [HDFS](connector-hdfs-for-pipeline-overview.md)                 | ✓/-                | Windows                       | ✓/-                   |                           |
|                      |                     | Anonymous                     |                        | Anonymous                 |
| [Oracle Cloud Storage](connector-oracle-cloud-storage-overview.md) | ✓/-                | Access key                    | ✓/-                   | Access Key                |
| [SFTP](connector-sftp-overview.md)                 | ✓/✓                | Basic                         | ✓/✓                   | Basic                     |
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
| [Cassandra](connector-cassandra-overview.md)          | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| [MongoDB](connector-mongodb-overview.md)            | ✓/✓                | Basic                 | ✓/✓                   | Basic                   |
| [MongoDB Atlas](connector-mongodb-atlas-overview.md)      | ✓/✓                | Basic                 | ✓/✓                   | Basic                   |

## Services & apps connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| [Dataverse](connector-dataverse-overview.md)          | ✓/✓                | Microsoft Entra service principal | ✓/✓                   | Service principal       |
| Dynamics 365       | ✓/✓                | Microsoft Entra service principal | N                      |                          |
| [Dynamics AX](connector-dynamics-ax-overview.md)        | ✓/-                | OData protocol with Service Principal | N                      |                          |
| [Dynamics CRM](connector-dynamics-crm-overview.md)       | ✓/✓                | Microsoft Entra service principal | ✓/✓                   | Service principal       |
| Google AdWords     | ✓/-                | UserAuthentication    | N                      |                          |
| HubSpot            | ✓/-                | Access token          | N                      |                          |
| Jira               | ✓/-                | Basic                 | N                      |                          |
| [Microsoft 365](connector-microsoft-365-overview.md)      | ✓/-                | Service principal     | ✓/-                   | Service principal       |
| QuickBooks         | ✓/-                | OAuth 2.0             | N                      |                          |
| [Salesforce](connector-salesforce-objects-overview.md)         | ✓/✓                | OAuth2ClientCredentials | ✓/✓                   | Organizational account  |
| [Salesforce Service Cloud](connector-salesforce-service-cloud-overview.md) | ✓/✓         | OAuth2ClientCredentials | ✓/✓                   | Organizational account  |
| SAP Cloud for Customer (C4C) | ✓/✓         | Basic                 | N                      |                          |
| SAP ECC            | ✓/-                | Basic                 | N                      |                          |
| [ServiceNow](connector-servicenow-overview.md)         | ✓/-                | Basic                 | ✓/-                   | Basic                   |
| [SharePoint Online List](connector-sharepoint-online-list-overview.md) | ✓/-                | Service principal     | ✓/-                   | Service principal       |
| Shopify            | ✓/-                | Access token          | N                      |                          |
| Square             | ✓/-                | Access token          | N                      |                          |
| Web Table          | ✓/-                | Anonymous             | N                      |                          |
| Xero               | ✓/-                | OAuth_2.0             | N                      |                          |

## Generic connectors

| **Connector Type** | **ADF Source/Sink** | **ADF Authentication** | **Fabric Source/Sink** | **Fabric Authentication** |
|--------------------|---------------------|------------------------|------------------------|--------------------------|
| [HTTP](connector-http-overview.md)               | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| [OData](connector-odata-overview.md)              | ✓/-                | Anonymous             | ✓/-                   | Anonymous               |
| [ODBC](connector-odbc-overview.md)               | ✓/✓                | Anonymous             | ✓/✓                   | Anonymous               |
| [REST](connector-rest-overview.md)               | ✓/✓                | Anonymous             | ✓/✓                   | Anonymous               |

## Conclusion

To learn how to use the connectors available in Data Factory in Fabric, refer to [Connector overview](connector-overview.md).
