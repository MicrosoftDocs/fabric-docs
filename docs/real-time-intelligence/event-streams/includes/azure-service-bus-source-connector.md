---
title: Azure Service Bus connector for Fabric event streams
description: The include files has the common content for configuring an Azure Service Bus connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 11/18/2024
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-service-bus-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-service-bus-source-connector/new-connection-button.png":::     

    If there's an existing connection to your Azure Service Bus resource, select that existing connection as shown in the following image, and then move on to the step to configure **Service Bus Type** in the following steps.

    :::image type="content" source="./media/azure-service-bus-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection selected." lightbox="./media/azure-service-bus-source-connector/existing-connection.png":::     
1. In the **Connection settings** section, for **Host Name**, enter the host name for your service bus, which you can get from the **Overview** page of your Service Bus namespace. It's in the form of `NAMESPACENAME.servicebus.windows.net`.
    
    :::image type="content" source="./media/azure-service-bus-source-connector/host-name.png" alt-text="Screenshot that shows the connection settings with Service Bus namespace specified.":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the Service Bus queue or topic.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/azure-service-bus-source-connector/connection-credentials.png" alt-text="Screenshot that shows the Connect page one for Azure Service Bus connector.":::

        To get the access key name and value, follow these steps: 
        1. Navigate to your Azure Service Bus namespace page in the Azure portal.
        1. On the **Service Bus Namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 
1. Now, in the **Configure Azure Service Bus Source** section, follow these steps:
    1. For **Service Bus Type**, select **Topic** (default) or **Queue**.
    1. If you select **Topic**,  for **Topic name**, enter the name of the topic and for **Subscription**, enter the name of the subscription to that topic. If you select **Queue**, enter the name of the queue. This example uses **Topic** as **Service Bus Type**. 

        :::image type="content" source="./media/azure-service-bus-source-connector/configure-service-bus-source.png" alt-text="Screenshot that shows the Configure Azure Service Bus Source section on the Connect data source wizard." lightbox="./media/azure-service-bus-source-connector/configure-service-bus-source.png":::        
1. In the **Stream details** to the right, use the pencil button to change the source name. You might want to change this name to the name of the Service Bus namespace or the topic. 

    :::image type="content" source="./media/azure-service-bus-source-connector/stream-details.png" alt-text="Screenshot that shows the Stream details section on the Connect data source wizard." lightbox="./media/azure-service-bus-source-connector/stream-details.png":::        
1. Now, at the bottom of the wizard, select **Next**. 
1. On the **Review + connect** page, review settings, and select **Add** or **Connect**. 

    :::image type="content" source="./media/azure-service-bus-source-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page of the Connect data source wizard." lightbox="./media/azure-service-bus-source-connector/stream-details.png":::        
