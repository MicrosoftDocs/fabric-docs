---
title: Known issue - Environment doesn't work when runtime version is changed to Runtime 1.1
description: A known issue is posted where environment doesn't work when runtime version is changed to Runtime 1.1.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/23/2024
ms.custom: known-issue-728
---

# Known issue - Environment doesn't work when runtime version is changed to Runtime 1.1

When you change the Fabric Runtime version of an environment item to Runtime 1.1 using Microsoft Fabric Git REST APIs through Deployment pipelines, the environment lands in an inconsistent state.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

If you update the Fabric Runtime of an environment item to Runtime 1.1 and update other changes at the same time, the publish of the environment is problematic. Either the environment publish operation fails or hangs for a long time.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
