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

* Purview insights about your Fabric data estate
* Entry points to the Microsoft Purview unified portal itself, where you can gain wider insights, not only about your Microsoft Fabric environment, but about your whole data estate.
* Links to documentation to help you get started implementing Purview governance and compliance capabilities in your organization.

For more information about the Fabric/Purview integration, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

## Accessing the hub

Currently the Microsoft Purview hub is available for Power BI administrators only.

To access the hub, open the [Fabric settings pane](../get-started/fabric-settings.md#open-the-fabric-settings-pane) and choose **Microsoft Purview hub (preview)**.

> [!NOTE]
> Currently the Microsoft Purview hub is available for Power BI administrators only.

## The hub at a glance

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png" alt-text="Screenshot of the Microsoft Purview hub, admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-purview-hub-general-admin-view.png":::

The main components of the hub are described below.

|Item | Name                               | Description                                               |
|:--------|:-----------------------------------|:----------------------------------------------------------|
|1    | Get started with Microsoft Purview | Link to?                                                  |
|2    | Data Catalog                       | Links to Purview Data Catalog with all of my data estate                                                  |
|3    | Information Protection             | Link to?                                                  |
|4    | Data Loss Prevention               | Link to?                                                  |
|5    | Audit                              | Microsoft Purview Audit                                                  |
|6    | Microsoft Fabric data              | Insights about how Fabric items are distributed throughout your tenant the status of endorsement. |

## Get insights about your Microsoft Fabric data

The Microsoft Fabric data section provides two summary pages from the d gives you insights about your organization’s data in Microsoft Fabric. What you see depends on your role.

The admin view of the Microsoft Fabric data dashboard gives you insights about your organization’s data in Microsoft Fabric. As Fabric administrator, you'll see insights that cover all the items in your tenant.

### Item view

The Items view provides oversight of all of the workspaces in your tenant. You can filter on each workspace to see what items are in the workspace and how many of them are certified or promoted. You can also leverage this view to identify where the certified items in your tenant are, see what item types of items are being certified. Such insights might be used to drive adoption of certification in workspaces. 

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-fabric-data-item-view.png" alt-text="Screenshot of the Microsoft Purview hub, admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-fabric-data-item-view.png":::

### Sensitivity view

The Sensitivity view provides insights about sensitivity labeling throughout your entire tenant. You can filter on specific labels to see what items have that label, and then further filter to see what types those items are, and which workspaces they’re located in.

You could also use label coverage by item type to see if there are certain items types that typically aren't getting labeled. You could then filter on them to identify workspaces that have the greatest number of unlabeled items so that you could reach out to the data owners and ask them to take action.

:::image type="content" source="./media/use-microsoft-purview-hub/microsoft-fabric-data-sensitivity-view.png" alt-text="Screenshot of the Microsoft Purview hub, admin view." lightbox="./media/use-microsoft-purview-hub/microsoft-fabric-data-sensitivity-view.png":::

### Purview hub insights report

To get more detailed insights about your data, open the full Microsoft Purview hub insights report by selecting **Open full report** at the top of the insights dashboard. You can also access this report in the [Admin monitoring workspace](../admin/admin-monitoring.md).

## Get insights about your entire data estate in the Microsoft Purview portal

Link to Microsoft Purview to see more information, not only about your Microsoft Fabric environment, but your whole data estate. This will take you to the Microsoft Purview unified portal...

Description of available links with links listed here that point to the rest of the documentation with brief descriptions.

- Data Catalog
- Information Protection
- Data Loss Prevention
- Audit

## Get started with Microsoft Purview governance and compliance for your Fabric data

* Information protection/sensitivity labels
* DLP

Description of available links with links listed here that point to the rest of the documentation with brief descriptions.

- Data Catalog
- Information Protection
- Data Loss Prevention
- Audit

## Next steps

* [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric)