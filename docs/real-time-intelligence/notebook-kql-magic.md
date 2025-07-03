---
title: Use a Notebook with Kqlmagic to Query a KQL database
description: Kqlmagic tutorial. Learn how to import the NYCtaxicab notebook to query the KQL database.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 06/29/2025
ms.search.form: notebook kqlmagic Jupyter
---
# Tutorial: Use a Fabric notebook with Kqlmagic to query a KQL database

Fabric notebooks allow you to create and share documents containing live code, equations, visualizations, and narrative text. It's useful for a wide range of tasks, such as data cleaning and transformation, numerical simulation, statistical modeling, data visualization, and machine learning.

[Kqlmagic](https://github.com/microsoft/jupyter-Kqlmagic) extends the capabilities of the Python kernel in Fabric notebooks so you can run [Kusto Query Language (KQL)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context&pivots=fabric) queries natively from notebook cells. You can combine Python and KQL to query and visualize data using the rich Plotly library integrated with the [render](/azure/data-explorer/kusto/query/renderoperator?context=/fabric/context/context&pivots=fabric) operator.

For more information on notebooks, see [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

In this tutorial, you learn how to use Kqlmagic to run advanced queries and visualizations from data in a KQL database. It uses pre-created datasets and notebooks in both the Real-Time Intelligence and the Data Engineering environments in [!INCLUDE [product-name](../includes/product-name.md)]. 

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL database
> * Get data
> * Import a notebook with Kqlmagic
> * Run the notebook

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## 1. Create a KQL database

In this step, you create an empty KQL database named NYCTaxiDB in your workspace or in an existing Eventhouse.

1. Select your workspace from the left navigation bar.

1. Follow one of these steps to start creating a KQL database:
    * Select **New item** and then **Eventhouse**. In the **Eventhouse name** field, enter *NYCTaxiDB*, then select **Create**. A KQL database is generated with the same name.
    * In an existing eventhouse, select **Databases**. Under **KQL databases** select **+**, in the **KQL Database name** field, enter *NYCTaxiDB*, then select **Create**.

1. Select the **NYCTaxiDB** database, expand **Database details**, copy the **Query URI** and paste it somewhere, like a notepad, to use in a later step.

    :::image type="content" source="media/spark-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## 2. Get data

In this step, you use a script to first create a table with specified mapping, and then get data from a public blob into this table.

1. Copy the KQL script from the [Fabric samples repository on GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/IngestNYCTaxi2014.kql)

    :::image type="content" source="media/jupyter-notebook/copy-kql-script.png" alt-text="Screenshot of GitHub repository showing the KQL script for the NYC Taxi demo notebook. The copy icon is highlighted."  lightbox="media/jupyter-notebook/copy-kql-script.png":::

1. Browse to your KQL database.

1. Select **Query with code** to open an empty tab in the **NYCTaxiDB_queryset**.

1. Paste the KQL script from step 1. and select the **Run** button.

    The first query creates the table and schema mapping. The output of this query shows the table and mapping creation information, including the type of command and the result of *Completed* when finished.
    The second query loads your data. It might take a few minutes for the data loading to complete.

    :::image type="content" source="media/jupyter-notebook/data-map-ingest.png" alt-text="Screenshot of the queryset window showing the completed state of the table mapping and data ingestion."  lightbox="media/jupyter-notebook/data-map-ingest.png":::

1. Refresh the queryset and select **Tables** to see an overview of the newly created table named *trips2*. From here you can expand the table schema, preview the data, and view query insights.

    :::image type="content" source="media/jupyter-notebook/nyc-taxi-table.png" alt-text="Screenshot of the Tables tab showing the trips2 table."  lightbox="media/jupyter-notebook/nyc-taxi-table.png":::

## 3. Download the NYC Taxi demo notebook

Use a sample notebook to query and visualize the sample data you loaded in your KQL database.

1. Open the Fabric samples repository on GitHub and download the [NYC Taxi KQL Notebook.](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/NYC_Taxi_KQL_Notebook.ipynb).

    :::image type="content" source="media/jupyter-notebook/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC Taxi demo notebook. The option titled Raw is highlighted."  lightbox="media/jupyter-notebook/raw-notebook.png":::

1. Download the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## 4. Import the notebook

The rest of this workflow uses Kqlmagic to query and visualize the data in your KQL database.

1. In your Workspace, select **Import** > **Notebook** < **From this computer**.

    :::image type="content" source="media/jupyter-notebook/import-notebook.png" alt-text="Screenshot of item options in Data Engineering. The item titled Import notebook is highlighted.":::

1. In the **Import status** pane, select **Upload**.

    :::image type="content" source="media/jupyter-notebook/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC Taxi KQL Notebook that you downloaded in [step 3](#3-download-the-nyc-taxi-demo-notebook).

1. Once the import is complete, select **Go to workspace** and open this notebook.

    :::image type="content" source="media/jupyter-notebook/go-to-workspace.png" alt-text="Screenshot of upload completed successfully and go to workspace.":::

## 5. Run the notebook

Select the **play** button to run each cell sequentially, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

:::image type="content" source="media/jupyter-notebook/run-cell.png" alt-text="Screenshot of cell block showing import command. The Play button is highlighted.":::

Run the remaining cells sequentially to create a heatmap of NYC taxi pickups.
For more information on Kqlmagic, see [Use a Jupyter Notebook and Kqlmagic extension to analyze data](/azure/data-explorer/kqlmagic?context=/fabric/context/context.)

1. The following cell aggregates all pickups within the specified geographic boundary.

    :::image type="content" source="media/jupyter-notebook/aggregate-pickups.png" alt-text="Screenshot of code cell showing aggregation query." lightbox="media/jupyter-notebook/aggregate-pickups.png":::

1. Run the following cell to draw a heatmap of NYC taxi pickups.

    :::image type="content" source="media/jupyter-notebook/draw-heatmap.png" alt-text="Screenshot of code cell showing query to create heatmap."  lightbox="media/jupyter-notebook/draw-heatmap.png":::

    In the resulting heatmap, you can see that most of the taxi pickups are in the lower Manhattan area. In addition, there are also many taxi pickups at JFK and La Guardia airport.

    :::image type="content" source="media/jupyter-notebook/heat-map.jpg" alt-text="Screenshot of notebook showing a heatmap of NYC taxi pickups.":::

## 6. Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** [...] > **Delete**.

    :::image type="content" source="media/jupyter-notebook/clean-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC Taxi notebook. The option titled Delete is highlighted."  lightbox="media/jupyter-notebook/clean-resources.png":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Related content

* [Query data in the KQL Queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
