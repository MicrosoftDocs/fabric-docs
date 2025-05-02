---
title: Known issue - Pipelines fail with missing capacity error
description: A known issue is posted where pipelines fail with missing capacity error.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/07/2025
ms.custom: known-issue-1079
---

# Known issue - Pipelines fail with missing capacity error

You can't run any data pipelines. They fail with a capacity not found error.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You pipeline runs fail with an error. The error message is similar to: `Failed to report Fabric capacity. Capacity is not found`. The failure type reported is `User configuration issue`.

## Solutions and workarounds

If you face this issue, try one of the following options:

- Reassign capacity - Reassign the existing capacity. For example, if the current capacity is C1, change the workspace capacity from C1 to C2 and then reassign the workspace back to C1.
- Change workspace - Create a new workspace and assign the capacity. Then create a new pipeline in that workspace.

If the issue still persists after following either of the above steps, open a support ticket.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
