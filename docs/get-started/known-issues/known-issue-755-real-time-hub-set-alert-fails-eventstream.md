---
title: Known issue - Real-Time hub Set Alert fails on prior version of an eventstream
description: A known issue is posted where using the Real-Time hub **Set Alert** fails on prior version of an eventstream.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/20/2024
ms.custom: known-issue-755
---

# Known issue - Real-Time hub Set Alert fails on prior version of an eventstream

In the Real-Time hub, you can use the **Set Alert** functionality to target an eventstream. If the target eventstream is the prior version of Microsoft Fabric Eventstream (version 1), the **Set Alert** functionality doesn't work. Using the current version of Microsoft Fabric Eventstream (version 2) does work.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

When trying to use the **Set Alert** functionality to target an eventstream that is v1, you receive a `InternalServerError` error code and the alert doesn't apply.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
