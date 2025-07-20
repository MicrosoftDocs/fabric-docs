---
title: Known issue - Eventstream updates with Eventhouse destination causes error
description: A known issue is posted where updating an eventstream with an Eventhouse destination causes an error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1032
---

# Known issue - Eventstream updates with Eventhouse destination causes error

You can create an eventstream that uses an Eventhouse as a destination. You configure the Eventhouse destination to use direct ingestion mode. When you try to update that eventstream, you might receive an error. The eventstream is still updated successfully.

**Status:** Fixed: May 19, 2025

**Product Experience:** Real-Time Intelligence

## Symptoms

You see an error when updating an eventstream. The eventstream uses an Eventhouse destination in direct ingestion mode. The error message is similar: `Unknown server error`.

## Solutions and workarounds

The update happens successfully, so you can ignore the error message. To prevent the error message, delete and recreate the eventstream.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
