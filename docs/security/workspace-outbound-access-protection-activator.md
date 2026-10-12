---
title: Workspace Outbound Access Protection for Activator
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Activator artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Activator Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 05/26/2026
ms.topic: how-to
---

# Workspace outbound access protection for Activator

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Activator items in your workspace to external resources. When you enable this feature, Activator action targets can't make outbound connections unless you explicitly grant access through approved data connection rules.

> [!IMPORTANT]
> Support for Activator with workspace outbound access protection is currently in preview.

## Learn about outbound access protection with Activator

Activator triggers actions when conditions in your data are met. These actions can target Fabric items, Microsoft Teams, email recipients, Power Automate flows, and Business events. When you enable outbound access protection, each action target is handled as follows:

| Action target | Behavior with outbound access protection enabled |
|---|---|
| **Fabric items** (notebooks, Spark jobs, pipelines, User Data Functions, Dataflows) | Configurable. Actions that target items in the same workspace are always allowed. Actions that target items in other workspaces are blocked unless the workspace admin explicitly permits them by using data connection rules. |
| **Microsoft Teams** | Configurable. Teams notifications are restricted to your tenant. The workspace admin can allow or block Teams notifications by using the **MicrosoftTeams** connector in data connection rules. |
| **Email** | Configurable. Email notifications are restricted to recipients within the same tenant. The workspace admin can allow or block Email notifications by using the **Activator Email** connector in data connection rules|
| **Power Automate** | Configurable. The workspace admin can allow or block Power Automate actions by using the **Activator Custom Action** connector in data connection rules |
| **Business events** | Configurable. The workspace admin can allow or block business events by using the **Real-Time Events** connector in data connection rules |

## Configure outbound access protection for Activator

You can only create an allow list by using data connection rules; managed private endpoints aren't supported for Activator. To configure outbound access protection for Activator:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md).

1. After enabling outbound access protection, set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow Activator actions to reach approved targets as needed.

When you configure these settings, Activator can only send actions to the destinations specified in the data connection rules, while all other outbound connections remain blocked.

## Considerations and limitations

- **Fabric item actions**: Actions targeting Fabric items in the same workspace are always allowed. Actions targeting Fabric items in other workspaces require explicit approval through data connection rules.
- **Teams actions**: Teams notifications are limited to your tenant. Use the **MicrosoftTeams** connection kind in data connection rules to allow or block Teams notifications.
- For other limitations, refer to [Workspace outbound access protection overview](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).

## Next steps

- [Create an allow list with managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md)
- [Create an allow list with data connection rules](./workspace-outbound-access-protection-allow-list-connector.md)
