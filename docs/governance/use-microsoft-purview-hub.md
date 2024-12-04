---
title: The Microsoft Purview hub in Microsoft Fabric - Fabric administrators
description: This article describes how Fabric administrators can use the Microsoft Purview hub in Microsoft Fabric to monitor and govern their organization's data estate.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.custom: build-2023
ms.date: 12/04/2024
---

# The Microsoft Purview hub for administrators (preview)

Microsoft Purview hub for administrators is a centralized place in Fabric that helps Fabric administrators manage and govern their organization's Fabric data estate. It contains reports that provide insights about sensitive data, item endorsement, and domains, and also serves as a gateway to more advanced capabilities in the Microsoft Purview portal such as Data Catalog, Information Protection, Data Loss Prevention, and Audit.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-view.png":::

## Requirements

Access to the admin view of the Purview hub requires the [Fabric administrator role](../admin/roles.md) or higher.

## Access the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

If this is the first time insights are being generated, it might take some time for them to appear.

## Get insights about the Microsoft Fabric data in your tenant

The pages of the insights report provide visuals that help lead you to actionable insights about how to improve the governance and security posture of your organization's data estate.

| Page                   | Description                                                                    |
|:-----------------------|:-------------------------------------------------------------------------------|
| **Overview page**      | High level insights over your tenants.                                         |
| **Sensitivity labels** | Report over label coverage and look into the confidential data in the tenant.  |
| **Endorsements**       | Follow up after endorsed items (Promoted, Certified, and Master data) and see where the items are with most access that might need your attention.|
| **Items explorer**     | Monitor all your items in the tenant using granular filtering.                 |
| **Take a tour**        | Use the build-in help to learn how to use Purview hub’s reports in best manner.|

# [Overview](#tab/overview)

TBD

# [Sensitivity labels](#tab/sensitivity-labels)

* Improve label coverage: Set the label coverage goal to flag where label coverage isn't met. Filter by Domains, Workspaces, Item types, or Creators. Select what you wish to explore and, in the table, below you can monitor related items. Use the button to filter on unlabeled items only.

* Monitor your classified data: Use the label filter to select the sensitivity label you wish to explore, then filter by Domains, Workspaces, Item types, or Creator to find all your classified data.

# [Endorsement](#tab/endorsement)

* Promote items with high visibility: Find items candidates for promotion base on view access. Set view access threshold to flag items with high visibility and no endorsement.

* Monitor your endorsed items: Filter the items by endorsement: Promoted, Certified, and Master Data

# [Domains](#tab/domains)

Find workspaces that aren't associated to any domain with the hierarchy tree below: Select a Domain\ Subdomain\ Workspace to drill through with the items explorer page.

# [Items explorer](#tab/items-explorer)

Use the items explorer's filters to find exactly what items you're looking for in your tenant. You can find what items are located in personal workspaces, which items were created by guest users and much more.

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

* The full Purview hub report and its associated dataset are generated in the admin monitoring workspace the first time any admin opens the Purview hub.
* The first time the report and dataset are generated, it might take some time for them to appear.
* Fabric admins can create new reports based on the dataset, but they can't edit the report or dataset directly.

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)