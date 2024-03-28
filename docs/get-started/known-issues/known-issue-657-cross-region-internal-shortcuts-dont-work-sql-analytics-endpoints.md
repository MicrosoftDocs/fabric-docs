---
title: Known issue - Cross-region internal shortcuts don't work with SQL analytics endpoints
description: A known issue is posted where cross-region internal shortcuts don't work with SQL analytics endpoints.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/27/2024
ms.custom: known-issue-657
---

# Known issue - Cross-region internal shortcuts don't work with SQL analytics endpoints

You can create OneLake internal shortcuts that reference OneLake locations across Fabric capacities in different regions. If you create one of these internal shortcuts, you can't access it through the SQL analytics endpoint or a semantic model. You see an error when trying to access the data using these shortcuts through the SQL analytics endpoint or semantic model. Shortcuts that reference OneLake locations in the same region as the shortcut location work as expected.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

The shortcut is visible through the Lakehouse  user interface and accessible through Spark notebooks. However, the shortcut doesn't appear in the SQL analytics endpoint, and you can't add it to a semantic model.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
