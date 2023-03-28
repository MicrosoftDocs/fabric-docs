---
title: OneLake File Explorer
description: OneLake File Explorer seamlessly integrates OneLake with Windows File Explorer. Learn how to install and use this application.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.date: 03/24/2023
---

# OneLake File explorer

[!INCLUDE [preview-note](../includes/preview-note.md)]

The OneLake File Explorer application seamlessly integrates OneLake with Windows File Explorer. This application automatically syncs all OneLake artifacts that you have access to in Windows File Explorer. “Sync” refers to pulling up-to-date metadata on files and folders, and sending changes made locally to the OneLake service. Syncing doesn’t mean downloading the data. You must double click on a file to download the data locally.

:::image type="content" source="media\onelake-file-explorer\onelake-file-explorer-screen.png" alt-text="Screenshot of OneLake files integrated in the Windows File Explorer screen." lightbox="media\onelake-file-explorer\onelake-file-explorer-screen.png":::

When you create, update, or delete a file via File Explorer, it automatically syncs the changes to OneLake service. Updates to your artifact made outside of your File Explorer aren't automatically synced. To pull these updates, you need to right click on the artifact or subfolder in Windows File Explorer and select **Sync from** **OneLake**.

## Installation instructions

OneLake File Explorer currently supports Windows and has been validated on Windows 10 and 11.

To install:

1. Download the [OneLake.msix](../placeholder.md) file.

1. Double click the file to start installing.

   > [!Note]
   > If you have a previous version already installed, exit the app before installing. You can exit the app by right clicking the OneLake icon in the Windows System Tray and selecting **Exit**.

Installation is complete and you can now see your OneLake data in Windows File Explorer.

## Known issues

- If there are **large number of files** in OneLake, the initial sync takes a long time to complete. You'll see a Sync Pending icon (:::image type="icon" source="media\onelake-file-explorer\sync-pending.png":::) while it's syncing.

   > [!NOTE]
   > You will also see a Sync Pending icon if there was an error during the sync (red cross icon) or if the sync failed due to access checks for any level in the workspace.

- **Workspace names with special characters** (anything other than letters, numbers, and underscores) fail to sync.

- **Files or folders containing Windows reserved characters** ([learn more](/windows/win32/fileio/naming-a-file)) fail to sync.

- **Updating Office files** (excel, ppt, etc.) isn't currently supported.

- When you select “**Sync from OneLake” on a folder, it does not automatically pull data for files that were already downloaded** to your local computer (shown with a green tick icon). To refresh that file with the latest changes from the service, right click on that file and select **Sync from OneLake**.  

- **Windows File Explorer is case insensitive** while OneLake is case sensitive. This means you can create files with the same name but different cases in the OneLake service using other tools, but Windows File Explorer only shows one of the files (the oldest one).

## Scenarios

The following scenarios provide details for working with the OneLake File Explorer.

### Starting and exiting OneLake File Explorer

- To start, search for “OneLake” using Windows search (Windows + S) and select the OneLake application.

- To exit, right-click on the OneLake icon in the Windows System Tray and select **Exit**.

### Uninstall instructions

To uninstall the app, in Windows, search for “OneLake”. Select **Uninstall** in the list of options under OneLake.

### Offline support

The OneLake File Explorer only syncs updates when you're online and the application is running. When the application starts, the metadata on files and folders is synced from the OneLake service and any changes made while offline will be removed.

### Create files or folders in OneLake File Explorer

1. Navigate to the OneLake section in Windows File Explorer.

2. Navigate to the Files folder in your artifact.

3. Right click and select **New** **folder** or **new file type**.

> [!NOTE]
> OneLake only allows you to write data to the Files or Table folders. If you write data to other locations, such as the root of the artifact or workspace, the sync will fail. Clean up files or folders that failed to sync by moving them to the correct location or deleting them.

### Delete files or folders in OneLake File Explorer

1. Navigate to the OneLake section in Windows File Explorer.

2. Navigate to the **Files** or **Tables** folder in your artifact.

3. Select a file or folder and delete.

### Sync updates from OneLake

When you start the OneLake File Explorer app, you see the list of files and folders that are currently in that artifact. To refresh the view of the data, right click on the workspace name, artifact name, folder name or file and select **Sync from** **OneLake**.

### Edit files

You can open files using your favorite apps and make edits. Selecting **Save** syncs the file to OneLake.

> [!NOTE]
> OneLake File Explorer does not currently support updating Office files (excel, ppt, etc.).

If you edit a file locally and select **Save**, the OneLake File Explorer app detects if that file has been updated elsewhere (by someone else) since you last selected **Sync from** **OneLake**.

:::image type="content" source="media\onelake-file-explorer\confirm-file-change.png" alt-text="Screenshot of the Confirm file change dialog box." lightbox="media\onelake-file-explorer\confirm-file-change.png":::

If you select **Yes**, then your local changes overwrite any other changes made to the file since the last time you selected **Sync from** **OneLake**.

If you select **No**, then the local changes won't be sent to the OneLake service. You can then select **Sync from** **OneLake** to revert your local changes and pull the file from the service. Or you can copy the file with a new name to avoid conflicts.

### Copying or moving files

You can copy files to, from, and within your artifacts using standard keyboard shortcuts like Crtl+C and Crtl+V. You can also move files by dragging and dropping them.

### Support for large files and a large number of files

When you upload or download files using the Onelake File Explorer, the performance should be similar to using OneLake APIs. In general, the time it takes to sync changes from OneLake is proportional to the number of files.

### Shortcut support

You'll see all folders in your artifacts including shortcuts. You can view, update, delete the files and folders in those shortcuts.

### Client-side logs

Client-side logs can be found on your local machine under *%temp%\OneLake\Diagnostics\\*.

## OneLake File Explorer icons

| Icon | Meaning |
| --- | ---|
| Blue cloud icon :::image type="icon" source="media\onelake-file-explorer\blue-cloud.png"::: | The file is only available online. Online-only files don’t take up space on your computer. |
| Green tick :::image type="icon" source="media\onelake-file-explorer\green-checkmark.png"::: | The file is downloaded to your local computer. |
| Sync pending arrows :::image type="icon" source="media\onelake-file-explorer\sync-pending.png"::: | Sync is in progress. This may occur when you're uploading files. |
| Red circle with white cross or red cross :::image type="icon" source="media\onelake-file-explorer\red-circle-white-x.png"::: | Your file or folder can't be synced. |

## Next steps

- [OneLake security](onelake-security.md)
