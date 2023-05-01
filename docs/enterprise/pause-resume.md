---
title: Pause and resume your capacity
description: Understand how to save money by using your capacity pause and resume feature.
author: KesemSharabi
ms.author: kesharab, mihirwagle
ms.topic: how-to
ms.date: 05/23/2023
---

# Pause your capacity

This article walks through how to pause and resume a Fabric capacity in Microsoft Azure. Pausing your capacity prevents you from being billed. Pausing your capacity is great if you don't need to use the capacity for some time. Use the following steps to pause your capacity.
This assumes that you've already created a Fabric capacity (**F SKU**). If you haven't, see [Create a Fabric capacity in the Azure portal](licenses-buy.md) to get started.

> [!NOTE]
> Pausing a capacity can prevent content from being available within Fabric. Make sure the capacity is not being currently utilized by any workloads.


1. Sign into the [Azure portal](https://portal.azure.com/).

2. Under **Azure services**, select **Microsoft Fabric (preview)** to see your capacities.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-more-services.png" alt-text="Screenshot of the Azure portal, which shows the Azure services list.":::

3. Select the capacity you want to pause.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-capacity-list-active.png" alt-text="Screenshot of the Azure portal, which shows the Fabric capacity list.":::

4. Select **Pause** above the capacity details.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-pause-capacity.png" alt-text="Screenshot of the Azure portal, which shows the highlighted Pause button.":::

5. Select **Yes** to confirm you want to pause the capacity.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-confirm-pause.png" alt-text="Screenshot of the Azure portal, which shows the highlighted Yes button in the pause capacity dialog.":::

## Start your capacity

Resume usage by starting your capacity. Starting your capacity also resumes billing.

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select **All services** > **Microsoft Fabric (preview)** to see your capacities.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-more-services.png" alt-text="Screenshot of the Azure portal, which shows the list of Azure services.":::

3. Select the capacity you want to start.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-capacity-list.png" alt-text="Screenshot of the Azure portal, which shows the list of Fabric capacities.":::

4. Select **Start** above the capacity details.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-start-capacity.png" alt-text="Screenshot of the Azure portal, which shows the highlighted Start button.":::

5. Select **Yes** to confirm you want to start the capacity.

    :::image type="content" source="media/azure-fabric-pause-start/azure-portal-confirm-start.png" alt-text="Screenshot of the Azure portal, which shows the highlighted Yes button in the start capacity dialog.":::

If any content is assigned to this capacity, the content becomes available once the capacity is started.


## Next steps

>[!div class="nextstepaction"]
>[Autoscale](autoscale.md)
