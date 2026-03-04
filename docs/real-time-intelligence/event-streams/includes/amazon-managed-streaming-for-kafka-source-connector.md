---
title: Amazon Managed streaming for Kafka connector for Fabric event streams
description: This file has the common content for configuring Amazon Managed streaming for Kafka connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 12/22/2025
---

1. On the **Data sources** page, select **Amazon MSK Kafka**. 

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/add-data-kafka.png" alt-text="Screenshot that shows the selection of Amazon MSK Kafka as the source type in the Get events wizard.":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, for **Bootstrap Server**, enter one or more public Kafka bootstrap server endpoints. Use commas (,) to separate multiple servers.
    :::image type="content" source="./media/amazon-msk-kafka-source-connector/bootstrap-server.png" alt-text="Screenshot that shows the selection of the Bootstrap server field on the Connect page of the Get events wizard.":::   

    To get the public endpoint:

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/public-endpoint.png" alt-text="Screenshot that shows the public endpoint of Amazon MSK cluster.":::   
1. In the **Connection credentials** section, If you have an existing connection to the Amazon MSK Kafka cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **API Key** is selected. 
    1. For **Key** and **Secret**, enter API key and key Secret for Amazon MSK Kafka cluster.     
        > [!NOTE]
        > if you only use mTLS to do the authentication, you can add any string in the Key section during connection creation. 
1. Select **Connect**.  
1. Now, on the Connect page, follow these steps.  
    1. For **Topic**, enter the Kafka topic. 
    1. For **Consumer group**, enter the consumer group of your Kafka cluster. This field provides you with a dedicated consumer group for getting events.  
    1. Select **Reset auto offset** to specify where to start reading offsets if there's no commit. 
    1. For **Security protocol**, select one of the following options: 
            - **SASL_SSL**: Use this option when your Kafka cluster uses SASL-based authentication. By default, the Kafka broker’s server certificate must be signed by a Certificate Authority (CA) included in the [trusted CA list](https://github.com/microsoft/fabric-event-streams/blob/main/References/certificate-authority-list/trusted-ca-list.txt). If your Kafka cluster uses a custom CA, you can configure it by using **TLS/mTLS settings**.
            - **SSL (mTLS)**: Use this option when your Kafka cluster requires mTLS authentication, and you must configure both a custom server CA certificate and a client certificate in **TLS/mTLS settings**.
    1. The default **SASL mechanism** is **SCRAM-SHA-512** and cannot be changed.
    1. If your Kafka cluster uses a custom CA or requires mTLS, expand **TLS/mTLS settings** and configure the following options as needed:

        - **Trust CA Certificate**: Enable Trust CA Certificate configuration. Select your subscription, resource group and key vault, and then provide the server ca name. 
        - **Client certificate and key**: Enable Client certificate and key configuration. Select your subscription, resource group and key vault, and then provide the client certificate name. 
        
            If you don’t use mTLS but still use **SASL_SSL** with your custom CA cert, then you can skip this client certificate configuration.  

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/configure-settings.png" alt-text="Screenshot that shows the first page of the Amazon MSK Kafka connection settings." lightbox="./media/amazon-msk-kafka-source-connector/configure-settings.png":::      
1. Select **Next**. On the **Review + connect** screen, review the summary, and then select **Connect**.

