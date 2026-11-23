---
title: Include file with tenant-level private links note for Azure event consumers
description: Includes a note about tenant-level private links blocking Azure event consumption when public internet access is blocked.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 10/13/2026
ai-usage: ai-assisted
---

> [!NOTE]
> If you configure [tenant-level private links](/fabric/security/security-private-links-overview) with **Block Public Internet Access** enabled, Azure event consumption (such as Azure Blob Storage events) is blocked by default. You can't create new consumer configurations, and existing consumers stop delivering events. If the Azure Event Grid system topic and Fabric workspace are in the same Microsoft Entra tenant, you can restore event delivery without disabling tenant private links by adding the system topic to the inbound trusted-resources allow list for the workspace that contains the Eventstream item representing the Azure source. For instructions, see [Allow Azure event sources through inbound trusted resources](/fabric/real-time-hub/private-links-real-time-events#allow-azure-event-sources-through-inbound-trusted-resources).
