---
title: Other operators
description: "Learn how to use arithmetic, comparison, grouping, and unary operators in Plan formulas."
ms.topic: reference
ms.date: 09/02/2026
---

# Other operators

Use arithmetic, comparison, and grouping operators in Plan formulas to calculate and compare values and control the order in which expressions are evaluated.

You can use these operators with **node references** and **measures**. The operators also support nodes and measures that contain calendar dates.

## Operator list reference

| Operator | Description |
| --- | --- |
| `+` | Adds two values or indicates a positive value. |
| `-` | Subtracts one value from another or indicates a negative value. |
| `*` | Multiplies two values. |
| `/` | Divides one value by another. |
| `>` | Checks whether one value is greater than another. |
| `>=` | Checks whether one value is greater than or equal to another. |
| `=` | Checks whether two values are equal. |
| `!=` | Checks whether two values are not equal. |
| `<` | Checks whether one value is less than another. |
| `<=` | Checks whether one value is less than or equal to another. |
| `()` | Groups expressions and controls the order of evaluation. |

## Arithmetic operators

Use `+`, `-`, `*`, and `/` to perform arithmetic calculations with node references and measures.

### Syntax

```text
Value1 + Value2
Value1 - Value2
Value1 * Value2
Value1 / Value2
```

### Examples

```text
Revenue + OtherIncome
Revenue - Cost
Units * Price
Revenue / Units
```

These expressions return the sum, difference, product, or quotient of the specified values.

## Comparison operators

Use comparison operators to compare values from node references and measures.

### Syntax

```text
Value1 > Value2
Value1 >= Value2
Value1 = Value2
Value1 != Value2
Value1 < Value2
Value1 <= Value2
```

### Examples

```text
Revenue > Budget
Revenue >= Budget
Revenue = Budget
Revenue != Budget
Revenue < Budget
Revenue <= Budget
```

Use comparison operators when you need to evaluate the relationship between planning values.

## Parentheses

Use parentheses `()` to group expressions and control the order in which operations are evaluated.

### Syntax

```text
(Value1 + Value2) * Value3
```

### Example

```text
(Revenue - Cost) / Revenue
```

In this example, Plan evaluates `Revenue - Cost` before dividing the result by `Revenue`.

Use parentheses when a formula contains multiple operations and the order of evaluation matters.

## Positive and negative values

Use the unary `+` and `-` operators to indicate a positive or negative value.

### Syntax

```text
+Value
-Value
```

### Example

```text
-1
```

Use the `-` operator to represent a negative value.

## Operators with calendar dates

You can use the supported arithmetic and comparison operators with nodes and measures that contain calendar dates.

## Combine operators in a formula

You can combine multiple operators in a single formula to perform more complex calculations.

For example:

```text
(Revenue - Cost) / Revenue
```

This formula calculates the difference between `Revenue` and `Cost` and then divides the result by `Revenue`.

Use parentheses when combining multiple operators to make the intended order of evaluation explicit.
