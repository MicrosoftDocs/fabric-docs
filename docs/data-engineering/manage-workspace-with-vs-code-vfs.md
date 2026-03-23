---
title: Manage Fabric workspaces in VS Code under VFS mode
description: Open multiple Fabric workspaces as remote files in VS Code using VFS mode, and add or remove workspaces without downloading items locally.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 03/23/2026
ms.search.form: VSCodeExtension
ai-usage: ai-assisted
---

# Manage Fabric workspaces in VS Code under VFS mode

The Fabric Data Engineering VS Code extension offers two ways to work with Fabric workspaces. In local mode, you download items to your machine and sync changes back. In VFS (Virtual File System) mode, you open and edit workspace items directly as remote files—nothing is downloaded to disk.

VFS mode is a good choice when you want to:

- Work across **multiple workspaces** in the same VS Code window.
- Edit notebooks, environments, and lakehouses without managing local copies.
- Quickly browse workspace contents without setting up a local work folder.

This article explains how to enter VFS mode and how to add or remove workspaces.

## Prerequisites

- Install the Fabric Data Engineering VS Code extension and sign in to your account. For setup steps, see [Get started with the Fabric Data Engineering VS Code extension](setup-vs-code-extension.md).

## Enter VFS mode

1. Select the **Open a Remote Window** button in VS Code.

    :::image type="content" source="media\vscode\open-remote-window.png" alt-text="Screenshot showing how to open a remote window in VS Code." lightbox="media\vscode\open-remote-window.png":::

1. Select **Open Fabric Data Engineering Workspaces**.

    :::image type="content" source="media\vscode\open-fabric-workspace.png" alt-text="Screenshot showing how to open Fabric workspaces in VS Code." lightbox="media\vscode\open-fabric-workspace.png":::

> [!TIP]
> After you enter VFS mode for the first time, you can return to it quickly by selecting **File** > **Open Recent** and choosing the entry marked **/Workspaces [Fabric Data Engineering]**. You can also enter VFS mode from the Fabric portal by selecting **Open In VS Code (Desktop)** on a notebook.

## Add a workspace

1. Select the **Explorer** icon in the activity bar (or press **Ctrl+Shift+E**) to open the Explorer view in the side bar.

1. Right-click any empty area in the Explorer view (or press **Shift+F10**) to open the context menu. Scroll down if needed and select **Manage Fabric Workspaces**.

    :::image type="content" source="media\vscode\manage-workspace-vfs.png" alt-text="Screenshot of the VS Code Explorer panel, showing how to manage Fabric workspaces." lightbox="media\vscode\manage-workspace-vfs.png":::

1. Select **Add Workspace**, then choose the workspace from the list.

    :::image type="content" source="media\vscode\add-workspace-vfs.png" alt-text="Screenshot of the VS Code Explorer panel, showing how to add a workspace." lightbox="media\vscode\add-workspace-vfs.png":::

After you add a workspace, expand its tree node in the Explorer panel to view and manage the items in that workspace.

## Remove a workspace

1. Select the **Explorer** icon in the activity bar (or press **Ctrl+Shift+E**) to open the Explorer view.

1. Right-click any empty area in the Explorer view (or press **Shift+F10**) to open the context menu. Scroll down if needed and select **Manage Fabric Workspaces**.

1. In the workspace list that appears, select the **x** button next to the workspace you want to remove.

    :::image type="content" source="media\vscode\remove-workspace-vfs.png" alt-text="Screenshot of the VS Code Explorer panel, showing how to remove a workspace." lightbox="media\vscode\remove-workspace-vfs.png":::

Removing a workspace from VS Code doesn't delete the workspace or its items; it only disconnects the workspace from your VS Code window.

## Related content

- [Get started with the Fabric Data Engineering VS Code extension](setup-vs-code-extension.md)
- [Develop Fabric notebooks in VS Code with VFS mode](author-notebook-with-vs-code-vfs.md)
- [Manage Spark environments in VS Code under VFS mode](manage-environment-with-vs-code-vfs.md)