---
title: Add Azure Cosmos DB CDC as source in Real-Time hub
description: This article describes how to add Azure Cosmos DB Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Add Azure Cosmos DB CDC as source in Real-Time hub
This article describes how to add Azure Cosmos DB Change Data Capture (CDC) as an event source in Fabric Real-Time hub. The Azure Cosmos DB Change Data Capture (CDC) source connector lets you capture a snapshot of the current data in an Azure Cosmos DB database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in a stream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- Access to an Azure Cosmos DB account and database.

## Get events from an Azure Cosmos DB CDC
You can get events from an Azure Cosmos DB CDC into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab


[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section. 

## Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure Cosmos DB (CDC)**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your Cosmos DB account. 
1. For **Resource group**, select a **resource group** that has your Cosmos DB account.
1. For **Region**, select a location where your Cosmos DB is located. 
1. Now, move the mouse over the name of the Cosmos DB CDC source that you want to connect to Real-Time hub in the list of databases, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show Cosmos DB CDC and the connect button.":::

    To configure connection information, use steps from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section. Skip the first step of selecting Azure Cosmos DB CDC as a source type in the Get events wizard. 

## Add Azure Cosmos DB CDC as a source

1. On the **Select a data source** screen, select **Azure Cosmos DB (CDC)**.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/select-azure-cosmos-db-cdc.png" alt-text="Screenshot that shows the Select a data source page with Azure Cosmos DB (CDC) selected.":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the **New connection** link highlighted." lightbox="./media/add-source-azure-cosmos-db-cdc/new-connection-link.png"::: 
1. In the **Connection settings** section, specify the **Cosmos DB endpoint**. 

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." ::: 

    To get the endpoint URI for the Cosmos DB endpoint, follow these steps:
    1. Navigate to the Cosmos DB account in the Azure portal. 
    1. Select **Keys** under **Settings** on the left navigation menu.
    1. To copy the URI to the clipboard, select the **Copy** button next to the **URI**. 
    1. To copy the primary key for the Azure Cosmos DB account, select the **Show** button for the **PRIMARY KEY**, and the select the **Copy** button. 

        :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/uri-access-key.png" alt-text="Screenshot that shows how to get the URI for the Azure Cosmos DB endpoint." ::: 
1. Expand **Advanced options**, and follow these steps:
    1. For **Number of retries**, specify the maximum number of times the connector should retransmit a request to the Cosmos DB database if the request fails from a recoverable error. 
    1. For **Enable AVERAGE function pass down**, specify whether the connector should pass down of the AVG aggregate function to the Cosmos DB database. 
    1. For **Enable SORT pass down for multiple columns**, specify whether the connector should allow multiple columns to be passed down to Cosmos DB database when specified in the ORDER BY clause of the SQL query. 
    
        :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connection-advanced-options.png" alt-text="Screenshot that shows the advanced options to configure the Azure Cosmos DB connector." :::         
1. Scroll down, and in the **Connection credentials** section, follow these steps.
    1. Select an existing connection and keep the default **Create new connection** option. 
    1. To create a connection, enter the following values:
        1. For **Connection name**, enter a name for the connection. 
        1. For **Authentication kind**, select **Account key**. 
        1. For **Account key**, enter the key value you saved earlier. 
        1. Select **Connect**.
   
            :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." ::: 
1. Now, on the **Connect** page, do these steps:
    1. Specify the **Container ID** of the container in your Azure Cosmos DB account. 
    1. 
    1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create. 
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure Cosmos DB CDC as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You see this stream on the **Data streams** tab of Real-Time hub when the wizard finishes. 
    1. Select **Next**. 

        :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connect-page-filled.png" alt-text="Screenshot that shows the Connect page of the Get events wizard filled." lightbox="./media/add-source-azure-cosmos-db-cdc/connect-page-filled.png":::         
1. On the **Review and create** screen, review the summary, and then select **Create source**.

      :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/review-create-page.png" alt-text="Screenshot that shows the Review and create page of the Get events wizard filled." lightbox="./media/add-source-azure-cosmos-db-cdc/review-create-page.png":::         

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure Cosmos DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/review-create-success.png" alt-text="Screenshot that shows the Review and create page after successful creation of the source." lightbox="./media/add-source-azure-cosmos-db-cdc/review-create-success.png":::
1. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you as shown in the following image.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab of Real-Time hub with the stream you just created." lightbox="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Next step
The eventstream has a stream output on which you can [set alerts](set-alerts-data-streams.md). After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md?branch=release-build-fabric#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. For more information, see [Consume data streams](consume-data-streams.md).