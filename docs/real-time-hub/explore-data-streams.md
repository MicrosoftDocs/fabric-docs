---
title: Explore data streams in Fabric Real-Time hub
description: This article shows how to explore data streams in Fabric Real-Time hub. It provides details on the Data streams in the Real-Time hub user interface.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

# Explore streams in Fabric Real-Time hub (preview)
When you navigate to Real-Time hub in Fabric, you can view all the data streams that are present in Fabric. There are three tabs in the hub. This article covers the **Data streams** tab of the Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

| Tab | Description |
| --- | ----------- | 
| Data streams | You see all data streams that are actively running in Fabric that you have access to. The list includes streams from Fabric eventstreams and KQL tables that you have access to. | 
| Microsoft sources | You see all Microsoft sources that you have access to and connect to Fabric. The current supported Microsoft sources are: <ul><li>Azure Event Hubs</li><li>Azure IoT Hub</li><li>Azure SQL DB Change Data Capture (CDC)</li><li>Azure Cosmos DB CDC</li><li>PostgreSQL DB CDC</li><li>MySQL Database CDC</li></ul> |
| Fabric events | You can monitor and react to the following events: <ul><li>Fabric Workspace Item events</li><li>Azure Blob Storage events</li></ul><p>These events can be used to trigger other actions or workflows, such as invoking a data pipeline or sending a notification via email. You can also send these events to other destinations via eventstreams.</p> |

:::image type="content" source="./media/explore-data-streams/real-time-hub.png" alt-text="Screenshot that shows the Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub.png":::

## Data streams tab

### Columns
The Data streams tab has the following columns: 

| Column | Description |
| ------ | ----------- | 
| Name | Name of the stream or KQL table. |
| Item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Owner | Name of owner of the parent artifact. |
| Location | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |

:::image type="content" source="./media/explore-data-streams/real-time-hub-data-streams-columns.png" alt-text="Screenshot that highlights the column names on the Data streams tab of Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-data-streams-columns.png":::


### Filters
The following filters are available at the top for you to narrow down easily to the desired stream: 

| Filter | Description | 
| ------ | --------- | 
| Owner | You can filter on the name of the owner of the parent artifact. For a stream, it's the owner of the parent eventstream. For a KQL table, it's owner of the parent KQL database. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. | 
| Location | You can filter on the desired workspace name. |

:::image type="content" source="./media/explore-data-streams/real-time-hub-data-streams-filters.png" alt-text="Screenshot that shows the filters on the Data streams tab of Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-data-streams-filters.png":::

### Search
You can also search your streams/events using the search bar by typing in the name of stream. 

:::image type="content" source="./media/explore-data-streams/real-time-hub-data-streams-search.png" alt-text="Screenshot that shows the search box on the Data streams tab of the Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-data-streams-search.png":::

### Actions 
Here are the actions available on streams from eventstreams in the Data streams tab. Move the mouse over the data stream, select **... (ellipsis)** to see the actions. 

| Action | Description |
| ------ | ----------- |
| Preview this data | Preview the data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/explore-data-streams/real-time-hub-data-streams-actions.png" alt-text="Screenshot that shows the actions available on streams in the Data streams tab of Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-data-streams-actions.png":::


Here are the actions available on a KQL table in the Data streams tab.

| Action | Description |
| ------ | ----------- |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/explore-data-streams/real-time-hub-kql-table-actions.png" alt-text="Screenshot that shows the actions available on KQL tables in the Data streams tab of Real-Time hub." lightbox="./media/explore-data-streams/real-time-hub-kql-table-actions.png":::


## Related content

- [View data stream details](view-data-stream-details.md)
- [Preview data streams](preview-data-streams.md)
- [Endorse data streams](endorse-data-streams.md)
- [Explore fabric events](explore-fabric-events.md)
