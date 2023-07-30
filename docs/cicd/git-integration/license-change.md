---
title: Git integration license change
description: Understand what happens to your got connection when your license permissions change and you can't access the repo anymore.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: conceptual 
ms.date: 06/19/2023
ms.custom: build-2023
---

# Git integration license change

You can only connect to git repos if you have a valid Premium license. If your license expires or you change your license to a license that doesn't include git integration, you will not be able to connect to git repos. This applies to trial licenses as well.

Source control open and has error
bottom shows You need prem license for this ws to continue
git status - blank
Git integration setting: Can't switch branches. Only option disconnect.
When disconnect - goes back to ws with no source control

## What happens when your license expires

If your workspace is connected to a git repo and then your license expires, or you change to a different license that doesn't include git-integration, you won't be able to connect to that repo anymore. You'll see the following changes in your workspace homepage:

### Source control view

The source control view opens automatically and shows the following error:

:::image type="content" source="media/license-change/workspace-needs-license.png" alt-text="Screenshot of source control panel showing error message that says this workspace needs a license.":::

### Git status

The **[Git status** column](./git-integration-process.md#git-status) is blank instead of showing which of the items are synched.

:::image type="content" source="media/license-change/blank-git-status.png" alt-text="Screenshot showing a dash next to each item in the Git status column of the workspace.":::

### Sync information

At the bottom of the workspace, instead of the [sync information](./git-integration-process.md#sync-information), you'll see the following message:

:::image type="content" source="media/license-change/need-premium-license.png" alt-text="Screenshot showing a message that says you need a Premium license for this workspace to continue.":::

## Remove the git connection

When you don't have a valid Premium license, you can't connect to git repo nor can you switch branches. You need to [disconnect](./git-get-started.md#disconnect-a-workspace-from-git) from the current repo. To do this, go to the **Git integration** settings and select **Disconnect**.  
Your workspace returns to the state it was in before you connected to the git repo and you can continue working.

## Next steps

[Manage git branches](./manage-branches.md)
