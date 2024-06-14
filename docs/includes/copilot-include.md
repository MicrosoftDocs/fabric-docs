---
title: Include file for the enabling Copilot prerequisites.
description: Include file for the note detailing Copilot, not inside a NOTE.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.topic: include
ms.custom:
  - build-2024
ms.date: 05/09/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

- Your administrator needs to enable the tenant switch before you start using Copilot. For more information, see [Copilot tenant settings](../admin/service-admin-portal-copilot.md).
- Your F64 or P1 capacity needs to be in one of the regions listed in this article, [Fabric region availability](../admin/region-availability.md).
- If your tenant or capacity is outside the US or France, Copilot is disabled by default unless your Fabric tenant admin enables the [Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance](/fabric/admin/service-admin-portal-copilot) tenant setting in the Fabric Admin portal.
- Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F64 or higher, or P1 or higher) are supported.
- For more information, see [Overview of Copilot in Fabric and Power BI](../get-started/copilot-fabric-overview.md).
