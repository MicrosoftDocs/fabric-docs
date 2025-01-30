---
title: Known issue - Eventstream publish fails when column contains empty array and operator is added
description: A known issue is posted where an eventstream publish fails when column contains empty array and operator is added.
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.date: 12/09/2024
ms.custom: known-issue-962
---

# Known issue - Eventstream publish fails when column contains empty array and operator is added

You can create an eventstream that has columns of data and a transformation operator to process the data. The data contains a column with an empty array. If you try to publish the eventstream, it shows an error and doesn't publish.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

You can't publish an event stream when both of the following conditions are met: the data contains a column with an empty array and an operator is added to process the data. You receive an error message similar to `Failed to publish topology changes`.

## Solutions and workarounds

To work around this issue, avoid including empty arrays in the events.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
