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

The Microsoft Purview hub is your gateway to using Microsoft Purview's powerful governance and compliance capabilities to help you manage your organization's sensitive data. It provides

* Purview insights about endorsement and sensitivity labeling in your Fabric data estate
* Entry points to the Microsoft Purview unified portal itself, where you can gain wider insights, not only about your Microsoft Fabric environment, but about your whole data estate.
* Links to documentation to help you get started implementing Purview governance and compliance capabilities in your organization.

For more information about the Fabric/Purview integration, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

## Accessing the hub

To access the hub, open the [Fabric settings pane](../get-started/fabric-settings.md#open-the-fabric-settings-pane) and choose **Microsoft Purview hub (preview)**.

:::image type="content" source="./media/use-microsoft-purview-hub/open-purview-hub.png" alt-text="Screenshot of the Microsoft Purview hub, admin view." lightbox="./media/use-microsoft-purview-hub/open-purview-hub.png":::

> [!NOTE]
> Currently the Microsoft Purview hub is available for Power BI administrators only.

## The hub at a glance

The hub has two main sections:

* [Microsoft Purview hub](#microsoft-purview-hub), which provides links to resources and entry points for getting started with and using Microsoft Purview governance and compliance capabilities.

* [Microsoft Fabric data](#microsoft-fabric-data), which provides insights about how Fabric items are distributed throughout your tenant and what the current state of endorsement is.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub, admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

## Microsoft Purview hub

The tiles in the Microsoft Purview hub section provide access to the locations you need for getting started with Microsoft Purview governance and compliance.

|Tile |Description|
|:--------|:--------------|
|**Get started with Microsoft Purview**| ?|
|**Data Catalog**| ?|
|**Information Protection**| Open the Microsoft Purview compliance portal where you define sensitivity labels and label policies.|
|**Data Loss Prevention**| Open the Microsoft Purview compliance portal where you define data loss prevention policies.|
|**Audit**:|?|

## Microsoft Fabric data

The Microsoft Fabric data section shows you insights about your Fabric data estate. It has two tabs that show you the **Items** and **Sensitivity** pages from the [Microsoft Purview hub report](#purview-hub-insights-report). From these two pages you can gain insights about how Fabric items are distributed throughout your tenant and what the current state of endorsement is.

### Items page

The items page provides oversight of all of the workspaces in your tenant. You can filter on each workspace to see what items are in the workspace and how many of them are certified or promoted. You can also use this view to identify where the certified items in your tenant are, and to see what types of items are being certified. Such insights might be used to drive adoption of certification in workspaces.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-fabric-data-item-view.png" alt-text="Screenshot of the Microsoft Purview hub, item page." lightbox="./media/use-microsoft-purview-hub/microsoft-fabric-data-item-view.png":::

### Sensitivity page

The sensitivity view provides insights about sensitivity labeling throughout your entire tenant. You can filter on specific labels to see what items have that label, and then further filter to see what types those items are, and which workspaces they’re located in.

You could also use label coverage by item type to see if there are certain items types that typically aren't getting labeled. You could then filter on them to identify workspaces that have the greatest number of unlabeled items so that you could reach out to the data owners and ask them to take action.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-fabric-data-sensitivity-view.png" alt-text="Screenshot of the Microsoft Purview hub, sensitivity page." lightbox="./media/use-microsoft-purview-hub/microsoft-fabric-data-sensitivity-view.png":::

## Purview hub insights report

The Purview hub insights report contains more detailed insights about your data. To open it, select the  **Open full report** but at the top of the report page in the Purview hub. The report is located in the [Admin monitoring workspace](../admin/admin-monitoring.md), and you can also access it directly from there.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png" alt-text="Screenshot of the Microsoft Purview hub, sensitivity page." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-full-report.png":::

The report contains the following pages:

* Overview report: Overview of distribution and use of endorsement and sensitivity labeling.
* Endorsement report: Drill down and analyze distribution and use of endorsement.
* Sensitivity report: Drill down and analyze distribution and use of sensitivity labeling.
* Inventory report: Get details about labeled and endorsed items. Can apply date ranges, filter by workspace, item type, etc.
* Items page: Insights about the distribution of items throughout your tenant, and endorsement coverage.
* Sensitivity page: Insights about sensitivity labeling throughout your entire tenant.

## Next steps

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md)