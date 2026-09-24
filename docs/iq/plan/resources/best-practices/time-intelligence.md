---
title: Best Practices and Supported Date Formats for Time Intelligence Hierarchies
description: Date formatting for time intelligence determines whether your hierarchy is recognized. Review supported year, quarter, month, week, and day formats before you build reports.
ms.date: 07/25/2026
ms.topic: best-practice
---

# Best practices and supported date formats for automatic time intelligence

Time intelligence automatically recognizes the date fields you assign to a visual and interprets them as a date hierarchy (for example, Year → Quarter → Month → Day). After planning detects a date/time hierarchy, it maps each member to the corresponding calendar period. Use the hierarchy for time intelligence calculations such as year-to-date (YTD), prior period, next N periods, and period-over-period comparisons.

This article helps report developers understand the time hierarchies that planning detects:

* Supported hierarchy levels
* Accepted text and numeric label formats
* Supported composite (multi-part) labels
* Valid hierarchy orderings
* Unrecognized labels along with recommendations to resolve them

Time intelligence automatically detects the hierarchy without additional configuration when the labels follow one of the supported formats described in this article.

## How planning detects a time hierarchy

Time intelligence identifies the date hierarchy by using the following order of precedence:

* **Explicit configuration:** If you explicitly map a field to a time hierarchy level and label format, that mapping takes precedence over all other detection methods.
* **Field name:** If no explicit mapping exists, time intelligence examines the field name. Time intelligence maps names that contain terms such as Year, Yr, Half Year, Half, Quarter, Qtr, Month, Week, or Day to the corresponding hierarchy level.
* **Field values:** If the field name isn't sufficient to determine the hierarchy level, time intelligence analyzes the member values (labels) and matches them against the supported formats and keywords described in this article.

After time intelligence identifies the hierarchy levels, it interprets each level in the context of its parent level. For example, a **Quarter** under **Year** is interpreted as a quarter within that year, and a **Day** under **Month** is interpreted as a day within that month. This contextual relationship enables accurate time-based calculations across the hierarchy.

## Best practices for importing date and time fields

* Use one period per member. Each year member should contain a single year, each quarter a single quarter, and so on. Avoid ranges such as 2025-2026 or Q1-Q2.
* Keep formats consistent within a level. Don't mix Jan and 1, or Q1 and Quarter 1, in the same field.
* Order levels from broad to granular. Always place Year at the top, followed by Half Year or Quarter, then Month or Week, then Day.
* Name your fields clearly. Field names that include Year, Quarter, Month, Week, or Day help the product recognize levels immediately.
* Prefer standard hierarchies. The built-in Power BI date hierarchy (Year → Quarter → Month → Day) is fully supported and is the most reliable choice.
* Prefer separate levels over composite labels. Splitting periods into their own fields is clearer and easier to maintain than packing multiple periods into one label.
* Use ISO dates for day-level fields. When a field holds full dates, format them as YYYY-MM-DD (optionally with a 00:00:00 time component).
* Include a Month level before Day. When you need daily granularity, keep a Month level between the parent period and the Day level for the most predictable results.

## Supported hierarchy levels

If your data uses the following formats, time intelligence detects your time hierarchy automatically without any explicit configuration.

