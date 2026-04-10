---
title: Workspace outbound access protection for Real-Time Intelligence
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Real-Time Intelligence artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 04/10/2026
ms.topic: how-to
---

# Workspace outbound access protection for Real-Time Intelligence (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. When this feature is enabled, items are restricted from making outbound connections unless access is explicitly granted through approved data connection rules. 

Workspace outbound access protection for Real-Time Intelligence currently supports only the eventstream item type.

## Understanding workspace outbound access protection for eventstreams

Workspace outbound access protection enables secure data ingestion by allowing workspace admins to control which external sources can connect to eventstreams within the workspace. When outbound access protection is enabled, eventstreams can only connect to data sources that have been explicitly approved through data connection rules.

The following table summarizes the supported sources and destinations for eventstreams:

| Category | Details |
|----------|---------|
| **Supported sources** | Cloud or gateway connections |
| **Supported destinations** | Lakehouse |

When outbound access protection is enabled, all outbound connections are blocked by default. The workspace admin must then configure data connection rules for cloud or gateway connection policies to specify which external sources the eventstream can connect to. Once these policies are set, the eventstream can connect only to the approved sources and the lakehouse that is set as the destination. All other outbound connections are blocked.

:::image type="content" source="media/workspace-outbound-access-protection-real-time-intelligence/block-and-allow-small.png" alt-text="Screenshot of connections showing allowed connections to SQL Server and ADLS G2 Storage." lightbox="media/workspace-outbound-access-protection-real-time-intelligence/block-and-allow.png" border="false":::

### Configuring outbound access protection for eventstreams

You can only create an allow list using data connection rules; managed private endpoints aren't supported for eventstreams. To configure outbound access protection for eventstreams:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, Real-Time Intelligence items can connect only to the approved destinations specified in the data connection rules, while all other outbound connections remain blocked.

## Next steps

[Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
[Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
