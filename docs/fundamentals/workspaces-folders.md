---
title: Create folders in workspaces
description: "Learn how to create a folder inside a workspace to enable users to efficiently organize and manage items in the workspace."
author: SnehaGunda
ms.author: sngun
ms.reviewer: yicw, mesrivas,liud
ms.topic: how-to
ms.custom: fabric
ms.search.form: product-trident, Manage your workspace
ms.date: 12/16/2024
#customer intent: As a user, I want to learn how to create folders in workspaces so that I can efficiently organize and manage items in the workspace.
---

# Create folders in workspaces

This article explains what folders in workspaces are and how to use them in workspaces in [!INCLUDE [product-name](../includes/product-name.md)]. Folders are organizational units inside a workspace that enable users to efficiently organize and manage artifacts in the workspace. For more information about workspaces, see the [Workspaces](workspaces.md) article.

## Create a folder in a workspace

1. In a workspace, select **New folder**.

    :::image type="content" source="media/workspaces-folders/create-folder-new-menu.png" alt-text="Screenshot showing entry point of folder creation in new menu.":::

1. Enter a name for the folder in the **New folder** dialog box. See [Folder name requirements](#folder-name-requirements) for naming restrictions.

    :::image type="content" source="media/workspaces-folders/input-name-new-folder-dialog.png" alt-text="Screenshot showing New Folder dialog with a sample folder name.":::

1. The folder is created successfully.

    :::image type="content" source="media/workspaces-folders/newly-created-folder-workspace.png" alt-text="Screenshot showing a folder is created successfully.":::

1. You can create nested subfolders in a folder in the same way. A maximum of 10 levels of nested subfolders can be created. 

   > [!NOTE]
   > You can nest up to 10 folders in the root folder.

### Folder name requirements

Folder names must follow certain naming conventions:

- The name can't include C0 and C1 control codes.
- The name can't contain leading or trailing spaces.
- The name can't contain these characters: ~"#.&*:<>?/\{|}. 
- The name can't contain system-reserved names, including: $recycle.bin, recycled, recycler.
- The name length can't exceed 255 characters.
- You can't have more than one folder with the same name in a folder or at the root level of the workspace.

## Move items into a folder

### Move a single item

1. Select the context menu (**...**) of the item you want to move, then select **Move to**.

    :::image type="content" source="media/workspaces-folders/select-move-context-menu.png" alt-text="Screenshot showing the entrypoint of move to button in context menu of an item." lightbox="media/workspaces-folders/select-move-context-menu.png":::

1. Select the destination folder where you want to move this item.

    :::image type="content" source="media/workspaces-folders/select-destination-folder.png" alt-text="Screenshot showing the dialog for selecting destination folder." lightbox="media/workspaces-folders/select-destination-folder.png":::

1. Select **Move here**.

    :::image type="content" source="media/workspaces-folders/select-move-here.png" alt-text="Screenshot showing move here button in the destination folder." lightbox="media/workspaces-folders/select-move-here.png":::

1. By selecting **Open folder** in the notification or navigating to the folder directly, you can go to the destination folder to check if the item moved successfully.

    :::image type="content" source="media/workspaces-folders/notification-moved-successfully.png" alt-text="Screenshot showing the notification for moving successfully.":::

### Move multiple items

1. Select multiple items, then select **Move** from the command bar.

    :::image type="content" source="media/workspaces-folders/multi-select-items-move.png" alt-text="Screenshot showing multi-selected items and move button." lightbox="media/workspaces-folders/multi-select-items-move.png":::

1. Select a destination where you want to move these items. You can also create a new folder if you need it. 

    :::image type="content" source="media/workspaces-folders/create-new-folder-while-moving.png" alt-text="Screenshot showing new folder button in destination selector dialog." lightbox="media/workspaces-folders/create-new-folder-while-moving.png":::

## Create an item in a folder

1. Go to a folder, select **New**, then select the item you want to create. The item is created in this folder.

    :::image type="content" source="media/workspaces-folders/create-items-folder.png" alt-text="Screenshot showing create item from new menu inside a folder." lightbox="media/workspaces-folders/create-items-folder.png":::

    > [!NOTE]
    > Currently, you can't create certain items in a folder: 
    >
    > - Dataflows gen2
    > - Streaming semantic models
    > - Streaming dataflows
    >
    > If you create items from the home page or the **Create** hub, items are created at the root level of the workspace.

## Publish to folder (preview)

You can now publish your Power BI reports to specific folders in your workspace. 

When you publish a report, you can choose the specific workspace and folder for your report, as illustrated in the following image. 

:::image type="content" source="media/workspaces-folders/publish-folder-select-folder.png" alt-text="Screenshot showing selecting a folder for where a report gets published." lightbox="media/workspaces-folders/publish-folder-select-folder.png":::

To publish reports to specific folders in the service, make sure that in Power BI Desktop, the **Publish dialogs support folder selection** setting is enabled in the **Preview features** tab in the options menu. 

:::image type="content" source="media/workspaces-folders/publish-folder-dialog.png" alt-text="Screenshot showing selecting publish dialogs support folder selection box." lightbox="media/workspaces-folders/publish-folder-dialog.png":::
    
## Rename a folder

1. Select the context (**...**) menu, then select **Rename**.

    :::image type="content" source="media/workspaces-folders/rename-folder.png" alt-text="Screenshot showing rename folder entry point in context menu.":::

1. Give the folder a new name and select the **Rename** button.

    :::image type="content" source="media/workspaces-folders/input-name-rename-dialog.png" alt-text="Screenshot showing inputting name in rename dialog.":::

> [!NOTE]
> When renaming a folder, follow the same naming convention as when you're creating a folder.  See [Folder name requirements](#folder-name-requirements) for naming restrictions.

## Delete a folder

1. Make sure the folder is empty.
1. Select the context menu (**...**) and select **Delete**.

    :::image type="content" source="media/workspaces-folders/delete-folder.png" alt-text="Screenshot showing delete folder entry point in contextual menu.":::

    > [!NOTE]
    > Currently you can only delete empty folders.

## Permission model

Workspace admins, members, and contributors can create, modify, and delete folders in the workspace. Viewers can only view folder hierarchy and navigate in the workspace.

Currently, folders inherit the permissions of the workspace where they're located. 

| Capability  | Admin   | Member   | Contributor | Viewer   |
|-------|---------|----------|-------------|----------|
| Create folder  | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Delete folder  | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Rename folder   | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Move folder and items  | &#9989; | &#9989;  | &#9989;     | &#10060; |
| View folder in workspace list| &#9989; | &#9989;  | &#9989;     | &#9989;  |

## Considerations and limitations

- Currently dataflows gen2, streaming semantic models, and streaming dataflows can't be created in folders. 
- If you trigger item creation from the home page, create hub, and industry solution, items are created at the root level of workspaces.
- Git doesn't currently support workspace folders.
- If folders **is enabled** in the Power BI service but **not enabled** in Power BI Desktop, republishing a report that is in a nested folder will replace the report in the nested folder.
- If Power BI Desktop folders **is enabled** in Power BI Desktop, but **not enabled** in the service and you publish to a nested folder, the report will be published to the general workspace.
- When publishing reports to folders, report names must be unique throughout an entire workspace, regardless of their location. Therefore, when publishing a report to a workspace that has another report with the same name in a different folder, the report will publish to the location of the already existing report. If you want to move the report to a new folder location in the workspace, you need to make this change in the Power BI service.
- Folders are not supported in [Template App workspaces](/power-bi/connect-data/service-template-apps-overview).

## Related content

- [Folders in deployment pipelines](../cicd/deployment-pipelines/understand-the-deployment-process.md)
- [Create workspaces](../fundamentals/create-workspaces.md)
- [Give users access to workspaces](../fundamentals/give-access-workspaces.md)
