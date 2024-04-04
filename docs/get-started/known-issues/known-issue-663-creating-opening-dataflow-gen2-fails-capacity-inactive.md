---
title: Known issue - Creating or opening a Dataflow Gen2 dataflow fails if capacity is inactive
description: A known issue is posted where creating or opening a Dataflow Gen2 dataflow fails if capacity is inactive.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/01/2024
ms.custom: known-issue-663
---

# Known issue - Creating or opening a Dataflow Gen2 dataflow fails if capacity is inactive

When creating a new or opening an existing Dataflow Gen2 dataflow, you might see the error message: "Something went wrong. Please try again." If the dataflow is in a workspace associated with an inactive capacity, the error message applies to this known issue.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When you create a new Dataflow Gen2 dataflow or open an existing Dataflow Gen2 dataflow, you see the error message: "Something went wrong. Please try again." The dataflow is in a workspace associated with an inactive capacity.

## Solutions and workarounds

To prevent the error message, have a capacity administration unpause the capacity. Wait for a few minutes before trying to create or edit the dataflow again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
