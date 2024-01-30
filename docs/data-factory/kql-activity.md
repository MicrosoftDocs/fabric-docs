---
title: KQL activity
description: Learn how to add a KQL activity to a pipeline and use it to connect to an Azure Data Explorer instance and run a query in Kusto Query Language (KQL).
ms.reviewer: jburchel
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the KQL activity to run a query

The KQL activity in Data Factory for Microsoft Fabric allows you to run a query in Kusto Query Language (KQL) against an Azure Data Explorer instance.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a KQL activity to a pipeline with UI

To use a KQL activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for KQL in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. 

   > [!NOTE]
   > You may need to expand the menu and scroll down to see the KQL activity as highlighted in the screenshot below.

   :::image type="content" source="media/kql-activity/add-kql-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and KQL activity highlighted.":::

1. Select the new KQL activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/kql-activity/kql-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the KQL activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### KQL activity settings

1. Select the **Settings** tab, then select a **Data store type**. You can use a KQL database created within your Fabric workspace, or connect to an external database with Azure Data Explorer by providing a cluster URI, database, and credentials.

1. Next, select your **KQL Database** connection. If you select a workspace data store you can use dynamic content to parameterize the database selection by selecting the **Add dynamic content** option that appears in the dropdown.

1. Then provide a KQL query to execute against the selected database for the **Command** property. You can use dynamic content in the query by selecting the **Add dynamic content** link that appears when the text box is selected.

   :::image type="content" source="media/kql-activity/kql-activity-settings.png" alt-text="Screenshot showing the Settings tab of the KQL activity highlighting the Command property and showing where its Add dynamic content link appears.":::

1. Finally, specify a command timeout or leave the default timeout of 20 minutes. You can use dynamic content for this property too.

## Save and run or schedule the pipeline

The KQL activity might typically be used with other activities. After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