| Hierarchy level | Description | Unsupported formats |
|-----------------|-------------|---------------------|
| **Year** | A single calendar or fiscal year represented as a four-digit or two-digit value. Time intelligence interprets two-digit years as belonging to the current century. For example, it interprets 26 as 2026. | 2025-2026 (time intelligence doesn't support year ranges), 25-26, FY26A |
| **Half Year** | One of the two halves of a year. | 3, H3, First Half (spelled-out words) |
| **Quarter** | One of the four quarters of a year. | Q5, Q0, 5 |
| **Month** | A calendar month represented by numbers 1 to 12, full month names, or standard three-letter abbreviations. | 13, 0, Sept |
| **Week** | A week within a year, represented by week numbers 1 to 53. | 0, 54, WK1 (time intelligence doesn't support the WK prefix) |
| **Day** | A day within a month or a complete date. | 32, 01/02/2026, Feb 1, 2026, 01-Feb-2026 |

## Supported formats

The following tables list supported label formats for each level. Formats are case-insensitive. For example, time intelligence accepts *january*, *January*, and *JANUARY*.

### Year formats

| Four-digit year                    | 2025    |
| ---------------------------------- | ------- |
| Two-digit year                     | 25      |
| FY + four-digit year               | FY2025  |
| FY + two-digit year                | FY25    |
| FY  + four-digit year (with space) | FY 2025 |
| FY  + two-digit year (with space)  | FY 25   |

### Half-year formats

| Format       | Examples |
| ------------ | -------- |
| Single digit | 1, 2     |
| H prefix     | H1, H2   |
| Two digit    | 01, 02   |

### Quarter formats

| Format           | Examples             |
| ---------------- | -------------------- |
| Single digit     | 1, 2, 3, 4           |
| Q prefix         | Q1, Q2, Q3, Q4       |
| Two digit        | 01, 02, 03, 04       |
| Qtr prefix       | Qtr1, Qtr2           |
| Qtr  + space     | Qtr 1, Qtr 2         |
| Quarter  + space | Quarter 1, Quarter 2 |

### Month formats

| Format              | Examples                    |
| ------------------- | --------------------------- |
| Single-digit number | 1, 9, 12                    |
| Two-digit number    | 01, 09, 12                  |
| Short name          | Jan, Feb, Dec               |
| Full name           | January, February, December |

### Week formats

| Format                    | Examples         |
| ------------------------- | ---------------- |
| Single or multi-digit number | 1, 9, 53         |
| Two-digit number          | 01, 09, 53       |
| W prefix                  | W1, W9, W53      |
| W + two digit             | W01, W09, W53    |
| Week  + number            | Week 1, Week 53  |
| Week  + two digit         | Week 01, Week 09 |

### Day formats

| Format                    | Examples            |
| ------------------------- | ------------------- |
| Single-digit day          | 1, 9, 31            |
| Two-digit day             | 01, 09, 31          |
| ISO date                  | 2025-02-01          |
| ISO date with time        | 2025-02-01 00:00:00 |
| ISO date with T separator | 2025-02-01T00:00:00 |

> [!NOTE]
> Several levels share the same numeric labels. For example, 1 can represent a half-year, quarter, month, week, or day. Time intelligence resolves ambiguity by using the field name and the parent level in the hierarchy. Keeping levels clearly named and correctly ordered ensures the right interpretation.

## Supported composite formats

A composite label packs more than one period into a single member value. For example, it combines a quarter and a year together in one label. You can use composite labels when you map the field to a matching label format.

> [!TIP]
> For standard reporting, choose a clean multilevel hierarchy (each level in its own field) over packing several periods into one label. Reserve composite labels for preformatted source data where a single column already contains the full period description.

For every composite label:

* Describe the parts clearly. Extract each recognizable part, such as year, quarter, or month, and use it to place the member on the correct period.
* Provide consistent examples. All members of the same field should follow the same composite structure.

Common composite patterns include:

| Composite                      | Example values    | Recognized parts                  |
| ------------------------------ | ----------------- | --------------------------------- |
| Quarter + Year                 | Q1-FY24, Q1 FY 24 | Quarter and Year                  |
| Full date (Year + Month + Day) | 2025-02-01        | Year, Month, and Day in one label |

> [!NOTE]
> A composite label can contain at most one value per level. It can't contain a range (such as two years or two quarters) in a single member.

## Supported hierarchy patterns

Hierarchies must always flow from the broadest time bucket down to the smallest granular bucket.

> [!NOTE]
> If you place a Day column directly under a Quarter or Half Year without a Month column in between, time intelligence counts days relative to the start of that quarter. Always insert a Month layer above your days to keep your visuals predictable.

✅ Valid top-to-bottom paths:

* Year
* Year → Half Year
* Year → Quarter
* Year → Month
* Year → Week
* Year → Half Year → Quarter
* Year → Half Year → Month
* Year → Half Year → Week
* Year → Quarter → Month
* Year → Quarter → Week
* Year → Month → Week
* Year → Month → Day
* Year → Week → Day
* Year → Quarter → Month → Day
* Time intelligence also fully supports a standalone date column (for example, 2026-02-01).

❌ Invalid hierarchies that can cause calculation errors:

* Quarter → Year (Reversed)
* Month → Quarter (Reversed)
* Day → Month
* Day → Year
* Week → Month

## Accepted date strings

When the product inspects field values, it recognizes the following text keywords by name. All of these keywords are case-insensitive.

### Years

* 2025 (four-digit)
* 25 (two-digit, read as the current century)
* FY2025, FY 2025, FY25, FY 25

### Half Years

* H1, H2

### Quarters

* Q1, Q2, Q3, Q4
* Qtr 1, Qtr 2, Qtr 3, Qtr 4
* Qtr_1, Qtr_2, Qtr_3, Qtr_4
* Qtr-1, Qtr-2, Qtr-3, Qtr-4
* Quarter 1, Quarter 2, Quarter 3, Quarter 4
* Quarter_1, Quarter_2, Quarter_3, Quarter_4

### Months

* Short names: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
* Full names: January, February, March, April, May, June, July, August, September, October, November, December

### Weeks

* Week 1 through Week 53
* Week_1 through Week_53
* W1 through W53

### Field-name keywords

Time intelligence identifies hierarchy levels from field names by recognizing the following keywords: Year, Yr, Half Year, Half, Quarter, Qtr, Month, Week, and Day.

## Unsupported formats

Time intelligence doesn't recognize the following formats. In each case, it can't determine which period the label refers to, so it leaves the member out of the date hierarchy.

| Unsupported label | Reason |
|-------------------|--------|
| **22-23** | Contains two years in a single member. Each member must represent exactly one period. |
| **2025-2026** | Represents a range spanning multiple years. Time intelligence doesn't support year ranges. |
| **Q5**, **Q0** | Valid quarters are **Q1** through **Q4**. |
| **Month 13**, **0** | Valid months are **1** through **12**. |
| **Week 54**, **0** | Valid weeks are **1** through **53**. |
| **Day 32**, **0** | Valid days are **1** through **31**. |
| **Sept** | Time intelligence recognizes only the standard **Sep** abbreviation or the full month name (**September**). |
| **WK1** | Time intelligence doesn't support the **WK** prefix. Use **W1** or **Week 1** instead. |
| **First Half**, **Half 1** | Time intelligence doesn't recognize spelled-out half-year formats. Use **H1** or **H2**. |
| **01/02/2025**, **Feb 1, 2025**, **01-Feb-2025** | Time intelligence recognizes only ISO 8601 date format (`2025-02-01`) at the **Day** level. |
| Mixed label formats (for example, **Jan** and **1** in the same field) | All members at a hierarchy level must use a consistent label format. |
| Reversed hierarchy order (for example, **Quarter** above **Year**) | Hierarchy levels must go from the broadest level to the most granular level. |

## Examples

A standard four-level hierarchy. Time intelligence interprets it as 1 January 2025, within Q1 2025.

| Level   | Sample member |
| ------- | ------------- |
| Year    | 2025          |
| Quarter | Q1            |
| Month   | Jan           |
| Day     | 01            |

A fiscal-year hierarchy

| Level     | Sample member |
| --------- | ------------- |
| Year      | FY2025        |
| Half Year | H1            |
| Month     | January       |

A single full-date field

| Level | Sample members                     |
| ----- | ---------------------------------- |
| Day   | 2025-02-01, 2025-02-02, 2025-02-03 |

Each value already identifies a specific day, so no extra levels are necessary.

A composite quarter-and-year field: Both the quarter and the year come from each label.

| Sample members                         |
| -------------------------------------- |
| Q1 FY 24, Q2 FY 24, Q3 FY 24, Q4 FY 24 |

## Troubleshooting

### Time intelligence doesn't detect my hierarchy.

Check that each field uses one of the accepted formats listed earlier and that all members of a level use the same format. Rename the field to include a recognizable keyword, such as Year or Month, so time intelligence identifies the level. Confirm that the values fall within the valid range for the level (Quarters 1–4, Months 1–12, Weeks 1–53, Days 1–31).

### Time intelligence detects the hierarchy in the wrong order.*

Arrange levels from broadest to most granular (Year at the top, Day at the bottom). Reorder the fields so that each level sits above its subdivisions.

### A member is missing or ignored.

This problem usually means the label falls outside the supported range or uses an unsupported format. For example, Q5, Week 54, Sept, or a range such as 22-23. Correct the label to a supported value or format.

### Time intelligence doesn't parse a composite date correctly.

Ensure every member of the field follows the same composite structure and that each period part is in a supported format. A composite label can hold only one value per level and can't contain a range.

### Two-digit years land in the wrong century. 

Time intelligence interprets two-digit years within the current century. For example, 24 becomes 2024. If you need a specific century, use the full four-digit year.

### Days appear under the wrong month. 

When a Day level sits directly under a Quarter or Half Year without a Month level, time intelligence measures days from the start of that parent period. Add a Month level above Day for accurate placement.
