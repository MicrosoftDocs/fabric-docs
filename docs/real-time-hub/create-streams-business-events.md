---
title: Consume Business Events in eventstream from Fabric Real-Time Hub
description: Learn how to create an eventstream for business events from the Add data page, business events list, or event detail page in Fabric Real-Time hub.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 08/10/2026
#customer intent: As a user, I want to create an eventstream for a business event from Real-Time hub so that I can transform and route the event in real time.
---

# Create eventstreams for business events in Fabric Real-Time hub (Preview)

This article shows you how to create an eventstream for a business event from the **Add data** page, the business events list, or the detail page for a selected event in Real-Time hub.

## Prerequisites

Before you begin, make sure that you have:

- Access to a workspace in Fabric capacity or Trial license mode with Contributor or higher permissions.
- Access to the workspace that contains the event schema set and business event you want to consume.
- An existing business event. To create one, see [Create and manage event schemas](../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

> [!NOTE]
> Workspace private links can block cross-workspace business event consumption. For Business events, the source workspace is the workspace that contains the Event Schema Set. If that workspace blocks public access, create the eventstream in the same workspace or establish a private link from the consumer's network to the source workspace. For more information, see [Workspace private links for Azure, Fabric, and Business events](workspace-private-links-real-time-events.md).

## Navigate to Real-Time hub

1. Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).

1. If you see **Power BI** at the bottom-left of the page, select **Power BI**, and then select **Fabric**.

    :::image type="content" source="media/create-streams-business-events/switch-to-fabric-workload.png" alt-text="Screenshot that shows how to switch to the Fabric workload." lightbox="media/create-streams-business-events/switch-to-fabric-workload.png":::

1. Select **Real-Time** on the left navigation bar.

    :::image type="content" source="media/create-streams-business-events/real-time-hub.png" alt-text="Screenshot of the Real-Time option on the left navigation bar in Microsoft Fabric." lightbox="media/create-streams-business-events/real-time-hub.png":::

## Create an eventstream from the Add data page

1. On the **Streaming data** page, select **Add data**. You can also select **Add data** on the left navigation bar.

    :::image type="content" source="media/create-streams-business-events/streaming-data.png" alt-text="Screenshot of the Streaming data page with the Add data button highlighted." lightbox="media/create-streams-business-events/streaming-data.png":::

    :::image type="content" source="media/create-streams-business-events/add-data.png" alt-text="Screenshot of the Add data option on the Real-Time hub navigation bar." lightbox="media/create-streams-business-events/add-data.png":::

1. On the **Add data** page, select the **Business events** category or search for **Business events**.

    :::image type="content" source="media/create-streams-business-events/add-data-business-events.png" alt-text="Screenshot showing Add Business Events as a data source." lightbox="media/create-streams-business-events/add-data-business-events.png":::

