---
title: Known issue - Edit tables dialog doesn't load when reloading a Direct Lake semantic model
description: A known issue is posted where the Edit tables dialog doesn't load when reloading a Direct Lake semantic model.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/04/2024
ms.custom: known-issue-828
---

# Known issue - Edit tables dialog doesn't load when reloading a Direct Lake semantic model

You can edit a semantic model in Direct Lake mode built on a data warehouse. If you select **Edit tables** to add or remove tables and then select **Confirm** with or without making selection changes, the semantic model performs a schema refresh. You can also select the **Reload** button to the right of the search box to refresh the schema. You might experience an issue where the **Edit tables** screen hangs and the tables don't load again after selecting the **Reload** button.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You see a `Fetching schema` spin indefinitely after opening or selecting the reload button in **Edit tables** dialog.

## Solutions and workarounds

You can go to the data warehouse or SQL analytics endpoint to refresh the table schema. Alternatively, you can wait a minute for the automatic refresh to happen before opening the **Edit tables** dialog.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
