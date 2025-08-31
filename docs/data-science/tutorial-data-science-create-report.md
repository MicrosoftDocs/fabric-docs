---
title: "Tutorial: Visualize predictions with a Power BI report"
description: In this fifth part of the tutorial series, learn how to get set up to create reports and how to create various visuals to analyze data.
ms.reviewer: amjafari
ms.author: lagayhar
author: lgayhardt
ms.topic: tutorial
ms.custom: 
ms.date: 04/25/2025
#CustomerIntent: As a data scientist, I want to create a Power BI report to visualize the predictions data.
reviewer: s-polly
---

# Tutorial Part 5: Visualize predictions with a Power BI report

In this tutorial, you build a Power BI report from the predictions data you generated in [Part 4: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).

You'll learn how to:

> [!div class="checklist"]
>
> * Create a semantic model from the predictions data
> * Add new measures to the data from Power BI
> * Create a Power BI report
> * Add visualizations to the report

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

This is part 5 of 5 in the tutorial series. To complete this tutorial, first complete:

* [Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md).
* [Part 2: Explore and visualize data using Microsoft Fabric notebooks](tutorial-data-science-explore-notebook.md) to learn more about the data.
* [Part 3: Train and register machine learning models](tutorial-data-science-train-models.md).
* [Part 4: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).

## Create a semantic model

Create a new semantic model linked to the predictions data you produced in part 4:

1. On the left, select your workspace.
1. At the upper right, select **Lakehouse** as a filter, as shown in the following screenshot:

   :::image type="content" source="media\tutorial-data-science-create-report\filter-by-lakehouse.png" alt-text="Screenshot that shows selection of 'Lakehouse' as a checkbox filter." lightbox="media\tutorial-data-science-create-report\filter-by-lakehouse.png":::

1. Select the lakehouse that you used in the previous parts of the tutorial series, as shown in the following screenshot:

   :::image type="content" source="media\tutorial-data-science-create-report\select-lakehouse.png" alt-text="Screenshot that shows selection of a specific lakehouse to use." lightbox="media\tutorial-data-science-create-report\select-lakehouse.png":::

1. Select **New semantic model** in the top ribbon, as shown in the following screenshot:

   :::image type="content" source="media\tutorial-data-science-create-report\new-power-bi-dataset.png" alt-text="Screenshot of the lakehouse UI home, showing where to select the New semantic model option on the ribbon." lightbox="media\tutorial-data-science-create-report\new-power-bi-dataset.png":::

1. Give the semantic model a name - for example, "bank churn predictions." Then, select the **customer_churn_test_predictions** dataset as shown in the following screenshot:

   :::image type="content" source="media\tutorial-data-science-create-report\select-predictions-data.png" alt-text="Screenshot of the New semantic model dialog box, showing where to select the correct data and select Continue." lightbox="media\tutorial-data-science-create-report\select-predictions-data.png":::

1. Select **Confirm**.

## Add new measures

Add some measures to the semantic model:

1. Add a new measure for the churn rate.

    1. Select **New measure** in the top ribbon. This action adds a new item named **Measure** to the **customer_churn_test_predictions** dataset, and it opens a formula bar above the table, as shown in the following screenshot:

        :::image type="content" source="media/tutorial-data-science-create-report/new-measure.png" alt-text="Screenshot showing creation of a new measure." lightbox="media/tutorial-data-science-create-report/new-measure.png":::

    1. To determine the average predicted churn rate, replace `Measure =` in the formula bar with the following code snippet:

        ```python
        Churn Rate = AVERAGE(customer_churn_test_predictions[predictions])
        ```

    1. To apply the formula, select the check mark in the formula bar, as shown in the following screenshot:

        :::image type="content" source="media/tutorial-data-science-create-report/select-checkmark.png" alt-text="Screenshot showing selection of the formula bar check mark." lightbox="media/tutorial-data-science-create-report/select-checkmark.png":::
    
        The new measure appears in the data table, as shown in the following screenshot:

        :::image type="content" source="media/tutorial-data-science-create-report/new-datatable-measure.png" alt-text="Screenshot showing the new measure in the data table." lightbox="media/tutorial-data-science-create-report/new-datatable-measure.png":::
    The calculator icon indicates that it was created as a measure. Select the **Churn Rate** measure in the data table. Next, make the following selections, as shown in the following screenshot:

    1. Change the format from **General** to **Percentage** in the **Properties** panel.
    
    1. Scroll down in the **Properties** panel to change the **Decimal places** to 1.

        :::image type="content" source="media/tutorial-data-science-create-report/churn-rate.png" alt-text="Screenshot show the new Churn Rate measure with properties set." lightbox="media/tutorial-data-science-create-report/churn-rate.png":::

