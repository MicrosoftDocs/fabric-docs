---
title: Known issue - Exporting semantic model data to OneLake fails due to unicode characters
description: A known issue is posted where exporting semantic model data to OneLake fails due to unicode characters.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/27/2024
ms.custom: known-issue-660
---

# Known issue - Exporting semantic model data to OneLake fails due to unicode characters

When using OneLake integration for semantic models, you can export the data in a semantic model to OneLake. If the semantic model contains table names or column names with unicode characters, the export doesn't work.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

If you didn't previously export the semantic model, you don't see the data in OneLake. If you previously exported the semantic model and then a table or column with a unicode character in the name was added, you see an older version of the semantic model data in OneLake. The export doesn't happen and the updated data doesn't get exported to OneLake.

## Solutions and workarounds

To work around this issue, you can deactivate the export or change the table and column names to not contain any unicode characters.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
