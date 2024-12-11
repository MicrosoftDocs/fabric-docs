---
title: Known issue - Incorrect column names after column format or aggregation change
description: A known issue is posted where you see incorrect column names after column format or aggregation change.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/02/2024
ms.custom: known-issue-950
---

# Known issue - Incorrect column names after column format or aggregation change

You might experience incorrect or random column names after changing the column format or aggregation.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You might experience incorrect or random column names after changing the column format or aggregation. One example where the incorrect or random column names could appear is when querying through SQL Server Management Studio (SSMS).

## Solutions and workarounds

You can try to run an XML for Analysis (XMLA) command through SSMS to the XMLA endpoint to clear the cache to address the incorrect column names issue. However, you might encounter the same issue if you redo the same operation to change column format or aggregation.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
