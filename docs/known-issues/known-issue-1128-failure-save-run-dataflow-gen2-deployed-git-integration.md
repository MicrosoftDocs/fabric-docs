---
title: Known issue - Failure to Save and Run Dataflow Gen2 dataflows deployed with Git integration
description: A known issue is posted where there's a failure to Save and Run Dataflow Gen2 dataflows deployed with Git integration.
author: jessicamo
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-1128
---

# Known issue - Failure to Save and Run Dataflow Gen2 dataflows deployed with Git integration

You can use Git integration to deploy a Dataflow Gen2 dataflow. If you select the **Save and Run** button, you receive an error.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When you select **Save and Run** on a dataflow, you receive an error. The error message is similar to: `A dataflow must include at least one query enabled for loading`.

## Solutions and workarounds

As a workaround, follow these steps:

1. Open the dataflow editor
1. Right-click on the main query to open the **Properties** dialog and select **Enable staging**
1. Select **home... Save & Run**

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
