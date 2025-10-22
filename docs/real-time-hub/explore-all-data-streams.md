---
title: Explore All data streams in Fabric Real-Time hub
description: This article shows how to explore All data streams in Fabric Real-Time hub. It provides details on the All data streams page in the Real-Time hub user interface.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Explore All data streams in Fabric Real-Time hub

When you navigate to Real-Time hub in Fabric, you can view all data streams in the **Recent streaming data** section of the hub page. Data streams include Fabric eventstreams and Kusto Query Language (KQL) tables.

:::image type="content" source="media/explore-all-data-streams/hub-all-data-streams-menu.png" alt-text="Screenshot of the Real-Time hub All data streams page." lightbox="./media/explore-all-data-streams/hub-all-data-streams-menu.png":::

The following sections describe columns, filters, actions, and other options for the table. 

## Columns

| Column | Description |
| ------ | ----------- |
| Data | Name of the stream or KQL table. |
| Source item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Item owner | Name of owner of the parent artifact. |
| Workspace | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |

:::image type="content" source="./media/explore-all-data-streams/hub-all-data-streams-columns.png" alt-text="Screenshot that highlights the column names on the Real-Time hub All data streams page." lightbox="./media/explore-all-data-streams/hub-all-data-streams-columns.png":::

## Filters

The following filters are available at the top for you to narrow down easily to the desired stream:

| Filter | Description |
| ------ | --------- |
| Data type | You can filter on the data type. Either stream or table. |
| Item owner | You can filter on the name of the owner of the parent artifact. For a stream, it's the owner of the parent eventstream. For a KQL table, it's owner of the parent KQL database. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Workspace | You can filter on the desired workspace name. |

:::image type="content" source="media/explore-all-data-streams/hub-all-data-streams-filters.png" alt-text="Screenshot that highlights the Real Time hub All data streams page filters." lightbox="media/explore-all-data-streams/hub-all-data-streams-filters.png":::

## Search

You can also search your streams/events using the search bar by typing in the name of stream.

:::image type="content" source="./media/explore-all-data-streams/hub-all-data-streams-search.png" alt-text="Screenshot that shows the search box on the Real-Time hub All data streams page." lightbox="./media/explore-all-data-streams/hub-all-data-streams-search.png":::

## Actions

Here are the actions available on streams from eventstreams from the **All data streams** page. Move the mouse over the data stream, select **... (ellipsis)** to see the actions.

| Action | Description |
| ------ | ----------- |
| Preview data | Preview the data in the stream or derived stream. For more information, see [Preview data streams](preview-data-streams.md). |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/get-started-real-time-hub/data-streams-actions.png" alt-text="Screenshot that shows the actions available on a stream." lightbox="./media/get-started-real-time-hub/data-streams-actions.png":::

Here are the actions available on a KQL table from the **All data streams** page.

| Action | Description |
| ------ | ----------- |
| Explore data | Explore data in the KQL table. |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |
| Detect anomalies (Preview) | Detect anomalies in data stored in the KQL table. Follow steps from [How to set up anomaly detection](../real-time-intelligence/anomaly-detection.md#how-to-set-up-anomaly-detection).|
| Create real-time dashboard (Preview) |[Create a Real-Time Dashboard with Copilot](/fabric/fundamentals/copilot-generate-dashboard) based on data in the KQL table. |

:::image type="content" source="./media/get-started-real-time-hub/kql-table-actions.png" alt-text="Screenshot that shows the actions available on a KQL table stream." lightbox="./media/get-started-real-time-hub/kql-table-actions.png":::


## Related content

- [View data stream details](view-data-stream-details.md)
- [Preview data streams](preview-data-streams.md)
- [Endorse data streams](endorse-data-streams.md)
- [Explore fabric events](explore-fabric-events.md)
