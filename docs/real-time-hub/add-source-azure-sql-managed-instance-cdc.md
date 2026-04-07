---
title: Add Azure SQL Managed Instance as source in Real-Time hub
description: This article describes how to add Azure SQL Managed Instance Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 01/14/2026
---

# Add Azure SQL Managed Instance (MI) database (DB) CDC as source in Real-Time hub

This article describes how to add Azure SQL Managed Instance CDC as an event source in Fabric Real-Time hub.

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-sql-managed-instance-cdc-source-connector-prerequisites.md)]

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **Azure SQL MI DB (CDC)** tile. 

    :::image type="content" source="./media/add-source-azure-sql-managed-instance-cdc/select-azure-sql-managed-instance-cdc.png" alt-text="Screenshot that shows the selection of Azure SQL Managed Instance CDC as the source type in the Data sources page." lightbox="./media/add-source-azure-sql-managed-instance-cdc/select-azure-sql-managed-instance-cdc.png":::
    
    Use instructions from the [Add Azure SQL Managed Instance CDC as a source](#add-azure-sql-managed-instance-cdc-as-a-source) section. 

## Add Azure SQL Managed Instance CDC as a source

[!INCLUDE [azure-sql-managed-instance-cdc-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-sql-managed-instance-cdc-source-connector-configuration.md)]

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Azure SQL MI DB CDC as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
1. You should see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

