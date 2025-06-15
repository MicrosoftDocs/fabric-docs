---
title: Functions activity
description: Learn how to add a Functions activity to a pipeline and use it to run Azure Functions.
ms.reviewer: shaween18
ms.author: abnarain
author: ssindhub
ms.topic: how-to
ms.custom: 
  - pipelines
  - Build-2025
ms.date: 05/21/2024
---

# Use the Functions activity to run Fabric user data functions and Azure Functions

The Functions activity in Data Factory for Microsoft Fabric allows you to run Fabric user data functions and Azure Functions.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add a Functions activity to a pipeline with UI

To use a Functions activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for Functions in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   > [!NOTE]
   > You might need to expand the menu and scroll down to see the Functions activity as highlighted in the following screenshot.

   :::image type="content" source="media/functions-activity/add-functions-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Functions activity highlighted.":::

1. Select the new Functions activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/functions-activity/functions-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Functions activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.


## Configure settings

Selecting the Settings tab, you can choose between two radio button options for the type of Functions activity you would like to execute.

### 1) Fabric user data functions activity settings

Under the **Settings** tab, you can choose the **Fabric user data functions** option to run your customized user data functions for event driven scenarios. You'll need to specify the **Workspace** information, choose an existing, or create a new **User data function** and select the **Fabric function** you would like to execute.

:::image type="content" source="media/functions-activity/fabric-user-data-functions-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Fabric user data functions activity.":::

### 2) Azure Functions activity settings

Under the **Settings** tab, you can choose the **Azure function** option to run your functions. You can choose either an existing or create a new **Azure Function connection**, provide a **Function relative URL** that points to the relative path to the Azure App function within the Azure Function connection, and an HTTP **Method** to be submitted to the URL. You can also specify as many additional **Headers** as required for the function you're executing.

:::image type="content" source="media/functions-activity/azure-function-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Azure Function activity.":::

## Using On-premises or VNET data gateway
When creating a new Fabric user data function connection or Azure function connection, you can now choose to use either an on-premises data gateway (OPDG) or a VNET data gateway. For guidance on creating and configuring your OPDG, refer to [how to create on-premises data gateway](how-to-access-on-premises-data.md).

If you would like to use a VNET gateway, refer to [how to create a VNET data gateway](/data-integration/vnet/create-data-gateways).

Once you have successfully created and configured your gateway, it should appear under the Data Gateway dropdown in the connection dialog.

:::image type="content" source="media/functions-activity/create-new-connection-with-data-gateway-user-data-function.png" alt-text="Screenshot showing the data gateway connection dialog for the User Data Function activity.":::

:::image type="content" source="media/functions-activity/create-new-connection-with-data-gateway-azure-function.png" alt-text="Screenshot showing the data gateway connection dialog for the Azure Function activity.":::


## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
