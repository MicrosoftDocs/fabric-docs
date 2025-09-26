---
title: Ingest Data into Your Warehouse Using Pipelines
description: Follow steps to ingest data into a Warehouse with pipelines in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 04/06/2025
ms.topic: how-to
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
ms.custom: sfi-image-nochange
---
# Ingest data into your Warehouse using pipelines

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Pipelines offer an alternative to using the COPY command through a graphical user interface. A pipeline is a logical grouping of activities that together perform a data ingestion task. Pipelines allow you to manage extract, transform, and load (ETL) activities instead of managing each one individually.

In this tutorial, you'll create a new pipeline that loads sample data into a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

> [!NOTE]
> Some features from Azure Data Factory are not available in [!INCLUDE [product-name](../includes/product-name.md)], but the concepts are interchangeable. You can learn more about Azure Data Factory and Pipelines on [Pipelines and activities in Azure Data Factory and Azure Synapse Analytics](/azure/data-factory/concepts-pipelines-activities). For a quickstart, visit [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).

## Create a pipeline

1. To create a new pipeline navigate to your workspace, select the **+New** button, and select **Pipeline**.
    :::image type="content" source="media/ingest-data-pipelines/new-data-pipeline.png" alt-text="Screenshot of the top section of the user's workspace showing the New Item button, under the Get data section. The Pipeline button is highlighted." lightbox="media/ingest-data-pipelines/new-data-pipeline.png":::
1. To create a new pipeline navigate to your workspace, select the **+ New item** button, and select **Pipeline**.
    - In your workspace, select **+ New Item** and look for the **Pipeline** card in the **Get data** section. 
    - Or, select **Create** in the navigation pane. Look for the **Pipeline** card in the **Data Factory** section.

1. In the **New pipeline** dialog, provide a name for your new pipeline and select **Create**.

1. You'll land in the pipeline canvas area, where you see options to get started.

    :::image type="content" source="media/ingest-data-pipelines/start-building-data-pipeline.png" alt-text="Screenshot showing the three options to select for starting ingestion." lightbox="media/ingest-data-pipelines/start-building-data-pipeline.png":::

    Pick the **Copy data assistant** option to launch the **Copy assistant**.

1. The first page of the **Copy data** assistant helps you pick your own data from various data sources, or select from one of the provided samples to get started. Select **Sample data** from the menu bar on this page. For this tutorial, we'll use the **COVID-19 Data Lake** sample. Select this option and select **Next**.

    :::image type="content" source="media/ingest-data-pipelines/sample-data-page.png" alt-text="Screenshot showing choices to use sample data or other data sources." lightbox="media/ingest-data-pipelines/sample-data-page.png":::

1. In the next page, you can select a dataset, the source file format, and preview the selected dataset. Select **Bing COVID-19**, the **CSV** format, and select **Next**.

    :::image type="content" source="media/ingest-data-pipelines/data-source-page.png" alt-text="Screenshot showing different dataset options for the COVID-19 sample, file formats, and a grid showing a preview of the data.":::

1. The next page, **Data destinations**, allows you to configure the type of the destination workspace. We'll load data into a warehouse in our workspace. Select your desired warehouse in the dropdown list and select **Next**. 

1. The last step to configure the destination is to provide a name to the destination table and configure the column mappings. Here you can choose to load the data to a new table or to an existing one, provide a schema and table names, change column names, remove columns, or change their mappings. You can accept the defaults, or adjust the settings to your preference.

    :::image type="content" source="media/ingest-data-pipelines/data-destination-table-page.png" alt-text="Screenshot showing the options to load data to an existing table or to create a new one." lightbox="media/ingest-data-pipelines/data-destination-table-page.png":::

    When you're done reviewing the options, select **Next**.

1. The next page gives you the option to use [staging](/azure/data-factory/copy-activity-performance-features#staged-copy), or provide advanced options for the data copy operation (which uses the T-SQL COPY command). Review the options without changing them, and select **Next**.
 
1. The last page in the assistant offers a summary of the copy activity. Select the option **Start data transfer immediately** and select **Save + Run**. 

    :::image type="content" source="media/ingest-data-pipelines/run-immediately.png" alt-text="Screenshot showing the option to start the data transfer operation immediately, and the buttons Back and Save + Run." lightbox="media/ingest-data-pipelines/run-immediately.png":::

1. You are directed to the pipeline canvas area, where a new Copy Data activity is already configured for you. The pipeline starts to run automatically. You can monitor the status of your pipeline in the **Output** pane: 

    :::image type="content" source="media/ingest-data-pipelines/monitor-pipeline.png" alt-text="Screenshot showing the pipeline canvas with a Copy activity in the center, and the pipeline execution status showing the current status In progress." lightbox="media/ingest-data-pipelines/monitor-pipeline.png":::

1. After a few seconds, your pipeline finishes successfully. Navigating back to your warehouse, you can select your table to preview the data and confirm that the copy operation concluded. 

For more on data ingestion into your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], visit:

- [Ingest data into the Warehouse](ingest-data.md)
- [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md)
- [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md)

## Next step

> [!div class="nextstepaction"]
> [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
