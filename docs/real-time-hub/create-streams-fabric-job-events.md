---
title: Get Job events in Fabric Real-Time hub
description: This article describes how to get Job events as a Fabric eventstream in Real-Time hub. You can transform the events and send them to supported destinations. 
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 01/14/2026
# Customer intent: I want to know how to create eventstreams for Job events in Fabric Real-Time hub. 
---

# Get Job events in Real-Time hub
This article describes how to get Job events as an eventstream in Fabric Real-Time hub.

Real-Time hub allows you to discover and subscribe to changes produced when Fabric runs a job. For example, you can react to changes when refreshing a semantic model, running a scheduled pipeline, or running a notebook. Each of these activities can generate a corresponding job, which in turn generates a set of corresponding job events. 

Job events allow you to monitor job results in time and set up alerts using Activator alerting capabilities. For example, when the scheduler triggers a new job, or a job fails, you can receive an email alert. This way, even if you aren't in front of the computer, you can still get the information you care about. 

With Fabric event streams, you can capture these Job events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Job events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Job.

## Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemJobCreated | Raised when the Fabric platform creates or triggers a job, manually or scheduled. |
| Microsoft.Fabric.ItemJobStatusChanged | Raised when the job status changes to another non-terminal state. <p>This event isn't raised if the workload doesn't push when the status changes. The job status might change from created to completed soon. 
| Microsoft.Fabric.ItemJobSucceeded | Raised when the job completes. |     
| Microsoft.Fabric.ItemJobFailed | Raised when the job fails, including job getting stuck or canceled. |

For more information, see [Explore Job events](explore-fabric-Job-events.md).

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.

## Create streams for Job events

You can create streams for Job events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Fabric events** page](#fabric-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

5. On the **Data sources** page, select **Job events** category at the top, and then select **Connect** on the **Job events** tile. You can also use the search bar to search for Job events. 

    :::image type="content" source="./media/create-streams-fabric-Job-events/select-job-events.png" alt-text="Screenshot that shows the Get events page with Job events selected." lightbox="./media/create-streams-fabric-job-events/select-job-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Fabric events page
In Real-Time hub, select **Fabric events** on the left menu. You can use either the list view of Fabric events or the detail view of Job events to create an eventstream for Job events. 
 
### Using the list view
Move the mouse over **Job events**, and select the **Create Eventstream** link or select ... (Ellipsis) and then select **Create Eventstream**.

:::image type="content" source="./media/create-streams-fabric-job-events/fabric-events-menu.png" alt-text="Screenshot that shows the Real-Time hub Fabric events page." lightbox="./media/create-streams-fabric-job-events/fabric-events-menu.png":::

### Using the detail view
1. On the **Fabric events** page, select **Job events** from the list of Fabric events supported. 
1. On the **Detail** page, select **+ Create eventstream** from the menu. 

    :::image type="content" source="./media/create-streams-fabric-job-events/job-events-detail-page.png" alt-text="Screenshot that shows the detail page for Job events." lightbox="./media/create-streams-fabric-job-events/job-events-detail-page.png":::    

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section, but skip the first step of using the **Add source** page.

## Configure and create an eventstream

1. On the **Connect** page, for **Event types**, select the event types that you want to monitor.

    :::image type="content" source="./media/create-streams-fabric-job-events/select-event-types.png" alt-text="Screenshot that shows the selection of Job event types on the Connect page." lightbox="./media/create-streams-fabric-job-events/select-event-types.png":::
1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top. 
1. For **Event source**, confirm that **By item** is selected. 
1. For **Workspace**, select a workspace where the Fabric item is. 
1. For **Item**, select the Fabric item.     

    :::image type="content" source="./media/create-streams-fabric-job-events/source-workspace-item.png" alt-text="Screenshot that shows the configuration of source, workspace, and item." lightbox="./media/create-streams-fabric-job-events/source-workspace-item.png":::
1. Now, on the **Configure connection settings** page, you can add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
    1. Select **+ Filter**. 
    1. Select a field.
    1. Select an operator.
    1. Select one or more values to match. 
 
        :::image type="content" source="./media/create-streams-fabric-job-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/create-streams-onelake-events/set-filters.png":::       
1. In the **Stream details** section to the right, follow these steps.
    1. Select the **workspace** where you want to save the eventstream.
    1. Enter a **name for the eventstream**. The **Stream name** is automatically generated for you.
        :::image type="content" source="./media/create-streams-fabric-job-events/stream-name.png" alt-text="Screenshot that shows the name of the stream." lightbox="./media/create-streams-fabric-job-events/stream-name.png":::       
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/create-streams-fabric-job-events/next-button.png" alt-text="Screenshot that shows the selection of the Next button." lightbox="./media/create-streams-fabric-job-events/next-button.png":::
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/create-streams-fabric-job-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/create-streams-fabric-job-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, use **Open eventstream** link to open the eventstream that was created for you. Select **Finish** to close the wizard. 

    :::image type="content" source="./media/create-streams-fabric-job-events/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open the eventstream." lightbox="./media/create-streams-fabric-job-events/review-create-success.png":::

## View stream from the Real-Time hub page
Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

:::image type="content" source="./media/create-streams-fabric-job-events/verify-stream.png" alt-text="Screenshot that shows data stream in the My data streams page." lightbox="./media/create-streams-fabric-job-events/verify-stream.png":::

For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
