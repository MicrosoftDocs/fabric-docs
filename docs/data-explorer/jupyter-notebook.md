---
title: Tutorial- Import a Jupyter notebook
description: Learn how to import the NYCtaxicab notebook into your trident environment.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 01/04/2023

---

# Tutorial: Import a Jupyter Notebook

In this article, you'll learn how to build the NYC taxi notebook in your Trident environment.

This tutorial uses the NYCtaxicab sample demo to run you through creating a Jupyter notebook.

In this tutorial you'll learn how to:

> [!div class="checklist"]
>
> * Create a database and get data
> * Import a Jupyter notebook
> * Authenticate access to your notebook
> * Run the notebook

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace.

Before we import the NYC Taxi notebook, we need to create a database and get data.

## Create a Kusto database

1. Open the app switcher on the bottom of the navigation pane and select **Data Explorer**.

    :::image type="content" source="media/jupyter-notebook/app-switcher-kusto.png" alt-text="Screenshot of app switcher showing Trident apps. The app titled Data Explorer is highlighted.":::

1. Select **Kusto Database**.

    :::image type="content" source="media/jupyter-notebook/kusto-database.png" alt-text="Screenshot of Kusto items. The item titled Kusto database is highlighted.":::

1. Name your database, then select **Create**.

    :::image type="content" source="media/jupyter-notebook/nyctaxi-database.png" alt-text="Screenshot of New Database naming window. The name bar and the create button are highlighted.":::

1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere to use in [Device Code authentication](#device-code-authentication).

    :::image type="content" source="media/jupyter-notebook/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

### Get data

1. Copy the KQL script from the [Customer Success Engineering GitHub repository](https://github.com/Azure/kusto-adx-cse/blob/30e36d1c92f09d2bbb9d080f78789b9bd7829176/KQLDemos/SampleData/IngestNYCTaxi2014.kql.)

    :::image type="content" source="media/jupyter-notebook/copy-kql-script.png" alt-text="Screenshot of GitHub repository showing the KQL script for the NYC Taxi demo notebook. The copy icon is highlighted.":::

1. Select **Quick query** in your database, then paste the KQL script.  

    :::image type="content" source="media/jupyter-notebook/paste-script.png" alt-text="Screenshot of Quick query showing the KQL script copied from the GitHub repository. ":::

1. Run the first query to create the table and schema mapping.

    :::image type="content" source="media/jupyter-notebook/mapping-query.png" alt-text="Screenshot of Quick query showing the results of the table and schema mapping query.":::

1. Run the second query to load your data. It might take a few minutes for the ingestion to be complete.

:::image type="content" source="media/jupyter-notebook/ingestion-query.png" alt-text="Screenshot of Quick query showing the results of the ingestion query.":::

## Download the NYC Taxi demo notebook

1. Open the Customer Success Engineering code sample repository on GitHub to download the [NYC Taxi demo Notebook and KQL.](https://github.com/Azure/kusto-adx-cse/blob/30e36d1c92f09d2bbb9d080f78789b9bd7829176/KQLDemos/JupiterNotebook/NYC%20Taxi%20KQL%20demo.ipynb).
1. Select **Raw** to view the unprocessed version of the notebook.
    :::image type="content" source="media/jupyter-notebook/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC Taxi demo notebook. The option titled Raw is highlighted.":::
1. Press **Ctrl+S** to save the notebook locally to your device.

    >[!NOTE]
    >The notebook should be an `.ipynb` file. To save your notebook as an `.ipynb` file, select **All files** under **Save as Type**, or remove `.txt` from the file name.
1. Select **Save**.

:::image type="content" source="media/jupyter-notebook/download-notebook.png" alt-text="Screenshot of Download window showing the NYC Taxi notebook demo as the file name. The file type and the save button are highlighted.":::

## Import the Jupyter notebook

1. Open the app switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/jupyter-notebook/app-switcher-dataengineering.png" alt-text="Screenshot of app switcher showing Trident apps. The app titled Data Engineering is highlighted.":::

1. In the Data Engineering homepage, select **Import notebook**.

    :::image type="content" source="media/jupyter-notebook/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. Select **Upload** on the **Import status** window.

    :::image type="content" source="media/jupyter-notebook/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYCTaxi Notebook you downloaded earlier.
1. Once the import is complete, return to your workspace to open your notebook.

## Load packages

Select the **play** button to run each cell, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

>[!NOTE]
>Wait for the completion check mark to appear before running the next cell.

:::image type="content" source="media/jupyter-notebook/run-cell.png" alt-text="Screenshot of cell block showing import command. The Play button is highlighted.":::

## Device Code authentication

1. Paste the **Query endpoint URI** that you copied in [Create a Kusto database](#create-a-kusto-database) instead of the cluster URL, then change the database name to **NYCtaxi**.

     :::image type="content" source="media/jupyter-notebook/paste-query-uri.png" alt-text="Screenshot of code cell showing the database name and query URI. The query URI and database name are highlighted.":::

1. Run the cell.
1. Copy the code that appears to activate the sign-in window.

    :::image type="content" source="media/jupyter-notebook/copy-code.png" alt-text="Screenshot of code cell showing authentication code. The Copy to clipboard button is highlighted.":::

1. Paste the code in the window that appears, then select **Next**

    :::image type="content" source="media/jupyter-notebook/paste-code.png" alt-text="Screenshot of the past code window. The Next button is highlighted.":::

1. Enter your details in the sign-in window, then select **Next** to sign into KustoClient.

    :::image type="content" source="media/jupyter-notebook/sign-in.png" alt-text="Screenshot of sign-in window. The Next button is highlighted.":::

1. Close the sign-in confirmation window.

    :::image type="content" source="media/jupyter-notebook/kustoclient-confirmation.png" alt-text="Screenshot of KustoClient sign-in confirmation page.":::

1. Run the next cell to check if your sign-in was successful. It should return a row count.

## Run the notebook

Run the remaining cells to see how render commands work through KQL magic and to begin creating a heatmap of taxi pickups in NYC.

The following cell aggregates all pickups within the specified geographic boundary.

:::image type="content" source="media/jupyter-notebook/aggregate-pickups.png" alt-text="Screenshot of code cell showing aggregation query.":::

Run the following cell to draw a map by plotting a heatmap over a scatter plot.

:::image type="content" source="media/jupyter-notebook/draw-heatmap.png" alt-text="Screenshot of code cell showing query to create heatmap.":::

The heatmap will look like this:

:::image type="content" source="media/jupyter-notebook/heat-map.png" alt-text="Image showing a heatmap of NYC taxi pickups.":::

You can also mark the map to show the results of a clustering function using the following query.

:::image type="content" source="media/jupyter-notebook/starred-query.png" alt-text="Screenshot of code cell showing query for starring data.":::

The heatmap will look like this:

:::image type="content" source="media/jupyter-notebook/starred-map.png" alt-text="Image of map showing different sized stars that signify the results of a clustering function.":::

## Clean up resources

If you don't want to keep the NYC Taxi demo notebook, go to your workspace to delete it.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/jupyter-notebook/cleanup-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC Taxi notebook. The option titled Delete is highlighted.":::

1. Select **Delete** if you're sure you want to delete the notebook. You can't recover your notebook once you delete it.

:::image type="content" source="media/jupyter-notebook/delete-notebook.png" alt-text="Screenshot of Delete window showing a confirmation message. The button titled Delete is highlighted.":::

## Next steps

<!-- TODO- Find out which page to link to-->