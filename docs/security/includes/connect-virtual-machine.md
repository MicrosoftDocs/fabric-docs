---
title: Include file for connecting to a virtual machine
description: Include file for connecting to a virtual machine.
author: msmimart
ms.author: mimart
ms.topic: include
ms.custom: 
ms.date: 08/13/2025
---

1. In the virtual network you created earlier, add a new subnet named **AzureBastionSubnet**.

    :::image type="content" source="./media/connect-virtual-machine/create-subnet.png" alt-text="Screenshot of the create AzureBastionSubnet." lightbox="./media/connect-virtual-machine/create-subnet.png":::

1. In the portal's search bar, type the name of the virtual machine you created earlier, and select it from the search results.

1. Select the **Connect** button, and choose **Connect via Bastion** from the dropdown menu.

    :::image type="content" source="./media/connect-virtual-machine/connect-via-bastion.png" alt-text="Screenshot of the Connect via Bastion option." lightbox="./media/connect-virtual-machine/connect-via-bastion.png":::

1. Select **Deploy Bastion**.

1.	On the **Bastion** page, enter the required authentication credentials, then select **Connect**.