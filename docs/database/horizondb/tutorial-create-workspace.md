---
title: "Tutorial: Create a workspace for Microsoft Fabric HorizonDB"
description: Create and verify the Microsoft Fabric workspace that contains the Fabric HorizonDB end-to-end tutorial resources.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Create a workspace for Microsoft Fabric HorizonDB

In this tutorial step, you create the Fabric workspace that contains the HorizonDB database and its dependent analytical items.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Complete the [tutorial introduction](tutorial-introduction.md).
- Sign in with an identity that can create Fabric workspaces, or ask an administrator for access to an existing eligible workspace.
- Confirm that an active Fabric capacity is available in a region where Fabric HorizonDB is offered.
- Confirm with your administrator or preview contact that the tenant, workspace, capacity, and region are enabled for Fabric HorizonDB and Federated Analytics.

If your organization doesn't allow you to create workspaces, use an existing workspace where you can create the tutorial items. Record its name and use it in place of `contoso-horizondb-tutorial`.

## Create the workspace

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).
1. In the navigation pane, select **Workspaces**.
1. Select **New workspace**.
1. Enter `contoso-horizondb-tutorial` as the workspace name.
1. Optionally, enter a description such as `Fabric HorizonDB end-to-end tutorial`.
1. Expand the advanced or license configuration shown by the portal.
1. Assign the workspace to an eligible active Fabric capacity.
1. Select **Apply** or **Save**, according to the control shown in the portal.
1. Open the new workspace.

For general workspace settings and role requirements, see [Create a workspace](../../fundamentals/create-workspaces.md).

## Verify the workspace

Before you create the database:

1. Open the workspace settings.
1. Confirm that the workspace is assigned to the intended Fabric capacity.
1. Confirm that you have Contributor or Admin access and can create PostgreSQL database, warehouse, and Copy job items.
1. Return to the workspace and verify that **New item** is available.

If the HorizonDB database isn't available later, check:

- Fabric HorizonDB availability for the workspace region.
- Tenant and preview enablement.
- Capacity assignment and state.
- Your workspace role and item-creation permission.

Don't move the workspace to another capacity or region during the tutorial. A capacity change can affect item availability and integration behavior.

Keep the workspace dedicated to testing and use synthetic, nonsensitive data. The identity that creates the database in the next step is the only identity that can connect to PostgreSQL during the current preview.

## Expected outcome

The `contoso-horizondb-tutorial` workspace is open, assigned to eligible active capacity, and ready for item creation. It doesn't contain a HorizonDB database yet.

## Next step

> [!div class="nextstepaction"]
> [Create the HorizonDB database](tutorial-create-database.md)

## Related content

- [Workspace roles](../../fundamentals/roles-workspaces.md).
- [Create a HorizonDB database](create.md).
