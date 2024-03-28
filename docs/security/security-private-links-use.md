---
title: Set up and use private links for secure access to Fabric (Preview)
description: Learn how to set up and use private links to provide secure access to Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: danzhang
ms.topic: how-to
ms.custom: video--3yFtlZBpqs
ms.date: 02/28/2024
---

# Set up and use private links

In Fabric, you can configure and use an endpoint that allows your organization to access Fabric privately. To configure private endpoints, you must be a Fabric administrator and have permissions in Azure to create and configure resources such as virtual machines (VMs) and virtual networks (VNets).

The steps that allow you to securely access Fabric from private endpoints are:

1. [Set up private endpoints for Fabric](#step-1-set-up-private-endpoints-for-fabric).
2. [Create a Microsoft.PowerBI private link services for Power BI resource in the Azure portal](#step-2-step-2-create-a-microsoftpowerbi-private-link-services-for-power-bi-resource-in-the-azure-portal).
3. [Create a virtual network](#step-3-create-a-virtual-network).
4. [Create a virtual machine (VM)](#step-4-create-a-virtual-machine).
5. [Create a private endpoint](#step-5-create-a-private-endpoint).
6. [Connect to a VM using Bastion](#step-6-connect-to-a-vm-using-bastion).
7. [Access Fabric privately from the virtual machine](#step-7-access-fabric-privately-from-the-vm).
8. [Disable public access for Fabric](#step-8-disable-public-access-for-fabric).

The following sections provide additional information for each step.

### Step 1. Set up private endpoints for Fabric

1. Sign in to [Fabric](https://app.fabric.microsoft.com) as an administrator.
1. [Go to the tenant settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Find and expand the setting **Azure Private Link**.
1. Set the toggle to *Enabled*.

    :::image type="content" source="./media/security-private-links-use/enable-azure-private-link.png" alt-text="Screenshot showing Azure Private Link tenant setting.":::

It takes about 15 minutes to configure a private link for your tenant. This includes configuring a separate FQDN (fully qualified domain name) for the tenant in order to communicate privately with Fabric services.

When this process is finished, move on to the next step.

### Step 2. Create a Microsoft.PowerBI private link services for Power BI resource in the Azure portal
##### &nbsp;&nbsp;&nbsp;&nbsp;**This is used to support Azure Private Endpoint association with your Fabric resource.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select **Create a resource**.
1. Under **Template deployment**, select **Create**.

    :::image type="content" source="media/security-private-links-use/azure-create-template-1.png" alt-text="Screenshot of the Create template link in the Create a resource section.":::

2. On the **Custom deployment** page, select **Build your own template in the editor**.

    :::image type="content" source="media/security-private-links-use/azure-create-template-2.png" alt-text="Screenshot of the Build your own template option.":::

3. In the editor, create the following a Fabric resource using the ARM template as shown below, where

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
    If you're using an Azure Government cloud for Power BI, `location` should be the region name of the tenant. For example, if the tenant is in US Gov Texas, you should put  `"location": "usgovtexas"` in the ARM template. The list of Power BI US Government regions can be found in the [Fabric for US government article](/power-bi/enterprise/service-govus-overview#connect-government-and-global-azure-cloud-services).

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

### Step 3. Create a virtual network

The following procedure creates a virtual network with a resource subnet, an Azure Bastion subnet, and an Azure Bastion host.

The number of IP addresses your subnet will need is the number of capacities on your tenant plus five. For example, if you're creating a subnet for a tenant with seven capacities, you'll need twelve IP addresses.

1. In the Azure portal, search for and select **Virtual networks**.

1.	On the **Virtual networks** page, select **+ Create**.

1.	On the **Basics** tab of **Create virtual network**, enter or select the following information:

    |Setting |Value |
    |-------------------|---------|
    |**Project details**|
    |Subscription |	Select your subscription. |
    |Resource group | Select **test-PL**, the name we created in [Step 2](#step-2-create-a-fabric-resource-in-the-azure-portal). |
    |**Instance details**|
    |Name	| Enter **vnet-1**. |
    |Region | Select the region where you'll initiate the connection to Fabric. |

    :::image type="content" source="media/security-private-links-use/create-virtual-network.png" alt-text="Screenshot of the Basics tab in Create a virtual network.":::

1. Select **Next** to proceed to the **Security** tab. You can leave as default or change based on business need.  

1. Select **Next** to proceed to the **IP Addresses** tab. You can leave as default or change based on business need.

    :::image type="content" source="./media/security-private-links-use/custom-deployment-ip-addresses-tab.png" alt-text="Screenshot of the IP Addresses tab in Create a virtual network." lightbox="./media/security-private-links-use/custom-deployment-ip-addresses-tab.png":::

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen. When validation passes, select **Create**.

### Step 4. Create a virtual machine

The next step is to create a virtual machine.

1. In the Azure portal, go to **Create a resource > Compute > Virtual machines**.

1. On the **Basics** tab, enter or select the following information:

    |Settings |	Value |
    |:-------------------|:---------|
    |**Project details**||
    |Subscription |	Select your Azure Subscription. |
    |Resource group |	Select the resource group you provided in [Step 2](#step-2-create-a-fabric-resource-in-the-azure-portal). |
    |**Instance details** ||
    |Virtual machine name | Enter a name for the new virtual machine. Select the info bubble next to the field name to see important information about virtual machine names. |
    |Region | Select the region you selected in [Step 3](#step-3-create-a-virtual-network). |
    |Availability options| For testing, choose **No infrastructure redundancy required** |
    |Security Type | Leave the default. |
    |Image | Select the image you want. For example, choose **Windows Server 2022**. |
    | VM architecture | Leave the default of **x64**. |
    |Size | Select a size. |
    |ADMINISTRATOR ACCOUNT ||
    |Username | Enter a username of your choosing. |
    |Password | Enter a password of your choosing. The password must be at least 12 characters long and meet the [defined complexity requirements](/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm). |
    |Confirm password | Reenter password. |
    |INBOUND PORT RULES ||
    |Public inbound ports | Choose **None**. |

    :::image type="content" source="./media/security-private-links-use/create-vm-basics-tab.png" alt-text="Screenshot of the create VM Basics tab." lightbox="./media/security-private-links-use/create-vm-basics-tab.png":::

1. Select **Next: Disks**.

1. On the **Disks** tab, leave the defaults and select **Next: Networking**.

1. On the **Networking** tab, select the following information:

    |Settings |	Value |
    |:-------------------|:---------|
    |Virtual network| Select the virtual network you created in [Step 3](#step-3-create-a-virtual-network).|
    |Subnet	| Select the default (10.0.0.0/24) you created in [Step 3](#step-3-create-a-virtual-network).|

    For the rest of the fields, you leave the defaults.

    :::image type="content" source="./media/security-private-links-use/create-vm-networking-tab.png" alt-text="Screenshot of create VM Networking tab." lightbox="./media/security-private-links-use/create-vm-networking-tab.png":::

1. Select **Review + create**. You're taken to the **Review + create** page where Azure validates your configuration.

1. When you see the **Validation passed** message, select **Create**.

### Step 5. Create a private endpoint

The next step is to create a private endpoint for Fabric.

1.	In the search box at the top of the portal, enter **Private endpoint**. Select **Private endpoints**.

1.	Select **+ Create** in **Private endpoints**.

1.	On the **Basics** tab of **Create a private endpoint**, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |**Project details** ||
    |Subscription| Select your Azure Subscription. |
    |Resource group| Select the resource group you created in [Step 2](#step-2-create-a-fabric-resource-in-the-azure-portal).|
    |**Instance details** ||
    |Name| Enter *FabricPrivateEndpoint*. If this name is taken, create a unique name. |
    |Region| Select the region you created for your virtual network in [Step 3](#step-3-create-a-virtual-network).|

    The following image shows the **Create a private endpoint - Basics** window.

    :::image type="content" source="media/security-private-links-use/create-endpoint-basics-tab.png" alt-text="Screenshot of the Basics tab in Create a private endpoint.":::

1. Select **Next: Resource**. In the **Resource** pane, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |Connection method|	Select connect to an Azure resource in my directory. |
    |Subscription|	Select your subscription.|
    |Resource type|	Select **Microsoft.PowerBI/privateLinkServicesForPowerBI** |
    |Resource| Choose the Fabric resource you created in [Step 2](#step-2-create-a-fabric-resource-in-the-azure-portal). |
    |Target subresource| Tenant |

    The following image shows the **Create a private endpoint - Resource** window.

    :::image type="content" source="./media/security-private-links-use/create-private-endpoint-resource-window.png " alt-text="Screenshot of the create a private endpoint resource window.":::

1. Select **Next: Virtual Network**. In **Virtual Network**, enter or select the following information.

    |Settings |	Value |
    |-------------------|---------|
    |**NETWORKING** ||
    |Virtual network| Select *vnet-1* which you created in [Step 3](#step-3-create-a-virtual-network). |
    |Subnet	| Select *subnet-1* which you created in in [Step 3](#step-3-create-a-virtual-network). |
    |**PRIVATE DNS INTEGRATION** ||
    |Integrate with private DNS zone| Select **Yes**. |
    |Private DNS Zone	|Select <br> *(New)privatelink.analysis.windows.net* <br> *(New)privatelink.pbidedicated.windows.net* <br> *(New)privatelink.prod.powerquery.microsoft.com* |

    :::image type="content" source="./media/security-private-links-use/create-private-endpoint-dns-window.png" alt-text="Screenshot of the create private endpoint DNS window.":::

1. Select **Next: Tags**, then **Next: Review + create**.

1. Select **Create**.

> [!NOTE]
> If you have an existing Power BI private endpoint, it may not work for Fabric items. Currently, you need to create a new private endpoint to get support for Fabric items.

### Step 6. Connect to a VM using Bastion

Azure Bastion protects your virtual machines by providing lightweight, browser-based connectivity without the need to expose them through public IP addresses. For more information, see [What is Azure Bastion?](/azure/bastion/bastion-overview).

Connect to your VM using the following steps:

1. Create a subnet called *AzureBastionSubnet* in the virtual network you created in [Step 3](#step-3-create-a-virtual-network).

    :::image type="content" source="./media/security-private-links-use/create-azurebastionsubnet.png" alt-text="Screenshot of the create AzureBastionSubnet." lightbox="./media/security-private-links-use/create-azurebastionsubnet.png":::

1. In the portal's search bar, enter *testVM* which we created in [Step 4](#step-4-create-a-virtual-machine).

1. Select the **Connect** button, and choose **Connect via Bastion** from the dropdown menu.

    :::image type="content" source="./media/security-private-links-use/connect-via-bastion.png" alt-text="Screenshot of the Connect via Bastion option." lightbox="./media/security-private-links-use/connect-via-bastion.png":::

1. Select **Deploy Bastion**.

1.	On the **Bastion** page, enter the required authentication credentials, then click **Connect**.

### Step 7. Access Fabric privately from the VM

The next step is to access Fabric privately, from the virtual machine you created in the previous step, using the following steps: 

1. In the virtual machine, open PowerShell.

1. Enter `nslookup <tenant-object-id-without-hyphens>-api.privatelink.analysis.windows.net`.

1. You receive a response similar to the following message and can see that the private IP address is returned. You can see that the Onelake endpoint and Warehouse endpoint also return private IPs.

    :::image type="content" source="./media/security-private-links-use/nslookup-powershell.png" alt-text="Screenshot showing IP addresses returned in PowerShell." lightbox="./media/security-private-links-use/nslookup-powershell.png":::

1. Open the browser and go to *app.fabric.com* to access Fabric privately.

### Step 8. Disable public access for Fabric

Finally, you can optionally disable public access for Fabric.

If you disable public access for Fabric, certain constraints on access to Fabric services are put into place, as described in the next section.

> [!IMPORTANT]
> When you turn on *Block Internet Access*, trial capacity will no longer work, and some Fabric items will be disabled.

To disable public access for Fabric, sign in to [Fabric](https://app.fabric.microsoft.com/) as an administrator, and navigate to the **Admin portal**. Select **Tenant settings** and scroll to the **Advanced networking** section. Enable the toggle button in the **Block Public Internet Access** tenant setting.

:::image type="content" source="./media/security-private-links-use/block-public-internet-access-tenant-setting.png" alt-text="Screenshot showing the Block Public Internet Access tenant setting enabled.":::

It takes approximately 15 minutes for the system to disable your organization's access to Fabric from the public Internet.

## Completion of private endpoint configuration

Once you've followed the steps in the previous sections and the private link is successfully configured, your organization implements private links based on the following configuration selections, whether the selection is set upon initial configuration or subsequently changed.

If Azure Private Link is properly configured and **Block public Internet access** is **enabled**:

* Fabric is only accessible for your organization from private endpoints, and isn't accessible from the public Internet.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links will be blocked by the service, and won't work.
* There may be scenarios that don't support private links, which therefore will be blocked at the service when **Block public Internet access** is enabled.

If Azure Private Link is properly configured and **Block public Internet access** is **disabled**:

* Traffic from the public Internet will be allowed by Fabric services.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links are transported through the public Internet, and will be allowed by Fabric services.
* If the virtual network is configured to block public Internet access, scenarios that don't support private links will be blocked by the virtual network, and won't work.

The following video shows how to connect a mobile device to Fabric, using private endpoints:

> [!NOTE]  
> This video might use earlier versions of Power BI Desktop or the Power BI service.

> [!VIDEO https://www.youtube.com/embed/-3yFtlZBpqs]

More questions? [Ask the Fabric Community](https://community.fabric.microsoft.com/).

## Related content

* [About private links](./security-private-links-overview.md)
