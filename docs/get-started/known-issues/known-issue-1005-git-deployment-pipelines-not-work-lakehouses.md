---
title: Known issue - Git operations and deployment pipelines don't work with lakehouses
description: A known issue is posted where Git operations and deployment pipelines don't work with lakehouses
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/22/2025
ms.custom: known-issue-1005
---

# Known issue - Git operations and deployment pipelines don't work with lakehouses

You can't use Git operations or deployment pipelines that require lakehouse items.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You can't sync your workspace to Git, commit to Git, or update from Git. Also, you can't perform deployments using a deployment pipeline for lakehouse items.

## Solutions and workarounds

As a temporary workaround for deployment pipelines, you can skip the lakehouse by selecting other items. The deployment proceeds for all items except the lakehouse. There's no workaround if you're using a lakehouse in Git operations. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
