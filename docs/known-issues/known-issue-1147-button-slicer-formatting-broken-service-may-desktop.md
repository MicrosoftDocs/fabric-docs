---
title: Known issue - Button slicer formatting broken in service or May Desktop
description: A known issue is posted where the button slicer formatting broken in service or May Desktop.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/23/2025
ms.custom: known-issue-1147
---

# Known issue - Button slicer formatting broken in service or May Desktop

You can use a button slicer in a report that has a custom theme file. If you publish the button slicer to the service or use the May Power BI Desktop release, the button slicer formatting might show the wrong formatting.

**Status:** Fixed: June 23, 2025

**Product Experience:** Power BI

## Symptoms

You notice the button slicer colors, fonts, or borders are broken for a report with a custom theme.

## Solutions and workarounds

To work around this issue, you can update your custom theme file. Change the following identifiers as such:

- `selected` to `selection:selected`
- `hover` to `interaction:hover`
- `press` to `interaction:press`

Also, remove the identifier `disabled`.

Alternatively, you can remove the above identifiers from the custom theme file and reimport the theme file.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
