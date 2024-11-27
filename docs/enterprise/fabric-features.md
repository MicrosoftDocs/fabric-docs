---
title: Microsoft Fabric features by SKU
description: Learn which Fabric features are available to you depending on the capacity type. The article lists features according to SKUs by capacity type.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.collection: ce-skilling-ai-copilot
ms.date: 11/26/2024
---

# Microsoft Fabric features by SKU

Microsoft Fabric is a cloud-based platform with a rich set of features. The availability of these features depends on the SKU and capacity type. This article lists key Fabric features according to [SKU](licenses.md#capacity) type.

## Features list

The following table lists Fabric features according to SKU type. The table lists features that are only supported in specific SKUs. Unless otherwise noted, none of these features are supported when using a [trial capacity](../get-started/fabric-trial.md).

| Feature                                                                                               | F SKU         | P SKUs   |
|-------------------------------------------------------------------------------------------------------|:-------------:|:--------:|
| [AI Skills](../data-science/concept-ai-skill.md)                                                      | F64 or higher | &#x274C; |
| [ARM APIs and Terraform](/azure/developer/terraform/overview-azapi-provider)                          | &#x2705;      | &#x274C; |
| [Copilot](../get-started/copilot-fabric-overview.md)                                                  | F64 or higher | &#x2705; |
| [Managed Private Endpoints](../security/security-managed-private-endpoints-overview.md)<sup>1</sup>   | &#x2705;      | &#x274C; |
| [On-demand resizing](scale-capacity.md)                                                               | &#x2705;      | &#x274C; |
| [Pause and resume your capacity](pause-resume.md)                                                     | &#x2705;      | &#x274C; |
| [Power BI Autoscale](/power-bi/enterprise/service-premium-auto-scale)                                 | &#x274C;      | &#x2705; |
| [Trusted workspace access](../security/security-trusted-workspace-access.md)                          | &#x2705;      | &#x274C; |
| View Power BI items without a per user license<sup>1</sup>                                            | F64 or higher | &#x2705; |

<sup>1</sup> Supported in a Fabric [trial capacity](../get-started/fabric-trial.md).

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)
* [Microsoft Fabric operations](fabric-operations.md)
