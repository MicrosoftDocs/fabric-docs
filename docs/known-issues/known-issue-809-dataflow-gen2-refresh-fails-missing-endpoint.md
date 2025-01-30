---
title: Known issue - Dataflow Gen2 refresh fails due to missing SQL analytics endpoint
description: A known issue is posted where Dataflow Gen2 refreshes fail due to missing staging SQL analytics endpoint.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/13/2025
ms.custom: known-issue-809
---

# Known issue - Dataflow Gen2 refresh fails due to missing staging SQL analytics endpoint

When a Dataflow Gen2 creates its staging lakehouse, sometimes the associated SQL analytics endpoint isn't created. When there's no SQL analytics endpoint, the dataflow fails to refresh with an error.

**Status:** Fixed: January 13, 2025

**Product Experience:** Data Factory

## Symptoms

If you face this known issue, you see the dataflow refresh fail with an error. The error message is similar to: `Refresh failed. The staging lakehouse is not configured correctly. Please create a support ticket with this error report.`

## Solutions and workarounds

As a workaround, you can create a support ticket and include the specific error message. Since the staging lakehouse is an internal artifact, we can recreate the lakehouse internally. The issue only affects existing staging lakehouses. If you create a new dataflow, it won't have this issue.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
