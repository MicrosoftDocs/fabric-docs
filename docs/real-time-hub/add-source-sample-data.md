---
title: Get events from sample data sources
description: This article describes how to get events from sample data sources.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Get events from sample data sources into Real-Time hub
This article describes how to get events from sample data sources into Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites

- Access to the Fabric **premium workspace** with **Contributor** or higher permissions.

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add sample data as a source

1. On the **Select a data source** page, select **Sample data**. 

    :::image type="content" source="./media/add-source-sample-data/select-sample-data.png" alt-text="Screenshot that shows the selection of Sample data as the source type in the Get events wizard." lightbox="./media/add-source-sample-data/select-sample-data.png":::
1. On the **Connect** page, enter a **name for the source**.
1. Select one of the sample data sources from the drop-down list. 

    :::image type="content" source="./media/add-source-sample-data/sample-sources.png" alt-text="Screenshot that shows the sample data sources available." lightbox="./media/add-source-sample-data/sample-sources.png":::     
1. In the **Stream details** section of the right pane, do these steps:
    1. Select the **workspace** where you want to save the connection.
    1. Enter a **name for the eventstream** to be created for you.
    1. Name of the **stream** for Real-Time hub is automatically generated for you. 

        :::image type="content" source="./media/add-source-sample-data/stream-details.png" alt-text="Screenshot that shows the right pane with Stream details section of the Connect page." lightbox="./media/add-source-sample-data/stream-details.png":::                
1. Select **Next**. 
1. On the **Review and create** page, review the summary, and then select **Create source**.

    :::image type="content" source="./media/add-source-sample-data/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/add-source-sample-data/review-create-page.png":::                
 

## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected sample data source. To close the wizard, select **Close** at the bottom of the page. 

    :::image type="content" source="./media/add-source-sample-data/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open eventstream and close the wizard. ":::                
1. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. You should see the data stream created for you. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).
 
    :::image type="content" source="./media/add-source-sample-data/verify-data-stream.png" alt-text="Screenshot that shows the Data streams page with the stream that was created. ":::                



## Related content
To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)


