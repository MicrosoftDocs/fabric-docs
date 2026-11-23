---
title: Manage workspaces
description: Learn how to find, review, and manage workspaces from the Govern section of the OneLake catalog.
author: mimart
ms.author: mimart
ms.reviewer: yuturchi
ms.topic: how-to
ms.date: 09/08/2026
ai-usage: ai-assisted
---

# Manage workspaces

As a Fabric administrator, you can view and manage the workspaces in your organization from **Workspaces** in the [Govern section of the OneLake catalog](../governance/onelake-catalog-govern.md).

To open **Workspaces**:

1. Sign in to [Fabric](https://app.fabric.microsoft.com) by using your admin account credentials.
1. Select **OneLake catalog**.
1. Select **Govern**, and then select **Workspaces** under **Manage**.

The **Workspaces** page lists the workspaces in your tenant. Select a workspace to display the commands available for its type and state.

<!-- Placeholder: Workspaces list in OneLake catalog > Govern > Workspaces. -->

The following table describes the columns of the list of workspaces.

| Column | Description |
| --------- | --------- |
| **Name** | The name given to the workspace. |
| **Description** | The information that is given in the description field of the workspace settings. |
| **Type** | The workspace type: **Workspace**, **Personal Group** (My workspace), or **Admin Workspace**. |
| **State** | The state lets you know if the workspace is available for use. There are five states, **Active**, **Orphaned**, **Deleted**, **Removing**, and **Not found**. For more information, see [Workspace states](#workspace-states). |
| **Capacity name** | The name of the capacity assigned to the workspace. |
| **Capacity SKU Tier** | The SKU tier of the workspace's assigned capacity. For more information, see [Configure and manage capacities in Power BI Premium](/power-bi/enterprise/service-admin-premium-manage). |

For more information about workspaces, see [Workspaces](../fundamentals/workspaces.md). To retrieve workspace metadata programmatically, use the [admin REST API](/rest/api/power-bi/admin).

### Find and filter workspaces

Use **Filter by keyword** to search the workspace list. Select **Filter** to refine the list by:

* **Type**: Admin Workspace, Personal Group, or Workspace.
* **Capacity SKU Tier**.
* **Capacity name**.
* **State**.

Select **Clear all** to remove the applied filters.

<!-- Placeholder: Workspaces Filter menu showing Type, Capacity SKU Tier, Capacity name, and State. -->

## Workspace states

The following table describes the possible workspace states.

|State  |Description  |
|---------|---------|
| **Active** | A normal workspace. It doesn't indicate anything about usage or what's inside, only that the workspace itself is "normal." |
| **Orphaned** | A workspace with no admin user. You need to assign an admin. |
| **Deleted** | A deleted workspace. When a workspace is deleted, it enters a retention period. During the retention period, a Fabric administrator can restore the workspace. See [Retention and recovery](retention-recovery.md) for detail. When the retention period ends, the workspace enters the *Removing* state.|
| **Removing** | At the end of a deleted workspace's retention period, it moves into the *Removing* state. During this state, the workspace is permanently removed. Permanently removing a workspace takes a short while, and depends on the service and folder content. |
| **Not found** | If the customer's API request includes a workspace ID for a workspace that doesn't belong to the customer's tenant, "Not found" is returned as the status for that ID. |

## Retention and recovery

Fabric provides retention and recovery capabilities at both the workspace and item levels. When workspaces or items are deleted, they enter a retention period during which administrators can restore them.

**Workspace retention:**
- Personal workspaces (*My workspaces*) have a fixed 30-day retention period
- Collaborative workspaces have a configurable retention period (default 7 days, adjustable from 7 to 90 days)
- Administrators can restore deleted workspaces or permanently delete them before the retention period expires

**Item retention:**
- Item recovery is turned on by default, and individually deleted items have a configurable retention period (default 3 days, adjustable from 3 to 90 days)
- Administrators and workspace admins can restore deleted items using REST APIs
- Administrators can permanently delete items before the retention period expires

For detailed instructions on setting up retention periods, restoring workspaces and items, and permanently deleting resources, see [Retention and recovery in Fabric](retention-recovery.md).

## Workspace options

When you select a workspace, a command bar appears above the list. You can also select **More options (...)** next to a workspace to open the same actions in a menu. The available commands depend on the workspace type and state. For example, an active workspace can provide edit, access, export, and reassignment commands, while a deleted workspace can provide edit, export, restore, and permanent-delete commands.

<!-- Placeholder: More options menu for an active workspace. -->

|Option  |Description  |
|---------|---------|
| **Edit** | Opens **Workspace settings** for the selected workspace. |
| **Access** | Opens the **Manage access** pane for the selected workspace. |
| **Export** | Exports the workspace list as a *.csv* file. |
| **Reassign workspace** | Opens a pane where you can change the workspace type or assigned capacity. |
| **Restore** | Restores a deleted My workspace or collaborative workspace. For details, see [Restore a deleted My workspace as an app workspace](workspace-retention.md#restore-a-deleted-my-workspace-as-an-app-workspace) or [Restore a deleted collaborative workspace](workspace-retention.md#restore-a-deleted-collaborative-workspace). |
| **Permanently delete** | Permanently deletes a deleted collaborative workspace before its retention period ends. For details, see [Permanently delete a deleted collaborative workspace during the retention period](workspace-retention.md#permanently-delete-a-deleted-collaborative-workspace-during-the-retention-period). |

>[!NOTE]
> Admins can also manage and recover workspaces using PowerShell cmdlets.
>
> Admins can also control users' ability to create new workspace experience workspaces and classic workspaces. See [Workspace settings](./portal-workspace.md) in this article for details.

## Manage workspace access

To manage who can access a workspace:

1. Select the workspace in the list.
1. Select **Access** on the command bar, or select **More options (...)** and then select **Access**.
1. In the **Manage access** pane, you can:
    * Select **Add people or groups** to grant workspace access.
    * Search for a person or group that already has access.
    * Review or change the role assigned to a person or group.

<!-- Placeholder: Manage access pane opened by the Access command. -->

## Edit workspace settings

To open the settings for a workspace:

1. Select the workspace in the list.
1. Select **Edit** on the command bar.
1. Update the available settings in the **Workspace settings** pane.

The settings available in the pane depend on the workspace and your permissions.

<!-- Placeholder: Workspace settings pane opened by the Edit command. -->

## Workspace item limits

Workspaces can contain up to 1,000 Fabric and Power BI items, including both parent and child items.  

Users who try to create new items after reaching this limit receive an error during the item creation process. To develop a plan for managing item counts in workspaces, Fabric admins can review workspace inventory in the [Govern report in the OneLake catalog](../governance/onelake-catalog-govern.md#govern-report).  

> [!NOTE]
> If specific item types have lower limits, those limits still apply. For item-specific limits, review the documentation for that item type.


## Reassign a workspace to a different capacity

Capacities host workspaces and the data they contain. Reassign a workspace to change its workspace type or assigned capacity.  

1. Select the workspace in the list.
1. Select **Reassign workspace** on the command bar.
1. In the **Reassign workspace** pane, select an available workspace type.
1. If required, select the capacity under **Details**.
1. Select **Apply**.

<!-- Placeholder: Reassign workspace pane showing workspace type and capacity selection. -->

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

Fabric admins can temporarily access any user's My workspace to view and manage its contents. This access automatically revokes after 24 hours. The My workspace owner's access remains intact. 

When you gain temporary access to a My workspace, you can:

* See the My workspace in the list of workspaces accessible from the navigation pane. The icon :::image type="icon" border="false" source="./media/portal-workspaces/personal-workspace-icon.png"::: indicates that it's a My workspace.

* Perform any actions in the My workspace as if it's your own My workspace. You can view and make any changes to the contents, including sharing or unsharing. But you can't grant anyone else access to the My workspace.

You can manage access to My workspaces by using the Govern section of the OneLake catalog or the Fabric Admin APIs.

To manage access by using the OneLake catalog Govern section:

1. Sign in to [Fabric](https://app.fabric.microsoft.com) using your admin account credentials.
1. Open the **OneLake catalog**, select the **Govern** section, and then select **Workspaces**.
1. Select the personal workspace you want to access, and then select **Get Access** on the command bar.
1. To remove access, select the workspace, and then select **Remove Access** on the command bar.

   > [!NOTE]
   > If you don't remove access, it automatically revokes after 24 hours. 

To manage access by using the Fabric Admin APIs:

* Use [Workspaces - Grant Admin Temporary Access](/rest/api/fabric/admin/workspaces/grant-admin-temporary-access) to gain access to the My workspace. 
* Use [Workspaces - Remove Admin Temporary Access](/rest/api/fabric/admin/workspaces/remove-admin-temporary-access) to remove access to the My workspace.



### Designate a default capacity for My workspaces

A Fabric admin or capacity admin can designate a capacity as the default capacity for My workspaces. To configure a default capacity for My workspaces, go to the [details](capacity-settings.md#details) section in your [capacity settings](capacity-settings.md#capacity-settings).

For details, see [Designate a default capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces)

### Prevent My workspace owners from reassigning their My workspaces to a different capacity

Fabric admins can designate a default capacity for My workspaces. However, even if a My workspace is assigned to Power BI Premium capacity, the owner of the workspace can still move it back to Power BI Pro workspace type. Moving a workspace from Power BI Premium workspace type to Power BI Pro workspace type might cause the content contained in the workspace to be become noncompliant with respect to data-residency requirements, since it might move to a different region. To prevent this situation, the Fabric admin can block My workspace owners from moving their My workspace to a different workspace type by turning on the **Block users from reassigning personal workspaces (My Workspace)** tenant setting. See [Workspace settings](./portal-workspace.md) for detail.

## Moving data around

Workspaces and the data they contain reside on capacities. Workspace admins can move the data contained in a workspace by reassigning the workspace to a different capacity. The capacity can be in the same region or a different region.

For details, see [Capacity reassignment restrictions and common issues](portal-workspace-capacity-reassignment.md).

## Related content

* [Administration overview](admin-overview.md)
