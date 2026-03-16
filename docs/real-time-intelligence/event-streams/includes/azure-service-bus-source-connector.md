---
title: Azure Service Bus connector for Fabric eventstreams
description: This include file has the common content for configuring an Azure Service Bus connector for Fabric eventstreams and real-time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 11/18/2024
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-service-bus-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page with the link for a new connection highlighted." lightbox="./media/azure-service-bus-source-connector/new-connection-button.png":::

    If there's an existing connection to your Azure Service Bus resource, select that existing connection, and then move on to configuring **Service Bus Type** in the following steps.

    :::image type="content" source="./media/azure-service-bus-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection selected." lightbox="./media/azure-service-bus-source-connector/existing-connection.png":::

1. In the **Connection settings** section, for **Host Name**, enter the host name for your service bus. You can get the name from the **Overview** page of your Service Bus namespace. It's in the form of `NAMESPACENAME.servicebus.windows.net`.

    :::image type="content" source="./media/azure-service-bus-source-connector/host-name.png" alt-text="Screenshot that shows connection settings with a Service Bus namespace specified.":::

1. In the **Connection credentials** section, follow these steps:

    1. For **Connection name**, enter a name for the connection to the Service Bus queue or topic.

    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.

    1. For **Shared access key name**, enter the name of the shared access key.

    1. For **Shared Access Key**, enter the value of the shared access key.

        To get the access key's name and value, follow these steps:

        1. In the Azure portal, go to the page for your Service Bus namespace.
        1. On the left menu, select **Shared access policies**.
        1. Select the access key from the list. Note down the name of the access key.
        1. Select the copy button next to the **Primary key** value.

    1. Select **Connect**.

    :::image type="content" source="./media/azure-service-bus-source-connector/connection-credentials.png" alt-text="Screenshot that shows connection credentials for an Azure Service Bus connector.":::

1. In the **Configure Azure Service Bus Source** section, follow these steps:

    1. For **Service Bus Type**, select **Topic** (default) or **Queue**.
    1. If you selected **Topic**:

       1. For **Topic name**, enter the name of the topic.
       1. For **Subscription**, enter the name of the subscription to that topic.

       :::image type="content" source="./media/azure-service-bus-source-connector/configure-service-bus-source.png" alt-text="Screenshot that shows topic information in the section for configuring an Azure Service Bus source." lightbox="./media/azure-service-bus-source-connector/configure-service-bus-source.png":::

       If you selected **Queue**, enter the name of the queue.

1. In the **Stream details** section to the right, use the pencil button to change the source name. You might want to change this name to the name of the Service Bus namespace or the topic.

    :::image type="content" source="./media/azure-service-bus-source-connector/stream-details.png" alt-text="Screenshot that shows the section for stream details in the wizard for connecting a data source." lightbox="./media/azure-service-bus-source-connector/stream-details.png":::

1. At the bottom of the wizard, select **Next**.

1. On the **Review + connect** page, review your settings, and then select **Add** or **Connect**.

    :::image type="content" source="./media/azure-service-bus-source-connector/review-connect.png" alt-text="Screenshot that shows the page for reviewing settings and adding or connecting to an Azure Service Bus data source." lightbox="./media/azure-service-bus-source-connector/stream-details.png":::

