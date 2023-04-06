---
title: Get data experience for lakehouse
description: Learn more about loading data into a lakehouse.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 02/24/2023
ms.search.form: Lakehouse Get Data
---

# Get data experience for lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

Get data experience covers all user scenarios for bringing data into the lakehouse, like:

- Connecting to existing SQL Server and copying data into delta table on the lakehouse.
- Uploading files from your computer.
- Copying and merging multiple tables from other lakehouses into a new delta table.

## Different ways to load data in lakehouse

For Private Preview, there are a few ways you can get data into a lakehouse:

- file upload
- Apache Spark libraries in notebook code
- Copy tool in pipelines

### Local file upload

You can also upload data stored on your local machine. You can do this directly in the lakehouse explorer.

### Notebook code

You can use available Spark libraries to connect to a data source directly, load data to data frame and then save it in a lakehouse. This is the most open way to load data in the lakehouse that is fully managed by the user code.

### Copy tool in pipelines

The Copy tool is a highly scalable Data Integration solution that allows you to connect to different data sources and load the data either in original format or convert it to a delta table. Copy tool is a part of pipelines activities that can be orchestrated in multiple ways, such as scheduling or triggering based on event.

## Considerations when choosing approach to load data

| **Use case** | **Recommendation** |
|---|---|
| **Small file upload from local machine** | Use Local file upload |
| **Complex data transformations** | Use Notebook code |
| **Large data source** | Use Copy tool in pipelines |

## Next steps

- Overview: How to use notebook together with lakehouse
- [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).
- [How to: How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md).
- [Tutorial: Move data into lakehouse via Copy assistant](../data-factory/move-data-lakehouse-copy-assistant.md).
