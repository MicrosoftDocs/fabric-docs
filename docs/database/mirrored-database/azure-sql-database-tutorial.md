---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases From Azure SQL Database"
description: Learn how to configure a mirrored database from Azure SQL Database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala
ms.date: 01/15/2025
ms.topic: tutorial
ms.custom:
  - ignite-2024
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Database

[Mirroring in Fabric](overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored Azure SQL Database, which creates a read-only, continuously replicated copy of your Azure SQL Database data in OneLake.

## Prerequisites

- Create or use an existing Azure SQL Database.
    - The source Azure SQL Database can be either a single database or a database in an elastic pool.
    - If you don't have an Azure SQL Database, [create a new single database](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql-db&preserve-view=true&tabs=azure-portal). Use the [Azure SQL Database free offer](/azure/azure-sql/database/free-offer?view=azuresql-db&preserve-view=true) if you haven't already.
    - Review the [tier and purchasing model requirements for Azure SQL Database](azure-sql-database.md#tier-and-purchasing-model-support).
    - As a tutorial, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure SQL Database](/azure/azure-sql/database/recovery-using-backups).
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
    - If you want to mirror a database from an existing backup, see [Restore a database from a backup in Azure SQL Database](/azure/azure-sql/database/recovery-using-backups).
<!-- - [Enable Mirroring in your Microsoft Fabric tenant](enable-mirroring.md). You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md). -->
- The Fabric capacity needs to be active and running. A paused or deleted capacity will affect Mirroring and no data will be replicated.
- Ensure the following Fabric tenant settings are enabled. To learn how to enable tenant settings, see [Fabric Tenant settings](../../admin/about-tenant-settings.md).
    - [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings)
- Networking requirements for Fabric to access your Azure SQL Database:
    - Currently, Mirroring doesn't support Azure SQL Database logical servers behind an Azure Virtual Network or private networking. If you have your Azure SQL logical server behind a private network, you can't enable Azure SQL Database mirroring.
    - You need to update your Azure SQL logical server firewall rules to [Allow public network access](/azure/azure-sql/database/connectivity-settings#change-public-network-access), and enable the [Allow Azure services](/azure/azure-sql/database/network-access-controls-overview#allow-azure-services) option to connect to your Azure SQL Database logical server.

### Enable System Assigned Managed Identity (SAMI) of your Azure SQL logical server

The System Assigned Managed Identity (SAMI) of your Azure SQL logical server must be enabled, and must be the primary identity, to publish data to Fabric OneLake.

1. To configure or verify that the SAMI is enabled, go to your logical SQL Server in the Azure portal. Under **Security** in the resource menu, select **Identity**.
1. Under **System assigned managed identity**, select **Status** to **On**.
1. The SAMI must be the primary identity. Verify the SAMI is the primary identity with the following T-SQL query: `SELECT * FROM sys.dm_server_managed_identities;`

### Database principal for Fabric

Next, you need to create a way for the Fabric service to connect to your Azure SQL Database.

You can accomplish this with a [login and mapped database user](#use-a-login-and-mapped-database-user).

#### Use a login and mapped database user

1. Connect to your Azure SQL logical server using [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true). Connect to the `master` database.
1. Create a server login and assign the appropriate permissions.
    - Create a SQL Authenticated login named `fabric_login`. You can choose any name for this login. Provide your own strong password. Run the following T-SQL script in the `master` database:

    ```sql
    CREATE LOGIN fabric_login WITH PASSWORD = '<strong password>';
    ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER fabric_login;
    ```

    - Or, create a Microsoft Entra ID authenticated login from an existing account. Run the following T-SQL script in the `master` database:

    ```sql
    CREATE LOGIN [bob@contoso.com] FROM EXTERNAL PROVIDER;
    ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER [bob@contoso.com];
    ```

1. Connect to the Azure SQL Database your plan to mirror to Microsoft Fabric, using the [Azure portal query editor](/azure/azure-sql/database/query-editor), [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
1. Create a database user connected to the login:

    ```sql
    CREATE USER fabric_user FOR LOGIN fabric_login;
    GRANT CONTROL TO fabric_user;
    ```
    
    Or,

    ```sql
    CREATE USER [bob@contoso.com] FOR LOGIN [bob@contoso.com];
    GRANT CONTROL TO [bob@contoso.com];
    ```

## Create a mirrored Azure SQL Database

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane. Select the **Create** icon.  
1. Scroll to the **Data Warehouse** section and then select **Mirrored Azure SQL Database**. Enter the name of your Azure SQL Database to be mirrored, then select **Create**.

## Connect to your Azure SQL Database

To enable Mirroring, you will need to connect to the Azure SQL logical server from Fabric to initiate connection between SQL Database and Fabric. The following steps guide you through the process of creating the connection to your Azure SQL Database:

1. Under **New sources**, select **Azure SQL Database**. Or, select an existing Azure SQL Database connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the Azure SQL Database.
   - **Server**: You can find the **Server name** by navigating to the Azure SQL Database **Overview** page in the Azure portal. For example, `server-name.database.windows.net`.
   - **Database**: Enter the name of your Azure SQL Database.
   - **Connection**: Create new connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Authentication kind**:
       - Basic (SQL Authentication)
       - Organization account (Microsoft Entra ID)  
       - Tenant ID (Azure Service Principal)  
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
> Any granular security established in the source database must be re-configured in the mirrored database in Microsoft Fabric.

## Monitor Fabric Mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

For more information and details on the replication states, see [Monitor Fabric mirrored database replication](monitor.md).

## Related content

- [Mirroring Azure SQL Database](azure-sql-database.md)
- [What is Mirroring in Fabric?](overview.md)
