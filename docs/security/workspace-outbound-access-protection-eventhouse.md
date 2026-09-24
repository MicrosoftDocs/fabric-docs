---
title: Workspace Outbound Access Protection for Eventhouse
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Eventhouse artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 05/13/2026
ms.topic: how-to
---

# Workspace outbound access protection for Eventhouse (preview)

Workspace outbound access protection (OAP) helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. When you enable this feature, items can't make outbound connections unless you explicitly grant access through approved data connection rules. 

This article describes how outbound access protection applies to Real-Time Intelligence items and what scenarios are supported when the protection is enabled. 

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules. 

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items: 

- Activator, see [Outbound access protection for Activator](workspace-outbound-access-protection-activator.md)
- Eventhouse
- Eventstream, see [Outbound access protection for Eventstream](workspace-outbound-access-protection-eventstream.md)

## Outbound access protection for Eventhouse

### Supported Eventhouse outbound access scenarios

Even with outbound access protection enabled, Eventhouse can connect to the following resources:

| Resource type | Location | Supported items |
|---|---|---|
| External | Azure | [Event Hubs](/azure/event-hubs/event-hubs-about) |
| Fabric | Same workspace | Eventstream, OneLake, [follower databases](/azure/data-explorer/follower?tabs=csharp&preview=true) |
| Fabric | Other workspaces (requires access rules) | OneLake, [follower databases](/azure/data-explorer/follower?tabs=csharp&preview=true) |

### Unsupported Eventhouse outbound access scenarios

When you enable workspace OAP, the following Eventhouse outbound access scenarios are **blocked**:

- Accessing Eventhouse databases directly, other than through OneLake shortcuts.
- Connecting to external resources, other than Event Hubs.
- Using Copilot to generate queries or analyze data.

## Limitations

- Eventhouse outbound access protection is in public preview.
- All Eventhouse items in the workspace follow the same OAP.

## Considerations

- Workspace OAP is enforced per workspace.
- All Real-Time Intelligence items in the workspace share the same OAP.

## Next steps

[Learn more about workspace outbound access protection](workspace-outbound-access-protection-overview.md)
[Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
[Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
