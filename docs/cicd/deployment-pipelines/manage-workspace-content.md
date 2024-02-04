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

## Manage your workspace content using folders

When you deploy content from a workspace that has folders, the folder hierarchy is automatically applied to the deployed items in the target stage. Learn more on Deployment pipelines.

### Create a folder in your workspace

To create a folder:

1. Go to a workspace, select **+New** > **Folder**.

    :::image type="content" source="./media/manage-workspace-content/new-folder.png" alt-text="Screenshot showing how to create a new folder.":::

1. Input the name of the folder in the *New folder* dialog.

    > [!NOTE]
    > Folder names should conform to the following naming convention:
    >
    > * Can't include C0 and C1 control codes.
    > * Can't contain leading and trailing space, or contain these characters: ~"#.&*:<>?/\{|}.
    > * System reserved names can't be used, including: $recycle.bin, recycled, recycler.
    > * The length of name can't exceed 255 characters.
    > * Folder names can't be duplicated in the same folder or at root level of workspace.

Once the folder is created successfully, you can [add](#create-an-item-in-a-folder) or [move](#move-items-into-a-folder) items into it. You can also create up to 10 subfolders nested inside a folder.

### Move items into a folder

To move existing items into a folder, select the item or items you want to move, and then select **Move**. In the *Move to* dialog, select the folder you want to move the items to.

:::image type="content" source="./media/manage-workspace-content/move-items.png" alt-text="Screenshot showing several selected items being moved to a new folder.":::

You can select an existing folder to move the items to, or create a new one.

:::image type="content" source="./media/manage-workspace-content/move-to-new-folder.png" alt-text="Screenshot showing how to move selected items to a new folder.":::

Alternatively, you can move one item at a time to a folder by selecting the item and then selecting the folder, and then selecting **Move here**.

:::image type="content" source="./media/manage-workspace-content/move-one-item.png" alt-text="Screenshot showing how to move one item at a time to a new folder.":::

### Create an item in a folder

To create a new item inside a folder, select **+New**, and then select the type of item you want to create. The item is created in the current folder.

:::image type="content" source="./media/manage-workspace-content/create-new-item.png" alt-text="Screenshot showing how to create a new item from inside a folder.":::

Currently, the following items can't be created in a folder:

* Dataflow gen2
* Lakehouse
* Warehouse
* Paginated report
* Datamart
* Streaming semantic model
* Streaming dataflow

### Rename, delete, or move a folder

Select the contextual menu of any folder for other actions you can do to the folder, including renaming or deleting the folder.

:::image type="content" source="./media/manage-workspace-content/manage-folder.png" alt-text="Screenshot of contextual menu with options to open, rename, move, or delete a folder.":::

### Publish a report to a folder

When you publish a report to a workspace, you can select the folder in which to publish the report.

#### From the Power BI service

1. Navigate to the workspace where you want to publish your report.
1. Select the folder you want to publish the report to.
1. Select **Upload**, find the desired report, and upload to the correct folder.

    :::image type="content" source="./media/manage-workspace-content/upload-report.png" alt-text="{alt-text}":::

1. You can now see the published report, semantic model, and the breadcrumb trail indicating the Folder you published to.

#### From Power BI Desktop

1. Open the report you want to publish in Power BI Desktop.
1. Select **Publish**.
1. Follow the procedure for publishing and select the exact Folder you want to publish the report to.
1. Publish the report.
1. to view the report, select the link in the Power BI service.

### Workspace and content ownership

## Supported items

## Considerations and limitations

* Individual folders can't be deployed manually in deployment pipelines. Their deployment is triggered automatically when at least one of their items is deployed.

* When pairing deployed items to adjacent pipelines, item pairing now looks at the item's full path (on top of the item name) if there's a conflict. During assignment, if there's still a conflict after considering the items’ full path, the assignment fails. For example, a report under folder A in the *Development* stage can be paired with two reports having the same name under folder A in a workspace being assigned to the *Test* stage.

* The folder hierarchy of paired items is updated only during deployment. During assignment, after the pairing process, the hierarchy of paired items isn't updated yet.

* Since a folder is deployed only if one of its items is deployed, an empty folder can't be deployed.

* Changes to a folder only (not the items in it), such as moving their locations, delete, add, etc. are treated as if renaming its items. Therefore, when comparing pipelines the items are labeled as *Different*.

* Deploying one item out of several in a folder also updates the structure of the items which aren't deployed in the target stage even though the items themselves aren't be deployed.
