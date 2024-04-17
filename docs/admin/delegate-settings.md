---
title: Delegate settings
description: Learn how you can delegate settings in the Microsoft Fabric admin portal, from the tenant to the capacity, and from the capacity to workspaces.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.date: 11/16/2023
---

# Delegate settings

Microsoft Fabric allows organizations to delegate settings from the tenant to the capacity, and from the capacity to workspaces. Delegation allows the organization to give admins control over specific settings relevant for their area of responsibility. Delegation prevents centralized admins from becoming a bottle neck for teams across the organization that require control over specific settings.

For example, **RK to provide**

## Delegation hierarchy

Fabric provides the following hierarchy for delegating settings:

1. **Tenant settings** - Tenant settings can be delegated to the capacities in the tenant.

2. **Capacity settings** - Capacity admins settings can be delegated to the workspaces in the capacity.

### Tenant settings

[Global administrators](../admin/microsoft-fabric-admin.md#microsoft-365-admin-roles), [Power Platform administrators](../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles), and [Fabric administrators](../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) can control the organization's [tenant settings](../admin/about-tenant-settings.md). The admin that controls the tenant settings can delegate settings to the tenants capacities, as described in [How to use the tenant settings](../admin/about-tenant-settings.md#how-to-use-the-tenant-settings).

### Capacity settings

Capacity administrators can delegate the settings available to them in the capacity. Capacity admins can also override tenant settings, allowing them to create a capacity with settings that are different from the settings in other capacities in the tenant.

For example **RK to provide**

Delegate capacity settings, follow the steps described in <article to be published shortly>

### Domain ???

### Workspace settings

[Workspace admins](../get-started/roles-workspaces.md#roles-in-workspaces-in-microsoft-fabric) can control the settings available to them in the workspace. These settings depend on the settings delegated to the workspace by the capacity admin. 

## Related content

* [What is the admin monitoring workspace?](monitoring-workspace.md)
* [Workspace tenant settings](portal-workspace.md)
* [Manage workspaces](portal-workspaces.md)
