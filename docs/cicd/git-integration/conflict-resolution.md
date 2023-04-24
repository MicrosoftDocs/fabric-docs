---
title: Resolve conflicts with Git integration
description: Learn how to resolve conflicts when using Fabric's git integration tools.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: how-to
ms.date: 03/21/2023
ms.custom: 
---

# Conflict Resolution

A conflict occurs when there are uncommitted changes in the workspace and incoming changes from the git repository on the same item. When a conflict happens both **Commit** and **Update** are disabled.

You have two options:

- Revert either the workspace or the git repository to a previous synced state
- Resolve the conflict in git.

## Revert to a previous synced state

If you revert to a previous synced state, you will lose the changes made in one of the locations. Use the undo command in the workspace to revert to last synced state. (You will lose the work) and then update.
To revert to the prior synced state, do one of the following steps:

- Return the workspace to the last synced state by using the the [Undo](./git-get-started.md#undo-saved-change) command.
- Revert to the last synced state in git.
- Disconnect and reconnect.

## Resolve conflict in git

If you made a lot of changes and don’t want to revert to a previous state, you can try resolving the conflict in the git repo:

1. Check out new branch using the last synced branch id shown on bottom of screen
1. Resolve the conflict in git
1. Merge the new branch into the original branch
1. Disconnect and reconnect to original branch
