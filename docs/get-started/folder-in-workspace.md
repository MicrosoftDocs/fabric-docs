---
title: Folder in workspace
description: "Learn how to create a folder: inside a workspace that enables users to efficiently organize and manage items in the workspace."
author: yicw
ms.author: yicw
ms.reviewer: yicw, maggies
ms.topic: how-to
ms.date: 03/28/2024
---

# Folder in workspace

This article explains what is folder in workspace and how to use folder in *workspace* [!INCLUDE [product-name](../includes/product-name.md)] in Fabric. For more information about workspace, see the [Workspaces](workspaces.md) article.

Folder is an organizational unit inside a workspace that enables users to efficiently organize and manage artifacts in the workspace. 

## Create a folder in workspace
To create a folder:
1.	Go to a workspace, select +New > Folder.

:::image type="content" source="media/folder-in-workspace/create-folder-in-new-menu.png" alt-text="Screenshot showing entry point of folder creation in new menu." lightbox="media/folder-in-workspace/create-folder-in-new-menu.png":::

2.	Input the name of the folder in the "New folder" dialog.

:::image type="content" source="media/folder-in-workspace/input-name-in-new-folder-dialog.png" alt-text="Screenshot showing new folder dialog" lightbox="media/folder-in-workspace/input-name-in-new-folder-dialog.png":::

> [!NOTE]
> Folder names should follow certain naming convention:
> 1. Can't include C0 and C1 control codes.
> 2. Cant’ contain leading and trailing space, or contain these characters: ~"#.&*:<>?/\{|}. 
> 3. System reserved names cannot be used, including: $recycle.bin, recycled, recycler.
> 4. The length of name cannot exceed 255 characters.
> 5. Folder names cannot be duplicated in the same folder or at root level of workspace.

3.	The folder is created successfully.

:::image type="content" source="media/folder-in-workspace/newly-created-folder-in-workspace.png" alt-text="Screenshot showing a folder is created successfully" lightbox="media/folder-in-workspace/newly-created-folder-in-workspace.png":::

4.	You can create nested subfolders in a folder by using the same way. Maximum 10 level nested subfolders can be created. 

> [!NOTE]
> Up to 10 folders can be nested within the root folder.

## Move items into a folder
To move a single item:
1.	Select the contextual menu of the item you want to move, then select Move.

:::image type="content" source="media/folder-in-workspace/select-move-to-in-contextual-menu.png" alt-text="Screenshot showing the entrypoint of move to button in contextual menu of an item" lightbox="media/folder-in-workspace/select-move-to-in-contextual-menu.png":::

2.	Select the destination folder you want to move this item to, then select Move here.

:::image type="content" source="media/folder-in-workspace/select-destination-folder.png" alt-text="Screenshot showing the dialog for selecting destination folder" lightbox="media/folder-in-workspace/select-destination-folder.png":::

:::image type="content" source="media/folder-in-workspace/select-move-here.png" alt-text="Screenshot showing move here button in the desination folder" lightbox="media/folder-in-workspace/select-move-here.png":::

3.	By selecting on the link in toast notification or navigating to the folder directly, you can go to the destination folder to check if the item is successfully moved.

:::image type="content" source="media/folder-in-workspace/notification-moved-successfully.png" alt-text="Screenshot showing the notification for moving successfully" lightbox="media/folder-in-workspace/notification-moved-successfully.png":::

To move multiple items:
1.	Select multiple items and select Move from the command bar.

:::image type="content" source="media/folder-in-workspace/multi-select-items-and-move.png" alt-text="Screenshot showing multi-selected items and move button" lightbox="media/folder-in-workspace/multi-select-items-and-move.png":::

2.	Select a destination where you want to move these items. You can also create a new folder when needed. 

:::image type="content" source="media/folder-in-workspace/create-new-folder-while-moving.png" alt-text="Screenshot showing new folder button in destination selector dialog" lightbox="media/folder-in-workspace/create-new-folder-while-moving.png":::

## Create an item in a folder
1.	Go to a folder, select +New and then select the item you want to create. The item should be created in this folder.

:::image type="content" source="media/folder-in-workspace/create-items-in-folder.png" alt-text="Screenshot showing create item from new menu inside a folder " lightbox="media/folder-in-workspace/create-items-in-folder.png":::

> [!NOTE]
> 1. Currently a few items cannot be created in folder: Dataflow gen2, Streaming semantic model and Streaming dataflow
> 2. If you are creating items from homepage or create hub, items are created in root level of workspace.

## Rename a folder
To rename a folder:
1.	Select contextual menu and then select Rename.

:::image type="content" source="media/folder-in-workspace/rename-folder.png" alt-text="Screenshot showing rename folder entry point in contextual menu." lightbox="media/folder-in-workspace/rename-folder.png":::

2.	Give a new name and select Rename button.

:::image type="content" source="media/folder-in-workspace/input-name-in-rename-dialog.png" alt-text="Screenshot showing inputting name in rename dialog." lightbox="media/folder-in-workspace/input-name-in-rename-dialog.png":::

> [!NOTE]
> While renaming a folder, same naming convention should be followed as for creating a folder. 

## Delete a folder
To delete a folder:
1.	Make sure the folder is empty.
2.	Select contextual menu and select Delete.

:::image type="content" source="media/folder-in-workspace/delete-folder.png" alt-text="Screenshot showing delete folder entry point in contextual menu " lightbox="media/folder-in-workspace/delete-folder.png":::

> [!NOTE]
> Currently only empty folder can be deleted.

## Permission model
Workspace admins, members, and contributors can create, modify, and delete folders in the workspace. Viewers can only view folder hierarchy and navigate in the workspace.

Currently folders inherit the permissions of the workspace they are in. 

| Capability                   | Admin   | Member   | Contributor | Viewer   |
|------------------------------|---------|----------|-------------|----------|
| Create folder                | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Delete folder                | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Rename folder                | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Move folder and items        | &#9989; | &#9989;  | &#9989;     | &#10060; |
| View folder in workspace list| &#9989; | &#9989;  | &#9989;     | &#9989;  |
