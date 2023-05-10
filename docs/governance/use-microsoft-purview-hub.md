---
title: The Microsoft Purview Hub in Microsoft Fabric
description: This article describes how to use the Microsoft Purview Hub in Microsoft Fabric to monitor and govern your Microsoft Fabric instance.
ms.reviewer: antonfr
ms.author: painbar
author: paulinbar
ms.topic: how-to 
ms.date: 3/31/2023
---

# The Microsoft Purview hub in Microsoft Fabric

Microsoft Purview hub is your gateway to Microsoft Purview's powerful governance and compliance capabilities, such as Data Catalog, Information Protection, Data Loss Prevention, and Audit. With the deep integration of Purview in Fabric, you can discover how to use Purview's capabilities to get insights about your Fabric data. If you're an administrator, the hub also provides detailed insights about your tenant's entire Fabric data estate.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

>[!NOTE]
> Currently, in order to access the Purview hub you need to be at least a Power BI administrator.

For more information about the Fabric/Purview integration, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

## Accessing the hub

To access the hub, open the Fabric settings pane and choose **Microsoft Purview hub (preview)**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub link in Fabric settings.":::

## Get insights about your Microsoft Fabric data

Use the Microsoft Fabric data section of the hub to get insights about your Fabric data. It contains a report that helps you analyze the data.

* The items tabs shows you insights about the state of item endorsement.
* The sensitivity tab shows you insights about sensitivity labeling.

The visuals in the reports are interactive interoperable, and you can select items and drill down to get deeper insights into the endorsement and sensitivity label coverage of your data. For instance, you can filter on a workspace to see what items are in the workspace and how many of them are certified or promoted, or you can identify workspaces that have the greatest number of items with no sensitivity label so that you could reach out to the data owners and ask them to take action.

You can get to the full Purview hub insights report by selecting **Show full report**. The full report contains more detailed insights about your data.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png" alt-text="Screenshot of the Microsoft Purview hub full report." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png":::

The report is located in the [Admin monitoring workspace](../admin/monitoring-workspace.md), and you can also access it directly from there.

The report contains the following pages:

* Overview report: Overview of distribution and use of endorsement and sensitivity labeling.
* Endorsement report: Drill down and analyze distribution and use of endorsement.
* Sensitivity report: Drill down and analyze distribution and use of sensitivity labeling.
* Inventory report: Get details about labeled and endorsed items. Can apply date ranges, filter by workspace, item type, etc.
* Items page: Insights about the distribution of items throughout your tenant, and endorsement coverage.
* Sensitivity page: Insights about sensitivity labeling throughout your entire tenant.

## Next steps

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)