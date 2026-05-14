---
title: Troubleshoot semantic model connection issues in Plan (preview)
description: Troubleshoot common semantic model connection issues in plan (preview).
ms.date: 05/14/2026
ms.topic: troubleshooting
ai-usage: ai-assisted
ms.search.form: Insufficient permissions to connect to semantic model, Semantic model not found, Shared cloud connection expired
#customer intent: As a user, I want to troubleshoot common issues that occur when connecting to a semantic model in plan (preview).
---

# Troubleshoot semantic model connection issues in plan (preview)

This article provides troubleshooting guidance for Plan in Microsoft Fabric. For any known limitations that you should be aware of, see [Known limitations](overview-limitations.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## **'Insufficient permissions to connect to semantic model'**

:::image type="content" source="media/planning-troubleshooting/insufficient-permissions.png" alt-text="Screenshot of the error message showing insufficient permissions to connect to semantic model.":::

### Cause

The shared cloud connection owner has insufficient permissions. The connection owner, whether using OAuth or a service principal, must have a workspace **Member** or **Admin** role. Users with lower-level permissions can't generate access tokens for the semantic model.

### Resolution

If you're a *Contributor* or *Member* in the workspace, ask the workspace *Admin* to follow these steps:

1. Go to the workspace and select **Manage access**.
2. Check the role assigned to the connection owner.
3. Upgrade the connection owner's role to **Member** or **Admin**.

## **'Semantic model not found'**

### Cause

The semantic model linked to the shared cloud connection can’t be found. It could have been moved, renamed, or deleted.

### Resolution

1. Verify that the semantic model exists in the required workspace in Microsoft Fabric.
2. If it has been moved, locate the new workspace and connect to it.
3. Ensure the connection owner has either **Member** or **Admin** access to the correct workspace.
4. If not, ask a workspace Admin to upgrade their role to either **Member or Admin** by selecting **Workspace > Manage access**.

## **'Shared cloud connection expired'**

### Cause

The credentials for this shared cloud connection have expired.

### Resolution

The connection owner must reauthenticate the connection by following these steps:

1. In Microsoft Fabric **Home**, go to **Settings >** **Manage connections and gateways**.
2. Locate the connection, select **More actions** (`···`), then **Settings**.
3. Select **Edit credentials**, re-authenticate, and then select **Save**.
4. Return to the artifact and retry the connection.

## When workspace is not accessible

Before troubleshooting, ensure that you have completed all the steps described in this article correctly: [Create and share a cloud connection for a semantic model](planning-how-to-create-semantic-model-connection.md).

### Another possible cause

The owner of the shared cloud connection is not a *Member* of the workspace.

### **Resolution**

If you're a *Contributor* in the workspace, ask a workspace *Member* or *Admin* to follow these steps:

1. Go to the workspace and select **Manage access**.
2. Add the connection owner as a **Member** or **Admin** of the workspace.
3. Retry the connection in the artifact.

