---
title: Create HTML reports with navigation tables in Dataflow Gen2 (preview)
description: Learn how to generate HTML report files with headings, sections, tables, metric cards, and bar charts from Power Query in Dataflow Gen2.
author: luitwieler
ms.author: jeluitwi
ms.reviewer: jeluitwi
ms.service: fabric
ms.subservice: data-factory
ms.topic: how-to
ms.date: 11/16/2026
ms.custom: dataflows
ai-usage: ai-assisted
---

# Create HTML reports with navigation tables in Dataflow Gen2 (preview)

> [!IMPORTANT]
> HTML file output is a preview feature.

Use navigation tables in Dataflow Gen2 to generate HTML report files that combine headings, sections, narrative text, tables, metric cards, and bar charts. For example, combine regional sales, summary metrics, and a revenue chart in one report that you regenerate with each dataflow run.

Start with the [minimal example](#minimal-example) to create a paragraph and a table. Use the [complete example](#complete-example) to add sections, summary cards, and a chart, or use the [quick reference](#quick-reference) to look up supported parts and properties.

> [!NOTE]
> This article describes HTML files written to a data destination, not email bodies. HTML files support `Chart` and `MultiStat` parts, but HTML email omits those parts. The file-output properties and limits in this article don't describe email output. For the email navigation-table reference, see [Advanced options for HTML email](send-html-email-dataflow.md). For connection and recipient setup, see [Send email from Dataflow Gen2](send-email-dataflow-gen2.md).

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- A Dataflow Gen2 that you can edit, with the HTML preview format available. To get started, see [Create your first dataflow](create-first-dataflow-gen2.md).
- A connection with write access to a file-based destination that offers the HTML format.

The minimal example includes its own sample data. When you adapt the report to existing queries, prepare their rows, columns, and data types before referencing them in the report.

## Create and run an HTML report

Configure the file destination on the query that returns the report definition, not on the table that supplies an individual report part:

1. Create a blank query in the Power Query editor and paste the full [minimal example](#minimal-example). Name the query `HtmlReport`.
1. Confirm that the query returns a navigation table with the required `PartType` and `Data` columns. The query result describes the report; it isn't the generated HTML file.
1. Select `HtmlReport`, and then select **Add data destination**.
1. Choose a file-based destination that offers the HTML format, and configure its connection and target location. For general setup guidance, see [Set up file-based destinations](dataflow-gen2-data-destinations-and-managed-settings.md#set-up-file-based-destinations).
1. Set **File format** to **HTML (preview)**, specify a file name such as `RegionalSales.html`, and complete the destination configuration.
1. Select **Save & run**. Review the refresh status and any errors before retrying. For instructions, see [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md).
1. After a successful run, open the generated `.html` file from the configured destination in a browser. For the minimal example, confirm that it contains the opening paragraph and the three regional sales rows.

The destination reads the navigation table and generates the HTML file during the dataflow run. Editing the query alone doesn't update a previously generated file.

## Overview

Power Query represents HTML reports as navigation tables: standard M tables with specific columns that describe the document structure. Each row represents a part of the report, such as a section, a table containing data, or a chart visualizing that data.

When you configure an HTML data destination in a dataflow, the system reads this navigation table and generates a complete UTF-8 HTML document with its styles included. This approach lets you combine results from your queries into one report without supplying HTML, CSS, or JavaScript.

The examples in this article return navigation tables, not HTML text or binary values. Evaluating the source query by itself returns the navigation table; the destination generates the HTML file when the dataflow runs.

> [!IMPORTANT]
> M record fields and table column names are case-sensitive. Use column and property names exactly as documented, such as `PartType`, `Data`, and `DataSeries`. Names, parent references, and source-column bindings are also case-sensitive. `PartType` values are accepted without regard to case, but use the documented casing for readable, predictable code. For `ChartType`, use the exact value `"Bar"` in this preview.

Examples that use names such as `RegionalSales`, `Summary`, or `MonthlySales` expect those values to be tables defined earlier in the same query or supplied by another dataflow query. A complete query must define every referenced identifier.

## Quick reference

Use these tables to choose the report parts and their supported properties.

### Part types at a glance

| Part type | Purpose | Can be inside a section | Multiple allowed | `Data` |
| --- | --- | --- | --- | --- |
| `Document` | Report-wide value-formatting culture | No | No | `null` |
| `Header` | Heading at the top of the report | No | No | `null` |
| `Section` | Groups content under an optional heading | No | Yes | `null` |
| `Text` | A paragraph or one formatted scalar value | Yes | Yes | One scalar value or `null` |
| `Table` | A table with optional title and subtitle | Yes | Yes | A table |
| `MultiStat` | A responsive group of labeled value cards | Yes | Yes | A table |
| `Chart` | A horizontal bar chart with one category and one value binding | Yes | Yes | A table |
| `Footer` | A note at the bottom of the report | No | No | One scalar value or `null` |

### Properties by part type

| Part type | Supported properties |
| --- | --- |
| `Document` | `Culture` |
| `Header`, `Section` | `Title`, `Subtitle` |
| `Text`, `Footer` | None |
| `Table` | `Title`, `Subtitle` |
| `MultiStat` | `Title`, `Subtitle`, `ValueColumn`, `LabelColumn` |
| `Chart` | `Title`, `Subtitle`, `ChartType`, `DataSeries` |

Put each setting directly in the part's `Properties` record. For example, use `[Title = "Sales"]`.

## Minimal example

Only `PartType` and `Data` are required. This query adds a paragraph followed by a regional sales table:

```powerquery-m
let
    RegionalSales = #table(
        type table [Region = text, Orders = Int64.Type, Revenue = Currency.Type],
        {
            {"North", 42, 18500.50},
            {"South", 31, 14200.00},
            {"West", 55, 24900.75}
        }
    ),
    Report = #table(
        type table [PartType = text, Data = any],
        {
            {"Text", "Regional sales from the latest refresh."},
            {"Table", RegionalSales}
        }
    )
in
    Report
```

The generated report contains the paragraph followed by a table with `Region`, `Orders`, and `Revenue` columns and rows for North, South, and West. Keep values typed instead of converting them to text: the declared `Currency.Type` controls how revenue appears, and both numeric columns are right-aligned. To control regional formatting rather than use the generation environment's culture, add a [`Document` part](#document).

## Navigation table structure

Use this full schema when you need names, grouping, or properties:

```powerquery-m
type table [
    Parent = nullable text,
    Name = nullable text,
    PartType = text,
    Properties = nullable record,
    Data = any
]
```

| Column | Required | Description |
| --- | --- | --- |
| `Parent` | No | The exact `Name` of the section containing this part. Use `null` for top-level parts. |
| `Name` | No | An optional unique identifier. A section needs a name when other rows refer to it in `Parent`. |
| `PartType` | Yes | One of the part types in the quick reference. Every row must have a nonblank supported value. |
| `Properties` | No | A record of settings for this part. Omission, `null`, and `[]` mean no settings. |
| `Data` | Yes | The part's content. Its required shape depends on `PartType`. |

Column order doesn't matter. Omitted optional columns are treated as `null`, and additional columns are ignored. If a query declares `PartType = nullable text`, every row must still contain a supported non-null part type.

Explicit names must be nonblank and unique across the report. Names identify parts; they aren't display headings. To change a heading, set `Title` rather than `Name`.

### How parts are arranged

- The optional `Header` appears before the body, and the optional `Footer` appears after it, regardless of their row positions.
- The optional `Document` row supplies settings and doesn't display content.
- Top-level content and sections appear in source row order.
- A section contains the rows whose `Parent` matches its `Name`. Its children retain their relative source order, even if they precede the section row or are interleaved with other rows.
- Only a named `Section` can be a parent. Sections can't nest.

There can be at most one `Document`, `Header`, and `Footer`. You don't need any of them to create a report. An empty navigation table with the required columns is valid.

Titles, subtitles, paragraphs, and table-cell text retain line breaks and significant spaces. Text content is displayed as text, not interpreted as HTML or Markdown.

## Parts and properties

The row snippets in this section aren't standalone queries. Insert them into the row list of a `#table` expression with the full column order `Parent`, `Name`, `PartType`, `Properties`, `Data`. The [complete example](#complete-example) shows how the rows fit together.

### Document

Use a `Document` part to select the culture for formatting values throughout the report.

| Property | Default | Description |
| --- | --- | --- |
| `Culture` | `Culture.Current` in the generation environment | A supported culture name, such as `"en-US"` or `"de-DE"`. Omission or `null` uses the generation environment's culture. The exact empty string `""` selects invariant culture. |

```powerquery-m
{null, null, "Document", [Culture = "de-DE"], null}
```

Culture affects formatted Table cells, MultiStat values and labels, Chart labels, and scalar Text/Footer values. It doesn't translate authored text, parse numeric strings, change the underlying data, or convert date/time-zone values to the reader's time zone.

Formatting happens when the file is generated. Opening the file on another computer doesn't reformat its values. Set `Culture` explicitly when you need predictable output across generation environments.

### Header

A `Header` displays a heading at the top of the report.

The HTML document title comes from the Header title when present, or defaults to `HTML Report`.

| Property | Description |
| --- | --- |
| `Title` | The main heading. Also used for the HTML document title. |
| `Subtitle` | A line below the heading. Can appear without a title. |

```powerquery-m
{null, null, "Header", [Title = "Daily operations", Subtitle = "Sales and fulfillment"], null}
```

Titles and subtitles are optional text. Missing, null, or empty values don't display. A Header with neither is omitted.

### Section

A `Section` groups Text, Table, MultiStat, and Chart parts.

| Property | Description |
| --- | --- |
| `Title` | The section heading. |
| `Subtitle` | A description below the heading. Can appear without a title. |

Give the section a unique `Name`, then use that value in its children's `Parent` column:

```powerquery-m
{null, "RegionalBreakdown", "Section", [Title = "Regional breakdown"], null},
{"RegionalBreakdown", null, "Text", null, "Completed orders by territory."},
{"RegionalBreakdown", null, "Table", [Title = "Sales"], RegionalSales}
```

`RegionalSales` must be a table defined in the query or supplied by another query. A section without a title or subtitle still groups its children.

### Text and Footer

Use `Text` for a paragraph or a single formatted value. Use `Footer` for a note after the report body. Neither part accepts properties.

```powerquery-m
{null, null, "Text", null, "The refresh completed successfully."},
{null, null, "Footer", null, "Generated by Dataflow Gen2."}
```

Their `Data` can be text, logical, number, date, time, datetime, datetimezone, duration, or `null`. A list, record, table, binary, function, type, or action isn't allowed as scalar content.

Null and empty text omit the part. Formatted scalar text longer than 10,000 characters is shortened to that prefix, without an ellipsis.

### Table

A `Table` part displays a table value in source row and column order.

| Property | Description |
| --- | --- |
| `Title` | A heading above the table. |
| `Subtitle` | A description below the title. Can appear without a title. |

```powerquery-m
{null, null, "Table", [Title = "Regional sales", Subtitle = "Latest refresh"], RegionalSales}
```

Table behavior:

- Declared numeric columns, including currency and percentage columns, are right-aligned. A column of type `any` isn't automatically right-aligned based on its contents.
- Larger tables use a scrollable viewport with sticky column headings.
- A table with columns but no rows displays its column headings with no data rows. A zero-column table displays *No data available.*
- Null cells display `null`, distinct from empty text.
- Structured values use static placeholders, such as `[List]`, `[Record]`, and `[Table]`. Their contents aren't expanded.

The `Data` value can be any table-valued query or expression. It doesn't have to be a literal `#table`. Use upstream transformations to choose, rename, filter, sort, or aggregate columns and rows.

### MultiStat

A `MultiStat` part displays one labeled value card for each retained input row. Use it for totals, rates, counts, or other summary measures you calculate in M.

| Property | Default | Description |
| --- | --- | --- |
| `Title` | None | A heading above the cards. |
| `Subtitle` | None | A description below the title. |
| `ValueColumn` | `"Value"` | The source column containing each displayed value. |
| `LabelColumn` | `"Label"` | The source column containing each label. |

```powerquery-m
let
    Summary = #table(
        type table [Label = text, Value = Int64.Type],
        {{"Orders", 519}, {"Regions", 4}, {"Delayed shipments", 2}}
    ),
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Header", [Title = "Fulfillment summary"], null},
            {"MultiStat", [Title = "At a glance"], Summary}
        }
    )
in
    Report
```

Both bound columns must exist, even in an empty table. Set `ValueColumn` and `LabelColumn` when your column names differ. Null or omitted bindings use the defaults.

Values and labels use their column types and the report culture. A null value displays `null`; a null label is omitted in the current preview. Cards follow source order and adapt to the available display width. The renderer doesn't calculate totals or other aggregates.

Only the first 100 rows become cards. The renderer omits extra rows without a notice.

### Chart

A `Chart` part displays a horizontal bar chart. It supports one category column and one numeric value column.

| Property | Default | Description |
| --- | --- | --- |
| `Title` | None | A heading above the chart. |
| `Subtitle` | None | A description below the title. |
| `ChartType` | `"Bar"` | Set to `"Bar"` for a horizontal bar chart. Omission or `null` uses Bar. |
| `DataSeries` | Inferred only for a suitable two-column table | A record with `AxisColumns` and `ValueColumns`. |

```powerquery-m
let
    Changes = #table(
        type table [Region = text, Change = nullable number],
        {{"North", 12000}, {"South", -3500}, {"East", 0}, {"West", null}}
    ),
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Chart",
                [
                    Title = "Revenue change",
                    Subtitle = "Compared with the previous period",
                    ChartType = "Bar",
                    DataSeries = [AxisColumns = "Region", ValueColumns = "Change"]
                ],
                Changes
            }
        }
    )
in
    Report
```

Each binding accepts an exact, nonblank source-column name or a one-item list containing that name. For example, `AxisColumns = "Region"` and `AxisColumns = {"Region"}` are equivalent.

When `DataSeries` is missing or null, the renderer infers bindings only if `Data` has exactly two columns and the second is declared as number or nullable number, including numeric types such as `Currency.Type`. The first column becomes the category and the second the value. Otherwise, supply both bindings. An explicitly supplied record must contain both; partial inference isn't supported.

Both columns must exist, including for an empty table. Set Chart `Data` to a table value. Reuse an M table value in multiple parts when you want a chart and a table to show the same source.

Chart behavior:

- Only the first 1,000 rows are retained, in source order. Duplicate category values remain separate points.
- Retained numeric values must be finite numbers or null. Numeric strings, NaN, and infinities aren't accepted.
- Negative bars extend from a zero baseline in the opposite direction to positive bars.
- A null retains its category position but has no bar and an empty value label. Zero has a value label but no filled bar.
- Scaling uses only retained numeric values. Culture and display rounding affect labels, not bar geometry.

An empty or all-null chart is valid.

## Complete example

This query builds a daily fulfillment report with a culture, header, summary cards, two sections, a chart, a detailed table, and a footer.

```powerquery-m
let
    RegionalSales = #table(
        type table [Region = text, Orders = Int64.Type, Revenue = Currency.Type],
        {
            {"North", 142, 68400.00},
            {"South", 98, 45210.50},
            {"East", 115, 53900.25},
            {"West", 164, 79120.00}
        }
    ),
    Summary = #table(
        type table [Label = text, Value = any],
        {
            {"Orders", List.Sum(RegionalSales[Orders])},
            {"Revenue", Value.ReplaceType(List.Sum(RegionalSales[Revenue]), Currency.Type)},
            {"Regions", Table.RowCount(RegionalSales)}
        }
    ),
    Report = #table(
        type table [
            Parent = nullable text,
            Name = nullable text,
            PartType = text,
            Properties = nullable record,
            Data = any
        ],
        {
            {null, null, "Document", [Culture = "en-US"], null},
            {null, null, "Header",
                [Title = "Daily fulfillment report", Subtitle = "Regional sales from the latest refresh"], null},

            {null, "Overview", "Section", [Title = "At a glance"], null},
            {"Overview", null, "MultiStat", null, Summary},
            {"Overview", null, "Text", null, "Use the regional breakdown below to plan the next day's workload."},

            {null, "Regions", "Section", [Title = "Regional breakdown"], null},
            {"Regions", null, "Chart",
                [
                    Title = "Revenue by region",
                    Subtitle = "Values use the same source as the table",
                    DataSeries = [AxisColumns = "Region", ValueColumns = "Revenue"]
                ],
                RegionalSales},
            {"Regions", null, "Table", [Title = "Orders and revenue"], RegionalSales},

            {null, null, "Footer", null, "Generated automatically by Dataflow Gen2."}
        }
    )
in
    Report
```

The summary cards show 519 orders, revenue of `246,630.75`, and four regions. The chart and table both use `RegionalSales`, but don't depend on each other as report parts.

## Format values with types

The formatter uses the report culture and the types of your values.

### Where the type comes from

- **Table-backed cells and labels:** The declared source-column type controls formatting. Non-null values must be compatible with it. For example, `"N/A"` in a number column causes an error; it isn't parsed or silently displayed as a number.
- **Columns of type `any`:** Each value's own type controls formatting.
- **Text and Footer:** The scalar value's own type controls formatting. Use `Value.ReplaceType` to attach a presentation type to a value.

A numeric value in an `any` column doesn't by itself carry a currency or percentage presentation. Assign a declared column type, or use `Value.ReplaceType` on the individual value.

### How types are displayed

These examples use `Culture = "en-US"`.

| Type | Display | Example |
| --- | --- | --- |
| Text | As authored, with spaces and line breaks retained | `Quarterly summary` |
| Number | Standard number formatting without a currency or percentage presentation | `1250.5` |
| Whole number, such as `Int64.Type` | No grouping separators | `1250` |
| `Currency.Type` | Grouping separators, at least two decimal places, no currency symbol | `1,250.50` |
| `Percentage.Type` | Value multiplied by 100 for display, at least two decimal places | `12.50%` for `0.125` |
| Logical | Uppercase text | `TRUE` or `FALSE` |
| Date | Regional short date | `10/28/2026` |
| Time | Regional long time, including fractional seconds when present | `9:30:05.125 AM` |
| Datetime | Regional date and time | `10/28/2026 9:30:05.125 AM` |
| Datetimezone | Regional date and time, retaining the original offset | `10/28/2026 9:30:05.125 AM -03:30` |
| Duration | Signed elapsed days, hours, minutes, and seconds | `1.04:05:06.125` |
| Null | Visible `null` in Table cells and MultiStat values | `null` |
| List, record, table, binary, function, type, or action in table-backed content | A kind placeholder; contents aren't traversed or executed for display | `[List]`, `[Record]`, `[Table]`, `[Binary]`, `[Function]`, `[Type]`, `[Action]` |

Scalar Text/Footer nulls are omitted. Chart numeric nulls have empty labels, and null MultiStat labels are omitted. A source evaluation error fails report generation rather than becoming a placeholder.

### Set decimal places

Use `Type.ReplaceFacets` with `NumericPrecisionBase = 10` and `NumericScale` from `0` through `28`.

```powerquery-m
let
    WholeCurrency = Type.ReplaceFacets(
        Currency.Type, [NumericPrecisionBase = 10, NumericScale = 0]
    ),
    OneDecimalPercent = Type.ReplaceFacets(
        Percentage.Type, [NumericPrecisionBase = 10, NumericScale = 1]
    ),
    Results = #table(
        type table [Region = text, Budget = WholeCurrency, Attainment = OneDecimalPercent],
        {{"North", 125000, 0.9842}, {"South", 84300, 0.915}}
    ),
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Table", [Title = "Budget attainment"], Results}
        }
    )
in
    Report
```

The first row displays `125,000` and `98.4%`. Percentage scale applies after multiplication by 100. Numeric columns remain right-aligned.

### Set fractional-second precision

Use the `DateTimePrecision` facet with time, datetime, datetimezone, or duration types. Values from `0` through `7` control the number of fractional-second digits. A precision of `0` rounds to whole seconds.

```powerquery-m
let
    WholeSeconds = Type.ReplaceFacets(DateTime.Type, [DateTimePrecision = 0]),
    Milliseconds = Type.ReplaceFacets(Duration.Type, [DateTimePrecision = 3]),
    Timings = #table(
        type table [Step = text, StartedAt = WholeSeconds, Elapsed = Milliseconds],
        {{"Extract", #datetime(2026, 10, 28, 14, 5, 9.6789), #duration(0, 0, 1, 4.12)}}
    ),
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Table", [Title = "Step timings"], Timings}
        }
    )
in
    Report
```

The row displays `10/28/2026 2:05:10 PM` and `0.00:01:04.120`. Rounding changes display text, not the underlying value.

### Format a single value

Use `Value.ReplaceType` to attach a presentation type to a scalar value in a `Text` part:

```powerquery-m
let
    OneDecimalPercent = Type.ReplaceFacets(
        Percentage.Type, [NumericPrecisionBase = 10, NumericScale = 1]
    ),
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Header", [Title = "Service level attainment"], null},
            {"Text", null, Value.ReplaceType(0.9942, OneDecimalPercent)}
        }
    )
in
    Report
```

The Text part displays `99.4%`.

## Work with existing queries

The `Data` field accepts references to other table-valued queries. For example, if your dataflow has a query named `MonthlySales`, use it directly:

```powerquery-m
let
    Report = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Header", [Title = "Monthly sales"], null},
            {"Table", [Title = "Sales detail"], MonthlySales}
        }
    )
in
    Report
```

To keep a report focused, prepare the displayed result upstream:

```powerquery-m
Table.FirstN(
    Table.Sort(
        Table.SelectColumns(MonthlySales, {"Region", "Revenue"}),
        {{"Revenue", Order.Descending}}
    ),
    20
)
```

Use the resulting table as a part's `Data`. This approach also lets you order a chart by value; the chart itself doesn't sort or aggregate. Run the dataflow again after changing the report query or its source data to generate an updated file.

## Limits

These limits apply to HTML file output. The navigation-table row limit counts report parts, not the rows inside each part's `Data` table. Card and chart-point limits apply separately to each `MultiStat` or `Chart` part.

| Scope | Inclusive limit | When exceeded |
| --- | --- | --- |
| Rows in the report navigation table, including Document | 512 | Report generation fails. |
| MultiStat cards per part | 100 input rows | Only the first 100 rows are displayed. |
| Chart points per part | 1,000 input rows, including null-valued points | Only the first 1,000 rows are displayed. |
| Formatted Text/Footer content per part | 10,000 characters before HTML escaping | Only the prefix is displayed. |

> [!IMPORTANT]
> Truncation doesn't add an ellipsis or notice. Filter or summarize data explicitly when readers need to know that the report shows only a subset.

Large reports can exceed generation resources or become difficult to open. Select the rows, columns, and text you need before passing data to a part.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| The source query displays rows describing parts instead of a report. | This result is expected. Configure the HTML destination and run the dataflow to generate the file. |
| No HTML file appears after editing the query. | Configure the destination on the query that returns the navigation table, run the dataflow, and review the refresh status, target location, and write permissions. |
| The report parts table is missing required columns. | Return columns named exactly `PartType` and `Data`. To show a normal data table, wrap it in a Table part. |
| A part type is unknown. | Use a type from the quick reference. |
| A parent doesn't exist, or isn't a Section. | Give the section a unique nonblank `Name`, and use the exact same value in the child's `Parent`. |
| A part must be at the root. | Clear `Parent` on Document, Header, Section, and Footer rows. Sections can't nest. |
| Names are duplicated, or a singleton part occurs more than once. | Keep names unique and retain at most one Document, Header, and Footer. Use multiple sections for repeated groups. |
| A property isn't accepted. | Check the supported properties and their casing. Put settings directly in Properties, and leave Text/Footer Properties null or empty. |
| Chart DataSeries is required. | Supply both bindings, or use exactly two columns with the second declared as numeric. An `any` column of numeric values isn't enough for inference. |
| A bound column is missing. | Check the exact source-column name, including casing. Empty Chart and MultiStat tables still need the bound columns. |
| A chart value is rejected. | Supply finite numbers or null, not numeric text, NaN, or infinities. |
| A value doesn't match its declared column type. | Correct the source values or change the column type. The report doesn't convert `"N/A"` to a number. |
| A culture value is rejected. | Use a supported culture name or exactly `""` for invariant culture. Whitespace isn't an invariant-culture setting. |
| A source cell raises an error. | Resolve the source error before generating the report. Errors aren't displayed as cell text. |
| A cell displays `[List]`, `[Record]`, or `[Table]`. | This is the supported static placeholder. Flatten or summarize the nested value in the source query if you need to show its contents. |
| Numeric values aren't right-aligned. | Give the Table column a declared numeric type rather than `any` or text. |
| Cards, chart points, or long scalar text are missing from the end. | Check the display limits. Explicitly summarize or select a smaller result when necessary. |

## Related content

- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Excel Advanced data destination](dataflow-gen2-data-destinations-excel-advanced.md)
- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
