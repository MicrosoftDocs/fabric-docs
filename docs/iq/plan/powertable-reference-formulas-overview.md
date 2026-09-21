---
title: PowerTable Formulas and Functions Reference
description: PowerTable supports over 50 formulas and functions for formula columns and default values. Browse the full reference with syntax, examples, and tips to build yours.
ms.date: 09/21/2026
ms.topic: reference
---

# Formulas and functions in PowerTable

Planning sheet supports more than 100 formulas and functions, including logical, conditional, mathematical, text, date, and lookup functions. PowerTable supports a subset of these formulas and a few more, with over 50 formulas available.

In PowerTable, you can use formulas when creating a **formula column** or configuring **data-derived default values**.

## Formula column

Add formula columns to your PowerTable app to perform calculations without writing complex code. You can add formula columns at the visual level or directly to the database through the PowerTable app.

When you add a formula column, enter the required formula in the formula editor. As you type, the editor provides suggestions and autocomplete options to help you create and troubleshoot formulas.

You can also use **Ctrl + Space** to manually open the suggestions pop-up.

:::image type="content" source="media/powertable-reference-formulas-overview/references-functions.png" alt-text="Screenshot of the Add Formula Column pane with the formula editor showing References and Functions tabs and function suggestions." lightbox="media/powertable-reference-formulas-overview/references-functions.png":::

- Select the **Reference** tab to add column names to the formula.
- Select the **Functions** tab to view the list of supported functions. Select one to view its syntax and example and then insert it.

:::image type="content" source="media/powertable-reference-formulas-overview/auto-suggestions.png" alt-text="Screenshot of the formula editor displaying IF syntax help, tooltip with arguments and examples, and the References and Functions tabs." lightbox="media/powertable-reference-formulas-overview/auto-suggestions.png":::

A formula can contain the following elements:

- **References:** Column names that contain values. For example, `[Name]`, `[Cost]`, and such.
- **Expressions:** References combined with logical or mathematical operators to define an operation. For example, `(([Actuals]-[Plan])/[Plan]) > 0.2`.
- **Constants:** Values or numbers that don't change.
- **Functions:** Predefined operations that accept one or more expressions and values and return a result. Each function has a specific keyword and syntax. Example: `IF([Age]>50,"Senior","Junior")`.
- **Nested functions:** Multiple functions combined within a single formula. Example: `IF((AND([Age]>50),([Gender]=="F")),0.5,0.2)`.

> [!NOTE]
> Don't attempt to copy and paste the formulas from the preceding section.
>
> Copy-pasting a formula isn't supported. PowerTable resolves column references as you type, and pasted text doesn't preserve those references.
>
> Type the formula manually, use **Ctrl+Space** and then under **References** tab, select the reference to insert each column reference instead of typing the bracketed column name as plain text.

For more information about adding and configuring a formula column, see [Insert formula column](./powertable-how-to-insert-columns/how-to-insert-formula-columns.md).

## Default values

Default values automatically populate columns with predefined data when no value is provided. You can enter a static value or configure a formula to create a dynamic default value based on existing data.

