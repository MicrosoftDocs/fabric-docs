---
title: Set up and use workspace-level private links
description: Learn how to set up and use a workspace-level private links for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 02/04/2026

#customer intent: As a workspace admin, I want to configure workspace-level Private Link on my workspace to prevent access to the workspace from the public internet.

---

# Set up and use workspace-level private links

Private links improve security by routing traffic through Azure Private Link and private endpoints, ensuring data stays on Microsoft’s private network rather than the public internet. Microsoft Fabric offers private links at two scopes: tenant-level and workspace-level. [Tenant-level private links](./security-private-links-overview.md) secure all workspaces within a tenant, while [workspace-level private links](./security-workspace-level-private-links-overview.md) allow you to manage network access for specific workspaces individually. 

This article provides instructions for setting up workspace-level private links in Fabric.

## Prerequisites

* The workspace must be assigned to a Fabric capacity (F SKUs). Other capacities, such as premium (P SKU) and trial capacities, aren't supported. You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity-1).
* A Fabric administrator must enable the tenant setting **Configure workspace-level inbound network rules**. For details, see [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md).
* You need the workspace ID. Find it in the URL after `group`.
* You need the tenant ID. In the Fabric portal, select the question mark in the upper right corner, then select **About Power BI**. The tenant ID is the **ctid** part of the **Tenant URL**.
* You must be a workspace admin and have sufficient Azure permissions to set up a private link service in Azure.
* You must be a workspace admin to configure the workspace communication policy.
* If this is the first time setting up workspace-level private links in your tenant, re-register the **Microsoft.Fabric** resource provider in Azure for subscriptions containing the workspace private link resource and private endpoint. In the Azure portal, go to **Subscriptions** > **Settings** > **Resource providers**, select **Microsoft.Fabric**, and then select **Re-register**.

## Step 1. Create a workspace in Fabric

[Create a workspace in Fabric](/fabric/fundamentals/create-workspaces). Make sure the workspace is assigned to a Fabric capacity. You can check assignment by going to the workspace settings and selecting **License info**, as described in Step 1 of [Reassign a workspace to a different capacity](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity-1).

## Step 2. Create the private link service in Azure

To create a private link service, deploy an ARM template in Azure by following these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the Azure portal search bar, search for **deploy a custom template** and then select it from the available options.

1. On the **Custom deployment** page, select **Build your own template in the editor**.

1. In the editor, create a Fabric resource using the following ARM template, where:

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
    * `<workspace-id>` is the workspace ID you noted as part of the prerequisites.

```json
    {
      "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "parameters": {},
      "resources": [
        {
          "type": "Microsoft.Fabric/privateLinkServicesForFabric",
          "apiVersion": "2024-06-01",
          "name": "<resource-name>",
          "location": "global",
          "properties": {
            "tenantId": "<tenant-id>",
            "workspaceId": "<workspace-id>"
          }
        }
      ]
    }
```

You can find details about the Private Link Service in the JSON file.

You can also find the private link service resource in the resource group, but you need to select **Show hidden resources**.

## Step 3. Create a virtual network

The following procedure creates a virtual network with a resource subnet, an Azure Bastion subnet, and an Azure Bastion host.

We recommend reserving at least 10 IP addresses for each workspace-level private endpoint for future use. Currently, we create five IP addresses per workspace-level private link in the subnet. 

[!INCLUDE [create-virtual-network](includes/create-virtual-network.md)]

## Step 4. Create a virtual machine

[!INCLUDE [create-virtual-machine](includes/create-virtual-machine.md)]

## Step 5. Create a private endpoint

Create a private endpoint in the virtual network you created in step 3, and point to the private link service you created in step 2.

1. In the search box at the top of the portal, enter **Private endpoint**. Select **Private endpoints**.

1. Select **+ Create** in **Private endpoints**.

1. On the **Basics** tab of **Create a private endpoint**, enter or select the following information:

    |Setting          |Value    |
    |------------------|---------|
    |**Subscription**      |Select your Azure Subscription.|
    |**Resource group**    |Select the resource group you created earlier when creating the private link service in Azure.|
    |**Name**              |Enter a unique name.|
    |**Network interface name**|Enter *FabricPrivateEndpointNIC*. If this name is taken, create a unique name.|
    |**Region**           |Select the region you created earlier for your virtual network.|

      :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-basics-tab.png" alt-text="Screenshot of the Basics tab in Create a private endpoint.":::

1. Select **Next: Resource**. In the **Resource** pane, enter or select the following information.

    | Setting | Value |
    |--|--|
    | **Connection method** | Select connect to an Azure resource in my directory. |
    | **Subscription** | Select your subscription. |
    | **Resource type** | Select **Microsoft.Fabric/privateLinkServicesForFabric** |
    | **Resource** | Choose the Fabric resource you created earlier when creating the private link service in Azure. |
    | **Target subresource** | workspace |

    The following image shows the **Create a private endpoint - Resource** window.

    :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-resource-tab.png" alt-text="Screenshot of the Resource tab in Create a private endpoint.":::

