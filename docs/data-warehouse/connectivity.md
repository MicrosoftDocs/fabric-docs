---
title: Warehouse Connectivity
description: Learn about connecting to Fabric Data Warehouse, including authentication and best practices.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos, salilkanade
ms.date: 08/27/2025
ms.topic: concept-article
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---

# Warehouse connectivity in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], a [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is accessible through a Tabular Data Stream, or TDS endpoint, familiar to all modern web applications that interact with [a SQL Server TDS endpoint](/sql/relational-databases/security/networking/tds-8). This is referred to as the **SQL connection string** within [!INCLUDE [product-name](../includes/product-name.md)] settings.

> [!TIP]
> For a tutorial on connecting with common tools, see [Connect to Fabric Data Warehouse](how-to-connect.md).

## Authentication to warehouses in Fabric

In [!INCLUDE [product-name](../includes/product-name.md)], two types of authenticated users are supported through the SQL connection string:

- Microsoft Entra ID user principals, or user identities
- Microsoft Entra ID service principals

For more information, see [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md).

The SQL connection string requires TCP port 1433 to be open. TCP 1433 is the standard SQL Server port number. The SQL connection string also respects the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] security model for data access. Data can be obtained for all objects to which a user has access.

For more about security in the SQL anlaytics endpoint, see [OneLake security for SQL analytics endpoints](../onelake/sql-analytics-endpoint-onelake-security.md).

## Best practices

We recommend adding retries in your applications/ETL jobs to build resiliency. For more information, see the following docs:

- [Retry pattern - Azure Architecture Center](/azure/architecture/patterns/retry)
- [Working with transient errors - Azure SQL Database](/azure/azure-sql/database/troubleshoot-common-connectivity-issues?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with ADO.NET - ADO.NET Provider for SQL Server](/sql/connect/ado-net/step-4-connect-resiliently-sql-ado-net?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with PHP - PHP drivers for SQL Server](/sql/connect/php/step-4-connect-resiliently-to-sql-with-php?view=fabric&preserve-view=true)
- Use service tags for firewall clearance, as described in the following section.

<a id="allow-power-bi-service-tags-through-firewall"></a>

### Allow Azure service tags through firewall

Allowing Power BI service tags and SQL service tags is necessary for connectivity through the firewall. For more information, see [Power BI Service Tags](/power-bi/enterprise/service-premium-service-tags) and [Service tags](../security/security-service-tags.md). 

You cannot use the Fully Qualified Domain Name (FQDN) of the TDS Endpoint alone. 

## Considerations and limitations

- SQL Authentication is not supported.
- Multiple Active Result Sets (MARS) is unsupported for [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. MARS is disabled by default, however if `MultipleActiveResultSets` is included in the connection string, it should be removed or set to false.
- If you receive this error "Couldn't complete the operation because we reached a system limit", it's due to the system token size reaching its limit. This issue can be caused if the workspace has too many warehouses/SQL analytics endpoints, if the user is part of too many Microsoft Entra groups, or a combination of the two. We recommend having 40 or fewer warehouses and SQL analytics endpoint per workspace to prevent this error. If the issue persists, contact support.
- If you receive error code 24804 with the message "Couldn't complete the operation due to a system update. Close out this connection, sign in again, and retry the operation" or error code 6005 with the message "SHUTDOWN is in progress. Execution fail against sql server. Please contact SQL Server team if you need further support.", it's due to temporary connection loss, likely because of a system deployment or reconfiguration. To resolve this issue, sign in again and retry. To learn how to build resiliency and retries in your application, see [Best Practices](#best-practices).
- Linked server connections from SQL Server are not supported.

## Next step

> [!div class="nextstepaction"]
> [Connect to Fabric Data Warehouse](how-to-connect.md)

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md)
- [Add Fabric URLs to your allowlist](../security/fabric-allow-list-urls.md)
- [Azure IP ranges and service tags for public clouds](https://www.microsoft.com/download/details.aspx?id=56519)
