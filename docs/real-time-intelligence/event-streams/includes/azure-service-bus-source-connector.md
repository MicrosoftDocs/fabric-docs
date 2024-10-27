---
title: Azure Service Bus connector for Fabric event streams
description: The include files has the common content for configuring an Azure Service Bus connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.date: 05/21/2024
---


1. In the editor, select **Use external source** tile. 

    :::image type="content" source="./media/select-external-source/select-use-external-source-tile.png" alt-text="Screenshot that shows the selection of Use external source tile." lightbox="./media/azure-service-bus-source-connector/select-use-external-source-tile.png":::

    If you're adding Azure Service Bus as a source to an already published eventstream, switch to **Edit** mode, select **Add source** on the ribbon, and then select **External sources**.

    :::image type="content" source="./media/select-external-source/add-source-ribbon.png" alt-text="Screenshot that shows the selection of Add source to External sources menu." lightbox="./media/azure-service-bus-source-connector/add-source-ribbon.png":::
1. On the **Connect data source** page, search for **Azure Service Bus**, and then select **Connect** on the **Azure Service Bus** tile.

    :::image type="content" source="./media/azure-service-bus-source-connector/select-azure-service-bus.png" alt-text="Screenshot that shows the selection of Azure Service Bus as the source type in the Connect data source wizard.":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-service-bus-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-service-bus-source-connector/new-connection-button.png":::     
1. In the **Connection settings** section, for **Host Name**, enter the host name for your service bus, which you can get from the **Overview** page of your Service Bus namespace. It's in the form of `NAMESPACENAME.servicebus.windows.net`.
    
    :::image type="content" source="./media/azure-service-bus-source-connector/host-name.png" alt-text="Screenshot that shows the connection settings with Service Bus namespace specified.":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
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

