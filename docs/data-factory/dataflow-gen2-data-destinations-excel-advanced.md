---
title: Creating Excel documents with navigation tables
description: Learn how to create Excel documents programmatically using Power Query navigation tables
author: jorgegom
ms.topic: concept-article
ms.date: 01/12/2026
ms.author: jorgegom
ms.custom: dataflows
---

# Excel Advanced Data Destination

When you are working on a file based destination in Dataflow Gen2, you have the option to save your data in various formats, including Excel. Excel files can be created with simple tabular data, but you can also create complex workbooks with multiple sheets, charts, and customized formatting by using navigation tables. These navigation tables define the structure and content of the Excel document programmatically and provide a powerful way to generate dynamic Excel files.

This article explains how to construct these navigation tables to generate Excel documents programmatically from your Dataflow.

## Overview

Excel documents in Power Query are represented as navigation tables—standard M tables with specific columns that describe the document structure. Each row in the navigation table represents a part of the Excel document, such as a worksheet containing data or a chart visualizing that data.

When you configure an Excel Output Destination in a Dataflow, the system reads this navigation table and generates the corresponding Excel file. This approach provides flexibility in defining complex workbooks with multiple sheets, charts, and data relationships.

## Quick reference

This section provides a consolidated view of part types and their key properties for quick lookup. For ready-to-use code templates, see [Common patterns](#common-patterns). For error resolution, see [Troubleshooting](#troubleshooting).

### Part types at a glance

| Part Type | Purpose | Data Required | Positioning | Multiple per Sheet |
|-----------|---------|---------------|-------------|--------------------|
| `Workbook` | Document-level settings | No (`null`) | N/A | No (first row only) |
| `SheetData` | Simple data export | Yes (inline table) | Always A1 | No |
| `Table` | Excel Table with formatting | Yes (inline table) | `StartCell` or auto | Yes (if no overlap) |
| `Range` | Raw data without table styling | Yes (inline table) | `StartCell` or auto | Yes (if no overlap) |
| `Chart` | Chart visualization | Yes (inline or reference) | `Bounds` property | Yes |

### Key properties by part type

| Property | Workbook | SheetData | Table | Range | Chart |
|----------|:--------:|:---------:|:-----:|:-----:|:-----:|
| `StartCell` | - | - | ✓ | ✓ | - |
| `TableStyle` | - | - | ✓ | - | ✓* |
| `SkipHeader` | - | - | - | ✓ | - |
| `ShowGridlines` | - | ✓ | ✓ | ✓ | ✓ |
| `ChartType` | - | - | - | - | ✓ |
| `ChartTitle` | - | - | - | - | ✓ |
| `DataSeries` | - | - | - | - | ✓ |
| `Bounds` | - | - | - | - | ✓ |
| `ChartInferenceFunction` | ✓ | - | - | - | - |
| `StrictNameHandling` | ✓ | - | - | - | - |
| `UseSharedStrings` | ✓ | - | - | - | - |
| `AutoPositionColumnOffset` | - | - | ✓ | ✓ | ✓* |
| `AutoPositionRowOffset` | - | - | ✓ | ✓ | ✓* |

\* For charts with inline data, these properties control the backing data table.

## Minimal example

The simplest way to create an Excel document is to provide a navigation table with just the data you want to export. All columns except `Data` and `PartType` are optional—the connector can infer missing properties and build a functional document.

The following example defines a `SalesData` table that is used throughout this article:

```powerquery-m
let
    // Define your data with columns used throughout this article
    SalesData = #table(
        type table [
            Region = text, 
            Category = text, 
            Product = text, 
            Quarter = text,
            Revenue = number,
            Units = number
        ],
        {
            {"North", "Electronics", "Laptop", "Q1", 45000, 150},
            {"North", "Electronics", "Phone", "Q1", 32000, 400},
            {"North", "Furniture", "Desk", "Q1", 18000, 60},
            {"South", "Electronics", "Laptop", "Q1", 38000, 120},
            {"South", "Electronics", "Phone", "Q1", 28000, 350},
            {"South", "Furniture", "Chair", "Q1", 12000, 200},
            {"East", "Electronics", "Tablet", "Q2", 22000, 180},
            {"East", "Furniture", "Desk", "Q2", 15000, 50},
            {"West", "Electronics", "Phone", "Q2", 41000, 520},
            {"West", "Furniture", "Chair", "Q2", 9000, 150}
        }
    ),

    // Create the navigation table with minimal structure
    // Only Data and PartType are required
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {
            {"SheetData", SalesData}
        }
    )
in
    excelDocument
```

When you don't specify sheet names or part names, the system automatically generates appropriate defaults.

### Referencing other queries

In a Dataflow, you can reference other existing queries in your navigation table. The `Data` column accepts any table value, including references to queries defined elsewhere in your Dataflow:

```powerquery-m
let
    // Reference existing queries named "MonthlySales" and "CurrentInventory"
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {
            {"SheetData", MonthlySales},
            {"SheetData", CurrentInventory}
        }
    )
in
    excelDocument
```

## Navigation table structure

The navigation table follows a specific schema with the following columns:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| Sheet | nullable text | No | The parent worksheet name for the part. If not specified, a default name is generated. |
| Name | nullable text | No | A unique identifier for the part. Required only when other parts need to reference this part's data. |
| PartType | nullable text | No | The type of part being created: `Workbook`, `SheetData`, `Table`, `Range`, or `Chart`. |
| Properties | nullable record | No | Configuration options specific to the part type. |
| Data | any | Yes | The actual data content. Can be a table, or a reference to another part. |

### Supported part types

- **Workbook**: Document-level configuration. Must be the first row if used. Doesn't contain data.
- **SheetData**: A worksheet containing tabular data. This part is *data-bound*. SheetData parts must contain inline data and can't use table references. Creates a single data range starting at cell A1.
- **Table**: An Excel Table (formatted with table styling). This part is *data-bound*. Supports explicit positioning via `StartCell` and auto positioning. Multiple Table parts can exist on the same sheet if they don't overlap.
- **Range**: A data range without Excel Table formatting. This part is *data-bound*. Supports explicit positioning via `StartCell` and auto positioning. Multiple Range parts can exist on the same sheet if they don't overlap.
- **Chart**: A chart visualization. Can be placed on its own sheet or combined with data. This part is *data-bound* when it contains inline data, or it can reference data from another part.

> [!NOTE]
> *Data-bound parts* are parts that contain or reference tabular data. `SheetData`, `Table`, `Range`, and `Chart` (with inline data) are data-bound parts. Each data-bound part registers its data source using the part's `Name`, so all data-bound parts must have unique names.

> [!IMPORTANT]
> You can't mix `SheetData` with `Table` or `Range` parts on the same sheet. Use either `SheetData` alone or `Table`/`Range` parts together. When you need multiple data regions on one sheet, use `Table` or `Range` parts with positioning.

### Choosing the right part type

Use this decision guide to select the appropriate part type for your scenario:

**Use `SheetData` when:**

- You need a simple, single data region per sheet
- Data should start at cell A1
- You don't need Excel Table features (filters, structured references)
- You're exporting straightforward tabular data

**Use `Table` when:**

- You want Excel Table formatting with filter dropdowns
- You need structured references for formulas
- You're placing multiple data regions on one sheet
- You need precise control over positioning with `StartCell`
- You want to apply table styles (`TableStyleMedium1`, etc.)

**Use `Range` when:**

- You need raw data without Excel Table formatting
- You want to omit headers (`SkipHeader = true`)
- You're placing multiple data regions on one sheet
- The data will be consumed by other systems that expect plain ranges

**Use `Chart` when:**

- You need data visualization
- With inline data: chart and data appear together on the same sheet
- With references: chart and data can be on separate sheets, and multiple charts can share one data source

### Example with full structure

```powerquery-m
let
    // Helper function to create a reference to another part
    buildReference = (name as text) => #table({}, {}) meta [Name = name],

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null},
            {"DataSheet", "SalesTable", "SheetData", [], SalesData},
            {"ChartSheet", "SalesChart", "Chart", [ChartType = "Column"], buildReference("SalesTable")}
        }
    )
in
    excelDocument
```

## Charts and data placement

When you create a chart part, you can control where the chart and its data appear in the workbook.

### Chart with separate data sheet

When a chart references data from a different part using the `meta [Name = "..."]` syntax, the data and chart are placed on separate sheets.

> [!IMPORTANT]
> When using references, the `Name` column is mandatory. The reference is resolved by matching the value in `meta [Name = "..."]` to the `Name` column of another row in the navigation table.

```powerquery-m
let
    // Helper function to create a reference to another part
    buildReference = (name as text) => #table({}, {}) meta [Name = name],

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null},
            // Data on its own sheet
            {"DataSheet", "SalesTable", "SheetData", [], SalesData},
            // Chart on a different sheet, referencing the data
            {"ChartSheet", "SalesChart", "Chart", [ChartType = "Line"], buildReference("SalesTable")}
        }
    )
in
    excelDocument
```

### Chart with inline data

When a chart part includes data directly (without referencing another part), both the data and the chart are created on the same sheet:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null},
            // Data and chart appear together on the same sheet
            {"SalesSheet", "SalesChart", "Chart", [ChartType = "Column"], SalesData}
        }
    )
