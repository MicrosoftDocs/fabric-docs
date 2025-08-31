---
title: Set up and use a tenant-level private link
description: Learn how to set up and use private links to provide secure access to Fabric.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: how-to
ms.custom: video--3yFtlZBpqs, sfi-image-nochange
ms.date: 08/13/2025

---

# Set up and use tenant-level private links

Microsoft Fabric supports secure data access through private links, which use Azure Private Link and private endpoints to route traffic over Microsoft’s private network backbone rather than the public internet. You can configure private links at both the tenant and the workspace level. This article explains how to set up private links for a Fabric tenant. 

To configure private endpoints, you must be a Fabric administrator and have permissions in Azure to create and configure resources such as virtual machines (VMs) and virtual networks (VNets).

## Step 1. Set up private endpoints for Fabric

1. Sign in to [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-security-security-private-links-use) as an administrator.
1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Find and expand the setting **Azure Private Link**.
1. Set the toggle to *Enabled*.

    :::image type="content" source="./media/security-private-links-use/enable-azure-private-link.png" alt-text="Screenshot showing Azure Private Link tenant setting.":::

It takes about 15 minutes to configure a private link for your tenant, including configuring a separate FQDN (fully qualified domain name) for the tenant to communicate privately with Fabric services.

When this process is finished, move on to the next step.

## Step 2. Create a Microsoft.PowerBI private link services for Power BI resource in the Azure portal

This step is used to support Azure Private Endpoint association with your Fabric resource.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select **Create a resource**.
1. Under **Template deployment**, select **Create**.

    :::image type="content" source="media/security-private-links-use/azure-create-template-1.png" alt-text="Screenshot of the Create template link in the Create a resource section.":::

2. On the **Custom deployment** page, select **Build your own template in the editor**.

    :::image type="content" source="media/security-private-links-use/azure-create-template-2.png" alt-text="Screenshot of the Build your own template option.":::

3. In the editor, create the following a Fabric resource using the ARM template as shown, where

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

    ```
    {
      "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "parameters": {},
      "resources": [
          {
              "type":"Microsoft.PowerBI/privateLinkServicesForPowerBI",
              "apiVersion": "2020-06-01",
              "name" : "<resource-name>",
              "location": "global",
              "properties" : 
              {
                   "tenantId": "<tenant-object-id>"
              }
          }
      ]
    }
    ```
    If you're using an Azure Government cloud for Power BI, `location` should be the region name of the tenant. For example, if the tenant is in US Gov Texas, you should put  `"location": "usgovtexas"` in the ARM template. The list of Power BI US Government regions can be found in the [Power BI for US government article](/power-bi/enterprise/service-govus-overview#connect-government-and-global-azure-cloud-services).

    >[!IMPORTANT]
    > Use `Microsoft.PowerBI/privateLinkServicesForPowerBI` as `type` value, even though the resource is being created for Fabric.

1. Save the template. Then enter the following information.

    |Setting|Value|
    |:---|:---|
    |**Project details**||
    |Subscription|Select your subscription.|
    |Resource group|Select **Create new. Enter test-PL as the name. Select **OK**.|
    |**Instance details**|Select the region.|
    |Region||

    :::image type="content" source="./media/security-private-links-use/custom-deployment-basics-tab.png" alt-text="Screenshot of the Custom deployment basics tab.":::

4. On the review screen, select **Create** to accept the terms and conditions.

    :::image type="content" source="media/security-private-links-use/azure-create-template-3.png" alt-text="Screenshot of the Azure Marketplace Terms.":::

## Step 3. Create a virtual network

The following procedure creates a virtual network with a resource subnet, an Azure Bastion subnet, and an Azure Bastion host.

The number of IP addresses your subnet needs is the number of capacities you created on your tenant plus 15. For example, if you're creating a subnet for a tenant with seven capacities, you need 22 IP addresses.

[!INCLUDE [create-virtual-network](includes/create-virtual-network.md)]

## Step 4. Create a virtual machine

The next step is to create a virtual machine.

[!INCLUDE [create-virtual-machine](includes/create-virtual-machine.md)]

## Step 5. Create a private endpoint

The next step is to create a private endpoint for Fabric.

1.	In the search box at the top of the portal, enter **Private endpoint**. Select **Private endpoints**.

1.	Select **+ Create** in **Private endpoints**.

1.	On the **Basics** tab of **Create a private endpoint**, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |**Project details** ||
    |Subscription| Select your Azure Subscription. |
    |Resource group| Select the resource group you created earlier when creating the private link service in Azure.|
    |**Instance details** ||
    |Name| Enter *FabricPrivateEndpoint*. If this name is taken, create a unique name. |
    |Region| Select the region you created earlier for your virtual network.|

    The following image shows the **Create a private endpoint - Basics** window.

    :::image type="content" source="media/security-private-links-use/create-endpoint-basics-tab.png" alt-text="Screenshot of the Basics tab in Create a private endpoint.":::

1. Select **Next: Resource**. In the **Resource** pane, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |Connection method|	Select connect to an Azure resource in my directory. |
    |Subscription|	Select your subscription.|
    |Resource type|	Select **Microsoft.PowerBI/privateLinkServicesForPowerBI** |
    |Resource| Choose the Fabric resource you created earlier when creating the private link service in Azure. |
    |Target subresource| Tenant |

    The following image shows the **Create a private endpoint - Resource** window.

    :::image type="content" source="./media/security-private-links-use/create-private-endpoint-resource-window.png " alt-text="Screenshot of the create a private endpoint resource window.":::

1. Select **Next: Virtual Network**. In **Virtual Network**, enter or select the following information.

    |Settings |	Value |
    |-------------------|---------|
    |**NETWORKING** ||
    |Virtual network| Select the virtual network name you created earlier (for example *vnet-1*). |
    |Subnet	| Select the subnet name you created earlier (for example *subnet-1*). |
    |**PRIVATE DNS INTEGRATION** ||
    |Integrate with private DNS zone| Select **Yes**. |
    |Private DNS Zone	|Select <br> *(New)privatelink.analysis.windows.net* <br> *(New)privatelink.pbidedicated.windows.net* <br> *(New)privatelink.prod.powerquery.microsoft.com* |

    :::image type="content" source="./media/security-private-links-use/create-private-endpoint-dns-window.png" alt-text="Screenshot of the create private endpoint DNS window.":::

1. Select **Next: Tags**, then **Next: Review + create**.

1. Select **Create**.


## Step 6. Connect to a VM using Bastion

Azure Bastion protects your virtual machines by providing lightweight, browser-based connectivity without the need to expose them through public IP addresses. For more information, see [What is Azure Bastion?](/azure/bastion/bastion-overview).

Connect to your VM using the following steps:

[!INCLUDE [connect-virtual-machine](includes/connect-virtual-machine.md)]

## Step 7. Access Fabric privately from the VM

The next step is to access Fabric privately, from the virtual machine you created in the previous step, using the following steps: 

1. In the virtual machine, open PowerShell.

1. Enter `nslookup <tenant-object-id-without-hyphens>-api.privatelink.analysis.windows.net`.

1. You receive a response similar to the following message and can see that the private IP address is returned. You can see that the OneLake endpoint and Warehouse endpoint also return private IPs.

    :::image type="content" source="./media/security-private-links-use/nslookup-powershell.png" alt-text="Screenshot showing IP addresses returned in PowerShell." lightbox="./media/security-private-links-use/nslookup-powershell.png":::

1. Open the browser and go to *app.fabric.microsoft.com* to access Fabric privately.

## Step 8. Disable public access for Fabric

Finally, you can optionally disable public access for Fabric.

If you disable public access for Fabric, certain constraints on access to Fabric services are put into place, as described in the next section.

> [!IMPORTANT]
> When you turn on *Block Internet Access*, some unsupported Fabric items become disabled. Learn the full list of limitations and considerations in [About private links](./security-private-links-overview.md).

To disable public access for Fabric, sign in to [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-security-security-private-links-use) as an administrator, and navigate to the **Admin portal**. Select **Tenant settings** and scroll to the **Advanced networking** section. Enable the toggle button in the **Block Public Internet Access** tenant setting.

:::image type="content" source="./media/security-private-links-use/block-public-internet-access-tenant-setting.png" alt-text="Screenshot showing the Block Public Internet Access tenant setting enabled.":::

It takes approximately 15 minutes for the system to disable your organization's access to Fabric from the public Internet.

## Completion of private endpoint configuration

Once you complete the steps in the previous sections and the private link is successfully configured, your organization implements private links based on the following configuration selections, whether the selection is set upon initial configuration or changed later.

If Azure Private Link is properly configured and **Block public Internet access** is **enabled**:

* Fabric is only accessible for your organization from private endpoints, and isn't accessible from the public Internet.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links are blocked by the service.
* There could be scenarios that don't support private links, which are blocked at the service when **Block public Internet access** is enabled.

If Azure Private Link is properly configured and **Block public Internet access** is **disabled**:

* Traffic from the public Internet is allowed by Fabric services.
* Traffic from the virtual network targeting endpoints and scenarios that support private links is transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links is transported through the public Internet, and is allowed by Fabric services.
* If the virtual network is configured to block public Internet access, scenarios that don't support private links are blocked by the virtual network.

The following video shows how to connect a mobile device to Fabric, using private endpoints:

> [!NOTE]  
> This video might use earlier versions of Power BI Desktop or the Power BI service.

> [!VIDEO https://www.youtube.com/embed/-3yFtlZBpqs]

More questions? [Ask the Fabric Community](https://community.fabric.microsoft.com/).

## Disable Private Link

If you want to disable the Private Link setting, make sure that all the private endpoints you created and the corresponding private DNS zone are deleted before disabling the setting. If your virtual network has private endpoints set up but Private Link is disabled, connections from this virtual network could fail.

If you're going to disable the Private Link setting, it's recommended to do so during nonbusiness hours. It might take up to 15 minutes of downtime for some scenarios to reflect the change. 

## Related content

* [About tenant-level private links](security-private-links-overview.md)
* [About workspace-level private links](security-workspace-level-private-links-overview.md)