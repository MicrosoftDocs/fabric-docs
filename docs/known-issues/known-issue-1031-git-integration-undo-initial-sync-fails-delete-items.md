---
title: Known issue - Git integration undo action appears after initial sync fails
description: A known issue is posted where performing a Git integration undo action appears after initial sync fails.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/06/2025
ms.custom: known-issue-1031
---

# Known issue - Git integration undo action appears after initial sync fails

For this known issue, you shouldn't use the **Undo** button after an initial sync with Git fails. When you initially connect your workspace to a Git repository, the initial sync fails. You wrongly see the option to undo the changes. As warned, workspace items might be deleted if you continue with the **Undo** action. The deleted items might not have a corresponding instance in the Git repository.

**Status:** Fixed: June 6, 2025

**Product Experience:** Administration & Management

## Symptoms

Here are the steps that must happen for you to see the known issue:

1. You connect a workspace to a Git repository.
1. An initial sync to the Git repository runs and fails.
1. Wrongly, the service doesn't disable the **Undo** operation and lets you choose the **Undo** button.

    :::image type="content" border="true" source="media/known-issue-git-undo.png" alt-text="Screenshot of Undo screen after Git integration.":::

1. When you select the **Undo** button, you receive a warning about the potential loss of data.

    :::image type="content" border="true" source="media/known-issue-git-undo-validation.png" alt-text="Screenshot of Warning message after Undo.":::

1. If you choose to continue, you might see items deleted from the workspace.
1. The deleted items might not have a corresponding instance in the Git repository.

## Solutions and workarounds

To prevent the issue from happening, don't perform the **Undo** action after the initial sync fails. Alternatively, you can retry the sync by disconnecting and reconnecting to the Git provider.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
