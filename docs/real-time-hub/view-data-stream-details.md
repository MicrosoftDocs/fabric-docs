---
title: View details of streams in Fabric Real-Time hub
description: This article shows how to view details of for streams in Fabric Real-Time hub in either detail view or a table view.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

# View details of data streams in Fabric Real-Time hub (preview)
You can view details of a data stream by selecting the data stream in the **Data streams** tab of the **Real-Time hub**.  

[!INCLUDE [preview-note](./includes/preview-note.md)]

## View details of a stream
On the **Data streams** page, select the stream whose parent is an eventstream.

:::image type="content" source="./media/view-data-stream-details/stream-details.png" alt-text="Screenshot that shows the Stream detail view page." lightbox="./media/view-data-stream-details/stream-details.png":::


### Stream metadata section
In the **Stream metadata** section in the top-left corner, you see the following details.

- **Name** of the stream.
- **Owner** of the parent eventstream.
- **Location** or workspace of the stream.
- **Type**, which is **Stream** in this case. 

    :::image type="content" source="./media/view-data-stream-details/stream-metadata.png" alt-text="Screenshot that shows the Stream metadata in the Stream detail view page.":::

### Stream profile section
In the **Stream profile** section to the right, you can: 

- See insights of the stream with following metrics. These insights help to understand data flowing through the stream. 
    - **Incoming messages**
    - **Outgoing messages**
    - **Incoming bytes**
    - **Outgoing bytes**
    
    Select **... (ellipsis)** in the right corner of the **Insights** section. You can enable or disable viewing of these metrics. 
    
    :::image type="content" source="./media/view-data-stream-details/select-metrics.png" alt-text="Screenshot that shows Metrics selection popup window in the Stream profile section.":::    
- Filter these insights based on time:  Last 6 hours, 12 hours, 24 hours, and 7 days. 
- Preview the data in your stream by selecting **Preview data** link. The following sample image shows two metrics that were selected (Incoming messages and Outgoing messages).

    :::image type="content" source="./media/view-data-stream-details/stream-profile.png" alt-text="Screenshot that shows the Stream profile pane of the Stream detail view page.":::


### Actions available
On the top of the stream details page, you can take the following actions on the stream: 

| Action | Description |
| ------ | ----------- |
| Preview this data | Preview the data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md?branch=release-build-fabric#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |
| Set alert | The eventstream has a stream output on which you can [set alerts](set-alerts-data-streams.md). For more information, see [Set alerts on streams in Real-Time hub](set-alerts-data-streams.md). |

:::image type="content" source="./media/view-data-stream-details/stream-actions.png" alt-text="Screenshot that shows the actions available in the Stream detail view page." lightbox="./media/view-data-stream-details/stream-actions.png" :::


### See what already exists section
This section shows three relationships of the stream: Upstream, Parent, and Downstream. 

- **Upstream** – Upstream the connectors from which data is flowing into the stream. 
- **Parent** – It's the parent eventstream of the selected stream. 
- **Downstream** – Destinations of the selected stream. 

    :::image type="content" source="./media/view-data-stream-details/stream-see-what-already-exists.png" alt-text="Screenshot that shows the See what already exists section on the Stream detail view page." :::


## View details of a Kusto Query Language (KQL) table
On the **Data streams** page, select a KQL table to see its details.

:::image type="content" source="./media/view-data-stream-details/kql-table-details.png" alt-text="Screenshot that shows the detail view page for a KQL table in the data streams." lightbox="./media/view-data-stream-details/kql-table-details.png":::

### Stream metadata section
In this section of the page, you see the following information:

- **Name** of the KQL table.
- **Owner** of the parent KQL Database
- **Location** or workspace of the table 
- **Type**, which is set to **KQL table** in this case. 

    :::image type="content" source="./media/view-data-stream-details/kql-table-metadata.png" alt-text="Screenshot that shows the KQL table metadata in the Stream detail view page.":::

### Insights section
In this section of the page, you see the amount of data in the table over time. 

:::image type="content" source="./media/view-data-stream-details/kql-table-insights.png" alt-text="Screenshot that shows the KQL table insights in the Stream detail view page.":::

### Actions available
On the top of the KQL table details page, you can take the following actions on the KQL table:

| Action | Description |
| ------ | ----------- |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |


:::image type="content" source="./media/view-data-stream-details/kql-table-actions.png" alt-text="Screenshot that shows the actions available for a KQL table in the detail view page.":::

### See what already exists section

This section shows two relationships of the table: Upstream, Parent. 

- **Upstream** – Connectors from which data is flowing into the table. 
- **Parent** – It's the KQL database that has the selected KQL table.

    :::image type="content" source="./media/view-data-stream-details/kql-table-see-what-already-exists.png" alt-text="Screenshot that shows the See what already exists section in the KQL table detail view page.":::

## Related content

- [Explore data streams](explore-data-streams.md)
- [Preview data streams](preview-data-streams.md)
- [Endorse data streams](endorse-data-streams.md)
- [Explore fabric events](explore-fabric-events.md)
