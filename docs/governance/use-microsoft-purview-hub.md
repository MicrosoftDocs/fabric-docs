---
title: The Microsoft Purview Hub in Microsoft Fabric
description: This article describes how to use the Microsoft Purview Hub in Microsoft Fabric to monitor and govern your Microsoft Fabric instance.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.custom: build-2023
ms.date: 10/28/2023
---

# The Microsoft Purview hub in Microsoft Fabric

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and users manage and govern their Fabric data estate. It contains reports that provide insights about sensitive data and item endorsement, and also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit.

The Purview hub has a view for Fabric administrators and a view for non-admin Fabric users.
* The administrator view provides visibility over the tenant's entire Fabric data estate.
* The non-adminstrator view provides users visibilty over their own Fabric content.

When you open the hub, you see the view that is appropriate for you. In the sections below, select the appropriate tab to see the information that is relevant to you.

# [Admin view](#tab/admin-view)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

# [Non-admin view](#tab/data-owner-view)

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub data owner view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

---

## Accessing the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

When you select the Microsoft Purview hub option, the hub opens to the appropriate view. If this is the first time insights are being generated, it make take a few moment for them to appear.

>[!NOTE]
> Some users won't be able to see a view when they select the **Microsoft Purview hub** option. See [Considerations and limitations for exceptions]().

# [Admin view](#tab/admin-view)

When a Fabric administrator opens the Purview hub, they see insights that include the entire Fabric data estate - all Fabric items, both data and non-data items, of all the users in the tenant. They can also select tiles to access Purview capabilites that can help them manage their tenant's data estate.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

# [Data owner view](#tab/data-owner-view)

When a data owner opens the Purview hub, they see insights that include just the Fabric data items that they own. They also can select tiles to access Purview capabilites that can help them govern their Fabric items.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-data-owner-view.png" alt-text="Screenshot of the Microsoft Purview hub data owner view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

---

For more information about the Fabric/Purview integration, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

## Get insights about your Microsoft Fabric data

Use the Microsoft Fabric data section of the hub to see insights about your Fabric data. It contains two reports that help you analyze the data.

# [Admin view](#tab/admin-view)

When a Fabric administrator opens the Purview hub, they see insights that include the entire Fabric data estate - all Fabric items, both data and non-data items, of all the users in the tenant. They can also select tiles to access Purview capabilites that can help them manage their tenant's data estate.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

* The items tab shows you insights about your organization's Fabric items - how many there are, what kinds they are, how many are promoted or certified, how these promoted and certified items are distributed throughout the workspaces, etc. Such insights might be used to drive adoption of certification in workspaces.

* The sensitivity tab shows you insights about the sensitivity labeling of your organization's Fabric items. You can see label coverage by workspace and by item type, you can see the ratio of labeled versus unlabeled items, and you can see which labels are used most.

The visuals in the reports are interactive, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you could filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label, so that you could reach out to the data owners and ask them to take action.

# [Data owner view](#tab/data-owner-view)

When a data owner opens the Purview hub, they see insights that include just the Fabric data items that they own. They also can select tiles to access Purview capabilites that can help them govern their Fabric items.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub data owner view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

---

For more information about the Fabric/Purview integration, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

* The items tab shows you insights about your organization's Fabric items - how many there are, what kinds they are, how many are promoted or certified, how these promoted and certified items are distributed throughout the workspaces, etc. Such insights might be used to drive adoption of certification in workspaces.

* The sensitivity tab shows you insights about the sensitivity labeling of your organization's Fabric items. You can see label coverage by workspace and by item type, you can see the ratio of labeled versus unlabeled items, and you can see which labels are used most.

The visuals in the reports are interactive, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you could filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label, so that you could reach out to the data owners and ask them to take action.

## View the Purview hub insights report

The Purview hub insights report enables administrators to visualize and analyze in greater details the extent and distribution of endorsement and sensitivity labeling throughout their organization's Fabric data estate. You can access the report by selecting the **Open full report** button in the Microsoft Purview hub. The report is located in the [Admin monitoring workspace](../admin/monitoring-workspace.md), and you can also access it directly from there.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png" alt-text="Screenshot of the Microsoft Purview hub full report." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png":::

The report contains the following pages:

* **Overview report**: Overview of distribution and use of endorsement and sensitivity labeling.
* **Endorsement report**: Drill down and analyze distribution and use of endorsement.
* **Sensitivity report**: Drill down and analyze distribution and use of sensitivity labeling.
* **Inventory report**: Get details about labeled and endorsed items. Can apply date ranges, filter by workspace, item type, etc.
* **Items page**: Insights about the distribution of items throughout your tenant, and endorsement coverage.
* **Sensitivity page**: Insights about sensitivity labeling throughout your entire tenant.

## Access Purview capabilities

The tiles at the top of the Purview hub provide access to Purview's advanced governance and compliance capabilities.

* **Get started with Microsoft Purview**: Opens a new tab to documentation to help you get started with Purview.
* **Data catalog**: Opens a new tab to the Microsoft Purview governance portal.
* **Information protection**: Opens a new tab to the Microsoft Purview compliance portal, where sensitivity labels and label policies can be defined and monitored.
* **Data loss prevention**: Opens a new tab to the Microsoft Purview compliance portal, where data loss prevention policies can be defined and monitored.
* **Audit**: Opens a new tab to the Microsoft Purview compliance portal, where activities regarding sensitivity labels and DLP policies recorded in the audit logs can be searched and retrieved with Purview's Audit solution.

> [!NOTE]
> Not all of the tiles mentioned above may be available at Public Preview.

## Next steps

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)
