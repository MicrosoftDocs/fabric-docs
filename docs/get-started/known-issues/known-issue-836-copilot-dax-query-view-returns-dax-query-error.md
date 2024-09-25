---
title: Known issue - Copilot in DAX query view returns DAX query with syntax error
description: A known issue is posted where Copilot in DAX query view returns DAX query with syntax error.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/13/2024
ms.custom: known-issue-836
---

# Known issue - Copilot in DAX query view returns DAX query with syntax error

You can live connect to a semantic model in Power BI Desktop. When you use Copilot in DAX query view to write a DAX query, the returned DAX query might have a syntax error.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

In DAX query view, Copilot returns a DAX query with a syntax error shown by a red underline. When you run the DAX query returned, the query fails.

## Solutions and workarounds

If the query has an error, select the Retry option to have Copilot try again. Alternatively, before keeping the query, copy and paste the error into the user prompt and try Copilot again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
