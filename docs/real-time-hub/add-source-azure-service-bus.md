---
title: Get events from Azure Service Bus into Real-Time hub
description: This article describes how to get events from an Azure Service Bus queue or topic's subscription in Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 07/16/2025
---

# Get events from Azure Service Bus into Real-Time hub (preview)
This article describes how to get events from an Azure Service Bus queue or a topic's subscription into Real-Time hub.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Create an Azure Service Bus namespace, and [create a queue](/azure/service-bus-messaging/service-bus-quickstart-portal) and a [topic with a subscription](/azure/service-bus-messaging/service-bus-quickstart-topics-subscriptions-portal) if you don't have one.
- You need to have appropriate permission to get access keys for the Service Bus namespace. The namespace must be publicly accessible and not behind a firewall or secured in a virtual network.

## Get events from Azure Service Bus

You can get events from an Azure Service Bus into Real-Time hub in one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Microsoft sources** page](#azure-sources-page)

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure Service Bus** tile. 

    :::image type="content" source="./media/add-source-azure-service-bus/select-azure-service-bus.png" alt-text="Screenshot that shows the selection of Azure Service Bus as the source type in the Data sources page." lightbox="./media/add-source-azure-service-bus/select-azure-service-bus.png":::
    
    Now, follow instructions from the [Connect to Azure Service Bus](#connect-to-azure-service-bus) section.

## Azure sources page

1. In Real-Time hub, select **Azure sources** on the left navigation menu. You can use the search box to the type your resource name or use filters (Source, Subscription, Resource group, Region) to search for your resource. 
1. For **Source** at the top, select **Azure Service Bus** from the drop-down list. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your queue to topic's subscription.
1. For **Resource group**, select a **resource group** that has your queue or topic's subscription.
1. For **Region**, select a location where your Service Bus queue or topic's subscription is located.
1. Now, move the mouse over the name of the Service Bus queue that you want to connect to Real-Time hub in the list of Service Bus namespaces, and select the **Connect** button, or select **... (ellipsis)**, and then select **Connect data source**.

    :::image type="content" source="./media/add-source-azure-service-bus/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Azure sources page with filters to show Service Bus namespaces and the connect button for a namespace." lightbox="./media/add-source-azure-service-bus/microsoft-sources-connect-button.png":::

## Connect to Azure Service Bus

1. To create a connection to a Service Bus namespace, on the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-service-bus/new-connection-button.png" alt-text="Screenshot that shows the Connect page with the New connection link highlighted." lightbox="./media/add-source-azure-service-bus/new-connection-button.png":::     

    If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure the **data format**.

    :::image type="content" source="./media/add-source-azure-service-bus/use-existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure Service Bus." lightbox="./media/add-source-azure-service-bus/use-existing-connection.png":::    
1. In the **Connection settings** section, for **Host Name**, enter the host name for your Service Bus namespace. You can get the host name for the namespace from the **Overview** page of your Service Bus namespace in the Azure portal. It's in the form of `myservicebusnamespace.servicebus.windows.net`. 

    :::image type="content" source="./media/add-source-azure-service-bus/enter-host-name.png" alt-text="Screenshot that shows the connection settings with Service Bus namespace.":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/add-source-azure-service-bus/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the Connect page one for Azure Service Bus connector.":::
1. Now, on the **Connect** page of wizard, in the **Configure Azure Service Bus Source** section, do these steps:
    1. For **Service Bus Type**, select **Queue** or **Topic**. 
    1. If you select **Queue** for the type, enter the name of the Service Bus queue. 
    1. If you select **Topic** for the type, enter the name of the Service Bus topic and name of the subscription to the topic. 

        :::image type="content" source="./media/add-source-azure-service-bus/configure-service-bus-resource.png" alt-text="Screenshot that shows the Configure Azure Service Bus Source section of the Connect page one for Azure Service Bus connector." lightbox="./media/add-source-azure-service-bus/configure-service-bus-resource.png":::        
1. In the **Stream details** section to the right, follow these steps:
    1. Select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
    1. For **eventstream name**, enter a name for the eventstream. Select the **Pencil** button next to the eventstream name. The wizard creates an eventstream with the selected Service Bus queue or topic's subscription as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.  
    
        :::image type="content" source="./media/add-source-azure-service-bus/stream-details.png" alt-text="Screenshot that shows the Stream details section of the Connect page one for Azure Service Bus connector." lightbox="./media/add-source-azure-service-bus/stream-details.png":::       
1. Select **Next** at the bottom of the page.
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/add-source-azure-service-bus/review-connect.png" alt-text="Screenshot that shows the Review + connect page for Azure Service Bus connector." lightbox="./media/add-source-azure-service-bus/review-connect.png":::        

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Service Bus resource as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-service-bus/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-service-bus/review-create-success.png":::
2. You should see the stream on the **All data streams** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-service-bus/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-service-bus/verify-data-stream.png":::

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
