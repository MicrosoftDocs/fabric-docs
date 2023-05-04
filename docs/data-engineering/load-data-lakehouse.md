---
title: Options to get data into the Lakehouse
description: Learn how to load data into a lakehouse via a file upload, Apache Spark libraries in notebook code, and the copy tool in pipelines.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse Get Data
---

# Options to get data into the Fabric Lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

Get data experience covers all user scenarios for bringing data into the lakehouse, like:

- Connecting to existing SQL Server and copying data into delta table on the lakehouse.
- Uploading files from your computer.
- Copying and merging multiple tables from other alehouses into a new delta table.
- Connecting to a streaming source to land data in a lakehouse.
- Referencing data without copying it from other internal lakehouses or external sources.

## Different ways to load data in lakehouse

In Microsoft Fabric, there are a few ways you can get data into a lakehouse:

- File upload from local computer.
- Run a copy tool in pipelines.
- Set up a dataflow.
- Apache Spark libraries in notebook code

### Local file upload

You can also upload data stored on your local machine. You can do it directly in the lakehouse explorer.

:::image type="content" source="media/get-data/file-upload-dialog.png" alt-text="Screenshot of file upload dialog in Lakehouse Explorer." lightbox="media/get-data/file-upload-dialog.png":::

### Copy tool in pipelines

The Copy tool is a highly scalable Data Integration solution that allows you to connect to different data sources and load the data either in original format or convert it to a delta table. Copy tool is a part of pipelines activities that can be orchestrated in multiple ways, such as scheduling or triggering based on event. See, [How to copy data using copy activity](../data-factory/copy-data-activity.md).

### Dataflows

For users that are familiar to Power BI dataflows same tool is available to land data in Lakehouse. You can quickly access it from Lakehouse explorer "Get data" option, and land data from over 200 connectors. See, [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

### Notebook code

You can use available Spark libraries to connect to a data source directly, load data to data frame and then save it in a lakehouse. It's the most open way to load data in the lakehouse that user code is fully managing.

## Considerations when choosing approach to load data

| **Use case** | **Recommendation** |
|---|---|
| **Small file upload from local machine** | Use Local file upload |
| **Small data or specific connector** | Use Dataflows |
| **Large data source** | Use Copy tool in pipelines |
| **Complex data transformations** | Use Notebook code |

## Next steps

- Overview: How to use notebook together with lakehouse
- [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).
- [How to: How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md).
- [Tutorial: Move data into lakehouse via Copy assistant](../data-factory/move-data-lakehouse-copy-assistant.md).
