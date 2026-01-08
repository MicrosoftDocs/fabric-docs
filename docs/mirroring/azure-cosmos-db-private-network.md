---
title: "Configure Private Networks for Azure Cosmos DB Fabric Mirroring (Preview)"
description: Learn how to configure Azure Cosmos DB accounts with private networks and private endpoints to work with Fabric mirroring.
author: jilmal
ms.author: jmaldonado
ms.reviewer: mbrown
ms.date: 01/08/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# How to: Configure private networks for Azure Cosmos DB Fabric Mirroring (Preview)

This guide helps you configure Azure Cosmos DB accounts that use virtual networks or private endpoints to work with Microsoft Fabric mirroring. You can mirror data from Azure Cosmos DB accounts configured with virtual network (VNET) or private endpoints, while maintaining enhanced network security.

> [!NOTE]
> Private network support for Azure Cosmos DB Fabric Mirroring is currently in Preview.

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account using virtual network or private endpoint connectivity.
- An existing Fabric capacity.
- PowerShell with Azure PowerShell modules (`Az.Accounts`, `Az.CosmosDB`, `Az.Network`) installed.
- The Azure Cosmos DB for NoSQL account must be configured for Fabric mirroring including:
    1. Continuous Backup with 7 or 30 day retention.
    1. Entra ID authentication enabled with...
    1. Built-in Data Contributor RBAC Policy - See [assign-contibutor-rbac.ps1](https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-rbac-assign-contributor.ps1)
    1. Custom Mirroring RBAC Policy - See [assign-mirroring-rbac.ps1](https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-rbac-mirroring.ps1)
- The Cosmos DB account and Fabric workspace must be in the same Azure region. To verify your Fabric workspace region:
  1. Open your Fabric workspace
  1. Navigate to **Workspace settings** → **License info**
  1. Note the region of the Fabric capacity
  1. Ensure this matches your Cosmos DB account region
- The user configuring private networks for Cosmos DB Mirroring must be an Azure subscription owner. To learn how to assign this role to a user, see [Assign a user as an administrator of an Azure subscription with conditions](/azure/role-based-access-control/role-assignments-portal-subscription-admin).

## Overview of network configuration options

Azure Cosmos DB supports two primary network security configurations for mirroring:

- **Virtual network**: Restrict access to your Azure Cosmos DB account to specific virtual network subnets. With this configuration, you maintain "Selected networks" access and add the necessary Azure service IP addresses.
- **Private endpoint**: Provide a private IP address from your virtual network to your Azure Cosmos DB account, keeping all traffic on the Microsoft backbone network. This requires temporarily enabling public access to specific Azure services during mirroring setup.

Both configurations use the **Network ACL Bypass** feature to allow Fabric to access your Cosmos DB account by authorizing specific Fabric workspace IDs.

## Quick start: Automated configuration with PowerShell

> [!IMPORTANT]
> This PowerShell script requires you to be an Admin in the target Fabric Workspace.

For a streamlined setup experience, use the provided PowerShell script that automates all configuration steps. The script performs the following actions:

1. **Configures RBAC permissions** - Creates a custom role with required read permissions for Fabric mirroring and assigns it to your Fabric workspace identity. Also applies the Built-in Data Contributor if not already configured.
1. **Sets up IP firewall rules** - Enables public access and adds region specific IP Firewall rules for DataFactory and PowerQueryOnline to allow these services to initialize mirroring. *(Public access is disabled after mirroring successfully configured)*
1. **Enables Network ACL Bypass capability** - Activates the `EnableFabricNetworkAclBypass` feature on your Cosmos DB account.
1. **Configures workspace bypass** - Authorizes your Fabric workspace ID to bypass network restrictions.
1. **Disables public access** - For private endpoint configurations only. If public access was enabled previously, it leaves it enabled.

### Run the automated script

1. Download the PowerShell script [ps-account-setup-cosmos-pe-mirroring.ps1](https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-setup-cosmos-pe-mirroring.ps1). 

