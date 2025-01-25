---
title: Enable Copilot in Fabric
description: Learn how to enable Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations.
author: snehagunda
ms.author: sngun
ms.reviewer: shlindsay
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 12/26/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Enable Copilot in Fabric

Copilot and other generative AI features in preview bring new ways to transform and analyze data, generate insights, and create visualizations in Microsoft Fabric and Power BI.

**Copilot in Microsoft Fabric is enabled by default**. Administrators can be disable it from the admin portal if your organization isn't ready to adopt it. Administrators can refer to the [Copilot tenant settings (preview)](../admin/service-admin-portal-copilot.md) article for details. The following requirements must be met to use Copilot:

- The F64 capacity must be in a supported region listed in [Fabric region availability](../admin/region-availability.md).
- If your tenant or capacity is outside the US or France, Copilot is disabled by default unless your admin enables the tenant setting in the Fabric Admin portal. Note that the [Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance](../admin/service-admin-portal-copilot.md).
- Copilot isn't supported for Fabric trial SKUs. Only paid SKUs (F64 or higher) are eligible.

The following screenshot shows the tenant setting where Copilot can be enabled or disabled:

:::image type="content" source="media/copilot-enable-fabric/enable-copilot.png" alt-text="Screenshot showing the tenant setting where copilot can be enabled and disabled.":::

Copilot in Microsoft Fabric is rolling out gradually, ensuring all customers with paid Fabric capacities (F64 or higher) gain access. It automatically appears as a new setting in the Fabric admin portal when available for your tenant. Once billing starts  for the Copilot in Fabric experiences, Copilot usage will count against your existing Fabric capacity.

See the article [Overview of Copilot in Fabric](../fundamentals/copilot-fabric-overview.md) for details on its functionality across workloads, data security, privacy compliance, and responsible AI use.

> [!IMPORTANT]
> When scaling from a smaller capacity to F64 or above, allow up to 24 hours for Copilot for Power BI to activate.

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](../fundamentals/copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
- [Copilot in Power BI](/power-bi/create-reports/copilot-introduction)
