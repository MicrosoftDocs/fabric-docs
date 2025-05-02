---
title: Azure Data Explorer connector for Fabric event streams
description: The include files has the common content for configuring an Azure Data Explorer connector for Fabric event streams and Real-Time hub. 
ms.author: spelluru
author: spelluru
ms.topic: include
ms.custom:
ms.date: 03/21/2025
---

1. On the **Configure connection settings** page, select **New connection**. 

    :::image type="content" source="./media/azure-data-explorer-connector/new-connection-button.png" alt-text="Screenshot that shows the Configuration connection settings page.":::
1. In the **Connection settings** section of the popup window, do these steps:
    1. For **Cluster**, enter the Cluster URI of your Azure Data Explorer cluster. 
    1. For **Database**, enter your database name. 
    1. For **Table**, enter single or multiple table names.  
    
        > [!NOTE]
        > Database and table in the cloud connection aren't mandatory, as you can also specify them later in the next step of the wizard. The Cluster is required.
    1. For **Connection name**, enter a name for the connection to the Azure Data Explorer Cluster.  
    1. For Authentication kind, only Organizational account is currently supported. 
    1. Then, select **Connect**. 
    
        :::image type="content" source="./media/azure-data-explorer-connector/connection-settings-credentials.png" alt-text="Screenshot that shows the connection settings and credentials.":::        
1. Now, on **Configure connection settings** page, follow these steps if you didn't specify the database and tables in the connection settings earlier. 
    1. For **Database**, enter the name of your database. 
    1. Then, enter names of **tables** (one or more). 
        
        > [!NOTE]
        > The Database and table names configured in this step take precedence over the settings you set in the cloud connection settings you configured earlier.    

        :::image type="content" source="./media/azure-data-explorer-connector/connection-settings-done.png" alt-text="Screenshot that shows the connection settings completed.":::                
1. If you're using **Real-Time hub**, follow these steps. Otherwise, move to the next step.
    1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure Database Explorer table as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.  

        :::image type="content" source="./media/azure-data-explorer-connector/stream-name.png" alt-text="Screenshot that shows the Stream details section for the Azure Data Explorer connection settings." :::             
1. If you're using the **Eventstream editor** to add an Azure Data Explorer database table as a source to an event stream, select **pencil** button under **Source name**, and enter a source name. 

    :::image type="content" source="./media/azure-data-explorer-connector/stream-details.png" alt-text="Screenshot that shows the Stream details section.":::                
1. Select **Next** at the bottom of the page.
1. On the **Review + connect** page, review settings, and select **Connect** (Fabric Real-Time hub) or **Add** (Fabric Eventstream).

    :::image type="content" source="./media/azure-data-explorer-connector/review-connect-page.png" alt-text="Screenshot that shows the Review + connect page for Azure Data Explorer connector.":::        
