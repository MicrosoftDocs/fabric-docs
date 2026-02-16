---
title: Understand the metrics app storage page
description: Learn how to read the Microsoft Fabric Capacity metrics app's storage page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 03/23/2025
---

# Understand the metrics app storage page

The Microsoft Fabric Capacity Metrics app's storage page provides capacity storage information, showing data for the last 30 days.

## Filters

There are two report filters located at the top of the page and one filter located at top right corner of the table visual.

* **Capacity Name** - Select a capacity. The app displays information related to the selected capacity.

* **Date Range** - Select the date range. The app displays results for the selected date range.

* **Experience** - Select the Fabric experience you want the app to display results for.

* **Storage type** - Select the Fabric storage type you want the app to display results for.

## Cards

In this page, there are three cards present to provide specific information on storage. The information on the cards is filtered according to your capacity and date range selection.

* **Workspaces** -  The total number of workspaces using storage.

* **Current storage (GB)** - Displays the latest storage in GB.

* **Billable storage (GB)** - Displays the billable storage in GB. [Soft-deleted data](../onelake/soft-delete.md) is billed at the same rate as active data.

>[!NOTE]
>* Billable storage volume can be lower than current storage volume. If the capacity has less storage usage at the start of the reporting period, the billable storage volume is lower than the current storage.
>* Current storage can display a zero value. This occurs when the workspaces have not yet begun reporting data for that specific hour.

## Table visual

### Top workspaces by billable storage %

 A table showing storage information for the selected top workspaces. To change the number of workspaces with the largest storage volume you want to review, use the visual *Top* slicer on the visual's filter pane. The workspaces are ordered according to storage volume. The workspaces that have the highest storage volume appear at the top of the list.

* **Workspace name** - Name of the workspace.

* **Workspace ID** - Workspace unique identifier.

* **Operation name** - The name of the displayed operation.

* **Deletion status** - Indicates whether the workspace is active or not. Soft-deleted data is billed at the same rate as active data.

* **Billing type** - Indicates whether the workspace is billable or not.

* **Current storage (GB)** - Current storage in GB of a specific workspace.

* **Billable storage (GB)** -  Billable storage in GB of a specific workspace.

* **Billable storage %** -  Workspace billable storage divided by the sum of billable storages in the capacity. Use to determine the contribution of the workspace to the overall capacity storage use.

## Column charts

There are two column charts in this page showing the storage trend for last 30 days. Both column charts show storage information per day. User can view the hourly distribution by drilling down into a specific day.

### Storage (GB) by date

A column chart that shows average storage in GB by date and hours.

### Cumulative billable storage (GB) by date

A column chart that shows cumulative billable storage by date and hour. Cumulative billable storage is calculated as a sum of billable storage from the start of the selected date time period.

## Export Data

User can export the report's data by selecting Export Data. Selecting Export Data takes you to a page with a matrix visual that displays billable storage details for workspaces in the selected capacity. Hover over the matrix and select 'more options' to export the data.

## Considerations and limitations

[OneLake soft delete](../onelake/soft-delete.md) storage is charged at the same rate as regular storage.

## Related content

- [Understand the metrics app compute page](metrics-app-compute-page.md)
- [OneLake consumption](/fabric/onelake/onelake-consumption)
- [OneLake capacity consumption example](/fabric/onelake/onelake-capacity-consumption)
