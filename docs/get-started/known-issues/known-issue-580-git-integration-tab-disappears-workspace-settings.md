---
title: Known issue - **Git integration** tab disappears in **Workspace settings**
description: A known issue is posted where the **Git integration** tab disappears in **Workspace settings**
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 01/11/2024
ms.custom: known-issue-580
---

# Known issue - **Git integration** tab disappears in **Workspace settings**

In a Fabric workspace, you go to **Workspace settings**. You normally expect to see the **Git integration** tab on the left side of the screen, but the tab isn't available.

**Status:** Fixed: January 11, 2024

**Product Experience:** Administration & Management

## Symptoms

The option to select the **Git integration** tab in **Workspace settings** isn't available.

## Solutions and workarounds

As a workaround, you can append `&displayProjectTridentUIEnabled=1` to the browser URL, and reload the page.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
