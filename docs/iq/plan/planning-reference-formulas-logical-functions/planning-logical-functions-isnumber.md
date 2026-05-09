---
title: ISNUMBER function
description: Learn how to use the ISNUMBER function in Plan to determine whether a value is a valid number. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the ISNUMBER function in Plan.
---

# ISNUMBER

The **ISNUMBER** function returns *TRUE* if the specified value is a valid number. It returns *FALSE* if the value is not numeric. It is commonly used with [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) and other conditional functions to validate numeric inputs before performing calculations.

## Syntax

```
ISNUMBER(value)
```

## Arguments

* value - The value to evaluate.

## Return value

Returns *TRUE* if the value is a numeric value; otherwise, returns *FALSE*.

## Example

```
IF(ISNUMBER(2026 Actuals), 2026 Actuals*1.05, "Not a number")
```

In this example, the **ISNUMBER** function checks whether *2026 Actuals* contains a numeric value. If the condition is *TRUE*, the formula applies a 5% increase to the value; otherwise, it returns '*Not a number'*.

:::image type="content" source="../../media/planning-reference-formulas-logical-functions/isnumber.png" alt-text="Screenshot of switch function." lightbox="../../media/planning-reference-formulas-logical-functions/isnumber.png":::

## **Excel equivalent**

[ISNUMBER](https://support.microsoft.com/en-us/office/is-functions-0f2d7971-6019-40a0-a171-f2d869135665)
