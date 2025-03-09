---
title: Known issue - Custom visuals using dialog or download API don't work in February Desktop
description: A known issue is posted where custom visuals using the dialog or download API don't work in the February version of Power BI Desktop.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/05/2025
ms.custom: known-issue-1046
---

# Known issue - Custom visuals using dialog or download API don't work in February Desktop

You can create a custom visual that uses the dialog API, which is the API for showing modal dialogs from custom visuals, or the download API. If you use the custom visual, it doesn't work in the February version of Power BI Desktop (Version: 2.140.1078.0).

**Status:** Open

**Product Experience:** Power BI

## Symptoms

If you try to open a custom visual that uses the dialog or download API, the dialog doesn't open. The issue only happens in the Desktop, not in the Service.

## Solutions and workarounds

To work around the issue, use Power BI service to open the affected custom visual. Alternatively, you can use the [January version of Power BI Desktop](/power-bi/fundamentals/desktop-latest-update-archive) to open the visual.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
