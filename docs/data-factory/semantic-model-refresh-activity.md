---
title: Semantic model refresh activity in Data Factory for Microsoft Fabric (Preview)
description: This article describes how to use the Semantic model refresh activity to refresh a PowerBI dataset from a data pipeline in Microsoft Fabric.
author: n0elleli
ms.author: noelleli
ms.topic: how-to
ms.date: 03/13/2024
---

# Use the Semantic model refresh activity to refresh a PowerBI Dataset (Preview)

This guide shows you how to use the Semantic model refresh activity to create connections to your PowerBI semantic model datasets and refresh them from a data pipeline in Data Factory for Microsoft Fabric.

> [!IMPORTANT]
> The Semantic model refresh activity in Data Factory for Microsoft Fabric is currently in preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](/get-started/fabric-trial.md).
- A workspace is created.

## Add a Semantic model refresh activity to a pipeline with UI

To use a Semantic model refresh activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Before you use the Semantic model refresh activity, you need a connection to your PowerBI datasets.
1. Search for Semantic model refresh from the home screen card and select it, or select the activity from the **Activities** bar to add it to the pipeline canvas.

   Creating the activity from the home screen card:
   
   :::image type="content" source="media/semantic-model-refresh-activity/create-semantic-model-refresh-activity.png" alt-text="Screenshot showing how to add a new Semantic model refresh activity to a pipeline from the home screen card.":::

   Creating the activity from the **Activities** bar:

   :::image type="content" source="media/semantic-model-refresh-activity/create-semantic-model-refresh-activity-from-activity-bar.png" alt-text="Screenshot showing how to add a new Semantic model refresh activity to a pipeline from the Activities bar.":::

1. Select the new Semantic model refresh activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/semantic-model-refresh-activity/semantic-model-refresh-activity-general-settings.png" alt-text="Screenshot showing the General settings for the Semantic model refresh activity.":::

   Refer to the [General settings guidance](activity-overview.md#general-settings) to configure the options found on this tab.

### Semantic model refresh activity settings

1. Select the **Settings** tab in the activity properties pane, then use the **Connection** dropdown to select an existing connection, or use the **+ New** button to create and configure a new connection to PowerBI.

   :::image type="content" source="media/semantic-model-refresh-activity/semantic-model-refresh-activity-settings.png" alt-text="Screenshot showing the Semantic model refresh activity's main settings page.":::

1. When you choose **+ New** to create a new connection, you see the connection creation dialog where you can provide the **Connection name** and credentials for the **Authorization kind** that you choose.

   :::image type="content" source="media/semantic-model-refresh-activity/create-new-connection-dialog.png" alt-text="Screenshot showing the dialog to create a new connection to PowerBI.":::

1. After you create a connection, you can find it in the dropdown menu. If you don't see it, select **Refresh**. Then select your connection.

   :::image type="content" source="media/semantic-model-refresh-activity/select-connection.png" alt-text="Screenshot showing where to select the PowerBI connection for the semantic model refresh.":::

1. Select your **Workspace** and **Dataset** to configure the rest of the activity. Find additional configuration options under **Advanced**.

   :::image type="content" source="media/semantic-model-refresh-activity/provide-connection-details.png" alt-text="Screenshot showing where to provide additional details after selecting the PowerBI connection for the activity.":::

## Save and run or schedule the pipeline

Although the Semantic model refresh activity is typically used with other activities, it can be run directly as is. After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)