---
title: Known issue - Product switcher and creation process inadvertently show Fabric experiences
description: A known issue is posted where the product switcher and creation process inadvertently show Fabric experiences
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 05/01/2024
ms.custom: known-issue-581
---

# Known issue - Product switcher and creation process inadvertently show Fabric experiences

When tenant settings controlling Fabric items are turned off, you don't expect to observe the product switcher at the bottom left of the Fabric interface. Furthermore, you don't anticipate seeing new Fabric items during the creation process. Due to this issue, you can see Data Engineering and Data Science options within the product switcher, allowing you to unintentionally create Fabric environments.

**Status:** Fixed: May 1, 2024

**Product Experience:** Administration & Management

## Symptoms

You see the Data Engineering or Data Science experience in the product switcher and can create Fabric environment items even when Fabric is turned off.

## Solutions and workarounds

Environments, a specialized type for storing Spark settings such as Spark runtime, differ from Spark notebooks or other Data Engineering items that involve customer data. Environments don't consume capacity, even if created by users. Don't take any further action until Microsoft implements a gating mechanism through a tenant setting.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
