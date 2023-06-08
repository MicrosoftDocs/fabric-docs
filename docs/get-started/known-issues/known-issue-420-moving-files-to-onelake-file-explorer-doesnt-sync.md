---
title: Known issue - Moving files from outside of OneLake to OneLake with file explorer doesn't sync files
description: A known issue is posted where moving files from outside of OneLake to OneLake with file explorer doesn't sync files
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.date: 06/08/2023
ms.custom: known-issue-420
---

# Known issue - Moving files from outside of OneLake to OneLake with file explorer doesn't sync files

Within OneLake file explorer, moving a folder (cut and paste or drag and drop) from outside of OneLake into OneLake fails to sync the contents in that folder. The contents move locally, but only the top-level folder syncs to OneLake. You must trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

**APPLIES TO:** ✔️ OneLake

**Status:** Open

**Product Experience:** Administration & Management

## Symptoms

​You continuously see the sync pending arrows for the folder and underlying files indicating the files aren't synced to OneLake.

## Solutions and workarounds

You must trigger a sync by either opening the files and saving them or moving them back out of OneLake and then copying and pasting (versus moving).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