1. Add a new measure that counts the total number of bank customers. The other new measures need it.
  
    1. Select **New measure** in the top ribbon to add a new item named **Measure** to the `customer_churn_test_predictions` dataset. This action opens a formula bar above the table.
    
    1. Each prediction represents one customer. To determine the total number of customers, replace `Measure =` in the formula bar with:

        ```python
        Customers = COUNT(customer_churn_test_predictions[predictions])
        ```

    1. To apply the formula, select the check mark in the formula bar.

1. Add the churn rate for Germany.

    1. Select **New measure** in the top ribbon to add a new item named **Measure** to the `customer_churn_test_predictions` dataset. This action opens a formula bar over the table.
    
    1. To determine the churn rate for Germany, replace `Measure =` in the formula bar with:

        ```python
        Germany Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_Germany] = TRUE()))
        ```

        This statement extracts those rows that have Germany as their geography (Geography_Germany equals one).

    1. To apply the formula, select the check mark in the formula bar.

1. Repeat the previous step to add the churn rates for France and Spain.

    * Spain's churn rate:

        ```python
        Spain Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_Spain] = TRUE()))
        ```

    * France's churn rate:

        ```python
        France Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_France] = TRUE()))
        ```

## Create a new report

Once you complete all of the operations described earlier, select **Create new report** in the top ribbon File option list to open the Power BI report authoring page, as shown in the following screenshot:

:::image type="content" source="media/tutorial-data-science-create-report/visualize-this-data.png" alt-text="Screenshot shows how to create a report.":::

The report page appears in a new browser tab. Add these visuals to the report:

1. Select the text box in the top ribbon, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/select-textbox.png" alt-text="Screenshot showing where to find the text box option in the ribbon." lightbox="media/tutorial-data-science-create-report/select-textbox.png":::

   Enter a title for the report - for example, "Bank Customer Churn" as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/build-textbox-value.png" alt-text="Screenshot showing entered value in a report textbox." lightbox="media/tutorial-data-science-create-report/build-textbox-value.png":::

   Change the font size and background color in the Format panel. Adjust the font size and color by selecting the text and using the format bar.

1. In the Visualizations panel, select the **Card** icon, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/select-card-icon.png" alt-text="Screenshot showing selection of the card visualization icon." lightbox="media/tutorial-data-science-create-report/select-card-icon.png":::

1. At the **Data** pane, select **Churn Rate**, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/select-churn-rate.png" alt-text="Screenshot showing selection of Churn Rate in the Data pane." lightbox="media/tutorial-data-science-create-report/select-churn-rate.png":::

1. Change the font size and background color in the Format panel, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/format-report.png" alt-text="Screenshot showing report formatting choices." lightbox="media/tutorial-data-science-create-report/format-report.png":::

1. Drag the Churn Rate card to the top right of the report, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/card-churn.png" alt-text="Screenshot that shows the new location of the Churn Rate card." lightbox="media/tutorial-data-science-create-report/card-churn.png":::

1. In the Visualizations panel, select the **Line and stacked column chart**, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/select-line-and-stacked-column-chart.png" alt-text="Screenshot that shows selection of the Line and stacked column chart." lightbox="media/tutorial-data-science-create-report/select-line-and-stacked-column-chart.png":::

