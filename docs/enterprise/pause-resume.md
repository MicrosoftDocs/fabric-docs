---
title: Pause and resume your capacity
description: Understand how to save money by using your capacity pause and resume feature.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 03/20/2024
---

# Pause and resume your capacity

Microsoft Fabric lets you pause and resume your capacity. When your capacity isn't operational, you can pause it to enable cost savings for your organization. Later, when you want to resume work on your capacity, you can reactivate it.

When you pause your capacity, the remaining [cumulative overages and smoothed operations](../enterprise/throttling.md#balance-between-performance-and-reliability) on your capacity are summed, and added to your Azure bill. You can [monitor a paused capacity](monitor-paused-capacity.md) using the [Microsoft Fabric Capacity Metrics app](metrics-app.md).  

> [!IMPORTANT]
> Pausing a capacity can prevent Microsoft Fabric content from being available. Before you pause your capacity, make sure the capacity is not being used. Alternatively, if your capacity is being throttled, pausing stops throttling, and returns your capacity to a healthy state immediately. Therefore, pausing is a self-service mechanism to end throttling.

## Prerequisites

To pause your capacity, you need:

* An [F SKU capacity](buy-subscription.md#azure-skus)

* To be a [Fabric administrator](../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) with atleast the following Azure RBAC roles

1. Microsoft.Fabric/capacities/read
2. Microsoft.Fabric/capacities/write
3. Microsoft.Fabric/suspend/action
4. Microsoft.Fabric/resume/action

## Pause your capacity

To pause your capacity:

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select the **Microsoft Fabric** service to see your capacities. You can search for *Microsoft Fabric* in the search menu.

3. Select the capacity you want to pause.

4. Select **Pause**.

5. Select **Yes** to confirm you want to pause the capacity.

## Resume your capacity

Restart usage by resuming your capacity. Resuming your capacity also resumes billing. Content assigned to this capacity becomes available once the capacity is resumed.

1. Sign into the [Azure portal](https://portal.azure.com/).

2. Select the **Microsoft Fabric** service to see your capacities. You can search for *Microsoft Fabric* in the search menu.

3. Select the capacity you want to resume.

4. Select **Resume**.

5. Select **Yes** to confirm you want to resume the capacity.

## Schedule your operation

With [Azure runbook](/azure/automation/automation-runbook-types) you can schedule your pause and resume operations.

1. [Import a module from the module gallery](/azure/automation/automation-runbook-gallery#import-a-module-from-the-modules-gallery-in-the-azure-portal).

2. In the runbook gallery, search for *Fabric*.

3. Select the notebook you want to schedule. The scheduling parameters are described in the description of the runbook.


## Related content

* [Scale your capacity](scale-capacity.md)

* [Understand the metrics app compute page](metrics-app-compute-page.md)
