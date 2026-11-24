---
title: Configure Filter Context in Planning Sheets
description: Set up filter context in planning sheets so comments, notes, headers, and data inputs update with each filter selection. Learn how to configure it step by step.
ms.date: 10/19/2026
ms.topic: how-to
---

# Configure filter context awareness

Context awareness ensures that the content you manually entered or formatted, such as comments, notes, headers, conditional formatting, data inputs, and locked cells, automatically responds to the current filter context.

For example, if you enter a comment for Q4 and then apply a filter for Q1, the planning sheet must display the comment associated with Q1, if available, instead of the Q4 note. Similarly, headers, locked cells, and conditional formatting dynamically update to reflect the content and settings applicable to the selected filter context.

## Sample scenario without filter context

Consider the following planning sheet, which displays Gross Profit in USD across product categories and subcategories for all continents. The data is organized by *Year* and *Quarter*, so you can compare gross profit across categories and time periods.

:::image type="content" source="media/planning-how-to-configure-filter-context/sample-scenario.png" alt-text="Screenshot of a planning sheet showing Gross Profit USD by category and subcategory for 2025 and 2026 quarters, with Continent set to All." lightbox="media/planning-how-to-configure-filter-context/sample-scenario.png":::

You can use filters such as the *Continent* and *Year* filters to narrow the data to a specific continent and time period and analyze the corresponding values.

:::image type="content" source="media/planning-how-to-configure-filter-context/continent-year-filters.png" alt-text="Screenshot of a planning sheet showing Gross Profit USD by category for 2026 Qtr 1 and Qtr 2, with Year filtered to 2026 and Continent to Americas and Asia Pacific." lightbox="media/planning-how-to-configure-filter-context/continent-year-filters.png":::

In the following image, you add a comment that is specific to the Asia Pacific region.

:::image type="content" source="media/planning-how-to-configure-filter-context/add-comment-after-filter.png" alt-text="Screenshot of a planning sheet filtered to Asia Pacific, with a comment on Milk & Cream Qtr 2 reading 'Include profit from skim milk for Asia Pacific region.'." lightbox="media/planning-how-to-configure-filter-context/add-comment-after-filter.png":::

Without filter context in the planning sheet, a comment that you added for the *Asia Pacific* region also appears when you filter to other regions, which is undesirable.

:::image type="content" source="media/planning-how-to-configure-filter-context/invalid-comment-wrong-context.png" alt-text="Screenshot of a planning sheet filtered to Continent: Europe, still showing the Asia Pacific comment on Milk & Cream Qtr 2, marked with a red X as incorrect." lightbox="media/planning-how-to-configure-filter-context/invalid-comment-wrong-context.png":::

So you configure filter context in the planning sheet to ensure that notes, comments, headers, data inputs, conditional formatting, and writeback payloads dynamically reflect changes in filter selections.

This article explains how to configure filter context and describes its effects on each of these elements.

## Set up filter context

1. To enable context awareness, select **Planning** > **Filter context** > **Settings**.

    :::image type="content" source="media/planning-how-to-configure-filter-context/select-filter-context.png" alt-text="Screenshot of the Planning tab with the Filter context dropdown expanded, showing the Settings option highlighted." lightbox="media/planning-how-to-configure-filter-context/select-filter-context.png":::

1. Turn on the **Filter Context** switch in **Filter Context Settings**. This action also turns on the **Notes** and **Comments** switches to make notes and comments respond dynamically to filter selections.

    :::image type="content" source="media/planning-how-to-configure-filter-context/toggle-on-filter-context.png" alt-text="Screenshot of the Filter Context Settings dialog with the Filter Context, Notes, and Comments switches turned on and highlighted." lightbox="media/planning-how-to-configure-filter-context/toggle-on-filter-context.png":::

1. In the **Configure Dimensions** box, select the dimensions that you want to use as filters.

    :::image type="content" source="media/planning-how-to-configure-filter-context/select-dimensions.png" alt-text="Screenshot of the Configure Dimensions box highlighted, showing Continent and Sub Region chips and a Select Dimension list with both options checked." lightbox="media/planning-how-to-configure-filter-context/select-dimensions.png":::

