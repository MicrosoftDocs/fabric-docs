---
title: Data science tutorial - create a Power BI report to visualize predictions
description: In this sixth part of the tutorial series, learn how to get set up to create reports and how to create various visuals to analyze data.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Part 6: Create a Power BI report to visualize predictions

In this tutorial, we use the Microsoft Fabric DirectLake feature, which enables direct connectivity from Power BI datasets to lakehouse tables in direct query mode with automatic data refresh. In this tutorial, you'll use the prediction data produced in [Part 5: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* Complete [Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md).  

* Complete [Part 2: Explore and visualize data using Microsoft Fabric notebooks](tutorial-data-science-explore-notebook.md) to learn more about the data.

* Complete [Part 3: Train and register machine learning models](tutorial-data-science-train-models.md).

* Complete [Part 4: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md).

## Prepare for creating reports

1. On the left, select **OneLake data hub**.

1. Select the lakehouse that you used as part of the previous parts of the tutorial series.

1. On the top ribbon, select Open.

   :::image type="content" source="media/tutorial-data-science-create-report/open-lakehouse.png" alt-text="Screenshot shows opening the lakehouse.":::

1. Select **New Power BI dataset** on the top ribbon.
   :::image type="content" source="media\tutorial-data-science-create-report\new-power-bi-dataset.png" alt-text="Screenshot of the lakehouse UI home, showing where to select the New Power BI dataset option on the ribbon." lightbox="media\tutorial-data-science-create-report\new-power-bi-dataset.png":::

1. Give the dataset a name, such as "bank customer churn".  Then select the **customer_churn_test_predictions** dataset. 

   :::image type="content" source="media\tutorial-data-science-create-report\select-predictions-data.png" alt-text="Screenshot of the New Power BI dataset dialog box, showing where to select the correct data and select Continue." lightbox="media\tutorial-data-science-create-report\select-predictions-data.png":::

1. Select **Continue** to create a new Power BI dataset linked to the predictions data you produced in part 4.

1. On the tools at the top of the dataset page, select **New report** to open the Power BI report authoring page.

   :::image type="content" source="media\tutorial-data-science-create-report\visualize-this-data.png" alt-text="Screenshot of the dataset pane, showing how to start a new report." lightbox="media\tutorial-data-science-create-report\visualize-this-data.png":::

You can now create various visuals to generate insights from the prediction dataset.

## Add new measures 

1. Add a new measure that measures the churn rate. From the **Data** tab, right click on "predictions" from the right panel under "customer_churn_test_predictions". This adds a new item named "Measure" to the "customer_churn_test_predictions". Select "Measure" and then move to the formula bar on the left side of the page. Write the following to determine the average churn rate and press enter.

    ```python
    Churn Rate = AVERAGE(customer_churn_test_predictions.predictions)
    ```

    Under the **Data** tab, "Churn Rate" now appears under "customer_churn_test_predictions". Please note the calculator sign that is used to represent the "Churn Rate". Moreover, you need to change the Percentage Format to yes by toggling the percentage bar. Finally, you set the decimal places to 1.


1. Add another new measure that counts the number of bank customers. Under the **Data** tab, right click on "predictions" from the right panel under "customer_churn_test_predictions". This adds a new item named "Measure" to the "customer_churn_test_predictions". Select "Measure" and use the formula bar on the left side of the page to write the following to determine the number of customers. Each prediction represents one customer.

    ```python
    Customers = COUNT(customer_churn_test_predictions.predictions)
    ```


1. Add the churn rate for each of the countries, e.g., Germany, France, Spain. Under the **Data** tab, right click on "Churn Rate" from the right panel under "customer_churn_test_predictions". This adds a new label named "Measure" to the "customer_churn_test_predictions". Select "Measure" and then use the formula bar on the left side of the page to write the following to calculate Germany's churn rate.

    ```python
    Germany Churn = CALCULATE(customer_churn_test_predictions(Churn Rate), customer_churn_test_predictions[Geography_Germany] = 1)
    ```
    This filters the rows down to the ones with Germany as their geography (Geography_Germany equals one).


