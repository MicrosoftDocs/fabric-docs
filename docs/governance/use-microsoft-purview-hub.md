---
title: The Microsoft Purview hub in Microsoft Fabric
description: This article describes how Fabric administrators can use the Microsoft Purview hub in Microsoft Fabric to monitor and govern their organization's data estate.
ms.reviewer: antonfr
ms.author: mimart
author: msmimart
ms.topic: how-to 
ms.custom: 
ms.date: 12/08/2024
---

# The Microsoft Purview hub (preview)

Microsoft Purview hub is a centralized place in Fabric that helps Fabric administrators manage and govern their organization's Fabric data estate. It contains reports that provide insights about sensitive data, item endorsement, and domains, and also serves as a gateway to more advanced capabilities in the Microsoft Purview portal such as Data Catalog, Information Protection, Data Loss Prevention, and Audit.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-view.png":::

## Requirements

Access to Purview hub requires the [Fabric administrator role](../admin/roles.md) or higher.

## Access the hub

To access the hub, navigate to the 'Admin monitoring' workspace (available to tenant admins only). In it you can open the Purview Hub report.
If this is the first time insights are being generated, it might take some time for them to appear.

## Get insights about the Microsoft Fabric data in your tenant

The Purview hub report provides visuals that lead you to actionable insights about how to improve the governance and security posture of your organization's data estate. Select the following tabs for brief descriptions of report pages.

# [Overview](#tab/overview)

:::image type="content" source="./media/use-microsoft-purview-hub/purview-hub-report-overview.png" alt-text="Screenshot of showing the Overview page of the Purview hub report, calling out the Take a tour button." lightbox="./media/use-microsoft-purview-hub/purview-hub-report-overview.png":::

The overview page provides high-level insights about your tenant's data estate. Select the **Take a tour** button in the navigation pane for a quick introduction to the main features of the report.

# [Sensitivity labels](#tab/sensitivity-labels)


:::image type="content" source="./media/use-microsoft-purview-hub/purview-hub-report-sensitivity-labels.png" alt-text="Screenshot of showing the sensitivity labels page of the Purview hub report, calling out the help button." lightbox="./media/use-microsoft-purview-hub/purview-hub-report-sensitivity-labels.png":::

The sensitivity label page helps you analyze sensitivity label coverage and the distribution of confidential data throughout your tenant. The interactive, interoperable visuals help you:

* Improve label coverage: You can set the label coverage goal to flag where label coverage isn't meeting org targets. You filter by domains, workspaces, item types, or creators. Select what you wish to explore and then, in the table, you can monitor related items. Use the **Only show unlabels items** to filter for unlabeled items only.

* Monitor your classified data: You can use the label filter to select the sensitivity label you wish to explore. You can then filter by domains, workspaces, item types, or creator to find and drill down on your org's sensitive data.

The side pane shows you insights based on your selections in the report.

Select the help button at the bottom of the navigation pane for guidance about using the page.

# [Endorsement](#tab/endorsement)


:::image type="content" source="./media/use-microsoft-purview-hub/purview-hub-report-endorsements.png" alt-text="Screenshot of showing the endorsements page of the Purview hub report, calling out the help button." lightbox="./media/use-microsoft-purview-hub/purview-hub-report-endorsements.png":::

The endorsements page helps you monitor endorsed items (promoted, certified, and master data) and see where items with the most access might need your attention. The page helps you:

* Promote items with high visibility: You can find candidates for promotion based on view access. For example, you can set a view-access threshold to flag items with that have high visibility but no endorsement.

* Monitor your endorsed items: You can filter items by their endorsement status: promoted, certified, and master data.

The side pane shows you insights based on your selections in the report.

Select the help button at the bottom of the navigation pane for guidance about using the page.

# [Domains](#tab/domains)


:::image type="content" source="./media/use-microsoft-purview-hub/purview-hub-report-domains.png" alt-text="Screenshot of showing the domains page of the Purview hub report, calling out the help button." lightbox="./media/use-microsoft-purview-hub/purview-hub-report-domains.png":::

The domains page helps you visualize and understand your org's data mesh structure and the distribution of items within it. For example, you can use the hierarchy tree to find workspaces that aren't associated with any domain. Select a domain/subdomain/workspace to drill through with the items explorer page.

Select the help button at the bottom of the navigation pane for guidance about using the page.

# [Items explorer](#tab/items-explorer)


:::image type="content" source="./media/use-microsoft-purview-hub/purview-hub-report-items-explorer.png" alt-text="Screenshot of showing the items explorer page of the Purview hub report, calling out the help button." lightbox="./media/use-microsoft-purview-hub/purview-hub-report-items-explorer.png":::

The items explorer page helps you monitor all the items in your tenant using granular filtering. You can use the items explorer's filters to find exactly the items you're looking for. You can see which items are located in personal workspaces, for instance, or which items were created by guest users, and much more.

Select the help button at the bottom of the navigation pane for help with using the page.

---

## Access Purview capabilities

The tiles at the top of the Purview hub provide access to Purview's advanced governance and compliance capabilities.

* **Get started with Microsoft Purview**: Opens a new tab to documentation to help you get started with Purview.
* **Data catalog**: Opens a new tab to the Microsoft Purview governance portal.
* **Information protection**: Opens a new tab to the Microsoft Purview compliance portal, where sensitivity labels and label policies can be defined and monitored.
* **Data loss prevention**: Opens a new tab to the Microsoft Purview compliance portal, where data loss prevention policies can be defined and monitored.
* **Audit**: Opens a new tab to the Microsoft Purview compliance portal, where activities regarding sensitivity labels and DLP policies recorded in the audit logs can be searched and retrieved with Purview's Audit solution.

> [!NOTE]
> For more information about the Purview capabilites that are available for Fabric users and administrators, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)

## Considerations and limitations

* The Purview hub report and its associated semantic model are generated in the admin monitoring workspace the first time any admin opens the Purview hub.
* The first time the report and semantic model are generated, it might take some time for them to appear.
* Fabric admins can create new reports based on the semantic model, but they can't edit the report or semantic model directly.
* The report retains information for 30 days, including the activities and metadata of deleted capacities, workspaces, and other items.
* Deleted workspaces with extended retention don't appear in the report after 30 days. They can be seen in the admin portal until they're permanently deleted.
* Items created and deleted within a 24 hour period may have incomplete information.

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)
