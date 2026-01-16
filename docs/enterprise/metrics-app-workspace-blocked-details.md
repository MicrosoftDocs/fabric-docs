---
title: Understand the metrics app workspace blocked details page (preview)
description: Learn how to read the Microsoft Fabric Capacity metrics app's workspace blocked details page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 08/05/2025
---

# Understand the metrics app Workspace Blocked Details page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Workspace Blocked Details** page in the Microsoft Fabric Capacity Metrics app provides a detailed analysis of the workspaces blocked in a capacity due to Workspace level surge protection over the last 14 days. This page allows you to visualize the number of users and operations affected due to blocked state of the workspaces.

You can navigate to this page only by drilling through from the [health](metrics-app-health-page.md) page. You can drill through from any data point selection to the [TimePoint Summary](metrics-app-timepoint-summary-page) page for further details on rejected background requests and operations due to surge protection.

## Cards

This section contains key performance indicators (KPIs) that provide overview of blocked workspaces:

- **Capacity name**: Name of Capacity. 
- **Blocked workspaces**: Number of workspaces that have been blocked under this capacity in the last 14 days due to workspace level surge protection.
- **Affected users**: Number of users performing operations on blocked workspaces in the last 14 days.
- **Affected requests**: Number of operations that have been rejected.

## Blocked details

This visual helps you visualize all details of the blocked workspaces under a capacity.

### Fields

The matrix includes the following fields:

| Column                        | Description|
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Workspace Id**              | Id of the blocked workspace |
| **Workspace name**            | Name of the blocked workspace |
| **Blocked date**              | Timestamp when workspace went into Blocked state. |
| **Blocked end**               | Timestamp when workspace went into Non Blocked state. |
| **Blocked duration (hours)**  | Number of hours the workspace was blocked. If the duration between Blocked date and Blocked end is less than an hour, this column shows 0. |
| **Affected users**            | Number of users affected for this workspace. |
| **Interactive rejected operations** | Number of interactive operations that were rejected during the blocked state of the workspace. |
| **Background rejected operations**| Number of background operations that were rejected during the blocked state of the workspace. |
| **Timepoint**| Binned blocked date timestamp |
| **How blocked**| This helps you understand whether the workspace was manually blocked or by an automated policy. |

## Navigate to TimePoint Summary page

Choose a specific workspace from the blocked details table and then select the **TimePoint summary explore** button.

> [!NOTE]
> The rows seen in the blocked details table are states of a workspace. There can be multiple rows for the same workspace over the last 14 days due to state changes. 
>
> If a workspace is blocked but has no activity on it, drilling through to the TimePoint Summary page will not show any information.

## Related content

- [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)