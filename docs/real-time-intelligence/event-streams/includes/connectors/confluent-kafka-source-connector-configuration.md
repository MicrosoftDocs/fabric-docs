---
title: Confluent Cloud for Apache Kafka connector for Fabric event streams
description: This file has the common content for configuring Confluent Cloud for Apache Kafka connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/02/2026
---

1. On the **Select a data source** page, select **Confluent Cloud for Apache Kafka**. 

    :::image type="content" source="./media/confluent-kafka-source-connector/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Get events wizard.":::
1. To create a connection to the Confluent Cloud for Apache Kafka source, select **New connection**.

    :::image type="content" source="./media/confluent-kafka-source-connector/new-connection-link.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, enter one or more **Confluent Kafka bootstrap server** addresses from **Cluster Settings** on your Confluent Cloud cluster home page. Separate multiple addresses with commas (,).  
1. In the **Connection credentials** section, If you have an existing connection to the Confluent cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **Confluent Cloud Key** is selected. 
    1. For **API Key** and **API Key Secret**: 
        1. Navigate to your Confluent Cloud.
        1. Select **API Keys** on the side menu. 
        1. Select the **Add key** button to create a new API key. 
        1. Copy the **API Key** and **Secret**. 
        1. Paste those values into the **API Key** and **API Key Secret** fields. 
            > [!NOTE]
            > If you only use mTLS to do the authentication, you can add any string in the Key section during connection creation. 
        1. Select **Connect**

            :::image type="content" source="./media/confluent-kafka-source-connector/confluent-connection-settings-page-1.png" alt-text="Screenshot that shows the first page of the Confluent connection settings.":::        
1. Scroll to see the **Configure Confluent Cloud for Apache Kafka data source** section on the page. Enter the information to complete the configuration of the Confluent data source. 
    1. For **Topic name**, enter a topic name from your Confluent Cloud. You can create or manage your topic in the Confluent Cloud Console. 
    1. For **Consumer group**, enter a consumer group of your Confluent Cloud. It provides you with the dedicated consumer group for getting the events from Confluent Cloud cluster. 
    1. For **Reset auto offset** setting, select one of the following values:
        - **Earliest** – the earliest data available from your Confluent cluster.
        - **Latest** – the latest available data.
        - **None** – Don't automatically set the offset.

        > [!NOTE]
        > The **None** option isn't available during this creation step. If a committed offset exists and you want to use **None**, you can first complete the configuration and then update the setting in the Eventstream edit mode. 
    1. If your Kafka cluster requires mTLS, expand **TLS/mTLS settings** and configure the following options as needed.  
        When both **Trust CA Certificate** and **Client certificate and key** are enabled and configured, the system automatically uses **mTLS** to establish the connection. No separate security protocol selection is required.

        [!INCLUDE [secure-connection-settings-common](./secure-connection-settings-common.md)]

         :::image type="content" source="./media/confluent-kafka-source-connector/configure-data-source.png" alt-text="Screenshot that shows the second page - Configure Confluent data source page - of the Confluent connection settings."::: 
    
    1. You may expand **Additional settings** to configure **TLS verify hostname**, **TLS cipher suites, and **TLS revocation mode**:
        - **TLS verify hostname**: Controls whether hostname verification is enabled for the TLS connection. The default value is **True**.
        - **TLS cipher suites**: Specifies which TLS cipher suites the client can use. The default value is **Use system defaults**.
        - **TLS revocation mode**: Controls whether client certificate revocation checking is enabled for the TLS connection. The default value is **Off**.

        :::image type="content" source="./media/confluent-kafka-source-connector/configure-additional-settings.png" alt-text="Screenshot that shows the additional settings of Confluent TLS/mTLS settings."::: 

[!INCLUDE [secure-certificate-requirements](./secure-certificate-requirements.md)]
