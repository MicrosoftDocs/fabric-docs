---
title: 'Statistical Functions: Calculate Percentiles and Percent Ranks'
description: Learn about statistical functions in Plan and use them to calculate percentiles and percentage ranks to determine the relative position and distribution of values in numerical data.
ms.date: 08/19/2026
ms.topic: reference
ms.search.form: Statistical functions
#customer intent: As a user, I want to know about statistical functions in Plan and use them to calculate percentiles and percentage ranks to analyze the relative position and distribution of values in numerical data.
---

# Calculate percentiles and percent ranks

Plan provides functions to calculate percentiles and percentage ranks in a dataset. Use the functions in this section to determine the relative position of values and analyze their distribution within a set of numerical data.

## PERCENTILEINC

The *PERCENTILEINC* function returns the *k*-th percentile of a set of numbers using the inclusive method. The function accepts *k* values from `0` to `1`, including the minimum and maximum values in the calculation.

### Syntax

```
PERCENTILEINC(array, k)
```

### Arguments

* `array`: The list or range of numeric values used to determine the percentile.
* `k`: Specifies the percentile to return as a decimal value between `0` and `1`.
  * `0`: Returns the minimum value.
  * `0.25`: Returns the 25th percentile.
  * `0.5`: Returns the median (50th percentile).
  * `0.75`: Returns the 75th percentile.
  * `1`: Returns the maximum value.

> [!NOTE]
> The inclusive method supports `k` values from `0` to `1`, inclusive. If a value outside this range is specified, the *PERCENTILEINC* function returns a **`#ERR`** error.

### Return value

Returns the value corresponding to the specified percentile from the given set of numbers.

### Examples

```
PERCENTILEINC(10,20,30,40,50,60,70,80,0.25)
```

Returns the 25th percentile of the specified set of numbers. In this example, the function returns `27.5`.

```
PERCENTILEINC(10,20,30,40,50,60,70,80,0.5)
```

Returns the 50th percentile (median) of the specified set of numbers. In this example, the function returns `45`.

```
PERCENTILEINC(10,20,30,40,50,60,70,80,0.75)
```

Returns the 75th percentile of the specified set of numbers. In this example, the function returns `62.5`.

You can use the *PERCENTILEINC* function to determine the relative standing of values within a dataset by calculating percentiles for metrics such as sales, revenue, or performance scores.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentileinc.png" alt-text="Screenshot of a Planning sheet with PERCENTILEINC function." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentileinc.png":::

### Excel equivalent

