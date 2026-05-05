---
title: Teams activity
description: Learn how to add a Teams activity to a pipeline and use it to send a Teams message.
ms.reviewer: xupxhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 08/25/2025
ai-usage: ai-assisted
---

# Send Teams messages with the Teams activity

The Teams activity in Data Factory for Microsoft Fabric lets you send messages to Teams channels or group chats. You can customize messages with dynamic expressions to include information from your pipeline.

## Prerequisites

* A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
* A workspace.

## Add Teams activity to a pipeline

To integrate Teams messaging into your pipeline, you need to add the Teams activity. This section guides you through the steps to include and configure the Teams activity in your pipeline.

1. Create a new pipeline in your workspace.
1. In the **Activities** pane, search for Teams and select it to add it to the pipeline canvas.

   :::image type="content" source="media/teams-activity/add-teams-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Teams activity highlighted.":::

1. Select the new Teams activity on the canvas.

   :::image type="content" source="media/teams-activity/teams-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Teams activity.":::

For details about the **General** settings tab, see [General settings](activity-overview.md#general-settings).

## Configure Teams activity settings

Set up the Teams activity by following these steps:

1. Add a connection to your Teams activity. You can create a new connection or use an existing one.

    > [!NOTE]
    > * If you're using user authentication and deploying the pipeline with the Teams activity to another workspace, the activity will be inactive until you create a new user authentication connection in the target workspace.
    > * If you don't have access to the connections used in the Teams activity, the initial deployment will fail. To troubleshoot, you can edit the target pipeline and change the authorization or set the activity to inactive.

   :::image type="content" source="media/teams-activity/connect-to-teams.png" alt-text="Screenshot showing the Settings tab of the Teams activity highlighting where to create a new connection or use an existing connection.":::

1. Choose where to post the message using the **Post in** setting. You can post to a channel or a group chat.

   :::image type="content" source="media/teams-activity/post-in-channel-or-group-chat.png" alt-text="Screenshot showing the Settings tab of the Teams activity highlighting where to select posting to a channel or group chat.":::

1. If you select group chat, use the dropdown to pick a group chat you're part of. If you select channel, choose a team and then a channel from the dropdowns.

1. Write your message in the **Message** area. Use [dynamic expressions](expression-language.md) to include system or user variables, expressions, or functions. Select **View in expression builder** to add dynamic expressions.

   :::image type="content" source="media/teams-activity/create-message.png" alt-text="Screenshot showing the Settings tab of the Teams activity highlighting the link to select to use dynamic expressions.":::

1. If you're posting to a channel, you can add a subject for the message in the **Subject** text box.

   :::image type="content" source="media/teams-activity/select-a-subject.png" alt-text="Screenshot showing the Settings tab of the Teams activity highlighting boxes to add the subject.":::

## Known limitations

- The Teams activity will be inactive when using CI/CD.

## Related content

- [Run, schedule, and trigger pipelines](pipeline-runs.md)
- [Monitor pipeline runs](monitor-pipeline-runs.md)
