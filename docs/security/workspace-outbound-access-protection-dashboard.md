---
title: Workspace outbound access protection for Real-Time Dashboard (preview)
description: Learn how workspace outbound access protection applies to Real-Time Dashboard experiences and which RTD outbound scenarios are supported or blocked.
ms.topic: concept-article
ms.reviewer: Gabilehner
ms.date: 05/31/2026
---

# Workspace outbound access protection for Real-Time Dashboard (preview)

Workspace outbound access protection (OAP) helps safeguard your data by controlling outbound connections from Real-Time Dashboard (RTD) experiences in your workspace to external data sources. When you enable this setting, RTD outbound connections are limited to approved patterns and configured access rules.

This article explains how OAP applies to RTD and which scenarios are supported or blocked.

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules.

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items:

- Activator, see [Outbound access protection for Activator](workspace-outbound-access-protection-activator.md).
- Eventhouse, see [Outbound access protection for Eventhouse](workspace-outbound-access-protection-eventhouse.md).
- Eventstream, see [Outbound access protection for Eventstream](workspace-outbound-access-protection-eventstream.md).
- KQL queryset, see [Outbound access protection for KQL queryset](workspace-outbound-access-protection-queryset.md).
- Real-Time Dashboard

## Outbound access protection for RTD

### Supported RTD outbound access scenarios

When OAP is enabled, RTD outbound access is supported by default without requiring configuration, except for the specific scenarios listed in the following section.

### Unsupported RTD outbound access scenarios

When you enable workspace OAP, the following RTD outbound access scenarios are **blocked**:

- **Copilot scenarios:**
  - Using Copilot to add or edit a tile (preview).
  - Using Copilot for real-time data exploration (preview).
- **Sharing with editor identity:**
    Sharing Real-Time Dashboards using the dashboard editor’s identity is not supported. For more information, see [Real-Time Dashboard permissions](../real-time-intelligence/dashboard-permissions.md).

## Limitations

- RTD outbound access protection is in preview.
- All RTD experiences in the workspace follow the same workspace OAP configuration.

## Considerations

- Workspace OAP is enforced per workspace.
- All Real-Time Intelligence items in the workspace share the same OAP configuration.
