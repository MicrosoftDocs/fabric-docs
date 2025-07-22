---
title: Explore Azure events in Fabric Real-Time hub
description: This article shows how to explore Azure events in Fabric Real-Time hub. It provides details on the Azure events page in the Real-Time hub user interface.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Explore Azure events in Fabric Real-Time hub


This article describes columns on the **Azure events** page and actions available for each event. 

:::image type="content" source="./media/explore-azure-events/azure-events-page.png" alt-text="Screenshot that shows the Real-Time hub Azure events page." lightbox="./media/explore-azure-events/azure-events-page.png":::

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Columns

Azure events have the following columns:

| Column | Description |
| ------ | ----------- |
| Name | Name of event type group. Currently, only **Azure Blob Storage events** are supported.|
| Description | Description of event type group. |

:::image type="content" source="./media/explore-azure-events/columns.png" alt-text="Screenshot that shows the selection of columns on the Azure events page." lightbox="./media/explore-azure-events/columns.png":::

## Actions

Here are the actions available on each event type group. When you move the mouse over an event group, you see three buttons to create an eventstream, create an alert, and an ellipsis (...). When you select ellipsis (...), you see the same actions: **Create eventstream** and **Set alert**.

| Action | Description |
| ------ | ----------- |
| Create eventstream | This action creates an eventstream on the selected event type group with all Event types selected. For more information, see [Get Azure Blob Storage events](get-azure-blob-storage-events.md). |
| Set alert | This action sets an alert on the selected event type group. For more information, see [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md). |

:::image type="content" source="./media/explore-azure-events/actions.png" alt-text="Screenshot that shows the Real-Time hub Azure events page with actions highlighted." lightbox="./media/explore-azure-events/actions.png":::

## Related content
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
- [Get Azure Blob Storage events](get-azure-blob-storage-events.md).
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)
