---
title: Include file with workspace-level private links note for event consumers
description: Includes a note about workspace-level private links blocking cross-workspace event consumption when public access is restricted on the source workspace.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/03/2026
---

> [!NOTE]
> If you configure [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) to block public access on the workspace where the events originate (the source workspace), event consumers such as Activator rules or Eventstreams in other workspaces can't consume those events unless you establish a private link from the consumer's network to the source workspace. For more information, see [Workspace private links for Azure and Fabric events](/fabric/real-time-hub/workspace-private-links-real-time-events).
