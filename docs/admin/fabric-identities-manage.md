---
title: "Manage Fabric identities"
description: "Learn how to view, understand info, and manage Fabric identities as a Fabric administrator."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.topic: how-to
ms.date: 06/16/2024

#customer intent: As a Fabric administrator, I want understand what's on the Fabric identities tab so that I can monitor and govern all the Fabric identities in my organization.

---

# Manage Fabric identities

As a Fabric administrator, you can govern the Fabric identities that exist in your organization on the **Fabric identities** tab in the Admin portal. For information about how to get to and use the Admin portal, see [How to get to the admin portal](./admin-center.md#how-to-get-to-the-admin-portal).

On the **Fabric** tab, you see a list of all the Fabric identities in your tenant.

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

## Related content

* [About the admin portal](admin-center.md)
