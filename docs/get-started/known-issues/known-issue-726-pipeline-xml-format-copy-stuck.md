---
title: Known issue - Pipeline using XML format copy gets stuck
description: A known issue is posted where a pipeline using XML format copy gets stuck.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/24/2024
ms.custom: known-issue-726
---

# Known issue - Pipeline using XML format copy gets stuck

When using a pipeline to copy XML formatted data to a tabular data source, the pipeline gets stuck. The issue most often appears when XML single records contain many different array type properties.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

The copy activity doesn't fail; it runs endlessly until it hits a timeout or is canceled. Some XML files copy without any issue while some files are causing the issue.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
