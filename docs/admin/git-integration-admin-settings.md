---
title: Git integration admin settings
description: Learn about what the feature switches affecting Git integration do and how to use them.
author: billmath
ms.author: billmath
ms.topic: how-to
ms.date: 07/14/2026
---

# Git integration tenant settings

The Git integration tenant admin settings are configured in the tenant settings section of the admin portal.  
The tenant admin can choose to delegate control of these switches to the workspace admin or capacity admin. If the tenant admin enables delegation, the capacity admin can override the tenant admin's decision to enable or disable the switch. The workspace admin can override the tenant and the capacity settings.

For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

:::image type="content" source="./media/git-integration-admin-settings/workspace-settings.png" alt-text="Screenshot of workspace settings.":::

> [!IMPORTANT]
> The switches that control Git integration are part of Fabric and only work if the [Fabric admin switch](fabric-switch.md) is turned on. If Fabric is disabled, Git integration will work for workspaces that contain only Power BI items.


## Shared Git integration tenant admin settings
The following section provides a brief overview of the general settings found in each of the Git integration tenant admin settings.

:::image type="content" source="./media/git-integration-admin-settings/settings-1.png" alt-text="Screenshot of shared settings.":::

 ### Specify which users a setting applies to

 When you enable a Git integration tenant setting, use the **Apply to** options to control which users the setting affects:

 - **The entire organization**: The setting applies to every user in the tenant.
 - **Specific security groups**: The setting applies only to members of the security groups you enter. Users who aren't members of those groups aren't affected. The security groups you specify are included by default.
 - **Except specific security groups**: Use this option to exclude one or more security groups. It's optional and can be combined with the options in the previous two bullet points, so you can enable a setting broadly and still carve out groups to exclude. Enter the security groups you want to exclude in the box that appears.

 For example, you can enable a switch for the entire organization but exclude a security group whose members shouldn't have the capability. Or you can enable it for a specific security group while excluding a subgroup within it.

 ### Delegate settings to other admins

 By default, only the Fabric (tenant) admin controls a Git integration tenant setting. To let other admins manage the setting for their own scope, expand **Delegate settings to other admins** and select who can override it:

 - **Capacity admins can enable/disable**: A capacity admin can override the tenant admin's choice  for their capacity. The override applies only to the workspaces assigned to that capacity.  Capacity admins make the change from the capacity's **Delegated tenant settings** page by  selecting **Override tenant admin selection**.
 - **Workspace admins can enable/disable**: A workspace admin can override both the tenant and  capacity settings for their own workspace.

 If you don't select either option, the setting stays locked at the value set at the tenant level.  When you delegate, the result is the layered precedence described earlier: tenant, then  capacity, then workspace, with each lower level able to override only when delegation is turned on.

 For more information on delegation, see [Delegation and how it integrates with Git](#delegation-and-how-it-works-with-git-integration).



## Users can synchronize workspace items with their Git repositories 

Users can synchronize a workspace with an Azure Git repository, edit their workspace, and update their Git repos using the Git integration tool. You can enable Git integration for the entire organization, or for a specific group.  
This switch is **enabled** by default. Disable it to prevent users from syncing workspace items with their Git repositories.

:::image type="content" source="./media/git-integration-admin-settings/enable-git-integration-switch.png" alt-text="Screenshot of the Git integration switch.":::

To learn more, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

To get started with Git integration, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

## Users can export items to Git repositories in other geographical locations

If a workspace capacity is in one geographic location (for example, Central US) while the *Azure DevOps* repo is in another location (for example, West Europe), the Fabric admin can decide whether to allow users to commit metadata (or perform other Git actions) to another geographical location. Only the metadata of the item is exported. Item data and user related information are not exported.  
Enable this setting to allow all users, or a specific group or users, to export metadata to other geographical locations.

:::image type="content" source="./media/git-integration-admin-settings/multi-geo-switch.png" alt-text="Screenshot of the multi geo switch enabled.":::

> [!NOTE]
> GitHub doesn't support enforcement of this switch.

## Users can export workspace items with applied sensitivity labels to Git repositories

Sensitivity labels aren't included when exporting an item. Therefore, the Fabric admin can choose whether to block the export of items that have sensitivity labels, or to allow it even though the sensitivity label won't be included.

Enable this setting to allow all users, or a specific group of users, to export items without their sensitivity labels.

:::image type="content" source="./media/git-integration-admin-settings/git-integration-sensitivity-labels-switch.png" alt-text="Screenshot of sensitivity labels switch.":::

Learn more about [sensitivity labels](../fundamentals/apply-sensitivity-labels.md).

## Users can sync workspace items with GitHub repositories

Users can synchronize a workspace with their GitHub repository, edit their workspace, and update their GitHub repos using the Git integration tool. You can enable Git integration for the entire organization, or for a specific group.  
This switch is **disabled** by default. Enable it to allow users to sync workspace items with their Git repositories.

:::image type="content" source="./media/git-integration-admin-settings/enable-github-integration-switch.png" alt-text="Screenshot of the GitHub integration switch.":::

To learn more, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

To get started with Git integration, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).


### Delegation and how it works with Git integration
 
Delegation is the admin model that lets the tenant admin push control of a tenant setting down to lower administrative scopes instead of locking every decision at the org level. 

:::image type="content" source="./media/git-integration-admin-settings/enable-git-integration-switch.png" alt-text="Screenshot of the Git integration switch.":::

For the Git integration switches, the layered override model is:
 
- Tenant admin sets the switch in the admin portal (tenant settings) and chooses whether to delegate it.
- If delegation is enabled, the capacity admin can override the tenant admin's enable or disable decision for their capacity.
- The workspace admin can override both the tenant and capacity settings for their workspace.
 
So the precedence is tenant → capacity → workspace, with each lower level able to override when delegation is turned on. For more information, see [Power BI implementation planning: Workspaces at the workspace level](/power-bi/guidance/powerbi-implementation-planning-workspaces-workspace-level-planning).

## Related content

- [About tenant settings](tenant-settings-index.md)
