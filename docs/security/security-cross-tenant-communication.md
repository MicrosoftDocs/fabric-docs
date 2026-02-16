---
title: About cross-tenant communication
description: Learn how to use workspace-level private links to set up communication between workspaces in separate tenants.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely enable and configure cross-tenant communication, so I can allow data and resource access between workspaces while maintaining security controls.

---

# Cross-tenant connections using workspace-level private links

Workspace-level private links can be used to establish secure connections between workspaces in different Azure tenants, allowing for controlled data sharing and collaboration while maintaining strict security boundaries. To establish a connection from one tenant to a Fabric workspace in another tenant, you first create a Private Link service in the same tenant as your Fabric workspace. Then, in the tenant that requires access, you create a private endpoint that connects to the Fabric workspace using the established Private Link service. The following diagram illustrates this setup.

:::image type="content" source="media/security-cross-tenant-communication/cross-tenant-workspace-private-link.png" alt-text="Diagram showing a private endpoint in Tenant 1 that connects to the private link service for the Fabric workspace in Tenant 2." lightbox="media/security-cross-tenant-communication/cross-tenant-workspace-private-link.png"  border="false":::

In this diagram:

* **Tenant 1** is the tenant that requires access. In this tenant, you create a virtual network, a virtual machine, and a private endpoint that is used to connect to the workspace in Tenant 2. Then you configure DNS to ensure proper name resolution.
* **Tenant 2** contains the Fabric workspace that Tenant 1 needs to access. In Tenant 2, you create the Private Link service for the workspace.

> [!NOTE]
> * **Microsoft.Fabric** Resource provider should be provisioned in both tenants to establish cross-tenant communication. 

## Step 1: Create a workspace in Fabric

In Tenant 2, [create a workspace in Fabric](/fabric/fundamentals/create-workspaces). Make sure the workspace is assigned to a Fabric capacity. You can check assignment by going to the workspace settings and selecting **Workspace type**, as described in Step 1 of [Reassign a workspace to a different capacity](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity-1).

## Step 2: Create the Private Link service in Azure

In Tenant 2, follow these steps to create the Private Link service for the new workspace. Once it's created, copy the private link service resource ID for use in [Step 5. Create a private endpoint](#step-5-create-a-private-endpoint).

[!INCLUDE [create-private-link-service](includes/create-private-link-service.md)]

## Step 3: Create a virtual network

In Tenant 1, follow these steps to create a virtual network.

[!INCLUDE [create-virtual-network](includes/create-virtual-network.md)]

## Step 4: Create a virtual machine

In Tenant 1, follow these steps to create a virtual machine.

[!INCLUDE [create-virtual-machine](includes/create-virtual-machine.md)]

## Step 5: Create a private endpoint

In Tenant 1, create a managed private endpoint in the virtual network you set up in [Step 3](#step-3-create-a-virtual-network). Configure this private endpoint to connect to the Private Link service you created in [Step 2](#step-2-create-the-private-link-service-in-azure).

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the Azure portal search bar, search for **Private endpoints** and select it in the search results.

1. On the **Network Foundation | Private endpoints** page, select **Private endpoints**, and then select **+ Create**.

1. On the **Basics** tab of **Create a private endpoint**, enter or select the following information:

    | Setting | Value |
    |--|--|
    | **Subscription** | Select your Azure Subscription. |
    | **Resource group** | Select the resource group you created earlier in [Step 2](#step-2- create-the-private-link-service-in-azure) |
    | **Name** | Enter a unique name. |
    | **Network interface name** | Enter a unique name. |
    | **Region** | Select the region you created earlier for your virtual network. |

1. Select **Next: Resource**. On the **Resource** tab, enter or select the following information: 

    | Setting | Value |
    |--|--|
    | **Connection method** | Select **Connect to an Azure resource by resource ID or alias**. |
    | **Resource ID or alias** | Paste the resource ID you copied in [Step 2](#step-2-create-the- private-link-service-in-azure). |
    | **Target sub-resource** | Select **workspace**. |

    :::image type="content" source="media/security-cross-tenant-communication/create-private-endpoint.png" alt-text="Screenshot showing the Create a private endpoint page with the option Connect to an Azure resource by resource ID or alias selected.":::

1. Select **Next: Virtual Network**. On the **Virtual Network** tab, enter or select the following information:

    | Setting | Value |
    |--|--|
    | **Virtual network** | Select virtual network name you created earlier (for example *vnet-1*).  |
    | **Subnet** | Select the subnet name you created earlier (for example *subnet-1*). |

1. Select **Next** until the **Review + create** page appears, and then select **Create**.

## Step 6: Approve the connection

In Tenant 2, the private link service owner for the workspace must approve the managed private endpoint request in Azure Network Foundation.

:::image type="content" source="media/security-cross-tenant-communication/network-foundation-pending-connections.png" alt-text="Screenshot showing the network connections pending approval." lightbox="media/security-cross-tenant-communication/network-foundation-pending-connections.png":::

## Step 7: Configure DNS

In Tenant 1, configure DNS to resolve the Fabric workspace fully qualified domain name (FQDN) to the private endpoint IP address.

> [!NOTE]
> Make sure the connection is approved as described in the [previous step](#step-6-approve-the-connection) before proceeding.

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the Azure portal search bar, search for **Private endpoints** and select it in the search results.

1. On the **Network Foundation | Private endpoints** page, select **Private endpoints**, and then select the private endpoint.

1. Select the **DNS configuration** tab. Note the DNS records that are required for the private endpoint.

   :::image type="content" source="media/security-cross-tenant-communication/dns-configuration.png" alt-text="Screenshot showing the DNS configuration for the private endpoint." lightbox="media/security-cross-tenant-communication/dns-configuration.png":::

1. Create a private DNS zone *privatelink.fabric.microsoft.com*. 

1. In this private DNS zone, create the records that were listed in the previous step on the private endpoint DNS configuration page. For example, add a record set for API FQDN.

## Step 8: Connect to the virtual machine

Azure Bastion protects your virtual machines by providing lightweight, browser-based connectivity without the need to expose them through public IP addresses. For more information, see [What is Azure Bastion?](/azure/bastion/bastion-overview).

Connect to your VM using the following steps:

[!INCLUDE [connect-virtual-machine](includes/connect-virtual-machine.md)]

## Step 9: Access Fabric privately from the virtual machine

Next, access Fabric privately from the virtual machine you created in the previous step. This step verifies that the private endpoint is correctly configured and that you can resolve the Fabric workspace FQDN to the private IP address.

1. In the virtual machine, open the Command Prompt.

1. Enter the following command: 

   `nslookup {workspaceid}.z{xy}.w.api.fabric.microsoft.com`

   where *workspaceid* is the workspace object ID without dashes, and *xy* represents the first two characters of the workspace object ID.

1. The private IP address is returned.

## Step 10: Deny public access to the workspace

You can deny public access to the workspace in Tenant 2 to ensure that it can only be accessed through the private endpoint you created in Tenant 1.

To deny public access to the workspace, follow the steps in [the private links setup article](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace).

Cross-tenant communication is now established. Test the connection to ensure that you can access the workspace in Tenant 2 from the virtual machine in Tenant 1 using the workspace FQDN.

> [!NOTE]
> This configuration allows secure network connectivity between tenants, but doesn't grant access to workspace resources by itself. Users must authenticate with valid credentials and have the necessary permissions in the tenant where the workspace resides to access data or services.

