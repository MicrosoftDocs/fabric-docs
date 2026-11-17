---
title: Create Date Parameters for Dynamic Dashboards
description: Create date parameters to highlight date ranges in charts with conditional formatting and add dynamic dates to report headers. Learn how to set them up today.
#customer intent: As a report author, I want to create a date parameter so that I can pass specific dates or date ranges into charts, calculations, and financial models.
ms.date: 11/12/2026
ms.topic: how-to
---

# Create date parameters

Use date parameters in dashboards and planning applications that dynamically pass specific dates or date ranges into visual charts, calculations, and financial models.

Unlike standard hard-coded filters, date parameters act as flexible inputs that can simultaneously drive conditional formatting and dynamic titles.

## Apply conditional formatting to date-based charts

By combining a date parameter with conditional formatting, you can create interactive, visually intuitive reports. Instead of filtering data out of view, this approach retains the full context of your dataset while dynamically highlighting specific date ranges based on user selection.

By evaluating report dates against a flexible date variable, conditional rules automatically apply visual emphasis to the selected timeframe. This approach enables users to track trends, identify specific performance windows, and focus on key timeframes without losing sight of surrounding historical or future data.

1. Create a new parameter and set the type to **Date**.
1. Set the **Date Mode** to **Date Range** to pass a specific timeframe to the chart visual.
1. Set the interface to **Date Picker** to use a calendar control to select the date range. You can also use a slider.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/configure-date-parameter.png" alt-text="Screenshot of configuring a date parameter with date mode set to date range and interface set to date picker." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/configure-date-parameter.png":::

1. In your intelligence sheet, select the chart visual and select **Conditional Formatting** > **New Rule**.
1. In the conditional formatting side pane, set **Impacts on** to **Chart** to highlight chart sections based on the parameter value.
1. Configure the condition to set the date range based on the parameter value.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/configure-conditional-formatting.png" alt-text="Screenshot of configuring a conditional formatting rule to set the order date to the date selector parameter value." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/configure-conditional-formatting.png":::

1. Updating the date selection in the parameter automatically emphasizes the chosen data range in the chart.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/chart-selection-date-range-highlighted.png" alt-text="Screenshot of a chart highlighting the date range selected in the date parameter through conditional formatting." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/chart-selection-date-range-highlighted.png":::

## Insert custom dates in report headers

 If you pass custom date parameters directly into a report's title, dynamic titles display the time period selected in the parameter controls—for example, "Selected period: Jan 01, 2026 – Mar 31, 2026". Displaying a parameter in a header doesn't filter the report or restrict the exported data to that period. Apply matching date filters separately if the export should contain only the selected period, and configure the PDF export settings to include the header.

1. Create a date parameter. Set the **Date Mode** to **Date Range** and interface to slider.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/create-date-range-parameter-configuration.png" alt-text="Screenshot of a date parameter configured with Date Mode set to Date Range and the interface set to slider." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/create-date-range-parameter-configuration.png":::

1. In your planning sheet, double-click the header to enable the **Header & Footer** ribbon.
1. Select **Parameters** in the **Header & Footer** ribbon, and select the configured date parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/insert-date-parameter-header.png" alt-text="Screenshot of inserting the date selector parameter in the header." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/insert-date-parameter-header.png":::

1. The header displays the dates selected by using the slider control.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/display-selected-date-header.png" alt-text="Screenshot of the selected date range reflected in the header." lightbox="../../../media/resources/best-practices/parameters/how-to-create-date-parameters/display-selected-date-header.png":::

## Related content

Apply conditional formatting to planning sheets: [Conditional formatting in planning sheets](/fabric/iq/plan/planning-conditional-formatting/concept-conditional-formatting)
