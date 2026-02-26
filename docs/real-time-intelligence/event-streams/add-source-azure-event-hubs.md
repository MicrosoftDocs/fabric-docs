---
title: Add an Azure Event Hubs Source to an Eventstream
description: Learn how to add an Azure Event Hubs source to an eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/25/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add an Azure Event Hubs source to an eventstream

This article shows you how to add an Azure Event Hubs source to a Microsoft Fabric eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.
- Appropriate permission to get an event hub's access keys. If your event hub is within a protected network, [connect to it by using a managed private endpoint](set-up-private-endpoint.md). Otherwise, ensure that the event hub is publicly accessible and not behind a firewall.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md).

## Open the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Event Hubs**. On the **Azure Event Hubs** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the wizard for getting events." lightbox="./media/add-source-azure-event-hubs-enhanced/select-azure-event-hubs.png":::

## Configure an Azure Event Hubs connector

[!INCLUDE [azure-event-hubs-source-connector](./includes/azure-event-hubs-source-connector.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

::: zone pivot="basic-features"

## View an updated eventstream

1. Confirm that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** to display a preview of the data in the event hub. To implement this newly added event hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/publish.png" alt-text="Screenshot that shows the editor with the Publish button selected." lightbox="./media/add-source-azure-event-hubs-enhanced/publish.png":::

1. The event hub is available for visualization in the **Live** view. Select the **Event hub** tile in the diagram to open a pane that's similar to the following example.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in the live view." lightbox="./media/add-source-azure-event-hubs-enhanced/live-view.png":::

::: zone-end

::: zone pivot="extended-features"

## View an updated eventstream

1. Confirm that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** to display a preview of the data in the event hub. To implement this newly added event hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/extended-publish.png" alt-text="Screenshot that shows the Publish button in the editor." lightbox="./media/add-source-azure-event-hubs-enhanced/extended-publish.png":::

1. The event hub is available for visualization in the **Live** view. Select the **Event hub** tile in the diagram to open a pane that's similar to the following example.

    :::image type="content" source="./media/add-source-azure-event-hubs-enhanced/live-view.png" alt-text="Screenshot that shows the editor in live view." lightbox="./media/add-source-azure-event-hubs-enhanced/live-view.png":::

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

::: zone-end

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).


