---
title: Quick Formatting Options in Conditional Formatting
description: Learn how to use quick formatting options in conditional formatting to quickly apply predefined styles and highlight data in planning sheets.
ms.date: 05/15/2026
ms.topic: how-to
#customer intent: As a user, I want to understand and use quick formatting options in conditional formatting
---

# Quick formatting options in conditional formatting

Quick formatting options offer a convenient way to apply conditional formatting to the planning sheet without manually creating advanced rules from scratch. After creating a quick rule, you can further customize the rule based on your reporting requirements. These options help you highlight trends, variances, classifications, and value distributions using predefined formatting styles.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

Quick formatting is useful for quickly visualizing data and improving report readability with minimal configuration.

## Apply quick formatting

To apply quick conditional formatting:

1. Open the planning sheet.
1. Select the required row, column, or measure.
1. Open the **Conditional formatting** pane.
1. Select the required quick formatting option.
1. Configure the formatting settings, if required.
1. Save the rule to apply the formatting.

## Supported quick formatting options

The following one-click conditional formatting options are supported:

* **Quick rules**: Apply predefined conditional formatting rules based on common conditions.
* **Color scales**: Apply gradient-based formatting using various color scale types.
* **Classification**: Categorize values into groups and apply formatting based on thresholds or ranges.
* **Data bars**: Display horizontal bars within cells to visually compare values.
* **Action Analysis**: Applies visual indicators and color-based formatting.

### Quick rules

Quick rules allow you to apply commonly used conditional formatting conditions such as:

* Greater than
* Less than
* Equal to
* Between ranges
* Top or bottom values
* Positive or negative values

These rules can be applied with minimal configuration. For more information, see [Configure rules using IF conditions](how-to-format-if.md).

### Color scales

Color scales apply formatting based on value intensity or distribution within the selected range. These options help visualize trends and compare values quickly. For more information, see [Configure rules using format by color scale](how-to-format-color-scales.md).

### Classification

Classification formatting groups values into categories and applies visual indicators based on configured ranges or thresholds.

For more information, see [Configure rules using format by classification](how-to-format-classification.md).

### Data bars

Data bars display horizontal bars within cells to represent relative values visually. The bar length changes dynamically based on the selected value range. For more information, see [Data bars](how-to-format-color-scales.md#data-bars).

### Action Analysis

The **Action analysis** option provides visual indicators that help analyze trends, status changes, and performance variations within the planning sheet.

The following display options are supported in action analysis:

* [Action dots](how-to-format-color-scales.md#action-dots-and-action-colors): Displays colored dots as visual indicators within cells.
* [Action colors](how-to-format-color-scales.md#action-dots-and-action-colors): Applies color gradients based on configured conditions.
* [Bubble charts](how-to-format-color-scales.md#bubble-chart-color-scales): Displays the bubble along with the cell value or additional formatting elements.
* **Bubble only**:  Displays only the bubble visualization without showing the cell value. This provides a cleaner, more compact visual representation focused entirely on value magnitude.

### Manage applied rules

Rules created using quick formatting options can be managed from the **Manage rules** pane.

For more information, see [Manage conditional formatting rules](how-to-manage-rules.md).
