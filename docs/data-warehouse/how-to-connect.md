---
title: How to Connect
description: Follow steps to connect SSMS to a warehouse item in your Microsoft Fabric workspace.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos, salilkanade
ms.date: 08/27/2025
ms.topic: how-to
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---

# Connect to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This tutorial covers connecting tools and applications to your [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)], or to the snapshot of a [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

To get started, you need access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md) or a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](../data-warehouse/data-warehousing.md) within a workspace with **Contributor** or higher permissions.

## Find the warehouse connection string

1. Open the **Settings** of your warehouse or SQL analytics endpoint.
1. In the **Settings** window, select the **SQL endpoint** page.
1. Copy the **SQL connection string** and use it to connect externally to the item from Power BI desktop, applications, or client tools.
1. Always provide the warehouse name as the **Initial Catalog** or **Database name** when you connect.

   :::image type="content" source="media/how-to-connect/connection-string.png" alt-text="Screenshot from the Fabric portal of the Settings window, SQL endpoint page.":::

## Connect using SQL Server Management Studio (SSMS)

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms).

1. When you open SSMS, the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media/connectivity/object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu.":::

1. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Your server name looks something like `<unique identifier>.datawarehouse.fabric.microsoft.com`. Select **Connect** and proceed with the appropriate credentials for authentication.

   :::image type="content" source="media/connectivity/connect-server-window.png" alt-text="Screenshot showing the Connect to server window.":::

1. Provide the warehouse name you intend to connect to. The valid warehouse name does not include the `<unique identifier>.datawarehouse.fabric.microsoft.com` needed for the **Server name**. If your warehouse name is `NYC Taxi`, your **Initial Catalog** is `NYC Taxi`.

1. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media/connectivity/object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane.":::

When connecting via SSMS (or ADS), you see both a [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] listed as warehouses. Adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience. Only SSMS 19 or higher is supported.

## Connect using Power BI

A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] is a fully supported and native data source within Power BI, and there's no need to use the SQL Connection string. The **Data** pane exposes all of the warehouses you have access to directly. This allows you to easily find your warehouses by workspace, and:

1. Select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].
1. Choose entities.
1. Load Data - choose a data connectivity mode: [import or DirectQuery](/power-bi/connect-data/desktop-directquery-about).

For more information, see [Create reports on data warehousing in Microsoft Fabric](create-reports.md).

## Connect using OLE DB

We support connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using OLE DB. Make sure you're running the latest [Microsoft OLE DB Driver for SQL Server](/sql/connect/oledb/oledb-driver-for-sql-server).

## Connect using ODBC

[!INCLUDE [product-name](../includes/product-name.md)] supports connectivity to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] using ODBC. Make sure you're running the [latest ODBC Driver for SQL Server](/sql/connect/odbc/download-odbc-driver-for-sql-server). Use Microsoft Entra ID authentication. Only ODBC 18 or higher versions are supported.

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

Both adapters support Microsoft Entra ID authentication and allow developers to use `az cli authentication`. However, SQL authentication isn't supported for `dbt-fabric`.

The `dbt` Fabric DW Adapter uses the `pyodbc` library to establish connectivity with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The `pyodbc` library is an ODBC implementation in Python language that uses [Python Database API Specification v2.0](https://peps.python.org/pep-0249/). The `pyodbc` library directly passes connection string to the database driver through SQLDriverConnect in the `msodbc` connection structure to [!INCLUDE [product-name](../includes/product-name.md)] using a TDS (Tabular Data Streaming) proxy service.

For more information, see the following resources:
- [Connect Microsoft Fabric](https://docs.getdbt.com/docs/cloud/connect-data-platform/connect-microsoft-fabric) to connect in dbt Cloud.
- [Microsoft Fabric Data Warehouse dbt adapter setup](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup) to connect with dbt Core.
- [Microsoft Fabric Data Warehouse dbt adapter configuration](https://docs.getdbt.com/reference/resource-configs/fabric-configs) for additional configuration details.

## Connectivity by other means

Any non-Microsoft tool can also use the SQL connection string via ODBC or OLE DB drivers to connect to a [!INCLUDE [product-name](../includes/product-name.md)] [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], using Microsoft Entra ID authentication. For more information and sample connection strings, see [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md).

### Custom applications

In [!INCLUDE [product-name](../includes/product-name.md)], a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] provide a SQL connection string. Data is accessible from a vast ecosystem of SQL tooling, provided they can authenticate using Microsoft Entra ID. For more information, see [Connection libraries for Microsoft SQL Database](/sql/connect/sql-connection-libraries#drivers-for-relational-access). For more information and sample connection strings, see [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md).

## Related content

- [Warehouse connectivity in Microsoft Fabric](connectivity.md)
- [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md)
