---
title: Known issue - Excel Power BI add-in fails in Excel web
description: A known issue is posted where Excel Power BI add-in fails in Excel web
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/11/2025
ms.custom: known-issue-1192
---

# Known issue - Excel Power BI add-in fails in Excel web

Excel Power BI add-in allows you to create an Excel connected table to their Power BI semantic model. The add-in uses the Report Definition Language (RDL) viewer and engine to render, create query, and more. When you select fields to create a table, you receive an error. However, you can still press **Insert** to insert the connected table to the Excel page.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You receive errors when trying to use the add-in. The error messages are similar to:

- `Can't display the report`
- `Connection open intermittent error while reading Analysis Services, needs retry.`
- `RSWorkloadError`

Retrying doesn't work.

## Solutions and workarounds

To work around the issue, you can either:

- Use Excel Desktop for the same scenario
- Insert a pivot table in Excel Web

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