in
    excelDocument
```

This approach is convenient when you want users to see the data alongside its visualization.

### Multiple charts with inline data on the same sheet

When multiple Chart parts have inline data (not references), each chart creates its own backing data table on the same sheet. The system automatically positions these backing tables to avoid overlaps using auto positioning. You can control the backing table's appearance by specifying `TableStyle`, `AutoPositionColumnOffset`, and `AutoPositionRowOffset` on the chart part.

```powerquery-m
let
    ProductData = #table(
        type table [Product = text, Sales = number],
        {{"Widget", 100}, {"Gadget", 200}, {"Gizmo", 150}}
    ),

    RegionData = #table(
        type table [Region = text, Revenue = number],
        {{"North", 5000}, {"South", 3000}, {"East", 4000}}
    ),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // First chart with inline data - backing table auto-positioned
            {"Dashboard", "ProductChart", "Chart",
                [
                    Bounds = "B2:H15",
                    ChartType = "Column",
                    ChartTitle = "Product Sales",
                    DataSeries = [AxisColumns = {"Product"}, ValueColumns = {"Sales"}]
                ],
                ProductData
            },
            // Second chart with inline data - backing table auto-positioned after first
            {"Dashboard", "RegionChart", "Chart",
                [
                    Bounds = "J2:P15",
                    ChartType = "Pie",
                    ChartTitle = "Revenue by Region",
                    TableStyle = "TableStyleLight1",  // Style for the backing table
                    AutoPositionRowOffset = 2,        // Add extra row gap from previous table
                    DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]
                ],
                RegionData
            }
        }
    )
in
    excelDocument
```

## Table and Range parts

`Table` and `Range` parts provide more control over data placement than `SheetData`. Use them when you need multiple data regions on the same sheet or require specific positioning.

### Table part

The `Table` part creates an Excel Table with formatting, filter dropdowns, and structured references. Use it when you want Excel Table features.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| StartCell | text | `"auto"` | The top-left cell for the table (e.g., `"B3"`). Use `"auto"` for auto positioning. |
| TableStyle | text | `"TableStyleMedium2"` | The Excel table style. Valid values: `TableStyleLight1`-`21`, `TableStyleMedium1`-`28`, `TableStyleDark1`-`11`. |
| AutoPositionColumnOffset | number | `1` | Column offset from A when auto positioning (1 = column B). |
| AutoPositionRowOffset | number | `1` | Row gap from previous content when auto positioning. |

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Table with explicit position and custom style
            {"Sales", "SalesTable", "Table",
                [StartCell = "B3", TableStyle = "TableStyleMedium9"],
                SalesData
            }
        }
    )
in
    excelDocument
```

### Range part

The `Range` part creates a data range without Excel Table formatting. Use it when you need raw data without table features.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| StartCell | text | `"auto"` | The top-left cell for the range (e.g., `"C5"`). Use `"auto"` for auto positioning. |
| SkipHeader | logical | `false` | When `true`, omits the header row. |
| AutoPositionColumnOffset | number | `1` | Column offset from A when auto positioning. |
| AutoPositionRowOffset | number | `1` | Row gap from previous content when auto positioning. |

> [!NOTE]
> When `SkipHeader` is `true`, the range can't be used as a data source reference for charts. Charts require header rows to identify data series names.

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Range at a specific position
            {"Data", "DataRange", "Range",
                [StartCell = "D5"],
                SalesData
            }
        }
    )
in
    excelDocument
```

### Multiple tables on the same sheet

You can place multiple `Table` or `Range` parts on the same sheet as long as they don't overlap.

```powerquery-m
let
    SummaryData = #table(type table [Metric = text, Value = number], {{"Total", 50000}, {"Average", 5000}}),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Two tables side by side
            {"Report", "DetailTable", "Table",
                [StartCell = "A1", TableStyle = "TableStyleMedium9"],
                SalesData
            },
            {"Report", "SummaryTable", "Table",
                [StartCell = "I1", TableStyle = "TableStyleLight15"],
                SummaryData
            }
        }
    )
in
    excelDocument
