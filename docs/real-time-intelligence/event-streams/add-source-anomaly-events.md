---
title: Add Anomaly detection events source to an eventstream
description: Learn how to add Anomaly detection events source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 03/06/2026
ms.search.form: Source and Destination
---

# Add Anomaly detection events to an eventstream 

Anomaly detection events allow you to subscribe to anomalies detected in your Eventhouse data, and then react to those anomalies in real time. With Fabric event streams, you can capture these anomaly detection events, transform them, and route them to various destinations in Fabric for further analysis or automated actions. 

This article shows you how to add Anomaly detection events source to an eventstream.

## Schemas
An event has the following top-level data:
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

## Prerequisites

- Get access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- [Create an eventstream](create-manage-an-eventstream.md) if you don't already have an eventstream. 

## Add Anomaly detection events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Anomaly detection events** tile.

:::image type="content" source="./media/add-source-anomaly-events/select-anomaly-detection-events.png" alt-text="Screenshot that shows the selection of Anomaly detection events as the source type in the Select a data source window.":::

## Configure and connect to Anomaly detection events

[!INCLUDE [fabric-onelake-source-connector](includes/anomaly-detection-events.md)]

## View updated eventstream

1. Once the connection is created, you can see the Fabric OneLake events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture the OneLake events.

:::image type="content" source="./media/add-source-anomaly-events/edit-mode.png" alt-text="Screenshot that shows the edit mode in Eventstream.":::

1. If you want to transform the Anomaly detection events, open your eventstream and select **Edit** on the toolbar to enter **Edit mode**. Then you can add operations to transform the Anomaly detection events or route them to a destination such as Lakehouse.

:::image type="content" source="./media/add-source-anomaly-events/live-view.png" alt-text="Screenshot that shows the live view in Eventstream.":::

## Limitation
* The Anomaly Detection events source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    

## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)


