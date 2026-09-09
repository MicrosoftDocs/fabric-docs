---
title: Anomaly Detection in Real-Time Intelligence
description: Learn how to set up and configure anomaly detection for your real-time data streams using Microsoft Fabric Real-Time Intelligence.
ms.reviewer: tessarhurr, hzargari-ms
ms.topic: how-to
ms.subservice: rti-anomaly-detector
ms.date: 08/12/2026
ms.search.form: Anomaly Detection How To
ai-usage: ai-assisted
---

# Anomaly detection in Real-Time Intelligence (Preview)

Anomaly detection in Real-Time Intelligence helps you detect unusual patterns and outliers in eventhouse tables without copying data. Use it when you need to spot unexpected behavior in streaming or historical data and respond before it affects downstream operations.

In this article, you enable required features, start anomaly detection from one of the supported entry points, and configure analysis settings. You then review recommended models, publish continuous monitoring, and set up alerts for future anomalies.

Anomaly detection also supports Eventhouse shortcut tables, so you can analyze data without first copying or moving it into a dedicated Eventhouse table. You can create anomaly detectors directly on supported shortcut tables and use the same analysis, model recommendations, and continuous monitoring experiences available for native Eventhouse data sources. This support extends anomaly detection to external and federated data sources that are already connected through Eventhouse shortcuts, so you can move from connecting data to detecting issues with less setup and duplication.


