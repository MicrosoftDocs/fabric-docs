---
ai-usage: ai-assisted
title: IBCS Table Templates for Performance Reports in Fabric Planning
description: IBCS table templates display actuals, variances, and key metrics clearly. Discover how to apply the T03, T04, and T05 performance templates and customize their formatting.
#customer intent: As a financial analyst, I want to apply IBCS table templates to my report so that I can present actuals, plans, and variances in a standard layout.
ms.date: 09/16/2026
ms.topic: how-to
---

# Table templates

IBCS table templates present business data using standardized layouts and semantic formatting. Use these templates to display actual values, variances, and key performance metrics in a consistent, easy-to-read format.

## T03: Table with measure rows

Table template (T03) visually structures a calculation scheme such as a profit and loss statement directly within its rows. According to IBCS, the calculation logic is detailed in the first column, allowing clear line-by-line financial tracking across prior year, plan, actual, and variance figures.

1. In the **Matrix** ribbon, select **Templates** and select **T03** from the **Performance** section.
1. Select the relative variance column, select **Conditional Formatting** > **Quick Rule** > **Negative** to highlight negative variances.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/t03-template-conditional-formatting-negative-variance.png" alt-text="Screenshot of the T03 template and conditional formatting option to highlight negative values.":::

1. To invert categories such as *costs*, in the **Data** ribbon, select the rows, then select **Invert**.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/data-ribbon-invert-option.png" alt-text="Screenshot of the Invert option in the Data ribbon used to invert selected rows such as costs." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/data-ribbon-invert-option.png":::

1. To add an = sign, hover over a row, select the row gripper, and select **Add "=" symbol**.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/row-gripper-add-equal-symbol-option.png" alt-text="Screenshot of the row gripper menu with the Add '=' symbol command selected in a table row." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/row-gripper-add-equal-symbol-option.png":::

1. To display positive signs at the start of each row, in the **Format** tab, go to **Appearance**> **Numbers** and enable **Show Positive Sign**.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/format-numbers-show-positive-sign-option.png" alt-text="Screenshot of the Show Positive Sign option under Appearance and Numbers on the Format tab." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/format-numbers-show-positive-sign-option.png":::

1. To customize cell and row borders, select the cell or row, go to the **Format** ribbon, select the border icon, and select **Custom**.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/custom-cell-row-border-options.png" alt-text="Screenshot of the Format ribbon border icon with the Custom option selected for a table cell or row." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/custom-cell-row-border-options.png":::

## T04: Measure rows and integrated waterfalls

Visualize variance and relative variance values in an income statement by using the T04 template.

* Variance values are automatically plotted as a vertical waterfall chart.
* Relative variance values are rendered as lollipop charts.

1. In the **Matrix** ribbon, select **Templates** and select **T04** from the **Performance** section.
1. Follow the customization steps outlined in the [T03: Table with measure rows](#t03-table-with-measure-rows) section.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/t04-integrated-waterfall.png" alt-text="Screenshot of the T04 template showing variances as waterfall charts and relative variances as pin charts. " lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/t04-integrated-waterfall.png":::

## T05: Hierarchical bars and integrated bars

Visualize the actuals and variances in an income statement by using the T05 template.

* Current and prior year actuals are plotted using solid bar charts.
* Variance values are automatically plotted as colored bars.
* Relative variance values are rendered as lollipop charts.

1. In the **Matrix** ribbon, select **Templates** and select **T05** from the **Performance** section.
1. To customize cell and row borders, select the cell or row, go to the **Format** ribbon, select the border icon, and select **Custom**.

    :::image type="content" source="../media/intelligence-ibcs/how-to-configure-ibcs-tables/t05-hierarchical-integrated-bars.png" alt-text="Screenshot of the T05 performance matrix template showing actuals as bars, variance as colored bars, and relative variance as lollipop charts." lightbox="../media/intelligence-ibcs/how-to-configure-ibcs-tables/t05-hierarchical-integrated-bars.png":::
