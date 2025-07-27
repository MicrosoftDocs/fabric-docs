---
title: Re-create a Real-Time Dashboard from your Azure Data Explorer dashboards.
description: Learn how to migrate your Azure Data Explorer dashboards to Fabric Real-Time Dashboards while keeping your data in place.
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

#CustomerIntent: As a data analyst or BI professional, I want to migrate my existing Azure Data Explorer dashboards to Fabric Real-Time Dashboards so that I can leverage Fabric's enhanced features while keeping my data in place.
---

# Re-create Azure Data Explorer dashboards as Fabric Real-Time Dashboards

This article guides you through replicating your existing Azure Data Explorer (ADX) dashboards as Real-Time Dashboards in Microsoft Fabric. You'll learn how to re-create your dashboards while keeping your data in its current location.

Microsoft Fabric Real-Time Dashboards provide a modern alternative to Azure Data Explorer dashboards with enhanced features and better integration with the Fabric ecosystem. The process allows you to preserve your existing queries and visualizations while gaining access to improved functionality.

:::image type="content" source="media/real-time-dashboard/example-dashboard.png" alt-text="Screenshot of a Fabric Real-Time Intelligence dashboard displaying multiple tiles.":::

## Why re-create your ADX dashboards in Fabric?

Your organization might have multiple ADX dashboards that are used frequently to analyze and visualize critical data. 

The benefits of moving these dashboards to Fabric include:

* **Retain your data in place**: Keep your existing data architecture intact. Fabric connects directly to your Azure Data Explorer clusters, so you don't need to move your data.

* **Leverage new real-time features**: Take advantage of advanced functionalities like enhanced sharing and permission management, integration with PowerBI OrgApps, Git and ALM support, visual exploration capabilities and more.

* **Easy discovery of organizational dashboards**: Use Fabric’s Workspace advanced search and filter capabilities to locate your dashboards and easily browse through your organization’s dashboards.

* **Expand your analytics ecosystem**: Integrate your dashboards into the Fabric environment for unified data governance, scalability, and security.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [Azure Data Explorer cluster](/azure/data-explorer/create-cluster-database-portal)

## How to re-create your dashboards

Follow these steps to re-create your existing Azure Data Explorer dashboards to Fabric Real-Time Dashboards:

<!-- These steps will be automated.....remove or change when dev is ready. Also, add a link to this topic from ADX dashboard docs -->

### Step 1: Export your ADX dashboard

1. In the Azure Data Explorer web UI, navigate to your existing dashboard.
1. Select **Export** from the dashboard toolbar.
1. Choose **Export as JSON** to download the dashboard configuration.
1. Save the JSON file to a location where you can easily access it later.

### Step 2: Create a new Real-Time Dashboard

1. In the Fabric portal, navigate to your workspace.
1. Select **+ New** and then choose **Real-Time Dashboard**.
1. Enter a name for your new dashboard that clearly identifies it as the migrated version.
1. Select **Create** to create an empty Real-Time Dashboard.

### Step 3: Import your dashboard configuration

1. In the Real-Time Dashboard editor, select **Import**.
1. Upload the JSON file you exported from Azure Data Explorer.
1. Review the import preview to verify that all tiles and queries are recognized.
1. Address any compatibility issues or missing elements that are flagged during import.
1. Select **Import** to complete the process.

### Step 4: Validate and customize your dashboard

1. Review each tile to ensure data is displaying correctly.
1. Adjust visualizations as needed to take advantage of Real-Time Dashboard features.
1. Update any queries that may need modification for optimal performance.
1. Configure tile layouts and sizing to optimize the dashboard appearance.

### Step 5: Configure permissions and sharing

1. Set permissions for the Real-Time Dashboard:
   - Navigate to **Settings** > **Permissions**
   - Add users or groups with appropriate access levels
1. Configure data source permissions separately if needed.
1. Test access with different user roles to ensure permissions are working correctly.

## Troubleshooting common issues

If you encounter issues during migration:

- **Connection problems**: Verify your Azure Data Explorer cluster is accessible from Fabric and authentication is configured correctly.
- **Query compatibility**: Some KQL queries might need minor adjustments for optimal performance in Fabric.
- **Visualization differences**: Some chart types or formatting options differ between platforms.

## Related content

- [Explore data in Real-Time Dashboard tiles](dashboard-explore-data.md)
- [Real-Time Dashboard permissions](dashboard-permissions.md)
