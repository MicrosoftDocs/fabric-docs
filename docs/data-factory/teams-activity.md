---
title: Teams activity
description: Learn how to add a Teams activity to a pipeline and use it to send a Teams message.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Teams activity to send a message in Teams

The Teams activity in Data Factory for Microsoft Fabric allows you to send a message to a Teams channel or group chat. The message can include dynamic expressions to be customized as much as necessary.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Teams activity to a pipeline with UI

To use a Teams activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for Teams in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/teams-activity/add-teams-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Teams activity highlighted.":::

1. Select the new Teams activity on the canvas if it isn't already selected.

   :::image type="content" source="media/teams-activity/teams-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Teams activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Teams activity settings

1. Select the **Settings** tab, then select **Sign in** to sign in to your Teams account.

   :::image type="content" source="media/teams-activity/sign-in-to-teams.png" alt-text="Screenshot showing the Teams activity Settings tab, highlighting the tab, and where to sign in.":::

1. An authentication dialog appears for you to provide credentials for the account you want to use in Teams. After that, a confirmation appears for you to allow access to Teams from your pipeline. Select **Allow access** on the confirmation dialog to connect your Teams activity to your account.

1. Once connected, you can choose where you want to post the message with the **Post in** setting. You can post to a channel or a group chat.

   :::image type="content" source="media/teams-activity/choose-where-to-post.png" alt-text="Screenshot showing the Teams activity Settings tab, after signing in, with the Post in options dropdown expanded to show its available options.":::

1. The **Group chat** or **Team** and **Channel** dropdowns appear after you select where to post. Use them to select a group chat or team and channel where you want to post the message.

1. Use the **Message** area to create a message. Dynamic expressions are supported allowing you to incorporate any system or user variables, expressions, or functions to customize the message however necessary. To use dynamic expressions, select the **View in expression builder** link below the message area.

   :::image type="content" source="media/teams-activity/edit-teams-message.png" alt-text="Screenshot showing the Teams settings configuration with a group chat selected and the message area displayed.":::

1. If you selected a channel for your post, you can also provide a subject for the message in the **Subject** text box that appears under the **Message** area. This setting is only available for messages to channels.

   :::image type="content" source="media/teams-activity/subject-setting.png" alt-text="Screenshot showing the Subject setting for the Teams activity.":::

## Save and run or schedule the pipeline

The Teams activity is typically used with other activities, often as a status notification for the outcome of prior steps in a pipeline. After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
