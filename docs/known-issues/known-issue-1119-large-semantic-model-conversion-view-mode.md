---
title: Known issue - Large semantic model storage format conversion stays in view mode
description: A known issue is posted where a large semantic model storage format automatic conversion stays in view mode.
author: jessicamo
ms.author: jessicamo
ms.topic: troubleshooting
ms.date: 05/02/2025
ms.custom: known-issue-1119
---

# Known issue - Large semantic model storage format conversion stays in view mode

A semantic model can automatically try to convert itself to large semantic model storage format. When the conversion happens, a user interface blocker appears briefly and then disappears. The conversion didn't yet finish, and the model view displays in view mode. After the conversion succeeds, the model view enters edit mode, and a success banner appear. If the conversion fails, the model view remains in view mode, and an error dialog appears.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

The user interface blocker stating `Converting semantic model... just a moment while we convert the model to the large semantic model storage format.` disappears before the conversion is finished. The semantic model stays in view mode until the conversion completes.

## Solutions and workarounds

After the user interface  blocker disappears, wait until the model view enters edit mode. You see a success banner appear telling you the conversion completed and can then edit the semantic model.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
