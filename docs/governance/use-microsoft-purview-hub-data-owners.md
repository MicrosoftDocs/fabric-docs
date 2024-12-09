---
title: The Microsoft Purview hub in Microsoft Fabric - data owners
description: This article describes how data owners can use the Microsoft Purview hub in Microsoft Fabric to monitor and govern the data they own in Microsoft Fabric.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.custom: build-2023
ms.date: 12/08/2024
---

# The Microsoft Purview hub for data owners (preview)

Microsoft Purview hub for data owners is a centralized page in Fabric that helps Fabric data owners manage and govern their data in Fabric. It contains reports that provide insights about sensitive data, item endorsement, and domains, and also serves as a gateway to further exploration in the Microsoft Purview portal.

:::image type="content" source="./media/use-microsoft-purview-hub-data-owners/microsoft-purview-hub-general-data-owner-view.png" alt-text="Screenshot of the Microsoft Purview hub data owner view." lightbox="./media/use-microsoft-purview-hub-data-owners/microsoft-purview-hub-general-data-owner-view.png":::

## Access the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub**.

:::image type="content" source="./media/use-microsoft-purview-hub-data-owners/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

The first time you open the Purview hub, it may take a few moments for the report and dataset to be generated.

>[!NOTE]
> If you don't own or haven't created any content, the hub won't contain any insights.
>
> For some users, the hub won't open at all when they select the **Microsoft Purview hub** option. See [Considerations and limitations for more detail about this exceptions](#considerations-and-limitations).

## Get insights about your Microsoft Fabric data

Use the Microsoft Fabric data section of the hub to see insights about your Fabric data. These insights cover the Fabric data items that you own. Two reports help you analyze the data.

* The **Items** tab shows you insights about your Fabric items - how many there are, what kinds they are, how many are promoted or certified, how these promoted and certified items are distributed throughout the workspaces, etc.

* The **Sensitivity** tab shows you insights about the sensitivity labeling of your Fabric items. You can see label coverage by workspace and by item type, you can see the ratio of labeled versus unlabeled items, and you can see which labels are used most.

The visuals in the reports are interactive, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you could filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label. Such insights can help you with your data governance efforts.

## View the Purview hub insights report

The Purview hub insights report enables data owners to visualize and analyze in greater detail the extent and distribution of endorsement and sensitivity labeling of the Fabric data they own.

You access the report by selecting **Open full report** in the Microsoft Purview hub. The report and its associated dataset get generated in your My Workspace, and you can also access the report from there.

:::image type="content" source="./media/use-microsoft-purview-hub-data-owners/microsoft-purview-hub-full-report-user.png" alt-text="Screenshot of the Microsoft Purview hub full report for nonadmin users." lightbox="./media/use-microsoft-purview-hub-data-owners/microsoft-purview-hub-full-report-user.png":::

The report contains the following pages:

* **Overview report**: Overview of endorsement and sensitivity labeling status of your Fabric items.
* **Sensitivity report**: Drill down and analyze distribution and use of sensitivity labeling on your Fabric items.
* **Endorsement report**: Drill down and analyze distribution and use of endorsement of your Fabric items.
* **Inventory report**: See an inventory of all your Fabric items. Can apply date ranges, filter by workspace, item type, etc.
* **Sensitivity page**: Insights about the sensitivity labeling of your Fabric items.
* **Items page**: Insights about the distribution of your Fabric items and their endorsement status.

> [!NOTE]
> * The full Purview hub report and its associated semantic model are generated in your *My Workspace* the first time you open the Purview hub.
> * The first time you open the Purview hub, it may take a few moments for the report and semantic model to be generated.
> * You can create new reports based on the semantic model, and you can also edit the report and/or semantic model directly. However, periodically the report and semantic model are automatically regenerated, and any changes you have made will be lost.

## Access Purview capabilities

The tiles at the top of the Purview hub provide access to Purview documentation and catalog capability.

* **Get started with Microsoft Purview**: Opens a new tab to documentation to help you get started with Purview.
* **Data catalog**: Opens a new tab to the Microsoft Purview governance portal.

> [!NOTE]
> For more information about the Purview capabilites that are available for Fabric data owners, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)

## Considerations and limitations

The following users can't access the Purview hub:
* Free users (a Power BI Pro or Premium Per User (PPU) license is required)
* Guest users

## Related content

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)
