---
title: Analytical and aggregate functions in Fabric
description: Learn how to summarize data, calculate percentiles, rank rows, and use window functions in Fabric Data Warehouse and the SQL analytics endpoint.
ms.reviewer: jovanpop
ms.date: 11/17/2026
ms.topic: concept-article
ai-usage: ai-generated
---
# Analytical and aggregate functions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Use analytical and aggregate T-SQL functions to summarize data, compare individual rows with
group statistics, calculate percentiles, rank results, and combine values into strings or JSON.
You can run these calculations directly in a warehouse or SQL analytics endpoint.

Many functions have two forms: an aggregate form that summarizes rows and a window form that
preserves detail rows. Other functions support only one form. This article groups functions by
purpose and explains how to choose the form and window options for your calculation.

The examples use `VALUES` to define small input tables directly in the query, so you don't
need to create tables first. In `AS s(Region, Amount)`, `s` names the input table, and
`Region` and `Amount` name its columns. `NULL` represents a missing or unknown value.

## Aggregate functions

Use aggregate functions to calculate summary characteristics of a data set, such as its total,
minimum, and maximum values. Each function returns one value for each group when you use
`GROUP BY`, or one value for the entire input when you omit it. For example, this query
returns the total, smallest amount, and largest amount for each region:

```sql
SELECT Region, SUM(Amount) AS RegionTotal,
       MIN(Amount) AS MinAmount,
       MAX(Amount) AS MaxAmount
FROM (VALUES ('North', 10), ('North', 20),
             ('South', 30), ('South', 40)) AS s(Region, Amount)
GROUP BY Region
ORDER BY Region;
```

The result has one row per region:

| Region | RegionTotal | MinAmount | MaxAmount |
|---|---|---|---|
| North | 30 | 10 | 20 |
| South | 70 | 30 | 40 |

`GROUP BY` combines the sales into one summary row per region. `SUM`, `MIN`, and `MAX`
describe that region's sales, not the entire input.

Use aggregate functions in the `SELECT` list to return summaries and in `HAVING`
to filter those summaries. Grouped aggregation doesn't use an `OVER` clause.

### Filter aggregate results with HAVING

Use [`HAVING`](/sql/t-sql/queries/select-having-transact-sql?view=fabric&preserve-view=true)
to filter groups based on an aggregate calculation. `WHERE` filters individual input rows
before aggregation, so it can't filter on that query's aggregate result.

This query keeps only regions whose total is greater than `50`:

```sql
SELECT Region, SUM(Amount) AS RegionTotal
FROM (VALUES ('North', 10), ('North', 20),
             ('South', 30), ('South', 40)) AS s(Region, Amount)
GROUP BY Region
HAVING SUM(Amount) > 50
ORDER BY Region;
```

Only South qualifies:

| Region | RegionTotal |
|---|---|
| South | 70 |

`HAVING` tests the totals after grouping: South's `70` passes the filter, while North's
`30` doesn't.

## Window functions

Use window functions to calculate results for individual rows without collapsing them into
groups. The `OVER` clause defines partitioning, ordering, and, where supported, a frame.

### What is a window?

A window relates a set of rows to the current row through an
[`OVER` clause](/sql/t-sql/queries/select-over-clause-transact-sql?view=fabric&preserve-view=true).
Unlike grouped aggregation, a window function doesn't collapse those rows into a summary row.
It adds a calculation to each row of its input result.

For example, `SUM(Amount) OVER ()` adds the total for the entire input to every sale.
`SUM(Amount) OVER (PARTITION BY Region)` adds the total for that sale's region instead.

The *partition* determines which rows are calculated together. For functions that support
it, a *window frame* narrows that partition to the rows used for the current row's calculation,
such as the current row and two preceding rows.

### PARTITION BY

Use `PARTITION BY` inside `OVER` to calculate results independently for each set of matching
partition values. Unlike `GROUP BY`, it preserves individual input rows. If you omit
`PARTITION BY`, all input rows belong to one partition.

This query keeps all four sales and adds the overall total and the total for each sale's region:

```sql
SELECT SaleId, Region, Amount,
       SUM(Amount) OVER () AS OverallTotal,
       SUM(Amount) OVER (PARTITION BY Region) AS RegionTotal
FROM (VALUES (1, 'North', 10), (2, 'North', 20),
             (3, 'South', 30), (4, 'South', 40)) AS s(SaleId, Region, Amount)
ORDER BY SaleId;
```

