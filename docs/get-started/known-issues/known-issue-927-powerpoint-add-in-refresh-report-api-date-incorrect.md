---
title: Known issue - PowerPoint add-in and Refresh Report API refresh date appears incorrect
description: A known issue is posted where the Power BI add-in for PowerPoint and Refresh Report API refresh date appears incorrect.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 11/12/2024
ms.custom: known-issue-927
---

# Known issue - PowerPoint add-in and Refresh Report API refresh date appears incorrect

When you use the Power BI add-in for PowerPoint, the last refresh time presented at the button of the add-in page isn't always updated after a refresh. Additionally, when you invoke the report.refresh() method from the powerbi-client SDK, an error is thrown, despite the underlying report data being successfully refreshed.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When you use the powerbi-client SDK, you see that reports seem to not fully refresh, as the subsequent tasks fail to execute. When you use the Power BI add-in for PowerPoint, you see the last refresh time isn't always updated after a refresh.

## Solutions and workarounds

To work around the powerbi-client SDK error, implement a try-catch block or Promise.catch to handle exceptions thrown when invoking the report.refresh() method. If follow-up tasks depend on a successful response, consider executing these tasks if a similar exception is encountered, until a permanent fix is deployed.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
