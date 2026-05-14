---
title: Workspace Outbound Access Protection for Eventstream
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Eventstream artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Eventstream Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 05/06/2026
ms.topic: how-to
---

# Workspace outbound access protection for Eventstream (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. When you enable this feature, items can't make outbound connections unless you explicitly grant access through approved data connection rules. 

This article describes how outbound access protection applies to Real-Time Intelligence items and what scenarios are supported when the protection is enabled. 

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules. 

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items: 

- Eventstream
- Eventhouse, see [Outbound access protection for Eventhouse](workspace-outbound-access-protection-eventhouse.md)

## Outbound access protection for Eventstream

When you enable workspace outbound access protection, it restricts outbound access from Eventstream. By default, Eventstream can only perform a limited set of supported actions.

### Supported Eventstream outbound access scenarios

- Send data to Real-Time Intelligence items in the **same workspace**.

- Send data to supported Microsoft Fabric items in the **same workspace**.

These scenarios use internal Fabric communication and are allowed when outbound access protection is **enabled**.

### Unsupported Eventstream outbound access scenarios

When you enable workspace outbound access protection, the following Eventstream outbound access scenarios are **blocked**:

- Sending data to items in other workspaces, including other Real-Time Intelligence items or supported Microsoft Fabric items.

- Sending data to external resources outside of Microsoft Fabric, such as external databases, APIs, or services.

## Considerations

- Workspace outbound access protection is enforced per workspace.

- All Real-Time Intelligence items in the workspace share the same outbound access policy.

- Inbound ingestion scenarios that don't require outbound workspace access (for example, Event Hubs ingestion) aren't affected.

## Next steps

[Learn more about workspace outbound access protection](workspace-outbound-access-protection-overview.md)
[Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
[Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
