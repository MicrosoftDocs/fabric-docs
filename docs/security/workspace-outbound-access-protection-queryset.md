---
title: Workspace outbound access protection for KQL queryset (preview)
description: Learn how workspace outbound access protection applies to KQL queryset experiences and which KQL queryset outbound scenarios are supported or blocked.
ms.topic: concept-article
ms.reviewer: Gabilehner
ms.date: 05/31/2026
---

# Workspace outbound access protection for KQL queryset (preview)

Workspace outbound access protection (OAP) helps safeguard your data by controlling outbound connections from KQL queryset experiences in your workspace to external data sources. When you enable this setting, KQL queryset outbound connections are limited to approved patterns and configured access rules.

This article explains how OAP applies to KQL queryset and which scenarios are supported or blocked.

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules.

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items:

- Activator, see [Outbound access protection for Activator](workspace-outbound-access-protection-activator.md).
- Eventhouse, see [Outbound access protection for Eventhouse](workspace-outbound-access-protection-eventhouse.md).
- Eventstream, see [Outbound access protection for Eventstream](workspace-outbound-access-protection-eventstream.md).
- KQL queryset
- Real-Time Dashboard, see [Outbound access protection for Real-Time Dashboard](workspace-outbound-access-protection-dashboard.md).

## Outbound access protection for KQL queryset

### Supported KQL queryset outbound access scenarios

When OAP is enabled, KQL queryset outbound access is supported by default without requiring configuration, except for the specific scenarios listed in the following section.

### Unsupported KQL queryset outbound access scenarios

When you enable workspace OAP, the following KQL queryset outbound access scenarios are blocked:

- **Copilot scenarios**:
  - Copilot for writing KQL Queries.

## Limitations

- KQL queryset outbound access protection is in preview.
- All KQL queryset experiences in the workspace follow the same workspace OAP configuration.

## Considerations

- Workspace OAP is enforced per workspace.
- All Real-Time Intelligence items in the workspace share the same OAP configuration.
