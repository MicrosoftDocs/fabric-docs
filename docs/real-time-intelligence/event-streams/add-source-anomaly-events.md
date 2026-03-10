---
title: Add Anomaly detection events source to an eventstream
description: Learn how to add Anomaly detection events source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 03/06/2026
ms.search.form: Source and Destination
---

# Add Anomaly detection events to an eventstream (preview)

Anomaly detection events allow you to subscribe to anomalies detected in your Eventhouse data, and then react to those anomalies in real time. With Fabric event streams, you can capture these anomaly detection events, transform them, and route them to various destinations in Fabric for further analysis. 

This article shows you how to add Anomaly detection events source to an eventstream.

## Prerequisites

- Get access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- [Create an eventstream](create-manage-an-eventstream.md) if you don't already have an eventstream. 

## Add Anomaly detection events as source

You can add Anomaly detection events as a source in two ways:

### From Real-Time Hub

Navigate to Real-Time Hub, find **Fabric events**, and select **Anomaly detection events**. Then, select the **+** button to create Eventstream.

:::image type="content" source="./media/add-source-anomaly-events/select-anomaly-detection-events1.png" alt-text="Screenshot that shows the selection of Anomaly detection events as the source type in the Select a data source window from Real-Time Hub.":::

### From Eventstream

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Anomaly detection events** tile.

:::image type="content" source="./media/add-source-anomaly-events/select-anomaly-detection-events2.png" alt-text="Screenshot that shows the selection of Anomaly detection events as the source type in the Select a data source window from Eventstream.":::

## Configure and connect to Anomaly detection events

[!INCLUDE [fabric-onelake-source-connector](includes/anomaly-detection-events.md)]

## View updated eventstream

1. Once the connection is created, you can see the Fabric OneLake events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture the OneLake events.

    :::image type="content" source="./media/add-source-anomaly-events/edit-mode.png" alt-text="Screenshot that shows the edit mode in Eventstream.":::

1. If you want to transform events from the Anomaly detection events source, open your eventstream and select **Edit** on the toolbar to enter **Edit mode**. Then you can add operations to transform the Anomaly detection events or route them to a destination such as Lakehouse.

    :::image type="content" source="./media/add-source-anomaly-events/live-view.png" alt-text="Screenshot that shows the live view in Eventstream.":::

## Limitation
* The Anomaly Detection events source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    

## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)


