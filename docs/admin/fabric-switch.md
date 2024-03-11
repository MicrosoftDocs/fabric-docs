---
title: Enable Microsoft Fabric for your organization
description: Learn how to enable Microsoft Fabric for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/07/2023
---

# Enable Microsoft Fabric for your organization

The [Microsoft Fabric](../get-started/microsoft-fabric-overview.md) admin switch lets organizations that use Power BI enable Microsoft Fabric.

>[!NOTE]
>Microsoft Fabric availability is restricted in some regions. For more information, see [Fabric region availability](./region-availability.md).

You can enable Microsoft Fabric for:

* **Your tenant** - Use this option to enable Microsoft Fabric for everyone in the tenant.

* **A specific capacity** - Use this option if you want to enable Microsoft Fabric for users in a specific capacity.

In both cases, you can use security groups to provide Microsoft Fabric access to a specified list of users.

## Prerequisites

To enable Microsoft Fabric, you need to have one of the following admin roles:

* [Microsoft 365 Global admin](microsoft-fabric-admin.md#microsoft-365-admin-roles)

* [Power Platform admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

* [Fabric admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Enable for your tenant

When you enable Microsoft Fabric using the tenant setting, users can create Fabric items in that [tenant](../enterprise/licenses.md#tenant), unless capacity admins turned it off for a specific capacity. Depending on the configuration you select, Microsoft Fabric becomes available for everyone in the tenant, or to a selected group of users.

>[!Note]
>You, or other admins, can override the Microsoft Fabric setting at the [capacity level](#enable-for-a-capacity).

In your tenant, you can enable Microsoft Fabric for:

* **The entire organization** - In most cases your organization has one tenant, so selecting this option enables it for the entire organization. In organizations that have several tenants, if you want to enable Microsoft Fabric for the entire organization, you need to enable it in each tenant.

* **Specific security groups** - Use this option to enable Microsoft Fabric for specific users. You can either specify the security groups that Microsoft Fabric will be enabled for, or the security groups that Microsoft Fabric won't be available for.

Follow these steps to enable Microsoft Fabric for your tenant.

1. Navigate to the [tenant settings](tenant-settings-index.md) in the admin portal and in *Microsoft Fabric*, expand **Users can create Fabric items**.

2. Enable the **Users can create Fabric items** switch.

3. (Optional) Use the **Specific security groups** option to enable Microsoft Fabric for specific users. You can also use the **Except specific security groups** option, to exclude specific users.

4. Select **Apply**.

>[!NOTE]
>The *Delegate settings to other admins* option, isn't available because it's automatically delegated to capacity admins.

### Enable for a capacity

Consider the Microsoft Fabric setting at the tenant level a recommendation for the entire organization. Capacity admins can override this setting, depending on their needs. For example, Fabric can be enabled for all the users in your organization. However, for security reasons your organization decided to disable Fabric for a specific capacity. In such cases, Microsoft Fabric can be disabled for that capacity.

Follow these steps to enable Microsoft Fabric for a specific capacity.

1. Navigate to the [capacity settings](service-admin-portal-capacity-settings.md) in the admin portal.

2. Select the capacity you want to enable Microsoft Fabric for.

3. Select the **Delegate tenant settings** tab, and under **Microsoft Fabric**, expand the **Users can create Fabric items** setting.

4. Check the **Override tenant admin selection** checkbox and verify that the **Users can create Fabric items** setting is enabled.

5. (Optional) Use the **Specific security groups** option to enable Microsoft Fabric for specific users. You can also use the **Except specific security groups** option, to enable Microsoft Fabric for the capacity, and exclude specific users.

6. Select **Apply**.

## Can I disable Microsoft Fabric?

To disable Microsoft Fabric, you can turn off the *Microsoft Fabric* admin switch. After disabling Microsoft Fabric, users will have view permissions for Microsoft Fabric items. If you disable Microsoft Fabric for a specific capacity while Microsoft Fabric is available in your organization, your selection will only affect that capacity.

## Considerations

In some cases, users that don't have Microsoft Fabric enabled will be able to view Microsoft Fabric items and icons.

Users that don't have Microsoft Fabric enabled, can:

* View Microsoft Fabric items created by other users in the same workspace, as long as they have at least read-only access to that workspace.

* View Microsoft Fabric icons in capacities where other users have Microsoft Fabric enabled, as long as they have at least read-only access to that capacity.

## Related content

* [Admin overview](microsoft-fabric-admin.md)
* [Enable Data Activator](data-activator-switch.md)
