---
title: Access Fabric data locally with OneLake file explorer
description: OneLake file explorer seamlessly integrates OneLake with Windows File Explorer. Learn how to install and use this application.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Use OneLake file explorer to access Fabric data

The OneLake file explorer application seamlessly integrates OneLake with Windows File Explorer. This application automatically syncs all OneLake items that you have access to in Windows File Explorer. "Sync" refers to pulling up-to-date metadata on files and folders, and sending changes made locally to the OneLake service. Syncing doesn’t download the data, it creates placeholders. You must double-click on a file to download the data locally.

:::image type="content" source="media\onelake-file-explorer\onelake-file-explorer-screen-v-2.png" alt-text="Screenshot of OneLake files integrated in the Windows File Explorer screen." lightbox="media\onelake-file-explorer\onelake-file-explorer-screen-v-2.png":::

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

When you create, update, or delete a file via Windows File Explorer, it automatically syncs the changes to OneLake service. Updates to your item made outside of your File Explorer aren't automatically synced. To pull these updates, you need to right-click on the item or subfolder in Windows File Explorer and select **Sync from** **OneLake**.

## Installation instructions

OneLake file explorer currently supports Windows and has been validated on Windows 10 and 11.

To install:

1. Download the [OneLake file explorer](https://go.microsoft.com/fwlink/?linkid=2235671).

1. Double-click the file to start installing.

   The storage location on your PC for the placeholders and any downloaded content is `\%USERPROFILE%\OneLake - Microsoft\`.

Once you have installed and launched the application, you can now see your OneLake data in Windows File Explorer.

## Limitations and considerations

- Workspace names with the "/" character, encoded escape characters such as `%23`, and names that look like GUIDs fail to sync.

- Files or folders containing Windows reserved characters ([learn more](/windows/win32/fileio/naming-a-file)) fail to sync.

- If Windows search is disabled, OneLake file explorer fails to start.

- Windows File Explorer is case insensitive, while OneLake is case sensitive. You can create files with the same name but different cases in the OneLake service using other tools, but Windows File Explorer only shows one of the files (the oldest one).

- If a file fails to sync due to a network issue, you will have to trigger the Sync to OneLake. You can do this by opening the file & saving it, prompting the sync process. Alternatively, you can trigger a modify event [using PowerShell](onelake-powershell.md) by executing this command: `(Get-Item -Path "<file_path>").LastWriteTimeUtc = Get-Date`

## Scenarios

The following scenarios provide details for working with the OneLake file explorer.

### Starting and exiting OneLake file explorer

OneLake file explorer starts automatically at startup of Windows. You can disable the application from starting automatically by selecting **Startup apps** in Windows Task Manager and then right-clicking **OneLake**, and selecting **Disable**.

- To manually start the application, search for OneLake using Windows search (Windows+S) and select the OneLake application. The views for any folders that were previously synced refresh automatically.

- To exit, right-click on the OneLake icon in the Windows notification area, located at the far right of the taskbar, and select **Exit**. The sync pauses, and you can't access placeholder files and folders. You continue to see the blue cloud icon for placeholders that were previously synced but not downloaded.

### Sync updates from OneLake

To optimize performance during the initial sync, OneLake file explorer syncs the placeholder files for the top-level workspaces and item names. When you open an item, OneLake file explorer syncs the files directly in that folder. Then, opening a folder within the item syncs the files directly in that folder. This functionality allows you to navigate your OneLake content seamlessly, without having to wait for all files to sync before starting to work.

When you create, update, or delete a file via OneLake file explorer, it automatically syncs the changes to OneLake service. Updates to your item made outside of your OneLake file explorer aren't automatically synced. To pull these updates, you need to right-click on the workspace name, item name, folder name, or file in OneLake file explorer and select **Sync from OneLake**. This action refreshes the view for any folders that were previously synced. To pull updates for all workspaces, right-click on the OneLake root folder and select **Sync from OneLake**.

### Sign in to different accounts

Starting in version 1.0.9.0, when you install OneLake file explorer, you can choose which account to sign in with. To switch accounts, right-click the OneLake icon in the Windows notification area, select **Account**, and then **Sign Out**. Signing out exits OneLake file explorer and pauses the sync. To sign in with another account, start OneLake file explorer again and choose the desired account.

When you sign in with another account, you see the list of workspaces and items refresh in OneLake file explorer. If you navigate to workspaces associated with the previous account, you can manually refresh the view by selecting **Sync from OneLake**. Those workspaces are inaccessible while you're signed in to a different account.

### Option to open workspaces and items on the web portal

Starting in version 1.0.10.0, you can seamlessly transition between using OneLake file explorer and the Fabric web portal. When browsing your OneLake data using OneLake file explorer, right click on a workspace and select “OneLake->View Workspace Online.”  This opens the workspace browser on the Fabric web portal.  
In addition, you can right click on an item, subfolder or file and select “OneLake->View Item Online.”  This opens the item browser on the Fabric web portal.  If you select a subfolder or file, the Fabric web portal always opens the root folder of the item.

### Offline support

The OneLake file explorer only syncs updates when you're online and the application is running. When the application starts, the views for any folders that were previously synced refresh automatically. Any files that you added or updated while offline show as sync pending until you save them again. Any files you deleted while offline are recreated during the refresh if they still exist on the service.

### Create files or folders in OneLake file explorer

1. Navigate to the **OneLake** section in Windows File Explorer.

1. Navigate to the appropriate folder in your item.

1. Right-click and select **New folder** or **New file type**.

> [!NOTE]
> If you write data to locations where you don't have write permission, such as the root of the item or workspace, the sync will fail. Clean up files or folders that fail to sync by moving them to the correct location or deleting them.

### Delete files or folders in OneLake file explorer

1. Navigate to the **OneLake** section in Windows File Explorer.

1. Navigate to the **Files** or **Tables** folder in your item.

1. Select a file or folder and delete.

### Edit files

You can open files using your favorite apps and make edits. Selecting **Save** syncs the file to OneLake. Starting in version 1.0.11, you can also make updates with Excel to your files. **Close** the file after the udpate in Excel and it will initiate the sync to OneLake.

If you edit a file locally and select **Save**, the OneLake file explorer app detects if that file was updated elsewhere (by someone else) since you last selected **Sync from OneLake**. A **Confirm the action** dialog box appears:

:::image type="content" source="media\onelake-file-explorer\confirm-file-change.png" alt-text="Screenshot of the Confirm file change dialog box.":::

If you select **Yes**, your local changes overwrite any other changes made to the file since the last time you selected **Sync from OneLake**.

If you select **No**, the local changes aren't sent to the OneLake service. You can then select **Sync from OneLake** to revert your local changes and pull the file from the service. Or you can copy the file with a new name to avoid conflicts.

### Copying or moving files

You can copy files to, from, and within your items using standard keyboard shortcuts like Ctrl+C and Ctrl+V. You can also move files by dragging and dropping them.

### Support for large files and a large number of files

When you upload or download files using the OneLake file explorer, the performance should be similar to using OneLake APIs. In general, the time it takes to sync changes from OneLake is proportional to the number of files.

### OneLake shortcut support

All folders in your items including [OneLake shortcuts](onelake-shortcuts.md) are visible. You can view, update, and delete the files and folders in those shortcuts.

### Client-side logs

Starting in version 1.0.10, you can find your client-side logs by right-clicking on the OneLake icon in the Windows notification area, located at the far right of the taskbar.  Select **Diagnostic Operations** > **Open logs directory**. This opens your logs directory in a new Windows file explorer window.  

Client-side logs are stored on your local machine under `%temp%\OneLake\Diagnostics\`.

You can enable additional client-side logging by selecting **Diagnostic Operations** > **Enable tracing**.

### Release Notes

Starting in version 1.0.11, you can information find about each release of the OneLake file explorer by right-clicking on the OneLake icon in the Windows notification area, located at the far right of the taskbar.  Select **About** > **Release Notes**. This opens the OneLake file explorer release notes page in your browser window. 

### Uninstall instructions

To uninstall the app, search for OneLake in Windows. Select **Uninstall** in the list of options under **OneLake**.

### Tenant setting enables access to OneLake file explorer

Tenant admins can restrict access to OneLake file explorer for their organization in the [Microsoft Fabric admin portal](../admin/admin-center.md). When the setting is disabled, no one in your organization can start the OneLake file explorer app. If the application is already running and the tenant admin disables the setting, the application exits. Placeholders and any downloaded content remain on local machines, but users can't sync data to or from OneLake.

## OneLake file explorer icons

These OneLake file explorer icons appear in Windows File Explorer to indicate the sync state of the file or folder.

| Icon | Icon description | Meaning |
| --- | --- | ---|
| :::image type="icon" source="media\onelake-file-explorer\blue-cloud.png"::: | Blue cloud icon | The file is only available online. Online-only files don’t take up space on your computer. |
| :::image type="icon" source="media\onelake-file-explorer\green-checkmark.png"::: | Green tick | The file is downloaded to your local computer. |
| :::image type="icon" source="media\onelake-file-explorer\sync-pending.png"::: | Sync pending arrows | Sync is in progress. This icon may appear when you're uploading files. If the sync pending arrows are persistent, then your file or folder may have an error syncing. You can find more information in the client-side logs on your local machine under `%temp%\OneLake\Diagnostics\`.|

## Related content

- Learn more about [Fabric and OneLake security](./security/fabric-and-onelake-security.md).
- [What's new in the latest OneLake file explorer?](onelake-file-explorer-release-notes.md)
