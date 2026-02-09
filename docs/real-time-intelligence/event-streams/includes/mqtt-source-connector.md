---
title: MQTT connector for Fabric event streams
description: The include files has the common content for configuring an MQTT connector for Fabric event streams and Real-Time hub. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: include
ms.custom:
ms.date: 01/26/2026
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/mqtt-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/mqtt-source-connector/new-connection-button.png":::

    If there's an existing connection to your MQTT source, select that existing connection.
1. To create a new cloud connection, enter the following information:

    :::image type="content" source="./media/mqtt-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section.":::  

    1. **MQTT Broker URL**: enter the URL of your MQTT broker. The supported protocols are `ssl://`, `wss://`, and `tcp://`.

        > [!NOTE]
        > The MQTT source supports TLS/SSL-secured MQTT connections between your MQTT broker and Eventstream.
        > TLS/SSL connections are only supported if the server certificate is signed by a Certificate Authority (CA) included in the [trusted CA list](https://github.com/microsoft/fabric-event-streams/blob/main/References/certificate-authority-list/trusted-ca-list.txt).

    1. **Connection name**: enter a name for the connection to the MQTT.
    1. Enter the **Username** and **Password** of your MQTT broker.
    1. Select **Connect**.

1. For **Topic name**, enter the MQTT topic to subscribe to. The connector supports only a single topic.
1. For **Version**, select either **V5** or **V3** based on your MQTT broker's protocol version.
1. Select **Next** to proceed to the **Review + connect** page. Review your configuration settings, and then select **Add** to connect to your MQTT source.
