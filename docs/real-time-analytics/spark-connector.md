---
title: Tutorial- use a Spark notebook to query a KQL Database
description: Learn how to import the NYC GreenTaxi notebook into your [!INCLUDE [product-name](../includes/product-name.md)] environment using the Spark connector.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 03/27/2023
ms.search.form: product-kusto
---

# Tutorial: Use a Spark notebook to query a KQL Database

Intro

For more information...

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a database
> * Import a notebook
> * Get data using the Spark connector
> * Run the notebook

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace
* [KQL Database](create-database.md)

Before we import the NYC GreenTaxi notebook, we need to create a database.

## Create a KQL Database

1. Open the app switcher on the bottom of the navigation pane and select **Data Explorer**.

    :::image type="content" source="media/spark-connector/app-switcher-kusto.png" alt-text="Screenshot of experience switcher showing Microsoft Fabric's experiences. The experience titled Real-time analytics is highlighted.":::

1. Select **Kusto Database**.

    :::image type="content" source="media/jupyter-notebook/kusto-database.png" alt-text="Screenshot of Kusto items. The item titled Kusto database is highlighted.":::

1. Name your database, then select **Create**.

    :::image type="content" source="media/jupyter-notebook/nyctaxi-database.png" alt-text="Screenshot of New Database naming window. The name bar and the create button are highlighted.":::

1. Copy the **Query URI** from the **database details card** in the database dashboard and paste it somewhere to use in [Device Code authentication](#device-code-authentication).

    :::image type="content" source="media/jupyter-notebook/query-uri.png" alt-text=" Screenshot of the database details card that shows the database details. The Query URI option titled Copy URI is highlighted.":::

## Download the NYC GreenTaxi notebook

We've created a sample notebook that will take you through all the necessary steps for query and visualization of the sample data you have just loaded in your KQL Database.

1. Open the Azure Kusto Spark repository on GitHub to download the [NYC GreenTaxi notebook.](https://github.com/Azure/azure-kusto-spark/blob/master/samples/src/main/trident/NYC-GreenTaxi-Read-Write-Data-To-Kusto.ipynb).

    :::image type="content" source="media/spark-connector/raw-notebook.png" alt-text="Screenshot of GitHub repository showing the NYC GreenTaxi notebook. The option titled Raw is highlighted.":::

1. Save the notebook locally to your device.

    > [!NOTE]
    > The notebook must be saved in the `.ipynb` file format.

## Import the Jupyter notebook

The rest of this workflow occurs in the **Data Engineering** section of the product, and uses <!-- a Jupyter notebook to query and visualize the data in your KQL Database.-->

1. Open the experience switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/spark-connector/app-switcher-dataengineering.png" alt-text="Screenshot of experience switcher showing available apps. The experience titled Data Engineering is highlighted.":::

1. In the Data Engineering homepage, select **Import notebook**.

    :::image type="content" source="media/spark-connector/import-notebook.png" alt-text="Screenshot of artifact options in Data Engineering. The artifact titled Import notebook is highlighted.":::

1. In the **Import status** window, select **Upload**.

    :::image type="content" source="media/spark-connector/upload-notebook.png" alt-text="Screenshot of Import status window. The button titled Upload is highlighted.":::

1. Select the NYC GreenTaxi notebook you downloaded in a previous step.
1. Once the import is complete, return to your workspace to open this notebook.

## Run the notebook and get data

Run the remaining cells sequentially to see how render commands work through kqlmagic and begin creating a heatmap of taxi pickups in NYC.
For more information on kqlmagic, see

1. Paste the **Query endpoint URI** of the database in which you placed the sample data. This URI can be found in the [Database details](create-database.md#database-details) page. Use this URI instead of the placeholder cluster text.
1. Change the placeholder database name to **NYCtaxi**.

## Get data

Select the **play** button to run each cell, or select the cell and press **Shift+ Enter**. Repeat this step for each package.

> [!NOTE]
> Wait for the completion check mark to appear before running the next cell.

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the notebook you want to delete, select the **More menu** > **Delete**.

    :::image type="content" source="media/spark-connector/cleanup-resources.png" alt-text="Screenshot of workspace showing the drop-down menu of the NYC GreenTaxi notebook. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover your notebook once you delete it.

## Next steps

[Query data in the KQL queryset](kusto-query-set.md)