1. Continue with the steps in [Configure and create the eventstream](#configure-and-create-the-eventstream).

## Create an eventstream from the business events list

1. In Real-Time hub, select **Business events** on the left navigation menu.

    :::image type="content" source="media/create-streams-business-events/select-business-events.png" alt-text="Screenshot of the Business events option in the Real-Time hub navigation menu." lightbox="media/create-streams-business-events/select-business-events.png":::

1. Select the business events you want to consume, and then select **Add Consumer** and then select **eventstream (data processing)**.

    :::image type="content" source="media/create-streams-business-events/create-eventstream-consumer-list.png" alt-text="Screenshot of selected business events with eventstream data processing available from the Add Consumer menu." lightbox="media/create-streams-business-events/create-eventstream-consumer-list.png":::

    > [!NOTE]
    > You can only consume events simultaneously if they belong to the same Event Schema Set.

1. Continue with the steps in [Configure and create the eventstream](#configure-and-create-the-eventstream). The business event that you selected is already populated in the connection wizard.

## Create an eventstream from the event detail page

1. In Real-Time hub, select **Business events** on the left navigation menu.

    :::image type="content" source="media/create-streams-business-events/select-business-events.png" alt-text="Screenshot of the Business events navigation option used to open an event detail page." lightbox="media/create-streams-business-events/select-business-events.png":::

1. Select the business event that you want to consume.

    :::image type="content" source="media/create-streams-business-events/select-business-event-real-time-hub.png" alt-text="Screenshot of a business event selected on the Business events page in Real-Time hub." lightbox="media/create-streams-business-events/select-business-event-real-time-hub.png":::

1. On the event detail page, select **Add Consumer** and then select **eventstream (data processing)**.

    :::image type="content" source="media/create-streams-business-events/select-eventstream-consumer-detail.png" alt-text="Screenshot of the business event detail page with eventstream data processing selected from the Add Consumer menu." lightbox="media/create-streams-business-events/select-eventstream-consumer-detail.png":::

1. Continue with the steps in [Configure and create the eventstream](#configure-and-create-the-eventstream). The business event that you selected is already populated in the connection wizard.

## Configure and create the eventstream

If you opened the wizard from the **Add data** page, complete these steps:

1. On the **Business events** page, select **Select business events**.

    :::image type="content" source="media/create-streams-business-events/select-business-event-modal.png" alt-text="Screenshot of the Business events source configuration with the Select business events button highlighted." lightbox="media/create-streams-business-events/select-business-event-modal.png":::

1. Select the business event that you want to consume.

    :::image type="content" source="media/create-streams-business-events/select-business-event.png" alt-text="Screenshot of the business event selection dialog with a business event selected." lightbox="media/create-streams-business-events/select-business-event.png":::

    > [!NOTE]
    > You can only consume events simultaneously if they belong to the same Event Schema Set.

1. Optionally, select **View selected business event schema** to review the event fields and data types, and then select **Save selection**.

    :::image type="content" source="media/create-streams-business-events/select-business-event-preview.png" alt-text="Screenshot of the selected business event schema preview." lightbox="media/create-streams-business-events/select-business-event-preview.png":::

1. In **Stream details**, select the workspace where you want to create the eventstream. Enter a name for the eventstream. The stream name is generated automatically and is read-only.

    :::image type="content" source="media/create-streams-business-events/configure-source-details.png" alt-text="Screenshot of the Source details section for a Business events source." lightbox="media/create-streams-business-events/configure-source-details.png":::

1. Select **Next**.

    :::image type="content" source="media/create-streams-business-events/configure-next.png" alt-text="Screenshot of the Business events source configuration with the Next button highlighted." lightbox="media/create-streams-business-events/configure-next.png":::

1. On the **Review + connect** page, verify the selected business event and source details, and then select **Connect**.

    :::image type="content" source="media/create-streams-business-events/configure-review.png" alt-text="Screenshot of the Review and connect page for a Business events source." lightbox="media/create-streams-business-events/configure-review.png":::

1. After the eventstream is created, select **Open eventstream** to open it, or select **Finish** to close the wizard.

If you opened the wizard from the business events list or event detail page, complete these steps:

1. **Business event is already selected**. In **Stream details**, select the workspace where you want to create the eventstream. Enter a name for the eventstream. The stream name is generated automatically and is read-only.

    :::image type="content" source="media/create-streams-business-events/configure-source-details.png" alt-text="Screenshot of the Source details section for a Business events source." lightbox="media/create-streams-business-events/configure-source-details.png":::

1. Select **Next**.

    :::image type="content" source="media/create-streams-business-events/configure-next.png" alt-text="Screenshot of the Business events source configuration with the Next button highlighted." lightbox="media/create-streams-business-events/configure-next.png":::

1. On the **Review + connect** page, verify the selected business event and source details, and then select **Connect**.

    :::image type="content" source="media/create-streams-business-events/configure-review.png" alt-text="Screenshot of the Review and connect page for a Business events source." lightbox="media/create-streams-business-events/configure-review.png":::

1. After the eventstream is created, select **Open eventstream** to open it, or select **Finish** to close the wizard.


## Verify the eventstream

1. Open the eventstream and confirm that it is published and in **Live** mode.

1. Publish a new instance of the selected business event.

1. Confirm that the business events source remains in a running state.

1. In Real-Time hub, select **My data streams**.

1. Locate the generated stream. Refresh the page if the stream doesn't appear immediately.

1. Select the stream to view its details and confirm that it's associated with the expected eventstream.

## Related content

- [Add business events to an eventstream](add-source-business-events.md)
- [Business events overview](business-events/business-events-overview.md)
