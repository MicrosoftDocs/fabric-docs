---
title: Ingest data into your warehouse using Data pipelines
description: Follow steps to ingest data with Data pipelines.
ms.reviewer: WilliamDAssafMSFT
ms.author: procha
author: periclesrocha
ms.topic: how-to
ms.date: 03/15/2023
---

# Ingest data into your warehouse using Data pipelines

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

> [!TIP]
> Applies to: Warehouse

Data pipelines offer an alternative to using the COPY command through a graphical user interface. A data pipeline is a logical grouping of activities that together perform a task. For example, a pipeline could contain a set of activities that ingest and clean log data, and then kick off a mapping data flow to analyze the log data. The pipeline allows you to manage the activities as a set instead of each one individually. You deploy and schedule the pipeline instead of the activities independently. You can learn more about pipelines and activities by reading [Pipelines and activities in Azure Data Factory and Azure Synapse Analytics](/azure/data-factory/concepts-pipelines-activities?tabs=data-factory). Although this documentation is specific to Azure Data Factory and not all features are available in [!INCLUDE [product-name](../includes/product-name.md)], the concepts are interchangeable.

To create a new Data pipeline go to your workspace, select the **+ New** button, and select **Show all**. Find Data pipeline under the Data factory section of the **New** page.

IMAGE

Once you select Data pipeline and give your pipeline a name, you see three options to start ingesting data: **Add a pipeline activity**, **Copy data** (wizard), and **Choose a task to start**.

IMAGE

Here's a brief description of these options:

- **Add pipeline activity**: this option launches the pipeline editor, where you can find:
  - All activities that can be used within the pipeline.
  - The pipeline editor canvas, where activities appear when added to the pipeline.
  - The pipeline configurations pane, including parameters, variables, general settings, and output.
  - The pipeline properties pane, where the pipeline name, optional description, and annotations can be configured.
- **Copy data**: this option launches a step-by-step wizard that helps you select a source, a destination, and configure data load options, such as the column mapping between source and destination. On completion, it creates a new pipeline activity with the copy data task already configured for you.
- **Choose a task to start**: a set of pre-defined templates to help get you started with pipelines.

Once you finish preparing your pipeline, you need to validate it and run it. These options can be found on the Home tab of the pipeline editor:

IMAGE

Once you run a pipeline, you can monitor its status in the **Output** tab of the pipeline’s configuration pane.

IMAGE

## Known limitations

At this time, when reading from Azure Blob Storage, you can only use SAS tokens to authenticate to Azure Storage accounts. Support for more authentication methods is coming soon. You can still connect to a source using a different authentication method, but you'll then be required to enable Staging, and the storage account that is configured for Staging must use a SAS token for authentication.

## Next steps

- Create a table with SSMS
