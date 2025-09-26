---
title: Add Azure Event Hubs source to an eventstream
description: Learn how to add an Azure Event Hubs source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/25/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add Azure Event Hubs source to an eventstream
This article shows you how to add an Azure Event Hubs source to an eventstream. 

[!INCLUDE [select-view](./includes/select-view.md)]

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- You need to have appropriate permission to get event hub's access keys. If your event hub is within a protected network, [connect to it using a managed private endpoint](set-up-private-endpoint.md). Otherwise, ensure the event hub is publicly accessible and not behind a firewall.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Event Hubs** tile.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Get events wizard." lightbox="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png":::

## Configure Azure Event Hubs connector


::: zone pivot="enhanced-event-hubs-capabilities"
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/azure-event-hubs-source-connector/new-connection-button.png":::     

    If there's an existing connection to your Azure event hub, you select that existing connection as shown in the following image, and then move on to the step to configure **Data format** in the following steps.

    :::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::    
::: zone-end

::: zone pivot="standard-event-hubs-capabilities"  
1. On the **Connect** page, select **New connection**.

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
        1. On the **Event Hubs Namespace** page, select **Shared access policies** on the left navigation menu.
        1. Select the **access key** from the list. Note down the access key name.
        1. Select the copy button next to the **Primary key**. 

            :::image type="content" source="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png" alt-text="Screenshot that shows the access key for an Azure Event Hubs namespace." lightbox="./media/azure-event-hubs-source-connector/event-hubs-access-key-value.png":::            
1. Now, on the **Connect** page of wizard, for **Consumer group**, enter the name of the consumer group. By default, `$Default` is selected, which is the default consumer group for the event hub. 
1. For **Data format**, select a data format of the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  
1. In the **Stream details** pane to the right, select **Pencil** icon next to the source name, and enter a name for the source. This step is optional. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/source-name.png" alt-text="Screenshot that shows the source name in the Stream details section." lightbox="./media/azure-event-hubs-source-connector/source-name.png":::
1. Select **Next** at the bottom of the page. 
   
    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Connect page two for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::        
1. On the **Review and create** page, review settings, and select **Add**. 

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page for Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::        

::: zone-end

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## View updated eventstream

1. You see that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** in the bottom pane, which shows you preview of the data in the event hub. To implement this newly added Azure event hub, select **Publish** on the ribbon. 

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
1. After you complete these steps, the Azure event hub is available for visualization in the **Live view**. Select the **Event hub** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::


## Related content

For a list of supported sources, see [Add an event source in an eventstream](add-manage-eventstream-sources.md)

