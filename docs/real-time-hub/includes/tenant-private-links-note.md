---
title: Include file with tenant-level private links note for Azure event consumers
description: Includes a note about tenant-level private links blocking Azure event consumption when public internet access is blocked.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/03/2026
---

> [!NOTE]
> If you configure [tenant-level private links](/fabric/security/security-private-links-overview) with **Block Public Internet Access** enabled, Azure event consumption (such as Azure Blob Storage events) is blocked entirely. You can't create new consumer configurations, and existing consumers stop delivering events. For more information, see [Tenant private links for Azure and Fabric events](/fabric/real-time-hub/private-links-real-time-events).