```

### Auto positioning

When you don't specify `StartCell` (or set it to `"auto"`), the system automatically positions parts vertically, one below another, in the order they appear in the navigation table. This is useful when you have multiple data regions and don't need precise control.

| Property | Default | Description |
|----------|---------|-------------|
| AutoPositionColumnOffset | `1` | The starting column offset from A. Value of `0` starts at column A, `1` at column B. |
| AutoPositionRowOffset | `1` | The number of empty rows between parts. Value of `0` places parts immediately adjacent. |

```powerquery-m
let
    DataA = #table(type table [X = number], {{1}, {2}, {3}}),
    DataB = #table(type table [Y = number], {{10}, {20}}),
    DataC = #table(type table [Z = number], {{100}}),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // First table: starts at B2 (column offset 1, row offset 1)
            {"AutoSheet", "Table1", "Table", [], DataA},
            // Second table: starts at B + (3 data rows + 1 header + 1 gap) = B7
            {"AutoSheet", "Table2", "Table", [], DataB},
            // Third table: continues below Table2
            {"AutoSheet", "Table3", "Table", [], DataC}
        }
    )
in
    excelDocument
```

To change the positioning behavior:

```powerquery-m
let
    DataA = #table(type table [X = number], {{1}, {2}, {3}}),
    DataB = #table(type table [Y = number], {{10}, {20}}),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Start at column C (offset 2), row 4 (offset 3)
            {"CustomOffset", "Table1", "Table",
                [AutoPositionColumnOffset = 2, AutoPositionRowOffset = 3],
                DataA
            },
            // Start at column A (offset 0), with 2 row gap
            {"CustomOffset", "Table2", "Table",
                [AutoPositionColumnOffset = 0, AutoPositionRowOffset = 2],
                DataB
            }
        }
    )
in
    excelDocument
```

> [!IMPORTANT]
> You can't mix auto positioning with explicit `StartCell` values on the same sheet. All parts on a sheet must use either auto positioning (no `StartCell` or `StartCell = "auto"`) or explicit cell references.

### Overlaps

The system detects and reports overlapping ranges. If two parts would write to the same cells, an error is thrown.

To avoid overlaps:

- Use auto positioning and let the system arrange parts vertically
- When using explicit `StartCell` values, ensure parts don't share any cells
- Consider the header row when calculating positions (tables always include a header row, in ranges it's optional)

## Column widths

Column widths are calculated automatically based on content and data types. When multiple ranges share the same columns, the topmost range (by starting row) determines the column width for those shared columns.

## ShowGridlines property

The `ShowGridlines` property controls whether Excel's gridlines are visible for a sheet. This property can be set on `SheetData`, `Table`, `Range`, or `Chart` parts and affects the entire sheet. When `true` (the default), gridlines are visible. When `false`, gridlines are hidden.

If any part on a sheet explicitly sets `ShowGridlines` to `false`, the entire sheet hides gridlines.

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Hide gridlines for this sheet
            {"CleanReport", "DataTable", "Table",
                [ShowGridlines = false, StartCell = "B2"],
                SalesData
            }
        }
    )
in
    excelDocument
```

## Workbook properties

The `Workbook` part type allows you to configure document-level settings. If used, it must be the first row in the navigation table.

| Property | Type | Description |
|----------|------|-------------|
| ChartInferenceFunction | function | A function that automatically determines chart properties when not explicitly specified. Use `Office.InferChartPropertiesGenerator()` for the built-in inference engine. |
| StrictNameHandling | logical | When `true`, throws an error if sheet or part names contain invalid characters. When `false` (default), names are automatically sanitized. |
| UseSharedStrings | logical | When `true` (default), uses Excel's shared string table for text cells, resulting in smaller files. |

### Example with workbook properties

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Workbook configuration (must be first)
            {"Workbook", "Workbook", "Workbook", 
                [
                    ChartInferenceFunction = Office.InferChartPropertiesGenerator([
                        Allow3DCharts = false,
                        PreferMultilevelChartInference = true
                    ]),
                    StrictNameHandling = false
                ], 
                null
            },
            // Data and charts follow
            {"Sales", "SalesTable", "SheetData", [], SalesData}
        }
    )
in
    excelDocument
```

## Multiple charts with shared data

Charts can reference the same data source, allowing you to create multiple visualizations of the same dataset without duplicating the data in the workbook.

Use the `meta [Name = "..."]` syntax to create references. The `Name` column must be specified for the data part so that charts can resolve the reference.

> [!IMPORTANT]
> When charts reference data, you must provide the `DataSeries` configuration with `AxisColumns` and `ValueColumns`. Without a `ChartInferenceFunction` configured in the Workbook properties, omitting these required parameters results in an error.

```powerquery-m
let
    // Helper function to create a reference
    buildReference = (name as text) => #table({}, {}) meta [Name = name],

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            // Single data source - Name is required for reference resolution
            {"Data", "SalesTable", "SheetData", [], SalesData},
            
            // Multiple charts referencing the same data
            // Each chart must specify DataSeries with AxisColumns and ValueColumns
            {"LineChart", "TrendChart", "Chart", 
                [
                    ChartType = "Line", 
                    ChartTitle = "Sales Trend",
                    DataSeries = [AxisColumns = {"Quarter"}, ValueColumns = {"Revenue"}]
                ],
                buildReference("SalesTable")
            },
            {"PieChart", "DistributionChart", "Chart",
                [
                    ChartType = "Pie", 
                    ChartTitle = "Sales Distribution",
                    DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]
                ],
                buildReference("SalesTable")
            },
            {"BarChart", "ComparisonChart", "Chart",
                [
                    ChartType = "Bar", 
                    ChartTitle = "Product Comparison",
                    DataSeries = [AxisColumns = {"Product"}, ValueColumns = {"Revenue", "Units"}]
                ],
                buildReference("SalesTable")
            }
        }
    )
in
    excelDocument
```

References work in both forward and backward directions—a chart can reference data defined later in the table, and multiple charts can reference the same data source.

## Type facets and cell formatting

Power Query data types and their facets directly influence how cells are formatted in the generated Excel file. The type system provides rich formatting capabilities that translate to appropriate Excel number formats.

### Basic type mappings

| Power Query Type | Excel Format |
|-----------------|--------------|
| `Text.Type` | Text (@) |
| `Int32.Type`, `Int64.Type` | General |
| `Decimal.Type`, `Number.Type` | Number with two decimal places |
| `Currency.Type` | Number with thousands separator and two decimal places |
| `Percentage.Type` | Percentage with two decimal places |
| `Date.Type` | Date format |
| `Time.Type` | Time format with AM/PM |
| `DateTime.Type` | Date and time format |
| `DateTimeZone.Type` | Date and time format |
| `Duration.Type` | Duration format (d.hh:mm:ss) |
| `Logical.Type` | General (TRUE/FALSE) |

### Using type facets for precise formatting

Type facets allow you to specify precision and scale for numeric values:

```powerquery-m
let
    // Define types with specific facets
    currencyType = Type.ReplaceFacets(Currency.Type, 
        [NumericPrecisionBase = 10, NumericPrecision = 19, NumericScale = 4]),
    
    percentageType = Type.ReplaceFacets(Percentage.Type, 
        [NumericPrecisionBase = 10, NumericPrecision = 5, NumericScale = 2]),
    
    decimalType = Type.ReplaceFacets(Decimal.Type, 
        [NumericPrecisionBase = 10, NumericPrecision = 10, NumericScale = 4]),

    // Create table with typed columns
    tableType = type table [
        Product = Text.Type,
        Price = currencyType,           // Displays as currency with 4 decimal places
        Discount = percentageType,       // Displays as percentage with 2 decimal places
        TaxRate = decimalType           // Displays as number with 4 decimal places
    ],

    pricingData = #table(tableType, {
        {"Widget", 29.9999, 0.15, 0.0825},
        {"Gadget", 49.9500, 0.20, 0.0825}
    }),

    // Create navigation table with the typed data
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {
            {"SheetData", pricingData}
        }
    )
in
    excelDocument
```

### DateTime precision

You can control the precision of time components using the `DateTimePrecision` facet:

```powerquery-m
let
    // Time with millisecond precision
    timeWithMs = Type.ReplaceFacets(Time.Type, [DateTimePrecision = 3]),
    
    // DateTime with microsecond precision (Excel maximum is 3 digits)
    dateTimeWithPrecision = Type.ReplaceFacets(DateTime.Type, [DateTimePrecision = 7]),

    tableType = type table [
        EventName = Text.Type,
        EventTime = timeWithMs,
        Timestamp = dateTimeWithPrecision
    ],

    eventsData = #table(tableType, {
        {"Start", #time(9, 30, 15.123), #datetime(2025, 1, 15, 9, 30, 15.1234567)},
        {"End", #time(17, 45, 30.456), #datetime(2025, 1, 15, 17, 45, 30.9876543)}
    }),

    // Create navigation table with the typed data
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {
            {"SheetData", eventsData}
        }
    )
in
    excelDocument
```

> [!NOTE]
> Excel supports a maximum of three digits of fractional second precision. Higher precision values are truncated.

## Chart configuration

Charts are configured through the `Properties` record. You can explicitly specify chart settings or rely on the inference engine to determine appropriate values.

### Chart properties

| Property | Type | Description |
|----------|------|-------------|
| ChartType | text | The type of chart to create. |
| ChartTitle | text | The title displayed on the chart. |
| DataSeries | record | Configuration for data series, axes, and values. |
| Bounds | record or text | Position and size of the chart. See [Chart positioning](#chart-positioning). |

### Chart positioning

The `Bounds` property controls where a chart is placed and its size. You can specify bounds as a text value using Excel range syntax, or as a record with detailed positioning options.

#### Default positioning

When `Bounds` isn't specified, charts are positioned at a default location starting at cell H8 with a default size of 8 columns wide and 16 rows tall. Multiple charts on the same sheet without explicit `Bounds` will overlap at this default position.

#### Text format (Excel range syntax)

Use a single cell reference for the top-left corner (default size of 8 columns x 16 rows) or a range for explicit dimensions:

```powerquery-m
// Single cell: chart starts at B2 with default size
[Bounds = "B2"]

// Range: chart fills the area from G6 to N21
[Bounds = "G6:N21"]
```

#### Record format with Width and Height

Specify the top-left corner and dimensions:

| Property | Type | Description |
|----------|------|-------------|
| FromColumn | number or text | Column index (0-based) or Excel column name (e.g., `"A"`, `"G"`). Default: `7` (column H). |
| FromRow | number | Row index (0-based). Default: `7` (row 8). |
| Width | number | Chart width in number of columns. Default: `8`. |
| Height | number | Chart height in number of rows. Default: `16`. |

```powerquery-m
[Bounds = [
    FromColumn = "B",   // or 1 for column B
    FromRow = 1,        // Row 2 (0-based)
    Width = 8,          // 8 columns wide
    Height = 16         // 16 rows tall
]]
```

#### Record format with explicit corners

Alternatively, specify both corners of the chart area:

| Property | Type | Description |
|----------|------|-------------|
| FromColumn | number or text | Starting column (0-based index or Excel name). Default: `7` (column H). |
| FromRow | number | Starting row (0-based). Default: `7` (row 8). |
| ToColumn | number or text | Ending column (0-based index or Excel name). |
| ToRow | number | Ending row (0-based). |

```powerquery-m
[Bounds = [
    FromColumn = "A",
    FromRow = 0,
    ToColumn = "H",
    ToRow = 16
]]
```

#### Grid layout helper function

When placing multiple charts on a sheet, you can use a helper function to calculate grid positions:

```powerquery-m
let
    // Helper function to calculate chart bounds in a grid layout
    GetGridBounds = (
        chartNumber as number,       // 1-based chart number
        gridColumns as number,       // Number of columns in the grid
        optional width as number,    // Chart width (default: 8)
        optional height as number,   // Chart height (default: 16)
        optional hPadding as number, // Horizontal padding (default: 1)
        optional vPadding as number  // Vertical padding (default: 1)
    ) as record =>
        let
            w = width ?? 8,
            h = height ?? 16,
            hp = hPadding ?? 1,
            vp = vPadding ?? 1,
            cols = if gridColumns < 1 then 1 else gridColumns,

            x = Number.Mod(chartNumber - 1, cols) * (w + hp),
            y = Number.IntegerDivide(chartNumber - 1, cols) * (h + vp)
        in
            [FromColumn = x, FromRow = y, ToColumn = x + w, ToRow = y + h],

    buildReference = (name as text) => #table({}, {}) meta [Name = name],

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Data", "SalesTable", "SheetData", [], SalesData},
            // 2x2 grid of charts
            {"Dashboard", "Chart1", "Chart",
                [ChartType = "Column", Bounds = GetGridBounds(1, 2),
                 DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]],
                buildReference("SalesTable")},
            {"Dashboard", "Chart2", "Chart",
                [ChartType = "Line", Bounds = GetGridBounds(2, 2),
                 DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]],
                buildReference("SalesTable")},
            {"Dashboard", "Chart3", "Chart",
                [ChartType = "Pie", Bounds = GetGridBounds(3, 2),
                 DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]],
                buildReference("SalesTable")},
            {"Dashboard", "Chart4", "Chart",
                [ChartType = "Bar", Bounds = GetGridBounds(4, 2),
                 DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]],
                buildReference("SalesTable")}
        }
    )
in
    excelDocument
