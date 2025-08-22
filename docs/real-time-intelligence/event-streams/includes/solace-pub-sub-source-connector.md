---
title: Solace PubSub+ connector for Fabric event streams
description: The include file has the common content for configuring a Solace PubSub+ connector for Fabric event streams and Real-Time hub. 
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 03/14/2025
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/solace-pub-sub-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/solace-pub-sub-source-connector/new-connection-button.png":::     

    If there's an existing connection to your Solace PubSub+ source, select that existing connection. 
1. In the **Connection settings** section, follow these steps:
    1. For Solace PubSub+ broker URL, enter the SMF URI, starting with `tcp://` or `ssl://`. 

        > [!NOTE]
        > The Solace PubSub+ source currently supports both the PLAIN-TEXT Solace Message Format (SMF) protocol and secured SMF over TLS/SSL between your Solace PubSub+ broker and Eventstream.
    1. For **Connection name**, enter a name for the connection to the Solace PubSub+. 
    1. Enter the **Username** and **Password** for the Solace PubSub+ client. 

        :::image type="content" source="./media/solace-pub-sub-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section.":::  
    1. Select **Connect**. 
1. Now, on the Connect page of the wizard, select a **Solace PubSub+ Type**: **Queue** or **Topic**.
    - If you selected **Queue** as the Solace PubSub+ type, make sure the queue exists, and enter the **Queue name**. 
    
        > [!NOTE]
        > If you aren't the owner of the queue, ensure you have the appropriate permission, specifically Consume, Modify Topic and Delete are valid, while No Access and Read Only don't work. 
    - If you selected **Topic**, enter the **Topic name**. You can enter multiple topic names separated by commas.  
1. Enter the **Message vpn name**. Ensure you have appropriate permissions on the Message VPN.
1. Then, select **Next**

    :::image type="content" source="./media/solace-pub-sub-source-connector/configure-solace-pub-sub-source.png" alt-text="Screenshot that shows the Configure Solace PubSub+ data source section." lightbox="./media/solace-pub-sub-source-connector/configure-solace-pub-sub-source.png":::                
1. On the **Review + connect** page, review settings, and select **Add** or **Connect**. 
