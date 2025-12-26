---
title: Include file for creating a virtual network
description: Include file for creating a virtual network.
author: msmimart
ms.author: mimart
ms.topic: include
ms.custom: 
ms.date: 08/13/2025
---

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search box, enter **Virtual networks** and select it in the search results.

1. On the **Virtual networks** page, select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter or select the following information:

    | Setting | Value |
    |:-|:-|
    | **Subscription** | Select    your subscription. |
    | **Resource group** |    Select the resource group you    created earlier for the    private link service, such as    **test-PL**. |
    | **Name** | Enter a name    for your virtual network, such    as **vnet-1**. |
    | **Region** | Select the    region where you'll initiate    the connection to Fabric. |

    :::image type="content" source="media/create-virtual-network/create-virtual-network.png" alt-text="Screenshot of the Basics tab in Create a virtual network.":::

1. Select **Next** to proceed to the **Security** tab. You can keep the default settings or modify them according to your organization's requirements.  

1. Select **Next** to proceed to the **IP Addresses** tab. You can keep the default settings or modify them according to your organization's requirements.

   :::image type="content" source="./media/create-virtual-network/custom-deployment-ip-addresses-tab.png" alt-text="Screenshot of the IP Addresses tab in Create a virtual network." lightbox="./media/create-virtual-network/custom-deployment-ip-addresses-tab.png":::

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen. When validation passes, select **Create**.
