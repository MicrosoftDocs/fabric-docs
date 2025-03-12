---
title: Add Azure Cosmos DB CDC as source in Real-Time hub
description: This article describes how to add Azure Cosmos DB Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
  - references_regions
ms.date: 11/18/2024
---

# Add Azure Cosmos DB CDC as source in Real-Time hub

This article describes how to add **Azure Cosmos DB for NoSQL** Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

The Azure Cosmos DB Change Data Capture (CDC) source connector lets you capture a snapshot of the current data in an Azure Cosmos DB database. The connector then monitors and records any future row-level changes to this data. Once the changes are captured in a stream, you can process this CDC data in real-time and send it to different destinations within Fabric for further processing or analysis.

[!INCLUDE [new-sources-regions-unsupported](../real-time-intelligence/event-streams/includes/new-sources-regions-unsupported.md)]

[!INCLUDE [azure-cosmos-db-cdc-source-prerequisites-connection-details](../real-time-intelligence/event-streams/includes/azure-cosmos-db-cdc-source-prerequisites-connection-details.md)]

## Get events from an Azure Cosmos DB CDC

You can get events from an Azure Cosmos DB CDC into Real-Time hub in one of the ways:

- [Using the **Add source** experience](#data-sources-page)
- [Using the **Microsoft sources** page](#microsoft-sources-page)

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section.

## Microsoft sources page

1. In Real-Time hub, select **Microsoft sources**.
1. In the **Source** drop-down list, select **Azure Cosmos DB (CDC)**.
1. For **Subscription**, select an **Azure subscription** that has the resource group with your Cosmos DB account.
1. For **Resource group**, select a **resource group** that has your Cosmos DB account.
1. For **Region**, select a location where your Cosmos DB is located.
1. Now, move the mouse over the name of the Cosmos DB CDC source that you want to connect to Real-Time hub in the list of databases, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources page with filters to show Cosmos DB CDC and the connect button.":::

    To configure connection information, use steps from the [Add Azure Cosmos DB CDC as a source](#add-azure-cosmos-db-cdc-as-a-source) section. Skip the first step of selecting Azure Cosmos DB CDC as a source type in the Add source wizard.

## Add Azure Cosmos DB CDC as a source

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/new-connection-link.png" alt-text="Screenshot that shows the Add source wizard Connect page. with the **New connection** link highlighted." lightbox="./media/add-source-azure-cosmos-db-cdc/new-connection-link.png":::
1. In the **Connection settings** section, specify the **Cosmos DB endpoint**. Enter the URI or endpoint for your Cosmos DB account that you copied from the Azure portal.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." :::
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
    1. In the **Stream details** section to the right, select the Fabric **workspace** where you want to save the eventstream that the Wizard is going to create.
    1. For **eventstream name**, enter a name for the eventstream. The wizard creates an eventstream with the selected Azure Cosmos DB CDC as a source.
    1. The **Stream name** is automatically generated for you by appending **-stream** to the name of the eventstream. You can see this stream on the Real-time hub **All data streams** page when the wizard finishes.
    1. Select **Next**.

        :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/connect-page-filled.png" alt-text="Screenshot that shows the filled Add source wizard Connect page." lightbox="./media/add-source-azure-cosmos-db-cdc/connect-page-filled.png":::         
1. On the **Review + connect** screen, review the summary, and then select **Create source**.

      :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/review-create-page.png" alt-text="Screenshot that shows the filled Add source wizard Review + connect page." lightbox="./media/add-source-azure-cosmos-db-cdc/review-create-page.png":::         

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure Cosmos DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-cosmos-db-cdc/review-create-success.png":::
1. In Real-Time hub, select **All data streams**. To see the new data stream, refresh the **All data streams** page.

    :::image type="content" source="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-cosmos-db-cdc/verify-data-stream.png":::

    For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
