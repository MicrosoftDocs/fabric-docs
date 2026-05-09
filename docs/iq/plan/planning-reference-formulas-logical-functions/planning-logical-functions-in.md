---
title: IN function
description: Learn how to use the IN function in Plan to check whether a specified value exists in a list or array. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the IN function in Plan.
---

# IN

The **IN** function returns *TRUE* if a specified value matches any value in a list or array. It returns *FALSE* if no match is found. It is commonly used with [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) and other conditional functions to simplify multiple *OR* conditions.

## Syntax

```
IN(value, [item1, item2, ...])
```

## Arguments

* *value*: The value to check.
* *item1, item2, ...*: A required list of values to compare against.

## Return value

Returns *TRUE* if a match is found; otherwise, returns *FALSE*.

## **Example**

```
IF(IN(Sub Category,["Juices", 'Soda']), 52640000, 0)
```

In this example, the **IN** function is used within an [**IF**](../planning-reference-formulas-conditional-statements/planning-conditional-statements-if.md) statement to assign values to the *2027 Actuals Plan*. The function evaluates whether the *Sub Category* matches any value in the list: *Juices* or *Soda*. If a match is found, the formula returns 52.64 *million*; otherwise, it returns *0*.

:::image type="content" source="../media/planning-reference-formulas-logical-functions/in.png" alt-text="Screenshot of switch function." lightbox="../media/planning-reference-formulas-logical-functions/in.png":::
