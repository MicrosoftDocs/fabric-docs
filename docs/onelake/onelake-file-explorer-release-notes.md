---
title: OneLake File Explorer Release Notes
description: Information about each release of the OneLake file explorer client app for Windows.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/13/2023
---

# What's new in the latest OneLake file explorer?

Continue reading for information on major updates to OneLake file explorer.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## April 2024 Update (v 1.0.12.0)

### Update Notifications

We believe that staying informed about app updates is crucial. Whether it’s a bug fix, performance improvement, or exciting new features. Starting with this version, our file explorer app will now notify you when a new update is available. You’ll receive a notification when a new version is available, or simply check when icon changes and right-click to see if an update awaits.

## December 2023 Update (v 1.0.11.0)

### Ability to update files using Excel

With this release users can make edits and updates with Excel to OneLake files, similar to the experience with OneDrive. Start by opening a csv or xlsx file using Excel, make updates and close the file. Closing the file will initiate the sync to OneLake. You can then view the updated file online in the Fabric web portal. This enhancement aims to streamline your workflow and provide a more intuitive approach to managing and editing your files with Excel.  

### Menu option to view Release Notes
With this menu option, you can easily find details about what's new in the latest OneLake File Explorer version. Right-click on the OneLake icon in the Windows notification area, located at the far right of the taskbar, and select **About** > **Release Notes**. This action opens the OneLake file explorer release notes page in your browser window.

### TLS 1.3 support

OneLake file explorer will default to the latest TLS version supported by Windows, currently TLS 1.3. Support for TLS 1.3 is recommended for maintaining the security and privacy of data exchanged over the internet.
 
## September 2023 Update (v 1.0.10.0)

### Option to open workspaces and items on the web portal

Now you can seamlessly transition between using OneLake file explorer and the Fabric web portal. Browse your OneLake data using OneLake file explorer, right-click on a workspace, and select **OneLake** > **View Workspace Online**. This action opens the workspace browser on the Fabric web portal.

In addition, you can right-click on an item, subfolder, or file and select **OneLake** > **View Item Online**. This action opens the item browser on the Fabric web portal. If you select a subfolder or file, the Fabric web portal always opens the root folder of the item.

### Menu option to open logs directory

With this menu option, you can now easily find your client-side logs, which can help you troubleshoot issues. Right-click on the OneLake icon in the Windows notification area, located at the far right of the taskbar, and select Select **Diagnostic Operations** > **Open logs directory**. This action opens your logs directory in a new Windows file explorer window.

## July 2023 Update (v 1.0.9.0)

### Option to sign in to different accounts

When you install OneLake file explorer, you can now choose which account to sign-in with. To switch accounts, right-click the OneLake icon in the Windows notification area, select **Account**, and then select **Sign Out**. Signing out exits OneLake file explorer and pauses the sync. To sign in with another account, start OneLake file explorer again by searching for "OneLake" using Windows search (Windows + S) and select the OneLake application. Previously, when you started OneLake file explorer, it automatically used the Microsoft Entra ID currently logged into Windows to sync Fabric workspaces and items.

When you sign in with another account, you see the list of workspaces and items refresh in OneLake file explorer. If you continue to workspaces associated with the previous account, you can manually refresh the view by selecting **Sync from OneLake**. Those workspaces are inaccessible while you're signed into a different account.

### Fix known issue during folder moves from outside of OneLake to OneLake

Now when you move a folder (cut and paste or drag and drop) from a location outside of OneLake to OneLake, the contents sync to OneLake successfully. Previously, you had to trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

## Support lifecycle

Only the most recent version of OneLake file explorer is supported. If you contact support for OneLake file explorer, they ask you to upgrade to the most recent version. Download the latest [OneLake file explorer](https://go.microsoft.com/fwlink/?linkid=2235671).

## Related content

- [Use OneLake file explorer to access Fabric data](onelake-file-explorer.md)
