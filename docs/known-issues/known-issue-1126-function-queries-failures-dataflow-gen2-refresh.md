---
title: Known issue - Function queries cause failures in Dataflow Gen2 refresh
description: A known issue is posted where Function queries cause failures in Dataflow Gen2 refresh.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-1126
---

# Known issue - Function queries cause failures in Dataflow Gen2 refresh

In a Dataflow Gen2 (CI/CD, preview), queries resulting in functions are still marked as staged. The staged functions are never unstaged, which causes  the refresh to fail due to being rewritten as a table during refresh.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

If you have a query that results in functions, you see refresh failures only if the functions are being invoked. If you're using an output destination in this case, you see an error message similar to: `We cannot convert a value of type Table to type Function`.

## Solutions and workarounds

As a workaround, follow these steps:

1. Transform function query from a function to a regular query
1. Right-click the query and disable staging
1. Convert the query back to a function

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
