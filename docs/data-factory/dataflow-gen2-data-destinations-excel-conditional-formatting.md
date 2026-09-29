---
title: Add conditional formatting to Excel documents with navigation tables
description: Learn how to add value rules, formulas, color scales, data bars, and icon sets to Excel documents created by Dataflow Gen2.
author: jorgegom
ms.topic: concept-article
ms.date: 09/22/2026
ms.author: jorgegom
ms.custom: dataflows
---

# Add conditional formatting to Excel documents with navigation tables

This article explains how to add **conditional formatting** (data-driven highlighting such as value rules, color scales, data bars, and icon sets) to Excel documents built with navigation tables. It builds on two companion articles and doesn't repeat their content:

- [Create Excel documents with navigation tables](dataflow-gen2-data-destinations-excel-advanced.md) covers navigation tables, part types, and positioning.
- [Style Excel documents and add hyperlinks](dataflow-gen2-data-destinations-excel-styles.md) covers the `Target` grammar, the `Style` record, and color formats, all of which conditional formatting reuses.

## Overview

Conditional formatting is the same feature you reach in Excel through **Home > Conditional Formatting**: instead of formatting a cell directly, you give Excel a *rule*, and Excel applies the formatting only to the cells that match. Because the rule travels with the workbook, the highlighting refreshes by itself whenever the data changes.

You attach conditional formats to a `SheetData`, `Table`, `Range`, or `Text` part, or to a `Chart` part's backing table, through the `ConditionalFormatting` property. It is a **list of rules**, and each rule is a record with a `Target` (the cells to evaluate), a `Type` (what kind of rule), and a few type-specific fields:

```powerquery-m
ConditionalFormatting =
{
    [Target = [Column = "Revenue"], Type = "CellIs", Operator = "GreaterThan", Value = 2000, Style = [Fill = "#C6EFCE"]],
    [Target = [Column = "Margin"],  Type = "DataBar", Color = "#638EC6"]
}
```

`Target` uses the **same grammar** as the `Styles` property:

| Form | Example | Coordinate convention |
| --- | --- | --- |
| Cell or range text | `"B2:D10"` | Absolute A1 worksheet address |
| Source column | `[Column = "Revenue"]` | Case-sensitive source Power Query schema column name |
| Worksheet row | `[Row = 3]` | Absolute, 1-based row |
| Source column and row | `[Column = "Revenue", Row = 3]` | Named source column and absolute, 1-based row |
| Rectangle | `[Top = 1, Left = 0, Bottom = 9, Right = 2]` | Zero-based, inclusive coordinates; selects A2:C10 |

