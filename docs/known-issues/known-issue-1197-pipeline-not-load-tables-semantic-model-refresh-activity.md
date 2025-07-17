---
title: Known issue - Pipeline can't load some tables in semantic model refresh activity
description: A known issue is posted where a pipeline can't load some tables in semantic model refresh activity.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/16/2025
ms.custom: known-issue-1197
---

# Known issue - Pipeline can't load some tables in semantic model refresh activity

You can use a semantic model refresh activity in your pipeline. In the refresh activity, you might not be able to load some of the tables.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

In your pipeline's semantic model refresh activity, the user interface doesn't load some of the tables. The issue occurs when you have spaces in the table name in the semantic model.

## Solutions and workarounds

If editing from the UI, you can use one of these workarounds:

- Manually add the table names using "Add dynamic content"
- Manually edit the JSON code to add the table name. The UI shows the mandatory fields as missing, but you can ignore the message and continue the pipeline execution

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
