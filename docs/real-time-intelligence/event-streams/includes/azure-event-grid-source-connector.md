---
title: Azure Event Grid connector for Fabric eventstreams
description: The include file has common content for configuring an Azure Event Grid connector for Fabric eventstreams and real-time hub.
ms.topic: include
ms.date: 03/19/2025
---

On the **Configure connection settings** page, follow these steps:

1. For **Subscription**, select the Azure subscription that has the Event Grid namespace.

1. For **Namespace name**, select your Event Grid namespace from the dropdown list.

1. The contents of **Namespace topic** section vary depending on whether MQTT is enabled:

    - If MQTT isn't enabled for the namespace topic, create a new topic or select an existing topic.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings.png" alt-text="Screenshot that shows configuration settings for an Azure Event Grid namespace when MQTT isn't enabled." :::

    - If the namespace has MQTT enabled, a topic, and routing enabled, select the subscription and the namespace name.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-routing.png" alt-text="Screenshot that shows configuration settings for an Event Grid namespace when MQTT and routing are enabled." :::

    - If the namespace has MQTT enabled but routing isn't enabled for the namespace, select the subscription, the namespace name, and namespace topic options.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-no-routing.png" alt-text="Screenshot that shows configuration settings for an Azure Event Grid namespace when MQTT is enabled but routing isn't enabled." :::

1. If you're using the real-time hub, follow these steps:

    1. In the **Stream details** section to the right, select the Fabric workspace where you want to save the eventstream.
    1. For **Eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Event Grid namespace as a source.
    1. The **Stream name** value is automatically generated for you by appending **-stream** to the name of the eventstream. This stream appears on the real-time hub's **All data streams** page when the wizard finishes.  

    :::image type="content" source="./media/azure-event-grid-source-connector/stream-name.png" alt-text="Screenshot that shows the stream details section for the Event Grid namespace." :::

1. If you're using the eventstream editor to add an Event Grid namespace as a source to an eventstream, select the pencil button under **Source name**. Then enter a source name.

1. Select **Next** at the bottom of the page.

1. On the **Review + connect** page, review your settings, and then select **Connect**.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Event Grid namespace.":::

    The following example shows what the page looks like if both MQTT and routing are enabled for the namespace.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt.png" alt-text="Screenshot that shows the page for reviewing and connecting with MQTT and routing enabled.":::

    The following example shows what the page looks like if MQTT is enabled for the namespace but routing isn't enabled.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt-no-routing.png" alt-text="Screenshot that shows the page for reviewing and connecting with MQTT enabled but routing not enabled.":::
