---
title: Known issue - Pipeline switch activity throws validation error
description: A known issue is posted where a pipeline switch activity throws validation error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/16/2025
ms.custom: known-issue-1194
---

# Known issue - Pipeline switch activity throws validation error

You can create a new pipeline or edit an existing pipeline that contains a switch activity. You receive a validation error that the pipeline requires an activity in default clause.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When authoring or changing a pipeline with a switch activity, you receive a validation error. The error is similar to: `Switch activity should have at least one Activity`.

## Solutions and workarounds

To work around the issue, perform one of the below actions within the default clause of the switch activity:

- Create a dummy activity, such as a wait activity
- Create any activity and deactivate it

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
