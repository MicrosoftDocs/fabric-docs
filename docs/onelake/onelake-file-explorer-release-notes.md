---
title: OneLake File Explorer Release Notes
description: OneLake File Explorer seamlessly integrates OneLake with Windows File Explorer. Learn how to install and use this application.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom: build-2023
ms.date: 06/19/2023
---

# What's new in the latest OneLake file explorer?

Continue reading below for information on major changes to OneLake file explorer.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## July 2023 Update (v 1.0.9.0)

### Option to sign in to different accounts

When you install OneLake file explorer you can now choose which account to sign-in with.  If you want to change the account later, you can right click the OneLake icon in the Windows notification area, choose “Account” and click “Sign Out”.  Signing out will close OneLake file explorer.  To sign in with another account, open OneLake file explorer again by searching for "OneLake" using Windows search (Windows + S) and select the OneLake application..  Previously, when you started OneLake file explorer, it automatically used the AAD identity currently logged into Windows to sync Fabric workspaces and items.  

### Fix known issue during folder moves from outside of OneLake to OneLake

Now when you move a folder (cut and paste or drag and drop) from a location outside of OneLake to OneLake, the contents will sync to OneLake successfully.  Previously, you had to trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

## Support lifecycle

Only the most recent version of OneLake file explorer is supported.  Customers who contact support for OneLake file explorer will be asked to upgrade to the most recent version.  Download the latest [OneLake file explorer](https://go.microsoft.com/fwlink/?linkid=2235671).
