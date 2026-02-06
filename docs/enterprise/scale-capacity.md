---
title: Scale your Fabric capacity
description: This article walks through how to scale a Microsoft Fabric capacity in Azure.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 02/27/2025
---

# Scale your capacity

This article shows how to scale a Microsoft Fabric capacity in Azure. Scaling allows you to increase or decrease the size of your capacity.

You are charged pay as you go hourly rates according to the capacity size you scale up or down to. However, scaling below your reserved instance capacity doesn't affect your bill.

>[!NOTE]
>Scaling up or down between SKUs smaller or equal to F256 and equal or higher than F512, might result in a slower experience.

## Prerequisites

To scale your capacity, you need:

* An [F SKU capacity](buy-subscription.md#azure-skus)

* To be a [capacity admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles)

## Scale a capacity

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select the **Microsoft Fabric** service to see your capacities. You can search for *Microsoft Fabric* in the search menu.

3. Select the capacity you want to scale. The current size for each capacity is listed under *SKU*. When you make your selection, information about that capacity is displayed next to it. This information includes the current capacity scale  under *SKU*.

4. Under **Scale**, select **Change size**.

5. Select a scale and then select **Resize**.

6. Confirm your tier by viewing the overview tab. The current pricing tier is listed.

## Considerations and limitations

Scaling up a capacity that’s smaller than F64 to a larger capacity happens almost immediately. The capacity license updates usually take up to a day, however some updates could take longer. During this time, Fabric Free users might see a request to upgrade to a Power BI Pro license when they try to access a Power BI report.

## Related content

* [Pause and resume your capacity](pause-resume.md)

* [Understand the metrics app overview page](metrics-app-compute-page.md)
