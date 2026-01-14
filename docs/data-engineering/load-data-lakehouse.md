---
title: Options to get data into the Lakehouse
description: Learn how to load data into a lakehouse via a file upload, Apache Spark libraries in notebook code, and the copy tool in pipelines.
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 08/22/2024
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
- Stream real-time events with Eventstream
- Get data from Eventhouse

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
> External Delta tables created with Spark code won't be visible to a SQL analytics endpoint. Use shortcuts in Table space to make external Delta tables visible for a SQL analytics endpoint. To learn how to create a shortcut, see [Create a shortcut to files or tables](lakehouse-shortcuts.md#create-a-shortcut-to-files-or-tables).

### Stream real-time events with Eventstream

With [Eventstream](../real-time-intelligence/event-streams/overview.md), you can get, process, and route high volumes real-time events from a wide variety of sources.

:::image type="content" source="media/load-data-lakehouse/get-data-eventstream.png" alt-text="Screenshot of getting data into a lakehouse from Eventstream." lightbox="media/load-data-lakehouse/get-data-eventstream.png":::

To see how to add lakehouse as a destination for Eventstream, see [Get data from Eventstream in a lakehouse](../real-time-intelligence/event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-an-eventstream-and-add-it-to-a-lakehouse).

For optimal streaming performance, you can stream data from Eventstream into an Eventhouse and then [enable OneLake availability](#get-data-from-eventhouse).

### Get data from Eventhouse

When you enable OneLake availability on data in an Eventhouse, a Delta table is created in OneLake. This Delta table can be accessed by a lakehouse using a shortcut. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md). For more information, see [Eventhouse OneLake Availability](../real-time-intelligence/event-house-onelake-availability.md).

## Considerations when choosing approach to load data

| **Use case** | **Recommendation** |
|---|---|
| **Small file upload from local machine** | Use Local file upload |
| **Small data or specific connector** | Use Dataflows |
| **Large data source** | Use Copy tool in pipelines |
| **Complex data transformations** | Use Notebook code |
| **Streaming data** | Use Eventstream to stream data into Eventhouse; enable OneLake availability and create a shortcut from Lakehouse|
| **Time-series data** | Get data from Eventhouse |

## Related content

- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Quickstart: Create your first pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md)
- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Move data from Azure SQL DB into Lakehouse via copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)
- [Add a lakehouse destination to an eventstream](../real-time-intelligence/event-streams/add-destination-lakehouse.md)
- [Eventhouse OneLake Availability](../real-time-intelligence/event-house-onelake-availability.md)