```

#### Advanced positioning with EMU offsets

For precise positioning within cells, use offset properties. Offsets are in EMUs (English Metric Units), where 914400 EMUs equals 1 inch.

| Property | Type | Description |
|----------|------|-------------|
| FromColumnOffset | number | Offset from the left edge of the starting cell (in EMUs). |
| FromRowOffset | number | Offset from the top edge of the starting cell (in EMUs). |
| ToColumnOffset | number | Offset from the left edge of the ending cell (in EMUs). |
| ToRowOffset | number | Offset from the top edge of the ending cell (in EMUs). |

```powerquery-m
[Bounds = [
    FromColumn = "C",
    FromColumnOffset = 352425,
    FromRow = 6,
    FromRowOffset = 142874,
    ToColumn = "R",
    ToColumnOffset = 142875,
    ToRow = 22,
    ToRowOffset = 171449
]]
```

### Supported chart types

| Chart Type | Description |
|------------|-------------|
| `Area` | Area chart |
| `Area3D` | 3D area chart |
| `Bar` | Horizontal bar chart |
| `Bar3D` | 3D horizontal bar chart |
| `Column` | Vertical column chart |
| `Column3D` | 3D vertical column chart |
| `Doughnut` | Doughnut chart (ring-shaped) |
| `Line` | Line chart |
| `Line3D` | 3D line chart |
| `Pie` | Pie chart |
| `Pie3D` | 3D pie chart |
| `Radar` | Radar chart |
| `StackedBar` | Stacked horizontal bar chart |
| `StackedBar100` | 100% stacked horizontal bar chart |
| `StackedColumn` | Stacked vertical column chart |
| `StackedColumn100` | 100% stacked vertical column chart |

### DataSeries configuration

The `DataSeries` record defines how your data maps to chart elements:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| AxisColumns | list or text | Yes* | One or more column names to use as the chart axis (categories). |
| ValueColumns | list or text | Yes* | One or more column names to use as chart values (series). |
| PrimaryAxisColumn | text | No | When using multiple axis columns, specifies which one serves as the primary axis label. |

\* Required unless a `ChartInferenceFunction` is configured in the Workbook properties. Without inference, omitting `AxisColumns` throws a "No axis columns provided" error, and omitting `ValueColumns` throws a "No value columns provided" error.

### Example with explicit chart configuration

```powerquery-m
let
    // Quarterly data by region
    quarterlyData = #table(
        type table [Quarter = text, North = number, South = number, East = number, West = number],
        {
            {"Q1", 95000, 78000, 37000, 50000},
            {"Q2", 102000, 85000, 42000, 58000}
        }
    ),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"SalesChart", "QuarterlySales", "Chart",
                [
                    ChartType = "StackedColumn",
                    ChartTitle = "Quarterly Revenue by Region",
                    DataSeries = [
                        AxisColumns = {"Quarter"},
                        ValueColumns = {"North", "South", "East", "West"}
                    ]
                ],
                quarterlyData
            }
        }
    )
in
    excelDocument
```

### Multilevel axis charts

For hierarchical category data, you can specify multiple axis columns:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"ProductChart", "Sales", "Chart",
                [
                    ChartType = "Column",
                    ChartTitle = "Product Sales by Category",
                    DataSeries = [
                        AxisColumns = {"Category", "Product"},
                        ValueColumns = {"Revenue"},
                        PrimaryAxisColumn = "Product"  // Use Product as the label
                    ]
                ],
                SalesData
            }
        }
    )
in
    excelDocument
```

## Using Office.InferChartPropertiesGenerator

The `Office.InferChartPropertiesGenerator` function creates an inference engine that automatically determines chart properties based on your data. This capability is useful when you want sensible defaults without specifying every chart configuration detail.

> [!IMPORTANT]
> Without a chart inference function, you must explicitly provide `DataSeries` with both `AxisColumns` and `ValueColumns` for every chart. Omitting these required parameters results in an error.

### Basic usage

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook",
                [ChartInferenceFunction = Office.InferChartPropertiesGenerator()],
                null
            },
            // Charts without explicit ChartType will use inference
            {"Chart1", "AutoChart", "Chart", [], SalesData}
        }
    )
in
    excelDocument
```

### Inference options

`Office.InferChartPropertiesGenerator` accepts an optional record with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| Allow3DCharts | logical | false | When `true`, the inference engine might select 3D chart types for appropriate data. |
| PreferMultilevelChartInference | logical | false | When `true`, uses all leading non-numeric columns as axis columns for multilevel charts. |

### Example with inference options

```powerquery-m
let
    chartInference = Office.InferChartPropertiesGenerator([
        Allow3DCharts = true,
        PreferMultilevelChartInference = true
    ]),

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook",
                [ChartInferenceFunction = chartInference],
                null
            },
            {"Sales", "SalesChart", "Chart", 
                [DataSeries = [AxisColumns = {"Region"}, ValueColumns = {"Revenue"}]],
                SalesData
            }
        }
    )
in
    excelDocument
```

### How inference works

The inference engine returns a record with three functions:

- **ChartType**: Analyzes the data schema and determines the optimal chart type based on:
  - Number of data series
  - Number of categories
  - Whether axis columns are datetime, numeric, or categorical
  - Row count

- **ChartTitle**: Generates a descriptive title based on the chart type and column names.

- **DataSeries**: Infers axis and value columns from the table schema:
  - Datetime columns are preferred as axis columns
  - Categorical (text) columns are considered for axis columns
  - Numeric columns become value columns

### Chart type selection logic

The inference engine selects chart types based on data characteristics:

| Data Characteristics | Inferred Chart Type |
|---------------------|---------------------|
| Single series, ≤6 categories, categorical axis | Pie |
| Single series, 7-15 categories, categorical axis | Doughnut |
| DateTime axis | Line or Area |
| ≥3 series, ≤15 categories, categorical | Radar |
| Multiple series, 3-25 categories | Stacked Bar |
| Single series, few categories | Column |
| Many categories | Bar |

### Custom inference function

You can provide your own inference function that follows the same interface:

```powerquery-m
let
    customInference = () as record => [
        ChartType = (partName, columns, dataSeries, rowCount) => 
            if rowCount < 10 then "Pie" else "Column",
        
        ChartTitle = (partName, chartType, dataSeries) => 
            partName & " Chart",
        
        DataSeries = (partName, columns) => [
            AxisColumns = {"Category"},
            ValueColumns = {"Revenue"}
        ]
    ],

    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook",
                [ChartInferenceFunction = customInference],
                null
            },
            {"Data", "CustomChart", "Chart", [], SalesData}
        }
    )
in
    excelDocument
