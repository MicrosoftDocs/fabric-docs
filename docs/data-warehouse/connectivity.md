---
title: Warehouse Connectivity
description: Learn about connecting to Fabric Data Warehouse, including authentication and best practices.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos, salilkanade, pvenkat
ms.date: 01/23/2026
ms.topic: concept-article
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---

# Warehouse connectivity

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], users access a [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] through a Tabular Data Stream (TDS) endpoint. This endpoint is familiar to all modern web applications that interact with [a SQL Server TDS endpoint](/sql/relational-databases/security/networking/tds-8). Within [!INCLUDE [product-name](../includes/product-name.md)] settings, this endpoint is labeled as the **SQL connection string**.

> [!TIP]
> For a tutorial on connecting with common tools, see [Connect to Fabric Data Warehouse](how-to-connect.md).

## Authentication to warehouses in Fabric

In [!INCLUDE [product-name](../includes/product-name.md)], the SQL connection string supports two types of authenticated users:

- Microsoft Entra ID user principals, or user identities
- Microsoft Entra ID service principals

For more information, see [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md).

The SQL connection string requires TCP port 1433 to be open. TCP 1433 is the standard SQL Server port number. The SQL connection string also respects the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] security model for data access. Users can access data for all objects to which they have permission.

For more information about security in the SQL analytics endpoint, see [OneLake security for SQL analytics endpoints](../onelake/sql-analytics-endpoint-onelake-security.md).

## Best practices

Add retries to your applications and ETL jobs to make them more resilient. For more information, see the following documentation:

- [Retry pattern - Azure Architecture Center](/azure/architecture/patterns/retry)
- [Working with transient errors - Azure SQL Database](/azure/azure-sql/database/troubleshoot-common-connectivity-issues?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with ADO.NET - ADO.NET Provider for SQL Server](/sql/connect/ado-net/step-4-connect-resiliently-sql-ado-net?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with PHP - PHP drivers for SQL Server](/sql/connect/php/step-4-connect-resiliently-to-sql-with-php?view=fabric&preserve-view=true)
- Use service tags for firewall clearance, as described in the following section.
- Always specify the **Initial Catalog** or **Database** property when connecting to your Fabric Data Warehouse. For more information, see [Initial catalog required](#initial-catalog-required).

<a id="allow-power-bi-service-tags-through-firewall"></a>

### Allow Azure service tags through firewall

To enable connectivity through the firewall, you need to allow Power BI service tags and SQL service tags. For more information, see [Power BI Service Tags](/power-bi/enterprise/service-premium-service-tags) and [Service tags](../security/security-service-tags.md). 

You can't use the Fully Qualified Domain Name (FQDN) of the TDS Endpoint alone. 

## Considerations and limitations

- SQL Authentication isn't supported.
- Multiple Active Result Sets (MARS) isn't supported for [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. MARS is disabled by default. If `MultipleActiveResultSets` is included in the connection string, remove it or set it to false.
- If you receive the error "Couldn't complete the operation because we reached a system limit", it's due to the system token size reaching its limit. This error can occur if the workspace has too many warehouses or SQL analytics endpoints, if the user is part of too many Microsoft Entra groups, or a combination of these two factors. To prevent this error, limit the number of warehouses and SQL analytics endpoints per workspace to 40 or fewer. If the error persists, contact support.
- If you receive error code 24804 with the message "Couldn't complete the operation due to a system update. Close out this connection, sign in again, and retry the operation" or error code 6005 with the message "SHUTDOWN is in progress. Execution fail against sql server. Please contact SQL Server team if you need further support.", it's due to temporary connection loss, likely because of a system deployment or reconfiguration. To resolve this issue, sign in again and retry. To learn how to build resiliency and retries in your application, see [Best Practices](#best-practices).
- Linked server connections from SQL Server aren't supported.

### Initial catalog required

When you connect to Fabric Data Warehouse using any client tools (such as SSMS, Visual Studio Code, Visual Studio, JDBC/ODBC/SqlClient clients, or custom applications), you must provide a valid warehouse name in the connection string's **Initial Catalog** or **Database** property.

If the specified warehouse name is incorrect, the connection attempt fails even if authentication succeeds. Users will see the following error: "Login failed for user '\<token-identified principal\>'. Reason: Authentication was successful, but the database was not found, or you have insufficient permissions to connect to it."

The valid warehouse name does not include the `<unique identifier>.datawarehouse.fabric.microsoft.com` needed for the **Server name**. If your warehouse name is `NYC Taxi`, your **Initial Catalog** is `NYC Taxi`.

The following screenshot shows the error as it appears in SSMS when an invalid warehouse name is provided as the **Initial Catalog**:

:::image type="content" source="media/connectivity/login-failed-for-user.png" alt-text="Screenshot of the SSMS error message when a valid initial catalog is not provided.":::

## Next step

> [!div class="nextstepaction"]
> [Connect to Fabric Data Warehouse](how-to-connect.md)

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md)
- [Add Fabric URLs to your allow list](../security/fabric-allow-list-urls.md)
- [Azure IP ranges and service tags for public clouds](https://www.microsoft.com/download/details.aspx?id=56519)
