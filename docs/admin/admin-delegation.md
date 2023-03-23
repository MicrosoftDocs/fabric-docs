---
title: Delegate tenant settings
description: Learn how to delegate tenant settings.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 12/27/2022
---

# Delegate tenant settings

As a [Microsoft 365 Global admin](admin-overview.md#microsoft-365-admin-roles), a [Power Platform or a Microsoft Fabric admin](admin-overview.md#power-platform-and-microsoft-fabric-admin-roles), you can delegate [tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings) in your organization. For example, if your organization is divided into groups such as *sales*, *marketing* and *finance*, you can create sup-admins for those groups. Subadmins who sit within a group, a better suited to make admin decisions inline with the group's needs. Domain and capacity admins can also have subadmins operating under them. For example, the *sales* group in your organization, may be further divided into regions, each with its own workspace. Typically, you'd want to grant sup-admins, the ability to override the global settings that you dictate.

There are three levels of tenant settings:

* **Tenant** - A [Microsoft 365 Global admin](admin-overview.md#microsoft-365-admin-roles), a [Power Platform or a Microsoft Fabric admin](admin-overview.md#power-platform-and-microsoft-fabric-admin-roles), also know as a *tenant admin*. Has access to all the tenant settings. If needed due to company policy for example, you can turn off certain tenant settings, preventing domain and capacity admins in your tenant from accessing them.

* **Domain** and **Capacity** - A [domain admin](/power-bi/developer/visuals/create-r-based-power-bi-desktop) or a [capacity admin](admin-overview.md#capacity-admin-roles) have access to all the tenant settings except settings that are turned off by the tenant admin, and [auto delegated tenant settings](#auto-delegated-tenant-settings)

* **Workspace** - A [workspace admin](/power-bi/developer/visuals/create-r-based-power-bi-desktop) has access to the settings that aren't blocked by the tenant, domain or capacity admins.

## How to delegate

Tenant settings have a switch that allows you to turn the setting on or off for the entire organization. By default, all the tenant settings are turned on for the entire organization. New settings are also turned on for the entire organization by default.

>[!NOTE]
>Turning on or off setting switches is performed at the tenant level. If your organization has multiple tenants, turning a setting on or off, effects all the users in the tenant (and not in the entire organization).

### Tenant

Most tenant settings are turned on for the entire organization by default. You can edit these settings at a tenant setting level.

1. In the *Admin center*, go to **Tenant settings**.

2. Expand the setting you want to edit and use the following settings:

    * **On/off switch** - Enable or disable delegation for this setting. When the switch is turned *off*, capacity and domain admins see the disabled setting greyed out.

    * **Apply to** - Apply the delegation of the settings to the entire organization or use security groups to decide who gets permissions for the setting.

    * **Delegate setting to other admins** - Select to delegate the setting to capacity, domain or workspace admins.

### Capacity and Domain

When a capacity or domain admin views a tenant setting, its state reflects the tenant admin's selection.

As a capacity or domain admin, you can do one of the following:

* **View** - View tenant settings that are turned off by the tenant admin.

* **Override** - Overriding setting lets you turn on or off [auto delegated tenant settings](#auto-delegated-tenant-settings).

* **Delegate** - You can delegate tenant settings you have access to, to workspace admins.

The table below shows which capabilities are available for the domain, capacity and workspace admins in your organization.

|Capacity checkbox  |Workspace checkbox  |Domain/capacity admin can override tenant setting |Domain/capacity admin can override workspace delegation |Workspace admin can override tenant setting  |
|---------|---------|---------|---------|---|
|Not selected     |Not selected        |No         |No         |No  |
|Selected     |Not selected         |Yes         |No         |No, unless the parent capacity or domain admin overrides the tenants admin's delegation preference  |
|Not selected     |Selected         |No         |No         |Yes  |
|Selected     |Selected         |Yes         |Yes         |Yes, if permitted by the parent capacity or domain admin  |

### Workspace

A workspace admin, can turn on tenant settings for the workspace, providing they're not blocked by the capacity, domain or tenant admin.

## Auto delegated tenant settings

Auto delegated tenant settings are always available for everyone. Tenant admins can define the default value of the tenant setting, but they can't stop other admins from overwriting these definitions.

Capacity and domain admins can select the *override tenant level settings* to override the tenant admin's suggestion. Workspace admins can also override the tenant setting providing it isn't blocked by a capacity or domain admin.

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
