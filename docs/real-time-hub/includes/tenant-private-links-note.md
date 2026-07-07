---
title: Include file with tenant-level private links note for Azure event consumers
description: Includes a note about tenant-level private links blocking Azure event consumption when public internet access is blocked.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/03/2026
---

> [!NOTE]
> If you configure [tenant-level private links](/fabric/security/security-private-links-overview) with **Block Public Internet Access** enabled, Azure event consumption (such as Azure Blob Storage events) is blocked entirely. You can't create new consumer configurations, and existing consumers stop delivering events. However, you can add specific Azure event sources to an allow list as trusted resources to restore event delivery without disabling the tenant private link policy. For details, see [Allow Azure event sources through inbound trusted resources](/fabric/real-time-hub/private-links-real-time-events#allow-azure-event-sources-through-inbound-trusted-resources).
