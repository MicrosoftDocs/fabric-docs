---
title: Fabric Copilot Capacity for Usage Billing
description: Learn how to set up a Fabric Copilot capacity to bill all Copilot and data agent usage from Power BI Desktop, Pro, and PPU workspaces to a single Fabric capacity.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ms.date: 06/24/2026
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
ai-usage: ai-assisted
#customer intent: As an admin I want to learn how to enable a Fabric Copilot capacity so that I can bill all Copilot usage to a single capacity.
---

# Fabric Copilot capacity

A Fabric Copilot capacity is a Fabric capacity that you designate to collect and bill the Copilot usage of a specific group of users. When those users use Copilot or data agents, Fabric charges their usage to the Fabric Copilot capacity instead of to the capacity that holds their content.

By default, Fabric bills Copilot usage to whichever capacity holds a user's content, which spreads Copilot costs across the capacities in your organization. A Fabric Copilot capacity brings that consumption together, so you can bill and monitor all Copilot usage through one capacity, including usage from Power BI Desktop and from Pro and Premium per-user (PPU) workspaces.

This article explains how a Fabric Copilot capacity works, the scenarios it supports, and what you do to set one up.

## Supported scenarios

If you're assigned to a Fabric Copilot capacity, you can use it in these scenarios:

* Copilot on Power BI Desktop.

* Copilot in Power BI on a Pro or Premium per-user (PPU) workspace, or a Fabric capacity workspace.

* Fabric Copilot on these supported workloads in a Fabric capacity workspace where the capacity SKU is smaller than F64.
  * Data Factory
  * Data Engineering
  * Data Warehouse
  * Data Science
  * Real-Time Intelligence
  * Activator

* Data agents on a Fabric capacity workspace where the capacity SKU is smaller than F64.

## How Fabric Copilot capacity works

Enabling a Fabric Copilot capacity involves both the Fabric administrator and the capacity administrator:

* The Fabric administrator [enables Copilot](../admin/service-admin-portal-copilot.md) for users within the organization.

* The Fabric administrator authorizes capacity administrators to [designate their capacity as a Copilot capacity](../admin/service-admin-portal-copilot.md).

* The capacity administrator assigns a group of users as [Fabric Copilot capacity users](../admin/capacity-settings.md) on their capacity.

After a user is assigned to a Fabric Copilot capacity, they don't need to take any extra steps. Fabric bills their Copilot usage to the assigned capacity automatically.

## Considerations and limitations

* Fabric Copilot capacity is supported only in the Fabric tenant's home region.

* The Fabric Copilot capacity must reside on at least an F2 or P1 [SKU](licenses.md#capacity).

* Users assigned to a Fabric Copilot capacity can use Copilot with Power BI on workspaces with the following license modes: **Pro**, **Trial**, **Premium per-user (PPU)**, **Premium capacity**, and **Fabric capacity**. Capacities with the **Embedded** license mode aren't supported.

* Only one Fabric Copilot capacity is supported per user. If a user is assigned to multiple Copilot capacities, the most recently created Copilot capacity registers the user's Copilot usage.

* Fabric processes data in the region where you use Copilot and data agents. Usage and billing records that contain the metadata of the Fabric items or workspaces are available to the Copilot capacity administrator.

* Fabric Copilot capacity doesn't support Fabric AI functions. For more information, see [prerequisites for AI functions](../data-science/ai-functions/overview.md).

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)

* [Manage your Fabric capacity](../admin/capacity-settings.md)
