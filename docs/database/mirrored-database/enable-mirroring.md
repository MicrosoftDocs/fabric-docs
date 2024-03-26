---
title: "Enable Mirroring"
description: Learn how to enable Mirroring in your Fabric tenant.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: cynotebo
ms.date: 03/18/2024
ms.service: fabric
ms.topic: how-to
---
# Enable Mirroring

To enable this feature for your organization, use the Database Mirroring admin switch.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

You can enable Mirroring for:

- **Your tenant** - Use this option to enable Mirroring for everyone in the tenant.
- **A specific capacity** - Use this option if you want to enable Mirroring for users in a specific capacity.

In both cases, you can use security groups to provide access to a specified list of users.

## Prerequisites

To enable Mirroring, you need to be a member of one of the following admin roles:

- [Microsoft 365 Global admin](../../admin/microsoft-fabric-admin.md#microsoft-365-admin-roles)
- [Power Platform admin](../../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)
- [Fabric admin](../../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Enable Mirroring for your tenant

In your tenant, you can enable Mirroring for:

 **The entire organization** - In most cases your organization has one tenant, so selecting this option enables Mirroring for the entire organization. In organizations that have several tenants, if you want to enable Mirroring for the entire organization, you need to enable it in each tenant.

 **Specific security groups** - Use this option to enable Mirroring for specific users. You can either specify the security groups that Mirroring will be enabled for, or the security groups that Mirroring won't be available for.

Follow these steps to enable Mirroring for your tenant.

1. Navigate to the [tenant settings](../../admin/tenant-settings-index.md) in the admin portal and in **Microsoft Fabric**, expand **Mirroring (preview)**.
1. Enable the **Mirroring (preview)** switch.
1. (Optional) Use the **Specific security groups** option to enable Mirroring for specific users. You can also use the **Except specific security groups** option, to enable Mirroring for the tenant, and exclude specific users.
1. Select **Apply**.

## Enable Mirroring for a capacity

Capacity admins can override this setting, depending on their needs. For example, because Mirroring is in preview, your organization decided not to enable it. However, your organization also has a group of developers who want to experiment with mirrored databases. In such cases, Mirroring can be enabled at the capacity level.

Follow these steps to enable Database Mirroring for a specific capacity.

1. Navigate to the [capacity settings](../../admin/service-admin-portal-capacity-settings.md) in the admin portal.
1. Select the capacity where you want to enable Mirroring.
1. Select the **Delegate tenant settings** tab.
1. Expand the **Mirroring (Preview)** setting.
1. Check the **Override tenant admin selection** checkbox and verify that the **Mirroring (preview)** setting is enabled.
1. (Optional) Use the **Specific security groups** option to enable Mirroring for specific users. You can also use the **Except specific security groups** option, to enable Mirroring for the capacity, and exclude specific users.
1. Select **Apply**.

## Disable Mirroring

To disable Mirroring, you can disable the **Mirroring (Preview)** admin switch.

If you disable Mirroring for a specific capacity while it's available in your organization, your selection will only affect that capacity.

## Considerations

In some cases, users that don't have permissions to create mirrored databases will still be able to view Mirroring items and icons.

Users that don't have Mirroring enabled, can:

- View mirrored databases created by other users in the same workspace, as long as they have at least read-only access to that workspace.
- View Mirroring icons in capacities where Mirroring has been enabled by an Admin, as long as they have at least read-only access to that capacity.

## Tutorials

Next, configure mirroring from your source database.

- [Tutorial: Azure Cosmos DB](azure-cosmos-db-tutorial.md)
- [Tutorial: Azure SQL Database](azure-sql-database-tutorial.md)
- [Tutorial: Snowflake](snowflake-tutorial.md)

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Enable Microsoft Fabric for your organization](../../admin/fabric-switch.md)
- [What is Microsoft Fabric admin?](../../admin/microsoft-fabric-admin.md)
