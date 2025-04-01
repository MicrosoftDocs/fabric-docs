---
title: Known issue - Create, configure, or delete a mirror fails
description: A known issue is posted where trying to create, configure, or delete a mirror fails.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/02/2024
ms.custom: known-issue-954
---

# Known issue - Create, configure, or delete a mirror fails

When you try to create, configure, or delete a mirror, you receive a `SchemaSupportNotEnabled` error.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

The creation, configuration, or deletion of a mirror with an error. The error message is similar to: `UI error: Unexpected error occurred. Failed after 10 retries.`

## Solutions and workarounds

To work around this issue, add the parameter switch `REPEnableSchemaHierarchyInMountedRelationalDatabaseSink=0` at the end of the browser URL. Then try the action again.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
