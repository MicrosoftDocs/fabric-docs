---
title: Understand the metrics app workspace blocked details page (preview)
description: Learn how to read the Microsoft Fabric Capacity metrics app's workspace blocked details page.
ms.topic: concept-article
ms.custom:
ms.date: 01/26/2026
---

# Understand the metrics app Workspace Blocked Details page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Workspace Blocked Details** page in the Microsoft Fabric Capacity Metrics app provides a detailed analysis of the workspaces blocked in a capacity due to workspace level surge protection over the last 14 days. This page shows the number of users and operations affected by the blocked state of the workspaces.

You can access this page only by drilling through from the [health](metrics-app-health-page.md) page. You can drill through from any data point selection to the [TimePoint Summary](metrics-app-timepoint-summary-page.md) page for further details on rejected background requests and operations due to surge protection.

## Cards

This section contains key performance indicators (KPIs) that provide overview of blocked workspaces:

- **Capacity name**: Name of Capacity.
- **Blocked workspaces**: Number of workspaces that the surge protection blocked under this capacity in the last 14 days.
- **Affected requests**: Number of operations that the surge protection rejected.

## Blocked details

This visual helps you visualize all details of the blocked workspaces under a capacity.

The matrix includes the following fields:

| Column | Description |
|--|--|
| **Workspace Id** | ID of the blocked workspace |
| **Workspace name** | Name of the blocked workspace |
| **Blocked date** | Timestamp when workspace went into blocked state. |
| **Blocked end** | Timestamp when workspace went into unblocked state. If a workspace isn't unblocked yet, the Blocked end field shows the current timestamp. |
| **Blocked duration (hours)** | Number of hours the workspace was blocked. If the duration between blocked date and blocked end is less than an hour, this column shows `0`. |
| **Affected users** | Number of distinct users who have used this workspace in the last 14 days. It considers users, service principals in the calculation. It also considers system users like 'Power BI Services'. |
| **Interactive rejected operations** | Number of interactive operations that the system rejected during the blocked state of the workspace. |
| **Background rejected operations** | Number of background operations that the system rejected during the blocked state of the workspace. |
| **Timepoint** | Binned blocked date timestamp |
| **How blocked** | This field helps you understand whether the workspace was manually blocked or blocked by an automated policy. |

## Navigate to TimePoint Summary page

Select a specific workspace from the blocked details table. Then, select the **TimePoint summary explore** button.

> [!NOTE]
> The rows you see in the blocked details table represent states of a workspace. State changes can create multiple rows for the same workspace over the last 14 days.
>
> If a workspace is blocked but has no activity on it, the `TimePoint` Summary page doesn't show any information.
>
> Drilling through from Workspace blocked details to TimePoint Detail page doesn't filter data.

## Related content

- [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)
