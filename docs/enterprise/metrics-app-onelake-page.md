---
title: Understand the metrics app onelake page
description: Learn how to read the Microsoft Fabric Capacity metrics app's OneLake page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.custom: build-2023
ms.date: 09/17/2023
---

# Understand the metrics app OneLake page

[!INCLUDE [preview-note](../includes/preview-note.md)]

The Microsoft Fabric Capacity Metrics app's OneLake page provides capacity storage information. It is divided into the following sections:

- Filters
- Cards
- Table visual 
- Column charts
- Export data

>[!NOTE]
> OneLake storage will not be billable till October 1, 2023.

## Filters
There are three report filters located at the top of the page.

* **Capacity Name** - Select a capacity. The app displays information related to the selected capacity.

* **Date Range** - Select the date range. The app displays results for the selected date range.

* **Top** - The number of workspaces that needs to be displayed in the app is to be selected. The workspaces are ordered according to storage volume. The workspaces that have the highest storage volume appear at the top of the list.

## Cards

This page includes three cards that display storage information related to the filter selection.

* **Workspaces** - Total number of workspaces present on the capacity on the selected date range.

* **Current storage (GB)** - Displays the latest hourly point in time storage in GB used by capacity.

* **Billed storage (GB)** - Displays the storage in GB that is billed for selected capacity. Billed storage for a given hour is actual storage divided by number of hours in that month.

>[!NOTE]
>Billed storage can be less than current storage. If the capacity had less storage usage at the start of reporting period, billed storage would be less than current storage.

>[!NOTE]
>Current storage may display a zero value. This could occur if the workspaces have not yet begun reporting data for that specific hour.

## Table visual

### Top n workspaces by billed storage %

This table visual shows top n workspaces with below information by their billed storage %. Top n value can be changed by using Top filter.

* **Workspace name** - Name of the workspace.

* **Workspace ID** - Unique identifier for the workspace.

* **Current storage (GB)** - Current storage of a specific workspace.

* **Billed storage (GB)** -  Billed storage in GB of a specific workspace.

* **Billed storage %** -  Billed storage divided by the sum of billed storages in the capacity. This can help determine contribution of the current workspace in the overall capacity storage utilization.

## Column charts 

There are two column charts in this page showing the storage trend for last 30 days. Both column charts show storage information per day. User can view the hourly distribution by drilling down into a specific day.

### Storage (GB) by date

A column chart that shows average storage in GB by date and hours.

### Cumulative billed storage (GB) by date

A column chart that shows cumulative billed storage by date and hour. Cumulative billed storage is calculated as a sum of billed storage from the start of the selected date time period.

## Export Data

User can export the report's data by selecting the Export Data button. Selecting Export Data button takes you to a page with a matrix visual that displays billed storage details for workspaces in the selected capacity. Hover over the matrix and select 'more options' to export the data.

## Next steps

[Understand the metrics app overview page?](metrics-app-overview-page.md)
