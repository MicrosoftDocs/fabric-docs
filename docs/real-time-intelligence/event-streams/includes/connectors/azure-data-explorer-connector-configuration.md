---
title: Azure Data Explorer connector for Fabric eventstreams
description: This file has the common content for configuring an Azure Data Explorer connector for Fabric eventstreams and real-time hub. 
ms.topic: include
ms.date: 04/01/2026
---

1. On the **Configure connection settings** page, select **New connection**.

    :::image type="content" source="./media/azure-data-explorer-connector/new-connection-button.png" alt-text="Screenshot that shows the page for configuration connection settings.":::
1. In the **Connection settings** section of the popup window, follow these steps:
    1. For **Cluster**, enter the URI of your Azure Data Explorer cluster.
    1. The **Database** and **Table name** boxes in the cloud connection are optional. Values entered in these boxes are ignored in this step. You can specify them in the next step of the wizard.
       > [!NOTE] 
       > The Eventstream Azure Data Explorer connector doesn't currently support custom queries. Any Azure Data Explorer query specified is ignored

    1. For **Connection name**, enter a name for the connection to the Azure Data Explorer cluster.  
    1. For **Authentication kind**, only **Organizational account** is currently supported.
    1. Select **Connect**.

    :::image type="content" source="./media/azure-data-explorer-connector/connection-settings-credentials.png" alt-text="Screenshot that shows connection settings and credentials.":::
1. On the **Configure connection settings** page, follow these steps if you didn't specify the database and tables in the connection settings earlier:
    1. In the **Database** box, enter the name of your database.
    1. In the **Enter table name(s)** box, enter either a single table name or multiple table names separated by commas.

        :::image type="content" source="./media/azure-data-explorer-connector/connection-settings-done.png" alt-text="Screenshot that shows completed connection settings.":::
1. If you're using a real-time hub, follow these steps. Otherwise, move to the next step.
    1. In the **Source details** section, select the Fabric workspace where you want to save the eventstream.
    1. For **Eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure Database Explorer table as a source.
    1. The **Stream name** value is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the real-time hub's **All data streams** page when the wizard finishes.  

        :::image type="content" source="./media/azure-data-explorer-connector/stream-name.png" alt-text="Screenshot that shows the section for source details in the Azure Data Explorer connection settings." :::

[!INCLUDE [stream-source-details](./stream-source-details.md)]

1. Select **Next** at the bottom of the page.
1. On the **Review + connect** page, review the settings, and then select **Add** (Eventstream) or **Connect** (Real-Time hub).

    :::image type="content" source="./media/azure-data-explorer-connector/review-connect-page.png" alt-text="Screenshot that shows the page for reviewing details and connecting an Azure Data Explorer connector.":::
