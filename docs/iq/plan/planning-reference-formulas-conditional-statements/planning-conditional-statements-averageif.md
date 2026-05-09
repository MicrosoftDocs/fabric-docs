---
title: AVERAGEIF function
description: Learn how to use the AVERAGEIF function in Plan to calculate the average of values that meet a specified condition.
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the AVERAGEIF function in Plan.
---

# AVERAGEIF

The **AVERAGEIF** function returns the average of values in a list that meet a specified condition.

## Syntax

```
AVERAGEIF(list, condition)
```

## Arguments

* *list*: The list of values to evaluate.
* *condition*: The condition used to filter the values.

## Return value

Returns the average of the values that satisfy the given condition.

## Example

```
AVERAGEIF([Sales,Sales1,Sales2], ">0.1m")
```

Returns the average of *Sales*, *Sales1*, and *Sales2* column values when they are greater than *0.1 million.*

:::image type="content" source="../media/planning-reference-formulas-conditional-statements/averageif.png" alt-text="Screenshot of average if function." lightbox="../media/planning-reference-formulas-conditional-statements/averageif.png":::

## **Excel equivalent**

[AVERAGEIF](https://support.microsoft.com/en-us/office/averageif-function-faec8e2e-0dec-4308-af69-f5576d8ac642)