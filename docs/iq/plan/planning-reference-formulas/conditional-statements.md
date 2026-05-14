---
title: Conditional Statements
description: Learn about conditional statement functions in plan (preview) and how to use them to perform calculations based on specified conditions. 
ms.date: 05/08/2026
ms.topic: reference
ms.search.form: Conditional statements
#customer intent: As a user, I want to understand conditional statement functions and how to use them in calculations.
---

# Conditional statements

Conditional statements let you perform calculations based on specified conditions. These functions evaluate expressions and return different values depending on whether the conditions are true or false. They are commonly used to apply business logic, categorize data, filter results, and handle exceptions.

In plan (preview), conditional statements help you create dynamic calculations that adapt to different scenarios, such as applying thresholds, categorizing data, or managing error conditions.

## AVERAGEIF

The *AVERAGEIF* function returns the average of values in a list that meet a specified condition.

### Syntax

```
AVERAGEIF(list, condition)
```

### Arguments

* `list`: The list of values to evaluate.
* `condition`: The condition used to filter the values.

### Return value

Returns the average of the values that satisfy the given condition.

### Example

```
AVERAGEIF([Sales,Sales1,Sales2], ">0.1m")
```

Returns the average of *Sales*, *Sales1*, and *Sales2* column values when they are greater than *0.1 million.*

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/averageif.png" alt-text="Screenshot of AVERAGEIF function." lightbox="../media/planning-reference-formulas/conditional-statements/averageif.png":::

### Excel equivalent

[AVERAGEIF](https://support.microsoft.com/office/averageif-function-faec8e2e-0dec-4308-af69-f5576d8ac642)

## COUNTIF

The *COUNTIF* function returns the count of values that match a specified condition.

### Syntax

```
COUNTIF(list, condition)
```

### Arguments

* `list`: The list of values to evaluate.
* `condition`: The condition used to filter the values.

### Return value

Returns the number of values that satisfy the given condition.

### Example

```
COUNTIF([[2024.Plan_Variance %], [2025.Plan_Variance %], [2026.Plan_Variance %]], ">0")
```

Returns the count of *Plan Variance %* values across *2024*, *2025*, and *2026* that are greater than 0.

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/countif.png" alt-text="Screenshot of COUNTIF function." lightbox="../media/planning-reference-formulas/conditional-statements/countif.png":::

### Excel equivalent

[COUNTIF](https://support.microsoft.com/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34)

## FILTERIF

The *FILTERIF* function filters a list of values based on a specified condition and returns the filtered results as an array.

Because it returns an array, it is typically used with aggregate functions such as *SUM* or *AVERAGE*. It can also be used to populate a [calculated row](../planning-how-to-insert-rows-formula.md).

### Syntax

```
FILTERIF(list, condition)
```

### Arguments

* `list`: The list of values to evaluate.
* `condition`: The condition used to filter the values.

### Return value

Returns an array of values that meet the specified condition.

### Example

```
SUM(FILTERIF([[Sales], [Sales1], [Sales2]], ">0.1m"))
```

Filters values from *Sales*, *Sales1*, and *Sales2* that are greater than *0.1 million* and returns their sum.

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/filterif.png" alt-text="Screenshot of FILTERIF function." lightbox="../media/planning-reference-formulas/conditional-statements/filterif.png":::

## IF

The *IF* function returns one value if a condition is true and another value if it is false.

### Syntax

```
IF(logical_test, value_if_true, value_if_false )
```

### Arguments

* `logical_test`: The condition to evaluate.
* `value_if_true`: The value returned if the condition is true.
* `value_if_false`: The value returned if the condition is false.

### Return value

Returns either `value_if_true` or `value_if_false` based on the result of the condition.

### Example

```
IF(PY > 0, (AC - PY) / PY, 0)
```

Returns `(AC - PY) / PY` if `PY` is greater than 0; otherwise, returns 0.

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/if.png" alt-text="Screenshot of IF function." lightbox="../media/planning-reference-formulas/conditional-statements/if.png":::

### Excel equivalent

[IF](https://support.microsoft.com/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2)

## IFNA

The *IFNA* function returns the specified value if an expression results in the #N/A error; otherwise, it returns the result of that expression.

### Syntax

```
IFNA(value, value_if_na)
```

### Arguments

* `value`: The expression to evaluate for the #N/A error.
* `value_if_na`: The value to return if the expression results in the #N/A error.

### Return value

Returns either the result of the `value` or `value_if_na` if the #N/A error occurs.

### Example

```
IFNA((Actuals - Plan) / Plan, 0)
```

Returns `(Actuals - Plan) / Plan` if the expression evaluates successfully; otherwise, returns 0 if the #N/A error occurs.

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/ifna.png" alt-text="Screenshot of IFNA function." lightbox="../media/planning-reference-formulas/conditional-statements/ifna.png":::

### Excel equivalent

[IFNA](https://support.microsoft.com/office/ifna-function-6626c961-a569-42fc-a49d-79b4951fd461)

## SUMIF

The *SUMIF* function returns the sum of values in a list that satisfy a specified condition.

### Syntax

```
SUMIF(list, condition, [range])
```

### Arguments

* `list`: The list of values to evaluate.
* `condition`: The condition used to filter values in the list.
* `range` (optional): The list of values to sum if the values in the `list` meet the condition. If not specified, the values in the original `list` are summed.

### Return value

Returns the sum of values that satisfy the condition.

### Example

#### Without range

```
SUMIF([10, 20, 30, 40], ">20")
```

In this example, the *SUMIF* function returns the sum of values greater than 20 from the list and returns 70 (30 + 40).

#### With range

```
SUMIF([10, 20, 30, 40], ">20", [1, 2, 3, 4])
```

The *SUMIF* function evaluates the values in the first list and returns the sum of corresponding values from the second list where the condition is met. In this example, the result is 7 (3 + 4).

## SWITCH

The *SWITCH* function evaluates an expression against a list of values and returns the result corresponding to the first matching value. If no match is found, an optional default value is returned.

### Syntax

```
SWITCH(expression, val1, res1, val2, res2, ..., val_n, res_n, default)
```

### Arguments

* `expression`: The expression to evaluate.
* `val1, val2, ... val_n`: The values to compare against the expression.
* `res1, res2, ... res_n`: The result to return for each matching value.
* `default` (optional): The value to return if no match is found.

### Return value

Returns the result corresponding to the first matching value. If no match is found, returns the `default` value (if specified).

### Example

```
SWITCH(Sub-Category, "Bookcases", 4.55, "Chairs", 2.67, "Tables", 2.81, "Art", 1.35, "Paper", 3.79, "Machines", 10.55, "Envelopes", 1.23, "Storage", 2.53, 0)
```

Evaluates the `Sub-Category` value and returns the corresponding numeric value for each match; if no match is found, returns 0.

:::image type="content" source="../media/planning-reference-formulas/conditional-statements/switch.png" alt-text="Screenshot of SWITCH function." lightbox="../media/planning-reference-formulas/conditional-statements/switch.png":::

### Excel equivalent

[SWITCH](https://support.microsoft.com/office/switch-function-47ab33c0-28ce-4530-8a45-d532ec4aa25e)
