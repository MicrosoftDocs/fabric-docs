---
title: Known issue - Pipeline can't copy an empty table to lakehouse
description: A known issue is posted where a pipeline can't copy an empty table to lakehouse
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1087
---

# Known issue - Pipeline can't copy an empty table to lakehouse

You can create a pipeline to copy data from a source lakehouse to a destination lakehouse. If the source lakehouse table is empty (it contains schema information but no rows), the copy activity fails. 

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When you copy data in a pipeline, the copy activity fails with an error. The error code is `MissingSchemaForAutoCreateTable` and the error message is similar to `Failed to auto create table for no schema found in Source`. This issue happens when the destination is an empty lakehouse table.

## Solutions and workarounds

Currently, copy has a limitation when handling the empty lakehouse table. To work around this issue, edit the mapping page. Select **+ New Mapping** to add the columns individually.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
