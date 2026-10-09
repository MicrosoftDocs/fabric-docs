---
title: Style Excel documents and add hyperlinks with navigation tables
description: Learn how to format cells, size rows and columns, style merged text, and add hyperlinks to Excel documents created by Dataflow Gen2.
author: jorgegom
ms.topic: concept-article
ms.date: 09/21/2026
ms.author: jorgegom
ms.custom: dataflows
---

# Style Excel documents and add hyperlinks with navigation tables

This article explains how to format cells and add hyperlinks to Excel documents that you create with Power Query navigation tables. Before you begin, review [Create Excel documents with navigation tables](dataflow-gen2-data-destinations-excel-advanced.md) for the navigation table schema, part types, and positioning behavior.

## Apply styles

Add a `Styles` list to a part's `Properties` record. Each item contains a `Target`, which identifies worksheet cells, and a `Style`, which specifies their formatting. You can apply styles to `SheetData`, `Table`, `Range`, and `Text` parts, and to the backing data table of a `Chart` part.

Use this shape for every item in the list:

```powerquery-m
[Target = [Column = "Revenue"], Style = [NumberFormat = "$#,##0.00"]]
```

M record field names are case-sensitive, so write `Target`, `Style`, `Font`, `Color`, and other fields exactly as shown. You can use documented option values such as `Center`, `Double`, and `Solid` without regard to case, but use the documented casing. Source Power Query schema column names in record targets and hyperlink mappings are case-sensitive.

The following example formats a header, two numeric columns, column widths, and the header row height.

```powerquery-m
let
    Sales = #table(
        type table [Product = text, Revenue = number, Margin = number],
        {
            {"Northwind", 1200.5, 0.24},
            {"Contoso", 2750, 0.31}
        }
    ),
    ExcelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {
                "Sales", "SalesData", "SheetData",
                [
                    Styles =
                    {
                        [Target = "A1:C1", Style = [Font = [Name = "Aptos", Size = 12, Family = 2, Bold = true, Color = "White"], Fill = "#305496", Alignment = [Horizontal = "Center"]]],
                        [Target = [Column = "Revenue"], Style = [NumberFormat = "$#,##0.00"]],
                        [Target = [Column = "Margin"], Style = [NumberFormat = "0.0%"]],
                        [Target = "A:A", Style = [Width = 24]],
                        [Target = "B:C", Style = [Width = 14]],
                        [Target = "1:1", Style = [RowHeight = 24]]
                    }
                ],
                Sales
            }
        }
    )
in
    ExcelDocument
```

## Choose a style target

Targets use absolute worksheet coordinates. Their addresses don't move when a part starts somewhere other than cell A1.

| Target | Selects | Coordinate system | Example |
| --- | --- | --- | --- |
| A1-style text | A cell or bounded range | 1-based | `"A1:C5"` |
| Whole-column text | One or more columns | 1-based | `"B:B"` or `"B:D"` |
| Whole-row text | One or more rows | 1-based | `"3:3"` or `"2:10"` |
| Column record | A part's column, identified by the column name in the source Power Query table schema | Name-based | `[Column = "Revenue"]` |
| Row record | A worksheet row | 1-based | `[Row = 3]` |
| Column and row record | One cell at the named column and worksheet row | 1-based row | `[Column = "Revenue", Row = 3]` |
| Rectangle record | A bounded range | 0-based | `[Top = 1, Left = 0, Bottom = 3, Right = 2]` selects A2:C4 |

> [!IMPORTANT]
> `[Column = "A"]` selects the data cells for the source table column named `A`; it doesn't mean worksheet column A. Use `"A:A"` to select worksheet column A, including its header cell. Column-name matching is case-sensitive.

The `Row` value in a record target is an absolute, 1-based worksheet row. Rectangle fields are the exception: `Top`, `Left`, `Bottom`, and `Right` are zero-based and inclusive.

### Style cells outside a part's data

A target can include empty cells outside a part's data, for example to add a fill or border around a report area. Use an explicitly positioned `Table` or `Range` part when you need this behavior. `SheetData` targets are limited to its data area. With auto-positioned parts, only decoration below all sheet data is reliably emitted.

Each cell created only for styling counts toward the style materialization limits. Prefer whole-column and whole-row targets for large areas.

## Style reference

