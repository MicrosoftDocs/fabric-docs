---
title: Tutorial- Use Apache Spark to query a KQL Database
description: Learn how to import the NYC GreenTaxi notebook into your [!INCLUDE [product-name](../includes/product-name.md)] environment using A[ache Spark.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 03/27/2023
ms.search.form: product-kusto
---

# Tutorial: Use Apache Spark to query a KQL Database

Intro

<!--The connector for Apache Spark is designed to efficiently transfer data between your KQL Database and Spark. This connector is available --->

<!--For more information, see--->

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database
> * Import a notebook
> * Write data to a KQL Database using Apache Spark
> * Read data from a KQL Database

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace.

Before we import the NYC GreenTaxi notebook, we need to create a database.

## Create a KQL Database

1. Open the experience switcher on the bottom of the navigation pane and select **Real-time Analytics**.

    :::image type="content" source="media/spark-connector/app-switcher-kusto.png" alt-text="Screenshot of experience switcher showing Microsoft Fabric's experiences. Real-time analytics is highlighted.":::

1. Select **KQL Database**.

   :::image type="content" source="media/spark-connector/kql-database.png" alt-text="Screenshot of the Real-time Analytics homepage that shows the items that can be created. The item titled KQL Database is highlighted.":::

1. Under **Database name**, enter *nycGreenTaxi*, then select **Create**.

    :::image type="content" source="media/spark-connector/new-database.png" alt-text="alt text Screenshot of New Database window showing the database name. The Create button is highlighted.":::

    The KQL database has now been created within the context of the selected workspace.

1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere to use in a later step.

    :::image type="content" source="media/spark-connector/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## Download the NYC GreenTaxi notebook

We've created a sample notebook that will take you through all the necessary steps for loading data into your database using the Spark connector.

1. Open the Azure Kusto Spark repository on GitHub to download the [NYC GreenTaxi notebook.](https://github.com/Azure/azure-kusto-spark/blob/master/samples/src/main/trident/NYC-GreenTaxi-Read-Write-Data-To-Kusto.ipynb).

    :::image type="content" source="media/spark-connector/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC GreenTaxi notebook. The option titled Raw is highlighted.":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## Import the Spark notebook

The rest of this workflow occurs in the **Data Engineering** section of the product, and uses a Spark notebook to load and query data in your KQL Database.

1. Open the experience switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/spark-connector/app-switcher-dataengineering.png" alt-text="Screenshot of experience switcher showing available apps. The experience titled Data Engineering is highlighted.":::

1. Select **Import notebook**.

    :::image type="content" source="media/spark-connector/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. In the **Import status** window, select **Upload**.

    :::image type="content" source="media/spark-connector/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC GreenTaxi notebook you downloaded in a previous step.
1. Once the import is complete, return to your workspace to open this notebook.

## Get data

Run the cells sequentially to create the table schema mapping and get data from the NYC Green Taxi blob container.

Select the **play** button to run each cell, or select the cell and press **Shift+ Enter**. Repeat this step for each code cell.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

1. Run the following cell to enable access to the NYC GreenTaxi blob container.

    :::image type="content" source="media/spark-connector/code-cell1.png" alt-text="Screenshot of first code cell showing storage access information.":::

1. In **KustoURI**, paste the **Query URI** that you copied earlier instead of the placeholder text.
1. Change the placeholder database name to **nycGreenTaxi**.

    :::image type="content" source="media/spark-connector/code-cell2.png" alt-text="Screenshot of second code cell showing the target database information.":::

1. Run the cell.

1. Run the next cell to write data to your database. It will take a few minutes for this step to be complete.

    :::image type="content" source="media/spark-connector/code-cell3.png" alt-text="Screenshot of third code cell showing table mapping and ingestion command.":::

## Run the notebook

Run the remaining two cells sequentially to read data from your table. The rto show the top 20 highest and lowest taxi fares and distances recorded by year.

:::image type="content" source="media/spark-connector/query-example.png" alt-text="Screenshot of fourth and fifth code cell showing the query results.":::

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/spark-connector/cleanup-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC GreenTaxi notebook. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Next steps

[Query data in a KQL queryset](kusto-query-set.md)
