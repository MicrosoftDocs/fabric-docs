---
title: Discover and explore Fabric items using OneLake catalog's explore tab
description: Learn how to discover, explore, manage, and use your organization's Fabric items in the OneLake catalog.
author: msmimart
ms.author: mimart
ms.reviewer: yaronc
ms.topic: overview
ms.date: 05/29/2025
ms.custom: 
#customer intent: As data engineer, data scientist, analyst, decision maker, or business user, I want to use OneLake catalog's Explore to discover, manage, and use the content I need.
---

# Find and explore data in the OneLake catalog

OneLake catalog's explore tab helps you find, explore, and use the Fabric items you need. It features an items list with an in-context item details view that makes it possible to browse through and explore items without losing your list context. The explore tab also features selectors and filters to narrow down and focus the list, making it easier to find what you need.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-tab-general-view.png" alt-text="Screenshot showing the main parts of the OneLake catalog explore tab." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-tab-general-view.png" border="false"::: 

The explore tab provides

* [A list of all Fabric items you have access to in your organization](#find-items-in-the-items-list).
* [An item details view that enables you to drill down on an item without leaving the context of the explore tab](./onelake-catalog-item-details.md).
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

> [!TIP]
> The workspace filter can help you find the workspace your looking for. Select the magnifying glass icon to open the filter.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-workspace-filter.png" alt-text="Screenshot of the explore tab's workspaces filter." lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-workspace-filter.png":::

The preceding image shows the *Sales Org* workspace selected in the Workspaces section. Because the item classification selector is set to *Data types*, only semantic models are shown (as no other type of data items are present in this workspace). The semantic model *Contoso FY21 goals* is selected, and its details are shown in the item details view. To explore the details of other items in the list, just select them. The item details view stays open until you dismiss it. This makes it easy to browse the details of items one after another, without losing your list context.

> [!NOTE]
>Generally, the **Workspaces** section only displays workspaces you have access to. However, workspaces you don't have access to might be listed if the workspace contains items that you do have access to (through explicitly granted permissions, for example) or that have been configured as [discoverable](/power-bi/collaborate-share/service-discovery). If you select such a workspace, only the items you have access to and any discoverable items will be displayed in the items list.

## Open an item's options menu

Each item in the items list has an options menu that enables you to do things, such as open the item's settings, manage item permissions, etc. The options available depend on the item and your permissions on the item.

To display the options menu, hover over the item whose options menu you want to see and select **More options (...)**.

:::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-options-menu.png" alt-text="Screenshot of an item's option menu in the OneLake catalog." border="false" lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-options-menu.png":::

## Open an item for editing or viewing

You can open the item for editing or viewing (depending on the item type) from both the items list and from the [item details view](./onelake-catalog-item-details.md).

* To open the item for editing or viewing from the items list, hover over the item and select the **Open** icon that appears.

    :::image type="content" source="./media/onelake-catalog-explore/onelake-catalog-explore-edit-view-mode.png" alt-text="Screenshot of an item's open icon in the OneLake catalog." border="false" lightbox="./media/onelake-catalog-explore/onelake-catalog-explore-edit-view-mode.png":::

* To open the item for editing or viewing from the [item details view](./onelake-catalog-item-details.md), select the **Open** button in the view.

## Create AI Auto-Summary for Semantic Models (Preview)

The Auto-Summary for semantic models uses AI to generate a high-level summary that helps you quickly understand an item’s purpose and main characteristics without opening the item or reviewing its full metadata. It makes it easier to understand unfamiliar items and compare them directly in the OneLake catalog explorer.

The summary is created based on the item’s metadata and structure. Users with the appropriate Copilot capacity and permissions can generate the summary from the quick actions in the main explore tab or directly from the semantic model’s item details page. Each time you return to the catalog, a new summary can be generated so you always see the most up-to-date version.

After a summary is generated, you can generate another version, copy the text for use elsewhere, or provide feedback on the quality.  

:::image type="content" source="media/onelake-catalog-explore/semantic-model-auto-summary-button.png" alt-text="Screenshot of OneLake catalog Explorer with AI summary button and Copilot summary icon highlighted for a semantic model." lightbox="media/onelake-catalog-explore/semantic-model-auto-summary-button.png":::

:::image type="content" source="media/onelake-catalog-explore/semantic-model-auto-summary-example.png" alt-text="Screenshot of OneLake Explorer with an example of an AI summary panel expanded." lightbox="media/onelake-catalog-explore/semantic-model-auto-summary-example.png":::

## View item details
When you select an item from the items list, its detailed information appears in a dedicated pane alongside your current view. This in-context view allows you to quickly browse through item metadata, lineage, and permissions without losing your place in the item list, making it easy to compare and find the most suitable items. For a comprehensive understanding of how item details are presented and the various ways you can access them, refer to [View item details](./onelake-catalog-item-details.md).

## Considerations and limitations

* Streaming semantic models are being retired and thus aren't shown. For more information, see [Announcing the retirement of real-time streaming in Power BI](https://powerbi.microsoft.com/blog/announcing-the-retirement-of-real-time-streaming-in-power-bi/).

## Related content

* [OneLake catalog overview](./onelake-catalog-overview.md)
* [View item details](./onelake-catalog-item-details.md)
* [Monitor and improve your data's governance posture with the OneLake catalog](./onelake-catalog-govern.md)
* [Endorsement](./endorsement-overview.md)
* [Fabric domains](./domains.md)
* [Lineage in Fabric](./lineage.md)
* [Monitor hub](../admin/monitoring-hub.md)
