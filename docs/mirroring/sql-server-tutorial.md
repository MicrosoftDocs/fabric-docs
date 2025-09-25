---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases From SQL Server"
description: Learn how to configure a mirrored database From SQL Server in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: ajayj, rajpo
ms.date: 09/25/2025
ms.topic: tutorial
ms.custom:
---

# Tutorial: Configure Microsoft Fabric mirrored databases from SQL Server

[Mirroring in Fabric](../mirroring/overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored SQL Server database, which creates a read-only, continuously replicated copy of your SQL Server data in OneLake.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- Install or use an existing SQL Server instance, on-premises or in the cloud.
    - As a tutorial, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. 
- Install a T-SQL querying tool like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../fundamentals/fabric-trial.md).
    - The Fabric capacity needs to be active and running. A paused or deleted capacity will affect Mirroring and no data is replicated.
- Fabric tenant settings are required. Ensure the following two [Fabric Tenant settings](../admin/about-tenant-settings.md) are enabled:
    - [Service principals can use Fabric APIs](../admin/service-admin-portal-developer.md#service-principals-can-use-fabric-apis)
    - [Users can access data stored in OneLake with apps external to Fabric](../admin/tenant-settings-index.md#onelake-settings)
- To mirror data from SQL Server 2025, you need to have a member or admin role in your workspace when create a mirrored database from the Fabric portal. During creation, the managed identity of SQL Server is automatically granted "Read and write" permission on the mirrored database. Users with the contributor role don't have the Reshare permission necessary to complete this step.
- Review the [Platform limitations in Microsoft Fabric mirrored databases From SQL Server](sql-server-limitations.md#platform-limitations).
- An [on-premises data gateway](/data-integration/gateway/service-gateway-install) in your SQL Server instance's network. The gateway machine's network must connect to the SQL Server instance via a private endpoint or be allowed by the firewall rule.

### Database principal for Fabric

Next, you need to create a way for the Fabric service to authenticate to your SQL Server instance.

You can accomplish this with a [login and mapped database user](#use-a-login-and-mapped-database-user).

#### Use a login and mapped database user

Fabric will use a dedicated login to connect to the source SQL Server instance. 

Follow these instructions for either SQL Server 2025 or SQL Server 2016-2022 to create a login and database user for database mirroring.

## [SQL Server 2025](#tab/sql2025)

In SQL Server 2025, the permissions required for the Fabric login are:

- Membership in the server role `##MS_ServerStateReader##`
- The following permissions in the user database:
    - SELECT
    - ALTER ANY EXTERNAL MIRROR

1. Connect to your SQL Server instance using a T-SQL querying tool like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
1. Connect to the `master` database. Create a server login and assign the appropriate permissions.

   > [!IMPORTANT] 
   > For SQL Server instances in an Always On availability group, the login must be created in all SQL Server instances.  The `fabric_login` principal must have the same SID in each replica instance.

   - Create a SQL Authenticated login named `fabric_login`. You can choose any name for this login. Provide your own strong password. Run the following T-SQL script in the `master` database:

   ```sql
   --Run in the master database
   USE [master];
   CREATE LOGIN [fabric_login] WITH PASSWORD = '<strong password>';

   ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER [fabric_login];
   ```

   - Or, log in as the Microsoft Entra admin, and create a Microsoft Entra ID authenticated login from an existing account (recommended). Run the following T-SQL script in the `master` database:

   ```sql
   --Run in the master database
   USE [master];
   CREATE LOGIN [bob@contoso.com] FROM EXTERNAL PROVIDER;

   ALTER SERVER ROLE [##MS_ServerStateReader##] ADD MEMBER [bob@contoso.com];
   ```

1. Connect to the user database your plan to mirror to Microsoft Fabric. Create a database user connected to the login and grant the minimum privileges necessary:

    - For a SQL Authenticated login:

    ```sql
    --Run in the user database
    CREATE USER [fabric_user] FOR LOGIN [fabric_login];

    GRANT SELECT, ALTER ANY EXTERNAL MIRROR
       TO [fabric_user];
    ```
    
    - Or, for a Microsoft Entra authenticated login (recommended):

    ```sql
    --Run in the user database
    CREATE USER [bob@contoso.com] FOR LOGIN [bob@contoso.com];

    GRANT SELECT, ALTER ANY EXTERNAL MIRROR
       TO [bob@contoso.com];
    ```

## [SQL Server 2016-2022](#tab/sql201622)

For SQL Server versions 2016-2022, an admin needs membership in the sysadmin server role or db_owner database role is only needed to initially setup CDC. Any future CDC maintainence will require membership in the sysadmin server role or db_owner database role.

Once CDC is setup, enabling Mirroring only requires CONNECT at the server level, and SELECT and CONNECT permissions in the database level to replicate the data.

1. Connect to your SQL Server instance using a T-SQL querying tool like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true).
1. Connect to the `master` database. Create a server login and assign the appropriate permissions.

   > [!IMPORTANT] 
   > For SQL Server instances in an Always On availability group, the login must be created in all SQL Server instances. Repeat the following steps on each replica instance. The `fabric_login` principal must have the same SID in each replica instance.

   You can choose any name for this login. Membership in the sysadmin server role of the SQL Server 2016-2022 instance is required to [enable or disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true).

   - Run the following T-SQL script in the `master` database to create a SQL authenticated login named `fabric_login`. Provide your own strong password.

   ```sql
   --Run in the master database
   USE [master];
   CREATE LOGIN [fabric_login] WITH PASSWORD = '<strong password>';
   ALTER SERVER ROLE [sysadmin] ADD MEMBER [fabric_login];
   ```

   - Or, log in as the Microsoft Entra admin, and create a Microsoft Entra ID authenticated login from an existing account. Run the following T-SQL script in the `master` database:

   ```sql
   --Run in the master database
   USE [master];
   CREATE LOGIN [bob@contoso.com] FROM EXTERNAL PROVIDER;
   ALTER SERVER ROLE [sysadmin] ADD MEMBER [bob@contoso.com];
   ```
   
1. Membership in the db_owner database role of the source database for mirroring is required to manage CDC.

    Connect to the user database your plan to mirror to Microsoft Fabric. Create a database user connected to the login and grant the minimum privileges necessary.

    - For a SQL Authenticated login:

    ```sql
    --Run in the user database
    CREATE USER [fabric_user] FOR LOGIN [fabric_login];
    ALTER ROLE [db_owner] ADD MEMBER [fabric_user];
    ```
    
    - Or, for a Microsoft Entra authenticated login (recommended):

    ```sql
    --Run in the user database
    CREATE USER [bob@contoso.com] FOR LOGIN [bob@contoso.com];
    ALTER ROLE [db_owner] ADD MEMBER [bob@contoso.com];
    ```

1. Once CDC is enabled, you can remove `fabric_login` from the sysadmin server role and db_owner database role.

   - For a SQL Authenticated login:

    ```sql
    --Run in the master database
    USE [master];
    ALTER SERVER ROLE [sysadmin] DROP MEMBER [fabric_login];
    GRANT CONNECT, SELECT to [fabric_login];
    ```

    ```sql
    --Run in the user database
    ALTER ROLE [db_owner] DROP MEMBER [fabric_user];
    GRANT CONNECT, SELECT to [fabric_user];
    ```

   - Or, for a Microsoft Entra authenticated login (recommended):
   
    ```sql
    --Run in the master database
    USE [master];
    ALTER SERVER ROLE [sysadmin] DROP MEMBER [bob@contoso.com];
    ```

    ```sql
    --Run in the user database
    ALTER ROLE [db_owner] DROP MEMBER [bob@contoso.com];
    GRANT CONNECT, SELECT to [bob@contoso.com];
    ```

---

## Connect to your SQL Server

The instructions and requirements for configuring a Fabric Mirrored Database from SQL Server differ in SQL Server 2025. In SQL Server 2025, an Azure Arc-enabled server is part of the necessary configuration for the communication to Fabric. Before SQL Server 2025, Azure Arc is not required, and the replication is based on [Change Data Capture (CDC)](/sql/relational-databases/track-changes/about-change-data-capture-sql-server).

## [SQL Server 2025](#tab/sql2025)

### Connect server to Azure Arc and enable manage identity

To configure Fabric Mirroring, you need to configure Azure Arc for your SQL Server 2025 instance.

1. Connect the server to Azure Arc. Follow the steps in [Quickstart - Connect hybrid machine with Azure Arc-enabled servers](/azure/azure-arc/servers/learn/quick-enable-hybrid-vm).

   For SQL Server instances running in an Always On availability group or failover cluster instance configuration, all nodes must be connected to Azure Arc. 

1. Three registry keys are needed on the Windows Server hosting the source SQL Server instance for Fabric Mirroring. The registry keys include information about the system-assigned managed identity (SAMI) for the Windows Server. The following PowerShell script adds three registry keys, the necessary file system permissions, and managed identities.
   
    > [!NOTE]
    > This section contains a script to modify the Windows registry. Make sure that you follow these steps carefully. For added protection, back up the registry before you modify it. Then, you can restore the registry if a problem occurs. For more information about how to back up and restore the registry, see [How to back up and restore the registry in Windows](/troubleshoot/windows-server/performance/windows-registry-advanced-users#back-up-the-registry).
    
    The three registry keys are added in the following location:    
    - For a default instance: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\FederatedAuthentication`
    - For a named instance: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.Instancename\MSSQLServer\FederatedAuthentication`
    
    The script adds the following keys:    
    - `ArcServerManagedIdentityClientId`
    - `ArcServerSystemAssignedManagedIdentityClientId`
    - `ArcServerSystemAssignedManagedIdentityTenantID`

   Run the following PowerShell script to configure the system-assigned managed identity (SAMI) and necessary registry keys on the Windows Server that hosts the source SQL Server instance.

   ```powershell
    $apiVersion = "2020-06-01"
    $resource = "https://storage.azure.com/"
    $ep = $env:IDENTITY_ENDPOINT
    if (!$ep) {
        throw "Azure Arc service is not installed, Microsoft Fabric Mirroring cannot be enabled."
    }
    $endpoint = "{0}?resource={1}&api-version={2}" -f $ep,$resource,$apiVersion
    $secretFile = ""
    try {
        Invoke-WebRequest -Method GET -Uri $endpoint -Headers @{Metadata='True'} -UseBasicParsing > $null
    } catch {
        if ($_.Exception.Response.Headers) {
            $wwwAuthHeader = $_.Exception.Response.Headers["WWW-Authenticate"]
            if ($wwwAuthHeader -match "Basic realm=.+") {
                $secretFile = ($wwwAuthHeader -split "Basic realm=")[1]
            }
        }
    }
     
    if (!$secretFile) {
        throw "Secret file path not found."
    }
     
    $secret = cat -Raw $secretFile
     
    try {
        $response = Invoke-WebRequest -Method GET -Uri $endpoint -Headers @{Metadata='True'; Authorization="Basic $secret"} -UseBasicParsing
    } catch {
        throw "Can not establish communication with IMDS service. You need to have Azure Arc service installed"
    }
     
    if ($response) {
        $parts = (ConvertFrom-Json -InputObject $response.Content).access_token -split "\."
        $padLength = 4 - ($parts[1].Length % 4)
        if ($padLength -ne 4) { $parts[1] += "=" * $padLength }
        $payload = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($parts[1])) | ConvertFrom-Json
        $regPath = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\Instance Names\SQL"
        $instance = ""
        $regKey = Get-Item -Path $regPath
        $regKey.GetValueNames() | Where-Object { $regKey.GetValue($_) -match 'MSSQL17' } | ForEach-Object {
            $instance = $_
            $service = if ($instance -eq "MSSQLSERVER") { "MSSQLSERVER" } else { "MSSQL$" + $instance }
            $reginst = $regKey.GetValue($_)
            $regFed = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\$($reginst)\MSSQLServer\FederatedAuthentication"
            if (-not (Test-Path -Path $regFed)) {
                New-Item -Path $regFed -Force > $null
            }
            Write-Host "Registering Azure Arc MSI service for SQL Server instance: " $instance `n
            Set-ItemProperty -Path $regFed -Name "ArcServerManagedIdentityClientId" -Value ""
            Set-ItemProperty -Path $regFed -Name "ArcServerSystemAssignedManagedIdentityClientId" -Value $($payload.appid)
            Set-ItemProperty -Path $regFed -Name "ArcServerSystemAssignedManagedIdentityTenantId" -Value $($payload.tid)
            $svcPath = "HKLM:\SYSTEM\CurrentControlSet\Services\$($service)"
            if (Test-Path -Path $svcPath) {
                $keyPath = Split-Path $secretFile
                $svcKey = Get-Item -Path $svcPath
                $sqlAccount = $svcKey.GetValue("ObjectName")
                if ($sqlAccount -ne "LocalSystem") {
                    Write-Host "Permissioning folder" $keyPath "for SQL Server account" $sqlAccount `n
                    icacls $keyPath /grant "$($sqlAccount):(OI)(CI)R"
                    $group = "Hybrid agent extension applications"
                    $isMember = Get-LocalGroupMember -Group $group | Where-Object { $_.Name -eq $sqlAccount }
                    if (-not $isMember) {
                        Write-Host "Also adding SQL running account to local group: $group" `n
                        Add-LocalGroupMember -Group $group -Member $sqlAccount
                    } else {
                        Write-Host ""
                    }
                }
            }
        }
        Write-Host "Registration complete for:" `n "Client ID: " $($payload.appid) `n "Tenant ID: " $($payload.tid) `n
    }
   ```
   
   > [!IMPORTANT]
   > For SQL Server instances running in an Always On availability group or failover cluster instance configuration, run the PowerShell script locally on each node. 

1. Connect to your local SQL Server 2025 instance. When you connect, select **Trust server certificate**.
1. View the managed identities:

   ```sql
   --Run in the master database
   USE [master];
   SELECT *
   FROM sys.dm_server_managed_identities;
   ```

   This should return 1 row with the correct `client_id` and `tenant_id`. `Identity_type` should be "System-assigned".

### Add managed identities permissions in Microsoft Fabric

The managed identity of the SQL Server is created and granted permissions by Microsoft Fabric automatically.

However, for SQL Server instances running in an Always On availability group or failover cluster instance configuration, the system-assigned managed identity (SAMI) of every secondary node needs to be granted **Contributor** permissions to the Fabric workspace. A managed identity is created by the PowerShell script provided for each secondary node, and that must be granted Fabric permissions manually. 

1. In the Fabric portal, grant Fabric permissions to each secondary node's managed identity.
    1. In the Fabric workspace, select **Manage access**.

       :::image type="content" source="media/sql-server-tutorial/manage-access.png" alt-text="Screenshot from the Fabric portal of the Manage access button.":::

    1. Select **Add people or groups**. 
    1. In the **Add people** dialogue, find the server names for each node in the availability group or failover cluster. 
    1. Grant each membership to the **Contributor** role.

       :::image type="content" source="media/sql-server-tutorial/add-people.png" alt-text="Screenshot of the Add people dialogue, where you add each node to the Fabric Contributor role.":::

### Configure the on-premises data gateway

Check your networking requirements for Fabric to access your SQL Server. You need to [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. Make sure the on-premises gateway machine's network can [connect to the SQL Server instance](/troubleshoot/sql/database-engine/connect/resolve-connectivity-errors-overview). For more information, see [How to: Secure data Microsoft Fabric mirrored databases From SQL Server](../mirroring/sql-server-security.md).

1. [Download On-premises data gateway from the Official Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=53127&msockid=0448b52333796d6425f3a0b332c36cba).
1. Start installation. Follow instructions in [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).
    - Provide your Microsoft account email address.
    - Name: `MyOPDG` or any name you desire.
    - Recovery key: provide a strong recovery key.

### Create a mirrored SQL Server

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane. Select the **Create** icon.  
1. Scroll to select **Mirrored SQL Server database**. 
1. Enter the name of your SQL Server database to be mirrored, then select **Create**.

### Connect Fabric to your SQL Server instance

To enable Mirroring, you will need to connect to the SQL Server instance from Fabric to initiate the connection from Fabric. The following steps guide you through the process of creating the connection to your SQL Server:

1. Under **New sources**, select **SQL Server database**. Or, select an existing SQL Server connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the SQL Server instance.
   - **Server**: The fully qualified server name path that Fabric will use to reach your SQL Server instance, the same that you would use for SSMS. 

   > [!TIP] 
   > SQL Server instances in an Always On availability group, use the [Always On listener](/sql/database-engine/availability-groups/windows/availability-group-listener-overview?view=sql-server-ver17&preserve-view=true) for **Server**. If SQL Server is running in a failover cluster instance configuration, use the [Virtual Network Name](/sql/sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server?view=sql-server-ver17&preserve-view=true#network-name) for **Server**.

   - **Database**: Enter the name of your SQL Server.
      - **Connection**: Create new connection.
      - **Connection name**: An automatic name is provided. You can change it.
      - **Data gateway:** Select the on-premises data gateway you set up according to your scenario.
      - **Authentication kind**: Choose the authentication method and provide the principal you set up in [Use a login and mapped database user](#use-a-login-and-mapped-database-user).
      - Select the **Use encrypted connection** checkbox.
1. Select **Connect**.

## [SQL Server 2016-2022](#tab/sql201622)

### Prepare your SQL Server instance

1. The SQL Server Agent service must be running. It is highly recommended to configure Automatic Startup.
1. Changed Data Capture (CDC) will be automatically enabled and configured by Fabric Mirroring for each desired table in your database. Review the [Known issues and errors with CDC](/sql/relational-databases/track-changes/known-issues-and-errors-change-data-capture). CDC requires that each table has a primary key.

### Configure the on-premises data gateway

Check your networking requirements for Fabric to access your SQL Server. You need to [install an on-premises data gateway](/data-integration/gateway/service-gateway-install) to mirror the data. Make sure the on-premises gateway machine's network can [connect to the SQL Server instance](/troubleshoot/sql/database-engine/connect/resolve-connectivity-errors-overview). For more information, see [How to: Secure data Microsoft Fabric mirrored databases From SQL Server](../mirroring/sql-server-security.md).

1. Download the on-premises data gateway, see [Download the on-premises data gateway from the Official Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=53127&msockid=0448b52333796d6425f3a0b332c36cba).
1. Start installation. Follow instructions in [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).
    - Provide your Microsoft account email address.
    - Name: `MyOPDG` or any name you desire.
    - Recovery key: provide a strong recovery key.

### Create a mirrored SQL Server

1. Open the [Fabric portal](https://fabric.microsoft.com).
1. Use an existing workspace, or create a new workspace.
1. Navigate to the **Create** pane. Select the **Create** icon.  
1. Scroll to select **Mirrored SQL Server database**. 
1. Enter the name of your SQL Server database to be mirrored, then select **Create**.

### Connect Fabric to your SQL Server instance

To enable Mirroring, you will need to connect to the SQL Server instance from Fabric to initiate the connection from Fabric. The following steps guide you through the process of creating the connection to your SQL Server:

1. Under **New sources**, select **SQL Server database**. Or, select an existing SQL Server connection from the OneLake hub.
1. If you selected **New connection**, enter the connection details to the SQL Server instance.
   - **Server**: The fully qualified server name path that Fabric will use to reach your SQL Server instance, the same that you would use for SSMS.

   > [!TIP] 
   > For SQL Server instances in an Always On availability group, use the [Always On listener](/sql/database-engine/availability-groups/windows/availability-group-listener-overview?view=sql-server-ver17&preserve-view=true) for **Server**. If SQL Server is running in a failover cluster instance configuration, use the [Virtual Network Name](/sql/sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server?view=sql-server-ver17&preserve-view=true#network-name) for **Server**.

   - **Database**: Enter the name of your SQL Server.
      - **Connection**: Create new connection.
      - **Connection name**: An automatic name is provided. You can change it.
      - **Data gateway:** Select the name of the on-premises data gateway you set up according to your scenario.
      - **Authentication kind**: Choose the authentication method and provide the principal you set up in [Use a login and mapped database user](#use-a-login-and-mapped-database-user).
1. Select **Connect**.

### Configure secondary replicas of AlwaysOn availability groups

This section is only required if the source database for the SQL Server mirroring to Fabric is a member of an AlwaysOn availability group.

If the source database is in an AlwaysOn availability group, additional steps are required to configure the secondary replicas. Repeat these steps for every secondary replica in order to prepare the entire availability group. Each replica requires SQL agent jobs to be setup so that CDC behaves properly when that replica is primary.

1. Fail over the availability group to a secondary replica. 
1. Use the provided script to create, if they don't already exist, cleanup and capture jobs in the secondary replica instance's `msdb` system database. These jobs are important to maintain the historical data retained by CDC.

   In the following script, replace `<YOUR DATABASE NAME>` with the name of the user database that will be mirrored. Execute the following T-SQL sample on the user database:

   ```sql
   DECLARE @db nvarchar(128) = '<YOUR DATABASE NAME>';

   DECLARE @capture nvarchar(128) = N'cdc.' + @db + N'_capture';
   DECLARE @cleanup nvarchar(128) = N'cdc.' + @db + N'_cleanup';
   -- Names may differ. Run `SELECT * FROM msdb.dbo.sysjobs WHERE category_id = 13 or category_id = 16` to see if these names exist.
       
    IF NOT EXISTS (SELECT name, job_id FROM msdb.dbo.sysjobs WHERE name = @capture)
    BEGIN
        -- Create the capture job
        EXEC sys.sp_cdc_add_job @job_type = N'capture';
        PRINT 'CDC capture job has been created.';
    END
    ELSE
    BEGIN
        PRINT 'CDC capture job already exists.';
        -- Start capture job is running
        IF NOT EXISTS (SELECT j.name, j.enabled, ja.start_execution_date, ja.stop_execution_date
            FROM msdb.dbo.sysjobs AS j
            LEFT JOIN msdb.dbo.sysjobactivity AS ja ON j.job_id = ja.job_id
            WHERE j.name = @capture and ((ja.start_execution_date IS NOT NULL and ja.stop_execution_date IS NULL)) or j.enabled <> 0)
        BEGIN
            EXEC msdb.dbo.sp_start_job @job_name = @capture;
            PRINT 'CDC capture job started running.';
        END
        ELSE
        BEGIN
            PRINT 'CDC capture job already running.';
        END
    END
    
    IF NOT EXISTS (SELECT name,job_id FROM msdb.dbo.sysjobs WHERE name = @cleanup)
    BEGIN
        -- Create the cleanup job
        EXEC sys.sp_cdc_add_job @job_type = N'cleanup';
        PRINT 'CDC cleanup job has been created.';
    END
    ELSE
    BEGIN
        -- Ensure that the cleanup job is properly scheduled (default schedule)
        IF NOT EXISTS (SELECT j.name, j.enabled, ja.start_execution_date, ja.stop_execution_date
            FROM msdb.dbo.sysjobs AS j
            LEFT JOIN msdb.dbo.sysjobactivity AS ja ON j.job_id = ja.job_id
            WHERE j.name = @cleanup and j.enabled <> 0)
        BEGIN
            EXEC msdb.dbo.sp_update_job @job_name = @cleanup, @enabled = 1;
            PRINT 'CDC cleanup job updated to enabled.';
        END
        ELSE
        BEGIN
            PRINT 'CDC cleanup job already enabled.';
        END
        PRINT 'CDC cleanup job already exists.';
    END
   ```

   The capture and cleanup CDC jobs start immediately and are created with default settings. For more information on the jobs, see [sys.sp_cdc_add_job (Transact-SQL)](/sql/relational-databases/system-stored-procedures/sys-sp-cdc-add-job-transact-sql?view=sql-server-ver17&preserve-view=true).

1. Each job will run on each availability group replica by default, even if it is a secondary replica. This will cause error messages in the logs as the user databases on the secondary replicas are not writeable. Enable the two CDC jobs on primary replicas, and disable them on secondary replicas. Follow guidance in [Change data capture on AlwaysOn availability groups](/sql/database-engine/availability-groups/windows/replicate-track-change-data-capture-always-on-availability?view=sql-server-ver17&preserve-view=true#change-data-capture).

---

> [!IMPORTANT]
> Any granular security established in the source database must be reconfigured in the mirrored database in Microsoft Fabric. For more information, see [How to: Secure data Microsoft Fabric mirrored databases From SQL Server](../mirroring/sql-server-security.md).

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.

    - **Mirror all data** means that any new tables created after Mirroring is started will be mirrored. 

    - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, then select individual tables from your database.

    For this tutorial, we select the **Mirror all data** option.

1. Select **Create mirrored database**. Mirroring begins.
1. Wait for 2-5 minutes. Then, select **Monitor replication** to see the status.
1. After a few minutes, the status should change to *Running*, which means the tables are being synchronized.

    If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.
1. When they have finished the initial copying of the tables, a date appears in the **Last refresh** column.
1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

## Monitor Fabric Mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

:::image type="content" source="media/sql-server-tutorial/monitor-replication.png" alt-text="Screenshot from the Fabric portal showing the Monitor replication status of the new mirrored SQL Server database.":::

## Validate data in OneLake

With Fabric Mirroring up and running, you can now query from your SQL Server database in Microsoft Fabric. For possibilities, see [Explore data in your mirrored database using Microsoft Fabric](../mirroring/explore.md).

:::image type="content" source="media/sql-server-tutorial/validate-data-in-onelake.png" alt-text="Screenshot of querying data in a mirrored SQL Server database with the SQL analytics endpoint." lightbox="media/sql-server-tutorial/validate-data-in-onelake.png" :::

## Performance optimization

Now that mirroring is up and running, learn how to [optimize performance of the source database and mirrored database from SQL Server](sql-server-performance.md) in Microsoft Fabric.

## Related content

- [Mirroring SQL Server](../mirroring/sql-server.md)
- [What is Mirroring in Fabric?](../mirroring/overview.md)
