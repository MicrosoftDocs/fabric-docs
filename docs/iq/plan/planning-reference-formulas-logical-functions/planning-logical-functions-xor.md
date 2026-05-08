---
title: XOR function
description: Learn how to use the XOR function in Plan to evaluate multiple conditions and return TRUE when an odd number of conditions are TRUE. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the XOR function in Plan.
---

# XOR

The **XOR** (*Exclusive OR*) function returns *TRUE* if exactly one or an odd number of the specified conditions is *TRUE*. Otherwise, it returns *FALSE*. It is commonly used with [**IF**](../planning-conditional-statements/planning-conditional-statements-if.md) and other logical functions to evaluate mutually exclusive conditions.

## Syntax

```
XOR(logical_test1,[logical_test2], ...)
```

## Arguments

* *logical\_test1*: The first condition to evaluate.
* *logical\_test2, ...* (Optional): Additional conditions to evaluate.

## Return value

Returns *TRUE* if an odd number of conditions are *TRUE*; otherwise, returns *FALSE*.

## **Example**

```
IF(XOR(Sub Region == "APAC", Sub Category == "Juices"), 52640000, 0)
```

In this example, the **XOR** function is used within an [**IF**](../planning-conditional-statements/planning-conditional-statements-if.md) statement to assign values to the *2027 Actuals Plan*. The function evaluates whether only one of the conditions is *TRUE*: *Sub Region* is *APAC* or *Sub Category* is Juices. If exactly one condition is *TRUE*, the formula returns *52.64 million*; otherwise, it returns *0*.

:::image type="content" source="../../media/planning-formulas/planning-logical-functions/xor.png" alt-text="Screenshot of switch function." lightbox="../../media/planning-formulas/planning-logical-functions/xor.png":::

## **Excel equivalent**

[XOR](https://support.microsoft.com/en-us/office/xor-function-1548d4c2-5e47-4f77-9a92-0533bba14f37)