1. Select **Next: Virtual Network**. In **Virtual Network**, enter or select the following information.

    |Setting       |Value    |
    |---------------|---------|
    |**Virtual network**|Select virtual network name you created earlier (for example *vnet-1*). |
    |**Subnet**	|Select the subnet name you created earlier (for example *subnet-1*). |

1. Select **Next: DNS**. Under **Private DNS Integration**, enter or select the following information.

    |Setting |	Value |
    |-------------------|---------|
    |**Integrate with private DNS zone**| Select **Yes**. |
    |**Private DNS Zone**	|Select <br> *(New)privatelink.fabric.microsoft.com* <br> |

      :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-dns-tab.png" alt-text="Screenshot of the DNS tab in Create a private endpoint.":::

1. Select **Next: Tags**, then **Next: Review + create**.

1. Select **Create**.

## Step 6. Connect to the virtual machine

Azure Bastion protects your virtual machines by providing lightweight, browser-based connectivity without the need to expose them through public IP addresses. For more information, see [What is Azure Bastion?](/azure/bastion/bastion-overview).

Connect to your VM using the following steps:

[!INCLUDE [connect-virtual-machine](includes/connect-virtual-machine.md)]

## Step 7. Access Fabric privately from the virtual machine

Next, access Fabric privately from the virtual machine you created in the previous step. This step verifies that the private endpoint is correctly configured and that you can resolve the Fabric workspace fully qualified domain name (FQDN) to the private IP address.

1. In the virtual machine, open the Command Prompt.

1. Enter the following command: 

   `nslookup {workspaceid}.z{xy}.w.api.fabric.microsoft.com`

   where *workspaceid* is the workspace object ID without dashes, and *xy* represents the first two characters of the workspace object ID.

1. The private IP address is returned.

## Step 8. Deny public access to the workspace

You can optionally deny public access to the workspace. When the workspace is set to deny public access, it means the workspace can only be accessed via workspace-level private link. You can use either the Fabric portal or the Microsoft Graph API to create the access rule for denying public access.

> [!NOTE]
> The workspace-level setting to deny public access can take up to 30 minutes to take effect.

### [Fabric portal](#tab/fabric-portal)

1. In the Fabric portal, select the workspace you want to configure.
1. Select **Workspace settings**.
1. Select **Inbound networking**.
1. Under **Workspace connection settings**, select **Allow connections from selected networks and workspace level private links**.

   :::image type="content" source="media/security-workspace-level-private-links-set-up/workspace-connection-settings.png" alt-text="Screenshot showing the Workspace connection settings with the radio button selected for the option Allow connections only from workspace level private links." lightbox="media/security-workspace-level-private-links-set-up/workspace-connection-settings.png":::

1. Select **Apply**. Public internet access is now blocked, and only connections through workspace-level private links can access the workspace. 

> [!NOTE]
> To grant specific public IP addresses access to the workspace, create an allow list by editing the **Address configurations**. For more information, see [Set up and manage workspace IP firewall rules](./security-workspace-level-firewall-set-up.md).

### [API](#tab/api)

Use the [Workspaces - Set Network Communication Policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy) to set the workspace public access rule:  

`PUT https://api.fabric.microsoft.com/v1/workspaces/{workspaceID}/networking/communicationPolicy` 

```json
    {
      "inbound": {
        "publicAccessRules": {
          "defaultAction": "Deny"
        }
      }
    }
```
Use the [Workspaces - Get Network Communication Policy API](/rest/api/fabric/core/workspaces/get-network-communication-policy) to get the workspace public access rule: 

`GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceID}/networking/communicationPolicy`

You can use the workspace communication policy API even if no private link is set up, regardless of the current communication policy. The table below shows where and when this API is accessible based on tenant and private link settings.

<a name="workspace-communication-policy-access"></a>

**Table 1. Access to workspace communication policy API based on tenant and private link settings**

| Tenant-level public access setting | Private link type | Access from | Allowed to get or set workspace communication policy API? |
|--|--|--|--|
| Allowed (Block public access is off) | Tenant-level | Public internet or network with a tenant-level private link | Yes, using `api.fabric.microsoft.com` endpoint or workspace-specific FQDN. |
| Allowed (Block public access is off) | Workspace-level | Network with a workspace-level private link | Yes, using `api.fabric.microsoft.com` endpoint, only if the client allows outbound public access.<br>Not accessible using workspace-specific FQDN. |
| Restricted (Block public access is on) | None | Public internet | No. |
| Restricted (Block public access is on) | Tenant-level | Network with a tenant-level private link | Yes, using `api.fabric.microsoft.com` endpoint or workspace-specific FQDN. |
| Restricted (Block public access is on) | Workspace-level | Network with a workspace-level private link | No. |
| Restricted (Block public access is on) | Tenant- and workspace-level | Network with a tenant-level private link and workspace-level private link | Yes, using `api.fabric.microsoft.com` endpoint. |

## Related content

* [About private links](./security-private-links-overview.md)
* [Workspace-level private links overview](./security-workspace-level-private-links-overview.md)
