---
title: Capacity reassignment restrictions and common issues
description: Learn about restrictions and common issues when reassigning workspaces to different capacities in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.custom: admin-portal
ms.topic: overview
ms.date: 01/30/2026
ai-usage: ai-assisted
---

# Capacity reassignment restrictions and common issues

Workspaces and the data they contain reside on capacities. Workspace admins can move the data contained in a workspace by reassigning the workspace to a different capacity. The capacity can be in the same region or a different region.

## Reassigning a workspace to another capacity

In the Fabric UI, workspaces can be moved to other capacities in the following ways:

* Fabric admins can reassign workspaces to a different capacity individually via the [Workspaces page](portal-workspaces.md#reassign-a-workspace-to-a-different-capacity) in the Fabric Admin portal.
* Fabric admins and capacity admins can reassign workspaces to a capacity in bulk via the **Workspaces assigned to this capacity** option in the [capacity's settings](./capacity-settings.md#capacity-settings).
* Workspace admins can reassign their workspace to a different capacity via the [Workspace type option of the workspace settings](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity).

### Permission Requirements by capacity type to reassign workspaces

- **Power BI Premium (P) capacity** admin can effectively "claim" any workspace in the organization and pull it into their capacity by searching for the workspace name or assigning by user/group.

- **Fabric (F) Capacity** admin __must__ also be a __Workspace Admin__ of that specific workspace.

- **A capacity** admin __must__ also be a __Workspace Admin__ of that specific workspace.

- **Embedded (EM) capacity** admin, similar to P capacity, can "claim" any workspace. 

- **Global Admin or Fabric Admin** can move any workspace to any capacity type.

Capacity Administrator can perform following operations by Capacity type:

|**Capacity Type**|**Can Move Any Workspace?**|**Workspace Admin Role Required?**|**Management Tool**|
|----|---|---|---|
|__P (Premium)__|__Yes__|No|Fabric Admin Portal|
|__F (Fabric)__|__No__ |__Yes__|Fabric Portal, User API, or Admin API|
|__A (Azure)__|__No__|__Yes__|Fabric Portal, User API, or Admin API|
|__EM (Office)__|__Yes__|__No__|Fabric Admin Portal|

## Restrictions on moving workspaces around

Moving workspaces from one capacity to another has the following restrictions:

* When you move a workspace, all jobs related to items in the workspace get canceled.

* Only movable item types can move between regions. **If you're reassigning a workspace to a capacity located in a different region, you must remove all non-movable items first, otherwise reassignment will fail**.

    The following items types are movable:

    * Report
    * Semantic model (small storage format)
    * Dashboard
    * Dataflow Gen1
    * Paginated Report
    * Datamart
    * Scorecard 

    All other item types can't be moved between regions and must be removed from the workspace before you can migrate the workspace to a capacity in another region.

    After you remove the non-movable items and the workspace is migrated to a different region, you can create new items of the non-movable type. It can take up to an hour after the migration before can do so.

* Only Power BI items can move from Premium capacity or Fabric to Power BI Pro or Power BI Premium Per-User (PPU) workspace type (with exceptions as noted here). If you're changing a workspace from Premium capacity or Fabric to Power BI Pro or Power BI Premium Per-User (PPU) workspace type, you must remove all non-Power BI items and any Power BI items that can't be moved first. Otherwise the workspace type change fails.

    The following item types are considered Power BI items from the perspective of the workspace type.

    * Report
    * Semantic model (small storage format and large storage format)
    * Dashboard
    * Org app**
    * Dataflow Gen1
    * Paginated Report
    * Metric set*
    * Exploration**
    * Datamart*
    * Scorecard

    *Can't move to Power BI Pro<br>**Can't move to Power BI Pro or Power BI Premium Per-User (PPU)

    All other item types must be removed from the workspace before you can change its workspace type from Power BI Premium capacity or Fabric to Power BI Pro or Power BI Premium Per-User (PPU).

> [!NOTE]
> If you have Dataflow Gen2 items in your workspace, their underlying staging lakehouse and staging warehouse items only become visible in the workspace UI after **all** Dataflow Gen2 items in the workspace are deleted. These staging items are Fabric items as well, and as such their existence can prevent the workspace from being successfully migrated from one region to another. To ensure that your workspace can be successfully migrated across regions, first delete all Dataflow Gen2 items in the workspace. Then delete all the staging lakehouses and warehouses in the workspace that become visible.

## Discovering capacity reassignment issues

In some cases, a workspace might appear to be successfully reassigned to a new capacity, but some or all of its items remain attached to the original capacity. In this case, a warning banner appears when you open an affected item.

:::image type="content" source="./media/portal-workspace-capacity-reassignment/reassignment-warning.png" alt-text="Screenshot showing the workspace type info page with a warning about items not migrated to the new capacity." lightbox="./media/portal-workspace-capacity-reassignment/reassignment-warning.png":::

If you have access to the workspace settings, a similar warning banner appears when you view the **Workspace type** settings.

:::image type="content" source="media/portal-workspace-capacity-reassignment/license-info.png" alt-text="Screenshot showing the workspace type info page." lightbox="media/portal-workspace-capacity-reassignment/license-info.png":::

To see which items are affected, select **View details** in the warning banner. A detailed view opens showing all items that remain attached to a different capacity than the workspace. For each item, the capacity name, its region, and the reason the migration failed appears.

:::image type="content" source="media/portal-workspace-capacity-reassignment/license-info-details.png" alt-text="Screenshot showing the workspace type info page with item details." lightbox="media/portal-workspace-capacity-reassignment/license-info-details.png":::

These items are at risk of becoming unavailable if their attached capacity is deleted or paused. To prevent disruption and resolve these issues, a workspace administrator should take the steps described in the next section.

## Resolving common capacity reassignment issues

When a workspace reassignment fails for some or all items, the detailed view shows a reason for each failed migration. This section helps you understand and resolve these issues.

### General troubleshooting steps

Before addressing specific errors, follow these general steps:

1. **Don't delete or pause the source capacity**. Items that failed to migrate remain attached to their original capacity (shown in the "Capacity" column). Deleting or pausing this capacity makes those items unavailable.

2. **Retry the reassignment**. Many failures result from transient errors. Try reassigning the workspace to the destination capacity again.

3. **Consider same-region migration**. If you're moving between regions, try moving to a different capacity in the same region first to rule out cross-region migration limitations.

### Error types

The following sections describe common error types you might encounter during capacity reassignment, along with their causes and resolutions.

#### Unsupported migration

**Why this happens:** The workspace contains items or configurations that can't be migrated automatically. Common causes include:
- Private Link networking is enabled for the workspace.
- Customer-managed key (CMK) configuration issues.

**How to resolve:**

1. **Check Private Link settings:**
   - Go to **Workspace settings** > **Inbound networking**.
   - If Private Link is enabled, temporarily disable it.
   - Reassign the workspace.
   - Re-enable Private Link after successful migration.

2. **Review customer-managed key (CMK) configuration:**
   - Verify that the destination capacity supports the workspace's CMK settings.
   - Ensure your CMK permissions are correctly configured for the target region.
   - For more information, see [Customer-managed keys](../security/workspace-customer-managed-keys.md).

#### Retries exhausted

**Why this happens:** The system attempted to migrate the item multiple times but encountered persistent failures, such as network timeouts, resource constraints, or capacity state changes during migration.

**How to resolve:**

1. **Verify capacity stability:**
   - Ensure both source and destination capacities exist, are active, and not paused.
   - Keep capacities in a stable state throughout the entire migration process.
   - Avoid scaling or pausing operations during reassignment.

2. **Retry the reassignment**. After confirming capacity stability, attempt the workspace reassignment again.

3. **Try a different capacity**. To prevent cross-region migration limitations from causing migration failures, try moving the workspace to a different capacity in the same region.

#### DB Migration error

**Why this happens:** This error is specific to semantic models (datasets) and indicates that the database migration component failed to transfer the model data. This error can occur due to network timeouts, resource constraints, or capacity state changes during migration.

**How to resolve:**

1. **Verify capacity stability:**
   - Ensure both source and destination capacities exist, are active, and not paused.
   - Keep capacities in a stable state throughout the entire migration process.
   - Avoid scaling or pausing operations during reassignment.

2. **Retry the reassignment**. After confirming capacity stability, attempt the workspace reassignment again.

3. **Try a different capacity**. Try moving the workspace to a different capacity in the same region to prevent cross-region migration limitations from causing migration failures.

## Related articles

- [Manage workspaces](portal-workspaces.md)

