---
title: Discover and explore Fabric items in the OneLake catalog
description: Learn how to discover, explore, manange, and use your organization's Fabric items in the OneLake catalog.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: overview
ms.date: 11/05/2024
ms.custom: ignite-2023-fabric

#customer intent: As data engineer, data scientist, analyst, decision maker, or business user, I want to learn about the capabilities of the OneLake catelog and how it can help me find, manage, and use the content I need. 
---

# Discover and explore Fabric items in the OneLake catalog

OneLake catalog Explore is a centralized place that helps you find, explore, and use the Fabric items you need.

The OneLake catalog provides

* [A list of all Fabric items you have access to in your organization](#find-items-in-the-items-list).
* [Filters and selectors to help you find the content you're looking for](#filter-the-items-list).
* [A way to scoping the catalog to display only items of a particular domain](#scope-the-catalog-to-a-particular-domain).
* [A way of finding items by workspace](#find-items-by-workspace)
* [An options menu for item actions](#open-an-items-options-menu)
* [An item details view that enables you to drill down on an item without leaving the catalog](#view-item-details).

This article explains what you see in the OneLake catalog and describes how to use it.

## Open the OneLake catalog

To open the OneLake catalog, select the OneLake icon in the Fabric navigation pane.

:::image type="content" source="./media/onelake-catalog/onelake-catalog-open.png" alt-text="Screenshot showing how to open the OneLake catalog.":::

## Find items in the items list

The items list displays all the Fabric items you have access to.

* To shorten the list, you can the catalog's filters and selectors.

* To view item details, select the item.

* To view an item's [options menu](#open-an-items-options-menu), hover over the item and select the three dots that appear.

The following table describes the list columns.

|Column  |Description  |
|:-----------------|:--------|
| **Name**         | The item name. Select the name to explore item details. |
| **Type**         | The item type. |
| **Owner**        | Item owner. |
| **Refreshed**    | Last refresh time (rounded to hour, day, month, and year. See the details section in item's details for the exact time of the last refresh). |
| **Location**    | The workspace the item is located in. |
| **Endorsement**  | [Endorsement](../governance/endorsement-overview.md) status. |
| **Sensitivity**  | Sensitivity, if set. Select the info icon to view the sensitivity label description. |

## Scope the catalog to a particular domain

If domains have been defined in your organization, you can use the domain selector to select a domain or subdomain so that only items belonging to that domain or subdomain will be displayed and treated in the catalog.

:::image type="content" source="./media/onelake-catalog/onelake-catalog-domains-selector.png" alt-text="Screenshot of the domains selector in the OneLake catalog.":::

## Open an item's options menu

Each item in the items list has an options menu that enables you to do things, such as open the item's settings, manage item permissions, etc. The options available depend on the item and your permissions on the item.

To display the options menu, hover over the item whose options menu you want to see and select **More options (...)**.

:::image type="content" source="./media/onelake-catalog/onelake-catalog-options-menu.png" alt-text="Screenshot of an item's option menu in the OneLake catalog." border="false":::

## Filter the items list

Item filters help you narrow down the list of items.

|Tab  |Description  |
|:-------------------------|:----------------------------------------------------|
| **All Items**                  | Items that you're allowed to find.  |
| **My items**              | Items that you own.      |
| **Endorsed items** | Endorsed items in your organization that you're allowed to find. Certified data items are listed first, followed by promoted data items. For more information about endorsement, see the [Endorsement overview](../governance/endorsement-overview.md) |
| **Favorites** | Items that you've marked as favorites. |

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

## Find items by workspace

Related items are often grouped together in a workspace. To find items by workspace, find and select the workspace you're interested in under the **Workspaces** heading to the side of the items list. The items you're allowed to see in that workspace will be displayed in the items list.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-explorer-pane.png" alt-text="Screenshot of the OneLake data hub Explorer pane.":::

> [!NOTE]
>Generally, the **Workspaces** section only displays workspaces you have access to. However, workspaces you don't have access to might be listed if the workspace contains items that you do have access to (through explicitly granted permissions, for example). If you select such a workspace, only the items you have access to will be displayed in the items list.

## View item details

* Overview tab:
  * Location
  * Last updated
  * Owner
  * Sensitivity label

### Lineage tab

The lineage tab shows you the upstream and downstream items in the lineage that are one degree away. Metadate about the upstream and downstream items is also show, such as location, relation (upstream or downstream), etc.

:::image type="content" source="./media/onelake-catalog/onelake-catalog-lineage-tab.png" alt-text="Screenshot of the OneLake catalog item view lineage tab.":::

* Monitor tab: (Displays the items monitoring hub data, if applicable. This tab appears if the item appears in the monitoring hub. Its monitoring hub entries are dispalyed., it will have if it activity from the mon)

tem metadata, cross-workspace lineage, and monitoring (if applicable). The view also enables ad-hoc item exploration. For example.

* Action bar provides functionality that takes you out of the OneLake catalog context.

## Considerations and limitations

Streaming semantic models are not shown in the OneLake data hub.

## Related content

* [Navigate to your items from Microsoft Fabric Home](./fabric-home.md)
* [Endorsement](../governance/endorsement-overview.md)