1. Select **Save**. If the planning sheet contains existing elements like notes or comments, a confirmation prompt appears asking you if it can remove them. Select **Confirm** to proceed.

    :::image type="content" source="media/planning-how-to-configure-filter-context/save.png" alt-text="Screenshot of Filter Context Settings with Save highlighted and a Confirm Action dialog on top, with the Confirm button highlighted." lightbox="media/planning-how-to-configure-filter-context/save.png":::

1. The selected dimensions appear as **separate context filters** in the **Filter** pane. Use these filters to filter the planning sheet data.

    :::image type="content" source="media/planning-how-to-configure-filter-context/context-filter.png" alt-text="Screenshot of the Filter pane with the Context section highlighted, showing Continent and Sub Region context filters beside a Gross Profit planning sheet." lightbox="media/planning-how-to-configure-filter-context/context-filter.png":::

## Filter context in notes and comments

1. Make a filter selection, and then enter a note or comment relevant to the selected category.

    :::image type="content" source="media/planning-how-to-configure-filter-context/add-comment-after-context-filter.png" alt-text="Screenshot of a Gross Profit planning sheet with Europe selected in the Continent context filter and a comment by Reed Smith on the All Qtr 2 cell." lightbox="media/planning-how-to-configure-filter-context/add-comment-after-context-filter.png":::

1. Change the filter selection, and then enter another note or comment.
1. Filter context displays the relevant notes and comments based on the filter selection.

    :::image type="content" source="media/planning-how-to-configure-filter-context/filter-context-comments.gif" alt-text="Animation of a Gross Profit planning sheet showing different comments appear as the Continent context filter selection changes." lightbox="media/planning-how-to-configure-filter-context/filter-context-comments.gif":::

