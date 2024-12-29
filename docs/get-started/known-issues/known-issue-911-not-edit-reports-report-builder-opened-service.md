---
title: Known issue - Can't edit paginated reports in Report Builder when opened from service
description: A known issue is posted where you can't edit paginated reports in Report Builder when opened from service.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 11/05/2024
ms.custom: known-issue-911
---

# Known issue - Can't edit paginated reports in Report Builder when opened from service

When you try to edit a paginated report in a workspace by selecting **Edit in Power BI Report Builder** from the item menu, the browser offers the choice of opening the link in Power BI Report Builder (or download it, if it's not installed). The change is due to a [recent change in Chromium](https://issues.chromium.org/issues/375228139).

**Status:** Fixed: November 5, 2024

**Product Experience:** Power BI

## Symptoms

When you let the browser open the link, an error dialog is displayed. The error message is similar to: `Unable to connect to the server that is specified in the URL. 'https//app.powerbi.com/...`.

## Solutions and workarounds

Instead of opening the report from the Power BI portal, open it directly from Power BI Report Builder. You can open it directly by using **File > Open > Power BI Service**.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
