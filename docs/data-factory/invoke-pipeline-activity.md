---
title: Invoke pipeline activity
description: Learn how to add an Invoke pipeline activity to a pipeline and use it to run another pipeline.
ms.reviewer: whhender
ms.author: makromer
author: kromerm
ms.topic: how-to
ms.custom: pipelines
ms.date: 04/01/2025
---

# Use the **Invoke pipeline activity** to run another pipeline

The Fabric **Invoke pipeline activity** can execute another [!INCLUDE [product-name](../includes/product-name.md)] pipeline. You can use it to orchestrate the execution of one or multiple pipelines from within a single pipeline.


## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

> [!NOTE]
> There are currently two Invoke Pipeline activities (legacy and preview). The legacy invoke pipeline only supports Fabric pipelines in the same workspace as your parent pipeline. You can also only monitor the parent pipeline and can't invoke ADF (Azure Data Factory) or Synapse pipelines using the legacy activity. Using the new preview Invoke pipeline activity allows you to invoke pipelines across Fabric workspaces, from ADF or Synapse, and monitor child pipelines. There's a current known limitation with the preview activity that prohibits the use of pipeline return values. **This issue is still being fixed and is temporary**.

## Add an **Invoke pipeline activity** to a pipeline with UI

To use an **Invoke pipeline activity** in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for **invoke pipeline** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/invoke-pipeline-activity/add-invoke-pipeline-activity-to-pipeline.png" lightbox="media/invoke-pipeline-activity/add-invoke-pipeline-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Invoke pipeline activity highlighted.":::


   :::image type="content" source="media/invoke-pipeline-activity/invoke-pipeline-button-without-text.png" alt-text="Screenshot showing the pipeline editor window with the Invoke pipeline button on the activities tab without its descriptive text.":::

1. Select the new **Invoke pipeline activity** on the canvas if it isn't already selected.

   :::image type="content" source="media/invoke-pipeline-activity/invoke-pipeline-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the **invoke pipeline activity**.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Invoke pipeline settings

Select the **Settings** tab, and choose an existing pipeline from the **invoke pipeline** dropdown, or use the **+ New** button to create a new pipeline directly. You can choose to wait on completion, or continue directly, in which case the invoked pipeline executes in parallel with activities following it within the parent pipeline's execution flow.

:::image type="content" source="media/invoke-pipeline-activity/invoke-pipeline-settings.png" alt-text="Screenshot showing the Invoke pipeline activity settings tab, highlighting the tab.":::


* Connection: Each **Invoke pipeline activity** requires a Connection object that is stored in the secure Fabric credentials store. This connection object stores your user token associated with your Fabric workspace. If you haven't yet created a new **Invoke pipeline activity**, you are required to create a new connection object first before you can use the activity.
  
* Workspace: Choose the Fabric workspace where the target pipeline is located that you wish to invoke from your parent pipeline.

:::image type="content" source="media/invoke-pipeline-activity/invoke-pipeline-new-001.png" alt-text="Screenshot showing the pipeline editor window with the Invoke pipeline activity workspace and connection selection.":::

#### Invoke pipelines from ADF and Synapse

- Type: Choose the source of your pipeline (Fabric, Azure Data Factory, Synapse)
- Connection: Reference to Fabric, Azure Data Factory, or Synapse registered as a connection
- Pipeline: Select the pipeline name you wish to invoke
  
:::image type="content" source="media/invoke-pipeline-activity/invoke-pipeline-002.png" alt-text="Screenshot showing the Invoke pipeline activity settings tab, highlighting ADF and Synapse.":::

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
