---
title: WebHook activity
description: The webhook activity for Data Factory pipelines in Microsoft Fabric controls the execution of pipelines through custom code.
author: nabhishek
ms.author: abnarain
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the WebHook activity to call an endpoint and wait for it to complete

A webhook activity can control the execution of pipelines through custom code. With the webhook activity, code can call an endpoint and pass it a callback URL. The pipeline run waits for the callback invocation before it proceeds to the next activity.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a WebHook activity to a pipeline with UI

To use a WebHook activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for WebHook in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. 

   > [!NOTE]
   > Unless your screen has a very high resolution, you likely need to expand the list of activities from the toolbar using the elipsis **...** button to find the WebHook activity.

   :::image type="content" source="media/webhook-activity/add-webhook-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and WebHook activity highlighted.":::

1. Select the new WebHook activity on the canvas if it isn't already selected.

   :::image type="content" source="media/webhook-activity/webhook-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the WebHook activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Web activity settings

1. Select the **Settings** tab, select an existing connection from the **Connection** dropdown, or use the **+ New** button to create a new connection, and specify its configuration details.

   :::image type="content" source="media/webhook-activity/choose-web-connection-and-configure.png" alt-text="Screenshot showing the WebHook activity settings tab highlighting the tab, and where to choose a new connection.":::

1. When you choose **+ New** to create a new connection, you see the connection creation dialog where you can provide the base URL and credentials to connect.

   :::image type="content" source="media/webhook-activity/create-new-connection.png" alt-text="Screenshot showing the new connection dialog for the WebHook activity.":::

1. After choosing or creating your connection, complete the remaining required fields, add any required headers, or set any advanced settings. The WebHook activity only supports the POST method.

1. Use the output from the activity as the input to any other activity, and reference the output anywhere dynamic content is supported in the destination activity.

## Save and run or schedule the pipeline

Typically, you use the output of the WebHook activity with other activities, but once configured, it can be run directly without other activities, too. If you're running it to invoke a REST API that performs some action and you don't require any output from the activity, your pipeline might contain only the Web activity, too. To run the activity, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
