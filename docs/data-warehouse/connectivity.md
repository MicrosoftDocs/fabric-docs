---
title: Connectivity to data warehousing
description: Follow steps to connect SSMS to data warehousing in your Microsoft Fabric workspace.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.topic: how-to
ms.date: 04/13/2023
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview
---

# Connectivity to data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article provides a how-to on connecting to your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](lakehouse-sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

To get started, you must complete the following prerequisites:

- For best performance, you must be using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) version 18.0+.
- You need access to a [Lakehouse](../data-engineering/lakehouse-overview.md) item within a premium per capacity workspace with contributor or above permissions.

## Connect SSMS to the Lakehouse SQL Endpoint or warehouse in the workspace

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to SSMS.

### Get endpoint

To retrieve the connection string, follow these steps:

1. Navigate to your workspace, select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], and select **More options**. 
2. Select **Copy SQL connection string** to copy the connection string to your clipboard.

   :::image type="content" source="media\connectivity\warehouse-copy-sql-connection-string.png" alt-text="Screenshot of the workspace screen with the context menu open." lightbox="media\connectivity\warehouse-copy-sql-connection-string.png":::

### Get started with SSMS

1. When you open SQL Server Management Studio (SSMS), the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media\connectivity\object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu." lightbox="media\connectivity\object-explorer-connect-menu.png":::

2. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication. Remember that only **Azure Active Directory - MFA** authentication is supported.

   :::image type="content" source="media\connectivity\connect-server-window.png" alt-text="Screenshot showing the Connect to server window." lightbox="media\connectivity\connect-server-window.png":::

3. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media\connectivity\object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane." lightbox="media\connectivity\object-explorer-example.png":::

When connecting via SSMS (or ADS), you see both a [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] listed as warehouses, and it's difficult to differentiate between the two item types and their functionality. For this reason, we strongly encourage you to adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience.

### Connect to SQL Server endpoint using JDBC driver

If you're receiving an error when attempting to connect to a SQL Server endpoint using a SQL client that uses a Java database connectivity (JDBC) driver, like DBeaver, check for the following dependencies:

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
    
## Considerations and Limitations

- Muliple Active Result Sets (MARS) is unsupported for Trident Warehouse. MARS is disabled by default, however if MultipleActiveResultSets is included in the connection string, it should be removed or set to false.
- On connection to a Warehouse, you may receive an error that "The token size exceeded the maximum allowed payload size".  This may be due to having a large number of warehouses within the workspace or being a member of a large number of AAD groups. For most users, the error typically would not occur until approaching beyond 80 warehouses in the workspace. In event of this error, please work with the Workspace admin to clean up unused Warehouses and retry the connection, or contact support if the problem persists.

## Next steps

- [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md)
- [Get started with the Lakehouse SQL Endpoint in Microsoft Fabric](get-started-lakehouse-sql-endpoint.md)