1. Open PowerShell as Administrator and run the following commands to authenticate and set your subscription context:

    ```powershell
    # Connect to Azure
    Connect-AzAccount
    
    # Set your subscription context
    Set-AzContext -Subscription "<subscriptionId>"
    ```

2. Run the private network configuration script to set up mirroring

    ```powershell
    .\ps-account-setup-cosmos-pe-mirroring.ps1
    ```

1. Provide the following information when prompted:
    - Azure Subscription ID
    - Resource Group name
    - Cosmos DB account name
    - Fabric Workspace name
    - Azure region for service tag filtering (for example, `westus3`)

1. The script guides you through each step with confirmation prompts. Review and confirm each action.

1. When prompted, create your mirrored database in Fabric while the account is temporarily accessible.

1. After mirroring is created, the script restores your original network security settings (for private endpoints) or maintains the configured virtual network with added IP rules.

## Manual configuration

If you prefer manual configuration or need to understand the detailed steps, follow these configuration steps:

### Authenticate to Azure

Before beginning the configuration steps, connect to your Azure account:

1. Open PowerShell.

1. Run the following commands to authenticate and set your subscription context:

    ```powershell
    # Connect to Azure
    Connect-AzAccount
    
    # Set your subscription context
    Set-AzContext -Subscription "<subscriptionId>"
    ```

### Step 1: Configure RBAC permissions

Configure the required RBAC permissions for both the user setting up mirroring and the Fabric workspace:

#### Assign Cosmos DB data contributor permissions to the user

