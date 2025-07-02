---
title: Tutorial- Use a notebook with Apache Spark to query a KQL database
description: Learn how to import and query the NYC GreenTaxi notebook in your Real-Time Intelligence in Microsoft Fabric environment using Apache Spark.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom: sfi-image-nochange
ms.date: 12/24/2024
ms.search.form: Notebooks
---
# Tutorial: Use a notebook with Apache Spark to query a KQL database

Notebooks are both readable documents containing data analysis descriptions and results and executable documents that can be run to perform data analysis. In this article, you learn how to use a [!INCLUDE [product-name](../includes/product-name.md)] notebook to read and write data to a KQL database using Apache Spark. This tutorial uses precreated datasets and notebooks in both the Real-Time Intelligence and the Data Engineering environments in [!INCLUDE [product-name](../includes/product-name.md)]. For more information on notebooks, see [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

Specifically, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL database
> * Import a notebook
> * Write data to a KQL database using Apache Spark
> * Query data from a KQL database

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## 1- Create a KQL database

1. Select your workspace from the left navigation bar.

1. Follow one of these steps to start creating an eventstream:
    * Select **New item** and then **Eventhouse**. In the **Eventhouse name** field, enter *nycGreenTaxi*, then select **Create**. A KQL database is generated with the same name.
    * In an existing eventhouse, select **Databases**. Under **KQL databases** select **+**, in the **KQL Database name** field, enter *nycGreenTaxi*, then select **Create**.

1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere, like a notepad, to use in a later step.

    :::image type="content" source="media/spark-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## 2- Download the NYC GreenTaxi notebook

We've created a sample notebook that takes you through all the necessary steps for loading data into your database using the Spark connector.

1. Open the Fabric samples repository on GitHub to download the [NYC GreenTaxi KQL notebook.](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/NYC_GreenTaxi_KQL_notebook.ipynb).

    :::image type="content" source="media/spark-connector/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC GreenTaxi notebook. The Raw option is highlighted." lightbox="media/spark-connector/raw-notebook.png":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## 3- Import the notebook

The rest of this workflow occurs in the **Data Engineering** section of the product, and uses a Spark notebook to load and query data in your KQL database.

1. From your workspace select **Import** > **Notebook** >  **From this computer** > **Upload** then choose the NYC GreenTaxi notebook you downloaded in a previous step.

    :::image type="content" source="media/spark-connector/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Once the import is complete, open the notebook from your workspace.

## 4- Get data

To query your database using the Spark connector, you need to give read and write access to the NYC GreenTaxi blob container.

Select the **play** button to run the following cells, or select the cell and press **Shift+ Enter**. Repeat this step for each code cell.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

1. Run the following cell to enable access to the NYC GreenTaxi blob container.

    :::image type="content" source="media/spark-connector/code-cell-1.png" alt-text="Screenshot of first code cell showing storage access information." lightbox="media/spark-connector/code-cell-1.png":::

1. In **KustoURI**, paste the **Query URI** that you [copied earlier](#1--create-a-kql-database) instead of the placeholder text.
1. Change the placeholder database name to *nycGreenTaxi*.
1. Change the placeholder table name to *GreenTaxiData*.

    :::image type="content" source="media/spark-connector/code-cell-2.png" alt-text="Screenshot of second code cell showing the target database information. The Query URI, the database name, and the table name are highlighted."  lightbox="media/spark-connector/code-cell-2.png":::

1. Run the cell.

1. Run the next cell to write data to your database. It can take a few minutes for this step to complete.

    :::image type="content" source="media/spark-connector/code-cell-3.png" alt-text="Screenshot of third code cell showing table mapping and ingestion command."  lightbox="media/spark-connector/code-cell-3.png":::

Your database now has data loaded in a table named *GreenTaxiData*.

## 5- Run the notebook

Run the remaining two cells sequentially to query data from your table. The results show the top 20 highest and lowest taxi fares and distances recorded by year.

:::image type="content" source="media/spark-connector/query-example.png" alt-text="Screenshot of fourth and fifth code cell showing the query results."  lightbox="media/spark-connector/query-example-extended.png":::

## 6- Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** [...] > **Delete**.

    :::image type="content" source="media/spark-connector/clean-resources.png" alt-text="Screenshot of workspace showing the dropdown menu of the NYC GreenTaxi notebook. The option titled Delete is highlighted."  lightbox="media/spark-connector/clean-resources-expanded.png":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
