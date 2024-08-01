---
title: Known issue - Localization blocks operations in a lakehouse
description: A known issue is posted where localization blocks operations in a lakehouse.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/31/2024
ms.custom: known-issue-797
---

# Known issue - Localization blocks operations in a lakehouse

When you select languages other than English in Power BI, you see error when you perform operations in a lakehouse. Operations include table creation, updating, deletion, and folder and schema operations.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

If your Power BI language isn't set to English, you receive an error when working in a lakehouse. The entire lakehouse page becomes blank and you see an error message similar to: `An exception occurred. Please refresh the page and try again.`

## Solutions and workarounds

To work around the issue, you can switch the Power BI system language to **English**. Select the gear icon on the top navigation bar, select **General**, and change the display language to **English**.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues) 
