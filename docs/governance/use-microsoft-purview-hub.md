---
title: The Microsoft Purview hub in Microsoft Fabric
description: This article describes how to use the Microsoft Purview hub in Microsoft Fabric to monitor and govern your Microsoft Fabric instance.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.custom: build-2023
ms.date: 11/05/2023
---

# The Microsoft Purview hub in Microsoft Fabric (preview)

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and users manage and govern their Fabric data estate. It contains reports that provide insights about sensitive data, item endorsement, and domains, and also serves as a gateway to more advanced capabilities in the Microsoft Purview governance and compliance portals such as Data Catalog, Information Protection, Data Loss Prevention, and Audit.

> [!NOTE]
> In this document, *Fabric administrators* refers to users who have the [Fabric administrator role](../admin/roles.md) or higher.

The Purview hub has a view for Fabric administrators and a view for other (non-admin) Fabric users.

* Fabric administrators see insights concerning their organization's entire Fabric data estate. They also see links to capabilities in the Microsoft Purview governance and compliance portals to help them further analyze and manage governance of their organization's Fabric data.

* Other users see insights about their own Fabric content and links to capabilities in the Microsoft Purview governance portal that help them further explore their data.

When you open the hub, the appropriate view opens. In the sections below, select the appropriate tab to see the information that is relevant to you. The following image shows the view for Fabric administrators.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

| Page                   | Description                                                                    |
|:-----------------------|:-------------------------------------------------------------------------------|
| **Overview page**      | High level insights over your tenants.                                         |
| **Sensitivity labels** | Report over label coverage and look into the confidential data in the tenant.  |
| **Endorsements**       | Follow up after endorsed items (Promoted, Certified and Master data) and see where the items are with most access that may need your attention.|
| **Items explorer**     | Monitor all your items in the tenant using granular filtering.                 |
| **Take a tour**        | Use the build-in help to learn how to use Purview hub’s reports in best manner.|


## Access the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

When you select the Microsoft Purview hub option, the hub opens to the view that is appropriate for you, and insights are generated. If this is the first time insights are being generated, it might take some time for them to appear.

>[!NOTE]
> If you're not a Fabric administrator and you don't own or haven't created any content, the hub won't contain any insights.
>
> For some users, the hub won't open at all when they select the **Microsoft Purview hub** option. See [Considerations and limitations for more detail about this exceptions](#considerations-and-limitations).

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

> [!NOTE]
> * The full Purview hub report and its associated dataset are generated in the admin monitoring workspace the first time any admin opens the Purview hub.
> * The first time the report and dataset are generated, it may take some time for them to to appear.
> * Fabric admins can create new reports based on the dataset, but they can't edit the report or dataset directly.

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

The following users can't access the Purview hub:
* Free users (a Power BI Pro or Premium Per User (PPU) license is required)
* Guest users

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)
