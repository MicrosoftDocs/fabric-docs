---
title: Tutorial- Import a Jupyter notebook
description: Learn how to import the NYCtaxicab notebook into your trident environment.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 01/04/2023

---

# Tutorial: Query a Kusto database using a Jupyter notebook

In this article, you'll learn how to use a Jupyter notebook to run advanced queries and visualizations. This tutorial uses pre-created dataset and notebooks in both the Kusto and the Data Engineering environments in Trident.

In this tutorial you'll learn how to:

> [!div class="checklist"]
>
> * Get data
> * Import a Jupyter notebook
> * Authenticate access to your notebook
> * Run the notebook

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace
* [Kusto database](create-database.md)

## Get data

In this step, you'll use a script to first create a table with specified mapping, and then get data from a public blob into this table.

1. Copy the KQL script from the [Customer Success Engineering GitHub repository](https://github.com/Azure/kusto-adx-cse/blob/30e36d1c92f09d2bbb9d080f78789b9bd7829176/KQLDemos/SampleData/IngestNYCTaxi2014.kql.)

    :::image type="content" source="media/jupyter-notebook/copy-kql-script.png" alt-text="Screenshot of GitHub repository showing the KQL script for the NYC Taxi demo notebook. The copy icon is highlighted.":::

1. Navigate to your Kusto Database.
1. Select **Quick query** on the top right corner of the database summary page.
1. Paste the KQL script from step 1.

    :::image type="content" source="media/jupyter-notebook/paste-script.png" alt-text="Screenshot of Quick query showing the KQL script copied from the GitHub repository. ":::

1. Place your cursor somewhere within the first query, and select the **Run** button. The first query will run and create the table and schema mapping. The output of this query will show the table and mapping creation information, including the type of command and the result of *Completed* when finished.

    :::image type="content" source="media/jupyter-notebook/mapping-query.png" alt-text="Screenshot of Quick query showing the results of the table and schema mapping query.":::

1. Place your cursor somewhere within the second query, and select the **Run** button. The second query will load your data. It might take a few minutes for the data loading to be complete.

    :::image type="content" source="media/jupyter-notebook/ingestion-query.png" alt-text="Screenshot of Quick query showing the results of the ingestion query.":::

## Download the NYC Taxi demo notebook

We have created a sample Jupyter notebook that will take you through all the necessary steps for query and visualization of the sample data you have just loaded in your Kusto Database.

1. Open the Customer Success Engineering code sample repository on GitHub to download the [NYC Taxi demo Notebook and KQL.](https://github.com/Azure/kusto-adx-cse/blob/30e36d1c92f09d2bbb9d080f78789b9bd7829176/KQLDemos/JupiterNotebook/NYC%20Taxi%20KQL%20demo.ipynb).
1. Select **Raw** to view the unprocessed version of the notebook.
    
    :::image type="content" source="media/jupyter-notebook/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC Taxi demo notebook. The option titled Raw is highlighted.":::

1. Save the notebook locally to your device.

    >[!NOTE]
    > The notebook must be saved in the `.ipynb` file format. 

## Import the Jupyter notebook

1. Open the app switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/jupyter-notebook/app-switcher-dataengineering.png" alt-text="Screenshot of app switcher showing Trident apps. The app titled Data Engineering is highlighted.":::

1. In the Data Engineering homepage, select **Import notebook**.

    :::image type="content" source="media/jupyter-notebook/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. In the **Import status** window, select **Upload**.

    :::image type="content" source="media/jupyter-notebook/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYCTaxi Notebook you downloaded in a previous step.
1. Once the import is complete, return to your workspace to open this notebook.

## Load packages

Select the **play** button to run each cell, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

:::image type="content" source="media/jupyter-notebook/run-cell.png" alt-text="Screenshot of cell block showing import command. The Play button is highlighted.":::

## Device Code authentication

1. Paste the **Query endpoint URI** that you copied in [Create a Kusto database](#create-a-kusto-database). Use this instead of the placeholder cluster URL. Change the placeholder database name to **NYCtaxi**.

    :::image type="content" source="media/jupyter-notebook/paste-query-uri.png" alt-text="Screenshot of code cell showing the database name and query URI. The query URI and database name are highlighted.":::

1. Run the cell.
1. Copy the code that appears.

    :::image type="content" source="media/jupyter-notebook/copy-code.png" alt-text="Screenshot of code cell showing authentication code. The Copy to clipboard button is highlighted.":::

1. Paste the code in the popup window, then select **Next**

    :::image type="content" source="media/jupyter-notebook/paste-code.jpg" alt-text="Screenshot of the past code window. The Next button is highlighted.":::

1. Enter your details in the sign-in window, then select **Next** to sign into KustoClient.

    :::image type="content" source="media/jupyter-notebook/sign-in.png" alt-text="Screenshot of sign-in window. The Next button is highlighted.":::

1. Close the sign-in confirmation window.

    :::image type="content" source="media/jupyter-notebook/kustoclient-confirmation.jpg" alt-text="Screenshot of KustoClient sign-in confirmation page.":::

1. Run the next cell to check if your sign-in was successful. If successful, the query will return a row count.

## Run the notebook

Run the remaining cells sequentially to see how render commands work through KQL magic and begin creating a heatmap of taxi pickups in NYC.

1. The following cell aggregates all pickups within the specified geographic boundary.

    :::image type="content" source="media/jupyter-notebook/aggregate-pickups.png" alt-text="Screenshot of code cell showing aggregation query.":::

1. Run the following cell to draw a map by plotting a heatmap over a scatter plot.

    :::image type="content" source="media/jupyter-notebook/draw-heatmap.png" alt-text="Screenshot of code cell showing query to create heatmap.":::

    The heatmap will look like the following image:

    :::image type="content" source="media/jupyter-notebook/heat-map.jpg" alt-text="Image showing a heatmap of NYC taxi pickups.":::

1. You can also mark the map to show the results of a clustering function using the following query.

    :::image type="content" source="media/jupyter-notebook/starred-query.png" alt-text="Screenshot of code cell showing query for starring data.":::

    The heatmap will look like the following image:

    :::image type="content" source="media/jupyter-notebook/starred-map.jpg" alt-text="Image of map showing different sized stars that signify the results of a clustering function.":::

## Clean up resources

If you don't want to keep the NYC Taxi demo notebook, go to your workspace to delete it.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/jupyter-notebook/cleanup-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC Taxi notebook. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover your notebook once you delete it.

    :::image type="content" source="media/jupyter-notebook/delete-notebook.png" alt-text="Screenshot of Delete window showing a confirmation message. The button titled Delete is highlighted.":::

## See also

* [Query data in the KQL queryset](kusto-query-set.md)
