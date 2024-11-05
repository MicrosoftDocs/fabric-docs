---
title: Discover and explore Fabric items in the OneLake catalog
description: Learn how to discover and explore your organization's Fabric items in the OneLake catalog.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: conceptual
ms.date: 11/05/2024
ms.custom: ignite-2023-fabric
---

# Discover and explore Fabric items in the OneLake catalog

OneLake catalog Explore is a centralized place that helps you find, explore, and use the Fabric items you need.



What do I see in OneLake catalog Explore?
Items list: You see all the items you have access to.
Filters: Provide various ways of shortening the list to help you discover the relevant items.

Item filters
All items
My items
Endorsed items
Favorited itemsst
Workspace filter


Item details
Overview
Lineage [What is the difference between lineage tab and workspace lineage view.] Do all items have the lineage tab? What does it mean when the lineage tab is greyed out?
Monitor

Action bar

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them.



in your organization that you have access to item types in Fabric. This includes the most popular insight item types (preview): dashboards and reports, as well as the full range of configuration, solution, and process item types. All in one place. 


OneLake catalog Explore provides:

* [A filterable list of all the data items you can access](#find-items-in-the-data-items-list)
* [A gallery of recommended data items](#find-recommended-items)
* [A way of finding data items by workspace](#find-items-by-workspace)
* [A way to display only the data items of a selected domain](#display-only-data-items-belonging-to-a-particular-domain)
* [An options menu of things you can do with the data item](#open-an-items-options-menu)

This article explains what you see in OneLake catalog Explore and describes how to use it.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-general.png" alt-text="Screenshot of the OneLake data hub." lightbox="./media/onelake-data-hub/onelake-data-hub-general.png":::

## Open the OneLake catalog Explore

To open the data hub, select the OneLake icon in the Fabric navigation pane.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-open.png" alt-text="Screenshot showing how to open the OneLake data hub.":::

## Find items in the items list

The items list displays all the Fabric items you have access to. To shorten the list, you can filter by keyword or data-item type using the filters at the top of the list. If you select the name of an item, you'll get see the item's details. If you hover over an item, you'll see three dots that open the [options menu](#open-an-items-options-menu) when you select them.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-data-items-list.png" alt-text="Screenshot of the OneLake data hub data items list." lightbox="./media/onelake-data-hub/onelake-data-hub-data-items-list.png":::

The columns of the list are described below.

|Column  |Description  |
|:-----------------|:--------|
| **Name**         | The item name. Select the name to explore item details. |
| **Type**         | The item type. |
| **Owner**        | Item owner. |
| **Refreshed**    | Last refresh time (rounded to hour, day, month, and year. See the details section in item's details for the exact time of the last refresh). |
| **Location**    | The workspace the item is located in. |
| **Endorsement**  | [Endorsement](../governance/endorsement-overview.md) status. |
| **Sensitivity**  | Sensitivity, if set. Select the info icon to view the sensitivity label description. |

### Item filters

Item filters help you narrow down the list of items.

|Tab  |Description  |
|:-------------------------|:----------------------------------------------------|
| **All Items**                  | Items that you're allowed to find.  |
| **My items**              | Items that you own.      |
| **Endorsed items** | Endorsed items in your organization that you're allowed to find. Certified data items are listed first, followed by promoted data items. For more information about endorsement, see the [Endorsement overview](../governance/endorsement-overview.md) |
| **Favorites** | Items that you've marked as favorites. |

### Find items by workspace

Related items are often grouped together in a workspace. To find items by workspace, find and select the workspace you're interested in under the **Workspaces** heading to the side of the items list. The items you're allowed to see in that workspace will be displayed in the items list.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-explorer-pane.png" alt-text="Screenshot of the OneLake data hub Explorer pane.":::

> [!NOTE]
>Generally, the **Workspaces** section only displays workspaces you have access to. However, workspaces you don't have access to might be listed if the workspace contains items that you do have access to (through explicitly granted permissions, for example). If you select such a workspace, only the items you have access to will be displayed in the items list.


## Filter to find items

### All items by item classification

Fabric items are classified into buckets based on what they are for. For example, items that contain data, such as lakehouses and semantic models, are bucketed under Data items, while reports and dashboards are bucketed under Insights. Use the item type bucket selector to select the item type bucket of interest.

|Tab  |Description  |
|:-------------------------|:----------------------------------------------------|
| **All data**                  | Data items that you're allowed to find.  |
| **My data**              | Data items that you own.      |
| **Endorsed in your org** | Endorsed data items in your organization that you're allowed to find. Certified data items are listed first, followed by promoted data items. For more information about endorsement, see the [Endorsement overview](../governance/endorsement-overview.md) |
| **Favorites** | Data items that you've marked as favorites. |

### Find items by tag

Use the tags selector to display items tagged with the tags you select. 

> [!NOTE]
> The tag selector is only visible if tags are enabled in your organization.


### Find items by workspace

Related items are often grouped together in a workspace. To find items by workspace, find and select the workspace you're interested in under the **Workspaces** heading to the side of the items list. The items you're allowed to see in that workspace will be displayed in the items list.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-explorer-pane.png" alt-text="Screenshot of the OneLake data hub Explorer pane.":::

> [!NOTE]
>Generally, the **Workspaces** section only displays workspaces you have access to. However, workspaces you don't have access to might be listed if the workspace contains items that you do have access to (through explicitly granted permissions, for example). If you select such a workspace, only the items you have access to will be displayed in the items list.

## Display only data items belonging to a particular domain

If [domains](../governance/domains.md) have been defined in your organization, you can use the domain selector to select a domain so that only data items belonging to that domain will be displayed. If an image has been associated with the domain, you’ll see that image on the catalog to remind you of the domain you're viewing.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-domains-selector.png" alt-text="Screenshot of the domains selector in the OneLake data hub.":::

For more information about domains, see the [Domains overview](../governance/domains.md)

## Open an item's options menu

Each item shown in the data hub has an options menu that enables you to do things, such as open the item's settings, manage item permissions, etc. The options available depend on the item and your permissions on the item.

To display the options menu, select **More options (...)** on one of the items shown in the data items list or a recommended item. In the data items list, you need to hover over the item to reveal **More options**.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-options-menu.png" alt-text="Screenshot of an item's option menu in the OneLake data hub." border="false":::

> [!NOTE]
>The Explorer pane may list workspaces that you don't have access to if the workspace contains items that you do have access to (through explicitly granted permissions, for example). If you select such a workspace, only the items you have access to will be displayed in the data items list.

## Considerations and limitations

Streaming semantic models are not shown in the OneLake data hub.

## Related content

* [Navigate to your items from Microsoft Fabric Home](./fabric-home.md)
* [Endorsement](../governance/endorsement-overview.md)