---
title: Known issue - Upload reports from OneDrive or SharePoint fails
description: A known issue is posted where uploading reports from OneDrive or SharePoint fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/01/2024
ms.custom: known-issue-667
---

# Known issue - Upload reports from OneDrive or SharePoint fails

Uploading a report from OneDrive or SharePoint fails when you use the file picker in the workspace view. The error happens when your language locale is set to something other than English. The file picker opens, but then shows an error message.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When opening the file picker, you see an error message similar to "Connection was refused" or "Something went wrong." The error happens when your language locale is set to something other than English.

## Solutions and workarounds

To work around this issue, you can add or replace the language URL parameter with `language=en-us` in the browser URL.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
