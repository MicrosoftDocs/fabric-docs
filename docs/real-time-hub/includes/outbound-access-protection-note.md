---
title: Include file with outbound access protection note for event consumers
description: Includes a note about outbound access protection affecting cross-workspace event consumption.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/02/2026
---

> [!NOTE]
> If you enable [workspace outbound access protection](/fabric/security/workspace-outbound-access-protection-overview) on the workspace where you create the consumer (for example, an activator or eventstream), cross-workspace event consumption is blocked by default. To allow it, add the **Real-Time Events** connector to the workspace's data connection rules. For more information, see [Workspace outbound access protection for Real-Time Events](/fabric/security/workspace-outbound-access-protection-real-time-events).
