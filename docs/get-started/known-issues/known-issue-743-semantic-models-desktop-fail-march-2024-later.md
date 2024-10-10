---
title: Known issue - Semantic models in Desktop sometimes fail in March 2024 and later versions
description: A known issue is posted where semantic models in Desktop sometimes fail in March 2024 and later versions.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/18/2024
ms.custom: known-issue-743
---

# Known issue - Semantic models in Desktop sometimes fail in March 2024 and later versions

In Power BI Desktop March 2024 and later versions, connecting to a semantic model sometimes fails with a `Cannot load model` error message. The failure happens when you connect to a semantic model in a different user's My workspace.

**Status:** Fixed: July 18, 2024

**Product Experience:** Power BI

## Symptoms

You face this issue when you connect to a semantic model that is in a different user’s My Workspace. While trying to connect to a semantic model through Power BI Desktop, you see an error similar to: `Cannot load model. We couldn't connect to your model in the Power BI Service. The dataset may have been deleted, renamed, moved, or it is possible that you don't have permission to access it. Either the database does not exist, or you do not have permissions to access it.`

## Solutions and workarounds

To work around the issue, you can use an older version of Power BI Desktop, such as February 2024 or earlier.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
