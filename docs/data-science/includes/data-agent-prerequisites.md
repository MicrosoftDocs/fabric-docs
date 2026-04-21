---
title: Data agent prerequisites
description: Prerequisites to use Data agent.
ms.topic: include
ms.date: 04/20/2026
---

## Prerequisites

- [A paid F2 or higher Fabric capacity](../../enterprise/fabric-features.md#features-parity-list), or a [Power BI Premium per capacity (P1 or higher)](../../enterprise/licenses.md#workspace) capacity with [Microsoft Fabric enabled](../../admin/fabric-switch.md).
- Enable [cross-geo processing and cross-geo storing for AI](../data-agent-tenant-settings.md) based on requirements explained in [Fabric data agent tenant settings](../data-agent-tenant-settings.md), including the **Capacities can be designated as Fabric Copilot capacities** setting.
- At least one of these, with data: A warehouse, a lakehouse, one or more Power BI semantic models, a KQL database, or an ontology.
- For Power BI semantic models used with a data agent, ensure users who interact via the agent have Read permission on the semantic model. Workspace Member or Build permission isn't required for interaction.
