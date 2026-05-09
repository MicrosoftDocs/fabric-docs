---
title: FILTERIF function
description: Learn how to use the FILTERIF function in Plan to return filtered values based on a specified condition.
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the FILTERIF function in Plan.
---

# FILTERIF

The **FILTERIF** function filters a list of values based on a specified condition and returns the filtered results as an array.

Because it returns an array, it is typically used with aggregate functions such as **SUM** or **AVERAGE**. It can also be used to populate a [calculated row](../planning-how-to-insert-rows-formula.md).

## Syntax

```
FILTERIF(list, condition)
```

## Arguments

* *list*: The list of values to evaluate.
* *condition*: The condition used to filter the values.

## Return value

Returns an array of values that meet the specified condition.

## Example

```
SUM(FILTERIF([[Sales], [Sales1], [Sales2]], ">0.1m"))
```

Filters values from *Sales*, *Sales1*, and *Sales2* that are greater than *0.1 million* and returns their sum.

:::image type="content" source="../media/planning-reference-formulas-conditional-statements/filterif.png" alt-text="Screenshot of filter if function." lightbox="../media/planning-reference-formulas-conditional-statements/filterif.png":::
