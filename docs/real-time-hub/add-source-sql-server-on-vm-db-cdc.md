---
title: SQL Server on VM DB (CDC) Source in Fabric Real-Time hub
description: This article describes how to add SQL Server on Virtual Machine (VM) Database (DB) Change Data Capture (CDC) as an event source in Fabric Real-Time hub.
ms.reviewer: anboisve
ms.topic: how-to
ms.date: 04/03/2026
author: spelluru
ms.author: spelluru
---

# Add SQL Server on VM DB (CDC) as source in Real-Time hub

This article describes how to add SQL Server on VM DB (CDC) as an event source in Fabric Real-Time hub.

[!INCLUDE [sql-server-on-virtual-machine-cdc-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/sql-server-on-virtual-machine-cdc-source-connector-prerequisites.md)]



## Get events from SQL Server on VM DB (CDC)

You can get events from a SQL Server on VM DB (CDC) into Real-Time hub using the [**Data sources**](#data-sources-page) page.

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Select SQL Server on VM DB (CDC) as a source

On the **Data sources** page, select **Database CDC** category at the top, and then select **Connect** on the **SQL Server on VM DB (CDC)** tile. 

:::image type="content" source="./media/add-source-sql-server-on-vm-db-cdc/select-sql-server-on-vm-db-cdc.png" alt-text="Screenshot that shows the selection of SQL Server on VM DB (CDC) as the source type in the Data sources page." lightbox="./media/add-source-sql-server-on-vm-db-cdc/select-sql-server-on-vm-db-cdc.png" :::

Use instructions from the [Add SQL Server on VM DB CDC as a source](#add-sql-server-on-vm-db-cdc-as-a-source) section.  


## Add SQL Server on VM DB CDC as a source

[!INCLUDE [sql-server-on-virtual-machine-cdc-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/sql-server-on-virtual-machine-cdc-source-connector-configuration.md)]
## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected SQL Server on VM DB (CDC) as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
1. In Real-Time hub, select **All data streams**. To see the new data stream, refresh the **All data streams** page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

