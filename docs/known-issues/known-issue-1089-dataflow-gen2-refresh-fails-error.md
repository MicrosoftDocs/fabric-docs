---
title: Known issue - Dataflow Gen2 refresh fails with PowerBIEntityNotFound error
description: A known issue is posted where Dataflow Gen2 refresh fails with PowerBIEntityNotFound error.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-1089
---

# Known issue - Dataflow Gen2 refresh fails with PowerBIEntityNotFound error

Your Dataflow Gen2 dataflow doesn't refresh correctly in cross-tenant scenarios. The refresh fails with a PowerBIEntityNotFound and returns a status code of 403 or 404.

**Status:** Fixed: May 8, 2025

**Product Experience:** Power BI

## Symptoms

Your dataflow refresh fails when it makes a downstream service call to: 'https://[REGION]-redirect.analysis.windows.net/metadata/workspaces/[GUID]/artifacts' with a status code of 404. Your gateway-based refresh fails when it makes a downstream service call to: 'https://api.powerbi.com/powerbi/globalservice/v201606/clusterdetails' with a status code of 403. The error code is PowerBIEntityNotFound.

## Solutions and workarounds

There's no workaround at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
