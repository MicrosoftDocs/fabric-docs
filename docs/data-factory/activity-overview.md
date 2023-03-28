---
title: Activity overview
description: Learn about activities.
ms.reviewer: pennyzhou-msft
ms.author: jburchel
author: jonburchel
ms.topic: overview 
ms.date: 01/27/2023
---

# Activity overview

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article helps you understand activities in [!INCLUDE [product-name](../includes/product-name.md)] and use them to construct end-to-end data-driven workflows for your data movement and data processing scenarios.

## Overview

A [!INCLUDE [product-name](../includes/product-name.md)] Workspace can have one or more pipelines. A pipeline is a logical grouping of activities that together perform a task. For example, a pipeline could contain a set of activities that ingest and clean log data, and then kick off a mapping data flow to analyze the log data. The pipeline allows you to manage the activities as a set instead of each one individually. You deploy and schedule the pipeline instead of the activities independently.

The activities in a pipeline define actions to perform on your data. For example, you may use a copy activity to copy data from SQL Server to an Azure Blob Storage. Then, use a Dataflow activity or a Notebook activity to process and transform data from the blob storage to an Azure Synapse Analytics pool on top of which business intelligence reporting solutions are built.

[!INCLUDE [product-name](../includes/product-name.md)] has three types of activities: data movement activities, data transformation activities, and control activities. An activity can take zero or more input datasets and produce one or more output datasets. The following diagram shows the relationship between pipeline, activity, and dataset:

:::image type="content" source="media/activity-overview/relationship-between-dataset-pipeline-activity.png" alt-text="Diagram showing the relationship between pipeline, activity, and dataset.":::

An input dataset represents the input for an activity in the pipeline, and an output dataset represents the output for the activity. Datasets identify data within different data stores, such as tables, files, folders, and documents. After you create a dataset, you can use it with activities in a pipeline. For example, a dataset can be an input/output dataset of a Copy Activity or a Dataflow Activity.

## Data movement activities

Copy activity in [!INCLUDE [product-name](../includes/product-name.md)] copies data from a source data store to a sink data store. Fabric supports the data stores listed in the [Connector overview](connector-overview.md) article. Data from any source can be written to any sink.

For more information, see [How to copy data using the copy activity](copy-data-activity.md).

## Data transformation activities

[!INCLUDE [product-name](../includes/product-name.md)] supports the following transformation activities that can be added either individually or chained with another activity.

For more information, see the [data transformation activities](transform-data.md) article.

Data transformation activity | Compute environment
---------------------------- | -------------------
[Copy data](copy-data-activity.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Dataflow](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Dataflow Gen2](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Delete data](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Fabric Notebook](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Spark job definition](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Stored Procedure](../placeholder.md) | Azure SQL, Azure Synapse Analytics, or SQL Server
[SQL script](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]
[Switch](../placeholder.md) | Apache Spark clusters managed by [!INCLUDE [product-name](../includes/product-name.md)]

## Control flow activities
The following control flow activities are supported:

Control activity | Description
---------------- | -----------
[Append variable](../placeholder.md) | Add a value to an existing array variable.
[Invoke pipeline](../placeholder.md) | Execute Pipeline activity allows a Data Factory or Synapse pipeline to invoke another pipeline.
[Filter](../placeholder.md) | Apply a filter expression to an input array.
[For Each](../placeholder.md) | ForEach Activity defines a repeating control flow in your pipeline. This activity is used to iterate over a collection and executes specified activities in a loop. The loop implementation of this activity is similar to the Foreach looping structure in programming languages.
[Get metadata](../placeholder.md) | GetMetadata activity can be used to retrieve metadata of any data in a Data Factory or Synapse pipeline.
[If condition](../placeholder.md) | The If Condition can be used to branch based on condition that evaluates to true or false. The If Condition activity provides the same functionality that an if statement provides in programming languages. It evaluates a set of activities when the condition evaluates to `true` and another set of activities when the condition evaluates to `false`.
[Lookup Activity](../placeholder.md) | Lookup Activity can be used to read or look up a record/ table name/ value from any external source. This output can further be referenced by succeeding activities.
[Set Variable](../placeholder.md) | Set the value of an existing variable.
[Until Activity](../placeholder.md) | Implements Do-Until loop that is similar to Do-Until looping structure in programming languages. It executes a set of activities in a loop until the condition associated with the activity evaluates to true. You can specify a timeout value for the until activity.
[Wait Activity](../placeholder.md) | When you use a Wait activity in a pipeline, the pipeline waits for the specified time before continuing with execution of subsequent activities.
[Web Activity](../placeholder.md) | Web Activity can be used to call a custom REST endpoint from a pipeline. You can pass datasets and linked services to be consumed and accessed by the activity.
[Webhook Activity](../placeholder.md) | Using the webhook activity, call an endpoint, and pass a callback URL. The pipeline run waits for the callback to be invoked before proceeding to the next activity.

## Adding activities to a pipeline with the [!INCLUDE [product-name](../includes/product-name.md)] UI
Use these steps to add and configure activities in a [!INCLUDE [product-name](../includes/product-name.md)] pipeline:

1. Create a new pipeline in your workspace.
1. On the Activities tab for the pipeline, browse the activities displayed, scrolling to the right if necessary to see all activities. Select an activity to add it to the pipeline editor.
1. When you add an activity and select it in the pipeline editor canvas, its **General** settings will appear in the properties pane below the canvas.
1. Each activity also contains custom properties specific to its configuration on other tabs in the properties pane.

:::image type="content" source="media/activity-overview/activity-ui.png" alt-text="Screenshot showing the pipeline editor with the Activities tab, toolbar, a copy activity, and the General tab of its properties, all highlighted.":::

## Next steps

[Create your first pipeline](create-first-pipeline-with-sample-data.md)
