---
title: Azure Event Hubs connector for Fabric event streams
description: The include files has the common content for configuring an Azure Event Hubs connector for Fabric event streams and Real-Time hub.
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
---

::: zone pivot="basic-features"  
1. On the **Connect** page, confirm that **Basic** is selected for the **feature level**, and then select **New connection**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-event-hubs-source-connector/new-connection-button.png":::     

    If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::    
1. In the **Connection settings** section, do these steps:
    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

        To get the access key name and value, follow these steps: 
        1. Navigate to your Azure Event Hubs namespace page in the Azure portal.
        1. On the **Event Hubs namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 

            :::image type="content" source="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure Event Hubs namespace." lightbox="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png":::            
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  

    :::image type="content" source="./media/azure-event-hubs-source-connector/consumer-group.png" alt-text="Screenshot that shows the consumer group and data format in the Stream details section." lightbox="./media/azure-event-hubs-source-connector/consumer-group.png":::
1. In the **Stream details** pane to the right, select **Pencil** icon next to the source name, and enter a name for the source. This step is optional. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/source-name.png" alt-text="Screenshot that shows the source name in the Stream details section." lightbox="./media/azure-event-hubs-source-connector/source-name.png":::
1. Select **Next** at the bottom of the page. 
   
    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::        
1. On the **Review + connect** page, review settings, and select **Add**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::        

::: zone-end

::: zone pivot="extended-features"
1. On the **Connect** page, for **Feature level**, select **Extended features (Preview)**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-connect.png" alt-text="Screenshot that shows the Configure connection settings page with Extended features option selected." lightbox="./media/azure-event-hubs-source-connector/extended-connect.png":::        

    If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.
1. In the **Connection settings** section, do these steps:
    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::
1. In the **Connection credentials** section, do these steps:
    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key.
    1. For **Shared Access Key**, enter the value of the shared access key.                  
    1. Select **Connect** at the bottom of the page.
        
        :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows the Connect page one for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

        To get the access key name and value, follow these steps: 
        1. Navigate to your Azure Event Hubs namespace page in the Azure portal.
        1. On the **Event Hubs namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 

            :::image type="content" source="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure Event Hubs namespace." lightbox="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png":::
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-consumer-group.png" alt-text="Screenshot that shows the consumer group in the Stream details section." lightbox="./media/azure-event-hubs-source-connector/extended-consumer-group.png":::
1. In the **Stream details** pane to the right, select **Pencil** icon next to the source name, and enter a name for the source. This step is optional. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-source-name.png" alt-text="Screenshot that shows the source name in the Stream details section with the Extended features option selected." lightbox="./media/azure-event-hubs-source-connector/extended-source-name.png":::
1. On the **Schema handling** page, you can match all events from a source to one **fixed schema**, or define a schema dynamically based on **header values to match multiple schemas**. 
1. Select **Add more schemas** drop-down, and select **New event schema** to define an event schema using the schema editor, or choose an existing schema from the event schema registry. To learn how to define a new event schema, see [Create and manage event schemas in schema sets](../../schema-sets/create-manage-event-schemas.md). 

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png" alt-text="Screenshot that shows the fixed schema option selected." lightbox="./media/azure-event-hubs-source-connector/extended-fixed-schema-option.png":::

    If you select **Choose from event schema registry** option, you see the **Associate an event schema** page. Select a schema from the registry, and then select **Choose** at the bottom of the page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png" alt-text="Screenshot that shows the Associate an event schema page." lightbox="./media/azure-event-hubs-source-connector/extended-associate-event-schema.png":::        
1. If you selected the **Fixed schema** option, continue to the next step. If you selected the **Dynamic schema via headers** option, specify the **Kafka header property** and **expected value** that maps to the schema. Add more schemas and specify different header properties and/or different values to map to those schemas. 
    
    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png" alt-text="Screenshot that shows a property and a value mapped to a schema." lightbox="./media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png":::        
1. On the **Schema handling** page, select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-schema-handling.png" alt-text="Screenshot that shows the Schema handling page." lightbox="./media/azure-event-hubs-source-connector/extended-schema-handling.png":::       
1. On the **Review + connect** page, review settings, and select **Connect**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector when the extended features are enabled." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::            
1. On the **Review + connect** page, select **Add** now. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-review-create-success.png" alt-text="Screenshot that shows the Review and create page after it successfully created resources." lightbox="./media/azure-event-hubs-source-connector/extended-review-create-page.png":::            
::: zone-end

