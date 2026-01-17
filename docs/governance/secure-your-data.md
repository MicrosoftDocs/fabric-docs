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

OneLake catalog's secure tab helps you view, monitor, and configure security roles across workspaces and items in Microsoft Fabric. It centralizes in one place:

- A view of workspace roles and permissions, for auditing access to workspaces and data.

- A view of OneLake security roles across workspaces and item types. Admins can create, edit, or delete OneLake security roles from a single location.

The secure tab shows you the items that are relevant to you, including which workspaces you have access to. Admin and Member roles are required in a workspace to see data for that workspace. Contributors or Viewers in a workspace will only see information about their own access.

## View users

The view users page allows you to see all users with access to selected workspaces, including a summary of their assigned roles.

1. To get started, choose the workspaces from the **Workspaces** control on the left.
2. Each row represents a unique user, group, or application and shows a count of the roles they have in the selected workspaces.
3. Use the **All user by** filter at the top to limit your selection to specific types of user, workspace roles, or workspaces.
4. The **search** control can be used to find a specific user or group and verify their permissions.

## View security roles

The view security roles page gives a view of all the OneLake security roles across the selected workspaces. Each item with OneLake security roles in those workspaces will be shown in the list. You can view existing roles, edit roles, delete roles, or create new ones from this page.

### View and edit an existing role

1. Open the **View security roles** page in the OneLake catalog.
2. Choose the workspaces from the **Workspaces** control on the left.
3. Each row represents a single OneLake security role that is inside a Fabric item. You can view the item name, the **Role name**, **Role type** (only OneLake security roles are supported today), the **Permission** granted by the role, the workspace where the item lives under **Location**, and the owner of the item in **Data owner**.
4. Select a role, to open the OneLake security role management experience.
5. You can view the data and role members from this experience. The role data and membership can also be edited here as well. For more details on viewing and editing a OneLake security role, see the information on [editing a OneLake security role](../onelake/security/get-started-onelake-security.md#edit-a-role)

### Delete a role

1. Open the **View security roles** page in the OneLake catalog.
2. Choose the workspaces from the **Workspaces** control on the left.
3. Select a role, to open the OneLake security role management experience.
4. In the control bar at the top, select **Delete**.
5. You will be prompted to confirm the deletion. Select **Delete** to confirm the deletion, or **Cancel** to return back to the previous screen.

### Create a new role

1. Open the **View security roles** page in the OneLake catalog.
2. Choose the workspaces from the **Workspaces** control on the left.
3. Select a role, to open the OneLake security role management experience.
4. The control bar at the top, you can create a new role with **+ New role** or you can **Duplicate** an existing role. The role will be created in the item where the currently selected role lives. To change to a different item, select a OneLake security role for that item.

## Related content

- [Fabric and OneLake security overview](../security/security-overview.md)
- [OneLake data access roles (preview)](../onelake/security/get-started-onelake-security.md)
- [OneLake catalog overview](./onelake-catalog-overview.md)
- [Govern your data](./onelake-catalog-govern.md)