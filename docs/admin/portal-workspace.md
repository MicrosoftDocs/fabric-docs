---
title: Workspace admin settings
description: Learn how to configure workspace tenant settings as a Fabric admin.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.custom:
  - tenant-setting
  - build-2023
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Workspace tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Create workspaces (new workspace experience)

Workspaces are places where users collaborate on dashboards, reports, and other content. [!INCLUDE [product-name](../includes/product-name.md)] admins can use the **Create workspaces (new workspace experience)** setting to designate which users in the organization can create workspaces. Admins can let everybody or nobody in an organization create workspaces. Workspace creation can also be limited to members of specific security groups. Learn more about [workspaces](../get-started/workspaces.md).

:::image type="content" source="media/portal-workspace/power-bi-admin-workspace-settings.png" alt-text="Screenshot showing Create a workspace.":::

For classic workspaces based on Microsoft 365 Groups, administration continues to occur in admin portal and Microsoft Entra ID.

> [!NOTE]
> The **Create workspaces (new workspace experience)** setting defaults to allowing only users who can create Microsoft 365 Groups to create the new [!INCLUDE [product-name](../includes/product-name.md)] workspaces. Be sure to set a value in the [!INCLUDE [product-name](../includes/product-name.md)] admin portal to ensure appropriate users can create them.

**List of workspaces**

The admin portal has another section of settings about the workspaces in your tenant. In that section, you can sort and filter the list of workspaces and display the details for each workspace. See [Manage workspaces](portal-workspaces.md) for details.

**Publish apps**

In the admin portal, you also control which users have permissions to distribute apps to the organization. See [Publish apps to the entire organization](service-admin-portal-app.md#publish-apps-to-the-entire-organization) for details.

## Use semantic models across workspaces

Admins can control which users in the organization can use semantic models across workspaces. When this setting is enabled, users still need the required Build permission for a specific semantic model.

:::image type="content" source="media/portal-workspace/power-bi-admin-datasets-workspaces.png" alt-text="Use semantic models across workspaces":::

For more information, see [Intro to semantic models across workspaces](/power-bi/connect-data/service-datasets-across-workspaces).

## Identify your workspace ID

The easiest way to find your workspace ID is in the URL of the Fabric site for an item in a workspace. As in Power BI, the Fabric URL contains the workspace ID, which is the unique identifier after `/groups/` in the URL, for example: `https://powerbi.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/...`. Alternatively, you can find the workspace ID in the Power BI Admin portal settings by selecting **Details** next to the workspace name.

## Block users from reassigning personal workspaces (My Workspace)

Personal workspaces are the My workspaces that every user has for their personal content. [!INCLUDE [product-name](../includes/product-name.md)] and capacity admins can [designate a preferred capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces). By default, however, My workspace owners can still change the capacity assignment of their workspace. If a [!INCLUDE [product-name](../includes/product-name.md)] or capacity admin designates a Premium capacity as the default capacity for My workspaces, but a My workspace owner then changes that capacity assignment back to shared capacity, this could result in non-compliance with data residency requirements.

To prevent such a scenario, the [!INCLUDE [product-name](../includes/product-name.md)] admin can turn on the **Block users from reassigning personal workspaces (My Workspace)** tenant setting. When this setting is on, My workspace owners can't change the capacity assignment of their My workspace.

To turn on the setting:
1. Go to the [!INCLUDE [product-name](../includes/product-name.md)] Admin portal and select **Tenant settings**.
1. In the tenant settings, scroll down to the **Workspace settings** section.
1. Find the setting called **Block users from reassigning personal workspaces (My Workspace)**.

For more information, see [Prevent My workspace owners from reassigning their My workspaces to a different capacity](./portal-workspaces.md#prevent-my-workspace-owners-from-reassigning-their-my-workspaces-to-a-different-capacity).

## Related content

[About tenant settings](tenant-settings-index.md)
