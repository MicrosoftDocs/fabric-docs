---
title: Known issue - Dataflow Gen2 ownership takeover fails
description: A known issue is posted where Dataflow Gen2 ownership takeover fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/05/2024
ms.custom: known-issue-773
---

# Known issue - Dataflow Gen2 ownership takeover fails

In the **Settings** of a Dataflow Gen2 dataflow, you can select the **Take over** button to assign ownership of the dataflow to yourself. When trying to perform the takeover, you might receive an error message, and the takeover fails.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to takeover the ownership of a Dataflow Gen2 dataflow, you receive an error similar to: `Taking ownership failed`.

## Solutions and workarounds

To work around the issue, you can export the dataflow and import it as a new one.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
