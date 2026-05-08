---
title: IF function
description: Learn how to use the IF function in Plan to return different values based on whether a condition is true or false. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the IF function in Plan.
---

# IF

The **IF** function returns one value if a condition is true and another value if it is false.

## Syntax

```
IF(logical_test, value_if_true, value_if_false )
```

## Arguments

* *logical\_test*: The condition to evaluate.
* *value\_if\_true*: The value returned if the condition is true.
* *value\_if\_false*: The value returned if the condition is false.

## Return value

Returns either *value\_if\_true* or *value\_if\_false* based on the result of the condition.

## Example

```
IF(PY > 0, (AC - PY) / PY, 0)
```

Returns *`(AC - PY) / PY`* if *PY* is greater than 0; otherwise, returns 0.

:::image type="content" source="../../media/planning-formulas/planning-conditional-statements/if.png" alt-text="Screenshot of if function." lightbox="../../media/planning-formulas/planning-conditional-statements/if.png":::

## Excel equivalent

[IF](https://support.microsoft.com/en-us/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2)
