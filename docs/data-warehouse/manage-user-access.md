---
title: Manage user access
description: Follow steps to manage user access within a workspace.
ms.reviewer: WilliamDAssafMSFT
ms.author: kedodd
author: kedodd
ms.topic: quickstart
ms.date: 03/15/2023
---

# Manage user access

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

> [!TIP]
> Applies to: Warehouse (default) and warehouse

Through the workspace, you can add members to, and remove them from, workspace roles.

## Add users to workspace roles

1. Browse to the workspace.

   IMAGE

1. Select **Manage Access**.

   IMAGE

1. Select **+Add people or groups**.

   IMAGE
1. Enter the user's email address and select which role you want to assign.

   IMAGE

## View my permissions

Once you're assigned to a workspace role, you can connect to the warehouse (see [Connectivity](connectivity.md) for more information), with the permissions detailed previously. Once connected, you can check your permissions.

1. Connect to the warehouse using SSMS.

1. Open a new query window.

   IMAGE

1. To see the permissions granted to the user, execute:

   ```
   SELECT *
   FROM sys.fn_my_permissions(NULL, “Database”)
   ```

   IMAGE

## Next steps

- Warehouse and deployment pipelines
