---
title: Manage workspaces
description: Learn how to view and understand info about workspaces and manage workspaces as an administrator.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.custom:
  - admin-portal
  - build-2023
  - ignite-2023
ms.topic: how-to
ms.date: 11/06/2023
LocalizationGroup: Administration
---

# Manage workspaces

As a Fabric administrator, you can govern the workspaces that exist in your organization on the **Workspaces** tab in the Admin portal. For information about how to get to and use the Admin portal, see [About the Admin portal](tenant-settings-index.md).

On the **Workspaces** tab, you see a list of all the workspaces in your tenant. Above the list, a ribbon provides options to help you govern the workspaces. These options also appear in the **More options (...)** menu of the selected workspace. The list of options varies depending on workspace type and status. All the options are described under [workspace options](#workspace-options).

:::image type="content" source="media/portal-workspaces/power-bi-workspaces-admin-portal.png" alt-text="Screenshot that shows a Power B I workspaces list in the admin portal.":::

The columns of the list of workspaces are described below

| Column | Description |
| --------- | --------- |
| **Name** | The name given to the workspace. |
| **Description** | The information that is given in the description field of the workspace settings. |
| **Type** | The type of workspace. There are two types of workspaces:<br>![Screenshot of app workspace icon.](./media/portal-workspaces/app-workspace-icon.png) **Workspace** (also known as "app workspace")<br>![Screenshot of personal workspace icon in the list of workspaces table explanation.](./media/portal-workspaces/personal-workspace-icon.png) **Personal Group** ("My workspaces")|
| **State** | The state lets you know if the workspace is available for use. There are five states, **Active**, **Orphaned**, **Deleted**, **Removing**, and **Not found**. For more information, see [Workspace states](#workspace-states). |
| **Capacity name** | Name given to the workspace's capacity. |
| **Capacity SKU Tier** | The type of license used for the workspace's capacity. Capacity SKU Tiers include **Premium** and **Premium Per User (PPU)**. For more information about capacity tiers, see [Configure and manage capacities in Premium](/power-bi/enterprise/service-admin-premium-manage). |
| **Upgrade status** | The upgrade status lets you know if the workspace is eligible for a Microsoft Fabric upgrade. |

The table columns on the **Workspaces** tab correspond to the properties returned by the [admin Rest API](/rest/api/power-bi/admin) for workspaces. Personal workspaces are of type **PersonalGroup**, all other workspaces are of type **Workspace**. For more information, see [Workspaces](../get-started/workspaces.md).

## Workspace states

The possible workspace states are described below.

|State  |Description  |
|---------|---------|
| **Active** | A normal workspace. It doesn't indicate anything about usage or what's inside, only that the workspace itself is "normal". |
| **Orphaned** | A workspace with no admin user. You need to assign an admin. |
| **Deleted** | A deleted workspace. When a workspace is deleted, it enters a retention period. During the retention period, a Microsoft Fabric administrator can restore the workspace. See [Workspace retention](#workspace-retention) for detail. When the retention period ends, the workspace enters the *Removing* state.|
| **Removing** | At the end of a deleted workspace's retention period, it moves into the *Removing* state. During this state, the workspace is permanently removed. Permanently removing a workspace takes a short while, and depends on the service and folder content. |
| **Not found** | If the customer's API request includes a workspace ID for a workspace that doesn't belong to the customer's tenant, "Not found" is returned as the status for that ID. |

## Workspace options

The ribbon at the top of the list and the More options (...) menus of the individual workspaces provide options that to help you manage the workspaces. The Refresh and the Export options are always present, while the selection of other options that appear depends on the workspace type and status. All the options are described below.

|Option  |Description  |
|---------|---------|
| **Refresh** | Refreshes the workspace list.|
| **Export** |Exports the table as a *.csv* file.|
| **Details** |Lists the items that are contained in the workspace.|
| **Edit** |Enables you to edit the workspace name and description. |
| **Access** |Enables you to manage workspace access. You can use this feature to delete workspaces by first adding yourself to a workspace as an admin then opening the workspace to delete it.|
| **Get access** |Grants you temporary access to another user's MyWorkspace. See [Gain access to any user's My workspace](#gain-access-to-any-users-my-workspace) for detail.|
| **Capacity** |Enables you to assign the workspace to Premium capacity or to remove it from Premium capacity. |
| **Recover** |Enables you to restore an orphaned workspace. |
| **Restore** |Enables you to restore the MyWorkspace of a user that has left the organization, or a deleted collaborative workspace. For MyWorkspaces, see [Restore a deleted My workspace as an app workspace](#restore-a-deleted-my-workspace-as-an-app-workspace). For collaborative workspaces, see [Restore a deleted collaborative workspace](#restore-a-deleted-collaborative-workspace) |
| **Permanently delete** |Enables you to permanently delete a deleted collaborative workspace before the end of its retention period. See [Permanently delete a deleted collaborative workspace during the retention period](#permanently-delete-a-deleted-collaborative-workspace-during-the-retention-period). |

>[!NOTE]
> Admins can also manage and recover workspaces using PowerShell cmdlets.
>
> Admins can also control users' ability to create new workspace experience workspaces and classic workspaces. See [Workspace settings](./portal-workspace.md) in this article for details.

## Workspace retention

By default, when a workspace is deleted, it isn't permanently and irrevocably deleted immediately. Instead, it enters a retention period during which it's possible to restore it. At the end of the retention period, it's removed permanently, and it will no longer be possible to recover it or its contents.

The retention period for personal workspaces (*My workspaces*) is 30 days.

The retention period for collaborative workspaces is configurable. The default retention period is seven days. However, Fabric administrators can change the length of the retention period by turning on the **Define workspace retention period**
setting in the admin portal and specifying the desired retention period (from 7 to 90 days).

During the retention period, Fabric administrators can [restore the workspace](#restore-a-deleted-collaborative-workspace).

At the end of the retention period, the workspace is deleted permanently and it and its contents are irretrievably lost.

While a workspace is in the retention period, Fabric administrators can [permanently delete it before the end of the retention period](#permanently-delete-a-deleted-collaborative-workspace-during-the-retention-period).

### Configure the retention period for deleted collaborative workspaces

By default, deleted collaborative workspaces are retained for seven days. Fabric administrators can change the length of the retention period (from 7 to 90 days) using the **Define workspace retention period** tenant setting.

1. In the Fabric admin portal, go to **Workspace settings** > **Define workspace retention period**.
1. Turn on the setting and enter the number of days for desired retention period. You can choose anywhere from 7 to 90 days.
1. When done, select **Apply**.

> [!NOTE]
> When the **Define workspace rentention period** setting is off, deleted collaborative workspaces automatically have a retention period of 7 days.
>
> This setting does not affect the retention period of *My workspaces*. *My workspaces* always have a 30-day retention period.

### Restore a deleted collaborative workspace

While a deleted collaborative workspace is in a retention period, Fabric administrators can restore it and its contents.

1. In the Fabric admin portal, open the Workspaces page and find the deleted collaborative workspace you want to restore. Collaborative workspaces are of type *Workspace*. A workspace that is in a retention period has the status *Deleted*.
1. Select the workspace and then choose **Restore** from the ribbon, or select **More options (...)** and choose **Restore**.
1. In the Restore workspaces panel that appears, give a new name to the workspace and assign at least one user the Admin role in the workspace.
1. When done, select **Restore**.

### Permanently delete a deleted collaborative workspace during the retention period

While a deleted collaborative workspace is in a retention period, Fabric administrators permanently delete it before the end of its retention period.

1. In the Fabric admin portal, open the Workspaces page and find the deleted collaborative workspace you want to restore. Collaborative workspaces are of type *Workspace*. A workspace that is in a retention period has the status *Deleted*.
1. Select the workspace and then choose **Permanently delete** from the ribbon, or select **More options (...)** and choose **Permanently delete**.

You're asked to confirm the permanent deletion. After you confirm, the workspace and its contents are no longer recoverable.

## Govern My workspaces

Every Fabric user has a personal workspace called My workspace where they can work with their own content. While generally only My workspace owners have access to their My workspaces, Fabric admins can use a set of features to help them govern these workspaces. With these features, Fabric admins can:

* [Gain access to the contents of any user's My workspace](#gain-access-to-any-users-my-workspace)
* [Designate a default capacity for all existing and new My workspaces](#designate-a-default-capacity-for-my-workspaces)
* [Prevent users from moving My workspaces to a different capacity that might reside in noncompliant regions](#prevent-my-workspace-owners-from-reassigning-their-my-workspaces-to-a-different-capacity)
* [Restore deleted My workspaces as app workspaces](#restore-a-deleted-my-workspace-as-an-app-workspace)

These features are described in the following sections.

### Gain access to any user's My workspace

To gain access to a particular My workspace

1. In the Fabric Admin portal, open the Workspaces page and find the personal workspace you want to get access to.
1. Select the workspace and then choose **Get Access** from the ribbon, or select **More options (...)** and choose **Get Access**.

> [!NOTE]
> Once access is obtained, the ribbon and the More options (...) menu will show **Remove Access** for the same My workspace. If you do not remove access by selecting one of these options, access will automatically be revoked for the admin after 24-hours. The My workspace owner's access remains intact.

Once you have access, the My workspace will show up in the list of workspaces accessible from the navigation pane. The icon ![Screenshot of personal workspace icon in the list of workspaces table explanation.](./media/portal-workspaces/personal-workspace-icon.png) indicates that it's a My workspace.

Once you go inside the My workspace, you can perform any actions as if it's your own My workspace. You can view and make any changes to the contents, including sharing or unsharing. But you can't grant anyone else access to the My workspace.  

### Designate a default capacity for My workspaces

A Fabric admin or capacity admin can designate a capacity as the default capacity for My workspaces. For details, see [Designate a default capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces)

### Prevent My workspace owners from reassigning their My workspaces to a different capacity

Fabric admins can designate a default capacity for My workspaces. However, even if a My workspace has been assigned to Premium capacity, the owner the workspace can still move it back to Pro, which is in Shared capacity. Moving a workspace from Premium capacity to Shared capacity might cause the content contained in the workspace to be become noncompliant with respect to data-residency requirements, since it might move to a different region. To prevent this situation, the Fabric admin can block My workspace owners from moving their My workspace to a different capacity by turning off the **Users can reassign personal workspaces** tenant admin setting. See [Workspace settings](./portal-workspace.md) for detail.

### Restore a deleted My workspace as an app workspace

When users are deleted from the company's Active Directory, their My workspaces show up as Deleted in the State column on the Workspaces page in the Admin portal. Fabric admins can restore deleted My workspaces as app workspaces that other users can collaborate in.

During this restoration process, the Fabric admin needs to assign at least one Workspace admin in the new app workspace, as well as give the new workspace a name. After the workspace has been restored, it will show up as *Workspace* in the Type column on the Workspaces page in the Admin portal.

To restore a deleted My workspace as an app workspace

1. In the Fabric Admin portal, open the Workspaces page and find the deleted personal workspace you want to restore.
1. Select the workspace and then choose **Restore** from the ribbon, or select **More options (...)** and choose **Restore**.
1. In the Restore workspaces panel that appears, give a new name to the workspace and assign at least one user the Admin role in the workspace.
1. When done, select **Restore**.

After the deleted workspace has been restored as an app workspace, it's just like any other app workspace. 

## Moving data around

Workspaces and the data they contain reside on capacities, and can be moved around by assigning them to different capacities. Such movement might be between capacities in different regions, or between different capacity types, such as Premium and shared.

In Microsoft Fabric, such movement currently has the following restrictions:

* Non Power BI Fabric items can't move from Premium to shared capacity.

* Non Power BI Fabric items can't move between regions.

This means the following:

* **Moving a workspace from one capacity to another within the same region**

    If the workspace has non Power BI Fabric items, you can only move it from one Premium capacity to another Premium capacity. If you want to move the workspace from Premium to shared capacity, you won't be able to do so unless you delete all non-Power BI Fabric items first.

    If the workspace has no non Power BI Fabric items (that is, it has only Power BI items) moving the workspace from Premium to shared is supported.  

* **Moving a workspace from one capacity to a capacity in a different region**

    You won't be able to move a workspace if it has non-Power BI Fabric items in it.  If the workspace once had non-PowerBI Fabric items, but all items have since been deleted, you also won't be able to move the workspace to a capacity in a different region.

    If the workspace has no non-Power BI Fabric items (that is, it has only Power BI items) moving the workspace to another capacity in a different region is supported.

## Related content

- [About the admin portal](admin-center.md)
