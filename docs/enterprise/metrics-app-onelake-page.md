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

The Microsoft Fabric Capacity Metrics app's OneLake page provides capacity storage information. It is divided into the following four sections:

- Filters
- Cards
- Table Visual 
- Column Charts

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

## Top n workspaces by billed storage %

This table visual shows top n workspaces by their billed storage %. Top n value can be changed by using Top filter.
The table visual displays the four values listed below. 

* **Workspace name** - The name of the workspace.

* **Workspace Id** - The unique identifier for the workspace.

* **Current storage (GB)** - Displays the latest hourly point in time storage in GB by workspace.

* **Billed storage (GB)** - The billed storage in GB for workspace.

* **Billed storage %** - The billed storage in GB divided by sum of billed storage in GB for the capacity. 

## Column Charts 

There are two column charts present in this page to show the storage trend for last 30 days. By default, both the column charts shows storage information at day level. But the hourly distribution can be viewed by drilling down into any day.

### Storage (GB) by date

This is a column chart visual which shows average point in time storage in GB by day and hours.

### Cumulative billed storage (GB) by date

This is a column chart visual which shows cumulative billed storage in GB by day and hours.

Cumulative billed storage is sum of billed storage from start of date time period to selected date time value.


>[!NOTE]
>There is an export button on top of the page to go to a page for exporting data.The matrix visual in the export shows billed storage in GB details for workspaces in selected capacity by day or week.

## Next steps

[Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
