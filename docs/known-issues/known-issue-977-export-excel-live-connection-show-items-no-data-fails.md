---
title: Known issue - Export to Excel using live connection with show items with no data turned on fails
description: A known issue is posted where the export to Excel functionality using live connection with show items with no data turned on fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/06/2025
ms.custom: known-issue-977
---

# Known issue - Export to Excel using live connection with show items with no data turned on fails

You can have a visual that has one or more grouping columns and also has **Show items with no data** enabled. If you try to export to Excel using a live connection, the export fails.

**Status:** Fixed: January 6, 2025

**Product Experience:** Power BI

## Symptoms

When you try to export to Excel using a live connection, the export fails with a generic error message.

## Solutions and workarounds

To work around the issue, on the visual, turn off **Show items with no data**. You can then export to Excel and then turn the setting back on. Changing the setting doesn't change what is exported.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
