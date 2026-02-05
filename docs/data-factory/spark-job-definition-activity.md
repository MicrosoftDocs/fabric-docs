---
title: Spark Job Definition activity
description: Learn how to transform data by running a Spark Job Definition activity in a pipeline in Data Factory for Microsoft Fabric.
ms.reviewer: xupxhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 03/10/2025
---

# Transform data by running a Spark Job Definition activity

The Spark Job Definition activity in Data Factory for Microsoft Fabric allows you to create connections to your Spark Job Definitions and run them from a pipeline.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add a Spark Job Definition activity to a pipeline with UI

1. Create a new pipeline in your workspace.
1. Search for Spark Job Definition from the home screen card and select it or select the activity from the Activities bar to add it to the pipeline canvas.

   - Creating the activity from the home screen card:

     :::image type="content" source="media/spark-job-definition-activity/create-activity-from-home-screen-card.png" lightbox="media/spark-job-definition-activity/create-activity-from-home-screen-card.png" alt-text="Screenshot showing where to create a new Spark Job Definition activity.":::

   - Creating the activity from the Activities bar:
  
     :::image type="content" source="media/spark-job-definition-activity/create-activity-from-activities-bar.png" lightbox="media/spark-job-definition-activity/create-activity-from-activities-bar.png" alt-text="Screenshot showing where to create a new Spark Job Definition activity from the Activities bar in the pipeline editor window.":::

1. Select the new Spark Job Definition activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/spark-job-definition-activity/spark-job-definition-activity.png" lightbox="media/spark-job-definition-activity/spark-job-definition-activity.png" alt-text="Screenshot showing the Spark Job Definition activity on the pipeline editor canvas.":::

   Refer to the [General settings](activity-overview.md#general-settings) guidance to configure the options found in the **General settings** tab.

## Spark Job Definition activity settings

Select the **Settings** tab in the activity properties pane, then select the Fabric Workspace that contains the Spark Job Definition you would like to run.

:::image type="content" source="media/spark-job-definition-activity/spark-job-definition-settings.png" lightbox="media/spark-job-definition-activity/spark-job-definition-settings.png" alt-text="Screenshot showing the Settings tab of the Spark Job Definition properties pages in the pipeline editor window.":::

Here you can configure your connection, workspace, and Spark job definition. If no Spark job definition exists yet, you can create a new Spark job definition from your pipeline editor by selecting the **+New** button next to **Spark job definition**.

:::image type="content" source="media/spark-job-definition-activity/create-new-spark-job-from-activity.png" lightbox="media/spark-job-definition-activity/create-new-spark-job-from-activity.png" alt-text="Screenshot showing the +New button next to the Spark job definition selection box in the Settings tab of the Spark Job definition properties pages in the pipeline editor window.":::

After you set a name and select create, you will be taken to your Spark job definition to set your configurations. 

:::image type="content" source="media/spark-job-definition-activity/set-new-name-spark-job-from-activity.png" lightbox="media/spark-job-definition-activity/set-new-name-spark-job-from-activity.png" alt-text="Screenshot showing a pop up to name and create a new Spark job definition.":::

:::image type="content" source="media/spark-job-definition-activity/configure-spark-job-definition.png" lightbox="media/spark-job-definition-activity/configure-spark-job-definition.png" alt-text="Screenshot showing a new Fabric Spark job definition item.":::

### Configure connection authentication

In the **Settings** tab, under **Connection**, select the desired Fabric connection for authentication. If no connection exists, create one by selecting **Browse all** and then **Spark Job Definition** under **New sources**.

### Advanced settings

Within the **Settings** tab, you can configure more settings under **Advanced settings**.

:::image type="content" source="media/spark-job-definition-activity/spark-job-definition-advanced-settings.png" lightbox="media/spark-job-definition-activity/spark-job-definition-advanced-settings.png" alt-text="Screenshot showing the Advanced settings in the Spark Job Definition activity settings on the pipeline editor canvas.":::

You can also parameterize these setting fields to orchestrate your Spark job definition item. The values passed will override your Spark job definition original configurations.

:::image type="content" source="media/spark-job-definition-activity/parameterize-spark-job-definition.png" lightbox="media/spark-job-definition-activity/parameterize-spark-job-definition.png" alt-text="Screenshot showing how to add dynamic content under Advanced settings.":::

:::image type="content" source="media/spark-job-definition-activity/spark-job-definition-parameterized-expression.png" lightbox="media/spark-job-definition-activity/spark-job-definition-parameterized-expression.png" alt-text="Screenshot showing an expression set for a Main definition file under Advanced settings in the Spark Job Definition activity settings.":::

## Known limitations

Current limitations in the Spark Job Definition activity for Fabric Data Factory are listed here. This section is subject to change.

- Although we support monitoring the activity via the output tab, you aren't able to monitor the Spark Job Definition at a more granular level yet. For example, links to the monitoring page, status, duration, and previous Spark Job Definition runs aren't available directly in the Data Factory. However, you can see more granular details in the [Spark Job Definition monitoring page](../data-engineering/monitor-spark-job-definitions.md).
- Detailed run-level monitoring is available in the Spark Job Definition monitoring page. The authentication method (SPN or WI) used for the run does **not** affect monitoring behavior.
- Some customers may not see the Workspace Identity (WI) dropdown, or may see it but be unable to create a connection. This behavior is due to a known issue in one of our underlying platform components. The fix for this is currently being worked on.

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the Home tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/spark-job-definition-activity/save-run-schedule.png" alt-text="Screenshot showing the Home tab of the pipeline editor, highlighting the Save, Run, and Schedule buttons.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
