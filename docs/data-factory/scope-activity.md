---
title: Scope activity
description: The Scope activity for Data Factory pipelines in Microsoft Fabric allows you to execute a script in Azure Data Lake Analytics.
author: kromerm
ms.author: makromer
ms.reviewer: jburchel
ms.topic: how-to
ms.date: 01/11/2024
---

# Use the Scope activity to execute a script in Azure Data Lake Analytics

You can use a Scope activity in a pipeline to execute a custom script in Azure Data Lake Analytics (ADLA).

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Scope activity to a pipeline with UI

To use a Scope activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for **Scope** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. You might need to expand the activities toolbar since there are many activities, sometimes more than can fit on its initially visible area.

   :::image type="content" source="media/scope-activity/add-scope-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Scope activity highlighted.":::

1. Select the new Scope activity on the canvas if it isn't already selected.

   :::image type="content" source="media/scope-activity/scope-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Scope activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### ADLA account settings

Select the **ADLA Account** tab of the Scope activity. Select an existing account connection or create a new connection to your ADLA account.

:::image type="content" source="media/scope-activity/scope-activity-azure-data-lake-analytics-account-settings-tab.png" alt-text="Screenshot showing the ADLA Account settings tab of the Scope activity.":::

### Script settings

Select the **Script** tab of the Scope activity and select an existing or create a new script connection, as well as a script path for the activity. Optionally provide any script parameters, and advanced settings for the script.

:::image type="content" source="media/scope-activity/scope-activity-script-settings.png" alt-text="Screenshot showing the Script tab of the Scope activity settings.":::

## Save and run or schedule the pipeline

When your pipeline is finished, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Next steps

[How to monitor pipeline runs](monitor-pipeline-runs.md)
