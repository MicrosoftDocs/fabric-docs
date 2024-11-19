---
title: The Microsoft Purview hub in Microsoft Fabric - Fabric administrators
description: This article describes how Fabric administrators can use the Microsoft Purview hub in Microsoft Fabric to monitor and govern their organization's data estate.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.custom: build-2023
ms.date: 11/19/2024
---

# The Microsoft Purview hub - admin view (preview)

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and users manage and govern their Fabric data estate. It contains reports that provide insights about sensitive data, item endorsement, and domains, and also serves as a gateway to more advanced capabilities in the Microsoft Purview governance and compliance portals such as Data Catalog, Information Protection, Data Loss Prevention, and Audit.

The Purview hub has a view for Fabric administrators and a view for Fabric data owners. This document describes the Fabric administrators' view.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

The administrator's view provides administrators insights about their organization's entire Fabric data estate, and links to capabilities in the Microsoft Purview portal to help them further analyze and manage governance of their organization's Fabric data.

| Page                   | Description                                                                    |
|:-----------------------|:-------------------------------------------------------------------------------|
| **Overview page**      | High level insights over your tenants.                                         |
| **Sensitivity labels** | Report over label coverage and look into the confidential data in the tenant.  |
| **Endorsements**       | Follow up after endorsed items (Promoted, Certified and Master data) and see where the items are with most access that may need your attention.|
| **Items explorer**     | Monitor all your items in the tenant using granular filtering.                 |
| **Take a tour**        | Use the build-in help to learn how to use Purview hub’s reports in best manner.|

## Requirements

Access to the admin view of the Purview hub requires the [Fabric administrator role](../admin/roles.md) or higher.

## Access the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

If this is the first time insights are being generated, it might take some time for them to appear.

## Get insights about the Microsoft Fabric data in your tenant

# [Sensitivity labels](#tab/sensitivity-labels)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-admin-sensitivity-label-page.png" alt-text="Screenshot showing the sensitivity label page of the Purview hub report.":::

# [Endorsement](#tab/endorsement)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-admin-endorsement-page.png" alt-text="Screenshot showing the endorsement page of the Purview hub report.":::

# [Domains](#tab/domains)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-admin-domains-page.png" alt-text="Screenshot showing the domains page of the Purview hub report.":::

# [Items explorer](#tab/items-explorer)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-admin-items-explorer-page.png" alt-text="Screenshot showing the items-explorer page of the Purview hub report.":::

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
* The first time the report and dataset are generated, it may take some time for them to to appear.
* Fabric admins can create new reports based on the dataset, but they can't edit the report or dataset directly.

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)