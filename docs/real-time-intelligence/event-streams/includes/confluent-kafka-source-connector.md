---
title: Confluent Cloud for Apache Kafka connector for Fabric event streams
description: This include files has the common content for configuring Confluent Cloud for Apache Kafka connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
ms.date: 06/23/2025
---

1. On the **Select a data source** page, select **Confluent Cloud for Apache Kafka**. 

    :::image type="content" source="./media/confluent-kafka-source-connector/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Get events wizard.":::
1. To create a connection to the Confluent Cloud for Apache Kafka source, select **New connection**.

    :::image type="content" source="./media/confluent-kafka-source-connector/new-connection-link.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, enter **Confluent Bootstrap Server**. Navigate to your Confluent Cloud home page, select **Cluster Settings**, and copy the address to your Bootstrap Server.      
1. In the **Connection credentials** section, If you have an existing connection to the Confluent cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **Confluent Cloud Key** is selected. 
    1. For **API Key** and **API Key Secret**: 
        1. Navigate to your Confluent Cloud.
        1. Select **API Keys** on the side menu. 
        1. Select the **Add key** button to create a new API key. 
        1. Copy the **API Key** and **Secret**. 
        1. Paste those values into the **API Key** and **API Key Secret** fields. 
        1. Select **Connect**

            :::image type="content" source="./media/confluent-kafka-source-connector/confluent-connection-settings-page-1.png" alt-text="Screenshot that shows the first page of the Confluent connection settings.":::        
1. Scroll to see the **Configure Confluent Cloud for Apache Kafka data source** section on the page. Enter the information to complete the configuration of the Confluent data source. 
    1. For **Topic name**, enter a topic name from your Confluent Cloud. You can create or manage your topic in the Confluent Cloud Console. 
    1. For **Consumer group**, enter a consumer group of your Confluent Cloud. It provides you with the dedicated consumer group for getting the events from Confluent Cloud cluster. 
    1. For **Reset auto offset** setting, select one of the following values:
        - **Earliest** – the earliest data available from your Confluent cluster.
        - **Latest** – the latest available data.
        - **None** – Do not automatically set the offset.

        > [!NOTE]
        > The **None** option isn't available during this creation step. If a committed offset exists and you want to use **None**, you can first complete the configuration and then update the setting in the Eventstream edit mode. 

            :::image type="content" source="./media/confluent-kafka-source-connector/configure-data-source.png" alt-text="Screenshot that shows the second page - Configure Confluent data source page - of the Confluent connection settings."::: 
1. Depending on whether your data is encoded using Confluent Schema Registry:
   - If not encoded, select **Next**. On the **Review and create** screen, review the summary, and then select **Add** to complete the setup.
   - If encoded, proceed to the next step: [Connect to Confluent schema registry to decode data (preview)](#connect-to-confluent-schema-registry-to-decode-data-preview)

### Connect to Confluent schema registry to decode data (preview)
Eventstream's Confluent Cloud for Apache Kafka streaming connector is capable of decoding data produced with Confluent serializer and its Schema Registry from Confluent Cloud. Data encoded with this serializer of Confluent schema registry require schema retrieval from the Confluent Schema Registry for decoding. Without access to the schema, Eventstream can't preview, process, or route the incoming data. 

You may expand **Advanced settings** to configure Confluent Schema Registry connection:

1. **Define and serialize data**: Select **Yes** allows you to serialize the data into a standardized format. Select **No** keeps the data in its original format and passes it through without modification.
1. If your data is encoded using a schema registry, select **Yes** when choosing whether the data is encoded with a schema registry. Then, select **New connection** to configure access to your Confluent Schema Registry:
    - **Schema Registry URL**: The public endpoint of your schema registry.
    - **API Key** and **API Key Secret**: Navigate to Confluent Cloud Environment's Schema Registry to copy the **API Key** and **API Secret**. Ensure the account used to create this API key has **DeveloperRead** or higher permission on the schema. 
    - **Privacy Level**: Choose from **None**, **Private**, **Organizational**, or **Public**.
1. **JSON output decimal format**: Specifies the JSON serialization format for Decimal logical type values in the data from the source.
    - **NUMERIC**: Serialize as numbers.
    - **BASE64**: Serialize as base64 encoded data.
1. Select **Next**. On the **Review and create** screen, review the summary, and then select **Add** to complete the setup.

    :::image type="content" source="./media/confluent-kafka-source-connector/confluent-schema-registry.png" alt-text="Screenshot that shows advanced settings of the Confluent schema registry settings.":::  
    
