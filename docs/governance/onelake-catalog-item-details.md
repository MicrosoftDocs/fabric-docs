---
title: Item details page 
description: Learn how to understand and use the item details view of Microsoft Fabric items.
author: msmimart
ms.author: mimart
ms.reviewer: nadavsc
ms.topic: overview
ms.date: 05/29/2025
ms.custom: 
#customer intent: As data engineer, data scientist, analyst, or business user, I want to understand the information I see on a item's item details view, and use the functionality that is provided there.
---

# View item details in the OneLake catalog

The item details page in the **OneLake Catalog Explorer** provides a comprehensive view of an item, including its metadata, lineage, permissions, and more. This page is designed to help users find, explore, and use items effectively across their organization.

The item details view includes several tabs that help you explore your selected item. These tabs are described in the following sections.

This page is useful for:

  * **Item owners**: Manage permissions, view refresh history, and track lineage to monitor and manage items.
  * **Developers and Analysts**: Access trust signals of an item, find high-quality data to use as starting points, and avoid creating redundant items.
  * **Consumers**: Find trustworthy apps, reports, and dashboards for day to day work.

To display the details page for an item in the OneLake Catalog, select the **Explore** tab, and then select an item in the list. The item details page opens to the side of the list.

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-item-details-view.png" alt-text="Screenshot of the explore tab item view overview tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-item-details-view.png":::


## About the item details view

The item details page features multiple tabs that vary by item type (for example, semantic model, dataflow, or pipeline), each providing relevant information and functionality. This article describes each tab, its contents, and the actions you can perform on the item details page.

### Overview tab

The **Overview** tab is the default view when you open an item in the OneLake Catalog Explorer. It shows the following information about the selected item:

  * **Description**: The description associated with the item, displayed under the item name. A useful and meaningful description helps users discover the right item for them.
  * **Location**: The workspace where the item is located. Selecting the workspace navigates to the workspace.
  * **Refreshed**: The last time the item was refreshed or run. A red warning icon appears if the last update was unsuccessful. Selecting the icon displays the error details. 
  * **Owner**: Displays the item owner or [contact](/power-bi/create-reports/service-item-contact). Selecting the name opens an email to them.
  * **Sensitivity label**: If applied, the name of the [sensitivity label](protected-sensitivity-labels.md) associated with the item.
  * **Tags**: If applied, the list of [tags](tags-overview.md) associated with the item.
  * **Endorsement**: [Endorsement](endorsement-overview.md) status and the details of the endorsing user. Endorsing your item (promoting or certifying it) makes it easier for users to find and signifies it's a trustworthy data source.

### Data schema in the Tables section

For data items like semantic models and lakehouses, the **Tables** section displays a structured view of the underlying table and column schema for the item.

  * Use the **Filter by keyword** box to search for a specific table or column.
  * To explore data in a table or column, point to it and select the binoculars icon. The [Explore this data](/power-bi/consumer/explore-data-service) view opens, which displays the data for ad-hoc analysis.

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-overview-tab.png" alt-text="Screenshot of the explore tab item view overview tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-overview-tab.png":::

### Details about semantic models

The information you can view about semantic models in OneLake Catalog Explorer depends on your access permissions:

  * **Discoverable**: These are semantic models that have been made [discoverable](/power-bi/collaborate-share/service-discovery) by their owner. Discoverable semantic models make it easier for users across the organization to find relevant data assets. While you can see the semantic model and its metadata, you can't see the owner details, view  the underlying data or build content on top of that semantic model. You need to **request access** (Build permission) to access the semantic model's full information and capabilities.
  * **Read-only Permission**: You might have read-only [permission on a semantic model](/power-bi/connect-data/service-datasets-permissions) if someone shared a report or semantic model with you but didn't grant you Build permission. With read-only access, you have limited access to semantic model information and capabilities. To be able to create content based on the semantic model or perform other actions, you must have at least Build permissions.
  * **Build Permission**: Semantic models for which you have [Build permission](/power-bi/connect-data/service-datasets-build-permissions) allows you to create new reports based on the semantic model, connect to it in Excel, and export data.

### Lineage tab

The **Lineage** tab shows you the upstream and downstream items in the item's lineage. Metadata about these related items is also shown, such as location, relation (upstream or downstream), etc.
Lineage can be displayed in either a list view or in a graph view.

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-lineage-tab.png" alt-text="Screenshot of the explore tab item view lineage tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-lineage-tab.png":::

The graph view visualizes the relationships between the items related to the current one. Items are represented by cards that provide some information about the related items. The current item is always highlighted.

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-lineage-graph-view.png" alt-text="Screenshot of graph view in the lineage tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-lineage-graph-view.png":::


For more information about lineage, see [Lineage in Fabric](lineage.md).

