---
title: Known issue - Pipeline copy data to Kusto using an on-premises data gateway doesn't work
description: A known issue is posted where the pipeline copy data to Kusto using an on-premises data gateway doesn't work.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/12/2025
ms.custom: known-issue-940
---

# Known issue - Pipeline copy data to Kusto using an on-premises data gateway doesn't work

You can use an on-premises data gateway for a source in a pipeline. If the pipeline's copy activity uses the on-premises source and a Kusto destination, the pipeline fails with an error.

**Status:** Fixed: March 12, 2025

**Product Experience:** Data Factory

## Symptoms

If you run a pipeline using the on-premises data gateway, you receive an error. The error is similar to `An error occurred for source: 'DataReader'. Error: 'Could not load file or assembly 'Microsoft.IO.RecyclableMemoryStream, Version=$$2.2.0.0$$, Culture=neutral, PublicKeyToken=31bf3856ad364e35' or one of its dependencies. The system cannot find the file specified.` or `KustoWriteFailed`.

## Solutions and workarounds

The issue is fixed in the November and later versions of the on-premises data gateway. Install the [latest version of the on-premises data gateway](https://www.microsoft.com/download/details.aspx?id=53127), and try again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
