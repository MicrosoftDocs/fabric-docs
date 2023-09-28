---
title: Tutorial-  Use a notebook with Kqlmagic to query a KQL database
description: Learn how to import the NYCtaxicab notebook into your Microsoft Fabric environment.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.custom: build-2023
ms.date: 09/28/2023
ms.search.form: Other
---
# Tutorial: Use a notebook with Kqlmagic to query a KQL database

[!INCLUDE [preview-note](../includes/preview-note.md)]

Notebooks are both readable documents containing data analysis descriptions and results as well as executable documents that can be run to perform data analysis. In this article, you learn how to use a Jupyter notebook to run advanced queries and visualizations from data in a KQL database. This tutorial uses precreated datasets and notebooks in both the Real-time Analytics and the Data Engineering environments in [!INCLUDE [product-name](../includes/product-name.md)]. For more information on notebooks, see [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

[Kqlmagic](https://github.com/microsoft/jupyter-Kqlmagic) extends the capabilities of the Python kernel in Jupyter Notebook so you can run [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context&pivots=fabric) queries natively. You can combine Python and KQL to query and visualize data using the rich Plot.ly library integrated with the [render](/azure/data-explorer/kusto/query/renderoperator?context=/fabric/context/context&pivots=fabric) operator.

Specifically, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL database
> * Get data
> * Import a Jupyter notebook
> * Authenticate access to your notebook
> * Run the notebook

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)

## 1- Create a KQL database

1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.
1. Select **KQL Database**.
1. Under **Database name**, enter *NYCTaxidb*, then select **Create**.
1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere, like a notepad, to use in a later step.

    :::image type="content" source="media/jupyter-notebook/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

The KQL database has now been created within the context of the selected workspace.

## 2- Get data

In this step, you use a script to first create a table with specified mapping, and then get data from a public blob into this table.

1. Copy the KQL script from the [Fabric samples repository on GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-analytics/IngestNYCTaxi2014.kql)

    :::image type="content" source="media/jupyter-notebook/copy-kql-script.png" alt-text="Screenshot of GitHub repository showing the KQL script for the NYC Taxi demo notebook. The copy icon is highlighted."  lightbox="media/jupyter-notebook/copy-kql-script.png":::

1. Browse to your KQL database.
1. Select **Explore your data** on the top right corner of the database summary page.
1. Paste the KQL script from step 1.

1. Place your cursor somewhere within the query, and select the **Run** button.

    The first query will run and create the table and schema mapping. The output of this query shows the table and mapping creation information, including the type of command and the result of *Completed* when finished.
    The second query loads your data. It might take a few minutes for the data loading to complete.

    :::image type="content" source="media/jupyter-notebook/data-map-ingest.png" alt-text="Screenshot of the Explore your data window showing the completed state of the table mapping and data ingestion."  lightbox="media/jupyter-notebook/data-map-ingest.png":::

1. Refresh your database. The table appears in the **Data tree**.

## 3- Download the NYC Taxi demo notebook

Use a sample Jupyter notebook to query and visualize the sample data you have just loaded in your KQL database.

1. Open the Fabric samples repository on GitHub to download the [NYC Taxi KQL Notebook.](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-analytics/NYC_Taxi_KQL_Notebook.ipynb).

    :::image type="content" source="media/jupyter-notebook/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC Taxi demo notebook. The option titled Raw is highlighted."  lightbox="media/jupyter-notebook/raw-notebook.png":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## 4- Import the Jupyter notebook

The rest of this workflow occurs in the **Data Engineering** section of the product[!INCLUDE [product-name](../includes/product-name.md)], and uses a Jupyter notebook to query and visualize the data in your KQL database.

1. Open the app switcher on the bottom of the navigation pane and select **Data Engineering**.

1. In the Data Engineering homepage, select **Import notebook**.

    :::image type="content" source="media/jupyter-notebook/import-notebook.png" alt-text="Screenshot of item options in Data Engineering. The item titled Import notebook is highlighted.":::

1. In the **Import status** pane, select **Upload**.

    :::image type="content" source="media/jupyter-notebook/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC Taxi KQL Notebook that you downloaded in [step 3](#3--download-the-nyc-taxi-demo-notebook).
1. Once the import is complete, select **Go to workspace** and open this notebook.

    :::image type="content" source="media/jupyter-notebook/go-to-workspace.png" alt-text="Screenshot of upload completed successfully and go to workspace.":::

## 5- Load packages

Select the **play** button to run each cell sequentially, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

:::image type="content" source="media/jupyter-notebook/run-cell.png" alt-text="Screenshot of cell block showing import command. The Play button is highlighted.":::

## 6- Device Code authentication

1. Paste the **Query URI** that you [copied earlier](#1--create-a-kql-database) instead of the placeholder cluster text.
1. Change the placeholder database name to *NYCTaxidb*.

    :::image type="content" source="media/jupyter-notebook/paste-uri.png" alt-text="Screenshot of code cell showing the database name and query URI. The query URI and database name are highlighted." lightbox="media/jupyter-notebook/paste-uri.png":::

1. Run the cell.
1. An authentication code appears below the cell. Copy this authentication code.

    :::image type="content" source="media/jupyter-notebook/copy-authentication-code.png" alt-text="Screenshot of code cell showing authentication code. The Copy to clipboard button is highlighted."  lightbox="media/jupyter-notebook/copy-authentication-code.png":::

1. Paste the code in the popup window, then select **Next**

    :::image type="content" source="media/jupyter-notebook/paste-code.jpg" alt-text="Screenshot of the paste code window. The Next button is highlighted.":::

1. Enter your details in the sign-in window, then select **Next** to sign into KustoClient.

    :::image type="content" source="media/jupyter-notebook/sign-in.png" alt-text="Screenshot of sign-in window. The Next button is highlighted.":::

1. Close the sign-in confirmation window.

    :::image type="content" source="media/jupyter-notebook/kustoclient-confirmation.jpg" alt-text="Screenshot of KustoClient sign-in confirmation page.":::

1. Run the next cell to check if your sign-in was successful. If successful, the query returns a row count.

## 7- Run the notebook

Run the remaining cells sequentially to see how render commands work through Kqlmagic and begin creating a heatmap of taxi pickups in NYC.
For more information on Kqlmagic, see [Use a Jupyter Notebook and Kqlmagic extension to analyze data](/azure/data-explorer/kqlmagic?context=/fabric/context/context.)

1. The following cell aggregates all pickups within the specified geographic boundary.

    :::image type="content" source="media/jupyter-notebook/aggregate-pickups.png" alt-text="Screenshot of code cell showing aggregation query." lightbox="media/jupyter-notebook/aggregate-pickups.png":::

1. Run the following cell to draw a map by plotting a heatmap over a scatter plot.

    :::image type="content" source="media/jupyter-notebook/draw-heatmap.png" alt-text="Screenshot of code cell showing query to create heatmap."  lightbox="media/jupyter-notebook/draw-heatmap.png":::

    The heatmap should look like the following image:

    :::image type="content" source="media/jupyter-notebook/heat-map.jpg" alt-text="Screenshot of notebook showing a heatmap of NYC taxi pickups.":::

1. You can also mark the map to show the results of a clustering function using the following query.

    :::image type="content" source="media/jupyter-notebook/starred-query.png" alt-text="Screenshot of code cell showing query for starring data."  lightbox="media/jupyter-notebook/starred-query.png":::

    The heatmap looks like the following image:

    :::image type="content" source="media/jupyter-notebook/starred-map.jpg" alt-text="Screenshot of map showing different sized stars that signify the results of a clustering function.":::

## 8- Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** [...] > **Delete**.

    :::image type="content" source="media/jupyter-notebook/clean-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC Taxi notebook. The option titled Delete is highlighted."  lightbox="media/jupyter-notebook/clean-resources.png":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Related content

* [Query data in the KQL Queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
