---
title: Get events from Azure Event Hubs into Real-Time hub
description: This article describes how to get events from an Azure event hub in Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Get events from Azure Event Hubs into Real-Time hub
This article describes how to get events from an Azure event hub in Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- [Create an Azure Event Hubs namespace and an event hub](/azure/event-hubs/event-hubs-create) if you don't have one. 
- You need to have appropriate permission to get access keys for the event hub. The event hub must be publicly accessible and not behind a firewall or secured in a virtual network. 

## Get events from an Azure event hub
You can get events from an Azure event hub into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add an Azure event hub as a source](#add-an-azure-event-hub-as-a-source) section. 

## Using the Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure Event Hubs namespace**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your event hub. 
1. For **Resource group**, select a **resource group** that has your event hub.
1. For **Region**, select a location where your event hub is located. 
1. Now, move the mouse over the name of the event hub that you want to connect to Real-Time hub in the list of event hubs, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-event-hubs/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show event hubs and the connect button for an event hub.":::

    To configure connection information, use steps from the [Add an Azure event hub as a source](#add-an-azure-event-hub-as-a-source) section. Skip the first step of selecting Azure Event Hubs as a source type in the Get events wizard. 

## Add an Azure event hub as a source

1. On the **Select a data source** page, select **Azure Event Hubs**. 

    :::image type="content" source="./media/add-source-azure-event-hubs/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Get events wizard." lightbox="./media/add-source-azure-event-hubs/select-azure-event-hubs.png":::
1. If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/add-source-azure-event-hubs/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/add-source-azure-event-hubs/existing-connection.png":::    
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-event-hubs/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/add-source-azure-event-hubs/new-connection-button.png":::     
1. In the **Connection settings** section, do these steps:
    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/add-source-azure-event-hubs/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/add-source-azure-event-hubs/select-namespace-event-hub.png":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/add-source-azure-event-hubs/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/connect-page-1.png":::

        To get the access key name and value, follow these steps: 
        1. Navigate to your Azure Event Hubs namespace page in the Azure portal.
        1. On the **Event Hubs Namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 

            :::image type="content" source="./media/add-source-azure-event-hubs/event-hubs-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure Event Hubs namespace." lightbox="./media/add-source-azure-event-hubs/event-hubs-access-key-value.png":::            
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  
1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create. 
1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected event hub as a source.
1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You see this stream on the **Data streams** tab of Real-Time hub when the wizard finishes.  
1. Select **Next** at the bottom of the page. 
   
    :::image type="content" source="./media/add-source-azure-event-hubs/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/connect-page-2.png":::        
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector." lightbox="./media/add-source-azure-event-hubs/review-create-page.png":::        

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected event hub as a source. To close the wizard, select **Close** at the bottom of the page. 

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-hubs/review-create-success.png":::
2. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you as shown in the following image.

    :::image type="content" source="./media/add-source-azure-event-hubs/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab of Real-Time hub with the stream you just created." lightbox="./media/add-source-azure-event-hubs/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

