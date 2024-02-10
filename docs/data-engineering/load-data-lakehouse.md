---
title: Options to get data into the Lakehouse
description: Learn how to load data into a lakehouse via a file upload, Apache Spark libraries in notebook code, and the copy tool in pipelines.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse Get Data
---

# Options to get data into the Fabric Lakehouse

The get data experience covers all user scenarios for bringing data into the lakehouse, like:

- Connecting to existing SQL Server and copying data into Delta table on the lakehouse.
- Uploading files from your computer.
- Copying and merging multiple tables from other lakehouses into a new Delta table.
- Connecting to a streaming source to land data in a lakehouse.
- Referencing data without copying it from other internal lakehouses or external sources.

## Different ways to load data into a lakehouse

In Microsoft Fabric, there are a few ways you can get data into a lakehouse:

- File upload from local computer
- Run a copy tool in pipelines
- Set up a dataflow
- Apache Spark libraries in notebook code

### Local file upload

You can also upload data stored on your local machine. You can do it directly in the Lakehouse explorer.

:::image type="content" source="media/get-data/file-upload-dialog.png" alt-text="Screenshot of file upload dialog in the Lakehouse explorer." lightbox="media/get-data/file-upload-dialog.png":::

### Copy tool in pipelines

The Copy tool is a highly scalable Data Integration solution that allows you to connect to different data sources and load the data either in original format or convert it to a Delta table. Copy tool is a part of pipelines activities that you can modify in multiple ways, such as scheduling or triggering based on an event. For more information, see [How to copy data using copy activity](../data-factory/copy-data-activity.md).

### Dataflows

For users that are familiar with Power BI dataflows, the same tool is available to load data into your lakehouse. You can quickly access it from the Lakehouse explorer "Get data" option, and load data from over 200 connectors. For more information, see [Quickstart: Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

### Notebook code

You can use available Spark libraries to connect to a data source directly, load data to a data frame, and then save it in a lakehouse. This method is the most open way to load data in the lakehouse that user code is fully managing.

> [!NOTE]
> External Delta tables created with Spark code won't be visible to a SQL analytics endpoint. Use shortcuts in Table space to make external Delta tables visible for a SQL analytics endpoint.

## Considerations when choosing approach to load data

| **Use case** | **Recommendation** |
|---|---|
| **Small file upload from local machine** | Use Local file upload |
| **Small data or specific connector** | Use Dataflows |
| **Large data source** | Use Copy tool in pipelines |
| **Complex data transformations** | Use Notebook code |

## Related content

- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md)
- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Move data from Azure SQL DB into Lakehouse via copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)
