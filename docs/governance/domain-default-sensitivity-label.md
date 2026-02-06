---
title: Domain-level default sensitivity labels in Microsoft Fabric
description: "This article describes the domain-level default sensitivity label feature in Microsoft Fabric and how to enable it."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.custom:
ms.topic: concept-article
ms.date: 11/11/2024
#customer intent: As a Fabric administrator, security and compliance officer, Fabric domain administrator, or domain contributor, I want to understand what domain-level senistivity labels are and how they work.
---

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

Deployment pipelines and Git integration are currently not supported.

## Related content

* [Fabric domains](./domains.md)
* [Sensitivity labels in Fabric and Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview)
