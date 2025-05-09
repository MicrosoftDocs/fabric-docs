---
title: Known issue - SQL analytics endpoint table queries fail due to RLE
description: A known issue is posted where SQL analytics endpoint table queries fail due to RLE.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/07/2025
ms.custom: known-issue-789
---

# Known issue - SQL analytics endpoint table queries fail due to RLE

When creating a delta table, you can use [run length encoding (RLE)](https://en.wikipedia.org/wiki/Run-length_encoding). If the delta writer uses RLE on the table you try to query in the SQL analytics endpoint, you receive an error.

**Status:** Fixed: May 7, 2025

**Product Experience:** Data Engineering

## Symptoms

When you query a table in the SQL analytics endpoint, you receive an error. The error message is similar to: `Error handing external file: 'Unknown encoding type.'`

## Solutions and workarounds

To resolve the issue, you can disable RLE in the delta writer and recreate the delta table. You can then query the table in the SQL analytics endpoint.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
