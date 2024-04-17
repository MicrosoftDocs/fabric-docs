---
title: |
  Tutorial: Configure Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)
description: Learn how to configure a mirrored database from Azure Cosmos DB in Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.reviewer: anithaa
ms.date: 03/15/2024
ms.service: fabric
ms.topic: tutorial
no-loc: [Copilot]
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)

In this tutorial, you configure a Fabric mirrored database from an Azure Cosmos DB for NoSQL account.

> [!IMPORTANT]
> Mirroring for Azure Cosmos DB is currently in [preview](../../get-started/preview.md). Production workloads aren't supported during preview. Currently, only Azure Cosmos DB for NoSQL accounts are supported.

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account.
  - If you don't have an Azure subscription, [Try Azure Cosmos DB for NoSQL free](https://cosmos.azure.com/try/).
  - If you have an existing Azure subscription, [create a new Azure Cosmos DB for NoSQL account](/azure/cosmos-db/nosql/quickstart-portal).
- An existing Fabric capacity. If you don't have an existing capacity, [start a Fabric trial](../../get-started/fabric-trial.md). Mirroring may not be available in some Fabric regions. For more information, see [supported regions.](azure-cosmos-db-limitations.md#supported-regions)
- Enable Mirroring in your Fabric tenant or workspace. If the feature isn't already enabled, [enable mirroring in your Fabric tenant](enable-mirroring.md).
    - If you do not see Mirroring in your Fabric workspace or tenant, your organization admin must enable in admin settings.
> [!TIP]
> During the public preview, it's recommended to use a test or development copy of your existing Azure Cosmos DB data that can be recovered quickly from a backup.

## Configure your Azure Cosmos DB account