See [Choose a style target](dataflow-gen2-data-destinations-excel-styles.md#choose-a-style-target) for the complete target rules. `[Column = "A"]` means the source column named `A`, not worksheet column A; use `"A:A"` for the worksheet column.

M record field names and source schema column names are case-sensitive. Write fields such as `Target`, `Type`, `Style`, and `Thresholds` exactly as shown. Documented enumerated values such as `CellIs`, `GreaterThan`, and `percent` are accepted without regard to case, but use the documented casing.

Every rule belongs to one of two families, which decide whether you supply a `Style`:

| Family | Types | `Style` field |
| --- | --- | --- |
| **Style rules** | `CellIs`, `Expression`, `ContainsBlanks`, `NotContainsBlanks`, `ContainsErrors`, `NotContainsErrors`, `DuplicateValues`, `UniqueValues`, `Top10`, `AboveAverage`, `TimePeriod` | **Required.** Excel applies your `Style` to every cell where the condition is true. |
| **Visual rules** | `ColorScale`, `DataBar`, `IconSet` | **Forbidden.** The rule paints its own graphics (a gradient, bar, or icon), so there is nothing for you to style. |

The canonical rule shapes are:

```powerquery-m
// Style rule: Style is required; StopIfTrue is optional.
[Target = [Column = "Revenue"], Type = "CellIs", Operator = "GreaterThan", Value = 2000, Style = [Fill = "#C6EFCE"], StopIfTrue = false]

// Visual rule: don't include Style or StopIfTrue.
[Target = [Column = "Margin"], Type = "DataBar", Color = "#638EC6"]
```

> [!NOTE]
> The `Style` on a style rule is a **partial** style that Excel overlays on top of a cell's existing formatting (Excel calls this a *differential format*). Only the properties you set change; everything else about the cell stays as it was. Nested records are partial too: `[Font = [Bold = true]]` doesn't reset the font name, size, or color.

A conditional-format `Style` can set any of these components (all described in [Style components](dataflow-gen2-data-destinations-excel-styles.md#style-reference)):

- `Font` (name, size, bold, italic, strikethrough, underline, color, and the other font properties)
- `Fill` (background color or pattern)
- `Border` (edges and diagonals)
- `NumberFormat` (an Excel number-format code)
- `Alignment` (horizontal and vertical alignment, wrap, rotation, indent, reading order)
- `Protection` (locked / hidden, which take effect only when the sheet is protected)

`Width` and `RowHeight` are **not** part of conditional formatting: a rule changes how cells look but can't resize columns or rows. Including them in a rule's `Style` is an error (`30141`).

## Quick reference

### Common fields

| Field | Applies to | Notes |
| --- | --- | --- |
| `Target` | All rules | Required. Cells to evaluate. |
| `Type` | All rules | Required. One of the 14 types described earlier. |
| `Style` | Style rules | Required for style rules; forbidden on visual rules. |
| `StopIfTrue` | Style rules | Optional `logical` (default `false`). When `true`, later rules on the same cell are skipped if this one matches. Forbidden on visual rules. |

> [!NOTE]
> There's no user-settable priority field. Rules are prioritized by **declaration order**: the first rule in the list has the highest priority. Use `StopIfTrue` to stop evaluation once a rule matches.

### Thresholds

Color scales, data bars, and icon sets need to know *where* their colors, bar lengths, or icon breakpoints sit across the range of values. You describe each of those positions with a small record of `[Type, Value]`. These choices match the options that Excel offers in the **Minimum**, **Maximum**, and **Type** dropdowns of its color-scale, data-bar, and icon-set dialogs.

| `Type` | Meaning (Excel's wording) | Needs `Value`? |
| --- | --- | --- |
| `min` | The **Lowest Value** in the data. | No. |
| `max` | The **Highest Value** in the data. | No. |
| `num` | A specific **Number** you supply. | Yes: any number. |
| `percent` | A **Percent** of the way from the lowest to the highest value. | Yes: `0`–`100`. |
| `percentile` | A **Percentile** of the data. | Yes: `0`–`100`. |

> [!NOTE]
> Excel also offers a **Formula** option for these positions. This option isn't supported here; use `num`, `percent`, or `percentile` instead. A `num`, `percent`, or `percentile` entry without a `Value` is rejected (`30139`), and a `percent` or `percentile` outside `0`–`100` is rejected (`30140`).

The `Value` for `num`, `percent`, and `percentile` must be numeric. Don't include `Value` for `min` or `max`.

Only icon-set threshold records accept the optional `GreaterThanOrEqual` flag. Don't add it to `ColorScale` stops or `DataBar` `Min` and `Max` thresholds. See [IconSet](#iconset-an-icon-per-cell).

## Minimal example

```powerquery-m
let
    sales = #table(
        type table [Region = text, Revenue = number, Margin = number],
        {{"North", 1200, 0.18}, {"South", 2750, 0.32}, {"West", 3100, 0.41}}
    ),
    excelDocument = #table(
        type table [PartType = nullable text, Properties = nullable record, Data = any],
        {
            {
                "Table",
                [
                    ConditionalFormatting =
                    {
                        [Target = [Column = "Revenue"], Type = "CellIs", Operator = "GreaterThan", Value = 2000, Style = [Fill = "#C6EFCE"]],
                        [Target = [Column = "Margin"],  Type = "ColorScale", ColorScale = {[Type = "min", Color = "#F8696B"], [Type = "max", Color = "#63BE7B"]}]
                    }
                ],
                sales
            }
        }
    )
in
    excelDocument
```

## Style rules

Style rules ask a yes/no question about each cell and apply your `Style` wherever the answer is yes. They cover Excel's **Highlight Cells Rules** and **Top/Bottom Rules** menus, plus formula-based rules.

### CellIs: compare each cell to a value

This rule corresponds to Excel's **Highlight Cells Rules** family. Each cell in the target is compared against the value or values you provide, and the `Style` is applied wherever the comparison is true.

| Field | Notes |
| --- | --- |
| `Operator` | Required. The comparison to perform (see the list in the next section). |
| `Value` | Required. A single value, or a two-element list `{low, high}` for `Between` and `NotBetween`. Numbers, text, and dates are all allowed; a date is written as the matching Excel date serial. |

Operators: `LessThan`, `LessThanOrEqual`, `Equal`, `NotEqual`, `GreaterThanOrEqual`, `GreaterThan`, `Between`, `NotBetween`, `ContainsText`, `NotContains`, `BeginsWith`, `EndsWith`.

```powerquery-m
[Target = [Column = "Revenue"], Type = "CellIs", Operator = "Between", Value = {500, 3000}, Style = [Fill = "#FFEB9C"]],
[Target = [Column = "Region"],  Type = "CellIs", Operator = "BeginsWith", Value = "N", Style = [Font = [Bold = true, Color = "#9C0006"]]]
```

### Expression: your own formula

This rule corresponds to Excel's **Use a formula to determine which cells to format** rule. `Formula` is any Excel formula that returns true or false. Excel evaluates it for the **top-left cell** of the target, then fills it across and down the rest of the target, shifting unanchored references the same way copying a formula in Excel would. Lock a column or row with `$` to keep it fixed.

```powerquery-m
[Target = "C12:C20", Type = "Expression", Formula = "$C12>$D12", Style = [Font = [Bold = true]]],
[Target = "B23:B27", Type = "Expression", Formula = "WEEKDAY($B23,2)>5", Style = [Fill = "#FFC7CE"]]
```

Because the formula lives inside an M text value, any double-quotes in it must be doubled. To compare against the text `Active`, write `Formula = "$D2=""Active"""`.

> [!NOTE]
> For security, formulas are checked before they're written to the workbook: parentheses and double-quotes must be balanced, and control characters (other than tab) aren't allowed. Ordinary comparison operators such as `<`, `>`, and `=` are fine. A formula that breaks these rules is rejected with error `30115`, `30116`, or `30117`.

### Presence rules: blanks, errors, and duplicates

These rules mirror Excel's blank, error, and **Duplicate Values** options. They don't require extra fields, just `Target`, `Type`, and `Style`. Excel determines the condition for you.

| Type | Highlights cells that… |
| --- | --- |
| `ContainsBlanks` / `NotContainsBlanks` | are empty / aren't empty. |
| `ContainsErrors` / `NotContainsErrors` | contain an error / don't contain an error. |
| `DuplicateValues` / `UniqueValues` | are duplicated within the target / appear only once. |

```powerquery-m
[Target = [Column = "Sku"],  Type = "UniqueValues", Style = [Fill = "#C6EFCE"]],
[Target = [Column = "Note"], Type = "ContainsBlanks", Style = [Fill = "#FFEB9C"]]
```

### Top10: highest or lowest values

This rule uses Excel's **Top/Bottom Rules** (top or bottom N items, or top/bottom N %). Despite the name, `Rank` isn't limited to 10.

| Field | Notes |
| --- | --- |
| `Rank` | Required. How many items to highlight: `1`–`1000`, or `1`–`100` when `Percent = true`. |
| `Percent` | Optional `logical` (default `false`). Treat `Rank` as a percentage of the cells rather than a count. |
| `Bottom` | Optional `logical` (default `false`). Highlight the lowest values instead of the highest. |

```powerquery-m
[Target = [Column = "Stock"], Type = "Top10", Rank = 2, Style = [Fill = "#FFC7CE"]],
[Target = [Column = "Score"], Type = "Top10", Rank = 20, Percent = true, Bottom = true, Style = [Fill = "#FFC7CE"]]
```

### AboveAverage: above or below the average

This rule corresponds to Excel's **Top/Bottom Rules > Above/Below Average**. Excel calculates the average of the target range and highlights the cells on the side you choose.

| Field | Notes |
| --- | --- |
| `AboveAverage` | Optional `logical` (default `true`). Set to `false` to highlight below-average cells. |
| `EqualAverage` | Optional `logical` (default `false`). Include cells that are exactly equal to the average. |
| `StdDev` | Optional `1`–`3`. Restrict to cells that are at least this many standard deviations from the average (Excel's 1/2/3 standard deviation options). |

```powerquery-m
[Target = [Column = "Score"], Type = "AboveAverage", Style = [Fill = "#C6EFCE"]],
[Target = [Column = "Score"], Type = "AboveAverage", AboveAverage = false, EqualAverage = true, StdDev = 1, Style = [Fill = "#FFEB9C"]]
```

### TimePeriod: dates relative to today

This rule corresponds to Excel's **Highlight Cells Rules > A Date Occurring**. It highlights date cells that fall in a period measured against the day the workbook is opened, so the highlighting stays current over time. You must include `TimePeriod`, and it must be one of: `today`, `yesterday`, `tomorrow`, `last7Days`, `thisWeek`, `lastWeek`, `nextWeek`, `thisMonth`, `lastMonth`, `nextMonth`.

```powerquery-m
[Target = [Column = "Updated"], Type = "TimePeriod", TimePeriod = "last7Days", Style = [Fill = "#FFEB9C"]]
```

## Visual rules

Visual rules paint their own graphics (a gradient, bars, or icons), so they never take a `Style` or `StopIfTrue`. You control their appearance entirely through the type's own fields.

### ColorScale: a 2- or 3-color gradient

Excel's **Color Scales** shade each cell by where its value falls in the range, blending between the stop colors. `ColorScale` is a list of **2 or 3** stops; each stop is a [threshold](#thresholds) (`Type`, plus `Value` when needed) and a `Color`. Endpoint stops usually use `min` and `max`; a middle stop usually uses `percentile` or `num`.

```powerquery-m
[Target = [Column = "Revenue"], Type = "ColorScale", ColorScale =
    {[Type = "min", Color = "#F8696B"], [Type = "percentile", Value = 50, Color = "#FFEB84"], [Type = "max", Color = "#63BE7B"]}]
```

### DataBar: in-cell bars

Excel's **Data Bars** draw a small horizontal bar in each cell, longer for larger values, like a mini bar chart inside the column.

| Field | Notes |
| --- | --- |
| `Color` | Required. The bar fill color. |
| `Min`, `Max` | Optional [thresholds](#thresholds) that set the **values** at the two ends of the scale (Excel's Minimum and Maximum). By default they span the data (`min` to `max`). |
| `MinLength`, `MaxLength` | Optional whole numbers `0`–`100`. The **drawn length** of the shortest and longest bars, as a percent of the column width. Default `0`/`100` (a bar can shrink to nothing and grow to fill the cell). `MinLength` must be less than or equal to `MaxLength`. |
| `Gradient` | Optional `logical` (default `true`). A gradient fill, like Excel's "Gradient Fill". Set `false` for a solid fill ("Solid Fill"). |
| `ShowValue` | Optional `logical` (default `true`). Set `false` to show only the bar and hide the number (Excel's "Show Bar Only"). |
| `Border`, `BorderColor` | Optional. `Border` defaults to `false`. Set it to `true` to draw a border around the bar and optionally set `BorderColor`. |
| `NegativeFillColor`, `NegativeBorderColor` | Optional. Separate colors for the bars of negative values. |
| `AxisPosition` | Optional. Where the zero axis sits when values are both positive and negative: `none`, `middle`, or `automatic` (default). |
| `AxisColor` | Optional. The axis line color. |
| `Direction` | Optional. Which way the bars grow: `context` (default, follows the sheet's reading direction), `leftToRight`, or `rightToLeft`. |

> [!NOTE]
> `Min`/`Max` and `MinLength`/`MaxLength` control different things. `Min` and `Max` are **value** thresholds: the data values that sit at the two ends of the scale. `MinLength` and `MaxLength` are the **bar lengths** Excel draws for those ends, as a percent of the cell width. For example, `MinLength = 10` keeps even the smallest value's bar visible instead of letting it shrink away to nothing.

```powerquery-m
// Simple gradient bar spanning the data.
[Target = [Column = "Margin"], Type = "DataBar", Color = "#638EC6", Gradient = true],

// Solid bar, never shorter than 10% or longer than 90% of the cell width.
[Target = [Column = "Score"], Type = "DataBar", Color = "#638EC6", Gradient = false, MinLength = 10, MaxLength = 90],

// Right-to-left bars (they grow from the right edge of the cell).
[Target = [Column = "Usage"], Type = "DataBar", Color = "#638EC6", Direction = "rightToLeft"],

// Full data bar with negative colors and a center axis.
[Target = [Column = "Amount"], Type = "DataBar", Color = "#638EC6", Border = true, BorderColor = "#2F5496",
    NegativeFillColor = "#FF0000", NegativeBorderColor = "#C00000", AxisPosition = "middle", AxisColor = "#808080"]
```

### IconSet: an icon per cell

Excel's **Icon Sets** put a small icon (a traffic light, arrow, flag, rating, and so on) in each cell based on its value.

| Field | Notes |
| --- | --- |
| `IconSet` | Required. Which set of icons to use (see the list below). The leading digit is the number of icons in the set. |
| `Thresholds` | Required. One [threshold](#thresholds) per icon, marking where each icon takes over. Only these IconSet threshold records can set `GreaterThanOrEqual`; see the note below. |
| `Reverse` | Optional `logical` (default `false`). Reverse the icon order (Excel's "Reverse Icon Order"), for example to make low values green. |
| `ShowValue` | Optional `logical` (default `true`). Set `false` to show only the icon and hide the number. |

Icon-set IDs: `3Arrows`, `3ArrowsGray`, `3Flags`, `3TrafficLights1`, `3TrafficLights2`, `3Signs`, `3Symbols`, `3Symbols2`, `4Arrows`, `4ArrowsGray`, `4RedToBlack`, `4Rating`, `4TrafficLights`, `5Arrows`, `5ArrowsGray`, `5Rating`, `5Quarters`. Three more sets were added in newer versions of Excel: `3Stars`, `3Triangles`, `5Boxes`.

```powerquery-m
// Three traffic lights split at the 0 / 33 / 67 percentiles.
[Target = [Column = "Stock"], Type = "IconSet", IconSet = "3TrafficLights1",
    Thresholds = {[Type = "percent", Value = 0], [Type = "percent", Value = 33], [Type = "percent", Value = 67]}],

// Use a strict "greater than" at the top boundary instead of the default ">=".
[Target = [Column = "Rating"], Type = "IconSet", IconSet = "3Symbols",
    Thresholds = {[Type = "percent", Value = 0], [Type = "percent", Value = 33], [Type = "percent", Value = 67, GreaterThanOrEqual = false]}]
```

> [!NOTE]
> Provide exactly as many `Thresholds` as the set has icons (3, 4, or 5). The first threshold is conventionally `[Type = "percent", Value = 0]` so the lowest icon covers everything from the bottom up.

<!-- -->

> [!NOTE]
> By default each icon takes over when a value is **greater than or equal to** (`>=`) its threshold. Add `GreaterThanOrEqual = false` to a threshold to switch that boundary to a strict **greater than** (`>`), matching Excel's per-icon `>=` / `>` dropdown. The first threshold is the lowest bucket, so it always ignores this flag.

## Format merged text

Conditional formatting also works on `Text` parts. When `StartCell` defines a merged region, target the region with an absolute range or with a row or rectangle target that resolves to the region. The rule applies across the complete merged area.

```powerquery-m
#table(
    type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
    {
        {
            "Summary", "Status", "Text",
            [
                StartCell = "B2:E2",
                ConditionalFormatting =
                {
                    [Target = [Row = 2], Type = "CellIs", Operator = "Equal", Value = "Review", Style = [Fill = "#FFEB9C", Font = [Bold = true]]]
                }
            ],
            "Review"
        }
    }
)
```

For an auto-positioned `Text` part, record targets are resolved after placement and can span the merged region. Use an explicit `StartCell` when the rule must refer to fixed worksheet addresses.

## Notes and limitations

- **Rule order is priority.** The first matching rule in the list has the highest priority. Several rules can apply to the same cells at once (for example, a data bar beneath a value-based highlight); they layer in priority order. Use `StopIfTrue` to stop Excel from applying lower-priority rules to a cell once an earlier rule matches.
- **`Style` belongs to style rules only.** Supplying `Style` on a `ColorScale`, `DataBar`, or `IconSet` rule is an error (`30130`); omitting `Style` on a style rule is an error (`30125`).
- **`Width` and `RowHeight` don't apply.** A conditional format can change how a cell looks but can't resize columns or rows. Including `Width` or `RowHeight` in a `Style` is rejected (`30141`) rather than silently dropped.
- **Newer features need a recent Excel.** Rich data bars (a solid fill, negative colors, an axis, borders, or a right-to-left `Direction`) and the `3Stars`, `3Triangles`, and `5Boxes` icon sets were introduced in Excel 2010. They display fully in Excel 2010 and later, including Microsoft 365 and Excel for the web, and degrade gracefully in Excel 2007 to a plain gradient bar or a classic icon set with the same number of icons. `MinLength`/`MaxLength` and per-threshold `GreaterThanOrEqual` are classic options that work in every supported version.
- **A few fine-grained Excel options aren't exposed.** By design, custom per-icon glyphs (mixing icons from different sets) have no field on this surface and use Excel's defaults. The supported fields for each rule type are exactly those listed in the [Quick reference](#quick-reference) and per-rule tables above.
- **Targets follow the shared grammar.** `[Column = "Name"]` is name-based, and the coordinate conventions match the [style target rules](dataflow-gen2-data-destinations-excel-styles.md#choose-a-style-target). Absolute ranges that fall outside any data part are supported, but (like styles) only on sheets built from explicitly positioned `Table` or `Range` parts, not on `SheetData` parts or auto-positioned parts.
- **Empty data drops column rules.** A `[Column = "Name"]` rule on a part that has a header but no data rows has nothing to evaluate, so the rule is silently skipped rather than producing an invalid range.
- **Dates become Excel serial numbers.** A `CellIs` comparison against a date or datetime value is written as the matching Excel date serial. A value Excel can't store as a date or time is rejected (`30136`).
- **Values use scalar types.** A `CellIs` `Value` can be a number, text, logical, null, date, datetime, datetimezone, time, or duration. Lists are accepted only as the two-value input for `Between` and `NotBetween`; lists, records, tables, functions, and binary values aren't valid single comparison values (`30143`).
- **Colors** accept every form described in [Specify colors](dataflow-gen2-data-destinations-excel-styles.md#specify-colors).

## Troubleshooting

### Error reference

| Error code | Error message | How to fix |
| --- | --- | --- |
| 30112 | The conditional format target isn't valid. | Use a text cell/range address, or a record with `Column`/`Row` or `Top`/`Left`/`Bottom`/`Right`. |
| 30113 | The conditional formatting operator is invalid. | Use a valid `CellIs` operator (see the operator list). |
| 30114 | 'Between'/'NotBetween' require a list of exactly two values. | Pass `Value = {low, high}`. |
| 30115 | The formula contains invalid control characters. | Remove control characters from the `Expression` `Formula`. |
| 30116 | The formula has unbalanced parentheses. | Balance the parentheses in the `Formula`. |
| 30117 | The formula has unclosed quotes. | Close (and double) the quotes in the `Formula`. |
| 30118 | Each item in the ConditionalFormatting list must be a record. | Wrap each rule as a record with `Target` and `Type`. |
| 30119 | Top10 rule has an invalid 'Rank'. | Use `1`–`1000`, or `1`–`100` when `Percent = true`. |
| 30120 | AboveAverage rule has an invalid 'StdDev'. | Use a whole number `1`–`3`. |
| 30121 | TimePeriod rule has an invalid TimePeriod. | Use one of the 10 supported time periods. |
| 30122 | The '{field}' field isn't allowed for this rule type. | Remove the field; it doesn't apply to that `Type`. |
| 30123 | Rule is missing the required 'Type'. | Set `Type` to one of the 14 supported values. |
| 30124 | Rule has an invalid 'Type'. | Set `Type` to one of the 14 supported values. |
| 30125 | Rule is missing the required 'Style'. | Add a `Style` to the style rule (or switch to a visual type). |
| 30126 | CellIs rule is missing 'Operator'. | Add an `Operator`. |
| 30127 | CellIs rule is missing 'Value'. | Add a `Value`. |
| 30128 | Expression rule is missing 'Formula'. | Add a `Formula`. |
| 30129 | Rule is missing the required 'Target'. | Add a `Target`. |
| 30130 | 'Style' isn't allowed for a visual rule. | Remove `Style` from `ColorScale`/`DataBar`/`IconSet` rules. |
| 30131 | 'StopIfTrue' isn't allowed for this rule type. | Remove `StopIfTrue` from visual rules. |
| 30132 | ColorScale rule is invalid. | Provide 2 or 3 stops, each with a `Color` and a threshold `Type`. |
| 30133 | DataBar rule has an invalid 'Min' or 'Max' threshold. | Make each a record with a valid threshold `Type`. |
| 30134 | IconSet rule has an invalid 'IconSet' or 'Thresholds' value. | Use a supported id with a matching number of thresholds. |
| 30135 | Rule has an invalid threshold type. | Use `min`, `max`, `num`, `percent`, or `percentile`. |
| 30136 | A value can't be represented as an Excel date/time serial. | Use a value Excel can store as a date or time. |
| 30137 | Rule has a 'Row' value that's out of range. | Use a row from 1 to the sheet's row count. |
| 30138 | Rule is missing a required 'Color'. | Provide a `Color` for each data bar and color-scale stop. |
| 30139 | A `num`/`percent`/`percentile` threshold is missing its numeric 'Value'. | Add a `Value` for those threshold types. |
| 30140 | A 'percent'/'percentile' threshold is out of range. | Use a value from 0 to 100. |
| 30141 | The 'Style' includes 'Width' or 'RowHeight'. | Remove them; a conditional format can't resize columns or rows. |
| 30142 | The target is outside the worksheet limits. | Keep the `Target` within columns A:XFD and rows 1:1048576. |
| 30143 | A 'Value' is a list, record, or other unsupported value. | Use a number, text, logical, null, or date/time value. |
| 30144 | A data bar 'MinLength' or 'MaxLength' is out of range. | Use a whole number from 0 to 100. |
| 30145 | A data bar 'MinLength' is greater than its 'MaxLength'. | Set `MinLength` less than or equal to `MaxLength`. |
| 30146 | A data bar 'Direction' is invalid. | Use `context`, `leftToRight`, or `rightToLeft`. |

### Common issues

#### A visual rule is rejected

**Issue**: A `DataBar`, `ColorScale`, or `IconSet` rule throws `30130`.

**Cause**: Visual rules render their own graphics and can't carry a `Style` or `StopIfTrue`.

**Solution**: Remove `Style` and `StopIfTrue`. Set colors through the type's own fields (`Color`, `ColorScale` stops, and so on).

#### Icon set throws `30134`

**Issue**: An `IconSet` rule is rejected even though the ID looks right.

**Cause**: The `Thresholds` count doesn't match the icon count in the ID (for example, four thresholds with `3TrafficLights1`).

**Solution**: Provide exactly as many thresholds as the leading digit of the ID (3, 4, or 5).

#### A rich data bar looks plain in older Excel

**Issue**: A `DataBar` with `Direction`, negative colors, an axis, borders, or a solid fill renders as a plain gradient bar.

**Cause**: Those features are introduced in Excel 2010. Excel 2007 shows the built-in fallback bar.

**Solution**: Open the workbook in Excel 2010 or later (including Microsoft 365 and Excel for the web). No change to the rule is needed.

#### A rule highlights the wrong column

**Issue**: `[Column = "A"]` targets the wrong cells.

**Cause**: As with styles, `[Column = ...]` matches a column name in the source Power Query table schema, not an Excel column letter.

**Solution**: Pass the source Power Query column name, or use a string range like `"A:A"`. See [Choose a style target](dataflow-gen2-data-destinations-excel-styles.md#choose-a-style-target).
