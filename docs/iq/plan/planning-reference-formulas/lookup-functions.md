---
title: Lookup Functions
description: Learn about lookup functions in Plan and how to use them to lookup and retrieve specific values from measures.
ms.date: 08/26/2026
ms.topic: reference
#customer intent: As a user, I want to understand lookup functions and how to use them in formulas to lookup and fetch values from measures.
---

# XLOOKUP

*XLOOKUP* is used for condition-based measure lookups. *XLOOKUP* finds rows that match one or more dimension conditions and returns the requested measure value.

## How XLOOKUP works

XLOOKUP is a filtered lookup. You define the rows to keep, identify the measure to return, specify a fallback, and choose whether to return one match or every match.

- **Conditions** identify matching rows.
- **The return expression** identifies the measure or value to retrieve.
- **The fallback** is used when no row matches.
- **The output mode** controls whether one match or all matches are returned.

### XLOOKUP is similar to `WHERE` clause in SQL

XLOOKUP works much like a SQL `WHERE` clause, but with dynamic referencing built in. It lets you describe exactly which rows should qualify while allowing selected conditions to follow the current grid context automatically.

```
Return value WHERE

    (Dimension1 == THIS) *
    (Dimension2 == "Hardcoded Value") *
    (Dimension3 == MeasureReference)
```

In this pattern, Dimension1 uses the current evaluation-context value through `THIS`, Dimension2 uses a fixed business value, and Dimension3 is compared with a value supplied by a measure reference.

After evaluating the conditions, XLOOKUP can return either all matching values as an array or the first matching value. When an array is returned, functions such as `SUM` can combine the results into one value.

**Business usecase:** This provides a flexible way to perform lookups inside a grid. A single formula can respond dynamically to the row, column, or hierarchy context while still applying fixed and measure-driven filters.

## Syntax

```
XLOOKUP(
    (condition1) * (condition2) * (condition3),
    Measure,
    0,
    1
)
```

## Arguments

| Argument | Example | Description |
| --- | --- | --- |
| **Conditions** | `(Region == "USA") * (Category == THIS)` | Filters the source rows. Multiplication (`*`) acts as a logical AND: every condition must be true. |
| **Return value** | `Revenue` | The measure or value returned from each matching row. |
| **Fallback** | `0` | The value returned when no matching row is found. |
| **Output mode** | `1` or `0` | `1` returns the first match. `0` returns all matching values as an array. |

### Understanding THIS

**THIS** means: use the current evaluation-context value of this dimension automatically.

For example, if the calculation is evaluated on the *Category* row named *Accessories*, `Category == THIS` behaves as `Category == "Accessories"`. When evaluated on another Category row, the comparison changes automatically.

`THIS` makes the calculation hierarchy-aware and reusable. You do not need to hard-code each displayed dimension member.

## Examples

```
XLOOKUP(
    (Region == "USA") *
    (Category == THIS) *
    (SubProduct == THIS),
    Revenue,
    0,
    1
)
```

**Interpretation:** Find the row where *Region* is USA and where *Category* and *SubProduct* match the values in the current evaluation context. Then, return the *Revenue* value. If there is no match, return 0. If several rows match, return the first matching value.

### Returning and aggregating multiple matches

Set the fourth argument to `0` when the conditions can match more than one row. XLOOKUP then returns an array of values. Wrap the lookup in an aggregation function to produce a single result.

| Required result | Pattern |
| --- | --- |
| **Total** | `SUM(XLOOKUP(..., Measure, 0, 0))` |
| **Largest value** | `MAX(XLOOKUP(..., Measure, 0, 0))` |
| **Average** | `AVERAGE(XLOOKUP(..., Measure, 0, 0))` |

### Referencing a subtotal

To calculate a subtotal, stop the conditions at the desired hierarchy level. Do not add conditions for lower-level children. Set the fourth argument to `0` so all matching child values are returned, and wrap the lookup in `SUM`.

