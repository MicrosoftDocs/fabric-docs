---
title: Enable Microsoft Fabric for your organization
description: Learn how to enable Microsoft Fabric for your organization.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 08/27/2026
ai-usage: ai-assisted
---

# Enable Microsoft Fabric for your organization

When you enable [Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md) for your organization, users can create Fabric items such as lakehouses, notebooks, and warehouses. Two things make this possible: a tenant configuration that allows users to create Fabric items, and capacity that supports Fabric workloads. A Fabric administrator controls the tenant configuration through the **Users can create Fabric items** setting.

You also need capacity that supports Fabric workloads. Fabric workloads can run on an Azure F SKU capacity, an existing Power BI Premium P SKU capacity, or a Fabric trial capacity. Per-user licenses such as Power BI Pro and PPU don't provide Fabric capacity. If your organization needs an Azure F SKU capacity, see [buy Fabric capacity in Azure](../enterprise/buy-capacity.md).

This article explains how to configure the tenant so users can create Fabric items.

>[!NOTE]
> * Power BI is part of Fabric. The Power BI portal mentioned in this article is now the Fabric portal.
> * Fabric availability is restricted in some regions. For more information, see [Fabric region availability](./region-availability.md).

## Prerequisites

To enable Fabric, you need to have the *Fabric administrator* Microsoft Entra role.

## Enable Fabric for your tenant

When you enable Fabric using the tenant setting, users can create Fabric items in that [tenant](../enterprise/licenses.md#tenant), unless capacity admins turn it off for a specific capacity.

In your tenant, you can enable Fabric for:

* **The entire organization** - In most cases your organization has one tenant, so selecting this option enables it for the entire organization. In organizations that have several tenants, if you want to enable Fabric for the entire organization, you need to enable it in each tenant.

* **Specific security groups** - Use this option to enable Fabric for specific users. You can either specify the security groups that Fabric will be enabled for, or the security groups that Fabric won't be available for.

Follow these steps to enable Fabric for your tenant.

1. In the Power BI portal, navigate to the [tenant settings](tenant-settings-index.md) in the admin portal and in *Microsoft Fabric*, expand **Users can create Fabric items**.

2. Enable the **Users can create Fabric items** switch.

3. (Optional) Use the **Specific security groups** option to enable Fabric for specific users. You can also use the **Except specific security groups** option, to exclude specific users.

4. Select **Apply**.

>[!NOTE]
>The *Delegate settings to other admins* option, isn't available because it's automatically delegated to capacity admins.

## Enable Fabric for a capacity

Consider the Fabric setting at the tenant level a recommendation for the entire organization. Capacity admins can override this setting, depending on their needs. For example, Fabric can be enabled for all the users in your organization. However, for security reasons your organization decided to disable Fabric for a specific capacity. In such cases, Fabric can be disabled for that capacity.

Follow these steps to enable Fabric for a specific capacity.

1. Navigate to the [capacity settings](capacity-settings.md) in the admin portal.

2. Select the capacity you want to enable Fabric for.

3. Select the **Delegate tenant settings** tab, and under **Fabric**, expand the **Users can create Fabric items** setting.

4. Check the **Override tenant admin selection** checkbox and verify that the **Users can create Fabric items** setting is enabled.

5. (Optional) Use the **Specific security groups** option to enable Fabric for specific users. You can also use the **Except specific security groups** option, to enable Fabric for the capacity, and exclude specific users.

6. Select **Apply**.

## Can I disable Microsoft Fabric?

To disable Fabric, you can turn off the *Microsoft Fabric* admin switch. After disabling Fabric, users will have view permissions for Fabric items. If you disable Fabric for a specific capacity while Fabric is available in your organization, your selection will only affect that capacity.

## Considerations for Fabric items

In some cases, users that don't have Fabric enabled will be able to view Fabric items and icons.

Users that don't have Fabric enabled, can:

* View Fabric items created by other users in the same workspace, as long as they have at least read-only access to that workspace.

* View Fabric icons in capacities where other users have Fabric enabled, as long as they have at least read-only access to that capacity.

## Related content

* [Admin overview](admin-overview.md)
