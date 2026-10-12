---
title: Enable performance monitoring for Microsoft SQL (preview)
description: Learn how to enable and disable performance monitoring for Microsoft SQL services so that performance data appears in the Database Hub.
ms.reviewer: amapatil, lancewright
ms.date: 10/05/2026
ms.topic: how-to
ms.custom: references_regions
ai-usage: ai-assisted
---
# Enable performance monitoring for Microsoft SQL (preview)

This article explains how to enable and disable performance monitoring for Microsoft SQL services so that performance data appears on the **Performance** page of the [Database Hub](https://powerbi.com/workloads/fdh/databaseHub). Enabling performance monitoring doesn't incur an extra cost. You don't need to deploy or maintain monitoring agents, data stores, or other monitoring infrastructure.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

The steps to turn on performance monitoring differ by service. After you turn on monitoring, every service sends performance data to the same telemetry pipeline. The Database Hub uses this data to help identify performance issues and create dashboards. You can also query the telemetry directly with KQL. For more information, see [Query performance monitoring telemetry](microsoft-sql-query-performance-monitoring-telemetry.md). This article covers the following services:

- [Azure SQL Database](#enable-performance-monitoring-for-azure-sql-database)
- [SQL Server on Azure VMs](#enable-performance-monitoring-for-sql-server-on-azure-vms)
- [SQL Server enabled by Azure Arc](#enable-performance-monitoring-for-sql-server-enabled-by-azure-arc)

You can view Microsoft SQL resources in the Database Hub from Azure, Fabric, and on-premises. The following resource types are included:

- Azure SQL Database
- Azure SQL Managed Instance
- SQL Server on Azure VMs
- SQL Server enabled by Azure Arc
- Azure SQL Database elastic pools
- SQL database in Fabric

The following resource types are visible in the Database Hub, but the **Performance** page doesn't support them yet:

- SQL database in Fabric
- Azure SQL Database elastic pools
- Azure SQL Managed Instance
- Performance monitoring doesn't collect data from databases in Azure SQL Database elastic pools or from secondary replicas.

## Regional availability and data handling

Performance monitoring is available for Microsoft SQL resources in the following Azure regions. Government, sovereign, and air-gapped clouds aren't supported during the preview. For more information, see [Fabric region availability](../../admin/region-availability.md).

#### [Americas](#tab/americas)

- Brazil South
- Canada Central
- Canada East
- Central US
- East US
- East US 2
- North Central US
- South Central US
- West Central US
- West US
- West US 2
- West US 3

#### [Asia Pacific](#tab/asia)

- Australia East
- Central India
- Japan East
- Korea Central
- Southeast Asia

#### [Europe, the Middle East, and Africa](#tab/emea)

- France Central
- North Europe
- Norway East
- South Africa North
- Sweden Central
- Switzerland North
- UAE North
- UK South
- UK West
- West Europe

---

Performance monitoring collects performance data from dynamic management views (DMVs) on your SQL resources. Performance monitoring doesn't collect any personal data or customer content, and the data isn't stored at rest outside the geography of the monitored SQL resource.

<a id="register-the-azure-resource-provider"></a>

## Register the SQL resource provider

To view performance monitoring data, register the `Microsoft.Sql` resource provider in each subscription that contains database resources you want to monitor. For more information, see [az provider register](/cli/azure/provider#az-provider-register).

```azurecli
az provider register --namespace Microsoft.Sql
```

To check the registration state, run the following command. Registration is complete when the command returns `Registered`.

```azurecli
az provider show --namespace Microsoft.Sql --query "registrationState" --output tsv
```

## Enable performance monitoring for Azure SQL Database

Use either of the following methods:

- In the Database Hub, go to the **Estate** page, select the resource, and then select **Enable Performance Monitoring**.
- Run the following T-SQL script on each user database you want to monitor. Don't run the script on the `master` database. To apply the script to multiple servers at once, consider [multiserver queries in SQL Server Management Studio (SSMS)](/ssms/register-servers/execute-statements-against-multiple-servers-simultaneously). Add the `MS_EnablePerformanceMonitoringPreview` extended property to each user database you want to monitor. 

```sql
IF EXISTS (
    SELECT 1
    FROM sys.extended_properties
    WHERE class = 0
      AND name = N'MS_EnablePerformanceMonitoringPreview'
)
BEGIN
    EXEC sys.sp_updateextendedproperty
        @name = N'MS_EnablePerformanceMonitoringPreview',
        @value = N'true';
END
ELSE
BEGIN
    EXEC sys.sp_addextendedproperty
        @name = N'MS_EnablePerformanceMonitoringPreview',
        @value = N'true';
END;
GO
```

### How to disable performance monitoring for Azure SQL Database

To stop collecting performance data for a user database, change `@value = N'true'` to `@value = N'false'` in both procedure calls, and then rerun the T-SQL script on that database.

## Enable performance monitoring for SQL Server on Azure VMs

To enable performance monitoring for SQL Server on Azure VMs, add the `DatabaseWatcheronAzureVM` feature flag to the public settings of the [SQL IaaS Agent extension](/azure/azure-sql/virtual-machines/windows/sql-server-iaas-agent-extension-automate-management?view=azuresql-vm&preserve-view=true). The extension then collects performance data from the SQL Server instance and uses the VM's system-assigned managed identity to upload it to a regional telemetry endpoint. Monitoring is configured per VM. Enabling the feature flag on one VM doesn't enable monitoring on other VMs.

For verification, troubleshooting, and the full list of collected datasets, see [Enable performance monitoring for SQL Server on Azure VMs](/azure/azure-sql/virtual-machines/windows/enable-performance-monitoring-sql-vm?view=azuresql-vm&preserve-view=true).

### Prerequisites for SQL Server on Azure VMs

- Performance monitoring supports SQL Server 2016 SP1 and later versions on Azure VMs. SQL Server versions earlier than SQL Server 2016 SP1 aren't supported.
- Performance monitoring collects all datasets for SQL Server Enterprise and Standard editions. For SQL Server Developer, Express, and Evaluation editions, performance monitoring collects only client connection data.
- You must install the [SQL IaaS Agent extension](/azure/azure-sql/virtual-machines/windows/sql-server-iaas-agent-extension-automate-management?view=azuresql-vm&preserve-view=true) version `2.0.229.0` or later in full management mode. You must enable the extension, and its provisioning state must be **Succeeded**.
- The VM must have a [system-assigned managed identity](/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities#enable-system-assigned-managed-identity-on-an-existing-vm) enabled.
- The SQL Server instance resource must be available through [unified inventory](/azure/azure-sql/virtual-machines/windows/unified-inventory-sql-vm?view=azuresql-vm&preserve-view=true).
- You must [register](#register-the-sql-resource-provider) the `Microsoft.Sql` resource provider for the subscription.
- The VM must allow outbound HTTPS connectivity on port `443` to `telemetry.<region>.arcdataservices.com`, where `<region>` is the Azure region that hosts the VM.
- You need the latest version of the [Azure CLI](/cli/azure/install-azure-cli).
- You need permission to view and update extensions on the VM, such as membership in the [Virtual Machine Contributor](/azure/role-based-access-control/built-in-roles/compute#virtual-machine-contributor) role.

### How to enable performance monitoring for SQL Server on Azure VMs

> [!IMPORTANT]
> SQL IaaS Agent extension settings aren't cumulative. When you update the extension, include all existing public settings to avoid unintentionally disabling another feature.

The following PowerShell steps retrieve the current public settings, add the performance monitoring feature flag, and apply the merged settings to the extension.

1. Open PowerShell in an environment where the Azure CLI is installed, and then sign in to Azure.

    ```powershell
    az login
    ```

1. Set the variables for your SQL Server VM.

    ```powershell
    $subscriptionId = "<subscription-id>"
    $resourceGroup = "<resource-group>"
    $vmName = "<vm-name>"

    az account set --subscription $subscriptionId
    ```

1. Retrieve the current SQL IaaS Agent extension settings.

    ```powershell
    $extension = az vm extension show `
      --resource-group $resourceGroup `
      --vm-name $vmName `
      --name SqlIaasExtension `
      --query "{settings:settings,typeHandlerVersion:typeHandlerVersion}" `
      --output json | ConvertFrom-Json

    if ($null -eq $extension.settings) {
      $settings = [pscustomobject]@{}
    }
    else {
      $settings = $extension.settings
    }
    ```

1. Add the `DatabaseWatcheronAzureVM` feature flag while preserving the existing feature flags.

    ```powershell
    $monitoringFlag = [pscustomobject]@{
      Name = "DatabaseWatcheronAzureVM"
      Enable = $true
    }

    $featureFlags = @(
      $settings.FeatureFlags |
        Where-Object { $_.Name -ne $monitoringFlag.Name }
    )
    $featureFlags += $monitoringFlag

    $settings | Add-Member `
      -MemberType NoteProperty `
      -Name FeatureFlags `
      -Value $featureFlags `
      -Force
    ```

1. Save the merged settings and apply them to the SQL IaaS Agent extension.

    ```powershell
    $settingsPath = Join-Path $env:TEMP "sqlvm-performance-monitoring-settings.json"

    try {
      $settings |
        ConvertTo-Json -Depth 50 |
        Out-File -FilePath $settingsPath -Encoding utf8

      az vm extension set `
        --resource-group $resourceGroup `
        --vm-name $vmName `
        --publisher Microsoft.SqlServer.Management `
        --name SqlIaaSAgent `
        --extension-instance-name SqlIaasExtension `
        --settings "@$settingsPath"
    }
    finally {
      Remove-Item $settingsPath -ErrorAction SilentlyContinue
    }
    ```

1. Repeat these steps for each VM that you want to monitor.

The extension reloads the public settings automatically. You don't need to restart the SQL Server IaaS Agent service or the VM. Most performance data is available within 3 to 5 minutes after the setting takes effect. Some inventory-based data can take up to 15 minutes.

To confirm that monitoring is running, check the extension status:

```powershell
az vm extension show `
  --resource-group $resourceGroup `
  --vm-name $vmName `
  --name SqlIaasExtension `
  --instance-view `
  --query "instanceView.statuses[0].message" `
  --output tsv
```

When performance monitoring is running and uploading data successfully, the status includes `DatabaseMonitorArcPlugin: {"State":"Running","MetricsUploadStatus":"OK"}`. To confirm that the data is available, run the connection test query in [Query performance monitoring telemetry](microsoft-sql-query-performance-monitoring-telemetry.md#connect-to-the-telemetry).

### Disable performance monitoring for SQL Server on Azure VMs

To stop collecting new performance data for a VM, set the `DatabaseWatcheronAzureVM` feature flag to `false`. Merge the change with the existing public settings so that other SQL IaaS Agent extension features aren't affected.

1. Complete steps 1 through 3 in [Enable performance monitoring for SQL Server on Azure VMs](#enable-performance-monitoring-for-sql-server-on-azure-vms) to sign in, set the variables, and retrieve the current settings.
1. Set the `DatabaseWatcheronAzureVM` feature flag to `false` while preserving the existing feature flags.

    ```powershell
    $monitoringFlag = [pscustomobject]@{
      Name = "DatabaseWatcheronAzureVM"
      Enable = $false
    }

    $featureFlags = @(
      $settings.FeatureFlags |
        Where-Object { $_.Name -ne $monitoringFlag.Name }
    )
    $featureFlags += $monitoringFlag

    $settings | Add-Member `
      -MemberType NoteProperty `
      -Name FeatureFlags `
      -Value $featureFlags `
      -Force
    ```

1. Complete step 5 in [Enable performance monitoring for SQL Server on Azure VMs](#enable-performance-monitoring-for-sql-server-on-azure-vms) to apply the merged settings to the extension.

Allow a few minutes for the new setting to take effect, and then check the extension status again to confirm the change.

## Enable performance monitoring for SQL Server enabled by Azure Arc

Performance monitoring for SQL Server enabled by Azure Arc is on by default. When an instance meets all the prerequisites in this section, it collects performance data automatically, and you don't need to take any other steps. For more information, see [Monitor SQL Server enabled by Azure Arc](/sql/sql-server/azure-arc/sql-monitoring?view=sql-server-ver17&preserve-view=true).

### Prerequisites for SQL Server enabled by Azure Arc

- The Azure Extension for SQL Server (`WindowsAgent.SqlServer`) must be version `1.1.2504.99` or later versions.
- SQL Server must run on Windows. SQL Server on Linux isn't supported. SQL Server on Windows Server 2012 R2 and earlier versions isn't supported.
- SQL Server must be Standard or Enterprise edition.
- SQL Server must be version 2016 SP1 or later versions.
- The server must have connectivity to `*.<region>.arcdataservices.com`. For more information, see the [network requirements](/azure/azure-arc/servers/network-requirements?tabs=azure-cloud).
- The [license type](/sql/sql-server/azure-arc/manage-license-billing?view=sql-server-ver17&preserve-view=true#license-types) on SQL Server enabled by Azure Arc must be Software Assurance or pay-as-you-go.
- You need an Azure role that includes the `Microsoft.AzureArcData/sqlServerInstances/getTelemetry/` action. The built-in Azure Hybrid Database Administrator - Read Only Service Role includes this action. For more information, see [Azure built-in roles](/azure/role-based-access-control/built-in-roles).
- Failover cluster instances aren't currently supported.

### How to enable performance monitoring for SQL Server enabled by Azure Arc

The following commands enable performance data collection. The commands might run successfully, but the system collects performance data only when the instance meets all the prerequisites in this section.

To turn collection on or off in the Azure portal:

1. On the resource page for SQL Server enabled by Azure Arc, select **Performance Dashboard (preview)**.
1. At the top of the **Performance Dashboard** pane, select **Configure**.
1. On the **Configure monitoring settings** pane, use the toggle to turn monitoring data collection on.
1. Select **Apply settings**.

To enable collection by using the Azure CLI, run the following command. Replace the placeholders for subscription ID, resource group, and resource name.

```azurecli
az resource update --ids "/subscriptions/<sub_id>/resourceGroups/<resource_group>/providers/Microsoft.AzureArcData/SqlServerInstances/<resource_name>" --set 'properties.monitoring.enabled=true' --api-version 2023-09-01-preview
```

### How to disable performance monitoring for SQL Server enabled by Azure Arc

To turn collection on or off in the Azure portal:

1. On the resource page for SQL Server enabled by Azure Arc, select **Performance Dashboard (preview)**.
1. At the top of the **Performance Dashboard** pane, select **Configure**.
1. On the **Configure monitoring settings** pane, use the toggle to turn monitoring data collection off.
1. Select **Apply settings**.

To disable collection by using the Azure CLI, run the following command. Replace the placeholders for subscription ID, resource group, and resource name.

```azurecli
az resource update --ids "/subscriptions/<sub_id>/resourceGroups/<resource_group>/providers/Microsoft.AzureArcData/SqlServerInstances/<resource_name>" --set 'properties.monitoring.enabled=false' --api-version 2023-09-01-preview
```

## Next step

> [!div class="nextstepaction"]
> [Monitor a Microsoft SQL database in the Database Hub (preview)](monitor-sql.md)

## Related content

- [What is the Database Hub?](overview.md)
- [Query performance monitoring telemetry (preview)](microsoft-sql-query-performance-monitoring-telemetry.md)
- [Enable performance monitoring for SQL Server on Azure VMs](/azure/azure-sql/virtual-machines/windows/enable-performance-monitoring-sql-vm?view=azuresql-vm&preserve-view=true)
- [Monitor SQL Server enabled by Azure Arc](/sql/sql-server/azure-arc/sql-monitoring?view=sql-server-ver17&preserve-view=true)
- [SQL Server enabled by Azure Arc](/sql/sql-server/azure-arc/overview)