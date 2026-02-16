---
title: Fabric Copilot capacity
description: Learn how to set up a Fabric Copilot capacity to enable billing to a designated Microsoft Fabric capacity.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.date: 03/20/2025
ms.collection: ce-skilling-ai-copilot

# Customer intent: As an admin I want to learn how to enable a Fabric Copilot capacity so that I can bill all Copilot usage to a single capacity.
---

# Fabric Copilot capacity

Fabric Copilot capacity is a feature that enables users to charge Copilot usage from Power BI Desktop, Pro and Premium per-user (PPU) workspaces to a single capacity. To bill all your Copilot consumption to one capacity, designate a capacity as a Fabric Copilot capacity for specific users.

When users assigned to a Fabric Copilot capacity use Copilot and Data agents, their corresponding usage is charged to the Fabric Copilot capacity instead of the capacity that contains their content.

Users assigned to a Fabric Copilot capacity can use it in these scenarios:

* Copilot on Power BI Desktop

* Copilot in Power BI on a Pro or Premium per-user (PPU) workspace, or a Fabric capacity workspace.

* Fabric Copilot on these supported workloads, on a Fabric capacity workspace where the capacity SKU is smaller than F64.
  * Data Factory
  * Data Engineering
  * Data Warehouse
  * Data Science
  * Real-Time Analytics
  * Activator

* Data agents on a Fabric capacity workspace where the capacity SKU is smaller than F64.

## Set up Fabric Copilot capacity

This section describes how to set up a Fabric Copilot capacity.

### Enable Fabric Copilot capacity

There are three steps required to enable Fabric Copilot capacity.

1. The Fabric administrator [enables Copilot](../admin/service-admin-portal-copilot.md) for users within the organization.

2. The Fabric administrator enables capacity administrators as [authorized to designate their capacity as a Copilot capacity](../admin/service-admin-portal-copilot.md).

3. The capacity administrator needs to assign a group of users as [Fabric Copilot capacity users](../admin/capacity-settings.md) on their capacity.

### Using Fabric Copilot capacity

Once a user is assigned to a Fabric Copilot capacity, no additional steps are required to use Copilot.

## Considerations and limitations

* Fabric Copilot capacity is only supported in the Fabric tenant's home region.

* The Fabric Copilot capacity has to reside on at least an F2 or P1 [SKU](licenses.md#capacity).

* Users assigned to a Fabric Copilot capacity can use Copilot with Power BI on workspaces with the following license modes: _Pro_, _Trial_, _Premium per-user (PPU)_, _Premium capacity_ and _Fabric capacity_. Capacities with the _Embedded_ license mode aren't supported.

* Only one Fabric Copilot capacity is supported per user. If a user is assigned to multiple Copilot capacities, the newest created Copilot capacity registers the user's Copilot usage.

* Data is processed in the region where you're using Copilot and Data agents. Usage and billing records that contain the metadata of the Fabric items or workspaces, are available to the Copilot capacity administrator.

* Fabric Copilot Capacity does not support Fabric AI functions. For more information on prerequisites for AI functions, visit [this article](../data-science/ai-functions/overview.md). 

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)

* [Manage your Fabric capacity](../admin/capacity-settings.md)
