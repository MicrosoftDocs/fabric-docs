---
title: Connectivity
description: Follow steps to connect SSMS to a warehouse in your workspace.
ms.reviewer: WilliamDAssafMSFT
ms.author: salilkanade
author: cynotebo
ms.topic: how-to
ms.date: 03/15/2023
---

# Connectivity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

To get started, you must complete the following prerequisites:

- For best performance, you must be using SQL Server Management Studio (SSMS) version 18.0+.
- You need access to a Lakehouse artifact within a premium per capacity workspace with contributor or above permissions.

## Connect SSMS to a warehouse in the workspace

The following steps detail how to start at the [!INCLUDE [product-name](../includes/product-name.md)] workspace and connect a warehouse to SSMS.

### Get end-point

1. Navigate to your workspace and select the warehouse artifact you would like to connect to.

   IMAGE

1. Navigate to the warehouse’s **Settings** page. From there:
   1. Navigate to the **Warehouse mode** tab.
   1. Select the **Copy** button next to the SQL connection string to copy it to your clipboard.

   IMAGE

### Get started with SSMS

1. When you open SQL Server Management Studio (SSMS), the Connect to Server window appears. If already open, you can connect manually by selecting **Object Explorer** > **Connect** > **Database Engine**.

   IMAGE

1. Once the **Connect to Server** window is open, paste the connection string copied from the previous section of this article into the **Server name** box. Select **Connect** and proceed with the appropriate credentials for authentication. Remember that only **Azure Active Directory - MFA** authentication is supported.

   IMAGE

1. Once the connection is established, Object Explorer displays the connected warehouse from the workspace and its respective tables and views, all of which are ready to be queried.

   IMAGE

> [!TIP]
> When connecting via SSMS (or ADS) you will see both warehouse (default) and warehouse artifacts listed as warehouses and it will be difficult to differentiate between the two artifact types and their functionality. For this reason, we strongly encourage you to adopt a naming convention which allows you to easily distinguish between the two artifact types when you are working in tools outside of the [!INCLUDE [product-name](../includes/product-name.md)] portal experience.

### Connecting to SQL server endpoint using JDBC driver

If you're receiving an error when attempting to connect to a SQL Server endpoint using a SQL client that uses a Java database connectivity (JDBC) driver, like DBeaver, check for the following dependencies:

1. Add artifacts, choose Add artifact and add the below four dependencies in the window like this, then select **Download/Update** to load all dependencies.

1. Select **Test connection**, and **Finish**.

IMAGE

IMAGE

```
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

   IMAGE

   **Workaround**: Ignore the message by selecting **OK**, and continue with your query.

- Connection is forcibly closed. You might experience connection issues while querying your warehouse with SSMS. The error might look like “An existing connection was forcibly closed by the remote host”.

   **Workaround**: Ignore the message, reconnect, and keep querying your warehouse.

- Transient SSMS errors. There are some transient issues that might happen while querying a warehouse using SSMS:

  - SSMS might hang and enter (Not responding) state.
  - Can't find table 0
  - Invalid handle

   **Workaround**: Wait a few seconds to a minute and try again. Report an issue if these errors don't automatically resolve after retry. Try using Azure Data Studio instead of SSMS.

## Next steps

- [Workspace roles](workspace-roles.md)
