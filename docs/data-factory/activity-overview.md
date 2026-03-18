---
title: Activity overview
description: Learn about activities.
ms.reviewer: pennyzhou-msft
ms.topic: overview
ms.date: 07/25/2025
ms.custom: pipelines
ms.search.form: Pipeline Activity Overview
ai-usage: ai-assisted
---

# Activity overview

Activities are the building blocks that help you create end-to-end data workflows in [!INCLUDE [product-name](../includes/product-name.md)]. Think of them as the tasks that move and transform your data to meet your business needs. You might use a copy activity to move data from SQL Server to Azure Blob Storage. Then you could add a Dataflow activity or Notebook activity to process and transform that data before loading it into Azure Synapse Analytics for reporting.

Activities are grouped together in pipelines to accomplish specific goals. For example, you might create a pipeline that:

- Pulls in log data from different sources
- Cleans and organizes that data
- Runs analytics to find insights

Grouping your activities into a pipeline lets you manage all these steps as one unit instead of handling each activity separately. You can deploy and schedule the entire pipeline at once, to run whenever you need it.

[!INCLUDE [product-name](../includes/product-name.md)] offers three types of activities:

- [**Data movement activities**](#data-movement-activities) - Move data between systems
- [**Data transformation activities**](#data-transformation-activities) - Process and transform your data  
- [**Control flow activities**](#control-flow-activities) - Manage how your pipeline runs

## Data movement activities

These activities help you move data from one place to another in your pipeline.

Movement activity | Description
---------------- | -----------
[Copy data](copy-data-activity.md) | You can copy data from any supported source to any supported destination. See the [Connector overview](connector-overview.md) to see what's available.
[Copy job](copy-job-activity.md) | Copy jobs are a simplified method for moving data quickly.

If you need to choose between different data movement options, see the [data movement decision guide](decision-guide-data-movement.md) article.

## Data transformation activities

These activities help you process and transform your data. You can use them individually or chain them together with other activities.

For more information, see the [data transformation activities](transform-data.md) article.

Data transformation activity | Compute environment
---------------------------- | -------------------
[Copy data](copy-data-activity.md) | Compute manager by Microsoft Fabric
[Dataflow Gen2](dataflows-gen2-overview.md) | Compute manager by Microsoft Fabric
[Delete data](delete-data-activity.md) | Compute manager by Microsoft Fabric
[Fabric Notebook](notebook-activity.md) | Apache Spark clusters managed by Microsoft Fabric
[HDInsight activity](azure-hdinsight-activity.md) | Apache Spark clusters managed by Microsoft Fabric
[Spark Job Definition](spark-job-definition-activity.md) | Apache Spark clusters managed by Microsoft Fabric
[Stored Procedure](stored-procedure-activity.md) | Azure SQL, Azure Synapse Analytics, or SQL Server
[SQL script](script-activity.md) | Azure SQL, Azure Synapse Analytics, or SQL Server

## Control flow activities

These activities help you control how your pipeline runs:

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

Here's how to add and configure activities in your pipeline:

1. Create a new pipeline in your workspace.
1. Go to the Activities tab and browse through the available activities. Scroll right to see all options, then select an activity to add it to the pipeline editor.
1. When you add an activity and select it on the canvas, you'll see its **General** settings in the properties pane below.
1. Each activity has other configuration options on other tabs in the properties pane.

:::image type="content" source="media/activity-overview/activity-ui.png" alt-text="Screenshot showing the pipeline editor with the Activities tab, toolbar, a copy activity, and the General tab of its properties, all highlighted.":::

## General settings

When you add a new activity to a pipeline and select it, you'll see its properties at the bottom of the screen. These include **General**, **Settings**, and sometimes other tabs.

   :::image type="content" source="media/activity-overview/general-settings.png" alt-text="Screenshot showing the General settings tab of an activity.":::

Every activity includes **Name** and **Description** fields in the general settings. Some activities also have these options:

Setting | Description
---------|----------
Timeout | How long an activity can run before timing out. The default is 12 hours, and the maximum is seven days. Use the format D.HH:MM:SS.
Retry | How many times to retry if the activity fails.
(Advanced properties) Retry interval (sec) | How many seconds to wait between retry attempts.
(Advanced properties) Secure output | When selected, activity output won't appear in logs.
(Advanced properties) Secure input | When selected, activity input won't appear in logs.

> [!NOTE]
> By default, you can have up to 120 activities per pipeline. This includes inner activities for containers.

## Related content

- [Create your first pipeline](create-first-pipeline-with-sample-data.md) 
