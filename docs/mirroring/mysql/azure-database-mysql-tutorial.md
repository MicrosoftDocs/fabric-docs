---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases from Azure Database for MySQL (preview)"
description: Learn how to configure a mirrored database from Azure Database for MySQL in Microsoft Fabric.
ms.reviewer: vamehta, maghan
ms.date: 03/16/2026
ms.topic: tutorial
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for MySQL (preview)

[Mirroring in Fabric](../overview.md) (now generally available) is an enterprise, cloud-based, zero-ETL, SaaS technology.

In this section, you learn how to create a mirrored Azure Database for MySQL, which creates a read-only, continuously replicated copy of your MySQL data in OneLake.

## Prerequisites

- Create or use an existing Azure Database for MySQL.
    - If you don't have an Azure Database for MySQL, [create a new server](/azure/mysql/flexible-server/quickstart-create-server).
    - As a tutorial, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure Database for MySQL](/azure/mysql/flexible-server/how-to-restore-server).
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- The Fabric capacity needs to be active and running. A paused or deleted capacity also stops Mirroring and no data will be replicated.
- Fabric tenant settings are required. Ensure the following two [Fabric Tenant settings](../../admin/about-tenant-settings.md) are enabled:
    - [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings)
- You need to have a member or admin role in your workspace when creating a mirrored database from the Fabric portal. During creation, the managed identity of Azure Database for MySQL is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- If your server doesn't have public connectivity enabled or doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for MySQL via a private endpoint or is allowed by the firewall rule.
- Fabric Mirroring isn't supported on a Read Replica, or on a Primary server where a Read Replica exists.

## Prepare your Azure Database for MySQL

Mirroring in Azure Database for MySQL is based on Logical Replication and requires some specific prerequisites to be configured before being able to connect to your data.

Please refer detailed instructions here - Link to MySQL fabric Page

## Create a mirrored Azure Database for MySQL

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace or create a new workspace.
1. Navigate to the **Create** pane or select the **New item** button.
1. Select + New Item and create a Mirrored Azure Database for MySQL (preview). Fab4.png

## Connect to your Azure Database for MySQL and start mirroring

The following steps guide you through the process of creating the connection to your Azure Database for MySQL:

1. Under **New sources**, select **Azure Database for MySQL (Preview)**. Or, select an existing Azure Database for MySQL connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the Azure Database for MySQL.
   - **Server**: You can find the **Server name** by navigating to the Azure Database for MySQL **Overview** page in the Azure portal. For example, `<server-name>.mysql.database.azure.com`.
   - **Database**: Enter the Name of the database to be replicated.
   - **Connection**: Select "Create new connection" or reuse an existing connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Data Gateway**: select an available [VNET Data Gateway](/data-integration/vnet/create-data-gateways) to connect an Azure Database for MySQL with VNET integration.
   - **Authentication kind**: Basic (MySQL Authentication)
   - Leave **Use encrypted connection** checkbox selected, and **This connection can be used with on-premises data gateway and VNET data gateway** unselected.
1. Select **Connect**.
1. Select Connect, the connection is successfully tested and saved if all the credentials are correct. If the credentials aren't correct, the creation fails with errors
1. After the connection is created successfully, a list of tables in the database mirror will be available to select. At a time, upto 1000 tables are supported. Fab7.png
1. Select the tables, give the mirror (also known as artifact) a name, and click on Create mirrored database; this should lead to mirror creation.
1. After some time (few mins), we should see Rows Replicated and the data should be visible in the data warehouse view also known as "Mirrored Database" view. The status should change to *Running*. This view also serves as a management interface to start/stop/monitor replication. Fab8.png
1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

## Monitoring Replication

After the mirror is created, you can monitor the health of replication. Refer details documented here - [Monitor Mirrored Database Replication](../monitor.md).

## Data Availability in OneLake

Once replication is complete, all tables become available in the SQL Analytics endpoint. You can refer to the guidance here to learn how to use this data in near-real time for analytics: -Explore Data in Your Mirrored Database Using Microsoft Fabric - Microsoft Fabric | Microsoft Learn.

Fab9.png

## Related content

- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-troubleshoot.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL limitations](azure-database-mysql-limitations.md)
- [What is Mirroring in Fabric?](../overview.md)
