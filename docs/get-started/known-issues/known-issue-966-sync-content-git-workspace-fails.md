---
title: Known issue - Sync content from Git in workspace fails
description: A known issue is posted where the sync content from Git in workspace fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/11/2024
ms.custom: known-issue-966
---

# Known issue - Sync content from Git in workspace fails

You can connect your workspace to Git and perform a sync from Git into the workspace. When you choose the **Sync content from Git into this workspace** and select the **Sync** button, you receive an error and the sync fails.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

The error typically happens when you try to sync from a new workspace that wasn't previously synced. It also might happen due to an object with an invalid format. You receive a message similar to: `Theirs artifact must have the same logical id as Yours artifact at this point`, and can't perform any operations using Git.

## Solutions and workarounds

As a workaround for a small workspace, you can fix the problem directly in Git or rename the items.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
