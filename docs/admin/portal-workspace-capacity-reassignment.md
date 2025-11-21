---
title: Capacity reassignment restrictions and common issues
description: Learn about restrictions and common issues when reassigning workspaces to different capacities in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.custom: admin-portal
ms.topic: overview
ms.date: 11/21/2025
---

# Capacity reassignment restrictions and common issues

Workspaces and the data they contain reside on capacities, and can be moved around by assigning them to different capacities. Such movement might be to a capacity in the same region, or it might be to a capacity in a different region.

## Reassigning a workspace to another capacity

In the Fabric UI, workspaces can be moved to other capacities in the following ways:

* Fabric admins can reassign workspaces to a different capacity individually via the [Workspaces page](#reassign-a-workspace-to-a-different-capacity) in the Fabric Admin portal.
* Fabric admins and capacity admins can reassign workspaces to a capacity in bulk via the **Workspaces assigned to this capacity** option in the [capacity's settings](./capacity-settings.md#capacity-settings).
* Workspace admins can reassign their workspace to a different capacity via the **[License info option of the workspace settings](../fundamentals/workspace-license-mode.md#reassign-a-workspace-to-a-different-capacity)**.

## Discovering capacity reassignment issues

In some cases, a workspace may appear to have been successfully reassigned to a new capacity, but some or all of its items remain attached to the original capacity. When this happens, you'll see a warning banner when you open an affected item.

:::image type="content" source="./media/portal-workspace-capacity-reassignment/reassignment-warning.png" alt-text="Screenshot showing the License info page with a warning about items not migrated to the new capacity." lightbox="./media/portal-workspace-capacity-reassignment/reassignment-warning.png":::

If you have access to the workspace settings, you'll see a similar warning banner when you view the **License info** settings.

:::image type="content" source="media/portal-workspace-capacity-reassignment/license-info.png" alt-text="Screenshot showing the License Info page." lightbox="media/portal-workspace-capacity-reassignment/license-info.png":::

To see which items are affected, select **View details** in the warning banner. This opens a detailed view showing all items that remain attached to a different capacity than the workspace. For each item, you'll see the capacity name, its region, and the reason the migration failed.

:::image type="content" source="media/portal-workspace-capacity-reassignment/license-info-details.png" alt-text="Screenshot showing the License Info page with item details." lightbox="media/portal-workspace-capacity-reassignment/license-info-details.png":::

These items are at risk of becoming unavailable if their attached capacity is deleted or paused. To prevent disruption and resolve these issues, a workspace administrator should take the steps described in the next section.

## Resolving common capacity reassignment issues

When a workspace reassignment fails for some or all items, the detailed view shows a reason for each failed migration. This section helps you understand and resolve these issues.

### General troubleshooting steps

Before addressing specific errors, follow these general steps:

1. **Don't delete or pause the source capacity** – Items that failed to migrate remain attached to their original capacity (shown in the "Capacity" column). Deleting or pausing this capacity will make those items unavailable.

2. **Retry the reassignment** – Many failures are caused by transient errors. Try reassigning the workspace to the destination capacity again.

3. **Consider same-region migration** – If you're moving between regions, try moving to a different capacity in the same region first to rule out cross-region migration limitations.

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

3. **Try a different capacity**. Try moving the workspace to a different capacity in the same region to prevent cross-region migration limitations from causing migration failures.

#### DB Migration error

**Why this happens:** This error is specific to semantic models (datasets) and indicates that the database migration component failed to transfer the model data. This can occur due to network timeouts, resource constraints, or capacity state changes during migration.

**How to resolve:**

1. **Verify capacity stability:**
   - Ensure both source and destination capacities exist, are active, and not paused.
   - Keep capacities in a stable state throughout the entire migration process.
   - Avoid scaling or pausing operations during reassignment.

2. **Retry the reassignment**. After confirming capacity stability, attempt the workspace reassignment again.

3. **Try a different capacity**. Try moving the workspace to a different capacity in the same region to prevent cross-region migration limitations from causing migration failures.

## Related articles

- [Manage workspaces](portal-workspaces.md)
