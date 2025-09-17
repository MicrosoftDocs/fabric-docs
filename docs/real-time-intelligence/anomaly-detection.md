---
title: Anomaly Detection in Real-Time Intelligence
description: Learn how to set up and configure anomaly detection for your real-time data streams using Microsoft Fabric Real-Time Intelligence.
ms.reviewer: tessarhurr
ms.author: v-hzargari
author: hzargari-ms
ms.topic: how-to
ms.custom: 
ms.date: 09/15/2025
ms.search.form: Anomaly detection how-to
---

# Anomaly detection in Real-Time Intelligence (Preview)

This article explains how to set up anomaly detection in Real-Time Intelligence to automatically identify unusual patterns and outliers in your Eventhouse tables. The system provides recommended models and allows you to set up continuous monitoring with automated actions.

Key capabilities include:

- **Model recommendations**: Suggests the best algorithms and parameters for your data.
- **Interactive anomaly exploration**: Visualize detected anomalies and adjust model sensitivity.
- **Continuous monitoring**: Set up real-time anomaly detection with automated notifications.
- **Reanalysis with new data**: Update your models as new data arrives to improve accuracy.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
- Role of **Admin**, **Contributor**, or **Member** [in the workspace](../get-started/roles-workspaces.md)
- An [Eventhouse](create-eventhouse.md) in your workspace with a KQL database
- A Python plugin enabled on that same Eventhouse
  - To enable the plugin, navigate to your Eventhouse.
  - In the upper toolbar, select **Plugins** and then enable the **Python language extension**.
  - Select the Python 3.11.7 DL plugin and click **Done**.
  :::image type="content" source="media/anomaly-detection/python.png" alt-text="Screenshot of enabling the Python plugin in Eventhouse.":::

> [!NOTE]
> Ensure your Eventhouse table contains sufficient historical data to improve model recommendations and anomaly detection accuracy. For example, datasets with one data point per day require a few months of data, while datasets with one data point per second might only need a few days.

## How to set up anomaly detection

### Start anomaly detection from an Eventhouse table

You can start anomaly detection in two ways:

1. From the **Real-Time hub**:

    1. Select **Real-Time hub** in the left navigation pane.

        :::image type="content" source="media/anomaly-detection/real-time-hub.png" alt-text="Screenshot of the Real-Time hub button in the left navigation pane.":::

    1. Locate the table you want to analyze for anomalies and do **either** of the following steps:
       1. Select the ⋯ (three dots) to open the table's ribbon menu, and select **Anomaly detection**.

          :::image type="content" source="media/anomaly-detection/detect-dropdown.png" alt-text="Screenshot of the Real-Time hub with a table selected for anomaly detection.":::

       1. Select the table to open the details page. In the upper toolbar, select **Anomaly detection**.

            :::image type="content" source="media/anomaly-detection/detect-details-page.png" alt-text="Screenshot of the detect anomalies option in the details page.":::

1. From the **Create** button:

    1. In the Fabric home page, select the ellipses (...) icon and then the **Create** option.

        :::image type="content" source="media/anomaly-detection/create-button.png" alt-text="Screenshot of the Create button in the left navigation pane.":::

    1. In the **Create** pane, select **Anomaly detection** under the **Real-Time Intelligence** section.

        :::image type="content" source="media/anomaly-detection/create-anomaly-detection.png" alt-text="Screenshot of the Create pane with Anomaly detection selected.":::

### Configure input columns for analysis

Specify which columns to analyze and how to group your data.

1. In the **Anomaly detection** configuration pane, select the **Data source** you want to analyze.

    :::image type="content" source="media/anomaly-detection/add-source.png" alt-text="Screenshot of the Anomaly detection configuration pane with Data source option highlighted.":::

1. In the **Select source** pane, choose the Eventhouse and table you want to analyze, then select **Add**.

    :::image type="content" source="media/anomaly-detection/select-source.png" alt-text="Screenshot of the Select source pane with an Eventhouse and table selected.":::

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
> Analysis typically takes up to 4 minutes depending on your data size and can run for up to 30 minutes. You can navigate away from the page and check back in when the analysis is complete.

