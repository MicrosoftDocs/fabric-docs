---
title: SUMIF function
description: Learn how to use the SUMIF function in Plan to calculate the sum of values that meet a specified condition.
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the SUMIF function in Plan.
---

# SUMIF

The **SUMIF** function returns the sum of values in a list that satisfy a specified condition.

## Syntax

```
SUMIF(list, condition, [range])
```

## Arguments

* *list*: The list of values to evaluate.
* *condition*: The condition used to filter values in the list.
* *range* (Optional): The list of values to sum if the values in the *list* meet the condition. If not specified, the values in the original *list* are summed.

## Return value

Returns the sum of values that satisfy the condition.

## Example

### 1. Without Range

```
SUMIF([10, 20, 30, 40], ">20")
```

In this example, the **SUMIF** function returns the sum of values greater than 20 from the list and returns 70 (30 + 40).

### 2. With Range

```
SUMIF([10, 20, 30, 40], ">20", [1, 2, 3, 4])
```

The **SUMIF** function evaluates the values in the first list and returns the sum of corresponding values from the second list where the condition is met. In this example, the result is 7 (3 + 4).
