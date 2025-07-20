---
title: Known issue - Error with Dremio Connector using Dremio.DatabasesV370 function
description: A known issue is posted where there's an error with Dremio Connector using Dremio.DatabasesV370 function.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/22/2025
ms.custom: known-issue-1143
---

# Known issue - Error with Dremio Connector using Dremio.DatabasesV370 function

You can use the option parameter in the `Dremio.DatabasesV370` function when using the Dremio connector. If you set the option parameter to `null`, you might receive an error. For example, the function call looks similar to: `Dremio.DatabasesV370(dremio_conn_url, "Disabled", null, null, null, null)`.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When you use `Dremio.DatabasesV370` function with a null option parameter, you might receive an error. The error is similar to: `We cannot convert the value null to type Record`.

## Solutions and workarounds

As a workaround, you can change the option parameter from `null` to `[]` in the function. The new function call looks similar to: `Dremio.DatabasesV370(dremio_conn_url, "Disabled", null, null, null, [])`.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues) 
