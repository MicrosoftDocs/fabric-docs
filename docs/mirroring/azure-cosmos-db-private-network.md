---
title: "Configure Private Networks for Azure Cosmos DB Fabric Mirroring"
description: Learn how to configure Azure Cosmos DB accounts with private networks and private endpoints to work with Fabric mirroring.
author: jilmal
ms.author: jmaldonado
ms.reviewer: mbrown
ms.date: 12/16/2025
ms.topic: how-to
ai-usage: ai-assisted
---

# How to: Configure private networks for Microsoft Fabric mirrored databases from Azure Cosmos DB

This guide helps you configure Azure Cosmos DB accounts that use private networks or private endpoints to work with Microsoft Fabric mirroring. You can mirror data from Azure Cosmos DB accounts configured with virtual network (VNET) service endpoints or private endpoints, while maintaining enhanced network security.

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account configured with continuous backup and either virtual network service endpoints or private endpoints already configured.
  - If you don't have an Azure subscription, [Try Azure Cosmos DB for NoSQL free](https://cosmos.azure.com/try/).
  - If you have an existing Azure subscription, [create a new Azure Cosmos DB for NoSQL account](/azure/cosmos-db/nosql/quickstart-portal).
- An existing Fabric capacity. If you don't have an existing capacity, [start a Fabric trial](../fundamentals/fabric-trial.md).
- The Azure Cosmos DB for NoSQL account must be configured for Fabric mirroring. For more information, see [account requirements](azure-cosmos-db-limitations.md#account-and-database-limitations).
- PowerShell with Azure PowerShell modules (`Az.Accounts`, `Az.CosmosDB`, `Az.Network`) installed.
- The user configuring mirroring must have **Cosmos DB Account Contributor** or higher permissions on the Azure Cosmos DB account.
- The target Fabric workspace region must match the Azure Cosmos DB Account region.

## Overview of network configuration options

Azure Cosmos DB supports two primary network security configurations for mirroring:

- **Virtual network service endpoints**: Restrict access to your Azure Cosmos DB account to specific virtual network subnets. With this configuration, you maintain "Selected networks" access and add the necessary Azure service IP addresses.
- **Private endpoints**: Provide a private IP address from your virtual network to your Azure Cosmos DB account, keeping all traffic on the Microsoft backbone network. With this configuration, public access is disabled and you must temporarily enable it during mirror setup.

Both configurations use the **Network ACL Bypass** feature to allow Fabric to access your Cosmos DB account by authorizing specific Fabric workspace IDs.

## Quick start: Automated configuration with PowerShell

For a streamlined setup experience, use the provided PowerShell script that automates all configuration steps. The script performs the following actions:

1. **Configures RBAC permissions** - Creates a custom role with required read permissions for Fabric mirroring and assigns it to your Fabric workspace identity.
1. **Sets up IP firewall rules** - Applies the latest Azure service tags (DataFactory and PowerQueryOnline) for your region.
1. **Enables Network ACL Bypass capability** - Activates the `EnableFabricNetworkAclBypass` feature on your Cosmos DB account.
1. **Configures workspace bypass** - Authorizes your Fabric workspace ID to bypass network restrictions.
1. **For private endpoint configurations only** - Temporarily enables public access during mirror creation, then disables it after mirroring is established.

### Run the automated script

1. Download the PowerShell script `ps-account-setup-cosmos-pe-mirroring.ps1` found in our (Azure Cosmos DB Samples repo)[https://github.com/Azure-Samples/azure-docs-powershell-samples/blob/main/azure-cosmosdb/common/ps-account-setup-cosmos-pe-mirroring.ps1]. 

1. Open PowerShell as Administrator and run:

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

1. After mirroring is created, the script restores your original network security settings (for private endpoints) or maintains the configured service endpoints with added IP rules.

## Manual configuration

If you prefer manual configuration or need to understand the detailed steps, select your network configuration type:

# [Virtual network service endpoints](#tab/vnet)

### Step 1: Configure RBAC permissions

Configure the required RBAC permissions for both the user setting up mirroring and the Fabric workspace:

#### Assign permissions to the user

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. In the resource menu, select **Access control (IAM)**.

1. Select **+ Add** and choose **Add role assignment**.

1. Select the **Cosmos DB Account Contributor** role and assign it to the user who will configure mirroring.

    > [!IMPORTANT]
    > The user must have Cosmos DB Account Contributor or higher permissions to configure mirroring. Without this role, the mirroring configuration will fail.

#### Assign permissions to the Fabric workspace

1. In the same **Access control (IAM)** section, create a custom role with the following permissions:
    - `Microsoft.DocumentDB/databaseAccounts/readMetadata`
    - `Microsoft.DocumentDB/databaseAccounts/readAnalytics`

1. Assign this custom role to your Fabric workspace identity at the Cosmos DB account scope.

    > [!NOTE]
    > You can also use the provided script `rbac-cosmos-mirror.sh` from [azure-samples/azure-cli-samples](https://github.com/Azure-Samples/azure-cli-samples/blob/master/cosmosdb/common/rbac-cosmos-mirror.sh) to automate the workspace identity role assignment.

### Step 2: Add Azure service IP addresses

Add the required Azure service IP addresses to allow Fabric services to access your Cosmos DB account. You can use either of two approaches:

**Option A: Network Security Perimeter with Service Tags (Preview)**

Use Network Security Perimeter (NSP) to allow access using service tags, which automatically includes all IP addresses for the services without manual entry.

> [!NOTE]
> Network Security Perimeter is currently in preview for Cosmos DB. Some customers may prefer to use the manual IP address method due to preview limitations. For more information about Network Security Perimeter support for Azure Cosmos DB, see [Network Security Perimeter concepts](/azure/private-link/network-security-perimeter-concepts#onboarded-private-link-resources).

1. In the Azure portal, navigate to your Azure Cosmos DB account.

1. In the resource menu, select **Networking** under **Settings**.

1. Select **Network Security Perimeter** at the top of the page.

1. Create or select an existing Network Security Perimeter.

1. Add the following service tags for your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. Ensure your existing virtual network rules remain in place.

1. Select **Save** to apply your changes.

**Option B: Manual IP Address Configuration**

Manually add all IP address ranges from the Azure service tags. This approach requires adding many individual IP addresses but doesn't rely on preview features.

1. Download the latest Azure Service Tags JSON file from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519).

1. Extract IP address ranges for the following services in your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. In the Azure portal, navigate to your Azure Cosmos DB account.

1. In the resource menu, select **Networking** under **Settings**.

1. Under **Firewall**, add all the IP address ranges you extracted.

    > [!IMPORTANT]
    > You must add all IP address ranges for the DataFactory and PowerQueryOnline services. Adding only a subset of addresses may cause connectivity issues. The provided PowerShell script automates this process.

1. Ensure your existing virtual network rules remain in place.

1. Select **Save** to apply your changes.

### Step 3: Enable Network ACL Bypass capability

Enable the Fabric Network ACL Bypass capability on your Cosmos DB account:

1. Open PowerShell.

1. Run the following commands to enable the capability:

    ```powershell
    $cosmos = Get-AzResource -ResourceGroupName <resourceGroup> -Name <accountName> -ResourceType "Microsoft.DocumentDB/databaseAccounts"
    $cosmos.Properties.capabilities += @{ name = "EnableFabricNetworkAclBypass" }
    $cosmos | Set-AzResource -UsePatchSemantics -Force
    ```

    > [!NOTE]
    > This operation can take 5-15 minutes to complete.

### Step 4: Configure workspace bypass

Authorize your Fabric workspace to bypass network ACLs:

1. Get your Fabric workspace ID from the Fabric portal:
    - Navigate to your workspace in [Fabric portal](https://fabric.microsoft.com/)
    - Select **Workspace settings**
    - Copy the workspace ID from the URL or settings page

1. Get your Fabric tenant ID.

1. Run the following PowerShell command:

    ```powershell
    $resourceId = "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroup>/providers/Microsoft.DocumentDB/databaseAccounts/<accountName>/networkAclBypassResourceIds/fabric-<workspaceName>"
    
    $properties = @{
        tenantId = "<tenantId>"
        resourceId = "<workspaceId>"
    }
    
    New-AzResource -ResourceId $resourceId -Properties $properties -ApiVersion "2024-11-15" -Force
    ```

### Step 5: Create the mirrored database

Create your mirrored database in Fabric:

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/) home.

1. Open the workspace you configured for bypass access.

1. In the navigation menu, select **Create**.

1. Locate the **Data Warehouse** section, and then select **Mirrored Azure Cosmos DB**.

1. Provide a name for the mirrored database and then select **Create**.

1. In the **New connection** section, select **Azure Cosmos DB for NoSQL**.

1. Provide credentials for the Azure Cosmos DB for NoSQL account:

    | Account credentials | Value |
    | --- | --- |
    | **Azure Cosmos DB endpoint** | URL endpoint for the source account. |
    | **Connection name** | Unique name for the connection. |
    | **Authentication kind** | Select *Account key* or *Organizational account*. |
    | **Account Key** | Read-write key for the source account. |
    | **Organizational account** | Access token from Microsoft Entra ID. |

    > [!NOTE]
    > No data gateway is required when using Network ACL Bypass.

1. Select **Connect**.

1. Select a database to mirror. Optionally, select specific containers to mirror.

1. Select **Mirror database** to start the mirroring process.

1. Monitor replication to verify the connection is working properly.

# [Private endpoints](#tab/private-endpoint)

### Step 1: Configure RBAC permissions

Configure the required RBAC permissions for both the user setting up mirroring and the Fabric workspace:

#### Assign permissions to the user

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. In the resource menu, select **Access control (IAM)**.

1. Select **+ Add** and choose **Add role assignment**.

1. Select the **Cosmos DB Account Contributor** role and assign it to the user who will configure mirroring.

    > [!IMPORTANT]
    > The user must have Cosmos DB Account Contributor or higher permissions to configure mirroring. Without this role, the mirroring configuration will fail.

#### Assign permissions to the Fabric workspace

1. In the same **Access control (IAM)** section, create a custom role with the following permissions:
    - `Microsoft.DocumentDB/databaseAccounts/readMetadata`
    - `Microsoft.DocumentDB/databaseAccounts/readAnalytics`

1. Assign this custom role to your Fabric workspace identity at the Cosmos DB account scope.

    > [!NOTE]
    > You can also use the provided script `rbac-cosmos-mirror.sh` from [azure-samples/azure-cli-samples](https://github.com/Azure-Samples/azure-cli-samples/blob/master/cosmosdb/common/rbac-cosmos-mirror.sh) to automate the workspace identity role assignment.

### Step 2: Temporarily enable public network access

To create the initial mirror connection, you must temporarily enable public access. You can use either of two approaches to configure the necessary service access:

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. In the resource menu, select **Networking** under **Settings**.

1. Under **Public network access**, select **Selected networks**.

1. Choose one of the following methods to allow Fabric service access:

**Option A: Network Security Perimeter with Service Tags (Preview - Recommended for simplicity)**

Use Network Security Perimeter (NSP) to allow access using service tags, which automatically includes all IP addresses for the services without manual entry.

> [!NOTE]
> Network Security Perimeter is currently in preview. Some customers may prefer to use the manual IP address method due to preview limitations. For more information about Network Security Perimeter support for Azure Cosmos DB, see [Network Security Perimeter concepts](/azure/private-link/network-security-perimeter-concepts#onboarded-private-link-resources).

1. Select **Network Security Perimeter** at the top of the page.

1. Create or select an existing Network Security Perimeter.

1. Add the following service tags for your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. Select **Save** to apply your changes.

**Option B: Manual IP Address Configuration**

Manually add all IP address ranges from the Azure service tags. This approach requires adding many individual IP addresses but doesn't rely on preview features.

1. Download the latest Azure Service Tags JSON file from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519).

1. Extract IP address ranges for the following services in your Fabric capacity region:
    - `DataFactory.<region>` - For example, `DataFactory.WestUS3`
    - `PowerQueryOnline.<region>` - For example, `PowerQueryOnline.WestUS3`

1. Under **Firewall**, add all the IP address ranges you extracted.

    > [!IMPORTANT]
    > You must add all IP address ranges for the DataFactory and PowerQueryOnline services. Adding only a subset of addresses may cause connectivity issues. The provided PowerShell script automates this process.

1. Select **Save** to apply your changes.

### Step 3: Enable Network ACL Bypass capability

Enable the Fabric Network ACL Bypass capability on your Cosmos DB account:

1. Open PowerShell.

1. Run the following commands to enable the capability:

    ```powershell
    $cosmos = Get-AzResource -ResourceGroupName <resourceGroup> -Name <accountName> -ResourceType "Microsoft.DocumentDB/databaseAccounts"
    $cosmos.Properties.capabilities += @{ name = "EnableFabricNetworkAclBypass" }
    $cosmos | Set-AzResource -UsePatchSemantics -Force
    ```

    > [!NOTE]
    > This operation can take 5-15 minutes to complete.

### Step 4: Configure workspace bypass

Authorize your Fabric workspace to bypass network ACLs:

1. Get your Fabric workspace ID from the Fabric portal:
    - Navigate to your workspace in [Fabric portal](https://fabric.microsoft.com/)
    - Select **Workspace settings**
    - Copy the workspace ID from the URL or settings page

1. Get your Fabric tenant ID.

1. Run the following PowerShell commands:

    ```powershell
    $resourceId = "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroup>/providers/Microsoft.DocumentDB/databaseAccounts/<accountName>/networkAclBypassResourceIds/fabric-<workspaceName>"
    
    $properties = @{
        tenantId = "<tenantId>"
        resourceId = "<workspaceId>"
    }
    
    New-AzResource -ResourceId $resourceId -Properties $properties -ApiVersion "2024-11-15" -Force
    ```

### Step 5: Create the mirrored database

Create your mirrored database in Fabric:

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/) home.

1. Open the workspace you configured for bypass access.

1. In the navigation menu, select **Create**.

1. Locate the **Data Warehouse** section, and then select **Mirrored Azure Cosmos DB**.

1. Provide a name for the mirrored database and then select **Create**.

1. In the **New connection** section, select **Azure Cosmos DB for NoSQL**.

1. Provide credentials for the Azure Cosmos DB for NoSQL account:

    | Account credentials | Value |
    | --- | --- |
    | **Azure Cosmos DB endpoint** | URL endpoint for the source account. |
    | **Connection name** | Unique name for the connection. |
    | **Authentication kind** | Select *Account key* or *Organizational account*. |
    | **Account Key** | Read-write key for the source account. |
    | **Organizational account** | Access token from Microsoft Entra ID. |

1. Select **Connect**.

1. Select a database to mirror. Optionally, select specific containers to mirror.

1. Select **Mirror database** to start the mirroring process.

1. Monitor replication to verify the connection is working properly.

### Step 6: Disable public network access

After successfully creating the mirror and verifying replication, disable public network access to restore your private endpoint-only configuration:

1. Open PowerShell.

1. Run the following command:

    ```powershell
    Update-AzCosmosDBAccount `
        -ResourceGroupName <resourceGroup> `
        -Name <accountName> `
        -PublicNetworkAccess "Disabled"
    ```

1. Verify that mirroring continues to work. The Network ACL Bypass allows Fabric to access your account through the authorized workspace even with public access disabled.

---

## Verify the mirroring connection

After configuring your mirrored database, verify that the connection is working properly:

1. In your mirrored database, select **Monitor replication** to see the replication status.

1. After a few minutes, the status should change to *Running*, which indicates that the containers are being synchronized.

1. Verify that data is being replicated by checking the **last refresh** and **total rows** columns.

## Limitations and considerations

When using private networks or private endpoints with Azure Cosmos DB mirroring, be aware of these limitations:

- The `EnableFabricNetworkAclBypass` capability must be enabled on your Cosmos DB account before configuring Network ACL Bypass.
- You must add all IP addresses for the DataFactory and PowerQueryOnline service tags in your region. Partial IP lists may cause connection failures.
- The `az cosmosdb update` command to enable the bypass capability can take 5-15 minutes to complete.
- For private endpoint configurations, you must temporarily enable public access during the initial mirror setup. After mirroring is established, you can disable public access.
- For virtual network service endpoint configurations, the service endpoint rules must remain in place along with the added IP addresses.
- Network ACL Bypass configuration is workspace-specific. Each workspace that needs to access the Cosmos DB account must be authorized separately.
- When using Microsoft Entra ID authentication, ensure that the required RBAC permissions are configured. For more information, see [security limitations](azure-cosmos-db-limitations.md#security-limitations).

## Troubleshooting

If you experience issues connecting to your Azure Cosmos DB account:

1. **Verify Network ACL Bypass capability is enabled:**
    ```azurecli
    az cosmosdb show --resource-group <resourceGroup> --name <accountName> --query "capabilities[].name" -o tsv
    ```
    
    Confirm that `EnableFabricNetworkAclBypass` appears in the output.

1. **Check workspace bypass configuration:**
    ```powershell
    Get-AzResource -ResourceId "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroup>/providers/Microsoft.DocumentDB/databaseAccounts/<accountName>/networkAclBypassResourceIds/fabric-<workspaceName>"
    ```
    
    Verify that the resource exists and has the correct tenant ID and workspace ID.

1. **Verify IP addresses are correct:**
    - Download the latest Azure Service Tags JSON file
    - Confirm you added all IP ranges for DataFactory and PowerQueryOnline services in your region
    - Check that no IP addresses were entered incorrectly

1. **Review Azure Cosmos DB firewall settings:**
    - For service endpoints, ensure the virtual network rules are still in place
    - For private endpoints, only disable public access after mirror setup completes

1. **Check connection credentials:**
    - Ensure that the account key hasn't been rotated since the connection was created
    - For Microsoft Entra ID authentication, verify that the required permissions are assigned

1. **Review monitoring logs:**
    - Check the mirroring replication status for any error messages

For more troubleshooting guidance, see [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-troubleshooting.yml).

## Related content

- [Mirroring Azure Cosmos DB](../mirroring/azure-cosmos-db.md)
- [Tutorial: Configure Microsoft Fabric mirrored database for Azure Cosmos DB](../mirroring/azure-cosmos-db-tutorial.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-limitations.md)
- [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519)
- [Configure network access to an Azure Cosmos DB account](/azure/cosmos-db/how-to-configure-firewall)
