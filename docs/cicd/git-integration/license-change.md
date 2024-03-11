---
title: Git integration license change
description: Understand what happens to your got connection when your license permissions change and you can't access the repo anymore.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: conceptual 
ms.date: 08/24/2023
ms.custom: build-2023
---

# Git integration license change

You can only connect to Git repos if you have a valid Premium license. If your license expires or you change your license to a license that doesn't include Git integration, you can no longer connect to Git repos. This applies to trial licenses as well.

## What happens when your license expires

If your workspace is connected to a Git repo and then your license expires, or you change to a different license that doesn't include Git integration, the Git-integration feature stops working and you see the following changes in your workspace homepage:

### Source control view

The source control view opens automatically and shows the following error:

:::image type="content" source="media/license-change/workspace-needs-license.png" alt-text="Screenshot of source control panel showing error message that says this workspace needs a license.":::

### Git status

The [**Git status**](./git-integration-process.md#git-status) column is blank and no longer displays the item's status.

:::image type="content" source="media/license-change/blank-git-status.png" alt-text="Screenshot showing a dash next to each item in the Git status column of the workspace.":::

### Sync information

At the bottom of the workspace, instead of the [sync information](./git-integration-process.md#sync-information), you see the following message:

:::image type="content" source="media/license-change/need-premium-license.png" alt-text="Screenshot showing a message that says you need a Premium license for this workspace to continue.":::

## Remove the Git connection

Without a valid Premium license, none of the Git integration features work. Unless you renew or upgrade your license, all you can do is [disconnect](./git-get-started.md#disconnect-a-workspace-from-git). To disconnect, go to the **Git integration** settings and select **Disconnect**.  
Your workspace returns to a disconnected state and you can continue working in the workspace without Git.

## Related content

[Manage Git branches](./manage-branches.md)
