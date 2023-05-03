---
title: Tutorial-  Use a notebook with kqlmagic to query a KQL Database
description: Learn how to import the NYCtaxicab notebook into your [!INCLUDE [product-name](../includes/product-name.md)] environment.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Tutorial: Use a notebook with kqlmagic to query a KQL Database

Notebooks are both readable documents containing data analysis descriptions and results as well as executable documents which can be run to perform data analysis. In this article, you'll learn how to use a Jupyter notebook to run advanced queries and visualizations from data in a KQL Database. This tutorial uses pre-created datasets and notebooks in both the Real-time Analytics and the Data Engineering environments in [!INCLUDE [product-name](../includes/product-name.md)]. For more information on notebooks, see [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

Specifically, you'll learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database
> * Get data
> * Import a Jupyter notebook
> * Authenticate access to your notebook
> * Run the notebook

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)

## 1- Create a KQL Database

Before we import the NYC Taxi notebook, we need to create a database to load the data into.

1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.
1. Select **KQL Database**.
1. Under **Database name**, enter *NYCTaxidb*, then select **Create**.
1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere, like a notepad, to use in a later step.

    :::image type="content" source="media/spark-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

The KQL database has now been created within the context of the selected workspace.

## 2- Get data

In this step, you'll use a script to first create a table with specified mapping, and then get data from a public blob into this table.

1. Copy the KQL script from the [Fabric samples repository on GitHub](https://github.com/microsoft/fabric-samples/blob/main/samples/real-time-analytics/IngestNYCTaxi2014.kql)

    :::image type="content" source="media/jupyter-notebook/copy-kql-script.png" alt-text="Screenshot of GitHub repository showing the KQL script for the NYC Taxi demo notebook. The copy icon is highlighted."  lightbox="media/jupyter-notebook/copy-kql-script.png":::

1. Navigate to your KQL database.
1. Select **Check your data** on the top right corner of the database summary page.
1. Paste the KQL script from step 1.

1. Place your cursor somewhere within the query, and select the **Run** button.

    The first query will run and create the table and schema mapping. The output of this query will show the table and mapping creation information, including the type of command and the result of *Completed* when finished.
    The second query will load your data. It might take a few minutes for the data loading to be complete.

    :::image type="content" source="media/jupyter-notebook/data-map-ingest.png" alt-text="Screenshot of the Check your data window showing the completed state of the table mapping and data ingestion."  lightbox="media/jupyter-notebook/data-map-ingest.png":::
1. Refresh your database. The table appears in the **Data tree**.

## 3- Download the NYC Taxi demo notebook

We've created a sample Jupyter notebook that will take you through all the necessary steps for query and visualization of the sample data you have just loaded in your KQL database.

1. Open the Fabric samples repository on GitHub to download the [NYC Taxi KQL Notebook.](https://github.com/microsoft/fabric-samples/blob/main/samples/real-time-analytics/NYC_Taxi_KQL_Notebook.ipynb).

    :::image type="content" source="media/jupyter-notebook/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC Taxi demo notebook. The option titled Raw is highlighted."  lightbox="media/jupyter-notebook/raw-notebook.png":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## 4- Import the Jupyter notebook

The rest of this workflow occurs in the **Data Engineering** section of the product, and uses a Jupyter notebook to query and visualize the data in your KQL Database.

1. Open the app switcher on the bottom of the navigation pane and select **Data Engineering**.

1. In the Data Engineering homepage, select **Import notebook**.

    :::image type="content" source="media/jupyter-notebook/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. In the **Import status** window, select **Upload**.

    :::image type="content" source="media/jupyter-notebook/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC Taxi KQL Notebook that you downloaded in a previous step.
1. Once the import is complete, return to your workspace to open this notebook.

## 5- Load packages

Select the **play** button to run each cell, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

:::image type="content" source="media/jupyter-notebook/run-cell.png" alt-text="Screenshot of cell block showing import command. The Play button is highlighted.":::

## 6- Device Code authentication

1. Paste the **Query URI** that you copied earlier instead of the placeholder cluster text.
1. Change the placeholder database name to **NYCTaxidb**.

    :::image type="content" source="media/jupyter-notebook/paste-query-uri.png" alt-text="Screenshot of code cell showing the database name and query URI. The query URI and database name are highlighted.":::

1. Run the cell.
1. An authentication code appears below the cell. Copy this authentication code.

    :::image type="content" source="media/jupyter-notebook/copy-code.png" alt-text="Screenshot of code cell showing authentication code. The Copy to clipboard button is highlighted.":::

1. Paste the code in the popup window, then select **Next**

    :::image type="content" source="media/jupyter-notebook/paste-code.jpg" alt-text="Screenshot of the past code window. The Next button is highlighted.":::

1. Enter your details in the sign-in window, then select **Next** to sign into KustoClient.

    :::image type="content" source="media/jupyter-notebook/sign-in.png" alt-text="Screenshot of sign-in window. The Next button is highlighted.":::

1. Close the sign-in confirmation window.

    :::image type="content" source="media/jupyter-notebook/kustoclient-confirmation.jpg" alt-text="Screenshot of KustoClient sign-in confirmation page.":::

1. Run the next cell to check if your sign-in was successful. If successful, the query will return a row count.

## 7- Run the notebook

Run the remaining cells sequentially to see how render commands work through kqlmagic and begin creating a heatmap of taxi pickups in NYC.
For more information on kqlmagic, see [Use a Jupyter Notebook and kqlmagic extension to analyze data ](/azure/data-explorer/kqlmagic).

1. The following cell aggregates all pickups within the specified geographic boundary.

    :::image type="content" source="media/jupyter-notebook/aggregate-pickups.png" alt-text="Screenshot of code cell showing aggregation query.":::

1. Run the following cell to draw a map by plotting a heatmap over a scatter plot.

    :::image type="content" source="media/jupyter-notebook/draw-heatmap.png" alt-text="Screenshot of code cell showing query to create heatmap.":::

    The heatmap should look like the following image:

    :::image type="content" source="media/jupyter-notebook/heat-map.jpg" alt-text="Screenshot of notebook showing a heatmap of NYC taxi pickups.":::

1. You can also mark the map to show the results of a clustering function using the following query.

    :::image type="content" source="media/jupyter-notebook/starred-query.png" alt-text="Screenshot of code cell showing query for starring data.":::

    The heatmap will look like the following image:

    :::image type="content" source="media/jupyter-notebook/starred-map.jpg" alt-text="Screenshot of map showing different sized stars that signify the results of a clustering function.":::

## 8- Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/jupyter-notebook/clean-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC Taxi notebook. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
