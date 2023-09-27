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
There are two report filters located at the top of the page and one filter located at top right corner of the table visual.

* **Capacity Name** - Select a capacity. The app displays information related to the selected capacity.

* **Date Range** - Select the date range. The app displays results for the selected date range.

* **Top** - The number of workspaces that Top N workspaces visual displays. The workspaces are ordered according to storage volume. The workspaces that have the highest storage volume appear at the top of the list.

## Cards

In this page, there are three cards present to provide specific information on storage. The information on the cards is filtered according to your capacity and date range selection.

* **Workspaces** -  The total number of workspaces using storage.

* **Current storage (GB)** - Displays the latest storage in GB.

* **Billed storage (GB)** - Displays the billed storage in GB.

>[!NOTE]
>* Billed storage volume can be lower than current storage volume. If the capacity has less storage usage at the start of the reporting period, the billed storage volume is lower than the current storage.
>* Current storage can display a zero value. This occurs when the workspaces have not yet begun reporting data for that specific hour.

## Table visual

### Top n workspaces by billed storage %

A table showing storage information for the selected top workspaces. Use the Top slicer to change the number of workspaces with the largest storage volume you want to review.

* **Workspace name** - Name of the workspace.

* **Workspace ID** - Workspace unique identifier.

* **Current storage (GB)** - Current storage in GB of a specific workspace.

* **Billed storage (GB)** -  Billed storage in GB of a specific workspace.

* **Billed storage %** -  Workspace billed storage divided by the sum of billed storages in the capacity. Use to determine the contribution of the workspace to the overall capacity storage use.

## Column charts 

There are two column charts in this page showing the storage trend for last 30 days. Both column charts show storage information per day. User can view the hourly distribution by drilling down into a specific day.

### Storage (GB) by date

A column chart that shows average storage in GB by date and hours.

### Cumulative billed storage (GB) by date

A column chart that shows cumulative billed storage by date and hour. Cumulative billed storage is calculated as a sum of billed storage from the start of the selected date time period.

## Export Data

User can export the report's data by selecting Export Data. Selecting Export Data takes you to a page with a matrix visual that displays billed storage details for workspaces in the selected capacity. Hover over the matrix and select 'more options' to export the data.

## Next steps

[Understand the metrics app overview page?](metrics-app-overview-page.md)
