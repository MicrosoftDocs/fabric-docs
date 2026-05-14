---
title: Configure rules using IF conditions in conditional formatting
description: Learn how to configure conditional formatting rules using IF conditions in planning sheets to apply custom logic, nested conditions, and advanced formatting behavior.
ms.date: 05/04/2026
ms.topic: how-to
#customer intent: As a user, I want to understand configure conditional formatting rules using IF conditions in planning sheets.
---
# Configure rules using IF conditions in conditional formatting

When creating conditional formatting rules, you can choose from three **Format by** options that determine how formatting is applied. This article explains the configuration of rules in conditional formatting using IF conditions in detail. Refer to [create rules in conditional formatting](planning-how-to-create-rules-conditional-formatting.md) to know about it.

## Prerequisites

* You have access to a planning sheet.
* Creating a rule in conditional formatting.

## Format by Rules (If conditions)

In the **Format by** dropdown, select **Rules (If conditions)** to configure rule-based conditional formatting based on one or more logical conditions. Format cells using font styles, colors, borders, icons, or background highlights when specified conditions are met.

### Configure formatting styles

In the **Style** section, define how data should appear when conditions are met:

* **Font style** – Apply bold, italic, or underline
* **Font color** – Change text color
* **Cell background** – Highlight cells with color
* **Borders** – Add custom borders
* **Icons or text** – Display indicators or symbols
* **Hide values** – Mask sensitive data when conditions are met

You can also:

* Align icons within cells
* Display only icons or text (hide values)
* Apply formatting to charts or labels where applicable.

    :::image type="content" source="media/planning-how-to-format-rules-conditional-formatting/formatting-style.png" alt-text="Screenshot of formatting style." lightbox="media/planning-how-to-format-rules-conditional-formatting/formatting-style.png":::

### Define rule conditions

Use the **Conditions** section to specify when formatting is applied. You can combine multiple conditions using **AND/OR** logic.

Each condition contains the following components:

| Setting          | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Measure or field | Select the measure or column to evaluate.                                                         |
| Operator         | Define the comparison logic, such as *Greater than*, *Less than*, or *Equal to*.                  |
| Condition type   | Specify the comparison source, such as **Number**, **Data selection**, **Value**, or **Formula**. |
| Value            | Enter the comparison value or select a reference.                                                 |

Supported condition types include:

* **Number** - Apply formatting based on numeric thresholds.
* **Data selection** - Reference another cell value dynamically.
* **Value -** Compare against another measure or column.
* **Formula** - Use expressions combining measures and values.
* **User selection** - Apply formatting dynamically based on runtime user interaction.

    :::image type="content" source="media/planning-how-to-format-rules-conditional-formatting/configure-conditions.png" alt-text="Screenshot of configuring conditions." lightbox="media/planning-how-to-format-rules-conditional-formatting/configure-conditions.png":::


### Nested conditions

Advanced conditional formatting can be done by selecting **Add Condition.**

* Add multiple conditions and combine them using **AND/OR** logic.
* Apply complex business rules across dimensions.

    :::image type="content" source="media/planning-how-to-format-rules-conditional-formatting/nested-conditions.png" alt-text="Screenshot of configuring nested conditions." lightbox="media/planning-how-to-format-rules-conditional-formatting/nested-conditions.png":::
