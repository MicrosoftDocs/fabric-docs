---
title: Explore Anomaly Detection Events in Fabric Real-Time Hub
description: This article shows how to explore anomaly detection events in Fabric Real-Time hub.
author: hzargari-ms
ms.author: v-hzargari
ms.reviewer: tessahurr
ms.topic: how-to
ms.date: 09/15/2025
ms.search.form: Explore Anomaly Detection Events, Anomaly Detection Events
---

# Explore anomaly detection events in Fabric Real-Time hub (Preview)

Anomaly detection in Real-Time hub helps you automatically identify unusual patterns or outliers in your Eventhouse tables by applying recommended models based on the structure of your data. It allows you to visualize anomalies, adjust detection sensitivity, and set up continuous monitoring with automated alerts or actions.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## View anomaly detection events detail page

1. In **Real-Time hub**, select **Fabric events** under the **Subscribe to** category.

    :::image type="content" source="media/explore-anomaly-detection/fabric-events.png" alt-text="Screenshot that shows the Fabric events page in Real-Time hub.":::

1. Select **Anomaly detection events** from the list.

    :::image type="content" source="media/explore-anomaly-detection/anomaly-detection-events.png" alt-text="Screenshot that shows the selection of anomaly detection events on the Fabric events page.":::

1. In the **Anomaly detection events** page, select an event to view its details or select **Set alert** to set an alert for the event.

    :::image type="content" source="media/explore-anomaly-detection/anomaly-details-page.png" alt-text="Screenshot that shows the detail page for OneLake events.":::

## Schemas

An event has the following top-level data:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened.  | `<tenant-id>` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. |  `/workspaces/<workspace-id>/items/<ad-item-id>/configuration/<configuration-id>` |
| `type` | string | One of the registered event types for this event source. | `Microsoft.Fabric.AnomalyEvents.AnomalyDetected` |
| `time` | timestamp | The time the event is generated based on the provider's UTC time. | `2017-06-26T18:41:00.9584103Z` |
| `id` | string | Unique identifier for the event. | `<Required-GUID>` |
| `specversion` | string | The version of the Cloud Event spec. | 1.0 |
| `dataschemaversion` | string | The version of the data schema. | 1.0 |
| `data` | object | Event data. | See the next table for details. |

The `data` object has the following properties:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `analysisType` | string | Type of analysis performed. | `univariate` |
| `confidenceScore` | number | Confidence score of the anomaly detection. | `0.95` |
| `timeStampAttributeName` | string | Name of the timestamp attribute used in the analysis. | `StartTime` |
| `timeStampAttributeValue` | string | Value of the timestamp attribute at the time of the anomaly detection. | `2017-06-26T18:41:00.9584103Z` |
| `univariate` | object | Contains details of the univariate analysis. | See the next table for details. |
| `customAttributes` | object | Contains any custom attributes associated with the anomaly detection. | See the next table for details. |

The `univariate` object has the following properties:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `instanceIdAttributeNames` | string | Name of the instance ID attribute used in the analysis. | `SkuId` |
| `instanceIdAttributeValues` | string | Value of the instance ID attribute at the time of the anomaly detection. | `sku-12345` |
| `monitoredAttributeName` | string | Name of the monitored attribute used in the analysis. | `Temperature` |
| `monitoredAttributeValue` | string | Value of the monitored attribute at the time of the anomaly detection. | `90` |

The `customAttributes` object has the following properties:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `SkuId` | string | Unique identifier for the SKU. | `sku-12345` |
| `Temperature` | number | Temperature value at the time of the anomaly detection. | `90` |
| `Humidity` | number | Humidity value at the time of the anomaly detection. | `50` |
| `Location` | string | Location where the anomaly was detected. | `Kitchen` |
| `Status` | string | Status of the anomaly detection. | `Normal` |

## Related content

- [Set alerts on anomaly detection events](set-alerts-anomaly-detection.md)
- [Anomaly detection in Real-Time Intelligence](../real-time-intelligence/anomaly-detection.md)