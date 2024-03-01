---
title: Enable Data Activator
description: Learn how to enable Data Activator in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/07/2023
---

# Enable Data Activator

[Data Activator](../data-activator/data-activator-get-started.md) is preview Microsoft Fabric feature. To enable this feature for your organization, use the Data Activator admin switch.

You can enable Data Activator for:

* **Your tenant** - Use this option to enable Data Activator for everyone in the tenant.

* **A specific capacity** - Use this option if you want to enable Data Activator for users in a specific capacity.

In both cases, you can use security groups to provide access to a specified list of users.

## Prerequisites

To enable Data Activator, you need to have one of the following admin roles:

* [Microsoft 365 Global admin](microsoft-fabric-admin.md#microsoft-365-admin-roles)

* [Power Platform admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

* [Fabric admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Enable for your tenant

When you enable Data Activator using the tenant setting, users can use Data Activator in that [tenant](../enterprise/licenses.md#tenant). Depending on the configuration you select, Data Activator becomes available for everyone in the tenant, or to a selected group of users.

>[!Note]
>You, or other admins, can override the the Data Activator setting at the [capacity level](#enable-for-a-capacity).

In your tenant, you can enable Data Activator for:

* **The entire organization** - In most cases your organization has one tenant, so selecting this option enables Data Activator for the entire organization. In organizations that have several tenants, if you want to enable Data Activator for the entire organization, you need to enable it in each tenant.

* **Specific security groups** - Use this option to enable Data Activator for specific users. You can either specify the security groups that Data Activator will be enabled for, or the security groups that Data Activator won't be available for.

Follow these steps to enable Data Activator for your tenant.

1. Navigate to the [tenant settings](tenant-settings-index.md) in the admin portal and in *Microsoft Fabric*, expand **Data Activator (preview)**.

2. Enable the **Data Activator (preview)** switch.

3. (Optional) Use the **Specific security groups** option to enable Data Activator for specific users. You can also use the **Except specific security groups** option, to enable Data Activator for the tenant, and exclude specific users.

4. Select **Apply**.

>[!NOTE]
>The *Delegate settings to other admins* option, isn't available.

### Enable for a capacity

Consider the Data Activator setting a recommendation for the entire organization. Capacity admins can override this setting, depending on their needs. For example, because Data Activator is in preview, your organization decided not to enable it. However, your organization also has a group of highly advanced developers who want to experiment with Data Activator. In such cases, Data Activator can be enabled at the capacity level.

Follow these steps to enable Data Activator for a specific capacity.

1. Navigate to the [capacity settings](service-admin-portal-capacity-settings.md) in the admin portal.

2. Select the capacity you want to enable Data Activator for.

3. Select the **Delegate tenant settings** tab.

4. Expand the *Data Activator (Preview)* setting.

5. Check the **Override tenant admin selection** checkbox and verify that the **Data Activator (preview)** setting is enabled.

6. (Optional) Use the **Specific security groups** option to enable Data Activator for specific users. You can also use the **Except specific security groups** option, to enable Data Activator for the capacity, and exclude specific users.

7. Select **Apply**.

## Can I disable Data Activator?

To disable Data Activator, you can turn off the *Data Activator (Preview)* admin switch. If you disable Data Activator for a specific capacity while it's available in your organization, your selection will only affect that capacity.

## Related content

* [Enable Microsoft Fabric for your organization](fabric-switch.md)
* [Admin overview](microsoft-fabric-admin.md)
