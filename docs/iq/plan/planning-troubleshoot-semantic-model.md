---
title: Troubleshoot Common Issues in Fabric Planning
description: Troubleshoot common issues in planning.
ms.date: 10/01/2026
ms.topic: troubleshooting
ai-usage: ai-assisted
ms.search.form: Semantic model not found, Shared cloud connection expired
#customer intent: As a user, I want to troubleshoot common issues that occur when working with Fabric Planning.
---

# Troubleshoot common issues in planning

This article provides troubleshooting guidance for some of the common issues you might face while working in Fabric Planning. For information about known limitations, see [Known limitations in planning](overview-limitations.md).

## Semantic model not found

### Cause

The semantic model linked to the plan item can't be found. It might have been moved, renamed, or deleted.

### Resolution

1. Verify that the semantic model exists in the required workspace in Microsoft Fabric.
1. If it got moved, locate the new workspace and connect to it.

## Shared cloud connection expired

### Cause

The shared cloud connection credentials you created for SQL database in Fabric expired.

### Resolution

The connection owner must reauthenticate the connection by following these steps:

1. In Microsoft Fabric **Home**, go to **Settings > Manage connections and gateways**.
1. Locate the connection, select **More actions** (`···`), then **Settings**.
1. Select **Edit credentials**, reauthenticate, and then select **Save**.
1. Return to the artifact and retry the connection.

## When a shared plan item isn't accessible to a user outside the workspace

### Cause

Users who aren't members of the workspace can't access a shared plan item.

### Resolution

Ensure that you followed all the steps explained in this article: [Share a plan item with users outside the workspace](sharing-plan-artifact.md).

This article explains how to share a plan item with a user who isn't a member of the workspace by using item sharing, specifically focusing on granting access to the semantic model associated with the plan.

## User can't access Fabric SQL data in PowerTable due to insufficient permissions

A user might be unable to access the database or retrieve table and schema information even when the database is shared with the user with **Read all data** permission.

### Cause

PowerTable supports database-level row-level security (RLS). When you share the database with a user, the user can access the database data but might not have explicit permission to read system information, such as the available schemas and tables. PowerTable requires access to this system information to perform lookups. As a result, when you share the table app with the user, they might be unable to view the database data.

### Resolution

Grant the user the required database-level access by using one of the following methods.

#### Option 1: Grant SELECT permission

Run the following query in the corresponding Fabric SQL database:

```sql
GRANT SELECT TO [mailId];
```

Replace `[mailId]` with the email address of the user to share the PowerTable app with.

#### Option 2: Add the user to the `db_datareader` role

1. In the Fabric SQL database, go to **Security** > **Manage SQL security**.
1. Select  **`db_datareader`** role.
1. Select **Manage access**.
1. Add the user to the role.

:::image type="content" source="media/planning-troubleshoot-semantic-model/manage-sql-security.png" alt-text="Screenshot of Fabric SQL database Manage SQL security pane with db_datareader role selected and Manage access button highlighted." lightbox="media/planning-troubleshoot-semantic-model/manage-sql-security.png":::

After you grant the required access, the user can access the database schema and table information that PowerTable needs.