```

## Advanced scenarios

This section covers programmatic approaches for generating navigation tables dynamically.

### Partitioning data into multiple sheets

You can use Power Query's list and table functions to dynamically create sheets based on data values.

#### Using Table.Group

Group data by a column and create a sheet for each group:

```powerquery-m
let
    groupedData = Table.Group(
        SalesData, 
        {"Region"}, 
        {{"RegionData", each _, type table}}
    ),

    excelDocument = Table.FromRecords(
        List.Transform(
            Table.ToRecords(groupedData),
            (row) => [
                Sheet = row[Region],
                PartType = "SheetData",
                Data = row[RegionData]
            ]
        )
    )
in
    excelDocument
```

#### Using Table.Partition

Partition a table into groups based on a custom hash function. This example partitions sales data into revenue buckets:

```powerquery-m
let
    Low_Revenue_Group_Index = 0,
    Medium_Revenue_Group_Index = 1,
    High_Revenue_Group_Index = 2,
    NumberOfPartitions = 3,

    RevenueRangeHash = (revenue as number) as number => 
        if revenue >= 40000 then High_Revenue_Group_Index
        else if revenue >= 25000 then Medium_Revenue_Group_Index
        else Low_Revenue_Group_Index,
    
    PartitionedList = Table.Partition(
        SalesData, 
        "Revenue", 
        NumberOfPartitions, 
        RevenueRangeHash 
    ),
    
    BucketNames = {
        "Low Revenue (< $25K)",      
        "Medium Revenue ($25K - $40K)", 
        "High Revenue (> $40K)"    
    },
    
    NamedPartitions = Table.FromColumns(
        {BucketNames, PartitionedList},
        type table [Sheet = text, Data = table]
    ),

    excelDocument = Table.AddColumn(NamedPartitions, "PartType", each "SheetData", type text)
in
    excelDocument
```

#### Custom partitioning function

For more control, use a custom partitioning function:

```powerquery-m
let
    partitionByColumn = (table as table, columnName as text, maxPartitions as number) as table =>
        let
            distinctValues = List.Distinct(Table.Column(table, columnName)),
            limitedValues = List.FirstN(distinctValues, maxPartitions),
            partitionedTable = Table.FromRecords(
                List.Transform(
                    limitedValues, 
                    (value) => [
                        Sheet = columnName & " - " & Text.From(value),
                        PartType = "SheetData",
                        Data = Table.SelectRows(table, each Record.Field(_, columnName) = value)
                    ]
                )
            )
        in
            partitionedTable,

    // Create sheets for each unique Region value (up to 10)
    excelDocument = partitionByColumn(SalesData, "Region", 10)
in
    excelDocument
```

### Dynamic charts for partitioned data

Combine partitioning with charts to create visualizations for each group:

```powerquery-m
let
    buildReference = (name as text) => #table({}, {}) meta [Name = name],

    createPartitionWithChart = (table as table, columnName as text) as table =>
        let
            distinctValues = List.Distinct(Table.Column(table, columnName)),
            partitionRows = List.Transform(
                distinctValues,
                (value) => 
                    let
                        partitionData = Table.SelectRows(table, each Record.Field(_, columnName) = value),
                        sheetName = Text.From(value),
                        dataName = "Data_" & sheetName,
                        chartName = "Chart_" & sheetName
                    in
                        {
                            {sheetName, dataName, "SheetData", [], partitionData},
                            {sheetName & " Chart", chartName, "Chart", 
                                [ChartType = "Column", ChartTitle = sheetName & " Analysis"],
                                buildReference(dataName)}
                        }
            ),
            workbookRow = {{"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null}}
        in
            #table(
                type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
                List.Combine({workbookRow} & partitionRows)
            ),

    excelDocument = createPartitionWithChart(SalesData, "Region")
in
    excelDocument
```

## Common patterns

This section provides ready-to-use templates for frequent scenarios. Copy and adapt these patterns to your needs.

### Pattern: Simple data export

Export a single table to Excel with minimal configuration:

```powerquery-m
let
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {{"SheetData", YourDataTable}}
    )
in
    excelDocument
```

### Pattern: Multiple sheets from a list

Create one sheet per item in a list:

```powerquery-m
let
    // Assume you have a list of {Name, Table} pairs
    dataSets = {
        {"Sales", SalesTable},
        {"Inventory", InventoryTable},
        {"Customers", CustomersTable}
    },
    
    excelDocument = #table(
        type table [Sheet = text, PartType = text, Data = table],
        List.Transform(dataSets, each {_{0}, "SheetData", _{1}})
    )
in
    excelDocument
```

### Pattern: Data with chart on same sheet

Create a sheet with both data and its visualization:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null},
            {"Report", "SalesChart", "Chart", 
                [ChartType = "Column", Bounds = "F2:M18"], 
                YourDataTable
            }
        }
    )
in
    excelDocument
```

### Pattern: Dashboard with multiple charts sharing data

Create a dashboard sheet with multiple charts referencing one data source:

```powerquery-m
let
    ref = (name as text) => #table({}, {}) meta [Name = name],
    
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Data", "SourceData", "SheetData", [], YourDataTable},
            {"Dashboard", "Chart1", "Chart", 
                [ChartType = "Column", Bounds = "A1:H16", 
                 DataSeries = [AxisColumns = {"Category"}, ValueColumns = {"Value1"}]], 
                ref("SourceData")},
            {"Dashboard", "Chart2", "Chart", 
                [ChartType = "Line", Bounds = "J1:Q16", 
                 DataSeries = [AxisColumns = {"Category"}, ValueColumns = {"Value2"}]], 
                ref("SourceData")}
        }
    )
in
    excelDocument
```

### Pattern: Side-by-side tables

Place two tables next to each other on the same sheet:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Report", "MainData", "Table", 
                [StartCell = "A1", TableStyle = "TableStyleMedium2"], 
                MainTable},
            {"Report", "Summary", "Table", 
                [StartCell = "H1", TableStyle = "TableStyleLight15"], 
                SummaryTable}
        }
    )
in
    excelDocument
```

### Pattern: Stacked tables with auto positioning

Stack multiple tables vertically with automatic spacing:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Report", "Section1", "Table", [], Table1},
            {"Report", "Section2", "Table", [AutoPositionRowOffset = 2], Table2},
            {"Report", "Section3", "Table", [AutoPositionRowOffset = 2], Table3}
        }
    )
in
    excelDocument
```

### Pattern: Clean report without gridlines

Create a polished report with hidden gridlines:

```powerquery-m
let
    excelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Report", "Data", "Table", 
                [StartCell = "B2", ShowGridlines = false, TableStyle = "TableStyleMedium9"], 
                YourDataTable}
        }
    )
in
    excelDocument
```

## Notes and limitations

### Excel limits

Excel has inherent limitations that affect document generation:

