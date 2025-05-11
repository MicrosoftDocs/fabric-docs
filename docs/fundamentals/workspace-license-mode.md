---
title: Workspace license modes
description: This article explains the meanings of the workspace license modes, and the implications they have for data residency requirements.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: overview
ms.date: 05/11/2025
#customer intent: As workspace admin, I want to understand what the workspace license mode options are and when impact they have on data residency, the items that can be in the workspace, etc.
---
# Workspace license modes

Workspaces are created in, and can be assigned to Microsoft Fabric capacities. A workspace's license mode determines what kind of capacity the workspace can be hosted in.

The target audience for this article is workspace administrators and others who want to understand:

* What workspace license modes are.
* Which item types can't be moved to a capacity in a different region.
* What happens to an item when the workspace moves to a capacity that doesn't support that item type.

## Overview of licenses and capacities

There are two types of license modes: [per user license modes and capacity license modes](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses).

* **Per user license mode**: Per user license modes mean the workspace is hosted on system reserved capacity. The options are Pro and Premium Per User (PPU).

* **Capacity license mode**: Capacity license modes mean that the workspace is hosted on a capacity which either has been purchased or is a trial. Capacities are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs), which are used to calculate the capacity's compute power. Capacity licenses are organizational licenses that provide a pool of resources for Fabric or Power BI operations.

There are several different [capacity types](../admin/capacity-settings.md?tabs=power-bi-premium#view-your-capacity) in Fabric:

* **Power BI Premium**: A capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.

    > [!NOTE]
    > Power BI capacities are transitioning to Fabric. For more information, see [Power BI Premium transition to Microsoft Fabric](/power-bi/enterprise/service-premium-faq#power-bi-premium-transition-to-microsoft-fabric).

* **Power BI Embedded**: A capacity that was bought as part of a Power BI Embedded subscription. These capacities use A or EM SKUs.

* **Trial**: A Microsoft Fabric trial capacity. These capacities use Trial SKUs.

* **Fabric capacity**: A Microsoft Fabric capacity. These capacities use F SKUs

## Choose license mode and assign capacity in workspace settings

To choose a license mode and assign a new capacity to a workspace, open the workspace settings and choose **License info**. Information about the current license is displayed.

1. Select **Edit**. The list of available licenses modes appears.

1. Select the desired license mode and specify the capacity the workspace will be hosted on.

    > [!NOTE]
    > You can assign capacity only for capacity license types. The system automatically reserves shared capacity for per-user licenses.
    >
    > The types of items contained in the workspace can affect the ablity to change license modes and/or move the workspace to a capacity in a different region. See [Moving data around](../admin/portal-workspaces.md#moving-data-around) for detail.

## Related content

* [Fabric licenses](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses)