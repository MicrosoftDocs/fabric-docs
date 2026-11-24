---
title: Advanced options for HTML email in Dataflow Gen2 (preview)
description: Learn how to build formatted HTML emails with headers, sections, and styled tables by using Power Query navigation tables in Dataflow Gen2.
author: jorgegom
ms.author: jorgegom
ms.reviewer: jeluitwi
ms.service: fabric
ms.subservice: data-factory
ms.topic: concept-article
ms.date: 11/24/2026
ms.custom: dataflows
ai-usage: ai-assisted

#customer intent: As a Dataflow Gen2 author, I want to send a formatted HTML email with headers, sections, and tables so that recipients can read the results of my dataflow at a glance.
---

# Send HTML email with navigation tables in Dataflow Gen2 (preview)

> [!IMPORTANT]
> Send email is a preview feature.

The **Body** of a **Send email** action in Dataflow Gen2 accepts either plain text or a Power Query **navigation table**. When you pass a navigation table, Dataflow Gen2 turns it into a formatted HTML email with a header, sections, text, styled tables, and a footer. Email apps can display the same content differently, so inspect the message in the apps your recipients use.

This article explains how to build an email navigation table, what each part does, and how to control the way individual values are displayed. It extends [Send email from Dataflow Gen2 (preview)](send-email-dataflow-gen2.md), which covers how to set up the Outlook connection, configure recipients, and verify delivery.

These settings apply to the email body, not an attached HTML file. HTML file destinations support different parts and properties; see [Create HTML reports with navigation tables](dataflow-data-destinations-html-advanced.md). To create a document visually instead of writing M, use the [HTML document builder](dataflow-document-builder-html.md).

## Prerequisites

Follow the [Send email prerequisites](send-email-dataflow-gen2.md#prerequisites), including an Outlook connection and a test mailbox you control. A dataflow must have at least one query enabled for staging or configured with a data destination; an email action alone isn't enough.

> [!IMPORTANT]
> Disable staging on the query that **Body** references. Its source queries can keep their existing staging settings. If you use staging to meet the dataflow requirement, enable it on a query other than the body query.

## Use a navigation table as the email body

You can supply the navigation table to a **Send email** action in two ways:

### Select a query

1. Create a blank query and paste the full [minimal example](#minimal-example). Name the query `EmailBodyHtml`. It returns a navigation table with the required `PartType` and `Data` columns.
1. In **Queries**, right-click `EmailBodyHtml` and clear **Enable staging**.
1. On **Home**, select **Send email**. Open the input-mode menu beside **Body**, select **Select a query**, and choose `EmailBodyHtml`.
1. Configure the connection, recipients, and subject as described in [Complete the email configuration](send-email-dataflow-gen2.md#complete-the-email-configuration).

### Write the table in the action

1. Select your **Send email** action query in **Queries**.
1. In the formula bar, set the `Body` field of the action's message record to your navigation table expression. Preserve the connection, recipients, subject, and other message fields.

Both methods use a table value as **Body**. Don't paste M into **Enter a value**, which treats its input as literal text.

### Run and inspect the message

Review the recipients, subject, and staging or destination settings before running the dataflow. Then follow [Run and verify delivery](send-email-dataflow-gen2.md#run-and-verify-delivery). For the minimal example, the email contains an opening paragraph and a three-row sales table. A query preview alone doesn't confirm successful rendering or delivery.

## Minimal example

`PartType` and `Data` are the only required columns. When you leave out the other columns, the email uses the default layout and styling.

```powerquery-m
let
    SalesSummary = #table(
        type table [Region = text, Orders = Int64.Type, Revenue = Currency.Type],
        {
            {"North", 42, 18500.50},
            {"South", 31, 14200.00},
            {"West", 55, 24900.75}
        }
    ),

    EmailBody = #table(
        type table [PartType = text, Data = any],
        {
            {"Text", "Here's the latest regional sales summary from the daily refresh."},
            {"Table", SalesSummary}
        }
    )
in
    EmailBody
```

## Quick reference

Use the following tables to find supported email parts and their properties.

### Part types at a glance

| Part type | Purpose | Can be inside a section | Multiple allowed | `Data` |
| --- | --- | :---: | :---: | --- |
| `Document` | Email-wide settings, such as the title and the formatting culture | No | No | Leave empty |
| `Header` | Banner at the top of the email with a title and subtitle | No | No | Leave empty |
| `Section` | Groups text and tables under a heading | No | Yes | Leave empty |
| `Text` | A paragraph of text, or a single formatted value such as a number or date | Yes | Yes | A single value |
| `Table` | A styled table of data, with an optional title and subtitle | Yes | Yes | A table |
| `Footer` | A short note at the bottom of the email | No | No | A single value |

> [!NOTE]
> `MultiStat` and `Chart` parts don't show in emails. You can keep them in a navigation table that you also use for other HTML reports: the email leaves them out without an error, so the email you receive can differ from a preview of the same report. They can be at the top level or inside a section, and the email doesn't check their `Properties` and `Data`. Any other unsupported part type causes an error.

### Properties by part type

| Property | `Document` | `Header` | `Section` | `Text` | `Table` | `Footer` |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| `Title` | ✓ | ✓ | ✓ | - | ✓ | - |
| `Subtitle` | - | ✓ | ✓ | - | ✓ | - |
| `Culture` | ✓ | - | - | - | - | - |
| `TableStyle` | - | - | - | - | ✓ | - |
| `MaxDepth` | ✓ | - | - | - | - | - |

`MaxDepth` controls whether the email shows the contents of lists, records, and tables in table cells. See [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells).

> [!IMPORTANT]
> Property names are case-sensitive. Write `Title`, `Subtitle`, `Culture`, `TableStyle`, and `MaxDepth` exactly as shown. The same rule applies to the `Name` and `Parent` values that link parts to sections. You can write column names, part types, and table style names in any case, but the documented casing is easier to read.

## Navigation table parts and properties

An email navigation table is a regular Power Query table. Each row describes one part of the email.

The row snippets in this section aren't standalone queries. Insert them into the rows of a `#table` expression with the column order shown in the following schema. Define any referenced table, such as `TerritorySales`, in the query or as another dataflow query. The [complete example](#complete-example) shows how the parts fit together.

### Navigation table columns

Use the following table type when you build an email navigation table:

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
| --- | :---: | --- |
| `Parent` | No | The `Name` of the section that contains this part. Leave it empty for parts that aren't inside a section. |
| `Name` | No | A unique name for the part. A section needs a name so that other parts can refer to it in `Parent`. Names also help identify a part in error messages. |
| `PartType` | Yes | The kind of part: `Document`, `Header`, `Section`, `Text`, `Table`, or `Footer`. The email accepts `MultiStat` and `Chart` parts but leaves them out. Any other value causes an error. |
| `Properties` | No | A record with settings for the part, such as its title. Leave it empty when the part has no settings. Each part type accepts only the properties listed for it; any other property causes an error. |
| `Data` | Yes | The content of the part. What you can put here depends on the part type. |

The email ignores any other columns in the table.

### How parts are arranged in the email

You can list the parts in any order. Dataflow Gen2 arranges the email as follows:

- The `Header`, if present, is always at the top, and the `Footer` is always at the bottom.
- The `Document` settings apply to the whole email, wherever the row appears.
- All other parts appear in the order of their rows.
- Each section appears where its row is, with its heading followed by the parts that name it as their `Parent`. Those parts keep their relative order.

The email keeps line breaks and extra spaces in titles, subtitles, text, and table cells, so text that spans several lines or uses spaces for alignment looks the same in the email.

### Document part

The `Document` part holds settings for the whole email. It doesn't display anything by itself. An email can have at most one `Document` part.

| Property | Default | Description |
| --- | --- | --- |
| `Title` | The `Header` title, or a generic title | The title of the email document. It doesn't set the email's subject; set the subject in the **Send email** action. |
| `Culture` | The culture of the environment | Controls how numbers, dates, and times are formatted, and tells email apps which language the email is in. It doesn't translate any text. |
| `MaxDepth` | `0` | A whole number from `0` through `3` that controls how many nesting levels to display in table cells. At `0`, nested values remain placeholders. See [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells). |

Use a culture name such as `"en-US"`, `"fr-FR"`, `"de-DE"`, `"es-419"`, `"ja-JP"`, `"zh-Hans"`, or `"sr-Latn-RS"`. Use `""` to format values the same way regardless of language.

The following example sets the culture to German (Germany). The `Text` parts show a single date and time, and a currency amount, formatted for that culture.

```powerquery-m
let
    EmailParts = #table(
        type table [Parent = nullable text, Name = nullable text, PartType = text, Properties = nullable record, Data = any],
        {
            {null, null, "Document", [Title = "Daily operations report", Culture = "de-DE"], null},
            {null, null, "Text", null, #datetime(2026, 10, 28, 14, 30, 0)},
            {null, null, "Text", null, Value.ReplaceType(1234.5, Currency.Type)}
        }
    )
in
    EmailParts
```

The email shows `28.10.2026 14:30:00` and `1.234,50`. With `Culture = "en-US"`, the same values show as `10/28/2026 2:30:00 PM` and `1,234.50`.

### Header part

The `Header` part shows a banner at the top of the email with a large title and an optional subtitle. An email can have at most one `Header` part.

| Property | Description |
| --- | --- |
| `Title` | The main heading of the email. It's also used as the document title when the `Document` part doesn't set one. |
| `Subtitle` | A shorter line shown under the title. |

If you don't set a title or a subtitle, the header doesn't appear.

```powerquery-m
{null, null, "Header", [Title = "Daily sales report", Subtitle = "Automated summary from Dataflow Gen2"], null}
```

### Section part

A `Section` part groups text and tables under a heading. You can add multiple sections within the [navigation-table row limit](#limits), but you can't place sections inside other sections.

| Property | Description |
| --- | --- |
| `Title` | The section heading. |
| `Subtitle` | A short description shown under the section heading. |

To place parts in a section:

1. Give the section a unique `Name`, such as `"RegionalBreakdown"`.
1. Set `Parent` to `"RegionalBreakdown"` on each `Text` or `Table` part that belongs to the section.

If a section has no title or subtitle, its parts still appear together, but without a heading.

```powerquery-m
{null, "RegionalBreakdown", "Section", [Title = "Regional breakdown", Subtitle = "Completed orders by territory"], null},
{"RegionalBreakdown", null, "Text", null, "All territories met their daily targets."},
{"RegionalBreakdown", null, "Table", [TableStyle = "Teal"], TerritorySales}
```

### Text part

A `Text` part shows a paragraph. It can be at the top level of the email or inside a section, and it has no properties.

- `Data` can be text or a single value such as a number, date, time, or true or false value. Lists, records, and tables aren't allowed.
- If `Data` is empty, the email leaves out the part.
- The email shortens text that's longer than 10,000 characters.

```powerquery-m
{null, null, "Text", null, "The refresh completed without validation warnings."}
```

### Table part

A `Table` part shows a table of data as a styled table. It can be at the top level of the email or inside a section.

| Property | Default | Description |
| --- | --- | --- |
| `Title` | None | A heading shown above the table. |
| `Subtitle` | None | A short description shown between the title and the table. |
| `TableStyle` | `"Default"` | The look of the table. See [Table styles](#table-styles). |

How tables are displayed:

- **Alignment**: Columns with a numeric type, such as `Int64.Type`, `Currency.Type`, or `Percentage.Type`, are right-aligned. Other columns are left-aligned. To right-align a column of numbers, give the column a numeric type.
- **Empty tables**: A table without rows shows its title and subtitle, followed by the message *No data available.*
- **Special values**: Null cells show `null`, true and false values show `TRUE` and `FALSE`, and values that can't be shown as text, such as binary values or functions, show their kind in brackets, such as `[Binary]`.
- **Lists, records, and tables in cells**: By default, these show as `[List]`, `[Record]`, or `[Table]`. To show their contents, see [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells).
- **Size**: A table can have up to 25 columns. The email shows only the first 10,000 rows and shortens the text in a cell to 1,024 characters.

#### Table styles

Choose a style by name. If you don't set a style, the table uses `"Default"`.

| Style | Other names | Look |
| --- | --- | --- |
| `Default` | `Medium`, `Fluent` | Blue header with white text and banded rows |
| `Minimal` | | Plain header with an underline and no banding |
| `Light` | `Subtle` | Lightly shaded gray header and banded rows |
| `Banded` | `Striped` | Lightly shaded gray header, banded rows, and an outline |
| `Grid` | | Lightly shaded blue header with gridlines |
| `Accent` | | Lightly shaded blue header, banded rows, and an outline |
| `Dark` | `Executive` | Dark navy header with white text and banded rows |
| `Teal` | | Teal header with white text and banded rows |
| `Green` | `Success` | Green header with white text and banded rows |
| `Warm` | `Gold` | Gold header with white text and banded rows |
| `Warning` | | Lightly shaded gold header, banded rows, and an outline |
| `Danger` | `Alert` | Red header with white text and banded rows |

You can also use the numbered style names from the Office table style gallery: `TableStyleLight1` through `TableStyleLight21`, `TableStyleMedium1` through `TableStyleMedium28`, and `TableStyleDark1` through `TableStyleDark11`. Within each group of seven styles, the colors follow the Office palettes in this order: gray, blue, orange, slate, gold, navy, and green. The groups differ as follows:

| Styles | Look |
| --- | --- |
| `TableStyleLight1`–`7` | Lightly shaded header and banded rows |
| `TableStyleLight8`–`14` | Lightly shaded header, banded rows, and an outline |
| `TableStyleLight15`–`21` | Lightly shaded header, banded rows, and gridlines |
| `TableStyleMedium1`–`7` | Solid header with white text and banded rows |
| `TableStyleMedium8`–`14` | Solid header, banded rows, and gridlines |
| `TableStyleMedium15`–`21` | Solid header, banded rows, gridlines, and a bold first column |
| `TableStyleMedium22`–`28` | Lightly shaded header, banded rows, an outline, and gridlines |
| `TableStyleDark1`–`7` | Dark header with white text and banded rows |
| `TableStyleDark8`–`11` | Dark header, banded rows, and a bold first column, in gray, blue, gold, and green |

### Footer part

The `Footer` part shows a short note in smaller text at the bottom of the email. An email can have at most one `Footer` part, and it has no properties.

- `Data` can be text or a single value such as a number or date.
- If `Data` is empty, the email leaves out the footer.
- The email shortens text that's longer than 10,000 characters.

```powerquery-m
{null, null, "Footer", null, "Generated automatically by Dataflow Gen2."}
```

### Complete example

The following query builds an email with document settings, a header, two sections with text and tables, and a footer.

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

    DelayedShipments = #table(
        type table [OrderId = Int64.Type, Region = text, DaysDelayed = Int64.Type, Status = text],
        {
            {1042, "South", 3, "Carrier delay"},
            {1089, "East", 2, "Customs hold"}
        }
    ),

    EmailParts = #table(
        type table [
            Parent = nullable text,
            Name = nullable text,
            PartType = text,
            Properties = nullable record,
            Data = any
        ],
        {
            {null, null, "Document", [Title = "Daily fulfillment digest", Culture = "en-US"], null},
            {null, null, "Header", [Title = "Daily fulfillment digest", Subtitle = "Regional orders and shipping exceptions"], null},

            {null, "Overview", "Section", [Title = "Summary"], null},
            {"Overview", null, "Text", null, "Four regions reported activity today. Two shipments need follow-up."},
            {"Overview", null, "Table", [Title = "Revenue by region"], RegionalSales},

            {null, "Exceptions", "Section", [Title = "Shipping exceptions", Subtitle = "Orders delayed by two or more days"], null},
            {"Exceptions", null, "Table", [TableStyle = "Warning"], DelayedShipments},

            {null, null, "Footer", null, "This is an automated message. Contact Data Operations for help."}
        }
    )
in
    EmailParts
```

## Format values with types

The data types of your values control how numbers, currencies, percentages, dates, and times appear in the email. Keep values typed instead of converting them to text: the email formats them for the `Culture` of the `Document` part, and numeric table columns stay right-aligned.

### Where the type comes from

- **Table columns**: The column's type controls how values are formatted. For example, every value in a `Currency.Type` column appears as a currency amount. Every value must match its column's type; for example, the text `"N/A"` in a number column causes an error.
- **Text and Footer parts, and columns of type `any`**: Values are formatted by their own type. To give a single value a type, use `Value.ReplaceType`.

### How types are displayed

The examples use the `en-US` culture.

| Type | Display | Example |
| --- | --- | --- |
| Text | As written, with line breaks and spaces kept | `Quarterly summary` |
| Decimal number | Without thousands separators or trailing zeros | `1250.5` |
| Whole number, such as `Int64.Type` | Without thousands separators | `1250` |
| `Currency.Type` | With thousands separators and at least two decimal places, without a currency symbol | `1,250.50` |
| `Percentage.Type` | As a percentage, with at least two decimal places | `15.25%` |
| True/false | `TRUE` or `FALSE` | `TRUE` |
| Date | Short date with a four-digit year | `10/28/2026` |
| Time | Long time, including fractions of a second when present | `9:30:05 AM` |
| Date and time | Short date followed by long time | `10/28/2026 9:30:05 AM` |
| Date, time, and time zone | Date and time followed by the time zone offset | `10/28/2026 9:30:05 AM -07:00` |
| Duration | Days, hours, minutes, and seconds | `1.04:15:00` |

### Set the number of decimal places

To show a fixed number of decimal places, add the `NumericPrecisionBase` and `NumericScale` facets to a numeric type with `Type.ReplaceFacets`. Set `NumericPrecisionBase` to `10`, and set `NumericScale` to the number of decimal places you want, a whole number from `0` to `28`. The email rounds values to that many places.

For percentages, `NumericScale` applies to the percentage. For example, `0.156` with `NumericScale = 1` shows as `15.6%`.

```powerquery-m
let
    WholeCurrency = Type.ReplaceFacets(Currency.Type, [NumericPrecisionBase = 10, NumericScale = 0]),
    UnitPrice = Type.ReplaceFacets(Currency.Type, [NumericPrecisionBase = 10, NumericScale = 4]),
    OneDecimalPercent = Type.ReplaceFacets(Percentage.Type, [NumericPrecisionBase = 10, NumericScale = 1]),
    ThreeDecimals = Type.ReplaceFacets(Decimal.Type, [NumericPrecisionBase = 10, NumericScale = 3]),

    Costs = #table(
        type table [
            Item = text,
            Budget = WholeCurrency,
            UnitCost = UnitPrice,
            Yield = OneDecimalPercent,
            WeightKg = ThreeDecimals
        ],
        {
            {"Component A", 125000, 14.2356, 0.9842, 2.5},
            {"Component B", 84300, 8.9, 0.915, 0.875}
        }
    ),

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Table", [Title = "Production costs"], Costs}
        }
    )
in
    EmailParts
```

The first row shows `125,000`, `14.2356`, `98.4%`, and `2.500`, and all four numeric columns are right-aligned.

### Set the precision of times

To control how many digits of a second the email shows, add the `DateTimePrecision` facet to a time, date and time, or duration type. Use a number from `0` to `7`. With `0`, the email rounds values to the nearest second.

```powerquery-m
let
    WholeSeconds = Type.ReplaceFacets(DateTime.Type, [DateTimePrecision = 0]),
    Milliseconds = Type.ReplaceFacets(Duration.Type, [DateTimePrecision = 3]),

    Timings = #table(
        type table [Step = text, StartedAt = WholeSeconds, Elapsed = Milliseconds],
        {
            {"Extract", #datetime(2026, 10, 28, 14, 5, 9.6789), #duration(0, 0, 1, 4.12)},
            {"Transform", #datetime(2026, 10, 28, 14, 6, 13.2), #duration(0, 0, 0, 18.5)}
        }
    ),

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Table", [Title = "Step timings", TableStyle = "Grid"], Timings}
        }
    )
in
    EmailParts
```

The first row shows `10/28/2026 2:05:10 PM` and `0.00:01:04.120`.

### Format a single value

To format a value in a `Text` or `Footer` part, give it a type with `Value.ReplaceType`:

```powerquery-m
let
    OneDecimalPercent = Type.ReplaceFacets(Percentage.Type, [NumericPrecisionBase = 10, NumericScale = 1]),
    Attainment = Value.ReplaceType(0.9942, OneDecimalPercent),

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [Culture = "en-US"], null},
            {"Header", [Title = "Service level attainment"], null},
            {"Text", null, Attainment}
        }
    )
in
    EmailParts
```

The `Text` part shows `99.4%`.

## Customize how values look with metadata

You can change how an individual value looks by attaching an `Html` record to it with the `meta` keyword, for example, `"SELECT 1" meta [Html = [TextStyle = "Code"]]`.

### Where metadata applies

The email reads metadata on:

- The value of a `Text` or `Footer` part.
- Values in table columns of type `any`.
- Items in a list and fields in a record, when the list or record appears in a table cell. See [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells).

> [!IMPORTANT]
> The email ignores metadata on the value of a cell when the cell's column has a specific type, such as `text`, `number`, or `list`. To use metadata on a cell's value, give the column the type `any`, for example, `type table [Query = any]`. Items in a list inside such a cell still use their own metadata.

### Metadata settings

The `Html` record supports the following settings. Names and values are case-sensitive. Any other setting in the `Html` record causes an error.

| Setting | Applies to | Values | Default |
| --- | --- | --- | --- |
| `TextStyle` | Single values, such as text, numbers, and dates | `"Plain"` or `"Code"` | `"Plain"` |
| `ListStyle` | Lists | `"Unordered"` (bullets) or `"Ordered"` (numbers) | `"Unordered"` |

With `TextStyle = "Code"`:

- **Text** appears as a code block in a monospace font, with its line breaks and indentation kept. Use it for code, such as SQL or JSON.
- **Other values**, such as numbers, dates, or true and false values, appear inline in a monospace font. Use it for IDs, timestamps, or status values.

For `ListStyle`, see [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells).

### Example: show a code block

The following query displays SQL as text in the email; it doesn't execute the SQL.

```powerquery-m
let
    Query = Text.Combine(
        {
            "SELECT Region, COUNT(*) AS OrderCount",
            "FROM dbo.DailyOrders",
            "WHERE Status = 'Pending'",
            "GROUP BY Region;"
        },
        "#(lf)"
    ) meta [Html = [TextStyle = "Code"]],

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Header", [Title = "Pending orders check"], null},
            {"Text", null, "This query was used for the check:"},
            {"Text", null, Query}
        }
    )
in
    EmailParts
```

### Example: show code in a table

The `RuleId`, `Passed`, and `Check` columns have the type `any`, so the email uses their metadata.

```powerquery-m
let
    AsCode = (value) => value meta [Html = [TextStyle = "Code"]],

    Rules = #table(
        type table [RuleId = any, Rule = text, Passed = any, Check = any],
        {
            {AsCode(101), "Positive quantity", AsCode(true), AsCode("Quantity > 0")},
            {AsCode(102), "Region is set", AsCode(false), AsCode("Region <> null")}
        }
    ),

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Header", [Title = "Data quality rules"], null},
            {"Table", [Title = "Rule results", TableStyle = "Light"], Rules}
        }
    )
in
    EmailParts
```

The rule IDs and `TRUE`/`FALSE` values appear inline in a monospace font, and each check appears in a code block.

## Show lists and nested tables in cells

By default, a list, record, or table in a table cell shows as `[List]`, `[Record]`, or `[Table]`. To show its contents, add the `MaxDepth` property to the `Document` part and set it to the number of nesting levels to show. For example, `MaxDepth = 1` shows a list in a cell, `MaxDepth = 2` also shows lists inside that list, and `MaxDepth = 3` shows one more level. Anything nested deeper still shows as a placeholder. `MaxDepth` can be from `0` (the default) to `3`, which keeps the email readable on small screens.

When the email shows the contents:

- **Lists** appear as bulleted lists, or as numbered lists when they have `ListStyle = "Ordered"` metadata.
- **Nested lists**: A list inside a list becomes a sublist of the item before it. Each sublist can have its own `ListStyle`.
- **Tables** inside a cell appear as compact tables, in a lighter version of the outer table's style.
- **Records** appear as field names, each followed by its value.

The following example shows lists nested up to three levels deep, and a table with a nested list inside a cell. The `Steps` column has no specific type, so the email uses the `ListStyle` metadata.

```powerquery-m
let
    Ordered = (list as list) => list meta [Html = [ListStyle = "Ordered"]],

    Steps = #table({"Levels", "Steps"}, {
        {"1", {"Build", "Test", "Deploy"}},
        {"2", {"Build", Ordered({"Compile", "Link"}), "Test"}},
        {"3", Ordered({"Prepare", {"Tag the build", Ordered({"Major", "Minor"})}, "Deploy"})},
        {"In a table", #table({"Stage", "Tasks"}, {{"Verify", {"Dashboards", Ordered({"Latency", "Errors"})}}})}
    }),

    EmailParts = #table(
        type table [PartType = text, Properties = nullable record, Data = any],
        {
            {"Document", [MaxDepth = 3], null},
            {"Table", [Title = "Release steps"], Steps}
        }
    )
