---
title: 'Time Intelligence Functions: Time Shifting and Lookup'
description: Learn how to use time shifting and lookup functions in Plan to retrieve values from different time periods. Compare historical and future data, shift dates across periods, and access measure values using SHIFT and VALUEAT.
ms.date: 08/19/2026
ms.topic: reference
ms.search.form: Time Intelligence functions
customer intent: Learn how to use Time Intelligence functions in Plan to shift dates across months, quarters, and years, retrieve measure values from previous or future periods, and perform comparative and trend analysis using SHIFT and VALUEAT.
---

# Time shifting and lookup

Plan supports time shifting and lookup functions that retrieve values from different time periods. These functions help you shift between time periods and access measure values for comparative and trend analysis.

## SHIFT

The *SHIFT* function returns a date by shifting a specified date forward or backward by a given time interval, such as months, quarters, or years.

### Syntax

```
SHIFT(inputDate, offset)
```

### Arguments

* `inputDate`: The date to shift.
* `offset`: Specifies the number of time intervals by which the date is shifted. Use a positive value to shift the date forward and a negative value to shift it backward. Supported interval formats include months (`M`), quarters (`Q`), and years (`Y`).

### Return value

Returns the date obtained by shifting the input date by the specified time interval.

### Examples

```
SHIFT(COLUMN.CURRENT_PERIOD, "2M")
```

Returns the date two months after the current period. For example, if the current period is **January**, the function returns the corresponding date in **March**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-current-period.png" alt-text="Screenshot of the Formula Measure pane with SHIFT formula using COLUMN.CURRENT_PERIOD." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-current-period.png":::

> [!NOTE]
> Set the **Data type** to **Date** when configuring the **`SHIFT`** function to view the shifted date. Otherwise, the function returns a **`#VALUE!`** error.

The following formula shifts each *Open Date* by two months. For example, if the *Open Date* is `05/22/2026`, the function returns `7/22/2026`.

```
SHIFT([Open Date], "2M")
```

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-date.png" alt-text="Screenshot showing the SHIFT formula shifting Open Date by two months." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-date.png":::

You can also use the *SHIFT* function with forecast open and closed periods. For example, you can shift the forecast open period end date backward by two quarters.

```
SHIFT([Forecast].OPEN_END, "-2Q")
```

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-forecast.png" alt-text="Screenshot showing the SHIFT formula shifting the forecast open period end date back two quarters in a planning sheet." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/shift-forecast.png":::

## VALUEAT

The *VALUEAT* function returns the value of a measure at a specified time offset relative to the current reporting period.

### Syntax

```
VALUEAT(measure, offset)
```

### Arguments

* `measure`: The measure for which the value is returned.
* `offset`: Specifies the number of time intervals by which the value is shifted. Use a positive value to retrieve a value from a future period and a negative value to retrieve a value from a previous period. Supported interval formats include months (`M`), quarters (`Q`), and years (`Y`).

### Return value

Returns the value of the specified measure at the given time offset.

### Examples

```
VALUEAT([Sales], "-1M")
```

Returns the *Sales* value from the previous month.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/valueat-previous-month.png" alt-text="Screenshot showing VALUEAT measure returning previous month Sales values." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/valueat-previous-month.png":::

```
VALUEAT([Sales], "1Q")
```

Returns the *Sales* value from the next quarter.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/valueat-next-quarter.png" alt-text="Screenshot showing VALUEAT measure returning next quarter Sales values across 2025 and 2026 quarters." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-shifting-lookup/valueat-next-quarter.png":::
