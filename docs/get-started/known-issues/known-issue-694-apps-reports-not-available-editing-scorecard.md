---
title: Known issue - Apps and reports not available when editing scorecard metrics
description: A known issue is posted where apps and reports aren't available when editing scorecard metrics.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/30/2024
ms.custom: known-issue-694
---

# Known issue - Apps and reports not available when editing scorecard metrics

When you create or edit a scorecard metric, you can change the **Current** or **Target** field. When you select **Connect to data**, you don't see any apps or reports. You can't select an app or report for the fields.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Even if you have apps connected to the scorecard, the user apps tab is empty.

## Solutions and workarounds

You can work around this issue by using one of these two options.

If you have direct access or permission to the reports or apps:

1. Go to the report you would like to connect.
1. Let your computer fully load this report without refreshing the page.
1. Go back to your scorecard where you see the apps in the dialog.

Otherwise:

1. Disable the subfolder in workspace feature by turning off the feature switch.
1. Paste the feature flag at the end of your browser URL: `&subfolderInWorkspace=0`.
1. Select **Enter** key to reload your Power BI.
1. Go back to your scorecard where you see the apps in the dialog.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
