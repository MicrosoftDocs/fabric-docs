---
title: Known issue - Git integration undo after initial sync fails might delete items
description: A known issue is posted where performing a Git integration undo action after the initial sync fails might delete items from workspace.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 02/20/2025
ms.custom: known-issue-1031
---

# Known issue - Git integration undo after initial sync fails might delete items

The first time you connect a workspace to a Git repository, and initial sync runs. If the initial sync fails, you can undo the changes to the workspace. In some cases, trying to undo the changes might result in the items being deleted from the workspace. The items deleted don't have a corresponding instance in the Git repository.

**Status:** Open

**Product Experience:** Administration & Management

## Symptoms

You see items missing in a workspace after connecting the workspace to a Git repository. The initial sync failed, and you tried to undo the changes. The missing items don't have a corresponding instance in the Git repository.

## Solutions and workarounds

To prevent the issue from happening, don't perform the undo action after the initial sync fails. Alternatively, you can retry the sync by disconnecting and reconnecting to the Git provider.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
