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

:::image type="content" source="./media/folders/folder-experience.png" alt-text="Screenshot of creating and using folders.":::

## Enable folders

This feature is in preview. To try it, your organization must register for it and onboard formally.
To enable the experience, attach `&subfolderInWorkspace=1` to the URL in your browser address bar.

:::image type="content" source="./media/folders/enable-folders.png" alt-text="Screenshot of a Power BI web page with the suffix added to the URL to enable subfolders.":::

Since this feature is still in preview stage, we recommend you use it in test environment or test workspaces.

## Disable folders

To disable the folder experience, remove the suffix `&subfolderInWorkspace=1` from the URL in your browser address bar.  
To no longer have the Power BI Desktop Folder experience, uninstall the Folder build and reinstall Power BI Desktop from the Microsoft Store.

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

## Manage your workspace content using folders

### Create a folder in your workspace

To create a folder:

1. Go to a workspace, select **+New** > **Folder**.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

1. Input the name of the folder in the *New folder* dialog.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

    > [!NOTE]
    > Folder names should conform to the following naming convention:
    >
    > * Can't include C0 and C1 control codes.
    > * Can't contain leading and trailing space, or contain these characters: ~"#.&*:<>?/\{|}.
    > * System reserved names can't be used, including: $recycle.bin, recycled, recycler.
    > * The length of name can't exceed 255 characters.
    > * Folder names can't be duplicated in the same folder or at root level of workspace.

1.	The folder is created successfully.
 
1.	You can create nested subfolders in a folder by using the same way. Maximum 10 level nested subfolders can be created. 
NOTE: Up to 10 folders can be nested within the root folder.


### Move items into a folder

### Create an item in a folder

### Rename a folder

### Workspace and content ownership

## Supported items