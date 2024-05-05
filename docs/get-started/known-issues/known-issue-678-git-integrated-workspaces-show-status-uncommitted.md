---
title: Known issue - Git integrated workspaces incorrectly show status of Uncommitted
description: A known issue is posted where Git integrated workspaces incorrectly show status of Uncommitted.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/01/2024
ms.custom: known-issue-678
---

# Known issue - Git integrated workspaces incorrectly show status of Uncommitted

You have a Git integrated workspace that was synced. However, in the workspace view, the Git status is 'Uncommitted.'

**Status:** Fixed: May 1, 2024

**Product Experience:** Administration & Management

## Symptoms

The Git integrated workspaces show 'Uncommitted' Git status in workspace view though they're already synced.

## Solutions and workarounds

To correct the status, follow these steps:

1. Commit all changes from workspaces into Git. If conflicts are created, you can resolve manually.
1. Undo all changes in the workspace. Open all reports in the March version of Power BI Desktop, commit changes, and then sync Git into all workspaces.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
