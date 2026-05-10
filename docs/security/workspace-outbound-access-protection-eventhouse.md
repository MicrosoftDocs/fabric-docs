---
title: Workspace Outbound Access Protection for Eventhouse
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Eventhouse artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 05/06/2026
ms.topic: how-to
---

# Workspace outbound access protection for Eventhouse (preview)

Workspace outbound access protection (OAP) helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. When you enable this feature, items can't make outbound connections unless you explicitly grant access through approved data connection rules. 

This article describes how outbound access protection applies to Real-Time Intelligence items and what scenarios are supported when the protection is enabled. 

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules. 

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items: 

- Eventhouse
- Eventstream, see [Outbound access protection for Eventstream](workspace-outbound-access-protection-event-stream.md)

## Outbound access protection for Eventhouse

### Supported Eventhouse outbound access scenarios

Within the same workspace, Eventhouse can access other OAP-supported items and perform specific actions, even when outbound access protection is enabled. Supported scenarios include:

- Querying data stored in Real-Time Intelligence items.

Eventhouse can also access resources outside the current workspace in the following cases:

- External resources that aren't scoped to a specific workspace.
- Fabric items across workspaces, if the relevant outbound access protection rules are configured.

Supported scenarios include:

- Querying data stored in OneLake in other workspaces (OneLake data is scoped per workspace).
- Ingesting data from Azure Event Hubs.

### Unsupported Eventhouse outbound access scenarios

When you enable workspace outbound access protection, the following Eventhouse outbound access scenarios are **blocked**:

- Accessing other Eventhouse databases, except through OneLake as mentioned in the supported scenarios.

- Accessing external resources outside of Microsoft Fabric, except through Azure Event Hubs as mentioned in the supported scenarios.

- Performing outbound operations that aren't included in the supported scenarios.

## Limitations

- Eventhouse outbound access protection is in public preview.

- Data connection rules aren't supported for Eventhouse.

- All Eventhouse items in the workspace follow the same outbound access settings.

## Considerations

- Workspace outbound access protection is enforced per workspace.

- All Real-Time Intelligence items in the workspace share the same outbound access policy.

- Inbound ingestion scenarios that don't require outbound workspace access (for example, Event Hubs ingestion) aren't affected.

## Next steps

[Learn more about workspace outbound access protection](workspace-outbound-access-protection-overview.md)
[Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
[Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
