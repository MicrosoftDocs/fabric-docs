---
title: Secure your data
description: Get started with securing your data in Fabric through the secure tab in the OneLake catalog.
author: msmimart
ms.author: mimart
ms.reviewer: eloldag, aamerril
ms.topic: concept-article
ms.custom:
ms.date: 09/05/2025
#customer intent: As a OneLake user, I want to understand the core concepts and capabilities of data security in OneLake so that I can use them to protect my data stored and accessed in OneLake.
---

# Secure your Fabric data

Use the OneLake catalog's **Secure** tab to view, monitor, and configure security roles across workspaces and items in Microsoft Fabric. It centralizes in one place:

- A view of workspace roles and permissions, for auditing access to workspaces and data.

- A view of OneLake security roles across workspaces and item types. Admins can create, edit, or delete OneLake security roles from a single location.

The **Secure** tab shows you the items that are relevant to you, including which workspaces you have access to. Admin and Member roles are required in a workspace to see data for that workspace. Contributors or Viewers in a workspace only see information about their own access.

## View users

On the **View users** page, you can see all of the users with access to selected workspaces, including a summary of their assigned roles.

1. To get started, choose the workspaces from the **Workspaces** control on the left.
1. Each row represents a unique user, group, or application and shows a count of the roles they have in the selected workspaces.
1. Use the **All users by** filter at the top to limit your selection to specific types of user, workspace roles, or workspaces.
1. Use the **search** control to find a specific user or group and verify their permissions.

## View security roles

On the **View security roles** page, you can see all of the OneLake security roles across the selected workspaces. Each item that has a OneLake security role in those workspaces appears in the list. You can view existing roles, edit roles, delete roles, or create new ones from this page.

### View and edit an existing role

1. Open **View security roles** in the OneLake catalog.

1. Choose the workspaces from the **Workspaces** control on the left.

1. Each row represents a single OneLake security role that's inside a Fabric item. You can view the following details for a role:

   - **Item** name
   - **Role name**
   - **Role type** - only OneLake security roles are supported
   - **Permission** - the permission granted by the role
   - **Location** - the workspace where the item lives
   - **Data owner** - the owner of the item

1. Select a role to open the OneLake security role management experience.

1. You can view and edit the **Data in role** and **Members in role** in the role details page. For more information about viewing and editing a OneLake security role, see [Create and manage OneLake security roles](../onelake/security/create-manage-roles.md).

### Delete a role

1. Open **View security roles** in the OneLake catalog.
1. Choose the workspaces from the **Workspaces** control on the left.
1. Select a role to open the OneLake security role management experience.
1. In the control bar at the top, select **Delete**.
1. Select **Delete** to confirm the deletion, or **Cancel** to return to the previous screen.

### Create a new role

1. Open **View security roles** in the OneLake catalog.
1. Choose the workspaces from the **Workspaces** control on the left.
1. Select a role to open the OneLake security role management experience.
1. Use the control bar at the top to create a new role with **New role** or **Duplicate** an existing role. The role is created in the item where the currently selected role lives. To change to a different item, select a OneLake security role for that item.

## Related content

- [Fabric and OneLake security overview](../security/security-overview.md)
- [OneLake data access roles (preview)](../onelake/security/get-started-onelake-security.md)
- [OneLake catalog overview](./onelake-catalog-overview.md)
- [Govern your data](./onelake-catalog-govern.md)