---
title: Apache Kafka connector for Fabric event streams
description: This file has the common content for configuring Apache Kafka connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
ms.date: 07/22/2025
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/apache-kafka-source-connector/new-connection-link.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, for **Bootstrap Server**, enter your Apache Kafka server address.

    :::image type="content" source="./media/apache-kafka-source-connector/bootstrap-server.png" alt-text="Screenshot that shows the selection of the Apache Kafka Bootstrap server field on the Connect page of the Get events wizard.":::   
1. In the **Connection credentials** section, If you have an existing connection to the Apache Kafka cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **API Key** is selected. 
    1. For **Key** and **Secret**, enter API key and key Secret.      
1. Select **Connect**.  
1. Now, on the Connect page, follow these steps.  
    1. For **Topic**, enter the Kafka topic. 
    1. For **Consumer group**, enter the consumer group of your Apache Kafka cluster. This field provides you with a dedicated consumer group for getting events.  
    1. Select **Reset auto offset** to specify where to start reading offsets if there's no commit. 
    1. For newly added Apache Kafka sources, the only supported **Security protocol** is **SASL_SSL**. When using **SASL_SSL**, the server certificate must be signed by a Certificate Authority (CA) included in the [trusted CA list](https://github.com/microsoft/fabric-event-streams/blob/main/References/certificate-authority-list/trusted-ca-list.txt).
   
       > [!NOTE] 
       > For existing Apache Kafka sources already added to your eventstream and configured with the security protocol set to SASL_PLAINTEXT or PLAINTEXT, you can update the security protocol to SASL_SSL in Eventstream edit mode. Once updated and saved, the protocol cannot be reverted to SASL_PLAINTEXT or PLAINTEXT.
       
    1. The default **SASL mechanism** is typically **PLAIN**, unless configured otherwise. You can select the **SCRAM-SHA-256** or **SCRAM-SHA-512** mechanism that suits your security requirements.   
    
        :::image type="content" source="./media/apache-kafka-source-connector/configure-source-section.png" alt-text="Screenshot that shows the first page of the Apache Kafka connection settings." lightbox="./media/apache-kafka-source-connector/configure-source-section.png":::      
1. Select **Next**. On the **Review and create** screen, review the summary, and then select **Add**.
