---
title: Known issue - OneLake Shared Access Signature (SAS) can't read cross-region shortcuts
description: A known issue is posted where OneLake Shared Access Signature (SAS) can't read cross-region shortcuts.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/24/2025
ms.custom: known-issue-897
---

# Known issue - OneLake Shared Access Signature (SAS) can't read cross-region shortcuts

You can't read a cross-region shortcut with a OneLake shared access signature (SAS).

**Status:** Fixed: March 24, 2025

**Product Experience:** OneLake

## Symptoms

You receive a 401 Unauthorized error, even if the delegated SAS has the correct permissions to access the shortcut.

## Solutions and workarounds

As a workaround, you can read the shortcut from its home region, or authenticate using a Microsoft Entra ID instead of a OneLake SAS.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
