---
title: Business Events Source in Eventstream
description: Learn how to add business events as a source to an existing Microsoft Fabric eventstream.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 08/10/2026
#customer intent: As a user, I want to add business events to an eventstream so that I can transform and route business signals in real time.
---

# Add business events to an eventstream (Preview)

This article shows you how to add business events as a source to an existing Fabric eventstream.

## Prerequisites

Before you begin, ensure that you have:

- Access to a workspace in Fabric capacity or Trial license mode with Contributor or higher permissions.
- Access to the workspace that contains the event schema set and business event you want to consume.
- An existing business event. To create one, see [Create and manage event schemas](../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

> [!NOTE]
> Workspace private links can block cross-workspace business event consumption. For Business events, the source workspace is the workspace that contains the Event Schema Set. If that workspace blocks public access, add the Business events source to an eventstream in the same workspace or establish a private link from the consumer's network to the source workspace. For more information, see [Workspace private links for Azure, Fabric, and Business events](workspace-private-links-real-time-events.md).

## Add business events as a source

1. Open an existing eventstream or [create an eventstream](../real-time-intelligence/event-streams/create-manage-an-eventstream.md).

1. If the eventstream doesn't have a source, select the **Connect data sources** tile.

    :::image type="content" source="media/add-source-business-events/connect-data-sources-tile.png" alt-text="Screenshot of the Connect data sources tile in an empty eventstream." lightbox="media/add-source-business-events/connect-data-sources-tile.png":::

    If the eventstream already has a source, switch to **Edit** mode, and then select **Add source** > **Connect data sources** on the ribbon.

    :::image type="content" source="media/add-source-business-events/add-source-ribbon.png" alt-text="Screenshot of the Add source menu with Connect data sources selected in an eventstream." lightbox="media/add-source-business-events/add-source-ribbon.png":::

1. On the **Select a data source** page, search for **Business events**, and then select the **Business events** tile.

    :::image type="content" source="media/add-source-business-events/select-business-events-source.png" alt-text="Screenshot of the Select a data source page with Business events selected." lightbox="media/add-source-business-events/select-business-events-source.png":::

1. On the **Business events** page, select **Select business events**.

    :::image type="content" source="media/add-source-business-events/select-business-event-modal.png" alt-text="Screenshot of the Business events source configuration with the Select business events button highlighted." lightbox="media/add-source-business-events/select-business-event-modal.png":::

1. Select the business event that you want to consume.

    :::image type="content" source="media/add-source-business-events/select-business-event.png" alt-text="Screenshot of the business event selection dialog with a business event selected." lightbox="media/add-source-business-events/select-business-event.png":::

    > [!NOTE]
    > You can only consume events simultaneously if they belong to the same Event Schema Set.

1. Optionally, select **View selected business event schema** to review the event fields and data types, and then select **Save selection**.

    :::image type="content" source="media/add-source-business-events/select-business-event-preview.png" alt-text="Screenshot of the selected business event schema preview." lightbox="media/add-source-business-events/select-business-event-preview.png":::

1. In **Source details**, enter a name for the source.

    :::image type="content" source="media/add-source-business-events/configure-source-details.png" alt-text="Screenshot of the Source details section for a Business events source." lightbox="media/add-source-business-events/configure-source-details.png":::

1. Select **Next**.

    :::image type="content" source="media/add-source-business-events/configure-next.png" alt-text="Screenshot of the Business events source configuration with the Next button highlighted." lightbox="media/add-source-business-events/configure-next.png":::

1. On the **Review + connect** page, verify the selected business event and source details, and then select **Add**.

    :::image type="content" source="media/add-source-business-events/configure-review.png" alt-text="Screenshot of the Review and connect page for a Business events source." lightbox="media/add-source-business-events/configure-review.png":::

1. After the business events source appears on the eventstream canvas, select **Publish**.

    :::image type="content" source="media/add-source-business-events/eventstream-publish.png" alt-text="Screenshot of an eventstream canvas with a Business events source and the Publish button highlighted." lightbox="media/add-source-business-events/eventstream-publish.png":::

1. Wait for the eventstream to enter **Live** mode and confirm that the business events source is running.

> [!NOTE]
> Publish business events after the eventstream is running. Events published while the eventstream is stopped aren't processed by the source.

## Related content

- [Create eventstreams for business events in Real-Time hub](create-streams-business-events.md)
- [Business events overview](business-events/business-events-overview.md)
- [Add and manage eventstream sources](../real-time-intelligence/event-streams/add-manage-eventstream-sources.md)
