---
title: Known issue - Power BI visual warning about style preset not found
description: A known issue is posted where there's a Power BI visual warning about Style preset not found.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/20/2025
ms.custom: known-issue-1104
---

# Known issue - Power BI visual warning about Style preset not found

You can have a Power BI visual that has a style present set. If the definition can't be found from the built-in presets or the theme, you receive a style preset not found warning.

**Status:** Fixed: May 20, 2025

**Product Experience:** Power BI

## Symptoms

At the top of a visual that has a style present, you receive a warning icon. The warning message is similar to: `Style preset not found. Click to see details`".

## Solutions and workarounds

As a workaround, follow these steps:

1. Convert the visual to a table or matrix.
1. Select **Reset to default** on the **Style Preset** card.
1. Convert back to desired visual type.
1. Remove any stylePresets that contain a double wild card from any custom theme files.
1. Reimport the new custom theme file and publish.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
