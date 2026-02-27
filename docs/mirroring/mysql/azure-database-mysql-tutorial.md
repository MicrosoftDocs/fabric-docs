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

> [!IMPORTANT]  
> Newly created Azure Database for MySQL servers after Ignite 2025 automatically include the latest general availability version of mirroring components. Existing servers upgrade progressively as part of the next maintenance cycles without requiring manual intervention. You don't need to disable and re-enable mirroring to receive updates.

## Prerequisites

- Create or use an existing Azure Database for MySQL.
  - If you don't have an Azure Database for MySQL, [create a new server](/azure/mysql/flexible-server/quickstart-create-server).
  - As a tutorial, use a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure Database for MySQL](/azure/mysql/flexible-server/how-to-restore-server-portal).
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- The Fabric capacity needs to be active and running. A paused or deleted capacity also stops Mirroring and no data is replicated.
- Fabric tenant settings are required. Ensure the following two [Fabric Tenant settings](../../admin/about-tenant-settings.md) are enabled:
  - [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
  - [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings)
- You need to have a member or admin role in your workspace when creating a mirrored database from the Fabric portal. During creation, the managed identity of Azure Database for MySQL is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- If your server doesn't have public connectivity enabled or doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for MySQL via a private endpoint or is allowed by the firewall rule.
- Fabric Mirroring isn't supported on a Read Replica, or on a Primary server where a Read Replica exists.

## Prepare your Azure Database for MySQL

Mirroring in Azure Database for MySQL uses Binary Log Replication. Before you connect to your data, you need to configure some specific prerequisites.

> [!IMPORTANT]
> To help you enable these prerequisites, the Azure portal provides a specific Fabric Mirroring page that **automates all these steps for you**. For more information, see [Fabric mirroring concepts for MySQL](/azure/mysql/flexible-server/concepts-fabric-mirroring).
>
> - Enable system-assigned managed identity (SAMI).
> - Set the `binlog_expire_logs_seconds` server parameter appropriately.
> - Set the binary log format to **ROW**.
> - Increase the `max_binlog_size` server parameter to meet replication needs.

### Database role for Fabric Mirroring

Next, you need to provide or create a MySQL or an Entra ID role for the Fabric service to connect to your Azure Database for MySQL.

You can accomplish this task by specifying a database role for connecting to your source system by using one of the following options:

#### Use an Entra ID role

1. Follow these [instructions](/azure/mysql/flexible-server/how-to-azure-ad) to configure Microsoft Entra authentication for your MySQL server.
1. When you finish the configuration, use the following SQL script to grant the necessary permissions to the new role.

   ```sql
   -- grant replication permissions to the new user
   GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '<entra_user>'@'%';
   -- grant necessary permissions on the database to mirror
   GRANT ALL PRIVILEGES ON <database_to_mirror>.* TO '<entra_user>'@'%';
   FLUSH PRIVILEGES;
   ```

#### Use a MySQL role

1. Connect to your Azure Database for MySQL by using [MySQL Workbench](https://www.mysql.com/products/workbench/) or the MySQL command-line client. Connect by using an administrative principal.
1. Create a MySQL user named `fabric_user`. You can choose any name for this user. Provide your own strong password. Grant the permissions needed for Fabric mirroring in the database. Run the following SQL script to grant the `REPLICATION SLAVE`, `REPLICATION CLIENT`, and database permissions to the new user named `fabric_user`.

   ```sql
   -- create a new user to connect from Fabric
   CREATE USER 'fabric_user'@'%' IDENTIFIED BY '<strong password>';

   -- grant replication permissions to the new user
   GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'fabric_user'@'%';
   -- grant necessary permissions on the database to mirror
   GRANT ALL PRIVILEGES ON <database_to_mirror>.* TO 'fabric_user'@'%';
   FLUSH PRIVILEGES;
   ```

The database user that you create by using one of the two previous methods also needs to have appropriate privileges on the tables to replicate in the mirrored database. This requirement means that the user has the necessary permissions on those tables.

- For more information about user account management, see Azure Database for MySQL [user management](/azure/mysql/flexible-server/how-to-create-users) documentation and MySQL product documentation for [Access Control and Account Management](https://dev.mysql.com/doc/refman/8.0/en/access-control.html) and [GRANT Statement](https://dev.mysql.com/doc/refman/8.0/en/grant.html).

> [!IMPORTANT]  
> If you miss one of the previous security configuration steps, subsequent mirrored operations in the Fabric portal fail with an `Internal error` message.

## Create a mirrored Azure Database for MySQL

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Go to the **Create** pane or select the **New item** button. Select the **Create** icon.
1. Scroll to the **Data Warehouse** section and then select **Mirrored Azure Database for MySQL**.

## Connect to your Azure Database for MySQL

The following steps guide you through the process of creating the connection to your Azure Database for MySQL:

1. Under **New sources**, select **Azure Database for MySQL**. Or, select an existing Azure Database for MySQL connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the Azure Database for MySQL.
   - **Server**: Find the **Server name** by going to the Azure Database for MySQL **Overview** page in the Azure portal. For example, `<server-name>.mysql.database.azure.com`.
   - **Database**: Enter the name of your Azure Database for MySQL.
   - **Connection**: Create new connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Data Gateway**: select an available [VNET Data Gateway](/data-integration/vnet/create-data-gateways) to connect an Azure Database for MySQL with VNET integration or Private Endpoints.
   - **Authentication kind**:
     - Basic (MySQL Authentication)
     - Organizational account (Entra Authentication)
   - Leave **Use encrypted connection** checkbox selected, and **This connection can be used with on-premises data gateway and VNET data gateway** unselected.
1. Select **Connect**.

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.
   - **Mirror all data** means that any new tables created after mirroring starts are included in the mirror.
   - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, and then select individual tables from your database.
     For this tutorial, select the **Mirror all data** option.
1. Select **Mirror database**. Mirroring begins.
1. Wait for two to five minutes. Then, select **Monitor replication** to see the status.
1. After a few minutes, the status changes to *Running*, which means the tables are being synchronized.
   If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.
1. When the process finishes the initial copying of the tables, a date appears in the **Last refresh** column.
1. Now that your data is up and running, various analytics scenarios are available across all of Fabric.

> [!IMPORTANT]  
> You must reconfigure any granular security established in the source database in the mirrored database in Microsoft Fabric. See [SQL granular permissions in Microsoft Fabric](../../data-warehouse/sql-granular-permissions.md).

## Monitor Fabric mirroring

Once you configure mirroring, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../monitor.md).

## Related content

- [Troubleshoot Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql-troubleshoot.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL](azure-database-mysql.md)
- [Microsoft Fabric mirrored databases from Azure Database for MySQL limitations](azure-database-mysql-limitations.md)
- [What is Mirroring in Fabric?](../overview.md)
