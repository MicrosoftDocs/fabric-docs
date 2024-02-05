---
title: Known issue - Moving files from outside of OneLake to OneLake with file explorer doesn't sync files
description: A known issue is posted where moving files from outside of OneLake to OneLake with file explorer doesn't sync files
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.date: 07/31/2023
ms.custom: known-issue-420
---

# Known issue - Moving files from outside of OneLake to OneLake with file explorer doesn't sync files

Within OneLake file explorer, moving a folder (cut and paste or drag and drop) from outside of OneLake into OneLake fails to sync the contents in that folder. The contents move locally, but only the top-level folder syncs to OneLake. You must trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

**APPLIES TO:** ✔️ OneLake

**Status:** Fixed: July 31, 2023

**Product Experience:** Administration & Management

## Symptoms

​You continuously see the sync pending arrows for the folder and underlying files indicating the files aren't synced to OneLake.

## Solutions and workarounds

The fix is available in [OneLake file explorer v1.0.9.0](https://www.microsoft.com/download/details.aspx?id=105222) and later versions.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