During analysis, the system:

- Samples your table data for efficient processing
- Tests multiple anomaly detection algorithms
- Evaluates different parameter configurations
- Identifies the most effective models for your specific data patterns

### Review recommended models and anomalies

Once the analysis is complete, you can review the results and explore the detected anomalies.

1. Open the anomaly detection results by selecting the notification you received or navigating back to the table and selecting **View anomaly results**.

2. The results page provides the following insights:
    - A **visualization** of your data with anomalies clearly highlighted.
    - A list of **recommended algorithms**, ranked by their effectiveness for your data.
    - **Sensitivity settings** to adjust the detection thresholds.
    - A detailed table of **detected anomalies** within the selected time range.

3. Use the model selector to compare the performance of different recommended algorithms and choose the one that best fits your needs.

4. Adjust the **sensitivity** settings to refine the anomaly detection results:
    - Options include Low, Medium, and High Confidence levels.
    - Experiment with these settings to balance between detecting more anomalies and reducing false positives.

5. Interact with the visuals and tables to gain deeper insights into the detected anomalies and understand the patterns in your data.

6. Save the anomaly detector to preserve your configuration and revisit it later.

7. Publish the detected anomalies to the Real-Time Hub to enable continuous monitoring of incoming data. You can also configure downstream actions, such as sending alerts to Activator.

By reviewing and fine-tuning the results, you can ensure that your anomaly detection setup is optimized for your specific use case.

### Reanalyze anomaly detection models with new data

Keep your anomaly detection models up to date as new data becomes available.

Follow the steps to reanalyze the model with new data:

1. Navigate to your anomaly detection item.
1. In the **Edit** panel, modify any of the previously filled-out fields as needed.
1. Select **Run analysis**. This triggers a new analysis based on your updated inputs.

> [!WARNING]
> Reanalyzing will update the model used by existing monitoring rules, which may impact downstream actions.

## Limitations and considerations

Be aware of these current limitations:

- **Data requirements**: Sufficient historical data improves model recommendations and accuracy
- Each anomaly detector can only support a single model configuration.

## Running multiple operations in the anomaly detector

When you interact with the anomaly detector, Eventhouse runs Python queries in the background to support real-time analysis. These operations include:

- Running anomaly detection or other types of analysis.
- Switching between recommended models.
- Changing the time window or IDs being viewed.
- Continuously monitoring incoming data for anomalies by setting alerts.

Eventhouse supports up to eight concurrent queries per Eventhouse. If this limit is exceeded, the system retries the queries, but additional queries won’t be queued and might silently fail. Error messages to provide more clarity are under development.

To avoid issues:

- Allow each query to complete before starting a new one.
- If performance seems slow or unresponsive, reduce the number of concurrent queries.

For more information, see [Python Plugin](/kusto/query/python-plugin?view=microsoft-fabric&preserve-view=true).

## Wait times for enabling the Python Plugin

When you start data analysis, the anomaly detector automatically enables the Python Plugin on your Eventhouse. Enabling the plugin can take up to one hour. Once enabled, the analysis begins automatically.

For more information, see [Enable Python plugin in Real-Time Intelligence](python-plugin.md).

## Next steps

Now that you have anomaly detection configured, explore related capabilities:

- [Learn about multivariate anomaly detection](multivariate-anomaly-detection.md)
- [Explore multivariate anomaly overview](multivariate-anomaly-overview.md)
- [Create alerts from a KQL queryset](../data-activator/data-activator-alert-queryset.md)
- [Set up Data Activator for automated responses](../data-activator/data-activator-introduction.md)

## Related content

- [KQL query reference](/kusto/query/)
- [Real-Time Dashboard documentation](dashboard-real-time-create.md)
- [Data Activator overview](../data-activator/data-activator-introduction.md)
