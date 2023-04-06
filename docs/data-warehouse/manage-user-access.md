---
title: Manage user access
description: Follow steps to manage user access within a workspace.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: quickstart
ms.date: 03/15/2023
ms.search.form: Warehouse roles and permissions, Workspace roles and permissions
---

# Manage user access

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Through the workspace, you can add members to, and remove them from, workspace roles.

## Add users to workspace roles

1. Browse to the workspace.

   :::image type="content" source="media\manage-user-access\workspace-example.png" alt-text="Screenshot of a workspace." lightbox="media\manage-user-access\workspace-example.png":::

1. Select **Manage Access**.

   :::image type="content" source="media\manage-user-access\select-manage-access.png" alt-text="Screnshot showing where to select Manage access." lightbox="media\manage-user-access\select-manage-access.png":::

1. Select **+Add people or groups**.

   :::image type="content" source="media\manage-user-access\select-add-people.png" alt-text="Screenshot showing where to select Add people or groups." lightbox="media\manage-user-access\select-add-people.png":::

1. Enter the user's email address and select which role you want to assign.

   :::image type="content" source="media\manage-user-access\assign-role-menu.png" alt-text="Screenshot showing the Add people pane with the role choices you can select." lightbox="media\manage-user-access\assign-role-menu.png":::

## View my permissions

Once you're assigned to a workspace role, you can connect to the warehouse (see [Connectivity](connectivity.md) for more information), with the permissions detailed previously. Once connected, you can check your permissions.

1. Connect to the warehouse using [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

1. Open a new query window.

   :::image type="content" source="media\manage-user-access\new-query-context-menu.png" alt-text="Screenshot showing where to select New Query in the Object Explorer context menu." lightbox="media\manage-user-access\new-query-context-menu.png":::

1. To see the permissions granted to the user, execute:

   ```sql
   SELECT *
   FROM sys.fn_my_permissions(NULL, "Database")
   ```

   :::image type="content" source="media\manage-user-access\execute-view-permissions.png" alt-text="Screenshot showing where to execute the command to see permissions." lightbox="media\manage-user-access\execute-view-permissions.png":::

## Next steps

- [Data modeling and defining relationships](data-modeling-defining-relationships.md)
