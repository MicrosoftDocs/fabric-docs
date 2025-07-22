---
title: Get events from Azure Event Grid namespace
description: This article describes how to get events from an Azure Event Grid namespace into Fabric Real-Time hub. 
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/16/2025
---

# Get events from Azure Event Grid namespace into Fabric Real-Time hub (Preview)
This article describes how to get events from an Azure Event Grid namespace into Fabric Real-Time hub.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Enable [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) on the Event Grid namespace. 
- Enable [MQTT](/azure/event-grid/mqtt-publish-and-subscribe-portal) and [routing](/azure/event-grid/mqtt-routing) on the Event Grid namespace, if you want to receive Message Queueing Telemetry Transport (MQTT) data.  


## Get events from an Azure Event Grid namespace
You can get events from an Azure Event Grid namespace into Real-Time hub using the [**Data sources** page](#data-sources-page).

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, search for **Azure Event Grid namespace**, and then select **Connect** on the **Azure Event Grid Namespace** tile. 

    :::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot that shows the selection of Azure Event Grid namespace as the source type in the Data sources page.":::

## Configure and connect to the Event Grid namespace
[!INCLUDE [azure-event-grid-source-connector](../real-time-intelligence/event-streams/includes/azure-event-grid-source-connector.md)]

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Event Grid namespace as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-grid/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-grid/review-create-success.png":::
2. You should see the stream in the **All data streams** section of the **Real-Time hub** page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-event-grid/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-event-grid/verify-data-stream.png":::

## Confidential and highly confidential sensitivity

If you mark the eventstream with either **Confidential** or **Highly Confidential** sensitivity labels, follow these steps so that the Event Grid namespace's managed identity has the appropriate access. 

- Select **Settings** (gear icon) in the top-right corner.
- Select **Admin portal** in the **Governance and insights** section. 

    :::image type="content" source="../real-time-intelligence/event-streams/media/add-source-azure-event-grid/admin-portal-link.png" alt-text="Screenshot that shows the selection of Admin portal link in the Governance and insights section." lightbox="../real-time-intelligence/event-streams/media/add-source-azure-event-grid/admin-portal-link.png":::        

- Activate the following tenant setting to grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines.
    - On the **Tenant settings** page, in the **Developer settings** section, expand **Service principal can use Fabric API** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.
    
        :::image type="content" source="../real-time-intelligence/event-streams/media/add-source-azure-event-grid/developer-settings.png" alt-text="Screenshot that shows the developer settings." lightbox="../real-time-intelligence/event-streams/media/add-source-azure-event-grid/developer-settings.png":::              
- Enable this option to access all other APIs (enabled by default for new tenants):
    - On the **Tenant settings** page, in the **Developer settings** section, expand **Allow Service principals to create and use profiles** option.
    - Toggle to **Enabled**.
    - Apply to **the entire organization**.
    - Select **Apply**.

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
