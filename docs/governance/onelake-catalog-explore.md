---
title: Discover and explore Fabric items using OneLake catalog's explore tab
description: Learn how to discover, explore, manage, and use your organization's Fabric items in the OneLake catalog.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: overview
ms.date: 01/20/2025
ms.custom: ignite-2024-fabric, ignite-2024
#customer intent: As data engineer, data scientist, analyst, decision maker, or business user, I want to use OneLake catalog's Explore to discover, manage, and use the content I need.
---

# Find and explore data in the OneLake catalog

OneLake catalog's explore tab helps you find, explore, and use the Fabric items you need. It features an items list with an in-context item details view that makes it possible to browse through and explore items without losing your list context. The explore tab also features selectors and filters to narrow down and focus the list, making it easier to find what you need.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-tab-general-view.png" alt-text="Screenshot showing the main parts of the OneLake catalog explore tab." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-tab-general-view.png" border="false"::: 

The explore tab provides

* [A list of all Fabric items you have access to in your organization](#find-items-in-the-items-list).
* [An item details view that enables you to drill down on an item without leaving the context of the explore tab](#view-item-details).
* [Filters and selectors to help you find the content you're looking for](#filter-the-items-list).
* [A way to scope the catalog to display only items of a particular domain](#scope-the-catalog-to-a-particular-domain).
* [An options menu for item actions](#open-an-items-options-menu)

This article explains what you see in the explore tab and describes how to use it.

## Open the explore tab

To open the explore tab, select the OneLake catalog icon in the Fabric navigation pane and then select the explore tab.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-open.png" alt-text="Screenshot showing how to open the OneLake catalog." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-open.png":::

## Find items in the items list

The items list displays all the Fabric items you have access to, or can directly request access to. See [NOTE](#onelake-catalog-dlp-note) for details.

* To shorten the list, use the explore tab's filters and selectors.

* To view item details, select the item.

* To view an item's [options menu](#open-an-items-options-menu), hover over the item and select the three dots that appear.

The following table describes the list columns.

|Column  |Description  |
|:-----------------|:--------|
| **Name**         | The item name. To explore item details, select the name. |
| **Type**         | The item type. |
| **Owner**        | Item owner. |
| **Refreshed**    | Last refresh time of data items (rounded to hour, day, month, and year. See the details section in item's details for the exact time of the last refresh). |
| **Location**    | The workspace the item is located in. |
| **Endorsement**  | [Endorsement](../governance/endorsement-overview.md) status. |
| **Sensitivity**  | Sensitivity, if set. Select the info icon to view the sensitivity label description. |

<a name="onelake-catalog-dlp-note"></a>

> [!NOTE]
> The explore tab also lists the following items even if you don't have access to them. This is to enable you to request access.
> * Semantic models that have been configured as [discoverable](/power-bi/collaborate-share/service-discovery).
> * Power BI reports whose associated semantic model has violated a [data loss prevention policy that restricts access](/purview/dlp-powerbi-get-started#how-do-dlp-policies-for-fabric-work).

## Scope the catalog to a particular domain

If domains have been defined in your organization, you can use the OneLake catalog's domain selector to select a domain or subdomain. Only workspaces and items and belonging to the selected domain or subdomain will be displayed and treated in the explore tab. Your selection persists for subsequent sessions.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-domains-selector.png" alt-text="Screenshot of the domains selector in the OneLake catalog.":::

For more information about domains, see [Fabric domains](./domains.md).

## Filter the items list

You can use the filters in the filter pane and the [item type](#find-items-by-item-type-category) and [tag selectors](#find-items-by-tag) at the top of the items list to narrow down the items list so it displays just the types of items you're interested in. You can then select items to explore them in more detail.

The filters pane contains several [predefined filters](#filter-items-by-predefined-filters), and also enables you to [filter by workspace](#filter-items-by-workspace).

### Filter items by predefined filters

The filters pane contains several predefined filters. These filters operate across workspaces, showing all the applicable items from across your tenant/domain, as long as **All workspaces** is selected as the workspaces filter. They're described in the following table.

|Filter  |Description  |
|:-------------------------|:----------------------------------------------------|
| **All Items**                  | Items that you're allowed to find.  |
| **My items**              | Items that you own.      |
| **Endorsed items** | Endorsed items in your organization that you're allowed to find. Certified data items are listed first, followed by promoted data items. For more information about endorsement, see the [Endorsement overview](../governance/endorsement-overview.md) |
| **Favorites** | Items that you have marked as favorites. |

### Find items by item type category

Fabric items are categorized into buckets based on what they are for and where they fit into the task flow. For example, items that contain data, such as lakehouses and semantic models, are categorized as *Data types*, while reports and dashboards are categorized as *Insight types*. Use the item type category selector to select the item type category you're interested in.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-item-type-selector.png" alt-text="Screenshot of the OneLake catalog's item type selector.":::

### Find items by tag

Use the tags selector to display items tagged with the tags you select.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-tags-selector.png" alt-text="Screenshot of the explore tab's tags selector.":::

> [!NOTE]
> The tag selector is only visible if tags are enabled in your organization.

### Filter items by workspace

Related items are often grouped together in a workspace. To find items by workspace, find and select the workspace you're interested in under the **Workspaces** heading in the filters pane. The items you're allowed to see in that workspace will be displayed in the items list.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-workspace-filter.png" alt-text="Screenshot of the explore tab's workspaces filter.":::

The preceding image shows the *Sales Org* workspace selected in the Workspaces section. Because the item classification selector is set to *Data types*, only semantic models are shown (as no other type of data items are present in this workspace). The semantic model *Contoso FY21 goals* is selected, and its details are shown in the item details view. To explore the details of other items in the list, just select them. The item details view stays open until you dismiss it. This makes it easy to browse the details of items one after another, without losing your list context.

> [!NOTE]
>Generally, the **Workspaces** section only displays workspaces you have access to. However, workspaces you don't have access to might be listed if the workspace contains items that you do have access to (through explicitly granted permissions, for example) or that have been configured as [discoverable](/power-bi/collaborate-share/service-discovery). If you select such a workspace, only the items you have access to and any discoverable items will be displayed in the items list.

## Open an item's options menu

Each item in the items list has an options menu that enables you to do things, such as open the item's settings, manage item permissions, etc. The options available depend on the item and your permissions on the item.

To display the options menu, hover over the item whose options menu you want to see and select **More options (...)**.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-options-menu.png" alt-text="Screenshot of an item's option menu in the OneLake catalog." border="false":::

## View item details

The items details view enables you to drill down and explore items. Select an item in the items list display its details.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-item-details-view.png" alt-text="Screenshot of the explore tab item details view.":::

Tap **Open** to open the item's editor.

The item details view has a number of tabs that to help you explore your selected item. The tabs are described in the following sections.

### Overview tab

The overview tab shows the following information:

* **Location**: The workspace the item is located in. Selecting the workspace navigates to the workspace.
* **Data updated**: Last update time.
* **Owner**: The item owner. Selecting the owner opens an email to them.
* **Sensitivity label**: The name of the sensitivity label applied to the item, if any.

Data items such as semantic models and lakehouses show the underlying table and column schema for exploration purposes.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-overview-tab.png" alt-text="Screenshot of the explore tab item view overview tab." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-overview-tab.png":::

### Lineage tab

The lineage tab shows you the upstream and downstream items in the item's lineage. Metadata about the upstream and downstream items is also show, such as location, relation (upstream or downstream), etc. Lineage can be displayed in either a list view (shown in the image that follows) or in a graphical view.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-lineage-tab.png" alt-text="Screenshot of the explore tab item view lineage tab." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-lineage-tab.png":::

For more information about lineage, see [Lineage in Fabric](./lineage.md).

### Monitor tab

The monitor tab displays activities for the item. Press **Show** on a record to see the details of that activity. The monitor tab is available for items types supported by the [monitor hub](../admin/monitoring-hub.md).

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-monitor-tab.png" alt-text="Screenshot of the explore tab item view monitor tab." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-monitor-tab.png":::

## Considerations and limitations

* The explore tab doesn't currently support the following item types: AI Skill, Exploration, Graph, Metric Set, Org App, Real-Time Dashboard.

* Streaming semantic models are being retired and thus aren't shown. For more information, see [Announcing the retirement of real-time streaming in Power BI](https://powerbi.microsoft.com/blog/announcing-the-retirement-of-real-time-streaming-in-power-bi/).

## Related content

* [OneLake catalog overview](./onelake-catalog-overview.md)
* [Monitor and improve your data's governance posture with the OneLake catalog](./onelake-catalog-govern.md)
* [Endorsement](./endorsement-overview.md)
* [Fabric domains](./domains.md)
* [Lineage in Fabric](./lineage.md)
* [Monitor hub](../admin/monitoring-hub.md)