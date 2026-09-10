---
title: "Configure Private Networks for Azure Cosmos DB Fabric Mirroring"
description: Learn how to mirror an Azure Cosmos DB for NoSQL account into Fabric over a private network by using a virtual network data gateway.
ms.reviewer: jmaldonado, mbrown
ms.date: 08/10/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# How to: Configure private networks for Azure Cosmos DB Fabric Mirroring

This guide shows you how to mirror an Azure Cosmos DB for NoSQL account into Microsoft Fabric when the account has public network access disabled and is reachable only over a private endpoint or virtual network. Instead of maintaining large DataFactory and Power Query Online IP allow lists, you use a Fabric virtual network data gateway that runs inside your virtual network, together with a trusted-workspace network ACL bypass.

You perform most steps in the [Azure portal](https://portal.azure.com) and the [Fabric portal](https://app.fabric.microsoft.com). Three Azure Cosmos DB account settings don't have a portal control, so this guide provides Azure CLI and Azure PowerShell commands for them.

> [!IMPORTANT]
> The mirroring interface can't use a virtual network data gateway connection. The **New mirrored Azure Cosmos DB** experience only offers cloud connections, so the gateway connection that you create in [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection) isn't selectable there. As a result, you must create a private-network mirrored database by using the Fabric REST API, as described in [Step 8](#step-8-create-the-mirrored-database-with-the-fabric-rest-api). This behavior is a current product gap in Fabric mirroring, not a configuration error.

## Why this approach

Fabric needs two kinds of access to mirror an Azure Cosmos DB account that's locked down to a private network:

- **Control plane** (metadata reads during setup) is handled by the trusted-workspace network ACL bypass that you configure in steps 3 through 5.
- **Data plane** (replication) is handled by the virtual network data gateway that runs inside your virtual network, which you configure in steps 6 through 8.

Because the gateway reaches Azure Cosmos DB privately, you don't add or maintain Fabric's service-tag IP ranges, and your account's public network access stays disabled the whole time.

### Choose how the gateway subnet reaches Azure Cosmos DB

This approach removes the DataFactory and Power Query Online IP allow lists entirely. Only the way the gateway subnet reaches your account differs, based on how you configure private connectivity:

| Azure Cosmos DB network configuration | Public network access | How the gateway subnet is permitted |
| --- | --- | --- |
| **Private endpoint** (validated in this guide) | Disabled | The gateway subnet resolves the account to its private endpoint through private DNS. |
| **Virtual network service endpoints** | Enabled with **Selected networks** | Enable the `Microsoft.AzureCosmosDB` service endpoint on the gateway's delegated subnet, and then add that subnet as a virtual network rule on the account. |

In both cases, you allow your own subnet or private endpoint, never Fabric's service-tag ranges. The remaining steps are identical.

> [!NOTE]
> This guide is written and validated for the private endpoint configuration with public network access disabled. The virtual network service endpoint variant uses the same mechanism, but it isn't separately validated end to end.

## Prerequisites

- An Azure Cosmos DB for NoSQL account that's configured for Fabric mirroring, including:
  - Continuous backup with 7-day or 30-day retention.
  - Microsoft Entra ID authentication enabled and local authentication (account keys) disabled.
  - Public network access set to **Disabled** behind an approved private endpoint.
- A Fabric workspace on a Fabric capacity, in the same Azure region as the Azure Cosmos DB account. Use a shared workspace instead of **My workspace**, because workspace IDs are more readily available in shared workspaces.
- The `Microsoft.PowerPlatform` resource provider registered on your subscription. See [Register the Microsoft.PowerPlatform resource provider](#register-the-microsoftpowerplatform-resource-provider).
- Permissions to complete the configuration:
  - You must be an Azure subscription owner to authorize the trusted Fabric workspace.
  - You must be an Admin in the target Fabric workspace.

> [!TIP]
> Get your Fabric workspace ID before you start. Open the workspace in the [Fabric portal](https://app.fabric.microsoft.com), and copy the GUID from the URL segment `/groups/{workspace-id}/`. You enter it in [Step 1](#step-1-sign-in-and-define-your-variables).

> [!NOTE]
> [Step 1](#step-1-sign-in-and-define-your-variables) defines shell variables, such as `RESOURCE_GROUP`, `COSMOS_ACCOUNT`, and `FABRIC_WORKSPACE_ID`, that the later steps reuse. Run the whole walkthrough in the same terminal session. If you close the session, rerun Step 1 to redefine the variables.

### Register the Microsoft.PowerPlatform resource provider

When you register this provider, the virtual network data gateway can create its link into your virtual network.

To register the provider in the Azure portal:

1. Open your subscription, and then select **Settings** > **Resource providers**.
1. Search for `Microsoft.PowerPlatform`, select it, and then select **Register**. Skip this step if the provider already shows **Registered**.

:::image type="content" source="./media/azure-cosmos-db-private-network/register-power-platform-resource-provider.png" alt-text="Screenshot of the subscription Resource providers page with the Microsoft.PowerPlatform provider registered." lightbox="./media/azure-cosmos-db-private-network/register-power-platform-resource-provider.png":::

Alternatively, register the provider by using the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az account set --subscription "<subscriptionId>"
az provider register --namespace Microsoft.PowerPlatform

# Verify. Repeat until the command returns "Registered", because registration is asynchronous.
az provider show --namespace Microsoft.PowerPlatform --query registrationState -o tsv
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Set-AzContext -Subscription "<subscriptionId>"
Register-AzResourceProvider -ProviderNamespace Microsoft.PowerPlatform

# Verify. Repeat until the command returns "Registered", because registration is asynchronous.
(Get-AzResourceProvider -ProviderNamespace Microsoft.PowerPlatform).RegistrationState
```

---

## Prepare the Azure Cosmos DB account and network

Complete the following steps to sign in, define your variables, create the gateway subnet, and configure the Azure Cosmos DB account for trusted access.

### Step 1: Sign in and define your variables

Sign in to Azure and define the values that the commands in this article reuse. Run these commands once in the terminal that you keep open for the whole walkthrough. The later steps reference these variables, so you don't reenter the values. The commands capture your principal ID and tenant ID for you.

# [Azure CLI](#tab/azure-cli)

```azurecli
# Sign in and set your subscription context.
az login
az account set --subscription "<subscriptionId>"

# Values you provide.
RESOURCE_GROUP="<resource-group-name>"        # Resource group of the Azure Cosmos DB account
COSMOS_ACCOUNT="<account-name>"               # Azure Cosmos DB account name
COSMOS_DATABASE="<cosmos-mirror-database>"    # Database to mirror
FABRIC_WORKSPACE_ID="<fabric-workspace-id>"   # GUID from the Fabric workspace URL
MIRROR_NAME="<env>-mirror"                    # Name for the mirrored database

# Values derived and captured for you.
COSMOS_ENDPOINT="${COSMOS_ACCOUNT}.documents.azure.com"
PRINCIPAL_ID=$(az ad signed-in-user show --query id -o tsv)
TENANT_ID=$(az account show --query tenantId -o tsv)
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
# Sign in and set your subscription context.
Connect-AzAccount
Set-AzContext -Subscription "<subscriptionId>"

# Values you provide.
$RESOURCE_GROUP      = "<resource-group-name>"     # Resource group of the Azure Cosmos DB account
$COSMOS_ACCOUNT      = "<account-name>"            # Azure Cosmos DB account name
$COSMOS_DATABASE     = "<cosmos-mirror-database>"  # Database to mirror
$FABRIC_WORKSPACE_ID = "<fabric-workspace-id>"     # GUID from the Fabric workspace URL
$MIRROR_NAME         = "<env>-mirror"              # Name for the mirrored database

# Values derived and captured for you.
$COSMOS_ENDPOINT = "$COSMOS_ACCOUNT.documents.azure.com"
$PRINCIPAL_ID    = (Get-AzADUser -SignedIn).Id
$TENANT_ID       = (Get-AzContext).Tenant.Id
```

---

### Step 2: Create the delegated gateway subnet

A standard private-link Azure Cosmos DB deployment includes only your web app and private endpoint subnets. It doesn't include a gateway subnet. The virtual network data gateway needs its own dedicated, delegated subnet.

Your account is reachable through an approved private endpoint, with public network access disabled. This configuration is the starting point.

:::image type="content" source="./media/azure-cosmos-db-private-network/cosmos-networking-public-access-disabled.png" alt-text="Screenshot of the Azure Cosmos DB Networking page with public network access set to Disabled." lightbox="./media/azure-cosmos-db-private-network/cosmos-networking-public-access-disabled.png":::

:::image type="content" source="./media/azure-cosmos-db-private-network/cosmos-networking-private-endpoint.png" alt-text="Screenshot of the Azure Cosmos DB Networking page showing the approved private endpoint under Private access." lightbox="./media/azure-cosmos-db-private-network/cosmos-networking-private-endpoint.png":::

1. From the Azure Cosmos DB account, select **Networking** > **Private access**, open the private endpoint, and then open its virtual network. You can also go directly to the virtual network.

1. Select **Subnets** > **+ Subnet**.

    :::image type="content" source="./media/azure-cosmos-db-private-network/virtual-network-add-subnet.png" alt-text="Screenshot of the virtual network Subnets page with the Add subnet button highlighted." lightbox="./media/azure-cosmos-db-private-network/virtual-network-add-subnet.png":::

1. Configure the subnet with the following settings:

    | Setting | Value | Notes |
    | --- | --- | --- |
    | **Name** | `snet-fabric` | Use any name that's dedicated to the gateway. |
    | **Size or address range** | `/27` (32 addresses) | The minimum size is `/27`. A smaller range is rejected. The range must not overlap other subnets. |
    | **Enable private subnet (no default outbound access)** | Cleared | Leave this option cleared so the subnet keeps default outbound access to Microsoft Entra ID, which the OAuth sign-in in [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection) requires. |
    | **Subnet delegation** | `Microsoft.PowerPlatform/vnetaccesslinks` | Required. This delegation makes the subnet a gateway subnet. |
    | **Private endpoint network policies** | Disabled | Recommended. |

    :::image type="content" source="./media/azure-cosmos-db-private-network/add-subnet-address-range.png" alt-text="Screenshot of the Add subnet pane showing a slash 27 address range with the private subnet option cleared." lightbox="./media/azure-cosmos-db-private-network/add-subnet-address-range.png":::

    Under **Subnet delegation**, select `Microsoft.PowerPlatform/vnetaccesslinks`.

    :::image type="content" source="./media/azure-cosmos-db-private-network/add-subnet-delegation-power-platform.png" alt-text="Screenshot of the Add subnet pane with subnet delegation set to Microsoft.PowerPlatform/vnetaccesslinks." lightbox="./media/azure-cosmos-db-private-network/add-subnet-delegation-power-platform.png":::

1. Select **Add**.

The subnet must be dedicated, with no other resources. It must have line of sight to Azure Cosmos DB, either in the same virtual network as the private endpoint or in a peered virtual network with routing, and it must resolve the account's private DNS zone, `privatelink.documents.azure.com`.

> [!NOTE]
> The virtual network data gateway must reach Microsoft Entra ID (`login.microsoftonline.com`) to complete the OAuth sign-in in [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection). Leaving **Enable private subnet (no default outbound access)** cleared keeps the default outbound access that the gateway needs. After March 31, 2026, default outbound access is retired, so attach a NAT gateway to the subnet. For more information, see [Gateway OAuth invalid token error](#gateway-oauth-invalid-token-error).

### Step 3: Grant Azure Cosmos DB data-plane permissions

Grant the identity that creates the Fabric connection, which is typically you, the metadata and analytics read actions that Fabric mirroring needs, plus the built-in Data Contributor role. Azure Cosmos DB data-plane role-based access control (RBAC) doesn't have a portal control, so use the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az cosmosdb sql role definition create -a "$COSMOS_ACCOUNT" -g "$RESOURCE_GROUP" --body '{
  "RoleName": "Fabric Mirroring Metadata Reader",
  "Type": "CustomRole",
  "AssignableScopes": ["/"],
  "Permissions": [{ "DataActions": [
    "Microsoft.DocumentDB/databaseAccounts/readMetadata",
    "Microsoft.DocumentDB/databaseAccounts/readAnalytics"
  ]}]
}'
ROLE_ID=$(az cosmosdb sql role definition list -a "$COSMOS_ACCOUNT" -g "$RESOURCE_GROUP" \
  --query "[?roleName=='Fabric Mirroring Metadata Reader'].id | [0]" -o tsv)
az cosmosdb sql role assignment create -a "$COSMOS_ACCOUNT" -g "$RESOURCE_GROUP" --scope "/" \
  --principal-id "$PRINCIPAL_ID" --role-definition-id "$ROLE_ID"
az cosmosdb sql role assignment create -a "$COSMOS_ACCOUNT" -g "$RESOURCE_GROUP" --scope "/" \
  --principal-id "$PRINCIPAL_ID" --role-definition-id 00000000-0000-0000-0000-000000000002
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
New-AzCosmosDBSqlRoleDefinition -AccountName $COSMOS_ACCOUNT -ResourceGroupName $RESOURCE_GROUP `
  -Type CustomRole -RoleName "Fabric Mirroring Metadata Reader" -AssignableScope "/" `
  -DataAction @(
    'Microsoft.DocumentDB/databaseAccounts/readMetadata',
    'Microsoft.DocumentDB/databaseAccounts/readAnalytics')
$roleId = (Get-AzCosmosDBSqlRoleDefinition -AccountName $COSMOS_ACCOUNT -ResourceGroupName $RESOURCE_GROUP |
  Where-Object RoleName -eq "Fabric Mirroring Metadata Reader").Id
New-AzCosmosDBSqlRoleAssignment -AccountName $COSMOS_ACCOUNT -ResourceGroupName $RESOURCE_GROUP -Scope "/" `
  -PrincipalId $PRINCIPAL_ID -RoleDefinitionId $roleId
New-AzCosmosDBSqlRoleAssignment -AccountName $COSMOS_ACCOUNT -ResourceGroupName $RESOURCE_GROUP -Scope "/" `
  -PrincipalId $PRINCIPAL_ID -RoleDefinitionName "Cosmos DB Built-in Data Contributor"
```

---

To learn more about applying custom RBAC policies, see [Grant data plane role-based access](/azure/cosmos-db/nosql/how-to-connect-role-based-access-control?pivots=azure-cli#grant-data-plane-role-based-access).

### Step 4: Add the Fabric network ACL bypass capability

The `EnableFabricNetworkAclBypass` capability lets an authorized Fabric workspace bypass the account's network ACLs. This capability doesn't have a portal control, so add it by using the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az cosmosdb update -g "$RESOURCE_GROUP" -n "$COSMOS_ACCOUNT" --capabilities EnableFabricNetworkAclBypass

# Verify.
az cosmosdb show -g "$RESOURCE_GROUP" -n "$COSMOS_ACCOUNT" --query "capabilities[].name" -o tsv
```

> [!IMPORTANT]
> The `--capabilities` flag replaces the entire capability set. If the account already has other capabilities, list all of them in the same command.

# [Azure PowerShell](#tab/azure-powershell)

The following commands preserve existing capabilities:

```azurepowershell
$cosmosAccountResource = Get-AzResource -ResourceGroupName $RESOURCE_GROUP -Name $COSMOS_ACCOUNT -ResourceType "Microsoft.DocumentDB/databaseAccounts"
if ($cosmosAccountResource.Properties.capabilities.name -notcontains "EnableFabricNetworkAclBypass") {
    $cosmosAccountResource.Properties.capabilities += @{ name = "EnableFabricNetworkAclBypass" }
    $cosmosAccountResource | Set-AzResource -UsePatchSemantics -Force
}

# Verify.
(Get-AzResource -ResourceGroupName $RESOURCE_GROUP -Name $COSMOS_ACCOUNT `
  -ResourceType "Microsoft.DocumentDB/databaseAccounts").Properties.capabilities.name
```

---

### Step 5: Authorize the trusted Fabric workspace

Authorize your Fabric workspace ID as a trusted resource so that it can reach the account through the network ACL bypass. This setting doesn't have a portal control, so use the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az cosmosdb update -g "$RESOURCE_GROUP" -n "$COSMOS_ACCOUNT" --network-acl-bypass AzureServices \
  --network-acl-bypass-resource-ids \
  "/tenants/$TENANT_ID/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/Fabric/providers/Microsoft.Fabric/workspaces/$FABRIC_WORKSPACE_ID"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Update-AzCosmosDBAccount -ResourceGroupName $RESOURCE_GROUP -Name $COSMOS_ACCOUNT -NetworkAclBypass AzureServices `
  -NetworkAclBypassResourceId "/tenants/$TENANT_ID/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/Fabric/providers/Microsoft.Fabric/workspaces/$FABRIC_WORKSPACE_ID"
```

---

> [!NOTE]
> Azure also surfaces steps 3 through 5 in the account's **Mirroring in Fabric** page, under **Apply RBAC policies** and **Configure private networks**, as the same commands.

## Configure the gateway, connection, and mirror

Complete the following steps in the Fabric portal to create the gateway and connection, and then create the mirrored database by using the Fabric REST API.

### Step 6: Create the virtual network data gateway

1. In the [Fabric portal](https://app.fabric.microsoft.com), select the **Settings** gear, and then select **Manage connections and gateways**.

1. Select the **Virtual network data gateways** tab, and then select **+ New**.

1. Select the following information:
    - **License capacity**: your active Fabric capacity.
    - **Azure subscription**: your subscription.
    - **Resource group**: your resource group.
    - **Virtual network**: your virtual network.
    - **Subnet**: `snet-fabric` from [Step 2](#step-2-create-the-delegated-gateway-subnet).
    - **Name**: a name for the gateway.
    - **Inactivity time before hibernation**: an inactivity timeout, under **Advanced options**.

    :::image type="content" source="./media/azure-cosmos-db-private-network/fabric-new-virtual-network-data-gateway.png" alt-text="Screenshot of the Fabric New virtual network data gateway dialog box." lightbox="./media/azure-cosmos-db-private-network/fabric-new-virtual-network-data-gateway.png":::

1. Select **Save**. Fabric provisions the gateway inside your virtual network, in the same region.

### Step 7: Create the Azure Cosmos DB v2 connection

1. In **Manage connections and gateways**, select **Connections** > **+ New**.

1. For the connectivity type, select **Virtual network**.

1. For **Gateway cluster name**, select the virtual network data gateway that you created in [Step 6](#step-6-create-the-virtual-network-data-gateway).

1. For **Connection name**, enter a name.

1. For **Connection type**, select **Azure Cosmos DB v2**.

1. For **Cosmos DB Endpoint**, enter `https://<account-name>.documents.azure.com:443/`.

1. For **Authentication method**, select **OAuth 2.0**, select **Edit credentials**, and then sign in. Leave **Skip test connection** cleared so that Fabric validates the connection.

1. For **Privacy level**, select **Organizational**.

1. Select **Create**.

    :::image type="content" source="./media/azure-cosmos-db-private-network/fabric-new-connection-cosmos-db.png" alt-text="Screenshot of the Fabric New connection dialog box configured for a virtual network connection to Azure Cosmos DB v2 with OAuth 2.0." lightbox="./media/azure-cosmos-db-private-network/fabric-new-connection-cosmos-db.png":::

> [!NOTE]
> Private-network mirroring supports OAuth-based authentication only. Selecting **Virtual network** connectivity and a **Gateway cluster name** routes the connection through your virtual network data gateway to the private endpoint.

> [!WARNING]
> If you get the error *OAuth login through the data gateway was unsuccessful. The service returned an invalid token.*, the gateway subnet is missing outbound access to Microsoft Entra ID. For the fix, see [Gateway OAuth invalid token error](#gateway-oauth-invalid-token-error).

### Step 8: Create the mirrored database with the Fabric REST API

Because the mirroring interface can't use a virtual network data gateway connection, create the mirrored database with the Fabric REST API and reference the connection from [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection). Creating the mirrored database is a three-part sequence:

1. **Resolve the connection ID.** The API rejects the display name, and the Fabric portal doesn't surface the connection GUID, so the script resolves it from the `COSMOS_ENDPOINT` value that [Step 1](#step-1-sign-in-and-define-your-variables) builds from your account name.
1. **Create the item with a definition.** The mirrored database must be created with a `definition` that contains two Base64-encoded parts: `mirroring.json`, which holds the source and target properties, and `.platform`, which holds the item metadata. Posting top-level `properties` instead creates an empty shell whose source and source connection are blank in Fabric and that never starts.
1. **Start mirroring.** Call `startMirroring` on the new item to begin replication.

Run the whole block in the terminal that you kept open, which already has the variables from [Step 1](#step-1-sign-in-and-define-your-variables).

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
$fabricToken     = Get-AzAccessToken -ResourceUrl 'https://api.fabric.microsoft.com'
$fabricTokenText = if ($fabricToken.Token -is [securestring]) { [Net.NetworkCredential]::new('', $fabricToken.Token).Password } else { $fabricToken.Token }
$fabricHeaders   = @{ Authorization = "Bearer $fabricTokenText"; 'Content-Type' = 'application/json' }

# 1. Resolve the connection ID (GUID) by the Azure Cosmos DB host (the virtual network gateway connection).
$CONNECTION_ID = ((Invoke-RestMethod -Uri 'https://api.fabric.microsoft.com/v1/connections' -Headers $fabricHeaders).value |
                  Where-Object { $_.connectionDetails.type -eq 'CosmosDB' -and $_.connectivityType -eq 'VirtualNetworkGateway' -and $_.connectionDetails.path -like "*$COSMOS_ENDPOINT*" } |
                  Select-Object -First 1).id

# 2. Build the definition: mirroring.json (source and target) plus .platform (item metadata).
$mirroringJson = @{
  properties = @{
    source = @{ type = 'CosmosDb'; typeProperties = @{ connection = $CONNECTION_ID; database = $COSMOS_DATABASE } }
    target = @{ type = 'MountedRelationalDatabase'; typeProperties = @{ defaultSchema = 'dbo'; format = 'Delta' } }
  }
} | ConvertTo-Json -Depth 20
$platformJson = @{
  '$schema' = 'https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json'
  metadata  = @{ type = 'MirroredDatabase'; displayName = $MIRROR_NAME }
  config    = @{ version = '2.0'; logicalId = '00000000-0000-0000-0000-000000000000' }
} | ConvertTo-Json -Depth 20
$toBase64 = { param($text) [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($text)) }

$requestBody = @{
  displayName = $MIRROR_NAME
  definition  = @{
    parts = @(
      @{ path = 'mirroring.json'; payload = (& $toBase64 $mirroringJson); payloadType = 'InlineBase64' },
      @{ path = '.platform';      payload = (& $toBase64 $platformJson);  payloadType = 'InlineBase64' }
    )
  }
} | ConvertTo-Json -Depth 20

# 3. Create the mirrored database, and then start replication.
Invoke-RestMethod -Method Post -Uri "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases" -Headers $fabricHeaders -Body $requestBody | Out-Null
Start-Sleep -Seconds 5
$MIRROR_ID = ((Invoke-RestMethod -Uri "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases" -Headers $fabricHeaders).value |
              Where-Object displayName -eq $MIRROR_NAME | Select-Object -First 1).id
Invoke-RestMethod -Method Post -Uri "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases/$MIRROR_ID/startMirroring" -Headers $fabricHeaders
```

# [Azure CLI](#tab/azure-cli)

```azurecli
FABRIC_TOKEN=$(az account get-access-token --resource https://api.fabric.microsoft.com --query accessToken -o tsv)

# 1. Resolve the connection ID (GUID) by the Azure Cosmos DB host (the virtual network gateway connection).
CONNECTION_ID=$(curl -sS "https://api.fabric.microsoft.com/v1/connections" -H "Authorization: Bearer $FABRIC_TOKEN" | jq -r --arg e "$COSMOS_ENDPOINT" 'first(.value[] | select(.connectionDetails.type=="CosmosDB" and .connectivityType=="VirtualNetworkGateway" and (.connectionDetails.path|contains($e))) | .id)')

# 2. Build the definition parts (Base64): mirroring.json (source and target) plus .platform (metadata).
MIRRORING_B64=$(jq -cn --arg c "$CONNECTION_ID" --arg d "$COSMOS_DATABASE" '{properties:{source:{type:"CosmosDb",typeProperties:{connection:$c,database:$d}},target:{type:"MountedRelationalDatabase",typeProperties:{defaultSchema:"dbo",format:"Delta"}}}}' | base64 -w0)
PLATFORM_B64=$(jq -cn --arg n "$MIRROR_NAME" '{"$schema":"https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",metadata:{type:"MirroredDatabase",displayName:$n},config:{version:"2.0",logicalId:"00000000-0000-0000-0000-000000000000"}}' | base64 -w0)
REQUEST_BODY=$(jq -cn --arg n "$MIRROR_NAME" --arg m "$MIRRORING_B64" --arg p "$PLATFORM_B64" '{displayName:$n,definition:{parts:[{path:"mirroring.json",payload:$m,payloadType:"InlineBase64"},{path:".platform",payload:$p,payloadType:"InlineBase64"}]}}')

# 3. Create the mirrored database, and then start replication.
curl -sS -X POST "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases" -H "Authorization: Bearer $FABRIC_TOKEN" -H "Content-Type: application/json" -d "$REQUEST_BODY"
sleep 5
MIRROR_ID=$(curl -sS "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases" -H "Authorization: Bearer $FABRIC_TOKEN" | jq -r --arg n "$MIRROR_NAME" 'first(.value[] | select(.displayName==$n) | .id)')
curl -sS -X POST "https://api.fabric.microsoft.com/v1/workspaces/$FABRIC_WORKSPACE_ID/mirroredDatabases/$MIRROR_ID/startMirroring" -H "Authorization: Bearer $FABRIC_TOKEN"
```

---

## Verify replication

:::image type="content" source="./media/azure-cosmos-db-private-network/fabric-monitor-replication.png" alt-text="Screenshot of the Fabric Monitor replication page showing replication status as Running with rows replicated." lightbox="./media/azure-cosmos-db-private-network/fabric-monitor-replication.png":::

After you create the mirrored database, verify that replication works:

1. In your Fabric workspace, open the new mirrored database.

1. Confirm that the **Details** card shows your source connection GUID and source database. These values are blank if you create the item without a definition, as described in [Step 8](#step-8-create-the-mirrored-database-with-the-fabric-rest-api).

1. Under **Monitor replication**, confirm that the status is **Running**.

1. Select **Refresh** about once a minute, and watch the **Rows replicated** column climb for each table until it matches your source containers. Initial replication can take a few minutes to begin, depending on data volume.

Because Azure Cosmos DB public network access stays disabled throughout, replicating rows proves that Fabric reaches the account through the trusted-workspace bypass over the private gateway.

## Limitations and considerations

When you use a virtual network data gateway with Azure Cosmos DB mirroring, be aware of these limitations:

- The target Fabric workspace region must be the same as the source Azure Cosmos DB account region.
- Private-network mirroring supports OAuth-based authentication only.
- You must create the mirrored database with the Fabric REST API, because the mirroring interface can't use a virtual network data gateway connection.
- The gateway subnet must be a dedicated `/27` or larger subnet that's delegated to `Microsoft.PowerPlatform/vnetaccesslinks`, with line of sight to the account and private DNS resolution.
- The gateway subnet needs outbound access to Microsoft Entra ID for the OAuth sign-in. After March 31, 2026, attach a NAT gateway, because default outbound access is retired.
- The `EnableFabricNetworkAclBypass` capability must be enabled before you configure the network ACL bypass.
- Network ACL configuration is workspace-specific. Authorize each workspace that needs to access the account separately.
- When you use Microsoft Entra ID authentication, ensure that the required RBAC permissions are configured. For more information, see [security limitations](azure-cosmos-db-limitations.md#security-limitations).

## Troubleshooting

If you have trouble connecting to your Azure Cosmos DB account, use the following checks. These commands reuse the variables from [Step 1](#step-1-sign-in-and-define-your-variables).

### Verify the network ACL bypass capability

Confirm that the account has the capability by using the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az cosmosdb show -g "$RESOURCE_GROUP" -n "$COSMOS_ACCOUNT" --query "capabilities[].name" -o tsv
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
$account = Get-AzCosmosDBAccount -ResourceGroupName $RESOURCE_GROUP -Name $COSMOS_ACCOUNT
$account.Capabilities.Name
```

---

Confirm that `EnableFabricNetworkAclBypass` appears in the output. If the output is empty, the capability isn't enabled.

### Verify the trusted workspace configuration

Confirm that the workspace resource ID is authorized on the account by using the Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az cosmosdb show -g "$RESOURCE_GROUP" -n "$COSMOS_ACCOUNT" --query "networkAclBypassResourceIds" -o tsv
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
$account = Get-AzCosmosDBAccount -ResourceGroupName $RESOURCE_GROUP -Name $COSMOS_ACCOUNT
$account.NetworkAclBypassResourceIds
```

---

Verify that the resource ID has the correct tenant ID and workspace ID. If the output is empty, the Fabric workspace isn't configured.

### Gateway OAuth invalid token error

If [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection) fails with the error *OAuth login through the data gateway was unsuccessful. The service returned an invalid token.*, the gateway subnet has no outbound path to Microsoft Entra ID (`login.microsoftonline.com`), so the gateway can't complete the OAuth token exchange. This error usually happens when **Enable private subnet (no default outbound access)** was left selected on the subnet in [Step 2](#step-2-create-the-delegated-gateway-subnet).

To fix the error, give the subnet outbound internet access by attaching a NAT gateway. A NAT gateway also becomes required after March 31, 2026, when default outbound access is retired. In the portal, go to **Virtual network** > **Subnets** > **snet-fabric** > **NAT gateway**. Alternatively, use the Azure CLI or Azure PowerShell. Set `VNET_NAME` and `LOCATION` to match your environment.

# [Azure CLI](#tab/azure-cli)

```azurecli
VNET_NAME="vnet-<env>"; LOCATION="<region>"
az network public-ip create -g "$RESOURCE_GROUP" -n pip-nat-fabric --sku Standard --allocation-method Static -l "$LOCATION"
az network nat gateway create  -g "$RESOURCE_GROUP" -n nat-fabric --public-ip-addresses pip-nat-fabric -l "$LOCATION"
az network vnet subnet update   -g "$RESOURCE_GROUP" --vnet-name "$VNET_NAME" -n snet-fabric --nat-gateway nat-fabric
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
$VNET_NAME = "vnet-<env>"; $LOCATION = "<region>"
$pip = New-AzPublicIpAddress -ResourceGroupName $RESOURCE_GROUP -Name pip-nat-fabric -Location $LOCATION -Sku Standard -AllocationMethod Static
$nat = New-AzNatGateway -ResourceGroupName $RESOURCE_GROUP -Name nat-fabric -Location $LOCATION -Sku Standard -PublicIpAddress $pip
$vnetObj = Get-AzVirtualNetwork -ResourceGroupName $RESOURCE_GROUP -Name $VNET_NAME
($vnetObj.Subnets | Where-Object Name -eq 'snet-fabric').NatGateway = $nat
$vnetObj | Set-AzVirtualNetwork
```

---

After you attach the NAT gateway, retry [Step 7](#step-7-create-the-azure-cosmos-db-v2-connection).

For more troubleshooting guidance, see [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-troubleshooting.yml).

## Related content

- [Mirroring Azure Cosmos DB](azure-cosmos-db.md)
- [Tutorial: Configure Microsoft Fabric mirrored database for Azure Cosmos DB](azure-cosmos-db-tutorial.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-limitations.md)
- [What is a virtual network data gateway?](/data-integration/vnet/overview)
- [Create virtual network data gateways](/data-integration/vnet/create-data-gateways)
