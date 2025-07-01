---
title: Known issue - Data warehouse deployment using deployment pipelines fails
description: A known issue is posted where data warehouse deployment using deployment pipelines fails.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-774
---

# Known issue - Data warehouse deployment using deployment pipelines fails

You can use Fabric Data Factory deployment pipelines to deploy data warehouses. When you deploy data warehouse related items from one workspace to another, the data warehouse connection breaks.

**Status:** Fixed: May 8, 2025

**Product Experience:** Data Factory

## Symptoms

Once the deployment pipeline completes in the destination workspace, you see the data warehouse connection is broken. You see an error message similar to: `Failed to load connection, please make sure it exists, and you have the permission to access it`.

## Solutions and workarounds

As a workaround, you can manually update the destination workspace data warehouse connection to point to the destination workspace data warehouse.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
