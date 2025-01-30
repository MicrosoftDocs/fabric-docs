---
title: Known issue - Creation failure for Copy job item in empty workspace
description: A known issue is posted where the Copy job item isn't created in an empty workspace.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/05/2024
ms.custom: known-issue-957
---

# Known issue - Creation failure for Copy job item in empty workspace

You can create a Copy job item in a workspace. If no items are present in the workspace, so the Copy job would be the first artifact in the workspace, the Copy job item creation fails.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When you try to create a Copy job item in an empty workspace, the creation fails.

## Solutions and workarounds

Create a new artifact like a lakehouse, data warehouse, or pipeline before creating the Copy job.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