Every style component is optional. A `Style` is a partial patch, not a replacement for the cell's complete formatting. Specify only the fields that you want to change. Omitted components remain unchanged. Nested records are partial too. For example, `[Font = [Bold = true]]` changes boldness without requiring or resetting the font name, size, or color.

| Component | Purpose | Example |
| --- | --- | --- |
| `Font` | Typeface, size, emphasis, effects, and color | `[Font = [Bold = true, Size = 12, Color = "Red"]]` |
| `Fill` | Cell background or pattern | `[Fill = "#FFF2CC"]` |
| `Border` | Cell edges and diagonals | `[Border = [Outline = true]]` |
| `Alignment` | Alignment, wrapping, rotation, and indentation | `[Alignment = [Horizontal = "Center", WrapText = true]]` |
| `Protection` | Locked and hidden settings used by protected worksheets | `[Protection = [Locked = false]]` |
| `NumberFormat` | Excel number format code | `[NumberFormat = "0.00%"]` |
| `Width` | Column width in character-width units | `[Width = 24]` |
| `RowHeight` | Row height in points | `[RowHeight = 30]` |

### Font

The following example requests Aptos at 12 points and classifies it as a sans serif font family:

```powerquery-m
[Font = [Name = "Aptos", Size = 12, Family = 2, Bold = true, Color = "#1F4E79"]]
```

