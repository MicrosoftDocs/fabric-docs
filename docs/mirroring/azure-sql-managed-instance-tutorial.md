---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases From Azure SQL Managed Instance"
description: Learn how to configure a mirrored database from Azure SQL Managed Instance in Microsoft Fabric.
ms.reviewer: lazartimotic, jingwang, nzagorac
ms.date: 12/04/2025
ms.topic: tutorial
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure SQL Managed Instance

[Mirroring in Fabric](../mirroring/overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored Azure SQL Managed Instance database, which represents a read-only, continuously replicated copy of chosen database from your Azure SQL Managed Instance in OneLake.

## Prerequisites

- Create or use an existing Azure SQL Managed Instance.
  - [Update Policy](/azure/azure-sql/managed-instance/update-policy?view=azuresql&tabs=azure-portal&preserve-view=true) for source Azure SQL Managed Instance needs to be configured to "[Always up to date](/azure/azure-sql/managed-instance/update-policy?view=azuresql&preserve-view=true&tabs=azure-portal#always-up-to-date-update-policy)" or "[SQL Server 2025](/azure/azure-sql/managed-instance/update-policy?view=azuresql&preserve-view=true&tabs=azure-portal#sql-server-2025-update-policy)".
  - The source Azure SQL Managed Instance can be either a single SQL managed instance or a SQL managed instance belonging to an instance pool.
  - If you don't have an Azure SQL Managed Instance, [you can create a new SQL managed instance](/azure/azure-sql/managed-instance/instance-create-quickstart?view=azuresql&tabs=azure-portal&preserve-view=true). You can use the [Azure SQL Managed Instance free offer](/azure/azure-sql/managed-instance/free-offer?view=azuresql&preserve-view=true) if you like.
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../fundamentals/fabric-trial.md).
  - The Fabric capacity needs to be active and running. A paused or deleted capacity impacts Mirroring and no data are replicated.
