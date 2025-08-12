---
title: "Enable SQL database"
description: Learn how to enable the SQL database feature in your Fabric tenant settings.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur, dlevy
ms.date: 01/16/2025
ms.topic: how-to
ms.custom: sfi-ga-nochange
ms.search.form: product-databases
---
# Enable SQL database in Fabric using Admin Portal tenant settings

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

To enable this feature for your organization, use the SQL database admin switch.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

You can enable SQL database for:

- **Your tenant** - Use this option to enable SQL database for everyone in the tenant.
- **A specific capacity** - Use this option if you want to enable SQL database for users in a specific capacity.

In both cases, you can use security groups to provide access to a specified list of users.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Review [Fabric region availability](../../admin/region-availability.md).
- To enable SQL database, you need to be a member of one of the following admin roles:
  - [Microsoft 365 Global admin](../../admin/microsoft-fabric-admin.md#microsoft-365-admin-roles)
  - [Power Platform admin](../../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)
  - [Fabric admin](../../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Enable SQL database for your tenant

In your tenant, you can enable SQL database for:

 **The entire organization** - In most cases your organization has one tenant, so selecting this option enables SQL database for the entire organization. In organizations that have several tenants, if you want to enable SQL database for the entire organization, you need to enable it in each tenant.

 **Specific security groups** - Use this option to enable SQL database for specific users. You can either specify the security groups that SQL database will be enabled for, or the security groups that SQL database won't be available for.

Follow these steps to enable SQL database for your tenant.

1. Navigate to the [tenant settings](../../admin/tenant-settings-index.md) in the admin portal and in **Microsoft Fabric**, expand **Users can create Fabric items** and **SQL database (preview)**.
1. Enable the **Users can create Fabric items** and **SQL database (preview)** switches.

1. (Optional) Use the **Specific security groups** option to enable SQL database for specific users.
    - You can select **The entire organization** if you want everyone to create databases.
    - You can select **Specific security groups** to allow selected individuals in a group to create databases.
    - You can select **Except specific security groups** to block the access to create databases for individuals in that group. This option takes precedence over the previous one, if a user belongs to an included group and an excluded group, the individual would be blocked from creating databases.
    - Select **Capacity admins can enable/disable** if you want capacity admins to manage the control of who can access the SQL database workload.
1. Select **Apply**.

## Enable SQL database for a capacity

Capacity admins can override this setting, depending on their needs. For example, your organization might decide not to enable SQL database experience for everyone at tenant level but allow the usage of SQL database in a specific capacity. This lets your organization allow a group of developers try out SQL database in a specific capacity in a more controlled manner.

[!INCLUDE [tenant-region-availability-note](../../includes/tenant-region-availability-note.md)]

Follow these steps to enable SQL database in Microsoft Fabric for a specific capacity:

1. Navigate to the [capacity settings](../../admin/service-admin-portal-capacity-settings.md) in the admin portal.
1. Select the capacity where you want to enable SQL database.
1. Select the **Delegate tenant settings** tab.
1. Expand the **SQL database (preview)** setting.
1. Check the **Override tenant admin selection** checkbox and verify that the **SQL database (preview)** setting is enabled.
1. (Optional) Use the **Specific security groups** option to enable SQL database for specific users.
    - Select **All the users in capacity** if you want everyone to be able to create databases.
    - Select **Specific security groups** to allow selected individuals in a group to create databases.
    - You can also select **Except specific security groups** to block from creating the databases. This option takes precedence over the previous one, if a user belongs to an included group and an excluded group, the individual would be blocked from creating databases.
1. Select **Apply**.

## Disable SQL database

To disable SQL database, you can disable the **SQL database (preview)** admin switch.

If you disable SQL database for a specific capacity while it's available in your organization, your selection will only affect that capacity.

When SQL database not enabled in tenant settings, users who try to create a new SQL database will receive the error message "SQL database failed to create." The tenant admin switch is ignored for trial capacities. To disable and disallow SQL database in Microsoft Fabric, also disable trial capacities in your tenant by turning off the ["Users can try Microsoft Fabric paid features" from the Fabric Admin portal](../../admin/service-admin-portal-help-support.md).

## Considerations

In some cases, users that don't have permissions to create databases will still be able to view SQL database items and icons.

Users that don't have SQL database enabled, can:

- View SQL databases created by other users in the same workspace, as long as they have at least read-only access to that workspace.
- View SQL database icons in capacities where SQL database has been enabled by an Admin, as long as they have at least read-only access to that capacity.

## Next step

> [!div class="nextstepaction"]
> [Create a SQL database in the Fabric portal](create.md)

## Related content

- [SQL database in Microsoft Fabric](overview.md)
- [Connect to your SQL database in Microsoft Fabric](connect.md)
