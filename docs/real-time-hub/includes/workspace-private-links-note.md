---
title: Include file with workspace-level private links note for event consumers
description: Includes a note about workspace-level private links blocking cross-workspace event consumption when public access is restricted on the source workspace.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/03/2026
---

> [!NOTE]
> If [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) are configured to block public access on the workspace where the events originate (the source workspace), event consumers such as Activator alerts or eventstreams in other workspaces are blocked from consuming those events unless a private link is established from the consumer's network to the source workspace. For more information, see [Private links for Azure and Fabric Events](/fabric/real-time-hub/private-links-real-time-events).
