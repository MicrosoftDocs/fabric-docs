---
title: ISBLANK function
description: Learn how to use the ISBLANK function in Plan to check whether a value is blank or empty. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the ISBLANK function in Plan.
---

# ISBLANK

The **ISBLANK** function returns *TRUE* if the specified value is blank or empty. It returns *FALSE* if the value contains any text, number, or expression. It is commonly used with [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) and other logical functions to validate missing values before performing calculations.

> [!Note]
> The **ISEMPTY** function works similar to **ISBLANK** and can also be used to check for blank or empty values.


## Syntax

```
ISBLANK(value)
```

## Arguments

* value - The value to evaluate.

## Return value

Returns *TRUE* if the value is blank; otherwise, returns *FALSE*.

## **Example**

```
IF(ISBLANK(2027 Actuals Plan), 0, 2027 Actuals Plan)
```

In this example, the **ISBLANK** function checks whether the *2027 Actuals Plan* value is blank. If the condition is *TRUE*, the formula returns *0*; otherwise, it returns the existing value.

:::image type="content" source="../media/planning-reference-formulas-logical-functions/isblank.png" alt-text="Screenshot of switch function." lightbox="../media/planning-reference-formulas-logical-functions/isblank.png":::

## **Excel equivalent**

[ISBLANK](https://support.microsoft.com/en-us/office/is-functions-0f2d7971-6019-40a0-a171-f2d869135665), [ISEMPTY](https://support.microsoft.com/en-us/office/isempty-function-a86d5871-f6bd-455c-9256-a69a42e55e50)
