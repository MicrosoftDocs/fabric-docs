---
title: Known issue - Dataflow connector doesn't show dataflows with view only permissions
description: A known issue is posted where the dataflow connector doesn't show dataflows with view only permissions.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 02/14/2025
ms.custom: known-issue-1020
---

# Known issue - Dataflow connector doesn't show dataflows with view only permissions

You can't see dataflow data using the dataflow connector. The issue happens when connecting to either a Dataflow Gen2 or Dataflow Gen2 (CI/CD preview) dataflow. You only have view access to the workspace that contains the dataflow.

**Status:** Fixed: February 14, 2025

**Product Experience:** Data Factory

## Symptoms

You have **Viewer** permission on the workspace that contains a Dataflow Gen2 dataflow or Dataflow Gen2 (CI/CD preview) dataflow. In a different workspace or Power BI Desktop, you use the dataflow connector to query the original dataflow data. You can't see the original dataflow.

## Solutions and workarounds

To access the dataflow, assign a higher level of permission to the user in the workspace.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
