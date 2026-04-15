---
title: Connect an Event Grid Namespace Source to an Eventstream
description: Learn how to add Azure Event Grid namespace to a Microsoft Fabric eventstream for real-time event and MQTT data ingestion.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:12/03/2025
  - ai-gen-description
ms.date: 09/08/2025
ai-usage: ai-assisted
#customer intent: As a user who's planning IoT data monitoring, I want to connect an Azure Event Grid namespace to a Microsoft Fabric eventstream so that I can process MQTT messages and standard events for real-time analytics.
---

# Add an Event Grid namespace to an eventstream for real-time event and MQTT data ingestion

In today's connected world, organizations rely on streaming event data and Internet of Things (IoT) data for real-time analytics, monitoring, and decision-making. With the new capability to add an Azure Event Grid namespace as a source to an eventstream, you can seamlessly bring both standard events and Message Queuing Telemetry Transport (MQTT) messages into Microsoft Fabric.

This integration enables scenarios like industrial IoT monitoring, connected vehicle data, and enterprise system integration without complex custom pipelines. By bridging Event Grid and Fabric eventstreams, you gain a powerful, scalable foundation to process millions of events per second and unlock insights instantly across your data estate.

This connector ingests both CloudEvents from namespace topics and MQTT telemetry directly from Azure Event Grid into Fabric Eventstream.

This article shows you how to add an Event Grid namespace source to an eventstream.

[!INCLUDE [azure-event-grid-source-connector-prerequisites](./includes/connectors/azure-event-grid-source-connector-prerequisites.md)]
- [Create an eventstream](create-manage-an-eventstream.md) if you don't have one.


## Start the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Event Grid Namespace**. On the **Azure Event Grid Namespace** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot that shows the selection of an Azure Event Grid namespace as the source type in the wizard for getting events." lightbox="./media/add-source-azure-event-grid/select-azure-event-grid.png":::

## Configure the Event Grid connector

[!INCLUDE [azure-event-grid-source-connector](./includes/connectors/azure-event-grid-source-connector-configuration.md)]

## View an updated eventstream

1. On the **Review + connect** page, select **Add**.

1. Confirm that the Event Grid source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Event Grid namespace, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-grid/publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-event-grid/publish.png":::

1. The Event Grid namespace is available for visualization in the **Live** view. Select the **Event Grid Namespace** tile in the diagram to show details about the source.

## Related content

- To learn how to add other sources to an eventstream, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
