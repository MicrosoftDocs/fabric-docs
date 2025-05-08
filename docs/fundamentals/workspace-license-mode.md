---
title: Workspace license modes
description: This article explains the meanings of the workspace license modes, and the implications they have for data residency requirements.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: overview
ms.date: 05/07/2025
#customer intent: As workspace admin, I want to understand what the workspace license mode options are and when impact they have on data residency, the items that can be in the workspace, etc.
---
# Workspace license modes

Workspaces are created in, and can be assigned to Microsoft Fabric capacities. Workspace license modes dictate what kinds of capacity the workspace can be hosted in. User capabilities in the workspace are determined by the workspace license mode.

target audience 
people who want to change workspace license type
people who want to move a workspace to a capacity in another region
people who are concerned about the process of migrating from P SKUs to F SKUs. 
people who are concerned about the deprecation of Power BI Premium capacity and the move to Fabric capacity. 

## Overview of licenses and capacities

There are two types of licenses: [per user licenses and capacity licenses](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses).

* **Per user license**: Per user licenses allow users to work in Fabric. The options are Fabric (Free), Pro, and Premium Per User (PPU). Per user licenses allow users to work in the Power BI service with a system reserved capacity.

* **Capacity license**: An organizational license that provides a pool of resources for Fabric operations. Capacity licenses are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs), which are used to calculate the capacity's compute power. Fabric capacities are available for purchase and for trial.

There are several different [capacity](../admin/capacity-settings.md?tabs=power-bi-premium#view-your-capacity) types in Fabric:

* **Power BI Premium**: A capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.

    > [!NOTE]
    > Power BI capacities are transitioning to Fabric. For more information, see [Power BI Premium transition to Microsoft Fabric](/power-bi/enterprise/service-premium-faq#power-bi-premium-transition-to-microsoft-fabric).

* **Power BI Embedded**: A capacity that was bought as part of a Power BI Embedded subscription. These capacities use A or EM SKUs.

* **Trial**: A Microsoft Fabric trial capacity. These capacities use Trial SKUs.

* **Fabric capacity**: A Microsoft Fabric capacity. These capacities use F SKUs

## Configure license mode and assign capacity in workspace settings

To configure a license mode and assign a new capacity to the workspace, open the workspace settings and choose **License info**. You'll see information about the current license.

1. Select **Edit**. The list of available licenses modes displays.

1. Select the desired license mode and specify the capacity the the workspace.

    > [!NOTE]
    > You can assign capacity only for capacity license types. The system automatically reserves shared capacity for per-user licenses.

## Moving a workspace from one capacity to another

The following table details the actions you must take before transferring a workspace between capacities with different license types, as well as the potential capability downgrades that can result from the transfer.

| License type \ Move to | Pro | Premium per-user | Embedded | Fabric capacity | Trial |
|--|--|--|--|--|--|
| **Pro** | N/A | Move to a system reserved capacity [QUESTION: Can moving to a system reserved capacity entail a region change?] | You need to specify the capacity [Question: I assume there is no issue with moving to a capacity in a different region here, because only Power BI items are functional in Pro? But could there be non functional, left over Fabric items? What would happen to them? Also, what about MetricSets, Exploration, and Semantic Models (Large). Would they block migration to another region?] | You need to specify the capacity [Question: I assume there is no issue with moving to a capacity in a different region here, because only Power BI items are functional in Pro? But could there be non functional, left over Fabric items? What would happen to them? Also, what about MetricSets, Exploration, and Semantic Models (Large). Would they block migration to another region?]| You need to specify the capacity [Question: I assume there is no issue with moving to a capacity in a different region here, because only Power BI items are functional in Pro? But could there be non functional, left over Fabric items? What would happen to them? Also, what about MetricSets, Exploration, and Semantic Models (Large). Would they block migration to another region?]|
| **Premium per-user** | All content in this workspace will only be available to users who have a Power BI Pro license and will be migrated back to your home region. Any content using Enterprise Gateways may need to be updated to enable data refresh after migration. Usage and performance logs will no longer flow to Azure Log Analytics and no history will be saved while not on Premium. | N/A | You need to specify the capacity | You need to specify the capacity | You need to specify the capacity |
| **Embedded** | All content in this workspace will only be available to users who have a Power BI Pro license and will be migrated back to your home region. Any content using Enterprise Gateways may need to be updated to enable data refresh after migration. Usage and performance logs will no longer flow to Azure Log Analytics and no history will be saved while not on Premium. | No downgrade | You need to specify the capacity | You need to specify the capacity | You need to specify the capacity |
| **Fabric capacity** | You need to remove the Fabric items first and can only move the workspace within the same region | All content in this workspace will only be available to users who have a Power BI Pro license and will be migrated back to your home region. Any content using Enterprise Gateways may need to be updated to enable data refresh after migration. Usage and performance logs will no longer flow to Azure Log Analytics and no history will be saved while not on Premium. | You need to remove the Fabric items first and can only move the workspace within the same region | You can only move the workspace to a capacity within the same region | You can only move the workspace to a capacity within the same region |
| **Trial** | You need to remove the Fabric items first and can only move the workspace within the same region | All content in this workspace will only be available to users who have a Power BI Pro license and will be migrated back to your home region. Any content using Enterprise Gateways may need to be updated to enable data refresh after migration. Usage and performance logs will no longer flow to Azure Log Analytics and no history will be saved while not on Premium. | You need to remove the Fabric items first and can only move the workspace within the same region | You can only move the workspace to a capacity within the same region | You can only move the workspace to a capacity within the same region |

> [!NOTE]
> Moving workspace capacities across regions isn't currently supported. You can only move a workspace to a capacity in the same region as the one it currently resides in. And the Power BI premium transition to Fabric  Power BI Premium FAQ - Power BI | Microsoft Learn???

## Related content

* [Fabric licenses](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses)