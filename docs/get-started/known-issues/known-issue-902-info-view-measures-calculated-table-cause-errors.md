---
title: Known issue - INFO.VIEW.MEASURES() in calculated table might cause errors
description: A known issue is posted where INFO.VIEW.MEASURES() in calculated table might cause errors
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/31/2024
ms.custom: known-issue-902
---

# Known issue - INFO.VIEW.MEASURES() in calculated table might cause errors

You can add the Data Analysis Expressions (DAX) function INFO.VIEW.MEASURES() to a calculated table in a semantic model. In some cases, an error happens when you create the calculated table. Other times, after the table is in the model, you might receive an error when you remove other tables. The issue is more likely to happen on semantic models that have a calculation group that includes a dynamic format string in one or more calculation items.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You either try to create a calculated table that contains INFO.VIEW.MEASURES() or you try to delete a table where another calculated table in the semantic model contains INFO.VIEW.MEASURES(). You receive an error message similar to: `An unexpected exception occurred`.

## Solutions and workarounds

To delete the table, remove the calculated table that contains INFO.VIEW.MEASURES().

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
