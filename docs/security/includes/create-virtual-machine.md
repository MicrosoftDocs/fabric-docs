---
title: Include file for creating a virtual machine
description: Include file for creating a virtual machine.
author: msmimart
ms.author: mimart
ms.topic: include
ms.custom: 
ms.date: 08/13/2025
---

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Go to **Create a resource > Compute > Virtual machines**.

1. On the **Basics** tab, enter or select the following information:

    | Setting | Value |
    |:-|:-|
    | **Subscription** | Select your Azure Subscription. |
    | **Resource group** | Select the same resource group you used earlier when you created the private link service. |
    | **Virtual machine name** | Enter a name for the new virtual machine. Select the info bubble next to the field name to see important information about virtual machine names. |
    | **Region** | Select the same region you used previously when creating the virtual network. |
    | **Availability options** | For testing, choose **No infrastructure redundancy required** |
    | **Security Type** | Leave the default. |
    | **Image** | Select the image you want. For example, choose **Windows Server 2022**. |
    | **VM architecture** | Leave the default of **x64**. |
    | **Size** | Select a size. |
    | **Username** | Enter a username of your choosing. |
    | **Password** | Enter a password of your choosing. The password must be at least 12 characters long and meet the [defined complexity requirements](/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm). |
    | **Confirm password** | Reenter password. |
    | **Public inbound ports** | Choose **None**. |
    
    :::image type="content" source="./media/create-virtual-machine/create-vm-basics-tab.png" alt-text="Screenshot of the create VM Basics tab." lightbox="./media/create-virtual-machine/create-vm-basics-tab.png":::

1. Select **Next: Disks**.

1. On the **Disks** tab, leave the defaults and select **Next: Networking**.

1. On the **Networking** tab, select the following information:

    | Setting | Value |
    |:-|:-|
    | **Virtual network** | Select the virtual network you created earlier for this deployment. |
    | **Subnet** | Select the default subnet (for example, 10.0.0.0/24) that you created earlier as part of the virtual network setup. |
 
     For the rest of the fields, leave the defaults.
 
     :::image type="content" source="./media/create-virtual-machine/create-vm-networking-tab.png" alt-text="Screenshot of create VM Networking tab." lightbox="./media/create-virtual-machine/create-vm-networking-tab.png":::

1. Select **Review + create**. You're taken to the **Review + create** page where Azure validates your configuration.

1. When you see the **Validation passed** message, select **Create**.
