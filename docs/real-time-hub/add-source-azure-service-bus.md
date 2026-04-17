---
title: Get events from Azure Service Bus into Real-Time hub
description: This article describes how to get events from an Azure Service Bus queue or topic's subscription in Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 07/16/2025
---

# Get events from Azure Service Bus into Real-Time hub (preview)
This article describes how to get events from an Azure Service Bus queue or a topic's subscription into Real-Time hub.


[!INCLUDE [azure-service-bus-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-service-bus-source-connector-prerequisites.md)]


## Get events from Azure Service Bus

You can get events from an Azure Service Bus into Real-Time hub in one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Microsoft sources** page](#azure-sources-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure Service Bus** tile. 

    :::image type="content" source="./media/add-source-azure-service-bus/select-azure-service-bus.png" alt-text="Screenshot that shows the selection of Azure Service Bus as the source type in the Data sources page." lightbox="./media/add-source-azure-service-bus/select-azure-service-bus.png":::
    
    Now, follow instructions from the [Configure Azure Service Bus source](#configure-azure-service-bus-source) section.

## Azure sources page

1. In Real-Time hub, select **Azure sources** on the left navigation menu. You can use the search box to the type your resource name or use filters (Source, Subscription, Resource group, Region) to search for your resource. 
1. For **Source** at the top, select **Azure Service Bus** from the drop-down list. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your queue to topic's subscription.
1. For **Resource group**, select a **resource group** that has your queue or topic's subscription.
1. For **Region**, select a location where your Service Bus queue or topic's subscription is located.
1. Now, move the mouse over the name of the Service Bus queue that you want to connect to Real-Time hub in the list of Service Bus namespaces, and select the **Connect** button, or select **... (ellipsis)**, and then select **Connect data source**.

    :::image type="content" source="./media/add-source-azure-service-bus/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Azure sources page with filters to show Service Bus namespaces and the connect button for a namespace." lightbox="./media/add-source-azure-service-bus/microsoft-sources-connect-button.png":::

## Configure Azure Service Bus source

[!INCLUDE [azure-service-bus-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-service-bus-source-connector-configuration.md)]  

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Service Bus resource as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-service-bus/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-service-bus/review-create-success.png":::
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-service-bus/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-service-bus/verify-data-stream.png":::

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

