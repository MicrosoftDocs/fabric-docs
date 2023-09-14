---
title: Understand the metrics app OneLake page
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

## Filters
There are three report filters located at the top of the page.

* **Capacity Name** - Select a capacity. The app displays information related to the selected capacity.

* **Date Range** - Select the date range. The app displays results for the selected date range.

* **Top** - The number of workspaces that needs to be displayed in the app is to be selected. The workspaces are ordered according to storage volume. The workspaces that have the highest storage volume appear at the top of the list.

## Cards

This page includes three cards that display storage information related to the filter selection.

* **Workspaces** - Total number of workspaces present on the capacity on the selected date range.

* **Current storage (GB)** - Displays the latest hourly point in time storage used by capacity.

* **Billed storage (GB)** - Displays the billed storage in GB for workspaces in selected capacity. 

## Table visual

### Top n workspaces by billed storage %

This table visual shows top n workspaces by their billed storage %. Top n value can be changed by using Top filter.
The table visual displays the four values listed below. 

* **Workspace name** - The name of the workspace.

* **Workspace ID** - The unique identifier for the workspace.

* **Current storage (GB)** - The current storage of a specific workspace.

* **Billed storage (GB)** - The billed storage in GB of a specific workspace.

* **Billed storage %** -  The workspace billed storage divided by the sum of billed storages in the capacity.

## Column charts 

There are two column charts in this page showing the storage trend for last 30 days. Both column charts show storage information per day. User can view the hourly distribution by drilling down into a specific day.

### Storage (GB) by date

A column chart that shows item average storage in GB by date and hours.

### Cumulative billed storage (GB) by date

A column chart that shows cumulative billed storage by date and hour.Cumulative billed storage is calculated as a sum of billed storage from the start of the selected date time period.

>[!NOTE]
>Billed storage is the storage users are charged for every hour for fabric billable items. Current storage is calculated by taking the monthly average storage in GB based on the most recent hour. This is why the cumulative billed storage can be less than the current storage. Since current storage is reported for the most recent hour, its value can be zero if the latest hour has already begun, even if the workspaces haven't started reporting for that same hour yet.

## Export Data

User can export the report's data by selecting the Export Data button. Selecting Export Data takes you to a page with a matrix visual that displays billed storage details for workspaces in the selected capacity. Hover over the matrix and select more options to export or share the data.

## Next steps

[Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