First, ensure that the source Azure Cosmos DB account is correctly configured to use with Fabric mirroring.

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. Ensure that continuous backup is enabled. If not enabled, follow the guide at [migrate an existing Azure Cosmos DB account to continuous backup](/azure/cosmos-db/migrate-continuous-backup) to enable continuous backup. This feature may not be available in some scenarios. For more information, see [database and account limitations](azure-cosmos-db-limitations.md#account-and-database-limitations).

1. Ensure that the networking options are set to **public network access** for **all networks**. If not, follow the guide at [configure network access to an Azure Cosmos DB account](/azure/cosmos-db/how-to-configure-firewall#configure-ip-policy).

## Create a mirrored database

Now, create a mirrored database that is the target of the replicated data. For more information, see [What to expect from mirroring](azure-cosmos-db.md#what-to-expect-from-mirroring). 

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/) home.

1. Open an existing workspace or create a new workspace.

1. In the navigation menu, select **Create**.

1. Select **Create**, locate the **Data Warehouse** section, and then select **Mirrored Azure Cosmos DB (Preview)**.

1. Provide a name for the mirrored database and then select **Create**.

## Connect to the source database

Next, connect the source database to the mirrored database.

1. In the **New connection** section, select **Azure Cosmos DB for NoSQL**.

1. Provide credentials for the Azure Cosmos DB for NoSQL account including these items:

    | | Value |
    | --- | --- |
    | **Azure Cosmos DB endpoint** | URL endpoint for the source account. |
    | **Connection name** | Unique name for the connection. |
    | **Authentication kind** | Select *Account key*. |
    | **Account Key** | Read-write key for the source account. |

    :::image type="content" source="media/azure-cosmos-db-tutorial/connection-configuration.png" alt-text="Screenshot of the new connection dialog with credentials for an Azure Cosmos DB for NoSQL account." lightbox="media/azure-cosmos-db-tutorial/connection-configuration.png":::

1. Select **Connect**. Then, select a database to mirror.

    > [!NOTE]
    > All containers in the database are mirrored.

## Start mirroring process

1. Select **Mirror database**. Mirroring now begins.

1. Wait two to five minutes. Then, select **Monitor replication** to see the status of the replication action.

1. After a few minutes, the status should change to *Running*, which indicates that the containers are being synchronized.

    > [!TIP]
    > If you can't find the containers and the corresponding replication status, wait a few seconds and then refresh the pane. In rare cases, you might receive transient error messages. You can safely ignore them and continue to refresh.

1. When mirroring finishes the initial copying of the containers, a date appears in the **last refresh** column. If data was successfully replicated, the **total rows** column would contain the number of items replicated.

## Monitor Fabric Mirroring

Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

1. Once Fabric Mirroring is configured, you're automatically navigated to the **Replication Status** pane.

1. Here, monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric Mirror replication](monitor.md).

## Query the source database from Fabric

Use the Fabric portal to explore the data that already exists in your Azure Cosmos DB account, querying your source Cosmos DB database.

1. Navigate to the mirrored database in the Fabric portal.

1. Select **View**, then **Source database**. This action opens the Azure Cosmos DB data explorer with a read-only view of the source database.

    :::image type="content" source="media/azure-cosmos-db-tutorial/source-explorer-query.png" alt-text="Screenshot of the data explorer with a read-only view of NoSQL data in the Azure Cosmos DB account." lightbox="media/azure-cosmos-db-tutorial/source-explorer-query.png":::

1. Select a container, then open the context menu and select **New SQL query**.

1. Run any query. For example, use `SELECT COUNT(1) FROM container` to count the number of items in the container.

    > [!NOTE]
    > All the reads on source database are routed to Azure and will consume Request Units (RUs) allocated on the account.  

## Analyze the target mirrored database

Now, use T-SQL to query your NoSQL data that is now stored in Fabric OneLake.

1. Navigate to the mirrored database in the Fabric portal.

1. Switch from **Mirrored Azure Cosmos DB** to **SQL analytics endpoint**.

    :::image type="content" source="media/azure-cosmos-db-tutorial/switch-experience.png" alt-text="Screenshot of the selector to switch between items in the Fabric portal." lightbox="media/azure-cosmos-db-tutorial/switch-experience.png":::

1. Each container in the source database should be represented in the SQL analytics endpoint as a warehouse table.

1. Select any table, open the context menu, then select **New SQL Query**, and finally select **Select Top 100**.

1. The query executes and returns 100 records in the selected table.

1. Open the context menu for the same table and select **New SQL Query**. Write an example query that use aggregates like `SUM`, `COUNT`, `MIN`, or `MAX`. Join multiple tables in the warehouse to execute the query across multiple containers.

    > [!NOTE]
    > For example, this query would execute across multiple containers:
    >
    > ```sql
    > SELECT
    >     d.[product_category_name],
    >     t.[order_status],
    >     c.[customer_country],
    >     s.[seller_state],
    >     p.[payment_type],
    >     sum(o.[price]) as price,
    >     sum(o.[freight_value]) freight_value 
    > FROM
    >     [dbo].[products] p 
    > INNER JOIN
    >     [dbo].[OrdersDB_order_payments] p 
    >         on o.[order_id] = p.[order_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_order_status] t 
    >         ON o.[order_id] = t.[order_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_customers] c 
    >         on t.[customer_id] = c.[customer_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_productdirectory] d 
    >         ON o.product_id = d.product_id 
    > INNER JOIN
    >     [dbo].[OrdersDB_sellers] s 
    >         on o.seller_id = s.seller_id 
    > GROUP BY
    >     d.[product_category_name],
    >     t.[order_status],
    >     c.[customer_country],
    >     s.[seller_state],
    >     p.[payment_type]
    > ```
    >
    > This example assumes the name of your table and columns. Use your own table and columns when writing your SQL query.

1. Select the query and then select **Save as view**. Give the view a unique name. You can access this view at any time from the Fabric portal.

1. Select the query and then select **Explore this data (preview)**. This action explores the query in Power BI directly using Direct Lake on OneLake mirrored data.

    > [!TIP]
    > You can also optionally use Copilot or other enhancements to build dashboards and reports without any further data movement.

1. Return back to the mirrored database in the Fabric portal.

1. Select **New visual query**. Use the query editor to build complex queries.

    :::image type="content" source="media/azure-cosmos-db-tutorial/query-editor.png" alt-text="Screenshot of the query editor for both text-based and visual queries in Fabric." lightbox="media/azure-cosmos-db-tutorial/query-editor.png":::

## More examples

Learn more about how to access and query mirrored Azure Cosmos DB data in Fabric:

- [How-to: Query nested data in Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-how-to-query-nested.md)
- [How to: Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric (Preview)](azure-cosmos-db-lakehouse-notebooks.md)
- [How-to: Join mirrored Azure Cosmos DB data with other mirrored databases in Microsoft Fabric](azure-cosmos-db-how-to-join-multiple.md)

## Related content

- [Mirroring Azure Cosmos DB (Preview)](azure-cosmos-db.md)
- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-faq.yml)