> [!IMPORTANT]
> The user must have Cosmos DB Data Contributor or higher permissions to configure mirroring. Without this role, the mirroring configuration will fail. To learn more, see [Cosmos DB Built-in Data Contributor](/azure/cosmos-db/nosql/reference-data-plane-security#cosmos-db-built-in-data-contributor).

To apply the required Data Contributor RBAC policy, use the provided script [assign-contibutor-rbac.ps1](https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-rbac-assign-contributor.ps1) to automate the user's identity role assignment.

To run these commands manually:

1. Get your principal ID.
    ```powershell
    $currentUser = Get-AzADUser -SignedIn
    $currentUser.Id
    ```

2. Apply the Data Contributor RBAC policy.
    ```powershell
    New-AzCosmosDBSqlRoleAssignment `
        -AccountName <accountName> `
        -ResourceGroupName <resourceGroupName> `
        -RoleDefinitionName "Cosmos DB Built-in Data Contributor" `
        -Scope "/" `
        -PrincipalId <principalId>
    ```

#### Assign Cosmos DB metadata and analytics reader permissions to the user

To apply the required mirroring RBAC policy, use the provided script [ps-account-rbac-mirroring.ps1](https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-rbac-mirroring.ps1) to automate the user's identity role assignment.

The script ensures the following data plane permissions are added:
    - `Microsoft.DocumentDB/databaseAccounts/readMetadata`
    - `Microsoft.DocumentDB/databaseAccounts/readAnalytics`  

To learn more about applying custom RBAC polices, refer to [Grant data plane role-base access](/azure/cosmos-db/nosql/how-to-connect-role-based-access-control?pivots=azure-cli#grant-data-plane-role-based-access).

### Step 2: Configure network access

Configure network access to allow Fabric services to connect to your Cosmos DB account.

> [!IMPORTANT]
> **For private endpoint users only:** Before adding IP addresses, you must temporarily enable public network access:
> 
> :::image type="content" source="./media/azure-cosmos-db-private-network/public-access-disabled.png" alt-text="Screenshot showing disabled public network access for private endpoints." lightbox="./media/azure-cosmos-db-private-network/public-access-disabled-full.png":::
> 
> 1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).
> 1. In the resource menu, select **Networking** under **Settings**.
> 1. Under **Public network access**, select **Selected networks**.
> 
> :::image type="content" source="./media/azure-cosmos-db-private-network/public-access-enabled-without-internet-protocols.png" alt-text="Screenshot showing enabled public network access set to selected networks." lightbox="./media/azure-cosmos-db-private-network/public-access-enabled-without-internet-protocols-full.png":::
> 
> After mirroring is configured, you can disable public access. See [Step 6](#step-6-disable-public-network-access-optional-for-private-endpoints).

#### Add Azure service IP addresses

Choose one of the following methods to allow Fabric service access:

**Option A: Manual IP Address Configuration (Recommended)**

We recommend manually adding all IPv4 address ranges from the Azure service tags as it doesn't rely on preview features.

:::image type="content" source="./media/azure-cosmos-db-private-network/public-access-enabled-with-internet-protocols.png" alt-text="Screenshot showing public network access with IP addresses added to firewall." lightbox="./media/azure-cosmos-db-private-network/public-access-enabled-with-internet-protocols-full.png":::

> [!NOTE]
> Azure firewall does not currently support IPv6. If you add an IPv6 address to a rule, the firewall fails. To learn more, visit [Azure Firewall known issues and limitations](/azure/firewall/firewall-known-issues#azure-firewall-premium-known-issues).

1. Download the latest Azure Service Tags JSON file from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519).

1. Extract IP address ranges for the following services in your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. In the Azure portal, navigate to your Azure Cosmos DB account.

1. In the resource menu, select **Networking** under **Settings**.

1. Under **Firewall**, add the IP address ranges you extracted.

    > [!IMPORTANT]
    > You must add all IPv4 address ranges for the DataFactory and PowerQueryOnline services. Adding only a subset of addresses may cause connectivity issues. The provided PowerShell script automates this process.

1. Ensure your existing network rules (virtual network rules or private endpoint connections) remain in place.

1. Select **Save** to apply your changes.

**Option B: Network Security Perimeter with Service Tags (Preview)**

Use Network Security Perimeter (NSP) to allow access using service tags, which automatically includes all IP addresses for the services without manual entry.

:::image type="content" source="./media/azure-cosmos-db-private-network/network-security-perimeter-inbound-access-rule.png" alt-text="Screenshot showing Network Security Perimeter configured with service tags." lightbox="./media/azure-cosmos-db-private-network/network-security-perimeter-inbound-access-rule-full.png":::

> [!NOTE]
> Network Security Perimeter is currently in preview for Cosmos DB. Some customers may prefer to use the manual IP address method due to preview limitations. For more information about Network Security Perimeter support for Azure Cosmos DB, see [Network Security Perimeter concepts](/azure/private-link/network-security-perimeter-concepts#onboarded-private-link-resources).

1. In the Azure portal, navigate to your Azure Cosmos DB account.

1. In the resource menu, select **Networking** under **Settings**.

1. Select **Network Security Perimeter** at the top of the page.

1. Create or select an existing Network Security Perimeter.

1. Add the following service tags to your inbound access rules for your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. Ensure your existing network rules (virtual network rules or private endpoint connections) remain in place.

1. Select **Save** to apply your changes.

> [!NOTE]
> This save operation can take 5-15 minutes to complete.

### Step 3: Enable Network ACL Bypass capability

Enable the Fabric Network ACL Bypass capability on your Cosmos DB account:

1. Open PowerShell.

1. Run the following commands to enable the capability:

    ```powershell
    $cosmos = Get-AzResource -ResourceGroupName <resourceGroup> -Name <accountName> -ResourceType "Microsoft.DocumentDB/databaseAccounts"
    $cosmos.Properties.capabilities += @{ name = "EnableFabricNetworkAclBypass" }
    $cosmos | Set-AzResource -UsePatchSemantics -Force
    ```

### Step 4: Configure workspace bypass

Authorize your Fabric workspace to bypass network ACLs:

> [!TIP]
> Use a shared workspace instead of My workspace. Workspace IDs are more readily available in shared workspaces.

1. Get your Fabric workspace ID from the Fabric portal:
    - Navigate to your workspace in [Fabric portal](https://app.fabric.microsoft.com/)
    - Look at the browser URL for a segment like `/groups/{GUID}/`.
    - That **GUID** is your **Workspace ID**.

    For example:

    `https://app.fabric.com/groups/d3d3d3d3-eeee-ffff-aaaa-b4b4b4b4b4b4/list?experience=fabric-developer`

    The **Workspace ID** in this example is `d3d3d3d3-eeee-ffff-aaaa-b4b4b4b4b4b4`.

    :::image type="content" source="./media/azure-cosmos-db-private-network/fabric-tenant-id.png" alt-text="Screenshot showing how to get Fabric tenant id.":::

1. Get your Fabric tenant ID.
    - Navigate to your [Fabric portal](https://app.fabric.microsoft.com/)
    - Click your avatar at the top right of the Fabric Portal
    - Hover over the information icon next to your tenant name

1. Run the following PowerShell command:
    ```powershell
    Update-AzCosmosDBAccount `
    -ResourceGroupName <CosmosDbResourceGroupName> `
    -Name <CosmosDbAccountName> `
    -NetworkAclBypass AzureServices `
    -NetworkAclBypassResourceId "/tenants/<FabricTenantId>/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/Fabric/providers/Microsoft.Fabric/workspaces/<FabricWorkspaceId>"
    ```

### Step 5: Create the mirrored database

Create your mirrored database in Fabric:

1. Navigate to the [Fabric portal](https://app.fabric.microsoft.com/).

1. Open the workspace you configured for bypass access.

1. In the navigation menu, select **Create**.

1. Locate the **Mirror data** section, and then select **Mirrored Azure Cosmos DB**.

1. Provide a name for the mirrored database and then select **Create**.

1. In the **New connection** section, select **Azure Cosmos DB v2**.

    :::image type="content" source="./media/azure-cosmos-db-private-network/mirror-artifact-connection-sign-in.png" alt-text="Screenshot showing a Cosmos DB mirroring configuration setup screen before OAuth authentication." lightbox="./media/azure-cosmos-db-private-network/mirror-artifact-connection-sign-in-full.png":::

1. Provide credentials for the Azure Cosmos DB for NoSQL account:

    | Account credentials | Value |
    | --- | --- |
    | **Azure Cosmos DB endpoint** | URL endpoint for the source account. |
    | **Connection name** | Unique name for the connection. |
    | **Authentication kind** | Select *Organizational account*. |
    | **Organizational account** | Access token from Microsoft Entra ID. |

    > [!NOTE]
    > Private network support for Cosmos DB mirroring is only available for OAuth-based authentication.

    :::image type="content" source="./media/azure-cosmos-db-private-network/mirror-artifact-connection-connect.png" alt-text="Screenshot showing a Cosmos DB mirroring configuration setup screen after OAuth authentication." lightbox="./media/azure-cosmos-db-private-network/mirror-artifact-connection-connect-full.png":::

1. Select **Connect**.

1. Select a database to mirror. Optionally, select specific containers to mirror.

1. Select **Connect** to start the mirroring process.

    :::image type="content" source="./media/azure-cosmos-db-private-network/mirror-artifact-running.png" alt-text="Screenshot showing a successfully running mirroring artifact with private endpoints enabled." lightbox="./media/azure-cosmos-db-private-network/mirror-artifact-running-full.png":::

1. Monitor replication to verify the connection is working properly.

### Step 6: Disable public network access (Optional for private endpoints)

After successfully creating the mirror and verifying replication, disable public network access to restore your private endpoint-only configuration. You can do this using either the Azure portal or PowerShell:

**Option A: Azure portal**

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. In the resource menu, select **Networking** under **Settings**.

1. Under **Public network access**, select **Disabled**.

1. Select **Save** to apply your changes.

**Option B: PowerShell**

1. Open PowerShell.

1. Run the following command:

    ```powershell
    Update-AzCosmosDBAccount `
        -ResourceGroupName <resourceGroup> `
        -Name <accountName> `
        -PublicNetworkAccess "Disabled"
    ```

> [!NOTE]
> This operation can take 5-15 minutes to complete.

After disabling public access, verify that mirroring continues to work. The Network ACL Bypass allows Fabric to access your account through the authorized workspace even with public access disabled.

## Verify the mirroring connection

:::image type="content" source="./media/azure-cosmos-db-private-network/mirror-artifact-running.png" alt-text="Screenshot showing a successfully running mirroring artifact with private endpoints enabled." lightbox="./media/azure-cosmos-db-private-network/mirror-artifact-running-full.png":::

After configuring your mirrored database, verify that the connection is working properly:

1. In your mirrored database, select **Monitor replication** to see the replication status.

1. After a few minutes, the status should change to *Running*, which indicates that the containers are being synchronized.

1. Verify that data is being replicated by checking the **last refresh** and **total rows** columns.

## Limitations and considerations

When using virtual networks or private endpoints with Azure Cosmos DB mirroring, be aware of these limitations:

- The user configuring private networks for Cosmos DB Mirroring must be an Azure subscription owner. To learn how to assign this role to a user, see [Assign a user as an administrator of an Azure subscription with conditions](/azure/role-based-access-control/role-assignments-portal-subscription-admin).
- Private network support for Cosmos DB mirroring is only available for OAuth-based authentication.
- When using Microsoft Entra ID authentication, ensure that the required RBAC permissions are configured. For more information, see [security limitations](azure-cosmos-db-limitations.md#security-limitations).
- The `EnableFabricNetworkAclBypass` capability must be enabled on your Cosmos DB account before configuring Network ACL Bypass.
- Network ACL Bypass configuration is workspace-specific. Each workspace that needs to access the Cosmos DB account must be authorized separately.
- You must add all IPv4 addresses for the DataFactory and PowerQueryOnline service tags in your region. Partial IP lists may cause connection failures.
- For private endpoint configurations, you must temporarily enable public access during the initial mirror setup. After mirroring is established, you can disable public access.
- For virtual network configurations, the endpoint rules must remain in place along with the added IP addresses.
- Configuring your public network access can take 5-15 minutes to complete.
- The target Fabric workspace region must be the same as the source Azure Cosmos DB Account region.

## Troubleshooting

If you experience issues connecting to your Azure Cosmos DB account:

1. **Verify Network ACL Bypass capability is enabled:**

    ```powershell
    $account = Get-AzCosmosDBAccount -ResourceGroupName <resourceGroup> -Name <accountName>
    $account.Capabilities.Name
    ```
    
    Confirm that `EnableFabricNetworkAclBypass` appears in the output. If there's no output, Network ACL Bypass capability has not been enabled.

1. **Check workspace bypass configuration:**

    ```powershell
    $account = Get-AzCosmosDBAccount -ResourceGroupName <resourceGroup> -Name <accountName>
    $account.NetworkAclBypassResourceIds
    ```

    Verify that the resource exists and has the correct tenant ID and workspace ID. If there's no output, Fabric workspace bypass has not been configured.

1. **Verify IP addresses are correct:**
    
    - Download the latest Azure Service Tags JSON file
    - Confirm you added all IPv4 ranges for DataFactory and PowerQueryOnline services in your region
    - Check that no IP addresses were entered incorrectly

1. **Review Azure Cosmos DB firewall settings:**
    
    - For virtual networks, ensure the endpoint rules are still in place
    - For private endpoints, only disable public access after mirror setup completes

1. **Check connection credentials:**
    
    - Account keys are not supported for mirroring with private networks. Ensure you are using Microsoft Entra ID authentication and verify the required permissions are assigned

1. **Check Fabric and Azure regions**

    - Verify both your Fabric workspace region and Azure Cosmos DB Account region are the same.

1. **Review monitoring logs:**
    
    - Check the mirroring replication status for any error messages

For more troubleshooting guidance, see [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-troubleshooting.yml).

## Related content

- [Mirroring Azure Cosmos DB](../mirroring/azure-cosmos-db.md)
- [Tutorial: Configure Microsoft Fabric mirrored database for Azure Cosmos DB](../mirroring/azure-cosmos-db-tutorial.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-limitations.md)
- [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519)
- [Configure network access to an Azure Cosmos DB account](/azure/cosmos-db/how-to-configure-firewall)
