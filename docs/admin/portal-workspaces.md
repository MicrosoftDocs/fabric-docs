---
title: Manage workspaces
description: Learn how to view and understand info about workspaces and manage workspaces as an administrator.
author: mimart
ms.author: mimart
ms.reviewer: yuturchi
ms.custom: admin-portal
ms.topic: how-to
ms.date: 03/06/2026
---

# Manage workspaces

As a Fabric administrator, you can govern the workspaces that exist in your organization on the **Workspaces** tab in the Admin portal. For information about how to get to and use the Admin portal, see [About the Admin portal](tenant-settings-index.md).

On the **Workspaces** tab, you see a list of all the workspaces in your tenant. Above the list, a ribbon provides options to help you govern the workspaces. These options also appear in the **More options (...)** menu of the selected workspace. The list of options varies depending on workspace type and status. All the options are described under [workspace options](#workspace-options).

:::image type="content" source="media/portal-workspaces/power-bi-workspaces-admin-portal.png" alt-text="Screenshot that shows a Power B I workspaces list in the admin portal.":::

The following table describes the columns of the list of workspaces.

| Column | Description |
| --------- | --------- |
| **Name** | The name given to the workspace. |
| **Description** | The information that is given in the description field of the workspace settings. |
| **Type** | The type of workspace. There are two types of workspaces:<br>:::image type="icon" border="false" source="./media/portal-workspaces/app-workspace-icon.png"::: **Workspace** (also known as "app workspace")<br>:::image type="icon" border="false" source="./media/portal-workspaces/personal-workspace-icon.png"::: **Personal Group** ("My workspaces")|
| **State** | The state lets you know if the workspace is available for use. There are five states, **Active**, **Orphaned**, **Deleted**, **Removing**, and **Not found**. For more information, see [Workspace states](#workspace-states). |
| **Capacity name** | Name given to the workspace's capacity. |
| **Capacity SKU Tier** | The type of workspace type used for the workspace's capacity. Capacity SKU Tiers include **Power BI Premium** and **Power BI Premium Per-User (PPU)**. For more information about capacity tiers, see [Configure and manage capacities in Power BI Premium](/power-bi/enterprise/service-admin-premium-manage). |
| **Upgrade status** | The upgrade status lets you know if the workspace is eligible for a Microsoft Fabric upgrade. |

The table columns on the **Workspaces** tab correspond to the properties returned by the [admin Rest API](/rest/api/power-bi/admin) for workspaces. Personal workspaces are of type **PersonalGroup** and all other workspaces are of type **Workspace**. For more information, see [Workspaces](../fundamentals/workspaces.md).

## Workspace states

The following table describes the possible workspace states.

|State  |Description  |
|---------|---------|
| **Active** | A normal workspace. It doesn't indicate anything about usage or what's inside, only that the workspace itself is "normal." |
| **Orphaned** | A workspace with no admin user. You need to assign an admin. |
| **Deleted** | A deleted workspace. When a workspace is deleted, it enters a retention period. During the retention period, a Microsoft Fabric administrator can restore the workspace. See [Retention and recovery](retention-recovery.md) for detail. When the retention period ends, the workspace enters the *Removing* state.|
| **Removing** | At the end of a deleted workspace's retention period, it moves into the *Removing* state. During this state, the workspace is permanently removed. Permanently removing a workspace takes a short while, and depends on the service and folder content. |
| **Not found** | If the customer's API request includes a workspace ID for a workspace that doesn't belong to the customer's tenant, "Not found" is returned as the status for that ID. |

## Retention and recovery

Fabric provides retention and recovery capabilities at both the workspace and item levels. When workspaces or items are deleted, they enter a retention period during which administrators can restore them.

**Workspace retention:**
- Personal workspaces (*My workspaces*) have a fixed 30-day retention period
- Collaborative workspaces have a configurable retention period (default 7 days, adjustable from 7 to 90 days)
- Administrators can restore deleted workspaces or permanently delete them before the retention period expires

**Item retention:**
- Individually deleted items have a configurable retention period (default 7 days, adjustable from 7 to 90 days)
- Administrators and workspace admins can restore deleted items using REST APIs
- Administrators can permanently delete items before the retention period expires

For detailed instructions on setting up retention periods, restoring workspaces and items, and permanently deleting resources, see [Retention and recovery in Fabric](retention-recovery.md).

## Workspace options

The ribbon at the top of the list and the More options (...) menus of the individual workspaces provide options that to help you manage the workspaces. The Refresh and the Export options are always present, while the selection of other options that appear depends on the workspace type and status. All the options are described in the following table.

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
| **Restore** |Enables you to restore the MyWorkspace of a user that has left the organization, or a deleted collaborative workspace. For MyWorkspaces, see [Restore a deleted My workspace as an app workspace](workspace-retention.md#restore-a-deleted-my-workspace-as-an-app-workspace). For collaborative workspaces, see [Restore a deleted collaborative workspace](workspace-retention.md#restore-a-deleted-collaborative-workspace) |
| **Permanently delete** |Enables you to permanently delete a deleted collaborative workspace before the end of its retention period. See [Permanently delete a deleted collaborative workspace during the retention period](workspace-retention.md#permanently-delete-a-deleted-collaborative-workspace-during-the-retention-period). |

>[!NOTE]
> Admins can also manage and recover workspaces using PowerShell cmdlets.
>
> Admins can also control users' ability to create new workspace experience workspaces and classic workspaces. See [Workspace settings](./portal-workspace.md) in this article for details.

## Workspace item limits

Workspaces can contain a maximum of 1,000 Fabric and Power BI items, including parent and child items.

Users attempting to create new items after this limit is reached get an error in the item creation flow. To develop a plan for managing item counts in workspaces, Fabric admins can review the total count of items per workspace in the admin monitoring workspace. See the [total number of items in a workspace](./feature-usage-adoption.md#measures).

> [!NOTE]
> If specific items have limits, those limits still apply, but the total number of items in the workspace is still capped at a 1000. For item specific limits, review the item type' documentation.


## Reassign a workspace to a different capacity

Workspaces and the data they contain reside on capacities. You can move the workspace to a different capacity via the workspace type.

1. Go to **Admin portal** > **Workspaces**.

1. Find the workspace you want to move, open the options menu, and choose **Reassign workspace**.

    :::image type="content" source="./media/portal-workspaces/reassign-workspace-option.png" alt-text="Screenshot showing the Reassign workspace option.":::

1. On the Reassign workspace side pane that appears, select the desired workspace type, and choose a capacity, if asked.

    :::image type="content" source="./media/portal-workspaces/license-modes.png" alt-text="Screenshot showing the Reassign workspace types pane.":::

1. Select **Save** to apply the change.

    > [!NOTE]
    > * The types of items in the workspace can affect your ability to change workspace types or move the workspace to a capacity in a different region.
    > * Moving a workspace to a different capacity might start successfully but finish with errors, which could affect some or all items in the workspace. For details, see [Capacity reassignment restrictions and common issues](portal-workspace-capacity-reassignment.md).

## Govern My workspaces

Every Fabric user has a personal workspace called My workspace where they can work with their own content. While only My workspace owners have access to their My workspaces, Fabric admins can use a set of features to help them govern these workspaces. With these features, Fabric admins can:

* [Gain access to the contents of any user's My workspace](#gain-access-to-any-users-my-workspace)
* [Designate a default capacity for all existing and new My workspaces](#designate-a-default-capacity-for-my-workspaces)
* [Prevent users from moving My workspaces to a different capacity that might reside in noncompliant regions](#prevent-my-workspace-owners-from-reassigning-their-my-workspaces-to-a-different-capacity)
* [Restore deleted My workspaces as app workspaces](workspace-retention.md#restore-a-deleted-my-workspace-as-an-app-workspace)

These features are described in the following sections.

### Gain access to any user's My workspace

To gain access to a particular My workspace

1. In the Fabric Admin portal, open the Workspaces page and find the personal workspace you want to get access to.
1. Select the workspace and then choose **Get Access** from the ribbon, or select **More options (...)** and choose **Get Access**.

> [!NOTE]
> Once access is obtained, the ribbon and the More options (...) menu shows **Remove Access** for the same My workspace. If you don't remove access by selecting one of these options, access will automatically be revoked for the admin after 24-hours. The My workspace owner's access remains intact.

Once you have access, the My workspace shows up in the list of workspaces accessible from the navigation pane. The icon :::image type="icon" border="false" source="./media/portal-workspaces/personal-workspace-icon.png"::: indicates that it's a My workspace.

Once you go inside the My workspace, you can perform any actions as if it's your own My workspace. You can view and make any changes to the contents, including sharing or unsharing. But you can't grant anyone else access to the My workspace.  

### Designate a default capacity for My workspaces

A Fabric admin or capacity admin can designate a capacity as the default capacity for My workspaces. To configure a default capacity for My workspaces, go to the [details](capacity-settings.md#details) section in your [capacity settings](capacity-settings.md#capacity-settings).

For details, see [Designate a default capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces)

### Prevent My workspace owners from reassigning their My workspaces to a different capacity

Fabric admins can designate a default capacity for My workspaces. However, even if a My workspace is assigned to Power BI Premium capacity, the owner of the workspace can still move it back to Power BI Pro workspace type. Moving a workspace from Power BI Premium workspace type to Power BI Pro workspace type might cause the content contained in the workspace to be become noncompliant with respect to data-residency requirements, since it might move to a different region. To prevent this situation, the Fabric admin can block My workspace owners from moving their My workspace to a different workspace type by turning on the **Block users from reassigning personal workspaces (My Workspace)** tenant setting. See [Workspace settings](./portal-workspace.md) for detail.

## Moving data around

Workspaces and the data they contain reside on capacities. Workspace admins can move the data contained in a workspace by reassigning the workspace to a different capacity. The capacity can be in the same region or a different region.

For details, see [Capacity reassignment restrictions and common issues](portal-workspace-capacity-reassignment.md).

## Related content

* [About the admin portal](admin-center.md)
