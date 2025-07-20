---
title: Known issue - Can't connect to semantic model from Excel or use Analyze in Excel
description: A known issue is posted where you can't connect to semantic model from Excel or use Analyze in Excel.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/25/2025
ms.custom: known-issue-893
---

# Known issue - Can't connect to semantic model from Excel or use Analyze in Excel

You can consume Power BI semantic models in Excel by connecting to the semantic model in Excel or choosing the **Analyze in Excel** option from the Power BI service. Either way, when you try to make the connection, you receive an error message and can't properly connect.

**Status:** Fixed: June 25, 2025

**Product Experience:** Power BI

## Symptoms

When you try to connect to a Power BI dataset from Excel or use Analyze in Excel, you receive an error. The error message is similar to `Forbidden Activity` or `AAD error`. It most likely happens if you have [Excel versions 2409 or 2410](/officeupdates/current-channel-preview).

## Solutions and workarounds

To fix this issue, sign out from all accounts in Excel, then sign in to Excel and try again. Alternatively, you can download a version of Excel earlier 2409 and try again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
