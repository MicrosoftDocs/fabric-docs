---
title: Rounding and Formatting Functions
description: Learn about rounding and formatting functions in plan (preview) and how to use them to round, format, and control numeric precision in calculations.
ms.date: 06/01/2026
ms.topic: reference
ms.search.form: Rounding and formatting functions
#customer intent: As a user, I want to understand rounding and formatting functions and how to use them in calculations.
---

# Rounding and formatting functions

Rounding and formatting functions let you round numbers, control numeric precision, and format numeric values in reports. These functions are commonly used to standardize calculations, adjust decimal precision, and round values to specified multiples or whole numbers.

[!INCLUDE [Fabric feature-preview-note](../../../../includes/feature-preview-note.md)]

In plan (preview), rounding and formatting functions help you create calculations for scenarios such as financial reporting, data standardization, pricing analysis, and formatted business calculations.

## CEILING

The *CEILING* function rounds a number up to the nearest integer or specified multiple (significance). If the number is already an exact multiple of the specified significance, it remains unchanged. This function is commonly used in financial calculations, pricing adjustments, quantity estimations, and scenarios where values must always be rounded upward.

### Syntax

```
CEILING(value, significance)
```

### Arguments

* `value`: Number or reference to round.
* `significance` (optional): The multiple to which the value should be rounded. If not specified, the value is rounded up to the nearest integer.

### Return value

Returns the rounded value based on the specified significance.

### Example

```
CEILING(Planned Units, 2)
```

In this example, the *Rounded\_Off Units* measure is created using the CEILING function, which returns the values in the *Planned Units* measure rounded up to the nearest multiple of 2.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/ceiling.png" alt-text="Screenshot of CEILING function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/ceiling.png":::

### Excel equivalent

