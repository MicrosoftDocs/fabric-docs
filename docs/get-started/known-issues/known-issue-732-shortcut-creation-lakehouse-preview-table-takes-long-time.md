---
title: Known issue - Shortcut creation on a lakehouse preview table takes long time
description: A known issue is posted where shortcut creation on a lakehouse preview table takes long time.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/31/2024
ms.custom: known-issue-732
---

# Known issue - Shortcut creation on a lakehouse preview table takes long time

You can create a shortcut on a lakehouse, and the data shows in a preview table. You might experience the preview table takes a long time to load.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You see the preview table of a lakehouse shortcut take a long time to load. The issue often happens with lakehouse tables of large data.

## Solutions and workarounds

As a workaround, add the parameter `&lhLakehouseV2=0` at the end of the browser URL while trying to access the shortcuts. Alternatively, after waiting for two minutes, select **Create Shortcut**.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues) 
