---
title: Known issue - Semantic model export to OneLake fails for calculated columns in error state
description: A known issue is posted where a semantic model export to OneLake fails for calculated columns in error state.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/30/2024
ms.custom: known-issue-693
---

# Known issue - Semantic model export to OneLake fails for calculated columns in error state

When using OneLake integration for semantic models, you can export the data in a semantic model to OneLake. If the semantic model contains a calculated column or a calculated table column in an error state (for example, due to a bad DAX expression), the table might fail to export data to OneLake.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Data in the Semantic Model artifact in OneLake might be out of date, in comparison to the Semantic Model data.
If you didn't previously export the semantic model, you don't see the data in OneLake. If you previously exported the semantic model and then added a calculated column or a calculated table column in an error state, you see an older version of the semantic model data in OneLake. The export doesn't happen and the updated data doesn't get exported to OneLake.

## Solutions and workarounds

To work around this issue, fix the DAX expression that left the columns in an error state.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
