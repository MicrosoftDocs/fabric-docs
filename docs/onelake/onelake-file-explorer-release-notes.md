---
title: OneLake File Explorer Release Notes
description: Information about each release of the OneLake file explorer client app for Windows.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/20/2023
---

# What's new in the latest OneLake file explorer?

Continue reading for information on major updates to OneLake file explorer.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## July 2023 Update (v 1.0.9.0)

### Option to sign in to different accounts

When you install OneLake file explorer, you can now choose which account to sign-in with.  To switch accounts, right click the OneLake icon in the Windows notification area, select “Account” and then “Sign Out”.  Signing out will exit OneLake file explorer and pause the sync.  To sign in with another account, start OneLake file explorer again by searching for "OneLake" using Windows search (Windows + S) and select the OneLake application.  Previously, when you started OneLake file explorer, it automatically used the Microsoft Azure Active Directory identity currently logged into Windows to sync Fabric workspaces and items.  

When you sign in with another account, you see the list of workspaces and items refresh in OneLake file explorer.  If you continue to workspaces associated with the previous account, you can manually refresh the view by clicking “Sync from OneLake”.  Those workspaces are inaccessible while you're signed into a different account.

### Fix known issue during folder moves from outside of OneLake to OneLake

Now when you move a folder (cut and paste or drag and drop) from a location outside of OneLake to OneLake, the contents sync to OneLake successfully.  Previously, you had to trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

## Support lifecycle

Only the most recent version of OneLake file explorer is supported.  Customers who contact support for OneLake file explorer will be asked to upgrade to the most recent version.  Download the latest [OneLake file explorer](https://go.microsoft.com/fwlink/?linkid=2235671).
