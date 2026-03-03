---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases from Azure Database for MySQL (Preview)"
description: Learn how to configure a mirrored database from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, maghan
ms.date: 03/18/2026
ms.topic: tutorial
---

# Tutorial: Create a mirrored database from Azure Database for MySQL in Microsoft Fabric (preview)

[Mirroring in Fabric](../overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology.

In this section, you learn how to create a mirrored Azure Database for MySQL, which creates a read-only, continuously replicated copy of your MySQL data in OneLake.

## Prerequisites

- Create or use an existing Azure Database for MySQL.
  - If you don't have an Azure Database for MySQL, [create a new server](/azure/mysql/flexible-server/quickstart-create-server).
  - As a tutorial, use a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure Database for MySQL](/azure/mysql/flexible-server/how-to-restore-server).
- An existing capacity for Fabric. If you don't have one, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- The Fabric capacity must be active and running. A paused or deleted capacity also stops Mirroring and no data is replicated.
- Fabric tenant settings. Ensure the following two [Fabric Tenant settings](../../admin/about-tenant-settings.md) are enabled:
  - [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
  - [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings)
- You need a member or admin role in your workspace when creating a mirrored database from the Fabric portal. During creation, the managed identity of Azure Database for MySQL is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- If your server isn't publicly accessible and doesn't [allow public access](/azure/mysql/flexible-server/concepts-networking) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [set up on-premises data gateway](/data-integration/gateway/service-gateway-onprem) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for MySQL and is allowed by the firewall rule.
- Fabric Mirroring isn't supported on a Read Replica, or on a Primary server where a Read Replica exists.

## Prepare your Azure Database for MySQL

Mirroring in Azure Database for MySQL is based on Logical Replication and requires some specific prerequisites to be configured before being able to connect to your data.

For detailed instructions, see [Mirroring Azure Database for MySQL](azure-database-mysql.md).

## Create a mirrored Azure Database for MySQL

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace or create a new workspace.
1. Go to the **Create** pane or select the **New item** button.
1. Select + New Item and create a Mirrored Azure Database for MySQL (preview). Fab4.png

## Connect to your Azure Database for MySQL and start mirroring

The following steps guide you through the process of creating the connection to your Azure Database for MySQL:

1. Under **New sources**, select **Azure Database for MySQL (Preview)**. Or, select an existing Azure Database for MySQL connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the Azure Database for MySQL.
   - **Server**: Find the **Server name** by going to the Azure Database for MySQL **Overview** page in the Azure portal. For example, `<server-name>.mysql.database.azure.com`.
   - **Database**: Enter the name of the database to replicate.
   - **Connection**: Select "Create new connection" or reuse an existing connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Data Gateway**: select an available [virtual network data gateway](/data-integration/vnet/create-data-gateways) to connect an Azure Database for MySQL with virtual network integration.
   - **Authentication kind**: Basic (MySQL Authentication)
   - Leave **Use encrypted connection** checkbox selected, and **This connection can be used with on-premises data gateway and VNET data gateway** unselected.
1. Select **Connect**.
1. Select Connect. If all the credentials are correct, the connection is tested and saved. If the credentials aren't correct, the creation fails with errors.
1. After the connection is created successfully, a list of tables in the database mirror is available to select. You can select up to 1,000 tables at a time. Fab7.png
1. Select the tables, give the mirror (also known as artifact) a name, and select **Create mirrored database**. This action starts the mirror creation.
1. After some time (few minutes), you see *Rows Replicated* and the data is visible in the data warehouse view, also known as *Mirrored Database* view. The status changes to *Running*. This view also serves as a management interface to start, stop, and monitor replication. Fab8.png
1. Now that your data is up and running, various analytics scenarios are available across all of Fabric.

## Monitoring replication

After you create the mirror, monitor the health of replication. For more information, see [Monitor Mirrored Database Replication](../monitor.md).

## Data availability in OneLake

When replication finishes, the SQL Analytics endpoint has all tables available. To learn how to use this data in near-real time for analytics, see [Explore Data in Your Mirrored Database Using Microsoft Fabric - Microsoft Fabric | Microsoft Learn](https://learn.microsoft.com/en-us/fabric/explore-data-mirrored-database).

## Related content

- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-troubleshoot.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL limitations](azure-database-mysql-limitations.md)
- [What is Mirroring in Fabric?](../overview.md)