- Fabric tenant settings are required. Ensure the following two [Fabric Tenant settings](../admin/about-tenant-settings.md) are enabled:
    - [Service principals can use Fabric APIs](../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../admin/tenant-settings-index.md#onelake-settings)
- You need to have a member or admin role in your workspace when you create a mirrored database from the Fabric portal. During creation, the managed identity of Azure SQL Managed Instance is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- Check the networking requirements for Fabric to access your Azure SQL Managed Instance:
  - If your Azure SQL Managed Instance is not publicly accessible, [create a virtual network data gateway](/data-integration/vnet/create-data-gateways) or [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) to mirror the data. Make sure the Azure Virtual Network or gateway server's network can connect to the Azure SQL Managed Instance via [a private endpoint](/azure/azure-sql/managed-instance/private-endpoint-overview?view=azuresql-mi&preserve-view=true).
  - If you want to connect to Azure SQL Managed Instance's public endpoint without data gateway, you need to allow inbound traffic from Power BI and Data Factory service tags or from Azure Cloud service tag in the network security group. Learn more from [Configure public endpoints in Azure SQL Managed Instance](/azure/azure-sql/managed-instance/public-endpoint-configure).
- Check the networking requirements for Fabric: If you want to use workspace-level private link, follow the instructions to [create the private link service in Azure](../security/security-workspace-level-private-links-set-up.md#step-2-create-the-private-link-service-in-azure) and [create a private endpoint](../security/security-workspace-level-private-links-set-up.md#step-5-create-a-private-endpoint) from Azure SQL Managed Instance's virtual network and subnet.

### Enable System Assigned Managed Identity (SAMI) of your Azure SQL Managed Instance

The System Assigned Managed Identity (SAMI) of your Azure SQL Managed Instance must be enabled, and must be the primary identity, to publish data to Fabric OneLake.

1. To configure or verify that the SAMI is enabled, go to your SQL Managed Instance in the Azure portal. Under **Security** in the resource menu, select **Identity**.
1. Under **System assigned managed identity**, select **Status** to **On**.
1. The SAMI must be the primary identity. Verify the SAMI is the primary identity with the following T-SQL query: `SELECT * FROM sys.dm_server_managed_identities;`

### Database principal for Fabric

Next, you need to create a way for the Fabric service to connect to your Azure SQL Managed Instance.

You can accomplish this with a [login and mapped database user](#use-a-login-and-mapped-database-user). Following the principle of least privilege for security, you should only grant CONTROL DATABASE permission in the database you intend to mirror.

#### Use a login and mapped database user

1. Connect to your Azure SQL Managed Instance using [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or the [mssql extension](https://aka.ms/mssql-marketplace) for [Visual Studio Code](https://code.visualstudio.com/docs). Connect to the `master` database.
1. Create a server login and assign the appropriate permissions.

    The permissions required for the Fabric login are:
   
   - The following permissions in the user database:
     - SELECT
     - ALTER ANY EXTERNAL MIRROR
     - VIEW DATABASE PERFORMANCE STATE
     - VIEW DATABASE SECURITY STATE
    
   - Create a SQL Authenticated login. You can choose any name for this login, substitute it in the following script for `<fabric_login>`. Provide your own strong password. Run the following T-SQL script in the `master` database:
      
   ```sql
   CREATE LOGIN <fabric_login> WITH PASSWORD = '<strong password>';
   ```
    
   - Or, create a Microsoft Entra ID authenticated login from an existing account. Run the following T-SQL script in the `master` database:
      
   ```sql
   CREATE LOGIN [bob@contoso.com] FROM EXTERNAL PROVIDER;
   ```
    
1. Switch your query scope to the database you want to mirror. Substitute the name of your database for `<mirroring_source_database>` and run the following T-SQL:

    ```sql
    USE [<mirroring_source_database>];
    ```

1. Create a database user connected to the login. Substitute the name of a new database user for this purpose for `<fabric_user>`:

    ```sql
    CREATE USER [fabric_user] FOR LOGIN [fabric_login];
    GRANT SELECT, ALTER ANY EXTERNAL MIRROR, VIEW DATABASE PERFORMANCE STATE, VIEW DATABASE SECURITY STATE TO [fabric_user];
    ```
    
    - Or, for a Microsoft Entra authenticated login:

    ```sql
    CREATE USER [bob@contoso.com] FOR LOGIN [bob@contoso.com];
    GRANT SELECT, ALTER ANY EXTERNAL MIRROR, VIEW DATABASE PERFORMANCE STATE, VIEW DATABASE SECURITY STATE TO [bob@contoso.com];
    ```
    
## Create a mirrored Azure SQL Managed Instance database

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane. Select the **Create** icon.  
1. Scroll to the **Data Warehouse** section and then select **Mirrored Azure SQL Managed Instance**.

## Connect to your Azure SQL Managed Instance

To enable Mirroring, you need to connect to the Azure SQL Managed Instance from Fabric to initiate connection between SQL Managed Instance and Fabric. The following steps guide you through the process of creating the connection to your Azure SQL Managed Instance:

1. Under **New sources**, select **Azure SQL Managed Instance**. Or, select an existing Azure SQL Managed Instance connection from the OneLake catalog.
    1. You can't use existing Azure SQL Managed Instance connections with type "SQL Server" (generic connection type). Only connections with connection type "SQL Managed Instance" are supported for mirroring of Azure SQL Managed Instance data.
1. If you selected **New connection**, enter the connection details to the Azure SQL Managed Instance. You need to connect to a specific database, you can't set up mirroring for the entire SQL managed instance and all its databases.
   - **Server**: You can find the **Server name** by navigating to the Azure SQL Managed Instance **Networking** page in the Azure portal (under Security menu) and looking at the Public Endpoint field. For example, `<managed_instance_name>.public.<dns_zone>.database.windows.net,3342`.
   - **Database**: Enter the name of database you wish to mirror.
   - **Connection**: Create new connection.
   - **Connection name**: An automatic name is provided. You can change it to facilitate finding this SQL managed instance database connection at a future time, if needed.
   - **Data gateway**: Select the default (**None**) or the name of virtual network data gateway / on-premises data gateway you set up according to your scenario.
   - **Authentication kind**:
       - Basic (SQL Authentication): Specify the username and password.
       - Organization account (Microsoft Entra ID)  
       - Service principal: Specify the service principal's tenant ID, client ID and client secret.
1. Select **Connect**.

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.

    - **Mirror all data** means that any new tables created after Mirroring is started will be mirrored.

    - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, then select individual tables from your database.
    - If tables can't be mirrored at all, they show an error icon and relevant explanation text. Likewise, if tables can only mirror with limitations, a warning icon is shown with relevant explanation text.

    For this tutorial, we select the **Mirror all data** option.

1. On the next screen, give the destination item a name and select **Create mirrored database**. Now wait a minute or two for Fabric to provision everything for you.
1. After 2-5 minutes, select **Monitor replication** to see the status.
1. After a few minutes, the status should change to *Running*, which means the tables are being synchronized.

    If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.
1. When the initial copying of the tables is finished, a date appears in the **Last refresh** column.
1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

> [!IMPORTANT]
> Any granular security established in the source database must be re-configured in the mirrored database in Microsoft Fabric.

## Monitor Fabric Mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

These are the replicating statuses:

- For overall database level monitoring:
  - Running – Replication is currently running bringing snapshot and change data into OneLake.
  - Running with warning: Replication is running, with transient errors
  - Stopping/Stopped – Replication is stopped.
  - Error – Fatal error in replication that can't be recovered.

- For table level monitoring:
  - Running –The data from the table is successfully being replicated into the warehouse.
  - Running with warning – Warning of non-fatal error with replication of the data  from the table
  - Stopping/Stopped - Replication has stopped
  - Error – Fatal error in replication for that table.

If the initial sync is completed, a **Last completed** timestamp is shown next to the table name. This timestamp indicates the time when Fabric has last checked the table for changes.

Also, note the **Rows replicated** column. It counts all the rows that have been replicated for the table. Each time a row is replicated, it is counted again. This means that, for example, inserting a row with primary key =1 on the source increases the "Rows replicated" count by one. If you update the row with the same primary key, replicates to Fabric again, and the row count increases by one, even though it's the same row which replicated again. Fabric counts all replications that happened on the row, including inserts, deletes, updates.

The **Monitor replication** screen also reflects any errors and warnings with tables being mirrored. If the table has unsupported column types or if the entire table is unsupported (for example, in memory or columnstore indexes), a notification about the limitation is shown on this screen. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Related content

- [Mirroring Azure SQL Managed Instance](../mirroring/azure-sql-managed-instance.md)

- [What is Mirroring in Fabric?](../mirroring/overview.md)

