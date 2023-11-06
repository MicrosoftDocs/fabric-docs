---
title: Enable Microsoft Fabric for your organization
description: Learn how to enable Microsoft Fabric for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom: build-2023
ms.date: 11/02/2023
---

# Enable Microsoft Fabric for your organization

The [Microsoft Fabric](../get-started/microsoft-fabric-overview.md) admin switch lets organizations that use Power BI opt into Microsoft Fabric.

>[!NOTE]
>Microsoft Fabric availability is restricted in some regions. For more information, see [Fabric region availability](./region-availability.md).

You can enable Microsoft Fabric for:

* **Your tenant** - Use this option to be an early adopter of Microsoft Fabric.

* **A specific capacity** - Use this option if you want users in a specific capacity to try out Microsoft Fabric.

In both cases, you can use security groups to provide Microsoft Fabric access to a specified list of users.

>[!Tip]
>Unless an admin makes changes to the Microsoft Fabric admin switch settings, Microsoft Fabric will be turned on for all Power BI users on 1 July 2023.

## Prerequisites

To enable Microsoft Fabric, you need to have one of the following admin roles:

* [Microsoft 365 Global admin](microsoft-fabric-admin.md#microsoft-365-admin-roles)

* [Power Platform admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

* [Fabric admin](microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles)

## Enable for your tenant

When you enable Microsoft Fabric using the tenant setting, users can create Fabric items in that [tenant](../enterprise/licenses.md#tenant). Depending on the configuration you select, Microsoft Fabric becomes available for everyone in the tenant, or to a selected group of users.

>[!Note]
>You, or other admins, can override the the Microsoft Fabric setting at the [capacity level](#enable-for-a-capacity).

In your tenant, you can enable Microsoft Fabric for:

* **The entire organization** - In most cases your organization has one tenant, so selecting this option enables it for the entire organization. In organizations that have several tenants, if you want to enable Microsoft Fabric for the entire organization, you need to enable it in each tenant.

* **Specific security groups** - Use this option to enable Microsoft Fabric for specific users. You can either specify the security groups that Microsoft Fabric will be enabled for, or the security groups that Microsoft Fabric won't be available for.

Follow these steps to enable Microsoft Fabric for your tenant.

1. Navigate to the [tenant settings](tenant-settings-index.md) in the admin portal and in *Microsoft Fabric (Preview)*, expand the **Users can create Fabric items (public preview)**.

   :::image type="content" source="media/fabric-switch/fabric-switch.png" alt-text="Screenshot of the Microsoft Fabric tenant setting in the admin portal.":::

2. Uncheck the **Accept Microsoft's default selection (Off for the entire organization)** checkbox. You only need to uncheck the Microsoft's default selection when you enable the Microsoft Fabric setting for the first time.

   :::image type="content" source="media/fabric-switch/fabric-switch-accept.png" alt-text="Screenshot of the Microsoft Fabric tenant setting with the accept Microsoft's default selection checkbox unchecked.":::

3. Enable the **Users can create Fabric items (public preview)** switch.

   :::image type="content" source="media/fabric-switch/fabric-switch-enabled.png" alt-text="Screenshot of the Microsoft Fabric tenant setting with the users can create Fabric items enabled.":::

4. (Optional) Use the **Specific security groups** option to enable Microsoft Fabric for specific users. You can also use the **Except specific security groups** option, to enable Microsoft Fabric for the tenant, and exclude specific users.

   :::image type="content" source="media/fabric-switch/fabric-switch-security-groups.png" alt-text="Screenshot of the Microsoft Fabric tenant setting with the users can create Fabric items enabled, and the specific security groups option selected.":::

5. Select **Apply**.

>[!NOTE]
>The *Delegate settings to other admins* option, isn't available.

### Enable for a capacity

Consider the Microsoft Fabric setting a recommendation for the entire organization. Capacity admins can override this setting, depending on their needs. For example, because Microsoft Fabric is a preview product, your organization decided not to enable it. However, your organization also has a group of highly advanced developers who want to experiment with Microsoft Fabric. In such cases, Microsoft Fabric can be enabled at the capacity level.

Follow these steps to enable Microsoft Fabric for a specific capacity.

1. Navigate to the [capacity settings](service-admin-portal-capacity-settings.md) in the admin portal.

2. Select the capacity you want to enable Microsoft Fabric for.

3. Select the **Delegate tenant settings** tab, and under *Microsoft Fabric (Preview)*, expand the **Users can create Fabric items (public preview)** setting.

   :::image type="content" source="media/fabric-switch/fabric-capacity-switch.png" alt-text="Screenshot of the Delegated tenant settings tab in a selected capacity in the admin portal capacity settings. The users can create Fabric items setting is expanded.":::

4. Check the **Override tenant admin selection** checkbox and verify that the **Users can create Fabric items (public preview)** setting is enabled.

   :::image type="content" source="media/fabric-switch/fabric-capacity-switch-enabled.png" alt-text="Screenshot of a selected capacity in the admin portal capacity settings with the users can create Fabric items setting expanded.":::

5. (Optional) Use the **Specific security groups** option to enable Microsoft Fabric for specific users. You can also use the **Except specific security groups** option, to enable Microsoft Fabric for the capacity, and exclude specific users.

   :::image type="content" source="media/fabric-switch/fabric-capacity-switch-security-groups.png" alt-text="Screenshot of a selected capacity in the admin portal capacity settings with the users can create Fabric items setting expanded and the specific security groups option selected.":::

6. Select **Apply**.

## Can I disable Microsoft Fabric?

To disable Microsoft Fabric, you can turn off the *Microsoft Fabric (Preview)* admin switch. After disabling Microsoft Fabric, users will have view permissions for Microsoft Fabric items. If you disable Microsoft Fabric for a specific capacity while Microsoft Fabric is available in your organization, your selection will only affect that capacity.

## Considerations

In some cases, users that don't have Microsoft Fabric enabled will be able to view Microsoft Fabric items and icons.

Users that don't have Microsoft Fabric enabled, can:

* View Microsoft Fabric items created by other users in the same workspace, as long as they have at least read-only access to that workspace.

* View Microsoft Fabric icons in capacities where other users have Microsoft Fabric enabled, as long as they have at least read-only access to that capacity.

## Next steps

* [Admin overview](microsoft-fabric-admin.md)

* [What is the admin portal?](admin-center.md)
