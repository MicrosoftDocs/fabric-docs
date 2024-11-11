---
title: Domain-level default sensitivity labels in Microsoft Fabric 
description: "This article describes the domain-level default sensitivity label feature in Microsoft Fabric and how to enable it."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.topic: conceptual #Don't change
ms.date: [11/11/2024]

#customer intent: As a Fabric administrator, security and compliance officer, Fabric domain administrator, or domain contributor, I want to understand what domain-level senistivity labels are and how they work.

---

Domain admins can set a default sensitivity label for their domains. The label they set will override your organization's default labels in Microsoft Purview, as long as it has a higher priority than the existing default labels set for your tenant. A domain's default label will automatically apply to new Fabric items created within the domain. Reports, semantic models, dataflows, dashboards, scorecards, and some additional item types aren't currently supported.

# Domain-level default sensitivity labels in Microsoft Fabric

This article describes the domain-level default sensitivity label feature in Microsoft Fabric and how to enable it. Its target audience is Fabric administrators, security and compliance officers, Fabric domain administrators, Fabric domain contributors.

Domain admins can set a default sensitivity label for their domains. This label will be applied by default to items in workspaces that belong to the domain in the following instances:

* When a new item is created and saved in the workspace.
* Whan an unlabeled item that already exists in the workspace is updated and saved.

When an existing labeled item in the workspace is updated and saved, the existing label is either retained or overwritten according to the following logic:

| Existing label | Override with domain-level default label |
|:---------------|:-----------------------------------------|
| Manually applied, any priority             | No           |
| Automatically applied, lower priority      | Yes          |
| Automatically applied, higher priority     | No           |
| Default label from policy, lower priority  | Yes          |
| Default label from policy, higher priority | No           |

## Requirements

The tenant setting **Domain admins can set default sensitivity labels for their domains (preview)** must be enabled.

## Limitations

Reports, semantic models, dataflows, dashboards, scorecards, and some additional item types aren't currently supported.

## Related content

*-[Fabric domains](./domains.md)
* [Sensitivity labels in Fabric and Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview)