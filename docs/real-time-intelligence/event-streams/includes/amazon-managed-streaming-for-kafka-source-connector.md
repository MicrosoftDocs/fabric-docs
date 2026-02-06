---
title: Amazon Managed streaming for Kafka connector for Fabric event streams
description: This file has the common content for configuring Amazon Managed streaming for Kafka connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 12/22/2025
---

1. On the **Data sources** page, select **Amazon MSK Kafka**. 

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/add-data-kafka.png" alt-text="Screenshot that shows the selection of Amazon MSK Kafka as the source type in the Get events wizard.":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, for **Bootstrap Server**, enter the public endpoint of your Kafka cluster.

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/bootstrap-server.png" alt-text="Screenshot that shows the selection of the Bootstrap server field on the Connect page of the Get events wizard.":::   

    To get the public endpoint:

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/public-endpoint.png" alt-text="Screenshot that shows the public endpoint of Amazon MSK cluster.":::   
1. In the **Connection credentials** section, If you have an existing connection to the Amazon MSK Kafka cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **API Key** is selected. 
    1. For **Key** and **Secret**, enter API key and key Secret for Amazon MSK Kafka cluster.     
1. Select **Connect**.  
1. Now, on the Connect page, follow these steps.  
    1. For **Topic**, enter the Kafka topic. 
    1. For **Consumer group**, enter the consumer group of your Kafka cluster. This field provides you with a dedicated consumer group for getting events.  
    1. Select **Reset auto offset** to specify where to start reading offsets if there's no commit. 
    1. For **Security protocol**, the default value is **SASL_SSL**. The default **SASL mechanism** is **SCRAM-SHA-512** and cannot be changed. 
    
        :::image type="content" source="./media/amazon-msk-kafka-source-connector/configure-settings.png" alt-text="Screenshot that shows the first page of the Amazon MSK Kafka connection settings." lightbox="./media/amazon-msk-kafka-source-connector/configure-settings.png":::      
1. Select **Next**. On the **Review + connect** screen, review the summary, and then select **Connect**.
