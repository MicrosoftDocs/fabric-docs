---
title: Known issue - Add data to a report when scrollbar is present doesn't work
description: A known issue is posted where when you add data to a report when the scrollbar is present, it doesn't work.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/14/2024
ms.custom: known-issue-785
---

# Known issue - Add data to a report when scrollbar is present doesn't work

When you edit reports in the Power BI service, the data pane sometimes shows a scrollbar. If you attempt to add data to a new or existing visual, the data doesn't get added to the visual. When you select the check box next to the desired data, you see the view scrolled back to the top of the pane, without any data being added. Typically, the issue occurs when you scroll the pane to any position besides at the top.

**Status:** Fixed: August 14, 2024

**Product Experience:** Power BI

## Symptoms

The issue occurs in the following conditions:

- You're editing a report while using the service online
- You opened the data pane on the right side of the screen, and it has a scrollbar
- You scroll part way or fully down the data pane

When you attempt to select the checkbox next to the data intended to be added to the report, the pane scrolls back to the top. The data isn't added to the report.

## Solutions and workarounds

To work around the issue, scroll down to the desired data selection and attempt to add the data a second time, performing the same steps as before. On a second attempt, the data should be reflected.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
