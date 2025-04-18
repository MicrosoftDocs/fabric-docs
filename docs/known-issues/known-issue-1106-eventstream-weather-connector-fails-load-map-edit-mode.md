---
title: Known issue - Eventstream real-time weather connector fails to load map in edit mode
description: A known issue is posted where the eventstream real-time weather connector fails to load map in edit mode.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/18/2025
ms.custom: known-issue-1106
---

# Known issue - Eventstream real-time weather connector fails to load map in edit mode

In an eventstream, you can add real-time weather as a source. Once you add the source, you can edit the real-time weather connector. When you open the map results in the editor, you receive an error. Retrying doesn't resolve the issue.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

When you try to open the map results in the real-time weather connector, you receive an error. The error is similar to: `Map loading failed due to network issue, please try again later`.

## Solutions and workarounds

Delete the existing connector. Add a new real-time weather connector to your eventstream.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
