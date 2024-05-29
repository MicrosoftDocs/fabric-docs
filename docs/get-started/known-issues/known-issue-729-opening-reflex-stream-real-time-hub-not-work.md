---
title: Known issue - Opening a reflex for a stream in Real-Time hub doesn't work
description: A known issue is posted where opening a reflex for a stream in Real-Time hub doesn't work.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/29/2024
ms.custom: known-issue-729
---

# Known issue - Opening a reflex for a stream in Real-Time hub doesn't work

In Real-Time hub, if you have a stream in the first tab, you can select the stream to view more details of that stream. If you chose the option to **Set alert** or **Add destination > Reflex** on a parent eventstream, then that Reflex item shows up in stream details page. If you try to open that Reflex item, it doesn't work.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

When you try to open the Reflex item, you receive an error similar to: `We could not read the contents of this item`.

## Solutions and workarounds

To work around the issue, follow these steps:

1. Open parent eventstream of the stream.
1. Select the reflex output node of that eventstream.
1. Select **Open item** in bottom pane.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
