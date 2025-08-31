---
title: Give Users Access to Workspaces
description: "Learn how to give others access to workspaces, and how to modify their access."
author: SnehaGunda
ms.author: sngun
ms.reviewer: 
ms.topic: how-to
ms.custom: 
ms.date: 06/10/2025
---
# Give users access to workspaces

After you [create a workspace](create-workspaces.md) in [!INCLUDE [product-name](../includes/product-name.md)], or if you have an Admin or Member role in a workspace, you can give others access to it by adding them to the different roles. Workspace creators are automatically admins. For an explanation of the different roles, see [Roles in workspaces](roles-workspaces.md).

> [!NOTE]
> To enforce row-level security (RLS) on Power BI items for [!INCLUDE [product-name](../includes/product-name.md)] Pro users who browse content in a workspace, assign them the Viewer role.
>
> After you add or remove workspace access for a user or a group, the permission change only takes effect the next time the user logs into [!INCLUDE [product-name](../includes/product-name.md)].

## Give access to your workspace

1. Because you have the Admin or Member role in the workspace, on the command bar of the workspace page, you see **Manage access**. Sometimes this entry is in the **More options (...)** menu.

    :::image type="content" source="media/workspace-access/workspace-manage-access-entry.png" alt-text="Screenshot of entry of manage access in command bar of workspace page." lightbox="media/workspace-access/workspace-manage-access-entry.png":::

    **Manage access** in the **More options** menu:

    :::image type="content" source="media/workspace-access/workspace-manage-access-entry-in-contextual-menu.png" alt-text="Screenshot of entry of manage access in More options menu in workspace page." lightbox="media/workspace-access/workspace-manage-access-entry-in-contextual-menu.png":::

1. Select **Add people or groups**.

   :::image type="content" source="media/workspace-access/workspace-manage-access-add-button.png" alt-text="Screenshot of add button in manage access panel.":::

1. Enter name or email, select a [role](roles-workspaces.md), and select **Add**. You can add security groups, mail-enabled security groups, distribution lists, Microsoft 365 groups, or individuals to these workspaces as admins, members, contributors, or viewers. If you have the member role, you can only add others to the member, contributor, or viewer roles.
   
   :::image type="content" source="media/workspace-access/workspace-manage-access-add-people-panel.png" alt-text="Screenshot of add people panel.":::

1. You can view and modify access later if needed. Use the **Search** box to search for people or groups who already have access to this workspace. To modify access, select the dropdown arrow and select a role.

   :::image type="content" source="media/workspace-access/workspace-manage-access-edit-role.png" alt-text="Screenshot of modify role in a workspace.":::

## Workspace access limits

Each workspace will be limited to a maximum of 1,000 users or groups in workspace roles (Admin, Member, Contributor, Viewer). This change does not affect the number of users within a group itself. For example, if there is a workspace with one group, that group can have over 1,000 users. The limitation also covers external guests. Workspace admins or members attempting to add users or groups after this limit is reached, will get an error in the workspace access flow. 

## Related content

* Read about [the workspace experience](workspaces.md)
* [Create a workspace](create-workspaces.md)
* [Roles in workspaces](roles-workspaces.md)
