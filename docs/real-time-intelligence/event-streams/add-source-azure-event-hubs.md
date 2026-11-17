---
title: Add an Azure Event Hubs Source to an Eventstream
description: Add an Azure Event Hubs source to your Microsoft Fabric eventstream with this how-to guide. Configure the connector, preview data, and publish in minutes.
#customer intent: As a data engineer, I want to add an Azure Event Hubs source to my Microsoft Fabric eventstream so that I can ingest real-time event data into my streaming pipeline.
ms.reviewer: xujiang1
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
ai-usage: ai-assisted
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Add an Azure Event Hubs source to an eventstream

This article shows you how to add an Azure Event Hubs source to a Microsoft Fabric eventstream.

> [!NOTE]
> To use a customer-owned event hub as the eventstream's default stream without copying its data into Eventstreams, see [Azure Event Hubs shortcuts (preview)](event-hubs-shortcuts-overview.md). Shortcuts are separate from this source connector and have different approval, topology, and networking requirements.

[!INCLUDE [schema-aware-source-callout](./includes/schema-aware-source-callout.md)]

[!INCLUDE [azure-event-hubs-source-connector-prerequisites](./includes/connectors/azure-event-hubs-source-connector-prerequisites.md)]

## Open the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

## Select Azure Event Hubs as a source

On the **Select a data source** page, search for **Azure Event Hubs**. On the **Azure Event Hubs** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-event-hubs/select-azure-event-hubs.png" alt-text="Screenshot of the selection of Azure Event Hubs as the source type in the wizard for getting events." lightbox="./media/add-source-azure-event-hubs/select-azure-event-hubs.png":::

## Configure an Azure Event Hubs connector

[!INCLUDE [azure-event-hubs-source-connector](./includes/connectors/azure-event-hubs-source-connector-configuration.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

::: zone pivot="basic-features"

## View an updated eventstream

1. Confirm that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** to display a preview of the data in the event hub. To implement this newly added event hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-hubs/publish.png" alt-text="Screenshot of the editor with the Publish button selected." lightbox="./media/add-source-azure-event-hubs/publish.png":::

1. The event hub is available for visualization in the **Live** view. Select the **Event hub** tile in the diagram to open a pane that's similar to the following example.

    :::image type="content" source="./media/add-source-azure-event-hubs/live-view.png" alt-text="Screenshot of shows the editor in the live view." lightbox="./media/add-source-azure-event-hubs/live-view.png":::

::: zone-end

::: zone pivot="extended-features"

## View an updated eventstream

1. Confirm that the Event Hubs source is added to your eventstream on the canvas in the **Edit** mode. Select **Refresh** to display a preview of the data in the event hub. To implement this newly added event hub, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-hubs/extended-publish.png" alt-text="Screenshot of the Publish button in the editor." lightbox="./media/add-source-azure-event-hubs/extended-publish.png":::

1. The event hub is available for visualization in the **Live** view. Select the **Event hub** tile in the diagram to open a pane that's similar to the following example.

    :::image type="content" source="./media/add-source-azure-event-hubs/live-view.png" alt-text="Screenshot of the editor in live view." lightbox="./media/add-source-azure-event-hubs/live-view.png":::

[!INCLUDE [configure-destintions-schema-enabled-sources](./includes/configure-destinations-schema-enabled-sources.md)]

::: zone-end

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).

