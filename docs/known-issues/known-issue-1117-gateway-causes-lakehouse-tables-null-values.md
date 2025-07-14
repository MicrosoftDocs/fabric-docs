---
title: Known issue - Gateway causes lakehouse tables with null values
description: A known issue is posted where the gateway causes lakehouse tables with null values.
author: jessicamo
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-1117
---

# Known issue - Gateway causes lakehouse tables with null values

Previous versions of the on-premises data gateway can cause issues when Dataflow Gen2 loads data to a lakehouse. The issue occurs when the lakehouse table has column names spaces. The result loads a table consisting of all null values.

**Status:** Fixed: May 8, 2025

**Product Experience:** Power BI

## Symptoms

If you face this issue, you see that your lakehouse table has the correct schema; however, the table contains only null values.

## Solutions and workarounds

You can solve this issue by upgrading your gateway version to 3000.266.4 or later.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