[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
- Role of **Admin**, **Contributor**, or **Member** [in the workspace](../fundamentals/roles-workspaces.md).
- An [Eventhouse](create-eventhouse.md) in your workspace with a KQL database.
- A Python plugin enabled on that same Eventhouse.
  1. To enable the plugin, go to your Eventhouse.
  1. In the upper toolbar, select **Plugins** and then enable the **Python language extension**.
  1. Select the Python 3.11.7 DL plugin and select **Done**.
  
    :::image type="content" source="media/anomaly-detection/python.png" alt-text="Screenshot of enabling the Python plugin in Eventhouse." lightbox="media/anomaly-detection/python.png":::
- Detect anomalies in Real-Time Intelligence enabled in your workspace.
  1. To enable anomaly detection, go to your workspace.
  1. Upgrade to a free Microsoft Fabric trial or ensure your workspace has a Microsoft Fabric license.
  1. Either reach out to your admin to enable the preview feature switch or go to the **Admin portal** and enable **Detect anomalies in Real-Time Intelligence (Preview)**.
      :::image type="content" source="media/anomaly-detection/admin-portal-anomaly-detection.png" alt-text="Screenshot of enabling Detect anomalies in Real-Time Intelligence (Preview) in the Admin portal.":::    

> [!NOTE]
> * Ensure your Eventhouse table contains sufficient historical data to improve model recommendations and anomaly detection accuracy. For example, datasets with one data point per day require a few months of data, while datasets with one data point per second might only need a few days.
> * This feature is available in all regions where Microsoft Fabric is available.

## How to set up anomaly detection

### Getting started

You can start anomaly detection in **three** ways:

## [From an Eventhouse table](#tab/eventhouse)

1. Select a database and the **table** or the **shortcut** you want to analyze.

1. In the upper toolbar, select **Create Anomaly Detector** or select the **Anomaly Detector** option from the ellipsis (⋯) in the database tree.

:::image type="content" source="media/anomaly-detection/eventhouse-anomaly-detector.png" alt-text="Screenshot of the Anomaly Detector option in the Eventhouse database tree and in the upper toolbar." lightbox="media/anomaly-detection/eventhouse-anomaly-detector.png":::

## [From Real-Time hub](#tab/real-time-hub)

1. Select **Real-Time hub** in the left navigation pane.

    :::image type="content" source="media/anomaly-detection/real-time-hub.png" alt-text="Screenshot of the Real-Time hub button in the left navigation pane.":::

1. Find the table you want to analyze for anomalies and do **either** of the following steps:
    - Select the ellipsis (⋯) to open the table's ribbon menu, and select **Anomaly detection**.

        :::image type="content" source="media/anomaly-detection/detect-dropdown.png" alt-text="Screenshot of the Real-Time hub with a table selected for anomaly detection.":::

    - Select the table to open the details page. In the upper toolbar, select **Anomaly detection**.

        :::image type="content" source="media/anomaly-detection/detect-details-page.png" alt-text="Screenshot of the detect anomalies option in the details page.":::
1. On the **Anomaly detection** page, for **Save to**, select the drop-down list, and then select **Create detector**. 

    :::image type="content" source="media/anomaly-detection/real-time-hub-create-detector.png" alt-text="Screenshot of the Anomaly Detector page in Real-Time hub.":::
1. On the **Create anomaly detector** page, select your Fabric **workspace**, enter a **name** for the anomaly detector, and then select **Create**. 

    :::image type="content" source="media/anomaly-detection/real-time-hub-create-anomaly-detector-dialog.png" alt-text="Screenshot of the Create Anomaly Detector page in Real-Time hub.":::     

## [From the Create button](#tab/create)

1. In the Fabric home page, select the ellipsis (⋯) icon and then select **Create**.

    :::image type="content" source="media/anomaly-detection/create-button.png" alt-text="Screenshot of the Create button in the left navigation pane.":::

1. In the **Create** pane, under the **Real-Time Intelligence** section, select **Anomaly detection**.

    :::image type="content" source="media/anomaly-detection/create-anomaly-detection.png" alt-text="Screenshot of the Create pane with Anomaly detection selected.":::

1. In the **Anomaly detection** configuration pane, select the **Data source** you want to analyze. 

    :::image type="content" source="media/anomaly-detection/add-source.png" alt-text="Screenshot of the Anomaly detection configuration pane with Data source option highlighted.":::

1. In the **Select source** pane, choose the Eventhouse and table you want to analyze, and then select **Add**.

    :::image type="content" source="media/anomaly-detection/select-source.png" alt-text="Screenshot of the Select source pane with an Eventhouse and table selected.":::

----

### View existing anomaly detection configurations

Before you create a new anomaly detector, check whether a configuration already exists for the data source you selected. This view helps you avoid duplicate work and understand how others already monitor that data.

1. In your list of data sources, select the ellipsis **(...)** for the data source you want to analyze, and then select **Existing anomaly detector**.

    :::image type="content" source="media/anomaly-detection/existing-anomaly-detector.png" alt-text="Screenshot of the Existing anomaly detector option in the ellipsis list." lightbox="media/anomaly-detection/existing-anomaly-detector.png":::

1. In **View anomalies detected**, you can view all existing anomaly detection configurations for the selected data source and explore the details of each.

    1. From the left navigation pane, select a configuration to explore the detected anomalies, or select **Open** to view it in full screen.

    1. If the existing configurations don't meet your needs, select **New** to create a new anomaly detection configuration.

    :::image type="content" source="media/anomaly-detection/existing-configuration-details.png" alt-text="Screenshot of the details view for an existing anomaly detection configuration." lightbox="media/anomaly-detection/existing-configuration-details.png":::

This experience helps you move from exploration to action without leaving the context of your data source.

### Configure input columns for analysis

Specify which columns to analyze and how to group your data.

1. In the configuration pane, add the **Value to watch** column that contains the numeric data you want to monitor for anomalies.

    :::image type="content" source="media/anomaly-detection/value-to-watch.png" alt-text="Screenshot of the Value to watch configuration settings.":::

    > [!NOTE]
    > Ensure the selected column contains numeric values, as only numeric data is supported for anomaly detection.

1. Choose the **Group by** column to specify how your data should be partitioned for analysis. This column typically represents entities such as devices, locations, or other logical groupings.

    :::image type="content" source="media/anomaly-detection/group-by.png" alt-text="Screenshot of the Group by configuration settings.":::

1. Select the **Timestamp** column that represents the time each data point was recorded. This column is crucial for time-series anomaly detection and ensures accurate analysis of trends over time.

    :::image type="content" source="media/anomaly-detection/timestamp.png" alt-text="Screenshot of the Timestamp configuration settings.":::

1. Select **Run analysis** to begin the automated model evaluation.

### Wait for analysis completion

The system analyzes your data to find the best anomaly detection models.

> [!IMPORTANT]
> Analysis typically takes up to four minutes depending on your data size and can run for up to 30 minutes. You can go to another page and check back when the analysis is complete.

During analysis, the system:

- Samples your table data for efficient processing
- Tests multiple anomaly detection algorithms
- Evaluates different parameter configurations
- Identifies the most effective models for your specific data patterns

### Review recommended models and anomalies

After the analysis finishes, select a recommended model to view the detected anomalies and explore the results.

1. Open the anomaly detection results by selecting the notification you received or by going back to the configuration pane.

1. Select a recommended model to review its performance and optionally adjust confidence settings. Save your selection.

    :::image type="content" source="media/anomaly-detection/analysis-and-models.png" alt-text="Screenshot of the recommended model selection." lightbox="media/anomaly-detection/analysis-and-models.png":::

1. The results page provides the following insights:
    - **Detector results:** A visualization of your data with anomalies clearly highlighted.
    - **Anomaly events:** A detailed table of detected anomalies within the selected time range.

    :::image type="content" source="media/anomaly-detection/model-results.png" alt-text="Screenshot of the detector results visualization and table." lightbox="media/anomaly-detection/model-results.png":::

1. Use the visuals and tables to explore detected anomalies and understand data patterns. You can also open the anomaly analysis context in a Fabric notebook to investigate results with KQL, SQL analytics endpoint, Python, or Spark.

1. **Publish** your configuration to start continuous monitoring on your data. Once published, the anomaly detector tracks anomaly detection events for that configuration on an ongoing basis, without duplicating the dataset.

    :::image type="content" source="media/anomaly-detection/publish-set-alert.png" alt-text="Screenshot of the publish and set alert options in the upper ribbon." lightbox="media/anomaly-detection/publish-set-alert.png":::

After you publish, you have two options for acting on anomaly events:

- **Set an alert directly on this configuration.** In the upper ribbon of the anomaly detection item, select the alert option to get notified whenever this specific configuration detects an anomaly. For more information, see [Set alerts on anomaly detection events](../real-time-hub/set-alerts-anomaly-detection.md).
- **Route anomaly events to a different downstream destination.** If you want to send anomaly detection events to a destination such as an eventstream or Activator, go to **Real-Time hub** and use Fabric events to configure that routing. For more information, see [Explore anomaly detection events](../real-time-hub/explore-anomaly-detection.md).

Review and fine-tune results so your anomaly detection setup matches your use case.

### Reanalyze anomaly detection models with new data

Keep your anomaly detection models up to date as new data becomes available.

Follow these steps to reanalyze the model with new data:

1. Go to your anomaly detection item.
1. In the **Edit** panel, modify any of the previously filled-out fields as needed.
1. Select **Re-analyze my data**. This action starts a new analysis based on your updated inputs.

> [!WARNING]
> Reanalyzing updates the model used by existing monitoring rules, which might affect downstream actions.

### Explore anomaly detection events and set alerts

After you publish your anomaly detection configuration, there are two ways to act on the anomaly events it generates:

- **Set an alert on the configuration.** From the anomaly detection item, set an alert directly on the configuration you're monitoring to get notified when it detects an anomaly.
- **Send anomaly events to a different downstream destination.** Go to **Real-Time hub** and use Fabric events to route anomaly detection events to a destination such as an eventstream or Activator. For more information, see [Explore anomaly detection events](../real-time-hub/explore-anomaly-detection.md).

You can also connect anomaly events to Fabric data agents to enable automated reasoning and actions across live and historical event data. Data agents can consume anomaly events and orchestrate downstream workflows that complement Activator-based alerts.

### Query anomaly results with SQL analytics endpoint

Eventhouse provides a managed SQL analytics endpoint aligned with the Eventhouse data model and Fabric governance. You can query anomaly detector outputs and related tables or views with SQL for downstream analytics and integrations. To find SQL analytics endpoint connection details, go to your Eventhouse item in your Fabric workspace.

For more information, see:

- [Explore anomaly detection events](../real-time-hub/explore-anomaly-detection.md)
- [Set alerts on anomaly detection events](../real-time-hub/set-alerts-anomaly-detection.md)

## Limitations and considerations

Be aware of these limitations:

- Anomaly detection is disabled if the input table doesn't match the required schema (numeric value column, datetime column, and string column).
- Sufficient historical data improves model recommendations and accuracy.
- Each anomaly detector supports only a single model configuration.

## Running multiple operations in the anomaly detector

When you interact with the anomaly detector, Eventhouse runs Python queries in the background to support real-time analysis. These operations include:

- Running anomaly detection or other types of analysis.
- Switching between recommended models.
- Changing the time window or IDs you're viewing.
- Continuously monitoring incoming data for anomalies by setting alerts.

Eventhouse supports up to eight concurrent queries per Eventhouse. If you exceed this limit, the system retries the queries, but it doesn't queue extra queries and they might silently fail. Error messages that provide more clarity are under development.

To avoid problems:

- Allow each query to complete before starting a new one.
- If performance seems slow or unresponsive, reduce the number of concurrent queries.

For more information, see [Python plugin](/kusto/query/python-plugin?view=microsoft-fabric&preserve-view=true).

## Wait times for enabling the Python plugin

If the Python plugin isn't already enabled, the anomaly detector tries to enable it automatically when you start data analysis. In that case, enabling the plugin can take up to one hour. Once enabled, the analysis starts automatically.

For more information, see [Enable Python plugin in Real-Time Intelligence](python-plugin.md).

## Next steps

After you configure anomaly detection, you can:

- [Explore anomaly detection events](../real-time-hub/explore-anomaly-detection.md)
- [Set alerts on anomaly detection events](../real-time-hub/set-alerts-anomaly-detection.md)
- [Set up Activator for automated responses](../real-time-intelligence/data-activator/activator-introduction.md)
- [Learn about multivariate anomaly detection](multivariate-anomaly-detection.md)
- [Create alerts from a KQL queryset](data-activator/activator-alert-queryset.md)

## Related content

- [KQL query reference](/kusto/query/)
- [Real-Time Dashboard documentation](dashboard-real-time-create.md)
- [Activator overview](data-activator/activator-introduction.md)