The result keeps one row per sale:

| SaleId | Region | Amount | OverallTotal | RegionTotal |
|---|---|---|---|---|
| 1 | North | 10 | 100 | 30 |
| 2 | North | 20 | 100 | 30 |
| 3 | South | 30 | 100 | 70 |
| 4 | South | 40 | 100 | 70 |

`SUM(Amount) OVER ()` uses all four sales, so `OverallTotal` is `100` on every row.
`SUM(Amount) OVER (PARTITION BY Region)` uses only rows with the same region, so `RegionTotal`
is `30` for North and `70` for South.

### ORDER BY

The `ORDER BY` clause inside `OVER` defines the logical order for the calculation. For example, it
determines which row precedes the current row for `LAG`, how `ROW_NUMBER` numbers rows, and
how an ordered frame progresses.

For functions that accept frames, adding window `ORDER BY` also changes the default frame.
For example, `SUM` becomes a running calculation unless you specify a different frame.
See [RANGE](#range).

This ordering doesn't guarantee the order of the final result. Add an outer `ORDER BY` when
you need sorted output. It's also separate from `WITHIN GROUP (ORDER BY ...)` and ordering
inside an aggregate such as `JSON_ARRAYAGG`.

Window ordering is required for ranking functions and for `FIRST_VALUE`, `LAST_VALUE`,
`LAG`, and `LEAD`. It's optional for many aggregates, including `ANY_VALUE`, and isn't
supported for the median and percentile window functions described here.

When the order must identify a specific row, add a unique tie-breaker, such as
`ORDER BY DayNumber, SaleId`. Keep ties when they are meaningful to the calculation, such
as equal amounts receiving the same `RANK`.

### ROWS

Use `ROWS` to define a frame by row positions in the window order. For example:

- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` includes every preceding row and the current row, which is useful for running totals.
- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` includes up to three rows, which is useful for moving averages.
- `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` includes the entire partition.

These are row counts, not time intervals. Two preceding rows aren't necessarily two
preceding days. Use a unique ordering when you need reproducible row-position boundaries.
Only functions that support frames accept `ROWS`.

### RANGE

Use `RANGE` for a frame whose boundaries account for ordering values. Rows with equal
window ordering values are *peers*. In a frame that ends at `CURRENT ROW`, `RANGE` includes
all peers of the current row, whereas `ROWS` ends at the current row position.

This example uses the first three sales: two on day 1 and one on day 2. `ROWS` adds one
sale at a time, using `SaleId` to break ties. `RANGE` orders only by `DayNumber`, so it
includes both day-1 sales together.

```sql
SELECT SaleId, DayNumber, Amount,
       SUM(Amount) OVER (ORDER BY DayNumber, SaleId
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningByRow,
       SUM(Amount) OVER (ORDER BY DayNumber
           RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningThroughDay
FROM (VALUES (1, 1, 10), (2, 1, 20), (3, 2, 30)) AS s(SaleId, DayNumber, Amount)
ORDER BY DayNumber, SaleId;
```

| SaleId | DayNumber | Amount | RunningByRow | RunningThroughDay |
|---|---|---|---|---|
| 1 | 1 | 10 | 10 | 30 |
| 2 | 1 | 20 | 30 | 30 |
| 3 | 2 | 30 | 60 | 60 |

Both day-1 sales show `RunningThroughDay = 30`. `RunningByRow` adds one sale at a time.

`RANGE` supports `CURRENT ROW` and unbounded boundaries, but not numeric offsets such as
`RANGE 5 PRECEDING`. Both `ROWS` and `RANGE` require window ordering.

For functions that accept frames, specifying window `ORDER BY` without an explicit frame
defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. This default matters for
`LAST_VALUE`: to get the last value in the entire partition, explicitly end the frame
with `UNBOUNDED FOLLOWING`, rather than relying on the default. If you omit window
`ORDER BY` where it's optional, the calculation covers the whole partition.

### Frame boundaries for ROWS and RANGE

Use `BETWEEN` to choose a start boundary and an end boundary from the following table.
Here, `n` is a nonnegative integer literal, such as `2`.

| Boundary | Meaning | ROWS | RANGE | Allowed position |
|---|---|---|---|---|
| `UNBOUNDED PRECEDING` | The first row of the partition. | Yes | Yes | Start only. |
| `n PRECEDING` | The row `n` positions before the current row. | Yes | No | Start or end. |
| `CURRENT ROW` | The current row for `ROWS`; the first peer for a `RANGE` start or the last peer for a `RANGE` end. | Yes | Yes | Start or end. |
| `n FOLLOWING` | The row `n` positions after the current row. | Yes | No | Start or end. |
| `UNBOUNDED FOLLOWING` | The last row of the partition. | Yes | Yes | End only. |

Boundaries follow the window `ORDER BY`, even when it sorts descending. Both endpoints
are inclusive, and the end can't precede the start. Frames don't extend beyond their
partition, so fewer rows can be available near its ends.

For example:

- `ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING` includes the current row and up to two
  following rows.
- `ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING` includes up to five rows: the current row,
  two before it, and two after it.
- `RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING` includes the current row's entire
  peer group and all following rows in the partition.

`ROWS 2 PRECEDING` is shorthand for `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.
To include following rows, use the full `BETWEEN ... AND ...` form. Both frame types
require window ordering and a function that supports frames.

### Reuse a window with WINDOW

Use the [`WINDOW` clause](/sql/t-sql/queries/select-window-transact-sql?view=fabric&preserve-view=true)
to name a window definition once and reuse it in multiple `OVER` clauses within the same
query. This approach avoids repeating the same partitioning, ordering, or frame definition.

This query defines `RegionWindow` once and uses it for both `SUM` and `MAX`:

```sql
SELECT Region, Amount,
       SUM(Amount) OVER RegionWindow AS RegionTotal,
       MAX(Amount) OVER RegionWindow AS RegionMax
FROM (VALUES ('North', 10), ('North', 20),
             ('South', 30), ('South', 40)) AS s(Region, Amount)
WINDOW RegionWindow AS (PARTITION BY Region)
ORDER BY Region, Amount;
```

| Region | Amount | RegionTotal | RegionMax |
|---|---|---|---|
| North | 10 | 30 | 20 |
| North | 20 | 30 | 20 |
| South | 30 | 70 | 40 |
| South | 40 | 70 | 40 |

Both functions reuse the region partition, so the total and maximum values repeat on every sale
in that region. Each function still follows its own restrictions on window ordering and frames.

### Filter window results with QUALIFY

Use [`QUALIFY`](/sql/t-sql/queries/select-qualify-clause-transact-sql?view=fabric&preserve-view=true)
to filter on window function results after those functions are evaluated. Window functions
can't appear in `WHERE` or `HAVING` at the same query level. Use `HAVING` for aggregate
results and `QUALIFY` for window results.

For example, `QUALIFY` lets you return the highest-value sale in each region without
wrapping the window calculation in another query:

```sql
SELECT SaleId, Region, Amount
FROM (VALUES (1, 'North', 10), (2, 'North', 20),
             (3, 'South', 30), (4, 'South', 40)) AS s(SaleId, Region, Amount)
QUALIFY ROW_NUMBER() OVER (PARTITION BY Region ORDER BY Amount DESC, SaleId) = 1
ORDER BY SaleId;
```

The result keeps the largest sale in each region:

| SaleId | Region | Amount |
|---|---|---|
| 2 | North | 20 |
| 4 | South | 40 |

`ROW_NUMBER` assigns `1` to the largest sale in each region. `QUALIFY` keeps those sales,
rather than combining them into regional totals.

## Function groups

Choose a function by the calculation you need, then select its aggregate or window form
where supported. The groups below describe purpose rather than execution mode. For a
comparison of forms and window options, see [Compare aggregate and window support](#compare-aggregate-and-window-support).

### Basic aggregates

Use these functions for common summaries, such as sales totals, row counts, minimum and
maximum values, and averages. Each function supports aggregate and window forms, but the
available modifiers can differ. For example, `COUNT(DISTINCT expression)` is aggregate-only.

| Function | Purpose |
|---|---|
| [COUNT](/sql/t-sql/functions/count-transact-sql?view=fabric&preserve-view=true) | Counts rows or non-NULL expression values and returns `int`. |
| [COUNT_BIG](/sql/t-sql/functions/count-big-transact-sql?view=fabric&preserve-view=true) | Counts rows or non-NULL expression values and returns `bigint`. |
| [SUM](/sql/t-sql/functions/sum-transact-sql?view=fabric&preserve-view=true) | Adds numeric values. |
| [MIN](/sql/t-sql/functions/min-transact-sql?view=fabric&preserve-view=true) | Returns the smallest value. |
| [MAX](/sql/t-sql/functions/max-transact-sql?view=fabric&preserve-view=true) | Returns the largest value. |
| [AVG](/sql/t-sql/functions/avg-transact-sql?view=fabric&preserve-view=true) | Calculates the arithmetic mean. |
| [PRODUCT](/sql/t-sql/functions/product-aggregate-transact-sql?view=fabric&preserve-view=true) | Multiplies numeric values together. |

Choose the return type deliberately. For example, `AVG` over an `int` expression returns
`int`. Cast the input, such as `AVG(CAST(Amount AS decimal(18, 2)))`, when you need a
fractional average. Use `COUNT_BIG` when a count might exceed the `int` range.

### Statistics and percentiles

Use these functions to describe a distribution, find a typical value, or measure
variability. All support aggregate and window forms, but their window options differ.

A percentile describes a position in sorted data. The 50th percentile is the median,
and the 95th percentile (P95) is near the high end. Variance and standard deviation
measure how spread out the values are.

Use `VAR` and `STDEV` when the input is a sample of a larger population; use `VARP` and
`STDEVP` when it represents the whole population.

| Function | Purpose |
|---|---|
| [MEDIAN](/sql/t-sql/functions/median-transact-sql?view=fabric&preserve-view=true) | Calculates the exact continuous 50th percentile. |
| [QUANTILE](/sql/t-sql/functions/quantile-transact-sql?view=fabric&preserve-view=true) | Calculates an exact continuous quantile, such as the 95th percentile. |
| [PERCENTILE_CONT](/sql/t-sql/functions/percentile-cont-transact-sql?view=fabric&preserve-view=true) | Calculates a continuous percentile using `WITHIN GROUP` ordering. |
| [PERCENTILE_DISC](/sql/t-sql/functions/percentile-disc-transact-sql?view=fabric&preserve-view=true) | Calculates a discrete percentile that is a value from the input. |
| [VAR](/sql/t-sql/functions/var-transact-sql?view=fabric&preserve-view=true) | Calculates sample variance. |
| [VARP](/sql/t-sql/functions/varp-transact-sql?view=fabric&preserve-view=true) | Calculates population variance. |
| [STDEV](/sql/t-sql/functions/stdev-transact-sql?view=fabric&preserve-view=true) | Calculates sample standard deviation. |
| [STDEVP](/sql/t-sql/functions/stdevp-transact-sql?view=fabric&preserve-view=true) | Calculates population standard deviation. |

#### Exact median and quantiles

A continuous percentile interpolates between adjacent values when necessary, so the result
might not occur in the input. For example, the median of `10` and `20` is `15`. A discrete
percentile selects an input value instead.

`MEDIAN` and `QUANTILE` have the following forms. Square brackets mark optional syntax,
and `...n` indicates a list that can repeat:

```syntaxsql
MEDIAN ( numeric_expression )
MEDIAN ( numeric_expression ) OVER ( [ PARTITION BY partition_expression [ , ...n ] ] )

QUANTILE ( numeric_literal, numeric_expression )
QUANTILE ( numeric_literal, numeric_expression )
    OVER ( [ PARTITION BY partition_expression [ , ...n ] ] )
```

The quantile argument is a numeric literal from `0` through `1`, inclusive. Specify `0.5`
for the median or `0.95` for the 95th percentile. Both functions return `float(53)`, ignore
NULL values, and return NULL when no non-NULL input values qualify. They don't support
`DISTINCT` or window ordering and frames.

In Fabric, `PERCENTILE_CONT` and `PERCENTILE_DISC` also support both forms: use
`WITHIN GROUP (ORDER BY expression)` with or without `OVER`. This ordering determines the
percentile distribution; it isn't an `ORDER BY` inside `OVER`. Their window forms accept
optional partitioning, but not window ordering or frames.

For example, the aggregate and window forms of `PERCENTILE_CONT` are:

```syntaxsql
PERCENTILE_CONT ( numeric_literal )
    WITHIN GROUP ( ORDER BY order_expression [ ASC | DESC ] )

PERCENTILE_CONT ( numeric_literal )
    WITHIN GROUP ( ORDER BY order_expression [ ASC | DESC ] )
    OVER ( [ PARTITION BY partition_expression [ , ...n ] ] )
```

`PERCENTILE_DISC` uses the same forms for discrete percentiles.

This example calculates exact median and percentile amounts for each region:

```sql
SELECT Region, MEDIAN(Amount) AS MedianAmount,
       QUANTILE(0.95, Amount) AS P95Amount,
       PERCENTILE_DISC(0.95) WITHIN GROUP (ORDER BY Amount) AS DiscreteP95Amount
FROM (VALUES ('North', 10), ('North', 20), ('North', 30),
             ('South', 5), ('South', 15), ('South', 25)) AS s(Region, Amount)
GROUP BY Region
ORDER BY Region;
```

| Region | MedianAmount | P95Amount | DiscreteP95Amount |
|---|---|---|---|
| North | 20 | 29 | 30 |
| South | 15 | 24 | 25 |

The continuous percentile interpolates between amounts, giving `29` for North.
The discrete percentile selects an input amount, giving `30`.

### Approximate aggregates

Approximate aggregates use estimation algorithms to trade some precision for potentially
lower memory use or calculation time on large inputs. Use them for exploratory analysis
or dashboards when an estimate is sufficient. Choose exact functions when the calculation
requires an exact result, and measure performance with your own data rather than assuming
every approximate query is faster.

| Function | Purpose | Forms |
|---|---|---|
| [APPROX_COUNT_DISTINCT](/sql/t-sql/functions/approx-count-distinct-transact-sql?view=fabric&preserve-view=true) | Estimates the number of distinct non-NULL values. | Aggregate only. |
| [APPROX_MEDIAN](/sql/t-sql/functions/approx-median-transact-sql?view=fabric&preserve-view=true) | Estimates the continuous 50th percentile. | Aggregate and window. |
| [APPROX_QUANTILE](/sql/t-sql/functions/approx-quantile-transact-sql?view=fabric&preserve-view=true) | Estimates a continuous quantile. | Aggregate and window. |
| [APPROX_PERCENTILE_CONT](/sql/t-sql/functions/approx-percentile-cont-transact-sql?view=fabric&preserve-view=true) | Estimates a continuous percentile using `WITHIN GROUP` ordering. | Aggregate only. |
| [APPROX_PERCENTILE_DISC](/sql/t-sql/functions/approx-percentile-disc-transact-sql?view=fabric&preserve-view=true) | Estimates a discrete percentile from the input values. | Aggregate only. |

`APPROX_COUNT_DISTINCT` uses HyperLogLog, with a documented error rate of up to 2% within
97% probability. `APPROX_PERCENTILE_CONT` and `APPROX_PERCENTILE_DISC` use KLL sketches,
with a documented rank error of up to 1.33% within 99% confidence. Rank error measures a
position in the sorted distribution, not the percentage difference in the returned value.

These algorithm descriptions and numerical guarantees are function-specific. The
`APPROX_MEDIAN` and `APPROX_QUANTILE` references don't specify the same numerical
guarantees. Their results can differ from exact results and can vary across executions.

#### Approximate median and quantiles

Use these forms to estimate a median or quantile for a group or partition:

```syntaxsql
APPROX_MEDIAN ( numeric_expression )
APPROX_MEDIAN ( numeric_expression )
    OVER ( [ PARTITION BY partition_expression [ , ...n ] ] )

APPROX_QUANTILE ( numeric_literal, numeric_expression )
APPROX_QUANTILE ( numeric_literal, numeric_expression )
    OVER ( [ PARTITION BY partition_expression [ , ...n ] ] )
```

Like the exact counterparts, both functions return `float(53)` and ignore NULL values.
The quantile argument is a literal from `0` through `1`, inclusive. They return NULL when
there are no non-NULL input values and don't support `DISTINCT`, window ordering, or frames.

For example, this query compares exact and approximate results:

```sql
SELECT MEDIAN(value) AS ExactMedian,
       APPROX_MEDIAN(value) AS EstimatedMedian,
       QUANTILE(0.95, value) AS ExactP95,
       APPROX_QUANTILE(0.95, value) AS EstimatedP95
FROM GENERATE_SERIES(1, 1000, 1);
```

The exact results are fixed; the approximate columns can vary:

| ExactMedian | EstimatedMedian | ExactP95 | EstimatedP95 |
|---|---|---|---|
| 500.5 | Varies | 950.05 | Varies |

The approximate columns return numeric estimates. `Varies` indicates that their actual
values can change between executions.

### Ranking and distribution

Use these functions to assign row positions, preserve ranking ties, divide rows into
buckets, or describe a row's position within a distribution. Each function requires `OVER`
with `ORDER BY`. Partitioning is optional, and window frames aren't supported.

| Function | Purpose |
|---|---|
| [ROW_NUMBER](/sql/t-sql/functions/row-number-transact-sql?view=fabric&preserve-view=true) | Assigns a unique sequential number within a partition. |
| [RANK](/sql/t-sql/functions/rank-transact-sql?view=fabric&preserve-view=true) | Assigns equal ranks to ties and leaves gaps after ties. |
| [DENSE_RANK](/sql/t-sql/functions/dense-rank-transact-sql?view=fabric&preserve-view=true) | Assigns equal ranks to ties without gaps between ranks. |
| [NTILE](/sql/t-sql/functions/ntile-transact-sql?view=fabric&preserve-view=true) | Divides ordered rows into a specified number of buckets. |
| [PERCENT_RANK](/sql/t-sql/functions/percent-rank-transact-sql?view=fabric&preserve-view=true) | Calculates relative rank on a scale from zero through one. |
| [CUME_DIST](/sql/t-sql/functions/cume-dist-transact-sql?view=fabric&preserve-view=true) | Calculates the proportion of partition rows that precede or tie with the current row. |

For amounts `100`, `100`, and `80` ordered descending, `RANK` returns `1`, `1`, and `3`;
`DENSE_RANK` returns `1`, `1`, and `2`. `ROW_NUMBER` assigns different numbers to the
two tied rows, but without a tie-breaker, which tied row receives which number isn't
guaranteed.

### Value selection and navigation

Use these functions to choose a representative value, find a value at an ordered window
boundary, or compare the current row with a preceding or following row.

| Function | Purpose | Forms |
|---|---|---|
| [ANY_VALUE](/sql/t-sql/functions/any-value-transact-sql?view=fabric&preserve-view=true) | Selects an arbitrary non-NULL value when one is available. | Aggregate and window. |
| [FIRST_VALUE](/sql/t-sql/functions/first-value-transact-sql?view=fabric&preserve-view=true) | Returns the first value in the window frame, optionally skipping NULLs. | Window only. |
| [LAST_VALUE](/sql/t-sql/functions/last-value-transact-sql?view=fabric&preserve-view=true) | Returns the last value in the window frame, optionally skipping NULLs. | Window only. |
| [LAG](/sql/t-sql/functions/lag-transact-sql?view=fabric&preserve-view=true) | Returns a value at a preceding row offset, which defaults to one. | Window only. |
| [LEAD](/sql/t-sql/functions/lead-transact-sql?view=fabric&preserve-view=true) | Returns a value at a following row offset, which defaults to one. | Window only. |

Choose `ANY_VALUE` when any representative non-NULL value is acceptable. It doesn't promise
random sampling or a particular first or last value. Adding window ordering doesn't turn
it into `FIRST_VALUE` or `LAST_VALUE`.

`FIRST_VALUE`, `LAST_VALUE`, `LAG`, and `LEAD` require window ordering. By default, they respect NULL values (`RESPECT NULLS`). Add `IGNORE NULLS` between the function call and
`OVER` to skip NULL inputs when selecting a value.

`FIRST_VALUE` and `LAST_VALUE` support frames; `LAG` and `LEAD` use row offsets instead.

This query shows the preceding and final sale amounts. The explicit frame ensures that
`LAST_VALUE` reaches the end of the partition.

```sql
SELECT SaleId, Amount,
       LAG(Amount) OVER (ORDER BY SaleId) AS PreviousAmount,
       LAST_VALUE(Amount) OVER (ORDER BY SaleId
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LastAmount
FROM (VALUES (1, 10), (2, 20), (3, 30)) AS s(SaleId, Amount)
ORDER BY SaleId;
```

| SaleId | Amount | PreviousAmount | LastAmount |
|---|---|---|---|
| 1 | 10 | NULL | 30 |
| 2 | 20 | 10 | 30 |
| 3 | 30 | 20 | 30 |

The previous amounts are `NULL`, `10`, and `20`; the final amount is `30` on every row.
Without the explicit frame, `LastAmount` would be `10`, `20`, and `30` instead of `30`
on every row.

### String and JSON aggregation

Use `STRING_AGG` to build delimited text, `JSON_ARRAYAGG` to build a JSON array, or
`JSON_OBJECTAGG` to build a JSON object from key-value pairs. These functions support
aggregate forms only; they don't accept `OVER`.

| Function | Purpose | Ordering and NULL behavior |
|---|---|---|
| [STRING_AGG](/sql/t-sql/functions/string-agg-transact-sql?view=fabric&preserve-view=true) | Concatenates values with a separator. | Orders with `WITHIN GROUP`; skips NULL values and their separators. |
| [JSON_ARRAYAGG](/sql/t-sql/functions/json-arrayagg-transact-sql?view=fabric&preserve-view=true) | Combines values into a JSON array. | Accepts internal `ORDER BY`; defaults to `ABSENT ON NULL`, which omits NULL elements. |
| [JSON_OBJECTAGG](/sql/t-sql/functions/json-objectagg-transact-sql?view=fabric&preserve-view=true) | Combines key-value pairs into a JSON object. | Defaults to `NULL ON NULL`, which preserves a NULL value as a JSON null. |

`STRING_AGG` derives its return type from the input expression. Cast the expression to
`varchar(max)` when the concatenation could exceed the size limit of a non-`max` result:

```sql
SELECT STRING_AGG(CAST(ProductName AS varchar(max)), ', ')
           WITHIN GROUP (ORDER BY ProductName) AS ProductNames
FROM (VALUES ('Notebook'), ('Pen'), ('Pencil')) AS p(ProductName);
```

| ProductNames |
|---|
| Notebook, Pen, Pencil |

The names are alphabetized and joined with a comma and space.

JSON aggregation returns JSON text rather than a delimiter-separated list:

```sql
SELECT JSON_ARRAYAGG(ProductName ORDER BY ProductName) AS ProductNames,
       JSON_OBJECTAGG(ProductCode:ProductName) AS ProductsByCode
FROM (VALUES ('P1', 'Pen'), ('P2', 'Pencil')) AS p(ProductCode, ProductName);
```

| ProductNames | ProductsByCode |
|---|---|
| `["Pen","Pencil"]` | `{"P1":"Pen","P2":"Pencil"}` |

The `WITHIN GROUP (ORDER BY ...)` clause in the `STRING_AGG` example and the internal
`ORDER BY` in the `JSON_ARRAYAGG` example control aggregation order, not a window
calculation. JSON object property order isn't guaranteed. Don't rely on an outer
query's `ORDER BY` to control concatenation or array element order.

### Grouping helpers and checksums

Use grouping helpers to interpret subtotal rows, and aggregate checksums when a
non-unique summary of values is sufficient.

| Function | Purpose | Forms |
|---|---|---|
| [GROUPING](/sql/t-sql/functions/grouping-transact-sql?view=fabric&preserve-view=true) | Identifies whether a grouping expression represents an aggregated subtotal. | Grouped queries only. |
| [GROUPING_ID](/sql/t-sql/functions/grouping-id-transact-sql?view=fabric&preserve-view=true) | Encodes the grouping status of multiple expressions as an integer bitmask. | Grouped queries only. |
| [CHECKSUM_AGG](/sql/t-sql/functions/checksum-agg-transact-sql?view=fabric&preserve-view=true) | Calculates an aggregate checksum of integer expressions. | Aggregate and window. |

`GROUPING` and `GROUPING_ID` describe grouping levels rather than calculate a measure.
Use them with grouping sets, `ROLLUP`, or `CUBE` to distinguish a subtotal's NULL
placeholder from an actual NULL value in the data.

`ROLLUP(Region)` adds a grand-total row to the rows for individual regions.

```sql
SELECT Region, SUM(Amount) AS TotalAmount,
       GROUPING(Region) AS IsSubtotal,
       GROUPING_ID(Region) AS GroupingLevel
FROM (VALUES ('North', 10), ('South', 20), (NULL, 5)) AS s(Region, Amount)
GROUP BY ROLLUP(Region)
ORDER BY IsSubtotal, Region;
```

| Region | TotalAmount | IsSubtotal | GroupingLevel |
|---|---|---|---|
| NULL | 5 | 0 | 0 |
| North | 10 | 0 | 0 |
| South | 20 | 0 | 0 |
| NULL | 35 | 1 | 1 |

In this example, the actual NULL region has `IsSubtotal = 0`, while the grand total has
`IsSubtotal = 1`. With one grouping expression, `GROUPING_ID` returns the same value as
`GROUPING`; use multiple expressions to distinguish more grouping levels.

`CHECKSUM_AGG` can produce the same checksum for different inputs. Don't use it as proof
that two data sets are identical or as guaranteed change detection.

## Usage considerations

Keep NULL handling, data types, and query evaluation order in mind:

- `COUNT(*)` counts rows, including rows that contain NULLs. `COUNT(expression)` counts only non-NULL expression values. Most numeric aggregates ignore NULLs, but don't assume that every function has the same NULL behavior.
- An ungrouped `COUNT` or `COUNT_BIG` over an empty input returns zero. Many other aggregates return NULL. A grouped query with no qualifying groups returns no rows.
- Eliminating NULL values can produce the warning "Null value is eliminated by an aggregate or other SET operation." This warning doesn't mean the query failed.
- Choose numeric types that can hold the calculation. Sums and products can overflow, and integer averages can discard the fractional part.
- Use `WHERE` to filter rows before grouping and window evaluation, `HAVING` to filter grouped results, and `QUALIFY` to filter window results. Window functions operate on the input remaining after earlier query processing, not necessarily every row in the underlying table. The final `ORDER BY` sorts the remaining output.

## Compare aggregate and window support

Unlike the purpose groups, rows in this table combine functions with the same capabilities. The following table compares the forms and window components for all functions in this article. A supported aggregate form doesn't imply that every argument or modifier is available in the window form. For example, `COUNT(DISTINCT expression)` doesn't support `OVER`.


> [!NOTE]
> Functions that require `OVER` are `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`,
> `PERCENT_RANK`, `CUME_DIST`, `FIRST_VALUE`, `LAST_VALUE`, `LAG`, and `LEAD`.
> Functions without an `OVER` form are `APPROX_COUNT_DISTINCT`,
> `APPROX_PERCENTILE_CONT`, `APPROX_PERCENTILE_DISC`, `STRING_AGG`, `JSON_ARRAYAGG`,
> `JSON_OBJECTAGG`, `GROUPING`, and `GROUPING_ID`.

**Supported** and **Not supported** describe function forms. **Optional**, **Required**, and
**Not supported** describe components inside `OVER`. **N/A** means the function doesn't
have an `OVER` form. Optional partitioning also permits `OVER ()` when ordering isn't
required. Optional frames require an `ORDER BY` clause. **Grouped queries only** identifies
grouping metadata helpers rather than ordinary aggregate functions.

| Function | Aggregate form | Window form (OVER([PARTITION BY])) | ORDER BY in OVER | ROWS / RANGE |
|---|---|---|---|---|
| `COUNT`, `COUNT_BIG`, `SUM`, `MIN`, `MAX`, `AVG`, `PRODUCT` | Supported | Supported | Optional | Optional |
| `VAR`, `VARP`, `STDEV`, `STDEVP` | Supported | Supported | Optional | Optional |
| `ANY_VALUE`, `CHECKSUM_AGG` | Supported | Supported | Optional | Optional |
| `MEDIAN`, `QUANTILE`, `PERCENTILE_CONT`, `PERCENTILE_DISC`, `APPROX_MEDIAN`, `APPROX_QUANTILE` | Supported | Supported | Not supported | Not supported |
| `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`, `PERCENT_RANK`, `CUME_DIST`, `LAG`, `LEAD` | Not supported | Supported | Required | Not supported |
| `FIRST_VALUE`, `LAST_VALUE` | Not supported | Supported | Required | Optional |
| `APPROX_COUNT_DISTINCT`, `APPROX_PERCENTILE_CONT`, `APPROX_PERCENTILE_DISC`, `STRING_AGG`, `JSON_ARRAYAGG`, `JSON_OBJECTAGG` | Supported | Not supported | N/A | N/A |
| `GROUPING`, `GROUPING_ID` | Grouped queries only | Not supported | N/A | N/A |

## Related content

- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md).
- [Aggregate functions (Transact-SQL)](/sql/t-sql/functions/aggregate-functions-transact-sql?view=fabric&preserve-view=true).
- [Analytic functions (Transact-SQL)](/sql/t-sql/functions/analytic-functions-transact-sql?view=fabric&preserve-view=true).
- [SELECT - OVER clause (Transact-SQL)](/sql/t-sql/queries/select-over-clause-transact-sql?view=fabric&preserve-view=true).
- [SELECT - QUALIFY clause (Transact-SQL)](/sql/t-sql/queries/select-qualify-clause-transact-sql?view=fabric&preserve-view=true).
- [SELECT - HAVING clause (Transact-SQL)](/sql/t-sql/queries/select-having-transact-sql?view=fabric&preserve-view=true).
- [SELECT - WINDOW clause (Transact-SQL)](/sql/t-sql/queries/select-window-transact-sql?view=fabric&preserve-view=true).