in
    EmailParts
```

The `Steps` cell in the row with three levels appears as:

1. Prepare
   - Tag the build
     1. Major
     1. Minor
1. Deploy

The last row needs all three levels too: the table in the cell is one level, its list is the second, and the sublist is the third.

Limits for values in cells:

- The column and row limits of a table apply only to the table of each `Table` part. Tables inside its cells aren't limited to 25 columns or shortened to 10,000 rows.
- The email shortens text in cells, including cells of tables inside cells, to 1,024 characters.
- Everything the email shows counts toward the email size limit.

If the email isn't sent:

- *Part ... property 'MaxDepth' must be null or a whole number from 0 through 3*: Set `MaxDepth` to a whole number from `0` through `3`, or use `null` for the default.
- *Part ... needs at least ... rows, list items and record fields, nested ones included*: The table and the values in its cells have more content than fits in one email. Filter the data, or lower `MaxDepth` so that nested values show as placeholders.

## Limits and troubleshooting

Review the limits before adding large tables or nested values. The following troubleshooting guidance covers common navigation-table and staging errors.

### Limits

The navigation-table row limit counts email parts. The column and row limits for a `Table` part apply to its top-level data table; [nested values have separate handling](#show-lists-and-nested-tables-in-cells).

| Item | Limit | When the limit is exceeded |
| --- | --- | --- |
| Rows in the navigation table | 512 | The email isn't sent. Combine parts or split the content into several emails. |
| Columns in each `Table` part's data table | 25 | The email isn't sent. Remove columns you don't need before you add the table. |
| Rows in each `Table` part's data table | 10,000 | The email shows only the first 10,000 rows. |
| Text in a table cell | 1,024 characters | The email shortens the text. |
| Text in a `Text` or `Footer` part | 10,000 characters | The email shortens the text. |
| Style rules for the different table styles in one email | 16,384 characters | The email isn't sent. Use fewer different table styles. Most emails can use more than a dozen different styles. |
| Email size | 5 MiB (5,242,880 bytes) | The email isn't sent. Use fewer rows, parts, or shorter text. |

> [!IMPORTANT]
> When the email shortens rows or text, it doesn't indicate that anything is missing. If your data can exceed these limits, filter or summarize it before you add it to the email, for example, by sending the top rows and a total.

Some email apps shorten long emails and show a link to view the whole message. To reduce this risk, keep emails short, for example, by sending a summary instead of every row.

### Common issues

| Issue | Cause | Solution |
| --- | --- | --- |
| *A table Body must have the columns 'PartType' and 'Data' to be sent as an HTML email.* | The table in **Body** isn't a navigation table. | To send a table of data, add it as a `Table` part, for example, `#table({"PartType", "Data"}, {{"Table", YourTable}})`. |
| Error **101294**: **Body** references a query enabled for staging. | The navigation table query has staging enabled. | In **Queries**, right-click the navigation table query and clear **Enable staging**. |
| The dataflow has no query to load. | It contains only email actions and unstaged queries without destinations. | Enable staging on a query other than the body query, or configure a data destination. Keep staging disabled on the body query. |
| *Part ... has unknown property ...* | A part has a property that its part type doesn't support, or the property name has different casing. | Check [Properties by part type](#properties-by-part-type) and write property names exactly as shown. |
| *Part ... references Parent ..., which does not name any part.* | The `Parent` value doesn't match the `Name` of a section. | Make sure the section has a `Name`, and use exactly the same value, with the same casing, in `Parent`. |
| *Part ... must have a null Parent.* | A `Document`, `Header`, `Section`, or `Footer` part has a `Parent`. | Only `Text`, `Table`, `MultiStat`, and `Chart` parts can be inside a section. Clear `Parent` on the other parts. |
| *At most one ... part is allowed* | The table has more than one `Document`, `Header`, or `Footer` part. | Keep only one of each. Use sections, text, and tables for repeated content. |
| *Part ... has ... columns; the limit is 25.* | A table has more than 25 columns. | Remove columns you don't need with `Table.SelectColumns`, or split the table into several tables. |
| *The declared type is ..., but the value is ...* | A value in a table doesn't match its column's type. | Clean or convert the column's values, for example, with **Change type** or **Replace errors**, before you add the table. |
| The refresh fails because of an error in a table cell. | A value in the table couldn't be calculated, for example, because of a division by zero. | Replace errors in the source query, for example, with **Replace errors**. |
| A cell shows `[List]`, `[Record]`, or `[Table]`. | By default, the email doesn't show the contents of lists, records, and tables in cells. | See [Show lists and nested tables in cells](#show-lists-and-nested-tables-in-cells). |

## Related content

- [Send email from Dataflow Gen2 (preview)](send-email-dataflow-gen2.md)
- [HTML document builder](dataflow-document-builder-html.md)
- [Create HTML report files with navigation tables](dataflow-data-destinations-html-advanced.md)
