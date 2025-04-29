---
title: Known issue - Vertica connector throws invalid conversion error
description: A known issue is posted where Vertica connector throws invalid conversion error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/15/2025
ms.custom: known-issue-1101
---

# Known issue - Vertica connector throws invalid conversion error

For certain uncommon scenarios, the Vertica connector might show an invalid conversion error and mask the legitimate error, which is a specific open database connectivity (ODBC) driver related error.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Your Vertica connector throws an error that doesn't apply to your situation. The error message is similar to: `We cannot convert the value null to type List.`

## Solutions and workarounds

Microsoft plans to improve the Vertica connector in order for the legitimate error to be visible instead of the generic error. There's no estimated timeline for when this improvement on the product to be released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
