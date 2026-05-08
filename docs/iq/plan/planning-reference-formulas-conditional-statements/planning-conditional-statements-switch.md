---
title: SWITCH function
description: Learn how to use the SWITCH function in Plan to evaluate an expression against multiple values and return the corresponding result.
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the SWITCH function in Plan.
---

# SWITCH

The **SWITCH** function evaluates an expression against a list of values and returns the result corresponding to the first matching value. If no match is found, an optional default value is returned.

## Syntax

```
SWITCH(expression, val1, res1, val2, res2, ..., val_n, res_n, default)
```

## Arguments

* *expression*: The expression to evaluate.
* *val1, val2, … val\_n*: The values to compare against the expression.
* *res1, res2, … res\_n*: The result to return for each matching value.
* *default* (Optional): The value to return if no match is found.

## **Return value**

Returns the result corresponding to the first matching value. If no match is found, returns the *default* value (if specified).

## **Example**

```
SWITCH(Sub-Category, "Bookcases", 4.55, "Chairs", 2.67, "Tables", 2.81, "Art", 1.35, "Paper", 3.79, "Machines", 10.55, "Envelopes", 1.23, "Storage", 2.53, 0)
```

Evaluates the *Sub-Category* value and returns the corresponding numeric value for each match; if no match is found, returns 0.

:::image type="content" source="../../media/planning-formulas/planning-conditional-statements/switch.png" alt-text="Screenshot of switch function." lightbox="../../media/planning-formulas/planning-conditional-statements/switch.png":::

## **Excel equivalent**

[SWITCH](https://support.microsoft.com/en-us/office/switch-function-47ab33c0-28ce-4530-8a45-d532ec4aa25e)
