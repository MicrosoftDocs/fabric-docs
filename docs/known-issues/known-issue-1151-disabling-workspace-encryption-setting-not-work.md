---
title: Known issue - Disabling the Workspace encryption setting doesn't work
description: A known issue is posted where disabling the Workspace encryption setting doesn't work
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/27/2025
ms.custom: known-issue-1151
---

# Known issue - Disabling the Workspace encryption setting doesn't work

The **Disable Encryption** operation fails when a workspace has existing items. The failure prevents you from reverting to Microsoft-managed keys (MMK) or updating Workspace encryption settings. The workspace is effectively locked in an encrypted state with applied key. The issue doesn't affect new or empty workspaces, where disabling customer-managed keys (CMK) works as expected.

**Status:** Open

**Product Experience:** Administration & Management

## Symptoms

If you turn off the workspace encryption setting, you see the status as **In Progress** and the change doesn't complete. You then delete the key in the Key Vault, but can't access the data in your lakehouse as the key isn't available.

## Solutions and workarounds

While the status is **In Progress**, be sure not to delete your key or key vault.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
