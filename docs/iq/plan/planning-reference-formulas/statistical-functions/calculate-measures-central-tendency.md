---
title: 'Statistical Functions: Calculate Measures of Central Tendency'
description: Learn about statistical functions in Plan and use them to calculate measures of central tendency, such as the median and mode, to summarize and analyze numerical data.
ms.date: 08/19/2026
ms.topic: reference
ms.search.form: Statistical functions
#customer intent: As a user, I want to know about statistical functions in Plan and use them to calculate measures of central tendency in numerical data.
---

# Calculate measures of central tendency

Plan provides functions to identify the central or most representative value in a dataset. Use the functions in this section to calculate statistical measures such as the median and mode, to summarize and analyze numerical data.

## MEDIAN

The *MEDIAN* function returns the middle value in a set of numbers arranged in ascending order. If the set contains an even number of values, the function returns the average of the two middle values.

### Syntax

```
MEDIAN(number1, [number2], ...)
```

### Arguments

* `number1`, `number2`, ...: The numbers or range of values used to calculate the median value.

### Return value

Returns the median value of the specified set of numbers.

### Examples

```
MEDIAN(10,30,50,40,20)
```

Returns the middle value from the specified set of numbers. In this example, the function returns `30`.

```
MEDIAN(10,30,50,60,40,20)
```

Returns the average of the two middle values from the specified set of numbers. In this example, the function returns `35`.

You can use the *MEDIAN* function to determine the middle value of a dataset, such as salaries, revenue, sales, or scores, especially when you want to reduce the impact of extreme values.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/median.png" alt-text="Screenshot of a Planning Sheet with a Median column added and the Formula Measure panel showing a MEDIAN formula." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/median.png":::

### Excel Equivalent

[MEDIAN](https://support.microsoft.com/en-us/office/median-function-d0916313-4753-414c-8537-ce85bdd967d2)

## MODE

The *MODE* function returns the value that appears most frequently in a set of numbers. If multiple values have the same highest frequency, the function returns only one of those values.

### Syntax

```
MODE(number1, [number2], ...)
```

### Arguments

* `number1`, `number2`, ...: The numbers or range of values used to determine the most frequently occurring value.

### Return value

Returns the most frequently occurring value from the specified set of numbers.

### Examples

```
MODE(10, 20, 30, 20, 40)
```

Returns the most frequently occurring value from the specified set of numbers. In this example, the function returns `20`.

```
MODE(5, 8, 5, 10, 8, 5)
```

Returns the most frequently occurring value from the specified set of numbers. In this example, the function returns `5`.

You can use the *MODE* function to determine the most common value in a dataset, such as sales, scores, or costs.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/mode.png" alt-text="Screenshot of the Formula Measure pane defining a Mode measure using MODE across yearly Total Revenue columns." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/mode.png":::

> [!NOTE]
> If no values are repeated, the *MODE* function returns an **`#ERR`** error. You can display a custom value instead of the **`#ERR`** error by using a conditional statement in the formula or by updating the setting under **Format** > **Appearance**.

### Excel Equivalent

[MODE](https://support.microsoft.com/en-us/office/mode-function-e45192ce-9122-4980-82ed-4bdc34973120)

## MODESNGL

The *MODESNGL* function returns the single most frequently occurring value in a set of numbers. If multiple values have the same highest frequency, the function returns the first value that occurs among them.

### Syntax

```
MODESNGL(number1, [number2], ...)
```

### Arguments

* `number1`, `number2`, ...: The numbers or range of values used to determine the single most frequently occurring value.

### Return value

Returns the single most frequently occurring value from the specified set of numbers.

### Examples

```
MODESNGL(10, 20, 30, 20, 40)
```

Returns the single most frequently occurring value from the specified set of numbers. In this example, the function returns `20`.

```
MODESNGL(5, 8, 5, 10, 8, 5, 8)
```

Returns the first value among those with the highest frequency. In this example, the function returns `5`.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/modesngl.png" alt-text="Screenshot of the Formula Measure pane with title MODESNGL and a formula referencing yearly Total Revenue columns." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-measures-central-tendency/modesngl.png":::

> [!NOTE]
> If no values are repeated, the *MODESNGL* function returns an **`#ERR`** error. You can display a custom value instead of the **`#ERR`** error by using a conditional statement in the formula or by updating the setting under **Format** &gt; **Appearance**.

### Excel Equivalent

[MODESNGL](https://support.microsoft.com/en-us/office/mode-sngl-function-f1267c16-66c6-4386-959f-8fba5f8bb7f8)