- **Maximum rows per worksheet**: 1,048,576 rows
- **Maximum columns per worksheet**: 16,384 columns
- **Maximum characters per cell**: 32,767 characters
- **Sheet name maximum length**: 31 characters
- **Sheet names cannot contain**: `\ / ? * [ ]` or start/end with `'`

When your data exceeds these limits, consider partitioning it across multiple sheets.

### Error handling

Cell-level errors in your data cause document generation to fail. The connector validates data as it processes each row, and encountering an error value (such as a division by zero or type conversion error) throws an exception.

To prevent failures:

- Use `try...otherwise` expressions to handle potential errors before exporting
- Replace error values with appropriate defaults or null values
- Validate data quality before constructing your navigation table

```powerquery-m
let
    RawData = #table(
        type table [Product = text, Amount = text],
        {
            {"Laptop", "1250.50"},
            {"Phone", "N/A"},
            {"Tablet", "850.00"}
        }
    ),
    
    cleanData = Table.TransformColumns(
        RawData,
        {{"Amount", each try Number.From(_) otherwise null, type nullable number}}
    ),
    
    excelDocument = #table(
        type table [PartType = nullable text, Data = any],
        {{"SheetData", cleanData}}
    )
in
    excelDocument
```

### Name handling

Sheet and part names are automatically sanitized to comply with Excel naming rules. Invalid characters are removed, and names are truncated to 31 characters. If `StrictNameHandling` is enabled in the Workbook properties, an error is thrown instead of automatic sanitization.

Duplicate sheet names are automatically made unique by appending a numeric suffix.

## Troubleshooting

This section covers common errors you might encounter when constructing navigation tables and how to resolve them.

### Error reference

| Error code | Error message | How to fix |
|------------|---------------|------------|
| 10950 | Missing {field} for document part in row {row}. | Ensure each row in your navigation table includes all required columns. For SheetData parts, provide the `Data` column with a table value. For Chart parts, provide either inline data or a valid table reference. |
| 10951 | Duplicate part name: {name} | Each row in the navigation table must have a unique `Name` value. Rename one of the duplicate parts to resolve this error. |
| 10953 | Container name '{name}' is invalid. Consider using '{suggestion}' instead. | Sheet names contain invalid characters (`\ / ? * [ ]`) or formatting issues. Use the suggested alternative name or enable automatic sanitization by omitting `StrictNameHandling` or setting it to `false`. |
| 10954 | Duplicate container '{name}'. Each document part (row) needs a unique value in the Container column. | Two parts have the same `Sheet` value. When using `SheetData`, each worksheet can only be created once. For multiple data regions on the same sheet, use `Table` or `Range` parts instead. |
| 10955 | Duplicate name '{name}'. Each document part (row) needs a unique Name. | Two data-bound parts have the same `Name` value. Each data-bound part must have a unique name because it registers a data source that other parts can reference. Rename one of the parts. |
| 10956 | Referenced table '{name}' wasn't found. | When using table references (empty tables with `Name` metadata), ensure the referenced `Name` matches a data part's `Name` value. Check for typos and case sensitivity. |
| 10959 | AxisColumns must be a single text value or a list of texts. | The `AxisColumns` property has an invalid type. Provide a text value like `"Category"` or a list like `{"Region", "Year"}`. |
| 10962 | ValueColumns must be a single text, a list of texts, or a record. | The `ValueColumns` property has an invalid type. Provide a text value like `"Revenue"` or a list like `{"Revenue", "Units"}`. |
| 10963 | No value columns provided for part '{name}'. Provide them with the 'ValueColumns' property. | For charts without a `ChartInferenceFunction`, you must explicitly specify `ValueColumns` in the `DataSeries` record. Add `ValueColumns = {"Column1", "Column2"}` to your chart's `DataSeries`. |
| 10966 | No axis columns provided for part '{name}'. Provide them with the 'AxisColumns' property. | For charts without a `ChartInferenceFunction`, you must explicitly specify `AxisColumns` in the `DataSeries` record. Add `AxisColumns = {"CategoryColumn"}` to your chart's `DataSeries`. |
| 10968 | Couldn't determine suitable axis or value columns for part '{name}'. Check the column data types. | The inference engine couldn't identify appropriate columns. Ensure your table has at least one categorical/datetime column (for the axis) and one numeric column (for values), or specify them explicitly. |
| 10970 | Axis column '{column}' isn't in the schema. | The column name specified in `AxisColumns` doesn't exist in your data table. Verify the column name matches exactly (case-sensitive). |
| 10971 | Value column '{column}' isn't in the schema. | The column name specified in `ValueColumns` doesn't exist in your data table. Verify the column name matches exactly (case-sensitive). |
| 10972 | Value column '{column}' must be numeric but is '{type}'. | Chart value columns must contain numeric data. Either convert the column to a numeric type using `Table.TransformColumnTypes`, or choose a different column. |
| 10981 | Unknown value '{value}' for enum '{enum}'. | An invalid value was provided for a property like `ChartType` or `PartType`. Check the documentation for valid values. |
| 10985 | Table reference error: found an empty table without 'Name' metadata pointing to the data row. | When using empty tables as data references, they must include `Name` metadata. Use `#table({}, {}) meta [Name = "DataPartName"]` to create a valid reference. |
| 10986 | Parts of type '{type}' in '{format}' files must have a Table as Data. TableReference isn't allowed. | `SheetData`, `Table`, and `Range` parts must contain inline table data and can't use table references. Only Chart parts can reference data from other parts. |
| 10987 | Parts of type '{type}' must have a Table or a Table reference as Data. | The part requires either a table or a valid table reference in the `Data` column. Ensure you're providing a table value, not null or another type. |
| 10988 | {field} cannot be null or whitespace. | The `Sheet` name or another required field is empty or contains only whitespace. Provide a valid non-empty value. |
| 10989 | Part type '{type}' isn't supported. | Use a valid part type: `Workbook`, `SheetData`, `Table`, `Range`, or `Chart`. Check for typos in the `PartType` column. |
| 10990 | Part {type} with document options must be the first part (row) in the table. | The `Workbook` part (containing options like `ChartInferenceFunction`) must be the first row in your navigation table. Reorder your rows accordingly. |
| 30005 | The chart inference function isn't available for part '{name}'. Set the {property} property manually. | Add a `Workbook` part as the first row with `[ChartInferenceFunction = Office.InferChartPropertiesGenerator()]` in its `Properties`, or manually specify the required property on the chart. |
| 30006 | The chart inference function didn't return a valid ChartType for part '{name}'. | The inference engine couldn't determine an appropriate chart type for your data. Specify `ChartType` explicitly in the chart's `Properties` record. |
| 30018 | The provided value is not representable in Excel. | The data contains values that can't be stored in Excel, such as dates before year 1900 or durations outside Excel's range. Filter or transform the data to remove unsupported values. |
| 30019 | The Excel column limit of {limit} columns was exceeded. | Your table has more columns than Excel supports (16,384). Reduce the number of columns or split the data across multiple tables. |
| 30020 | The Excel row limit of {limit} rows was exceeded. | Your data exceeds Excel's row limit (1,048,576). Partition the data across multiple sheets using `Table.Partition` or `Table.Group`. |
| 30059 | Overlap between parts '{part1}' and '{part2}' was detected. | Two parts on the same sheet have overlapping cell ranges. Adjust `StartCell` positions or use auto positioning. |
| 30060 | Cell reference '{ref}' exceeds Excel limits for part '{name}'. | The `StartCell` reference specifies a position outside Excel's valid range. Use a valid cell reference within columns A-XFD and rows 1-1048576. |
| 30062 | Container '{name}' already has a SheetData part. Range and Table parts cannot be added. | A sheet with a `SheetData` part can't have `Table` or `Range` parts. Use either `SheetData` alone or `Table`/`Range` parts together. |
| 30063 | Container '{name}' already has Range or Table parts. SheetData cannot be added. | A sheet with `Table` or `Range` parts can't have a `SheetData` part. Remove the `SheetData` part or move it to a different sheet. |
| 30066 | Range '{name}' cannot be used as data source for chart because it has SkipHeader enabled. | Charts require header rows to identify data series. Remove `SkipHeader = true` from the range or provide inline data to the chart. |
| 30067 | The {property} value '{value}' for part '{name}' is invalid. Expected a single-cell reference. | The `StartCell` value isn't a valid Excel cell reference. Use format like `"B3"` or `"AA100"`. |
| 30068 | Part '{name}' specifies AutoPositionColumnOffset or AutoPositionRowOffset but has an explicit StartCell. | You can't combine auto positioning offsets with an explicit `StartCell`. Either remove `StartCell` to use auto positioning, or remove the offset properties. |
| 30069 | Part '{name}' with AutoPositionColumnOffset would exceed Excel's maximum column limit. | The column offset combined with the table width exceeds column 16,384. Reduce the offset or the number of columns. |
| 30070 | The TableStyle '{style}' for part '{name}' is invalid. | Use a valid Excel table style: `TableStyleLight1`-`21`, `TableStyleMedium1`-`28`, or `TableStyleDark1`-`11`. |

