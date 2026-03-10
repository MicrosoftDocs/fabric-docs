---
title: Resolve Logical ID Conflicts in Microsoft Fabric
description: Learn how to resolve logical ID conflicts in Microsoft Fabric.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: how-to
ms.date: 03/10/2026

---

# Resolve Logical ID Conflicts in Microsoft Fabric
When working with Git‑connected workspaces in Microsoft Fabric, you may encounter situations where items in your workspace and items in your Git branch share the same name and type, but have different logical IDs. This mismatch can trigger a metadata overwrite warning and requires you to decide which logical ID should be retained.

This article explains what logical IDs are, why conflicts happen, and how to resolve them safely.

## What is a Logical ID?
When your Fabric workspace is connected to a Git branch, every item in the workspace is associated with the logical IDs defined in that branch.
Those IDs represent the "identity" of each item across Microsoft Fabric workspaces. A logical ID is an automatically generated, cross‑workspace identifier that connects an item in a workspace with its corresponding item in a Git branch. Items with the same logicalIds are assumed to be the same. 

To learn more about logical IDs and how Fabric represents items in source control, see the
[Git integration source code format documentation](source-code-format.md).

## What is a Logical ID conflict?
A Logical ID conflict occurs when Fabric detects two items that have the same name and item type but different Logical IDs—one in the workspace and one in the Git-connected branch. Since Logical IDs are the unique binding keys between Fabric items and their Git representations, a mismatch means Fabric doesn’t know which version should be treated as the “true” identity of the item.

When a conflict is dectected you’ll see a Confirm metadata overwrite dialog similar to the following:

   :::image type="content" source="media/logical-id-conflict-resolution/id-1.png" alt-text="Screenshot of confirm metadata overwrite." lightbox="media/logical-id-conflict-resolution/id-1.png":::

This conflict indicates that your workspace item has a different logical ID than the version of the item coming from source control.

Confirming the operation results in the logical id from your source control replacing the matched item’s logical id within the workspace. 

## Commmon scenarios that lead to conflicts
Logical ID mismatches may occur when you:

|Scenario|Description|
|-----|-----|
|Connect a workspace to a non‑empty Git folder|If the Git repo contains items that match the workspace items by name and type but hold different logical IDs, Fabric will prompt you to confirm overwriting workspace metadata.|
|Switch to a different branch|Changing branches may bring in item definitions that do not share the same logical IDs as the workspace versions.|
|Branch-out to a new branch based on a different branch than the connected branch|Introduces a second, unrelated lineage of item identities into a workspace that is already mapped to a specific Git branch.|
|Branch‑out to an existing workspace that contains items|When branching out from a workspace into a existing workspace that already contains items, Microsoft Fabric aligns the target workspace metadata with the new connected branch which was created from the source workspace branch metadata.|





## Resolving Logical ID Conflicts
When a conflict occurs, you must decide whether to overwrite the workspace metadata or retain it.

### Option 1: Overwrite workspace metadata (take Git version)
If you confirm the overwrite:

- The logical ID from source control replaces the existing logical ID in the workspace.
- Workspace metadata will now match the Git version.

Use this option when you want the workspace to align fully with your Git branch.

#### Impact on existing automations
By choosing to overwrite the workspace metadata, you replace the existing Logical IDs in the workspace with the versions coming from Git. This may break any existing automations that rely on the current Logical IDs to identify items consistently. Because these automations reference specific item identities, changing those Logical IDs effectively makes the workspace items "new" from the perspective of those workflows. As a result, downstream jobs may fail to locate items, skip updates, or generate duplicates until the automation logic is updated to recognize the new identities.

### Option 2: Keep existing workspace metadata (keep workspace version)
If you want to preserve the workspace’s logical ID:

- Do not confirm the overwrite.
- Update your Git repository with the logical IDs currently present in the workspace.

You can do this by:

- Checking out or committing to a different branch and pulling the workspace metadata into Git, or
- Renaming the item(s) in Git, which causes Fabric to treat them as add/remove operations instead of conflicting updates.


## Related content

- [Conflict resolution](./conflict-resolution.md)
- [Manually update after a failed update](./partial-update.md)
- [Lifecycle management Frequently asked questions](../faq.yml)
