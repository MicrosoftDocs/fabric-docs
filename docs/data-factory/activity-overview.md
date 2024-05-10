---
title: Activity overview
description: Learn about activities.
ms.reviewer: pennyzhou-msft
ms.author: jburchel
author: jonburchel
ms.topic: overview
ms.date: 03/19/2024
ms.search.form: Pipeline Activity Overview
---

# Activity overview

This article helps you understand activities in [!INCLUDE [product-name](../includes/product-name.md)] and use them to construct end-to-end data-driven workflows for your data movement and data processing scenarios.

## Overview

A [!INCLUDE [product-name](../includes/product-name.md)] Workspace can have one or more pipelines. A pipeline is a logical grouping of activities that together perform a task. For example, a pipeline could contain a set of activities that ingest and clean log data, and then kick off a mapping data flow to analyze the log data. The pipeline allows you to manage the activities as a set instead of each one individually. You deploy and schedule the pipeline instead of the activities independently.

The activities in a pipeline define actions to perform on your data. For example, you can use a copy activity to copy data from SQL Server to an Azure Blob Storage. Then, use a Dataflow activity or a Notebook activity to process and transform data from the blob storage to an Azure Synapse Analytics pool on top of which business intelligence reporting solutions are built.

[!INCLUDE [product-name](../includes/product-name.md)] has three types of activities: data movement activities, data transformation activities, and control activities.

## Data movement activities

Copy activity in [!INCLUDE [product-name](../includes/product-name.md)] copies data from a source data store to a sink data store. Fabric supports the data stores listed in the [Connector overview](connector-overview.md) article. Data from any source can be written to any sink.

For more information, see [How to copy data using the copy activity](copy-data-activity.md).

## Data transformation activities

[!INCLUDE [product-name](../includes/product-name.md)] supports the following transformation activities that can be added either individually or chained with another activity.

For more information, see the [data transformation activities](transform-data.md) article.

Data transformation activity | Compute environment
---------------------------- | -------------------
[Copy data](copy-data-activity.md) | Compute manager by Microsoft Fabric
[Dataflow Gen2](dataflows-gen2-overview.md) | Compute manager by Microsoft Fabric
[Delete data](delete-data-activity.md) | Compute manager by Microsoft Fabric
[Fabric Notebook](notebook-activity.md) | Apache Spark clusters managed by Microsoft Fabric
Fabric Spark job definition (coming soon) | Apache Spark clusters managed by Microsoft Fabric
[Stored Procedure](stored-procedure-activity.md) | Azure SQL, Azure Synapse Analytics, or SQL Server
[SQL script](script-activity.md) | Azure SQL, Azure Synapse Analytics, or SQL Server


## Control flow activities
The following control flow activities are supported:

Control activity | Description
---------------- | -----------
[Append variable](append-variable-activity.md) | Add a value to an existing array variable.
[Azure Batch activity](azure-batch-activity.md) | Runs an Azure Batch script.
[Azure Databricks activity](azure-databricks-activity.md) | Runs an Azure Databricks job (Notebook, Jar, Python).
[Azure Machine Learning activity](azure-machine-learning-activity.md) | Runs an Azure Machine Learning job.
[Deactivate activity](deactivate-activity.md) | Deactivates another activity.
[Fail](fail-activity.md) | Cause pipeline execution to fail with a customized error message and error code.
[Filter](filter-activity.md) | Apply a filter expression to an input array.
[ForEach](foreach-activity.md) | ForEach Activity defines a repeating control flow in your pipeline. This activity is used to iterate over a collection and executes specified activities in a loop. The loop implementation of this activity is similar to the Foreach looping structure in programming languages.
[Functions activity](functions-activity.md) | Executes an Azure Function.
[Get metadata](get-metadata-activity.md) | GetMetadata activity can be used to retrieve metadata of any data in a Data Factory or Synapse pipeline.
[If condition](if-condition-activity.md) | The If Condition can be used to branch based on condition that evaluates to true or false. The If Condition activity provides the same functionality that an if statement provides in programming languages. It evaluates a set of activities when the condition evaluates to `true` and another set of activities when the condition evaluates to `false`.
[Invoke pipeline](invoke-pipeline-activity.md) | Execute Pipeline activity allows a Data Factory or Synapse pipeline to invoke another pipeline.
[KQL activity](kql-activity.md) | Executes a KQL script against a Kusto instance.
[Lookup Activity](lookup-activity.md) | Lookup Activity can be used to read or look up a record/ table name/ value from any external source. This output can further be referenced by succeeding activities.
[Set Variable](set-variable-activity.md) | Set the value of an existing variable.
[Switch activity](switch-activity.md) | Implements a switch expression that allows multiple subsequent activities for each potential result of the expression.
[Teams activity](teams-activity.md) | Posts a message in a Teams channel or group chat.
[Until activity](until-activity.md) | Implements Do-Until loop that is similar to Do-Until looping structure in programming languages. It executes a set of activities in a loop until the condition associated with the activity evaluates to true. You can specify a timeout value for the until activity.
[Wait activity](wait-activity.md) | When you use a Wait activity in a pipeline, the pipeline waits for the specified time before continuing with execution of subsequent activities.
[Web activity](web-activity.md) | Web Activity can be used to call a custom REST endpoint from a pipeline.
[Webhook activity](webhook-activity.md) | Using the webhook activity, call an endpoint, and pass a callback URL. The pipeline run waits for the callback to be invoked before proceeding to the next activity.

## Adding activities to a pipeline with the [!INCLUDE [product-name](../includes/product-name.md)] UI

Use these steps to add and configure activities in a [!INCLUDE [product-name](../includes/product-name.md)] pipeline:

1. Create a new pipeline in your workspace.
1. On the Activities tab for the pipeline, browse the activities displayed, scrolling to the right if necessary to see all activities. Select an activity to add it to the pipeline editor.
1. When you add an activity and select it in the pipeline editor canvas, its **General** settings will appear in the properties pane below the canvas.
1. Each activity also contains custom properties specific to its configuration on other tabs in the properties pane.

:::image type="content" source="media/activity-overview/activity-ui.png" alt-text="Screenshot showing the pipeline editor with the Activities tab, toolbar, a copy activity, and the General tab of its properties, all highlighted.":::

## General settings

When you add a new activity to a pipeline and select it, you'll see its properties panes in the area at the bottom of the screen. These properties panes include **General**, **Settings**, and sometimes other panes as well.

   :::image type="content" source="media/activity-overview/general-settings.png" alt-text="Screenshot showing the General settings tab of an activity.":::

The general settings will always include **Name** and **Description** fields for every activity.  Some activities also include the following:

|Setting  |Description  |
|---------|---------|
|Timeout |The maximum amount of time an activity can run. The default is 12 hours, and the maximum amount of time allowed is seven days. The format for the timeout is in D.HH:MM:SS. |
|Retry |Maximum number of retry attempts. |
|(Advanced properties) Retry interval (sec) |The number of seconds between each retry attempt. |
|(Advanced properties) Secure output |When checked, output from the activity isn't captured in logging. |
|(Advanced properties) Secure input |The number of seconds between each retry attempt. |

> [!NOTE]
> There is a default soft limit of maximum 80 activities per pipeline, which includes inner activities for containers.

## Related content

- [Create your first pipeline](create-first-pipeline-with-sample-data.md)
