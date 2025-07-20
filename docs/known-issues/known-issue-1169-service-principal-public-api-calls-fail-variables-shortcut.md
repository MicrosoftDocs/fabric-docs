---
title: Known issue - Service principal based public API calls fail with variables in shortcut payloads
description: A known issue is posted where service principal based public API calls fail with variables in shortcut payloads.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/12/2025
ms.custom: known-issue-1169
---

# Known issue - Service principal based public API calls fail with variables in shortcut payloads

You can use shortcuts with variables in your lakehouse. If you use service principal authentication for your git import and deployment pipeline operations, the call fails. If you use user authentication, the call succeeds. If you use shortcuts without variables, the call succeeds.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

When executing git import/update and Fabric deployment pipeline public API calls, you receive an error. The error result is similar to: `"code":"InvalidShortcutPayloadBatchErrors","message":"Shortcut operation failed with due to following errors: TargetResource () is not allowed for service principal OBO."`.

## Solutions and workarounds

To work around the issue, use user authentication when using variables for your git or deployment pipeline operations.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
