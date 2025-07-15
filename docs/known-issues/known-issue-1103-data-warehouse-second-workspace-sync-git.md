---
title: Known issue - Data warehouse in second workspace out of sync from Git
description: A known issue is posted where the data warehouse in second workspace out of sync from Git.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/12/2025
ms.custom: known-issue-1103
---

# Known issue - Data warehouse in second workspace out of sync from Git

You can associate two workspaces with Git. You can either create the second workspace manually or use the **Branch out to another workspace** feature. If you have a data warehouse in one of the workspaces, you can't update the data warehouse from Git.

**Status:** Fixed: June 12, 2025

**Product Experience:** Data Warehouse

## Symptoms

The data warehouse item has an **Uncommitted** git status after connecting to git in the second workspace. Also, the Git source control panel has **+** and **-** shown in the **Changes** tab. In a network/browser trace, the logical identifier returned for the data warehouse is a **0000** GUID.

## Solutions and workarounds

There's no workaround at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
