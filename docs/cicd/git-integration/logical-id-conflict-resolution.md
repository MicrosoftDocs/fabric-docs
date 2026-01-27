---
title: Resolve Logical ID Conflicts in Microsoft Fabric
description: Learn how to resolve logical ID conflicts in Microsoft Fabric.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: how-to
ms.date: 12/15/2025

---

# Resolve Logical ID Conflicts in Microsoft Fabric
When working with Git‑connected workspaces in Microsoft Fabric, you may encounter situations where items in your workspace and items in your Git branch share the same name and type, but have different logical IDs. This mismatch can trigger a metadata overwrite warning and requires you to decide which logical ID should be retained.

This article explains what logical IDs are, why conflicts happen, and how to resolve them safely.

## What is a Logical ID?
When your Fabric workspace is connected to a Git branch, every item in the workspace is associated with the logical IDs defined in that branch.
Those IDs represent the "identity" of each item across systems. A logical ID is an automatically generated, cross‑workspace identifier that connects an item in a workspace with its corresponding item in a Git branch. Items with the same logicalIds are assumed to be the same. 

To learn more about logical IDs and how Fabric represents items in source control, see the
[Git integration source code format documentation](source-code-format.md).

## When Logical ID Conflicts Occur

There are cases where in the Fabric UI where a conflict is dectected and you’ll see a Confirm metadata overwrite dialog similar to the following:

   :::image type="content" source="media/logical-id-conflict-resolution/id-1.png" alt-text="Screenshot of confirm metadata overwrite." lightbox="media/logical-id-conflict-resolution/id-1.png":::

This conflict indicates that your workspace item has a different logical ID than the version of the item coming from source control.

Confirming the operation will result that the logical id from your source control will replace the matched item’s logical id within the workspace. 

## Commmon scenarios that lead to conflicts
Logical ID mismatches may occur when you:

|Scenario|Description|
|-----|-----|
|Connect a workspace to a non‑empty Git folder|If the Git repo contains items that match the workspace items by name and type but hold different logical IDs, Fabric will prompt you to confirm overwriting workspace metadata.|
|Switch to a different branch|Changing branches may bring in item definitions that do not share the same logical IDs as the workspace versions.|
|Checkout to a new branch based on a different branch than the connected branch|Introduces a second, unrelated lineage of item identities into a workspace that is already mapped to a specific Git branch.|
|Branch‑out to an existing workspace|When branching out from Git into a workspace that already contains items, Fabric aligns workspace metadata with the source control metadata.|





## Resolving Logical ID Conflicts
When a conflict occurs, you must decide whether to overwrite the workspace metadata or retain it.

### Option 1: Overwrite workspace metadata (take Git version)
If you confirm the overwrite:

- The logical ID from source control replaces the existing logical ID in the workspace.
- Workspace metadata will now match the Git version.

Use this option when you want the workspace to align fully with your Git branch.

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