### Monitor tab

The **Monitor** tab displays historical activities for the item. Select **Show** on a record to see the details of that activity. The **Monitor** tab is available for item types supported by the [monitor hub](/admin/monitoring-hub.md).

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-monitor-tab.png" alt-text="Screenshot of the explore tab item view monitor tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-monitor-tab.png":::

### Permissions tab

The **Permissions** tab is available if you're a member of the Admin or Member workspace roles. This tab shows who has direct access to the item, what links exist that permit access to the item, what related items enable access to the item, and what access requests are pending. You can grant or modify user permissions, audit and remove links if necessary, and approve or reject access requests.

The subtabs available on the **Permissions** tab vary slightly from item type to item type. To see the actions you can perform on the rows of each subtab, point to the row and select **More options (...)**.

You can use the filter to sharpen the focus of your search.

:::image type="content" source="./media/onelake-catalog-item-details/onelake-catalog-explore-permissions-tab.png" alt-text="Screenshot of the explore tab item view permissions tab." lightbox="./media/onelake-catalog-item-details/onelake-catalog-explore-permissions-tab.png":::

-----

## Available actions in the item details view

The item details view enables you to perform a range of actions, depending on the artifact type and your permissions. These are categorized into general actions applicable to all item types, and specific actions unique to data or process items.

### General Actions

These actions are universally available across all item types in OneLake Catalog Explorer, depending on your permissions.

