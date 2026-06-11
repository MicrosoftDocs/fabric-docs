---
title: Include file with tenant-level private links note for Azure event consumers
description: Includes a note about tenant-level private links blocking Azure event consumption when public internet access is blocked.
author: george-guirguis
ms.author: geguirgu
ms.topic: include
ms.date: 04/03/2026
---

> [!NOTE]
> If [tenant-level private links](/fabric/security/security-private-links-overview) are configured with **Block Public Internet Access** enabled, Azure event consumption (such as Azure Blob Storage events) is blocked entirely. New consumer configurations are prevented and existing consumers stop delivering events. 