### Common issues

#### Navigation table structure problems

**Issue**: Document generation fails with "Missing value" or schema errors.

**Cause**: The navigation table is missing required columns or has incorrect column types.

**Solution**: Verify your navigation table includes the correct columns with proper types:

```powerquery-m
type table [
    Sheet = nullable text,        // Optional: worksheet name
    Name = nullable text,         // Unique identifier for the part
    PartType = nullable text,     // "Workbook", "SheetData", "Table", "Range", or "Chart"
    Properties = nullable record, // Configuration options
    Data = any                    // Table, table reference, or null
]
```

#### Chart inference not working

**Issue**: Charts fail to generate with "No axis/value columns provided" errors.

**Cause**: No `ChartInferenceFunction` is configured and explicit column mappings are missing.

**Solution**: Either add a Workbook part with the inference function as the first row:

```powerquery-m
{"Workbook", "Workbook", "Workbook", [ChartInferenceFunction = Office.InferChartPropertiesGenerator()], null}
```

Or specify `DataSeries` explicitly for each chart:

```powerquery-m
[DataSeries = [AxisColumns = {"Category"}, ValueColumns = {"Revenue", "Profit"}]]
```

#### Table references not resolving

**Issue**: "Referenced table wasn't found" error when using table references.

**Cause**: The `Name` metadata on the reference doesn't match any data part.

**Solution**: Ensure the metadata name matches exactly:

```powerquery-m
let
    // Data part with name "SalesData"
    dataRow = {"Sales", "SalesData", "SheetData", [], actualTable},
    
    // Chart referencing the data - name must match
    chartRow = {"Chart", "SalesChart", "Chart", [], #table({}, {}) meta [Name = "SalesData"]}
in
    ...
```

#### Data type errors in cells

**Issue**: Document generation fails when processing certain rows.

**Cause**: Your data contains error values (such as division by zero or type conversion failures).

**Solution**: Clean error values before exporting:

```powerquery-m
Table.TransformColumns(
    YourTable,
    {{"ColumnName", each try _ otherwise null}}
)
```

#### Unsupported date or time values

**Issue**: Error "The provided value is not representable in Excel" when exporting date/time data.

**Cause**: Excel can't represent dates before January 1, 1900, or durations outside its supported range.

**Solution**: Filter out unsupported values or transform them:

```powerquery-m
Table.SelectRows(YourTable, each [DateColumn] >= #date(1900, 1, 1))
```

#### SheetData and Table/Range mixing error

**Issue**: Error "Container already has a SheetData part" or "Container already has Range or Table parts."

**Cause**: You can't combine `SheetData` with `Table` or `Range` parts on the same sheet.

**Solution**: Either use `SheetData` alone for a sheet, or use `Table`/`Range` parts together:

```powerquery-m
// Option 1: Use SheetData alone
{"Sheet1", "Data", "SheetData", [], myTable}

// Option 2: Use Table/Range parts for multiple regions
{"Sheet1", "Table1", "Table", [StartCell = "A1"], firstTable},
{"Sheet1", "Table2", "Table", [StartCell = "F1"], secondTable}
```

#### Auto positioning conflicts

**Issue**: Error "Part specifies AutoPositionColumnOffset or AutoPositionRowOffset but has an explicit StartCell."

**Cause**: You can't use auto positioning offsets when `StartCell` is explicitly set.

**Solution**: Either remove `StartCell` to use auto positioning, or remove the offset properties:

```powerquery-m
// Auto positioning with custom offsets (no StartCell)
{"Sheet1", "Table1", "Table", [AutoPositionColumnOffset = 2, AutoPositionRowOffset = 1], myTable}

// Or explicit positioning (no offset properties)
{"Sheet1", "Table1", "Table", [StartCell = "C2"], myTable}
```

#### Invalid sheet names

**Issue**: Error mentioning invalid container name or automatic name sanitization.

**Cause**: Sheet names contain invalid characters (`\ / ? * [ ]`) or exceed 31 characters.

**Solution**: Presanitize your sheet names:

```powerquery-m
sanitizeName = (name as text) as text =>
    let
        cleaned = Text.Replace(Text.Replace(name, "/", "-"), "\", "-"),
        truncated = Text.Start(cleaned, 31)
    in
        truncated
```

## Related content

- [Power Query M language specification](/powerquery-m/)
- [Table functions reference](/powerquery-m/table-functions)
- [Power Query dataflows](/power-query/dataflows/overview-dataflows-across-power-platform-dynamics-365)
