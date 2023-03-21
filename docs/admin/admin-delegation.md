---
title: Delegate admin settings
description: Learn how to delegate admin settings.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 12/27/2022
---

# Delegate admin settings

As a A [Microsoft Fabric] admin for the tenant, you can delegate [admin settings](tbd) in your organization. For example, if you're organization is divided into groups such as *sales*, *marketing* and *finance*, you can create sup-admins for those groups. Sub-admins who sit within a group, a better suited to make admin decisions relating to the group's needs. Typically, you'd want to grant sup-admins, who are usually domain or capacity admins, the ability to override the global settings that you dictate. As a tenant admin, if needed due to company policy for example, you can turn off certain admin settings, preventing domain and capacity admins in your tenant from accessing them.

There are four levels of admin settings:

* **Tenant** - A [Microsoft Fabric] admin for the tenant. Has access to all the admin settings.

* **Domain** - A [domain admin](tbd) has access to all the admin settings except those blocked by the tenant admin.

* **Capacity** - A [capacity admin](tbd) has access to all the admin settings except those blocked by the tenant admin.

* **Workspace** - A [workspace admin](tbd) has access to the 

## How to delegate

Admin settings have an admin switch that allows you to turn the setting on or off for the entire organization. By default, all the admin settings are turned on for the entire organization. New settings are also turned on for the entire organization by default.

>[!NOTE]
>Turning on or off setting switches is performed at the tenant level. If your organization has multiple tenants, turning on or off a setting effects all the users in the tenant (and not in the entire organization).

### Tenant

Most admin settings are turned on by default for the entire organization. You can edit these settings at a tenant setting level.

1. In the *Admin center*, go to **Tenant settings**.

2. Expand the setting you want to edit and use the following settings:

    * **On/off switch** - Enable or disable delegation for this setting. When the switch is turned *off*, Capacity and domain admins will see disabled settings greyed out.

    * **Apply to** - Apply the delegation of the settings to the entire organization or use security groups to to decide who gets permissions for the setting.

    * **Delegate setting to other admins** - Select which admin groups the setting is delegated to.

The table below shows which capabilities are granted to other admins in your organization.

|Capacity checkbox  |Workspace checkbox  |Domain/capacity admin can override admin setting |Domain/capacity admin can override workspace delegation |Workspace admin can override admin setting  |
|---------|---------|---------|---------|---|
|Off     |Off         |No         |No         |No  |
|On     |Off         |Yes         |No         |No, unless the parent capacity or domain admin overrides the tenants admin's delegation preference  |
|Off     |On         |No         |No         |Yes  |
|On     |On         |Yes         |Yes         |Yes, if permitted by the parent capacity or domain admin  |

### Capacity and Domain

As a capacity or domain admin, you can do one of the following:

* **View** - View admin settings that are blocked by the tenant admin.

* **Override** - Override the settings of all the admin settings that are not blocked. You can turn on or off admin settings that are not blocked by the tenant admin.

* **Delegate** - You can delegate admin settings that are not blocked, to workspace admins.

#### Override admin settings



#### Delegate admin settings



### Workspace

A workspace admin, can view all the settings in the organization. 

## Next steps

>[!div class="nextstepaction"]
>[Admin overview](admin-overview.md)
