---
title: Connectivity to data warehousing
description: Follow steps to connect SSMS to data warehousing in your Microsoft Fabric workspace.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: Warehouse connectivity # This article's title should not change. If so, contact engineering.
---
# Connectivity to data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In Microsoft Fabric, a Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is accessible through a Tabular Data Stream, or TDS endpoint, familiar to all modern web applications that interact with a SQL Server endpoint. This is referred to as the SQL Connection String within the Fabric user interface.

This article provides a how-to on connecting to your [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. 

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started, you must complete the following prerequisites:

- You need access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md) or a [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](../data-warehouse/data-warehousing.md) within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or above permissions.

## Authentication to warehouses in Fabric

In Fabric, two types of authenticated users are supported through the SQL connection string:
1. Azure Active Directory (Azure AD) user principals, or user identities
2. Azure Active Directory (Azure AD) service principals

The SQL connection string requires TCP port 1433 to be open. TCP 1433 is the standard SQL Server port number. The SQL connection string also respects the Warehouse or Lakehouse SQL endpoint security model for data access. Data can be obtained for all objects to which a user has access.

## Retrieve the SQL connection string

To retrieve the connection string, follow these steps:

1. Navigate to your workspace, select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and select **More options**. 
2. Select **Copy SQL connection string** to copy the connection string to your clipboard.

   :::image type="content" source="media\connectivity\warehouse-copy-sql-connection-string.png" alt-text="Screenshot of the workspace screen with the context menu open." lightbox="media\connectivity\warehouse-copy-sql-connection-string.png":::

## Get started with SQL Server Management Studio (SSMS)

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

1. When you open SSMS, the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media\connectivity\object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu." lightbox="media\connectivity\object-explorer-connect-menu.png":::

2. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication. Remember that only **Azure Active Directory - MFA** authentication is supported.

   :::image type="content" source="media\connectivity\connect-server-window.png" alt-text="Screenshot showing the Connect to server window." lightbox="media\connectivity\connect-server-window.png":::

3. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media\connectivity\object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane." lightbox="media\connectivity\object-explorer-example.png":::

When connecting via SSMS (or ADS), you see both a [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] listed as warehouses, and it's difficult to differentiate between the two item types and their functionality. For this reason, we strongly encourage you to adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience.

## Connect using Power BI

A Warehouse or Lakehouse SQL Endpoint is a fully supported and native data source within Power BI, and there is no need to use the SQL Connection string. The Data Hub exposes all of the warehouses you have access to directly. This allows you to easily find your warehouses by workspace, and:

- Select the Warehouse
- Choose entities
- Load Data - choose a data connectivity mode: [import or DirectQuery](/power-bi/connect-data/desktop-directquery-about)

For more information, see [Create reports in Microsoft Fabric](create-reports.md).

## Connect using ODBC

We support connectivity to the Warehouse or SQL Endpoint using ODBC. Make sure you’re running the latest SQL Server drivers.

When establishing connectivity, make sure that you’re using the latest version of the driver here: [Download ODBC Driver for SQL Server](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16and using AAD authentication)


## Connect using JDBC

We also support connectivity to the Warehouse or SQL Endpoint using a Java database connectivity (JDBC) driver. 

When establishing connectivity via JDBC, check for the following dependencies:

1. Add artifacts, choose **Add Artifact** and add the following four dependencies in the window like this, then select **Download/Update** to load all dependencies.

    :::image type="content" source="media\connectivity\download-update.png" alt-text="Screenshot showing where to select Download/Update." lightbox="media\connectivity\download-update.png":::

2. Select **Test connection**, and **Finish**.

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

## Connect using OLE DB

We support connectivity to the Warehouse or SQL Endpoint using ODBC. Make sure you’re running the latest SQL Server drivers: [Microsoft OLE DB Driver for SQL Server - OLE DB Driver for SQL Server | Microsoft Learn](https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16)

## Connect using DBT

Users typically use DBT adapters to connect DBT projects to a target datastore. DBT adapters are built specifically for each data source. Users who would like to connect to Synapse Data Warehouse in Microsoft Fabric from DBT project must use dbt-synapsevnext DBT adapter. Similarly, Synapse dedicated SQL pool data source has its own adapter (dbt-synapse).

The DBT Fabric DW Adapter uses pyodbc library to establish connectivity with Trident Data Warehouse. PYODBC is an ODBC implementation in Python language that uses [Python Database API Specification v2.0](https://peps.python.org/pep-0249/).  PYODBC directly passes connection string to the database driver through SQLDriverConnect in msodbc connection structure to Trident Data Warehouse using TDS (Tabular Data Streaming) proxy service.

The DBT Fabric DW  Adapter supports AAD based authentication and allows developers to use az cli authentication using dbt-synapsevnext adapter. SQL Authentication is not supported.

## Connectivity by other menas

### BI Tools

Using the SQL Connection string, any 3rd party tool that can authenticate using ODBC or the latest MSSQL Drivers and Azure AD Authentication can connect to a Warehouse. 

### Custom Applications

Because Synapse Datawarehouse and Lakehouse SQL Endpoints in Fabric provide an SQL Connection string, data is accessible from a vast ecosystem of SQL tooling, provided they can authenticate using AAD. See here for more information: [Connection libraries for Microsoft SQL Database](https://learn.microsoft.com/en-us/sql/connect/sql-connection-libraries?view=sql-server-ver16#drivers-for-relational-access)
    
## Considerations and limitations

- SQL Authentication is not supported
- Multiple Active Result Sets (MARS) is unsupported for Fabric Warehouse. MARS is disabled by default, however if `MultipleActiveResultSets` is included in the connection string, it should be removed or set to false.
- On connection to a warehouse, you may receive an error that "The token size exceeded the maximum allowed payload size".  This may be due to having a large number of warehouses within the workspace or being a member of a large number of Azure AD groups. For most users, the error typically would not occur until approaching beyond 80 warehouses in the workspace. In event of this error, please work with the Workspace admin to clean up unused Warehouses and retry the connection, or contact support if the problem persists.

## Next steps

- [Create a warehouse in Microsoft Fabric](create-warehouse.md)
- [Better together: the lakehouse and warehouse in Microsoft Fabric](get-started-lakehouse-sql-endpoint.md)
