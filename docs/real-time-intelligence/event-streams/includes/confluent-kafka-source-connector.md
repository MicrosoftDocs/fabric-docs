---
title: Confluent Kafka connector for Fabric event streams
description: This include files has the common content for configuring Confluent Kafka connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/18/2024
---

1. On the **Select a data source** page, select **Confluent**. 

    :::image type="content" source="./media/confluent-kafka-source-connector/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Get events wizard.":::
1. To create a connection to the Confluent Cloud Kafka source, select **New connection**.

    :::image type="content" source="./media/confluent-kafka-source-connector/new-connection-link.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, enter **Confluent Bootstrap Server**. Navigate to your Confluent Cloud home page, select **Cluster Settings**, and copy the address to your Bootstrap Server.      
1. In the **Connection credentials** section, If you have an existing connection to the Confluent cluster, select it from the drop-down list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **Confluent Cloud Key** is selected. 
    1. For **API Key** and **API Key Secret**: 
        1. Navigate to your Confluent Cloud.
        1. Select **API Keys** on the side menu. 
        1. Select the **Add key** button to create a new API key. 
        1. Copy the **API Key** and **Secret**. 
        1. Paste those values into the **API Key** and **API Key Secret** fields. 
        1. Select **Connect**

            :::image type="content" source="./media/confluent-kafka-source-connector/confluent-connection-settings-page-1.png" alt-text="Screenshot that shows the first page of the Confluent connection settings. ":::        
1. Scroll to see the **Configure Confluent data source** section on the page. Enter the information to complete the configuration of the Confluent data source. 
    1. For **Topic**, enter a topic name from your Confluent Cloud. You can create or manage your topic in the Confluent Cloud Console. 
    1. For **Consumer group**, Enter a consumer group of your Confluent Cloud. It provides you with the dedicated consumer group for getting the events from Confluent Cloud cluster. 
    1. For **Reset auto offset** setting, select one of the following values: 
        - **Earliest** – the earliest data available from your Confluent cluster
        - **Latest** – the latest available data
        - **None** – don't automatically set the offset. 

            :::image type="content" source="./media/confluent-kafka-source-connector/configure-data-source.png" alt-text="Screenshot that shows the second page - Configure Confluent data source page - of the Confluent connection settings. ":::        
1. Select **Next**. On the **Review and create** screen, review the summary, and then select **Add**.
