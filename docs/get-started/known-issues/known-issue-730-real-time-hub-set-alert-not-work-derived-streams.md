---
title: Known issue - Real-Time hub **Set alert** doesn't work for derived streams
description: A known issue is posted where Real-Time hub **Set alert** doesn't work for derived streams.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/23/2024
ms.custom: known-issue-730
---

# Known issue - Real-Time hub **Set alert** doesn't work for derived streams

On the **Details** page of Real-Time hub, you can open a derived stream of an eventstream. If you select the **Set alert** button, it doesn't function correctly. You're redirected to the Data Activator instance on the default stream instead of the derived stream. Data Activator then receives data with the wrong schema and you can't set the right conditions for the trigger. While we work to resolve this issue, you might see that the **Set alert** button is greyed out to prevent you from going down a path that leads to an error situation.

**Status:** Fixed: August 23, 2024

**Product Experience:** Real-Time Intelligence

## Symptoms

The following are the symptoms when using the Real-Time hub **Details** page for a derived stream:

 - The **Set alert** button doesn't work properly for a derived stream of an eventstream.
 - The Data Activator instance is added to the default stream instead of the derived stream, and you can't set the desired conditions on the trigger.
 - The **Set alert** button might be greyed out for a derived stream of an eventstream.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
