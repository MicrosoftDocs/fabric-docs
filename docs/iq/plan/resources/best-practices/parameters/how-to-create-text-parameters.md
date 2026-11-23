---
title: Add Text Parameters to Report Headers and Footers
description: Create text parameters to add dynamic titles, notes, and disclosures to report headers and footers. Learn how to set them up in planning and intelligence sheets.
#customer intent: As a report author, I want to bind text parameters to headers and footers, so that I can update report titles without editing the report design each time.
ms.date: 11/09/2026
ms.topic: how-to
---

# Create text parameters

Use text parameters to inject dynamic text content directly into your reports. By binding text parameters to header or footer text boxes, you can easily modify report titles, add localized notes, or update print disclosures on the fly before generating final PDF or printed copies.

## Embed custom text in headers and footers

To enable dynamic header and footer updates, configure text parameters and embed them in the header component of your planning or intelligence sheets.

### [Use text parameters in planning sheets](#tab/planning-sheets)

1. Create a new parameter and set the **Type** to **Text**. Enter the **Name**, **Description**, and **Parameter Id** for the parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/configure-text-parameter-planning-sheet.png" alt-text="Screenshot of configuring text parameter options for a planning sheet." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/configure-text-parameter-planning-sheet.png":::

1. Double-click the header of your planning sheet to edit it.
1. In the **Header & Footer** ribbon of your planning sheet, select **Parameters** and select the text parameter created in the first step. Close the header editor after inserting the parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/insert-parameter-header.png" alt-text="Screenshot of inserting a text parameter into the planning sheet header from the Header & Footer ribbon." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/insert-parameter-header.png":::

1. The header automatically updates to display the value entered in the parameter input box.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-entered-parameter-displayed-header.png" alt-text="Screenshot of a planning sheet header displaying the value entered in the text parameter input box." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-entered-parameter-displayed-header.png":::

### [Use text parameters in intelligence sheets](#tab/intelligence-sheets)

1. Create a new parameter and set the **Type** to **Text**. Enter the **Name**, **Description**, and **Parameter Id** for the parameter.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-configuration.png" alt-text="Screenshot of creating a text parameter to capture the filter category." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-configuration.png":::

1. Create a second text parameter. The parameters display the filters applied.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/create-second-text-parameter.png" alt-text="Screenshot of text parameters created to capture the category and time period." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/create-second-text-parameter.png":::

1. Select the chart visual and double-click the header area to open the text editor. Type `#` to view and select your parameter from the dropdown menu.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/insert-header-parameter.png" alt-text="Screenshot of selecting a parameter for the chart header." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/insert-header-parameter.png":::

1. Repeat step 3 for other visuals in your dashboard as required.

    > [!NOTE]
    > For matrix visuals, follow the same steps used to insert parameters in planning sheet headers.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/treemap-header-category-parameter.png" alt-text="Screenshot of using the category parameter in the header of the treemap chart." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/treemap-header-category-parameter.png":::

1. As you enter values into the parameter inputs, the visual headers update dynamically. In this example, the headers provide clear context for the applied filters. The bar chart header updates to reflect the selected quarter. The treemap and matrix headers update to reflect the selected category.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-header-change.gif" alt-text="Animation showing visual headers updating dynamically: the bar chart shows the selected quarter, and the treemap and matrix show the category." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-header-change.gif":::

---

## Use text parameters in formulas

Reference text parameters in custom formulas to drive logic based on text inputs and update calculated values on the fly.

1. Create a new parameter and set the **Type** to **Text**. Enter a relevant parameter ID; you reference this ID in the formula. Specify an optional default value.
1. In the **Planning** ribbon of your planning sheet, go to **Insert Column** > **Formula** to insert a new calculated measure.
1. Enter the formula. Press Ctrl + Spacebar to use IntelliSense to add references to the parameters in the formula.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-formula-reference.png" alt-text="Screenshot of referencing the currency code parameter inside a formula." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-formula-reference.png":::

1. When you change the parameter, Fabric recalculates the values in real time - without making any changes to the underlying formula.

    :::image type="content" source="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-recalculation-animation.gif" alt-text="Animation showing how the Normalized sales measure is recalculated when the currency code parameter is changed." lightbox="../../../media/resources/best-practices/parameters/how-to-create-text-parameters/text-parameter-recalculation-animation.gif":::

## Related content

 - [Configure parameters](./how-to-configure-parameters.md).
 - [Create numeric input parameters](./how-to-create-number-parameters.md).

