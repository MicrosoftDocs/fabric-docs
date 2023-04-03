---
title: Connectivity
description: Follow steps to connect SSMS to a warehouse in your workspace.
ms.reviewer: wiassaf
ms.author: salilkanade
author: salilkanade
ms.topic: how-to
ms.date: 03/24/2023
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview
---

# Connectivity

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article provides a how-to on connecting to your SQL Endpoint to data warehouse using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

To get started, you must complete the following prerequisites:

- For best performance, you must be using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) version 18.0+.
- You need access to a [Lakehouse](../data-engineering/lakehouse-overview.md) item within a premium per capacity workspace with contributor or above permissions.

## Connect SSMS to the SQL Endpoint or warehouse in the workspace

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to SSMS.

### Get end-point

To retrieve the connection string, follow these steps:

1. Navigate to your workspace and select the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] you would like to connect to.

   :::image type="content" source="media\connectivity\workspace-more-menu.png" alt-text="Screenshot of the workspace screen with the context menu open." lightbox="media\connectivity\workspace-more-menu.png":::

1. Navigate to the warehouse's **Settings** page.
1. Navigate to the **Warehouse mode** tab.
1. Select the **Copy** button next to the SQL connection string to copy it to your clipboard.

   :::image type="content" source="media\connectivity\warehouse-mode.png" alt-text="Screenshot of the warehouse mode tab." lightbox="media\connectivity\warehouse-mode.png":::

### Get started with SSMS

1. When you open SQL Server Management Studio (SSMS), the **Connect to Server** window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   :::image type="content" source="media\connectivity\object-explorer-connect-menu.png" alt-text="Screenshot showing where to select Database Engine on the Connect menu." lightbox="media\connectivity\object-explorer-connect-menu.png":::

1. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication. Remember that only **Azure Active Directory - MFA** authentication is supported.

   :::image type="content" source="media\connectivity\connect-server-window.png" alt-text="Screenshot showing the Connect to server window." lightbox="media\connectivity\connect-server-window.png":::

1. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   :::image type="content" source="media\connectivity\object-explorer-example.png" alt-text="Screenshot showing where the connected server name appears in the Object Explorer pane." lightbox="media\connectivity\object-explorer-example.png":::

When connecting via SSMS (or ADS), you see both SQL Endpoint and [!INCLUDE [fabric-dw](includes/fabric-dw.md)]s listed as warehouses and it's difficult to differentiate between the two item types and their functionality. For this reason, we strongly encourage you to adopt a naming convention that allows you to easily distinguish between the two item types when you work in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience.

### Connecting to SQL Server endpoint using JDBC driver

If you're receiving an error when attempting to connect to a SQL Server endpoint using a SQL client that uses a Java database connectivity (JDBC) driver, like DBeaver, check for the following dependencies:

1. Add artifacts, choose **Add Artifact** and add the following four dependencies in the window like this, then select **Download/Update** to load all dependencies.

1. Select **Test connection**, and **Finish**.

:::image type="content" source="media\connectivity\download-update.png" alt-text="Screenshot showing where to select Download/Update." lightbox="media\connectivity\download-update.png":::

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

## Known limitations

- Warning on new query. When you open a new query in SSMS, you might see the following error:

   :::image type="content" source="media\connectivity\new-query-error.png" alt-text="Screenshot of the new query error." lightbox="media\connectivity\new-query-error.png":::

   **Workaround**: Ignore the message by selecting **OK**, and continue with your query.

- Connection is forcibly closed. You might experience connection issues while querying your warehouse with SSMS. The error might look like "An existing connection was forcibly closed by the remote host".

   **Workaround**: Ignore the message, reconnect, and keep querying your warehouse.

- Transient SSMS errors. There are some transient issues that might happen while querying a warehouse using SSMS:

  - SSMS might hang and enter (Not responding) state.
  - Can't find table 0
  - Invalid handle

   **Workaround**: Wait a few seconds to a minute and try again. Report an issue if these errors don't automatically resolve after retry. Try using [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio) instead of [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

## Next steps

- [Workspace roles](workspace-roles.md)
