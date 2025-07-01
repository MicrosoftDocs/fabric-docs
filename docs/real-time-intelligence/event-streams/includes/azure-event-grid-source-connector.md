---
title: Azure Event Grid connector for Fabric event streams
description: The include files has the common content for configuring an Azure Event Grid connector for Fabric event streams and Real-Time hub. 
ms.author: spelluru
author: spelluru
ms.topic: include
ms.custom:
ms.date: 03/19/2025
---

On the **Configure connection settings** page, follow these steps:

1. For **Subscription**, select the Azure subscription that has the Event Grid namespace. 
1. For **Namespace name**, select your Event Grid namespace from the dropdown list. 
1. The **Namespace topic** section you see varies depending on whether Message Queuing Telemetry Transport (MQTT) is enabled or not. 
    - If MQTT isn't enabled for the namespace topic, create a new topic or select an existing topic. 

        :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings.png" alt-text="Screenshot that shows the configuration settings for the Azure Event Grid namespace." :::
    - If the namespace has MQTT enabled, a topic, and routing enabled: 

        :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-routing.png" alt-text="Screenshot that shows the configuration settings for the Azure Event Grid namespace when MQTT and routing are enabled." :::
    - If the namespace has MQTT enabled, but routing isn't enabled for the namespace:
    
        :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-no-routing.png" alt-text="Screenshot that shows the configuration settings for the Azure Event Grid namespace when MQTT is enabled but routing isn't enabled." :::
1. If you're using Real-Time hub, follow these steps:
    1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Event Grid namespace as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.  

        :::image type="content" source="./media/azure-event-grid-source-connector/stream-name.png" alt-text="Screenshot that shows the Stream details section for the Event Grid namespace." :::             
1. If you're using the Eventstream editor to add an Event Grid namespace as a source to an event stream, select **pencil** button under **Source name**, and enter a source name. 
1. Select **Next** at the bottom of the page.
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page.png" alt-text="Screenshot that shows the Review + connect page for Azure Event Grid connector.":::        

    If the namespace has both MQTT and routing enabled:

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt.png" alt-text="Screenshot that shows the Review + connect page for Azure Event Grid namespace with MQTT and routing enabled.":::        

    If the namespace has MQTT enabled, but routing isn't enabled:

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt-no-routing.png" alt-text="Screenshot that shows the Review + connect page for Azure Event Grid namespace with MQTT, but routing isn't enabled.":::            
