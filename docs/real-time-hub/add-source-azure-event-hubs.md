---
title: Get events from Azure Event Hubs into Real-Time hub
description: This article describes how to get events from an Azure event hub in Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 07/16/2025
---

# Get events from Azure Event Hubs into Real-Time hub

This article describes how to get events from an Azure event hub into Real-Time hub.



## Prerequisites

- Access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions. 
- [Create an Azure Event Hubs namespace and an event hub](/azure/event-hubs/event-hubs-create) if you don't have one.
- You need to have appropriate permission to get access keys for the event hub. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure Event Hubs** tile. 

    :::image type="content" source="./media/add-source-azure-event-hubs/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Data sources page." lightbox="./media/add-source-azure-event-hubs/select-azure-event-hubs.png":::
    
    Now, follow instructions from the [Connect to an Azure event hub](#configure-and-connect-to-the-azure-event-hub) section.

### Configure connection settings and credentials
1. To create a connection to an event hub, on the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-event-hubs/new-connection-button.png" alt-text="Screenshot that shows the Connect page with the New connection link highlighted." lightbox="./media/add-source-azure-event-hubs/new-connection-button.png":::     

    If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the [Configure and connect to the Azure event hub resource](#configure-and-connect-to-the-azure-event-hub) section.    

    :::image type="content" source="./media/add-source-azure-event-hubs/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/add-source-azure-event-hubs/existing-connection.png":::    
1. In the **Connection settings** section, do these steps:
    1. Enter the **name of the Event Hubs namespace**.
    1. Enter the **name of the event hub**.

        :::image type="content" source="./media/add-source-azure-event-hubs/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/add-source-azure-event-hubs/select-namespace-event-hub.png":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/add-source-azure-event-hubs/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/connect-page-1.png":::

        Now, continue to [Configure and connect to the Azure event hub resource](#configure-and-connect-to-the-azure-event-hub).        

## Configure and connect to the Azure event hub

1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub.
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure event hub. 
1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected event hub as a source.
1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.  
1. Select **Next** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-hubs/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/connect-page-2.png":::        
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-page.png" alt-text="Screenshot that shows the Review + connect page for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/review-create-page.png":::        

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected event hub as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-hubs/review-create-success.png":::
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-event-hubs/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-event-hubs/verify-data-stream.png":::

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