[CEILING](https://support.microsoft.com/en-us/office/ceiling-function-0a5cd7c8-0720-4f0a-bd2c-c943e510899f)

## EVEN

The *EVEN* function rounds a number up to the nearest even integer. If the input number is already even, it remains unchanged. The function accepts numeric values and references as arguments. It is commonly used in calculations where results must conform to even-number requirements, such as packaging quantities, batch sizes, or standardized increments.

### Syntax

```
EVEN(value)
```

### Arguments

* `value`: The number or reference to round to the nearest even integer.

### Return value

Returns the nearest even integer greater than or equal to the specified value.

### Example

```
EVEN(Planned Units)
```

In this example, the EVEN function is used to create the *Even Planned Units* measure, which returns the values in the *Planned Units* measure rounded up to the nearest even integer.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/even.png" alt-text="Screenshot of EVEN function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/even.png":::

### Excel equivalent

[EVEN](https://support.microsoft.com/en-us/office/even-function-197b5f06-c795-4c1e-8696-3c3b8a646cf9)

## FLOOR

The *FLOOR* function rounds a number toward zero to the nearest specified multiple of significance. It accepts numeric values or references as arguments and returns the rounded result based on the given multiple.

### Syntax

```
FLOOR(value, significance)
```

### Arguments

* `value`: Number or reference to round.
* `significance` (optional): The multiple to which the number should be rounded. If not specified, the number is rounded down to the nearest integer toward zero.

### Return value

Returns the number rounded toward zero to the specified multiple.

### Example

```
FLOOR(Planned Units, 3)
```

In this example, the FLOOR function is used to create the *Rounded Off Units* measure, which returns the values in the *Planned Units* measure rounded down to the nearest multiple of 3.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/floor.png" alt-text="Screenshot of FLOOR function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/floor.png":::

### Excel Equivalent

[FLOOR](https://support.microsoft.com/en-us/office/floor-function-14bb497c-24f2-4e04-b327-b0b4de5a8886)

## MROUND

The *MROUND* function rounds a number to the nearest multiple of a specified value. It adjusts the input number up or down to the closest multiple based on the given significance. This function is commonly used in financial calculations, pricing, and quantity adjustments where values must align with defined increments.

### Syntax

```
MROUND(value, multiple)
```

### Arguments

* `value`: The number to round.
* `multiple`: The multiple to which the number is rounded.

### Return value

Returns the number rounded to the nearest specified multiple.

### Example

```
MROUND(Planned Units, 5)
```

In this example, the *Rounded Planned Units* measure is created using the MROUND function, which rounds the *Planned Units* values to the nearest multiple of 5.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/mround.png" alt-text="Screenshot of MROUND function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/mround.png":::

### Excel equivalent

[MROUND](https://support.microsoft.com/en-us/office/mround-function-c299c3b0-15a5-426d-aa4b-d2d5b3baf427)

## NUMBERVALUE

The *NUMBERVALUE* function converts text into a numeric value by interpreting decimal and thousands separators, such as commas and periods. It is useful when working with numbers stored as text, especially when data formats vary across regions or sources.

### Syntax

```
NUMBERVALUE(text, decimal_separator, group_separator)
```

### Arguments

* `text`: The text to convert into a numeric value.
* `decimal_separator` (optional): The character used to separate the integer and fractional parts of a number.
* `group_separator` (optional): The character used as the thousands separator.

### Return value

Returns the numeric value represented by the specified text.

### Example

```
NUMBERVALUE(Interest_Text, ".", ",")
```

In this example, the *Interest\_Text* column is a data input field containing numeric values stored as text. The NUMBERVALUE function is used to convert the *Interest\_Text* values into numeric values that can be used along with other measures in the report.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/numbervalue.png" alt-text="Screenshot of NUMBERVALUE function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/numbervalue.png":::

### Excel equivalent

[NUMBERVALUE](https://support.microsoft.com/en-us/office/numbervalue-function-1b05c8cf-2bfa-4437-af70-596c7ea7d879)

## ODD

The *ODD* function rounds a number up and returns the nearest higher odd integer. If the input number is already an odd number, it remains unchanged. The function accepts numeric values or references as arguments and is useful in calculations where results must conform to odd-number requirements.

### Syntax

```
ODD(value)
```

### Arguments

* `value`: The input number to round to the nearest higher odd integer.

### Return value

Returns the nearest higher odd integer.

### Example

```
ODD(Planned Units)
```

In this example, the ODD function is used to create the *Odd Planned Units* measure, which returns the values in the *Planned Units* measure rounded up to the nearest odd integer.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/odd.png" alt-text="Screenshot of ODD function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/odd.png":::

## ROUND

The *ROUND* function rounds a number to a specified number of decimal places. It adjusts the value based on standard rounding rules to produce a result with the required precision. This function is commonly used in financial calculations, reporting, and data formatting where consistent decimal accuracy is required.

### Syntax

```
ROUND(value, significance)
```

### Arguments

* `value`: The number to round.
* `significance` (optional): The number of decimal places to which the value should be rounded. If not specified, the default value is 1.

### Return value

Returns the rounded value with the specified precision.

### Example

```
ROUND(Total Sales, 2)
```

In the example below, the *Rounded Sales* measure is created using the ROUND function, which rounds the values in *Total Sales* to 2 decimal places.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/round.jpg" alt-text="Screenshot of ROUND function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/round.jpg":::

### Excel equivalent

[ROUND](https://support.microsoft.com/en-us/office/round-function-c018c5d8-40fb-4053-90b1-b3e7f61a213c)

## ROUNDDOWN

The *ROUNDDOWN* function rounds a number down toward zero to a specified number of decimal places. Unlike standard rounding, the function always reduces the value regardless of the digit that follows. It is commonly used in financial and reporting calculations where conservative estimates or controlled rounding are required.

### Syntax

```
ROUNDDOWN(value, significance)
```

### Arguments

* `value`: The number to round.
* `significance` (optional): The number of decimal places to round to.

### Return value

Returns the number rounded down toward zero.

### Example

```
ROUNDDOWN(Total Sales, 2)
```

In this example, the ROUNDDOWN function rounds the values in *Total Sales* down toward zero to two decimal places.

### Excel equivalent

[ROUNDDOWN](https://support.microsoft.com/en-us/office/rounddown-function-2ec94c73-241f-4b01-8c6f-17e6d7968f53)

## ROUNDUP

The *ROUNDUP* function rounds a number up, away from zero, to a specified number of decimal places. It always increases the value regardless of the following digits and is useful in scenarios where higher estimates, pricing adjustments, or safety margins are required.

### Syntax

```
ROUNDUP(value, significance)
```

### Arguments

* `value`: The number to round.
* `significance` (optional): The number of decimal places to round to.

### Return value

Returns the number rounded up, away from zero, to the specified number of decimal places.

### Example

```
ROUNDUP(Actuals, 2)
```

In this example, the *Rounded Sales* measure is created using the ROUNDUP function, which rounds the values in *Total Sales* up, away from zero, to two decimal places.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/roundup.png" alt-text="Screenshot of ROUNDUP function." lightbox="../../media/planning-reference-formulas/math-functions/rounding-formatting-functions/roundup.png":::

### Excel equivalent

[ROUNDUP](https://support.microsoft.com/en-us/office/roundup-function-f8bc9b23-e795-47db-8703-db171d0c42a7)
