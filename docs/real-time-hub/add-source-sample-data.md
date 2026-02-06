---
title: Get events from sample data sources
description: This article describes how to get events from sample data sources.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 07/16/2025
---

# Get events from sample data sources into Real-Time hub

This article describes how to get events from sample data sources into Real-Time hub.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add sample data as a source

1. On the **Data sources** page, select **Samples** from categories at the top.
1. Select **Connect** on a sample scenario tile (for example, Bicycle rentals) on the page.

    :::image type="content" source="./media/add-source-sample-data/select-sample-data.png" alt-text="Screenshot that shows the selection of Sample data as the source type in the Connect to data source page." lightbox="./media/add-source-sample-data/select-sample-data.png":::
1. On the **Connect** page, for **Source name**, enter a name for the source.
1. In the **Stream details** section of the right pane, do these steps:
    1. Select the **workspace** where you want to save the connection.
    1. Enter a **name for the eventstream** to be created for you.
    1. Name of the **stream** for Real-Time hub is automatically generated for you. 

        :::image type="content" source="./media/add-source-sample-data/stream-details.png" alt-text="Screenshot that shows the right pane with Stream details section of the Connect page." lightbox="./media/add-source-sample-data/stream-details.png":::                
1. Select **Next**. 
1. On the **Review + connect** page, review the summary, and then select **Create source**.

    :::image type="content" source="./media/add-source-sample-data/review-create-page.png" alt-text="Screenshot that shows the Review + connect page." lightbox="./media/add-source-sample-data/review-create-page.png":::                

## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected sample data source. To close the wizard, select **Finish** at the bottom of the page. 

    :::image type="content" source="./media/add-source-sample-data/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-sample-data/review-create-success.png":::                
1. Confirm that you see the newly created data stream on the **My data streams** page. 

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
