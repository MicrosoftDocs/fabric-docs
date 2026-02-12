---
title: Monitor machine learning experiments and models
description: Learn how to monitor machine learning experiments from the Fabric Monitoring hub and track traffic for machine learning model endpoints.
ms.author: ruxu
author: ruixinxu
ms.reviewer: 
reviewer: 
ms.topic: how-to
ms.custom:
ms.date: 02/11/2026
ms.search.form: machine learning monitoring
---

# Monitor machine learning experiments and models in Microsoft Fabric (Preview)

[!INCLUDE [product-name](../includes/product-name.md)] provides built-in monitoring capabilities for machine learning experiments and models. You can track experiment runs directly from the Fabric Monitoring hub, and monitor real-time traffic for active machine learning model endpoints. These monitoring features give you visibility into your machine learning workflows and help you understand how your deployed models are being used.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- A [!INCLUDE [product-name](../includes/product-name.md)] workspace with a capacity assigned.
- At least one [machine learning experiment](machine-learning-experiment.md) with recorded runs, or an [machine learning](machine-learning-model.md) with an active [machine learning model endpoint](model-endpoints.md).

## Monitor machine learning experiments from the Monitoring hub

Machine learning experiments are integrated directly into the Fabric Monitoring hub. This integration provides a centralized view of all experiment activities, the related notebooks, Spark applications, and the machine learning experiment runs those applications generate. With the Monitoring hub, you can track, filter, and troubleshoot your experiment runs without navigating away from a single unified experience.

### View experiment runs in the Monitoring hub

To view machine learning experiment runs from the Monitoring hub:

1. Open the **Monitor** hub from the left navigation pane in [!INCLUDE [product-name](../includes/product-name.md)].
1. Select the **Experiment** filter to narrow the view to experiment-related activities.
1. Browse the list of experiment activities, which shows details like status, start time, location and duration.

:::image type="content" source="media/monitor-machine-learning-experiments-models/monitor-machine-learning-experiments-from-monitoring-hub.png" alt-text="Screenshot showing how to monitor machine learning experiment from monitoring hub." lightbox="media/monitor-machine-learning-experiments-models/monitor-machine-learning-experiments-from-monitoring-hub.png":::


### Filter and search experiment runs

The Monitoring hub provides filtering options that help you find specific experiment runs:

- **Status**: Filter by run status such as succeeded, failed, or in progress.
- **Time range**: Narrow results to runs created within a specific time window.
- **Submitter**: Filter runs by the user who submitted them.
- **Location**: If you have access to multiple workspaces, filter by workspace to focus on relevant experiments.

These filters make it easier to manage and analyze experiments, especially in workspaces with a high volume of machine learning activities.

### Track related machine learning experiment runs from notebook activity

Machine learning experiments are also integrated into the notebook activity view in the Monitoring hub. When you select a notebook activity which triggered a machine learning experiment run, you can access the **Item snapshots** page to see a snapshot of the experiments and runs captured at the time of execution. This page also displays a snapshot of all settings and parameters that were in effect when the notebook ran.

To view related experiment runs from a notebook activity:

1. Open the **Monitor** hub and locate the notebook activity of interest.
1. Select the notebook activity to open its detail view.
1. Navigate to the **Item snapshots** page to see the associated experiments and runs.



:::image type="content" source="media/monitor-machine-learning-experiments-models/monitor-machine-learning-experiments-from-notebook-activity.png" alt-text="Screenshot showing how to monitor machine learning experiment from notebook activity." lightbox="media/monitor-machine-learning-experiments-models/monitor-machine-learning-experiments-from-notebook-activity.png":::

The **Item snapshots** page includes a list of all experiments and runs generated during the notebook execution, captured at the time the notebook ran.

This approach is useful when you need to debug, reproduce, or audit the machine learning experiment runs produced by a specific notebook execution.

## Monitor traffic for machine learning model endpoints

When you activate an [machine learning model endpoint](model-endpoints.md) for a specific model version, [!INCLUDE [product-name](../includes/product-name.md)] begins tracking traffic to that endpoint. Traffic monitoring gives you insight into how frequently your model is being called, which helps you understand adoption and plan for capacity.

### View endpoint traffic

To view traffic for an active model endpoint:

1. Navigate to the machine learning model in your workspace.
1. Select the model version with an active endpoint.
1. On the model detail view, scroll down to the **Endpoint metrics** section to see traffic information for that version.

The machine learning model endpoint metric view provides key metrics about endpoint usage, including:

| **Metric** | **Description** |
|---|---|
| **Request count** | The total number of prediction requests received by the endpoint. |
| **Error count** | The total number of failed requests received by the endpoint. |
| **Request latency** | The time taken to process and respond to prediction requests. |

:::image type="content" source="media/monitor-machine-learning-experiments-models/endpoint-metrics.png" alt-text="Screenshot showing endpoint metrics for an machine learning model." lightbox="media/monitor-machine-learning-experiments-models/endpoint-metrics.png":::

> [!NOTE]
> Metrics typically appear within 15 minutes after the endpoint receives traffic. If no data or line appears, the endpoint might have been inactive during the selected time range, or its telemetry might have expired after 90 days. Try adjusting the time range or check back after the endpoint has been used. 


### Monitor traffic across model versions

If your model has multiple active version endpoints, you can compare traffic patterns across versions. This comparison helps you identify which model version is receiving the most requests and whether newer versions are being adopted.

> [!NOTE]
> Machine learning models can have active endpoints for up to five versions at a time. Traffic monitoring is available for each active version endpoint independently.

### Use traffic data to manage capacity

Active model endpoints consume Fabric Capacity Units (CUs) based on incoming traffic. Endpoints can automatically scale up to three compute nodes when traffic increases. Monitoring traffic patterns helps you:

- Identify low-traffic endpoints that might benefit from the **auto sleep** feature to reduce capacity consumption.
- Detect traffic spikes that could affect endpoint latency or capacity usage.
- Determine the right time to deactivate endpoints for model versions no longer in use.

For detailed information about endpoint capacity consumption and billing, see [machine learning model endpoint consumption rates](model-endpoints.md#consumption-rate).

> [!TIP]
> Use the [Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) to view total capacity usage for model endpoint operations. Model endpoint operations appear under the item name "Model Endpoint" in the metrics app.

## Related content

- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Serve real-time predictions with machine learning model endpoints](model-endpoints.md)
- [Browse Spark applications in the Monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md)
