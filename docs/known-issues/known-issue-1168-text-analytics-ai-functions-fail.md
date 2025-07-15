---
title: Known issue - Text Analytics AI Functions fail
description: A known issue is posted where Text Analytics AI Functions fail.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/03/2025
ms.custom: known-issue-1168
---

# Known issue - Text Analytics AI Functions fail

You have access to a workspace associated with a premium capacity. When you try to invoke AIFunctions, you receive an error.

**Status:** Fixed: July 3, 2025

**Product Experience:** Power BI

## Symptoms

When you try to invoke AIFunctions, you receive an error. The error is similar to `PowerBINotAuthorizedException`.

## Solutions and workarounds

To work around the issue:

1. Create a new workspace with Premium per-user license in the Power BI Service portal
1. Open **Transform data\Data source settings** in a new Power BI Desktop session
1. Under **Global permissions**, select **AI functions**, and select the **Clear Permissions** button
1. Remove the permission using the **Delete** option
1. Load some data and invoke Text Analytics by following the instructions

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
