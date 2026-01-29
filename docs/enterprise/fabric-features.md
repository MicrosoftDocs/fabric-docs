---
title: Microsoft Fabric features by SKU
description: Learn about Fabric features parity according to the capacity type. The article lists features according to SKUs by capacity type.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.collection: ce-skilling-ai-copilot
ms.date: 05/11/2025
ms.update-cycle: 180-days
---

# Microsoft Fabric features parity

Microsoft Fabric is a cloud-based platform with a rich set of features. The availability of these features depends on the SKU and capacity type. This article shows parity of key Fabric features according to [SKU](licenses.md#capacity) type.

## Features parity list

The following table lists Fabric features according to SKU type. The table lists features that are only supported in specific SKUs. Unless otherwise noted, none of these features are supported when using a [trial capacity](../fundamentals/fabric-trial.md).

| Feature                                                                                               | F SKU         | P SKUs       |
|-------------------------------------------------------------------------------------------------------|:-------------:|:------------:|
| [Fabric data agent](../data-science/concept-data-agent.md)                                            | &#x2705;      | &#x2705;     |
| [ARM APIs and Terraform](/azure/developer/terraform/overview-azapi-provider)                          | &#x2705;      | &#x274C;     |
| [Copilot](../fundamentals/copilot-fabric-overview.md)                                                 | &#x2705;      | &#x2705;     |
| [Managed Private Endpoints](../security/security-managed-private-endpoints-overview.md)<sup>1</sup>   | &#x2705;      | &#x274C;     |
| [On-demand resizing](scale-capacity.md)                                                               | &#x2705;      | &#x274C;     |
| [Pause and resume your capacity](pause-resume.md)                                                     | &#x2705;      | &#x274C;     |
| [Power BI Autoscale](/power-bi/enterprise/service-premium-auto-scale)                                 | &#x274C;      | &#x2705;     |
| [Spark Autoscale Billing](/fabric/data-engineering/autoscale-billing-for-spark-overview)              | &#x2705;      | &#x274C;     |
| [Trusted workspace access](../security/security-trusted-workspace-access.md)                          | &#x2705;      | &#x274C;     |
| View Power BI items with a Microsoft Fabric free license<sup>1</sup>                                  | F64 or higher | &#x2705;     |
| Workspace-level private links                                                                         | &#x2705;      | &#x274C;     |
| Customer-managed keys for workspaces                                                                  | &#x2705;      | &#x274C;     |

<sup>1</sup> Supported in a Fabric [trial capacity](../fundamentals/fabric-trial.md).

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)
* [Microsoft Fabric operations](fabric-operations.md)
