---
title: Known issue - Deleted OneLake Shortcuts still visible as empty file
description: A known issue is posted where Deleted OneLake Shortcuts still visible as empty file.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-1133
---

# Known issue - Deleted OneLake Shortcuts still visible as empty file

You can use the OneLake Shortcut API to delete shortcuts. The API doesn't work properly and leaves a stale, empty file in the shortcut path. Due to the empty file, if you try to recreate the shortcut with the same name and path, you receive an error.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

Here are some symptoms if you have this issue:

- You see a stale placeholder file where you deleted the shortcut.
- You receive a 409 conflict error.
- You unintentionally autorename the shortcut if autorename is input as true in the service.

## Solutions and workarounds

To work around the issue, follow the below steps:

1. [Connect to OneLake using Azure Storage Explorer](/fabric/onelake/onelake-azure-storage-explorer)
1. List the files under the folder where the shortcut exists
1. If you face this issue, you see a file with name of shortcut and size of 0KB
1. Right-click on the shortcut and select **Break lease**
1. Right-click on the shortcut and select **Delete**

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