| Field | Type | Values |
| --- | --- | --- |
| `Name` | text | A font name, such as `Aptos`, `Arial`, `Calibri`, `Georgia`, or `Consolas` |
| `Size` | number | Point size, such as `10`, `11`, `14`, or `18` |
| `Bold`, `Italic`, `Strikethrough` | logical | `true` or `false` |
| `Underline` | text | `None`, `Single`, `Double`, `SingleAccounting`, or `DoubleAccounting` |
| `Color` | color | A value described in [Specify colors](#specify-colors) |
| `VerticalAlign` | text | `Baseline`, `Superscript`, or `Subscript` |
| `Scheme` | text | `None`, `Major`, or `Minor` |
| `Family` | number | Optional Open XML family classification: `1` for Roman or serif, `2` for Swiss or sans serif, `3` for Modern or monospace, `4` for Script, or `5` for Decorative |

`Name` is stored in the workbook; it doesn't install or embed the font. Choose a font that is available to the people who open the workbook. Excel can substitute another font when the requested font isn't installed. `Family` helps Excel choose a substitute and is normally omitted unless you need to classify the requested font. For example, use `Family = 1` with `Georgia`, `Family = 2` with `Arial`, or `Family = 3` with `Consolas`.

### Fill

For a solid fill, use a color as the entire style, as the `Fill` value, or as `Fill[Color]`:

```powerquery-m
[Target = "A1:C1", Style = "#FFF2CC"]
[Target = "A1:C1", Style = [Fill = "#FFF2CC"]]
[Target = "A1:C1", Style = [Fill = [Color = "#FFF2CC"]]]
```

A fill record can contain `PatternType`, `ForegroundColor`, and `BackgroundColor`. `PatternType` accepts the Excel pattern names, including `None`, `Solid`, `Gray125`, `Gray0625`, `DarkGray`, `MediumGray`, `LightGray`, and the dark or light horizontal, vertical, diagonal, grid, and trellis variants.

For a solid fill, `ForegroundColor` is the visible color. `BackgroundColor` is used only by patterned fills.

### Border

Set `Outline = true` to apply one style to all four outside edges of each targeted cell. The default outline is thin and black.

```powerquery-m
[Target = "B2:D5", Style = [Border = [Outline = true, Style = "Medium", Color = "Red"]]]
```

For different edges, use `Left`, `Right`, `Top`, `Bottom`, or `Diagonal`. An edge can be a style name or a record containing `Style` and `Color`. Set `DiagonalUp` or `DiagonalDown` to select the diagonal direction.

Border styles are `None`, `Thin`, `Medium`, `Thick`, `Dashed`, `Dotted`, `Double`, `Hair`, `MediumDashed`, `DashDot`, `MediumDashDot`, `DashDotDot`, `MediumDashDotDot`, and `SlantDashDot`.

> [!IMPORTANT]
> Border-level `Style` and `Color` are used only when `Outline = true`. Otherwise, define individual edges.

### Alignment

| Field | Values |
| --- | --- |
| `Horizontal` | `General`, `Left`, `Center`, `Right`, `Fill`, `Justify`, `CenterContinuous`, or `Distributed` |
| `Vertical` | `Top`, `Center`, `Bottom`, `Justify`, or `Distributed` |
| `TextRotation` | `0` through `180`, or `255` for stacked text |
| `WrapText`, `ShrinkToFit` | `true` or `false` |
| `Indent` | `0` through `255` |
| `ReadingOrder` | `ContextDependent`, `LeftToRight`, or `RightToLeft` |

### Protection

`Protection` supports the logical fields `Locked` and `Hidden`. These settings take effect only after the worksheet is protected in Excel. The Excel cell-format default is `Locked` set to `true`, so cells for which you don't specify protection become locked when sheet protection is enabled. Use `Locked` set to `false` for cells that should remain editable.

```powerquery-m
[Target = "B2:B20", Style = [Protection = [Locked = false]]]
```

Set `Hidden` to `true` to hide a cell's formula while the sheet is protected. The Excel destination writes the cell protection setting but doesn't enable worksheet protection; enable protection in Excel for `Locked` or `Hidden` to take effect.

### Number format

`NumberFormat` accepts an Excel number format code. It replaces the destination's automatic type-based format for the targeted cells. The font, fill, border, and alignment settings continue to apply.

The property supports Excel's built-in formats and safe custom formats. It isn't limited to the examples in this table.

| Display | Format code | Example result |
| --- | --- | --- |
| General | `"General"` | Excel chooses the display |
| Integer | `"0"` | `1235` |
| Thousands separator | `"#,##0"` | `1,235` |
| Fixed decimals | `"0.00"` or `"#,##0.00"` | `1234.50` or `1,234.50` |
| Percentage | `"0%"` or `"0.00%"` | `25%` or `25.00%` |
| Currency | `"$#,##0.00"` | `$1,234.50` |
| Scientific | `"0.00E+00"` or `"##0.0E+0"` | `1.23E+03` |
| Fraction | `"# ?/?"` or `"# ??/??"` | `1 1/4` |
| Date | `"mm-dd-yy"`, `"d-mmm-yy"`, or `"yyyy-mm-dd"` | `09-21-26`, `21-Sep-26`, or `2026-09-21` |
| Time | `"h:mm AM/PM"`, `"h:mm:ss"`, or `"[h]:mm:ss"` | `2:30 PM`, `14:30:05`, or elapsed hours |
| Date and time | `"m/d/yyyy h:mm"` | `9/21/2026 14:30` |
| Negative values | `"#,##0.00;[Red](#,##0.00)"` | Negative values are red and in parentheses |
| Text | `"@"` | Preserves text display |
| Number with literal text | `"#,##0 ""USD"""` | `1,235 USD` |

```powerquery-m
[Target = [Column = "Margin"], Style = [NumberFormat = "0.0%"]]
[Target = [Column = "Revenue"], Style = [NumberFormat = "$#,##0.00"]]
[Target = [Column = "OrderDate"], Style = [NumberFormat = "yyyy-mm-dd"]]
[Target = [Column = "Code"], Style = [NumberFormat = "@"]]
```

Custom format codes can contain up to 255 characters. Excel format codes use double quotation marks around literal text. Double those quotation marks inside an M text value, as in `"#,##0 ""USD"""`. You can also escape an individual literal character with a backslash. Control characters, angle brackets, unbalanced quotes or brackets, unsafe unescaped text, and unsupported format tokens are rejected with errors `30078` through `30083`.

> [!IMPORTANT]
> M doesn't use `\"` to escape a quotation mark in text. Double the quotation mark instead. For example, the Excel code `#,##0 "USD"` must be written as the M value `"#,##0 ""USD"""`.

### Column width and row height

`Width` accepts values from 0 through 255. Apply it to a whole-column target, a named-column target, or a cell or bounded range. A bounded range sizes every column that it spans.

For efficient and predictable sizing:

- Use a whole-column target such as `"A:A"` when you know the worksheet position.
- Use `[Column = "Description"]` when the position might change but the source table schema is stable.
- Group adjacent columns that need the same width, for example `[Target = "B:D", Style = [Width = 14]]`.
- Avoid large cell-by-cell targets when you only need to size columns. Whole-column targets don't materialize every cell.

When several parts contribute automatically calculated widths to the same worksheet column, the largest automatic width is used so that one part's content doesn't narrow another part's column. Explicit widths have precedence instead: within one part, a later equally specific rule wins; a specific-column rule wins over a sheet-wide width; and when overlapping parts explicitly size the same worksheet column, the topmost part wins. Define one explicit width per worksheet column when possible.

> [!IMPORTANT]
> A `Width` on a whole-row or whole-sheet target isn't valid and returns error `30111`. Target one or more columns instead.

`RowHeight` accepts values from 0 through 409 points. It works only with a whole-row text target, such as `"2:2"` or `"2:10"`. Other target forms return error `30090`.

Use one whole-row range for adjacent rows that share a height, such as `[Target = "2:20", Style = [RowHeight = 18]]`. This is more efficient than separate rules for every row. When row-height ranges overlap, later rules take precedence in the overlap, so place the broad default first and exceptions afterward.

## Specify colors

Font, fill, and border colors accept these forms:

| Form | Example | Notes |
| --- | --- | --- |
| Hex text | `"#FF0000"`, `"80FF0000"` | Six-digit RGB or eight-digit ARGB; `#` is optional |
| Named color | `"Red"` | `Black`, `White`, `Red`, `Green`, `Blue`, `Yellow`, `Cyan`, `Magenta`, `Gray` or `Grey`, `Orange`, `Purple`, `Pink`, and `Brown` |
| RGB record | `[RGB = "FFC7CE"]` | Six-digit RGB or eight-digit ARGB |
| Theme record | `[Theme = 4, Tint = -0.25]` | Theme index 0 through 11; optional tint from -1 through 1 |
| Automatic color | `[Auto = true]` | Excel's theme-dependent automatic color |

## Combine style rules

When multiple rules affect a cell, their style fields merge in list order. A later value replaces an earlier value for the same field, while unrelated fields remain. For example, a later fill doesn't remove an earlier bold font. Order rules from general to specific.

Sizing follows the precedence described in [Column width and row height](#column-width-and-row-height), rather than ordinary field merging.

## Common patterns

### Format a report header

```powerquery-m
[Target = "A1:E1", Style = [Font = [Name = "Aptos", Size = 12, Bold = true, Color = "White"], Fill = "#305496", Alignment = [Horizontal = "Center"]]]
```

### Add alternating row fills

```powerquery-m
[Target = "A2:E2", Style = [Fill = "#F2F2F2"]],
[Target = "A4:E4", Style = [Fill = "#F2F2F2"]]
```

### Format currency and percentage columns

```powerquery-m
[Target = [Column = "Revenue"], Style = [NumberFormat = "$#,##0.00"]],
[Target = [Column = "Margin"], Style = [NumberFormat = "0.0%"]]
```

### Add a border around a block

```powerquery-m
[Target = "B2:D10", Style = [Border = [Outline = true, Style = "Medium"]]]
```

### Size groups of columns and rows

```powerquery-m
[Target = "A:A", Style = [Width = 28]],
[Target = "B:E", Style = [Width = 14]],
[Target = "1:1", Style = [RowHeight = 26]],
[Target = "2:20", Style = [RowHeight = 18]]
```

### Decorate an empty report area

```powerquery-m
[Target = "G3:I5", Style = [Border = [Outline = true], Fill = "#FFF2CC"]]
```

Use this pattern only with an explicitly positioned `Table` or `Range` part. For more information, see [Style cells outside a part's data](#style-cells-outside-a-parts-data).

## Style Text parts and merged ranges

Use a `Text` part for a title, note, or other single value. A bounded `StartCell` range creates a merged region. Style targets still use absolute worksheet addresses.

The following example creates a merged title and styles its fill, font, alignment, border, and row heights.

```powerquery-m
let
    ExcelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {
                "Summary", "ReportTitle", "Text",
                [
                    StartCell = "B2:E3",
                    Styles =
                    {
                        [
                            Target = "B2:E3",
                            Style =
                            [
                                Font = [Bold = true, Size = 16, Color = "White"],
                                Fill = "#305496",
                                Alignment = [Horizontal = "Center", Vertical = "Center"],
                                Border = [Outline = true, Style = "Medium", Color = "#1F1F1F"]
                            ]
                        ],
                        [Target = "2:3", Style = [RowHeight = 24]]
                    }
                ],
                "Quarterly sales summary"
            }
        }
    )
in
    ExcelDocument
```

Excel stores a merged value and most of its formatting on the upper-left anchor cell. A border is different: to render an outline around a merged region, the workbook must also contain border formatting on the covered perimeter cells. The Excel destination creates those perimeter cells when a style contributes `Left`, `Right`, `Top`, or `Bottom` edges to a merged region.

Rules that target covered cells can add their own formatting. Avoid applying large per-cell border ranges to large merges: one merged-border region can materialize at most 1,048,576 cells, and a worksheet can materialize at most 4,194,304 styled cells.

## Add hyperlinks

You can add hyperlinks to all data-bearing parts: `SheetData`, `Table`, `Range`, `Text`, and the backing data table of `Chart`.

The target must be a complete, absolute `http` or `https` URL, such as `https://www.microsoft.com`. Relative URLs, worksheet references, and other schemes such as `file`, `ftp`, and `mailto` aren't supported. This restriction ensures that every emitted hyperlink is an external web relationship with a validated target. A nonempty unsupported URL causes the destination write to fail. A null or empty URL creates an ordinary cell without a hyperlink.

Add hyperlinks in two ways:

- Add a rule to the part's `Hyperlinks` property when a column supplies URLs.
- Add `Hyperlink` metadata to individual values when display text, URLs, or tooltips vary by row.

### Add hyperlinks from a URL column

Each rule in `Properties[Hyperlinks]` supports these fields:

| Field | Required | Description |
| --- | --- | --- |
| `UrlColumn` | Yes | Name of the `text`, nullable text, or `any` column that contains URLs |
| `DisplayText` | No | Constant text displayed for every nonempty URL; the URL is displayed when omitted |
| `Tooltip` | No | Constant tooltip for every hyperlink created by the rule |

The rule doesn't add, remove, or rename columns. A null or empty URL remains an ordinary cell and doesn't create a hyperlink.

The following example displays `Open` for each URL and overrides the standard hyperlink appearance with an explicit style.

```powerquery-m
let
    Sites = #table(
        type table [Company = text, Website = nullable text],
        {
            {"Microsoft", "https://www.microsoft.com"},
            {"Power Query", "https://learn.microsoft.com/power-query/"},
            {"No website", null}
        }
    ),
    ExcelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {
                "Links", "CompanyLinks", "Table",
                [
                    StartCell = "A1",
                    Hyperlinks =
                    {
                        [UrlColumn = "Website", DisplayText = "Open", Tooltip = "Open website"]
                    },
                    Styles =
                    {
                        [Target = [Column = "Website"], Style = [Font = [Color = "#008272", Underline = "Double", Bold = true]]]
                    }
                ],
                Sites
            }
        }
    )
in
    ExcelDocument
```

### Add hyperlinks to individual values

Attach metadata in the form `value meta [Hyperlink = [Url = ..., Tooltip = ...]]`. The `Url` is required in the metadata record but can be null. The `Tooltip` is optional. The base value becomes the display value and retains its normal data type and number format. If the base value is null and the URL isn't empty, the URL is displayed.

The following example uses a helper function to create row-specific display text, URLs, and tooltips. Linked and ordinary values can coexist in the same column.

```powerquery-m
let
    MakeLink = (displayValue as any, urlValue as nullable text, optional tooltipValue as nullable text) as any =>
        if tooltipValue = null then
            displayValue meta [Hyperlink = [Url = urlValue]]
        else
            displayValue meta [Hyperlink = [Url = urlValue, Tooltip = tooltipValue]],
    Links = #table(
        type table [Resource = any],
        {
            {MakeLink("Power Query documentation", "https://learn.microsoft.com/power-query/", "Read the documentation")},
            {"Not a hyperlink"},
            {MakeLink(null, "https://www.microsoft.com")}
        }
    ),
    ExcelDocument = #table(
        type table [Sheet = nullable text, Name = nullable text, PartType = nullable text, Properties = nullable record, Data = any],
        {
            {"Resources", "ResourceLinks", "SheetData", [], Links}
        }
    )
in
    ExcelDocument
```

You can attach hyperlink metadata to values in strongly typed columns, including numbers and dates. When a cell has both hyperlink metadata and a matching column rule, the metadata URL and tooltip take precedence for that cell.

By default, the destination applies an 11-point, single-underlined font that uses the workbook theme's hyperlink color (theme color 10), the minor font scheme, and font family 2. In a new workbook, the font name is `Aptos Narrow`; the workbook theme determines the exact visible typeface and hyperlink color.

Explicit `Styles` rules are composed over the default hyperlink style. For example, the column-rule sample changes the color, underline, and weight while retaining the hyperlink relationship. Fields that you don't override keep their hyperlink defaults.

Each worksheet supports up to 65,530 hyperlinks.

## Targeting limits

- Targets must remain within Excel's grid of 1,048,576 rows and 16,384 columns. Targets beyond those limits return error `30096` or `30097`.
- A rule that materializes individual cells can cover at most 1,048,576 cells. A worksheet can contain at most 4,194,304 cells materialized by style rules.
- Whole-column and whole-row targets are represented efficiently and don't consume the per-cell materialization budget simply because they span the sheet. Prefer them for broad formatting and sizing.
- `RowHeight` requires a whole-row text target. `Width` can't use a whole-row or row-record target.
- Styling outside a part's data has the positioning restrictions described in [Style cells outside a part's data](#style-cells-outside-a-parts-data).

## Limits and troubleshooting

| Error code | Cause | Resolution |
| --- | --- | --- |
| `30086` | A rectangle target has negative coordinates. | Use nonnegative, zero-based rectangle coordinates. |
| `30087`, `30102` | A color name or color value isn't valid. | Use a supported named color, hex value, RGB record, theme record, or automatic color. |
| `30088` | An enumerated style value isn't supported. | Use one of the values listed in this article or in the error. |
| `30089` | `Width`, `RowHeight`, or `Indent` is outside its allowed range. | Use a value within the documented range. |
| `30090` | `RowHeight` uses a target other than a whole-row text range. | Use a target such as `"2:2"`. |
| `30091`-`30093` | A style rule isn't a record or is missing `Target` or `Style`. | Use `[Target = ..., Style = ...]` for every item. |
| `30094` | `TextRotation` is outside its allowed range. | Use 0 through 180, or 255 for stacked text. |
| `30095`, `30098` | A rule or worksheet exceeds its materialized-cell limit. | Narrow per-cell ranges or use whole-row and whole-column targets. |
| `30096`, `30097` | A target exceeds Excel's row or column limit. | Stay within 1,048,576 rows and 16,384 columns. |
| `30100` | A style target has an unsupported shape. | Use a text target or one of the record target forms in this article. |
| `30103` | A named-column target doesn't match a data column. | Check the case-sensitive source Power Query table schema column name, or use a text target for a worksheet column. |
| `30110` | A property isn't supported in its current style record. | Move the field to the correct component or remove it. |
| `30111` | `Width` is applied to a whole-row or whole-sheet target. | Target a column, cell, or bounded range. |
| `30187` | A merged border would materialize too many cells. | Reduce the merged region or remove its perimeter border. |

For navigation table and part errors, see [Troubleshoot Excel navigation tables](dataflow-gen2-data-destinations-excel-advanced.md#troubleshooting).

### Common issues

#### A Width rule doesn't change the expected column

**Cause:** A record target such as `[Column = "A"]` uses the source table's schema name, not an Excel column letter. In a sheet with overlapping parts, another explicit width can also take precedence.

**Resolution:** Use `"A:A"` for worksheet column A. Use `[Column = "Description"]` for the source column named `Description`. Use one explicit width owner for each worksheet column.

#### A RowHeight rule returns error 30090

**Cause:** `RowHeight` was applied to a record target or bounded cell range.

**Resolution:** Use a whole-row text target, such as `[Target = "2:2", Style = [RowHeight = 30]]`.

#### A custom number format is rejected

**Cause:** Literal text isn't quoted or escaped, the code contains an unsupported token, or quotes or brackets are unbalanced.

**Resolution:** Put literal text in double quotation marks inside the Excel format code. In M, double those quotation marks, for example `[NumberFormat = "#,##0 ""USD"""]`.

#### A requested font looks different in Excel

**Cause:** The requested font isn't installed on the computer that opens the workbook, so Excel substitutes a font.

**Resolution:** Use a commonly available font and optionally provide the matching `Family` classification to improve substitution.

#### A border Style or Color doesn't appear

**Cause:** Border-level `Style` and `Color` only apply through the `Outline` shorthand.

**Resolution:** Add `Outline = true`, or define edges directly, such as `[Border = [Top = [Style = "Thin", Color = "Red"]]]`.

#### A hyperlink causes the destination write to fail

**Cause:** A nonempty URL is relative or uses a scheme other than `http` or `https`.

**Resolution:** Supply a complete web URL such as `https://www.microsoft.com`, or use null or empty text when the cell shouldn't be a hyperlink.
