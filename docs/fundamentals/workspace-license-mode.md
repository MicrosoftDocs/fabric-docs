---
title: Workspace license modes
description: This article explains the meanings of the workspace license modes, and the implications they have for data residency requirements.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: overview
ms.date: 05/12/2025
#customer intent: As workspace admin, I want to understand what the workspace license mode options are and when impact they have on data residency, the items that can be in the workspace, etc.
---
# Workspace license modes

When you create a workspace, it is assigned to a [capacity](../enterprise/licenses.md#capacity). The capacity that new workspaces are assigned to by default is determined by the capacity type and/or by the configuration of Fabric or capacity administrators. After you've created a workspace, you can reassign it to a different capacity, if any are available, and if you have sufficient permissions to do so. You reassign workpaces to different capacities using workspace license modes.

## License modes and capacity types

There are two types of license modes: [per user license modes and capacity license modes](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses).

**Per user license mode**: Per user license modes mean the workspace is hosted on system reserved capacity. The options are *Pro* and *Premium Per User (PPU)*.

**Capacity license mode**: Capacity license modes mean that the workspace is hosted on a capacity which either has been purchased or is a trial. Capacities are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs), which are used to calculate the capacity's compute power. Capacity licenses are organizational licenses that provide a pool of resources for Fabric or Power BI operations.

The capacity license modes are related to several [capacity types](../admin/capacity-settings.md?tabs=power-bi-premium#view-your-capacity):

* **Premium capacity**: Premium capacity refers to a capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.

    > [!NOTE]
    > Premium capacities are transitioning to Fabric. For more information, see [Power BI Premium transition to Microsoft Fabric](/power-bi/enterprise/service-premium-faq#power-bi-premium-transition-to-microsoft-fabric).

* **Embedded**: Embedded refers to capacity that was bought as part of a Power BI Embedded subscription. These capacities use A or EM SKUs.

* **Trial**: Refers to a Microsoft Fabric trial capacity. These capacities use Trial SKUs.

* **Fabric capacity**: Fabric capacity refers to  Microsoft Fabric capacity. These capacities use F SKUs.

## Reassign a workspace to a different capacity

You can reassign a workspace to a different capacity via workspace license modes in the workspace settings.

1. Open the workspace settings and choose **License info**. Information about the current license is displayed.

1. Select **Edit**. The list of available licenses modes appears.

1. Select the desired license mode and specify the capacity the workspace will be hosted on.

    > [!NOTE]
    > You can specify specify the specific capacity only when you select one of the capacity license modes. types. Fabric automatically reserves shared capacity for per-user licenses.

    > [!IMPORTANT]
    > The types of items contained in the workspace can affect the ability to change license modes and/or move the workspace to a capacity in a different region. See [Moving data around](../admin/portal-workspaces.md#moving-data-around) for detail.

## Related content

* [Fabric licenses](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses)
* [Moving data around](../admin/portal-workspaces.md#moving-data-around))