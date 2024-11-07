---
title: Enable Activator
description: Learn how to enable Activator in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 09/22/2024
---

# Enable Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

[[!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](../real-time-intelligence/data-activator/data-activator-get-started.md) is a preview Microsoft Fabric feature. To enable this feature for your organization, use the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] admin switch.

You can enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for:

* **Your tenant** - Use this option to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for everyone in the tenant.

* **A specific capacity** - Use this option if you want to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for users in a specific capacity.

In both cases, you can use security groups to provide access to a specified list of users.

## Prerequisites

To enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], you need to have the *Fabric administrator* role.

## Enable for your tenant

When you enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] using the tenant setting, users can use [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] in that [tenant](../enterprise/licenses.md#tenant). Depending on the configuration you select, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] becomes available for everyone in the tenant, or to a selected group of users.

>[!Note]
>You, or other admins, can override the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] setting at the [capacity level](#enable-for-a-capacity).

In your tenant, you can enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for:

* **The entire organization** - In most cases your organization has one tenant, so selecting this option enables [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for the entire organization. In organizations that have several tenants, if you want to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for the entire organization, you need to enable it in each tenant.

* **Specific security groups** - Use this option to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for specific users. You can either specify the security groups that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] will be enabled for, or the security groups that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] won't be available for.

Follow these steps to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for your tenant.

1. Navigate to the [tenant settings](tenant-settings-index.md) in the admin portal and in *Microsoft Fabric*, expand **[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] (preview)**.

2. Enable the **[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] (preview)** switch.

3. (Optional) Use the **Specific security groups** option to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for specific users. You can also use the **Except specific security groups** option, to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for the tenant, and exclude specific users.

4. Select **Apply**.

>[!NOTE]
>The *Delegate settings to other admins* option, isn't available.

### Enable for a capacity

Consider the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] setting a recommendation for the entire organization. Capacity admins can override this setting, depending on their needs. For example, because [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is in preview, your organization decided not to enable it. However, your organization also has a group of highly advanced developers who want to experiment with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. In such cases, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can be enabled at the capacity level.

Follow these steps to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for a specific capacity.

1. Navigate to the [capacity settings](capacity-settings.md) in the admin portal.

2. Select the capacity you want to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for.

3. Select the **Delegate tenant settings** tab.

4. Expand the *[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] (Preview)* setting.

5. Check the **Override tenant admin selection** checkbox and verify that the **[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] (preview)** setting is enabled.

6. (Optional) Use the **Specific security groups** option to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for specific users. You can also use the **Except specific security groups** option, to enable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for the capacity, and exclude specific users.

7. Select **Apply**.

## Can I disable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?

To disable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)], you can turn off the *[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] (Preview)* admin switch. If you disable [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] for a specific capacity while it's available in your organization, your selection will only affect that capacity.

## Related content

* [Enable Microsoft Fabric for your organization](fabric-switch.md)
* [Admin overview](microsoft-fabric-admin.md)
