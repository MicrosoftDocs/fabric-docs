---
title: Azure Event Grid connector for Fabric eventstreams
description: The include file has common content for configuring an Azure Event Grid connector for Fabric eventstreams and real-time hub.
ms.topic: include
ms.date: 04/01/2026
---

On the **Configure connection settings** page, follow these steps:

1. For **Subscription**, select the Azure subscription that has the Event Grid namespace.

1. For **Namespace name**, select your Event Grid namespace from the dropdown list.

1. The contents of the **Namespace topic** section vary depending on whether Message Queuing Telemetry Transport (MQTT) is enabled:

    - If MQTT isn't enabled for the namespace topic, create a new topic or select an existing topic.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings.png" alt-text="Screenshot that shows configuration settings for an Azure Event Grid namespace when MQTT isn't enabled." :::

    - If the namespace has MQTT enabled, a topic, and routing enabled, select the subscription and the namespace name.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-routing.png" alt-text="Screenshot that shows configuration settings for an Event Grid namespace when MQTT and routing are enabled." :::

    - If the namespace has MQTT enabled but routing isn't enabled for the namespace, select the subscription, the namespace name, and namespace topic options.

      :::image type="content" source="./media/azure-event-grid-source-connector/configuration-settings-mqtt-no-routing.png" alt-text="Screenshot that shows configuration settings for an Azure Event Grid namespace when MQTT is enabled but routing isn't enabled." :::


[!INCLUDE [stream-source-details](./stream-source-details.md)]

1. Select **Next** at the bottom of the page.

1. On the **Review + connect** page, review your settings, and then select **Add** (Eventstream) or **Connect** (Real-Time hub).

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Event Grid namespace.":::

    The following example shows what the page looks like if both MQTT and routing are enabled for the namespace.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt.png" alt-text="Screenshot that shows the page for reviewing and connecting with MQTT and routing enabled.":::

    The following example shows what the page looks like if MQTT is enabled for the namespace but routing isn't enabled.

    :::image type="content" source="./media/azure-event-grid-source-connector/review-connect-page-mqtt-no-routing.png" alt-text="Screenshot that shows the page for reviewing and connecting with MQTT enabled but routing not enabled.":::
