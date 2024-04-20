---
title: Delegate tenant settings
description: Learn how you can delegate settings in the Microsoft Fabric admin portal, from the tenant to the capacity, and from the capacity to workspaces.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 11/16/2023
# customer intent: Learn how to delegate settings in the Microsoft Fabric admin portal.
---

# Delegate tenant settings

Microsoft Fabric allows organizations to delegate settings from the tenant to the capacity, and from the capacity to workspaces. Delegation allows the organization to give admins control over specific settings relevant for their area of responsibility. Delegation prevents centralized admins from becoming a bottle neck for teams across the organization that require control over specific settings.

Here are some key concepts related to delegating settings in Fabric:

* [Tenant Settings](../admin/about-tenant-settings.md) - Global settings controlled by tenant administrators that impact the entire tenant.

* [Domain](../governance/domains.md) - A logical grouping of workspaces aimed at facilitating data mesh architecture.

* [Capacity](../enterprise/licenses.md#capacity) - A dedicated compute resource. Capacity admins can delegate settings concerning the performance and consumption of compute resources.  

* [Workspace](../get-started/workspaces.md) - Collaborative environments where Fabric items are stored and shared. Certain tenant settings can be delegated to workspaces through a domain or a capacity.  

Domain, capacity and workspace admins can override tenant settings. Overriding tenant settings allows admins to modify their environment to meet their specific requirements. When a setting is adjusted at the domain or capacity level, it affects only the workspaces linked to those administrative units. Similarly, changes at the workspace level impact only the items stored within that workspace.

## Delegation Design

A setting can be delegated either through domains or capacities, but not both. This ensures clarity in governance and prevents conflicts in the management of settings.

After delegating to a domain or a capacity, certain settings can be further delegated to workspaces. This allows for finer granularity in control, empowering workspace owners to customize the settings to their requirements. Tenant admins can bypass domain and capacity admins and delegate directly to workspaces.

## Delegate settings to domains and capacities

Follow these steps to delegate settings to domains and capacities:

1. In Fabric, go to [tenant Settings](../admin/about-tenant-settings.md#how-to-get-to-the-tenant-settings).

2. Select the setting you want to delegate, and select *Domain* or *Capacity*.

3. Select the domain, capacity, and workspace you want to delegate the setting to.

4. Select **Apply**.

## Delegate settings to workspaces

Follow these steps to delegate settings to workspaces:

1. Delegate tenant settings to a [capacity or a domain](#delegate-settings-to-domains-and-capacities).

2. Locate setting you want to delegate to a workspace in your domain or capacity.

3. Select the option to delegate to a workspaces. Some settings can't be delegated to workspaces. In such cases, there isn't an option to delegate to a workspace.

4. Select **Apply**

## Audit your delegated settings

The following [activity events](../admin/track-user-activities.md) represent tenant setting changes:

* **UpdatedAdminFeatureSwitch** - Tenant delegation changes.

* **UpdateCapacityTenantSettingDelegation** - Capacity delegation changes.

* **UpdateDomainTenantSettingDelegation** - Domain delegation changes.

* **UpdateWorkspaceTenantSettingDelegation** - Workspace delegation changes.

## Related content

* [What is the admin monitoring workspace?](monitoring-workspace.md)

* [Workspace tenant settings](portal-workspace.md)

* [Manage workspaces](portal-workspaces.md)
