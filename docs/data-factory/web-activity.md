---
title: Web activity
description: The Web activity for Data Factory pipelines in Microsoft Fabric allows you to make requests to REST APIs on the web and retrieve their results.
author: nabhishek
ms.author: abnarain
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Web activity to call REST APIs in pipelines

Web Activity can be used to call a custom REST endpoint from an Azure Data Factory or Synapse pipeline. You can pass datasets and linked services to be consumed and accessed by the activity.

> [!NOTE]
> The maximum supported output response payload size is 4 MB.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Web activity to a pipeline with UI

To use a Web activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for Web in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/web-activity/add-web-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Web activity highlighted.":::

1. Select the new Web activity on the canvas if it isn't already selected.

   :::image type="content" source="media/web-activity/web-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Web activity.":::

   > [!NOTE]
   > The web activity may simply appear as an icon on the toolbar as shown in the previous image, if the screen resolution doesn't allow its name to be fully spelled out.

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Web activity settings

1. Select the **Settings** tab, select an existing connection from the **Connection** dropdown, or use the **+ New** button to create a new connection, and specify its configuration details.

   :::image type="content" source="media/web-activity/choose-web-connection-and-configure.png" alt-text="Screenshot showing the Lookup activity settings tab highlighting the tab, and where to choose a new connection.":::

1. When you choose **+ New** to create a new connection, you see the connection creation dialog where you can provide the base URL and credentials to connect.

   :::image type="content" source="media/web-activity/create-new-connection.png" alt-text="Screenshot showing the new connection dialog for the Web activity.":::

> [!NOTE]
> The Connection name can be max 80 characters long.

1. After choosing or creating your connection, complete the remaining required fields, add any required headers, or set any advanced settings. The Web activity supports GET, POST, PUT, DELETE, and PATCH methods.

## Save and run or schedule the pipeline

Typically, you use the output of the Web activity with other activities, but once configured, it can be run directly without other activities, too. If you're running it to invoke a REST API that performs some action and don't require any output from the activity, your pipeline might contain only the Web activity, too. To run the activity, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
