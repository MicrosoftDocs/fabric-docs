---
title: OR function
description: Learn how to use the OR function in Plan to evaluate multiple conditions and return TRUE when at least one condition is TRUE. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the OR function in Plan.
---

# OR

The **OR** function returns *TRUE* if at least one of the specified conditions is *TRUE*. It returns *FALSE* only when all conditions evaluate to *FALSE*. It is commonly used with [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) and other conditional functions to evaluate multiple criteria.

## Syntax

```
OR(logical_test1, [logical_test2], ...)
```

## Arguments

* *logical\_test1*: The first condition to evaluate.
* *logical\_test2, ...* (Optional): Additional conditions to evaluate.

## Return value

Returns *TRUE* if any condition is met; otherwise, returns *FALSE*.

## **Example**

```
IF(OR(Sub Region == "APAC", Sub Category == "Juices"), 52640000, 0)
```

In this example, the **OR** function is used within an [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) statement to assign values to the *2027 Actuals Plan*. The function evaluates whether either condition is met: *Sub Region* is *APAC* or *Sub Category* is *Juices*. If at least one condition is *TRUE*, the formula returns 52.64 *million*; otherwise, it returns *0*.

:::image type="content" source="../../media/planning-reference-formulas-logical-functions/or.png" alt-text="Screenshot of switch function." lightbox="../../media/planning-reference-formulas-logical-functions/or.png":::

## **Excel equivalent**

[OR](https://support.microsoft.com/en-us/office/or-function-7d17ad14-8700-4281-b308-00b131e22af0)
