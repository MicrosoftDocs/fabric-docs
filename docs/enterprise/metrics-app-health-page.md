---
title: Understand the metrics app health page (preview)
description: Learn how to read the Microsoft Fabric Capacity metrics app's health page.
ms.topic: concept-article
ms.custom:
ms.date: 01/26/2026
---

# Understand the metrics app Health page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Health** page in the Microsoft Fabric Capacity Metrics app offers a high-level overview of all capacities that a user is admin of. This page is designed to help capacity administrators quickly identify capacities that are consuming the most compute resources or are experiencing issues such as throttling or query rejections.

Once a capacity of interest is identified, you can drill through to the **Compute** or **Storage** pages for deeper analysis.

> [!NOTE]
> You see only the capacities for which you have **admin access**.

The **Health** page has two views:

- **Last 24 hours**: Displays metrics aggregated over the past 24 hours.
- **Last one hour**: Displays near real-time insights over the past 60 minutes.

The **Health** page is divided into the following sections:

- **Slicers**
- **Cards**
- **Capacity breakdown**

Each section plays a role in helping you filter, summarize, and investigate capacity usage and health.

## Slicers

To filter data, use the slicers at the top of the page:

- **Capacity name**: Select one or more capacities to view data specific to the selected capacities in the report.
- **SKU**: Select the SKU of capacities you want the page to display results for.
- **Region**: Select the region of capacities you want the page to display results for.

> [!NOTE]
> Capacities for only one region can be viewed at a time. By default, the report displays your **home region**, which appears labeled as **Default** in the **Region** slicer.
> To view capacities from a different region, change the selection in the **Region** slicer.

## Cards

This section contains key performance indicators (KPIs) that provide an overview of capacity health:

- **\# Capacities**: Total number of capacities, which you have access to.
- **Avg. utilization %**: Average utilization % across selected capacities for last 24 or 1 hour.
- **\# Throttled capacities**: Number of capacities that have at least one 30-second window where interactive delay % was above 100%. It also displays number of capacities throttled in last seven days.
- **\# Interactive rejected capacities**: Number of capacities that have at least one 30-second window where interactive rejection % was above 100%. It also displays number of capacities faced interactive rejection in last seven days.
- **\# Background rejected capacities**: Number of capacities that have at least one 30-second window where background rejection % was above 100%. It also displays number of capacities faced background rejection in last seven days.

## Capacity breakdown

This visual helps you identify and prioritize capacities that might need investigation.

You can toggle between two display modes using the **Sparkline toggle switch (Yes/No)**:

- **With Sparkline**: Displays time-distributed sparkline visuals for key metrics.
- **Without Sparkline**: Displays static metric values only.

### Fields

The matrix includes the following fields:

| Column                        | Description|
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Capacity name**             | Name of the capacity|
| **SKU**                       | Latest SKU of the capacity|
| **State**                     | A state of the capacity (Active/Suspended/Deleting/Updating SKU)|
| **Region**                    | Region of capacity|
| **Health** | Shows different states according to its usage behavior:<br><ul><li><strong>Suspended</strong> – Capacity is suspended.</li><li><strong>Healthy</strong> – Capacity hasn't experienced any throttling or rejections.</li><li><strong>1 - At Risk of Throttling</strong> – Capacities that have at least one 30 sec. window where interactive delay % was above 90%.</li><li><strong>2 - Throttling</strong> – Capacities that have at least one 30 sec. window where interactive delay % was above 100% and thus might have operations that were throttled.</li><li><strong>3 - At Risk of Interactive Rejection</strong> – Capacities that have at least one 30 sec. window where interactive rejection % was above 90%.</li><li><strong>4 - Interactive Rejection</strong> – Capacities that have at least one 30 sec. window where interactive rejection % was above 100%.</li><li><strong>5 - At Risk of Background Rejection</strong> – Capacities that have at least one 30 sec. window where background rejection % was above 90%.</li><li><strong>6 - Background Rejection</strong> – Capacities that have at least one 30 sec. window where background rejection % was above 100%.</li></ul> |
| **User**| Number of users|
| **Avg. utilization %**| Average utilization during selected time period|
| **Cumulative debt**| Sparkline of cumulative carry forward spread across selected time period|
| **Throttling (s)**| Total throttling seconds in selected time period|
| **Throttling**| Sparkline of throttling seconds spread across in selected time period|
| **P95 interactive delay**     | The 95th percentile value of the Interactive Delay. A higher value indicates a longer throttling duration.|
| **P95 interactive rejection** | The 95th percentile value of the Interactive rejection. A higher value indicates a longer interactive rejections duration.|
| **P95 background rejection**  | The 95th percentile value of the Background rejection. A higher value indicates a longer background rejections duration.|
| **Usage variance**            | A larger value for this field indicates a capacity having wide variance in the amount of utilization, whereas low variance is indicative of a steady state utilization rate.|
| **Optional columns**          | Count of operations having these statuses: Rejected, Failure, Canceled, Successful, Invalid, InProgress|
| **Blocked workspaces**         | The number of blocked workspaces due to Workspace level Surge Protection within the time period (last 24 hours or 1 hour). |


> [!NOTE]
> For health status calculations, the actual values of interactive delay, interactive rejection, and background rejection are used, rather than their P95 (95th percentile) values.
>
> If a workspace is blocked but hasn't been blocked in the last 24 hours or last 1 hour, the blocked workspaces count doesn't count it on the Health page.

## Navigate to Compute, Storage or Workspace blocked detail pages

Choose a specific capacity from the capacity breakdown table to navigate to **Compute**, **Storage** or **Workspace blocked details** pages. This selection allows for a detailed examination and understanding of the compute, storage resources usage of the capacity and details for blocked workspaces and affected users or requests.

There are two ways to navigate to these pages: drilling through and direct navigation.

- Drill through from the **Health** page:
  - **Option 1**: Right-click a capacity row and choose **Drill through > Compute**, **Storage** or **Workspace blocked details**.
  - **Option 2**: Select a capacity from the **Capacity Breakdown** visual, then select the **Explore** button.
  
  In all cases, the selected capacity is automatically passed as a filter.

- Direct navigation: Use the **Navigation** pane at the top of the page to go to the **Compute** or **Storage** page. Once there, manually select a capacity using the **Capacity name** slicer.

## Related content

- [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)
- [Understand the Compute page](metrics-app-compute-page.md)
- [Understand the Storage page](metrics-app-storage-page.md)
