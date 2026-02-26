---
title: Pipeline Overview
description: Learn about pipelines in Microsoft Fabric Data Factory, including activities, triggers, control flow, and how to use them for data processing workflows.
ms.reviewer: makromer
ms.topic: concept-article
ms.custom: fabric-data-factory
ms.date: 08/01/2025
ai-usage: ai-assisted
---

# Pipeline overview

Pipelines in Microsoft Fabric Data Factory help you orchestrate and automate your data workflows. A pipeline is a logical grouping of activities that together perform a task. For example, a pipeline could contain a set of activities that ingest and clean log data, and then kick off a data flow to analyze the log data.

The pipeline allows you to manage the activities as a set instead of each one individually. You deploy and schedule the pipeline instead of the activities independently.

## When to use pipelines

Pipelines solve common data challenges by automating repetitive tasks and ensuring consistent data processing.

Let's say you're a retail company that needs to process daily sales data from multiple stores. Each day, you need to:

1. **Collect data** from point-of-sale systems, online orders, and inventory databases
1. **Validate and clean** the data to ensure accuracy
1. **Transform** the data by calculating daily totals, applying business rules, and enriching with customer information
1. **Load** the processed data into your data warehouse for reporting
1. **Notify** your business intelligence team when the data is ready

A pipeline automates this entire workflow. It runs on schedule, handles errors gracefully, and provides visibility into each step. You get consistent and timely data processing without manual intervention.

## Key pipeline components

Pipelines consist of several key components that work together to create powerful data workflows. The main components include [activities](#activities) that perform the work and add logic to your pipeline, [schedules or triggers](#pipeline-runs-and-scheduling) that determine when pipelines run, and [parameters](#parameters-and-variables) that make your pipelines flexible and reusable.

### Activities

Activities are the building blocks of your pipeline. Each activity performs a specific task, and there are three main types of activities:

- [**Data movement activities**](activity-overview.md#data-movement-activities): Copy data between different sources and destinations
- [**Data transformation activities**](activity-overview.md#data-transformation-activities): Clean, aggregate, and reshape your data
- [**Control flow activities**](activity-overview.md#control-flow-activities): Add logic like conditions, loops, and error handling

You can chain activities together to create complex workflows. When one activity completes, it can trigger the next activity based on success, failure, or completion status.

For a full list of available activities and more information, see [the activity overview](activity-overview.md).

### Pipeline runs and scheduling

A pipeline run happens when a pipeline executes. During a run, all the activities in your pipeline are processed and completed. Each pipeline run gets its own unique run ID that you can use for tracking and monitoring.

You can start pipeline runs in three ways:

- **On-demand runs**: Select **Run** in the pipeline editor to trigger an immediate run. You'll need to save any changes before the pipeline starts.

    :::image type="content" source="media/pipeline-runs/trigger-pipeline-run.png" alt-text="Screenshot showing where to select Run on the Home tab.":::

- **Scheduled runs**: Set up automatic runs based on time and frequency. When you create a schedule, you specify start and end dates, frequency, and time zone.

    :::image type="content" source="media/pipeline-runs/schedule-pipeline-run.png" alt-text="Screenshot showing where to select Schedule on the Home tab.":::

- **Event-based runs**: Use event triggers to start your pipeline when specific events occur, such as new files arriving in a data lake or changes in a database.

    :::image type="content" source="media/pipeline-runs/event-based-run.png" alt-text="Screenshot showing where to select Trigger to add event-based run triggers on the home tab.":::

For more information, see [Run, schedule, or trigger a pipeline](pipeline-runs.md).

### Parameters and variables

Parameters make your pipelines flexible. You can pass different values when you run the pipeline, allowing the same pipeline to process different datasets or use different configurations.

Variables store temporary values during pipeline execution. You can use them to pass data between activities or make decisions based on runtime conditions.

For more information, see [How to use parameters, expressions, and functions in pipelines](parameters.md).

## Pipeline monitoring and management

Fabric provides comprehensive monitoring for your pipelines:

- **Real-time monitoring**: Watch your pipeline progress as it runs, with visual indicators for each activity's status
- **Run history**: Review past executions to identify patterns and troubleshoot issues
- **Performance metrics**: Analyze execution times and resource usage to optimize your pipelines
- **Audit trail**: Track who ran which pipelines when, with detailed logs of start times, end times, activity duration, error messages, and data lineage

For more information, see [Monitor pipeline runs](monitor-pipeline-runs.md).

## Best practices

When designing pipelines, consider these recommendations:

- **Start simple**: Begin with basic data movement and gradually add complexity
- **Use parameters**: Make your pipelines reusable by parameterizing connections and file paths
- **Handle errors**: Plan for failures with retry logic and alternative processing paths
- **Monitor performance**: Regularly review execution times and optimize slow-running activities
- **Test thoroughly**: Validate your pipelines with sample data before processing production workloads

## Next steps

- [Create your first pipeline](create-first-pipeline-with-sample-data.md)
- [Pipeline activities](activity-overview.md)
- [Run, schedule, and trigger pipelines](pipeline-runs.md)