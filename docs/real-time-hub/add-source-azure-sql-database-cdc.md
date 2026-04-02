---
title: Azure SQL Database CDC Source in Fabric Real-Time hub
description: This article describes how to add an Azure SQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
---

# Add Azure SQL Database Change Data Capture (CDC) as source in Real-Time hub

This article describes how to get events from Azure SQL Database Change Data Capture (CDC) into Fabric Real-Time hub. 

[!INCLUDE [azure-sql-database-change-data-capture-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-sql-database-change-data-capture-connector-prerequisites.md)]


## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Microsoft sources** category at the top, and then select **Connect** on the **Azure SQL DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/select-azure-sql-database-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL Database (CDC) as the source type in the Data sources page." lightbox="./media/add-source-azure-sql-database-cdc/select-azure-sql-database-cdc.png":::
    
    Use instructions from the [Connect to an Azure SQL Database CDC source](#connect-to-an-azure-sql-database-cdc-source) section.


## Connect to an Azure SQL Database CDC source

[!INCLUDE [azure-sql-database-change-data-capture-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-sql-database-change-data-capture-connector-configuration.md)
]
## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure SQL Database CDC as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-sql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
    

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

