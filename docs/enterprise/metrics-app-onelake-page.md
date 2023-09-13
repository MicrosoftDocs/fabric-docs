---
title: Understand the metrics app onelake page
description: Learn how to read the Microsoft Fabric Capacity metrics app's onelake page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.custom: build-2023
ms.date: 09/17/2023
---

# Understand the metrics app onelake page

[!INCLUDE [preview-note](../includes/preview-note.md)]

The Microsoft Fabric Capacity Metrics app's onelake page provides an information of your capacity's storage. It's divided into the three sections listed below. The top section is for different cards, middle section is a table visual and bottom section has two different column charts.

At the top of the page, the **Capacity Name** field allows for the selection of the capacity for which results are displayed by the app. Furthermore, the **Date Range** and **Top N** slicer options can be utilized to filter the page in accordance with a specific date range or the top workspaces by their consumed storage.

## Top row cards

In this page, there are three cards present to provide specific information on storage.

* **Workspaces** - Total number of workspaces present on the capacity on the selected date range.

* **Current storage in GB** - Displays the latest hourly point in time storage used by capacity.

* **Cumulative storage in GB** - Displays the cumulative billed storage in GB for workspaces in selected capacity. 


## Top workspaces by cumulative utilization (GB) %

This table visual shows storage information on top n workspaces by their cumulative utilization (GB). Top N value can be changed by using Top N slicer on the top.

The table visual displays the four values listed below. 

* **Workspace name** - The name of the workspace.

* **Workspace Id** - The unique identifier for the workspace.

* **Current storage (GB)** - Displays the latest hourly point in time storage in GB by workspace.

* **Cumulative storage (GB)** - The cumulative billed storage in GB for workspace.

* **Cumulative storage (GB) %** -The cumulative billed storage in GB divided by sum of cumulative billed storage in GB for the capacity.

## Daily utilization (GB) by date

This is a column chart visual which shows average point in time storage in GB by day and hours.

By default, this visual shows the daily average storage for the entire capacity for last 30 days. The hourly distribution can be viewed by drilling into any day.

## Cumulative storage (GB) by date

This is a column chart visual which shows cumulative billed storage in GB by day and hours.

By default, this visual shows the cumulative storage for the entire capacity for last 30 days. The hourly distribution can be viewed by drilling into any day.

## Export Page 

There is an export button on top of the page to go to a new page for exporting data.

This matrix visual in the export shows consumed billed storage in GB details for workspaces in selected capacity by day or week.

## Next steps

[Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
