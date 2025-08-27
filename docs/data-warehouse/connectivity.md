---
title: Warehouse Connectivity
description: Follow steps to connect SSMS to a warehouse item in your Microsoft Fabric workspace.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade, dhsundar, fresantos
ms.date: 08/27/2025
ms.topic: how-to
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---

# Warehouse connectivity in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is accessible through a Tabular Data Stream, or TDS endpoint, familiar to all modern web applications that interact with [a SQL Server TDS endpoint](/sql/relational-databases/security/networking/tds-8). This is referred to as the **SQL connection string** within [!INCLUDE [product-name](../includes/product-name.md)] settings.

This article provides a how-to on connecting to your [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)], or to the snapshot of a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

To get started, you must complete the following prerequisites:

- You need access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md) or a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](../data-warehouse/data-warehousing.md) within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or higher permissions.

## Authentication to warehouses in Fabric

In [!INCLUDE [product-name](../includes/product-name.md)], two types of authenticated users are supported through the SQL connection string:

- Microsoft Entra ID (formerly Azure Active Directory) user principals, or user identities
- Microsoft Entra ID (formerly Azure Active Directory) service principals

For more information, see [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md).

The SQL connection string requires TCP port 1433 to be open. TCP 1433 is the standard SQL Server port number. The SQL connection string also respects the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] security model for data access. Data can be obtained for all objects to which a user has access.

<a id="allow-power-bi-service-tags-through-firewall"></a>

### Allow Azure service tags through firewall

To ensure proper access, you need to allow the Power BI service tags and SQL service tags for firewall access. For more information, see [Power BI Service Tags](/power-bi/enterprise/service-premium-service-tags) and [Service tags](../security/security-service-tags.md). You cannot use the Fully Qualified Domain Name (FQDN) of the TDS Endpoint alone. Allowing the Power BI service tags and SQL service tags is necessary for connectivity through the firewall.

## Retrieve the SQL connection string

To retrieve the connection string, follow these steps:

1. Navigate to your workspace, select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
1. Select the **Copy** button in the **SQL connection string** box to copy the connection string to your clipboard.

Or, in **OneLake**:

1. Select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and select the `...` ellipses for **More options**.
1. Select **Copy SQL connection string** to copy the connection string to your clipboard.

## Get started with SQL Server Management Studio (SSMS)

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).

1. When you open SSMS, the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media/connectivity/object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu.":::

1. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication.

   :::image type="content" source="media/connectivity/connect-server-window.png" alt-text="Screenshot showing the Connect to server window.":::

1. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media/connectivity/object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane.":::

When connecting via SSMS (or ADS), you see both a [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] listed as warehouses, and it's difficult to differentiate between the two item types and their functionality. For this reason, we strongly encourage you to adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience. Only SSMS 19 or higher is supported.

## Connect using Power BI

A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] is a fully supported and native data source within Power BI, and there is no need to use the SQL Connection string. The **Data** pane exposes all of the warehouses you have access to directly. This allows you to easily find your warehouses by workspace, and:

1. Select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
1. Choose entities.
1. Load Data - choose a data connectivity mode: [import or DirectQuery](/power-bi/connect-data/desktop-directquery-about).

For more information, see [Create reports on data warehousing in Microsoft Fabric](create-reports.md).

## Connect using OLE DB

We support connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using OLE DB. Make sure you're running the latest [Microsoft OLE DB Driver for SQL Server](/sql/connect/oledb/oledb-driver-for-sql-server).

## Connect using ODBC

[!INCLUDE [product-name](../includes/product-name.md)] supports connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using ODBC. Make sure you're running the [latest ODBC Driver for SQL Server](/sql/connect/odbc/download-odbc-driver-for-sql-server). Use Microsoft Entra ID (formerly Azure Active Directory) authentication. Only ODBC 18 or higher versions are supported.

## Connect using Fabric Python Notebook

[Fabric Python Notebooks](../data-engineering/using-python-experience-on-notebook.md) (preview) offer the [ability to run T-SQL code with the T-SQL magic command](../data-engineering/tsql-magic-command-notebook.md). In the following steps, connect to a warehouse item in Fabric using the `%%tsql` magic command:

1. Create a notebook in your workspace with the language set to Python.
1. In a cell, use the `%%tsql` magic command. The cell type automatically changes to `T-SQL`. 

   In the following sample, replace `<warehouse>` with the name of your warehouse item. The `-type` parameter should be `Warehouse`.
   
   ```python
   %%tsql -artifact <warehouse> -type Warehouse
   ```

   Then include your T-SQL command. For example, to run a query from a warehouse named `Contoso`:

   ```python
   %%tsql -artifact Contoso -type Warehouse
   SELECT * FROM wh.DimDate;
   ```
1. You can also bind the results to a dataframe with the `-bind` argument:

   ```python
   %%tsql -artifact Contoso -type Warehouse -bind df2
   ```

For more possibilities to query your data with T-SQL inside Python Notebooks, see [Run T-SQL code in Fabric Python notebooks](../data-engineering/tsql-magic-command-notebook.md). To see the full syntax, use the `%tsql?` command. This command displays the help information for the T-SQL magic command, including the available parameters and their descriptions.

## Connect using JDBC

[!INCLUDE [product-name](../includes/product-name.md)] also supports connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using a Java database connectivity (JDBC) driver.

When establishing connectivity via JDBC, check for the following dependencies:

1. Add artifacts. Choose **Add Artifact** and add the following four dependencies, then select **Download/Update** to load all dependencies. For example:

    :::image type="content" source="media/connectivity/download-update.png" alt-text="Screenshot showing where to select Download/Update.":::

1. Select **Test connection**, and **Finish**.

    :::image type="content" source="media/connectivity/dependency-declaration.png" alt-text="Screenshot of the Dependency Declaration tab.":::

    ```xml
    <dependency>
       <groupId>com.microsoft.azure</groupId>
       <artifactId>msal4j</artifactId>
       <version>1.13.3</version>
    
    </dependency>
    
    <dependency>
       <groupId>com.microsoft.sqlserver</groupId>
       <artifactId>mssql-jdbc_auth</artifactId>
       <version>11.2.1.x86</version>
    </dependency>
    
     <dependency>
       <groupId>com.microsoft.sqlserver</groupId>
       <artifactId>mssql-jdbc</artifactId>
       <version>12.1.0.jre11-preview</version>
    </dependency>
    
     <dependency>
       <groupId>com.microsoft.aad</groupId>
       <artifactId>adal</artifactId>
       <version>4.2.2</version>
    </dependency>
    ```

## Connect using dbt

The `dbt` adapter is a data transformation framework that uses software engineering best practices like testing and version control to reduce code, automate dependency management, and ship more reliable data—all with SQL.

The `dbt` data platform-specific adapter plugins allow users to connect to the data store of choice. To connect to a warehouse from `dbt`, use `dbt-fabric` adapter. Similarly, the Azure Synapse Analytics dedicated SQL pool data source has its own adapter, `dbt-synapse`.

Both adapters support Microsoft Entra ID authentication and allow developers to use `az cli authentication`. However, SQL authentication is not supported for `dbt-fabric`

The `dbt` Fabric DW Adapter uses the `pyodbc` library to establish connectivity with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The `pyodbc` library is an ODBC implementation in Python language that uses [Python Database API Specification v2.0](https://peps.python.org/pep-0249/). The `pyodbc` library directly passes connection string to the database driver through SQLDriverConnect in the `msodbc` connection structure to [!INCLUDE [product-name](../includes/product-name.md)] using a TDS (Tabular Data Streaming) proxy service.

For more information, see the following resources:
- [Connect Microsoft Fabric](https://docs.getdbt.com/docs/cloud/connect-data-platform/connect-microsoft-fabric) to connect in dbt Cloud.
- [Microsoft Fabric Data Warehouse dbt adapter setup](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup) to connect with dbt Core.
- [Microsoft Fabric Data Warehouse dbt adapter configuration](https://docs.getdbt.com/reference/resource-configs/fabric-configs) for additional configuration details.

## Connectivity by other means

Any non-Microsoft tool can also use the SQL connection string via ODBC or OLE DB drivers to connect to a [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], using Microsoft Entra ID (formerly Azure Active Directory) authentication. For more information and sample connection strings, see [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md).

### Custom applications

In [!INCLUDE [product-name](../includes/product-name.md)], a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] provide a SQL connection string. Data is accessible from a vast ecosystem of SQL tooling, provided they can authenticate using Microsoft Entra ID (formerly Azure Active Directory). For more information, see [Connection libraries for Microsoft SQL Database](/sql/connect/sql-connection-libraries#drivers-for-relational-access). For more information and sample connection strings, see [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md).

## Best practices

We recommend adding retries in your applications/ETL jobs to build resiliency. For more information, see the following docs:

- [Retry pattern - Azure Architecture Center](/azure/architecture/patterns/retry)
- [Working with transient errors - Azure SQL Database](/azure/azure-sql/database/troubleshoot-common-connectivity-issues?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with ADO.NET - ADO.NET Provider for SQL Server](/sql/connect/ado-net/step-4-connect-resiliently-sql-ado-net?view=fabric&preserve-view=true)
- [Step 4: Connect resiliently to SQL with PHP - PHP drivers for SQL Server](/sql/connect/php/step-4-connect-resiliently-to-sql-with-php?view=fabric&preserve-view=true)

## Considerations and limitations

- SQL Authentication is not supported.
- Multiple Active Result Sets (MARS) is unsupported for [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. MARS is disabled by default, however if `MultipleActiveResultSets` is included in the connection string, it should be removed or set to false.
- If you receive this error "Couldn't complete the operation because we reached a system limit", it's due to the system token size reaching its limit. This issue can be caused if the workspace has too many warehouses/SQL analytics endpoints, if the user is part of too many Microsoft Entra groups, or a combination of the two. We recommend having 40 or fewer warehouses and SQL analytics endpoint per workspace to prevent this error. If the issue persists, contact support.
- If you receive error code 24804 with the message "Couldn't complete the operation due to a system update. Close out this connection, sign in again, and retry the operation" or error code 6005 with the message "SHUTDOWN is in progress. Execution fail against sql server. Please contact SQL Server team if you need further support.", it's due to temporary connection loss, likely because of a system deployment or reconfiguration. To resolve this issue, sign in again and retry. To learn how to build resiliency and retries in your application, see [Best Practices](#best-practices).
- Linked server connections from SQL Server are not supported.

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md)
- [Add Fabric URLs to your allowlist](../security/fabric-allow-list-urls.md)
- [Azure IP ranges and service tags for public clouds](https://www.microsoft.com/download/details.aspx?id=56519)
