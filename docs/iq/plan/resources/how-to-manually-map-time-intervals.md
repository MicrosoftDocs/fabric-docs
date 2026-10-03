---
title: Configure Time Interval Mapping for Custom Date Fields
description: Map date fields manually when time intelligence detection fails. Learn how to configure Time Interval Settings, define format patterns, and fix unrecognized dates.
ms.date: 10/01/2026
ms.topic: how-to
---

# Configure time interval mapping for custom date fields

Fabric Planning's time intelligence automatically identifies date hierarchy levels from field names, field values, and their position in the hierarchy.

If the assigned fields don't match a recognized date format, such as when you use custom date fields, the planning sheet displays the following message:

``` text
**Time intelligence couldn’t be detected**
The date hierarchy or labels in this visual don’t match a recognized format.
```

This message can appear when:

- A field uses an organization-specific label such as `XX/2025`.
- A value contains a custom prefix, suffix, or separator.
- Multiple date components are combined in one field.
- The field name doesn't clearly identify its time level.
- Values within the same field use different formats.
- Planning can't determine whether a numeric value represents a year, half-year, quarter, month, week, or day.

When automatic detection fails, manually map the affected fields by using **Time Interval Settings**.

## Open time interval settings

Open the time interval mapping settings by following these steps:

1. Select the **Settings** button next to **Explore Model**.
1. Select **Time Interval Settings**.
1. Select **Add Dimension**.
1. Under **Table**, select the semantic-model table containing the date field.
1. Under **Dimension**, select the field you want to map.
1. Under **Interval**, select the time level represented by the field:
   - Year
   - Half Year
   - Quarter
   - Month
   - Week
   - Day
1. Under **Format**, enter a pattern that matches the values in that field.
1. Repeat these steps for each field that requires manual mapping.
1. Select **Save**.

The selected interval tells planning how to interpret the field. For example, selecting **Quarter** means that the changing quarter component in each value should be interpreted as a quarter.

## Define the format pattern

A format pattern contains:

- **Variable date components**, which change between members.
- **Fixed text**, which stays the same in every member.

Use the corresponding date placeholder for every component that changes. Enter text that never changes directly into the pattern.

For example, suppose a Year field contains:

```text
XX/2024
XX/2025
XX/2026
```

The matching format is:

```text
XX/YYYY
```

In this format:

- `XX/` is fixed text.
- `YYYY` represents the changing four-digit year.

Planning expects the fixed text to appear exactly as entered. A value such as `YY/2025` doesn't match `XX/YYYY`.

> [!IMPORTANT]
>
> Represent every part that changes between members with a date placeholder. Enter fixed text only for text that remains identical in every value.

## Supported date placeholders

| Date component | Placeholder | Example values |
|---|---|---|
| Four-digit year | `YYYY` | `2024`, `2025` |
| Two-digit year | `YY` | `24`, `25` |
| Half-year | `H` or `HH` | `1`, `2`, `01`, `02` |
| Quarter | `Q` or `QQ` | `1`, `4`, `01`, `04` |
| Numeric month | `M` or `MM` | `1`, `12`, `01`, `12` |
| Short month name | `MMM` | `Jan`, `Feb`, `Dec` |
| Full month name | `MMMM` | `January`, `February`, `December` |
| Week | `W` or `WW` | `1`, `53`, `01`, `53` |
| Day of month | `D` or `DD` | `1`, `31`, `01`, `31` |
| Short weekday name | `DDD` | `Mon`, `Tue`, `Sun` |
| Full weekday name | `DDDD` | `Monday`, `Tuesday`, `Sunday` |

A weekday name doesn't identify a unique date by itself. Use it only when the value contains enough information to determine the calendar date.

## Use fixed text and separators

Fixed content can include:

- Prefixes such as `FY`, `Q`, `Period`, or `Week`
- Suffixes
- Spaces
- Hyphens
- Slashes
- Underscores
- Parentheses
- Organization-specific text

Fixed content must match the field values exactly.

