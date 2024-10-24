---
title: Troubleshoot the Azure Synapse Analytics, Azure SQL Database, SQL Server, Azure SQL Managed Instance, and Amazon RDS for SQL Server connector
description: Learn how to troubleshoot issues with the Azure Synapse Analytics, Azure SQL Database, SQL Server, Azure SQL Managed Instance, and Amazon RDS for SQL Server connectors in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 10/23/2024ss
---

# Troubleshoot the Azure Synapse Analytics, Azure SQL Database, SQL Server, Azure SQL Managed Instance, and Amazon RDS for SQL Server connectors in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Synapse Analytics, Azure SQL Database, SQL Server, Azure SQL Managed Instance, and Amazon RDS for SQL Server connectors in Data Factory in Microsoft Fabric.

## Error code: SqlFailedToConnect

- **Message**: `Cannot connect to SQL Database: '%server;', Database: '%database;', User: '%user;'. Check the linked service configuration is correct, and make sure the SQL Database firewall allows the integration runtime to access.`
- **Causes and recommendations**: Different causes may lead to this error. Check below list for possible cause analysis and related recommendation.

    | Cause analysis                                               | Recommendation                                               |
    | :----------------------------------------------------------- | :----------------------------------------------------------- |
    | For Azure SQL, if the error message contains the string "SqlErrorNumber=47073", it means that public network access is denied in the connectivity setting. | On the Azure SQL firewall, set the **Deny public network access** option to *No*. For more information, see [Azure SQL connectivity settings](/azure/azure-sql/database/connectivity-settings#deny-public-network-access). |
    | For Azure SQL, if the error message contains an SQL error code such as "SqlErrorNumber=[errorcode]", see the Azure SQL troubleshooting guide. | For a recommendation, see [Troubleshoot connectivity issues and other errors with Azure SQL Database and Azure SQL Managed Instance](/azure/azure-sql/database/troubleshoot-common-errors-issues). |
    | Check to see whether port 1433 is in the firewall allowlist. | For more information, see [Ports used by SQL Server](/sql/sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access#ports-used-by-). |
    | If the error message contains the string "SqlException", SQL Database the error indicates that some specific operation failed. | For more information, search by SQL error code in [Database engine errors](/sql/relational-databases/errors-events/database-engine-events-and-errors). For further help, contact Azure SQL support. |
    | If this is a transient issue (for example, an instable network connection), add retry in the activity policy to mitigate. | For more information, see [Pipelines and activities](/azure/data-factory/concepts-pipelines-activities#activity-policy). |
    | If the error message contains the string "Client with IP address '...' is not allowed to access the server", and you're trying to connect to Azure SQL Database, the error is usually caused by an Azure SQL Database firewall issue. | In the Azure SQL Server firewall configuration, enable the **Allow Azure services and resources to access this server** option. For more information, see [Azure SQL Database and Azure Synapse IP firewall rules](/azure/azure-sql/database/firewall-configure). |
    |If the error message contains `Login failed for user '<token-identified principal>'`, this error is usually caused by not granting enough permission to your service principal or system-assigned managed identity or user-assigned managed identity (depends on which authentication type you choose) in your database. |Grant enough permission to your service principal or system-assigned managed identity or user-assigned managed identity in your database.  <br/><br/> **For Azure SQL Database**:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- If you use service principal authentication, follow [Service principal authentication](connector-azure-sql-database.md#service-principal-authentication).<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **For Azure Synapse Analytics**:<br/>&nbsp;&nbsp;&nbsp;&nbsp;- If you use service principal authentication, follow [Service principal authentication](/azure/data-factory/connector-azure-sql-data-warehouse#service-principal-authentication).<br/>&nbsp;&nbsp;&nbsp;&nbsp;- **For Azure SQL Managed Instance**: <br/>&nbsp;&nbsp;&nbsp;&nbsp;- If you use service principal authentication, follow [Service principal authentication](/azure/data-factory/connector-azure-sql-managed-instance#service-principal-authentication).<br/>&nbsp;&nbsp;&nbsp;- If you use system-assigned managed identity authentication, follow [System-assigned managed identity authentication](/azure/data-factory/connector-azure-sql-managed-instance#managed-identity).<br/>&nbsp;&nbsp;&nbsp;- If you use user-assigned managed identity authentication, follow [User-assigned managed identity authentication](/azure/data-factory/connector-azure-sql-managed-instance#user-assigned-managed-identity-authentication).|
    | If you meet the error message that contains `The server was not found or was not accessible` when using Azure SQL Managed Instance, this error is usually caused by not enabling the Azure SQL Managed Instance public endpoint.| Refer to [Configure public endpoint in Azure SQL Managed Instance](/azure/azure-sql/managed-instance/public-endpoint-configure) to enable the Azure SQL Managed Instance public endpoint. |

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
