---
title: Discover Fabric content in the OneLake data hub
description: Learn how you can find, explore, and use the Fabric items in your organization.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: conceptual
ms.date: 04/30/2023
ms.custom: 
---

# Discover Fabric content in the OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the data items in your organization. It provides information about the items as well as entry points for working with them, such as accessing settings, managing permissions, and more. To explore more details about an item and its related items, you select an item to open its details page.

This article explains what you see on the data hub and describes how to use it.

:::image type="content" source="./media/onelake-data-hub/data-hub-main-page.png" alt-text="Screenshot of data hub main page.":::

## What data items do I see in the data hub?

For a data item to show up in the data hub, it must be located in a [workspace that you have access to](../collaborate-share/service-new-workspaces.md).

>[!NOTE]
> To be fully functional, the data hub requires that the [Use datasets across workspaces](../admin/service-admin-portal-workspace.md#use-datasets-across-workspaces) admin setting be enabled. If this setting is not enabled, you won't be able to access the data items you see listed in the data hub unless the item is in your *My Workspace* or you have an Admin, Member, or Contributor role in the workspace where the item is located.

## Find the data you need

The data discovery experience starts on the OneLake data hub. To get to the data hub:

* In Fabric: Select **OneLake Data hub** in the navigation pane.

The data hub has two sections:
* Recommended data items
* A filterable list of data items

## Recommended items

Recommended data items are data items that have been certified or promoted by someone in your organization or have recently been refreshed or accessed.

![Screenshot of recommended items on the data hub.](media/onelake-data-hub/recommended-data-items.png)

1. Open the data item's details page.
1. Show a summary of the data item's details.
1. Open the actions menu.

## Data item list

![Screenshot of the data items list on the data hub.](media/onelake-data-hub/data-items-list.png)

1. Open the data item's details page.
1. Open the actions menu.
1. Hover to view the data item's description. 

The list has three tabs to filter the list of data items.
* **All**: Shows all the data items that you are [allowed to find](#what-data-items-do-i-see-in-the-data-hub).
* **My data**: Shows all the data resources that you are the owner of.
* **Trusted in your org**: Shows all the endorsed data resources in your organization that you are [allowed to find](#what-data-items-do-i-see-in-the-data-hub). Certified data resources are listed first, followed by promoted data resources.

Use the search box and filters to narrow down the list of items. You can type into the **Filter by Keyword** box to search for a particular string, or you can use the filters to display only the selected data item types.

The columns of the list are described below. 
* **Name**: The data item name. Click the name to open the item's details page.
* **Endorsement**: Endorsement status.
* **Owner**: Data item owner (All and Trusted in your org tabs only).
* **Workspace**: The workspace the data item is located in.
* **Refreshed**: Last refresh time (rounded to hour, day, month, and year. See the details section on the item's detail page for the exact time of the last refresh).
* **Next refresh**: The time of the next scheduled refresh (My data tab only).
* **Sensitivity**: Sensitivity, if set. Click on the info icon to view the sensitivity label description.

## Create new reports or pull data into Excel via Analyze in Excel

To create a new report based on a data item, or to pull the data into Excel with [Analyze in Excel](../collaborate-share/service-analyze-in-excel.md), select **More options (...)**, either at the bottom right corner of a recommended tile or on a data item's line in the list of data items. Other actions may appear on the drop-down menu, depending on the permissions you have on the item.

When you create a new report based on a data item, the report edit canvas opens. When you save the new report, it will be saved in the workspace that contains the data item if you have write permissions on that workspace. If you don't have write permissions on that workspace, or if you are a free user and the data item resides in a Premium-capacity workspace, the new report will be saved in your *My workspace*.

## View data item details and explore related reports

To see more information about a data item, to explore related reports, or to create a new report based on the item, select the item from the recommended items or from the items list. The item's detail page will open. This page shows you information about the item, lists the reports that are built on top of it, and provides entry points for creating new reports or pulling the data into Excel via [Analyze in Excel](../collaborate-share/service-analyze-in-excel.md). See [Data details page](./service-data-details-page.md) for more information.

## Read-only permission for datasets

You get read-only permission on a dataset when someone shares a report or dataset with you but doesn’t grant you build permission on the dataset.

With read-only access, you can view some information about the dataset on the data hub and on the dataset's details page, as well as perform a limited number of actions on the dataset, but you can’t build new content based on the dataset. To be able to create content based on the dataset, or to perform other actions, you must have at least [build permissions](service-datasets-build-permissions.md) on the dataset.

To request build permission on a dataset, do one of the following:

* From the data hub: Find the dataset in the data items list, hover over it with the mouse, and click the **Request access** icon that appears

    :::image type="content" source="media/onelake-data-hub/datasets-request-access-icon.png" alt-text="Screenshot of the request access icon on the data hub.":::

* From the dataset's details page, click the **Request access** button at the top right corner of the page.

    :::image type="content" source="media/onelake-data-hub/datasets-request-access-button.png" alt-text="Screenshot of the request access icon on the dataset details page.":::

## Users with free licenses

Users with free licenses are known as free users. Free users can see all the datasets in their "My workspace", and most data hub capabilities will be available to them on those datasets, with the exception of **Share**, **Save a copy**, **Manage permissions**, and **Create from template**.

For datasets in other workspaces, free users can see all the datasets that have been shared with them and that they have sufficient permissions to access, but they won’t be able to use most of the dataset hub’s capabilities on those datasets unless the dataset they're working on is hosted in a Premium capacity. In that case more capabilities will be available.

See the [free users feature list](../consumer/end-user-features.md#feature-list) for a detailed list of the actions free users can perform on datasets in the datasets hub and on the dataset's details page.

To be able to perform all available dataset actions, a free user needs an upgraded license, in addition to any necessary access permissions. When a free user tries to perform an action that is not available under the terms of the free user license, a pop-up message gives them the opportunity to upgrade their license. If a Power BI administrator has approved automatic upgrade, the upgrade happens automatically.

Free users cannot use datamarts on the data hub.

## Discoverable datasets

Dataset owners can make it possible for you to find their dataset without actually granting you access to it by making it [discoverable](../collaborate-share/service-discovery.md). Discoverable datasets appear grayed out in the list of datasets, and you don't have access to the dataset's details page or capabilities. To see dataset info and to be able to use the dataset, you can request access.

To request access, on the data hub, hover the mouse over the desired "discoverable" dataset and then click the **Request access** icon that appears

:::image type="content" source="media/onelake-data-hub/datasets-request-access-icon-discoverable.png" alt-text="Screenshot of the request access icon for discoverable datasets.":::



## Next steps

- Dataset details
