---
title: Set up and use private links for secure access to Fabric
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

1. [Set up private endpoints for Fabric](#set-up-private-endpoints-for-fabric).
2. [Create a Fabric resource in the Azure portal](#create-a-fabric-resource-in-the-azure-portal).
3. [Create a virtual network](#create-a-virtual-network).
4. [Create a virtual machine (VM)](#create-a-virtual-machine-vm).
5. [Create a private endpoint](#create-a-private-endpoint).
6. [Connect to a VM using Remote Desktop (RDP)](#connect-to-a-vm-using-remote-desktop-rdp).
7. [Access Fabric privately from the virtual machine](#access-fabric-privately-from-the-vm).
8. [Disable public access for Fabric](#disable-public-access-for-fabric).

The following sections provide additional information for each step.

### Step 1. Set up private endpoints for Fabric

1. Sign in to [Fabric](https://app.fabric.microsoft.com) as an administrator.
1. [Go to the tenant settings](../admin/about-tenant-settings#how-to-get-to-the-tenant-settings).
1. Find and expand the setting **Azure Private Link**.
1. Set the toggle to *Enabled*.

    :::image type="content" source="./media/security-private-links-use/enable-azure-private-link.png" alt-text="Screenshot showing Azure Private Link tenant setting.":::

It takes about 15 minutes to configure a private link for your tenant. This includes configuring a separate FQDN (fully qualified domain name) for the tenant in order to communicate privately with Fabric services.

When this process is finished, move on to the next step.

### Step 2. Create a Fabric resource in the Azure portal

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

1. Save the template. THen enter the following information.

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
    |Region | Select the region where you will initiate the connection to Fabric. |

    :::image type="content" source="media/security-private-links-use/create-virtual-network.png" alt-text="Screenshot of the Basics tab in Create a virtual network.":::

1. When done, select **Review + create**.

1. When validation has completed, select **Create**.

After you complete these steps, you can create a VM, as described in the next section.

### Step 4. Create a virtual machine (VM)

The next step is to create a VM.

1. In the Azure portal, go to **Create a resource > Compute > Virtual machines**.

2. On the **Basics** tab, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |**Project details**||
    |Subscription |	Select your Azure Subscription |
    |Resource group |	Select the resource group you provided in [Step 3](#step-3-create-a-virtual-network). |
    |**Instance details** ||
    |Virtual machine name | Enter a name for the your new virtual machince. Select the info bubble next to the field name to see important information about virtual machine names. |
    |Region | Select the region where you want the virtual machine to reside. |
    |Availability options| Leave the default **No infrastructure redundancy required** |
    |Image | Select **Windows 10 Pro** |
    |Size | Leave the default **Standard DS1 v2** |
    |ADMINISTRATOR ACCOUNT ||
    |Username | Enter a username of your choosing |
    |Password | Enter a password of your choosing. The password must be at least 12 characters long and meet the [defined complexity requirements](/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm) |
    |Confirm password | Reenter password |
    |INBOUND PORT RULES ||
    |Public inbound ports | Leave the default **None** |
    |LICENSING ||
    |I have an eligible Windows 10/11 license | Check the box |

3. Select **Next: Disks**.

4. On the **Disks** tab, leave the defaults and select **Next: Networking**.

5. On the **Networking** tab, select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |Virtual network|	Leave the default **MyVirtualNetwork**|
    |Address space|	Leave the default **10.0.0.0/24**|
    |Subnet	|Leave the default **mySubnet (10.0.0.0/24)**|
    |Public IP|	Leave the default **(new) myVm-ip**|
    |Public inbound ports|	Select **Allow selected**|
    |Select inbound ports|	Select **RDP**|

6. Select **Review + create**. You're taken to the **Review + create** page where Azure validates your configuration.

7. When you see the **Validation passed** message, select **Create**.

### Create a private endpoint

The next step is to create a private endpoint for Fabric.

1. On the upper-left side of the Azure portal screen **Create a resource > Networking > Private Link**.

2. In **Private Link Center - Overview**, under the option to **Build a private connection to a service**, select **Create private endpoint**.

3. In the **Create a private endpoint - Basics** tab, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |**Project details** ||
    |Subscription| Select your Azure Subscription|
    |Resource group| Select **myResourceGroup**. You created this in the previous section|
    |**Instance details** ||
    |Name| Enter *myPrivateEndpoint*. If this name is taken, create a unique name|
    |Region| Select **West US**|

    The following image shows the **Create a private endpoint - Basics** window.

    :::image type="content" source="media/security-private-links-use/service-private-links-06.png" alt-text="Screenshot of the Basics tab in Create a private endpoint.":::

4. Once that information is complete, select **Next: Resource** and in the **Create a private endpoint - Resource** page, enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |Connection method|	Select connect to an Azure resource in my directory|
    |Subscription|	Select your subscription|
    |Resource type|	Select **Microsoft.PowerBI/privateLinkServicesForPowerBI** |
    |Resource|	myPowerBIResource|
    |Target subresource|	Tenant|

    The following image shows the **Create a private endpoint - Resource** window.

    :::image type="content" source="media/security-private-links-use/service-private-links-07.png" alt-text="Screenshot of the Resource tab in Create a private endpoint.":::

5. Once that information is properly input, select **Next: Configuration** and in the **Create a private endpoint - Configuration** and enter or select the following information:

    |Settings |	Value |
    |-------------------|---------|
    |**NETWORKING** ||
    |Virtual network|	Select *myVirtualNetwork* |
    |Subnet	|Select *mySubnet* |
    |**PRIVATE DNS INTEGRATION** ||
    |Integrate with private DNS zone|	Select **Yes** |
    |Private DNS Zone	|Select <br> *(New)privatelink.analysis.windows.net* <br> *(New)privatelink.pbidedicated.windows.net* <br> *(New)privatelink.prod.powerquery.microsoft.com* |

    The following image shows the **Create a private endpoint - Configuration** window.

    :::image type="content" source="media/security-private-links-use/service-private-links-08.png" alt-text="Screenshot of the Configuration tab in Create a private endpoint.":::

    Next select **Review + create**, which displays the **Review + create** page where Azure validates your configuration. When you see the **Validation passed** message, select **Create**.

    > [!NOTE]
    > If you have an existing Power BI private endpoint, it may not work for Fabric items. Currently, you need to create a new private endpoint to get support for Fabric items.  

### Step 5. Connect to a VM using Remote Desktop (RDP)

After you create your VM, called **myVM**, connect to it from the internet using the following steps:

1. In the portal's search bar, enter *myVm*.

2. Select the **Connect** button, and choose **RDP** from the dropdown menu.

3. Enter an IP address, then select **Download RDP File**. Azure creates a Remote Desktop Protocol (.rdp) file and downloads it to your computer.

4. Open the *.rdp* file to start Remote Desktop Connection, then select **Connect**.

5. Enter the username and password you specified when creating the VM in the previous step.

6. Select **OK**.

7. You might receive a certificate warning during the sign-in process. If you receive a certificate warning, select **Yes** or **Continue**.

### Step 6. Access Fabric privately from the VM

The next step is to access Fabric privately, from the virtual machine you created in the previous step, using the following steps: 

1. In the Remote Desktop of myVM, open PowerShell.

2. Enter `nslookup <tenant-object-id-without-hyphens>-api.privatelink.analysis.windows.net`.

3. You receive a response similar to the following message:

    ```
    Server:  UnKnown
    Address:  168.63.129.16
    
    Non-authoritative answer:
    Name:    52d40f65ad6d48c3906f1ccf598612d4-api.privatelink.analysis.windows.net
    Address:  10.5.0.4
    ```

4. Open the browser and go to *app.fabric.com* to access Fabric privately.

### Step 7. Disable public access for Fabric

Finally, you can optionally disable public access for Fabric.

If you disable public access for Fabric, certain constraints on access to Fabric services are put into place, described in the next section.

> [!IMPORTANT]
> When you turn on *Block Internet Access*, trial capacity will no longer work, and some Fabric items will be disabled.

To disable public access for Fabric, sign in to [Fabric](https://app.fabric.microsoft.com/) as an administrator, and navigate to the **Admin portal**. Select **Tenant settings** and scroll to the **Advanced networking** section. Enable the toggle button in the **Block Public Internet Access** section, as shown in the following image. It takes approximately 15 minutes for the system to disable your organization's access to Fabric from the public Internet.

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