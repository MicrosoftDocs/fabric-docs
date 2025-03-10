---
title: Fabric Copilot capacity
description: Learn how to set up a Fabric Copilot capacity to enable Copilot adoption
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2024
ms.date: 02/11/2025
---

# Background on Fabric Copilot Capacity

Fabric Copilot capacity is a feature that allows users to utilize Copilot from Power BI Desktop, Pro and PPU workspaces and smaller F SKU workspaces even if their Power BI reports are not on a P1/F64 capacity. By designating a capacity as an Fabric Copilot capacity, capacity admins can ensure that all Copilot consumption is billed to this capacity, making it easier for users to access and use Copilot without the need for specific capacity assignments. Fabric Copilot capacity also consolidates all Copilot usage across the Fabric tenant for a user, which means that if they are using Copilot for Power BI or Copilot for Fabric Spark or Copilot for Fabric Datawarehouse, all their usage will be billed to a singular Fabric Copilot capacity. 

In addition to Copilot, Fabric Copilot capacity also consolidates AI Skills billing across the tenant for designated users.

# Set up Fabric Copilot capacity

This section describes how to set up a Fabric Copilot capacity.

## Enable Fabric Copilot capacity

There are three steps required to enable Fabric Copilot capacity.

1. The Fabric administrator [enables Copilot](../admin/service-admin-portal-copilot.md) for users within the organization.

2. The Fabric administrator enables capacity administrators as [authorized to designate their capacity as a Copilot capacity](../admin/service-admin-portal-copilot.md).

3. The capacity administrator needs to assign a group of users as [Fabric Copilot capacity users](../admin/capacity-settings.md) on their capacity.

## Considerations and limitations

* Fabric Copilot capacity is only supported in the Fabric tenant's home region.

* The Fabric Copilot capacity has to reside on at least an F64 or P1 [SKU](licenses.md#capacity).

* Users assigned to a Fabric Copilot capacity can use Copilot with Power BI on a Pro and PPU workspace (in addition to F and P workspaces), however A and EM workspaces will not be supported.

* Only one default Fabric Copilot capacity is supported per user, even if they are assigned to multiple capacities. The assignment logic is deterministic, and it is the newest created capacity.

* Data is processed in the region where you're using Copilot and / or AI Skills. Usage and billing records that contain the metadata of the Fabric items or workspaces, are available to the Copilot capacity administrator.
