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

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and users manage and govern their Fabric data estate. It contains reports that provide insights about sensitive data and item endorsement, and also serves as a gateway to more advanced capabilities in the Microsoft Purview governance and compliance portals such as Data Catalog, Information Protection, Data Loss Prevention, and Audit.

> [!NOTE]
> In this document, *Fabric administrators* refers to users who have the [Fabric administrator role](../admin/roles.md) or higher.

The Purview hub has a view for Fabric administrators and a view for other (nonadmin) Fabric users.
* Fabric administrators see insights concerning their organization's entire Fabric data estate. They also see links to capabilities in the Microsoft Purview governance and compliance portals to help them further analyze and manage governance of their organization's Fabric data.
* Other users see insights about their own Fabric content and links to capabilities in the Microsoft Purview governance portal that help them further explore their data.

When you open the hub, the appropriate view opens. In the sections below, select the appropriate tab to see the information that is relevant to you.

# [Fabric admins](#tab/admin-view)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

# [Other users](#tab/data-owner-view)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-data-owner-view.png" alt-text="Screenshot of the Microsoft Purview hub data owner view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-data-owner-view.png":::

---

## Access the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

When you select the Microsoft Purview hub option, the hub opens to the view that is appropriate for you, and insights are generated. If this is the first time insights are being generated, it might take some time for them to appear.

>[!NOTE]
> If you're not a Fabric administrator and you don't own or haven't created any content, the hub won't contain any insights.
>
> For some users, the hub won't open at all when they select the **Microsoft Purview hub** option. See [Considerations and limitations for more detail about this exceptions](#considerations-and-limitations).

## Get insights about your Microsoft Fabric data

# [Fabric admins](#tab/admin-view)

Use the Microsoft Fabric data section of the hub to see insights about your Fabric data. These insights cover your organization's entire Fabric data estate - that is, all Fabric items, both data and nondata items, of all the users in the organization. Two reports help you analyze the data.

* The **Items** report shows you insights about your organization's Fabric items - how many there are, what kinds they are, how many are promoted or certified, how these promoted and certified items are distributed throughout the workspaces, etc. Such insights might be used to drive adoption of certification in workspaces.

* The **Sensitivity** report shows you insights about the sensitivity labeling of your organization's Fabric items. You can see label coverage by workspace and by item type, you can see the ratio of labeled versus unlabeled items, and you can see which labels are used most.

The visuals in the reports are interactive, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you could filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label, so that you could reach out to the data owners and ask them to take action.

# [Other users](#tab/data-owner-view)

Use the Microsoft Fabric data section of the hub to see insights about your Fabric data. These insights cover the Fabric data items that you own. Two reports help you analyze the data.

* The **Items** tab shows you insights about your Fabric items - how many there are, what kinds they are, how many are promoted or certified, how these promoted and certified items are distributed throughout the workspaces, etc.

* The **Sensitivity** tab shows you insights about the sensitivity labeling of your Fabric items. You can see label coverage by workspace and by item type, you can see the ratio of labeled versus unlabeled items, and you can see which labels are used most.

The visuals in the reports are interactive, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you could filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label. Such insights can help you with your data governance efforts.

---

## View the Purview hub insights report

# [Fabric admins](#tab/admin-view)

The full Purview hub insights report enables Fabric administrators to visualize and analyze in greater detail the extent and distribution of endorsement and sensitivity labeling throughout their organization's Fabric data estate.

You access the report by selecting **Open full report** in the Microsoft Purview hub. The report and its associated dataset are located in the [Admin monitoring workspace](../admin/monitoring-workspace.md), and you can also access it directly from there.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report-admin.png" alt-text="Screenshot of the Microsoft Purview hub full report for admins." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report-admin.png":::

The report contains the following pages:

* **Overview report**: Overview of distribution and use of endorsement and sensitivity labeling.
* **Endorsement report**: Drill down and analyze distribution and use of endorsement.
* **Sensitivity report**: Drill down and analyze distribution and use of sensitivity labeling.
* **Inventory report**: Get details about labeled and endorsed items. Can apply date ranges, filter by workspace, item type, etc.
* **Items page**: Insights about the distribution of items throughout your organization, and endorsement coverage.
* **Sensitivity page**: Insights about sensitivity labeling throughout your entire organization.

> [!NOTE]
> * The full Purview hub report and its associated dataset are generated in the admin monitoring workspace the first time any admin opens the Purview hub.
> * The first time the report and dataset are generated, it may take some time for them to to appear.
> * Fabric admins can create new reports based on the dataset, but they can't edit the report or dataset directly.

# [Other users](#tab/data-owner-view)

The Purview hub insights report enables nonadmin Fabric users to visualize and analyze in greater detail the extent and distribution of endorsement and sensitivity labeling of the Fabric data they own.

You access the report by selecting **Open full report** in the Microsoft Purview hub. The report and its associated dataset get generated in your My Workspace, and you can also access the report from there.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report-user.png" alt-text="Screenshot of the Microsoft Purview hub full report for nonadmin users." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report-user.png":::

The report contains the following pages:

* **Overview report**: Overview of endorsement and sensitivity labeling status of your Fabric items.
* **Sensitivity report**: Drill down and analyze distribution and use of sensitivity labeling on your Fabric items.
* **Endorsement report**: Drill down and analyze distribution and use of endorsement of your Fabric items.
* **Inventory report**: See an inventory of all your Fabric items. Can apply date ranges, filter by workspace, item type, etc.
* **Sensitivity page**: Insights about the sensitivity labeling of your Fabric items.
* **Items page**: Insights about the distribution of your Fabric items and their endorsement status.

> [!NOTE]
> * The full Purview hub report and its associated dataset are generated in your *My Workspace* the first time you open the Purview hub.
> * The first time you open the Purview hub, it may take a few moments for the report and dataset to be generated.
> * You can create new reports based on the dataset, and you can also edit the report and/or dataset directly. However, periodically the report and dataset are automatically regenerated, and any changes you have made will be lost.

---

## Access Purview capabilities

# [Fabric admins](#tab/admin-view)

The tiles at the top of the Purview hub provide access to Purview's advanced governance and compliance capabilities.

* **Get started with Microsoft Purview**: Opens a new tab to documentation to help you get started with Purview.
* **Data catalog**: Opens a new tab to the Microsoft Purview governance portal.
* **Information protection**: Opens a new tab to the Microsoft Purview compliance portal, where sensitivity labels and label policies can be defined and monitored.
* **Data loss prevention**: Opens a new tab to the Microsoft Purview compliance portal, where data loss prevention policies can be defined and monitored.
* **Audit**: Opens a new tab to the Microsoft Purview compliance portal, where activities regarding sensitivity labels and DLP policies recorded in the audit logs can be searched and retrieved with Purview's Audit solution.

# [Other users](#tab/data-owner-view)

The tiles at the top of the Purview hub provide access to Purview documentation and catalog capability.

* **Get started with Microsoft Purview**: Opens a new tab to documentation to help you get started with Purview.
* **Data catalog**: Opens a new tab to the Microsoft Purview governance portal.

---

> [!NOTE]
> For more information about the Purview capabilites that are available for Fabric users and administrators, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)

## Considerations and limitations

The following users can't access the Purview hub:
* Free users (a Pro license is required)
* Guest users

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)
