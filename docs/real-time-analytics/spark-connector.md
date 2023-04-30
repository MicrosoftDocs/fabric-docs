---
title: Tutorial- Use a notebook with Apache Spark to query a KQL Database in Real-time Analytics
description: Learn how to import and query the NYC GreenTaxi notebook in your Microsoft Fabric environment using Apache Spark.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Tutorial: Use a notebook with Apache Spark to query a KQL Database

Notebooks are both readable documents containing data analysis descriptions and results as well as executable documents that can be run to perform data analysis. In this article, you learn how to use a [!INCLUDE [product-name](../includes/product-name.md)] notebook to read and write data to a KQL Database using Apache Spark. This tutorial uses precreated datasets and notebooks in both the Real-time Analytics and the Data Engineering environments in [!INCLUDE [product-name](../includes/product-name.md)]. For more information on notebooks, see [How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

Specifically, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database
> * Import a notebook
> * Write data to a KQL Database using Apache Spark
> * Query data from a KQL Database

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)

Before we import the NYC GreenTaxi notebook, we need to create a database.

## 1- Create a KQL Database

1. Open the experience switcher on the bottom of the navigation pane and select **Real-Time Analytics**.

    :::image type="content" source="media/spark-connector/app-switcher-kusto.png" alt-text="Screenshot of experience switcher showing Microsoft Fabric's experiences. Real-time analytics is highlighted.":::

1. Select **KQL Database**.

   :::image type="content" source="media/spark-connector/kql-database.png" alt-text="Screenshot of the Real-time Analytics homepage that shows the items that can be created. The item titled KQL Database is highlighted.":::

1. Under **KQL Database name**, enter *nycGreenTaxi*, then select **Create**.

    :::image type="content" source="media/spark-connector/new-database.png" alt-text="alt text Screenshot of New Database window showing the database name. The Create button is highlighted.":::

    The KQL database has now been created within the context of the selected workspace.

1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere to use in a later step.

    :::image type="content" source="media/spark-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## 2- Download the NYC GreenTaxi notebook

We've created a sample notebook that takes you through all the necessary steps for loading data into your database using the Spark connector.

1. Open the Fabric samples repository on GitHub to download the [NYC GreenTaxi KQL notebook.](https://github.com/microsoft/fabric-samples/blob/main/samples/real-time-analytics/NYC_GreenTaxi_KQL_notebook.ipynb).

    :::image type="content" source="media/spark-connector/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC GreenTaxi notebook. The option titled Raw is highlighted." lightbox="media/spark-connector/raw-notebook.png":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## 3- Import the notebook

The rest of this workflow occurs in the **Data Engineering** section of the product, and uses a Spark notebook to load and query data in your KQL Database.

1. Open the experience switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/spark-connector/app-switcher-dataengineering.png" alt-text="Screenshot of experience switcher showing available apps. The experience titled Data Engineering is highlighted.":::

1. Select **Import notebook**.

    :::image type="content" source="media/spark-connector/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. In the **Import status** window, select **Upload**.

    :::image type="content" source="media/spark-connector/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC GreenTaxi notebook you downloaded in a previous step.
1. Once the import is complete, return to your workspace to open this notebook.

## 4- Get data

To query your database using the Spark connector, you need to give read and write access to the NYC GreenTaxi blob container.

Select the **play** button to run the following cells, or select the cell and press **Shift+ Enter**. Repeat this step for each code cell.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

1. Run the following cell to enable access to the NYC GreenTaxi blob container.

    :::image type="content" source="media/spark-connector/code-cell1.png" alt-text="Screenshot of first code cell showing storage access information." lightbox="media/spark-connector/code-cell1.png":::

1. In **KustoURI**, paste the **Query URI** that you copied earlier instead of the placeholder text.
1. Change the placeholder database name to *nycGreenTaxi*.
1. Change the placeholder table name to *GreenTaxiData*.

    :::image type="content" source="media/spark-connector/code-cell2.png" alt-text="Screenshot of second code cell showing the target database information. The Query URI, the database name, and the table name are highlighted."  lightbox="media/spark-connector/code-cell2.png":::

1. Run the cell.

1. Run the next cell to write data to your database. It takes a few minutes for this step to complete.

    :::image type="content" source="media/spark-connector/code-cell3.png" alt-text="Screenshot of third code cell showing table mapping and ingestion command."  lightbox="media/spark-connector/code-cell3.png":::

Your database now has data.

## 5- Run the notebook

Run the remaining two cells sequentially to query data from your table. The results show the top 20 highest and lowest taxi fares and distances recorded by year.

:::image type="content" source="media/spark-connector/query-example.png" alt-text="Screenshot of fourth and fifth code cell showing the query results."  lightbox="media/spark-connector/query-example-extended.png":::

## 6- Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/spark-connector/cleanup-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC GreenTaxi notebook. The option titled Delete is highlighted."  lightbox="media/spark-connector/cleanup-resources-expanded.png":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Next steps

[Query data in a KQL Queryset](kusto-query-set.md)
