---
title: Enable Copilot in Fabric and Power BI (preview)
description: Learn how to enable Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 04/23/2024
no-loc: [Copilot]
---

# Enable Copilot in Fabric and Power BI (preview)

Copilot and other generative AI features in preview bring new ways to transform and analyze data, generate insights, and create visualizations and reports in Microsoft Fabric and Power BI.

Before your business can start using Copilot capabilities in Microsoft Fabric, you need to enable Copilot.

- Your administrator needs to enable the tenant switch before you can start using Copilot. Administrators can read the article [Copilot tenant settings (preview)](../admin/service-admin-portal-copilot.md) for details. 
- Your F64 or P1 capacity needs to be in one of the regions listed in this article, [Fabric region availability](../admin/region-availability.md).
- If your tenant or capacity is outside the US or France, Copilot is disabled by default unless your Fabric tenant admin enables the [Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance](../admin/service-admin-portal-copilot.md) tenant setting in the Fabric Admin portal.
- Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F64 or higher, or P1 or higher) are supported.

The preview of Copilot in Microsoft Fabric is rolling out in stages with the goal that all customers with a paid Fabric capacity (F64 or higher) or Power BI Premium capacity (P1 or higher) have access to the Copilot preview. It becomes available to you automatically as a new setting in the Fabric admin portal when it's rolled out to your tenant. When charging begins for the Copilot in Fabric experiences, you can count Copilot usage against your existing Fabric or Power BI Premium capacity.

See the article [Overview of Copilot in Fabric and Power BI](copilot-fabric-overview.md) for answers to your questions about how it works in the different workloads, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly. 

## Related content

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)