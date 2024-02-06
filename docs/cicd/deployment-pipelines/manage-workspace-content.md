---
title: Deployment pipeline folders
description: Understand how to manage your workspaces in deployment pipelines using folders.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.topic: how-to
ms.custom:
ms.date: 01/28/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
---

# Deployment pipeline folders (Preview)

Folders in your deployment pipelines workspace enable users to efficiently organize and manage items in the workspace in a familiar way.

:::image type="content" source="./media/manage-workspace-content/folder-experience.png" alt-text="Screenshot of creating and using folders.":::

## Enable folders

This feature is in preview. To try it, your organization must register for it and onboard formally.
To enable the experience, attach `&subfolderInWorkspace=1` to the URL in your browser address bar.

:::image type="content" source="./media/manage-workspace-content/enable-folders.png" alt-text="Screenshot of a Power BI web page with the suffix added to the URL to enable subfolders.":::

Since this feature is still in preview stage, we recommend you use it in test environment or test workspaces.

## Disable folders

To disable the Folder experience, remove the suffix `&subfolderInWorkspace=1` from the URL in your browser address bar.  
To remove the Power BI Desktop Folder experience, uninstall the *Folder* build and reinstall Power BI Desktop from the Microsoft Store.

## Folder permission model

Workspace admins, members, and contributors can create, modify, and delete folders in the workspace. Viewers can only view folder hierarchy and navigate in the workspace.
Currently folders inherit the permissions of the workspace they are in. The permission model will evolve to support more scenarios, including folder level permissions, based on ongoing user feedback.

|     Allowed   actions                  |     Admin    |     Member    |     Contributor    |     Viewer    |
|----------------------------------------|--------------|---------------|--------------------|---------------|
|     Create   folder                    |     √        |     √         |     √              |               |
|     Delete   folder                    |     √        |     √         |     √              |               |
|     Rename   folder                    |     √        |     √         |     √              |               |
|     Move   folder and items            |     √        |     √         |     √              |               |
|     View   folder in workspace list    |     √        |     √         |     √              |     √         |
