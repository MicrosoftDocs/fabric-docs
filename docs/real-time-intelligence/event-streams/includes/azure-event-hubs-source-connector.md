---
title: Azure Event Hubs connector for Fabric event streams
description: This include files has the common content for configuring an Azure Event Hubs connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

1. On the **Select a data source** page, select **Azure Event Hubs**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Get events wizard." lightbox="./media/azure-event-hubs-source-connector/select-azure-event-hubs.png":::
1. On the **Connect** page, follow these steps:
    1. In the **Connection settings** section, do these steps:
        1. Enter the name of the Event Hubs namespace.
        1. Enter the name of the event hub.
    1. In the **Connection credentials** section, do these steps:
        1. If there's an existing connection, select it from the drop-down list. If not, confirm that **Create new connection** is selected for this option.
        1. For **Connection name**, enter a name for the connection to the event hub.
        1. For **Authentication method**, confirm that **Shared Access Key** is selected.
        1. For **Shared Access Key Name**, enter the name of the shared access key. 
        1. For **Shared Access Key**, enter the value of the shared access key.
            
            :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::
        1. For **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 
        1. For **Data format**, select the format of the data in the event hub. 
        
            :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::        
    1. In the **Stream details** section, do these steps:
        1. Select your **Fabric workspace** where you want to save the connection and the stream. 
        1. For **Stream name**, enter a name for the eventstream that's being created. 
        1. The value for **Stream name** is automatically generated. 
        
            :::image type="content" source="./media/azure-event-hubs-source-connector/connect-stream-details.png" alt-text="Screenshot that shows the Stream details section of the Connect page for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-stream-details.png":::        
    1. Select **Connect** at the bottom of the page. 
    1. Once the connection is successful, select **Next**. 
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::        

### Existing connection

If there's an existing connection to the Azure event hub, you see the Connect page as shown in the following image.

:::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::        

Select **Edit connection** to edit the connection settings to the Azure event hub. 

### Get the access key

1. Select **Go to resource** link, which takes you to the Azure Event Hubs Namespace page for your Event Hubs namespace.
1. On the **Event Hubs Namespace** page, select **Shared access policies** on the left navigation menu.
1. Select the **access key** from the list. Note down the access key name.
1. Select the copy button next to the **Primary key**. 