1. Repeat to add churn rates for France and Spain using the follow Formulas. 
    
    For Spain's churn rate:

    ```python
    Spain Churn = CALCULATE(customer_churn_test_predictions(Churn Rate), customer_churn_test_predictions[Geography_Spain] = 1)
    ```
    and for France's churn rate:

    ```python
    France Churn = CALCULATE(customer_churn_test_predictions(Churn Rate), customer_churn_test_predictions[Geography_France] = 1)
    ```

## Create new report

Once that you are done with all operations, select "New report" for a blank report that has all the new measures based on the above operations in order to create a new report. 

To create the report:

1. Start by clicking on the text box to add the title of the report, "Bank Customer Churn".

1. Add your card for the Churn Rate to display at the top right. Select Card from the "Build Visual" section, then select the "Churn Rate" from Data.


<!--    <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-10.png"  width="100%" height="70%"> -->


1. Select the "Line and stacked column chart" from "Build visual". Select "age" for the x-axis, "Churn Rate" for column y-axis, and "Customers" for the line y-axis.

<!--     <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-11.png"  width="100%" height="70%"> -->


1. Select the "Line and stacked column chart" from "Build visual". You pick the "NumOfProducts" for x-axis, the "Churn Rate" for column y-axis, and the "Customers" for the line y-axis.

    <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-12.png"  width="100%" height="70%">


1. Select the "Stacked column chart" from "Build visual". Select "NewCreditsScore" for x-axis and  "Churn Rate" for y-axis. You can rename the "NewCreditsScore" to "Credit Score" by clicking on the middle tab which is "Format your visual" and then make changes to the title of x-axis.

<!--    <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-13a2.png"  width="100%" height="70%">
    <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-13b.png"  width="100%" height="70%"> -->


1. Select the "Clustered column chart" from "Build visual". You pick "Germany Churn", "Spain Churn", "France Churn" in current order for the y-axis.

<!--     <img src="https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn/step-14-2.png"  width="100%" height="70%"> -->

The Power BI report shows that customers who use more than two of the bank products will have a higher churn rate although few customers had more than two products. Bank should collect more data, but also investigate additional features correlated with more products (*see the plot in the bottom left panel).
It can be realized that bank customers in Germany would have a higher churn rate than in France and Spain (*see the plot in the bottom right panel), which suggests that an investigation into what has encouraged customers to leave could be beneficial.
There are more middle aged customers (between 25-45) and customers between 45-60 tend to exit more.
Finally, we can see that customers with lower credit scores would most likely leave the bank for other financial institutes so the bank should look into ways that encourage customers with lower credit scores and account balances to stay with the bank.


## Next steps

- [How to use end-to-end AI samples in Microsoft Fabric](use-ai-samples.md)
- 
NEW INSTRUCTIONS:
> [!NOTE]
> This shows an illustrated example of how you would analyze the saved prediction results in Power BI. However, for a real customer churn use-case, the platform user may have to do more thorough ideation of what visualizations to create, based on subject matter expertise, and what their firm and business analytics team has standardized as metrics.

To generate the Power BI report:

1. On the left panel, select **OneLake data hub** and then select the same lakehouse that you used in this tutorial series. On the top right, select **Open** and then select **New Power BI dataset** on the top ribbon and select the table name in which you have saved the prediction results, e.g., customer_churn_test_predictions. Finally, select **Continue** to create a new Power BI dataset linked to the predictions data that was generated in Step 6.

1. Once the page for the new dataset loads, rename the dataset by selecting the dropdown at top left corner of the dataset page and entering a more user-friendly name, e.g., bank_churn_predictions. Then click anywhere outside the dropdown to apply the name change.

1. On the tools at the top of the dataset page, select **New report** to open the Power BI report authoring page.

## Next step

[How-to use end-to-end AI samples in Microsoft Fabric](use-ai-samples.md).