---
title: Get Metadata activity
description: Learn how to add a Get Metadata activity to a pipeline and use it to look up data from a data source.
ms.reviewer: jianleishen
ms.topic: how-to
ms.custom: pipelines
ms.date: 12/18/2024
---

# Use the Get Metadata activity to look up data from a data source

You can use the Get Metadata activity to retrieve the metadata of any data in a Fabric pipeline. You can use the output from the Get Metadata activity in conditional expressions to perform validation, or consume the metadata in subsequent activities.

## Prerequisites

To get started, you must complete the following prerequisites:

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

## Add a Get Metadata activity to a pipeline with UI

To use a Get Metadata activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for Get Metadata in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/get-metadata-activity/add-get-metadata-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Lookup activity highlighted.":::

1. Select the new Get Metadata activity on the canvas if it isn't already selected.

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Get Metadata settings

Select the **Settings** tab, and then select an existing connection from the **Connection** dropdown, or create a new connection, and specify its configuration details. Then select a table, to choose from the various metadata fields available for the table, including column count, exists, structure, and dynamic content.

:::image type="content" source="media/get-metadata-activity/get-metadata-activity-settings.png" alt-text="Screenshot showing the Lookup activity settings tab highlighting the tab, and where to choose a new connection.":::

### Using the Get Metadata activity

You can use the output of the Get Metadata activity in any other activities where dynamic content is supported. In this example, it's used as the **Expression** for a Switch activity.

:::image type="content" source="media/get-metadata-activity/switch-activity-expression.png" alt-text="Screenshot showing a Get Metadata activity used in a Switch activity to provide a dynamic expression.":::

Select the **Add dynamic content** link that appears under the **Expression** text box for the Switch activity. Then you can browse the activity outputs in the expression builder and select them to add them to the expression.

:::image type="content" source="media/get-metadata-activity/output-expression.png" alt-text="Screenshot showing the Pipeline expression builder window with the Activity outputs from the Get Metadata activity highlighted.":::

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