[PERCENTILE.INC](https://support.microsoft.com/en-us/office/percentile-inc-function-680f9539-45eb-410b-9a5e-c1355e5fe2ed)

## PERCENTILEEXC

The *PERCENTILEEXC* function returns the *k*-th percentile of a set of numbers using the exclusive method. The function accepts *k* values greater than `0` and less than `1`, excluding the minimum and maximum values from the calculation.

### Syntax

```
PERCENTILEEXC(array, k)
```

### Arguments

* `array`: The list or range of numeric values used to determine the percentile.
* `k`: Specifies the percentile to return as a decimal value greater than `0` and less than `1`.
  * `0.25`: Returns the 25th percentile.
  * `0.5`: Returns the median (50th percentile).
  * `0.75`: Returns the 75th percentile.

> [!NOTE]
> The exclusive method supports only *k* values greater than `0` and less than `1`. If a value less than or equal to `0`, or greater than or equal to `1`, is specified, the *PERCENTILEEXC* function returns a **`#ERR`** error.

### Return value

Returns the value corresponding to the specified percentile from the given set of numbers.

### Examples

```
PERCENTILEEXC(10,20,30,40,50,60,70,80,0.25)
```

Returns the 25th percentile of the specified set of numbers. In this example, the function returns `22.5`.

```
PERCENTILEEXC(10,20,30,40,50,60,70,80,0.5)
```

Returns the 50th percentile (median) of the specified set of numbers. In this example, the function returns `45`.

```
PERCENTILEEXC(10,20,30,40,50,60,70,80,0.75)
```

Returns the 75th percentile of the specified set of numbers. In this example, the function returns `67.5`.

You can use the *PERCENTILEEXC* function to determine the relative standing of values within a dataset by calculating exclusive percentiles for metrics such as sales, revenue, or performance scores.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentileexc.png" alt-text="Screenshot of a Planning sheet with PERCENTILEEXC function." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentileexc.png":::

### Excel equivalent

[PERCENTILE.EXC](https://support.microsoft.com/en-us/office/percentile-exc-function-bbaa7204-e9e1-4010-85bf-c31dc5dce4ba)

## PERCENTRANKINC

The *PERCENTRANKINC* function returns the percentage rank of a value within a set of numbers using the inclusive method. It indicates the relative position of a value compared to other values and includes both the minimum and maximum values in the calculation.

### Syntax

```
PERCENTRANKINC(array, x, [significance])
```

### Arguments

* `array`: The list or range of numeric values used to determine the percentage rank.
* `x`: The value used to determine the percentage rank.
* `significance` (optional): Specifies the number of significant digits in the returned value.

### Return value

Returns the percentage rank of the specified value as a decimal between `0` and `1`, inclusive.

> [!IMPORTANT]
> If the specified value is less than the minimum value in the dataset, the *PERCENTRANKINC* function returns `0`. If the specified value is greater than the maximum value in the dataset, the function returns a **`#ERR`** error.

### Examples

```
PERCENTRANKINC(10,20,30,40,50,10)
```

Returns the percentage rank of the specified value. In this example, the function returns `0`.

```
PERCENTRANKINC(10,20,30,40,50,30)
```

Returns the percentage rank of the specified value. In this example, the function returns `0.5`.

```
PERCENTRANKINC(10,20,30,40,50,50)
```

Returns the percentage rank of the specified value. In this example, the function returns `1`.

You can use the *PERCENTRANKINC* function to determine the relative standing of a value within a dataset for metrics such as sales, revenue, or performance scores.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentrankinc.png" alt-text="Screenshot of a Planning Sheet with PERCENTRANKINC function." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentrankinc.png":::

### Excel equivalent

[PERCENTRANK.INC](https://support.microsoft.com/en-us/office/percentrank-inc-function-149592c9-00c0-49ba-86c1-c1f45b80463a)

## PERCENTRANKEXC

The *PERCENTRANKEXC* function returns the percentage rank of a value within a set of numbers using the exclusive method. It indicates the relative position of a value compared to other values and excludes the minimum and maximum values from the calculation.

### Syntax

```
PERCENTRANKEXC(array, x, [significance])
```

### Arguments

* `array`: The list or range of numeric values used to determine the percentage rank.
* `x`: The value used to determine the percentage rank.
* `significance` (optional): Specifies the number of significant digits in the returned value.

### Return value

Returns the percentage rank of the specified value as a decimal greater than `0` and less than `1`.

> [!IMPORTANT]
> If the specified value is less than the minimum value in the dataset, the *PERCENTRANKEXC* function returns `0`. If the specified value is greater than the maximum value in the dataset, the function returns a **`#ERR`** error.

### Examples

```
PERCENTRANKEXC(10,20,30,40,50,30)
```

Returns the percentage rank of the specified value. In this example, the function returns `0.5`.

```
PERCENTRANKEXC(10,20,30,40,50,20)
```

Returns the percentage rank of the specified value. In this example, the function returns `0.25`.

```
PERCENTRANKEXC(10,20,30,40,50,40)
```

Returns the percentage rank of the specified value. In this example, the function returns `0.75`.

You can use the *PERCENTRANKEXC* function to determine the relative standing of a value within a dataset when excluding the minimum and maximum values.

:::image type="content" source="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentrankexc.png" alt-text="Screenshot of a Planning sheet with PERCENTRANKEXC function." lightbox="../../media/planning-reference-formulas/statistical-functions/calculate-percentiles-percent-ranks/percentrankexc.png":::

### Excel equivalent

[PERCENTRANK.EXC](https://support.microsoft.com/en-us/office/percentrank-exc-function-d8afee96-b7e2-4a2f-8c01-8fcdedaa6314)
