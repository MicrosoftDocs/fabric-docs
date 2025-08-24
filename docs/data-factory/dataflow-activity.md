---
title: Dataflow activity
description: Learn how to add a Dataflow activity to a pipeline and use it to run a Dataflow Gen2.
ms.reviewer: xupxhou
ms.author: miescobar
author: ptyx507x
ms.topic: how-to
ms.date: 09/15/2025
ms.custom:
   - pipelines
   - dataflows
---

# Use the Dataflow activity to run a Dataflow Gen2

The Dataflow activity in Data Factory for Microsoft Fabric allows you to run a Dataflow Gen2.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add a Dataflow activity to a pipeline

To use a Dataflow activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for Dataflow in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/dataflow-activity/add-dataflow-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Dataflow activity highlighted.":::

1. Select the new Dataflow activity on the canvas if it isn't already selected.

   :::image type="content" source="media/dataflow-activity/dataflow-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Dataflow activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

>[!NOTE]
>Timeout and cancellation only apply to Dataflow Gen2 with CI/CD support. For runs for Dataflow Gen2 without CI/CD support, timeouts are ignored and pipeline cancellation won’t stop the dataflow run.

### Dataflow activity settings

Select the **Settings** tab, then select an existing workspace and dataflow to run. If you have made a [Dataflow Gen2 with CI/CD and Git integration support (Preview)](dataflow-gen2-cicd-and-git-integration.md), you can also select it from the dropdown. 

   :::image type="content" source="media/dataflow-activity/select-a-dataflow.png" alt-text="Screenshot showing the dropdown with a list of dataflows to select in the Dataflow activity Settings tab":::

The notification option isn't currently available.

When selecting a [Dataflow Gen2 with CI/CD that has the public parameters mode enabled](dataflow-parameters.md), a Dataflow parameters section is displayed which lists all the available parameters, their types, and default values for the selected Dataflow.

   :::image type="content" source="media/dataflow-activity/dataflow-settings.png" alt-text="Screenshot showing the Dataflow activity Settings tab, and highlighting the tab.":::

Required parameters are shown with an asterisk next to their name, whereas optional parameters don't not have the asterisk. Furthermore, optional parameters can be selected and deleted from the grid, but required parameters can't be deleted and must be passed for the dataflow to run.

You can select the refresh button to request the latest parameter information from your dataflow.

Inside the Dataflow parameters section you're able to enter the name of the parameter that you wish to pass and the type and value that you wish to pass.

>[!NOTE]
>Parameterizing the DataflowId in the dataflow pipeline activity settings will only support the legacy Dataflow Gen2 version without CI/CD support. I.e.,  you can't invoke Dataflows with CI/CD support using parameterization of the DataflowId. This is only a temporary limitation that the product group will be addressing.

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