| Action | Description | Where to find it |
|---|---|---|
| **Settings** | Opens the settings page for the item. | **Settings** cog icon |
| **Manage permissions** | Opens the [manage permissions](/fabric/data-warehouse/share-warehouse-manage-permissions#manage-permissions) page for the item. | **File** \> **Manage permissions** |
| **Share** | Allows you to grant other users or group direct access to an item, without giving access to the workspace and the rest of its items. Depending on the item type, more options are available to control user permissions. | **Share** |
| **Open workspace lineage** | Shows the [lineage](/power-bi/collaborate-share/service-data-lineage) relationships between all the items in the current workspace, and data sources external to the workspace one-step upstream.| **Lineage** \> **Open workspace lineage** |
| **Impact analysis** | [Impact analysis](/power-bi/collaborate-share/service-dataset-impact-analysis) allows you to assess the potential impact of changes to this item on downstream workspaces and items that depend on it. | **Lineage** \> **Impact analysis** |
| **Chat in Teams** | Invite people to start [chatting in Teams](/power-bi/collaborate-share/service-share-report-teams). People you invite receive a Teams chat message with a link to this item's details page. If they have access to the item, the link opens this details page in Teams. | **...** \> **Chat in Teams** |

-----

### Item-Specific Actions

These actions are unique to particular artifact types, providing specialized functionality. They're categorized by whether the item is primarily a data source or a processing artifact.

#### Data Items

This section covers actions unique to Semantic Models, SQL Analytics Endpoints, Warehouses, SQL Databases, and Warehouse Snapshots.

| Item Type | Action | Description | Where to find it |
|---|---|---|---|
| **Common Data Item Actions** | **Refresh now** | Launches an immediate refresh of the item. | **Refresh** \> **Refresh now** |
| | **Schedule refresh** | Opens the settings page where you can configure [scheduled refresh](/power-bi/connect-data/refresh-scheduled-refresh). | **Refresh** \> **Schedule refresh** |
| **Semantic Model** | **Download this file** | Downloads the .pbix file for this semantic model. | **File** \> **Download this file** |
| | **Version History** | With [version history](/power-bi/transform-model/service-semantic-model-version-history), self-service users can recover from the most critical mistakes when editing their semantic models on the web. | **File** \> **Version history** |
| | **Explore this data** | A lightweight tool for quick, ad-hoc data analysis. [Explore the data](/power-bi/consumer/explore-data-service) to create matrix/visual pairs without building a full report. To Explore a specific table or column of a semantic model, point to it in the **Overview** tab and select the binoculars icon. | **Explore this data** \> **Explore this data** (or binoculars icon on Overview tab) |
| | **Auto-create a report** | [Automatically generates](/power-bi/create-reports/service-interact-quick-report) a summary report with key insights and visuals from the selected semantic model, which is useful for quick data checks. | **Explore this data** \> **Auto-create a report** |
| | **Create a blank report** | Opens the report editing canvas to a new report built on the semantic model. Saving your new report saves it in the workspace that contains the semantic model if you have write permissions for that workspace. If you don't have write permissions for the workspace, the new report saves in *My workspace*. | **Explore this data** \> **Create a blank report** |
| | **Create from template** | You can create a report template that users can use to get started building their own reports based on your semantic model. This template is a regular report designed to be used as a starting point. When you save it, you should add the suffix "(template)" to the report name, for example, *Monthly Sales (template)*. When a user selects **Create from template** in the details page, a copy of the template will be created in the user's *My workspace* and then opened in the report editing canvas. Report templates are also easily identifiable in the list of related reports in the semantic model details view. | **Explore this data** \> **From a template**. |
| | **Create a paginated report** | Opens the [paginated report](/power-bi/paginated-reports/web-authoring/paginated-formatted-table) editing canvas. You can then export it using the rich export functionality which retains the applied formatting & styling, or you can save it to a workspace of your choice.| **Explore this data** \> **Create a paginated report**. |
| | **Analyze in Excel** | Creates an [Excel workbook](/power-bi/collaborate-share/service-analyze-in-excel) containing the entire semantic model, allowing you to analyze it using PivotTables, Pivot Charts, and other Excel features. | Specific menu option |
| | **Prep data for AI** | Prepares the semantic model's data for use with AI capabilities. | Specific menu option |
| | **Best practice analyzer** | Runs a preconfigured notebook that analyzes the semantic model against a set of [best practices](/power-bi/transform-model/service-notebooks#best-practice-analyzer) to identify potential issues and provide recommendations for optimization. | **Model Health** \> **Best practice analyzer** |
| | **Memory analyzer** | Runs a preconfigured notebook that provides insights into the semantic model's [memory/storage consumption](/power-bi/transform-model/service-notebooks#model-memory-analyzer), helping to identify and resolve performance bottlenecks. | **Model Health** \> **Memory analyzer** |
| | **Community Notebooks** | Opens a gallery of community notebooks that can be used to further analyze and extend the semantic model. | **Model Health** \> **Community notebooks** |
| **SQL Analytics Endpoint, Warehouse, Warehouse Snapshot** | **Open in Visual Studio Code** | Shows the server connection information to [connect the SQL database](/fabric/database/sql/connect) server externally and offers to directly open VS Code. | Specific menu option |
| | **Open in SSMS** | Shows the server connection information to [connect the SQL database](/fabric/database/sql/connect) server externally in SQL Server Management Studio. | Specific menu option |
| | **Explore this data** |  A lightweight tool for quick, ad-hoc data analysis. [Explore the data](/power-bi/consumer/explore-data-service) allows you to create matrix/visual pairs without building a full report. | Specific menu option |
| | **Copy SQL connection string** | Copies the connection string needed to connect to the SQL endpoint from external tools. | Specific menu option |
| | **Analyze in Excel** | Creates an [Excel workbook](/power-bi/collaborate-share/service-analyze-in-excel) containing the item, allowing you to analyze it using PivotTables, Pivot Charts, and other Excel features. | **Analyze in Excel** |
| **SQL DB** | **Refresh Git sync status** | Refreshes the synchronization status with the connected Git repository. | Specific menu option |
| | **Open Performance summary** | Opens the [Performance Dashboard](/fabric/database/sql/performance-dashboard) to view database performance metrics, identify performance bottlenecks and find solutions to performance issues.| Specific menu option |
| | **Restore database** | [Recover your database](/fabric/database/sql/restore) into a specific point in time within the retention period | Specific menu option |
| **Warehouse Snapshot** | **Capture new state** | [Capture](/fabric/data-warehouse/warehouse-snapshot) a read-only representation of a warehouse item at a specific point in time, retained to up to 30 days. | Specific menu option |

#### Process Items

This section covers actions unique to Data Pipelines, Dataflow Gen2 CI/CD, and Notebooks.

| Item Type | Action | Description | Where to find it |
|---|---|---|---|
| **Common Process Item Actions** | **Save As** | Allows you to save a copy of the item to a workspace of your choice. | Specific menu option |
| | **Refresh now** | Launches an immediate refresh of the item. | **Refresh** \> **Refresh now** |
| | **Schedule refresh** | If your process item needs to be refreshed on a regular interval, you can schedule the refresh using the Fabric scheduler. | **Refresh** \> **Schedule refresh** |
| **Data Pipeline** | **Export** | Enables you to back up your pipelines. Exporting ensures that your data integration processes are portable and can be easily restored or replicated. | Specific menu option |
| | **Download** | Downloads the pipeline definition file. | Specific menu option |
| **Dataflow Gen2 CI/CD** | **Check Validation** | Determine the validity of the dataflow by running a "zero row" evaluation for all the queries in the dataflow. | Specific menu option |
| **Notebook** | **Download** | Downloads the notebook file. | Specific menu option |

## Considerations and limitations

  * Real-time semantic models don't have a details page, as they're being [retired](https://powerbi.microsoft.com/blog/announcing-the-retirement-of-real-time-streaming-in-power-bi/).
