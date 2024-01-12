---
title: Pause and resume your capacity
description: Understand how to save money by using your capacity pause and resume feature.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 12/18/2023
---

# Pause and resume your capacity

Microsoft Fabric lets you pause and resume your capacity. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work on your capacity, you can reactivate it.

> [!IMPORTANT]
> Pausing a capacity can prevent Microsoft Fabric content from being available. Before you pause your capacity, make sure the capacity is not being used.

## Prerequisites

To pause your capacity, you need:

* An [F SKU capacity](buy-subscription.md#azure-skus)

* To be a [Fabric administrator](../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Pause your capacity

To pause your capacity:

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select the **Microsoft Fabric** service to see your capacities. You can search for *Microsoft Fabric* in the search menu.

3. Select the capacity you want to pause.

4. Select **Pause**.

5. Select **Yes** to confirm you want to pause the capacity.

## Impact of Pausing on your usage and the Azure Bill
When you pause your capacity, any smoothed capacity usage that would be reported after the capacity pauses will be reconciled towards your capacity compute bill. This usage shows up as a one time reconciliation event in the capacity metrics app and will represent an increase in your Azure bill. To better understand the impact of pausing your capacity and how to review the reconciled usage, review [this document](monitor-paused-capacity.md).

## Resume your capacity

Restart usage by resuming your capacity. Resuming your capacity also resumes billing. Content assigned to this capacity becomes available once the capacity is resumed.

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select the **Microsoft Fabric** service to see your capacities. You can search for *Microsoft Fabric* in the search menu.

3. Select the capacity you want to resume.

4. Select **Resume**.

5. Select **Yes** to confirm you want to resume the capacity.

## Related content

* [Scale your capacity](scale-capacity.md)

* [Understand the metrics app compute page](metrics-app-compute-page.md)
