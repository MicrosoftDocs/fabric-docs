---
title: Known issue - Digital twin builder mapping fails with concurrent update error
description: A known issue is posted where digital twin builder mapping fails with concurrent update error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1124
---

# Known issue - Digital twin builder mapping fails with concurrent update error

This issue occurs within the digital twin builder experience due to the same mapping operation running in parallel, which causes conflicts.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

You receive a failed mapping operation with an error. The error message is similar to: `Concurrent updates to the log. Multiple streaming jobs detected for 0`.

## Solutions and workarounds

To resolve a failed mapping operation with this issue, rerun your failed mapping.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
