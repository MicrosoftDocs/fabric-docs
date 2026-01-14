---
title: Get OneLake events in Fabric Real-Time hub
description: This article describes how to get OneLake events as a Fabric eventstream in Real-Time hub. You can transform the events and send them to supported destinations. 
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 07/22/2025
# Customer intent: I want to know how to create eventstreams for OneLake events in Fabric Real-Time hub. 
---

# Get OneLake events in Fabric Real-Time hub
This article describes how to get OneLake events as an eventstream in Fabric Real-Time hub.

Real-Time hub allows you to discover and subscribe to changes in files and folders in OneLake, and then react to those changes in real-time. For example, you can react to changes in files and folders in Lakehouse and use Activator alerting capabilities to set up alerts based on conditions and specify actions to take when the conditions are met. This article explains how to explore OneLake events in Real-Time hub.

With Fabric event streams, you can capture these OneLake events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of OneLake events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your OneLake.

## Event types
Here are the supported OneLake events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.OneLake.FileCreated | Raised when a file is created or replaced in OneLake. |
| Microsoft. Fabric.OneLake.FileDeleted | Raised when a file is deleted in OneLake. |
| Microsoft. Fabric.OneLake.FileRenamed | Raised when a file is renamed in OneLake. | 
| Microsoft.Fabric.OneLake.FolderCreated | Raised created when a folder is created in OneLake. | 
| Microsoft. Fabric.OneLake.FolderDeleted | Raised when a folder is deleted in OneLake. | 
| Microsoft. Fabric.OneLake.FolderRenamed | Raised when a folder is renamed in OneLake. | 

For more information, see [Explore OneLake events](explore-fabric-onelake-events.md).

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
- SusbcribeOneLakeEvent permission on the data sources.

## Create streams for OneLake events
You can create streams for OneLake events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Fabric events** page](#fabric-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **OneLake events** category at the top, and then select **Connect** on the **OneLake events** tile. You can also use the search bar to search for OneLake events. 

    :::image type="content" source="./media/create-streams-onelake-events/select-onelake-events.png" alt-text="Screenshot that shows the Get events page with OneLake events selected." lightbox="./media/create-streams-onelake-events/select-onelake-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events page
In Real-Time hub, select **Fabric events** on the left menu. You can use either the list view of Fabric events or the detail view of OneLake events to create an eventstream for OneLake events. 
 
### Using the list view
Move the mouse over **OneLake events**, and select the **Create Eventstream** link or select ... (Ellipsis) and then select **Create Eventstream**.

:::image type="content" source="./media/create-streams-onelake-events/fabric-events-menu.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/create-streams-onelake-events/fabric-events-menu.png":::

### Using the detail view
1. On the **Fabric events** page, select **OneLake events** from the list of Fabric events supported. 
1. On the **Detail** page, select **+ Create eventstream** from the menu. 

    :::image type="content" source="./media/create-streams-onelake-events/onelake-events-detail-page.png" alt-text="Screenshot that shows the detail page for OneLake events." lightbox="./media/create-streams-onelake-events/onelake-events-detail-page.png":::    

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

1. On the **Connect** page, for **Event types**, select the event types that you want to monitor.

    :::image type="content" source="./media/create-streams-onelake-events/select-event-types.png" alt-text="Screenshot that shows the selection of OneLake event types on the Connect page." lightbox="./media/create-streams-onelake-events/select-event-types.png":::
1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top. 
1. Select **Add a OneLake source** under **Select data source for events**. 

    :::image type="content" source="./media/create-streams-onelake-events/add-onelake-source-button.png" alt-text="Screenshot that shows the selection the Add a OneLake source button." lightbox="./media/create-streams-onelake-events/add-onelake-source-button.png":::    
1. On the **Choose the data you want to connect** page:
    1. View all available data sources or only your data sources (My data) or your favorite data sources by using the category buttons at the top. You can use the **Filter by keyword** text box to search for a specific source. You can also use the **Filter** button to filter based on the type of the resource (KQL Database, Lakehouse, SQL Database, Warehouse). The following example uses the **My data** option.  
    1. Select the data source from the list. 
    1. Select **Next** at the bottom of the page. 
    
        :::image type="content" source="./media/create-streams-onelake-events/select-data-source.png" alt-text="Screenshot that shows the selection of a specific OneLake data source." lightbox="./media/create-streams-onelake-events/select-data-source.png":::       
1. Select all tables or a specific table that you're interested in, and then select **Add**. 

    :::image type="content" source="./media/create-streams-onelake-events/select-tables.png" alt-text="Screenshot that shows the selection of all tables." lightbox="./media/create-streams-onelake-events/select-tables.png":::       

    > [!NOTE]
    > OneLake events are supported for data in OneLake. However, events for data in OneLake via shortcuts are not yet available.

1. Now, on the **Configure connection settings** page, you can add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
    1. Select **+ Filter**. 
    1. Select a field.
    1. Select an operator.
    1. Select one or more values to match. 
 
        :::image type="content" source="./media/create-streams-onelake-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/create-streams-onelake-events/set-filters.png":::       
1. In the **Stream details** section to the right, follow these steps.
    1. Select the **workspace** where you want to save the eventstream.
    1. Enter a **name for the eventstream**. The **Stream name** is automatically generated for you.
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/create-streams-onelake-events/next-button.png" alt-text="Screenshot that shows the selection of the Next button." lightbox="./media/create-streams-onelake-events/next-button.png":::
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/create-streams-onelake-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/create-streams-onelake-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, use **Open eventstream** link to open the eventstream that was created for you. Select **Finish** to close the wizard. 

    :::image type="content" source="./media/create-streams-onelake-events/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open the eventstream." lightbox="./media/create-streams-onelake-events/review-create-success.png":::

## View stream from the Real-Time hub page
Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

:::image type="content" source="./media/create-streams-onelake-events/verify-data-stream.png" alt-text="Screenshot that shows data stream in the My data streams page." lightbox="./media/create-streams-onelake-events/verify-data-stream.png":::

For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
