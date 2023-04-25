---
title: Resolve conflicts with Git integration
description: Learn how to resolve conflicts when using Fabric's git integration tools.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: 
---

# Conflict resolution

A conflict occurs when changes are made *to the same item* in both the workspace and the remote git repository. When a conflict occurs, both **Commit** and **Update** are disabled until the conflict is resolved.

You have two options:

- Revert either the workspace or the git repository to a previous synced state
- Resolve the conflict in git.

## Revert to a previous synced state

If you revert to a previous synced state, you lose the changes made in one of the locations. If you revert the git branch, Use the undo command in the workspace to revert to last synced state.
To revert to the prior synced state, do one of the following steps:

- Return the workspace to the last synced state by using the [Undo](./git-get-started.md#commit-changes-to-git) command.
- Revert to the last synced state in git.
- Disconnect and reconnect.

## Resolve conflict in git

If you made numerous changes and don’t want to revert to a previous state, you can try resolving the conflict in the git repo:

1. Check out new branch using the last synced branch ID shown on bottom of screen
1. Resolve the conflict in git
1. Merge the new branch into the original branch
1. Disconnect and reconnect to original branch
