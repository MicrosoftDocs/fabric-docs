---
title: Data ingestion options for a lakehouse
description: Learn about the different ways to get data into a lakehouse, including file upload, shortcuts, Dataflow Gen2, data pipelines, notebook code, Eventstream, and Eventhouse.
ms.reviewer: tvilutis
ms.topic: concept-article
ms.date: 02/24/2026
ms.search.form: Lakehouse Get Data
---

# Data ingestion options for a lakehouse

There are several ways to get data into a lakehouse, ranging from simple file uploads to scalable pipelines and real-time streaming. The right approach depends on the data source, volume, transformation complexity, and whether you need a one-time load or continuous ingestion.

## Ways to load data into a lakehouse

The following sections describe each approach — file upload, shortcuts, Dataflow Gen2, data pipelines, notebook code, and Eventstream — ordered from the simplest no-code option to more advanced programmatic and real-time methods.

### Upload files

To load small files into a lakehouse without any transformation, upload them directly from your local machine through the Lakehouse explorer.

:::image type="content" source="media/get-data/file-upload-dialog.png" alt-text="Screenshot of file upload dialog in the Lakehouse explorer." lightbox="media/get-data/file-upload-dialog.png":::

### Shortcuts

Shortcuts let you reference data in other storage locations without copying it. A shortcut appears as a folder in your lakehouse but points to data stored elsewhere — in another lakehouse, an Azure Data Lake Storage Gen2 account, Amazon S3, or other supported sources. Shortcuts are useful when you want to query or join data across sources without duplicating it. For more information, see [Shortcuts in a lakehouse](lakehouse-shortcuts.md).

### Dataflow Gen2

Dataflow Gen2 is a low-code data transformation tool with over 200 connectors. You define transformations visually in a Power Query interface and output the results to a lakehouse table. Dataflow Gen2 is a good choice for smaller datasets or when you need connectors not available in other tools. For more information, see [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

### Data pipelines

Data pipelines provide a scalable copy tool for moving large volumes of data into a lakehouse. The Copy activity connects to a wide range of data sources and can load data in its original format or convert it to a Delta table. You can schedule pipelines, trigger them based on events, and chain multiple activities together. For more information, see [How to copy data using copy activity](../data-factory/copy-data-activity.md).

### Notebook code

Spark notebooks give you full programmatic control over data ingestion. Use Spark libraries to connect to a data source, load data into a DataFrame, apply transformations, and save the results to a lakehouse. This approach is the most flexible and suits complex transformation logic or sources that other tools don't support.

> [!NOTE]
> External Delta tables created with Spark code aren't visible to a SQL analytics endpoint. Use shortcuts in the Tables section to make external Delta tables visible for a SQL analytics endpoint. For more information, see [Shortcuts in a lakehouse](lakehouse-shortcuts.md).

### Eventstream

[Eventstream](../real-time-intelligence/event-streams/overview.md) ingests, processes, and routes high-volume real-time events from a wide variety of sources. You can add a lakehouse as a destination to land streaming data directly into Delta tables.

:::image type="content" source="media/load-data-lakehouse/get-data-eventstream.png" alt-text="Screenshot of getting data into a lakehouse from Eventstream." lightbox="media/load-data-lakehouse/get-data-eventstream.png":::

For more information, see [Get data from Eventstream in a lakehouse](../real-time-intelligence/event-streams/get-data-from-eventstream-in-multiple-fabric-items.md#get-data-from-an-eventstream-and-add-it-to-a-lakehouse).

For time-series or high-throughput streaming scenarios, you can also stream events into an Eventhouse and enable OneLake availability. This creates a Delta table in OneLake that a lakehouse can access through a shortcut. For more information, see [Eventhouse OneLake availability](../real-time-intelligence/event-house-onelake-availability.md).

## Choose an approach

The following table summarizes when to use each approach for loading data into a lakehouse.

| **Scenario** | **Recommended approach** |
|---|---|
| Small files from a local machine | Upload files |
| Reference data without copying it | Shortcuts |
| Small to medium data with visual transformations | Dataflow Gen2 |
| Large-scale data movement | Data pipelines |
| Complex transformations or unsupported sources | Notebook code |
| Real-time event ingestion | Eventstream |
| Time-series or high-throughput streaming | Eventstream to Eventhouse with OneLake availability |

## Related content

- [Shortcuts in a lakehouse](lakehouse-shortcuts.md)
- [Data streaming into a lakehouse with Spark](lakehouse-streaming-data.md)
- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md)
- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
- [Add a lakehouse destination to an eventstream](../real-time-intelligence/event-streams/add-destination-lakehouse.md)
- [Eventhouse OneLake availability](../real-time-intelligence/event-house-onelake-availability.md)
