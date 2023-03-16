---
title: Notebook activity
description: Learn how to add a notebook activity to a pipeline and use it to invoke a notebook.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.date: 03/09/2023
---

# Transform data by running a notebook

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

The Fabric Notebook activity runs a notebook in your Fabric pipeline. You can create a Notebook activity directly through the [!INCLUDE [product-name](../includes/product-name.md)] user interface. For a step-by-step walkthrough of how to create a Notebook activity using the user interface, you can refer to the following.

## Add a Notebook activity to a pipeline

This section describes how to use a Notebook activity in a pipeline.

### Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](/trident-docs-private-preview/synapse-data-integration/url).
- A workspace is created.
- A notebook is created in your workspace. To create a new notebook, refer to [How to create [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

### General settings

1. Create a new pipeline in your workspace.
1. Search for Notebook in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/notebook-activity/add-notebook-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Notebook activity highlighted.":::

1. Select the new Notebook activity on the canvas if it isn't already selected.

   :::image type="content" source="media/notebook-activity/notebook-general-settings.png" alt-text="Screenshot showing the General settings tab of the Notebook activity.":::

1. In the **General** tab at the bottom of the canvas, enter a name for the activity in the Name property.
1. (Optional) You can also enter a description.
1. Timeout: The maximum amount of time an activity can run. The default is 12 hours, and the maximum amount of time allowed is seven days. The format for the timeout is in D.HH:MM:SS.
1. Retry: Maximum number of retry attempts.
1. (Advanced properties) Retry interval (sec): The number of seconds between each retry attempt.
1. (Advanced properties) Secure output: When checked, output from the activity isn't captured in logging.
1. (Advanced properties) Secure input: The number of seconds between each retry attempt.

### Notebook settings

Select the **Settings** tab, select an existing notebook from the **Notebook** dropdown, and optionally specify any parameters to pass to the notebook.

:::image type="content" source="media/notebook-activity/choose-notebook-and-add-parameters.png" alt-text="Screenshot showing the Notebook settings tab highlighting the tab, where to choose a notebook, and where to add parameters.":::

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/notebook-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Next steps

[How to monitor pipeline runs](monitor-pipeline-runs.md)
