---
title: Run dbt Job Activity in Fabric Pipeline
description: "Learn how to add a dbt job activity to a Fabric data pipeline to orchestrate dbt transformations alongside other pipeline activities."
ms.reviewer: xupzhou
ms.service: fabric
ms.topic: how-to
ms.date: 04/06/2026

#customer intent: As a data engineer, I want to orchestrate dbt jobs inside a Fabric pipeline so that I can build end-to-end data workflows without switching tools.
---

# Orchestrate a dbt job in a pipeline (Preview)

The dbt job activity lets you run a dbt job as part of a Fabric data pipeline. You can select an existing dbt job from your workspace, create a new one inline, and chain it with other activities to build end-to-end data workflows. All dbt job settings support dynamic content, so you can build metadata-driven pipelines with parameterized configurations.

## What you can do with the dbt job activity

- Select an existing dbt job from your workspace.
- Create a new dbt job if one doesn't exist.
- Chain with other activities in your pipeline using success, failure, or completion dependencies.
- Pass dynamic runtime parameters from your pipeline to the dbt job, enabling reusable, parameterized workflows
- Build metadata-driven dbt pipelines with parameterized orchestration.
- Send Teams or email notifications after a dbt job runs.
- Monitor the dbt job's progress and status within pipeline run history.

## Prerequisites

