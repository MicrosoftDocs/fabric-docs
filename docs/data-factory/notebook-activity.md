---
title: Notebook activity
description: Learn how to add a notebook activity to a pipeline and use it to invoke a notebook in Data Factory in Microsoft Fabric.
ms.reviewer: xupxhou
ms.author: whhender
author: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 06/16/2025
---

# Transform data by running a notebook

Use the Notebook activity to run [notebooks](../data-engineering/how-to-use-notebook.md) you create in [!INCLUDE [product-name](../includes/product-name.md)] as part of your Data Factory pipelines. [Notebooks](../data-engineering/how-to-use-notebook.md) let you run Apache Spark jobs to bring in, clean up, or transform your data as part of your data workflows. It’s easy to add a Notebook activity to your data pipelines in Fabric, and this guide walks you through each step.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.
- A notebook is created in your workspace. To create a new notebook, refer to [How to create [!INCLUDE [product-name](../includes/product-name.md)] notebooks](../data-engineering/how-to-use-notebook.md).

## Create a notebook activity

1. Create a new pipeline in your workspace.
1. Search for Notebook in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/notebook-activity/add-notebook-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Notebook activity highlighted.":::

1. Select the new Notebook activity on the canvas if it isn't already selected.

   :::image type="content" source="media/notebook-activity/notebook-general-settings.png" alt-text="Screenshot showing the General settings tab of the Notebook activity.":::

   Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

## Configure notebook settings

Select the **Settings** tab, select an existing notebook from the **Notebook** dropdown, and optionally specify any parameters to pass to the notebook.

:::image type="content" source="media/notebook-activity/choose-notebook-and-add-parameters.png" alt-text="Screenshot showing the Notebook settings tab highlighting the tab, where to choose a notebook, and where to add parameters.":::

### Set session tag

In order to minimize the amount of time it takes to execute your notebook job, you could optionally set a session tag. Setting the session tag instructs Spark to reuse any existing Spark session, minimizing the startup time. Any arbitrary string value can be used for the session tag. If no session exists, a new one would be created using the tag value.

:::image type="content" source="media/notebook-activity/session-tag-001.png" alt-text="Screenshot showing the Notebook settings tab highlighting the tab, where to add session tag.":::

> [!NOTE]
> To be able to use the session tag, High concurrency mode for pipeline running multiple notebooks option must be turned on. This option can be found under the High concurrency mode for Spark settings under the Workspace settings

> :::image type="content" source="media/notebook-activity/turn-on-high-concurrency-mode-for-session-tags.png" alt-text="Screenshot showing the Workspace settings tab highlighting the tab, where to enable high concurrency mode for pipelines running multiple notebooks.":::

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/notebook-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
