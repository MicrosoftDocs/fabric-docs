---
title: AND function
description: Learn how to use the AND function in Plan to evaluate multiple conditions and return TRUE only when all conditions are TRUE. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the AND function in Plan.
---

# AND

The **AND** function returns *TRUE* only if all specified conditions are *TRUE*. If any condition evaluates to *FALSE*, the function returns *FALSE*. It is commonly used with [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) and other conditional functions to evaluate multiple criteria.

## Syntax

```
AND(logical_test1, [logical_test2], ...)
```

## Arguments

* *logical\_test1*: The first condition to evaluate.
* *logical\_test2, ...* (Optional): Additional conditions to evaluate.

## Return value

Returns *TRUE* if all conditions are met; otherwise, returns *FALSE*.

## **Example**

```
IF(AND(Sub Region == "APAC", Sub Category== "Juices"), 50000000, 0)
```

In this example, the **AND** function is used within an [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) statement to assign values to the *2027 Actuals Plan*. The *AND* function evaluates whether both conditions are met: *Sub Region* is *APAC* and *Sub Category* is *Juices*. If both conditions are *TRUE*, the formula returns 50 *million*; otherwise, it returns *0*.

:::image type="content" source="../media/planning-reference-formulas-logical-functions/and.png" alt-text="Screenshot of switch function." lightbox="../media/planning-reference-formulas-logical-functions/and.png":::

## **Excel equivalent**

[AND](https://support.microsoft.com/en-us/office/and-function-5f19b2e8-e1df-4408-897a-ce285a19e9d9)
