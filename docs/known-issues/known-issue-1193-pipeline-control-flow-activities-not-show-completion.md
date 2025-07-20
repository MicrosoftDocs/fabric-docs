---
title: Known issue - Pipeline control flow activities don't show the completion dependency
description: A known issue is posted where pipeline control flow activities don't show the completion dependency.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/14/2025
ms.custom: known-issue-1193
---

# Known issue - Pipeline control flow activities don't show the completion dependency

In Data Factory pipelines, you can author control flow activities. If you add some activities, such as if and switch, you don't see the dependency to wait until completion.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You can't drag the **On completion** dependency in the Pipelines user interface to connect control flow activities.

## Solutions and workarounds

As a workaround, you can perform these steps:

1. Navigate to **View** tab in your pipeline
1. Select **Edit JSON code**
1. Find the control flow activity json code
1. Add the code `"dependsOn": [{ "activity": "", "dependencyConditions": [ "Completed" ] }],`

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