1. The chart shows on the report. In the Data pane, select

    - Age
    - Churn Rate
    - Customers

   as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/select-data-pane-options.png" alt-text="Screenshot that shows selection of Data pane options." lightbox="media/tutorial-data-science-create-report/select-data-pane-options.png":::

1. Configure the Line and stacked column chart, as shown in the following screenshot.

    1. Drag **Age** from the Data pane to the X-axis field in the Visualizations pane
    1. Drag **Customers** from the Data pane to the Line y-axis field in the Visualizations pane
    1. Drag **Churn rate** from the Data pane to the Column y-axis field in the Visualizations pane

   Ensure that the Column y-axis field has only one instance of **Churn rate**. Delete everything else from this field.

    :::image type="content" source="media/tutorial-data-science-create-report/configure-chart.png" alt-text="Screenshot that shows selection of Data pane and Visualization pane options." lightbox="media/tutorial-data-science-create-report/configure-chart.png":::

1. In the Visualizations panel, select the **Line and stacked column chart** icon. With steps similar to the earlier Line and stacked column chart configuration, select **NumOfProducts** for x-axis, **Churn Rate** for column y-axis, and **Customers** for the line y-axis, as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/number-of-products.png" alt-text="Screenshot shows addition of a stacked column chart of NumOfProducts." lightbox="media/tutorial-data-science-create-report/number-of-products.png":::

1. In the Visualizations panel, move the right sides of the two charts to the left to make room for two more charts. Then, select the **Stacked column chart** icon. Select **NewCreditsScore** for x-axis and **Churn Rate** for y-axis as shown in the following screenshot:

    :::image type="content" source="media/tutorial-data-science-create-report/new-credit-score.png" alt-text="Screenshot shows adding a stacked column chart of NewCreditScore." lightbox="media/tutorial-data-science-create-report/new-credit-score.png":::

    Change the title "NewCreditsScore" to "Credit Score" in the Format panel, as shown in the following screenshot. You might need to expand the x-axis size of the chart for this step.

    :::image type="content" source="media/tutorial-data-science-create-report/change-title.png" alt-text="Screenshot that shows how to change the chart title." lightbox="media/tutorial-data-science-create-report/change-title.png":::

1. In the Visualizations panel, select the **Clustered column chart** card. Select **Germany Churn**, **Spain Churn**, **France Churn** in that order for the y-axis, as shown in the following screenshot. Resize the individual report charts as needed.

    :::image type="content" source="media/tutorial-data-science-create-report/germany-spain-france.png" alt-text="Screenshot shows the clustered column chart." lightbox="media/tutorial-data-science-create-report/germany-spain-france.png":::

> [!NOTE]
> This tutorial describes how you might analyze the saved prediction results in Power BI. However, based on your subject matter expertise, a real customer churn use-case might need a more detailed plan about the specific visualizations your report requires. If your business analytics team, and firm, have established standardized metrics, those metrics should also become part of the plan.

The Power BI report shows that:

* Bank customers who use more than two of the bank products have a higher churn rate, although few customers had more than two products. The bank should collect more data, and also investigate other features that correlate with more products (review the plot in the bottom left panel).
* Bank customers in Germany have a higher churn rate compared to customers in France and Spain (review the plot in the bottom right panel). These churn rates suggest that an investigation about the factors that encouraged customers to leave could become helpful.
* There are more middle aged customers (between 25-45), and customers between 45-60 tend to exit more.
* Finally, customers with lower credit scores would most likely leave the bank for other financial institutions. The bank should look for ways to encourage customers with lower credit scores and account balances to stay with the bank.

## Next step

This completes the five part tutorial series. See other end-to-end sample tutorials:

> [!div class="nextstepaction"]
> [How to use end-to-end AI samples in Microsoft Fabric](use-ai-samples.md)
