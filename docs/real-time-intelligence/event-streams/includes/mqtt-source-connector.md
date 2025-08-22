---
title: MQTT connector for Fabric event streams
description: The include files has the common content for configuring an MQTT connector for Fabric event streams and Real-Time hub. 
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 03/14/2025
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/mqtt-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/mqtt-source-connector/new-connection-button.png":::     

    If there's an existing connection to your MQTT source, select that existing connection. 
1. In the **Connection settings** section, 
    1. For **MQTT Broker URL**, enter the URL of your MQTT broker, starting with `ssl://` or `tcp://`. 
    
        > [!NOTE]
        > The MQTT source currently supports both the secured MQTT over SSL/TLS and the PLAIN-TEXT MQTT protocol between your MQTT broker and eventstream.
    1. For **Connection name**, enter a name for the connection to the MQTT. 
    1. Enter the **Username** and **Password** for the MQTT broker. 

        :::image type="content" source="./media/mqtt-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section.":::  
    1. Select **Connect**. 
1. Now, on the Connect page of the wizard, you must enter a single **Topic name**. Multiple topics aren't supported yet. 
1. For **Version**, only MQTT **V5** is currently supported. 
1. Then, select **Next**

    :::image type="content" source="./media/mqtt-source-connector/configure-mqtt-source.png" alt-text="Screenshot that shows the Configure MQTT data source section." lightbox="./media/mqtt-source-connector/configure-mqtt-source.png":::                
1. On the **Review + connect** page, review settings, and select **Add** or **Connect**. 
