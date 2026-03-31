---
title: Build financial reports
description: Learn how to format financial data in Intelligence sheets with structured layouts, custom number formatting, templates, totals, subtotals, and calculations.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to create financial reports in Intelligence sheets
---

# Build financial reports with Intelligence sheets

Intelligence sheets bring built-features that make it easy to present financial data in a clear format. You can organize metrics into a structured layout that supports both on-screen analysis and formatted exports.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

You can apply custom number formatting and scaling, apply single-click templates, display totals and subtotals, and insert calculations. Together, these capabilities help you create presentation-ready financial reports that support planning, analysis, and decision-making.

This article provides a basic overview of how to create financial reports with Intelligence sheets.

## Format numeric data

1. Select **Number** > **Decimal icons** to increase or decrease the number of decimal places displayed. This setting applies to all measures in the report.
1. To adjust decimal places for a specific measure, select the measure and use the increase or decrease decimal buttons.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/decimal-places.png" alt-text="Screenshot of the decimal place button that added a decimal place to every value in the column." lightbox="media/intelligence-how-to-build-financial-reports/decimal-places.png":::

1. Select the **Prefix/Suffix** button, then enter the desired prefix or suffix.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/prefix-suffix.png" alt-text="Screenshot of the prefix/suffix button adding a prefix or suffix to every value in the column." lightbox="media/intelligence-how-to-build-financial-reports/prefix-suffix.png":::

1. Enable **Semantic Formatting** from **Number Settings** to highlight positive/negative values.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/semantic-formatting.png" alt-text="Screenshot of the semantic formatting button in the Appearance pane." lightbox="media/intelligence-how-to-build-financial-reports/semantic-formatting.png":::

## Set number scaling

1. Select the **Quick Format** option to set scaling at the report level. This setting applies to all measures.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/quick-format.png" alt-text="Screenshot of the Quick Format button in the Number section of the menu ribbon." lightbox="media/intelligence-how-to-build-financial-reports/quick-format.png":::

1. For measures with mixed granularities, select the measure to set the scaling factor.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/quick-format-measure.png" alt-text="Screenshot of the Quick Format options selecting between scaling factors such as Auto, Thousands, and Millions." lightbox="media/intelligence-how-to-build-financial-reports/quick-format-measure.png":::

## Apply and customize built-in templates

Out-of-the-box report templates provide a quick starting point for creating reports. They reduce the time and effort required to build reports from scratch.

> [!TIP]  
> Use built-in templates to save time and ensure consistency across reports.

1. Select the template you want to apply to the report.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/templates.png" alt-text="Screenshot of the Templates button in the Actions section of the menu ribbon." lightbox="media/intelligence-how-to-build-financial-reports/templates.png":::

1. You can customize templates by formatting the header and footer and adding outlines.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/header-footer.png" alt-text="Screenshot of the Header & Footer tab in the menu ribbon." lightbox="media/intelligence-how-to-build-financial-reports/header-footer.png":::

1. Enable grid lines from **Display Settings** to clearly demarcate various categories.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/grid-lines.png" alt-text="Screenshot of adding grid lines to the report." lightbox="media/intelligence-how-to-build-financial-reports/grid-lines.png":::

1. Turn on **Semantic Formatting** to draw attention to values like negative variances or profits.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/semantic-formatting-2.png" alt-text="Screenshot of the semantic formatting options being reflected in the data." lightbox="media/intelligence-how-to-build-financial-reports/semantic-formatting-2.png":::

1. Enable the **Sign in Headers** option to display the overall performance of a row category. When all the values in a particular row are negative, the row is prefixed with a minus sign.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/value-display.png" alt-text="Screenshot of the Value Display options, including Sign In Headers." lightbox="media/intelligence-how-to-build-financial-reports/value-display.png":::

1. Customize the position of row and column subtotals when the report contains hierarchical data.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/customize-position.png" alt-text="Screenshot of customizing the subtotal position with the Totals button." lightbox="media/intelligence-how-to-build-financial-reports/customize-position.png":::

## Insert calculated columns

1. Select **Insert Formula**.
1. Enter the calculation in the **Formula** window.
1. Press **Ctrl + Space** to open suggestions while writing a formula. This action helps you quickly discover available fields, functions, and syntax. Use the **References** tab to use dimensions and measures in your formula.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/references.png" alt-text="Screenshot of the References tab in the Formula options in the Formula Measure pane." lightbox="media/intelligence-how-to-build-financial-reports/references.png":::

## Insert data input columns

1. Go to **Insert > Data Input**.
1. Select the data input type like checkboxes, dropdowns, and text.

    :::image type="content" source="media/intelligence-how-to-build-financial-reports/columns.png" alt-text="Screenshot of the Columns option in the Insert tab of the menu ribbon." lightbox="media/intelligence-how-to-build-financial-reports/columns.png":::

## Export reports

Select the export icon to create fully formatted Excel and PDF exports for distribution.

:::image type="content" source="media/intelligence-how-to-build-financial-reports/export.png" alt-text="Screenshot of the export options for the report." lightbox="media/intelligence-how-to-build-financial-reports/export.png":::
