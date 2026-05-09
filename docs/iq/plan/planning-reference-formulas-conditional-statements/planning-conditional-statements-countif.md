---
title: COUNTIF function
description: Learn how to use the COUNTIF function in Plan to count values that meet a specified condition.
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the COUNTIF function in Plan.
---

# COUNTIF

The **COUNTIF** function returns the count of values that match a specified condition.

## Syntax

```
COUNTIF(list, condition)
```

## Arguments

* *list*: The list of values to evaluate.
* *condition*: The condition used to filter the values.

## Return value

Returns the number of values that satisfy the given condition.

## Example

```
COUNTIF([[2024.Plan_Variance %], [2025.Plan_Variance %], [2026.Plan_Variance %]], ">0")
```

Returns the count of *Plan Variance %* values across *2024*, *2025*, and *2026* that are greater than 0.

:::image type="content" source="../media/planning-reference-formulas-conditional-statements/countif.png" alt-text="Screenshot of count if function." lightbox="../media/planning-reference-formulas-conditional-statements/countif.png":::

## Excel equivalent

[COUNTIF](https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34)
