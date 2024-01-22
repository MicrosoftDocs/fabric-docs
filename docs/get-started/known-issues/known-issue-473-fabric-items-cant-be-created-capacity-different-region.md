---
title: Known issue - Fabric items can't be created in a workspace moved to a capacity in a different region
description: A known issue is posted where Fabric items can't be created in a workspace moved to a capacity in a different region
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 09/28/2023
ms.custom: known-issue-473
---

# Known issue - Fabric items can't be created in a workspace moved to a capacity in a different region

If a workspace ever contained a Fabric item other than a Power BI item, even if all the Fabric items have since been deleted, then moving that workspace to a different capacity in a different region isn't supported.  If you do move the workspace cross-region, you can't create any Fabric items. In addition, the same behavior occurs if you configure Spark compute settings in the Data Engineering or Data Science section of the workspace settings.

**Status:** Fixed: September 28, 2023

**Product Experience:** OneLake

## Symptoms

After moving the workspace to a different region, you can't create a new Fabric item.  The creation fails, sometimes showing an error message of "Unknown error."

## Solutions and workarounds

To work around the issue, you can create a new workspace in the capacity in the different region and create Fabric items there. Alternatively, you can move the workspace back to the original capacity in the original region.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
