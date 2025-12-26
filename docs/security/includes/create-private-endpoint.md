---
title: Include file for creating a private endpoint
description: Include file for creating a private endpoint.
author: msmimart
ms.author: mimart
ms.topic: include
ms.custom: 
ms.date: 08/13/2025
---

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the Azure portal search bar, search for **Private endpoints** and select it in the search results.

1. Select **+ Create** in **Private endpoints**.

1. On the **Basics** tab of **Create a private endpoint**, enter or select the following information:

   | Setting | Value |
   |--|--|
   | **Subscription** | Select your Azure Subscription. |
   | **Resource group** | Select the resource group you created earlier when creating the private link service in Azure. |
   | **Name** | Enter a unique name, for example *FabricPrivateEndpoint*. |
   | **Network interface name** | Enter a unique name, for example *FabricPrivateEndpointNIC*. |
   | **Region** | Select the region you created earlier for your virtual network. |

      :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-basics-tab.png" alt-text="Screenshot of the Basics tab in Create a private endpoint.":::

1. Select **Next: Resource**. In the **Resource** pane, enter or select the following information: 

   | Setting | Value |
   |--|--|
   | **Connection method** | Select connect to an Azure resource in my directory. |
   | **Subscription** | Select your subscription. |
   | **Resource type** | Select **Microsoft.Fabric/privateLinkServicesForFabric** |
   | **Resource** | Choose the Fabric resource you created earlier when creating the private link service in Azure. |
   | **Target subresource** | Select the appropriate target:</br>**tenant** for a tenant-level private link</br>**workspace** for a workspace-level private link. |

    The following image shows the **Create a private endpoint** page with the **Resource** tab displayed.

      :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-resource-tab.png" alt-text="Screenshot of the Resource tab on the Create a private endpoint page.":::

1. Select **Next: Virtual Network**. In **Virtual Network**, enter or select the following information.

   | Setting | Value |
   |--|--|
   | **Virtual network** | Select virtual network name you created earlier (for example *vnet-1*). |
   | **Subnet** | Select the subnet name you created earlier (for example *subnet-1*). |

1. Select **Next: DNS**.

   | Setting | Value |
   |--|--|
   | **Integrate with private DNS zone** | Select **Yes**. |
   | **Private DNS Zone** | Select the DNS zones based on whether you're setting up a tenant-level or workspace-level private link.<br>**Tenant-level:**<br>(New)privatelink.analysis.windows.net<br>(New)privatelink.pbidedicated.windows.net<br>(New)privatelink.prod.powerquery.microsoft.com<br>**Workspace-level:**<br> *(New)privatelink.fabric.microsoft.com* <br> |

      :::image type="content" source="media/security-workspace-level-private-links-set-up/create-endpoint-dns-tab.png" alt-text="Screenshot of the DNS tab in Create a private endpoint.":::

1. Select **Next: Tags**, then **Next: Review + create**.

1. Select **Create**.