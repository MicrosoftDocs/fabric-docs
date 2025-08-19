---
title: Fabric Notebooks troubleshooting guide
description: This article provides troubleshooting steps for common issues encountered in Fabric Notebooks.
ms.author: jburchel
author: jonburchel
ms.reviewer: deevij
ms.topic: troubleshooting
ms.custom: 
ms.date: 08/19/2025
---

# Fabric Notebooks troubleshooting guide

Use this guide to quickly identify and resolve common issues when working in Fabric Notebooks. Each issue type includes examples and actionable next steps to help you recover efficiently.

## Notebook errors

The following section outlines common notebook errors, with links to their potential resolutions.

### Error messages and associated resolution categories

| Error Message | Categories / Resolution |
|---------------|------------------------|
| Your session timed out after inactivity. | [Timeouts](#timeouts) |
| Your session expired. | [General connectivity](#general-connectivity) / [Timeouts](#timeouts) / [Session Connectivity](#session-connectivity) |
| Your notebook disconnected. | [General connectivity](#general-connectivity) / [Timeouts](#timeouts) |
| Failed to retrieve MWC token… | [General connectivity](#general-connectivity) |
| You're currently offline. | [General connectivity](#general-connectivity) |
| Can't connect to the collaboration server. | [General connectivity](#general-connectivity) |
| Error when shutting down kernel due to ajax error 410. | [General connectivity](#general-connectivity) |
| Access denied. | [Access](#access) |
| Unable to fetch high concurrency sessions. | [Access](#access) |
| Unable to save your notebook. | [Save Failures](#save-failures) / [Access](#access) / [Paused Capacity](#paused-capacity) |
| The capacity with ID _&lt;ID&gt;_ is paused. Your organization has reached its compute capacity limit. | [Paused Capacity](#paused-capacity) |
| Your organization has reached its compute capacity limit. | [Paused Capacity](#paused-capacity) |
| Item not found. | [Missing Items](#missing-items) |
| Cannot call methods on a stopped SparkContext | [Spark Code Issue](#spark-code-issue) |

### Troubleshooting details

#### Timeouts

**Why it happens**: Notebook sessions auto-shutdown after a period of inactivity. By default, this timeout is set to 20 minutes.

**What to do**:

- Re-run the notebook to restart the session.
- Adjust the session timeout duration at either the Notebook or Workspace level.

To change timeout at the **Notebook** level:

1. Open a notebook and start a session from the **Connect** toolbar menu.
1. Select the **Session ready** indicator in the lower-left corner.
1. Update the timeout duration in the dialog that appears.

> [!NOTE]
> The “Session Ready” indicator is only visible when a session is active.

:::image type="content" source="media/fabric-notebooks-troubleshooting-guide/session-timeout.png" alt-text="Screenshot showing where to adjust the session timeout for a Fabric Notebook.":::
 
To change timeout at the **Workspace** level:

1. Navigate to **Workspace settings**.
1. Select **Data Engineering/Science Spark settings**.
1. Under the **Jobs** tab, adjust the session timeout duration as needed.

:::image type="content" source="media/fabric-notebooks-troubleshooting-guide/workspace-timeout.png" alt-text="Screenshot showing where to adjust the workspace timeout for a Fabric Notebook.":::

#### General connectivity

**Why it happens**: Network instability or temporary backend delay
**What to do**:	Retry after a few moments.

#### Session connectivity

**Why it happens**: A session is not connected.
**What to do**: Start a session.

You can start a session using three methods:

1. Select **Connect** to start a session or attach to a high concurrency session without running the notebook.
1. Select **Run all** to start a session and execute all code cells in the notebook.
1. Select **Run** on a cell to start a session and execute the selected cell.

:::image type="content" source="media/fabric-notebooks-troubleshooting-guide/start-session.png" alt-text="Screenshot showing the methods to start a new session in a Fabric Notebook.":::

#### Access

**Why it happens**: Incorrect sign-in credentials; expired login session; missing permissions for Notebook, Lakehouse, or Workspace; tenant restrictions

**What to do**:
- _Verify your sign-in_: Ensure you're logged in with the correct Microsoft Entra (formerly Azure AD) account associated with your Fabric environment.
- _Refresh your session_: Sign out and sign back in to refresh your authentication token. You can do this by selecting your profile icon in the top-right corner of the window, and then and selecting **Sign out**.
- _Check permissions_: Confirm that you have the necessary role (i.e. Contributor or Admin) for the resource you’re trying to access. This includes the Notebook, Lakehouse, Workspace, or Data Warehouse.
- Contact your administrator: If you're still blocked, contact your tenant or workspace administrator to:
  - Confirm your user role and access level.
  - Check for token expiration issues.
  - Ensure you’re added to the correct Fabric tenant, especially if you recently joined the organization or switched accounts.

##### How to manage access in a Fabric Workspace

In order to manage user access within a Fabric Workspace, take the following steps:

1. Browse to [Microsoft Fabric](https://app.fabric.microsoft.com) and sign in with your Microsoft account.
1. Open the workspace for which you need to manage access, by selecting **Workspaces** on the left navigation pane and selecting the workspace you need to manage.
1. Select the elipsis button (**...**) that appears to the right of the selected workspace as you hover above it, and then select **Workspace access** from the menu that appears.
   
   :::image type="content" source="media/fabric-notebooks-troubleshooting-guide/workspace-access.png" alt-text="Screenshot showing the Workspace access menu option for a workspace.":::

1. A list of users and their assigned roles - Admin, Member, Contributor, or Viewer, is displayed, and you can update or add new users as required.

#### Paused capacity

**Why it happens**: An administrator has paused Fabric capacity.
**What to do**:
- Ask your Fabric administrator to resume capacity.
- Steps (for admins):
  - Go to the [Microsoft Fabric Admin Portal](https://app.fabric.microsoft.com/admin-portal).
  - Navigate to **Capacities**.
  - Select the paused capacity.
  - Select **Resume**.

#### Missing items

**Why it happens**: An item was deleted, moved, or you don’t have access.
**What to do**:
- Use the global search box at the top center of the Fabric browser page to try locating the item across all workspaces.                  
- Contact the item owner to confirm whether it still exists and request access if needed.
- If the item was deleted, the owner may be able to restore it from version history or a backup, depending on workspace settings.

#### Save failures

**Why it happens**: Network connectivity drops before changes are saved, or the session timed out.
**What to do**:
- _Check network connectivity_: Save failures are often caused by temporary internet or service disruptions.
- _Save a copy_: Duplicate the notebook to avoid losing unsaved changes.
- _Turn on AutoSave_: AutoSave is on by default. Check under the **Edit** menu to ensure that it hasn’t been disabled so your changes are saved automatically at regular intervals.
  
  :::image type="content" source="media/fabric-notebooks-troubleshooting-guide/autosave.png" alt-text="Screenshot showing the AutoSave button on the Edit menu of the Fabric user interface.":::

- _Create a checkpoint_: If changes were saved before the failure, use the **Version history** feature in the Microsoft Fabric Notebook to manually save a snapshot of the notebook.
  - Select the **History** button at the top right:
  
    :::image type="content" source="media/fabric-notebooks-troubleshooting-guide/history.png" alt-text="Screenshot showing the History button in the Fabric Notebook user interface.":::

  - Select **+ Version** to add a new snapshot of the notebook.
  
    :::image type="content" source="media/fabric-notebooks-troubleshooting-guide/new-version.png" alt-text="Screenshot showing the + Version button in the Fabric Notebook history window.":::

#### Collaboration conflicts

**Why it happens**: The same notebook was modified by another user outside of a collaboration session - such as through VS Code, the Update Definition API, manual save mode, a deployment pipeline, or Git sync.

:::image type="content" source="media/fabric-notebooks-troubleshooting-guide/collaboration-conflict.png" alt-text="Screenshot showing the collaboration conflict error that appears in the Fabric Notebook user interface.":::
 
**What to do**:
1. Select the **View changes** button on the error message bar and choose a version to work as the live notebook.
1. Select the **History** button at the top right of the window and use the **Version history** panel to find the _external_ record. Then you can either restore or save a copy of that version.

#### Copilot in Notebook

When you run Copilot inline or Copilot chat panel in Notebook, you see an error:

_Something went wrong. Rephrase your request and try again._

**Why it happens**: Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F2 or higher, or P1 or higher) are supported. 

**What to do**:  Check if the workspace capacity is F2 or higher, or P1 or higher. 

#### Spark code issue

You see an error indicating: **Excessive query complexity** - Spark's Catalyst optimizer has produced a very large logical/physical plan.

**What to do**: Modify the query logic by breaking down the query. Refactor complex pipelines into smaller, staged queries.

**Example fix**:

Instead of chaining everything in one go, like this: 

```python
df = (
    spark.read.parquet("...")
         .filter(...)
         .join(...)
         .groupBy(...)
         .agg(...)
         .join(...)
         .filter(...)
         .withColumn(...)
         .join(...)  # and so on...
)
```

Break it into parts:

```python
df1 = spark.read.parquet("...").filter(...)
df2 = df1.join(...).groupBy(...).agg(...)
df2.write.parquet("/tmp/intermediate1")
df3 = spark.read.parquet("/tmp/intermediate1").join(...).filter(...)
```

## Related content

[Fabric known issues](https://support.fabric.microsoft.com/known-issues/)