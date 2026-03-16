---
title: Set up and manage workspace retention
description: Learn how to set up workspace retention periods, restore deleted workspaces, and permanently delete workspaces as an administrator.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: yuturchi, arthii
ms.custom: admin-portal
ms.topic: how-to
ms.date: 03/06/2026
ai-usage: ai-assisted
---

# Set up and manage workspace retention

When you delete a workspace, it enters a retention period during which you can restore it. This retention capability helps protect against accidental deletions so that workspace content isn't permanently lost before you have a chance to recover it.

This article describes how to set up the retention period, restore deleted workspaces, and permanently delete workspaces before the retention period expires.

For an overview of how retention works for workspaces and items, see [Retention and recovery in Fabric](retention-recovery.md).

## Prerequisites

- You need a [tenant admin](microsoft-fabric-admin.md) role to set up retention settings and restore or permanently delete workspaces.

## Set up the retention period for deleted collaborative workspaces

By default, Fabric retains deleted collaborative workspaces for seven days. You can change the length of the retention period (from 7 to 90 days) by using the **Define workspace retention period** tenant setting.

1. In the admin portal, go to **Workspace settings** > **Define workspace retention period**.
1. Turn on the setting and enter the number of days for the retention period. You can choose anywhere from 7 to 90 days.
1. Select **Apply**.

> [!NOTE]
> When the **Define workspace retention period** setting is off, deleted collaborative workspaces still have a retention period of seven days.
>
> This setting doesn't affect the retention period of *My workspaces*. *My workspaces* always have a 30-day retention period.

## Restore a deleted collaborative workspace

While a deleted collaborative workspace is in a retention period, you can restore it and its contents.

1. In the admin portal, open the **Workspaces** page and find the deleted collaborative workspace you want to restore. Collaborative workspaces are of type **Workspace**. A workspace that is in a retention period has the status **Deleted**.
1. Select the workspace and then choose **Restore** from the ribbon, or select **More options (...)** and choose **Restore**.
1. In the **Restore workspaces** panel that appears, enter a new name for the workspace and assign at least one user the Admin role in the workspace.
1. Select **Restore**.

## Permanently delete a deleted collaborative workspace during the retention period

While a deleted collaborative workspace is in a retention period, you can permanently delete it before the end of its retention period.

1. In the admin portal, open the **Workspaces** page and find the deleted collaborative workspace you want to permanently delete. Collaborative workspaces are of type **Workspace**. A workspace that is in a retention period has the status **Deleted**.
1. Select the workspace and then choose **Permanently delete** from the ribbon, or select **More options (...)** and choose **Permanently delete**.

Fabric asks you to confirm the permanent deletion. After you confirm, the workspace and its contents are no longer recoverable.

## Restore a deleted My workspace as an app workspace

When your organization removes users from Microsoft Entra ID, their My workspaces show up as **Deleted** in the **State** column on the **Workspaces** page in the admin portal. You can restore deleted My workspaces as app workspaces that other users can collaborate in.

During this restoration process, you need to assign at least one workspace admin and give the new workspace a name. After you restore the workspace, it shows up as **Workspace** in the **Type** column on the **Workspaces** page in the admin portal.

1. In the admin portal, open the **Workspaces** page and find the deleted personal workspace you want to restore.
1. Select the workspace and then choose **Restore** from the ribbon, or select **More options (...)** and choose **Restore**.
1. In the **Restore workspaces** panel that appears, enter a new name for the workspace and assign at least one user the Admin role in the workspace.
1. Select **Restore**.

After you restore the deleted workspace as an app workspace, it's just like any other app workspace.

## Related content

- [Retention and recovery in Fabric](retention-recovery.md)
- [Recover or permanently delete items](item-recovery.md)
- [Manage workspaces](portal-workspaces.md)
- [Admin portal overview](admin-center.md)
