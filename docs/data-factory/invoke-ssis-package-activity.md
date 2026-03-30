---
title: Use the Invoke SSIS Package activity in a pipeline (Preview)
description: Learn how to run SQL Server Integration Services (SSIS) packages in a Data Factory pipeline in Microsoft Fabric by using the Invoke SSIS Package activity.
ms.reviewer: chugu
ms.topic: how-to
ms.custom:
ms.date: 02/09/2026
---

# Use the Invoke SSIS Package activity to run an SSIS package (Preview)

SQL Server Integration Services (SSIS) is a widely used ETL tool that lets you design complex data-extraction and transformation workflows in Visual Studio SQL Server Integration Services Projects. Those workflows are saved as SSIS packages (*.dtsx* files).

Over time, organizations accumulate a considerable number of SSIS packages that serve different business purposes. The **Invoke SSIS Package** activity in Data Factory for Microsoft Fabric lets you move existing SSIS workloads into Fabric with minimal changes.

> [!VIDEO https://www.youtube.com/embed/sgvtMtMU6og]

> [!IMPORTANT]
> The Invoke SSIS Package activity is currently in **preview**. Preview features may have limited functionality and are subject to change before general availability.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A [workspace](../fundamentals/create-workspaces.md) is created.
- Your SSIS packages (*.dtsx* files) are ready. If you also use package configuration files (*.dtsConfig*), have those available as well.

## Step 1 – Move SSIS packages to OneLake

Before you can invoke a package, it must be stored in OneLake. You can upload packages in either of the following ways:

| Method | Description |
|---|---|
| **OneLake file explorer** | Drag and drop your *.dtsx* (and optional *.dtsConfig*) files directly into a Lakehouse **Files** section through the OneLake file explorer on your desktop. |
| **Fabric portal** | Navigate to a Lakehouse in the Fabric portal, select **Upload** > **Upload files**, and choose the package files from your local machine. |

:::image type="content" source="media/invoke-ssis-package-activity/upload-packages-onelake.png" alt-text="Screenshot showing SSIS packages uploaded to OneLake.":::

## Step 2 – Add an Invoke SSIS Package activity to a pipeline

1. Create a new pipeline in your workspace, or open an existing one.
2. In the **Activities** pane, search for **Invoke SSIS Package** and select it to add the activity to the pipeline canvas.
3. Select the new activity on the canvas if it isn't already selected.

    :::image type="content" source="media/invoke-ssis-package-activity/add-invoke-ssis-activity.png" alt-text="Screenshot showing the Invoke SSIS Package activity on the pipeline canvas.":::

Refer to the [General settings](activity-overview.md#general-settings) guidance to configure the **General** tab (name, description, timeout, retry, and retry interval).

## Step 3 – Configure package settings

Select the **Settings** tab and configure the following options:

| Setting | Description |
|---|---|
| **Package path** | Select **Browse** to pick a *.dtsx* package file from OneLake. |
| **Configuration path** *(optional)* | Select **Browse** to pick a package configuration file (*.dtsConfig*) from OneLake, if your package uses one. |
| **Enable logging** | When selected, the activity writes package-execution logs to OneLake. After the run completes, you can find the logging path in the activity output. |

:::image type="content" source="media/invoke-ssis-package-activity/settings-tab.png" alt-text="Screenshot showing the Settings tab of the Invoke SSIS Package activity.":::

## Step 4 – Set runtime values (Connection Managers / Property Overrides)

If your package requires runtime values—for example, connection strings, credentials, or other sensitive information—configure them on the **Connection Managers** or **Property Overrides** tabs.

### Connection Managers tab

Use this tab to override connection-manager properties at execution time. For each connection manager, provide the **Scope**, **Name**, **Property**, and **Value**. This is especially important when the package protection level is set to **DontSaveSensitive**, because passwords and credentials aren't persisted in the package and must be supplied at runtime.

### Property Overrides tab

Use this tab to override any package property by entering its property path and the desired value. For example, to override a user variable:

```text
\Package.Variables[User::<variable name>].Value
```

> [!NOTE]
> You can add dynamic content by using expressions, pipeline parameters, or system variables when assigning override values.

:::image type="content" source="media/invoke-ssis-package-activity/connection-managers-tab.png" alt-text="Screenshot showing the Connection Managers tab with runtime overrides.":::

## Step 5 – Save and run or schedule the pipeline

After you finish configuring the Invoke SSIS Package activity (and any other activities in your pipeline):

1. Switch to the **Home** tab at the top of the pipeline editor.
2. Select **Save** to save your pipeline.
3. Select **Run** to execute the pipeline immediately, or select **Schedule** to set up a recurring schedule.

:::image type="content" source="media/invoke-ssis-package-activity/save-run-schedule.png" alt-text="Screenshot showing the Home tab with Save, Run, and Schedule buttons highlighted.":::

## Step 6 – Monitor package execution

After you trigger a run, monitor its progress in the pipeline **Output** tab or the workspace **Monitor** hub.

- The **Status** column shows whether the activity succeeded, failed, or is in progress.
- If **Enable logging** was selected in the Settings tab, the activity output includes the **logging path** on OneLake where detailed package-execution logs are stored.

:::image type="content" source="media/invoke-ssis-package-activity/monitor-execution.png" alt-text="Screenshot showing the monitoring view with the Invoke SSIS Package activity status and logging path.":::

To view logs, navigate to the logging path in OneLake and review the log files for detailed execution information and error messages.

## Pricing model

The following table shows a breakdown of the pricing model for the Invoke SSIS Package activity:

| Operation | Consumption Meter | Fabric Capacity Units (CU) consumption rate |
|---|---|---|
| SQL Server Integration Services uptime | SSIS in Fabric | 1.5 CU hours per VCore|

Billing for the Invoke SSIS Package activity is based on SQL Server Integration Services (SSIS) uptime within your workspace. Uptime begins when the first Invoke SSIS Package activity in the workspace starts running, and continues as long as at least one activity is in progress. After the last activity completes, the SSIS runtime remains available for a fixed Time-To-Live (TTL) period of **30 minutes** to efficiently handle subsequent runs without a cold-start delay. If no new Invoke SSIS Package activity starts within the TTL window, the runtime shuts down and billing stops.

> [!NOTE]
> The TTL is currently fixed at 30 minutes and can't be configured for now.
> Each workspace is allocated 4 vCores for SSIS runtime execution. During preview, this allocation is fixed and cannot be modified.

> [!NOTE]
> In addition to the SSIS uptime meter, pipeline orchestration runs and OneLake storage/transactions are charged under their respective meters. For details, see [Data Factory pricing for Microsoft Fabric](pricing-overview.md) and [OneLake consumption](../onelake/onelake-consumption.md).

## Limitations

During the preview, the following limitations apply:

- **OneLake only** – Only packages stored in OneLake are supported.
- **No on-premises data sources or destinations** – The activity can't connect to on-premises systems.
- **No private-network endpoints** – Data sources or destinations behind private networks (for example, VNet-injected or private-endpoint resources) aren't supported.
- **No custom or third-party components** – Packages that depend on custom components or third-party components aren't supported.

## Related content

- [Activity overview](activity-overview.md)
- [Create your first pipeline](create-first-pipeline-with-sample-data.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
