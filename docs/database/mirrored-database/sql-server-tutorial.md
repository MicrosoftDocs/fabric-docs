---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases From SQL Server"
description: Learn how to configure a mirrored database From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj
ms.date: 05/19/2025
ms.topic: tutorial
ms.custom:
---

# Tutorial: Configure Microsoft Fabric mirrored databases From SQL Server

[Mirroring in Fabric](overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored SQL Server database, which creates a read-only, continuously replicated copy of your SQL Server data in OneLake.

## Prerequisites

- Install or use an existing SQL Server instance, on-premises or in the cloud.
    - As a tutorial, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. 
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
    - The Fabric capacity needs to be active and running. A paused or deleted capacity will affect Mirroring and no data will be replicated.
- Ensure the following Fabric tenant settings are enabled. To learn how to enable tenant settings, see [Fabric Tenant settings](../../admin/about-tenant-settings.md).
    - [Service principals can use Fabric APIs](../../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings)
- Check your networking requirements for Fabric to access your SQL Server. You need to [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. Make sure the Azure Virtual Network or the gateway machine's network can connect to the SQL Server instance via a private endpoint or is allowed by the firewall rule. For more information, see [How to: Secure data Microsoft Fabric mirrored databases From SQL Server](sql-server-security.md).

### Database principal for Fabric

Next, you need to create a way for the Fabric service to authenticate to your SQL Server instance.

You can accomplish this with a [login and mapped database user](#use-a-login-and-mapped-database-user).

#### Use a login and mapped database user

1. Connect to your SQL Server instance using a T-SQL querying tool like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
1. Connect to the `master` database. Create a server login and assign the appropriate permissions.
    - Create a SQL Authenticated login named `fabric_login`. You can choose any name for this login. Provide your own strong password. Run the following T-SQL script in the `master` database:

    ```sql
    CREATE LOGIN [fabric_login] WITH PASSWORD = '<strong password>';
    ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER [fabric_login];
    ```

    - Or, log in as the Microsoft Entra admin, and create a Microsoft Entra ID authenticated login from an existing account. Run the following T-SQL script in the `master` database:

    ```sql
    CREATE LOGIN [bob@contoso.com] FROM EXTERNAL PROVIDER;
    ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER [bob@contoso.com];
    ```

1. Connect to the user database your plan to mirror to Microsoft Fabric. Create a database user connected to the login and grant the minimum privileges necessary:

    For a SQL Authenticated login:

    ```sql
    CREATE USER [fabric_user] FOR LOGIN [fabric_login];
    GRANT SELECT, ALTER ANY EXTERNAL MIRROR, VIEW PERFORMANCE DEFINITION TO [fabric_user];
    ```
    
    Or, for a Microsoft Entra authenticated login:

    ```sql
    CREATE USER [bob@contoso.com] FOR LOGIN [bob@contoso.com];
    GRANT SELECT, ALTER ANY EXTERNAL MIRROR, VIEW PERFORMANCE DEFINITION TO [bob@contoso.com];
    ```

## Create a mirrored SQL Server

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane. Select the **Create** icon.  
1. Scroll to the **Data Warehouse** section and then select **Mirrored SQL Server**. Enter the name of your SQL Server to be mirrored, then select **Create**.

## Connect to your SQL Server

To enable Mirroring, you will need to connect to the SQL Server instance from Fabric to initiate connection between SQL Database and Fabric. The following steps guide you through the process of creating the connection to your SQL Server:

1. Under **New sources**, select **SQL Server**. Or, select an existing SQL Server connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the SQL Server instance.
   - **Server**: The fully-qualified server name path that Fabric will use to reach your SQL server instance.
   - **Database**: Enter the name of your SQL Server.
   - **Connection**: Create new connection.
   - **Connection name**: An automatic name is provided. You can change it.
   - **Data gateway:** Select the default (None) or the name of virtual network data gateway / on-premises data gateway you set up according to your scenario.
   - **Authentication kind**:
       - Basic (SQL Authentication)
       - Organization account (Microsoft Entra ID)
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
> Any granular security established in the source database must be reconfigured in the mirrored database in Microsoft Fabric.

## Monitor Fabric Mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

For more information and details on the replication states, see [Monitor Fabric mirrored database replication](monitor.md).

## Related content

- [Mirroring SQL Server](sql-server.md)
- [What is Mirroring in Fabric?](overview.md)