1. Filter context works for multiple dimension selections as well. Select all the dimensions you want to use as filters while [configuring filter context](#set-up-filter-context).

## Filter context in sheet headers

Configure the filter context for the dimensions you want to use in the header. Then, select those dimensions when configuring the header presets.

For example, if you want to display *Continent* and *Year* dimensions in the header that change dynamically based on applied filters, configure filter context for both these dimensions and then select them in header presets.

:::image type="content" source="media/planning-how-to-configure-filter-context/configure-header-preset.png" alt-text="Screenshot of header preset Filter menu listing Continent and Year, both highlighted." lightbox="media/planning-how-to-configure-filter-context/configure-header-preset.png":::

In the following image, header presets dynamically reflect the current filter selections, helping users quickly understand the data displayed in the planning sheet.

:::image type="content" source="media/planning-how-to-configure-filter-context/headers-filter-context.gif" alt-text="Animated screenshot of changing Continent and Year filters, with the sheet header text updating to match each selection." lightbox="media/planning-how-to-configure-filter-context/headers-filter-context.gif":::

## Filter context in data input columns

Manual data entry fields such as numeric input, text, person, checkbox, or dropdown list, also respond to the context filter selections.

Observe how the data inputs change according to the filter selections in the following images.

For *Asia Pacific* region:

:::image type="content" source="media/planning-how-to-configure-filter-context/data-input-columns-asia-pacific-region.png" alt-text="Screenshot of the Filter pane with Asia Pacific selected and the sheet showing region-specific Q3 projections, notes, contacts, and Single Select statuses." lightbox="media/planning-how-to-configure-filter-context/data-input-columns-asia-pacific-region.png":::

For *Europe* region:

:::image type="content" source="media/planning-how-to-configure-filter-context/data-input-columns-europe-region.png" alt-text="Screenshot of the Filter pane with Europe selected and the sheet showing Europe-specific Q3 projections, review checkboxes, notes, contacts, and Single Select statuses." lightbox="media/planning-how-to-configure-filter-context/data-input-columns-europe-region.png":::

## Filter context in locked cells

You can lock one or more cells before or after entering data input values to prevent other users from entering values or overwriting them.

When you distribute a parent cell value to the child cells below, locked cells remain unaffected. You can lock cells with existing values to retain those values without getting affected by distribution. You can also lock empty cells to keep them empty while other cells are allocated.

Configuring filter context ensures that the relevant cells remain locked when you change filter selections.

:::image type="content" source="media/planning-how-to-configure-filter-context/locked-cells-filter-context.gif" alt-text="Animation of a planning sheet where locked cells stay locked for the selected region as the filter context changes in the Filter pane." lightbox="media/planning-how-to-configure-filter-context/locked-cells-filter-context.gif":::

## Filter context in measure headers

You can configure individual measure headers to reflect context filter selections.

1. Double-click the measure header and select **Ctrl + Space** to open the suggestions panel. The list of context filters appears in the suggestions list.
1. Select the filter name to append it to the measure header.

    :::image type="content" source="media/planning-how-to-configure-filter-context/measure-header-add-filter-dimension.png" alt-text="Screenshot of adding a context filter to a measure header from the suggestions panel, with Continent and Year filters shown in the Filter pane." lightbox="media/planning-how-to-configure-filter-context/measure-header-add-filter-dimension.png":::

Notice how the measure header displays the filter selection relevant to the current context.

:::image type="content" source="media/planning-how-to-configure-filter-context/filter-context-measure-header.png" alt-text="Screenshot of a planning sheet with measure headers showing Gross Profit USD - Asia Pacific, matching the Continent filter selected in the Filter pane." lightbox="media/planning-how-to-configure-filter-context/filter-context-measure-header.png":::

## Filter context in writebacks

Planning sheet writeback captures each filter dimension in a separate column.

:::image type="content" source="media/planning-how-to-configure-filter-context/filter-context-writeback-data.png" alt-text="Screenshot of a planning sheet filtered to Asia Pacific and 2026, with writeback data showing Continent and Year captured in separate columns." lightbox="media/planning-how-to-configure-filter-context/filter-context-writeback-data.png":::

The planning sheet preserves filter context when writing back data inputs, comments, and notes. Each combination of filter selections, such as *Continent* and *Year*, is captured across separate rows in the writeback data, with each row associated with the corresponding category and subcategory.

:::image type="content" source="media/planning-how-to-configure-filter-context/filter-combination-writeback.png" alt-text="Screenshot of a SQL query Results tab with writeback data grouped by filter combinations of Continent and Year, highlighted in red boxes." lightbox="media/planning-how-to-configure-filter-context/filter-combination-writeback.png":::

## Filter context in connected planning

When you set up context filters, the planning sheet shows integrated values based on the selected filter context.

For example, consider a planning sheet that shows yearly profitability data.

:::image type="content" source="media/planning-how-to-configure-filter-context/planning-sheet-yearly-profit-report.png" alt-text="Screenshot of a Gross Profit report by Category, Sub category with yearly profit values in thousands." lightbox="media/planning-how-to-configure-filter-context/planning-sheet-yearly-profit-report.png":::

To integrate an external data source with a different granularity, such as quarterly discount values, create an Infobridge query from the source.

:::image type="content" source="media/planning-how-to-configure-filter-context/infobridge-query.png" alt-text="Screenshot of an Infobridge query showing Promo Sales percentage by Category, Sub Category, and Continent, with 2025 quarterly columns Q1–Q4 highlighted." lightbox="media/planning-how-to-configure-filter-context/infobridge-query.png":::

Then, integrate the required measures from the query into the planning sheet from the **Queries** section in the **Data** pane.

:::image type="content" source="media/planning-how-to-configure-filter-context/integrate-bridge-measure.png" alt-text="Screenshot of a planning sheet with Sum of Promo Sales percentage columns added for 2025 and 2026 after selecting Promo Sales percentage column from Query 4 in the Data pane." lightbox="media/planning-how-to-configure-filter-context/integrate-bridge-measure.png":::

Because the planning sheet displays data at the year level while the Infobridge source contains data at the quarter level, the quarterly discount values are aggregated for each year in the yearly profitability report.

The integrated values also respond to the selected *Continent* context filter, so you can view the values for the selected continent.

:::image type="content" source="media/planning-how-to-configure-filter-context/context-filter-connected-plan.gif" alt-text="Animation of a planning sheet where selecting a different Continent context filter updates the integrated Promo Sales percentage values for 2025 and 2026." lightbox="media/planning-how-to-configure-filter-context/context-filter-connected-plan.gif":::
