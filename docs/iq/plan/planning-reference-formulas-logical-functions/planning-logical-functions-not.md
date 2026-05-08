---
title: NOT function
description: Learn how to use the NOT function in Plan to reverse the logical value of a condition. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the NOT function in Plan.
---

# NOT

The **NOT** function returns the opposite of a logical value. It returns *TRUE* if the specified condition is *FALSE*, and *FALSE* if the condition is *TRUE*. It is commonly used with [**IF**](../planning-conditional-statements/planning-conditional-statements-if.md) and other logical functions to invert conditions in calculations.

## Syntax

```
NOT(logical_test)
```

## Arguments

* *logical\_test*: The condition to evaluate and reverse.

## Return value

Returns *TRUE* if the condition is *FALSE* and *FALSE* if the condition is *TRUE*.

## **Example**

```
IF(NOT(Sub Region == "APAC"), 52640000, 0)
```

In this example, the **NOT** function is used within an [**IF**](../planning-conditional-statements/planning-conditional-statements-if.md) statement to assign values to the *2027 Actuals Plan*. The function evaluates whether *Sub Region* is **not** *APAC*. If the condition is *TRUE*, the formula returns 52.64 *million*; otherwise, it returns *0*.

:::image type="content" source="../../media/planning-formulas/planning-logical-functions/not.png" alt-text="Screenshot of switch function." lightbox="../../media/planning-formulas/planning-logical-functions/not.png":::

## **Excel equivalent**

[NOT](https://support.microsoft.com/en-us/office/not-function-9cfc6011-a054-40c7-a140-cd4ba2d87d77)
