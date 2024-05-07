---
title: Add Confluent Cloud Kafka as source in Real-Time hub
description: This article describes how to add Confluent Cloud Kafka as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Confluent Cloud Kafka as source in Real-Time hub
This article describes how to add Confluent Cloud Kafka as an event source in Fabric Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Confluent Cloud Kafka as a source

1. On the **Select a data source** page, select **Confluent**. 

    :::image type="content" source="./media/add-source-confluent-kafka/select-confluent.png" alt-text="Screenshot that shows the selection of Confluent as the source type in the Get events wizard.":::
1. To create a connection to the Confluent Cloud Kafka source, select **New connection**.

    :::image type="content" source="./media/add-source-confluent-kafka/new-connection-link.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
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

            :::image type="content" source="./media/add-source-confluent-kafka/confluent-connection-settings-page-1.png" alt-text="Screenshot that shows the first page of the Confluent connection settings. ":::        
1. Scroll to see the **Configure Confluent data source** section on the page. Enter the information to complete the configuration of the Confluent data source. 
    1. For **Topic**, enter a topic name from your Confluent Cloud. You can create or manage your topic in the Confluent Cloud Console. 
    1. For **Consumer group**, Enter a consumer group of your Confluent Cloud. It provides you with the dedicated consumer group for getting the events from Confluent Cloud cluster. 
    1. For **Reset auto offset** setting, select one of the following values: 
        - **Earliest** – the earliest data available from your Confluent cluster
        - **Latest** – the latest available data
        - **None** – don't automatically set the offset. 

            :::image type="content" source="./media/add-source-confluent-kafka/configure-data-source.png" alt-text="Screenshot that shows the second page - Configure Confluent data source page - of the Confluent connection settings. ":::        
1. In the **Stream details** section of the right pane, do these steps:
    1. Select the **workspace** where you want to save the connection.
    1. Enter a **name for the eventstream** to be created for you.
    1. Name of the **stream** for Real-Time hub is automatically generated for you. 

        :::image type="content" source="./media/add-source-confluent-kafka/stream-details.png" alt-text="Screenshot that shows the right pane with Stream details section of the Confluent connection settings page. ":::                
1. Select **Next**. 
1. On the **Review and create** screen, review the summary, and then select **Create source**.

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Confluent Cloud Kafka source. To close the wizard, select **Close** at the bottom of the page. 
1. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you.

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

