---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases from Azure Database for PostgreSQL Flexible Server"
description: Learn how to configure a mirrored database from Azure Database for PostgreSQL flexible server in Microsoft Fabric.
ms.reviewer: scoriani, maghan
ms.date: 11/17/2025
ms.topic: tutorial
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure Database for PostgreSQL

[Mirroring in Fabric](../mirroring/overview.md) (now generally available) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored Azure Database for PostgreSQL flexible server, which creates a read-only, continuously replicated copy of your PostgreSQL data in OneLake.

> [!IMPORTANT]  
> Newly created Azure Database for PostgreSQL flexible servers after Ignite 2025 automatically include the latest general availability version of mirroring components. Existing servers upgrade progressively as part of the next maintenance cycles without requiring manual intervention. You don't need to disable and re-enable mirroring to receive updates.

## Prerequisites

- Create or use an existing Azure Database for PostgreSQL flexible server.
    - If you don't have an Azure Database for PostgreSQL flexible server, [create a new flexible server](/azure/postgresql/flexible-server/quickstart-create-server).
    - As a tutorial, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure Database for PostgreSQL flexible server](/azure/postgresql/flexible-server/how-to-restore-latest-restore-point).
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../fundamentals/fabric-trial.md).
- The Fabric capacity needs to be active and running. A paused or deleted capacity also stops Mirroring and no data will be replicated.
- Fabric tenant settings are required. Ensure the following two [Fabric Tenant settings](../admin/about-tenant-settings.md) are enabled:
    - [Service principals can use Fabric APIs](../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../admin/tenant-settings-index.md#onelake-settings)
- You need to have a member or admin role in your workspace when creating a mirrored database from the Fabric portal. During creation, the managed identity of Azure Database for PostgreSQL is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- If your Flexible Server doesn't have public connectivity enabled or doesn't [allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) to connect to it, you can [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the Azure Database for PostgreSQL flexible server via a private endpoint or is allowed by the firewall rule.
- Fabric Mirroring is not supported on a Read Replica, or on a Primary server where a Read Replica exists.


## Prepare your Azure Database for PostgreSQL

Mirroring in Azure Database for PostgreSQL flexible server is based on Logical Replication and requires some specific prerequisites to be configured before being able to connect to your data.

> [!IMPORTANT]
> For guiding users in enabling these prerequisites, we created a specific Fabric Mirroring page in Azure portal that **automates all this for you**. For more information, see [Fabric mirroring concepts for PostgreSQL flexible server](/azure/postgresql/flexible-server/concepts-fabric-mirroring).
>
> - System-Assigned Managed Identity (SAMI) must be enabled.
> - The `wal_level` server parameter for the write ahead log (WAL) must be set to **logical**.
> - The extension (azure_cdc) is required, and must be allowlisted and preloaded (requires restart).
> - The `max_worker_processes` server parameter must be increased by 3 for each mirrored database in the source server.

### Database role for Fabric Mirroring

Next, you need to provide or create a PostgreSQL or an Entra ID role for the Fabric service to connect to your Azure Database for PostgreSQL flexible server.

You can accomplish this by specifying a database role for connecting to your source system using one of the following options:

#### Use an Entra ID role

1. Follow these [instructions](/azure/postgresql/flexible-server/security-manage-entra-users#manage-microsoft-entra-roles-using-sql) to map an Entra ID user or group to a PostgreSQL database role. 
1. Once that is done, you can use the following SQL script to grant the `azure_cdc_admin` permissions to the new role.

    ```sql
    -- grant role for replication management to the new user
    GRANT azure_cdc_admin TO <entra_user>;
    -- grant create permission on the database to mirror to the new user
    GRANT CREATE ON DATABASE <database_to_mirror> TO <entra_user>;
    ```

#### Use a PostgreSQL role

1. Connect to your Azure Database for PostgreSQL flexible server using [pgAdmin](https://www.pgadmin.org/). You should connect with a principal that is a member of the role `azure_pg_admin`.
1. Create a PostgreSQL role named `fabric_user`. You can choose any name for this role. Provide your own strong password. Grant the permissions needed for Fabric mirroring in the database. Run the following SQL script to grant the `CREATEDB`, `CREATEROLE`, `LOGIN`, `REPLICATION`, and `azure_cdc_admin` permissions to the new role named `fabric_user`.

    ```sql
    -- create a new user to connect from Fabric
    CREATE ROLE fabric_user CREATEDB CREATEROLE LOGIN REPLICATION PASSWORD '<strong password>';

    -- grant role for replication management to the new user
    GRANT azure_cdc_admin TO fabric_user;
    -- grant create permission on the database to mirror to the new user
    GRANT CREATE ON DATABASE <database_to_mirror> TO fabric_user;
    ```


The database user created with one of the two previous methods also needs to be `owner` of the tables to replicate in the mirrored database. This means that tables have been created by that user, or that the ownership of those tables has been changed using `ALTER TABLE <table name here> OWNER TO <user>;`.

- When switching ownership to new user, you might need to grant to that user all privileges on `public` schema before. For more information regarding user account management, see Azure Database for PostgreSQL [user management](/azure/postgresql/flexible-server/how-to-create-users) documentation, PostgreSQL product documentation for [Database Roles and Privileges](https://www.postgresql.org/docs/current/static/user-manag.html), [GRANT Syntax](https://www.postgresql.org/docs/current/static/sql-grant.html), and [Privileges](https://www.postgresql.org/docs/current/static/ddl-priv.html).

> [!IMPORTANT]  
> Missing one of the previous security configuration steps will cause subsequent mirrored operations in Fabric portal to fail with an `Internal error` message.

## Create a mirrored Azure Database for PostgreSQL flexible server

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane or select the **New item** button. Select the **Create** icon.
1. Scroll to the **Data Warehouse** section and then select **Mirrored Azure Database for PostgreSQL (preview)**.

## Connect to your Azure Database for PostgreSQL flexible server

The following steps guide you through the process of creating the connection to your Azure Database for PostgreSQL flexible server:

1. Under **New sources**, select **Azure Database for PostgreSQL (preview)**. Or, select an existing Azure Database for PostgreSQL flexible server connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the Azure Database for PostgreSQL flexible server.
   - **Server**: You can find the **Server name** by navigating to the Azure Database for PostgreSQL flexible server **Overview** page in the Azure portal. For example, `<server-name>.postgres.database.azure.com`.
   - **Database**: Enter the name of your Azure Database for PostgreSQL flexible server.
   - **Connection**: Create new connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Data Gateway**: select an available [VNET Data Gateway](/data-integration/vnet/create-data-gateways) to connect an Azure Database for PostgreSQL flexible server with VNET integration or Private Endpoints.
   - **Authentication kind**:
       - Basic (PostgreSQL Authentication)
       - Organizational account (Entra Authentication)
    - Leave **Use encrypted connection** checkbox selected, and **This connection can be used with on-premises data gateway and VNET data gateway** unselected.
1. Select **Connect**.

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.
    - **Mirror all data** means that any new tables created after Mirroring is started will be mirrored.
    - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, then select individual tables from your database.
    For this tutorial, we select the **Mirror all data** option.
1. Select **Mirror database**. Mirroring begins.
1. Wait for 2-5 minutes. Then, select **Monitor replication** to see the status.
1. After a few minutes, the status should change to *Running*, which means the tables are being synchronized.
    If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.
1. When they have finished the initial copying of the tables, a date appears in the **Last refresh** column.
1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

> [!IMPORTANT]
> Any granular security established in the source database must be reconfigured in the mirrored database in Microsoft Fabric. See [SQL granular permissions in Microsoft Fabric](../data-warehouse/sql-granular-permissions.md).

## Monitor Fabric mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Related content

- [Troubleshoot Fabric mirrored databases from Azure Database for PostgreSQL flexible server](../mirroring/azure-database-postgresql-troubleshoot.md)
- [Mirroring Azure Database for PostgreSQL flexible server](../mirroring/azure-database-postgresql.md)
- [What is Mirroring in Fabric?](../mirroring/overview.md)
