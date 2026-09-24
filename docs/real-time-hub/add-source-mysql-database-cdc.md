---
title: Add MySQL Database CDC as source in Real-Time hub
description: This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 01/14/2026
---

# Add MySQL Database CDC as source in Real-Time hub

This article describes how to add MySQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub.

[!INCLUDE [mysql-database-cdc-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/mysql-database-cdc-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **MySQL Database (DB) Change Data Capture (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png" alt-text="Screenshot that shows the selection of MySQL DB (CDC) on the Data sources page." lightbox="./media/add-source-azure-mysql-database-cdc/select-mysql-db-cdc.png":::

    Use instructions from the [Add Azure MySQL Database CDC as a source](#add-azure-mysql-database-cdc-as-a-source) section.


## Add Azure MySQL Database CDC as a source

[!INCLUDE [mysql-database-cdc-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/mysql-database-cdc-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure MySQL DB CDC as a source. To close the wizard, select **Finish** or **X*** in the top-right corner of the page.

    :::image type="content" source="./media/add-source-azure-mysql-database-cdc/review-create-success.png" alt-text="Screenshot that shows the Review + connect page after successful creation of the source." lightbox="./media/add-source-azure-mysql-database-cdc/review-create-success.png":::
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

. 
## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

