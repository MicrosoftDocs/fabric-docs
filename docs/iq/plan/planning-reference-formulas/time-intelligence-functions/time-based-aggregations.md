---
title: 'Time Intelligence Functions: Time-Based Aggregations'
description: Learn how to use time-based aggregation functions in planning to analyze measure values across custom date ranges. Calculate rolling averages, moving sums, and aggregated metrics using AGGREGATE, MOVINGAVERAGE, and MOVINGSUM.
ms.date: 08/19/2026
ms.topic: reference
ms.search.form: Time Intelligence functions
customer intent: Learn how to use Time Intelligence functions in planning to aggregate measure values over specified date ranges, calculate rolling averages and sums, and perform statistical aggregations using AGGREGATE, MOVINGAVERAGE, and MOVINGSUM.
---

# Time-based aggregations

Planning supports time-based aggregation functions that help you analyze measure values across a specified time period. These functions enable you to calculate rolling values and perform aggregations over date ranges.

## AGGREGATE

The *AGGREGATE* function performs an aggregation on a measure over a specified date range. It supports aggregation methods such as average, sum, minimum, maximum, and median.

### Syntax

```
AGGREGATE(measure, startDate, endDate, aggregationType)
```

### Arguments

* `measure`: The measure on which the aggregation is performed.
* `startDate`: The start date of the date range.
* `endDate`: The end date of the date range.
* `aggregationType`: Specifies the aggregation method to apply. Supported values include `AVG`, `SUM`, `MIN`, `MAX`, and `MEDIAN`.

### Return value

Returns the aggregated value of the specified measure over the given date range.

### Examples

```
AGGREGATE([Sales], SHIFT(COLUMN.CURRENT_PERIOD, "-3M"), SHIFT(CURRENT_PERIOD, "-1M"), "MAX")
```

Returns the maximum *Sales* value for the specified date range. In this example, the function returns the maximum sales over the previous three months.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/aggregate-max.png" alt-text="Screenshot of the Formula Measure panel showing the AGGREGATE function with SHIFT arguments and MAX aggregation." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/aggregate-max.png":::

```
AGGREGATE([Sales], DATE(2025,4,1), DATE(2025,7,31), "MEDIAN")
```

Returns the median *Sales* value for the specified date range. In this example, the function returns the median sales between April 1, 2025 and July 31, 2025.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/aggregate-median.png" alt-text="Screenshot of the Formula Measure panel showing an AGGREGATE formula with MEDIAN over a date range." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/aggregate-median.png":::

## MOVINGSUM

The *MOVINGSUM* function returns the sum of a measure over a specified date range.

### Syntax

```
MOVINGSUM(measure, startDate, endDate)
```

### Arguments

* `measure`: The measure for which the sum is calculated.
* `startDate`: The start date of the date range.
* `endDate`: The end date of the date range.

### Return value

Returns the sum of the specified measure over the given date range.

### Examples

```
MOVINGSUM([Sales], COLUMN.CURRENT_PERIOD, SHIFT(COLUMN.CURRENT_PERIOD, "2M"))
```

Returns the sum of the *Sales* values for the current period and the following two months. For example, the moving sum for January is calculated using the *Sales* values for January, February, and March.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-current-period.png" alt-text="Screenshot of the Formula Measure pane with MOVINGSUM using COLUMN.CURRENT_PERIOD and SHIFT." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-current-period.png":::

```
MOVINGSUM([Sales], DATE(2024,4,1), DATE(2024,8,31))
```

Returns the sum of the *Sales* values between **April 1, 2025** and **August 31, 2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-date.png" alt-text="Screenshot of the Formula Measure pane showing a MOVINGSUM formula with DATE functions." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-date.png":::

You can also use the *MOVINGSUM* function with forecast measures to calculate sums across open and closed periods.

```
MOVINGSUM([Forecast], [Forecast].OPEN_START, [Forecast].OPEN_END)
```

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-forecast.png" alt-text="Screenshot of the Formula Measure pane showing a MOVINGSUM formula using Forecast OPEN_START and OPEN_END." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingsum-forecast.png":::

## MOVINGAVERAGE

The *MOVINGAVERAGE* function returns the average of a measure over a specified date range.

### Syntax

```
MOVINGAVERAGE(measure, startDate, endDate)
```

### Arguments

* `measure`: The measure for which the average is calculated.
* `startDate`: The start date of the date range.
* `endDate`: The end date of the date range.

### Return value

Returns the average of the specified measure over the given date range.

### Examples

```
MOVINGAVERAGE([Sales], COLUMN.CURRENT_PERIOD, SHIFT(COLUMN.CURRENT_PERIOD, "2M"))
```

Returns the average *Sales* value for the current period and the following two months. For example, the moving average for January is calculated using the *Sales* values for January, February, and March.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-current-period.png" alt-text="Screenshot of the Formula Measure pane with MOVINGAVERAGE formula using COLUMN.CURRENT_PERIOD and SHIFT." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-current-period.png":::

```
MOVINGAVERAGE([Sales], DATE(2025,4,1), DATE(2025,8,31))
```

Returns the average *Sales* value between **April 1, 2025** and **August 31, 2025**.

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-date.png" alt-text="Screenshot of the Formula Measure pane with a MOVINGAVERAGE formula using DATE ranges." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-date.png":::

You can also use the *MOVINGAVERAGE* function with forecast measures to calculate averages across open and closed periods.

```
MOVINGAVERAGE([Forecast], [Forecast].OPEN_START, [Forecast].OPEN_END)
```

:::image type="content" source="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-forecast.png" alt-text="Screenshot of the Formula Measure pane with a MOVINGAVERAGE formula using Forecast OPEN_START and OPEN_END." lightbox="../../media/planning-reference-formulas/time-intelligence-functions/time-based-aggregations/movingaverage-forecast.png":::