```
SUM(
    XLOOKUP(
        (Region == "USA") *
        (Category == THIS),
        Revenue,
        0,
        0
    )
)
```

This returns all *Revenue* values for the current *Category* in the USA and then adds them together. *SubProduct* is intentionally omitted so all children below *Category* can contribute to the subtotal.

### Dynamic hierarchy calculation

Use `THIS` on the hierarchy dimension so the formula automatically follows the current row or grouping context.

```
SUM(XLOOKUP(
    (ProductCategory == THIS) *
    (FinancialLineItem == "Net Revenue"),
    RevenueAmount,
    0,
    0
))
```

**Interpretation:** For the current *Product Category*, find every row classified as *Net Revenue*, return the *Revenue Amount* measure, and sum the matching values.

## Common patterns

- **One exact match:** Use complete conditions and output mode `1`.
- **Subtotal or roll-up:** Stop at the parent level, use output mode `0`, and wrap with `SUM`.
- **Dynamic report row:** Use `THIS` for dimensions that should follow the current context.
- **Multiple matches, one result:** Use output mode `0` and aggregate with `SUM`, `MAX`, or `AVERAGE`.

## Important checks

- Use output mode `1` only when the first match is the intended business result. If uniqueness matters, ensure the conditions identify a unique row.
- Use output mode `0` when multiple rows are valid matches; aggregate the returned array when a scalar result is required.
- Remove lower-level conditions when calculating a parent subtotal; otherwise the lookup remains filtered to a specific child.
- Use `THIS` only where the displayed evaluation context should control the dimension value.
- Keep the fallback value appropriate for the measure. A fallback of `0` is useful for numeric measures but may not be suitable for text values.

> [!TIP]
> **Use the rule:** Complete conditions + mode `1` = a single lookup. Parent-level conditions + mode `0` + `SUM` = a subtotal.

## Business use cases

| Business use case | Definition | Example pseudo-code | Output |
| --- | --- | --- | --- |
| **Sales analysis** | Retrieves revenue for the current product in a specific market. | `XLOOKUP((Region == "USA") * (Product == THIS), Revenue, 0, 1)` | Revenue for the current product in the USA. |
| **Financial reporting** | Retrieves a specific financial measure for the current product category. | `XLOOKUP((ProductCategory == THIS) * (FinancialLineItem == "Net Revenue"), RevenueAmount, 0, 1)` | Net revenue for the current product category. |
| **Budget and forecast reporting** | Retrieves planning values for the current department and account in a selected scenario. | `XLOOKUP((Department == THIS) * (Account == THIS) * (Scenario == "Forecast"), Budget, 0, 1)` | Forecast budget for the current department and account. |
| **Regional reporting** | Aggregates revenue across all matching records for the current region. | `SUM(XLOOKUP((Region == THIS), Revenue, 0, 0))` | Total revenue for the current region. |
| **Customer analysis** | Retrieves revenue for a specific customer and product combination. | `XLOOKUP((Customer == THIS) * (Product == THIS), Revenue, 0, 1)` | Revenue for the current customer and product. |
| **Cost analysis** | Aggregates expenses for the current department and expense category. | `SUM(XLOOKUP((Department == THIS) * (ExpenseType == THIS), Expense, 0, 0))` | Total expenses for the current department and expense category. |
| **Hierarchy-based reporting** | Calculates a subtotal by retrieving all child values under the current parent member. | `SUM(XLOOKUP((Region == "USA") * (ProductCategory == THIS), Revenue, 0, 0))` | Total revenue for the current product category in the USA. |
| **Management reporting** | Creates a reusable calculation that follows the current row or hierarchy context. | `XLOOKUP((ProductCategory == THIS) * (FinancialLineItem == "Net Revenue"), RevenueAmount, 0, 1)` | Net revenue for each product category displayed in the report. |
| **Multi-record analysis** | Retrieves multiple matching values and aggregates them into a single result. | `SUM(XLOOKUP((Region == "USA") * (ProductCategory == THIS), Revenue, 0, 0))` | Combined revenue from all matching records. |
