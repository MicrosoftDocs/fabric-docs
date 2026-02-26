---
title: "Set up Mirroring for Google BigQuery (Preview)"
description: Learn how to configure a mirrored database from Google BigQuery in Microsoft Fabric.
ms.reviewer: misaacs
ms.date: 09/09/2025
ms.topic: tutorial
---
 
# Tutorial: Set up mirroring for Google BigQuery (Preview)

In this tutorial, you'll configure a Fabric mirrored database from Google BigQuery.

> [!NOTE]
> While this example is specific to BigQuery, you can find detailed steps to configure Mirroring for other data sources, like Azure SQL Database or Azure Cosmos DB. For more information, see [What is Mirroring in Fabric?](overview.md)

## Prerequisites

- Create or use an existing BigQuery warehouse. You can connect to any version of BigQuery instance in any cloud, including Microsoft Azure.
- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../fundamentals/fabric-trial.md).

### Permission requirements

[!INCLUDE [google-bigquery-permissions](includes/google-bigquery-permissions.md)]

## Create a mirrored database

In this section, you create a new mirrored database from your mirrored BigQuery data source.

You can use an existing workspace (not My Workspace) or create a new workspace.

1. From your workspace, navigate to the **Create** hub.
1. After you select the workspace that you would like to use, select **Create**.
1. Select the **Mirrored Google BigQuery** card.
1. Enter the name for the new database.
1. Select **Create**.

## Connect to your BigQuery instance in any cloud

> [!NOTE]
> You might need to alter the cloud firewall to allow Mirroring to connect to the BigQuery instance. We support Mirroring for Google BigQuery for OPDG version 3000.286.6 or greater. We also support VNET.

1. Select **BigQuery** under **New connection** or selected an existing connection.
1. If you selected **New connection**, enter the connection details to the BigQuery database.

    | Connection setting | Description |
    | :-- |:--|
    | **Service Account Email** | If you have a preexisting service account: You can find your Service Account email and your existing key by going to **Service accounts** in your Google BigQuery console. If you don't have a preexisting service account: Go to “Service accounts” in your Google BigQuery console and select **Create service account**. Input a service account name (a service account ID is automatically generated based on your inputted service account name), and a service account description. Select **Done**. Copy and paste the service account email into its designated connections credentials section in Fabric.|
    | **Service Account JSON key file contents** | Within the Service accounts dashboard, select **Actions** for your newly created service account. Select **Manage keys**. If you already have a key per your service account, download its JSON key file contents. <br><br>If you don't already have a key per your service account, select **Add key** and **Create new key**. Then select **JSON**. The JSON key file should automatically download. Copy and paste the JSON key into the designated connections credentials section in the Fabric portal.|
    | **Connection** | Create new connection. |
    | **Connection name** | Should be automatically filled out. Change it to a name that you would like to use. |

1. Select database from dropdown list.

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.

    - **Mirror all data** means that any new tables created after Mirroring is started will be mirrored.

    - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, then select individual tables from your database.

    For this example, we use the **Mirror all data** option.

1. Select **Mirror database**. Mirroring begins.

1. Wait for 2-5 minutes. Then, select **Monitor replication** to see the status.

1. After a few minutes, the status should change to *Running*,  which means the tables are being synchronized.

    If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.

1. When they have finished the initial copying of the tables, a date appears in the **Last refresh** column.

1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

> [!IMPORTANT]
> * Mirroring for Google BigQuery has a ~15-minute delay in change reflection. This is a limitation from Google BigQuery's Change History capabilities.
> * Any granular security established in the source database must be reconfigured in the mirrored database in Microsoft Fabric.

## Monitor Fabric mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

For more information and details on the replication states, see [Monitor Fabric mirrored database replication](monitor.md).

> [!IMPORTANT]
>If there are no updates in the source tables in your BigQuery database, the replicator engine (the engine that powers the change data for BigQuery Mirroring) will slow down and only replicate tables every hour. Don’t be surprised if data after the initial load is taking longer than expected, especially if you don’t have any new updates in your source tables. After the snapshot, the Mirror Engine will wait for ~15 minutes before fetching changes; this is due to a limitation from Google BigQuery in which it enacts a 10-minute delay in reflecting any new changes. [Learn more on BigQuery's change reflection delay](https://cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#changes)

## Related content

- [Google BigQuery mirroring overview](google-bigquery.md)
- [What is Mirroring in Fabric?](overview.md)
