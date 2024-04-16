---
title: "Tutorial: Visualize predictions with a Power BI report"
description: In this fifth part of the tutorial series, learn how to get set up to create reports and how to create various visuals to analyze data.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/16/2023
#CustomerIntent: As a data scientist, I want to create a Power BI report to visualize the predictions data.
---

# Tutorial Part 5: Visualize predictions with a Power BI report

In this tutorial, you'll create a Power BI report from the predictions data that was generated in [Part 4: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).



You'll learn how to:

> [!div class="checklist"]
>
> * Create a semantic model from the predictions data.
> * Add new measures to the data from Power BI.
> * Create a Power BI report.
> * Add visualizations to the report.

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
1. On the top left, select **Lakehouse** as a filter.
1. Select the lakehouse that you used in the previous parts of the tutorial series.
1. Select **New semantic model** on the top ribbon.

   :::image type="content" source="media\tutorial-data-science-create-report\new-power-bi-dataset.png" alt-text="Screenshot of the lakehouse UI home, showing where to select the New semantic model option on the ribbon.":::

1. Give the semantic model a name, such as "bank churn predictions." Then select the **customer_churn_test_predictions** dataset.

   :::image type="content" source="media\tutorial-data-science-create-report\select-predictions-data.png" alt-text="Screenshot of the New semantic model dialog box, showing where to select the correct data and select Continue.":::

1. Select **Confirm**.  

## Add new measures

Now add a few measures to the semantic model:

1. Add a new measure for the churn rate.

    1. Select **New measure** in the top ribbon.  This action adds a new item named **Measure** to the **customer_churn_test_predictions** dataset, and opens a formula bar above the table.

        :::image type="content" source="media/tutorial-data-science-create-report/new-measure.png" alt-text="Screenshot show creating a new measure.":::

    1. To determine the average predicted churn rate, replace `Measure =` in the formula bar with:

        ```python
        Churn Rate = AVERAGE(customer_churn_test_predictions[predictions])
        ```

    1. To apply the formula, select the check mark in the formula bar.  The new measure appears in the data table.  The calculator icon shows it was created as a measure.
    1. Change the format from **General** to **Percentage** in the **Properties** panel.
    1. Scroll down in the **Properties** panel to change the **Decimal places** to 1.

        :::image type="content" source="media/tutorial-data-science-create-report/churn-rate.png" alt-text="Screenshot show the new Churn Rate measure with properties set." lightbox="media/tutorial-data-science-create-report/churn-rate.png":::

1. Add a new measure that counts the total number of bank customers.  You'll need it for the rest of the new measures.
  
    1. Select **New measure** in the top ribbon to add a new item named **Measure** to the `customer_churn_test_predictions` dataset.  This action also opens a formula bar above the table.
    1. Each prediction represents one customer. To determine the total number of customers, replace `Measure =` in the formula bar with:

        ```python
        Customers = COUNT(customer_churn_test_predictions[predictions])
        ```

    1. Select the check mark in the formula bar to apply the formula.

1. Add the churn rate for Germany.

    1. Select **New measure** in the top ribbon to add a new item named **Measure** to the `customer_churn_test_predictions` dataset.  This action also opens a formula bar above the table.
    1. To determine the churn rate for Germany, replace `Measure =` in the formula bar with:

        ```python
        Germany Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_Germany] = TRUE()))
        ```

        This filters the rows down to the ones with Germany as their geography (Geography_Germany equals one).

    1. To apply the formula, select the check mark in the formula bar.

1. Repeat the above step to add the churn rates for France and Spain.

    * Spain's churn rate:

        ```python
        Spain Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_Spain] = TRUE()))
        ```

    * France's churn rate:

        ```python
        France Churn = CALCULATE(AVERAGE(customer_churn_test_predictions[predictions]),FILTER(customer_churn_test_predictions, customer_churn_test_predictions[Geography_France] = TRUE()))
        ```

## Create new report

Once you're done with all operations, move on to the Power BI report authoring page by selecting **Create report** on the top ribbon.

:::image type="content" source="media/tutorial-data-science-create-report/visualize-this-data.png" alt-text="Screenshot shows how to create a report.":::

Once the report page appears, add these visuals:

1. Select the text box on the top ribbon and enter a title for the report, such as "Bank Customer Churn".  Change the font size and background color in the Format panel.  Adjust the font size and color by selecting the text and using the format bar.
1. In the Visualizations panel, select the **Card** icon. From the **Data** pane, select **Churn Rate**. Change the font size and background color in the Format panel. Drag this visualization to the top right of the report.

    :::image type="content" source="media/tutorial-data-science-create-report/card-churn.png" alt-text="Screenshot shows addition of Churn Rate card." lightbox="media/tutorial-data-science-create-report/card-churn.png":::

1. In the Visualizations panel, select the **Line and stacked column chart** icon. Select **age** for the x-axis, **Churn Rate** for column y-axis, and **Customers** for the line y-axis.

    :::image type="content" source="media/tutorial-data-science-create-report/age.png" alt-text="Screenshot shows addition of a stacked column chart for Age."  lightbox="media/tutorial-data-science-create-report/age.png":::

1. In the Visualizations panel, select the **Line and stacked column chart** icon. Select **NumOfProducts** for x-axis, **Churn Rate** for column y-axis, and **Customers** for the line y-axis.

    :::image type="content" source="media/tutorial-data-science-create-report/number-of-products.png" alt-text="Screenshot shows addition of a stacked column chart of NumOfProducts." lightbox="media/tutorial-data-science-create-report/number-of-products.png":::


1. In the Visualizations panel, select the **Stacked column chart** icon. Select **NewCreditsScore** for x-axis and  **Churn Rate** for y-axis.

    :::image type="content" source="media/tutorial-data-science-create-report/new-credit-score.png" alt-text="Screenshot shows adding a stacked column chart of NewCreditScore." lightbox="media/tutorial-data-science-create-report/new-credit-score.png":::

    Change the title "NewCreditsScore" to "Credit Score" in the Format panel.

    :::image type="content" source="media/tutorial-data-science-create-report/change-title.png" alt-text="Screenshot shows changing the title for the chart." lightbox="media/tutorial-data-science-create-report/change-title.png":::


1. In the Visualizations panel, select the **Clustered column chart** card. Select **Germany Churn**, **Spain Churn**, **France Churn** in that order for the y-axis.

    :::image type="content" source="media/tutorial-data-science-create-report/germany-spain-france.png" alt-text="Screenshot shows the clustered column chart." lightbox="media/tutorial-data-science-create-report/germany-spain-france.png":::

> [!NOTE]
> This report represents an illustrated example of how you might analyze the saved prediction results in Power BI. However, for a real customer churn use-case, the you may have to do more thorough ideation of what visualizations to create, based on syour subject matter expertise, and what your firm and business analytics team has standardized as metrics.


The Power BI report shows:

* Customers who use more than two of the bank products have a higher churn rate although few customers had more than two products. The bank should collect more data, but also investigate other features correlated with more products (see the plot in the bottom left panel).
* Bank customers in Germany have a higher churn rate than in France and Spain (see the plot in the bottom right panel), which suggests that an investigation into what has encouraged customers to leave could be beneficial.
* There are more middle aged customers (between 25-45) and customers between 45-60 tend to exit more.
* Finally, customers with lower credit scores would most likely leave the bank for other financial institutes. The bank should look into ways that encourage customers with lower credit scores and account balances to stay with the bank.


## Next step

This completes the five part tutorial series.  See other end-to-end sample tutorials:

> [!div class="nextstepaction"]
> [How to use end-to-end AI samples in Microsoft Fabric](use-ai-samples.md)
