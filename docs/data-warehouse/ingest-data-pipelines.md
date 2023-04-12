---
title: Ingest data into your Synapse Data Warehouse using data pipelines
description: Follow steps to ingest data into a Synapse Data Warehouse with data pipelines in Microsoft Fabric.
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: how-to
ms.search.form: Ingesting data
---

# Ingest data into your Synapse Data Warehouse using data pipelines

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Data pipelines offer an alternative to using the COPY command through a graphical user interface. A data pipeline is a logical grouping of activities that together perform a task. For example, a pipeline could contain a set of activities that ingest and clean log data, and then kick off a mapping data flow to analyze the log data. The pipeline allows you to manage the activities as a set instead of each one individually. You deploy and schedule the pipeline instead of the activities independently. Some features from Azure Data Factory are not available in [!INCLUDE [product-name](../includes/product-name.md)], but the concepts are interchangeable.

1. To create a new data pipeline go to your workspace, select the **+ New** button, and select **Show all**. 

1. Find **Data pipeline** under the **Data factory** section of the **New** page.

    :::image type="content" source="media\ingest-data-pipelines\new-page-data-pipeline.png" alt-text="Screenshot of a new Power BI page showing where to select data pipeline." lightbox="media\ingest-data-pipelines\new-page-data-pipeline.png":::

1. Once you select Data pipeline and give your pipeline a name, you see three options to start ingesting data: **Add a pipeline activity**, **Copy data** (wizard), and **Choose a task to start**.

    :::image type="content" source="media\ingest-data-pipelines\start-building-data-pipeline.png" alt-text="Screenshot showing the three options to select for starting ingestion." lightbox="media\ingest-data-pipelines\start-building-data-pipeline.png":::

    Here's a brief description of these options:
    
    - **Add pipeline activity**: this option launches the pipeline editor, where you can find:
      - All activities that can be used within the pipeline.
      - The pipeline editor canvas, where activities appear when added to the pipeline.
      - The pipeline configurations pane, including parameters, variables, general settings, and output.
      - The pipeline properties pane, where the pipeline name, optional description, and annotations can be configured.
    - **Copy data**: this option launches a step-by-step wizard that helps you select a source, a destination, and configure data load options, such as the column mapping between source and destination. On completion, it creates a new pipeline activity with the copy data task already configured for you.
    - **Choose a task to start**: a set of predefined templates to help get you started with pipelines.

1. Once you finish preparing your pipeline, you need to validate it and run it. These options can be found on the Home tab of the pipeline editor:

    :::image type="content" source="media\ingest-data-pipelines\validate-run.png" alt-text="Screenshot showing where to find the Validate and Run options." lightbox="media\ingest-data-pipelines\validate-run.png":::

1. Once you run a pipeline, you can monitor its status in the **Output** tab of the pipeline's configuration pane.

    :::image type="content" source="media\ingest-data-pipelines\output-pane.png" alt-text="Screenshot showing where to find the Output tab." lightbox="media\ingest-data-pipelines\output-pane.png":::

## Known limitations

At this time, when reading from Azure Blob Storage, you can only use SAS tokens to authenticate to Azure Storage accounts. You can still connect to a source using a different authentication method, but you're then required to enable Staging, and the storage account that is configured for Staging must use a SAS token for authentication.

## Next steps

- [Tables in Fabric data warehousing](tables.md)
- [Ingesting data into the Synapse Data Warehouse](ingest-data.md)
- [Ingest data into your warehouse using the COPY command](ingest-data-copy-command.md)
- [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md)