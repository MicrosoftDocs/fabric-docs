---
title: Known issue - Query folding indicators are incorrect for certain Power Query SDK based connectors
description: A known issue is posted where Query folding indicators are incorrect for certain Power Query SDK based connectors.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/31/2024
ms.custom: known-issue-709
---

# Known issue - Query folding indicators are incorrect for certain Power Query SDK based connectors

You can use a connector created with the Power Query SDK that relies on an ODBC driver. In this case and if the connector supports query folding, the Power Query editor might not yield the correct query folding indicator for certain steps.

**Status:** Fixed: July 31, 2024

**Product Experience:** Data Factory

## Symptoms

On the editing experience of Power Query Online, the correct query folding indicator for certain steps might not be accurate.

## Solutions and workarounds

There are no workarounds available as of now. This issue doesn't affect the user queries as it is only an issue with the query folding indicator, but not the execution of the query itself.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