For more information, see [Default values using formulas](./powertable-how-to-configure-columns/how-to-configure-general-column-properties.md#formula)

PowerTable formulas can be classified into:

- [Conditional statements](#conditional-statements)
- [Logical functions](#logical-functions)
- [Math functions](#math-functions)
- [Text formatting functions](#text-formatting-functions)
- [Date functions](#date-functions)
- [Identifiers](#identifiers)
- [Other operators](#other-operators)

Following are the supported formulas and functions in PowerTable. Navigate to the links for detailed examples.

## Conditional statements

Conditional statements evaluate expressions and return different values depending on whether the conditions are true or false.

| Formula | Description |
| --- | --- |
| [IF](./planning-reference-formulas/conditional-statements.md#if) | Returns one value if a condition is true and another value if it is false. |
| [IFNA](./planning-reference-formulas/conditional-statements.md#ifna) | Returns the specified value if an expression results in the #N/A error; otherwise, it returns the result of that expression. |
| [SWITCH](./planning-reference-formulas/conditional-statements.md#switch) | Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If no match is found, an optional default value is returned. |

## Logical functions

Apply logical functions to test conditions and return *TRUE* or *FALSE* results.

These functions are often used along with the IF function and other conditional functions to evaluate multiple criteria.

| Formula | Description |
| --- | --- |
| [AND](./planning-reference-formulas/logical-functions.md#and) | Returns *TRUE* only if all specified conditions are *TRUE*. If any condition evaluates to *FALSE*, the function returns *FALSE*. |
| [IN](./planning-reference-formulas/logical-functions.md#in) | Returns *TRUE* if a specified value matches any value in a list or array. It returns *FALSE* if no match is found. |
| [ISBLANK](./planning-reference-formulas/logical-functions.md#isblank) | Returns *TRUE* if the specified value is blank or empty. It returns *FALSE* if the value contains any text, number, or expression. |
| [ISEMPTY](./planning-reference-formulas/logical-functions.md#isblank) | Same as ISBLANK. |
| [ISNUMBER](./planning-reference-formulas/logical-functions.md#isnumber) | Returns *TRUE* if the specified value is a valid number. It returns *FALSE* if the value is not numeric. |
| [NOT](./planning-reference-formulas/logical-functions.md#not) | Returns the opposite of a logical value. It returns *TRUE* if the specified condition is *FALSE*, and *FALSE* if the condition is *TRUE*. |
| [OR](./planning-reference-formulas/logical-functions.md#or) | Returns *TRUE* if at least one of the specified conditions is *TRUE*. It returns *FALSE* only when all conditions evaluate to *FALSE*. |
| [XOR](./planning-reference-formulas/logical-functions.md#xor) | Returns *TRUE* if exactly one or an odd number of the specified conditions is *TRUE*. Otherwise, it returns *FALSE*. |

## Math functions

PowerTable supports the following math functions for arithmetic operations, aggregations, statistical calculations, exponential functions, rounding, formatting, and lookups.

| Formula | Description |
| --- | --- |
| [ABS](./planning-reference-formulas/math-functions/arithmetic-functions.md#abs) | Returns the absolute value of a number, which represents the number’s magnitude without considering its sign. |
| [AVERAGE](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#average) | Returns the average (arithmetic mean) of a set of values. |
| [AVERAGEEXNEG](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#averageexneg) | Returns the average (arithmetic mean) of a set of values while excluding negative numbers from the calculation. |
| [AVERAGEEXZERO](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#averageexzero) | Returns the average (arithmetic mean) of a set of values while excluding the zero values from the calculation. |
| [AVERAGEEXZERONEG](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#averageexzeroneg) | Returns the average (arithmetic mean) of a set of values while excluding both zero and negative numbers from the calculation. |
| [CEILING](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#ceiling) | Rounds a number up to the nearest integer or specified multiple (significance). |
| [DIVIDE](./planning-reference-formulas/math-functions/arithmetic-functions.md#divide) | Returns the result of dividing one number by another. |
| [EVEN](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#even) | Rounds a number up to the nearest even integer. |
| [EXP](./planning-reference-formulas/math-functions/exponential-logarithmic-functions.md#exp) | Returns the value of the mathematical constant *e* raised to the power of a specified number. |
| [FLOOR](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#floor) | Rounds a number toward zero to the nearest specified multiple of significance. |
| [INDEXOF](./planning-reference-formulas/math-functions/random-lookup-functions.md#indexof) | Returns the index of the first occurrence of a specified value within a list of values. |
| [LOG](./planning-reference-formulas/math-functions/exponential-logarithmic-functions.md#log) | Returns the logarithm of a number using a specified base. |
| [MAX](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#max) | Returns the largest number from a set of values. |
| [MEDIAN](./planning-reference-formulas/statistical-functions/calculate-measures-central-tendency.md#median) | Returns the middle value in a set of numbers arranged in ascending order. |
| [MIN](./planning-reference-formulas/math-functions/aggregation-statistical-functions.md#min) | Returns the smallest number from a set of values. |
| [MOD](./planning-reference-formulas/math-functions/arithmetic-functions.md#mod) | Divides one number by another and returns the remainder of the division. |
| [NUMBERVALUE](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#numbervalue) | Converts text into a numeric value by interpreting decimal and thousands separators, such as commas and periods. |
| [ODD](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#odd) | Rounds a number up and returns the nearest higher odd integer. |
| [PCT](./planning-reference-formulas/math-functions/arithmetic-functions.md#pct) | Performs percentage calculations by converting a numeric value into its percentage equivalent. |
| [POW](./planning-reference-formulas/math-functions/arithmetic-functions.md#power) | Returns the result of a number raised to a specified power. |
| [RAND](./planning-reference-formulas//math-functions/random-lookup-functions.md#rand) | Returns a random decimal number between 0 and 1. |
| [RANDBETWEEN](./planning-reference-formulas//math-functions/random-lookup-functions.md#randbetween) | Returns a random integer between two specified values. |
| [ROUND](./planning-reference-formulas/math-functions/rounding-formatting-functions.md#round) | Rounds a number to a specified number of decimal places. |
| [SUM](./planning-reference-formulas/math-functions/arithmetic-functions.md#sum) | Returns the total of all numbers provided in the arguments. |
| [SQRT](./planning-reference-formulas/math-functions/exponential-logarithmic-functions.md#sqrt) | Returns the square root of a given number. |

## Text formatting functions

PowerTable supports the following text formatting functions to format, extract, and transform text values in the tables.

| Formulas | Description |
| --- | --- |
| [CONCATENATE](./planning-reference-formulas/text-functions.md#concatenate) | Joins two or more text strings into a single text string. |
| FIND | Returns the position of the first occurrence of a sub-string within a text string. |
| [LEFT](./planning-reference-formulas/text-functions.md#left) | Returns the specified number of characters from the beginning of a text string. |
| [LEN](./planning-reference-formulas/text-functions.md#len) | Returns the total number of characters in a text string, including letters, numbers, spaces, and special characters. |
| [LOWER](./planning-reference-formulas/text-functions.md#lower) | Converts all characters in a text string to lowercase. |
| [MID](./planning-reference-formulas/text-functions.md#mid) | Returns a specified number of characters from a text string, starting at the position you specify. |
| [REPLACE](./planning-reference-formulas/text-functions.md#replace) | Replaces part of a text string with another text value based on the specified position and length. |
| [REPT](./planning-reference-formulas/text-functions.md#rept) | Repeats a text string a specified number of times. |
| [RIGHT](./planning-reference-formulas/text-functions.md#right) | Returns the specified number of characters from the end of a text string. |
| [TEXT](./planning-reference-formulas/text-functions.md#text) | Converts a value into formatted text based on the specified format string. |
| [TRIM](./planning-reference-formulas/text-functions.md#trim) | Removes leading and trailing spaces from a text string while retaining spaces between words. |
| [UPPER](./planning-reference-formulas/text-functions.md#upper) | Converts all characters in a text string to uppercase. |
| [VALUE](./planning-reference-formulas/text-functions.md#value) | Converts a text string that represents a number into a numeric value. |

## Date functions

PowerTable supports the following date functions to calculate, extract, and format date and time values.

| Formulas | Description |
| --- | --- |
| [DATEADD](./planning-reference-formulas/date-functions/perform-date-calculations.md#dateadd) | Adds or subtracts a specified interval from a date value. |
| [DATEDIFF](./planning-reference-formulas/date-functions/perform-date-calculations.md#datediff) | Returns the number of days between two dates. |
| [DATE](./planning-reference-formulas/date-functions/create-format-convert-dates.md#date) | Converts a date value into the specified format. |
| [DAY](./planning-reference-formulas/date-functions/extract-components-start-end-dates.md#day) | Extracts the day value from a date. |
| [EOMONTH](./planning-reference-formulas/date-functions/extract-components-start-end-dates.md#eomonth) | Returns the end date of the month for a given date. |
| [FROMEXCELDATE](./planning-reference-formulas/date-functions/create-format-convert-dates.md#from_exceldate) | Converts an Excel serial date number into its equivalent date value. |
| [MONTH](./planning-reference-formulas/date-functions/extract-components-start-end-dates.md#month) | Extracts the month value from a date. |
| [NOW](./planning-reference-formulas/date-functions/create-format-convert-dates.md#datenow) | The *DATE.NOW* function returns the current date and time based on the system settings. |
| TODAY | Returns the current date. |
| [YEAR](./planning-reference-formulas/date-functions/extract-components-start-end-dates.md#year) | Extracts the year from a date. |

## Identifiers

Use identifiers to reference and check table columns' values with the specified values.

| Formulas | Description |
| --- | --- |
| [HAS](./planning-reference-formulas/identifiers.md#has) | Checks whether the specified value exists in one or more columns. This function is commonly used with visual columns, such as **Single Select** and **Multi-select**. |
| [HAS_SOME](./planning-reference-formulas/identifiers.md#has_some) | Checks whether one or more of the specified values exist in one or more columns. |
| [MATCH](./planning-reference-formulas/identifiers.md#match) | Checks whether the specified value exactly matches the value in a column. |
| BLANK | Returns a blank value. Use this in formula to insert a blank or check for blank values. |
| COLUMN_COUNT | Returns total number of column items in the table. |

## Other operators

For the list of unary and binary operators supported, see [Other operators](./planning-reference-formulas/planning-reference-other-operators.md).
