---
title: Get events from Azure Data Explorer database
description: This article describes how to get events from an Azure Data Explorer database table into Fabric Real-Time hub. 
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 12/22/2025
---

# Get events from Azure Data Explorer database table into Fabric Real-Time hub
This article describes how to get events from an Azure Data Explorer database table into Fabric Real-Time hub.

[!INCLUDE [azure-data-explorer-description-prerequisites](../real-time-intelligence/event-streams/includes/azure-data-explorer-description-prerequisites.md)]


## Get events from an Azure Data Explorer table
You can get events from an Azure Data Explorer table into Real-Time hub using the [**Data sources** page](#data-sources-page).

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Add data** page, select the **Microsoft** category at the top, and then select **Connect** on the **Azure Data Explorer DB** tile. 

    :::image type="content" source="./media/add-source-azure-data-explorer-database/select-azure-data-explorer-database.png" alt-text="Screenshot that shows the selection of Azure Data Explorer database as the source type in the Data sources page." lightbox="./media/add-source-azure-data-explorer-database/select-azure-data-explorer-database.png":::

## Configure and connect to the Azure Data Explorer table
[!INCLUDE [azure-data-explorer-connector](../real-time-intelligence/event-streams/includes/azure-data-explorer-connector.md)]

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure Data Explorer table as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-data-explorer-database/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-data-explorer-database/review-create-success.png":::
2. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
