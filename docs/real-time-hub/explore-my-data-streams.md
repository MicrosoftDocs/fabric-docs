---
title: Explore my streams in Fabric Real-Time hub
description: This article shows how to explore the data streams you brought into Fabric Real-Time hub. It provides details on My streams in the Real-Time hub user interface.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 08/25/2024
---

# Explore My streams in Fabric Real-Time hub (preview)

When you navigate to Real-Time hub in Fabric, you can view data streams in different ways. For more information, see [Explore streams in Fabric Real-Time hub (preview)](explore-data-streams.md). This article covers the **My streams** page, which allows you to view only the data streams that you brought into Fabric.

[!INCLUDE [preview-note](./includes/preview-note.md)]

:::image type="content" source="media/explore-my-data-streams/hub-my-streams-menu.png" alt-text="Screenshot that shows the Real-Time hub My streams page."  lightbox="./media/explore-my-data-streams/hub-my-streams-menu.png" :::

## My streams page

### Columns

The **My streams** page has the following columns:

| Column | Description |
| ------ | ----------- |
| Name | Name of the stream or KQL table. |
| Item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Location | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |

:::image type="content" source="media/explore-my-data-streams/hub-my-streams-menu-columns.png" alt-text="Screenshot that highlights the Real-Time hub My streams page column names."  lightbox="media/explore-my-data-streams/hub-my-streams-menu-columns.png":::

### Filters

The following filters are available at the top for you to narrow down easily to the desired stream:

| Filter | Description |
| ------ | --------- |
| Stream type | You can filter on the stream type. Either stream or table. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Location | You can filter on the desired workspace name. |

:::image type="content" source="./media/explore-my-data-streams/real-time-hub-my-data-streams-filters.png" alt-text="Screenshot that shows the filters on the Real-Time hub All data streams page." lightbox="./media/explore-my-data-streams/real-time-hub-my-data-streams-filters.png":::

### Search

You can also search your streams/events using the search bar by typing in the name of stream.

:::image type="content" source="./media/explore-my-data-streams/real-time-hub-my-data-streams-search.png" alt-text="Screenshot that shows the search box on the Real-Time hub All data streams page." lightbox="./media/explore-my-data-streams/real-time-hub-my-data-streams-search.png":::

### Actions

Here are the actions available on streams from eventstreams in the **My streams** page. Move the mouse over the data stream, select **... (ellipsis)** to see the actions.

| Action | Description |
| ------ | ----------- |
| Open eventstream | Open parent eventstream of the stream. After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. |
| Endorse | Endorse parent eventstream of the stream. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/explore-my-data-streams/real-time-hub-my-data-streams-actions.png" alt-text="Screenshot that shows the actions available on streams in the Real-Time hub All data streams page." lightbox="./media/explore-my-data-streams/real-time-hub-my-data-streams-actions.png":::

Here are the actions available on a KQL table in the My streams page.

| Action | Description |
| ------ | ----------- |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. For more information, see [Endorse data streams](endorse-data-streams.md). |

:::image type="content" source="./media/explore-my-data-streams/real-time-hub-kql-table-actions.png" alt-text="Screenshot that shows the actions available on KQL tables in the Real-Time hub All data streams page." lightbox="./media/explore-my-data-streams/real-time-hub-kql-table-actions.png":::

## Related content

- [View data stream details](view-data-stream-details.md)
- [Preview data streams](preview-data-streams.md)
- [Endorse data streams](endorse-data-streams.md)
- [Explore fabric events](explore-fabric-events.md)