| Sample field values | Interval | Format structure |
|---|---|---|
| `XX/2024`, `XX/2025` | Year | `XX/YYYY` |
| `FY2024`, `FY2025` | Year | Fixed `FY` followed by `YYYY` |
| `FY 24`, `FY 25` | Year | Fixed `FY ` followed by `YY` |
| `H1-2025`, `H2-2025` | Half Year | Fixed `H`, Half-Year, fixed `-`, Year |
| `Q1 FY 24`, `Q2 FY 24` | Quarter | Fixed `Q`, Quarter, fixed ` FY `, Year |
| `2025-Q1`, `2025-Q2` | Quarter | Year, fixed `-Q`, Quarter |
| `2025-01`, `2025-02` | Month | `YYYY-MM` |
| `Jan 2025`, `Feb 2025` | Month | `MMM YYYY` |
| `2025-W01`, `2025-W02` | Week | Year, fixed `-W`, Week |
| `2025-01-31` | Day | `YYYY-MM-DD` |
| `Date_2025-01-31` | Day | Fixed `Date_` followed by `YYYY-MM-DD` |

> [!NOTE]
>
> Letters such as `Q`, `H`, `W`, and `FY` can also be fixed text in the displayed value. Include them in the format along with the placeholder representing the changing number.

For example, the value:

```text
Q1 FY 24
```

contains:

- Fixed text: `Q`
- Changing Quarter: `1`
- Fixed text: ` FY `
- Changing Year: `24`

## Map composite fields

A composite field contains more than one date component in the same value.

Examples include:

- `2025-Q1`
- `Q1 FY 25`
- `Jan 2025`
- `2025-W01`
- `2025-01-31`

To map a composite field:

1. Select the interval representing the field’s reporting granularity.
1. Include every changing date component in the format.
1. Include fixed text and separators exactly as they appear.
1. Use one consistent structure for every value in the field.

For example, map these values as **Quarter**:

```text
2025-Q1
2025-Q2
2025-Q3
2026-Q1
```

The format must identify:

- The changing four-digit Year.
- The fixed `-Q` text.
- The changing Quarter number.

The Year component identifies the reporting year, while the Quarter component identifies the quarter within that year.

> [!IMPORTANT]
>
> A composite member can contain only one value for each hierarchy level. Period ranges such as `2025-2026`, `Q1-Q2`, and `Jan-Mar` aren't supported.

## Keep field formats consistent

Every value in a mapped field must follow the same structure.

Don't mix formats such as:

```text
2025-Q1
Q2 FY 25
Quarter 3 2025
```

Standardize the values instead:

```text
2025-Q1
2025-Q2
2025-Q3
```

Spaces, punctuation, prefixes, and zero-padding are significant. For example, the following values use different structures:

- `Q1`
- `Q 1`
- `Q-1`
- `Q01`

The configured format must match the structure used by the entire field.

## Map separate hierarchy fields

When you store Year, Quarter, Month, and Day in separate fields, add a mapping for each field that Planning can't detect automatically.

| Table | Dimension | Interval | Example format |
|---|---|---|---|
| Date | Fiscal Year Label | Year | `FY YYYY` |
| Date | Fiscal Quarter Label | Quarter | `Quarter Q` |
| Date | Fiscal Month Label | Month | `MMM` |
| Date | Fiscal Day Number | Day | `DD` |

Arrange the mapped fields in the visual from broadest to most detailed:

```text
Year
  → Half Year
    → Quarter
      → Month
        → Day
```

You don't need to include every level. However:

- Keep the selected levels in chronological order.
- Include Year when the visual spans multiple years.
- Place Month above Day for predictable daily calculations.
- Avoid mixing calendar and fiscal fields in the same hierarchy.

## Validate the mapping

After saving the mapping:

1. Return to the visual.
1. Confirm that the detection message no longer appears.
1. Verify that periods are sorted chronologically.
1. Test drill-down through every hierarchy level.
1. Confirm that time-intelligence calculations return the expected periods.
1. Test year-end, fiscal-year, week 53, leap-year, and month-end boundaries.

## Troubleshooting

### The field is still not recognized

Confirm that:

- You selected the correct table and dimension.
- The assigned interval matches the field’s intended meaning.
- The format represents every changing component.
- Fixed prefixes, suffixes, spaces, and separators match exactly.
- Every value in the field follows the same structure.

### Some members are missing

Compare the missing values with the configured format. An extra space, different separator, missing prefix, or inconsistent zero-padding can prevent a value from matching.

### A composite value maps to the wrong period

Ensure the format includes every changing date component. For example, `2025-Q1` must identify both Year and Quarter. Omitting Year can make the period ambiguous.

### Values contain optional or inconsistent text

Standardize the source field before mapping it. One format should not be expected to match multiple unrelated structures.

### The hierarchy is mapped but ordered incorrectly

Manual mapping identifies what each field represents; it doesn't correct a reversed hierarchy. Reorder the visual fields from the broadest period to the most detailed period.
