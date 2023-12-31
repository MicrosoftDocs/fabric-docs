---
title: Connectivity to data warehousing
description: Follow steps to connect SSMS to data warehousing in your Microsoft Fabric workspace.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 12/06/2023
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
---
# Connectivity to data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In Microsoft [!INCLUDE [product-name](../includes/product-name.md)], a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is accessible through a Tabular Data Stream, or TDS endpoint, familiar to all modern web applications that interact with a SQL Server endpoint. This is referred to as the SQL Connection String within the [!INCLUDE [product-name](../includes/product-name.md)] user interface.

This article provides a how-to on connecting to your [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. 

To get started, you must complete the following prerequisites:

- You need access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md) or a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](../data-warehouse/data-warehousing.md) within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or higher permissions.

## Authentication to warehouses in Fabric

In [!INCLUDE [product-name](../includes/product-name.md)], two types of authenticated users are supported through the SQL connection string:

- Microsoft Entra ID (formerly Azure Active Directory) user principals, or user identities
- Microsoft Entra ID (formerly Azure Active Directory) service principals

The SQL connection string requires TCP port 1433 to be open. TCP 1433 is the standard SQL Server port number. The SQL connection string also respects the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] security model for data access. Data can be obtained for all objects to which a user has access.

## Retrieve the SQL connection string

To retrieve the connection string, follow these steps:

1. Navigate to your workspace, select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and select **More options**. 

   :::image type="content" source="media/connectivity/workspace-warehouse-more-options.png" alt-text="Screenshot of a workspace item for a warehouse. The More options button is boxed.":::

1. Select **Copy SQL connection string** to copy the connection string to your clipboard.

   :::image type="content" source="media\connectivity\warehouse-copy-sql-connection-string.png" alt-text="Screenshot of the workspace screen with the context menu open." lightbox="media\connectivity\warehouse-copy-sql-connection-string.png":::

## Get started with SQL Server Management Studio (SSMS)

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).

1. When you open SSMS, the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media\connectivity\object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu." lightbox="media\connectivity\object-explorer-connect-menu.png":::

1. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication. Remember that only Microsoft Entra multifactor authentication (MFA) is supported.

   :::image type="content" source="media\connectivity\connect-server-window.png" alt-text="Screenshot showing the Connect to server window." lightbox="media\connectivity\connect-server-window.png":::

1. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media\connectivity\object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane." lightbox="media\connectivity\object-explorer-example.png":::

When connecting via SSMS (or ADS), you see both a [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] listed as warehouses, and it's difficult to differentiate between the two item types and their functionality. For this reason, we strongly encourage you to adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience.

## Connect using Power BI

A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] is a fully supported and native data source within Power BI, and there is no need to use the SQL Connection string. The Data Hub exposes all of the warehouses you have access to directly. This allows you to easily find your warehouses by workspace, and:

1. Select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]
1. Choose entities
1. Load Data - choose a data connectivity mode: [import or DirectQuery](/power-bi/connect-data/desktop-directquery-about)

For more information, see [Create reports in Microsoft [!INCLUDE [product-name](../includes/product-name.md)]](create-reports.md).

## Connect using OLE DB

We support connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using OLE DB. Make sure you're running the latest [Microsoft OLE DB Driver for SQL Server](/sql/connect/oledb/oledb-driver-for-sql-server).

## Connect using ODBC

Microsoft [!INCLUDE [product-name](../includes/product-name.md)] supports connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using ODBC. Make sure you're running the [latest ODBC Driver for SQL Server](/sql/connect/odbc/download-odbc-driver-for-sql-server). Use Microsoft Entra ID (formerly Azure Active Directory) authentication.

## Connect using JDBC

Microsoft [!INCLUDE [product-name](../includes/product-name.md)] also supports connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using a Java database connectivity (JDBC) driver.

When establishing connectivity via JDBC, check for the following dependencies:

1. Add artifacts, choose **Add Artifact** and add the following four dependencies in the window like this, then select **Download/Update** to load all dependencies.

    :::image type="content" source="media\connectivity\download-update.png" alt-text="Screenshot showing where to select Download/Update." lightbox="media\connectivity\download-update.png":::

1. Select **Test connection**, and **Finish**.

    :::image type="content" source="media\connectivity\dependency-declaration.png" alt-text="Screenshot of the Dependency Declaration tab." lightbox="media\connectivity\dependency-declaration.png":::

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

The `dbt` data platform-specific adapter plugins allow users to connect to the data store of choice. To connect to Synapse Data Warehouse in Microsoft [!INCLUDE [product-name](../includes/product-name.md)] from `dbt` use `dbt-fabric` adapter. Similarly, the Azure Synapse Analytics dedicated SQL pool data source has its own adapter, `dbt-synapse`.

Both adapters support Microsoft Entra ID (formerly Azure Active Directory) authentication and allow developers to use `az cli authentication`. However, SQL authentication is not supported for `dbt-fabric`

The DBT Fabric DW Adapter uses the `pyodbc` library to establish connectivity with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The `pyodbc` library is an ODBC implementation in Python language that uses [Python Database API Specification v2.0](https://peps.python.org/pep-0249/).  The `pyodbc` library directly passes connection string to the database driver through SQLDriverConnect in the `msodbc` connection structure to [!INCLUDE [product-name](../includes/product-name.md)] using a TDS (Tabular Data Streaming) proxy service.

For more information, see the [Microsoft Fabric Synapse Data Warehouse dbt adapter setup](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup) and [Microsoft Fabric Synapse Data Warehouse dbt adapter configuration](https://docs.getdbt.com/reference/resource-configs/fabric-configs).

## Connectivity by other means

Any third-party tool can use the SQL Connection string via ODBC or OLE DB drivers to connect to a Microsoft [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], using Microsoft Entra ID (formerly Azure Active Directory) authentication.

### Custom applications

In [!INCLUDE [product-name](../includes/product-name.md)], a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] provide a SQL connection string. Data is accessible from a vast ecosystem of SQL tooling, provided they can authenticate using Microsoft Entra ID (formerly Azure Active Directory). For more information, see [Connection libraries for Microsoft SQL Database](/sql/connect/sql-connection-libraries#drivers-for-relational-access).

## Considerations and limitations

- SQL Authentication is not supported.
- Multiple Active Result Sets (MARS) is unsupported for [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. MARS is disabled by default, however if `MultipleActiveResultSets` is included in the connection string, it should be removed or set to false.
- On connection to a warehouse, you might receive an error that "The token size exceeded the maximum allowed payload size". This is due to having a large number of warehouses within the workspace or being a member of a large number of Microsoft Entra groups. In event of this error, work with the Workspace admin to clean up unused Warehouses and retry the connection, or contact support if the problem persists.
- Linked server connections from SQL Server are not supported.

## Related content

- [Create a warehouse in Microsoft [!INCLUDE [product-name](../includes/product-name.md)]](create-warehouse.md)
- [Better together: the lakehouse and warehouse in Microsoft [!INCLUDE [product-name](../includes/product-name.md)]](get-started-lakehouse-sql-analytics-endpoint.md)
