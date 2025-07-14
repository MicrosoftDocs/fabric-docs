---
title: Known issue - User data functions option not visible in data pipelines functions activity
description: A known issue is posted where User data functions option not visible in data pipelines functions activity.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/11/2025
ms.custom: known-issue-1112
---

# Known issue - User data functions option not visible in data pipelines functions activity

In a data pipelines, you can create and run a user data functions activity. For this issue, you might not see the functions activity.

**Status:** Fixed: July 11, 2025

**Product Experience:** Data Engineering

## Symptoms

When you create a user data functions activity in a data pipeline, the **Fabric user data functions** radio button isn't available.

## Solutions and workarounds

Append the following variable at the end of your URL, and refresh the page: `&ArtifactFunctionSet=1`

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
