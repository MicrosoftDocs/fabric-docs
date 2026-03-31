---
title: Add Anomaly detection events source to an eventstream
description: Learn how to add Anomaly detection events source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 03/06/2026
ms.search.form: Source and Destination
---

# Add anomaly detection events to an eventstream (preview)

Anomaly detection events allow you to subscribe to anomalies detected in your Eventhouse data, and then react to those anomalies in real time. With Fabric event streams, you can capture these anomaly detection events, transform them, and route them to various destinations in Fabric for further analysis. 

This article shows you how to add Anomaly detection events source to an eventstream.

## Prerequisites

[!INCLUDE [anomaly-detection-events-connector-prerequisites](includes/connectors/anomaly-detection-events-connector-prerequisites.md)]
- [Create an eventstream](create-manage-an-eventstream.md) if you don't already have an eventstream. 

## Add Anomaly detection events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Anomaly detection events** tile.

:::image type="content" source="./media/add-source-anomaly-events/select-from-event-stream.png" alt-text="Screenshot that shows the selection of Anomaly detection events as the source type in the Select a data source window from Eventstream.":::

## Configure and connect to Anomaly detection events

[!INCLUDE [anomaly-detection-events-connector-configuration](includes/connectors/anomaly-detection-events-connector-configuration.md)]

## View updated eventstream

1. Once the connection is created, you can see the Anomaly detection events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture the Anomaly detection events.

    :::image type="content" source="./media/add-source-anomaly-events/edit-mode.png" alt-text="Screenshot that shows the edit mode in Eventstream.":::

1. If you want to transform events from the Anomaly detection events source, open your eventstream and select **Edit** on the toolbar to enter **Edit mode**. Then you can add operations to transform the Anomaly detection events or route them to a destination such as Lakehouse.

    :::image type="content" source="./media/add-source-anomaly-events/live-view.png" alt-text="Screenshot that shows the live view in Eventstream.":::

## Limitation
* The Anomaly Detection events source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    

## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)


