---
title: Scale Your Capacity Size in Azure
description: Scale a Microsoft Fabric capacity up or down in the Azure portal to adjust compute size, and learn how scaling affects billing and running jobs.
author: dknappettmsft
ms.author: daknappe
ms.topic: how-to
ms.date: 04/20/2026
ai-usage: ai-assisted
---

# Scale your Fabric capacity

This article shows how to scale a Microsoft Fabric capacity in Azure. Scaling lets you increase or decrease the size of your capacity.

You pay pay-as-you-go hourly rates for the capacity size you scale up or down to. However, scaling below your reserved instance capacity doesn't affect your bill.

> [!IMPORTANT]
> When you scale a capacity across the boundary between SKUs at F256 and below and SKUs at F512 and above, in either direction, the capacity goes through a transition that can briefly interrupt it. During this transition, Fabric can cancel in-flight operations and any jobs that are currently running. Perform these resize operations during a maintenance window or a period of low activity, and rerun any canceled jobs after the resize completes.

## Prerequisites

To scale your capacity, you need:

* An [F SKU capacity](licenses.md#capacity)

* To be a [capacity admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles)

* The following Azure RBAC actions on the Fabric capacity resource:

  * `Microsoft.Fabric/capacities/read`
  * `Microsoft.Fabric/capacities/write`
  * `Microsoft.Fabric/capacities/suspend/action`
  * `Microsoft.Fabric/capacities/resume/action`

  Create an [Azure custom role](/azure/role-based-access-control/custom-roles) scoped to these actions. The [Azure privileged built-in roles](/azure/role-based-access-control/built-in-roles/privileged) also include these actions, but avoid using those roles because they grant more permissions than necessary.

  For more information about Microsoft Fabric resource provider operations, see [Microsoft.Fabric](/azure/role-based-access-control/permissions/analytics#microsoftfabric). To assign the custom role to the Fabric capacity resource, see [Assign Azure roles using the Azure portal](/azure/role-based-access-control/role-assignments-portal).

## Scale a capacity

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. Select the **Microsoft Fabric** service to see your capacities. Search for *Microsoft Fabric* in the search menu.

1. Select the capacity you want to scale. The current size for each capacity appears under *SKU*. When you make your selection, information about that capacity appears next to it. This information includes the current capacity scale under *SKU*.

1. Under **Scale**, select **Change size**.

1. Select a scale and then select **Resize**.

1. Confirm your tier by viewing the **Overview** tab. The current pricing tier appears.

## Considerations and limitations

Scaling up a capacity that's smaller than F64 to a larger capacity happens almost immediately. The capacity license updates usually take up to a day. However, some updates might take longer. During this time, Fabric Free users might see a request to upgrade to a Power BI Pro license when they try to access a Power BI report.

## Related content

* [Pause and resume your capacity](pause-resume.md)

* [Understand the metrics app overview page](metrics-app-compute-page.md)
