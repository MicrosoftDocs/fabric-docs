---
title: Explore the Add Data Page in Fabric Real-Time Hub
description: Explore the Add data page in Fabric Real-Time hub to connect streaming sources, Azure services, diagnostic data, events, and sample scenarios.
#customer intent: As a Fabric user, I want to understand the Add data page so that I can connect supported data sources to Real-Time hub.
author: spelluru
ms.author: spelluru
ms.reviewer: majia
ms.topic: concept-article
ms.custom: doc-kit-assisted
ms.date: 07/20/2026
ai-usage: ai-assisted
---

# Explore the Add data page in Fabric Real-Time hub

The **Add data** page in Fabric Real-Time hub helps you connect to data from inside and outside Fabric. You can connect new or existing streaming sources, events, Azure services, and diagnostic data. External streaming sources include Kafka connectors powered by Kafka Connect and Debezium connectors for change data capture (CDC). Real-Time hub also connects to notification events from Azure, Amazon Web Services, Google Cloud Platform, and other services.

## Navigate to the Add data page

Go to the **Add data** page in either of the following ways:

- On the **Streaming data** page, select **Add data**.

  :::image type="content" source="./media/get-started-real-time-hub/connect-to-data-source-button.png" alt-text="Screenshot that shows the Add data button on the Streaming data page." lightbox="./media/get-started-real-time-hub/connect-to-data-source-button.png":::

- On the left navigation menu, select **Add data**.

  :::image type="content" source="./media/get-started-real-time-hub/real-time-hub-add-data.png" alt-text="Screenshot that shows the Add data page in Fabric Real-Time hub." lightbox="./media/get-started-real-time-hub/real-time-hub-add-data.png":::

## All sources tab

The **All sources** tab is the default tab for this page. It has **Quick start** and **Recommended sources** sections. 

### Quickstart section

:::image type="content" source="./media/get-started-real-time-hub/add-data-page-quick-start-section.png" alt-text="Screenshot that shows the Quick start section of the Add data page." lightbox="./media/get-started-real-time-hub/add-data-page-quick-start-section.png":::

The **Quick start** section provides the following options:

- **Try a sample scenario** - Explore the Bicycle rentals, Stock market, and Yellow taxi samples. Each sample creates a group of Fabric Real-Time Intelligence items that demonstrate how to stream, analyze, and visualize data end to end, so you can see a working solution without connecting your own source. For more information, see [End-to-end Real-Time Intelligence sample](/fabric/real-time-intelligence/sample-end-to-end).

- **Azure data** - Switch to the **Azure** tab at the top so that you can view Azure sources, such as Azure event hubs and Azure IoT hubs, that you can connect to eventstreams. For more information, see [Azure tab](#azure-tab).

- **Diagnostics data (preview)** - Switches to the **Diagnostics** tab at the top to view sources that provide diagnostic logs and metrics, which you can stream into Real-Time hub. For more information, see [Diagnostics (preview) tab](#diagnostics-preview-tab).


### Recommended sources section

The **Recommended** section lists sources that Real-Time hub supports. Select a source to learn how to connect it and create an eventstream. Created eventstreams appear on the **Streaming data** page. 

Here's the list of supported sources. When you select the following links, you can learn how to connect the source and create an eventstream.

[!INCLUDE [supported-sources](./includes/supported-sources.md)]

The **All sources** tab is the default tab for this page. Two other tabs are available:

- **Azure**.
- **Diagnostics (preview)**.

The following sections provide more information about these tabs and the sources they contain.

### Azure tab

The **Azure** tab lists the Azure data sources that you can access. These sources fall into a few groups: real-time ingestion services such as Azure Event Hubs and Azure IoT Hub, event routing through Azure Event Grid, messaging through Azure Service Bus (preview), analytics data from Azure Data Explorer, and change data capture (CDC) sources such as Azure Cosmos DB, Azure SQL Database, Azure SQL Managed Instance, MySQL, PostgreSQL, and SQL Server on a VM.

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

Hover the mouse over a source and select **Connect** to connect it. When you connect a source, Real-Time hub creates an eventstream that continuously ingests the incoming data. Created streams appear on the **Streaming data** page.

:::image type="content" source="./media/get-started-real-time-hub/microsoft-sources-menu.png" alt-text="Screenshot of the Azure tab showing an Event Hubs namespace and the Connect data source action." lightbox="./media/get-started-real-time-hub/microsoft-sources-menu.png":::

### Diagnostics (preview) tab

The **Diagnostics (preview)** tab lists sources that provide diagnostic logs and metrics, such as an Azure Event Hubs namespace. Use this tab to bring operational telemetry into Real-Time hub.

Select a source to connect it and create an eventstream. When you connect a source, Real-Time hub creates an eventstream that continuously ingests the diagnostic data. Created eventstreams appear on the **Streaming data** page, where you can preview, transform, and route the data.

:::image type="content" source="./media/get-started-real-time-hub/connect-diagnostic-logs.png" alt-text="Screenshot of the Diagnostics tab showing the Connect diagnostics logs action for an Event Hubs namespace." lightbox="./media/get-started-real-time-hub/connect-diagnostic-logs.png":::

## Next step

Go to the [Business events page](business-events-page.md) to learn how to define, discover, publish, and consume business events.

## Related content

- [Supported sources in Fabric Real-Time hub](supported-sources.md)
- [Explore the Streaming data page](streaming-data-page.md)
- [Real-Time hub overview](real-time-hub-overview.md)
