---
title: Ingest data into your Warehouse using data pipelines
description: Follow steps to ingest data into a Warehouse with data pipelines in Microsoft Fabric.
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
---
# Ingest data into your Warehouse using data pipelines

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

Data pipelines offer an alternative to using the COPY command through a graphical user interface. A data pipeline is a logical grouping of activities that together perform a data ingestion task. Pipelines allow you to manage extract, transform, and load (ETL) activities instead of managing each one individually.

In this tutorial, you'll create a new pipeline that loads sample data into a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

> [!NOTE]
> Some features from Azure Data Factory are not available in [!INCLUDE [product-name](../includes/product-name.md)], but the concepts are interchangeable. You can learn more about Azure Data Factory and Pipelines on [Pipelines and activities in Azure Data Factory and Azure Synapse Analytics](/azure/data-factory/concepts-pipelines-activities). For a quickstart, visit [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).

## Create a data pipeline

1. To create a new pipeline navigate to your workspace, select the **+New** button, and select **Data pipeline**.
    :::image type="content" source="media\ingest-data-pipelines\new-data-pipeline.png" alt-text="Screenshot of the top section of the user's workspace showing the New button, and with the options Warehouse, Data pipeline, and Show All." lightbox="media\ingest-data-pipelines\new-data-pipeline.png":::

1. In the **New pipeline** dialog, provide a name for your new pipeline and select **Create**. 

1. You'll land in the pipeline canvas area, where you see three options to get started: **Add a pipeline activity**, **Copy data**, and **Choose a task to start**.

    :::image type="content" source="media\ingest-data-pipelines\start-building-data-pipeline.png" alt-text="Screenshot showing the three options to select for starting ingestion." lightbox="media\ingest-data-pipelines\start-building-data-pipeline.png":::

    Each of these options offers different alternatives to create a pipeline:

    - **Add pipeline activity**: this option launches the pipeline editor, where you can create new pipelines from scratch by using pipeline activities.
    - **Copy data**: this option launches a step-by-step assistant that helps you select a data source, a destination, and configure data load options such as the column mappings. On completion, it creates a new pipeline activity with a **Copy Data** task already configured for you.
    - **Choose a task to start**: this option launches a set of predefined templates to help get you started with pipelines based on different scenarios.

    Pick the **Copy data** option to launch the **Copy assistant**.

1. The first page of the **Copy data** assistant helps you pick your own data from various data sources, or select from one of the provided samples to get started. For this tutorial, we'll use the **COVID-19 Data Lake** sample. Select this option and select **Next**.

    :::image type="content" source="media\ingest-data-pipelines\sample-data-page.png" alt-text="Screenshot showing choices to use sample data or other data sources." lightbox="media\ingest-data-pipelines\sample-data-page.png":::

1. In the next page, you can select a dataset, the source file format, and preview the selected dataset. Select **Bing COVID-19**, the **CSV** format, and select **Next**.

    :::image type="content" source="media\ingest-data-pipelines\data-source-page.png" alt-text="Screenshot showing different dataset options for the COVID-19 sample, file formats, and a grid showing a preview of the data." lightbox="media\ingest-data-pipelines\data-source-page.png":::

1. The next page, **Data destinations**, allows you to configure the type of the destination workspace. We'll load data into a warehouse in our workspace, so select the **Warehouse** tab, and the **Data Warehouse** option. Select **Next**.

    :::image type="content" source="media\ingest-data-pipelines\data-destination-type-page.png" alt-text="Screenshot showing different destination options." lightbox="media\ingest-data-pipelines\data-destination-type-page.png":::

1. Now it's time to pick the warehouse to load data into. Select your desired warehouse in the dropdown box and select **Next**. 

    :::image type="content" source="media\ingest-data-pipelines\data-destination-details-page.png" alt-text="Screenshot showing a dropdown list with a warehouse selected." lightbox="media\ingest-data-pipelines\data-destination-details-page.png":::

1. The last step to configure the destination is to provide a name to the destination table and configure the column mappings. Here you can choose to load the data to a new table or to an existing one, provide a schema and table names, change column names, remove columns, or change their mappings. You can accept the defaults, or adjust the settings to your preference.

    :::image type="content" source="media\ingest-data-pipelines\data-destination-table-page.png" alt-text="Screenshot showing the options to load data to an existing table or to create a new one." lightbox="media\ingest-data-pipelines\data-destination-table-page.png":::

    When you're done reviewing the options, select **Next**.

1. The next page gives you the option to use staging, or provide advanced options for the data copy operation (which uses the T-SQL COPY command). Review the options without changing them and select **Next**.
 
1. The last page in the assistant offers a summary of the copy activity. Select the option **Start data transfer immediately** and select **Save + Run**. 

    :::image type="content" source="media\ingest-data-pipelines\run-immediately.png" alt-text="Screenshot showing the option to start the data transfer operation immediately, and the buttons Back and Save + Run." lightbox="media\ingest-data-pipelines\run-immediately.png":::

1. You are directed to the pipeline canvas area, where a new Copy Data activity is already configured for you. The pipeline starts to run automatically. You can monitor the status of your pipeline in the **Output** pane: 

    :::image type="content" source="media\ingest-data-pipelines\monitor-pipeline.png" alt-text="Screenshot showing the pipeline canvas with a Copy activity in the center, and the pipeline execution status showing the current status In progress." lightbox="media\ingest-data-pipelines\monitor-pipeline.png":::

1. After a few seconds, your pipeline finishes successfully. Navigating back to your warehouse, you can select your table to preview the data and confirm that the copy operation concluded. 

    :::image type="content" source="media\ingest-data-pipelines\table-preview.png" alt-text="Screenshot showing a warehouse with the bing_covid_19 table selected, and a grid showing a preview of the data in the table." lightbox="media\ingest-data-pipelines\table-preview.png":::


For more on data ingestion into your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], visit:

- [Ingesting data into the Warehouse](ingest-data.md)
- [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md)
- [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md)

## Next step

> [!div class="nextstepaction"]
> [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
