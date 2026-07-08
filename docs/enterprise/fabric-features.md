---
title: Features by SKU and Capacity
description: See which Microsoft Fabric features are available by SKU and capacity type, and compare F SKUs and P SKUs to choose the right capacity for your needs.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ms.date: 06/30/2026
ai-usage: ai-assisted
#customer intent: As a Fabric administrator, I want to understand which features are available for each SKU and capacity type so that I can choose the right capacity for my organization.
---

# Microsoft Fabric features by SKU and capacity type

Microsoft Fabric is a cloud-based analytics platform that you access through a capacity. Capacities come in different SKUs (stock-keeping units) and capacity types, and not every Fabric feature is available with every SKU. Fabric capacities use F SKUs, and Power BI Premium capacities use P SKUs.

Knowing which features each SKU supports helps you choose a capacity that includes the capabilities your organization needs. This article lists the Fabric features available for each SKU type.

## Feature parity list

The following table lists Fabric features by SKU type. It includes only the features that specific SKUs support. Unless otherwise noted, a [trial capacity](../fundamentals/fabric-trial.md) doesn't support any of these features.

| Feature                                                                                               | F SKUs        | P SKUs |
|-------------------------------------------------------------------------------------------------------|---------------|--------|
| [Fabric data agent](../data-science/concept-data-agent.md)                                            | Yes           | Yes    |
| [Azure Resource Manager (ARM) APIs and Terraform](/azure/developer/terraform/overview-azapi-provider) | Yes           | No     |
| [Copilot](../fundamentals/copilot-fabric-overview.md)                                                 | Yes           | Yes    |
| [Managed private endpoints](../security/security-managed-private-endpoints-overview.md)<sup>1</sup>   | Yes           | No     |
| [On-demand resizing](scale-capacity.md)                                                               | Yes           | No     |
| [Pause and resume your capacity](pause-resume.md)                                                     | Yes           | No     |
| [Power BI autoscale](/power-bi/enterprise/service-premium-auto-scale)                                 | No            | Yes    |
| [Spark autoscale billing](../data-engineering/autoscale-billing-for-spark-overview.md)                | Yes           | No     |
| [Trusted workspace access](../security/security-trusted-workspace-access.md)                          | Yes           | No     |
| View Power BI items with a Microsoft Fabric free license<sup>1</sup>                                  | F64 or higher | Yes    |
| Workspace-level private links                                                                         | Yes           | No     |
| Customer-managed keys for workspaces                                                                  | Yes           | No     |

<sup>1</sup> A Fabric [trial capacity](../fundamentals/fabric-trial.md) supports this feature.

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)
* [Microsoft Fabric operations](fabric-operations.md)
