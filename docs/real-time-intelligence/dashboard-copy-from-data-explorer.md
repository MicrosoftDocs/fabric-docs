---
title: Copy an Azure Data Explorer dashboard to Fabric.
description: Learn how to copy your Azure Data Explorer dashboard and save it as a Fabric Real-Time Dashboards while keeping your data in place.
ms.reviewer: mbar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/27/2025
ms.search.form: 
  - RealTimeDashboard
  - AzureDataExplorer
  - Dashboard
  - ADX

#CustomerIntent: As a data analyst or BI professional, I want to copy my existing Azure Data Explorer dashboards to Fabric Real-Time Dashboards so that I can leverage Fabric's enhanced features while keeping my data in place.
---

# Copy an Azure Data Explorer dashboard to Fabric RTI

This article guides you through replicating your existing Azure Data Explorer (ADX) dashboards as Real-Time Dashboards in Microsoft Fabric. You'll learn how to copy your dashboards while keeping your data in its current location.

Microsoft Fabric Real-Time Dashboards provide a modern alternative to Azure Data Explorer dashboards with enhanced features and better integration with the Fabric ecosystem. The process allows you to preserve your existing queries and visualizations while gaining access to improved functionality.

:::image type="content" source="media/real-time-dashboard/example-dashboard.png" alt-text="Screenshot of a Fabric Real-Time Intelligence dashboard displaying multiple tiles.":::

## Why copy your ADX dashboards to Fabric?

Your organization might have multiple ADX dashboards that are used frequently to analyze and visualize critical data. Moving these dashboards to Fabric Real-Time Dashboards can enhance collaboration, improve data governance, and provide a more seamless experience within the Fabric environment.

The benefits of moving these dashboards to Fabric include:

* **Retain your data in place**: Keep your existing data architecture intact. Fabric connects directly to your Azure Data Explorer clusters, so you don't need to move your data.

* **Leverage new real-time features**: Take advantage of advanced functionalities like enhanced sharing and permission management, integration with PowerBI OrgApps, Git and ALM support, visual exploration capabilities and more.

* **Easy discovery of organizational dashboards**: Use Fabric’s Workspace advanced search and filter capabilities to locate your dashboards and easily browse through your organization’s dashboards.

* **Expand your analytics ecosystem**: Integrate your dashboards into the Fabric environment for unified data governance, scalability, and security.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [Azure Data Explorer cluster](/azure/data-explorer/create-cluster-database-portal)
* Verify your Azure Data Explorer cluster is accessible from Fabric and authentication is configured correctly.

## How to copy the ADX dashboard to Fabric

Follow these steps to re-create your existing Azure Data Explorer dashboards to Fabric Real-Time Dashboards:

1. In the Azure Data Explorer web UI, navigate to your existing dashboard.

1. Select **Save a copy to Fabric**. You can find this option in many places, including the dashboard's file menu or the top-right corner of the dashboard interface. In the dialog, select **Save a copy to Fabric** again.

    :::image type="content" source="media/real-time-dashboard/copy-from-fabric.png" alt-text="Screenshot of the Save a copy to Fabric option in the Azure Data Explorer dashboard.":::

1. The copy process begins, and a new Fabric tab opens where you are prompted to create a copy of the dashboard. Keep or modify the dashboard name, decide on the current or another workspace, and select **Create**.

    :::image type="content" source="media/real-time-dashboard/copy-from-fabric-create.png" alt-text="Screenshot of the dialog to create a copy of the dashboard in Fabric.":::

1. You can now explore the dashboard tiles in Fabric. Each tile corresponds to a query from the original ADX dashboard.

1. If you want to share the dashboard with others, configure the appropriate permissions in Fabric. 

## Troubleshooting common issues

If you encounter issues during migration:

- **Connection problems**: Verify your Azure Data Explorer cluster is accessible from Fabric and authentication is configured correctly.
- **Query compatibility**: Some KQL queries might need minor adjustments for optimal performance in Fabric.
- **Visualization differences**: Some chart types or formatting options differ between platforms.

## Related content

- [Explore data in Real-Time Dashboard tiles](dashboard-explore-data.md)
- [Real-Time Dashboard permissions](dashboard-permissions.md)
