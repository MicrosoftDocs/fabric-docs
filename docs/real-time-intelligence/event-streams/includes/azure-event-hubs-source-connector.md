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
1. If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::    
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-event-hubs-source-connector/new-connection-button.png":::     
1. In the **Connection settings** section, do these steps:
    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

        To get the access key name and value, follow these steps: 
        1. Navigate to your Azure Event Hubs namespace page in the Azure portal.
        1. On the **Event Hubs Namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 

            :::image type="content" source="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure Event Hubs namespace." lightbox="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png":::            
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  
1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create. 
1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected event hub as a source.
1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You see this stream on the **Data streams** tab of Real-Time hub when the wizard finishes.  
1. Select **Next** at the bottom of the page. 
   
    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::        
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::        



