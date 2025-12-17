---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases From Azure Cosmos DB"
description: Learn how to configure a mirrored database from Azure Cosmos DB in Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.reviewer: jmaldonado
ms.date: 10/22/2025
ms.topic: tutorial
no-loc: [Copilot]
---

# Tutorial: Configure Microsoft Fabric mirrored database for Azure Cosmos DB

In this tutorial, you configure a Fabric mirrored database from an existing Azure Cosmos DB for NoSQL account.

Mirroring incrementally replicates Azure Cosmos DB data into Fabric OneLake in near real-time, without affecting the performance of transactional workloads or consuming Request Units (RUs).
You can build Power BI reports directly on the data in OneLake, using DirectLake mode. You can run ad hoc queries in SQL or Spark, build data models using notebooks and use built-in Copilot and advanced AI capabilities in Fabric to analyze the data. 

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account.
  - If you don't have an Azure subscription, [Try Azure Cosmos DB for NoSQL free](https://cosmos.azure.com/try/).
  - If you have an existing Azure subscription, [create a new Azure Cosmos DB for NoSQL account](/azure/cosmos-db/nosql/quickstart-portal).
- An existing Fabric capacity. If you don't have an existing capacity, [start a Fabric trial](../fundamentals/fabric-trial.md). Mirroring might not be available in some Fabric regions. For more information, see [supported regions.](azure-cosmos-db-limitations.md#availability-limitations)

> [!TIP]
> It's recommended to use a test or development copy of your existing Azure Cosmos DB data that can be recovered quickly from a backup.

## Configure your Azure Cosmos DB account

First, ensure that the source Azure Cosmos DB account is correctly configured to use with Fabric mirroring.

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. Ensure that continuous backup is enabled. If not enabled, follow the guide at [migrate an existing Azure Cosmos DB account to continuous backup](/azure/cosmos-db/migrate-continuous-backup) to enable continuous backup. This feature might not be available in some scenarios. For more information, see [database and account limitations](azure-cosmos-db-limitations.md#account-and-database-limitations).

1. If your Azure Cosmos DB account uses virtual networks or private endpoints, you need to configure Network ACL Bypass to allow your Fabric workspace to access the account. For more information, see [Configure private networks for Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-private-network.md). If your account is configured for public network access for all networks, you can skip to the next section.

## Create a mirrored database

Now, create a mirrored database that is the target of the replicated data. For more information, see [What to expect from mirroring](azure-cosmos-db.md#what-to-expect-from-mirroring). 

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/) home.

1. Open an existing workspace or create a new workspace.

1. In the navigation menu, select **Create**.

1. Select **Create**, locate the **Data Warehouse** section, and then select **Mirrored Azure Cosmos DB**.

1. Provide a name for the mirrored database and then select **Create**.

## Connect to the source database

Next, connect the source database to the mirrored database.

1. In the **New connection** section, select **Azure Cosmos DB for NoSQL**.

1. Provide credentials for the Azure Cosmos DB for NoSQL account including these items:

    | Account credentials | Value |
    | --- | --- |
    | **Azure Cosmos DB endpoint** | URL endpoint for the source account. |
    | **Connection name** | Unique name for the connection. |
    | **Authentication kind** | Select *Account key* or *Organizational account*. |
    | **Account Key** | Read-write key for the source account. |
    | **Organizational account** | Access token from Microsoft Entra ID. |

    :::image type="content" source="media/azure-cosmos-db-tutorial/connection-configuration.png" alt-text="Screenshot of the new connection dialog with credentials for an Azure Cosmos DB for NoSQL account." lightbox="media/azure-cosmos-db-tutorial/connection-configuration.png":::

    > [!NOTE]
    > For Microsoft Entra ID authentication, the following RBAC permissions are required:
    >
    > - `Microsoft.DocumentDB/databaseAccounts/readMetadata`
    > - `Microsoft.DocumentDB/databaseAccounts/readAnalytics`
    >
    > For more information, see [data plane role-based access control documentation](/azure/cosmos-db/nosql/how-to-grant-data-plane-access).
    >
    > For an example of a script to auto-apply a custom role-based access control role, see [`rbac-cosmos-mirror.sh` on azure-samples/azure-cli-samples](https://github.com/Azure-Samples/azure-cli-samples/blob/master/cosmosdb/common/rbac-cosmos-mirror.sh).

2. Select **Connect**. Then, select a database to mirror. Optionally, select specific containers to mirror.

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

1. Here, monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

[!INCLUDE[Cosmos DB Mirroring Tutorial](cosmos-db/includes/mirroring-tutorial.md)]

## More examples

Learn more about how to access and query mirrored Azure Cosmos DB data in Fabric:

- [How to: Query nested data in Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-how-to-query-nested.md)
- [How to: Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric](../mirroring/azure-cosmos-db-lakehouse-notebooks.md)
- [How to: Join mirrored Azure Cosmos DB data with other mirrored databases in Microsoft Fabric](../mirroring/azure-cosmos-db-how-to-join-multiple.md)

## Related content

- [Mirroring Azure Cosmos DB](../mirroring/azure-cosmos-db.md)
- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-faq.yml)
