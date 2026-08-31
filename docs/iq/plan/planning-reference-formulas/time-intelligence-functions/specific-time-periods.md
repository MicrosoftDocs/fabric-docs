---
title: 'Time Intelligence Functions: Specific Time Periods'
description: Learn how to use specific time period functions in planning to retrieve data for selected months, quarters, and years. Analyze and aggregate data for individual time periods or custom date ranges using MONTHPERIOD, QTRPERIOD, and YEARPERIOD.
ms.date: 08/19/2026
ms.topic: reference
ms.search.form: Time Intelligence functions
customer intent: Learn how to use Time Intelligence functions in planning to retrieve and analyze data for specific months, quarters, and years. Use MONTHPERIOD, QTRPERIOD, and YEARPERIOD to define custom time ranges for reporting, filtering, and aggregation.
---

# Calculate specific time periods

Planning supports specific time period functions that retrieve data for individual months, quarters, or years. These functions help you select data for a single time period or a range of time periods for analysis and reporting.

## MONTHPERIOD

The *MONTHPERIOD* function returns a range of dates for a specified month or range of months within a given year. Use this function with the `SELECT.BYDATE` function and an aggregate function, such as `SUM` or `AVERAGE`, to retrieve and aggregate data over the returned date range.

### Syntax

```
MONTHPERIOD(year, from_month, [to_month])
```

### Arguments

* `year`: The year for which data is returned.
* `from_month`: Specifies the month for which data is returned or the starting month of the range. Valid values are `1` through `12`.
* `to_month` (optional): Specifies the ending month of the range. Valid values are `1` through `12`.

### Return value

Returns a range of dates for the specified month or range of months.

### Examples

```
MONTHPERIOD(2025,1,7)
```

Returns the date range from **January** to **July** of **2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/monthperiod-to-month.png" alt-text="Screenshot of a Planning sheet showing MONTHPERIOD function with from and to months." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/monthperiod-to-month.png":::

```
MONTHPERIOD(2025,4)
```

Returns the date range for **April 2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/monthperiod-from-month.png" alt-text="Screenshot of a Planning sheet showing MONTHPERIOD function with from month." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/monthperiod-from-month.png":::

## QTRPERIOD

The *QTRPERIOD* function returns a range of dates for a specified quarter or range of quarters in a given year. Use this function with the `SELECT.BYDATE` function and an aggregate function, such as `SUM` or `AVERAGE`, to retrieve and aggregate data over the returned date range.

### Syntax

```
QTRPERIOD(year, from_quarter, [to_quarter])
```

### Arguments

* `year`: The year for which data is returned.
* `from_quarter`: The quarter to return, or the starting quarter when specifying a range. Valid values are `1` through `4`.
* `to_quarter` (optional): The ending quarter of the range. Valid values are `1` through `4`.

### Return value

Returns a range of dates for the specified quarter or range of quarters.

### Examples

```
QTRPERIOD(2025,1,3)
```

Returns the date range from the first quarter through the third quarter of **2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/qtrperiod-to-quarter.png" alt-text="Screenshot of a Planning sheet showing QTRPERIOD function with from and to quarters." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/qtrperiod-to-quarter.png":::

```
QTRPERIOD(2025,4)
```

Returns the date range for the fourth quarter of **2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/qtrperiod-from-quarter.png" alt-text="Screenshot of a Planning sheet showing the QTRPERIOD function for a single quarter." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/qtrperiod-from-quarter.png":::

## YEARPERIOD

The *YEARPERIOD* function returns a range of dates for a specified year or range of years. Use this function with the `SELECT.BYDATE` function and an aggregate function, such as `SUM` or `AVERAGE`, to retrieve and aggregate data over the returned date range.

### Syntax

```
YEARPERIOD(from_year, [to_year])
```

### Arguments

* `from_year`: The year to return, or the starting year when specifying a range.
* `to_year` (optional): The ending year of the range.

### Return value

Returns a range of dates for the specified year or range of years.

### Examples

```
YEARPERIOD(2024,2026)
```

Returns the date range from **2024** through **2026**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/yearperiod-to-year.png" alt-text="Screenshot of a Planning sheet showing the YEARPERIOD function with from and to year." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/yearperiod-to-year.png":::

```
YEARPERIOD(2025)
```

Returns the date range for **2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/yearperiod-from-year.png" alt-text="Screenshot of a Planning sheet with the Formula Measure pane showing a YearPeriod function with a single year." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/specific-time-periods/yearperiod-from-year.png":::
