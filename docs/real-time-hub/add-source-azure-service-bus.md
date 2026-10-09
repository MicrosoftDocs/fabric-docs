---
title: Get events from Azure Service Bus into Real-Time hub
description: This article describes how to get events from an Azure Service Bus queue or topic's subscription in Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 07/16/2025
---

# Get events from Azure Service Bus into Real-Time hub (preview)
This article describes how to get events from an Azure Service Bus queue or a topic subscription into Real-Time hub.


[!INCLUDE [azure-service-bus-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-service-bus-source-connector-prerequisites.md)]


## Navigate to Add data page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

On the **Add data** page, you can connect to an Azure Service Bus queue or a topic subscription using the **All sources** tab or the **Azure** tab (recommended). This article covers both ways to connect to an Azure Service Bus resource.

## Use the Azure tab to connect to a Service Bus resource (recommended)

1. On the **Add data** page, switch to the **Azure** tab. 

    :::image type="content" source="./media/add-source-azure-service-bus/switch-to-azure-tab.png" alt-text="Screenshot that shows how to switch to the Azure tab on the Add data page." lightbox="./media/add-source-azure-service-bus/switch-to-azure-tab.png":::
1. Hover the mouse over your Azure Service Bus namespace in the list, and select the **Connect** button that appears. Alternatively, select **...** and then **Connect** from the dropdown menu. 

    Use the search bar to quickly find your Service Bus namespace if you have many Azure resources. Or, use filters to filter the list by source type (Azure Service Bus namespace), subscription, resource group, or region.

    :::image type="content" source="./media/add-source-azure-service-bus/connect-button.png" alt-text="Screenshot that shows how to connect to an Azure Service Bus namespace from the Add data page." lightbox="./media/add-source-azure-service-bus/connect-button.png":::

### Configure the Service Bus source

[!INCLUDE [azure-service-bus-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-service-bus-source-connector-configuration.md)]  

## View data stream details
1. On **Review + connect**, select **Open eventstream**. The wizard opens the event stream it created for you with the selected Service Bus resource as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-service-bus/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-service-bus/review-create-success.png":::
2. You see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-service-bus/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-service-bus/verify-data-stream.png":::


## Use **All sources** tab to connect to a Service Bus resource

1. On the **Add data** page, switch to the **All sources** tab, if you aren't already on the tab.
1. Scroll to find **Azure Service Bus** or search for **Azure Service Bus** in the search bar.
1. Hover the mouse over the **Azure Service Bus** tile, and select the **Connect** button that appears. Alternatively, select **...** and then **Connect** from the dropdown menu.

    :::image type="content" source="./media/add-source-azure-service-bus/connect-button-all-sources.png" alt-text="Screenshot that shows how to connect to an Azure Service Bus namespace from the All sources tab on the Add data page." lightbox="./media/add-source-azure-service-bus/connect-button-all-sources.png":::
1. Follow instructions in the [Configure the Service Bus source](#configure-the-service-bus-source) section to configure the Service Bus source.

    > [!NOTE]
    > If you select **View existing sources**, you see the list of Service Bus namespaces. Use instructions from the [Use the Azure tab to connect to a Service Bus resource (recommended)](#use-the-azure-tab-to-connect-to-a-service-bus-resource-recommended) section to connect to a Service Bus resource.
    >
    > :::image type="content" source="./media/add-source-azure-service-bus/view-existing-sources.png" alt-text="Screenshot that shows the View existing sources option with the list of Service Bus namespaces." lightbox="./media/add-source-azure-service-bus/view-existing-sources.png":::



## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