Before you begin, make sure you have the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. [Create a free account](https://www.microsoft.com/microsoft-fabric).
- A Microsoft Fabric enabled workspace. [Create a workspace](/fabric/fundamentals/create-workspaces).
- [Permission and access](dbt-job-overview.md#required-permissions-and-access) for dbt jobs in Microsoft Fabric.
- The dbt job activity supports multiple authentication methods including OAuth (user-based), Service Principal (SPN), and Managed Identity (Workload Identity). Ensure the required permissions are configured for the selected authentication method.

## Add a dbt job activity to a pipeline

1. Create a new pipeline or open an existing one, then add a **dbt job** activity from the activity pane.

   :::image type="content" source="./media/dbt-job-activity/add-data-build-tool-job-activity.jpg" alt-text="Screenshot showing the dbt job activity added to the pipeline canvas.":::

1. Go to the activity's **Settings** tab. Under **Connection**, use an existing connection from drop-down or select **Browse all** to open the **Get data** page. Select **dbt job** to create a new connection.

   :::image type="content" source="./media/dbt-job-activity/settings-tab-connection.jpg" alt-text="Screenshot showing the Settings tab with the Connection dropdown.":::

1. Select the **workspace** and **dbt job** item to orchestrate in your pipeline. If you don't have a dbt job item, create one by selecting the **+ New** button in the dbt job settings within the activity.

## Configure authentication for dbt job activity

The dbt job activity supports multiple authentication mechanisms to securely connect and execute dbt jobs within a pipeline. You can choose an authentication method based on your deployment scenario and security requirements.

Supported authentication types:

- **OAuth (user-based)** - Uses your user identity to authenticate. This method is best suited for development and interactive scenarios.
- **Service Principal (SPN)** - Uses an application identity (client ID and client secret or certificate) to authenticate. This method is recommended for production pipelines and automation scenarios, as it enables non-interactive and secure execution.
- **Managed Identity (Workload Identity)** - Uses a managed identity associated with the Fabric environment to authenticate. This eliminates the need to manage credentials and is recommended for enterprise scenarios requiring centralized identity management.

### Configure authentication in a dbt job connection

Follow these steps to configure authentication when creating or updating a dbt job connection:

1. In the dbt job activity, go to the **Settings** tab.
1. Under **Connection**, select an existing connection or select **Browse all** to create a new one.
1. To create a new connection, select **DataBuildTool Job** from new sources.

   :::image type="content" source="./media/dbt-job-activity/select-data-build-tool-job.png" alt-text="Screenshot of the databuildtool Job source.":::

1. Select the connection drop down under **connection credentials** and select **Create new connection**.
1. Under **Authentication kind**, select the [authentication type](#configure-authentication-for-dbt-job-activity) you want to use and provide the required details.

   :::image type="content" source="./media/dbt-job-activity/authentication-type.png" alt-text="Screenshot of the authentication window for the connection.":::
   
1. Save the connection and select it for your dbt job activity.

## Configure parameters in a dbt job activity

You can use parameters to control the behavior of a pipeline and its activities. Select **Add dynamic content** to specify parameters for any dbt job activity property. Dynamic content is supported for all columns in the **Settings** tab.

For example, you can pass a parameter to the **Select** field so that each pipeline run executes only the dbt models you specify. Follow these steps to set it up:

1. In the **Settings** tab, select the **Select** field and choose **Add dynamic content**.

1. In the **Add dynamic content** pane, select the **Parameters** tab, then select **+** to create a new parameter.

   :::image type="content" source="./media/dbt-job-activity/add-dynamic-content.jpg" alt-text="Screenshot showing the Add dynamic content pane with the Parameters tab.":::

1. Specify a name for the parameter, for example **model_name**, and set a default value such as **my_model**. Select the parameter to insert it as the dynamic value for the **Select** field.

   :::image type="content" source="./media/dbt-job-activity/select-parameter-value.jpg" alt-text="Screenshot showing the parameter inserted as the dynamic value for the Select field.":::

   :::image type="content" source="./media/dbt-job-activity/after-select-parameter-value.jpg" alt-text="Screenshot showing the setting page of the dynamic value for the Select field.":::

When the pipeline runs, the **Select** field resolves to the parameter value, so dbt executes only the matching model. You can override the default value each time you trigger the pipeline to target different models without editing the activity.

You can add dynamic content for any column in **Settings** using the same approach.

## dbt job activity advanced settings

The **Settings** tab contains the advanced settings for dbt command options, node selection, and execution behavior.

:::image type="content" source="./media/dbt-job-activity/data-build-tool-job-settings.png" alt-text="Screenshot showing the full dbt job activity Settings tab.":::

The following table describes each setting.

| Setting | Description | JSON script property |
|---|---|---|
| **Option** | Specifies the dbt command to execute: build, run, compile, snapshot, or test. | `operation` |
| **Select** | Specify selection criteria (for example, models, project, directory, package, tag, or path) to choose a subset of nodes to dbt execute. [Learn more about node selection syntax](https://docs.getdbt.com/reference/node-selection/syntax). | `select` |
| **Exclude** | Specify exclusion criteria (for example, models, project, directory, package, tag, or path) to exclude a subset of nodes from dbt execution. [Learn more about exclude syntax](https://docs.getdbt.com/reference/node-selection/exclude). | `exclude` |
| **Full refresh** | Specify whether to force dbt to rebuild all models from scratch. [Learn more about refreshing incremental models](https://docs.getdbt.com/reference/commands/run#refresh-incremental-models). | `fullRefresh` |
| **Fail fast** | Specify whether dbt should exit immediately if a single resource fails to build. [Learn more about failing fast](https://docs.getdbt.com/reference/global-configs/failing-fast). | `failFast` |
| **Thread** | The number of threads to use to construct the dbt graph. The default is 4. [Learn more about using threads](https://docs.getdbt.com/docs/running-a-dbt-project/using-threads). | `threads` |
| **Selector name** | Specify the name of a selector from the project's selectors.yml file. Using a selector overrides the select and exclude arguments. [Learn more about YAML selectors](https://docs.getdbt.com/reference/node-selection/yaml-selectors). | `selectorName` |

## Related content

- [Create a dbt job in Microsoft Fabric](dbt-job-how-to.md)
- [Monitor pipeline runs in Microsoft Fabric](monitor-pipeline-runs.md)
- [Pipeline activity overview](activity-overview.md)
