---
title: Known issue - Cross-region capacity migration might fail if items weren't deleted successfully
description: A known issue is posted where a cross-region capacity migration might fail if items weren't deleted successfully.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/22/2025
ms.custom: known-issue-1107
---

# Known issue - Cross-region capacity migration might fail if items weren't deleted successfully

If some items weren't deleted successfully, your cross-region capacity migration might fail.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

When migrating your capacity for cross-region scenarios, you might receive an error. The error is similar to: `*** workspace cannot be reassigned because it includes Fabric items or you're attempting to move them across regions. This is not supported currently. Remove the Fabric items, or move the workspace within the same region, and then try again.`

## Solutions and workarounds

Try using the following workaround for this issue:

- Move the workspace within the same region.
- Remove all Fabric items in the workspace. If you still see the error after you deleted all the Fabric items, create a Microsoft Fabric support ticket to check what Fabric items are still associated to the workspace.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
