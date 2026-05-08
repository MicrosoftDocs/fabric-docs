---
title: IFNA function
description: Learn how to use the IFNA function in Plan to return an alternate value when an expression results in an '#N/A error'. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the IFNA function in Plan.
---

# IFNA

The **IFNA** function returns the specified value if an expression results in the #N/A error; otherwise, it returns the result of that expression.

## Syntax

```
IFNA(value, value_if_na)
```

## Arguments

* *value*: The expression to evaluate for the #N/A error.
* *value\_if\_na*: The value to return if the expression results in the #N/A error.

## **Return value**

Returns either the result of the *value* or *value\_if\_na* if the #N/A error occurs.

## **Example**

```
IFNA((Actuals - Plan) / Plan, 0)
```

Returns *`(Actuals - Plan) / Plan`* if the expression evaluates successfully; otherwise, returns 0 if the #N/A error occurs.

:::image type="content" source="../../media/planning-formulas/planning-conditional-statements/ifna.png" alt-text="Screenshot of ifna function." lightbox="../../media/planning-formulas/planning-conditional-statements/ifna.png":::

## **Excel equivalent**

[IFNA](https://support.microsoft.com/en-us/office/ifna-function-6626c961-a569-42fc-a49d-79b4951fd461)
