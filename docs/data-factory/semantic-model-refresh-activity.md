---
title: Semantic model refresh activity in Data Factory for Microsoft Fabric
description: This article describes how to use the Semantic model refresh activity to refresh a Power BI dataset from a pipeline in Microsoft Fabric.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines
ms.date: 07/09/2025
---

# Use the Semantic model refresh activity to refresh a Power BI Dataset

This guide shows you how to use the Semantic model refresh activity to connect to your Power BI semantic model datasets and refresh them from a pipeline in Data Factory for Microsoft Fabric.

   > [!NOTE]
   > This activity works only with semantic models you create yourself. 

## Prerequisites

Before you start, make sure you have:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace with **Power BI Premium**, **Premium Per User**, or **Power BI Embedded capacities**.

## Add a Semantic model refresh activity to a pipeline with UI

Follow these steps to use the Semantic model refresh activity in your pipeline: 

### Create the activity

1. Start by creating a new pipeline in your workspace. 
1. Before you add the Semantic model refresh activity, make sure you have a connection to your Power BI datasets.
1. Find "Semantic model refresh" from the **Add pipeline activity** home screen card and select it, or pick it from the **Activities** bar to add it to the pipeline canvas.

   Creating the activity from the home screen card:
   
   :::image type="content" source="media/semantic-model-refresh-activity/create-semantic-model-refresh-activity.png" lightbox="media/semantic-model-refresh-activity/create-semantic-model-refresh-activity.png" alt-text="Screenshot showing how to add a new Semantic model refresh activity to a pipeline from the home screen card.":::

   Creating the activity from the **Activities** bar:

   :::image type="content" source="media/semantic-model-refresh-activity/create-semantic-model-refresh-activity-from-activity-bar.png" alt-text="Screenshot showing how to add a new Semantic model refresh activity to a pipeline from the Activities bar.":::

1. Select the new Semantic model refresh activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/semantic-model-refresh-activity/semantic-model-refresh-activity-general-settings.png" lightbox="media/semantic-model-refresh-activity/semantic-model-refresh-activity-general-settings.png" alt-text="Screenshot showing the General settings for the Semantic model refresh activity.":::

   Refer to the [General settings guidance](activity-overview.md#general-settings) to configure the options found on this tab.

### Semantic model refresh activity settings

1. Select the **Settings** tab in the activity properties pane. Use the **Connection** dropdown to pick an existing connection, or create and configure a new connection to Power BI.

   :::image type="content" source="media/semantic-model-refresh-activity/semantic-model-refresh-activity-settings.png" alt-text="Screenshot showing the Semantic model refresh activity's main settings page.":::

1. When you select **+ New** to make a new connection, a dialog appears where you can enter the **Connection name** and your credentials for the **Authorization kind** you choose.

   :::image type="content" source="media/semantic-model-refresh-activity/create-new-connection-dialog.png" lightbox="media/semantic-model-refresh-activity/create-new-connection-dialog.png" alt-text="Screenshot showing the dialog to create a new connection to Power BI.":::

1. After you create a connection, you'll see it in the dropdown menu. If it doesn't show up right away, select **Refresh**. Then, select your connection.

   :::image type="content" source="media/semantic-model-refresh-activity/select-connection.png" alt-text="Screenshot showing where to select the Power BI connection for the semantic model refresh.":::

1. Select your **Workspace** and **Dataset** to finish setting up the activity. For more options, open the **Advanced** section.

   - In **Advanced**, you'll see **Wait on completion** turned *on* by default. This option lets the activity wait until the refresh finishes before moving on.
   - You can also set values for **Max parallelism** and **Retry Count**, and choose whether to commit the refresh all at once (**Transactional**) or in batches (**Partial Batch**).

   > [!NOTE]
   > By default, the semantic model refresh activity runs a full refresh when triggered from the pipeline.
   
   :::image type="content" source="media/semantic-model-refresh-activity/semantic-model-wait-on-completion.png" alt-text="Screenshot showing where to provide additional details after selecting the connection for the activity.":::

## Choose tables and partitions to refresh

You can make your semantic model refresh faster by picking only the tables and the partitions you want to refresh, instead of refreshing the whole model. You'll find these options under settings. You can also use the pipeline expression builder to set these properties with parameters.

:::image type="content" source="media/semantic-model-refresh-activity/semantic-model-tables.png" alt-text="Screenshot showing the option to refresh specific tables.":::
:::image type="content" source="media/semantic-model-refresh-activity/semantic-model-partitions.png" alt-text="Screenshot showing the option to refresh specific partitions.":::

## Save and run or schedule the pipeline

You can run the Semantic model refresh activity on its own or as part of a larger pipeline. Once you've set up all the activities you need, go to the **Home** tab at the top of the pipeline editor and click the save button to save your pipeline. Select **Run** to start it right away, or **Schedule** to set it to run later. You can also check the run history or adjust other settings here.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
