---
title: How to use Script activity
description: Learn how to use Script activity.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# How to use Script activity

In this article, you learn how to add a new Script activity, add a new connection, and configure script content.

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.

## Add a Script activity to a Pipeline with UI

1. Open an existing data pipeline or create a new data pipeline.
1. Click on add a pipeline activity and search for **Script**.

    :::image type="content" source="media/script-activity/add-script-activity-canvas.png" alt-text="Screenshot showing where to select the Script activity in the canvas." lightbox="media/script-activity/add-script-activity-canvas.png":::

1. Alternately, you can search for **Script** Activity in the pipeline Activities ribbon at the top, and select it to add it to the pipeline canvas.

    :::image type="content" source="media/script-activity/add-script-activity-ribbon.png" alt-text="Screenshot showing where to select the Script activity in the ribbon." lightbox="media/script-activity/add-script-activity-ribbon.png":::

1. Select the new Script activity on the canvas if it isn’t already selected.

    :::image type="content" source="media/script-activity/script-activity-general.png" alt-text="Screenshot showing general tab of script activity." lightbox="media/script-activity/script-activity-general.png":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

## Configure the Script Activity

1. Selecting the **Settings** tab, you can choose to create a new workspace (within Fabric) connection or an external connection.

1. After selecting your connection, you can choose either **Query** to get a data result or **NonQuery** for any catalog operations.

    :::image type="content" source="media/script-activity/script-activity-settings.png" alt-text="Screenshot showing settings tab of script activity." lightbox="media/script-activity/script-activity-settings.png":::

1. Then you can input content into the script expression box. We have multiple ways in which you can input script content into the expression box:
    1. You can add dynamic content by either clicking in the box or clicking on the "dynamic content" icon on the right-hand side. A flyout will appear, as seen in the screenshot below, that showcases dynamic content and functions that you can seamlessly use to build your expressions. If you are familiar with Power Automate, the experience is very similar.

        :::image type="content" source="media/script-activity/script-activity-flyout.png" alt-text="Screenshot showing dynamic flyout content in script activity." lightbox="media/script-activity/script-activity-flyout.png":::

    1. You can also directly edit your script code in the code editor by clicking on the pencil icon on the right-hand side, as seen in the screenshot below. After clicking on it, a new dialog box will pop up so that you can seamlessly write and edit your code.

        :::image type="content" source="media/script-activity/script-activity-edit-code.png" alt-text="Screenshot showing edit code in script activity." lightbox="media/script-activity/script-activity-edit-code.png":::

    1. You can also use the expression builder that utilizes IntelliSense code completion for highlighting, syntax checking, and autocompleting to create expressions. Refer to the [**Expression Language** doc](expression-language.md) guidance to use the expression builder.

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-save-and-run.png" alt-text="Screenshot showing how to save and run the pipeline.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
