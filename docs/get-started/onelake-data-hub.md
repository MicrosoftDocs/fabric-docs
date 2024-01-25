---
title: Discover Fabric content in the OneLake data hub
description: Learn how you can find, explore, and use the Fabric items in your organization.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: conceptual
ms.date: 01/25/2024
ms.custom:
  - build-2023
  - ignite-2023-fabric
---

# Discover data items in the OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them.

The data hub provides:

* [A filterable list of all the data items you can access](#find-items-in-the-data-items-list)
* [A gallery of recommended data items](#find-recommended-items)
* [A way of finding data items by workspace](#find-items-by-workspace)
* [A way to display only the data items of a selected domain](#display-only-data-items-belonging-to-a-particular-domain)
* [An options menu of things you can do with the data item](#open-an-items-options-menu)

This article explains what you see on the data hub and describes how to use it.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-general.png" alt-text="Screenshot of the OneLake data hub." lightbox="./media/onelake-data-hub/onelake-data-hub-general.png":::

## Open the data hub

To open the data hub, select the OneLake data hub icon in the navigation pane.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-open.png" alt-text="Screenshot showing how to open the OneLake data hub.":::

## Find items in the data items list

The data items list displays all the data items you have access to. To shorten the list, you can filter by keyword or data-item type using the filters at the top of the list. If you select the name of an item, you'll get to the item's details page. If you hover over an item, you'll see three dots that open the [options menu](#open-an-items-options-menu) when you select them.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-data-items-list.png" alt-text="Screenshot of the OneLake data hub data items list." lightbox="./media/onelake-data-hub/onelake-data-hub-data-items-list.png":::

The list has three tabs to narrow down the list of data items.

|Tab  |Description  |
|:-------------------------|:----------------------------------------------------|
| **All**                  | Data items that you're allowed to find.  |
| **My data**              | Data items that you own.      |
| **Endorsed in your org** | Endorsed data items in your organization that you're allowed to find. Certified data items are listed first, followed by promoted data items. For more information about endorsement, see the [Endorsement overview](../governance/endorsement-overview.md) |
| **Favorites** | Data items that you've marked as a favorite. |

The columns of the list are described below.

|Column  |Description  |
|:-----------------|:--------|
| **Name**         | The data item name. Select the name to open the item's details page. |
| **Endorsement**  | [Endorsement](../governance/endorsement-overview.md) status. |
| **Owner**        | Data item owner (listed in the *All* and *Endorsed in your org* tabs only). |
| **Workspace**    | The workspace the data item is located in. |
| **Refreshed**    | Last refresh time (rounded to hour, day, month, and year. See the details section on the item's detail page for the exact time of the last refresh). |
| **Next refresh** | The time of the next scheduled refresh (*My data* tab only). |
| **Sensitivity**  | Sensitivity, if set. Select the info icon to view the sensitivity label description. |

## Find items by workspace

Related data items are often grouped together in a workspace. To see the data items by workspace, expand the **Explorer** pane and select the workspace you're interested in. The data items you're allowed to see in that workspace will be displayed in the data items list.

:::image type="content" source="./media/onelake-data-hub/onelake-data-hub-explorer-pane.png" alt-text="Screenshot of the OneLake data hub Explorer pane.":::

> [!NOTE]
>The Explorer pane may list workspaces that you don't have access to if the workspace contains items that you do have access to (through explicitly granted permissions, for example). If you select such a workspace, only the items you have access to will be displayed in the data items list.

## Find recommended items

Use the tiles across the top of the data hub to find and explore recommended data items. Recommended data items are data items that have been [certified or promoted](../governance/endorsement-overview.md) by someone in your organization or have recently been refreshed or accessed.  Each tile contains information about the item and an [options menu](#open-an-items-options-menu) for doing things with the item. When you select a recommended tile, you are taken to the item's details page.

## Display only data items belonging to a particular domain

If [domains](../governance/domains.md) have been defined in your organization, you can use the domain selector to select a domain so that only data items belonging to that domain will be displayed. If an image has been associated with the domain, you’ll see that image on the data hub to remind you of the domain you're viewing.

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
