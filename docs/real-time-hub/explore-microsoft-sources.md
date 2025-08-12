---
title: Explore Azure sources in Fabric Real-Time hub
description: This article shows how to explore Microsoft sources in Fabric Real-Time hub. It provides details on the Microsoft sources page in the Real-Time hub user interface.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Explore Azure sources (Microsoft sources) in Fabric Real-Time hub

This article covers information available in the **Microsoft sources** page of the Fabric Real-Time hub.

## Microsoft sources page

In **Fabric Real-Time hub**, select **Azure sources** on the left menu. The **Microsoft sources** page shows you all the Microsoft data sources you can access. They include sources of the following types.

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

:::image type="content" source="./media/explore-microsoft-sources/real-time-hub-microsoft-sources-menu.png" alt-text="Screenshot that shows the Microsoft sources page of the Real-Time hub." lightbox="./media/explore-microsoft-sources/real-time-hub-microsoft-sources-menu.png":::

### Columns

| Column | Description |
| ------ | ----------- |
| Name | Name of the Microsoft resource. |
| Source | Type of the source. For example: Azure Event Hubs Namespaces. |
| Subscription | Name of the Azure subscription that contains the Azure resource. |
| Resource group | Name of the Azure resource group that has the Azure resource. |
| Region | Region name of Azure resource. |

:::image type="content" source="./media/explore-microsoft-sources/columns.png" alt-text="Screenshot that shows the Microsoft sources page of the Real-Time hub with columns highlighted." lightbox="./media/explore-microsoft-sources/columns.png":::

### Filters

The following filters are available at the top for you to narrow down easily to the desired Microsoft resource:

| Filter | Description |
| ------ | ----------- |
| Source | You can filter on the desired type of Microsoft source. |
| Subscription |  You can filter on the desired Azure subscription name. |
| Resource group | You can filter on the desired Azure resource group name. |
| Region | You can filter on the desired region name. |

:::image type="content" source="./media/explore-microsoft-sources/filters.png" alt-text="Screenshot that shows the Microsoft sources page of the Real-Time hub with filters highlighted." lightbox="./media/explore-microsoft-sources/filters.png":::

### Search

You can also search your Microsoft resource using the search bar by typing in the name of the source.

:::image type="content" source="./media/explore-microsoft-sources/search.png" alt-text="Screenshot that shows the search box on the Real-Time hub Microsoft sources page." lightbox="./media/explore-microsoft-sources/search.png":::

### Actions

Here are the actions available on resources in the **Microsoft sources** page. When you move the mouse over a resource, you see a connect button and an ellipsis (...). When you select the ellipsis (...) button, you see the connect button here too.

| Action | Description |
| ------ | ----------- |
| Connect data source | Connect Fabric to your Microsoft resource. |

:::image type="content" source="./media/explore-microsoft-sources/actions.png" alt-text="Screenshot that shows the actions available for resources on the Real-Time hub Microsoft sources page." lightbox="./media/explore-microsoft-sources/actions.png":::

For more information, see [Microsoft sources](supported-sources.md#azure-sources).

## Related content

- [Explore Azure blob storage events](get-azure-blob-storage-events.md)
- [Explore Fabric workspace item events](create-streams-fabric-workspace-item-events.md)
