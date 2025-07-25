---
title: Connect Event Grid Namespace Source to Eventstream
description: Learn how to add Azure Event Grid namespace to Microsoft Fabric Eventstream for real-time event and MQTT data ingestion. Connect IoT telemetry and streaming events seamlessly with step-by-step guidance.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:07/24/2025
  - ai-gen-description
ms.date: 07/24/2025
#customer intent: As a user planning IoT telemetry monitoring, I want to connect Azure Event Grid Namespace to Microsoft Fabric Eventstream so that I can process MQTT messages and standard events for real-time analytics.
---

# Add Azure Event Grid namespace to an eventstream for real-time event and MQTT data ingestion (preview)
In today’s connected world, organizations rely on streaming event data and IoT telemetry for real-time analytics, monitoring, and decision-making. With the new capability to add an Azure Event Grid Namespace as a source to Eventstream, you can seamlessly bring both standard events and MQTT messages into Microsoft Fabric. This integration enables scenarios like industrial IoT monitoring, connected vehicle telemetry, and enterprise system integration without complex custom pipelines. By bridging Azure Event Grid and Fabric Eventstream, you gain a powerful, scalable foundation to process millions of events per second and unlock insights instantly across your data estate.

This article shows you how to add an Azure Event Grid Namespace source to an eventstream. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Member or higher permissions. 
- Enable [managed identity]() on the Event Grid namespace. 
- Create or have an Azure Event Grid namespace with [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) enabled. 
- Enable [MQTT](/azure/event-grid/mqtt-publish-and-subscribe-portal) and [routing](/azure/event-grid/mqtt-routing) on the Event Grid namespace, if you want to receive Message Queuing Telemetry Transport (MQTT) data. 
- [Create an eventstream](create-manage-an-eventstream.md) if you don't have one. 

To ensure the managed identity of the Event Grid namespace has the required permissions, configure the necessary settings in the **Admin portal**：

- Select **Settings** (gear icon) in the top-right corner.
- Select **Admin portal** in the **Governance and insights** section. 

    :::image type="content" source="./media/add-source-azure-event-grid/admin-portal-link.png" alt-text="Screenshot of Admin portal link selection in the Governance and insights section." lightbox="./media/add-source-azure-event-grid/admin-portal-link.png":::        

- Activate the following tenant setting to grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines.
    - On the **Tenant settings** page, in the **Developer settings** section, expand **Service principal can use Fabric API** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.
    
        :::image type="content" source="./media/add-source-azure-event-grid/developer-settings.png" alt-text="Screenshot that shows the developer settings." lightbox="./media/add-source-azure-event-grid/developer-settings.png":::              
- Enable this option to access all other APIs (enabled by default for new tenants):
    - On the **Tenant settings** page, in the **Developer settings** section, expand **Allow Service principals to create and use profiles** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.

## Launch the select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Grid Namespace** tile.

:::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot of Azure Event Grid Namespace selection in the Get events wizard source type dialog." lightbox="./media/add-source-azure-event-grid/select-azure-event-grid.png":::


## Configure the Azure Event Grid connector
[!INCLUDE [azure-event-grid-source-connector](./includes/azure-event-grid-source-connector.md)]


## View updated eventstream

1. On the **Review + connect** page, select **Add**. 
1. You see that the Event Grid source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure Event Grid namespace, select **Publish** on the ribbon. 

    :::image type="content" source="./media/add-source-azure-event-grid/publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-event-grid/publish.png":::
1. After you complete these steps, the Azure Event Grid namespace is available for visualization in the **Live view**. Select the **Event Grid Namespace** tile in the diagram to see details about the source.


## Related content
To learn how to add other sources to an eventstream, see the following article: [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md)
